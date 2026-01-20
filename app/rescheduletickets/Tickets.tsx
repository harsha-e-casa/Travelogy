"use client";

import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  Suspense,
  useMemo,
} from "react";
import ByAirline from "@/components/Filter/ByAirline";
import ByClass from "@/components/Filter/ByClass";
import ByLocation from "@/components/Filter/ByLocation";
import ByPagination from "@/components/Filter/ByPagination";
import ByPrice from "@/components/Filter/ByPrice";
import ByStops from "@/components/Filter/ByStops";
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
import { Skeleton } from "antd";
import AppListSearch from "@/components/searchEngine/AppListSearch";
import AppDateRangeFlight from "@/components/searchEngine/AppDateRangeFlight";
import "./customeHeader_1.css";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { tree } from "next/dist/build/templates/app-page";
import { AppContext } from "../../util/AppContext";
import { TravellerForm } from "@/components/searchEngine/TravellerForm";
import { Dayjs } from "dayjs";
import { checkTokenExpiry } from "@/services/Utils";
import ByDepartureTime from "@/components/Filter/ByDepartureTime";
import ByArrivalTime from "@/components/Filter/ByArrivalTime";
import ByFareIdentifier from "@/components/Filter/ByFareIdentifier";
import ByFareType from "@/components/Filter/ByFareType";
import BySortPrice from "@/components/Filter/BySortPrice";
import { DownOutlined, FilterOutlined, ShareAltOutlined, CloseOutlined, MailOutlined } from "@ant-design/icons";
import { message, Drawer, Button } from "antd";
import TicketCardMobile from "@/components/elements/ticketcard/TicketCardMobile";

import QuoteShareModal from "@/components/elements/QuoteShareModal";

// Convert ticket ratings from string to number
// const ticketsData = rawticketsData.map((ticket) => ({
//   ...ticket,
//   rating: parseFloat(ticket.rating as string),
// }));

const ticketsData: any = [];

const generateStableId = (ticket: any) => {
  if (!ticket || !ticket.sI) return Math.random().toString(36).substr(2, 9);

  // Create a stable ID based on flight segments (Airlines, Flight Numbers, Times, Codes)
  const segments = ticket.sI.map((seg: any) => {
    const flightNo = seg.fD?.fN || '000';
    const airline = seg.fD?.aI?.code || 'XX';
    const depTime = seg.dt || '0000';
    const fromCode = seg.da?.code || 'AAA';
    const toCode = seg.aa?.code || 'BBB';
    return `${airline}${flightNo}_${depTime}_${fromCode}${toCode}`;
  });

  const basePrice = ticket.totalPriceList?.[0]?.fd?.ADULT?.fC?.NF || 0;
  return `${segments.join("|")}_${basePrice}`;
};

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
    // uniqueAirlines,
    filteredTickets,
    sortedTickets,
    totalPages,
    startIndex,
    endIndex,
    paginatedTickets,
    // handleCheckboxChange,
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

  const { getCookie, removeCookie } = useContext(AppContext);
  const [flightData, setFlightData] = useState<any>(null);
  const [activeFlight, setActiveFlight] = useState<any>(true);
  const [loading, setloading] = useState<boolean>(false);
  const [filteredFlightData, setFilteredFlightData] = useState<any>(null);

  // Mobile/Tablet UI State
  const [isMobile, setIsMobile] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1070);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showFilterDrawer = () => {
    setFilterDrawerOpen(true);
  };

  const onCloseFilterDrawer = () => {
    setFilterDrawerOpen(false);
  };

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
  const [uniqueAirlines, setUniqueAirlines] = useState<any[]>([]);
  const [priceSort, setPriceSort] = useState<"asc" | "desc">("asc");

  const handleResetAllFilters = () => {
    setPriceRange([minPriceRange, maxPriceRange]);
    setStops("all");
    setPriceSort("asc");
    setDepartureTime("all");
    setSelectedAirlines([]);
    setArrivalTime("all");
    setFareIdentifiers([]);
    setFlightNumberSearch("");
    setSelectedFareTypes([]);
  };

  const isFilterApplied = useMemo(() => {
    return (
      stops !== "all" ||
      departureTime !== "all" ||
      arrivalTime !== "all" ||
      selectedAirlines.length > 0 ||
      fareIdentifiers.length > 0 ||
      flightNumberSearch !== "" ||
      selectedFareTypes.length > 0 ||
      priceSort !== "asc" ||
      (priceRange[0] !== minPriceRange || priceRange[1] !== maxPriceRange)
    );
  }, [stops, departureTime, arrivalTime, selectedAirlines, fareIdentifiers, flightNumberSearch, selectedFareTypes, priceSort, priceRange, minPriceRange, maxPriceRange]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (stops !== "all") count++;
    if (departureTime !== "all") count++;
    if (arrivalTime !== "all") count++;
    if (selectedAirlines.length > 0) count++; // Count airline filter as 1 regardless of how many airlines selected
    if (fareIdentifiers.length > 0) count++;
    if (flightNumberSearch !== "") count++;
    if (selectedFareTypes.length > 0) count++;
    if (priceSort !== "asc") count++;
    if (priceRange[0] !== minPriceRange || priceRange[1] !== maxPriceRange) count++;
    return count;
  }, [stops, departureTime, arrivalTime, selectedAirlines, fareIdentifiers, flightNumberSearch, selectedFareTypes, priceSort, priceRange, minPriceRange, maxPriceRange]);

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

  useEffect(() => {
    if (flightData && (flightData.ONWARD || flightData.COMBO)) {
      const dataToCheck = flightData.ONWARD || flightData.COMBO;
      const [minPrice, maxPrice] = getPriceRangeFromData(dataToCheck);

      setMinPriceRange(minPrice);
      setMaxPriceRange(maxPrice);

      if (priceRange[0] !== minPrice || priceRange[1] !== maxPrice) {
        setPriceRange([minPrice, maxPrice]);
      }

      const allAirlines = dataToCheck.map(
        (ticket: any) => ticket.sI[0].fD.aI.name
      );
      const unique = Array.from(new Set(allAirlines));
      setUniqueAirlines(
        unique.map((name) => ({
          name,
          count: allAirlines.filter((a: string) => a === name).length,
        }))
      );

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

      // const type: any = {
      //   0: "Non Refundable",
      //   1: "Refundable",
      //   2: "Partial Refundable",
      // };
      // const allFareTypes = dataToCheck
      //   .flatMap((ticket: any, ticketIndex: number) => {
      //     return ticket.totalPriceList.flatMap(
      //       (priceInfo: any, priceIndex: number) => {
      //         return Object.keys(priceInfo.fd).map((paxTypeKey) => {
      //           return priceInfo.fd[paxTypeKey].rT;
      //         });
      //       }
      //     );
      //   })
      //   .filter((val: any) => {
      //     return val !== undefined && val !== null;
      //   });

      // const fareTypeCounts = allFareTypes.reduce(
      //   (acc: any, fareType: string) => {
      //     acc[fareType] = (acc[fareType] || 0) + 1;
      //     return acc;
      //   },
      //   {}
      // );

      // const uniqueFareTypesWithCounts = Object.keys(fareTypeCounts).map(
      //   (fareType) => ({
      //     name: type[fareType],
      //     count: fareTypeCounts[fareType],
      //   })
      // );

      // setUniqueFareTypes(uniqueFareTypesWithCounts);
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
                return priceInfo.fd[paxTypeKey]?.rT || 0;
              });
            }
          );
        })
        .filter((val: any) => Number.isFinite(Number(val)));
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
      setUniqueFareTypes(uniqueFaresWithCounts);
    }
  }, [flightData]);

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

    return adultFare + childFare + infantFare;
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedAirlines((prevSelectedAirlines) =>
      checked
        ? [...prevSelectedAirlines, value]
        : prevSelectedAirlines.filter((airline) => airline !== value)
    );
  };

  const handleFareIdentifierChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;
    setFareIdentifiers((prevFareIdentifiers) =>
      checked
        ? [...prevFareIdentifiers, value]
        : prevFareIdentifiers.filter((identifier) => identifier !== value)
    );
  };

  const handleFareTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedFareTypes((prevSelectedFareTypes) =>
      checked
        ? [...prevSelectedFareTypes, value]
        : prevSelectedFareTypes.filter((fareType) => fareType !== value)
    );
  };

  const applyFilters = () => {
    if (flightData && (flightData.ONWARD || flightData.COMBO)) {
      let dataToFilter = (flightData.ONWARD || flightData.COMBO) || [];

      // 1. Strict Fare Type Filter (First Priority)
      if (selectedFareTypes.length > 0) {
        const typeMap: { [key: number]: string } = {
          0: "Non Refundable",
          1: "Refundable",
          2: "Partial Refundable",
        };

        dataToFilter = dataToFilter.filter((ticket: any) => {
          return ticket.totalPriceList.some((priceInfo: any) =>
            Object.keys(priceInfo.fd).some((paxType) => {
              const fareType = typeMap[priceInfo.fd[paxType]?.rT || 0];
              return selectedFareTypes.includes(fareType);
            })
          );
        });
      }

      // Fare Identifier Filter
      if (fareIdentifiers.length > 0) {
        dataToFilter = dataToFilter.filter((ticket: any) => {
          return ticket.totalPriceList.some((priceInfo: any) =>
            fareIdentifiers.includes(priceInfo.fareIdentifier)
          );
        });
      }

      // 2. Price Range Filter (Uses updated getTicketPrice)
      let filteredData = dataToFilter.filter((ticket: any) => {
        const price = getTicketPrice(ticket);
        return price >= priceRange[0] && price <= priceRange[1];
      });

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

      // Sorting (Maintained from original function as Tickets.tsx likely splits this or handles via hook)
      if (priceSort === "asc") {
        filteredData.sort(
          (a: any, b: any) => getTicketPrice(a) - getTicketPrice(b)
        );
      } else if (priceSort === "desc") {
        filteredData.sort(
          (a: any, b: any) => getTicketPrice(b) - getTicketPrice(a)
        );
      }

      setFilteredFlightData({ ONWARD: filteredData });
    }
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
    applyFilters();
  }, [
    priceRange,
    stops,
    departureTime,
    selectedAirlines,
    arrivalTime,
    fareIdentifiers,
    selectedFareTypes,
    flightData,
    priceSort,
  ]);

  const router = useRouter();

  useEffect(() => {
    const tokenValid = checkTokenExpiry();
    if (!tokenValid) {
      localStorage.removeItem("authToken");
      router.push("/login");
    } else {
      setloading(false);
    }
  }, [router]);
  const searchParams = useSearchParams();
  const rsData = getCookie("rs_data");
  const fetchRescheduleData = JSON.parse(rsData);

  const requestId = searchParams.get("requestId");

  const [datedep, setDatedep] = useState<Dayjs>(() => {
    return dayjs(fetchRescheduleData?.searchQuery?.routeInfos?.[0]?.travelDate);
  });

  const [dd_monthStr, setDd_monthStr] = useState<string | null>(null);
  const [dd_strdate, setDd_strdate] = useState<string | null>(null);
  const [dd_date, setDd_date] = useState<string | null>(null);
  const [dd_year, setDd_year] = useState<string | null>(null);

  useEffect(() => {
    if (datedep) {
      const formattedDate = dayjs(datedep);

      // setCookie("gy_trd", formattedDate.format("YYYY-MM-DD"));
      setDd_monthStr(formattedDate.format("MMM")); // Format as string
      setDd_strdate(formattedDate.format("dddd")); // Format as string
      setDd_date(formattedDate.format("DD")); // Format as string
      setDd_year(formattedDate.format("YY")); // Format as string
    }
  }, [datedep]);

  const rescheduleTo = getCookie("gy_reschedule_to");

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  // const modifySearchRef = useRef(false);
  const [modifySearchRef, setModifySearchRef] = useState(false);

  const handleModifySearch = () => {
    // alert(" search modified ");
    setModifySearchRef(true);
  };

  const handlesearFlight = () => {
    // SetSearchFlight(true);
    handleResetAllFilters();

    if (fetchRescheduleData) {
      const callReissueTicket = async () => {
        setFlightData(null);
        setActiveFlight(true);
        setloading(true);

        try {
          const parameter = {
            paxInfo: {
              ADULT: fetchRescheduleData?.searchQuery?.paxInfo?.ADULT,
              CHILD: fetchRescheduleData?.searchQuery?.paxInfo?.CHILD,
              INFANT: fetchRescheduleData?.searchQuery?.paxInfo?.INFANT,
            },
            routeInfos: [
              {
                fromCityOrAirport: {
                  code: fetchRescheduleData?.searchQuery?.routeInfos?.[0]
                    ?.fromCityOrAirport?.code,
                },
                toCityOrAirport: {
                  code: fetchRescheduleData?.searchQuery?.routeInfos?.[0]
                    ?.toCityOrAirport?.code,
                },
                travelDate: datedep,
              },
            ],
            oldBookingId: fetchRescheduleData?.searchQuery?.oldBookingId,
            pnr: fetchRescheduleData?.searchQuery?.pnr,
          };
          let reqData = {
            action: "searchQuery",
            requestData: parameter,
          };
          const result: any = await postData(
            "travelogy/one-way/fetch-data",
            reqData
          );
          loadReissueTicket(result?.searchQuery?.requestId);
        } catch (err: any) {
          console.error("error caused", err);

          if (err?.response?.data) {
            const errorData = err.response.data;
            if (typeof errorData.error === "string") {
              if (errorData.error.toLowerCase().includes("invalid airport")) {
                setError("Invalid route. Please choose a different route.");
              } else {
                setError(errorData.error);
              }
            } else if (
              Array.isArray(errorData.errors) &&
              errorData.errors.length
            ) {
              const firstError = errorData.errors[0];
              const message =
                firstError?.message || "An unknown error occurred.";
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
          hasFetchedRef.current = false;
        }
      };
      callReissueTicket();
    } else {
      // alert("fetchRescheduleData not available");
    }
  };

  const [searchFlight, SetSearchFlight] = useState<boolean>(true);
  const hasFetchedRef = useRef(false);
  const [srx_cabinType, setCabinType] = useState<any>(null);

  const classLabels: any = {
    a: "PREMIUM_ECONOMY",
    b: "ECONOMY",
    c: "BUSINESS",
    d: "FIRST",
  };

  useEffect(() => {
    // handle reschedule
    if (requestId) {
      loadReissueTicket(requestId);
      return;
    }
  }, [searchFlight]);

  const loadReissueTicket = async (requestId: any) => {
    handleResetAllFilters();
    setFlightData(null);
    setActiveFlight(true);
    setloading(true);

    try {
      let parameter = {
        requestId: requestId,
      };
      let reqData = {
        action: "searchReissue2",
        requestData: parameter,
      };
      const result: any = await postData(
        "travelogy/one-way/fetch-data",
        reqData
      );
      if (
        result &&
        result.status &&
        result.status.success &&
        result.status.success === true &&
        result.searchResult &&
        result.searchResult.tripInfos
      ) {
        const tripInfos = result.searchResult.tripInfos;
        Object.keys(tripInfos).forEach((key) => {
          if (Array.isArray(tripInfos[key])) {
            tripInfos[key] = tripInfos[key].map((ticket: any) => ({
              ...ticket,
              id: generateStableId(ticket)
            }));
          }
        });
        setFlightData(tripInfos);
        setError("");
      } else {
        setError(result.errors[0].message);
      }
    } catch (err: any) {
      console.error("error caused", err);

      if (err?.response?.data) {
        const errorData = err.response.data;
        if (typeof errorData.error === "string") {
          if (errorData.error.toLowerCase().includes("invalid airport")) {
            setError("Invalid route. Please choose a different route.");
          } else {
            setError(errorData.error);
          }
        } else if (Array.isArray(errorData.errors) && errorData.errors.length) {
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
      // setActiveFlight(false);
      hasFetchedRef.current = false;
    }
  };

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
  const [error, setError] = useState<string>("");
  const [openFromMultiIndex, setOpenFromMultiIndex] = useState<number | null>(
    null
  );
  const [openToMultiIndex, setOpenToMultiIndex] = useState<number | null>(null);
  const [openDepartMultiIndex, setOpenDepartMultiIndex] = useState<
    number | null
  >(null);

  // Share Quote State
  const [shareMode, setShareMode] = useState(false);
  const [selectedQuoteFlights, setSelectedQuoteFlights] = useState<any[]>([]);
  const [isQuoteSharing, setIsQuoteSharing] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const [ticketMarkups, setTicketMarkups] = useState<Record<string, number>>({});
  const [markup, setMarkup] = useState<number>(0);

  useEffect(() => {
    const markupParam = searchParams.get("markup");
    if (markupParam) {
      const parsedMarkup = Number(markupParam);
      if (!isNaN(parsedMarkup)) {
        setMarkup(parsedMarkup);
      }
    }
  }, [searchParams]);

  const handleQuoteSelectionChange = (ticket: any, fareIndex: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedQuoteFlights((prev) => [
        ...prev,
        {
          ticketId: ticket.id,
          fareIndex: fareIndex,
          ticket: ticket,
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

  const handleSendQuote = async (emails: string[], withPrice: boolean) => {
    if (selectedQuoteFlights.length === 0) {
      message.warning("Please select at least one flight.");
      return;
    }
    setShareLoading(true);
    try {
      const passengerInfo = {
        adult: "1", // Reschedule typically implies 1 pax or same as original, defaulting to 1 for now or we can fetch from data
        child: "0",
        infant: "0",
        class: classLabels[srx_cabinType] || "ECONOMY"
      };

      // Construct payload with full details needed for email
      const payload = {
        emails,
        withPrice,
        flights: selectedQuoteFlights.map(item => {
          const fareOption = item.ticket.totalPriceList[item.fareIndex];
          return {
            ticket: item.ticket,
            fare: fareOption,
            fareIndex: item.fareIndex,
            markup: ticketMarkups[item.ticket.id] ?? markup
          };
        }),
        tripType: "One-Way", // Reschedule is usually treated as one-way search for new leg
        passengerInfo
      };

      await postData("travelogy/flight/send-quote", payload);
      message.success("Quote sent successfully!");
      setIsQuoteSharing(false);
      setShareMode(false);
      setSelectedQuoteFlights([]);
    } catch (err) {
      console.error(err);
      message.error("Failed to send quote");
    } finally {
      setShareLoading(false);
    }
  };

  const multiOpenfrom = (idx: number) => {
    setOpenFromMultiIndex((prev) => (prev === idx ? null : idx));
  };

  const multiOpenToSecond = (idx: number) => {
    setOpenToMultiIndex((prev) => (prev === idx ? null : idx));
  };

  const multiOpenToDateRange = (idx: number) => {
    setOpenDepartMultiIndex((prev) => (prev === idx ? null : idx));
  };
  const [openDateRage, setOpenDateRage] = useState<boolean>(false);

  const openToDateRange = () => {
    if (openDateRage) {
      closeAllFields();
    } else {
      closeAllFields();
      setOpenDateRage(true);
    }
  };

  const closeAllFields = () => {
    setOpenDateRage(false);
    setOpen(false);
  };

  const [ddr_monthStr, setDdr_monthStr] = useState(null);
  const [ddr_strdate, setDdr_strdate] = useState(null);
  const [ddr_date, setDdr_date] = useState(null);
  const [ddr_year, setDdr_year] = useState(null);

  const closePopUp = () => {
    setError("");
  };

  const handleGotItClick = () => {
    closePopUp();
    // go back to webpage
    window.history.back();
  };

  let searchEnginewidth = {};

  const renderFilters = () => (
    <>
      {isFilterApplied && (
        <div className="sticky top-36 lg:top-48 z-50 mb-2 flex justify-between items-center bg-white px-3 py-2 rounded shadow-sm border border-gray-100">
          <span className="text-black font-bold text-sm">Applied Filters <span className="text-gray-500 font-normal">({activeFilterCount})</span> :</span>
          <span
            className="cursor-pointer hover:text-orange-500 font-medium text-orange-500 text-sm"
            style={{ color: "#f97316" }}
            onClick={handleResetAllFilters}
          >
            Reset All
          </span>
        </div>
      )}
      <div className="mb-2 bg-white px-3 py-2 rounded shadow-sm border border-gray-100">
        <div className="text-black font-bold text-sm mb-2">Filter Price</div>
        <ByPrice
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          minPriceRange={minPriceRange}
          maxPriceRange={maxPriceRange}
        />
      </div>

      <div className="mb-2 bg-white px-3 py-2 rounded shadow-sm border border-gray-100 flex items-center justify-between gap-3">
        <div className="text-black font-bold text-sm whitespace-nowrap">Sort by Price</div>
        <div className="flex-1 min-w-0">
          <BySortPrice sort={priceSort} setSort={setPriceSort} />
        </div>
      </div>

      <div className="mb-2 bg-white px-3 py-2 rounded shadow-sm border border-gray-100 flex items-center justify-between gap-3">
        <div className="text-black font-bold text-sm whitespace-nowrap">Stops</div>
        <div className="flex-1 min-w-0">
          <ByStops stops={stops} setStops={setStops} />
        </div>
      </div>

      <div className="mb-2 bg-white px-3 py-2 rounded shadow-sm border border-gray-100">
        <div className="text-black font-bold text-sm mb-2">Departure Time</div>
        <ByDepartureTime
          departureTime={departureTime}
          setDepartureTime={setDepartureTime}
        />
      </div>

      <div className="mb-2 bg-white px-3 py-2 rounded shadow-sm border border-gray-100">
        <div className="text-black font-bold text-sm mb-2">Arrival Time</div>
        <ByArrivalTime
          arrivalTime={arrivalTime}
          setArrivalTime={setArrivalTime}
        />
      </div>

      <div className="mb-2 bg-white px-3 py-2 rounded shadow-sm border border-gray-100">
        <div className="text-black font-bold text-sm mb-2">Airlines</div>
        <div className="box-collapse scrollFilter">
          <ByAirline
            uniqueAirlines={[
              ...new Set(
                (
                  flightData?.ONWARD ||
                  flightData?.COMBO ||
                  []
                ).map((ticket: any) => ticket.sI[0].fD.aI.name)
              ),
            ]}
            selectedAirlines={selectedAirlines}
            setSelectedAirlines={setSelectedAirlines}
          />
        </div>
      </div>

      <div className="mb-2 bg-white px-3 py-2 rounded shadow-sm border border-gray-100">
        <div className="text-black font-bold text-sm mb-2">Fare Identifier</div>
        <div className="box-collapse scrollFilter">
          <ByFareIdentifier
            fareIdentifiers={fareIdentifiers}
            setFareIdentifiers={setFareIdentifiers}
            options={uniqueFareIdentifiers}
          />
        </div>
      </div>

      {/* <div className="mb-2 bg-white px-3 py-2 rounded shadow-sm border border-gray-100">
        <div className="text-black font-bold text-sm mb-2">Flight Number</div>
        <ByAirlineSearch
          flightNumberSearch={flightNumberSearch}
          setFlightNumberSearch={setFlightNumberSearch}
        />
      </div> */}

      <div className="mb-2 bg-white px-3 py-2 rounded shadow-sm border border-gray-100">
        <div className="text-black font-bold text-sm mb-2">Fare Type</div>
        <div className="box-collapse scrollFilter">
          <ByFareType
            selectedFareTypes={selectedFareTypes}
            setSelectedFareTypes={setSelectedFareTypes}
            options={uniqueFareTypes}
          />
        </div>
      </div>
    </>
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          {/* <EngineTabs active_border={'1'} /> */}

          <div className="h-[auto] w-full z-20 sticky bg_cs_search" style={{ top: "65px" }}>
            {/* Header Section */}

            {!isMobile && (
              <div
                className="hdt_header"
                // style={{ ...searchEnginewidth }}
                style={{ width: "60%" }}
              >
                <>
                  <div className="hdt_header-item relative">
                    <label>From</label>
                    <div className="hdt_value" style={{ cursor: "not-allowed" }}>
                      {
                        fetchRescheduleData?.searchQuery?.routeInfos?.[0]
                          ?.fromCityOrAirport?.city
                      }
                    </div>
                  </div>

                  <div className="hdt_header-item relative">
                    <label>To</label>
                    <div className="hdt_value" style={{ cursor: "not-allowed" }}>
                      {
                        fetchRescheduleData?.searchQuery?.routeInfos?.[0]
                          ?.toCityOrAirport?.city
                      }
                    </div>
                  </div>
                </>

                <div className="hdt_header-item relative">
                  <label>Depart</label>
                  <div onClick={openToDateRange} className="hdt_value">
                    {dd_strdate}, {dd_monthStr} {dd_date} {dd_year}
                  </div>

                  {openDateRage ? (
                    <div className="relative" style={{ zIndex: 10000002 }}>
                      <AppDateRangeFlight
                        openToDateRange={openToDateRange}
                        setDate={setDatedep}
                        minDate={null}
                        value={datedep}
                      />
                    </div>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={handlesearFlight}
                  className="hdt_search-btn"
                >
                  Search
                </button>
              </div>
            )}

            {/* Mobile Header Summary */}
            {isMobile && (
              <div style={{ background: "#1a1a2e" }}>
                <div className="mobile-search-summary py-2 px-3 flex justify-between items-center text-white">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">
                      {fetchRescheduleData?.searchQuery?.routeInfos?.[0]?.fromCityOrAirport?.city} → {fetchRescheduleData?.searchQuery?.routeInfos?.[0]?.toCityOrAirport?.city}
                    </span>
                    <span className="text-xs opacity-80">
                      {dayjs(datedep).format("DD MMM")}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="small"
                      ghost
                      onClick={openToDateRange}
                      style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}
                    >
                      Change Date
                    </Button>
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => {
                        handlesearFlight();
                      }}
                      style={{ background: "#EB5B00", borderColor: "#EB5B00" }}
                    >
                      Search
                    </Button>
                  </div>
                </div>

                {/* Inline Date Picker */}
                {openDateRage && (
                  <div className="bg-white p-2 text-black relative z-50">
                    <AppDateRangeFlight
                      openToDateRange={openToDateRange}
                      setDate={setDatedep}
                      minDate={null}
                      value={datedep}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Ticket List Section */}
          <section className="box-section block-content-tourlist background-body">
            <div className="container-fluid" style={{ width: "93%" }}>
              <div className="box-content-main">
                <div className="content-right border ">
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

                  {filteredFlightData?.ONWARD &&
                    (() => {
                      const tripInfo = filteredFlightData?.ONWARD;

                      return (
                        <>
                          {tripInfo?.length > 0 ? (
                            <>
                              <div className="box-grid-tours">
                                {/* Mobile Filter Button */}
                                <div className="d-xl-none d-block p-2" style={{ textAlign: "right" }}>
                                  <Button
                                    type="primary"
                                    icon={<FilterOutlined />}
                                    onClick={showFilterDrawer}
                                    style={{ marginBottom: "10px" }}
                                  >
                                    Filters
                                  </Button>
                                </div>

                                {/* Drawer */}
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

                                <div className="row">
                                  <div
                                    className="box-list-flights box-list-flights-2"
                                    style={{ padding: "10px" }}
                                  >
                                    <div className="sticky top-36 lg:top-48 z-10 mb-2 flex justify-end items-center bg-white p-2 rounded shadow-sm border border-gray-100" style={{ marginTop: "10px" }}>
                                      {!shareMode ? (
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                          <ShareAltOutlined />
                                          <span className="font-semibold">Share By :</span>
                                          <span
                                            className="cursor-pointer hover:text-blue-800 font-medium text-blue-600 flex items-center gap-1 transition-colors"
                                            onClick={() => setShareMode(true)}
                                          >
                                            <MailOutlined />
                                            Email
                                          </span>
                                        </div>
                                      ) : (
                                        <div className="flex items-center gap-3 w-full justify-between">
                                          <div className="text-gray-600 text-sm font-medium">
                                            Select flights to share ({selectedQuoteFlights.length} selected)
                                          </div>
                                          <div className="flex gap-2">
                                            <span
                                              className="cursor-pointer text-orange-500 font-bold hover:text-orange-600 flex items-center gap-1"
                                              onClick={() => setIsQuoteSharing(true)}
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

                                    {tripInfo.map((ticket: any) => (
                                      <React.Fragment key={ticket.id}>
                                        {isMobile ? (
                                          <TicketCardMobile
                                            ticket={ticket}
                                            flightData={flightData}
                                            markup={markup}
                                            shareMode={shareMode}
                                            selectedQuoteFlights={selectedQuoteFlights}
                                            onQuoteSelectionChange={handleQuoteSelectionChange}
                                            selectedFareIdentifiers={fareIdentifiers}
                                          // onPriceClick={openMarkupModal} 
                                          />
                                        ) : (
                                          <TicketCard1
                                            ticket={ticket}
                                            flightData={flightData}
                                            reschedule={true}
                                            requestId={requestId}
                                            shareMode={shareMode}
                                            selectedQuoteFlights={selectedQuoteFlights}
                                            onQuoteSelectionChange={handleQuoteSelectionChange}
                                            selectedFareIdentifiers={fareIdentifiers}
                                          />
                                        )}
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
                                  Request flight is not longer available. Please
                                  try different flight
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
                </div>

                {/* Left Sidebar Filters */}
                {!isMobile && (
                  <div className="content-left order-lg-first">
                    {/* Desktop Sidebar */}
                    <div className="d-none d-xl-block">
                      {renderFilters()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>



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
          </section >
          <div className="pb-90 background-body" />
        </main >
        <QuoteShareModal
          isOpen={isQuoteSharing}
          onClose={() => setIsQuoteSharing(false)}
          onSend={handleSendQuote}
          loading={shareLoading}
        />
      </Layout >
    </Suspense >
  );
}
