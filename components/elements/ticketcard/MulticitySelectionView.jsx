import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/util/AppContext";
import { Segmented, Tabs, Drawer, Button } from "antd";
import dayjs from "dayjs";
import "./Multicity.css";
import "./ticketCardMobile.css";
import { Input, Radio } from "antd";
import TicketCardMobile from "./TicketCardMobile";
import MulticityTicketCardDesktop from "./MulticityTicketCardDesktop";
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
import { ShareAltOutlined, CloseOutlined } from "@ant-design/icons";
import QuoteShareModal from "@/components/elements/QuoteShareModal";
import { postData } from "@/services/NetworkAdapter";
import { message } from "antd";

export default function MulticitySelectionView({ flightData, markup = 0, ticketMarkups = {}, onPriceClick }) {
  const isUat = process.env.UAT_ENV === "true";
  const { getCookie } = useContext(AppContext);
  const [activeBoxIndex, setActiveBoxIndex] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    // Initial check
    if (typeof window !== 'undefined') {
      handleResize();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [selectedFlights, setSelectedFlights] = useState({});
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [filters, setFilters] = useState([]);
  const [uniqueFareIdentifiers, setUniqueFareIdentifiers] = useState([]);
  const [uniqueFareTypes, setUniqueFareTypes] = useState([]);
  const [selectedFares, setSelectedFares] = useState([]);
  const [showAllFares, setShowAllFares] = useState(false);
  // Drawer state
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const showFilterDrawer = () => setFilterDrawerOpen(true);
  const onCloseFilterDrawer = () => setFilterDrawerOpen(false);

  // Quote Sharing State
  const [shareMode, setShareMode] = useState(false);
  const [selectedQuoteFlights, setSelectedQuoteFlights] = useState([]);
  const [isQuoteSharing, setIsQuoteSharing] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);

  // Handle Share Selection
  const handleQuoteSelectionChange = (ticket, fareIndex, isSelected, segmentIndex) => {
    if (isSelected) {
      setSelectedQuoteFlights((prev) => [
        ...prev,
        {
          ticketId: ticket.id,
          fareIndex: fareIndex,
          ticket: ticket,
          phase: `Segment ${segmentIndex + 1}` // Track phase as Segment X
        },
      ]);
    } else {
      setSelectedQuoteFlights((prev) =>
        prev.filter(
          (f) =>
            !(f.ticketId === ticket.id && f.fareIndex === fareIndex)
        )
      );
    }
  };

  const handleSendQuote = () => {
    if (selectedQuoteFlights.length === 0) {
      message.warning("Please select at least one flight to share.");
      return;
    }
    setIsQuoteSharing(true);
  };

  const handleEmailSend = async (emails, withPrice) => {
    setShareLoading(true);
    try {
      const classLabels = {
        a: "PREMIUM_ECONOMY",
        b: "ECONOMY",
        c: "BUSINESS",
        d: "FIRST",
      };

      const passengerInfo = {
        adult: Cookies.get("gy_adult"),
        child: Cookies.get("gy_child"),
        infant: Cookies.get("gy_infant"),
        class: classLabels[Cookies.get("gy_class") || "b"]
      };

      const payload = {
        emails,
        withPrice,
        flights: selectedQuoteFlights.map((item) => {
          const specificMarkup = ticketMarkups[`${item.ticketId}_${item.fareIndex}`];
          const ticketLevelMarkup = ticketMarkups[item.ticketId] ?? markup;
          const itemMarkup = specificMarkup ?? ticketLevelMarkup;
          return {
            ...item.ticket,
            ticket: item.ticket,
            fare: item.ticket.totalPriceList[item.fareIndex],
            fareIndex: item.fareIndex,
            markup: itemMarkup,
            phase: item.phase
          };
        }),
        tripType: "Multi-City", // Explicitly set trip type
        passengerInfo
      };

      await postData("travelogy/flight/send-quote", payload);

      message.success("Quote sent successfully!");
      setIsQuoteSharing(false);
      setShareMode(false);
      setSelectedQuoteFlights([]);
    } catch (error) {
      console.error("Error sending quote:", error);
      message.error("An error occurred while sending the quote.");
    } finally {
      setShareLoading(false);
    }
  };

  const getTicketPrice = (ticket, validFareTypes = []) => {
    const dfadu = parseInt(Cookies.get("gy_adult") || "1", 10);
    const dfchi = parseInt(Cookies.get("gy_child") || "0", 10);
    const dfinf = parseInt(Cookies.get("gy_infant") || "0", 10);

    const typeMap = {
      0: "Non Refundable",
      1: "Refundable",
      2: "Partial Refundable",
    };

    let selectedFareIndex = 0;

    // If strict fare types are selected, find the first matching fare Option
    if (validFareTypes && validFareTypes.length > 0) {
      const matchIndex = ticket.totalPriceList.findIndex((priceInfo) =>
        Object.values(priceInfo.fd || {}).some((pax) => {
          const code = Number(pax?.rT);
          const label = typeMap[code] ?? code;
          return validFareTypes.includes(label);
        })
      );
      if (matchIndex !== -1) {
        selectedFareIndex = matchIndex;
      }
    }

    const fareOption = ticket.totalPriceList?.[selectedFareIndex];

    const adultFare =
      (fareOption?.fd?.ADULT?.fC?.NF ?? 0) * dfadu;
    const childFare =
      (fareOption?.fd?.CHILD?.fC?.NF ?? 0) * dfchi;
    const infantFare =
      (fareOption?.fd?.INFANT?.fC?.NF ?? 0) * dfinf;

    return adultFare + childFare + infantFare;
  };

  const checkPassesFilters = (ticket, filter, ignoreKeys = []) => {
    if (!filter) return true;
    const selectedFareTypes = filter.selectedFareTypes || [];
    const FARE_TYPE_LABEL = {
      0: "Non Refundable",
      1: "Refundable",
      2: "Partial Refundable",
    };

    // 1. Strict Fare Type Filter
    if (!ignoreKeys.includes("fareType") && selectedFareTypes.length > 0) {
      const passes = (ticket.totalPriceList || []).some((priceInfo) =>
        Object.values(priceInfo.fd || {}).some((pax) => {
          const code = String(pax?.rT);
          const label = FARE_TYPE_LABEL[code] ?? code;
          return selectedFareTypes.includes(label);
        })
      );
      if (!passes) return false;
    }

    // Price Range Filter
    if (!ignoreKeys.includes("price")) {
      const price = getTicketPrice(ticket, selectedFareTypes);
      if (price === undefined || price < filter.priceRange[0] || price > filter.priceRange[1]) return false;
    }

    // Stops Filter
    if (!ignoreKeys.includes("stops") && filter.stops !== "all") {
      const stopCount = ticket.sI.length;
      if (filter.stops === "non-stop" && stopCount !== 1) return false;
      if (filter.stops === "1-stop" && stopCount !== 2) return false;
      if (filter.stops === "2-stops" && stopCount <= 2) return false;
    }

    // Departure Time Filter
    if (!ignoreKeys.includes("departureTime") && filter.departureTime !== "all") {
      const departureHour = new Date(ticket.sI[0].dt).getHours();
      const t = filter.departureTime;
      if (t === "early-morning" && !(departureHour >= 0 && departureHour < 6)) return false;
      if (t === "morning" && !(departureHour >= 6 && departureHour < 12)) return false;
      if (t === "afternoon" && !(departureHour >= 12 && departureHour < 18)) return false;
      if (t === "evening" && !(departureHour >= 18 && departureHour < 24)) return false;
    }

    // Arrival Time Filter
    if (!ignoreKeys.includes("arrivalTime") && filter.arrivalTime !== "all") {
      const arrivalHour = new Date(ticket.sI[ticket.sI.length - 1].at).getHours();
      const t = filter.arrivalTime;
      if (t === "early-morning" && !(arrivalHour >= 0 && arrivalHour < 6)) return false;
      if (t === "morning" && !(arrivalHour >= 6 && arrivalHour < 12)) return false;
      if (t === "afternoon" && !(arrivalHour >= 12 && arrivalHour < 18)) return false;
      if (t === "evening" && !(arrivalHour >= 18 && arrivalHour < 24)) return false;
    }

    // Airline Filter
    if (!ignoreKeys.includes("airline") && filter.selectedAirlines?.length > 0) {
      if (!filter.selectedAirlines.includes(ticket.sI[0].fD.aI.name)) return false;
    }

    // Fare Identifier
    if (!ignoreKeys.includes("fareIdentifier") && filter.fareIdentifiers?.length > 0) {
      const passes = ticket.totalPriceList?.some((p) =>
        p?.fareIdentifier && filter.fareIdentifiers.includes(p.fareIdentifier)
      );
      if (!passes) return false;
    }

    // Flight Number
    if (!ignoreKeys.includes("flightNumber") && filter.flightNumberSearch) {
      const passes = ticket.sI.some((segment) => {
        const flightCode = `${segment.fD.aI.code} ${segment.fD.fN}`;
        return flightCode.toLowerCase().includes(filter.flightNumberSearch.toLowerCase());
      });
      if (!passes) return false;
    }

    return true;
  };

  useEffect(() => {
    if (flightData && activeTabKey && filters.length > 0) {
      const tabIndex = parseInt(activeTabKey) - 1;
      const flightsForSegment = flightData[String(tabIndex)] || [];
      const currentFilter = filters[tabIndex];

      if (!currentFilter) return;

      const FARE_TYPE_LABEL = {
        0: "Non Refundable",
        1: "Refundable",
        2: "Partial Refundable",
      };

      // --- Fare Types Counts ---
      const fareTypeCounts = {};
      flightsForSegment.forEach(ticket => {
        if (checkPassesFilters(ticket, currentFilter, ["fareType"])) {
          const types = new Set();
          (ticket.totalPriceList || []).forEach(priceInfo => {
            Object.values(priceInfo.fd || {}).forEach(pax => {
              const code = String(pax?.rT);
              const label = FARE_TYPE_LABEL[code] ?? code;
              types.add(label);
            });
          });
          types.forEach(t => {
            fareTypeCounts[t] = (fareTypeCounts[t] || 0) + 1;
          });
        }
      });
      const uniqueFareTypesWithCounts = Object.keys(fareTypeCounts).map(label => ({
        name: label,
        count: fareTypeCounts[label]
      }));
      setUniqueFareTypes(uniqueFareTypesWithCounts);


      // --- Fare Identifier Counts ---
      const fareIdCounts = {};
      flightsForSegment.forEach(ticket => {
        if (checkPassesFilters(ticket, currentFilter, ["fareIdentifier"])) {
          const ids = new Set();
          (ticket.totalPriceList || []).forEach(priceInfo => {
            if (priceInfo.fareIdentifier) ids.add(priceInfo.fareIdentifier);
          });
          ids.forEach(id => {
            fareIdCounts[id] = (fareIdCounts[id] || 0) + 1;
          });
        }
      });
      const uniqueFaresWithCounts = Object.keys(fareIdCounts).map(fare => ({
        name: fare,
        count: fareIdCounts[fare]
      }));
      setUniqueFareIdentifiers(uniqueFaresWithCounts);

    }
  }, [flightData, activeTabKey, filters]);

  const applyFilters = (flights, filter) => {
    if (!filter) return flights;
    let filteredData = flights;
    const selectedFareTypes = filter.selectedFareTypes || [];

    // 1. Strict Fare Type Filter (First Priority)
    if (selectedFareTypes.length > 0) {
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
            return selectedFareTypes.includes(label);
          })
        )
      );
    }

    // Price Range Filter
    filteredData = filteredData.filter((ticket) => {
      const price = getTicketPrice(ticket, selectedFareTypes);
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
        return ticket.sI.some((segment) => {
          const flightCode = `${segment.fD.aI.code} ${segment.fD.fN}`;
          return flightCode.toLowerCase().includes(filter.flightNumberSearch.toLowerCase());
        });
      });
    }

    const sortOrder = filter.priceSort || "asc";
    if (sortOrder === "asc") {
      filteredData.sort((a, b) => getTicketPrice(a, selectedFareTypes) - getTicketPrice(b, selectedFareTypes));
    } else if (sortOrder === "desc") {
      filteredData.sort((a, b) => getTicketPrice(b, selectedFareTypes) - getTicketPrice(a, selectedFareTypes));
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
          priceSort: "asc",
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

    const filteredFlights = applyFilters(pair.flights, filters[tabIndex]);

    const handleResetAllFilters = (tabIdx) => {
      setFilters((prev) => {
        const next = [...prev];
        if (next[tabIdx]) {
          next[tabIdx] = {
            ...next[tabIdx],
            priceRange: [next[tabIdx].minPriceRange, next[tabIdx].maxPriceRange],
            stops: "all",
            departureTime: "all",
            arrivalTime: "all",
            selectedAirlines: [],
            fareIdentifiers: [],
            flightNumberSearch: "",
            selectedFareTypes: [],
            priceSort: "asc",
          };
        }
        return next;
      });
    };

    const isFilterApplied = (tabIdx) => {
      const f = filters[tabIdx];
      if (!f) return false;
      return (
        f.stops !== "all" ||
        f.departureTime !== "all" ||
        f.arrivalTime !== "all" ||
        f.selectedAirlines?.length > 0 ||
        f.fareIdentifiers?.length > 0 ||
        f.flightNumberSearch !== "" ||
        f.selectedFareTypes?.length > 0 ||
        (f.priceSort && f.priceSort !== "asc") ||
        (f.priceRange[0] !== f.minPriceRange || f.priceRange[1] !== f.maxPriceRange)
      );
    };

    const getActiveFilterCount = (tabIdx) => {
      const f = filters[tabIdx];
      if (!f) return 0;
      let count = 0;
      if (f.stops !== "all") count++;
      if (f.departureTime !== "all") count++;
      if (f.arrivalTime !== "all") count++;
      if (f.selectedAirlines?.length > 0) count++;
      if (f.fareIdentifiers?.length > 0) count++;
      if (f.flightNumberSearch !== "") count++;
      if (f.selectedFareTypes?.length > 0) count++;
      if (f.priceSort && f.priceSort !== "asc") count++;
      if (f.priceRange[0] !== f.minPriceRange || f.priceRange[1] !== f.maxPriceRange) count++;
      return count;
    };

    const renderFilters = (tabIndex) => (
      <>
        {isFilterApplied(tabIndex) && (
          <div className="sticky top-36 lg:top-48 z-50 sidebar-left border-1 background-body mb-10" style={{ height: "60px", paddingTop: "15px" }}>
            <div className="box-filters-sidebar">
              <div className="block-filter border-1">
                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="text-lg-bold filter-sty neutral-1000">Applied Filters <span className="text-sm font-normal text-gray-500">({getActiveFilterCount(tabIndex)})</span></h6>
                  <Button
                    type="link"
                    onClick={() => handleResetAllFilters(tabIndex)}
                    style={{ padding: 0, height: "auto", color: "#ffa726", fontWeight: "bold", marginBottom: "20px" }}
                  >
                    Reset All
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
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
              <BySortPrice
                sort={filters[tabIndex]?.priceSort || "asc"}
                setSort={(validSort) => {
                  setFilters((prev) => {
                    const next = [...prev];
                    if (next[tabIndex]) {
                      next[tabIndex] = {
                        ...next[tabIndex],
                        priceSort: validSort,
                      };
                    }
                    return next;
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
            zIndex={10000001}
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
              <div className="sticky top-36 lg:top-48 z-10 mb-3 flex justify-end items-center bg-white p-2 rounded shadow-sm border border-gray-100">
                {!shareMode ? (
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <ShareAltOutlined />
                    <span className="font-semibold">Share By :</span>
                    {/* <span className="cursor-pointer hover:text-green-600 font-medium">Whatsapp</span> | */}
                    <span
                      className="cursor-pointer hover:text-orange-500 font-medium text-orange-500"
                      onClick={() => setShareMode(true)}
                    >
                      Email
                    </span>
                    {/* </span> | */}
                    {/* <span className="cursor-pointer hover:text-blue-600 font-medium">View</span> */}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 w-full justify-between">
                    <div className="text-gray-600 text-sm font-medium">
                      Select flights to share ({selectedQuoteFlights.length} selected)
                    </div>
                    <div className="flex gap-2">
                      <span
                        className="cursor-pointer text-orange-500 font-bold hover:text-orange-600 flex items-center gap-1"
                        onClick={handleSendQuote}
                      >
                        Send Quote <ShareAltOutlined />
                      </span>
                      <span
                        className="cursor-pointer text-gray-500 hover:text-red-500 flex items-center gap-1"
                        onClick={() => {
                          setShareMode(false);
                          setSelectedQuoteFlights([]);
                        }}
                      >
                        <CloseOutlined /> Cancel
                      </span>
                    </div>
                  </div>
                )}
              </div>
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
                filteredFlights.length > 0 ? (
                  filteredFlights.map((ticket, i) => {
                    const ticketId = ticket.id;
                    const currentMarkup = ticketMarkups[ticketId] ?? markup;
                    return (
                      <div key={ticketId}>
                        {isMobile ? (
                          <TicketCardMobile
                            ticket={ticket}
                            markup={currentMarkup}
                            allTicketMarkups={ticketMarkups}
                            onPriceClick={(ticketId, markup, ticketObj, fareIndex) => {
                              const prevSegments = Object.keys(selectedFlights)
                                .filter(key => parseInt(key) < tabIndex)
                                .map(key => ({
                                  ticket: selectedFlights[key].ticket,
                                  selectedPriceIndex: selectedFlights[key].selectedPriceIndex
                                }));
                              onPriceClick && onPriceClick(ticketId, markup, ticketObj, fareIndex, prevSegments);
                            }}
                            onSelect={(selectedFare, selectedFareIndex) => {
                              const fareFD = selectedFare.fd;
                              const specificMarkup = ticketMarkups[`${ticket.id}_${selectedFareIndex}`];
                              const ticketLevelMarkup = ticketMarkups[ticket.id] ?? markup;
                              const finalMarkup = specificMarkup ?? ticketLevelMarkup;

                              const totalPrice = calculateTotalFare(
                                fareFD,
                                adultCount,
                                childCount,
                                infantCount,
                                getCookie,
                                finalMarkup
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
                                markup: finalMarkup,
                                adultFare: new Intl.NumberFormat("en-IN").format(
                                  fareFD.ADULT?.fC?.NF || 0
                                ),
                                ticket: ticket,
                                selectedPriceIndex: selectedFareIndex
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
                          />
                        ) : (
                          <MulticityTicketCardDesktop
                            ticket={ticket}
                            i={i}
                            tabIndex={tabIndex}
                            selectedFares={selectedFares}
                            setSelectedFare={setSelectedFare}
                            filters={filters}
                            markup={markup}
                            ticketMarkups={ticketMarkups}
                            onPriceClick={onPriceClick}
                            shareMode={shareMode}
                            selectedQuoteFlights={selectedQuoteFlights}
                            handleQuoteSelectionChange={handleQuoteSelectionChange}
                            isUat={isUat}
                            adultCount={adultCount}
                            childCount={childCount}
                            infantCount={infantCount}
                            selectedFlights={selectedFlights}
                            setSelectedFlights={setSelectedFlights}
                            setActiveTabKey={setActiveTabKey}
                            matchedFlightsLength={matchedFlights.length}
                          />
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                    <p className="text-xl font-semibold">
                      No flights found for your filter criteria.
                    </p>
                    <p className="text-sm mt-2 text-gray-400">
                      Try adjusting your filters to see more results.
                    </p>
                  </div>
                )
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
      <QuoteShareModal
        isOpen={isQuoteSharing}
        onClose={() => setIsQuoteSharing(false)}
        onSend={handleEmailSend}
        loading={shareLoading}
      />
    </>
  );
}
