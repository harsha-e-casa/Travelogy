import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "@/util/AppContext";
import dayjs from "dayjs";
import DomesticRoundTripTicketCard from "./DomesticRoundTripTicketCard";
import ByPrice from "@/components/Filter/ByPrice";
import ByStops from "@/components/Filter/ByStops";
import ByDepartureTime from "@/components/Filter/ByDepartureTime";
import ByArrivalTime from "@/components/Filter/ByArrivalTime";
import ByAirline from "@/components/Filter/ByAirline";
import ByFareIdentifier from "@/components/Filter/ByFareIdentifier";
import ByAirlineSearch from "@/components/Filter/ByAirlineSearch";
import ByFareType from "@/components/Filter/ByFareType";
import Cookies from "js-cookie";
import BySortPrice from "@/components/Filter/BySortPrice";
import { Drawer, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
// import TicketCard1 from "./TicketCard1";

interface SelectedTicket {
  ticket: any;
  selectedPriceIndex: any;
}

export default function RoundTripSelectionView({ flightData, markup = 0, ticketMarkups = {}, onPriceClick }: any) {
  const isUat = process.env.UAT_ENV === "true";
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { getCookie } = useContext(AppContext);
  const departureFrom = getCookie("gy_da_str");
  const arrivalTo = getCookie("gy_aa_str");
  const [selectedOnwardTicket, setSelectedOnwardTicket] =
    useState<SelectedTicket | null>(null);
  const [currentTickets, setCurrentTickets] = useState(flightData.ONWARD);
  const [tripPhase, setTripPhase] = useState<"ONWARD" | "RETURN">("ONWARD");

  const [onwardPriceRange, setOnwardPriceRange] = useState([0, 10000000]);
  const [minOnwardPriceRange, setMinOnwardPriceRange] = useState<any>(null);
  const [maxOnwardPriceRange, setMaxOnwardPriceRange] = useState<any>(null);
  const [onwardStops, setOnwardStops] = useState("all");
  const [onwardDepartureTime, setOnwardDepartureTime] = useState("all");
  const [onwardArrivalTime, setOnwardArrivalTime] = useState("all");
  const [onwardSelectedAirlines, setOnwardSelectedAirlines] = useState<
    string[]
  >([]);
  const [onwardFareIdentifiers, setOnwardFareIdentifiers] = useState<string[]>(
    []
  );
  const [priceSort, setPriceSort] = useState<"asc" | "desc">("asc");
  const [uniqueFareIdentifiers, setUniqueFareIdentifiers] = useState<any[]>([]);
  const [onwardFlightNumberSearch, setOnwardFlightNumberSearch] = useState("");
  const [onwardSelectedFareTypes, setOnwardSelectedFareTypes] = useState<
    string[]
  >([]);

  // Drawer state for mobile filters
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Detecting the window size to set `isMobile`
    const handleResize = () => {
      if (window.innerWidth <= 770) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Set initial value on mount
    handleResize();

    // Listen for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showFilterDrawer = () => {
    setFilterDrawerOpen(true);
  };

  const onCloseFilterDrawer = () => {
    setFilterDrawerOpen(false);
  };
  const [uniqueFareTypes, setUniqueFareTypes] = useState<any[]>([]);

  const [returnPriceRange, setReturnPriceRange] = useState([0, 10000000]);
  const [minReturnPriceRange, setMinReturnPriceRange] = useState<any>(null);
  const [maxReturnPriceRange, setMaxReturnPriceRange] = useState<any>(null);
  const [returnStops, setReturnStops] = useState("all");
  const [returnDepartureTime, setReturnDepartureTime] = useState("all");
  const [returnArrivalTime, setReturnArrivalTime] = useState("all");
  const [returnSelectedAirlines, setReturnSelectedAirlines] = useState<
    string[]
  >([]);
  const [returnFareIdentifiers, setReturnFareIdentifiers] = useState<string[]>(
    []
  );
  const [returnFlightNumberSearch, setReturnFlightNumberSearch] = useState("");
  const [returnSelectedFareTypes, setReturnSelectedFareTypes] = useState<
    string[]
  >([]);

  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  useEffect(() => {
    if (
      getCookie("gy_adult") !== undefined &&
      getCookie("gy_adult") !== "Nan"
    ) {
      setAdultCount(getCookie("gy_adult"));
    }
    if (
      getCookie("gy_child") !== undefined &&
      getCookie("gy_child") !== "Nan"
    ) {
      setChildCount(getCookie("gy_child"));
    }
    if (
      getCookie("gy_infant") !== undefined &&
      getCookie("gy_infant") !== "Nan"
    ) {
      setInfantCount(getCookie("gy_infant"));
    }
  }, []);

  const getTicketPrice = (ticket: any) => {
    const dfadu = parseInt(Cookies.get("gy_adult") || "1", 10);
    const dfchi = parseInt(Cookies.get("gy_child") || "0", 10);
    const dfinf = parseInt(Cookies.get("gy_infant") || "0", 10);

    const adultFare =
      (ticket?.totalPriceList?.[0]?.fd?.ADULT?.fC?.NF ?? 0) * dfadu;
    const childFare =
      (ticket?.totalPriceList?.[0]?.fd?.CHILD?.fC?.NF ?? 0) * dfchi;
    const infantFare =
      (ticket?.totalPriceList?.[0]?.fd?.INFANT?.fC?.NF ?? 0) * dfinf;

    return adultFare + childFare + infantFare + (Number(ticketMarkups[ticket.id] ?? markup) || 0);
  };

  const getPriceRangeFromData = (data: any[]) => {
    const prices: number[] = [];

    const dfadu = parseInt(Cookies.get("gy_adult") || "1", 10);
    const dfchi = parseInt(Cookies.get("gy_child") || "0", 10);
    const dfinf = parseInt(Cookies.get("gy_infant") || "0", 10);

    data.forEach((ticket) => {
      const adultFare =
        (ticket?.totalPriceList?.[0]?.fd?.ADULT?.fC?.NF ?? 0) * (dfadu ?? 0);
      const childFare =
        (ticket?.totalPriceList?.[0]?.fd?.CHILD?.fC?.NF ?? 0) * (dfchi ?? 0);
      const infantFare =
        (ticket?.totalPriceList?.[0]?.fd?.INFANT?.fC?.NF ?? 0) * (dfinf ?? 0);

      const price = adultFare + childFare + infantFare;
      if (price !== undefined) {
        prices.push(price);
      }
    });

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return [minPrice, maxPrice];
  };

  useEffect(() => {
    if (flightData && (flightData.ONWARD || flightData.RETURN)) {
      const onwardDataToCheck = flightData.ONWARD;
      const returnDataToCheck = flightData.RETURN;

      const [onwardMinPrice, onwardMaxPrice] =
        getPriceRangeFromData(onwardDataToCheck);

      const [returnMinPrice, returnMaxPrice] =
        getPriceRangeFromData(returnDataToCheck);

      if (tripPhase === "ONWARD") {
        setMinOnwardPriceRange(onwardMinPrice);
        setMaxOnwardPriceRange(onwardMaxPrice);

        if (
          onwardPriceRange[0] !== onwardMinPrice ||
          onwardPriceRange[1] !== onwardMaxPrice
        ) {
          setOnwardPriceRange([onwardMinPrice, onwardMaxPrice]);
        }
      } else {
        setMinReturnPriceRange(returnMinPrice);
        setMaxReturnPriceRange(returnMaxPrice);

        if (
          returnPriceRange[0] !== returnMinPrice ||
          returnPriceRange[1] !== returnMaxPrice
        ) {
          setReturnPriceRange([returnMinPrice, returnMaxPrice]);
        }
      }
    }
  }, [flightData, tripPhase]);

  const FARE_TYPE_LABEL: Record<number, string> = {
    0: "Non Refundable",
    1: "Refundable",
    2: "Partial Refundable",
  };

  useEffect(() => {
    if (flightData && (flightData.ONWARD || flightData.RETURN)) {
      const dataToCheck =
        tripPhase === "ONWARD" ? flightData.ONWARD : flightData.RETURN;

      const allFareTypes = dataToCheck
        .flatMap((ticket: any, ticketIndex: number) => {
          return ticket.totalPriceList.flatMap(
            (priceInfo: any, priceIndex: number) => {
              return Object.keys(priceInfo.fd).map((paxTypeKey) => {
                return priceInfo.fd[paxTypeKey].rT;
              });
            }
          );
        })
        .filter((val: any) => Number.isFinite(Number(val)));

      console.log("🎯 Final allFareTypes:", allFareTypes);

      const fareTypeCounts = allFareTypes.reduce(
        (acc: any, fareType: string) => {
          acc[fareType] = (acc[fareType] || 0) + 1;
          return acc;
        },
        {}
      );

      const uniqueFaresWithCounts = Object.keys(fareTypeCounts).map(
        (fareType: any) => ({
          name: FARE_TYPE_LABEL[fareType],
          count: fareTypeCounts[fareType],
        })
      );
      setUniqueFareTypes(uniqueFaresWithCounts);
    }
  }, [flightData, tripPhase]);

  useEffect(() => {
    if (flightData && (flightData.ONWARD || flightData.RETURN)) {
      let dataToCheck = [];
      if (tripPhase == "ONWARD") {
        dataToCheck = flightData.ONWARD;
      } else {
        dataToCheck = flightData.RETURN;
      }

      const allFareIdentifiers = dataToCheck
        .flatMap((ticket: any) =>
          ticket.totalPriceList.map(
            (priceInfo: any) => priceInfo.fareIdentifier
          )
        )
        .filter(Boolean);

      const fareCounts = allFareIdentifiers.reduce((acc: any, fare: string) => {
        acc[fare] = (acc[fare] || 0) + 1;
        return acc;
      }, {});

      const uniqueFaresWithCounts = Object.keys(fareCounts).map((fare) => ({
        name: fare,
        count: fareCounts[fare],
      }));

      setUniqueFareIdentifiers(uniqueFaresWithCounts);
    }
  }, [flightData, tripPhase]);

  const generateStableId = (ticket: any) => {
    if (ticket.id) return ticket.id;
    // Generate a stable ID based on flight segments and the base price of the first fare option
    const segments = ticket.sI || [];
    const basePrice = ticket.totalPriceList?.[0]?.fd?.ADULT?.fC?.NF || 0;
    const idString = segments.map((s: any) => `${s.fD?.aI?.code}${s.fD?.fN}_${s.dt}`).join('|');
    return `gen_${idString.replace(/[^a-zA-Z0-9]/g, '')}_${basePrice}`;
  };

  const applyFilters = () => {
    let rawData =
      tripPhase === "ONWARD" ? flightData.ONWARD : flightData.RETURN;

    let filteredData = (rawData || []);
    const priceRange =
      tripPhase === "ONWARD" ? onwardPriceRange : returnPriceRange;
    const stops = tripPhase === "ONWARD" ? onwardStops : returnStops;
    const departureTime =
      tripPhase === "ONWARD" ? onwardDepartureTime : returnDepartureTime;
    const arrivalTime =
      tripPhase === "ONWARD" ? onwardArrivalTime : returnArrivalTime;
    const selectedAirlines =
      tripPhase === "ONWARD" ? onwardSelectedAirlines : returnSelectedAirlines;

    const activeFareIdentifiers =
      tripPhase === "ONWARD" ? onwardFareIdentifiers : returnFareIdentifiers;

    const activeFareTypes =
      tripPhase === "ONWARD"
        ? onwardSelectedFareTypes
        : returnSelectedFareTypes;

    // Price Range Filter
    filteredData = filteredData.filter((ticket: any) => {
      const dfadu = parseInt(Cookies.get("gy_adult") || "1", 10);
      const dfchi = parseInt(Cookies.get("gy_child") || "0", 10);
      const dfinf = parseInt(Cookies.get("gy_infant") || "0", 10);
      const adultFare =
        (ticket?.totalPriceList?.[0]?.fd?.ADULT?.fC?.NF ?? 0) * (dfadu ?? 0);
      const childFare =
        (ticket?.totalPriceList?.[0]?.fd?.CHILD?.fC?.NF ?? 0) * (dfchi ?? 0);
      const infantFare =
        (ticket?.totalPriceList?.[0]?.fd?.INFANT?.fC?.NF ?? 0) * (dfinf ?? 0);

      const price = adultFare + childFare + infantFare;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Stops Filter
    if (stops !== "all") {
      filteredData = filteredData.filter((ticket: any) => {
        if (stops === "non-stop") {
          return ticket.sI.length === 1;
        } else if (stops === "1-stop") {
          return ticket.sI.length === 2;
        } else if (stops === "2-stops") {
          return ticket.sI.length > 2;
        }
        return true;
      });
    }

    // Departure Time Filter
    if (departureTime !== "all") {
      filteredData = filteredData.filter((ticket: any) => {
        const departureHour = new Date(ticket.sI[0].dt).getHours();
        if (departureTime === "early-morning") {
          return departureHour >= 0 && departureHour < 6;
        } else if (departureTime === "morning") {
          return departureHour >= 6 && departureHour < 12;
        } else if (departureTime === "afternoon") {
          return departureHour >= 12 && departureHour < 18;
        } else if (departureTime === "evening") {
          return departureHour >= 18 && departureHour < 24;
        }
        return true;
      });
    }

    // Arrival Time Filter
    if (arrivalTime !== "all") {
      filteredData = filteredData.filter((ticket: any) => {
        const arrivalHour = new Date(
          ticket.sI[ticket.sI.length - 1].at
        ).getHours();
        if (arrivalTime === "early-morning") {
          return arrivalHour >= 0 && arrivalHour < 6;
        } else if (arrivalTime === "morning") {
          return arrivalHour >= 6 && arrivalHour < 12;
        } else if (arrivalTime === "afternoon") {
          return arrivalHour >= 12 && arrivalHour < 18;
        } else if (arrivalTime === "evening") {
          return arrivalHour >= 18 && arrivalHour < 24;
        }
        return true;
      });
    }

    // Airline Filter
    if (selectedAirlines.length > 0) {
      filteredData = filteredData.filter((ticket: any) =>
        selectedAirlines.includes(ticket.sI[0].fD.aI.name)
      );
    }

    if (activeFareIdentifiers.length > 0) {
      filteredData = filteredData.filter((ticket: any) =>
        ticket.totalPriceList?.some(
          (p: any) =>
            p?.fareIdentifier &&
            activeFareIdentifiers.includes(p.fareIdentifier)
        )
      );
    }

    if (tripPhase === "ONWARD" && onwardFlightNumberSearch) {
      filteredData = filteredData.filter((ticket: any) => {
        return ticket.sI.some((segment: any) =>
          segment.fD.fN
            .toLowerCase()
            .includes(onwardFlightNumberSearch.toLowerCase())
        );
      });
    }

    if (tripPhase === "RETURN" && returnFlightNumberSearch) {
      filteredData = filteredData.filter((ticket: any) => {
        return ticket.sI.some((segment: any) =>
          segment.fD.fN
            .toLowerCase()
            .includes(returnFlightNumberSearch.toLowerCase())
        );
      });
    }

    if (activeFareTypes.length > 0) {
      filteredData = filteredData.filter((ticket: any) =>
        (ticket.totalPriceList || []).some((priceInfo: any) =>
          Object.values(priceInfo.fd || {}).some((pax: any) => {
            const code = Number(pax?.rT);
            const label = FARE_TYPE_LABEL[code] ?? code;
            return activeFareTypes.includes(label);
          })
        )
      );
    }

    if (priceSort === "asc") {
      filteredData.sort(
        (a: any, b: any) => getTicketPrice(a) - getTicketPrice(b)
      );
    } else if (priceSort === "desc") {
      filteredData.sort(
        (a: any, b: any) => getTicketPrice(b) - getTicketPrice(a)
      );
    }

    setCurrentTickets(filteredData);
  };

  useEffect(() => {
    applyFilters();
  }, [
    onwardPriceRange,
    onwardStops,
    onwardDepartureTime,
    onwardArrivalTime,
    onwardSelectedAirlines,
    returnPriceRange,
    returnStops,
    returnDepartureTime,
    returnArrivalTime,
    returnSelectedAirlines,
    tripPhase,
    onwardFareIdentifiers,
    returnFareIdentifiers,
    onwardFlightNumberSearch,
    returnFlightNumberSearch,
    onwardSelectedFareTypes,
    returnSelectedFareTypes,
    priceSort,
  ]);

  const handleTicketSelected = (ticket: any, selectedPriceIndex: number) => {
    if (tripPhase === "ONWARD") {
      setSelectedOnwardTicket({ ticket, selectedPriceIndex }); // save selected onward
      setCurrentTickets(flightData.RETURN); // move to return flights
      setTripPhase("RETURN");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderFilters = () => (
    <>
      <div className="sidebar-left border-1 background-body">
        <div className="box-filters-sidebar">
          <div className="block-filter border-1">
            <h6 className="text-lg-bold filter-sty neutral-1000">
              Filter Price{" "}
            </h6>
            <ByPrice
              priceRange={
                tripPhase === "ONWARD" ? onwardPriceRange : returnPriceRange
              }
              setPriceRange={
                tripPhase === "ONWARD"
                  ? setOnwardPriceRange
                  : setReturnPriceRange
              }
              minPriceRange={
                tripPhase === "ONWARD"
                  ? minOnwardPriceRange
                  : minReturnPriceRange
              }
              maxPriceRange={
                tripPhase === "ONWARD"
                  ? maxOnwardPriceRange
                  : maxReturnPriceRange
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
            <h6 className="text-lg-bold filter-sty neutral-1000">Stops</h6>
            <ByStops
              stops={tripPhase === "ONWARD" ? onwardStops : returnStops}
              setStops={
                tripPhase === "ONWARD" ? setOnwardStops : setReturnStops
              }
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
              departureTime={
                tripPhase === "ONWARD"
                  ? onwardDepartureTime
                  : returnDepartureTime
              }
              setDepartureTime={
                tripPhase === "ONWARD"
                  ? setOnwardDepartureTime
                  : setReturnDepartureTime
              }
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
              arrivalTime={
                tripPhase === "ONWARD"
                  ? onwardArrivalTime
                  : returnArrivalTime
              }
              setArrivalTime={
                tripPhase === "ONWARD"
                  ? setOnwardArrivalTime
                  : setReturnArrivalTime
              }
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
                uniqueAirlines={[
                  ...new Set(
                    (tripPhase === "ONWARD"
                      ? flightData.ONWARD
                      : flightData.RETURN
                    )?.map((ticket: any) => ticket.sI[0].fD.aI.name) || []
                  ),
                ]}
                selectedAirlines={
                  tripPhase === "ONWARD"
                    ? onwardSelectedAirlines
                    : returnSelectedAirlines
                }
                setSelectedAirlines={
                  tripPhase === "ONWARD"
                    ? setOnwardSelectedAirlines
                    : setReturnSelectedAirlines
                }
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
              key={`fare-${tripPhase}`}
              fareIdentifiers={
                tripPhase == "ONWARD"
                  ? onwardFareIdentifiers
                  : returnFareIdentifiers
              }
              setFareIdentifiers={
                tripPhase == "ONWARD"
                  ? setOnwardFareIdentifiers
                  : setReturnFareIdentifiers
              }
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
              flightNumberSearch={
                tripPhase == "ONWARD"
                  ? onwardFlightNumberSearch
                  : returnFlightNumberSearch
              }
              setFlightNumberSearch={
                tripPhase == "ONWARD"
                  ? setOnwardFlightNumberSearch
                  : setReturnFlightNumberSearch
              }
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
              selectedFareTypes={
                tripPhase === "ONWARD"
                  ? onwardSelectedFareTypes
                  : returnSelectedFareTypes
              }
              setSelectedFareTypes={
                tripPhase === "ONWARD"
                  ? setOnwardSelectedFareTypes
                  : setReturnSelectedFareTypes
              }
              options={uniqueFareTypes}
            />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Filter Button (Visible < 1200px) */}
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
          {renderFilters()}
        </div>
      </Drawer>

      {/* Main Content */}
      <div className="row">
        {/* Desktop Sidebar (Visible >= 1200px) */}
        <div className="col-xl-3 d-none d-xl-block content-left p-10">
          {renderFilters()}
        </div>

        {/* Ticket List (Full width < 1200px, 9 cols >= 1200px) */}
        <div className="col-xl-9 col-12">
          {currentTickets && currentTickets.length > 0 ? (
            <>
              <div>
                {tripPhase == "ONWARD" ? (
                  <>
                    <h6 className="p-10">Departure to {departureFrom}</h6>
                  </>
                ) : (
                  <h6 className="p-10">Return from {arrivalTo}</h6>
                )}
              </div>
              <div
                className="box-list-flights box-list-flights-2"
                style={{ padding: "10px" }}
              >
                {currentTickets.map((ticket: any, index: number) => {
                  const ticketId = ticket.id;
                  return (
                    <DomesticRoundTripTicketCard
                      ticket={ticket}
                      handleTicketSelected={handleTicketSelected}
                      tripPhase={tripPhase}
                      selectedOnwardTicket={selectedOnwardTicket}
                      key={ticketId}
                      markup={ticketMarkups[ticketId] ?? markup}
                      onPriceClick={(id: string, m: number, t: any, fIdx: number) => onPriceClick(id, m, t, fIdx)}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center text-grey-500 py-12">
              <p className="text-xl font-semibold">No results found</p>
              <p className="text-sm mt-2 text-grey-400">
                Try adjusting your filters or search criteria.
              </p>
            </div>
          )}
        </div>
      </div>
      {selectedOnwardTicket && tripPhase === "RETURN" && (
        <div
          className="items-center p-3 border border-yellow-300 rounded-md mb-4 shadow-sm"
          style={{
            position: "sticky",
            bottom: "0px",
            zIndex: 10,
            background: "#1a1a2e",
            width: "100%",
          }}
        >
          {/* <div className="row">
            <div className="col-lg-11">
              <div>
                <p className="text-sm font-semibold text-white mb-2">
                  Selected Departure Flight
                </p>
                <div className="flex justify-evenly">
                  {selectedOnwardTicket?.ticket?.sI?.map(
                    (segment: any, index: number) => (
                      <div
                        key={index}
                        className="mb-2 w-[50%] justify-around items-center border border-white rounded px-2 py-0.5 flex"
                        style={{ margin: "2px", width: "50%" }}
                      >
                        {isUat && (
                          <img
                            style={{
                              width: "35px",
                              height: "35px",
                              padding: "1px",
                            }}
                            src={`/assets/imgs/airlines/${segment["fD"].aI.code}.png`}
                          />
                        )}
                        {!isUat && (
                          <img
                            style={{
                              width: "35px",
                              height: "35px",
                              padding: "1px",
                            }}
                            src={`/assets/imgs/airlines/${segment[
                              "fD"
                            ].aI.code.toLowerCase()}.png`}
                          />
                        )}
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {segment.da.city}
                          </p>
                          <p className="text-sm font-semibold text-white">
                            {dayjs(segment.dt).format("hh:mm A")}
                          </p>
                        </div>
                        <div className="flex flex-col items-center">
                          <p className="text-sm font-semibold text-white">
                            {Math.floor(segment.duration / 60)}h{" "}
                            {segment.duration % 60}m
                          </p>
                          <img
                            src="https://edge.ixigo.com/st/vimaan/_next/static/media/line.9641f579.svg"
                            alt=""
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {segment.aa.city}
                          </p>
                          <p className="text-sm font-semibold text-white">
                            {dayjs(segment.at).format("hh:mm A")}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <p className="text-sm text-white font-medium">
                Fare: ₹
                {(() => {
                  let adultCost = 0;
                  let childCost = 0;
                  let infantCost = 0;
                  if (
                    selectedOnwardTicket.ticket.totalPriceList[
                      selectedOnwardTicket.selectedPriceIndex
                    ].fd?.ADULT
                  ) {
                    if (
                      getCookie("gy_adult") !== undefined &&
                      getCookie("gy_adult") !== "Nan"
                    ) {
                      adultCost =
                        adultCount *
                        selectedOnwardTicket.ticket.totalPriceList[
                          selectedOnwardTicket.selectedPriceIndex
                        ].fd?.ADULT?.fC?.NF;
                    }
                  }
                  if (
                    selectedOnwardTicket.ticket.totalPriceList[
                      selectedOnwardTicket.selectedPriceIndex
                    ].fd?.CHILD
                  ) {
                    if (
                      getCookie("gy_child") !== undefined &&
                      getCookie("gy_child") !== "Nan"
                    ) {
                      childCost =
                        childCount *
                        selectedOnwardTicket.ticket.totalPriceList[
                          selectedOnwardTicket.selectedPriceIndex
                        ].fd?.CHILD?.fC?.NF;
                    }
                  }
                  if (
                    selectedOnwardTicket.ticket.totalPriceList[
                      selectedOnwardTicket.selectedPriceIndex
                    ].fd?.INFANT
                  ) {
                    if (
                      getCookie("gy_infant") !== undefined &&
                      getCookie("gy_infant") !== "Nan"
                    ) {
                      infantCost =
                        infantCount *
                        selectedOnwardTicket.ticket.totalPriceList[
                          selectedOnwardTicket.selectedPriceIndex
                        ].fd?.INFANT?.fC?.NF;
                    }
                  }

                  return new Intl.NumberFormat("en-IN").format(
                    adultCost + childCost + infantCost
                  );
                })()}{" "}
                <span className="text-xs text-white-500">
                  (
                  {
                    selectedOnwardTicket.ticket.totalPriceList[
                      selectedOnwardTicket.selectedPriceIndex
                    ].fareIdentifier
                  }
                  )
                </span>
              </p>
            </div>
            <div className="col-lg-1">
              <button
                onClick={() => {
                  setSelectedOnwardTicket(null);
                  setTripPhase("ONWARD");
                  setCurrentTickets(flightData.ONWARD);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-sm text-red-500 underline hover:text-red-600"
              >
                Cancel
              </button>
            </div>
          </div> */}
          {isMobile ? (
            <>
              <div
                className="mobile-view p-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] cursor-pointer"
                style={{
                  position: "sticky",
                  bottom: 0,
                  zIndex: 100,
                  backgroundColor: "#fff",
                  borderTop: "1px solid #e0e0e0",
                  width: "100%",
                }}
                onClick={() => setShowDetails(true)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                      Selected Departure
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-gray-800">
                        {selectedOnwardTicket.ticket.sI[0].da.code} &rarr; {selectedOnwardTicket.ticket.sI[selectedOnwardTicket.ticket.sI.length - 1].aa.code}
                      </span>
                      <span className="text-xs text-blue-600 font-medium ml-2">(View Details)</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-bold text-blue-600">
                      ₹{(() => {
                        let adultCost = 0;
                        let childCost = 0;
                        let infantCost = 0;
                        const selectedFare =
                          selectedOnwardTicket.ticket.totalPriceList[
                          selectedOnwardTicket.selectedPriceIndex
                          ];

                        if (selectedFare?.fd?.ADULT) {
                          adultCost = adultCount * selectedFare.fd.ADULT.fC.NF;
                        }
                        if (selectedFare?.fd?.CHILD) {
                          childCost = childCount * selectedFare.fd.CHILD.fC.NF;
                        }
                        if (selectedFare?.fd?.INFANT) {
                          infantCost = infantCount * selectedFare.fd.INFANT.fC.NF;
                        }

                        return new Intl.NumberFormat("en-IN").format(
                          adultCost + childCost + infantCost
                        );
                      })()}
                    </span>
                  </div>
                </div>
              </div>

              <Drawer
                title="Selected Departure Flight"
                placement="bottom"
                onClose={() => setShowDetails(false)}
                open={showDetails}
                height="auto"
                className="mobile-flight-details-drawer"
                styles={{
                  body: { padding: '16px' },
                  header: { padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }
                }}
              >
                <div className="flex flex-col gap-4">
                  {selectedOnwardTicket?.ticket?.sI?.map(
                    (segment: any, index: number) => (
                      <div
                        key={index}
                        className={`flex flex-col gap-3 ${index > 0 ? "pt-4 border-t border-gray-100" : ""
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              isUat
                                ? `/assets/imgs/airlines/${segment["fD"].aI.code}.png`
                                : `/assets/imgs/airlines/${segment[
                                  "fD"
                                ].aI.code.toLowerCase()}.png`
                            }
                            alt={segment["fD"].aI.name}
                            className="w-10 h-10 object-contain p-1 bg-gray-50 rounded"
                            onError={(e: any) => {
                              e.target.src = "/assets/imgs/page/homepage1/flight.png";
                            }}
                          />
                          <div>
                            <p className="font-bold text-gray-800 text-sm">{segment["fD"].aI.name}</p>
                            <p className="text-xs text-gray-500">{segment["fD"].fN} • {segment.stops === 0 ? "Non-stop" : `${segment.stops} Stop(s)`}</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                          <div className="text-center">
                            <p className="text-lg font-bold text-gray-800">{dayjs(segment.dt).format("HH:mm")}</p>
                            <p className="text-xs font-bold text-gray-500">{segment.da.code}</p>
                            <p className="text-[10px] text-gray-400">{dayjs(segment.dt).format("MMM DD")}</p>
                          </div>

                          <div className="flex flex-col items-center gap-1 w-1/3">
                            <span className="text-[10px] text-gray-400">{Math.floor(segment.duration / 60)}h {segment.duration % 60}m</span>
                            <div className="w-full h-[1px] bg-gray-300 relative">
                              <div className="absolute right-0 top-[-3px] w-0 h-0 border-t-[3px] border-t-transparent border-l-[4px] border-l-gray-300 border-b-[3px] border-b-transparent"></div>
                            </div>
                          </div>

                          <div className="text-center">
                            <p className="text-lg font-bold text-gray-800">{dayjs(segment.at).format("HH:mm")}</p>
                            <p className="text-xs font-bold text-gray-500">{segment.aa.code}</p>
                            <p className="text-[10px] text-gray-400">{dayjs(segment.at).format("MMM DD")}</p>
                          </div>
                        </div>
                      </div>
                    )
                  )}

                  <div className="mt-4">
                    <button
                      onClick={() => {
                        setSelectedOnwardTicket(null);
                        setTripPhase("ONWARD");
                        setCurrentTickets(flightData.ONWARD);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setShowDetails(false);
                      }}
                      className="w-full py-3 rounded-lg border border-red-500 text-red-500 font-bold text-sm uppercase hover:bg-red-50 transition-colors"
                    >
                      Change Flight
                    </button>
                  </div>
                </div>
              </Drawer>
            </>
          ) : (
            // Desktop View Layout for Selected Onward Ticket (existing layout)
            <div className="row">
              <div className="col-lg-11">
                <p className="text-sm font-semibold text-white mb-2">Selected Departure Flight</p>
                <div className="flex justify-evenly">
                  {selectedOnwardTicket?.ticket?.sI?.map((segment: any, index: number) => (
                    <div key={index} className="mb-2 w-[50%] justify-around items-center border border-white rounded px-2 py-0.5 flex" style={{ margin: "2px", width: "50%" }}>
                      {isUat && (
                        <img
                          style={{
                            width: "35px",
                            height: "35px",
                            padding: "1px",
                          }}
                          src={`/assets/imgs/airlines/${segment["fD"].aI.code}.png`}
                        />
                      )}
                      {!isUat && (
                        <img
                          style={{
                            width: "35px",
                            height: "35px",
                            padding: "1px",
                          }}
                          src={`/assets/imgs/airlines/${segment["fD"].aI.code.toLowerCase()}.png`}
                        />
                      )}
                      <div>
                        <p className="text-sm font-semibold text-white">{segment.da.city}</p>
                        <p className="text-sm font-semibold text-white">{dayjs(segment.dt).format("hh:mm A")}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-sm font-semibold text-white">{Math.floor(segment.duration / 60)}h {segment.duration % 60}m</p>
                        <img src="https://edge.ixigo.com/st/vimaan/_next/static/media/line.9641f579.svg" alt="" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{segment.aa.city}</p>
                        <p className="text-sm font-semibold text-white">{dayjs(segment.at).format("hh:mm A")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-1">
                <button
                  onClick={() => {
                    setSelectedOnwardTicket(null);
                    setTripPhase("ONWARD");
                    setCurrentTickets(flightData.ONWARD);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-sm text-red-500 underline hover:text-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
