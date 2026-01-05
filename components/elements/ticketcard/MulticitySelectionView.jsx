import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/util/AppContext";
import { Segmented, Tabs, Drawer, Button } from "antd";
import dayjs from "dayjs";
import "./Multicity.css";
import "./ticketCardMobile.css";
import { Input, Radio } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import Link from "next/link";
import ByPrice from "@/components/Filter/ByPrice";
import ByStops from "@/components/Filter/ByStops";
import ByDepartureTime from "@/components/Filter/ByDepartureTime";
import ByArrivalTime from "@/components/Filter/ByArrivalTime";
import ByAirline from "@/components/Filter/ByAirline";
import ByFareIdentifier from "@/components/Filter/ByFareIdentifier";
import ByAirlineSearch from "@/components/Filter/ByAirlineSearch";
import ByFareType from "@/components/Filter/ByFareType";
import SelectedFlightSummary from "./SelectedFlightSummary";
import Cookies from "js-cookie";
import BySortPrice from "@/components/Filter/BySortPrice";

export default function MulticitySelectionView({ flightData, markup = 0, ticketMarkups = {}, onPriceClick }) {
  const isUat = process.env.UAT_ENV === "true";
  const { getCookie } = useContext(AppContext);
  const [activeBoxIndex, setActiveBoxIndex] = useState(0);
  const [selectedFlights, setSelectedFlights] = useState({});
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [filters, setFilters] = useState([]);
  const [uniqueFareIdentifiers, setUniqueFareIdentifiers] = useState([]);
  const [uniqueFareTypes, setUniqueFareTypes] = useState([]);
  const [selectedFares, setSelectedFares] = useState([]);
  const [showAllFares, setShowAllFares] = useState(false);
  const [priceSort, setPriceSort] = useState("asc");

  // Drawer state
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const showFilterDrawer = () => setFilterDrawerOpen(true);
  const onCloseFilterDrawer = () => setFilterDrawerOpen(false);

  useEffect(() => {
    // console.log("[MulticitySelectionView] ticketMarkups updated:", ticketMarkups);
  }, [ticketMarkups]);



  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 770;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    if (flightData && activeTabKey) {
      const tabIndex = parseInt(activeTabKey) - 1;
      const flightsForSegment = flightData[String(tabIndex)] || [];

      const allFareIdentifiers = flightsForSegment
        .flatMap((ticket) =>
          ticket.totalPriceList.map((priceInfo) => priceInfo.fareIdentifier)
        )
        .filter(Boolean);

      const fareCounts = allFareIdentifiers.reduce((acc, fare) => {
        acc[fare] = (acc[fare] || 0) + 1;
        return acc;
      }, {});

      const uniqueFaresWithCounts = Object.keys(fareCounts).map((fare) => ({
        name: fare,
        count: fareCounts[fare],
      }));

      setUniqueFareIdentifiers(uniqueFaresWithCounts);
    }
  }, [flightData, activeTabKey]);

  const getTicketPrice = (ticket) => {
    const dfadu = parseInt(Cookies.get("gy_adult") || "1", 10);
    const dfchi = parseInt(Cookies.get("gy_child") || "0", 10);
    const dfinf = parseInt(Cookies.get("gy_infant") || "0", 10);

    const adultFare =
      (ticket?.totalPriceList?.[0]?.fd?.ADULT?.fC?.NF ?? 0) * dfadu;
    const childFare =
      (ticket?.totalPriceList?.[0]?.fd?.CHILD?.fC?.NF ?? 0) * dfchi;
    const infantFare =
      (ticket?.totalPriceList?.[0]?.fd?.INFANT?.fC?.NF ?? 0) * dfinf;

    return adultFare + childFare + infantFare;
  };

  useEffect(() => {
    if (flightData && activeTabKey) {
      const tabIndex = parseInt(activeTabKey) - 1;
      const flightsForSegment = flightData[String(tabIndex)] || [];

      const FARE_TYPE_LABEL = {
        0: "Non Refundable",
        1: "Refundable",
        2: "Partial Refundable",
      };

      const allFareTypes = (flightsForSegment || [])
        .flatMap((ticket) =>
          (ticket.totalPriceList || []).flatMap((priceInfo) =>
            Object.values(priceInfo.fd || {}).map((pax) => String(pax?.rT))
          )
        )
        .filter(Boolean);

      const fareTypeCounts = allFareTypes.reduce((acc, code) => {
        const label = FARE_TYPE_LABEL[code] ?? code;
        acc[label] = (acc[label] || 0) + 1;
        return acc;
      }, {});

      const uniqueFaresWithCounts = Object.keys(fareTypeCounts).map(
        (label) => ({
          name: label,
          count: fareTypeCounts[label],
        })
      );

      setUniqueFareTypes(uniqueFaresWithCounts);
    }
  }, [flightData, activeTabKey]);

  const applyFilters = (flights, filter) => {
    if (!filter) return flights;
    let filteredData = flights;

    // Price Range Filter
    // filteredData = filteredData.filter((ticket) => {
    //   const dfadu = parseInt(Cookies.get("gy_adult") || "1", 10);
    //   const dfchi = parseInt(Cookies.get("gy_child") || "0", 10);
    //   const dfinf = parseInt(Cookies.get("gy_infant") || "0", 10);
    //   const adultFare =
    //     (ticket?.totalPriceList?.[0]?.fd?.ADULT?.fC?.NF ?? 0) * (dfadu ?? 0);
    //   const childFare =
    //     (ticket?.totalPriceList?.[0]?.fd?.CHILD?.fC?.NF ?? 0) * (dfchi ?? 0);
    //   const infantFare =
    //     (ticket?.totalPriceList?.[0]?.fd?.INFANT?.fC?.NF ?? 0) * (dfinf ?? 0);

    //   const price = adultFare + childFare + infantFare;
    //   return (
    //     price !== undefined &&
    //     price >= filter.priceRange[0] &&
    //     price <= filter.priceRange[1]
    //   );
    // });
    filteredData = filteredData.filter((ticket) => {
      const price = getTicketPrice(ticket);
      return (
        price !== undefined &&
        price >= filter.priceRange[0] &&
        price <= filter.priceRange[1]
      );
    });

    // Stops Filter
    if (filter.stops !== "all") {
      filteredData = filteredData.filter((ticket) => {
        if (filter.stops === "non-stop") {
          return ticket.sI.length === 1;
        } else if (filter.stops === "1-stop") {
          return ticket.sI.length === 2;
        } else if (filter.stops === "2-stops") {
          return ticket.sI.length > 2;
        }
        return true;
      });
    }

    // Departure Time Filter
    if (filter.departureTime !== "all") {
      filteredData = filteredData.filter((ticket) => {
        const departureHour = new Date(ticket.sI[0].dt).getHours();
        if (filter.departureTime === "early-morning") {
          return departureHour >= 0 && departureHour < 6;
        } else if (filter.departureTime === "morning") {
          return departureHour >= 6 && departureHour < 12;
        } else if (filter.departureTime === "afternoon") {
          return departureHour >= 12 && departureHour < 18;
        } else if (filter.departureTime === "evening") {
          return departureHour >= 18 && departureHour < 24;
        }
        return true;
      });
    }

    // Arrival Time Filter
    if (filter.arrivalTime !== "all") {
      filteredData = filteredData.filter((ticket) => {
        const arrivalHour = new Date(
          ticket.sI[ticket.sI.length - 1].at
        ).getHours();
        if (filter.arrivalTime === "early-morning") {
          return arrivalHour >= 0 && arrivalHour < 6;
        } else if (filter.arrivalTime === "morning") {
          return arrivalHour >= 6 && arrivalHour < 12;
        } else if (filter.arrivalTime === "afternoon") {
          return arrivalHour >= 12 && arrivalHour < 18;
        } else if (filter.arrivalTime === "evening") {
          return arrivalHour >= 18 && arrivalHour < 24;
        }
        return true;
      });
    }

    // Airline Filter
    if (filter.selectedAirlines.length > 0) {
      filteredData = filteredData.filter((ticket) =>
        filter.selectedAirlines.includes(ticket.sI[0].fD.aI.name)
      );
    }

    if (filter.fareIdentifiers.length > 0) {
      filteredData = filteredData.filter((ticket) =>
        ticket.totalPriceList?.some(
          (p) =>
            p?.fareIdentifier &&
            filter.fareIdentifiers.includes(p.fareIdentifier)
        )
      );
    }

    if (filter.flightNumberSearch) {
      filteredData = filteredData.filter((ticket) => {
        return ticket.sI.some((segment) =>
          segment.fD.fN
            .toLowerCase()
            .includes(filter.flightNumberSearch.toLowerCase())
        );
      });
    }

    if (filter.selectedFareTypes.length > 0) {
      const FARE_TYPE_LABEL = {
        0: "Non Refundable",
        1: "Refundable",
        2: "Partial Refundable",
      };
      filteredData = filteredData.filter((ticket) =>
        (ticket.totalPriceList || []).some((priceInfo) =>
          Object.values(priceInfo.fd || {}).some((pax) => {
            const code = String(pax?.rT);
            const label = FARE_TYPE_LABEL[code] ?? code;
            return filter.selectedFareTypes.includes(label);
          })
        )
      );
    }

    if (priceSort === "asc") {
      filteredData.sort((a, b) => getTicketPrice(a) - getTicketPrice(b));
    } else if (priceSort === "desc") {
      filteredData.sort((a, b) => getTicketPrice(b) - getTicketPrice(a));
    }

    return filteredData;
  };

  const fromCity = getCookie("gy_da_str");
  const toCity = getCookie("gy_aa_str");
  const multicity = JSON.parse(getCookie("gy_multi_city"));
  const simplifiedSegments = multicity.map(({ from, to }) => ({
    from: from,
    to: to,
  }));

  const firstIdxCity = [
    {
      from: fromCity,
      to: toCity,
    },
  ];

  const cities = [...firstIdxCity, ...simplifiedSegments];

  // useEffect(() => {
  //   if (flightData) {
  //     const initialFilters = cities.map((_, tabIndex) => {
  //       const flightsForSegment = flightData[String(tabIndex)] || [];
  //       const prices = flightsForSegment.map(
  //         (ticket) => ticket?.totalPriceList?.[0]?.fd?.ADULT?.fC?.NF || 0
  //       );
  //       const minPrice = Math.min(...prices);
  //       const maxPrice = Math.max(...prices);

  //       return {
  //         priceRange: [minPrice, maxPrice],
  //         minPriceRange: minPrice,
  //         maxPriceRange: maxPrice,
  //         stops: "all",
  //         departureTime: "all",
  //         arrivalTime: "all",
  //         selectedAirlines: [],
  //         fareIdentifiers: [],
  //         flightNumberSearch: "",
  //         selectedFareTypes: [],
  //       };
  //     });
  //     setFilters(initialFilters);
  //   }
  // }, [flightData, cities.length]);

  const getSafeMinMax = (prices) => {
    if (!Array.isArray(prices) || prices.length === 0) {
      return { min: 0, max: 10000000 };
    }
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return {
      min: Number.isFinite(min) ? min : 0,
      max: Number.isFinite(max) ? max : 0,
    };
  };

  useEffect(() => {
    if (flightData) {
      const initialFilters = cities.map((_, tabIndex) => {
        const prices = [];
        const flightsForSegment = flightData[String(tabIndex)] || [];

        const dfadu = parseInt(Cookies.get("gy_adult") || "1", 10);
        const dfchi = parseInt(Cookies.get("gy_child") || "0", 10);
        const dfinf = parseInt(Cookies.get("gy_infant") || "0", 10);

        // const prices = flightsForSegment.map(
        //   (t) => t?.totalPriceList?.[0]?.fd?.ADULT?.fC?.NF ?? 0
        // );
        flightsForSegment.forEach((ticket) => {
          const adultFare =
            (ticket?.totalPriceList?.[0]?.fd?.ADULT?.fC?.NF ?? 0) *
            (dfadu ?? 0);
          const childFare =
            (ticket?.totalPriceList?.[0]?.fd?.CHILD?.fC?.NF ?? 0) *
            (dfchi ?? 0);
          const infantFare =
            (ticket?.totalPriceList?.[0]?.fd?.INFANT?.fC?.NF ?? 0) *
            (dfinf ?? 0);

          const price = adultFare + childFare + infantFare;
          if (price !== undefined) {
            prices.push(price);
          }
        });

        const { min, max } = getSafeMinMax(prices);

        return {
          priceRange: [min, Math.max(min, max)], // ensure range is not inverted
          minPriceRange: min,
          maxPriceRange: Math.max(min, max),
          stops: "all",
          departureTime: "all",
          arrivalTime: "all",
          selectedAirlines: [],
          fareIdentifiers: [],
          flightNumberSearch: "",
          selectedFareTypes: [],
        };
      });

      setFilters(initialFilters);
    }
  }, [flightData, cities.length]);

  const [departureFrom, setDepartureFrom] = useState("");
  const [arrivalTo, setArrivalTo] = useState("");

  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);

  const formatTime = (durationInMinutes) => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    if (hours === 0) return `${minutes}m`;
    if (minutes === 0) return `${hours}h`;

    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    setDepartureFrom(getCookie("gy_da_str") || "");
    setArrivalTo(getCookie("gy_aa_str") || "");

    const adult = parseInt(getCookie("gy_adult"));
    const child = parseInt(getCookie("gy_child"));
    const infant = parseInt(getCookie("gy_infant"));

    if (!isNaN(adult)) setAdultCount(adult);
    if (!isNaN(child)) setChildCount(child);
    if (!isNaN(infant)) setInfantCount(infant);
  }, []);

  const setSelectedFare = (tabIndex, flightIndex, fareIndex) => {
    setSelectedFares((prev) => ({
      ...prev,
      [tabIndex]: {
        ...(prev[tabIndex] || {}),
        [flightIndex]: fareIndex,
      },
    }));
  };

  const generateStableId = (ticket) => {
    if (ticket.id) return ticket.id;
    // Generate a stable ID based on flight segments and the base price of the first fare option
    const segments = ticket.sI || [];
    const basePrice = ticket.totalPriceList?.[0]?.fd?.ADULT?.fC?.NF || 0;
    const idString = segments.map(s => `${s.fD?.aI?.code}${s.fD?.fN}_${s.dt}`).join('|');
    return `gen_${idString.replace(/[^a-zA-Z0-9]/g, '')}_${basePrice}`;
  };
  const matchedFlights = cities.map((cityPair, tabIndex) => {
    const flightsForSegment = (flightData[String(tabIndex)] || []);

    return {
      from: cityPair.from,
      to: cityPair.to,
      flights: flightsForSegment,
    };
  });

  const currentFilter = filters[0];

  const tabItems = matchedFlights.map((pair, tabIndex) => {
    const firstFlight = pair.flights[0];
    let travelDate = "";
    if (firstFlight?.sI?.[0]?.dt) {
      travelDate = dayjs(firstFlight.sI[0].dt).format("ddd, DD MMM YYYY");
    }

    const calculateTotalFare = (
      fd,
      adultCount,
      childCount,
      infantCount,
      getCookie,
      markupValue = 0
    ) => {
      const adult = fd?.ADULT?.fC?.NF || 0;
      const child = fd?.CHILD?.fC?.NF || 0;
      const infant = fd?.INFANT?.fC?.NF || 0;
      return new Intl.NumberFormat("en-IN").format(
        adultCount * adult + childCount * child + infantCount * infant + (Number(markupValue) || 0)
      );
    };

    const renderFilters = (tabIndex) => (
      <>
        <div className="sidebar-left border-1 background-body">
          <div className="box-filters-sidebar">
            <div className="block-filter border-1">
              <h6 className="text-lg-bold filter-sty neutral-1000">
                Filter Price{" "}
              </h6>
              <ByPrice
                key={`price-${tabIndex}`}
                priceRange={
                  Array.isArray(filters[tabIndex]?.priceRange)
                    ? filters[tabIndex].priceRange
                    : [0, 100000000]
                }
                setPriceRange={(newRange) => {
                  setFilters((prev) => {
                    const next = [...prev];
                    next[tabIndex] = {
                      ...next[tabIndex],
                      priceRange: newRange,
                    };
                    return next;
                  });
                }}
                minPriceRange={
                  Number.isFinite(filters[tabIndex]?.minPriceRange)
                    ? filters[tabIndex].minPriceRange
                    : 0
                }
                maxPriceRange={
                  Number.isFinite(filters[tabIndex]?.maxPriceRange)
                    ? filters[tabIndex].maxPriceRange
                    : 100000000
                }
              />
            </div>
          </div>
        </div>
        <div className="sidebar-left border-1 background-body">
          <div className="box-filters-sidebar">
            <div className="block-filter border-1">
              <h6 className="text-lg-bold filter-sty neutral-1000">
                Sort by Price
              </h6>
              <BySortPrice sort={priceSort} setSort={setPriceSort} />
            </div>
          </div>
        </div>
        <div className="sidebar-left border-1 background-body">
          <div className="box-filters-sidebar">
            <div className="block-filter border-1">
              <h6 className="text-lg-bold filter-sty neutral-1000">
                Stops
              </h6>
              <ByStops
                key={`stops-${tabIndex}`}
                stops={filters[tabIndex]?.stops}
                setStops={(newStops) => {
                  setFilters((prevFilters) => {
                    const newFilters = [...prevFilters];
                    newFilters[tabIndex] = {
                      ...newFilters[tabIndex],
                      stops: newStops,
                    };
                    return newFilters;
                  });
                }}
                tabIndex={tabIndex}
              />
            </div>
          </div>
        </div>
        <div className="sidebar-left border-1 background-body">
          <div className="box-filters-sidebar">
            <div className="block-filter border-1">
              <h6 className="text-lg-bold filter-sty neutral-1000">
                Departure Time
              </h6>
              <ByDepartureTime
                key={`departureTime-${tabIndex}`}
                departureTime={filters[tabIndex]?.departureTime}
                setDepartureTime={(newDepartureTime) => {
                  setFilters((prevFilters) => {
                    const newFilters = [...prevFilters];
                    newFilters[tabIndex] = {
                      ...newFilters[tabIndex],
                      departureTime: newDepartureTime,
                    };
                    return newFilters;
                  });
                }}
                tabIndex={tabIndex}
              />
            </div>
          </div>
        </div>
        <div className="sidebar-left border-1 background-body">
          <div className="box-filters-sidebar">
            <div className="block-filter border-1">
              <h6 className="text-lg-bold filter-sty neutral-1000">
                Arrival Time
              </h6>
              <ByArrivalTime
                key={`arrivalTime-${tabIndex}`}
                arrivalTime={filters[tabIndex]?.arrivalTime}
                setArrivalTime={(newArrivalTime) => {
                  setFilters((prevFilters) => {
                    const newFilters = [...prevFilters];
                    newFilters[tabIndex] = {
                      ...newFilters[tabIndex],
                      arrivalTime: newArrivalTime,
                    };
                    return newFilters;
                  });
                }}
                tabIndex={tabIndex}
              />
            </div>
          </div>
        </div>
        <div className="sidebar-left border-1 background-body">
          <div className="box-filters-sidebar">
            <div className="block-filter border-1">
              <h6 className="text-lg-bold filter-sty neutral-1000">
                Airlines
              </h6>
              <div className="box-collapse scrollFilter">
                <ByAirline
                  key={`airline-${tabIndex}`}
                  uniqueAirlines={[
                    ...new Set(
                      pair.flights.map(
                        (ticket) => ticket.sI[0].fD.aI.name
                      ) || []
                    ),
                  ]}
                  selectedAirlines={filters[tabIndex]?.selectedAirlines}
                  setSelectedAirlines={(newAirlines) => {
                    setFilters((prevFilters) => {
                      const newFilters = [...prevFilters];
                      newFilters[tabIndex] = {
                        ...newFilters[tabIndex],
                        selectedAirlines: newAirlines,
                      };
                      return newFilters;
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar-left border-1 background-body">
          <div className="box-filters-sidebar">
            <div className="block-filter border-1">
              <h6 className="text-lg-bold filter-sty neutral-1000">
                Fare Identifier
              </h6>
              <ByFareIdentifier
                key={`fare-${tabIndex}`}
                fareIdentifiers={filters[tabIndex]?.fareIdentifiers}
                setFareIdentifiers={(newFareIdentifiers) => {
                  setFilters((prevFilters) => {
                    const newFilters = [...prevFilters];
                    newFilters[tabIndex] = {
                      ...newFilters[tabIndex],
                      fareIdentifiers: newFareIdentifiers,
                    };
                    return newFilters;
                  });
                }}
                options={uniqueFareIdentifiers}
              />
            </div>
          </div>
        </div>
        <div className="sidebar-left border-1 background-body">
          <div className="box-filters-sidebar">
            <div className="block-filter border-1">
              <h6 className="text-lg-bold filter-sty neutral-1000">
                Flight Number
              </h6>
              <ByAirlineSearch
                flightNumberSearch={filters[tabIndex]?.flightNumberSearch}
                setFlightNumberSearch={(newFlightNumberSearch) => {
                  setFilters((prevFilters) => {
                    const newFilters = [...prevFilters];
                    newFilters[tabIndex] = {
                      ...newFilters[tabIndex],
                      flightNumberSearch: newFlightNumberSearch,
                    };
                    return newFilters;
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="sidebar-left border-1 background-body">
          <div className="box-filters-sidebar">
            <div className="block-filter border-1">
              <h6 className="text-lg-bold filter-sty neutral-1000">
                Fare Type
              </h6>
              <ByFareType
                selectedFareTypes={filters[tabIndex]?.selectedFareTypes}
                setSelectedFareTypes={(newFareTypes) => {
                  setFilters((prevFilters) => {
                    const newFilters = [...prevFilters];
                    newFilters[tabIndex] = {
                      ...newFilters[tabIndex],
                      selectedFareTypes: newFareTypes,
                    };
                    return newFilters;
                  });
                }}
                options={uniqueFareTypes}
              />
            </div>
          </div>
        </div>
      </>
    );

    return {
      key: String(tabIndex + 1),
      label: (
        <div>
          <p className="text-sm-bold text-gray-600">
            {pair.from} → {pair.to}
          </p>
          {travelDate && (
            <p style={{ fontSize: "12px", color: "#888" }}>{travelDate}</p>
          )}
        </div>
      ),
      children: (
        <>
          {/* Filter Button for Mobile/Tablet (< 1200px) */}
          <div className="d-xl-none d-block p-2" style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              icon={<FilterOutlined />}
              onClick={showFilterDrawer}
              style={{ marginBottom: '10px' }}
            >
              Filters
            </Button>
          </div>

          {/* Drawer for Mobile Filters */}
          <Drawer
            title="Filter Flights"
            placement="left"
            onClose={onCloseFilterDrawer}
            open={filterDrawerOpen}
            width={300}
          >
            <div className="content-left">
              {currentFilter ? renderFilters(tabIndex) : <div className="p-3 text-sm text-gray-500">Loading filters…</div>}
            </div>
          </Drawer>

          <div className="row">
            <div className="col-xl-3 d-none d-xl-block content-left">
              {!currentFilter && (
                <div className="p-3 text-sm text-gray-500">Loading filters…</div>
              )}
              {currentFilter && renderFilters(tabIndex)}
            </div>
            <div className="col-xl-9 col-12">
              {/* Mobile Section Header */}
              {isMobile && (
                <div style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1a1a2e',
                  marginBottom: '16px',
                  padding: '0 4px'
                }}>
                  Departure to {pair.to}
                </div>
              )}

              {pair.flights.length > 0 ? (
                applyFilters(pair.flights, filters[tabIndex]).map((ticket, i) => {
                  const ticketId = ticket.id;
                  const currentMarkup = ticketMarkups[ticketId] ?? markup;
                  return (
                    <div key={ticketId}>
                      {isMobile ? (
                        <div className="ticket-card-mobile card-flight">
                          <div className="mobile-card-header">
                            {isUat ? (
                              <img
                                className="mobile-airline-logo"
                                src={`/assets/imgs/airlines/${ticket.sI[0].fD.aI.code}.png`}
                                alt={ticket.sI[0].fD.aI.name}
                                onError={(e) => {
                                  e.target.src = "/assets/imgs/page/homepage1/flight.png";
                                }}
                              />
                            ) : (
                              <img
                                className="mobile-airline-logo"
                                src={`/assets/imgs/airlines/${ticket.sI[0].fD.aI.code.toLowerCase()}.png`}
                                alt={ticket.sI[0].fD.aI.name}
                                onError={(e) => {
                                  e.target.src = "/assets/imgs/page/homepage1/flight.png";
                                }}
                              />
                            )}
                            <span className="mobile-airline-name">{ticket.sI[0].fD.aI.name}</span>
                          </div>

                          <div className="mobile-flight-segments">
                            {ticket.sI.map((segment, idx) => (
                              <div key={idx} className="mobile-segment-row">
                                <div className="mobile-city-block">
                                  <span className="mobile-time">{dayjs(segment.dt).format("HH:mm")}</span>
                                  <span className="mobile-city-code">{segment.da.code}</span>
                                </div>
                                <div className="mobile-duration-block">
                                  <span className="mobile-duration">{formatTime(segment.duration)}</span>
                                  <div className="mobile-arrow-icon"></div>
                                  <span className="mobile-stops">
                                    {segment.stops > 0
                                      ? `${segment.stops} Stop${segment.stops > 1 ? "s" : ""}`
                                      : "Non-stop"}
                                  </span>
                                </div>
                                <div className="mobile-city-block" style={{ textAlign: "right" }}>
                                  <span className="mobile-time">{dayjs(segment.at).format("HH:mm")}</span>
                                  <span className="mobile-city-code">{segment.aa.code}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mobile-card-footer">
                            <div className="mobile-price-section">
                              <span
                                className="mobile-price cursor-pointer"
                                onClick={() => {
                                  const prevSegments = Object.keys(selectedFlights)
                                    .filter(key => parseInt(key) < tabIndex)
                                    .map(key => ({
                                      ticket: selectedFlights[key].ticket,
                                      selectedPriceIndex: selectedFlights[key].selectedPriceIndex
                                    }));
                                  onPriceClick && onPriceClick(ticket.id, ticketMarkups[ticket.id] ?? markup, ticket, selectedFares[tabIndex]?.[i] ?? 0, prevSegments);
                                }}
                              >
                                ₹{calculateTotalFare(
                                  ticket.totalPriceList[selectedFares[tabIndex]?.[i] ?? 0].fd,
                                  adultCount,
                                  childCount,
                                  infantCount,
                                  getCookie,
                                  ticketMarkups[ticket.id] ?? markup
                                )}
                              </span>
                              <span className="mobile-fare-type">
                                {ticket.totalPriceList[selectedFares[tabIndex]?.[i] ?? 0].fareIdentifier}
                              </span>
                            </div>
                            <button
                              className="mobile-book-btn"
                              onClick={() => {
                                const selectedFareIndex = selectedFares[tabIndex]?.[i] ?? 0;
                                const selectedFare = ticket.totalPriceList[selectedFareIndex];
                                const fareFD = selectedFare.fd;

                                const totalPrice = calculateTotalFare(
                                  fareFD,
                                  adultCount,
                                  childCount,
                                  infantCount,
                                  getCookie,
                                  ticketMarkups[ticket.id] ?? markup
                                );
                                const firstSegment = ticket.sI[0];
                                const lastSegment = ticket.sI[ticket.sI.length - 1];

                                const isUatAirlineLogo = isUat
                                  ? `/assets/imgs/airlines/${firstSegment.fD.aI.code}.png`
                                  : `/assets/imgs/airlines/${firstSegment.fD.aI.code.toLowerCase()}.png`;
                                const updatedFlight = {
                                  priceId: selectedFare.id,
                                  flightName: firstSegment.fD.aI.name,
                                  depCityCode: firstSegment.da.code,
                                  arrCityCode: lastSegment.aa.code,
                                  airlineCode: firstSegment.fD.aI.code,
                                  flightNumber: firstSegment.fD.fN,
                                  depCity: firstSegment.da.city,
                                  arrCity: lastSegment.aa.city,
                                  depTime: dayjs(firstSegment.dt).format("HH:mm"),
                                  arrTime: dayjs(lastSegment.at).format("HH:mm"),
                                  airlineLogo: isUatAirlineLogo,
                                  price: totalPrice,
                                  markup: ticketMarkups[ticket.id] ?? markup,
                                  adultFare: new Intl.NumberFormat("en-IN").format(
                                    fareFD.ADULT?.fC?.NF || 0
                                  ),
                                };

                                setSelectedFlights((prev) => {
                                  const newFlights = {
                                    ...prev,
                                    [tabIndex]: updatedFlight,
                                  };
                                  const nextTabIndex = tabIndex + 1;
                                  if (nextTabIndex < matchedFlights.length) {
                                    setActiveTabKey(String(nextTabIndex + 1));
                                  }

                                  return newFlights;
                                });
                              }}
                            >
                              Select
                            </button>
                          </div>

                          {ticket.totalPriceList.length > 1 && (
                            <div
                              className="mobile-view-more"
                              onClick={() => setShowAllFares((prev) => !prev)}
                            >
                              {showAllFares ? "Hide additional fares" : "View more fares"}
                            </div>
                          )}

                          {showAllFares && (
                            <div className="mt-3">
                              <Radio.Group
                                onChange={(e) => setSelectedFare(tabIndex, i, e.target.value)}
                                value={selectedFares[tabIndex]?.[i] ?? 0}
                                className="w-full flex flex-col gap-2"
                              >
                                {ticket.totalPriceList.map((fare, fareIdx) => (
                                  <Radio
                                    key={fareIdx}
                                    value={fareIdx}
                                    className="w-full border p-2 rounded"
                                  >
                                    <div className="flex justify-between items-center w-full">
                                      <span className="text-sm font-bold">
                                        ₹{calculateTotalFare(
                                          fare.fd,
                                          adultCount,
                                          childCount,
                                          infantCount,
                                          getCookie,
                                          ticketMarkups[ticket.id] ?? markup
                                        )}
                                      </span>
                                      <span className="text-xs opacity-70">
                                        {fare.fareIdentifier}
                                      </span>
                                    </div>
                                  </Radio>
                                ))}
                              </Radio.Group>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="" style={{ paddingBottom: "10px" }}>
                          {ticket.sI.length >= 1 ? (
                            <div className="combined-connecting-flight">
                              <div className="flex gap-4 border rounded-md justify-around items-center pr-20 ">
                                <div className="flex flex-col">
                                  {ticket.sI.map((segment, index) => (
                                    <div
                                      key={index}
                                      className="relative flex flex-col rounded-md p-1 xl:p-5"
                                    >
                                      <div
                                        className="flex justify-between"
                                        style={{ width: "500px" }}
                                      >
                                        <div className="flex flex-col items-center justify-center w-max">
                                          {isUat && (
                                            <img
                                              style={{ width: "50%", margin: "5px" }}
                                              src={`/assets/imgs/airlines/${segment["fD"].aI.code}.png`}
                                            />
                                          )}
                                          {!isUat && (
                                            <img
                                              style={{ width: "50%", margin: "5px" }}
                                              src={`/assets/imgs/airlines/${segment[
                                                "fD"
                                              ].aI.code.toLowerCase()}.png`}
                                            />
                                          )}
                                          <div className="text-sm-medium">
                                            {segment["fD"].aI.name}
                                          </div>
                                        </div>
                                        <div
                                          className="text-sm  flex flex-col justify-center items-center "
                                          style={{ width: "150px" }}
                                        >
                                          <p className="text-md-bold neutral-1000 city1name">
                                            {segment.da.city} ({segment.da.code})
                                          </p>
                                          <p className="neutral-1000 time">
                                            {dayjs(segment.dt).format("HH:mm")}
                                          </p>
                                        </div>
                                        <div
                                          className="text-xs text-center  "
                                          style={{ width: "100px" }}
                                        >
                                          <p className="text-sm-medium neutral-500">
                                            {formatTime(segment.duration)}
                                          </p>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-arrow-right"
                                            viewBox="0 0 16 16"
                                          >
                                            <path
                                              fill-rule="evenodd"
                                              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                                            />
                                          </svg>
                                          <p className="text-sm-medium neutral-500">
                                            {" "}
                                            {segment.stops > 0
                                              ? `${segment.stops} stops`
                                              : "non-stop"}
                                          </p>
                                        </div>
                                        <div
                                          className="text-sm  flex flex-col justify-center items-center gap-1 "
                                          style={{ width: "200px" }}
                                        >
                                          <p className="text-md-bold neutral-1000 city1name">
                                            {segment.aa.city} ({segment.aa.code})
                                          </p>
                                          <p className="neutral-1000 time">
                                            {dayjs(segment.at).format("HH:mm")}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                <div className="flight-price-1 border-1 price-div flex flex-row justify-center items-center flex-col mt-4">
                                  <Radio.Group
                                    onChange={(e) =>
                                      setSelectedFare(tabIndex, i, e.target.value)
                                    }
                                    value={selectedFares[tabIndex]?.[i] ?? 0}
                                    className="fare-options flex flex-col gap-2 w-full"
                                  >
                                    {(showAllFares
                                      ? ticket.totalPriceList
                                      : ticket.totalPriceList.slice(0, 2)
                                    ).map((e, j) => {
                                      const fareValue = calculateTotalFare(
                                        e.fd,
                                        adultCount,
                                        childCount,
                                        infantCount,
                                        getCookie,
                                        ticketMarkups[ticket.id] ?? markup
                                      );
                                      return (
                                        <Radio
                                          key={j}
                                          value={j}
                                          className="w-full radiocomp"
                                        >
                                          <div className="p-0 rounded-lg border-2 radiodiv border-gray-300 hover:border-gray-500">
                                            <div className="flex flex-row gap-2 items-center">
                                              <div
                                                className="text-lg font-bold text-gray-800 price cursor-pointer hover:bg-gray-50 transition-colors"
                                                onClick={() => {
                                                  const prevSegments = Object.keys(selectedFlights)
                                                    .filter(key => parseInt(key) < tabIndex)
                                                    .map(key => ({
                                                      ticket: selectedFlights[key].ticket,
                                                      selectedPriceIndex: selectedFlights[key].selectedPriceIndex
                                                    }));
                                                  onPriceClick && onPriceClick(ticket.id, ticketMarkups[ticket.id] ?? markup, ticket, selectedFares[tabIndex]?.[i] ?? 0, prevSegments);
                                                }}
                                              >
                                                ₹{fareValue}
                                              </div>
                                              <span
                                                className="fareidentifier text-xs font-bold"
                                                style={{
                                                  backgroundColor: "#f5deb3",
                                                  color: "#5c4033",
                                                  padding: "1px 2px",
                                                }}
                                              >
                                                {e.fareIdentifier}
                                              </span>
                                            </div>
                                            <div className="text-xs text-gray-600">
                                              <span className="ml-2 cabinclass">
                                                {e.fd.ADULT.cc} |{" "}
                                                <span className="refundable">
                                                  {e.fd.ADULT.rT === 1
                                                    ? "Refundable"
                                                    : e.fd.ADULT.rT === 2
                                                      ? "Partial Refundable"
                                                      : "Non Refundable"}
                                                </span>
                                              </span>
                                            </div>
                                          </div>
                                        </Radio>
                                      );
                                    })}
                                    {ticket.totalPriceList.length > 2 && (
                                      <button
                                        className="view-more-txt"
                                        style={{
                                          textAlign: "right",
                                          fontSize: "10px",
                                        }}
                                        onClick={() =>
                                          setShowAllFares((prev) => !prev)
                                        }
                                      >
                                        {showAllFares
                                          ? "(-) View Less"
                                          : "(+) View More"}
                                      </button>
                                    )}
                                  </Radio.Group>
                                </div>
                                <div>
                                  <button
                                    className="btn-book-now"
                                    onClick={() => {
                                      const selectedFareIndex =
                                        selectedFares[tabIndex]?.[i] ?? 0;
                                      const selectedFare =
                                        ticket.totalPriceList[selectedFareIndex];
                                      const fareFD = selectedFare.fd;

                                      const totalPrice = calculateTotalFare(
                                        fareFD,
                                        adultCount,
                                        childCount,
                                        infantCount,
                                        getCookie,
                                        ticketMarkups[ticket.id] ?? markup
                                      );
                                      const firstSegment = ticket.sI[0];
                                      const lastSegment =
                                        ticket.sI[ticket.sI.length - 1];

                                      const isUatAirlineLogo = isUat
                                        ? `/assets/imgs/airlines/${firstSegment.fD.aI.code}.png`
                                        : `/assets/imgs/airlines/${firstSegment.fD.aI.code.toLowerCase()}.png`;
                                      const updatedFlight = {
                                        priceId: selectedFare.id,
                                        flightName: firstSegment.fD.aI.name,
                                        depCityCode: firstSegment.da.code,
                                        arrCityCode: lastSegment.aa.code,
                                        airlineCode: firstSegment.fD.aI.code,
                                        flightNumber: firstSegment.fD.fN,
                                        depCity: firstSegment.da.city,
                                        arrCity: lastSegment.aa.city,
                                        depTime: dayjs(firstSegment.dt).format(
                                          "HH:mm"
                                        ),
                                        arrTime: dayjs(lastSegment.at).format(
                                          "HH:mm"
                                        ),
                                        airlineLogo: isUatAirlineLogo,
                                        price: totalPrice,
                                        markup: ticketMarkups[ticket.id] ?? markup,
                                        adultFare: new Intl.NumberFormat(
                                          "en-IN"
                                        ).format(fareFD.ADULT?.fC?.NF || 0),
                                        ticket: ticket, // Added for combined quote parity
                                        selectedPriceIndex: selectedFareIndex // Added for combined quote parity
                                      };

                                      setSelectedFlights((prev) => {
                                        const newFlights = {
                                          ...prev,
                                          [tabIndex]: updatedFlight,
                                        };
                                        const nextTabIndex = tabIndex + 1;
                                        if (
                                          nextTabIndex < matchedFlights.length
                                        ) {
                                          setActiveTabKey(
                                            String(nextTabIndex + 1)
                                          ); // Because tab keys are 1-based
                                        }

                                        return newFlights;
                                      });
                                    }}
                                  >
                                    Select
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p>No matching flights found for this route.</p>
              )}
            </div>
          </div>
        </>
      ),
    };
  });

  const isLastFlightSelected =
    Object.keys(selectedFlights).length === cities.length;

  return (
    <>
      <Tabs
        activeKey={activeTabKey}
        items={tabItems}
        onChange={(key) => setActiveTabKey(key)}
        destroyInactiveTabPane={false}
      />
      {Object.keys(selectedFlights).length > 0 && (
        <SelectedFlightSummary
          selectedFlights={selectedFlights}
          cities={cities}
          isLastFlightSelected={isLastFlightSelected}
          isMobile={isMobile}
        />
      )}
    </>
  );
}
