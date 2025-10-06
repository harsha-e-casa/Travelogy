"use client";

import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  Suspense,
} from "react";
import ByAirline from "@/components/Filter/ByAirline";
import ByClass from "@/components/Filter/ByClass";
import ByLocation from "@/components/Filter/ByLocation";
import ByPagination from "@/components/Filter/ByPagination";
import ByPrice from "@/components/Filter/ByPrice";
import ByStops from "@/components/Filter/ByStops";
import ByDepartureTime from "@/components/Filter/ByDepartureTime";
import ByArrivalTime from "@/components/Filter/ByArrivalTime";
import ByRating from "@/components/Filter/ByRating";
import SearchFilterBottom from "@/components/elements/SearchFilterBottom";
import SortTicketsFilter from "@/components/elements/SortTicketsFilter";
import TicketCard1 from "@/components/elements/ticketcard/TicketCard1";
import DomesticRoundTripTicketCard from "@/components/elements/ticketcard/DomesticRoundTripTicketCard";
import RoundTripSelectionView from "@/components/elements/ticketcard/RoundTripSelectionView";
import MulticitySelectionView from "@/components/elements/ticketcard/MulticitySelectionView.jsx";
import Layout from "@/components/layout/Layout";
import SwiperGroupPayment10Slider from "@/components/slider/SwiperGroupPayment10Slider";
// import rawticketsData from "@/util/tickets.json";
import useTicketFilter from "@/util/useTicketFilter";
import EngineTabs from "@/components/searchEngine/engineHeader";
import Link from "next/link";
import { postDataTJ, postData } from "../../services/NetworkAdapter";
import { useSearchParams, useRouter } from "next/navigation";
import { Skeleton, Tooltip } from "antd";
import AppListSearch from "@/components/searchEngine/AppListSearch";
import AppDateRage from "@/components/searchEngine/AppDateRage";
import AppDateRangeFlight from "@/components/searchEngine/AppDateRangeFlight";
import "./customeHeader_1.css";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { tree } from "next/dist/build/templates/app-page";
import { AppContext } from "../../util/AppContext";
import { TravellerForm } from "@/components/searchEngine/TravellerForm";
import { checkTokenExpiry } from "@/services/Utils";
import ByFareIdentifier from "@/components/Filter/ByFareIdentifier";
import ByAirlineSearch from "@/components/Filter/ByAirlineSearch";
import ByFareType from "@/components/Filter/ByFareType";

// Convert ticket ratings from string to number
// const ticketsData = rawticketsData.map((ticket) => ({
//   ...ticket,
//   rating: parseFloat(ticket.rating as string),
// }));

const ticketsData: any = [];

export default function Tickets() {
  // Using custom hook for ticket filter logic
  const {
    filter,
    setFilter,
    sortCriteria,
    setSortCriteria,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    uniqueNames,
    uniqueClasses,
    uniqueLocations,
    uniqueRatings,
    uniqueAirlines,
    filteredTickets,
    sortedTickets,
    totalPages,
    startIndex,
    endIndex,
    paginatedTickets,
    handleCheckboxChange,
    handleSortChange,
    handlePriceRangeChange,
    handleItemsPerPageChange,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
    handleClearFilters,
    startItemIndex,
    endItemIndex,
  } = useTicketFilter(ticketsData);

  const { setCookie, getCookie, removeCookie } = useContext(AppContext);

  type MultiSeg = {
    from: string;
    fromCode: string;
    to: string;
    toCode: string;
    departureDate: Date | null;
    lastEditedField?: "from" | "to";
    // errors
    fromError?: string;
    toError?: string;
    dateError?: string;
  };

  const validateMultiCity = (opts?: { focusFirstError?: boolean }) => {
    let ok = true;
    let firstBadIndex: number | null = null;

    const next = multicitySegments.map((seg, idx, arr) => {
      const e: any = { ...seg };
      e.fromError = "";
      e.toError = "";
      e.dateError = "";
      e.forceOpen = false; // NEW: track if dropdown should stay open

      // --- Empty / Placeholder checks ---
      if (!e.from || !e.fromCode || e.from === "Select City") {
        e.fromError = "Select a valid departure city";
        e.forceOpen = true;
      }
      if (!e.to || !e.toCode || e.to === "Select City") {
        e.toError = "Select a valid arrival city";
        e.forceOpen = true;
      }
      if (!e.departureDate) {
        e.dateError = "Select a date";
        e.forceOpen = true;
      }

      // --- Same city check ---
      if (
        !e.fromError &&
        !e.toError &&
        e.fromCode &&
        e.toCode &&
        e.fromCode === e.toCode
      ) {
        e.toError = "From and To cannot be the same";
        e.forceOpen = true;
      }

      // --- Date order check (ascending) ---
      if (!e.dateError && idx > 0) {
        const prevDate = arr[idx - 1]?.departureDate;
        if (prevDate && e.departureDate) {
          if (dayjs(e.departureDate).isBefore(dayjs(prevDate), "day")) {
            e.dateError = `Date must be on or after previous segment (${dayjs(
              prevDate
            ).format("ddd, MMM D YYYY")})`;
            e.forceOpen = true;
          }
        }
      }

      // --- Track first error for scrolling/focus ---
      if (ok && (e.fromError || e.toError || e.dateError)) {
        ok = false;
        firstBadIndex = idx;
      }

      return e;
    });

    setMulticitySegments(next);

    // --- Set global error message ---
    if (!ok) {
      setErrorMsg(
        "Please fix the highlighted fields in your multi-city itinerary."
      );
      if (opts?.focusFirstError && firstBadIndex !== null) {
        const el = document.querySelector(`[data-seg-row="${firstBadIndex}"]`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      setErrorMsg(""); // clear error if everything is okay
    }

    return ok;
  };

  useEffect(() => {
    removeCookie("travellerInfo");
    removeCookie("mealinfo");
    removeCookie("baggageinfo");
    removeCookie("seatSsr_amount");
    removeCookie("gst_info");
    removeCookie("email");
    removeCookie("number");

    // for loop to remover adult_seat_map-1 till 9 and same goes for child_seat_map-1
    for (let i = 1; i <= 9; i++) {
      removeCookie(`adult_seat_map-${i}`);
      removeCookie(`child_seat_map-${i}`);
    }
  }, []);

  const router = useRouter();
  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    const tokenValid = checkTokenExpiry();

    console.log("tokenValid ==> ", tokenValid);

    if (!tokenValid) {
      localStorage.removeItem("authToken");
      router.push("/login");
    } else {
      setloading(false);
    }
  }, [router]);

  const [flightData, setFlightData] = useState<any>(null);
  const [filteredFlightData, setFilteredFlightData] = useState<any>(null);

  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [minPriceRange, setMinPriceRange] = useState<any>(null);
  const [maxPriceRange, setMaxPriceRange] = useState<any>(null);
  const [stops, setStops] = useState("all");
  const [departureTime, setDepartureTime] = useState("all");
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [arrivalTime, setArrivalTime] = useState("all");
  const [fareIdentifiers, setFareIdentifiers] = useState<string[]>([]);
  const [uniqueFareIdentifiers, setUniqueFareIdentifiers] = useState<any[]>([]);
  const [flightNumberSearch, setFlightNumberSearch] = useState("");
  const [selectedFareTypes, setSelectedFareTypes] = useState<string[]>([]);
  const [uniqueFareTypes, setUniqueFareTypes] = useState<any[]>([]);

  useEffect(() => {
    if (flightData && (flightData.ONWARD || flightData.COMBO)) {
      const dataToCheck = flightData.ONWARD || flightData.COMBO;
      const [minPrice, maxPrice] = getPriceRangeFromData(dataToCheck);

      setMinPriceRange(minPrice);
      setMaxPriceRange(maxPrice);

      if (priceRange[0] !== minPrice || priceRange[1] !== maxPrice) {
        setPriceRange([minPrice, maxPrice]);
      }
    }
  }, [flightData]);

  useEffect(() => {
    if (flightData && (flightData.ONWARD || flightData.COMBO)) {
      const dataToCheck = flightData.ONWARD || flightData.COMBO;
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
  }, [flightData]);

  useEffect(() => {
    if (flightData && (flightData.ONWARD || flightData.COMBO)) {
      const type: any = {
        0: "Non Refundable",
        1: "Refundable",
        2: "Partial Refundable",
      };
      const dataToCheck = flightData.ONWARD || flightData.COMBO;
      // const allFareTypes = dataToCheck.flatMap((ticket: any) =>
      //   ticket.totalPriceList.flatMap((priceInfo: any) =>
      //     Object.keys(priceInfo.fd).map(paxType => priceInfo.fd[paxType].paxType)
      //   )
      // ).filter(Boolean);
      const allFareTypes = dataToCheck
        .flatMap((ticket: any, ticketIndex: number) => {
          return ticket.totalPriceList.flatMap(
            (priceInfo: any, priceIndex: number) => {
              return Object.keys(priceInfo.fd).map((paxTypeKey) => {
                console.log("mame ingeeeeeeeee ",priceInfo.fd[paxTypeKey])
                return (priceInfo.fd[paxTypeKey]?.rT || 0);
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
        (fareType) => ({
          name: type[fareType],
          count: fareTypeCounts[fareType],
        })
      );

      console.log("uniqueFaresWithCounts --> ", uniqueFaresWithCounts);

      setUniqueFareTypes(uniqueFaresWithCounts);
    }
  }, [flightData]);

  const applyFilters = () => {
    console.log("applyFilters ==> ");
    if (flightData && (flightData.ONWARD || flightData.COMBO)) {
      let dataToFilter = flightData.ONWARD || flightData.COMBO;

      // const [minPrice, maxPrice] = getPriceRangeFromData(dataToFilter);
      // setPriceRange([minPrice, maxPrice]);
      // console.log("Min Price:", minPrice, "Max Price:", maxPrice);

      // Price Range Filter
      let filteredData = dataToFilter.filter((ticket: any) => {
        console.log("cccccccccccc 1.2 ", ticket);
        const price = ticket?.totalPriceList?.[0]?.fd?.ADULT?.fC?.NF;
        return price >= priceRange[0] && price <= priceRange[1];
      });

      console.log("cccccccccccc 2", filteredData);

      // Stops Filter
      if (stops !== "all") {
        filteredData = filteredData.filter((ticket: any) => {
          const stopCount = ticket.sI.length;
          if (stops === "non-stop") {
            return stopCount === 1;
          } else if (stops === "1-stop") {
            return stopCount === 2;
          } else if (stops === "2-stops") {
            return stopCount > 2;
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

      // Airline Filter
      if (selectedAirlines.length > 0) {
        filteredData = filteredData.filter((ticket: any) =>
          selectedAirlines.includes(ticket.sI[0].fD.aI.name)
        );
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

      if (fareIdentifiers.length > 0) {
        filteredData = filteredData.filter((ticket: any) => {
          return ticket.totalPriceList.some((priceInfo: any) =>
            fareIdentifiers.includes(priceInfo.fareIdentifier)
          );
        });
      }

      if (flightNumberSearch) {
        filteredData = filteredData.filter((ticket: any) => {
          return ticket.sI.some((segment: any) =>
            segment.fD.fN
              .toLowerCase()
              .includes(flightNumberSearch.toLowerCase())
          );
        });
      }

      if (selectedFareTypes.length > 0) {
        console.log("selectedFareTypes ===> ",selectedFareTypes)
        const typeMap: { [key: number]: string } = {
          0: "Non Refundable",
          1: "Refundable",
          2: "Partial Refundable",
        };

        filteredData = filteredData.filter((ticket: any) => {
          return ticket.totalPriceList.some((priceInfo: any) =>
            Object.keys(priceInfo.fd).some((paxType) => {
              const fareType = typeMap[priceInfo.fd[paxType].rT];
              console.log("fareType -------- ",fareType)
              return selectedFareTypes.includes(fareType);
            })
          );
        });
      }

      setFilteredFlightData(filteredData);
    }
  };

  const getPriceRangeFromData = (data: any[]) => {
    const prices: number[] = [];

    data.forEach((ticket) => {
      const price = ticket?.totalPriceList?.[0]?.fd?.ADULT?.fC?.NF;
      if (price !== undefined) {
        prices.push(price);
      }
    });

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return [minPrice, maxPrice];
  };

  useEffect(() => {
    applyFilters();
  }, [
    priceRange,
    stops,
    departureTime,
    selectedAirlines,
    arrivalTime,
    fareIdentifiers,
    flightNumberSearch,
    selectedFareTypes,
    flightData,
  ]);

  const [activeFlight, setActiveFlight] = useState<any>(true);

  // const router = useRouter();
  // const searchParams = useSearchParams();

  // const requestId = searchParams.get("requestId");
  // console.log("requestIdrequestIdrequestId ", requestId);

  // Extract query parameters from the URL
  // const departureFrom   =  searchParams.get('departureFrom')
  // const arrivalTo       =  searchParams.get('arrivalTo')
  // const adults          =  searchParams.get('adults')
  // const children        =  searchParams.get('children')
  // const cabinType       =  searchParams.get('cabinType')
  // const departDate      =  searchParams.get('departDate')

  // const departureFromSr =  searchParams.get('gy_da_str')
  // const arrivalToSr     =  searchParams.get('gy_aa_str');

  const departureFrom = getCookie("gy_da");
  const arrivalTo = getCookie("gy_aa");
  if (getCookie("gy_adult") == undefined || getCookie("gy_adult") == "Nan") {
    setCookie("gy_adult", 1);
  }
  if (getCookie("gy_child") == undefined || getCookie("gy_child") == "Nan") {
    setCookie("gy_child", 0);
  }

  const adults = getCookie("gy_adult");
  const children = getCookie("gy_child");
  const cabinType = getCookie("gy_class");
  const departDate = getCookie("gy_trd");
  const returnDate = getCookie("gy_return");

  const departureFromSr = getCookie("gy_da_str");
  const arrivalToSr = getCookie("gy_aa_str");
  const tripType = getCookie("gy_triptype");
  const fareType = getCookie("gy_passender_type");
  const passengerType = getCookie("gy_passender_type");
  const isDirectFlight =
    String(getCookie("gy_direct_flight") || "false").toLowerCase() === "true";
  const infant = getCookie("gy_infant");

  const [multicitySegments, setMulticitySegments] = useState(() => {
    const cookieValue = getCookie("gy_multi_city");
    console.error("existing multi city value in cookie: ", cookieValue);

    const addErrorFields = (segment: any) => ({
      ...segment,
      fromError: "",
      toError: "",
      lastEditedField: null,
    });

    try {
      const parsed = cookieValue ? JSON.parse(cookieValue) : null;

      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(addErrorFields);
      }

      return [
        addErrorFields({
          from: "Select City",
          fromCode: "NIL",
          to: "Select City",
          toCode: "NIL",
          departureDate: "",
        }),
      ];
    } catch (e) {
      console.error("Failed to parse multi-city cookie:", e);
      return [
        addErrorFields({
          from: "Delhi",
          fromCode: "DEL",
          to: "Bengaluru",
          toCode: "BLR",
          departureDate: "",
        }),
      ];
    }
  });

  useEffect(() => {
    setCookie("gy_multi_city", JSON.stringify(multicitySegments));
  }, [multicitySegments]);

  const [errorMsg, setErrorMsg] = useState("");
  const [dateError, setDateError] = useState("");
  const [srx_tripType, setTripType] = useState(tripType);

  useEffect(() => {
    if (srx_tripType === "multi-city") {
      // Check for empty fields
      for (const segment of multicitySegments) {
        if (!segment.fromCode || !segment.toCode || !segment.departureDate) {
          setErrorMsg("Please fill all fields in each segment.");
          return;
        }
      }

      // Check for ascending dates
      for (let i = 0; i < multicitySegments.length - 1; i++) {
        const currentSegment = multicitySegments[i];
        const nextSegment = multicitySegments[i + 1];
        if (
          currentSegment.departureDate &&
          nextSegment.departureDate &&
          dayjs(currentSegment.departureDate).isAfter(
            dayjs(nextSegment.departureDate)
          )
        ) {
          setDateError("Departure dates must be in ascending order.");
          return;
        }
      }
    }
    setErrorMsg("");
    setDateError("");
  }, [multicitySegments, srx_tripType]);

  const addSegment = () => {
    const lastSegment = multicitySegments[multicitySegments.length - 1];

    if (
      !lastSegment ||
      !lastSegment.fromCode ||
      !lastSegment.toCode ||
      !lastSegment.departureDate
    ) {
      setErrorMsg(
        "Please fill in the previous segment before adding a new one."
      );
      return;
    }

    setErrorMsg(""); // Clear error if validation passed

    const displayDate = dayjs().add(2, "day");
    setMulticitySegments((prev) => [
      ...prev,
      {
        from: "Select City",
        fromCode: "",
        to: "Select City",
        toCode: "",
        departureDate: displayDate,
        fromError: "",
        toError: "",
        lastEditedField: null,
      },
    ]);
  };

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  const [openFromMultiIndex, setOpenFromMultiIndex] = useState<number | null>(
    null
  );
  const [openToMultiIndex, setOpenToMultiIndex] = useState<number | null>(null);

  useEffect(() => {
    let needsUpdate = false;
    const updatedSegments = multicitySegments.map((segment, idx) => {
      console.log("segmentsegmentsegment ==> ", segment);
      const newSegment = { ...segment };
      let fromError = "";
      let toError = "";

      if (
        segment.fromCode &&
        segment.toCode &&
        segment.fromCode === segment.toCode
      ) {
        if (segment.lastEditedField === "from") {
          fromError = "1 From and To cities cannot be the same.";
        } else if (segment.lastEditedField === "to") {
          toError = "1 From and To cities cannot be the same.";
        }
      }

      if (segment.from === "Select City" && openFromMultiIndex !== idx) {
        fromError = "Select a City";
      }

      if (segment.to === "Select City" && openToMultiIndex !== idx) {
        toError = "Select a City";
      }

      if (newSegment.fromError !== fromError) {
        newSegment.fromError = fromError;
        needsUpdate = true;
      }
      if (newSegment.toError !== toError) {
        newSegment.toError = toError;
        needsUpdate = true;
      }

      return newSegment;
    });

    if (needsUpdate) {
      setMulticitySegments(updatedSegments);
    }
  }, [multicitySegments, openFromMultiIndex, openToMultiIndex]);

  const removeSegment = (index: number) => {
    setMulticitySegments((prev) => prev.filter((_, i) => i !== index));
  };

  // const multicitySegments = JSON.parse(getCookie("gy_multi_city"));

  let firstSegment = [
    {
      from: departureFromSr || "",
      fromCode: departureFrom || "",
      to: arrivalToSr || "",
      toCode: arrivalTo || "",
      departureDate: departDate || "",
    },
  ];

  console.log("firstSegment == ", firstSegment);
  console.log("multicitySegments == ", multicitySegments);

  useEffect(() => {
    setCookie("gy_multi_city", JSON.stringify(multicitySegments));
  }, [multicitySegments]);

  let combinedMulticitySegment = [...firstSegment, ...multicitySegments];

  console.log("combinedMulticitySegment == ", combinedMulticitySegment);

  const mydata: any = {
    departureFrom: departureFrom,
    arrivalTo: arrivalTo,
    adults: adults,
    children: children,
    infant: infant,
    cabinType: cabinType,
    departDate: departDate,
    departureFromSr: departureFromSr,
    arrivalToSr: arrivalToSr,
    tripType: tripType,
    passengerType: passengerType,
  };

  if (returnDate != undefined || returnDate != "Nan") {
    mydata.returnDate = returnDate;
  }

  const queryString = new URLSearchParams(mydata).toString(); // produces "id=10&date=1222"

  // hide or not ??
  // router.push(`/tickets?${queryString}`);

  // const modifySearchRef = useRef(false);
  const [modifySearchRef, setModifySearchRef] = useState(false);

  useEffect(() => {
    if (
      (srx_tripType?.toLowerCase() || "") === "multi-city" &&
      modifySearchRef
    ) {
      // live validate but don't auto-scroll
      validateMultiCity({ focusFirstError: false });
    }
  }, [srx_tripType, modifySearchRef]);

  const handleModifySearch = () => {
    // alert(" search modified ");
    setModifySearchRef(true);
  };

  const handlesearFlight = () => {
    console.log("handlesearFlight ==> clicked ");
    if ((srx_tripType?.toLowerCase() || "") === "multi-city") {
      const pass = validateMultiCity({ focusFirstError: true });
      if (!pass) return; // stop if invalid
    }

    if (fromError || toError) {
      return; // Do not proceed if there are city selection errors
    }

    if ((srx_tripType || "").toLowerCase() === "multi-city") {
      SetSearchFlight(true);
    } else {
      // single and round trip
      SetSearchFlight(true);
    }
  };

  // const onClickSearch = () => {
  //   if ((srx_tripType?.toLowerCase() || "") === "multi-city") {
  //     const pass = validateMultiCity({ focusFirstError: true });
  //     if (!pass) return; // stop if invalid
  //   }
  //   // single/round-trip can use your existing checks...
  //   handlesearFlight();
  // };

  const [true_Tripconst, setTripconst] = useState<boolean>(false);
  const [searchFlight, SetSearchFlight] = useState<boolean>(true);
  const hasFetchedRef = useRef(false);

  const [srx_cabinType, setCabinType] = useState<any>(null);

  // Not required for API call but kept in state for other uses if needed.
  const [ticketParams, setTicketParams] = useState({ id: null, date: null });

  const classLabels: any = {
    a: "PREMIUM_ECONOMY",
    b: "ECONOMY",
    c: "BUSINESS",
    d: "FIRST",
  };

  useEffect(() => {
    // handle reschedule
    // if (requestId) {
    //   const loadReissueTicket = async () => {
    //     setFlightData(null);
    //     setActiveFlight(true);
    //     setloading(true);

    //     try {
    //       let parameter = {
    //         requestId: requestId,
    //       };
    //       let reqData = {
    //         action: "searchReissue2",
    //         requestData: parameter,
    //       };
    //       const result = await postData(
    //         "travelogy/one-way/fetch-data",
    //         reqData
    //       );
    //       if (result && result.status && result.status.success && result.status.success === true && result.searchResult && result.searchResult.tripInfos) {
    //         setFlightData(result.searchResult.tripInfos);
    //         setError("")
    //       } else {
    //         setError(result.errors[0].message);
    //       }
    //     } catch (err: any) {
    //       console.error("error caused", err);

    //       if (err?.response?.data) {
    //         const errorData = err.response.data;
    //         if (typeof errorData.error === "string") {
    //           if (errorData.error.toLowerCase().includes("invalid airport")) {
    //             setError("Invalid route. Please choose a different route.");
    //           } else {
    //             setError(errorData.error);
    //           }
    //         } else if (
    //           Array.isArray(errorData.errors) &&
    //           errorData.errors.length
    //         ) {
    //           const firstError = errorData.errors[0];
    //           const message =
    //             firstError?.message || "An unknown error occurred.";
    //           setError(message);
    //         }
    //       } else if (err?.message) {
    //         setError(err.message);
    //       } else {
    //         setError("Something went wrong. Please try again.");
    //       }
    //     } finally {
    //       setloading(false);
    //       setActiveFlight(false);
    //       SetSearchFlight(false); // reset trigger
    //       hasFetchedRef.current = false; // allow next fetch
    //     }
    //   };
    //   loadReissueTicket();
    //   return
    // } else {
    //   // might move the code
    // }
    if (!searchFlight || hasFetchedRef.current) return;
    closeAllFields();
    hasFetchedRef.current = true;

    if ((srx_tripType?.toLowerCase() || "") === "multi-city") {
      setModifySearchRef(false);
    }

    // Ensure all required query parameters are available before making the API call.
    if (!departureFrom || !arrivalTo || !cabinType || !departDate) {
      return;
    }

    // Parse passenger counts from string to number; use defaults if not provided.
    const numAdults = adults ? parseInt(adults, 10) : 1;
    const numChildren = children ? parseInt(children, 10) : 0;
    const numInfant = infant ? parseInt(children, 10) : 0;

    setCabinType(cabinType);

    let tripBasedRouteInfo: any = [];

    // gy_triptype
    if ((srx_tripType?.toLowerCase() || "") === "one-way") {
      tripBasedRouteInfo = [
        {
          fromCityOrAirport: {
            code: departureFrom,
          },
          toCityOrAirport: {
            code: arrivalTo,
          },
          travelDate: departDate,
        },
      ];
    }
    if ((srx_tripType?.toLowerCase() || "") === "round-trip") {
      tripBasedRouteInfo = [
        {
          fromCityOrAirport: {
            code: departureFrom,
          },
          toCityOrAirport: {
            code: arrivalTo,
          },
          travelDate: departDate,
        },
        {
          fromCityOrAirport: {
            code: arrivalTo,
          },
          toCityOrAirport: {
            code: departureFrom,
          },
          travelDate: returnDate,
        },
      ];
    }

    let parsedSegments = [];

    if (typeof multicitySegments === "string") {
      try {
        parsedSegments = JSON.parse(multicitySegments);
      } catch (err) {
        console.error("Failed to parse multicitySegments:", err);
      }
    } else {
      parsedSegments = multicitySegments;
    }

    if (
      (srx_tripType?.toLowerCase() || "") === "multi-city" &&
      Array.isArray(parsedSegments) &&
      parsedSegments.length > 0
    ) {
      let tripBasedRouteInfoMain = [
        {
          fromCityOrAirport: {
            code: departureFrom,
          },
          toCityOrAirport: {
            code: arrivalTo,
          },
          travelDate: departDate,
        },
      ];
      console.log("tripBasedRouteInfoMain ==> ", tripBasedRouteInfoMain);
      let tripBasedRouteInfoSub = parsedSegments.map((item) => ({
        fromCityOrAirport: {
          code: item.fromCode,
        },
        toCityOrAirport: {
          code: item.toCode,
        },
        travelDate:
          item?.departureDate &&
          typeof item.departureDate === "string" &&
          item.departureDate.includes("T")
            ? item.departureDate.split("T")[0]
            : item?.departureDate,
      }));
      console.log("tripBasedRouteInfoSub ==> ", tripBasedRouteInfoSub);

      tripBasedRouteInfo = [
        ...tripBasedRouteInfoMain,
        ...tripBasedRouteInfoSub,
      ];
    }

    const mapPassengerType: any = {
      "SENIOR CITIZEN": "SENIOR_CITIZEN",
      STUDENT: "STUDENT",
      REGULAR: "REGULAR",
    };

    console.log("tripBasedRouteInfo == ", tripBasedRouteInfo);

    // Build the parameter object without extra curly braces
    console.log("222222222222 ", cabinType);
    console.log("222222222222 ", classLabels[cabinType]);
    const parameter = {
      searchQuery: {
        cabinClass: classLabels[cabinType],
        paxInfo: {
          ADULT: adultCount,
          CHILD: countChildren,
          INFANT: countInfant,
        },
        routeInfos: tripBasedRouteInfo,
        searchModifiers: {
          // pfts: [mapPassengerType[passengerType]],
          // sourceId: "22",
          pft: mapPassengerType[passengerType],
          isDirectFlight: isDirectFlight, // always true if isDirectFlight is false
          isConnectingFlight: false,
          // "sourceId": 0,
          // "pnrCreditInfo": {
          //   "pnr": ""
          // },
          // "iiss": false
        },
      },
    };

    // Async function to fetch flight data
    const loadData = async () => {
      setFlightData(null);
      setActiveFlight(true);
      setloading(true);

      try {
        // Call your API function with the properly constructed parameter
        // const result = await postDataTJ(parameter)
        let reqData = {
          action: "search",
          requestData: parameter,
        };
        const result: any = await postData(
          "travelogy/one-way/fetch-data",
          reqData
        );
        console.log("API Result for multi-city:", result);
        console.log("resssssssssssssssssssss ", result);
        if (result && result.searchResult && result.searchResult.tripInfos) {
          // setFlightData(result.searchResult.tripInfos.ONWARD)
          setFlightData(result.searchResult.tripInfos);
        } else if (result?.error) {
          if (typeof result.error === "string") {
            if (result?.error?.toLowerCase()?.includes("invalid airport")) {
              setError("Invalid route. Please choose a different route.");
            } else {
              setError(result.error);
            }
          }
        } else {
          console.log("no dataaaaaaaa");
          setError("");
        }
      } catch (err: any) {
        console.error("error caused", err);

        if (err?.response?.data) {
          const errorData = err.response.data;

          // Check for specific known error message
          if (typeof errorData.error === "string") {
            if (errorData?.error?.toLowerCase()?.includes("invalid airport")) {
              setError("Invalid route. Please choose a different route.");
            } else {
              setError(errorData.error);
            }
          }

          // Optional fallback for structured error arrays
          else if (Array.isArray(errorData.errors) && errorData.errors.length) {
            const firstError = errorData.errors[0];
            const message = firstError?.message || "An unknown error occurred.";
            setError(message);
          }
        } else if (err?.message) {
          setError(err.message);
        } else {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setloading(false);
        setActiveFlight(false);
        SetSearchFlight(false); // reset trigger
        hasFetchedRef.current = false; // allow next fetch
      }
    };

    // if (searchFlight) {
    //   loadData();
    //   SetSearchFlight(false);
    // }
    console.log("call search api 11111111");
    loadData();

    // Run the effect whenever any dependency changes
  }, [
    // departureFrom,
    // arrivalTo,
    // cabinType,
    // departDate,
    // adults,
    // children,
    searchFlight,
  ]);

  const fareItems: MenuProps["items"] = [
    {
      label: "Regular",
      key: "REGULAR",
    },
    {
      label: "Student",
      key: "STUDENT",
    },
    {
      label: "Senior Citizen",
      key: "SENIOR CITIZEN",
    },
  ];

  const items: MenuProps["items"] = [
    {
      label: "One-Way",
      key: "One-Way",
    },
    {
      label: "Round-Trip",
      key: "Round-Trip",
    },
    {
      label: "Multi-city",
      key: "Multi-city",
    },
  ];

  // controls visibility
  const [open, setOpen] = useState(false);
  const [fareOpen, setFareOpen] = useState(false);
  const [srx_fareType, setfareType] = useState(fareType);

  useEffect(() => {
    const t = Cookies.get("gy_triptype") || "";
    setTripType(t);
    const f = Cookies.get("gy_passender_type") || "";
    setfareType(f);
  }, []);

  const [srx_departureFrom, setdepartureFrom] = useState<string>("");
  const [srx_departureCode, setDepartureToCode] = useState<string>("");

  useEffect(() => {
    if (!getCookie("gy_da_str")) {
      setCookie("gy_da_str", "Delhi");
      setCookie("gy_da", "DEL");
      setdepartureFrom("Delhi");
      setDepartureToCode("DEL");
    }
    if (!getCookie("gy_aa_str")) {
      setCookie("gy_da_str", "Bengaluru");
      setCookie("gy_da", "BLR");
      setdepartureFrom("Bengaluru");
      setDepartureToCode("BLR");
    }
    if (!getCookie("gy_triptype")) {
      setCookie("gy_triptype", "One-Way");
      setTripType("One-Way");
    }
  });

  useEffect(() => {
    if (srx_departureFrom) {
      setCookie("gy_da_str", srx_departureFrom.trim());
    }
  }, [srx_departureFrom]);

  useEffect(() => {
    if (srx_departureCode) {
      setCookie("gy_da", srx_departureCode.trim());
    }
  }, [srx_departureCode]);

  useEffect(() => {
    const df = Cookies.get("gy_da_str") || "";
    setdepartureFrom(df);
  }, []);

  const [error, setError] = useState<string>("");
  const [fromError, setFromError] = useState<string>("");
  const [toError, setToError] = useState<string>("");
  const [srx_arrivalTo, setArrivalTo] = useState<string>("");
  const [srx_arrivalCode, setArrivalToCode] = useState<string>("");
  const [lastEditedField, setLastEditedField] = useState<string | null>(null);

  const handleFromCityChange = (city: string) => {
    setdepartureFrom(city);
    setLastEditedField("from");
  };

  const handleToCityChange = (city: string) => {
    setArrivalTo(city);
    setLastEditedField("to");
  };

  // useEffect(() => {
  // 	if (!getCookie('gy_aa_str')) {
  // 		setCookie('gy_da_str', 'Bengaluru');
  // 		setCookie('gy_da', 'BLR');
  // 		setdepartureFrom('Bengaluru');
  // 		setDepartureToCode('BLR');
  // 	}
  // });

  useEffect(() => {
    if (
      srx_departureFrom &&
      srx_arrivalTo &&
      srx_departureFrom === srx_arrivalTo
    ) {
      console.log("srx_departureFromsrx_departureFrom ==> ", srx_departureFrom);
      if (lastEditedField === "from") {
        setFromError("From and To cities cannot be the same.");
        setToError("");
      } else if (lastEditedField === "to") {
        setToError("From and To cities cannot be the same.");
        setFromError("");
      }
    } else {
      setFromError("");
      setToError("");
    }
  }, [srx_departureFrom, srx_arrivalTo, lastEditedField]);

  useEffect(() => {
    const dfa = Cookies.get("gy_aa_str") || "";
    setArrivalTo(dfa);
  }, []);

  useEffect(() => {
    if (srx_arrivalCode) {
      setCookie("gy_aa", srx_arrivalCode.trim());
    }
  }, [srx_arrivalCode]);

  useEffect(() => {
    if (srx_arrivalTo) {
      setCookie("gy_aa_str", srx_arrivalTo.trim());
    }
  }, [srx_arrivalTo]);

  const [srx_traveller, setTraveller] = useState(1);

  const [adultCount, setAdultCount] = useState(parseInt(mydata.adults));
  const [countChildren, setCountChildren] = useState(parseInt(mydata.children));
  const [countInfant, setcountInfant] = useState(parseInt(mydata.infant));
  const adultChildCount = adultCount + countChildren;
  const [totalPassenderCount, setTotalPassenderCount] =
    useState(adultChildCount);

  useEffect(() => {
    const dfadu = parseInt(Cookies.get("gy_adult") || "1", 10);
    const dfchi = parseInt(Cookies.get("gy_child") || "0", 10);
    const dfinf = parseInt(Cookies.get("gy_infant") || "0", 10);
    setTraveller(dfadu + dfchi + dfinf);
  }, [countChildren, adultCount, countInfant]);

  const [dd_monthStr, setDd_monthStr] = useState<string | null>(null);
  const [dd_strdate, setDd_strdate] = useState<string | null>(null);
  const [dd_date, setDd_date] = useState<string | null>(null);
  const [dd_year, setDd_year] = useState<string | null>(null);
  const [srx_depart, setDepartDate] = useState<string | null>(null);

  // menu click handler
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    setTripType(key);
    setCookie("gy_triptype", key);
    setOpen((prev) => !prev);
  };

  const handleFareMenuClick: MenuProps["onClick"] = ({ key }) => {
    setfareType(key);
    setCookie("gy_passender_type", key);
    setFareOpen((prev) => !prev);
  };

  const [showSearchState, setShowSearchState] = useState<boolean>(false);
  const [openDepartMultiIndex, setOpenDepartMultiIndex] = useState<
    number | null
  >(null);

  const multiOpenfrom = (idx: number) => {
    setOpenFromMultiIndex((prev) => (prev === idx ? null : idx));
    const newSegs = [...multicitySegments];
    if (newSegs[idx]) {
      newSegs[idx].fromError = "";
      setMulticitySegments(newSegs);
    }
  };

  const multiOpenToSecond = (idx: number) => {
    setOpenToMultiIndex((prev) => (prev === idx ? null : idx));
    const newSegs = [...multicitySegments];
    if (newSegs[idx]) {
      newSegs[idx].toError = "";
      setMulticitySegments(newSegs);
    }
  };

  const multiOpenToDateRange = (idx: number) => {
    setOpenDepartMultiIndex((prev) => (prev === idx ? null : idx));
    const newSegs = [...multicitySegments];
    if (newSegs[idx]) {
      newSegs[idx].dateError = "";
      setMulticitySegments(newSegs);
    }
  };

  const [showTraveller, setShowYTraveller] = useState<boolean>(false);
  const [showSearchStateTo, setShowSearchStateTo] = useState<boolean>(false);
  const [openDateRage, setOpenDateRage] = useState<boolean>(false);
  const [openDateRageR, setOpenDateRageR] = useState(false);

  const [datedep, setDatedep] = useState<Dayjs>(() => {
    const cookieDate = Cookies.get("gy_trd");
    return cookieDate ? dayjs(cookieDate) : dayjs();
  });

  const [datedepr, setDatedepr] = useState<Dayjs>(() => {
    const cookieDate = Cookies.get("gy_return");
    return cookieDate ? dayjs(cookieDate) : dayjs();
  });

  // useEffect(() => {

  //   const formattedDatedep = dayjs(datedep);
  //   const fDepartureDate =  formattedDatedep.format("YYYY-MM-DD");

  //   const formattedDatedepr = dayjs(datedepr);
  //   const fReturnDate =  formattedDatedepr.format("YYYY-MM-DD");

  //   if (((srx_tripType?.toLowerCase() || "") === "round-trip") && (fDepartureDate == fReturnDate)) {
  //     console.log("should throw validation !!!!!!!!!!!!!!!")
  //   }
  // }, [datedep, datedepr]);

  const openfrom = () => {
    if (showSearchState) {
      closeAllFields();
    } else {
      closeAllFields();
      setShowSearchState(true);
    }
    setFromError("");
  };

  const openTo = () => {
    if (showSearchStateTo) {
      closeAllFields();
    } else {
      closeAllFields();
      setShowSearchStateTo(true);
    }
    setToError("");
  };

  const openToDateRange = () => {
    if (openDateRage) {
      closeAllFields();
    } else {
      closeAllFields();
      setOpenDateRage(true);
    }
  };

  const openTraveller = () => {
    if (showTraveller) {
      closeAllFields();
    } else {
      closeAllFields();
      setShowYTraveller(true);
    }
  };

  const handleFareOpen = () => {
    if (fareOpen) {
      closeAllFields();
    } else {
      closeAllFields();
      setFareOpen(true);
    }
  };

  const handleOpen = () => {
    if (open) {
      closeAllFields();
    } else {
      closeAllFields();
      setOpen(true);
    }
  };

  const openToDateRangeR = () => {
    if (openDateRageR) {
      closeAllFields();
    } else {
      closeAllFields();
      setOpenDateRageR(true);
    }
  };

  const closeAllFields = () => {
    setShowSearchState(false);
    setShowSearchStateTo(false);
    setOpenDateRage(false);
    setOpenDateRageR(false);
    setShowYTraveller(false);
    setOpen(false);
    setFareOpen(false);
  };

  useEffect(() => {
    setTotalPassenderCount(adultCount + countChildren);
  }, [adultCount, countChildren]);

  const clickMinus = () => {
    let adultCnt = adultCount - 1;
    setCookie("gy_adult", adultCnt);
    if (adultCnt < countInfant) {
      clickMinusinfant();
    }
    setAdultCount(adultCnt); // Correct way to toggle the state
  };

  const clickPlus = () => {
    let adultMin = adultCount + 1;
    if (totalPassenderCount < 9) {
      setCookie("gy_adult", adultMin);
      setAdultCount(adultMin); // Correct way to toggle the state
    }
  };

  const clickMinusChildren = () => {
    let childtMin = countChildren - 1;
    setCookie("gy_child", childtMin);
    setCountChildren(childtMin); // Correct way to toggle the state
  };

  const clickPlusChildren = () => {
    let childtCnt = countChildren + 1;
    if (totalPassenderCount < 9) {
      setCookie("gy_child", childtCnt);
      setCountChildren(childtCnt); // Correct way to toggle the state
    }
  };

  const clickMinusinfant = () => {
    let infantMin = countInfant - 1;
    setCookie("gy_infant", infantMin);
    setcountInfant(infantMin);
  };

  const clickPlusinfant = () => {
    let infantCnt = countInfant + 1;
    // if (adult >= infantCnt) {
    setCookie("gy_infant", infantCnt);
    setcountInfant(infantCnt);
    // }
  };

  const handleChangeClass = (e: any) => {
    setCookie("gy_class", e.target.value);
    setCabinType(e.target.value); // Update the selected value in state
  };

  // useEffect(() => {
  // 	setCookie('gy_class', srx_cabinType);
  // }, [srx_cabinType]);

  useEffect(() => {
    if (datedep) {
      const formattedDate = dayjs(datedep);

      setCookie("gy_trd", formattedDate.format("YYYY-MM-DD"));
      setDd_monthStr(formattedDate.format("MMM")); // Format as string
      setDd_strdate(formattedDate.format("dddd")); // Format as string
      setDd_date(formattedDate.format("DD")); // Format as string
      setDd_year(formattedDate.format("YY")); // Format as string
    }
  }, [datedep]);

  const [ddr_monthStr, setDdr_monthStr] = useState(null);
  const [ddr_strdate, setDdr_strdate] = useState(null);
  const [ddr_date, setDdr_date] = useState(null);
  const [ddr_year, setDdr_year] = useState(null);

  useEffect(() => {
    if (datedepr) {
      const formattedDate: any = dayjs(datedepr);

      setCookie("gy_return", formattedDate.format("YYYY-MM-DD"));
      setDdr_monthStr(formattedDate.format("MMM"));
      setDdr_strdate(formattedDate.format("dddd"));
      setDdr_date(formattedDate.format("DD"));
      setDdr_year(formattedDate.format("YY"));
    }
  }, [datedepr]);

  const closePopUp = () => {
    setError("");
  };
  const handleGotItClick = () => {
    closePopUp();
    handleModifySearch();
  };

  let searchEnginewidth = {};
  if ((srx_tripType?.toLowerCase() || "") === "multi-city") {
    searchEnginewidth = {
      width: "65%",
    };
  }

  if ((srx_tripType?.toLowerCase() || "") === "round-trip") {
    searchEnginewidth = {
      width: "85%",
    };
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          {/* <EngineTabs active_border={'1'} /> */}

          <div className="h-[auto] w-full z-20 sticky top-0 bg_cs_search">
            {/* Header Section */}

            <div className="hdt_header" style={{ ...searchEnginewidth }}>
              <div className="hdt_header-item">
                <label>Fare Types</label>
                <Dropdown
                  menu={{ items: fareItems, onClick: handleFareMenuClick }}
                  open={fareOpen}
                  trigger={[]}
                  placement="bottomLeft"
                >
                  <div
                    className="hdt_value"
                    onClick={() => {
                      if (
                        ((srx_tripType?.toLowerCase() || "") === "multi-city" &&
                          modifySearchRef) ||
                        (srx_tripType?.toLowerCase() || "") !== "multi-city"
                      ) {
                        handleFareOpen();
                      }
                    }}
                    style={{ cursor: "pointer", display: "inline-block" }}
                  >
                    {srx_fareType}
                  </div>
                </Dropdown>
              </div>
              <div className="hdt_header-item">
                <label>Trip Type</label>
                <Dropdown
                  menu={{ items, onClick: handleMenuClick }}
                  open={open}
                  trigger={[]} // ← disable all built‑in open/close triggers
                  placement="bottomLeft" // or wherever you like
                >
                  <div
                    className="hdt_value"
                    // onClick={() => setOpen(prev => !prev)}  // ← your toggle
                    onClick={() => {
                      if (
                        ((srx_tripType?.toLowerCase() || "") === "multi-city" &&
                          modifySearchRef) ||
                        (srx_tripType?.toLowerCase() || "") !== "multi-city"
                      ) {
                        handleOpen();
                      }
                    }}
                    style={{ cursor: "pointer", display: "inline-block" }}
                  >
                    {srx_tripType}
                  </div>
                </Dropdown>
              </div>
              {(srx_tripType?.toLowerCase() || "") === "multi-city" &&
                !modifySearchRef && (
                  <div className="hdt_header-item" style={{ width: "25%" }}>
                    <label>Trip Info</label>
                    <div className="multicity-scrollplace">
                      {combinedMulticitySegment.map((segment, idx) => (
                        <div key={idx} className="place-flights hdt_value">
                          <ul className="al-selist al-selist-positionHandle">
                            <li className="whitecolor">
                              {segment.fromCode}
                              <br />
                            </li>
                            <li>
                              <div className="right-arrow"></div>
                            </li>
                            <li className="whitecolor">
                              {segment.toCode}
                              <br />
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {(((srx_tripType?.toLowerCase() || "") === "multi-city" &&
                modifySearchRef) ||
                (srx_tripType?.toLowerCase() || "") !== "multi-city") && (
                <>
                  <div className="hdt_header-item relative">
                    <label>From</label>
                    <div onClick={openfrom} className="hdt_value">
                      {srx_departureFrom}
                    </div>

                    {showSearchState ? (
                      <div className="searchFfromSelect searchFfromSelect_2">
                        <AppListSearch
                          operEngLocation={openfrom}
                          setSelectFrom={handleFromCityChange}
                          setSelectFromSub={setDepartureToCode}
                        />
                      </div>
                    ) : null}
                    <Tooltip
                      className="flex shadow-md z-10"
                      placement="bottom"
                      title={fromError}
                      open={!!fromError}
                      arrow={{ pointAtCenter: true }}
                      overlayInnerStyle={{
                        backgroundColor: "#ffeaea",
                        color: "#ff4d4f",
                        fontWeight: 500,
                      }}
                    ></Tooltip>
                  </div>

                  <div className="hdt_header-item relative">
                    <label>To</label>
                    <div onClick={openTo} className="hdt_value">
                      {srx_arrivalTo}
                    </div>

                    {showSearchStateTo ? (
                      <div className="searchFfromSelect searchFfromSelect_2">
                        <AppListSearch
                          operEngLocation={openTo}
                          setSelectFrom={handleToCityChange}
                          setSelectFromSub={setArrivalToCode}
                        />
                      </div>
                    ) : null}
                    <Tooltip
                      className="flex shadow-md z-50"
                      placement="bottom"
                      title={toError}
                      open={!!toError}
                      arrow={{ pointAtCenter: true }}
                      overlayInnerStyle={{
                        backgroundColor: "#ffeaea",
                        color: "#ff4d4f",
                        fontWeight: 500,
                      }}
                    ></Tooltip>
                  </div>
                </>
              )}

              {(((srx_tripType?.toLowerCase() || "") === "multi-city" &&
                modifySearchRef) ||
                (srx_tripType?.toLowerCase() || "") !== "multi-city") && (
                <div className="hdt_header-item">
                  <label>Depart</label>
                  <div
                    onClick={() => {
                      if (
                        ((srx_tripType?.toLowerCase() || "") === "multi-city" &&
                          modifySearchRef) ||
                        (srx_tripType?.toLowerCase() || "") !== "multi-city"
                      ) {
                        openToDateRange();
                      }
                    }}
                    className="hdt_value"
                  >
                    {dd_strdate}, {dd_monthStr} {dd_date} {dd_year}
                  </div>

                  {openDateRage ? (
                    <AppDateRangeFlight
                      openToDateRange={openToDateRange}
                      setDate={setDatedep}
                      minDate={null}
                      value={datedep}
                    />
                  ) : null}
                </div>
              )}

              {(srx_tripType?.toLowerCase() || "") === "round-trip" ? (
                <>
                  <div className="hdt_header-item">
                    <label>Return</label>
                    <div onClick={openToDateRangeR} className="hdt_value">
                      {ddr_strdate}, {ddr_monthStr} {ddr_date} {ddr_year}
                    </div>
                    {openDateRageR ? (
                      <AppDateRangeFlight
                        openToDateRange={openToDateRangeR}
                        setDate={setDatedepr}
                        minDate={datedep}
                        value={datedepr}
                      />
                    ) : null}
                  </div>
                </>
              ) : null}

              <div
                className="hdt_header-item"
                onClick={() => {
                  if (
                    ((srx_tripType?.toLowerCase() || "") === "multi-city" &&
                      modifySearchRef) ||
                    (srx_tripType?.toLowerCase() || "") !== "multi-city"
                  ) {
                    openTraveller();
                  }
                }}
              >
                <label>Passengers &amp; Class</label>
                <div className="hdt_value">
                  <span>
                    {srx_traveller}{" "}
                    {srx_traveller > 1 ? "travellers" : "traveller"} |{" "}
                    <span className="text-sm">
                      {classLabels[srx_cabinType]}
                    </span>
                  </span>
                </div>
              </div>
              {(srx_tripType?.toLowerCase() || "") === "multi-city" &&
              !modifySearchRef ? (
                <>
                  <button
                    onClick={handleModifySearch}
                    className="hdt_search-btn"
                  >
                    Modify Search
                  </button>
                </>
              ) : (
                <>
                  <div
                    onClick={
                      fromError ||
                      toError ||
                      errorMsg ||
                      dateError ||
                      ((srx_tripType?.toLowerCase() || "") === "multi-city" &&
                        multicitySegments.some(
                          (s) => s.fromError || s.toError || s.dateError
                        ))
                        ? () => {}
                        : handlesearFlight
                      // onClickSearch
                    }
                    className={`hdt_search-btn ${
                      fromError ||
                      toError ||
                      errorMsg ||
                      dateError ||
                      ((srx_tripType?.toLowerCase() || "") === "multi-city" &&
                        multicitySegments.some(
                          (s) => s.fromError || s.toError || s.dateError
                        ))
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  >
                    Search
                  </div>
                </>
              )}
            </div>
            {(srx_tripType?.toLowerCase() || "") === "multi-city" &&
              modifySearchRef && (
                <>
                  <div style={{ width: "48%", margin: "0 auto" }}>
                    {multicitySegments.map((segment: any, idx: any) => (
                      <div key={idx} className="flex justify-left items-center">
                        <div
                          className="hdt_header-item relative"
                          style={{ width: "20%" }}
                        >
                          <div>
                            <label>From</label>
                            <div
                              onClick={() => multiOpenfrom(idx)}
                              className="hdt_value"
                            >
                              {segment.from}
                            </div>
                            {/* {segment.fromError && <span className="error">{segment.fromError}</span>} */}
                          </div>
                          {openFromMultiIndex === idx && (
                            <div className="searchFfromSelect searchFfromSelect_2">
                              <AppListSearch
                                operEngLocation={() => multiOpenfrom(idx)}
                                setSelectFrom={(val: any) => {
                                  const newSegs = [...multicitySegments];
                                  newSegs[idx].from = val;
                                  newSegs[idx].lastEditedField = "from";
                                  setMulticitySegments(newSegs);
                                }}
                                setSelectFromSub={(val: any) => {
                                  const newSegs = [...multicitySegments];
                                  newSegs[idx].fromCode = val;
                                  setMulticitySegments(newSegs);
                                }}
                              />
                            </div>
                          )}
                          <Tooltip
                            className="flex shadow-md z-10"
                            placement="bottom"
                            title={segment.fromError}
                            open={!!segment.fromError}
                            arrow={{ pointAtCenter: true }}
                            overlayInnerStyle={{
                              backgroundColor: "#ffeaea",
                              color: "#ff4d4f",
                              fontWeight: 500,
                            }}
                          ></Tooltip>
                        </div>

                        <div
                          className="hdt_header-item relative"
                          style={{ width: "20%" }}
                        >
                          <div>
                            <label>To</label>
                            <div
                              onClick={() => multiOpenToSecond(idx)}
                              className="hdt_value"
                            >
                              {segment.to}
                            </div>
                            {/* {segment.toError && <span className="error">{segment.toError}</span>} */}
                          </div>
                          {openToMultiIndex === idx && (
                            <div className="searchFfromSelect searchFfromSelect_2">
                              <AppListSearch
                                operEngLocation={() => multiOpenToSecond(idx)}
                                setSelectFrom={(val: any) => {
                                  const newSegs = [...multicitySegments];
                                  newSegs[idx].to = val;
                                  newSegs[idx].lastEditedField = "to";
                                  setMulticitySegments(newSegs);
                                }}
                                setSelectFromSub={(val: any) => {
                                  const newSegs = [...multicitySegments];
                                  newSegs[idx].toCode = val;
                                  setMulticitySegments(newSegs);
                                }}
                              />
                            </div>
                          )}
                          <Tooltip
                            className="flex shadow-md z-50"
                            placement="bottom"
                            title={segment.toError}
                            open={!!segment.toError}
                            arrow={{ pointAtCenter: true }}
                            overlayInnerStyle={{
                              backgroundColor: "#ffeaea",
                              color: "#ff4d4f",
                              fontWeight: 500,
                            }}
                          ></Tooltip>
                        </div>

                        <div className="hdt_header-item">
                          <div>
                            <label>Depart</label>
                            <div
                              onClick={() => multiOpenToDateRange(idx)}
                              className="hdt_value"
                            >
                              {segment.departureDate
                                ? dayjs(segment.departureDate).format(
                                    "ddd, MMM D YYYY"
                                  )
                                : "Select Date"}
                            </div>
                          </div>
                          {/* {segment.dateError && <span className="error">{segment.dateError}</span>} */}
                          {openDepartMultiIndex === idx && (
                            <AppDateRangeFlight
                              openToDateRange={() => multiOpenToDateRange(idx)}
                              setDate={(val: any) => {
                                const newSegs = [...multicitySegments];
                                newSegs[idx].departureDate = val;
                                setMulticitySegments(newSegs);
                              }}
                              minDate={
                                idx > 0
                                  ? multicitySegments[idx - 1].departureDate
                                  : datedep
                              } // Use datedep for the first segment
                              value={multicitySegments[idx].departureDate}
                            />
                          )}
                          <Tooltip
                            className="flex shadow-md z-50"
                            placement="bottom"
                            title={segment.dateError}
                            open={!!segment.dateError}
                            arrow={{ pointAtCenter: true }}
                            overlayInnerStyle={{
                              backgroundColor: "#ffeaea",
                              color: "#ff4d4f",
                              fontWeight: 500,
                            }}
                          ></Tooltip>
                        </div>

                        {/* Add/Remove buttons */}
                        <div
                          className="hdt_segment-controls"
                          style={{ paddingTop: "10px" }}
                        >
                          {idx === multicitySegments.length - 1 && (
                            <>
                              {multicitySegments.length > 1 && (
                                <button
                                  style={{
                                    background: "grey",
                                    borderRadius: "10px",
                                    margin: "10px",
                                  }}
                                  onClick={() => removeSegment(idx)}
                                  className="remove-segment text-white"
                                >
                                  Remove
                                </button>
                              )}

                              {multicitySegments.length < 5 && (
                                <button
                                  style={{
                                    background: "grey",
                                    borderRadius: "10px",
                                    margin: "10px",
                                  }}
                                  onClick={addSegment}
                                  className="add-segment text-white"
                                >
                                  Add
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {errorMsg && (
                    <div
                      className="text-red-500 mt-2 text-sm font-medium"
                      style={{ textAlign: "center", padding: "10px" }}
                    >
                      {errorMsg}
                    </div>
                  )}
                  {dateError && (
                    <div
                      className="text-red-500 mt-2 text-sm font-medium"
                      style={{ textAlign: "center", padding: "10px" }}
                    >
                      {dateError}
                    </div>
                  )}
                </>
              )}

            {/* <AppListSearch operEngLocation={openTo} setSelectFrom={setSelectFromTo} setSelectFromSub={setSelectFromSubTo} /> */}
          </div>
          <TravellerForm
            showTraveller={showTraveller}
            adult={adultCount}
            opentrvForm={openTraveller}
            clickMinus={clickMinus}
            clickPlus={clickPlus}
            clickMinusChildren={clickMinusChildren}
            clickPlusChildren={clickPlusChildren}
            countchildren={countChildren}
            countinfant={countInfant}
            handleChangeClass={handleChangeClass}
            travellerClass={srx_cabinType}
            clickMinusinfant={clickMinusinfant}
            clickPlusinfant={clickPlusinfant}
            totalPassenderCount={totalPassenderCount}
            specificStyle={{ top: "23%", right: "9%" }}
            selectedPassengerType={srx_fareType}
          />

          {/* Block Banner Tickets */}
          {/* <section className="section-box box-logos-2 box-logos-tickets background-body">
            <div className="container">
              <div className="box-swiper pt-0">
                <div className="swiper-container swiper-group-payment-10 wow fadeInUp">
                  <SwiperGroupPayment10Slider />
                </div>
              </div>
            </div>
          </section> */}

          {/* Ticket List Section */}

          <section className="box-section block-content-tourlist background-body">
            <div className="container-fluid" style={{ width: "93%" }}>
              <div className="box-content-main">
                <div className="content-right border ">
                  {/* <div className="box-filters mb-25 pb-5 border-bottom border-1">
                    <SortTicketsFilter
                      sortCriteria={sortCriteria}
                      handleSortChange={handleSortChange}
                      itemsPerPage={itemsPerPage}
                      handleItemsPerPageChange={handleItemsPerPageChange}
                      handleClearFilters={handleClearFilters}
                      startItemIndex={startItemIndex}
                      endItemIndex={endItemIndex}
                      sortedTickets={sortedTickets}
                    />
                  </div> */}

                  {loading && (
                    <div
                      className="box-list-flights box-list-flights-2"
                      style={{ padding: "10px" }}
                    >
                      <div>
                        <div />

                        <div className="item-flight background-card border-1 ticket-container relative">
                          <div className="air_detailes"></div>
                          <div className="flight-route flight-route-type-2 city1"></div>

                          <Skeleton active={activeFlight} />
                        </div>
                      </div>

                      <div>
                        <div />

                        <div className="item-flight background-card border-1 ticket-container relative">
                          <div className="air_detailes"></div>
                          <div className="flight-route flight-route-type-2 city1"></div>

                          <Skeleton active={activeFlight} />
                        </div>
                      </div>

                      <div>
                        <div />

                        <div className="item-flight background-card border-1 ticket-container relative">
                          <div className="air_detailes"></div>
                          <div className="flight-route flight-route-type-2 city1"></div>

                          <Skeleton active={activeFlight} />
                        </div>
                      </div>

                      <div>
                        <div />

                        <div className="item-flight background-card border-1 ticket-container relative">
                          <div className="air_detailes"></div>
                          <div className="flight-route flight-route-type-2 city1"></div>

                          <Skeleton active={activeFlight} />
                        </div>
                      </div>
                      <div>
                        <div />

                        <div className="item-flight background-card border-1 ticket-container relative">
                          <div className="air_detailes"></div>
                          <div className="flight-route flight-route-type-2 city1"></div>

                          <Skeleton active={activeFlight} />
                        </div>
                      </div>
                    </div>
                  )}

                  {((srx_tripType?.trim().toLowerCase() === "one-way" &&
                    flightData?.ONWARD?.length > 0) ||
                    (srx_tripType?.trim().toLowerCase() === "round-trip" &&
                      flightData?.COMBO?.length > 0) ||
                    (srx_tripType?.trim().toLowerCase() === "multi-city" &&
                      flightData?.COMBO?.length > 0)) &&
                    (() => {
                      const tripInfo = filteredFlightData;
                      console.log("mameeeeeeeeee ", tripInfo);
                      console.log("mameeeeeeeeee ", tripInfo?.length);

                      return (
                        <>
                          {tripInfo?.length > 0 ? (
                            <>
                              <div className="box-grid-tours">
                                <div className="row">
                                  <div
                                    className="box-list-flights box-list-flights-2"
                                    style={{ padding: "10px" }}
                                  >
                                    {tripInfo.map((ticket: any) => (
                                      <React.Fragment key={ticket.id}>
                                        <TicketCard1
                                          ticket={ticket}
                                          flightData={flightData}
                                        />
                                      </React.Fragment>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              {/* <ByPagination
                                handlePreviousPage={handlePreviousPage}
                                totalPages={totalPages}
                                currentPage={currentPage}
                                handleNextPage={handleNextPage}
                                handlePageChange={handlePageChange}
                              /> */}
                            </>
                          ) : (
                            !loading && (
                              <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                                <p className="text-xl font-semibold">
                                  No result found
                                </p>
                                <p className="text-sm mt-2 text-gray-400">
                                  Try adjusting your filters or search criteria.
                                </p>
                              </div>
                            )
                          )}
                        </>
                      );
                    })()}

                  {flightData === null &&
                    (() => {
                      return (
                        <>
                          {!loading && (
                            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                              <p className="text-xl font-semibold">
                                No result found
                              </p>
                              <p className="text-sm mt-2 text-gray-400">
                                Try adjusting your filters or search criteria.
                              </p>
                            </div>
                          )}
                        </>
                      );
                    })()}

                  {/* {(srx_tripType && srx_tripType.trim().toLowerCase() === "one-way") ? (
                    <>
                      {flightData && flightData.ONWARD && flightData.ONWARD.length > 0 ?
                        (<><div className="box-grid-tours">
                          <div className="row">
                            <div className="box-list-flights box-list-flights-2">
                              {flightData.ONWARD.map((ticket: any) => (
                                <React.Fragment key={ticket.id}>
                                  <TicketCard1 ticket={ticket} />
                                </React.Fragment>
                              ))
                              }
                            </div>
                          </div>
                        </div>
                          <ByPagination
                            handlePreviousPage={handlePreviousPage}
                            totalPages={totalPages}
                            currentPage={currentPage}
                            handleNextPage={handleNextPage}
                            handlePageChange={handlePageChange}
                          />
                        </>) : (<>
                          {loading === false && <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                            <p className="text-xl font-semibold">No result found</p>
                            <p className="text-sm mt-2 text-gray-400">Try adjusting your filters or search criteria.</p>
                          </div>}
                      </>)}
                    </>
                  ) : null } */}

                  {/* domestic - ONWARD RETURN - ticketCard */}
                  {srx_tripType &&
                  srx_tripType.trim().toLowerCase() === "round-trip" ? (
                    <>
                      {flightData &&
                      flightData.ONWARD &&
                      flightData.ONWARD.length > 0 &&
                      flightData.RETURN &&
                      flightData.RETURN.length > 0 ? (
                        <RoundTripSelectionView
                          flightData={flightData}
                          departureFrom={departureFrom}
                          arrivalTo={arrivalTo}
                        />
                      ) : (
                        <>
                          {loading === false && (
                            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                              <p className="text-xl font-semibold">
                                No result found
                              </p>
                              <p className="text-sm mt-2 text-gray-400">
                                Try adjusting your filters or search criteria.
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  ) : null}
                  {srx_tripType &&
                  srx_tripType.trim().toLowerCase() === "multi-city" &&
                  !flightData?.COMBO ? (
                    <>
                      {flightData ? (
                        <MulticitySelectionView
                          flightData={flightData}
                          // departureFrom={departureFrom}
                          // arrivalTo={arrivalTo}
                        />
                      ) : (
                        <>
                          {loading === false && (
                            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                              <p className="text-xl font-semibold">
                                No result found
                              </p>
                              <p className="text-sm mt-2 text-gray-400">
                                Try adjusting your filters or search criteria.
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  ) : null}

                  {/* Invalid airport */}
                  {error && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <div className="bg-white border-2 border-black w-96 p-6 rounded-lg text-center shadow-lg">
                        <p className="text-red-600 mb-4 font-semibold">
                          Error: {error}
                        </p>

                        <button
                          className="border-2 border-black px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
                          onClick={handleGotItClick}
                        >
                          Ok, Got It
                        </button>
                      </div>
                    </div>
                  )}
                  {/* {error == "" && (
                                        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                                            <p className="text-xl font-semibold">No result found</p>
                                            <p className="text-sm mt-2 text-gray-400">
                                                Try adjusting your filters or search criteria.
                                            </p>
                                        </div>
                                    )} */}

                  {/* {srx_tripType && srx_tripType.trim().toLowerCase() === "round-trip" ? (
                    <>
                      {flightData && flightData.ONWARD && flightData.ONWARD.length > 0 && flightData.RETURN && flightData.RETURN.length > 0 ?
                        (<>
                          <div className="box-grid-tours">
                            <div className="row">
                              <p>ONWARD</p>
                              <div className="box-list-flights box-list-flights-2">
                                {flightData.ONWARD.map((ticket: any) => (
                                  <React.Fragment key={ticket.id}>
                                    <DomesticRoundTripTicketCard ticket={ticket} />
                                  </React.Fragment>
                                ))
                                }
                              </div>
                              <p>RETURN</p>
                              <div className="box-list-flights box-list-flights-2">
                                {flightData.RETURN.map((ticket: any) => (
                                  <React.Fragment key={ticket.id}>
                                    <DomesticRoundTripTicketCard ticket={ticket} />
                                  </React.Fragment>
                                ))
                                }
                              </div>
                            </div>
                          </div>
                          <ByPagination
                            handlePreviousPage={handlePreviousPage}
                            totalPages={totalPages}
                            currentPage={currentPage}
                            handleNextPage={handleNextPage}
                            handlePageChange={handlePageChange}
                          />
                        </>) : (<>
                          {loading === false && <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                            <p className="text-xl font-semibold">No result found</p>
                            <p className="text-sm mt-2 text-gray-400">Try adjusting your filters or search criteria.</p>
                          </div>}
                      </>)}
                    </>
                  ) : null } */}
                </div>

                {/* Left Sidebar Filters */}
                {((srx_tripType?.trim().toLowerCase() === "one-way" &&
                  flightData?.ONWARD?.length > 0) ||
                  (srx_tripType?.trim().toLowerCase() === "round-trip" &&
                    flightData?.COMBO?.length > 0) ||
                  (srx_tripType?.trim().toLowerCase() === "multi-city" &&
                    flightData?.COMBO?.length > 0)) && (
                  <div className="content-left order-lg-first">
                    <div className="sidebar-left border-1 background-body">
                      <div className="box-filters-sidebar">
                        <div className="block-filter border-1">
                          <h6 className="text-lg-bold filter-sty neutral-1000">
                            Filter Price{" "}
                          </h6>
                          <ByPrice
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            minPriceRange={minPriceRange}
                            maxPriceRange={maxPriceRange}
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
                          <ByStops stops={stops} setStops={setStops} />
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
                            departureTime={departureTime}
                            setDepartureTime={setDepartureTime}
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
                            arrivalTime={arrivalTime}
                            setArrivalTime={setArrivalTime}
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
                                  (
                                    flightData?.ONWARD ||
                                    flightData?.COMBO ||
                                    []
                                  ).map(
                                    (ticket: any) => ticket.sI[0].fD.aI.name
                                  )
                                ),
                              ]}
                              selectedAirlines={selectedAirlines}
                              setSelectedAirlines={setSelectedAirlines}
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
                            fareIdentifiers={fareIdentifiers}
                            setFareIdentifiers={setFareIdentifiers}
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
                            flightNumberSearch={flightNumberSearch}
                            setFlightNumberSearch={setFlightNumberSearch}
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
                            selectedFareTypes={selectedFareTypes}
                            setSelectedFareTypes={setSelectedFareTypes}
                            options={uniqueFareTypes}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="section-box box-how-it-work-3 background-body">
            <div className="container">
              <div className="box-how-it-work-inner background-3">
                <h3 className="neutral-1000 wow fadeInUp">How It Work ?</h3>
                <p className="text-xl-medium neutral-500 mb-30 wow fadeInUp">
                  Just 4 easy and quick steps
                </p>
                <div className="row">
                  <div className="col-lg-10">
                    <ul className="list-steps list-steps-2-col wow fadeInUp">
                      <li>
                        <div className="step-no">
                          <span>1</span>
                        </div>
                        <div className="step-info">
                          <p className="text-xl-bold neutral-1000">
                            Search for Flights
                          </p>
                          <p className="text-sm-medium neutral-500">
                            Begin your journey by entering your departure city,
                            destination, travel dates, and the number of
                            passengers
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="step-no">
                          <span>2</span>
                        </div>
                        <div className="step-info">
                          <p className="text-xl-bold neutral-1000">
                            Select Your Flight
                          </p>
                          <p className="text-sm-medium neutral-500">
                            Review the search results and compare the details of
                            each flight, including departure and arrival times,
                            durations, and prices.
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="step-no">
                          <span>3</span>
                        </div>
                        <div className="step-info">
                          <p className="text-xl-bold neutral-1000">
                            Provide Passenger Information
                          </p>
                          <p className="text-sm-medium neutral-500">
                            Enter the required passenger information for all
                            individuals traveling, including names, contact
                            details, and any special requests
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="step-no">
                          <span>4</span>
                        </div>
                        <div className="step-info">
                          <p className="text-xl-bold neutral-1000">
                            Payment and Confirmation
                          </p>
                          <p className="text-sm-medium neutral-500">
                            Review the booking summary, including the total
                            cost, flight details, and passenger information
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="pb-90 background-body" />
        </main>
      </Layout>
    </Suspense>
  );
}
