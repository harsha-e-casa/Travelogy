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
import { useContext, useEffect, useState } from "react";
import { Tabs } from "antd";

// import "./style.css"

import { format } from "date-fns";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Page = () => {
  const searchParams = useSearchParams();
  const priceId = searchParams.get("tcs_id");

  //
  let ids = [];
  let splitIds = [];
  if (priceId.includes(",")) {
    splitIds = priceId.split(",");
    ids = [splitIds[0], splitIds[1]];
  } else {
    ids = [priceId];
  }
  const parameter = { priceIds: ids };
  console.log(parameter);

  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getCookie } = useContext(AppContext);

  const [fareDetails, setFareDetails] = useState(null);

  const [travellers, setTravellers] = useState([]);
  const [email, setEmail] = useState(null);
  const [number, setNumber] = useState(null);
  console.log("number", number);
  const [totalPriceinfo, setTotalpriceinfo] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const BaggageAmount = JSON.parse(getCookie("baggageinfo") || "[]");

  const router = useRouter();
  useEffect(() => {
    const data = getCookie("travellerInfo");
    if (data) {
      try {
        console.log(data);
        const parsedData = JSON.parse(data);
        console.log("parseddata from review page", parsedData);
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
        console.log(data);
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
        console.log(data);
        const parsedData = JSON.parse(data);
        setNumber(parsedData);
      } catch (err) {
        console.error("Invalid JSON in cookie:", err);
      }
    }
  }, []);

  // Function to fetch flight details
  const fetchFlightDetails = async (priceId) => {
    setLoading(true);
    setError(null);

    if (!priceId) {
      setError("Price ID is missing");
      setLoading(false);
      return;
    }

    try {
      // const parameter = { priceIds: [priceId] };
      console.log("Fetching with parameter FOR REVIEW:", parameter);

      const data = await postDataFlightDetails(parameter);
      console.log("Flight detailsssss FOR REVIEW:", data);
      setFlightData(data); // Update state with flight details
    } catch (err) {
      console.error("error caused", err);

      if (err?.response?.data?.errors?.length) {
        const firstError = err.response.data.errors[0];
        const message = firstError?.message || "An unknown error occurred.";
        const details = firstError?.details ? ` - ${firstError.details}` : "";
        setError(`${message}`);

        console.log("API error message:", message);
        console.log("Error details:", details);
        console.log("Error status code:", err.response.status);
      } else if (err?.message) {
        setError(err.message);
        console.log("Generic error message:", err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  //to fetch fare rule
  const fetchFareRule = async (params) => {
    // setLoading(true);
    // setError(null);

    try {
      console.log("Fetching FARERULE with parameter:", params);
      const data = await postDataFareDetails(params);
      console.log("Flight details FROM FARERULE:", data);
      setFareDetails(data);
    } catch (err) {
      console.error("error caused", err);

      if (err?.response?.data?.errors?.length) {
        const firstError = err.response.data.errors[0];
        const message = firstError?.message || "An unknown error occurred.";
        const details = firstError?.details ? ` - ${firstError.details}` : "";
        setError(`${message}`);

        console.log("API error message:", message);
        console.log("Error details:", details);
        console.log("Error status code:", err.response.status);
      } else if (err?.message) {
        setError(err.message);
        console.log("Generic error message:", err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    console.log("logged fare details", fareDetails);
  }, [fareDetails]);

  useEffect(() => {
    console.log("logged fflight details", flightData);
  }, [flightData]);

  // UseEffect to call the function when 'tcs_id' is available in the search params
  useEffect(() => {
    console.log("fetchFlightDetails Extracted tcs_id:", priceId); // Debug log to check if tcs_id is correct
    if (priceId) {
      fetchFlightDetails(priceId);
    } else {
      setError("No valid tcs_id found in the URL.");
    }
  }, [priceId]);

  useEffect(() => {
    console.log("fetchFareRule Extracted tcs_id:", priceId);
    if (priceId) {
      fetchFareRule({ id: [priceId], flowType: "SEARCH" });
    } else {
      setError("No valid tcs_id found in the URL.");
    }
  }, [priceId]);

  const BookingSkeleton = () => {
    return (
      <section className="section-box block-content-book-tickets background-card mb-20">
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

  console.log("segment id from review", segmentId);
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

  //bookingid
  const bookingId = flightData ? flightData.bookingId : null;
  console.log("bookingId", bookingId);

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

  const finalAmountToPay = totalprice + baggageTotal;
  //fare rule api
  const fareRule = fareDetails?.fareRule?.[`${dcitycode}-${acitycode}`]?.tfr;

  const cancellation = fareRule?.CANCELLATION ?? [];
  const noShow = fareRule?.NO_SHOW ?? [];
  const dateChange = fareRule?.DATECHANGE ?? [];
  const seatCharge = fareRule?.SEAT_CHARGEABLE ?? [];
  console.log(
    "checking",
    cancellation?.map((e) => e.pp)
  );

  // Cancellation
  const cancellationAmount = cancellation.map((e) => e.amount);
  const cancellationPolicy = cancellation.map((e) => e.policyInfo);
  const cancellationPenaltyPeriod = cancellation.map((e) => e.pp);
  const cancellationLength = cancellation.length;
  console.log("lenght", cancellationLength);
  const cancellationFee = cancellation.map((e) => e.fcs?.ACF);
  const cancellationST = cancellation.map((e) => e.st ?? 0);
  const cancellationET = cancellation.map((e) => e.et ?? 365);

  const hasFareRules = fareRule && Object.keys(fareRule).length > 0;

  console.log("Has Fare Rules?", hasFareRules);
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

  const [selectedRoute, setSelectedRoute] = useState();

  useEffect(() => {
    console.log("fareRulesMap ===", fareRulesMap);
    const keys = Object.keys(fareRulesMap);
    if (keys.length > 0 && !selectedRoute) {
      setSelectedRoute(keys[0]);
    }
  }, [fareRulesMap]);

  const fareRulesData = fareRulesMap[selectedRoute] || {};
  console.log("fareRulesData ===", fareRulesData);

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
                  <div>{`${
                    fareRulesData?.fareRuleInformation?.tfr?.CANCELLATION?.[0]
                      ?.st
                  } hrs to ${
                    fareRulesData?.fareRuleInformation?.tfr?.CANCELLATION?.[0]
                      ?.et / 24
                  } days`}</div>
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
                    <p>
                      {fareRulesData?.fareRuleInformation?.tfr
                        ?.CANCELLATION?.[0]?.policyInfo ? (
                        <>
                          {fareRulesData.fareRuleInformation.tfr.CANCELLATION[0].policyInfo
                            .split("__nls__")
                            .filter(Boolean)
                            .map((line, index) => (
                              <div key={index}>{line.trim()}</div>
                            ))}
                          <p>
                            ₹
                            {fareRulesData?.fareRuleInformation?.tfr
                              ?.CANCELLATION?.[0]?.amount
                              ? fareRulesData?.fareRuleInformation?.tfr
                                  ?.CANCELLATION?.[0]?.amount
                              : fareRulesData?.fareRuleInformation?.tfr
                                  ?.CANCELLATION?.[0]?.additionalFee}
                          </p>
                        </>
                      ) : null}
                    </p>
                  </>
                ) : (
                  <p>
                    {" "}
                    ₹
                    {fareRulesData?.fareRuleInformation?.tfr?.CANCELLATION?.[0]
                      ?.amount
                      ? fareRulesData?.fareRuleInformation?.tfr
                          ?.CANCELLATION?.[0]?.amount
                      : fareRulesData?.fareRuleInformation?.tfr
                          ?.CANCELLATION?.[0]?.additionalFee}{" "}
                  </p>
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
                      {`${st} hrs to ${
                        et > 24 ? et / 24 + " days" : et + " hrs"
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
                    <p>
                      {dateChange?.policyInfo ? (
                        <>
                          {dateChange.policyInfo
                            .split("__nls__")
                            .filter(Boolean)
                            .map((line, index) => (
                              <div key={index}>{line.trim()}</div>
                            ))}
                          <p>
                            ₹
                            {dateChange?.amount
                              ? dateChange?.amount
                              : dateChange?.additionalFee}
                          </p>
                        </>
                      ) : null}
                    </p>
                  );
                } else {
                  return (
                    <p>
                      {" "}
                      ₹
                      {dateChange?.amount
                        ? dateChange?.amount
                        : dateChange?.additionalFee}
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
                      {`${noShow?.st} hrs to ${
                        noShow?.et > 24
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
                        {`${seatChangable?.st} hrs to ${
                          seatChangable?.et > 24
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
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 italic p-4">No data available.</div>
        ),
    },
  ];

  const loadDataBook = async (parameter) => {
    try {
      console.log("final", parameter);
      // Call your API function with the properly constructed parameter
      const result = await postDataTJBookingAir(parameter);
      console.log("loadDataBook =========== ", result);
      router.push(`/BookingDetails?tcs_id=${priceId}&booking_id=${bookingId}`);
    } catch (err) {
      console.error("Error while fetching flight data 1 :", err);

      if (err?.response?.data?.errors?.length) {
        const firstError = err.response.data.errors[0];
        const message = firstError?.message || "An unknown error occurred.";
        const details = firstError?.details ? ` - ${firstError.details}` : "";
        setError(`${message}`);

        console.log("API error message:", message);
        console.log("Error details:", details);
        console.log("Error status code:", err.response.status);
      } else if (err?.message) {
        setError(err.message);
        console.log("Generic error message:", err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }

      // Optionally, you can show an error message to the user here
    }
  };

  // Function to handle booking review and trigger loadDataBook
  const bookingReview = () => {
    console.log("travellers (before update)", travellers);
    console.log("totalprice bookingId", totalprice, bookingId);

    const segmentinfo =
      flightData?.tripInfos?.flatMap((trip) => trip.sI || []) || [];

    const updatedTravellers = travellers.map((traveller) => {
      const updatedTraveller = { ...traveller };

      if (Array.isArray(traveller.ssrMealInfos)) {
        updatedTraveller.ssrMealInfos = traveller.ssrMealInfos.map(
          (meal, idx) => ({
            ...meal,
            key: segmentinfo[idx]?.id || "",
          })
        );
      }

      if (Array.isArray(traveller.ssrBaggageInfos)) {
        updatedTraveller.ssrBaggageInfos = traveller.ssrBaggageInfos.map(
          (bag, idx) => ({
            ...bag,
            key: segmentinfo[idx]?.id || "",
          })
        );
      }

      return updatedTraveller;
    });

    if (totalprice && bookingId) {
      const parameter = {
        bookingId,
        paymentInfos: [{ amount: finalAmountToPay }],
        travellerInfo: updatedTravellers,
        deliveryInfo: {
          emails: [email],
          contacts: [`${number.code}${number.number}`],
        },
      };

      console.log("travellerInfo (final):", parameter.travellerInfo);
      console.log("parameter for book:", parameter);

      const saveBookingId = async () => {
        const reqSaveBookingId = {
          booking_id: bookingId,
          phone: number.number,
        };
        const result = await postData(
          "travelogy/flight/save-booking",
          reqSaveBookingId
        );
        console.log("saveBookingId result ===>", result);
      };
      saveBookingId();

      loadDataBook(parameter);
    } else {
      console.error("Booking ID or total price is missing");
    }
  };

  const handleHoldBooking = () => {
    console.log("handleHoldBooking =========== ");

    console.log("traveelers", travellers);
    console.log("totalprice bookingid", totalprice, bookingId);
    if (Array.isArray(travellers) && travellers.length > 0) {
      if (bookingId) {
        // handlePayment();
        // openNotificationWithIcon('success');
        // Build the parameter object without extra curly braces
        const parameter = {
          bookingId: bookingId,
          travellerInfo: travellers,
          deliveryInfo: {
            emails: [email],
            contacts: [`${number.code}${number.number}`],
          },
        };

        const saveBookingId = async () => {
          const reqSaveBookingId = {
            booking_id: bookingId,
            phone: number.number,
          };
          console.log("reqSaveBookingId === > ", reqSaveBookingId);
          const result = await postData(
            "travelogy/flight/save-booking",
            reqSaveBookingId
          );
          console.log("saveBookingId result === > ", result);
        };
        saveBookingId();

        loadDataBook(parameter);
      } else {
        console.error("bookingId Is empty");
      }
    } else {
      // Handle case when totalpricee is not set
      console.error("Total price is not set");
    }
  };

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          <section className="box-section box-breadcrumb background-body">
            <div className="container pt-1">
              <ul className="breadcrumbs">
                <li>
                  <Link href="/">Home</Link>
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
                  <Link href="/">Tickets</Link>
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
                  <span className="text-breadcrumb">Booking</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="section-box  background-card">
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
                            const trevellInfo =
                              tripIndex === 0
                                ? "Onward journey"
                                : "Return journey";
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

                                    <div className="flex flex-row justify-between">
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

                                    <div className=" flex flex-row justify-between  bg-gray-100 p-2 rounded-md  space-y-6 ">
                                      {/* Flight Timings */}
                                      <div className="flex justify-between items-center gap-5 ">
                                        <div className="text-left space-y-1">
                                          {/* <p className="text-sm text-gray-500">{formatDepartureDate(departureDate)}</p> */}
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
                                            className="mx-auto w-20"
                                          />
                                        </div>

                                        <div className="text-right space-y-1">
                                          {/* <p className="text-sm text-gray-500">{formatArrivalDate(arrivalDate)}</p> */}
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

                                      {/* Baggage Info */}
                                      <div className="flex flex-col items-center justify-center gap-3  space-x-10">
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
                                            class="bi bi-suitcase2-fill"
                                            viewBox="0 0 16 16"
                                          >
                                            <path d="M6.5 0a.5.5 0 0 0-.5.5V3H4.5A1.5 1.5 0 0 0 3 4.5v9a1.5 1.5 0 0 0 1.003 1.416A1 1 0 1 0 6 15h4a1 1 0 1 0 1.996-.084A1.5 1.5 0 0 0 13 13.5v-9A1.5 1.5 0 0 0 11.5 3H10V.5a.5.5 0 0 0-.5-.5zM9 3H7V1h2zM4 7V6h8v1z" />
                                          </svg>
                                          <p className="text-sm-bold neutral-900 ">
                                            Check-in:{" "}
                                            <span className="text-sm-medium neutral-500 ">
                                              {baggageObj?.cB}, 1 piece/adult
                                            </span>
                                          </p>
                                        </div>
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

                          {/* <div className="shadow rounded-md p-3"> */}
                          {/* header */}
                          <div className="flex flex-col justify-start  items-start">
                            {/* City and direction row */}
                            {/* <div className="flex flex-row gap-3 items-center mb-2">
                                <p className="text-xl-bold neutral-1000">
                                  {fromCity || "DELHI"}{" "}
                                  <span>({dcitycode})</span>
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
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 
        .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 
        8.5H1.5A.5.5 0 0 1 1 8"
                                  />
                                </svg>
                                <p className="text-xl-bold neutral-1000">
                                  {toCity || "DELHI"} <span>({acitycode})</span>
                                </p>
                              </div>

                              <div className="flex flex-row gap-2">
                                <p className="text-sm-bold neutral-500 ">
                                  {formattedDate || "Date not available"}
                                </p> */}
                            {/* Info list below the cities */}
                            {/* <ul className="flex flex-row gap-4 mb-20 text-sm-medium neutral-500 list-disc">
                                  <li className="text-sm-medium neutral-500 ">
                                    {stops || "No stop info"}
                                  </li>
                                  <li className="text-sm-medium neutral-500 ">
                                    {duration || "Duration not available"}
                                  </li>
                                </ul> */}
                            {/* </div>
                            </div> */}

                            {/* //flight information */}
                            {/* <div className="flex flex-row mt-3 items-center gap-3 mb-3">

<div className=" flex flex-row justify-between items-center">
                        
                        <div className="flex flex-row gap-2">
                         [<p className="text-sm-medium neutral-500">{dcountry},{dcity}</p>|
                          <p className="text-sm-medium neutral-500">{dairportname}</p>|
                          <p className="text-sm-medium neutral-500">{terminal}</p>]
                        </div>
                        
                      </div>
    

<div>
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
</div>

    
<div className=" flex flex-row justify-between items-center">
                        
<div className="flex flex-row gap-2 ">
                         [ <p className="text-sm-medium neutral-500">{acountry},{acity}</p>|
                          <p className="text-sm-medium neutral-500">{aairportname}</p>|
                          <p className="text-sm-medium neutral-500">{aterminal}</p>]
                        </div>
                        
                      </div>
    

</div> */}
                            {/* //flightname and code
                             */}
                            {/* <div className="flex flex-row justify-between">
                              <div className="logo-flight flex flex-row gap-3 items-center mb-20"> */}
                            {/* <img
                                                                            src={`/assets/imgs/airlines/${flightcode}.png`}
                                                                            
                                                                        /> */}
                            {/* <div className="text-md-bold neutral-900">
                                  {flightNames}
                                </div>
                                <div className="text-md-medium neutral-500">
                                  {flightnumber}
                                </div>
                                <div className="text-md-medium neutral-500 border border-black-200 rounded-lg pl-10 pr-10">
                                  {flighteT}
                                </div>
                              </div>

                              <div className="flex flex-row items-center gap-3">
                                <p className="text-sm-medium neutral-500 ">
                                  {cabinclass}
                                </p>
                                <span
                                  className="fareidentifier text-xs font-bold pl-10 pr-10 rounded-full"
                                  style={{
                                    backgroundColor: "rgb(245, 222, 179)",
                                    color: "rgb(92, 64, 51)",
                                    padding: "1px 2px",
                                  }}
                                >
                                  {fareIdentifier}
                                </span>
                              </div>
                            </div> */}

                            {/* <div className=" flex flex-row justify-between  bg-gray-100 p-2 rounded-md  space-y-6 "> */}
                            {/* Flight Timings */}
                            {/* <div className="flex justify-between items-center gap-5 ">
                                <div className="text-left space-y-1"> */}
                            {/* <p className="text-sm text-gray-500">{formatDepartureDate(departureDate)}</p> */}
                            {/* <h4
                                    className=""
                                    style={{
                                      fontSize: "28px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {dt}
                                  </h4>
                                  <p className="text-sm-medium neutral-500 ">{`${dcity},${dcountry}`}</p>
                                  <p className="text-sm-medium neutral-500 ">
                                    {dairportname}
                                  </p>
                                  <p className="text-sm-medium neutral-1000 ">
                                    {terminal}
                                  </p>
                                </div>

                                <div className="text-center space-y-1">
                                  <p className="text-sm-medium neutral-500 ">
                                    {duration}
                                  </p>
                                  <img
                                    src="https://edge.ixigo.com/st/vimaan/_next/static/media/line.9641f579.svg"
                                    alt="flight line"
                                    className="mx-auto w-20"
                                  />
                                </div>

                                <div className="text-right space-y-1"> */}
                            {/* <p className="text-sm text-gray-500">{formatArrivalDate(arrivalDate)}</p> */}
                            {/* <h4
                                    className=""
                                    style={{
                                      fontSize: "28px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    {at}
                                  </h4>
                                  <p className="text-sm-medium neutral-500 ">{`${acity},${acountry}`}</p>
                                  <p className="text-sm-medium neutral-500 ">
                                    {aairportname}
                                  </p>
                                  <p className="text-sm-medium neutral-1000 ">
                                    {aterminal}
                                  </p>
                                </div>
                              </div> */}

                            {/* Baggage Info */}
                            {/* <div className="flex flex-col items-center justify-center gap-3  space-x-10">
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
                                      {cabinBaggage} per adult
                                    </span>
                                  </p>
                                </div>
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
                                      {checkinBaggage}, 1 piece/adult
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-30 text-sm-medium neutral-1000 p-3 bg-blue-100">
                              {`Got excess baggage? Don’t stress, buy extra check-in baggage allowance for ${dcitycode}-${acitycode} at fab rates!`}
                            </div> */}
                          </div>

                          <div className="mt-50 shadow rounded-md p-3">
                            <div className="flex flex-row justify-between">
                              <div className="text-xl-bold neutral-1000">
                                Cancellation and Refund
                              </div>

                              {Object.keys(fareRulesMap)?.length > 0 ? (
                                <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-full w-max mb-4">
                                  {Object.keys(fareRulesMap).map((route) => (
                                    <button
                                      key={route}
                                      onClick={() => setSelectedRoute(route)}
                                      className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 ${
                                        selectedRoute === route
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

                              {/* {Object.keys(fareRulesMap)?.length > 0 ? (
                                <div className="flex gap-4 border-b">
                                  {Object.keys(fareRulesMap).map(
                                    (route, index) => (
                                      <button
                                        key={route}
                                        onClick={() => setSelectedRoute(route)}
                                        className={`px-4 py-2 text-sm font-medium ${
                                          selectedRoute === route
                                            ? "border-b-2 border-blue-500 text-blue-600"
                                            : "text-gray-500"
                                        }`}
                                      >
                                        {route}
                                      </button>
                                    )
                                  )}
                                </div>
                              ) : (
                                <div className="text-gray-500 italic p-4">
                                  No fare rule information available.
                                </div>
                              )} */}

                              <div className="pl-30 ">
                                <Stack>
                                  <Button
                                    variant="contained"
                                    onClick={() => setShowMore((prev) => !prev)}
                                    className=" cursor-pointer"
                                  >
                                    {showMore ? "Show Less" : "Show More"}
                                  </Button>
                                </Stack>
                              </div>
                            </div>

                            {/* Cancellation Charges */}
                            <div className="py-5 ">
                              {/* Refund boxes */}
                              <div className="flex flex-row    justify-around pr-4 mt-5 flex-wrap gap-y-5">
                                <div className=" gap-5 justify-center">
                                  <div className="text-center pl-6">
                                    <p className="text-primary text-sm font-medium whitespace-normal">
                                      {fareRulesData?.refundType}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Timeline */}
                              <div className="space-y-3 mt-3  pl-20 pr-30">
                                {/* Now */}
                                <div className="relative   flex items-center pl-5  justify-center">
                                  {/* Left Icon */}
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

                                  {/* Right Icon */}
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

                                  {/* Horizontal Gradient Line */}
                                  <div className="absolute left-[14px] h-1 w-full bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500" />

                                  {/* Vertical Dotted Line at Center */}
                                  <div className="absolute top-1/2 transform -translate-y-1/2 left-1/2 h-6 border-l border-dotted border-gray-400"></div>
                                </div>
                              </div>

                              <div className="flex flex-row justify-between align-center pt-4 pl-15 pr-15 ">
                                <p className="text-sm-medium neutral-1000">
                                  {cancellation.some(
                                    (e) => e.pp === undefined
                                  ) ? (
                                    "Now"
                                  ) : (
                                    <>
                                      <div>Now</div>
                                    </>
                                  )}
                                </p>
                                <div className="flex  justify-center">
                                  <div className="flex flex-wrap flex-col items-center justify-center max-w-full">
                                    <div className="flex items-center flex-col">
                                      <p className="text-sm-medium neutral-500">
                                        ₹{" "}
                                        {fareRulesData?.fareRuleInformation?.tfr
                                          ?.CANCELLATION?.[0]?.amount
                                          ? fareRulesData?.fareRuleInformation
                                              ?.tfr?.CANCELLATION?.[0]?.amount
                                          : fareRulesData?.fareRuleInformation
                                              ?.tfr?.CANCELLATION?.[0]
                                              ?.additionalFee}
                                        <span className="mx-1"></span>
                                      </p>
                                      <p className="text-secondary text-sm">
                                        {fareRulesData?.fareRuleInformation?.tfr?.CANCELLATION?.[0]?.policyInfo
                                          ?.split("__nls__")
                                          .filter(Boolean)
                                          .map((line, index) => (
                                            <div key={index}>{line.trim()}</div>
                                          ))}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                  <p className="text-sm-medium neutral-1000">
                                    {dt}
                                  </p>
                                  {/* <p>departure</p> */}
                                  {/* <p className="text-sm-medium neutral-1000">
                                    {formattedDate.split(",")[1]}
                                  </p> */}
                                </div>
                              </div>
                            </div>

                            {/* Show More / Show Less Button */}

                            {/* Conditionally Render No Show and Date Change */}
                            {showMore && (
                              <>
                                <div
                                  style={{
                                    maxWidth: "64rem",
                                    margin: "0 auto",
                                    padding: "1rem",
                                  }}
                                >
                                  <Tabs defaultActiveKey="2" items={itemss} />
                                </div>
                              </>
                            )}
                          </div>

                          {/* <div className="item-flight background-card border border-black-200 ticket-container relative flex flex-row justify-between items-center p-5">
  <div className="air_detailes border border-black-200">{flightNames }</div>

  <div className="flight-route flight-route-type-2 city1">
    <div className="flight-route-1">
      <div className="flight-name">
        <div className="flight-info flex flex-col justify-center items-center  ">
          <p className="text-md-bold neutral-1000 city1name">
            {dcity}
             <span className="text-md-bold neutral-1000"> {`(${dcitycode})`}</span>
          </p>
          <p className="text-sm-medium time-flight timelogo">
            <span className="neutral-1000 time">{dt}</span>
          </p>
        </div>
      </div>
    </div>
  </div>

  <div className="flight-route flight-route-type-2 city1">
    <div className="flight-route-1">
      <div className="flight-name duration flex flex-col items-center align-center">
        <p className="text-sm-medium neutral-500 totalduration">{duration}</p>
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
        <p className="text-sm-medium neutral-500 totalduration">{stops}</p>
      </div>
    </div>
  </div>

  <div className="flight-route flight-route-type-2 city1">
    <div className="flight-route-1">
      <div className="flight-name">
        <div className="flight-info flex flex-col items-center align-center">
          <p className="text-md-bold neutral-1000 align-center city1name">
            {acity} <span className="text-md-bold neutral-1000 citycode">{`(${acitycode})`}</span>
          </p>
          <p className="text-sm-medium time-flight timelogo">
            <span className="neutral-1000 time">{at}</span>
          </p>
        </div>
      </div>
    </div>
  </div>

  <div
    className="flight-price-1 border-1 price-div flex justify-center items-center flex-col"
    style={{ width: '245px', paddingLeft: '20px' }}
  >
    <div className="ant-radio-group ant-radio-group-outline fare-options flex flex-col gap-2 w-full css-dev-only-do-not-override-1261szd">
      <label className="ant-radio-wrapper ant-radio-wrapper-checked w-full radiocomp css-dev-only-do-not-override-1261szd">
       
        <span className="ant-radio-label">
          <div className="p-0 rounded-lg border-2 transition-all duration-200 radiodiv border-gray-300 hover:border-gray-500">
            <div className="flex flex-row gap-2 items-center">
              <div className="text-lg font-bold text-gray-800 price">₹{totalprice}</div>
              <span
                className="fareidentifier text-xs font-bold"
                style={{
                  backgroundColor: 'rgb(245, 222, 179)',
                  color: 'rgb(92, 64, 51)',
                  padding: '1px 2px',
                }} 
              >
                {fareIdentifier}
              </span>
            </div>
            <div className="text-xs text-gray-600">
              <span className="ml-2 cabinclass">
               {cabinclass} | <span className="refundable">{refundabletype}</span>
              </span>
            </div>
          </div>
        </span>
      </label>
    </div>
  </div>

 
</div> */}

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
                                className="ant-col ant-col-6"
                                style={{
                                  paddingLeft: "8px",
                                  paddingRight: "8px",
                                }}
                              >
                                <div className="ant-form-item">
                                  <p className="text-xl-bold neutral-1000 mb-10 ">
                                    Passenger information
                                  </p>
                                  <table className="w-full border-collapse mb-20 ">
                                    <thead
                                      style={{ borderBottom: "grey 1px solid" }}
                                    >
                                      <tr>
                                        <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">
                                          S.No
                                        </th>
                                        <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">
                                          Mr/Mrs
                                        </th>
                                        <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">
                                          First Name
                                        </th>
                                        <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">
                                          Last Name
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {travellers.length > 0 ? (
                                        travellers.map((traveller, index) => {
                                          // Log for debugging, check the content of traveller
                                          console.log(
                                            `Traveller ${index + 1} Title:`,
                                            traveller?.ti
                                          );

                                          return (
                                            <tr key={index}>
                                              <td className="px-4 py-3 border-b border-gray-200 text-black">
                                                {index + 1}
                                              </td>
                                              <td className="px-4 py-3 border-b border-gray-200 text-black">
                                                {traveller?.ti?.trim() || "N/A"}
                                              </td>
                                              <td className="px-4 py-3 border-b border-gray-200 text-black">
                                                {traveller?.fN?.trim() || "N/A"}
                                              </td>
                                              <td className="px-4 py-3 border-b border-gray-200 text-black">
                                                {traveller?.lN?.trim() || "N/A"}
                                              </td>
                                            </tr>
                                          );
                                        })
                                      ) : (
                                        <tr>
                                          <td className="px-4 py-3 border-b border-gray-200 text-black">
                                            1
                                          </td>
                                          <td className="px-4 py-3 border-b border-gray-200 text-black">
                                            N/A
                                          </td>
                                          <td className="px-4 py-3 border-b border-gray-200 text-black">
                                            N/A
                                          </td>
                                          <td className="px-4 py-3 border-b border-gray-200 text-black">
                                            N/A
                                          </td>
                                        </tr>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>

                              {/* Email and Phone Number */}
                              <div
                                className="ant-col ant-col-6 mt-30 mb-30"
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
                              <div className="mt-60 flex justify-between">
                                <Link
                                  href={`/book-ticket?tcs_id=${priceId}`}
                                  className="cursor-pointer border-2 border-black px-4 py-2 bg-yellow-300 hover:bg-yellow-400 transition text-black"
                                >
                                  Back
                                </Link>
                                {flightData?.conditions?.isBA === true && (
                                  <div
                                    onClick={handleHoldBooking}
                                    className="cursor-pointer border-2 border-black px-4 py-2 bg-yellow-300 hover:bg-yellow-400 transition text-black"
                                  >
                                    hold booking
                                  </div>
                                )}
                                <div
                                  onClick={bookingReview}
                                  className="cursor-pointer border-2 border-black px-4 py-2 bg-yellow-300 hover:bg-yellow-400 transition text-black"
                                >
                                  continue
                                </div>
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
                        <BookingForm totalpricee={totalPriceinfo} />
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
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Page;
