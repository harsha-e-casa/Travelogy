"use client";

import BookingForm from "@/components/elements/BookingForm";
import Layout from "@/components/layout/Layout";
import {
  postDataFareDetails,
  postDataFlightDetails,
  postDataTJBookingAir,
  postFareValidate,
  postData,
} from "@/services/NetworkAdapter";
import { AppContext } from "@/util/AppContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState, Suspense } from "react";
import { Tabs, message } from "antd";
import { checkTokenExpiry } from "@/services/Utils";

import "./style.css";

import { format } from "date-fns";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import SessionTime from "../book-ticket/SessionTime";
import useSessionTime from "../book-ticket/useSessionTime";
import { jwtDecode } from "jwt-decode";

const ReviewPage = () => {
  const searchParams = useSearchParams();
  const priceId = searchParams.get("tcs_id");
  const payment = searchParams.get("payment");
  const urlBookingId = searchParams.get("booking_id");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const [loading, setLoading] = useState(false);
  const [holdLoading, setHoldLoading] = useState(false);
  const [paymentFailurePopup, setPaymentFailurePopup] = useState(
    new URLSearchParams(window.location.search).get("payment") === "retry"
  );
  const [loginPhone, setLoginPhone] = useState(null)

  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken");
      const decoded = jwtDecode(token);
      setLoginPhone(decoded.phone);

    } catch {
      // setIsVisible(false);
    }
  }, []);
  // useEffect(() => {
  //   if (payment === "retry") {
  //     setPaymentFailurePopup(true);
  //   } else {
  //     setPaymentFailurePopup(false);
  //   }
  // }, []);

  const router = useRouter();

  useEffect(() => {
    const tokenValid = checkTokenExpiry();
    if (!tokenValid) {
      localStorage.removeItem("authToken");
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  //
  let ids = [];
  if (priceId.includes(",")) {
    ids = priceId.split(","); // all split values
  } else {
    ids = [priceId];
  }
  const parameter = { priceIds: ids };

  const [flightData, setFlightData] = useState(null);
  const [error, setError] = useState(null);
  const { getCookie } = useContext(AppContext);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingLoadingWallet, setBookingLoadingWallet] = useState(false);
  const [paymsg, setPaymsg] = useState("");
  const [paymentModel, setPaymentModel] = useState(false);
  const tripType = getCookie("gy_triptype");
  const [showWalletConfirm, setShowWalletConfirm] = useState(false);

  const [fareDetails, setFareDetails] = useState(null);

  const [travellers, setTravellers] = useState([]);
  const [email, setEmail] = useState(null);
  const [number, setNumber] = useState(null);
  const [totalPriceinfo, setTotalpriceinfo] = useState(null);
  const [showMore, setShowMore] = useState(true);
  const BaggageAmount = JSON.parse(getCookie("baggageinfo") || "[]");
  const MealAmount = JSON.parse(getCookie("mealinfo") || "[]");
  const SeatAmount = Number(getCookie("seatSsr_amount") || 0);

  const [markup, setMarkup] = useState(0);
  const { removeCookie } = useContext(AppContext);

  const handleSessionExpire = React.useCallback(() => {
    if (!hasExpired.current) {
      hasExpired.current = true;
    }
  }, []);
  const timeLeftRef = useSessionTime(
    flightData?.conditions?.sct,
    flightData?.conditions?.st,
    handleSessionExpire
  );

  const hasExpired = React.useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let storedApiData = null;
      if (urlBookingId) {
        storedApiData = localStorage.getItem(`bookingData_${urlBookingId}`);
      }
      if (!storedApiData) {
        storedApiData = localStorage.getItem("apiData");
      }

      if (storedApiData) {
        setFlightData(JSON.parse(storedApiData));
      }
    }
  }, [urlBookingId]);

  useEffect(() => {
    const data = getCookie("travellerInfo");
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setTravellers(parsedData);
      } catch (err) {
        console.error("Invalid JSON in cookie:", err);
      }
    }
  }, []);

  useEffect(() => {
    const data = getCookie("email");
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setEmail(parsedData);
      } catch (err) {
        console.error("Invalid JSON in cookie:", err);
      }
    }
  }, []);

  useEffect(() => {
    const data = getCookie("number");
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setNumber(parsedData);
      } catch (err) {
        console.error("Invalid JSON in cookie:", err);
      }
    }
  }, []);

  // Function to fetch flight details
  // const fetchFlightDetails = async (priceId) => {
  //   setLoading(true);
  //   setError(null);

  //   if (!priceId) {
  //     setError("Price ID is missing");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     // const parameter = { priceIds: [priceId] };
  //     console.log("Fetching with parameter FOR REVIEW:", parameter);

  //     const data = await postDataFlightDetails(parameter);
  //     console.log("Flight detailsssss FOR REVIEW:", data);
  //     setFlightData(data); // Update state with flight details
  //   } catch (err) {
  //     console.error("error caused", err);

  //     if (err?.response?.data?.errors?.length) {
  //       const firstError = err.response.data.errors[0];
  //       const message = firstError?.message || "An unknown error occurred.";
  //       const details = firstError?.details ? ` - ${firstError.details}` : "";
  //       setError(`${message}`);

  //       console.log("API error message:", message);
  //       console.log("Error details:", details);
  //       console.log("Error status code:", err.response.status);
  //     } else if (err?.message) {
  //       setError(err.message);
  //       console.log("Generic error message:", err.message);
  //     } else {
  //       setError("Something went wrong. Please try again.");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //to fetch fare rule
  const fetchFareRule = async (params) => {
    // setLoading(true);
    // setError(null);

    try {
      const data = await postDataFareDetails(params);
      setFareDetails(data);
    } catch (err) {
      console.error("error caused", err);

      if (err?.response?.data?.errors?.length) {
        const firstError = err.response.data.errors[0];
        const message = firstError?.message || "An unknown error occurred.";
        const details = firstError?.details ? ` - ${firstError.details}` : "";
        setError(`${message}`);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      // setLoading(false);
    }
  };

  // UseEffect to call the function when 'tcs_id' is available in the search params
  // useEffect(() => {
  //   console.log("fetchFlightDetails Extracted tcs_id:", priceId); // Debug log to check if tcs_id is correct
  //   if (priceId) {
  //     fetchFlightDetails(priceId);
  //   } else {
  //     setError("No valid tcs_id found in the URL.");
  //   }
  // }, [priceId]);

  useEffect(() => {
    if (priceId) {
      fetchFareRule({ id: [priceId], flowType: "SEARCH" });
    } else {
      setError("No valid tcs_id found in the URL.");
    }
  }, [priceId]);

  const BookingSkeleton = () => {
    return (
      <section className="section-box block-content-book-tickets background-card mb-20 ">
        <div className="container pt-1">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-4 animate-pulse"></div>

          <div className="row mt-20">
            <div className="col-lg-8">
              <div className="box-content-tickets-detail p-3 flex gap-3 items-center bg-gray-100 animate-pulse rounded">
                <div className="w-24 h-4 bg-gray-300 rounded" />
                <div className="w-4 h-4 bg-gray-400 rounded-full" />
                <div className="w-24 h-4 bg-gray-300 rounded" />
                <div className="w-10 h-4 bg-gray-300 rounded" />
                <div className="w-32 h-4 bg-gray-300 rounded" />
              </div>

              <div className="mt-10 bg-white shadow rounded-lg p-6">
                <div className="h-4 w-1/3 bg-gray-300 rounded mb-6 animate-pulse"></div>

                <div className="item-flight border border-black-200 rounded p-5 mb-6 animate-pulse flex flex-col gap-4">
                  <div className="h-4 w-40 bg-gray-300 rounded" />
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-24 bg-gray-300 rounded" />
                      <div className="h-3 w-20 bg-gray-200 rounded" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-24 bg-gray-300 rounded" />
                      <div className="h-3 w-20 bg-gray-200 rounded" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-24 bg-gray-300 rounded" />
                      <div className="h-3 w-20 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>

                <div className="h-4 w-1/3 bg-gray-300 rounded mb-6 animate-pulse"></div>

                <div className="h-24 bg-gray-200 rounded mb-6"></div>
                <div className="h-20 bg-gray-200 rounded mb-6"></div>

                <div className="flex justify-between mt-6">
                  <div className="h-10 w-24 bg-gray-300 rounded"></div>
                  <div className="h-10 w-24 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="h-96 bg-gray-200 rounded add_sticky animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Trip info
  const segments = flightData?.tripInfos.flatMap((trip) => trip.sI) ?? [];
  const segmentId = flightData?.tripInfos
    ?.map((e, i) => e.sI?.map((data) => data.id))
    .join("");

  const totalpriceinfos =
    flightData?.tripInfos.flatMap((trip) => trip.totalPriceList) ?? [];
  const cabinBaggage = totalpriceinfos.map((e) => e.fd?.ADULT?.bI?.iB);
  const checkinBaggage = totalpriceinfos.map((e) => e.fd?.ADULT?.bI?.cB);
  const flightNames = segments.map((segment) => segment.fD?.aI?.name);
  const flightnumber = segments.map((segment) => segment.fD?.fN);
  const flighteT = segments.map((segment) => segment.fD?.eT);
  const flightcode = segments.map((segment) =>
    (segment.fD?.aI?.code).toLowerCase()
  );
  const stops = segments.map((segment) =>
    segment.stops === 0
      ? "Non Stop"
      : `${segment.stops} Stop${segment.stops > 1 ? "s" : ""}`
  );
  const duration = segments.map((segment) => {
    if (!segment.duration) return "";

    const hours = Math.floor(segment.duration / 60);
    const minutes = segment.duration % 60;

    return `${hours}h ${minutes}m`;
  });
  const dt = segments.map((segment) => segment.dt.split("T")[1]);
  const at = segments.map((segment) => segment.at.split("T")[1]);
  let departureDate = segments.map((segment) => segment.dt);
  const arrivalDate = segments.map((segment) => segment.at);
  const formatDepartureDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString))) return "";
    return format(new Date(dateString), "EEE, dd MMM");
  };

  const formatArrivalDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString))) return "";
    return format(new Date(dateString), "EEE, dd MMM");
  };

  const dcountry = segments.map((segment) => segment.da?.country);
  const dcity = segments.map((segment) => segment.da?.city);
  const dcitycode = segments.map((segment) => segment.da?.code);

  const acountry = segments.map((segment) => segment.aa?.country);
  const aterminal = segments.map((segment) => segment.aa?.terminal);
  const acity = segments.map((segment) => segment.aa?.city);
  const acitycode = segments.map((segment) => segment.aa?.code);
  const aairportname = segments.map((segment) => segment.aa?.name);
  const dairportname = segments.map((segment) => segment.da?.name);
  const terminal = segments.map((segment) => segment.da?.terminal);

  // Search query
  const routeinfo = flightData?.searchQuery?.routeInfos ?? [];
  const fromCity = routeinfo.map((e) => e.fromCityOrAirport?.city);
  const toCity = routeinfo.map((e) => e.toCityOrAirport.city);
  const traveldata = routeinfo.map((e) => e.travelDate);

  const [cookieMealData, setCookieMealData] = useState({});
  const [cookieBaggageData, setCookieBaggageData] = useState({});
  const [cookieMappedSeatData, setCookieMappedSeatData] = useState({});

  useEffect(() => {
    const getCookieMealData = getCookie("mealinfo");
    const mealData = JSON.parse(getCookieMealData);
    setCookieMealData(mealData);

    const getCookiebaggageData = getCookie("baggageinfo");
    const baggageData = JSON.parse(getCookiebaggageData);
    setCookieBaggageData(baggageData);

    const getCookieSeatData = getCookie("mappedSeatInfo");
    const mappedSeatData = JSON.parse(getCookieSeatData);
    setCookieMappedSeatData(mappedSeatData);
  }, []);

  //bookingid
  const bookingId = flightData ? flightData.bookingId : null;

  useEffect(() => {
    if (bookingId) {
      const fetchMarkup = async () => {
        try {
          // Fetch markup from the dedicated endpoint
          const result = await postData("travelogy/flight/get-markup", {
            bookingId,
          });
          if (result && result.markup !== undefined) {
            setMarkup(Number(result.markup));
          }
          // Remove the cookie as per requirements (cleanup)
          removeCookie(`gy_markup_${bookingId}`);
        } catch (error) {
          console.error("Error fetching markup:", error);
        }
      };
      fetchMarkup();
    }
  }, [bookingId]);

  // Total price info
  useEffect(() => {
    if (flightData?.totalPriceInfo?.totalFareDetail) {
      setTotalpriceinfo(flightData.totalPriceInfo.totalFareDetail);
    }
  }, [flightData]);
  const fd = totalpriceinfos.map((e) => e.fd) ?? {};
  // const fareIdentifier = totalpriceinfos.map((e) => e.fareIdentifier) ?? {};
  const cabinclass = fd.map((e) => e.ADULT?.cc);
  const refundabletype = fd.map((e) =>
    e.ADULT?.rT === 0 ? "Refundable" : "non-refundable"
  );

  //totalfare
  const totalprice = flightData?.totalPriceInfo?.totalFareDetail?.fC?.TF;
  const baggageTotal =
    BaggageAmount?.reduce((acc, curr) => acc + curr.amount, 0) || 0;
  const mealTotal = MealAmount.reduce((acc, curr) => acc + curr.amount, 0);
  const seatTotal = SeatAmount && SeatAmount !== "" ? SeatAmount : 0;
  const currentUrl = window.location.href;

  const finalAmountToPay =
    totalprice + baggageTotal + mealTotal + seatTotal + Number(markup);
  //fare rule api
  const fareRule = fareDetails?.fareRule?.[`${dcitycode}-${acitycode}`]?.tfr;

  const cancellation = fareRule?.CANCELLATION ?? [];
  const noShow = fareRule?.NO_SHOW ?? [];
  const dateChange = fareRule?.DATECHANGE ?? [];
  const seatCharge = fareRule?.SEAT_CHARGEABLE ?? [];

  // Cancellation
  const cancellationAmount = cancellation.map((e) => e.amount);
  const cancellationPolicy = cancellation.map((e) => e.policyInfo);
  const cancellationPenaltyPeriod = cancellation.map((e) => e.pp);
  const cancellationLength = cancellation.length;
  const cancellationFee = cancellation.map((e) => e.fcs?.ACF);
  const cancellationST = cancellation.map((e) => e.st ?? 0);
  const cancellationET = cancellation.map((e) => e.et ?? 365);

  const hasFareRules = fareRule && Object.keys(fareRule).length > 0;

  // No Show
  const noShowPolicy = noShow.map((e) =>
    e.policyInfo?.includes("__nls__")
      ? e.policyInfo.replace(/__nls__/g, "")
      : e.policyInfo
  );
  const noShowPenaltyPeriod = noShow.map((e) => e.pp);
  const noShowST = noShow.map((e) => e.st ?? 0);
  const noShowET = noShow.map((e) => e.et / 24 ?? 365);

  // Date Change
  const dateChangeAmount = dateChange.map((e) => e.amount);
  const dateChangePolicy = dateChange.map((e) => e.policyInfo);
  const dateChangePenaltyPeriod = dateChange.map((e) => e.pp);
  const dateChangeFee = dateChange.map((e) => e.fcs?.ARF);
  const dateChangeSt = dateChange.map((e) => e.st ?? 0);
  const dateChangeEt = dateChange.map((e) => e.et / 24 ?? 365);

  //seat charge
  const seatChargeSt = seatCharge.map((e) => e.st ?? null);
  const seatChargeEt = seatCharge.map((e) => e.et / 24 ?? null);
  const searchTickets = () => {
    let departureFrom = getCookie("gy_da");
    let arrivalTo = getCookie("gy_aa");
    let adults = getCookie("gy_adult");
    let children = getCookie("gy_child");
    let cabinType = getCookie("gy_class");
    let departDate = getCookie("gy_trd");
    let returnDate = getCookie("gy_return");

    const mydata = {
      departureFrom: departureFrom,
      arrivalTo: arrivalTo,
      adults: adults,
      children: children,
      cabinType: cabinType,
      departDate: departDate,
    };

    const queryString = new URLSearchParams(mydata).toString(); // produces "id=10&date=1222"

    router.push(`/tickets?${queryString}`);
  };

  let date = new Date(traveldata);

  // Subtract one day (24 hours in milliseconds)
  date.setDate(date.getDate() - 1);

  // Format the new date in the desired format (e.g., "Monday, April 28, 2025")
  // const options = {
  //   weekday: "short", // Mon
  //   month: "short", // Apr
  //   day: "numeric", // 28
  // };
  // const formattedDate = date.toLocaleDateString("en-US", options);
  const options2 = {
    month: "short", // Apr
    day: "numeric", // 28
  };
  const formatteddate2 = date.toLocaleDateString("en-US", options2);

  // FARE RULES OBJ
  const fareRulesMap = {};

  flightData?.tripInfos.forEach((trip) => {
    const segments = trip.sI;
    if (!segments || segments.length === 0) return;

    // Get route key like "DEL-BOM"
    const from = segments[0].da.code;
    const to = segments[segments.length - 1].aa.code;
    const routeKey = `${from}-${to}`;

    trip.totalPriceList.forEach((price) => {
      if (price.fareRuleInformation) {
        fareRulesMap[routeKey] = {
          fareRuleInformation: price.fareRuleInformation,
          refundType:
            price?.fd?.ADULT?.rT === 0 ? "Refundable" : "Non-Refundable",
        };
      }
    });
  });
  const reviewMap = {};

  if (flightData?.tripInfos) {
    flightData.tripInfos.forEach((trip) => {
      const segs = trip.sI;
      if (!segs || segs.length === 0) return;
      const key = `${segs[0].da.code}-${segs[segs.length - 1].aa.code}`;

      // fare rule
      trip.totalPriceList.forEach((p) => {
        if (p.fareRuleInformation) {
          fareRulesMap[key] = {
            fareRuleInformation: p.fareRuleInformation,
            refundType: p.fd.ADULT.rT === 0 ? "Refundable" : "Non-Refundable",
          };
        }
      });

      // review dt
      reviewMap[key] = segs;
    });
  }

  const getDepartureTimeForRoute = (routeKey) => {
    const segs = reviewMap[routeKey];
    if (!segs?.length) return "N/A";
    return dayjs(segs[0].dt).format("HH:mm");
  };

  const [selectedRoute, setSelectedRoute] = useState();

  useEffect(() => {
    const keys = Object.keys(fareRulesMap);
    if (keys.length > 0 && !selectedRoute) {
      setSelectedRoute(keys[0]);
    }
  }, [fareRulesMap]);

  const fareRulesData = fareRulesMap[selectedRoute] || {};

  const itemss = [
    {
      label: (
        <span className="text-sm-medium neutral-500">CANCELLATION FEE</span>
      ),
      key: "2",
      children: (
        <>
          <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-2 bg-gray-100 font-semibold text-gray-700 p-3 text-sm">
              <div>Time Frame</div>
              <div>Cancellation Fee</div>
            </div>

            {/* Table Row */}
            <div className="grid grid-cols-2  px-3 py-4 border-t border-gray-200 text-sm">
              <div className="text-gray-700">
                {" "}
                {fareRulesData?.fareRuleInformation?.tfr?.CANCELLATION?.[0]
                  ?.st &&
                  fareRulesData?.fareRuleInformation?.tfr?.CANCELLATION?.[0]
                    ?.et ? (
                  <div>{`${fareRulesData?.fareRuleInformation?.tfr?.CANCELLATION?.[0]
                    ?.st
                    } hrs to ${Math.floor(
                      fareRulesData?.fareRuleInformation?.tfr?.CANCELLATION?.[0]
                        ?.et / 24
                    )} days`}</div>
                ) : (
                  <p>
                    {
                      fareRulesData?.fareRuleInformation?.tfr?.CANCELLATION?.[0]
                        ?.pp
                    }
                  </p>
                )}
              </div>

              <div className="text-gray-600">
                {fareRulesData?.fareRuleInformation?.tfr?.CANCELLATION?.[0]
                  ?.pp === undefined ? (
                  <>
                    <div>
                      {fareRulesData?.fareRuleInformation?.tfr
                        ?.CANCELLATION?.[0]?.policyInfo ? (
                        <>
                          {fareRulesData.fareRuleInformation.tfr.CANCELLATION[0].policyInfo
                            .split("__nls__")
                            .filter(Boolean)
                            .map((line, index) => (
                              <div key={index}>{line.trim()}</div>
                            ))}
                        </>
                      ) : null}
                      <div>
                        {(() => {
                          const cItem =
                            fareRulesData?.fareRuleInformation?.tfr?.CANCELLATION?.[0];
                          if (cItem?.amount && cItem?.additionalFee) {
                            return (
                              <>
                                ₹{cItem.amount} + ₹{cItem.additionalFee}
                              </>
                            );
                          }
                          if (cItem?.amount || cItem?.additionalFee) {
                            return <>₹{cItem?.amount || cItem?.additionalFee}</>;
                          }
                          return null;
                        })()}
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    {" "}
                    {(() => {
                      const cItem =
                        fareRulesData?.fareRuleInformation?.tfr?.CANCELLATION?.[0];
                      if (cItem?.amount && cItem?.additionalFee) {
                        return (
                          <>
                            ₹{cItem.amount} + ₹{cItem.additionalFee}
                          </>
                        );
                      }
                      if (cItem?.amount || cItem?.additionalFee) {
                        return <>₹{cItem?.amount || cItem?.additionalFee}</>;
                      }
                      return null;
                    })()}{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      label: (
        <span className="text-sm-medium neutral-500">DATE CHANGE FEE</span>
      ),
      key: "3",
      children: (
        <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-2 bg-gray-100 font-semibold text-gray-700 p-3 text-sm border-b border-gray-300">
            <div>Time Frame</div>
            <div>Date Change Fee</div>
          </div>

          {/* Dividing line between header and content */}
          <div className="grid grid-cols-2 items-center   px-3 py-4 border-t border-gray-200 text-sm">
            <div className="text-gray-700 space-y-5">
              {" "}
              {(() => {
                const dateChange =
                  fareRulesData?.fareRuleInformation?.tfr?.DATECHANGE?.[0];

                if (!dateChange) return null;

                const { st, et, pp } = dateChange;

                if (st && et) {
                  return (
                    <div>
                      {`${st} hrs to ${et > 24 ? Math.floor(et / 24) + " days" : et + " hrs"
                        }`}
                    </div>
                  );
                } else {
                  return <p>{pp}</p>;
                }
              })()}
            </div>
            <div className="text-gray-600 space-y-5">
              {(() => {
                const dateChange =
                  fareRulesData?.fareRuleInformation?.tfr?.DATECHANGE?.[0];

                if (dateChange?.policyInfo) {
                  return (
                    <div>
                      {dateChange?.policyInfo ? (
                        <>
                          {dateChange.policyInfo
                            .split("__nls__")
                            .filter(Boolean)
                            .map((line, index) => (
                              <div key={index}>{line.trim()}</div>
                            ))}
                          <div>
                            {(() => {
                              if (
                                dateChange?.amount &&
                                dateChange?.additionalFee
                              ) {
                                return (
                                  <>
                                    ₹{dateChange.amount} + ₹
                                    {dateChange.additionalFee}
                                  </>
                                );
                              }
                              if (dateChange?.amount || dateChange?.additionalFee) {
                                return (
                                  <>
                                    ₹
                                    {dateChange?.amount ||
                                      dateChange?.additionalFee}
                                  </>
                                );
                              }
                              return null;
                            })()}
                          </div>
                        </>
                      ) : null}
                    </div>
                  );
                } else {
                  return (
                    <p>
                      {" "}
                      {(() => {
                        if (dateChange?.amount && dateChange?.additionalFee) {
                          return (
                            <>
                              ₹{dateChange.amount} + ₹{dateChange.additionalFee}
                            </>
                          );
                        }
                        if (dateChange?.amount || dateChange?.additionalFee) {
                          return (
                            <>
                              ₹{dateChange?.amount || dateChange?.additionalFee}
                            </>
                          );
                        }
                        return null;
                      })()}
                    </p>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: <span className="text-sm-medium neutral-500">NO SHOW FEE</span>,
      key: "4",
      children: (
        <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-2 bg-gray-100 font-semibold text-gray-700 p-3 text-sm border-b border-gray-300">
            <div>Time Frame</div>
            <div>NoShow Fee</div>
          </div>

          {/* Dividing line between header and content */}
          <div className="grid grid-cols-2 items-center  px-3 py-4 border-t border-gray-200 text-sm">
            <div className="text-gray-700">
              {" "}
              {(() => {
                const noShow =
                  fareRulesData?.fareRuleInformation?.tfr?.NO_SHOW?.[0];

                if (noShow?.et && noShow?.st) {
                  return (
                    <div>
                      {`${noShow?.st} hrs to ${noShow?.et > 24
                        ? noShow?.et / 24 + " days"
                        : noShow?.et + " hrs"
                        }`}
                    </div>
                  );
                } else {
                  return <p>{noShow?.pp}</p>;
                }
              })()}
            </div>
            <div className="text-gray-600">
              {(() => {
                const noShow =
                  fareRulesData?.fareRuleInformation?.tfr?.NO_SHOW?.[0];
                if (noShow?.policyInfo) {
                  return (
                    <p>
                      {noShow?.policyInfo
                        ? noShow.policyInfo.includes("__nls__")
                          ? noShow.policyInfo.replace(/__nls__/g, "")
                          : noShow.policyInfo
                        : null}
                    </p>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: (
        <span className="text-sm-medium neutral-500">SEAT CHARGABLE FEE</span>
      ),
      key: "5",
      children:
        fareRulesData?.fareRuleInformation?.tfr?.SEAT_CHARGEABLE?.length > 0 ? (
          <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-2 bg-gray-100 font-semibold text-gray-700 p-3 text-sm border-b border-gray-300">
              <div>Time Frame</div>
              <div>Seat Chargeable Fee</div>
            </div>

            {/* Dividing line between header and content */}
            <div className="grid grid-cols-2 items-center  px-3 py-4 border-t border-gray-200 text-sm">
              <div className="text-gray-700">
                {" "}
                {(() => {
                  const seatChangable =
                    fareRulesData?.fareRuleInformation?.tfr
                      ?.SEAT_CHARGEABLE?.[0];

                  if (seatChangable?.st && seatChangable?.et) {
                    return (
                      <div>
                        {`${seatChangable?.st} hrs to ${seatChangable?.et > 24
                          ? seatChangable?.et / 24 + " days"
                          : seatChangable?.et + " hrs"
                          }`}
                      </div>
                    );
                  } else {
                    return <p>{cancellation.map((e) => e.pp)}</p>;
                  }
                })()}
                {/* {seatCharge?.some((item) => item.st && item.et) ? (
                  seatCharge
                    .filter((item) => item.st && item.et)
                    .map((item, index) => (
                      <div key={index}>
                        {`${item.st} hrs to ${
                          item.et > 24
                            ? item.et / 24 + " days"
                            : item.et + " hrs"
                        }`}
                      </div>
                    ))
                ) : (
                  <p>{cancellation.map((e) => e.pp)}</p>
                )} */}
              </div>
              <div className="text-gray-600">
                <p>
                  {
                    fareRulesData?.fareRuleInformation?.tfr
                      ?.SEAT_CHARGEABLE?.[0]?.policyInfo
                  }
                </p>
                {(() => {
                  const seatItem =
                    fareRulesData?.fareRuleInformation?.tfr
                      ?.SEAT_CHARGEABLE?.[0];
                  if (seatItem?.amount && seatItem?.additionalFee) {
                    return (
                      <>
                        ₹{seatItem.amount} + ₹{seatItem.additionalFee}
                      </>
                    );
                  }
                  if (seatItem?.amount || seatItem?.additionalFee) {
                    return (
                      <>₹{seatItem?.amount || seatItem?.additionalFee}</>
                    );
                  }
                  return null;
                })()}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 italic p-4">No data available.</div>
        ),
    },
  ];

  const loadDataBook = async (parameter, wallet = false) => {
    try {
      // Call your API function with the properly constructed parameter
      // const result = await postDataTJBookingAir(parameter);
      const reqData = {
        action: "book",
        requestData: parameter,
      };

      const result = await postData("travelogy/one-way/fetch-data", reqData);

      if (result?.errCode == "1131") {
        if (wallet) {
          const reqRefund = {
            booking_id: bookingId,
            amount: parameter?.paymentInfos?.[0]?.amount,
          };
          const refundRes = await postData(
            "travelogy/flight/refundWallet",
            reqRefund,
            { Authorization: `Bearer ${token}` }
          );
          if (refundRes.success) {
            message.error(
              result?.message + ". Amount refunded to wallet."
            );
          } else {
            message.error(result?.message + ". Refund failed.");
          }
        } else {
          message.error(result?.message);
        }
        setPaymentFailurePopup(false);
        setPaymentModel(false);
        setBookingLoading(false);
        setBookingLoadingWallet(false);
        return;
      }

      // // test
      // const result = { error: "Request failed with status code 400" };

      // const saveBookingId = async () => {
      //   const reqSaveBookingId = {
      //     booking_id: bookingId,
      //     phone: number.number,
      //     amount: finalAmountToPay,
      //   };
      //   console.log("reqSaveBookingId === > ", reqSaveBookingId);
      //   const result = await postData(
      //     "travelogy/flight/save-booking",
      //     reqSaveBookingId
      //   );
      //   console.log("saveBookingId result === > ", result);
      // };
      // saveBookingId();
      if (result?.error) {
        setError(result?.error);
        setPaymentFailurePopup(false);
        setPaymentModel(false);

        // if payed via wallet , revert amount to wallet.
        if (wallet) {
          await postData(
            "travelogy/flight/refundWallet",
            {
              booking_id: bookingId,
              amount: finalAmountToPay,
            },
            { Authorization: `Bearer ${token}` }
          );
        }
      } else {
        // setBookingLoading(false);
        router.push(
          `/BookingDetails?tcs_id=${priceId}&booking_id=${bookingId}`
        );
      }
    } catch (err) {
      console.error("Error while fetching flight data 1 :", err);

      if (err?.response?.data?.errors?.length) {
        const firstError = err.response.data.errors[0];
        const message = firstError?.message || "An unknown error occurred.";
        const details = firstError?.details ? ` - ${firstError.details}` : "";
        setError(`${message}`);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }

      // Optionally, you can show an error message to the user here
    }
  };

  // Function to handle booking review and trigger loadDataBook
  // const bookingReview = () => {
  //   setBookingLoading(true);

  //   console.log("travellers (before update)", travellers);
  //   console.log("totalprice bookingId", totalprice, bookingId);

  //   const gstInfoCookies = getCookie("gst_info");
  //   console.log("gstInfoCookies = ", gstInfoCookies);
  //   const gstInfos = gstInfoCookies ? JSON.parse(gstInfoCookies) : {};
  //   console.log("gstInfos = ", gstInfos);

  //   const segmentinfo =
  //     flightData?.tripInfos?.flatMap((trip) => trip.sI || []) || [];

  //   if (totalprice && bookingId) {
  //     const parameter = {
  //       bookingId,
  //       paymentInfos: [{ amount: finalAmountToPay }],
  //       travellerInfo: travellers,
  //       deliveryInfo: {
  //         emails: [email],
  //         contacts: [`${number.code}${number.number}`],
  //       },
  //     };

  //     if (gstInfos && Object.keys(gstInfos).length > 0) {
  //       console.log("gstInfo irukan");
  //       parameter.gstInfo = { ...gstInfos };
  //     }

  //     console.log("travellerInfo (final):", parameter.travellerInfo);
  //     console.log("parameter for book:", parameter);

  //     const saveBookingId = async () => {
  //       const reqSaveBookingId = {
  //         type: "save",
  //         booking_id: bookingId,
  //         phone: number.number,
  //         amount: finalAmountToPay,
  //         status: "",
  //         time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  //         fareType: getCookie("gy_passender_type"),
  //       };
  //       const result = await postData(
  //         "travelogy/flight/save-booking",
  //         reqSaveBookingId
  //       );
  //       console.log("saveBookingId result ===>", result);
  //     };
  //     saveBookingId();

  //     loadDataBook(parameter);
  //   } else {
  //     console.error("Booking ID or total price is missing");
  //   }
  // };

  const bookingReviewWIthWallet = async () => {
    setBookingLoadingWallet(true);
    setPaymsg("");

    const gstInfoCookies = getCookie("gst_info");
    const gstInfos = gstInfoCookies ? JSON.parse(gstInfoCookies) : {};

    const segmentinfo =
      flightData?.tripInfos?.flatMap((trip) => trip.sI || []) || [];

    if (totalprice && bookingId) {
      const parameter = {
        bookingId,
        paymentInfos: [{ amount: finalAmountToPay - markup }],
        travellerInfo: travellers,
        deliveryInfo: {
          emails: [email],
          contacts: [`${number.code}${number.number}`],
        },
      };

      if (gstInfos && Object.keys(gstInfos).length > 0) {
        parameter.gstInfo = { ...gstInfos };
      }

      const saveBookingId = async () => {
        const reqSaveBookingId = {
          type: "save",
          booking_id: bookingId,
          // phone: number.number,
          phone: loginPhone,
          amount: finalAmountToPay - markup,
          status: "",
          time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          fareType: getCookie("gy_passender_type"),
        };
        const result = await postData(
          "travelogy/flight/save-booking",
          reqSaveBookingId
        );
      };
      // saveBookingId();

      // reduce amount in wallet and call the third party apis
      const payWallet = async () => {
        const reqpayWallet = {
          booking_id: bookingId,
          amount: finalAmountToPay - markup,
        };
        const result = await postData(
          "travelogy/flight/payWallet",
          reqpayWallet,
          { Authorization: `Bearer ${token}` }
        );
        return result;
      };
      const payWalletRes = await payWallet();

      if (payWalletRes?.success && payWalletRes.success == true) {
        saveBookingId();
        loadDataBook(parameter, true);
      } else {
        // handle edge case
        setPaymsg(payWalletRes);
        setBookingLoadingWallet(false);
      }

      // loadDataBook(parameter);
    } else {
      console.error("Booking ID or total price is missing");
    }
  };

  const bookingReview = () => {
    setBookingLoading(true);
    setPaymsg("");

    const gstInfoCookies = getCookie("gst_info");
    const gstInfos = gstInfoCookies ? JSON.parse(gstInfoCookies) : {};

    const segmentinfo =
      flightData?.tripInfos?.flatMap((trip) => trip.sI || []) || [];

    if (totalprice && bookingId) {
      const parameter = {
        bookingId,
        paymentInfos: [{ amount: finalAmountToPay - markup }],
        travellerInfo: travellers,
        deliveryInfo: {
          emails: [email],
          contacts: [`${number.code}${number.number}`],
        },
      };

      if (gstInfos && Object.keys(gstInfos).length > 0) {
        parameter.gstInfo = { ...gstInfos };
      }
      const saveBookingId = async () => {
        const reqSaveBookingId = {
          type: "save",
          booking_id: bookingId,
          // phone: number.number,
          phone: loginPhone,
          amount: finalAmountToPay - markup,
          status: "",
          time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          fareType: getCookie("gy_passender_type"),
        };
        return postData("travelogy/flight/save-booking", reqSaveBookingId);
      };

      const startPayment = async () => {
        try {
          await saveBookingId();

          // 🔥 Call your CC Avenue create API
          const paymentRes = await postData(
            "travelogy/payment/ccavenue/create",
            {
              booking_id: bookingId, // using bookingId as order_id
              amount: finalAmountToPay - markup, // same as TripJack
              fe_url: currentUrl,
              data: { action: "book", requestData: parameter },
            }
          );
          const { action, fields } = paymentRes;
          const { encRequest, access_code } = fields;

          // 🧾 Build a form and submit it (no iframe)
          const form = document.createElement("form");
          form.method = "POST";
          form.action = action;

          const encReqInput = document.createElement("input");
          encReqInput.type = "hidden";
          encReqInput.name = "encRequest";
          encReqInput.value = encRequest;
          form.appendChild(encReqInput);

          const accessCodeInput = document.createElement("input");
          accessCodeInput.type = "hidden";
          accessCodeInput.name = "access_code";
          accessCodeInput.value = access_code;
          form.appendChild(accessCodeInput);

          document.body.appendChild(form);
          form.submit(); // 🌐 Browser now goes to CCAvenue in same tab
        } catch (err) {
          console.error("Error starting payment:", err);
          setBookingLoading(false);
        }
      };

      startPayment();
    } else {
      console.error("Booking ID or total price is missing");
      setBookingLoading(false);
    }
  };

  const handleHoldBooking = () => {
    setHoldLoading(true);

    const gstInfoCookies = getCookie("gst_info");
    const gstInfos = gstInfoCookies ? JSON.parse(gstInfoCookies) : {};
    if (totalprice && bookingId) {
      const parameter = {
        bookingId,
        travellerInfo: travellers,
        deliveryInfo: {
          emails: [email],
          contacts: [`${number.code}${number.number}`],
        },
      };

      if (gstInfos && Object.keys(gstInfos).length > 0) {
        parameter.gstInfo = { ...gstInfos };
      }

      const saveBookingId = async () => {
        const reqSaveBookingId = {
          booking_id: bookingId,
          // phone: number.number,
          phone: loginPhone,
          amount: finalAmountToPay - markup,
          fareType: getCookie("gy_passender_type"),
        };
        const result = await postData(
          "travelogy/flight/save-booking",
          reqSaveBookingId
        );
      };
      saveBookingId();

      loadDataBook(parameter);
    } else {
      console.error("Booking ID or total price is missing");
    }
    // setHoldLoading(false);
  };

  // const handleHoldBooking = () => {
  //   console.log("handleHoldBooking =========== ");

  //   console.log("traveelers", travellers);
  //   console.log("finalAmountToPay bookingid", finalAmountToPay, bookingId);
  //   if (Array.isArray(travellers) && travellers.length > 0) {
  //     if (bookingId) {
  //       // handlePayment();
  //       // openNotificationWithIcon('success');
  //       // Build the parameter object without extra curly braces
  //       const trimmedTravellerInfo = travellers.map((traveller) => ({
  //         ti: traveller.ti,
  //         fN: traveller.fN,
  //         lN: traveller.lN,
  //         pt: traveller.pt,
  //       }));

  //       const parameter = {
  //         bookingId: bookingId,
  //         travellerInfo: trimmedTravellerInfo,
  //         deliveryInfo: {
  //           emails: [email],
  //           contacts: [`${number.code}${number.number}`],
  //         },
  //       };

  //       console.log("parameter for hold", parameter);

  //       const saveBookingId = async () => {
  //         const reqSaveBookingId = {
  //           booking_id: bookingId,
  //           phone: number.number,
  //           amount: finalAmountToPay,
  //         };
  //         console.log("reqSaveBookingId === > ", reqSaveBookingId);
  //         const result = await postData(
  //           "travelogy/flight/save-booking",
  //           reqSaveBookingId
  //         );
  //         console.log("saveBookingId result === > ", result);
  //       };
  //       saveBookingId();

  //       loadDataBook(parameter);
  //     } else {
  //       console.error("bookingId Is empty");
  //     }
  //   } else {
  //     // Handle case when totalpricee is not set
  //     console.error("Total price is not set");
  //   }
  // };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main relative">
          <section className="box-section box-breadcrumb background-body m-px-10">
            <div className="container pt-1">
              <ul className="breadcrumbs">
                <li>
                  {/* <Link href="/">Home</Link> */}
                  <p>Home</p>
                  <span className="arrow-right">
                    <svg
                      width="7"
                      height="12"
                      viewBox="0 0 7 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 11L6 6L1 1"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                </li>
                <li>
                  {/* <Link href="/">Tickets</Link> */}
                  <p>Tickets</p>
                  <span className="arrow-right">
                    <svg
                      width="7"
                      height="12"
                      viewBox="0 0 7 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 11L6 6L1 1"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                </li>
                <li>
                  <p>Traveller information</p>
                  <span className="arrow-right">
                    <svg
                      width="7"
                      height="12"
                      viewBox="0 0 7 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 11L6 6L1 1"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                </li>
                <li>
                  <span className="text-breadcrumb">Review</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="section-box  background-card m-px-10">
            <div className="container pt-1">
              <h4 className="neutral-1000">Review</h4>
              {loading ? (
                <BookingSkeleton />
              ) : (
                <>
                  <div className="row mt-20">
                    <div className="col-lg-8">
                      {/* <div className="box-content-tickets-detail flex flex-row items-center gap-3 p-3">
                    <p className="text-sm-medium neutral-500 totalduration">{fromCity}</p>
                    <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-right"
          viewBox="0 0 16 16"
        > 
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 
            .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 
            8.5H1.5A.5.5 0 0 1 1 8"
          />
        </svg>
        <p className="text-sm-medium neutral-500 totalduration">{toCity}</p>
        <p className="text-sm-medium neutral-500 totalduration">on</p>
        <p className="text-sm-medium neutral-500 totalduration">{formattedDate||null}</p>
                  </div> */}

                      <section
                        aria-labelledby="applicant-information-title"
                        className="mt-20 "
                      >
                        <div className="bg-white shadow sm:rounded-lg relative p-3 mb-30">
                          {/* <div className="px-4 py-3 border_xcolor_1px flex flex-row justify-between items-center">
                        <div className="flex flex-col justify-between">
                          <div>
                            {flightNames}{flightnumber}
                          </div>
                          <div>
                            {fareIdentifier}
                          </div>
                        </div>
                        <div>
                          <p>{dt}</p>
                          <p>{dcountry},{dcity}</p>
                          <p>{dairportname}</p>
                          <p>{terminal}</p>
                        </div>
                        <div>
                          <p>{dt}</p>
                          <p>{dcountry},{dcity}</p>
                          <p>{dairportname}</p>
                          <p>{terminal}</p>
                        </div>
                        <div>{cabinclass}</div>
                      </div> */}

                          {/* for loop rendering */}
                          {/* <div className="shadow rounded-md p-3"> */}
                          {flightData?.tripInfos?.map((trip, tripIndex) => {
                            const tripInfosLength =
                              flightData?.tripInfos?.length;

                            let trevellInfo = "";
                            if (tripType != "multi-city") {
                              trevellInfo =
                                tripInfosLength >= 2
                                  ? " "
                                  : tripIndex === 0
                                    ? "Onward journey"
                                    : "Return journey";
                            }
                            const trevellInfoStyle =
                              tripIndex === 0
                                ? { padding: "0 0 1rem 0" }
                                : { padding: "1rem 0 1rem 0" };

                            const cabinClass =
                              trip?.totalPriceList?.[0]?.fd?.ADULT?.cc;
                            const fareIdentifier =
                              trip?.totalPriceList?.[0]?.fareIdentifier;
                            const baggageObj =
                              trip?.totalPriceList?.[0]?.fd?.ADULT?.bI;

                            return trip?.sI?.map((seg, segIndex) => {
                              const segDt = seg?.dt;

                              const date = new Date(segDt);

                              const formattedDate = date.toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                }
                              );

                              const dT = segDt.split("T")[1];

                              const segAt = seg?.at;
                              const aT = segAt.split("T")[1];

                              const [startHour, startMin] = dT
                                .split(":")
                                .map(Number);
                              const [endHour, endMin] = aT
                                .split(":")
                                .map(Number);

                              let startMinutes = startHour * 60 + startMin;
                              let endMinutes = endHour * 60 + endMin;

                              if (endMinutes < startMinutes) {
                                endMinutes += 24 * 60;
                              }

                              const diffMinutes = endMinutes - startMinutes;
                              const hours = Math.floor(diffMinutes / 60);
                              const minutes = diffMinutes % 60;

                              return (
                                <>
                                  {flightData?.tripInfos.length > 1 && (
                                    <h6 style={trevellInfoStyle}>
                                      {trevellInfo}
                                    </h6>
                                  )}
                                  <div className="shadow rounded-md p-3">
                                    <div className="flex flex-col justify-start  items-start">
                                      {/* City and direction row */}
                                      <div className="flex flex-row gap-3 items-center mb-2">
                                        <p className="text-xl-bold neutral-1000">
                                          {seg?.da?.city || "DELHI"}{" "}
                                          <span>({seg?.da?.cityCode})</span>
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
                                            fillRule="evenodd"
                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                                          />
                                        </svg>
                                        <p className="text-xl-bold neutral-1000">
                                          {seg?.aa?.city || "DELHI"}{" "}
                                          <span>({seg?.aa?.cityCode})</span>
                                        </p>
                                      </div>

                                      <div className="flex flex-row gap-2">
                                        <p className="text-sm-bold neutral-500 ">
                                          {formattedDate ||
                                            "Date not available"}
                                        </p>
                                        {/* Info list below the cities */}
                                        <ul className="flex flex-row gap-4 mb-20 text-sm-medium neutral-500 list-disc">
                                          {/* <li className="text-sm-medium neutral-500 ">
                                              {stops || "No stop info"}
                                            </li> */}
                                          <li className="text-sm-medium neutral-500 ">
                                            {`${hours}h ${minutes}m` ||
                                              "Duration not available"}
                                          </li>
                                        </ul>
                                      </div>
                                    </div>

                                    <div className="flex flex-row justify-between review-info-row">
                                      <div className="logo-flight flex flex-row gap-3 items-center mb-20">
                                        <div className="text-md-bold neutral-900">
                                          {seg?.fD?.aI?.name}
                                        </div>
                                        <div className="text-md-medium neutral-500">
                                          {seg?.fD?.fN}
                                        </div>
                                        <div className="text-md-medium neutral-500 border border-black-200 rounded-lg pl-10 pr-10">
                                          {seg?.fD?.eT}
                                        </div>
                                      </div>

                                      <div className="flex flex-row items-center gap-3">
                                        <p className="text-sm-medium neutral-500 ">
                                          {cabinClass}
                                        </p>
                                        <span
                                          className="fareidentifier text-xs font-bold pl-10 pr-10 rounded-full"
                                          style={{
                                            backgroundColor:
                                              "rgb(245, 222, 179)",
                                            color: "rgb(92, 64, 51)",
                                            padding: "1px 2px",
                                          }}
                                        >
                                          {fareIdentifier}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="flex justify-center items-center bg-gray-100 p-2 rounded-md space-y-6 flight-timings-wrapper">
                                      {/* Flight Timings */}
                                      <div
                                        className="flex justify-between items-center gap-5 flight-timings-inner"
                                        style={{ width: "100%" }}
                                      >
                                        <div className="text-left space-y-1 flight-timing-item">
                                          <h4
                                            className=""
                                            style={{
                                              fontSize: "28px",
                                              fontWeight: "normal",
                                            }}
                                          >
                                            {dT}
                                          </h4>
                                          <p className="text-sm-medium neutral-500 ">
                                            {seg?.da?.city}, {seg?.da?.country}
                                          </p>
                                          <p className="text-sm-medium neutral-500 ">
                                            {seg?.da?.name}
                                          </p>
                                          <p className="text-sm-medium neutral-1000 ">
                                            {seg?.da?.terminal}
                                          </p>
                                        </div>

                                        <div className="text-center space-y-1">
                                          <p className="text-sm-medium neutral-500 ">
                                            {hours}h {minutes}m
                                          </p>
                                          <img
                                            src="https://edge.ixigo.com/st/vimaan/_next/static/media/line.9641f579.svg"
                                            alt="flight line"
                                            className="mx-auto w-20 hide-on-mobile"
                                          />
                                        </div>

                                        <div className="text-right space-y-1 flight-timing-item">
                                          <h4
                                            className=""
                                            style={{
                                              fontSize: "28px",
                                              fontWeight: "normal",
                                            }}
                                          >
                                            {aT}
                                          </h4>
                                          <p className="text-sm-medium neutral-500 ">
                                            {seg?.aa?.city}, {seg?.aa?.country}
                                          </p>
                                          <p className="text-sm-medium neutral-500 ">
                                            {seg?.aa?.name}
                                          </p>
                                          <p className="text-sm-medium neutral-1000 ">
                                            {seg?.aa?.terminal}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-center gap-3  space-x-10 bg-gray-100 pb-5">
                                      <div className="flex items-center space-x-2">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="currentColor"
                                          class="bi bi-suitcase2-fill"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M6.5 0a.5.5 0 0 0-.5.5V3H4.5A1.5 1.5 0 0 0 3 4.5v9a1.5 1.5 0 0 0 1.003 1.416A1 1 0 1 0 6 15h4a1 1 0 1 0 1.996-.084A1.5 1.5 0 0 0 13 13.5v-9A1.5 1.5 0 0 0 11.5 3H10V.5a.5.5 0 0 0-.5-.5zM9 3H7V1h2zM4 7V6h8v1z" />
                                        </svg>
                                        <p className="text-sm-bold neutral-900 ">
                                          Check-in:{" "}
                                          <span className="text-sm-medium neutral-500 ">
                                            {baggageObj?.iB} per adult
                                          </span>
                                        </p>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="currentColor"
                                          class="bi bi-suitcase-lg-fill"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M7 0a2 2 0 0 0-2 2H1.5A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14H2a.5.5 0 0 0 1 0h10a.5.5 0 0 0 1 0h.5a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2H11a2 2 0 0 0-2-2zM6 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1zM3 13V3h1v10zm9 0V3h1v10z" />
                                        </svg>
                                        <p className="text-sm-bold neutral-900">
                                          Cabin:{" "}
                                          <span className="text-sm-medium neutral-500">
                                            {baggageObj?.cB} per adult
                                          </span>
                                        </p>
                                      </div>
                                    </div>

                                    <div className="mt-30 mb-10 text-sm-medium neutral-1000 p-3 bg-blue-100">
                                      {`Got excess baggage? Don’t stress, buy extra check-in baggage allowance for ${seg?.da?.cityCode}-${seg?.aa?.cityCode} at fab rates!`}
                                    </div>
                                  </div>
                                </>
                              );
                            });
                          })}
                          {/* </div> */}

                          {/* Gradient BORDER wrapper */}
                          <div
                            style={{
                              marginTop: "50px", // mt-50
                              padding: "2px", // border thickness
                              borderRadius: "10px",
                              background:
                                "linear-gradient(90deg, #fde047, #fb923c, #ef4444)",
                            }}
                          >
                            {/* Inner card (your original content container) */}
                            <div
                              style={{
                                background: "#fff",
                                borderRadius: "8px",
                                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                                padding: "12px",
                              }}
                            >
                              <div className="flex flex-row justify-between refund-header-row">
                                <div className="text-xl-bold neutral-1000">
                                  Cancellation and Refund
                                </div>

                                {Object.keys(fareRulesMap)?.length > 0 ? (
                                  <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-full w-max mb-4 route-selection-wrapper">
                                    {Object.keys(fareRulesMap).map((route) => (
                                      <button
                                        key={route}
                                        onClick={() => setSelectedRoute(route)}
                                        className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 ${selectedRoute === route
                                          ? "bg-white text-black shadow"
                                          : "text-gray-600 hover:text-black"
                                          }`}
                                      >
                                        {route}
                                      </button>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="text-gray-500 italic p-4">
                                    No fare rule information available.
                                  </div>
                                )}

                                <div className="pl-30 hidden">
                                  <Stack>
                                    <Button
                                      variant="contained"
                                      onClick={() =>
                                        setShowMore((prev) => !prev)
                                      }
                                      className=" cursor-pointer"
                                    >
                                      {showMore ? "Show Less" : "Show More"}
                                    </Button>
                                  </Stack>
                                </div>
                              </div>

                              {/* Cancellation Charges */}
                              {/* <div className="py-5 ">
                                <div className="flex flex-row justify-around pr-4 mt-5 flex-wrap gap-y-5">
                                  <div className=" gap-5 justify-center">
                                    <div className="text-center pl-6">
                                      <p className="text-primary text-sm font-medium whitespace-normal">
                                        {fareRulesData?.refundType}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-3 mt-3 pl-20 pr-30">
                                  <div className="relative flex items-center pl-5 justify-center">
                                    <div className="absolute left-0 z-10 flex items-center h-10 justify-start">
                                      <div className="rounded-full w-6 h-6 bg-yellow-300 flex justify-center items-center text-white">
                                        <svg
                                          width="18"
                                          height="18"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M20.85 9.8 9.8 20.85c-.19.19-.49.2-.67.02l-1.6-1.6c-.15-.16-.18-.4-.08-.61.69-1.41-.69-2.77-2.11-2.1-.22.1-.46.06-.62-.1l-1.6-1.6c-.17-.18-.16-.47.03-.66L14.2 3.15c.19-.19.49-.2.66-.02l1.6 1.6c.15.15.19.39.09.6-.67 1.42.67 2.83 2.07 2.12.21-.11.48-.08.64.08l1.6 1.6c.18.18.17.47-.02.67Z" />
                                        </svg>
                                      </div>
                                    </div>

                                    <div className="absolute right-0 z-10 flex items-center h-10 justify-end">
                                      <div
                                        className="rounded-full w-6 h-6 bg-red-500 flex justify-center items-center text-white"
                                        style={{ marginRight: "-5px" }}
                                      >
                                        <svg
                                          width="18"
                                          height="18"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M20.85 9.8 9.8 20.85c-.19.19-.49.2-.67.02l-1.6-1.6c-.15-.16-.18-.4-.08-.61.69-1.41-.69-2.77-2.11-2.1-.22.1-.46.06-.62-.1l-1.6-1.6c-.17-.18-.16-.47.03-.66L14.2 3.15c.19-.19.49-.2.66-.02l1.6 1.6c.15.15.19.39.09.6-.67 1.42.67 2.83 2.07 2.12.21-.11.48-.08.64.08l1.6 1.6c.18.18.17.47-.02.67Z" />
                                        </svg>
                                      </div>
                                    </div>

                                    <div className="absolute left-[14px] h-1 w-full bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500" />

                                    <div className="absolute top-1/2 transform -translate-y-1/2 left-1/2 h-6 border-l border-dotted border-gray-400"></div>
                                  </div>
                                </div>

                                <div className="flex flex-row justify-between align-center pt-4 pl-15 pr-15 refund-charges-row">
                                  <p className="text-sm-medium neutral-1000">
                                    {cancellation.some(
                                      (e) => e.pp === undefined
                                    ) ? (
                                      "Now"
                                    ) : (
                                      <div>Now</div>
                                    )}
                                  </p>

                                  <div className="flex justify-center">
                                    <div className="flex flex-wrap flex-col items-center justify-center max-w-full">
                                      <div className="flex items-center flex-col">
                                        <p className="text-sm-medium neutral-500">
                                          ₹{" "}
                                          {fareRulesData?.fareRuleInformation
                                            ?.tfr?.CANCELLATION?.[0]?.amount
                                            ? fareRulesData?.fareRuleInformation
                                              ?.tfr?.CANCELLATION?.[0]?.amount
                                            : fareRulesData?.fareRuleInformation
                                              ?.tfr?.CANCELLATION?.[0]
                                              ?.additionalFee}
                                          <span className="mx-1"></span>
                                        </p>
                                        <div className="text-secondary text-sm">
                                          {fareRulesData?.fareRuleInformation?.tfr?.CANCELLATION?.[0]?.policyInfo
                                            ?.split("__nls__")
                                            .filter(Boolean)
                                            .map((line, index) => (
                                              <div key={index}>
                                                {line.trim()}
                                              </div>
                                            ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex flex-col justify-center items-center">
                                    <p className="text-sm-medium neutral-1000">
                                      {getDepartureTimeForRoute(selectedRoute)}
                                    </p>
                                  </div>
                                </div>
                              </div> */}

                              {showMore && (
                                <div
                                  style={{
                                    maxWidth: "64rem",
                                    margin: "0 auto",
                                    padding: "1rem",
                                  }}
                                >
                                  <Tabs defaultActiveKey="2" items={itemss} />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Form */}
                          <form
                            id="validateOnly"
                            autoComplete="off"
                            className="ant-form ant-form-vertical shadow rounded-md mt-50 p-3"
                          >
                            <div
                              className="ant-row"
                              style={{
                                marginLeft: "-8px",
                                marginRight: "-8px",
                              }}
                            >
                              {/* Country Code */}
                              <div
                                className="ant-col ant-col-6 passenger-details-col"
                                style={{
                                  paddingLeft: "8px",
                                  paddingRight: "8px",
                                }}
                              >
                                <div className="ant-form-item">
                                  <p className="text-xl-bold neutral-1000 mb-10 ">
                                    Passenger information
                                  </p>
                                  <div className="responsive-table-wrapper">
                                    <table className="w-full border-collapse mb-20">
                                      <thead
                                        style={{ borderBottom: "grey 1px solid" }}
                                      >
                                        <tr>
                                          <th
                                            className="px-4 py-2 text-left text-gray-600 border-b border-gray-300"
                                            style={{ width: "1rem" }}
                                          >
                                            S.No
                                          </th>
                                          <th
                                            className="px-4 py-2 text-left text-gray-600 border-b border-gray-300"
                                            style={{ width: "20rem" }}
                                          >
                                            Full Name
                                          </th>
                                          <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">
                                            Add-ons
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {travellers.length > 0 ? (
                                          travellers.map((traveller, index) => {
                                            const fullName = `${traveller?.ti + "." || ""
                                              } ${traveller?.fN || ""} ${traveller?.lN || ""
                                              }`.trim();

                                            const addOns = [];

                                            if (
                                              traveller.ssrBaggageInfos &&
                                              traveller.ssrBaggageInfos.length > 0
                                            ) {
                                              const baggageDetails =
                                                traveller.ssrBaggageInfos
                                                  .map((b) => {
                                                    const baggageFromCookie =
                                                      cookieBaggageData.find(
                                                        (c) => c.code === b.code
                                                      );
                                                    return baggageFromCookie
                                                      ? `${baggageFromCookie.desc} [${baggageFromCookie.fromToCode}]`
                                                      : b.code;
                                                  })
                                                  .filter(Boolean)
                                                  .join(", ");
                                              if (baggageDetails) {
                                                addOns.push(
                                                  `Baggage: ${baggageDetails}`
                                                );
                                              }
                                            }

                                            if (
                                              traveller.ssrMealInfos &&
                                              traveller.ssrMealInfos.length > 0
                                            ) {
                                              const mealDetails =
                                                traveller.ssrMealInfos
                                                  .map((m) => {
                                                    const mealFromCookie =
                                                      cookieMealData.find(
                                                        (c) => c.code === m.code
                                                      );
                                                    return mealFromCookie
                                                      ? `${mealFromCookie.desc} [${mealFromCookie.fromToCode}]`
                                                      : m.code;
                                                  })
                                                  .filter(Boolean)
                                                  .join(", ");
                                              if (mealDetails)
                                                addOns.push(
                                                  `Meals: ${mealDetails}`
                                                );
                                            }

                                            // cookieMappedSeatData
                                            if (
                                              traveller.ssrSeatInfos &&
                                              traveller.ssrSeatInfos.length > 0
                                            ) {
                                              const seatDetails =
                                                traveller.ssrSeatInfos
                                                  .map((s) => {
                                                    const mealFromCookie =
                                                      cookieMappedSeatData.find(
                                                        (c) => c.code === s.code
                                                      );
                                                    return mealFromCookie
                                                      ? `${mealFromCookie.code} [${mealFromCookie.fromToCode}]`
                                                      : s.code;
                                                  })
                                                  .filter(Boolean)
                                                  .join(", ");
                                              if (seatDetails)
                                                addOns.push(
                                                  `Seat: ${seatDetails}`
                                                );
                                            }

                                            // if (
                                            //   traveller.ssrSeatInfos &&
                                            //   traveller.ssrSeatInfos.length > 0
                                            // ) {
                                            //   console.log("traveller.ssrSeatInfos ==> ",traveller.ssrSeatInfos)
                                            //   const seatDetails =
                                            //     traveller.ssrSeatInfos
                                            //       .map((s) => s.code)
                                            //       .filter(Boolean)
                                            //       .join(", ");
                                            //   if (seatDetails) {
                                            //     addOns.push(
                                            //       `Seat: ${seatDetails}`
                                            //     );
                                            //   }
                                            // }

                                            return (
                                              <tr key={index}>
                                                <td className="px-4 py-3 border-b border-gray-200 text-black">
                                                  {index + 1}
                                                </td>
                                                <td
                                                  className="px-4 py-3 border-b border-gray-200 text-black"
                                                  style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                  }}
                                                >
                                                  {fullName || "N/A"}
                                                  {traveller?.di && (
                                                    <span>
                                                      ID: {traveller.di}
                                                    </span>
                                                  )}
                                                  {(traveller?.pNat ||
                                                    traveller?.pNum ||
                                                    traveller?.eD ||
                                                    traveller?.pid ||
                                                    traveller?.dob) && (
                                                      <>
                                                        {traveller?.pNat && (
                                                          <span>
                                                            Nationality:{" "}
                                                            {traveller.pNat}
                                                          </span>
                                                        )}
                                                        {traveller?.pNum && (
                                                          <span>
                                                            Passport Number:{" "}
                                                            {traveller.pNum}
                                                          </span>
                                                        )}
                                                        {traveller?.eD && (
                                                          <span>
                                                            Expiry Date:{" "}
                                                            {traveller.eD}
                                                          </span>
                                                        )}
                                                        {traveller?.pid && (
                                                          <span>
                                                            Issue Date:{" "}
                                                            {traveller.pid}
                                                          </span>
                                                        )}
                                                        {traveller?.dob && (
                                                          <span>
                                                            Date Of Birth:{" "}
                                                            {traveller.dob}
                                                          </span>
                                                        )}
                                                      </>
                                                    )}
                                                </td>
                                                {/* <td className="px-4 py-3 border-b border-gray-200 text-black">
                                                  {addOns.length > 0
                                                    ? addOns.join(" | ")
                                                    : "None"}
                                                </td> */}
                                                <td className="px-4 py-3 border-b border-gray-200 text-black">
                                                  {addOns && addOns.length > 0 ? (
                                                    <div className="flex flex-col gap-1">
                                                      {addOns.map((item, i) => (
                                                        <span
                                                          key={i}
                                                          className="text-sm"
                                                        >
                                                          {item}
                                                        </span>
                                                      ))}
                                                    </div>
                                                  ) : (
                                                    "None"
                                                  )}
                                                </td>
                                              </tr>
                                            );
                                          })
                                        ) : (
                                          <tr>
                                            <td
                                              colSpan="3"
                                              className="px-4 py-3 text-center border-b border-gray-200 text-black"
                                            >
                                              No passenger information available.
                                            </td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>

                              {/* Email and Phone Number */}
                              <div
                                className="ant-col ant-col-6 mt-30 mb-30 contact-info-col"
                                style={{
                                  paddingLeft: "8px",
                                  paddingRight: "8px",
                                }}
                              >
                                <p className="text-lg-bold neutral-1000 mb-10 ">
                                  Contact information
                                </p>
                                <div className="ant-form-item">
                                  <div className="text-md neutral-1000 ">
                                    Email:{" "}
                                    <strong>
                                      {email ? email : "No email available"}
                                    </strong>{" "}
                                  </div>
                                  <div className="text-md neutral-1000 ">
                                    Phone Number:{" "}
                                    <strong>
                                      <strong>
                                        {number?.code && number?.number
                                          ? `${number.code} ${number.number}`
                                          : "No phone number available"}
                                      </strong>
                                    </strong>{" "}
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Buttons */}
                            <div className="bg-white relative flex justify-between  flex-col">
                              <div className="mt-60 flex justify-between action-buttons-row">
                                <Link
                                  href={`/book-ticket?tcs_id=${priceId}`}
                                  style={{ borderRadius: "5px" }}
                                  className="cursor-pointer border-2 border-black px-4 py-2 bg-yellow-300 hover:bg-yellow-400 transition text-black"
                                >
                                  Back
                                </Link>
                                {/* {flightData?.conditions?.isBA === true && (
                                  <div
                                    onClick={handleHoldBooking}
                                    style={{ borderRadius: "5px" }}
                                    className="cursor-pointer border-2 border-black px-4 py-2 bg-yellow-300 hover:bg-yellow-400 transition text-black"
                                  >
                                    Hold Booking
                                  </div>
                                )} */}
                                {flightData?.conditions?.isBA === true && (
                                  <div
                                    onClick={
                                      holdLoading
                                        ? undefined
                                        : handleHoldBooking
                                    }
                                    style={{ borderRadius: "5px" }}
                                    className={`cursor-pointer border-2 border-black px-4 py-2 transition text-black rounded-md flex items-center justify-center ${holdLoading
                                      ? "bg-gray-300"
                                      : "bg-yellow-300 hover:bg-yellow-400"
                                      }`}
                                  >
                                    {holdLoading ? (
                                      <div className="flex items-center gap-2">
                                        <svg
                                          className="animate-spin h-5 w-5 text-black"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                        >
                                          <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                          ></circle>
                                          <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                          ></path>
                                        </svg>
                                        <span>Loading...</span>
                                      </div>
                                    ) : (
                                      "Hold Booking"
                                    )}
                                  </div>
                                )}
                                {/* <div
                                  onClick={bookingReview}
                                  className="cursor-pointer border-2 border-black px-4 py-2 bg-yellow-300 hover:bg-yellow-400 transition text-black"
                                >
                                  continue
                                </div> */}
                                <div
                                  onClick={() => setPaymentModel(true)}
                                  className="cursor-pointer border-2 border-black px-4 py-2 transition text-black rounded-md flex items-center justify-center bg-yellow-300 hover:bg-yellow-400"
                                >
                                  Continue
                                </div>
                                {/* <div
                                  onClick={bookingReview}
                                  className={`cursor-pointer border-2 border-black px-4 py-2 transition text-black rounded-md flex items-center justify-center ${
                                    bookingLoading
                                      ? "bg-gray-300"
                                      : "bg-yellow-300 hover:bg-yellow-400"
                                  }`}
                                  disabled={bookingLoading}
                                >
                                  {bookingLoading ? (
                                    <div className="flex items-center gap-2">
                                      <svg
                                        className="animate-spin h-5 w-5 text-black"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                      >
                                        <circle
                                          className="opacity-25"
                                          cx="12"
                                          cy="12"
                                          r="10"
                                          stroke="currentColor"
                                          strokeWidth="4"
                                        ></circle>
                                        <path
                                          className="opacity-75"
                                          fill="currentColor"
                                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                      </svg>
                                      <span>Loading...</span>
                                    </div>
                                  ) : (
                                    "Continue"
                                  )}
                                </div> */}
                              </div>
                            </div>
                          </form>
                        </div>
                      </section>
                    </div>

                    {/* Right Column: Fare Summary */}
                    <div className="col-lg-4">
                      <div className="booking-form add_sticky">
                        <div class="head-booking-form">
                          <p class="text-xl-bold neutral-1000">Fare Summary</p>
                        </div>
                        <BookingForm
                          totalpricee={totalPriceinfo}
                          markup={markup}
                          baggageAmount={baggageTotal}
                          mealAmount={mealTotal}
                          seatinfo={seatTotal}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {error && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white border-2 border-black w-96 p-6 rounded-lg text-center shadow-lg">
                    <p className="text-red-600 mb-4 font-semibold">
                      Error: {error}
                    </p>

                    <button
                      className="border-2 border-black px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
                      onClick={searchTickets}
                    >
                      Ok, Got It
                    </button>
                  </div>
                </div>
              )}
              {/* {paymentFailurePopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white border-2 border-black w-96 p-6 rounded-lg text-center shadow-lg">
                    <p className="text-red-600 mb-2 font-semibold">
                      Payment Failed
                    </p>
                    <p>Your payment could not be completed.</p>
                    <p>
                      You can retry the payment or hold this booking and pay
                      later.
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        paddingTop: "10px",
                      }}
                    >
                      {flightData?.conditions?.isBA === true && (
                        <div
                          onClick={handleHoldBooking}
                          style={{ borderRadius: "5px" }}
                          className="cursor-pointer border-2 border-black px-4 py-2 bg-yellow-300 hover:bg-yellow-400 transition text-black"
                        >
                          Hold Booking
                        </div>
                      )}
                      <div
                        onClick={bookingReview}
                        className={`cursor-pointer border-2 border-black px-4 py-2 transition text-black rounded-md flex items-center justify-center ${
                          bookingLoading
                            ? "bg-gray-300"
                            : "bg-yellow-300 hover:bg-yellow-400"
                        }`}
                        disabled={bookingLoading}
                      >
                        {bookingLoading ? (
                          <div className="flex items-center gap-2">
                            <svg
                              className="animate-spin h-5 w-5 text-black"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              ></path>
                            </svg>
                            <span>Loading...</span>
                          </div>
                        ) : (
                          "Retry Payment"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )} */}
              {paymentFailurePopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div
                    className="bg-white border-2 border-black w-96 p-6 rounded-lg text-center shadow-lg relative payment-modal-content"
                  >
                    <button
                      // onClick={() => setPaymentFailurePopup(false)}
                      onClick={() => {
                        setPaymentFailurePopup(false);
                        setPaymsg("");
                      }}
                      className="absolute top-2 right-2 text-gray-700 hover:text-black text-xl font-bold"
                    >
                      ×
                    </button>

                    <p className="text-red-600 mb-2 font-semibold">
                      Payment Failed
                    </p>
                    <p>Your payment could not be completed.</p>
                    <p>
                      You can retry the payment or hold this booking and pay
                      later.
                    </p>

                    <div className="payment-modal-buttons-row">
                      {flightData?.conditions?.isBA === true && (
                        // <div
                        //   onClick={handleHoldBooking}
                        //   style={{ borderRadius: "5px" }}
                        //   className="cursor-pointer border-2 border-black px-4 py-2 bg-yellow-300 hover:bg-yellow-400 transition text-black"
                        // >
                        //   Hold Booking
                        // </div>
                        <div
                          onClick={holdLoading ? undefined : handleHoldBooking}
                          style={{ borderRadius: "5px" }}
                          className={`cursor-pointer border-2 border-black px-4 py-2 transition text-black rounded-md flex items-center justify-center ${holdLoading
                            ? "bg-gray-300"
                            : "bg-yellow-300 hover:bg-yellow-400"
                            }`}
                        >
                          {holdLoading ? (
                            <div className="flex items-center gap-2">
                              <svg
                                className="animate-spin h-5 w-5 text-black"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                              </svg>
                              <span>Loading...</span>
                            </div>
                          ) : (
                            "Hold Booking"
                          )}
                        </div>
                      )}

                      <div
                        onClick={bookingReviewWIthWallet}
                        className={`cursor-pointer border-2 border-black px-4 py-2 transition text-black rounded-md flex items-center justify-center ${bookingLoadingWallet
                          ? "bg-gray-300"
                          : "bg-yellow-300 hover:bg-yellow-400"
                          }`}
                        disabled={bookingLoadingWallet}
                      >
                        {bookingLoadingWallet ? (
                          <div className="flex items-center gap-2">
                            <svg
                              className="animate-spin h-5 w-5 text-black"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              ></path>
                            </svg>
                            <span>Loading...</span>
                          </div>
                        ) : (
                          "Wallet Payment"
                        )}
                      </div>

                      <div
                        onClick={bookingReview}
                        className={`cursor-pointer border-2 border-black px-4 py-2 transition text-black rounded-md flex items-center justify-center ${bookingLoading
                          ? "bg-gray-300"
                          : "bg-yellow-300 hover:bg-yellow-400"
                          }`}
                        disabled={bookingLoading}
                      >
                        {bookingLoading ? (
                          <div className="flex items-center gap-2">
                            <svg
                              className="animate-spin h-5 w-5 text-black"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              ></path>
                            </svg>
                            <span>Loading...</span>
                          </div>
                        ) : (
                          "Retry Payment"
                        )}
                      </div>
                    </div>
                    {paymsg && (
                      <p
                        className="text-red-600 pt-2"
                        style={{ textAlign: "center" }}
                      >
                        {paymsg.message}, Balance: {paymsg.balance}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {paymentModel && (
                <div className="fixed inset-0 z-50 bg-white overflow-y-auto w-full h-full">
                  <div className="w-full min-h-screen max-w-4xl mx-auto p-6 relative">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8 border-b pb-4">
                      <h2 className="text-2xl font-bold text-gray-800">
                        Choose Payment Mode
                      </h2>
                      <button
                        onClick={() => {
                          setPaymentModel(false);
                          setPaymsg("");
                        }}
                        className="text-gray-500 hover:text-black text-3xl font-light px-4"
                      >
                        ×
                      </button>
                    </div>

                    {/* Content Container */}
                    <div className="max-w-xl mx-auto mt-12 p-8 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                      <p className="text-gray-700 mb-8 font-medium text-center text-lg">
                        Please select a payment method to proceed
                      </p>

                      <div className="flex flex-col gap-4">
                        <div
                          onClick={!(bookingLoading || bookingLoadingWallet) ? () => {
                            setShowWalletConfirm(true);
                          } : undefined}
                          className={`border border-gray-300 px-6 py-4 transition text-black rounded-lg flex items-center justify-between hover:shadow-md ${bookingLoadingWallet
                            ? "bg-gray-100 cursor-not-allowed pointer-events-none"
                            : bookingLoading
                              ? "bg-gray-100 cursor-not-allowed opacity-50 pointer-events-none"
                              : "bg-white hover:border-yellow-400 cursor-pointer"
                            }`}
                          aria-disabled={bookingLoadingWallet || bookingLoading}
                        >
                          <span className="font-semibold text-lg">Wallet Payment</span>
                          {bookingLoadingWallet ? (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <svg
                                className="animate-spin h-5 w-5"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="none"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                />
                              </svg>
                              Processing...
                            </div>
                          ) : (
                            <span className="p-2 bg-yellow-100 rounded-full text-yellow-700">
                              ➜
                            </span>
                          )}
                        </div>

                        <div
                          className={`border border-gray-300 px-6 py-4 transition text-black rounded-lg flex items-center justify-between ${"bg-gray-100 cursor-not-allowed opacity-50 pointer-events-none"}`}
                          aria-disabled={true}
                        >
                          <span className="font-semibold text-lg">
                            Pay via Gateway
                          </span>
                          <span className="text-xs text-gray-500">
                            (Currently Unavailable)
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-center">
                        <button
                          onClick={() => setPaymentModel(false)}
                          className="text-red-500 hover:text-red-800 font-medium underline"
                        >
                          Cancel
                        </button>
                      </div>
                      {paymsg && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-lg text-center">
                          <p className="text-red-600 font-medium">
                            {paymsg.message}
                          </p>
                          <p className="text-red-500 text-sm mt-1">
                            Balance: {paymsg.balance}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Wallet Confirmation Popup */}
              {showWalletConfirm && (
                <div
                  className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
                  style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
                >
                  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all border border-gray-100 relative">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 text-white text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/30">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold">Wallet Payment</h3>
                    </div>

                    {/* Body */}
                    <div className="p-8 text-center">
                      <p className="text-gray-600 text-lg mb-2">You are about to pay</p>
                      <div className="text-4xl font-black text-gray-900 mb-6">
                        {/* ₹{Number(finalAmountToPay - (markup || 0)) ? Number(finalAmountToPay - (markup || 0)).toLocaleString() : "..."} */}
                        ₹{Number(finalAmountToPay) ? Number(finalAmountToPay).toLocaleString() : "..."}
                      </div>
                      <p className="text-gray-500 leading-relaxed">
                        The total amount will be deducted from your wallet to confirm this booking. This action cannot be undone.
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="p-6 bg-gray-50 flex gap-4">
                      <button
                        onClick={() => setShowWalletConfirm(false)}
                        className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-white hover:shadow-md transition-all active:scale-95"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setShowWalletConfirm(false);
                          bookingReviewWIthWallet();
                        }}
                        className="flex-1 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 rounded-xl font-bold text-black shadow-lg shadow-yellow-200 hover:shadow-yellow-300 transition-all active:scale-95 border-b-4 border-yellow-600"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
          {loading ? null : (
            <div
              className="session shadow sm:rounded-sm text-md sticky bottom-0 mt-5 p-2 text-center"
              style={{ zIndex: "10" }}
            >
              <SessionTime
                timeLeftRef={timeLeftRef}
                searchTickets={searchTickets}
              />
            </div>
          )}
        </main>
      </Layout>
    </Suspense>
  );
};

export default ReviewPage;
