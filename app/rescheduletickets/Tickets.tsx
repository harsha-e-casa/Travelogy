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
// import Cookies from "js-cookie";
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

  const { getCookie } = useContext(AppContext);
  const [flightData, setFlightData] = useState<any>(null);
  const [activeFlight, setActiveFlight] = useState<any>(true);
  const [loading, setloading] = useState<boolean>(false);
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
  const [uniqueAirlines, setUniqueAirlines] = useState<any[]>([]);

  useEffect(() => {
    if (flightData && (flightData.ONWARD || flightData.COMBO)) {
      const dataToCheck = flightData.ONWARD || flightData.COMBO;
      const [minPrice, maxPrice] = getPriceRangeFromData(dataToCheck);

      setMinPriceRange(minPrice);
      setMaxPriceRange(maxPrice);

      if (priceRange[0] !== minPrice || priceRange[1] !== maxPrice) {
        setPriceRange([minPrice, maxPrice]);
      }

      const allAirlines = dataToCheck.map((ticket: any) => ticket.sI[0].fD.aI.name);
      const unique = Array.from(new Set(allAirlines));
      setUniqueAirlines(unique.map(name => ({ name, count: allAirlines.filter((a: string) => a === name).length })));

      const allFareIdentifiers = dataToCheck.flatMap((ticket: any) =>
        ticket.totalPriceList.map((priceInfo: any) => priceInfo.fareIdentifier)
      ).filter(Boolean);

      const fareCounts = allFareIdentifiers.reduce((acc: any, fare: string) => {
        acc[fare] = (acc[fare] || 0) + 1;
        return acc;
      }, {});

      const uniqueFaresWithCounts = Object.keys(fareCounts).map(fare => ({
        name: fare,
        count: fareCounts[fare]
      }));

      setUniqueFareIdentifiers(uniqueFaresWithCounts);

      const type: any = {
        1 : "Refundable",
        2 : "Partial Refundable"
      }
      const allFareTypes = dataToCheck
        .flatMap((ticket: any, ticketIndex: number) => {
          console.log("🔹 Ticket Index:", ticketIndex, "Ticket Data:", ticket);

          return ticket.totalPriceList.flatMap((priceInfo: any, priceIndex: number) => {
            console.log("   🔸 PriceInfo Index:", priceIndex, "PriceInfo Data:", priceInfo);

            return Object.keys(priceInfo.fd).map((paxTypeKey) => {
              console.log("      🔹 paxTypeKey:", paxTypeKey);
              console.log("      🔹 paxTypeObj:", priceInfo.fd[paxTypeKey]);
              return priceInfo.fd[paxTypeKey].rT;
            });
          });
        })
        .filter((val: any) => {
          console.log("✅ Filtering value:", val);
          return val;
        });

      console.log("🎯 Final allFareTypes:", allFareTypes);


      const fareTypeCounts = allFareTypes.reduce((acc: any, fareType: string) => {
        acc[fareType] = (acc[fareType] || 0) + 1;
        return acc;
      }, {});

      const uniqueFareTypesWithCounts = Object.keys(fareTypeCounts).map(fareType => ({
        name: type[fareType],
        count: fareTypeCounts[fareType]
      }));

      setUniqueFareTypes(uniqueFareTypesWithCounts);
    }
  }, [flightData]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedAirlines((prevSelectedAirlines) =>
      checked
        ? [...prevSelectedAirlines, value]
        : prevSelectedAirlines.filter((airline) => airline !== value)
    );
  };

  const handleFareIdentifierChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    console.log("applyFilters ==> ");
    if (flightData && (flightData.ONWARD || flightData.COMBO)) {
      let dataToFilter = flightData.ONWARD || flightData.COMBO;

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
          return ticket.totalPriceList.some((priceInfo: any) => fareIdentifiers.includes(priceInfo.fareIdentifier));
        });
      }

      if (selectedFareTypes.length > 0) {
        const typeMap: { [key: number]: string } = {
          1: "Refundable",
          2: "Partial Refundable"
        };

        filteredData = filteredData.filter((ticket: any) => {
          return ticket.totalPriceList.some((priceInfo: any) => 
            Object.keys(priceInfo.fd).some(paxType => {
              const fareType = typeMap[priceInfo.fd[paxType].rT];
              return selectedFareTypes.includes(fareType);
            })
          );
        });
      }

      setFilteredFlightData({ ONWARD: filteredData });
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
  }, [priceRange, stops, departureTime, selectedAirlines, arrivalTime, fareIdentifiers, selectedFareTypes, flightData]);


  const router = useRouter();

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
  const searchParams = useSearchParams();
  const rsData = getCookie("rs_data");
  const fetchRescheduleData = JSON.parse(rsData);
  console.log(
    "fetchRescheduleDatafetchRescheduleData == ",
    fetchRescheduleData
  );

  const requestId = searchParams.get("requestId");
  console.log("requestIdrequestIdrequestId ", requestId);

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
          console.log(
            "handlesearFlight parameter ---------------> ",
            parameter
          );
          let reqData = {
            action: "searchQuery",
            requestData: parameter,
          };
          const result: any = await postData(
            "travelogy/one-way/fetch-data",
            reqData
          );
          console.log("resultresult ---------------> ", result);
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
      alert("fetchRescheduleData not available");
    }
  };

  const [searchFlight, SetSearchFlight] = useState<boolean>(true);
  const hasFetchedRef = useRef(false);
  const [srx_cabinType, setCabinType] = useState<any>(null);

  const classLabels = {
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
        setFlightData(result.searchResult.tripInfos);
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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          {/* <EngineTabs active_border={'1'} /> */}

          <div className="h-[auto] w-full z-20 sticky top-0 bg_cs_search">
            {/* Header Section */}

            <div className="hdt_header" style={{ ...searchEnginewidth }}>
              <>
                <div className="hdt_header-item relative">
                  <label>From</label>
                  <div className="hdt_value">
                    {
                      fetchRescheduleData?.searchQuery?.routeInfos?.[0]
                        ?.fromCityOrAirport?.city
                    }
                  </div>
                </div>

                <div className="hdt_header-item relative">
                  <label>To</label>
                  <div className="hdt_value">
                    {
                      fetchRescheduleData?.searchQuery?.routeInfos?.[0]
                        ?.toCityOrAirport?.city
                    }
                  </div>
                </div>
              </>

              <div className="hdt_header-item">
                <label>Depart</label>
                <div onClick={openToDateRange} className="hdt_value">
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

              <button
                type="button"
                onClick={handlesearFlight}
                className="hdt_search-btn"
              >
                Search
              </button>
            </div>
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
                                          reschedule={true}
                                        />
                                      </React.Fragment>
                                    ))}
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
                <div className="content-left order-lg-first">
                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          Filter Price{" "}
                        </h6>
                        <ByPrice
                          flightData={flightData}
                          priceRange={priceRange}
                          setPriceRange={setPriceRange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          Stops
                        </h6>
                        <ByStops stops={stops} setStops={setStops} />
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
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
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          Airlines
                        </h6>
                        <div className="box-collapse scrollFilter">
                          <ByAirline
                            uniqueAirlines={uniqueAirlines}
                            selectedAirlines={selectedAirlines}
                            handleCheckboxChange={handleCheckboxChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
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
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          Fare Identifier
                        </h6>
                        <div className="box-collapse scrollFilter">
                          <ByFareIdentifier
                            uniqueFareIdentifiers={uniqueFareIdentifiers}
                            selectedFareIdentifiers={fareIdentifiers}
                            handleCheckboxChange={handleFareIdentifierChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          Fare Type
                        </h6>
                        <div className="box-collapse scrollFilter">
                          <ByFareType
                            uniqueFareTypes={uniqueFareTypes}
                            selectedFareTypes={selectedFareTypes}
                            handleCheckboxChange={handleFareTypeChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
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
