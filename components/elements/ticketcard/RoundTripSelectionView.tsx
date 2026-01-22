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
import { Drawer, Button, message } from "antd";
import { ShareAltOutlined, CloseOutlined, FilterOutlined, DownOutlined, MailOutlined } from "@ant-design/icons";
import QuoteShareModal from "@/components/elements/QuoteShareModal";
// import TicketCard1 from "./TicketCard1";

interface SelectedTicket {
  ticket: any;
  selectedPriceIndex: any;
  markup: number;
}

import { postData } from "@/services/NetworkAdapter";

export default function RoundTripSelectionView({ flightData, markup = 0, ticketMarkups = {}, onPriceClick, srx_tripType = "Round Trip" }: any) {
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
  const [onwardPriceSort, setOnwardPriceSort] = useState<"asc" | "desc">("asc");
  const [uniqueFareIdentifiers, setUniqueFareIdentifiers] = useState<any[]>([]);
  const [onwardFlightNumberSearch, setOnwardFlightNumberSearch] = useState("");
  const [onwardSelectedFareTypes, setOnwardSelectedFareTypes] = useState<
    string[]
  >([]);

  // Drawer state for mobile filters
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Quote Sharing State
  const [shareMode, setShareMode] = useState(false);
  const [selectedQuoteFlights, setSelectedQuoteFlights] = useState<any[]>([]);
  const [isQuoteSharing, setIsQuoteSharing] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);

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

  useEffect(() => {
    if (isMobile) {
      setFilterCriteria(true)
    }
  }, [isMobile]);

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
  const [returnPriceSort, setReturnPriceSort] = useState<"asc" | "desc">("asc");
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

  const getTicketPrice = (ticket: any, validFareTypes: string[] = []) => {
    const dfadu = parseInt(Cookies.get("gy_adult") || "1", 10);
    const dfchi = parseInt(Cookies.get("gy_child") || "0", 10);
    const dfinf = parseInt(Cookies.get("gy_infant") || "0", 10);

    const typeMap: { [key: number]: string } = {
      0: "Non Refundable",
      1: "Refundable",
      2: "Partial Refundable",
    };

    let selectedFareIndex = 0;

    // If strict fare types are selected, find the first matching fare Option
    if (validFareTypes && validFareTypes.length > 0) {
      const matchIndex = ticket.totalPriceList.findIndex((priceInfo: any) =>
        Object.values(priceInfo.fd || {}).some((pax: any) => {
          const code = Number(pax?.rT);
          const label = typeMap[code];
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

  const getPriceRangeFromData = (data: any[]) => {
    const prices: number[] = [];

    data.forEach((ticket) => {
      // Note: We use the default Cheapest price for setting the range bounds,
      // as the filters are separate per tab phase and this runs on init/change.
      // If we wanted dynamic range based on Active Fare Type, we'd need to pass state here.
      // For now, keeping it simple as per Tickets.tsx pattern, 
      // but verifying we use getTicketPrice with empty array (default expensive/cheap doesn't matter for ALL data unless filtered).
      // Actually, to get true MIN/MAX of ALL tickets, we should check ALL fare options?
      // Or just the cheapest one? Standard behavior is usually Cheapest Available.
      const price = getTicketPrice(ticket);

      if (price !== undefined) {
        prices.push(price);
      }
    });

    if (prices.length === 0) return [0, 100000];

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return [minPrice, maxPrice];
  };

  useEffect(() => {
    if (flightData && (flightData.ONWARD || flightData.RETURN)) {
      const onwardDataToCheck = flightData.ONWARD || [];
      const returnDataToCheck = flightData.RETURN || [];

      const [onwardMinPrice, onwardMaxPrice] =
        getPriceRangeFromData(onwardDataToCheck);

      const [returnMinPrice, returnMaxPrice] =
        getPriceRangeFromData(returnDataToCheck);

      // Set Onward
      setMinOnwardPriceRange(onwardMinPrice);
      setMaxOnwardPriceRange(onwardMaxPrice);
      setOnwardPriceRange([onwardMinPrice, onwardMaxPrice]);
      setOnwardStops("all");
      setOnwardDepartureTime("all");
      setOnwardArrivalTime("all");
      setOnwardSelectedAirlines([]);
      setOnwardFareIdentifiers([]);
      setOnwardFlightNumberSearch("");
      setOnwardSelectedFareTypes([]);
      setOnwardPriceSort("asc");

      // Set Return
      setMinReturnPriceRange(returnMinPrice);
      setMaxReturnPriceRange(returnMaxPrice);
      setReturnPriceRange([returnMinPrice, returnMaxPrice]);
      setReturnStops("all");
      setReturnDepartureTime("all");
      setReturnArrivalTime("all");
      setReturnSelectedAirlines([]);
      setReturnFareIdentifiers([]);
      setReturnFlightNumberSearch("");
      setReturnSelectedFareTypes([]);
      setReturnPriceSort("asc");
    }
  }, [flightData]);

  const FARE_TYPE_LABEL: Record<number, string> = {
    0: "Non Refundable",
    1: "Refundable",
    2: "Partial Refundable",
  };

  // Helper function for dynamic counts
  const checkPassesFilters = (ticket: any, ignoreFilters: string[] = []) => {
    // Determine active filter states based on tripPhase
    const priceRange = tripPhase === "ONWARD" ? onwardPriceRange : returnPriceRange;
    const stops = tripPhase === "ONWARD" ? onwardStops : returnStops;
    const departureTime = tripPhase === "ONWARD" ? onwardDepartureTime : returnDepartureTime;
    const arrivalTime = tripPhase === "ONWARD" ? onwardArrivalTime : returnArrivalTime;
    const selectedAirlines = tripPhase === "ONWARD" ? onwardSelectedAirlines : returnSelectedAirlines;
    const activeFareIdentifiers = tripPhase === "ONWARD" ? onwardFareIdentifiers : returnFareIdentifiers;
    const activeFareTypes = tripPhase === "ONWARD" ? onwardSelectedFareTypes : returnSelectedFareTypes;
    const flightNumberSearch = tripPhase === "ONWARD" ? onwardFlightNumberSearch : returnFlightNumberSearch;
    const FARE_TYPE_LABEL_LOCAL: Record<number, string> = {
      0: "Non Refundable",
      1: "Refundable",
      2: "Partial Refundable",
    };

    // 1. Strict Fare Type Filter
    if (!ignoreFilters.includes("fareType") && activeFareTypes.length > 0) {
      const passesFareType = ticket.totalPriceList.some((priceInfo: any) =>
        Object.values(priceInfo.fd || {}).some((pax: any) => {
          const code = Number(pax?.rT);
          const label = FARE_TYPE_LABEL_LOCAL[code] ?? code;
          return activeFareTypes.includes(label);
        })
      );
      if (!passesFareType) return false;
    }

    // Fare Identifier Filter
    if (!ignoreFilters.includes("fareIdentifier") && activeFareIdentifiers.length > 0) {
      const passesFareId = ticket.totalPriceList?.some((p: any) => p?.fareIdentifier && activeFareIdentifiers.includes(p.fareIdentifier));
      if (!passesFareId) return false;
    }

    // 2. Price Range Filter
    if (!ignoreFilters.includes("price")) {
      const price = getTicketPrice(ticket, activeFareTypes);
      if (price < priceRange[0] || price > priceRange[1]) return false;
    }

    // Stops Filter
    if (!ignoreFilters.includes("stops") && stops !== "all") {
      const stopCount = ticket.sI.length;
      if (stops === "non-stop" && stopCount !== 1) return false;
      if (stops === "1-stop" && stopCount !== 2) return false;
      if (stops === "2-stops" && stopCount <= 2) return false;
    }

    // Departure Time Filter
    if (!ignoreFilters.includes("departureTime") && departureTime !== "all") {
      const departureHour = new Date(ticket.sI[0].dt).getHours();
      if (departureTime === "early-morning" && !(departureHour >= 0 && departureHour < 6)) return false;
      if (departureTime === "morning" && !(departureHour >= 6 && departureHour < 12)) return false;
      if (departureTime === "afternoon" && !(departureHour >= 12 && departureHour < 18)) return false;
      if (departureTime === "evening" && !(departureHour >= 18 && departureHour < 24)) return false;
    }

    // Arrival Time Filter
    if (!ignoreFilters.includes("arrivalTime") && arrivalTime !== "all") {
      const arrivalHour = new Date(ticket.sI[ticket.sI.length - 1].at).getHours();
      if (arrivalTime === "early-morning" && !(arrivalHour >= 0 && arrivalHour < 6)) return false;
      if (arrivalTime === "morning" && !(arrivalHour >= 6 && arrivalHour < 12)) return false;
      if (arrivalTime === "afternoon" && !(arrivalHour >= 12 && arrivalHour < 18)) return false;
      if (arrivalTime === "evening" && !(arrivalHour >= 18 && arrivalHour < 24)) return false;
    }

    // Airline Filter
    if (!ignoreFilters.includes("airline") && selectedAirlines.length > 0) {
      if (!selectedAirlines.includes(ticket.sI[0].fD.aI.name)) return false;
    }

    if (!ignoreFilters.includes("flightNumber") && flightNumberSearch) {
      const passesFlightNumber = ticket.sI.some((segment: any) => {
        const flightCode = `${segment.fD.aI.code} ${segment.fD.fN}`;
        return flightCode.toLowerCase().includes(flightNumberSearch.toLowerCase());
      });
      if (!passesFlightNumber) return false;
    }

    return true;
  };

  useEffect(() => {
    if (flightData && (flightData.ONWARD || flightData.RETURN)) {
      const dataToCheck = tripPhase === "ONWARD" ? flightData.ONWARD : flightData.RETURN;
      const data = dataToCheck || [];

      // 1. Identify ALL possible Fare Types and Fare Identifiers
      const allFareTypes = new Set<string>();
      const allFareIds = new Set<string>();
      const FARE_TYPE_LABEL_LOCAL: Record<number, string> = {
        0: "Non Refundable",
        1: "Refundable",
        2: "Partial Refundable",
      };

      data.forEach((ticket: any) => {
        ticket.totalPriceList.forEach((priceInfo: any) => {
          // Fare Types
          Object.values(priceInfo.fd || {}).forEach((pax: any) => {
            const rT = Number(pax?.rT);
            const typeName = FARE_TYPE_LABEL_LOCAL[rT];
            if (typeName) allFareTypes.add(typeName);
          });
          // Fare Identifiers
          if (priceInfo.fareIdentifier) allFareIds.add(priceInfo.fareIdentifier);
        });
      });

      // Calculate Fare Type Counts (Ignore Fare Type filter)
      const fareTypesMap: Record<string, number> = {};
      data.forEach((ticket: any) => {
        if (checkPassesFilters(ticket, ["fareType"])) {
          const ticketFareTypes = new Set<string>();
          ticket.totalPriceList.forEach((priceInfo: any) => {
            Object.values(priceInfo.fd || {}).forEach((pax: any) => {
              const rT = Number(pax?.rT);
              const typeName = FARE_TYPE_LABEL_LOCAL[rT];
              if (typeName) ticketFareTypes.add(typeName);
            });
          });

          ticketFareTypes.forEach(ft => {
            fareTypesMap[ft] = (fareTypesMap[ft] || 0) + 1;
          });
        }
      });

      const uniqueFaresWithCounts = Array.from(allFareTypes).map(fareType => ({
        name: fareType,
        count: fareTypesMap[fareType] || 0
      }));
      setUniqueFareTypes(uniqueFaresWithCounts);

      // Calculate Fare Identifier Counts (Ignore Fare Identifier filter)
      const fareIdMap: Record<string, number> = {};

      data.forEach((ticket: any) => {
        if (checkPassesFilters(ticket, ["fareIdentifier"])) {
          const ticketFareIds = new Set<string>();
          ticket.totalPriceList.forEach((priceInfo: any) => {
            if (priceInfo.fareIdentifier) ticketFareIds.add(priceInfo.fareIdentifier);
          });

          ticketFareIds.forEach(fid => {
            fareIdMap[fid] = (fareIdMap[fid] || 0) + 1;
          });
        }
      });

      const uniqueIdsWithCounts = Array.from(allFareIds).map(fid => ({
        name: fid,
        count: fareIdMap[fid] || 0
      }));

      setUniqueFareIdentifiers(uniqueIdsWithCounts);
    }
  }, [
    flightData,
    tripPhase,
    onwardPriceRange, onwardStops, onwardDepartureTime, onwardArrivalTime, onwardSelectedAirlines, onwardFareIdentifiers, onwardFlightNumberSearch, onwardSelectedFareTypes,
    returnPriceRange, returnStops, returnDepartureTime, returnArrivalTime, returnSelectedAirlines, returnFareIdentifiers, returnFlightNumberSearch, returnSelectedFareTypes
  ]);

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

    // 1. Strict Fare Type Filter (Priority)
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

    // 2. Price Range Filter (Use getTicketPrice with activeFareTypes)
    filteredData = filteredData.filter((ticket: any) => {
      const price = getTicketPrice(ticket, activeFareTypes);
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
        return ticket.sI.some((segment: any) => {
          const flightCode = `${segment.fD.aI.code} ${segment.fD.fN}`;
          return flightCode.toLowerCase().includes(onwardFlightNumberSearch.toLowerCase());
        });
      });
    }

    if (tripPhase === "RETURN" && returnFlightNumberSearch) {
      filteredData = filteredData.filter((ticket: any) => {
        return ticket.sI.some((segment: any) => {
          const flightCode = `${segment.fD.aI.code} ${segment.fD.fN}`;
          return flightCode.toLowerCase().includes(returnFlightNumberSearch.toLowerCase());
        });
      });
    }

    const currentPriceSort =
      tripPhase === "ONWARD" ? onwardPriceSort : returnPriceSort;

    if (currentPriceSort === "asc") {
      filteredData.sort(
        (a: any, b: any) =>
          getTicketPrice(a, activeFareTypes) -
          getTicketPrice(b, activeFareTypes)
      );
    } else if (currentPriceSort === "desc") {
      filteredData.sort(
        (a: any, b: any) =>
          getTicketPrice(b, activeFareTypes) -
          getTicketPrice(a, activeFareTypes)
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
    onwardSelectedFareTypes,
    returnSelectedFareTypes,
    onwardPriceSort,
    returnPriceSort,
  ]);

  const handleTicketSelected = (ticket: any, selectedPriceIndex: number, ticketMarkup: number = 0) => {
    if (tripPhase === "ONWARD") {
      setSelectedOnwardTicket({ ticket, selectedPriceIndex, markup: ticketMarkup }); // save selected onward
      setCurrentTickets(flightData.RETURN); // move to return flights
      setTripPhase("RETURN");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Quote Sharing Handlers
  const handleQuoteSelectionChange = (ticket: any, fareIndex: number, isChecked: boolean) => {
    if (isChecked) {
      // Add to selection
      setSelectedQuoteFlights((prev) => [
        ...prev,
        {
          ticketId: ticket.id,
          fareIndex,
          ticketData: ticket, // Store full ticket data for email
          // Add phase info purely for reference if needed, though flight data usually has it
          phase: tripPhase
        },
      ]);
    } else {
      // Remove from selection
      setSelectedQuoteFlights((prev) =>
        prev.filter(
          (item) => !(item.ticketId === ticket.id && item.fareIndex === fareIndex)
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

  const handleEmailSend = async (emails: string[], withPrice: boolean) => {
    setShareLoading(true);
    try {
      const classLabels: any = {
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
            ...item.ticketData, // Pass the full ticket object
            ticket: item.ticketData,
            fare: item.ticketData.totalPriceList[item.fareIndex],
            fareIndex: item.fareIndex,
            markup: itemMarkup,
            phase: item.phase // Pass the phase (ONWARD/RETURN)
          };
        }),
        tripType: srx_tripType,
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

  const handleResetAllFilters = () => {
    if (tripPhase === "ONWARD") {
      setOnwardPriceRange([minOnwardPriceRange, maxOnwardPriceRange]);
      setOnwardStops("all");
      setOnwardDepartureTime("all");
      setOnwardArrivalTime("all");
      setOnwardSelectedAirlines([]);
      setOnwardFareIdentifiers([]);
      setOnwardFlightNumberSearch("");
      setOnwardSelectedFareTypes([]);
      setOnwardPriceSort("asc");
    } else {
      setReturnPriceRange([minReturnPriceRange, maxReturnPriceRange]);
      setReturnStops("all");
      setReturnDepartureTime("all");
      setReturnArrivalTime("all");
      setReturnSelectedAirlines([]);
      setReturnFareIdentifiers([]);
      setReturnFlightNumberSearch("");
      setReturnSelectedFareTypes([]);
      setReturnPriceSort("asc");
    }
  };

  const isFilterApplied = React.useMemo(() => {
    if (tripPhase === "ONWARD") {
      return (
        onwardStops !== "all" ||
        onwardDepartureTime !== "all" ||
        onwardArrivalTime !== "all" ||
        onwardSelectedAirlines.length > 0 ||
        onwardFareIdentifiers.length > 0 ||
        onwardFlightNumberSearch !== "" ||
        onwardSelectedFareTypes.length > 0 ||
        onwardPriceSort !== "asc" ||
        onwardPriceRange[0] !== minOnwardPriceRange ||
        onwardPriceRange[1] !== maxOnwardPriceRange
      );
    } else {
      return (
        returnStops !== "all" ||
        returnDepartureTime !== "all" ||
        returnArrivalTime !== "all" ||
        returnSelectedAirlines.length > 0 ||
        returnFareIdentifiers.length > 0 ||
        returnFlightNumberSearch !== "" ||
        returnSelectedFareTypes.length > 0 ||
        returnPriceSort !== "asc" ||
        returnPriceRange[0] !== minReturnPriceRange ||
        returnPriceRange[1] !== maxReturnPriceRange
      );
    }
  }, [
    tripPhase,
    onwardStops,
    onwardDepartureTime,
    onwardArrivalTime,
    onwardSelectedAirlines,
    onwardFareIdentifiers,
    onwardFlightNumberSearch,
    onwardSelectedFareTypes,
    onwardPriceSort,
    onwardPriceRange,
    minOnwardPriceRange,
    maxOnwardPriceRange,
    returnStops,
    returnDepartureTime,
    returnArrivalTime,
    returnSelectedAirlines,
    returnFareIdentifiers,
    returnFlightNumberSearch,
    returnSelectedFareTypes,
    returnPriceSort,
    returnPriceRange,
    minReturnPriceRange,
    maxReturnPriceRange,
  ]
  );

  const activeFilterCount = React.useMemo(() => {
    let count = 0;
    if (tripPhase === "ONWARD") {
      if (onwardStops !== "all") count++;
      if (onwardDepartureTime !== "all") count++;
      if (onwardArrivalTime !== "all") count++;
      if (onwardSelectedAirlines.length > 0) count++;
      if (onwardFareIdentifiers.length > 0) count++;
      if (onwardFlightNumberSearch !== "") count++;
      if (onwardSelectedFareTypes.length > 0) count++;
      if (onwardPriceSort !== "asc") count++;
      if (
        onwardPriceRange[0] !== minOnwardPriceRange ||
        onwardPriceRange[1] !== maxOnwardPriceRange
      )
        count++;
    } else {
      if (returnStops !== "all") count++;
      if (returnDepartureTime !== "all") count++;
      if (returnArrivalTime !== "all") count++;
      if (returnSelectedAirlines.length > 0) count++;
      if (returnFareIdentifiers.length > 0) count++;
      if (returnFlightNumberSearch !== "") count++;
      if (returnSelectedFareTypes.length > 0) count++;
      if (returnPriceSort !== "asc") count++;
      if (
        returnPriceRange[0] !== minReturnPriceRange ||
        returnPriceRange[1] !== maxReturnPriceRange
      )
        count++;
    }
    return count;
  }, [
    tripPhase,
    onwardStops,
    onwardDepartureTime,
    onwardArrivalTime,
    onwardSelectedAirlines,
    onwardFareIdentifiers,
    onwardFlightNumberSearch,
    onwardSelectedFareTypes,
    onwardPriceSort,
    onwardPriceRange,
    minOnwardPriceRange,
    maxOnwardPriceRange,
    returnStops,
    returnDepartureTime,
    returnArrivalTime,
    returnSelectedAirlines,
    returnFareIdentifiers,
    returnFlightNumberSearch,
    returnSelectedFareTypes,
    returnPriceSort,
    returnPriceRange,
    minReturnPriceRange,
    maxReturnPriceRange,
  ]);

  const renderFilters = () => (
    <>
      {isFilterApplied && (
        // <div className="sticky top-36 lg:top-48 z-50 mb-2 flex justify-between items-center bg-white px-3 py-2 rounded shadow-sm border border-gray-100">
        <div className={`sticky ${filterCriteria ? 'top-0' : 'top-36 lg:top-48'} z-50 mb-2 flex justify-between items-center bg-white px-3 py-2 rounded shadow-sm border border-gray-100`}>
          <span className="text-black font-bold text-sm">Applied Filters <span className="text-gray-500 font-normal">({activeFilterCount})</span> :</span>
          <Button
            type="link"
            onClick={handleResetAllFilters}
            className="p-0 h-auto text-orange-500 font-bold hover:text-orange-600 text-sm"
            style={{ color: "#f97316" }}
          >
            Reset All
          </Button>
        </div>
      )}

      <div className="mb-2 bg-white px-3 py-2 rounded shadow-sm border border-gray-100">
        <div className="text-black font-bold text-sm mb-2">Filter Price</div>
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

      <div className="mb-2 bg-white px-3 py-2 rounded shadow-sm border border-gray-100 flex items-center justify-between gap-3">
        <div className="text-black font-bold text-sm whitespace-nowrap">Sort by Price</div>
        <div className="flex-1 min-w-0">
          <BySortPrice
            sort={tripPhase === "ONWARD" ? onwardPriceSort : returnPriceSort}
            setSort={
              tripPhase === "ONWARD" ? setOnwardPriceSort : setReturnPriceSort
            }
          />
        </div>
      </div>

      <div className="mb-2 bg-white px-3 py-2 rounded shadow-sm border border-gray-100 flex items-center justify-between gap-3">
        <div className="text-black font-bold text-sm whitespace-nowrap">Stops</div>
        <div className="flex-1 min-w-0">
          <ByStops
            stops={tripPhase === "ONWARD" ? onwardStops : returnStops}
            setStops={
              tripPhase === "ONWARD" ? setOnwardStops : setReturnStops
            }
          />
        </div>
      </div>

      <div className="mb-2 bg-white px-3 py-2 rounded shadow-sm border border-gray-100">
        <div className="text-black font-bold text-sm mb-2">Departure Time</div>
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

      <div className="mb-2 bg-white px-3 py-2 rounded shadow-sm border border-gray-100">
        <div className="text-black font-bold text-sm mb-2">Arrival Time</div>
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

      <div className="mb-2 bg-white px-3 py-2 rounded shadow-sm border border-gray-100">
        <div className="text-black font-bold text-sm mb-2">Airlines</div>
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

      <div className="mb-2 bg-white px-3 py-2 rounded shadow-sm border border-gray-100">
        <div className="text-black font-bold text-sm mb-2">Fare Identifier</div>
        <div className="box-collapse scrollFilter">
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

      <div className="mb-2 bg-white px-3 py-2 rounded shadow-sm border border-gray-100">
        <div className="text-black font-bold text-sm mb-2">Flight Number</div>
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

      <div className="mb-2 bg-white px-3 py-2 rounded shadow-sm border border-gray-100">
        <div className="text-black font-bold text-sm mb-2">Fare Type</div>
        <div className="box-collapse scrollFilter">
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
        zIndex={10000001}
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
              <div className="flex border-b">
                <div
                  className={`flex-1 p-1 text-center cursor-pointer font-bold ${tripPhase === "ONWARD"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                  onClick={() => setTripPhase("ONWARD")}
                >
                  Departure to {departureFrom}
                </div>
                <div
                  className={`flex-1 p-1 text-center cursor-pointer font-bold ${tripPhase === "RETURN"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                  onClick={() => setTripPhase("RETURN")}
                >
                  Return from {arrivalTo}
                </div>
              </div>

              {/* Share Toolbar */}
              <div className="sticky top-32 lg:top-48 z-10 mb-2 flex justify-end items-center bg-white p-2 rounded shadow-sm border border-gray-100 mx-2" style={{ marginRight: '10px', marginLeft: '10px' }}>
                {!shareMode ? (
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <ShareAltOutlined />
                    <span className="font-semibold">Share By :</span>
                    {/* <span className="cursor-pointer hover:text-green-600 font-medium">Whatsapp</span> | */}
                    <span
                      className="cursor-pointer hover:text-blue-800 font-medium text-blue-600 flex items-center gap-1 transition-colors"
                      onClick={() => setShareMode(true)}
                    >
                      <MailOutlined />
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
                        Send <ShareAltOutlined />
                      </span>
                      <span
                        className="cursor-pointer text-gray-500 hover:text-gray-700 flex items-center gap-1 ml-2"
                        onClick={() => {
                          setShareMode(false);
                          setSelectedQuoteFlights([]);
                        }}
                      >
                        <CloseOutlined />
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="box-list-flights box-list-flights-2"
                style={{ padding: "10px" }}
              >
                {currentTickets.map((ticket: any, index: number) => {
                  const ticketId = generateStableId(ticket);
                  return (
                    <DomesticRoundTripTicketCard
                      // ticket={ticket}
                      ticket={{ ...ticket, id: ticketId }}
                      handleTicketSelected={handleTicketSelected}
                      tripPhase={tripPhase}
                      selectedOnwardTicket={selectedOnwardTicket}
                      key={ticketId}
                      allTicketMarkups={ticketMarkups}
                      markup={ticketMarkups[ticketId] ?? markup}
                      onPriceClick={(id: string, m: number, t: any, fIdx: number) => {
                        const prevTickets = [];
                        if (tripPhase === "RETURN" && selectedOnwardTicket) {
                          prevTickets.push(selectedOnwardTicket);
                        }
                        onPriceClick(ticketId, m, t, fIdx, prevTickets);
                      }}
                      shareMode={shareMode}
                      selectedQuoteFlights={selectedQuoteFlights}
                      onQuoteSelectionChange={handleQuoteSelectionChange}
                      selectedFareTypes={
                        tripPhase === "ONWARD"
                          ? onwardSelectedFareTypes
                          : returnSelectedFareTypes
                      }
                      selectedFareIdentifiers={
                        tripPhase === "ONWARD"
                          ? onwardFareIdentifiers
                          : returnFareIdentifiers
                      }
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
          className="items-center p-2 border border-yellow-300 rounded-md mb-1 shadow-sm a"
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
                className="mobile-view p-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] cursor-pointer"
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

                        const tId = selectedOnwardTicket.ticket.id;
                        const pIdx = selectedOnwardTicket.selectedPriceIndex;
                        const specific = ticketMarkups[`${tId}_${pIdx}`];
                        const fallback = ticketMarkups[tId] ?? markup;
                        const finalMarkup = specific ?? fallback ?? 0;

                        return new Intl.NumberFormat("en-IN").format(
                          adultCost + childCost + infantCost + (Number(finalMarkup) || 0)
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
                zIndex={10000001}
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
                <p className="text-xs font-semibold text-white mb-1">Selected Departure Flight</p>
                <div className="flex justify-evenly">
                  {selectedOnwardTicket?.ticket?.sI?.map((segment: any, index: number) => (
                    <div key={index} className="mb-1 w-[50%] justify-around items-center border border-white rounded px-2 py-0.5 flex" style={{ margin: "1px", width: "50%" }}>
                      {isUat && (
                        <img
                          style={{
                            width: "24px",
                            height: "24px",
                            padding: "1px",
                          }}
                          src={`/assets/imgs/airlines/${segment["fD"].aI.code}.png`}
                        />
                      )}
                      {!isUat && (
                        <img
                          style={{
                            width: "24px",
                            height: "24px",
                            padding: "1px",
                          }}
                          src={`/assets/imgs/airlines/${segment["fD"].aI.code.toLowerCase()}.png`}
                        />
                      )}
                      <div>
                        <p className="text-xs font-semibold text-white">{segment.da.city}</p>
                        <p className="text-xs font-semibold text-white">{dayjs(segment.dt).format("hh:mm A")}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-[10px] font-semibold text-white">{Math.floor(segment.duration / 60)}h {segment.duration % 60}m</p>
                        <img src="https://edge.ixigo.com/st/vimaan/_next/static/media/line.9641f579.svg" alt="" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">{segment.aa.city}</p>
                        <p className="text-xs font-semibold text-white">{dayjs(segment.at).format("hh:mm A")}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-right mt-1 mr-4">
                  <p className="text-xs text-white font-medium">
                    Fare: ₹
                    {(() => {
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

                      const tId = selectedOnwardTicket.ticket.id;
                      const pIdx = selectedOnwardTicket.selectedPriceIndex;
                      const specific = ticketMarkups[`${tId}_${pIdx}`];
                      const fallback = ticketMarkups[tId] ?? markup;
                      const finalMarkup = specific ?? fallback ?? 0;

                      return new Intl.NumberFormat("en-IN").format(
                        adultCost + childCost + infantCost + (Number(finalMarkup) || 0)
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
      {/* Quote Share Modal */}
      <QuoteShareModal
        isOpen={isQuoteSharing}
        onClose={() => setIsQuoteSharing(false)}
        onSend={handleEmailSend}
        loading={shareLoading}
      />
    </>
  );
}
