"use client";

import React, { useEffect, useState, useContext, useRef } from "react";
import ByAirline from "@/components/Filter/ByAirline";
import ByClass from "@/components/Filter/ByClass";
import ByLocation from "@/components/Filter/ByLocation";
import ByPagination from "@/components/Filter/ByPagination";
import ByPrice from "@/components/Filter/ByPrice";
import ByRating from "@/components/Filter/ByRating";
import SearchFilterBottom from "@/components/elements/SearchFilterBottom";
import SortTicketsFilter from "@/components/elements/SortTicketsFilter";
import TicketCard1 from "@/components/elements/ticketcard/TicketCard1";
import DomesticRoundTripTicketCard from "@/components/elements/ticketcard/DomesticRoundTripTicketCard";
import RoundTripSelectionView from "@/components/elements/ticketcard/RoundTripSelectionView";
import MulticitySelectionView from "@/components/elements/ticketcard/MulticitySelectionView.jsx";
import Layout from "@/components/layout/Layout";
import SwiperGroupPayment10Slider from "@/components/slider/SwiperGroupPayment10Slider";
import rawticketsData from "@/util/tickets.json";
import useTicketFilter from "@/util/useTicketFilter";
import EngineTabs from "@/components/searchEngine/engineHeader";
import Link from "next/link";
import { postDataTJ, postData } from "../../services/NetworkAdapter";
import { useSearchParams, useRouter } from "next/navigation";
import { Skeleton } from "antd";
import AppListSearch from "@/components/searchEngine/AppListSearch";
import AppDateRage from "@/components/searchEngine/AppDateRage";
import "./customeHeader_1.css";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { tree } from "next/dist/build/templates/app-page";
import { AppContext } from "../../util/AppContext";
import { TravellerForm } from "@/components/searchEngine/TravellerForm";

// Convert ticket ratings from string to number
const ticketsData = rawticketsData.map((ticket) => ({
  ...ticket,
  rating: parseFloat(ticket.rating as string),
}));

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

  const { getCookie } = useContext(AppContext);
  const [flightData, setFlightData] = useState<any>(null);
  const [activeFlight, setActiveFlight] = useState<any>(true);
  const [loading, setloading] = useState<boolean>(false);

  const router = useRouter();
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
          const result = await postData(
            "travelogy/one-way/fetch-data",
            reqData
          );
          console.log("resultresult ---------------> ", result);
          loadReissueTicket(result?.searchQuery?.requestId)
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
          SetSearchFlight(false);
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

  const loadReissueTicket = async (requestId) => {
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
      const result = await postData("travelogy/one-way/fetch-data", reqData);
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
      setActiveFlight(false);
      SetSearchFlight(false);
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
  const [error, setError] = useState(null);
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
    <>
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
                  <AppDateRage
                    openToDateRange={openToDateRange}
                    setDatedep={setDatedep}
                  />
                ) : null}
              </div>

              <button onClick={handlesearFlight} className="hdt_search-btn">
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
                    <div className="box-list-flights box-list-flights-2">
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

                  {flightData?.ONWARD &&
                    (() => {
                      const tripInfo = flightData?.ONWARD;

                      return (
                        <>
                          {tripInfo?.length > 0 ? (
                            <>
                              <div className="box-grid-tours">
                                <div className="row">
                                  <div className="box-list-flights box-list-flights-2">
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
                          filter={filter}
                          handlePriceRangeChange={handlePriceRangeChange}
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
                            filter={filter}
                            handleCheckboxChange={handleCheckboxChange}
                          />
                          <div className="box-see-more mt-20 mb-25">
                            <Link className="link-see-more" href="#">
                              See more
                              <svg
                                width={8}
                                height={6}
                                viewBox="0 0 8 6"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M7.89553 1.02367C7.75114 0.870518 7.50961 0.864815 7.35723 1.00881L3.9998 4.18946L0.642774 1.00883C0.490387 0.86444 0.249236 0.870534 0.104474 1.02369C-0.0402885 1.17645 -0.0338199 1.4176 0.118958 1.56236L3.73809 4.99102C3.81123 5.06036 3.90571 5.0954 3.9998 5.0954C4.0939 5.0954 4.18875 5.06036 4.26191 4.99102L7.88104 1.56236C8.03382 1.41758 8.04029 1.17645 7.89553 1.02367Z" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          Class / Cabin
                        </h6>
                        <ByClass
                          uniqueClasses={uniqueClasses}
                          filter={filter}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-banner">
                    <Link href="#">
                      <img
                        src="/assets/imgs/page/tickets/banner-ads.png"
                        alt="Travalogy"
                      />
                    </Link>
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
    </>
  );
}
