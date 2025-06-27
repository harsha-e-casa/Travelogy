import { useContext, useEffect, useRef, useState } from "react";
import {
  postDataBookingDetails,
  postFareValidate,
  postUnHold,
  postSumbitAmendment,
  postAmendmentDetails,
  postData,
} from "@/services/NetworkAdapter";
import dayjs from "dayjs";
import { AppContext } from "@/util/AppContext";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import "./AmendmentPopup.jsx";
import "./TravellerDetailsModal.jsx";
import AmendmentPopup from "./AmendmentPopup.jsx";
import TravellerDetailsModal from "./TravellerDetailsModal.jsx";
import BarcodeGenerator from "./BarcodeGenerator.jsx";

// test purpose
// const passengerDetails = [
//   {
//     passengerName: "SRIVASTAVA/PANKAJ",
//     pnrCode: "ABCDEF",
//     fromCityCode: "DEL",
//     toCityCode: "BOM",
//     flightNumber: 123,
//     julianDate: "040",
//   },
// ];

const Alldetails = ({ totalpricee }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const bookingId = searchParams.get("booking_id");
  console.log("bookingid from alldetails", bookingId);

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [bookingDetails, setBookingdetails] = useState(null);
  const [segmentPrices, setSegmentPrices] = useState([]); // State for storing segment prices
  const [showAllPassengers, setShowAllPassengers] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const printRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [amendmentId, setAmendmentId] = useState(null);
  const [submitAmmendmentDetails, setSumitAmendmentDetails] = useState(null);
  const [amendmentDetailData, setAmendmentDetailData] = useState(null);
  const { flightData } = useContext(AppContext);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showTravellerModal, setShowTravellerModal] = useState(false);

  const toggleAllPassengers = () => {
    setShowAllPassengers((prev) => !prev);
  };

  const handleCancellation = () => {
    console.log("handleCancellation function == > ");
  };

  const handleUnHold = async () => {
    console.log("handleUnHold ==> ");
    console.log(bookingDetails);
    const travellerInfos = bookingDetails?.itemInfos?.AIR?.travellerInfos;
    const pnrs = [];

    if (Array.isArray(travellerInfos)) {
      travellerInfos.forEach((traveller) => {
        const pnrDetails = traveller.pnrDetails;
        if (pnrDetails && typeof pnrDetails === "object") {
          const pnrValues = Object.values(pnrDetails); // gets array of values like ["X8B25P"]
          pnrs.push(...pnrValues); // append all values
        }
      });
    }

    const unHoldParams = {
      bookingId: bookingId,
      pnrs: pnrs,
    };

    console.log("unHoldParams ----------- ", unHoldParams);

    let reqData = { action: "unholdBooking", requestData: unHoldParams };
    const result = await postData("travelogy/one-way/fetch-data", reqData);

    // const result = await postUnHold(unHoldParams);
    console.log("resulttttttttttttttt ==> ", result);

    if (result?.status?.success === true) {
      // router.push(`/BookingDetails?booking_id=${bookingId}`);
      window.location.reload();
    }
  };
  const handleDownload = (ref) => {
    const content = ref.current.innerHTML;
    const fullHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Ticket</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

        <script src="https://cdn.tailwindcss.com"></script>
        <style>

        .mytestCas{
              background: red;
            }

          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            

          }
        </style>
      </head>
      <body class="p-6 bg-white text-black">
        ${content}
      <div class="mytestCas">my case</div>
      </body>
    </html>
  `;

    const blob = new Blob([fullHtml], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ticket.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = (ref) => {
    const content = ref.current.innerHTML;

    const fullHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Ticket</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
          

          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
            
        </style>
      </head>
      <body class="p-6 bg-white text-black">
        ${content}
    
      </body>
    </html>
  `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(fullHtml);
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500); // Small delay to ensure styles are applied
  };

  const handlePayNow = async () => {
    console.log("handlePayNow ==> ");
    const parameter = { bookingId: bookingId };
    try {
      let reqData = { action: "fareValidate", requestData: parameter };
      const result = await postData("travelogy/one-way/fetch-data", reqData);

      if (result?.status && result.status === true) {
        const airBookParameter = {
          bookingId: bookingId,
          paymentInfos: [
            {
              amount: totalpricee?.fC?.TF,
            },
          ],
        };
        const callAirBookResult = await postAirDat;
        aBookingDetails(airBookParameter);
      }
    } catch (error) {
      console.log("handlePayNow error ", error);
    }
  };

  const bookingDetailsapi = async (bookingId) => {
    setLoading(true);
    setError(null);

    if (!bookingId) {
      setError("Booking ID is missing");
      setLoading(false);
      return;
    } else {
      console.log("found");
    }

    try {
      const parameter = { bookingId: bookingId, requirePaxPricing: true };
      console.log("paramerter", parameter);

      let reqData = { action: "bookingDetails", requestData: parameter };
      const data = await postData("travelogy/one-way/fetch-data", reqData);

      // const data = await postDataBookingDetails(parameter);
      console.log("Booking details:", data);

      setBookingdetails(data); // Update state with flight details
      setSegmentPrices(
        data?.AIR?.tripInfos?.map((trip) => trip.sI.map((seg) => seg.price)) ??
          []
      ); // Storing segment prices
    } catch (err) {
      console.error("error caused", err);

      if (err?.response?.data?.errors?.length) {
        const firstError = err.response.data.errors[0];
        const message = firstError?.message || "An unknown error occurred.";
        setError(message);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const sumbitAmendmentapi = async (
    bookingId,
    amendmentType,
    remarks,
    callback
  ) => {
    setLoading(true);
    setError(null);

    try {
      if (!bookingId || !amendmentType) {
        setError("Booking ID or amendment type is missing");
        setLoading(false);
        return;
      }

      const parameter = { bookingId, type: amendmentType, remarks };
      console.log("📤 Sending parameters to API:", parameter);

      let reqData = { action: "submitAmendment", requestData: parameter };
      const response = await postData("travelogy/one-way/fetch-data", reqData);

      // const response = await postSumbitAmendment(parameter);
      const data = response; // direct response, no .data nesting

      console.log("📌 amendmentId received:", data?.amendmentId);

      setSumitAmendmentDetails(data);
      setAmendmentId(data?.amendmentId);

      if (data?.amendmentId) {
        try {
          console.log("📨 Sending amendmentId to details API:", {
            amendmentId: data.amendmentId,
          });

          // const amendmentDetails = await postAmendmentDetails({
          //   amendmentId: data.amendmentId,
          // });

          let reqData = {
            action: "pollAmendment",
            requestData: {
              amendmentId: data.amendmentId,
            },
          };
          const amendmentDetails = await postData(
            "travelogy/one-way/fetch-data",
            reqData
          );

          console.log("📋 Amendment Details:", amendmentDetails);
          setAmendmentDetailData(amendmentDetails);
          setShowDetailsModal(true);
        } catch (err) {
          console.error("error caused", err);

          if (err?.response?.data?.errors?.length) {
            const firstError = err.response.data.errors[0];
            const message = firstError?.message || "An unknown error occurred.";
            const details = firstError?.details
              ? ` - ${firstError.details}`
              : "";
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
        }
      }

      if (callback && typeof callback === "function") {
        callback(data);
      }
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

  const BookingSkeleton = () => {
    return (
      <section className="section-box block-content-book-tickets background-card">
        <div className="container pt-60">
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

  useEffect(() => {
    console.log("Extracted Booking Id:", bookingId); // Debug log to check if bookingId is correct
    if (bookingId) {
      bookingDetailsapi(bookingId);
    } else {
      setError("No valid booking id found in the URL.");
    }
  }, [bookingId]);

  const segments =
    bookingDetails?.itemInfos?.AIR?.tripInfos?.map((trip) => trip.sI).flat() ??
    [];
  // const totalpriceinfoss = flightData?.tripInfos.flatMap((trip) => trip.totalPriceList) ?? [];
  // const cabinclass = totalpriceinfoss.map((e) => e.fd?.ADULT?.cc);
  const departuredate = segments.map((e) => e.dt);
  const arrivalDate = segments.map((e) => e.at);
  const firstBaggage = segments.flatMap((segment) => segment?.bI?.tI || [])[0]; // Get the first passenger's baggage info

  // const fareidentifier = firstBaggage?.fd?.cc;
  const baggageInfo = {
    cabinBaggage: firstBaggage?.fd?.bI?.cB || "N/A",
    checkinBaggage: firstBaggage?.fd?.bI?.iB || "N/A",
  };

  console.log(baggageInfo);

  const formatDepartureDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString))) return "";
    return format(new Date(dateString), "EEE, dd MMM");
  };

  const formatArrivalDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString))) return "";
    return format(new Date(dateString), "EEE, dd MMM");
  };

  const departureCityCode = segments.map((e, i) => e.da?.code);
  const arrivalCityCode = segments.map((e, i) => e.aa?.code);
  const travellerinfos =
    bookingDetails?.itemInfos?.AIR?.travellerInfos?.map(
      (traveller) => traveller
    ) ?? [];
  console.log("segments", segments);
  console.log(
    "bookingDetails?.itemInfos?.AIR?.travellerInfos ",
    bookingDetails?.itemInfos?.AIR?.travellerInfos
  );
  console.log("travellerinfos =============> ", travellerinfos);

  const convertToJulianDate = (dateString) => {
    const date = new Date(dateString); // Convert the string to a Date object

    // Julian date calculation
    const startDate = new Date(Date.UTC(1, 0, 1)); // Start from January 1, 1 AD
    const julianDate =
      Math.floor((date - startDate) / (1000 * 60 * 60 * 24)) + 1; // Calculate days since start date

    return julianDate;
  };

  const processTravellerInfo = (traveller, itemInfos) => {
    let flightNumber = null;
    let julianDate = null;

    // Iterate through pnrDetails of the traveller to handle multiple segments
    if (traveller.pnrDetails && typeof traveller.pnrDetails === "object") {
      Object.keys(traveller.pnrDetails).forEach((pnrKey) => {
        const [fromCity, toCity] = pnrKey.split("-");

        // Find the corresponding tripInfo in itemInfos based on departure and arrival city codes
        const matchingTripInfo = itemInfos.AIR.tripInfos.find((tripInfo) => {
          return tripInfo.sI.some(
            (sI) => sI.da.code === fromCity && sI.aa.code === toCity
          );
        });

        if (matchingTripInfo) {
          // Get the flight number (fN) from the matching sI object
          const matchedSegment = matchingTripInfo.sI.find(
            (sI) => sI.da.code === fromCity && sI.aa.code === toCity
          );

          if (matchedSegment) {
            flightNumber = matchedSegment.fD.fN;

            // Get the departure date (dt) and convert to Julian date
            const departureDate = matchedSegment.dt;

            // Convert the departure date (dt) to Julian date and get the last 3 digits
            const julianDateValue = convertToJulianDate(departureDate);
            julianDate = julianDateValue.toString().slice(-3); // Get the last 3 digits of the Julian date
          }
        }
      });
    }

    // Return flightNumber and julianDate specific to the current segment
    return { flightNumber, julianDate };
  };

  return (
    <>
      <h4 className="neutral-1000">Booking Details</h4>
      {loading ? (
        <BookingSkeleton />
      ) : (
        <>
          <div className="mt-20 bg-white shadow rounded-lg p-6 mb-20 print-area">
            <div className="mb-10 shadow-md p-3 rounded">
              <div className="flex flex-row justify-between gap-2">
                <div className="flex flex-col justify-start">
                  <p className="text-md-medium neutral-1000">
                    Booking status:{" "}
                    <span
                      className={
                        bookingDetails?.order?.status === "SUCCESS"
                          ? "bg-green-600 text-white pl-1 pr-1 rounded-full"
                          : "bg-red-600 text-white pl-1 pr-1 rounded-full"
                      }
                    >
                      {bookingDetails?.order?.status}
                    </span>{" "}
                  </p>
                  <p className="text-sm-medium neutral-500">
                    Booking Id: {bookingDetails?.order?.bookingId}
                  </p>
                </div>

                <div>
                  {bookingDetails?.order?.status === "SUCCESS" && (
                    <div className="flex flex-row gap-3">
                      <button onClick={handleCancellation}>
                        {/* <AmendmentPopup
                      bookingId={bookingId}
                      onSubmit={(bookingId, amendmentType) =>
                        sumbitAmendmentapi(
                          bookingId,
                          amendmentType,
                          "Cancel due to rescheduling",
                          (data) => {
                            alert(`Amendment raised successfully. ID: ${data?.amendmentId}`);
                            handleClose(); // ✅ This will work now
                          }
                        )
                      }
                    /> */}
                        <AmendmentPopup
                          bookingId={bookingId}
                          onSubmit={(
                            bookingId,
                            amendmentType,
                            remarks,
                            callback
                          ) =>
                            sumbitAmendmentapi(
                              bookingId,
                              amendmentType,
                              remarks,
                              (data) => {
                                callback?.(data); // Keep your original callback logic
                                setShowTravellerModal(true); // ✅ Show traveller modal after amendment submit
                              }
                            )
                          }
                        />

                        {showDetailsModal && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative">
                              <button
                                onClick={() => setShowDetailsModal(false)}
                                className="absolute top-4 right-4 text-2xl text-black"
                              >
                                &times;
                              </button>

                              <h3 className="text-xl font-bold text-green-700 mb-4">
                                Amendment Details
                              </h3>

                              <div className="space-y-3 text-gray-700">
                                <p>
                                  <strong>Status:</strong>{" "}
                                  {amendmentDetailData?.amendmentStatus}
                                </p>
                                <p>
                                  <strong>Refundable Amount:</strong> ₹
                                  {amendmentDetailData?.refundableAmount}
                                </p>
                                <p>
                                  <strong>Remarks:</strong>{" "}
                                  {amendmentDetailData?.remarks}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {showTravellerModal && (
                          <TravellerDetailsModal
                            bookingId={bookingId}
                            onClose={() => setShowTravellerModal(false)}
                          />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  {bookingDetails?.order?.status === "SUCCESS" ? (
                    <div className="relative inline-block">
                      <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="border border-grey rounded px-4 py-2"
                      >
                        More
                      </button>
                      {showDropdown && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10">
                          <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              handlePrint(printRef);
                              setShowDropdown(false);
                            }}
                          >
                            Print Ticket
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              handleDownload(printRef);
                              setShowDropdown(false);
                            }}
                          >
                            Download Ticket
                          </button>
                        </div>
                      )}
                    </div>
                  ) : bookingDetails?.order?.status === "PENDING" ? (
                    <>
                      {/* <button className="border border-grey rounded" onClick={handlePayNow}>
                Pay Now
              </button> */}
                      <div className="relative inline-block">
                        <button
                          onClick={() => setShowDropdown(!showDropdown)}
                          className="border border-grey rounded px-4 py-2"
                        >
                          More
                        </button>
                        {showDropdown && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10">
                            <button
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              onClick={() => {
                                handlePrint(printRef);
                                setShowDropdown(false);
                              }}
                            >
                              Print Ticket
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              onClick={() => {
                                handleDownload(printRef);
                                setShowDropdown(false);
                              }}
                            >
                              Download Ticket
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-row gap-3">
                      <button
                        className="border border-grey rounded"
                        onClick={handleUnHold}
                      >
                        Unhold
                      </button>
                      <button
                        className="border border-grey rounded"
                        onClick={handlePayNow}
                      >
                        Pay Now
                      </button>
                      <button className="border border-grey rounded">
                        More
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-20" ref={printRef}>
              {bookingDetails?.itemInfos?.AIR?.tripInfos.map(
                (trip, tripIndex) => {
                  console.log("alldetails trip == ", trip);
                  return trip?.sI.map((seg, segIndex) => {
                    console.log("alldetails seg == ", seg);
                    const segDt = seg?.dt;

                    const date = new Date(segDt);

                    const formattedDate = date.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    });

                    const dT = segDt.split("T")[1];

                    const segAt = seg?.at;
                    const aT = segAt.split("T")[1];

                    const [startHour, startMin] = dT.split(":").map(Number);
                    const [endHour, endMin] = aT.split(":").map(Number);

                    let startMinutes = startHour * 60 + startMin;
                    let endMinutes = endHour * 60 + endMin;

                    if (endMinutes < startMinutes) {
                      endMinutes += 24 * 60;
                    }

                    const diffMinutes = endMinutes - startMinutes;
                    const hours = Math.floor(diffMinutes / 60);
                    const minutes = diffMinutes % 60;

                    let fareIdentifier = seg?.bI?.tI?.[0]?.fd?.cc;

                    return (
                      <>
                        <div
                          key={`${tripIndex}-${segIndex}`}
                          className="shadow rounded-md p-3 mb-5 "
                        >
                          {/* header */}
                          <div className="flex flex-col justify-start  items-start">
                            {/* City and direction row */}
                            <div className="flex flex-row gap-3 items-center mb-2">
                              <p className="text-xl-bold neutral-1000">
                                {seg?.da?.city || "DELHI"}
                                <span> ({seg?.da?.code})</span>
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
                                {seg?.aa?.city}
                                <span>({seg?.aa?.code})</span>
                              </p>
                            </div>

                            <div className="flex flex-row gap-2">
                              <p className="text-sm-bold neutral-500 ">
                                {formattedDate || "Date not available"}
                              </p>
                              {/* Info list below the cities */}
                              <ul className="flex flex-row gap-4 mb-20 text-sm-medium neutral-500 list-disc">
                                {/* <li className="text-sm-medium neutral-500 ">
                            {segments.map((segment) =>
                              segment.stops === 0
                                ? "Non Stop"
                                : `${segment.stops} Stop${
                                    segment.stops > 1 ? "s" : ""
                                  }`
                            ) || "No stop info"}
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
                              {/* <p className="text-sm-medium neutral-500 ">{cabinclass}</p> */}
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
                          </div>

                          {/* flightdetails    */}
                          <div className=" flex border   w-full justify-between items-center bg-gray-100 pl-50 pr-50 pt-10 pb-10 rounded-md  ">
                            <div className="text-left space-y-1">
                              <h4
                                className=""
                                style={{
                                  fontSize: "28px",
                                  fontWeight: "normal",
                                }}
                              >
                                {seg?.dt.split("T")[1]}
                              </h4>
                              <p className="text-sm-medium neutral-500 ">
                                {seg?.da?.city} {seg?.da?.country}
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
                                {`${hours}h ${minutes}m` ||
                                  "Duration not available"}
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
                                {seg?.at?.split("T")[1]}
                              </h4>
                              <p className="text-sm-medium neutral-500 ">
                                {seg?.aa?.city} {seg?.aa?.country}
                              </p>
                              <p className="text-sm-medium neutral-500 ">
                                {seg?.aa?.name}
                              </p>
                              <p className="text-sm-medium neutral-1000 ">
                                {seg?.aa?.terminal}
                              </p>
                            </div>

                            {/* Baggage Info */}
                            <div className="flex flex-col items-start justify-start gap-3">
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
                                    {" "}
                                    {baggageInfo.cabinBaggage || "N/A"}
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
                                    {baggageInfo.checkinBaggage || "N/A"}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-30 text-sm-medium neutral-1000 p-3 bg-blue-100">
                            {`Got excess baggage? Don’t stress, buy extra check-in baggage allowance for ${seg?.da?.code}-${seg?.aa?.code} at fab rates!`}
                          </div>
                        </div>
                      </>
                    );
                  });
                }
              )}

              <div className="shadow rounded-md mt-50 p-3 bg-white">
                <p className="text-xl-bold neutral-1000 mb-10">
                  Passenger Information
                </p>
                <table className="w-full border-collapse mb-20">
                  <thead style={{ borderBottom: "1px solid grey" }}>
                    <tr>
                      <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">
                        S.No
                      </th>
                      <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">
                        Person Type
                      </th>
                      <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">
                        Segment
                      </th>
                      <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">
                        PNR
                      </th>
                      <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">
                        Ticket Number
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {travellerinfos?.map((traveller, travellerIndex) => {
                      const segmentKeys = Object.keys(
                        traveller.pnrDetails || { "N/A": undefined }
                      );

                      return segmentKeys.map((segmentKey, segmentIndex) => {
                        const pnr = traveller.pnrDetails?.[segmentKey] ?? "N/A";
                        console.log("pnrrrrrrrrrrrrrrrr varudha daaaaaaaaaaa ",pnr);
                        const ticket =
                          traveller.ticketNumberDetails?.[segmentKey] ?? "N/A";

                        if (segmentKey === "N/A") {
                          const fallbackKeys = Object.keys(
                            traveller.checkinStatusMap || {}
                          );
                          if (fallbackKeys.length > 0) {
                            segmentKey = fallbackKeys[0];
                          }
                        }

                        let passengerDetailsData = [];

                        if (pnr !== "N/A") {
                          console.log("ulleeeeeeeeeeeeeeee")
                          const [fromCitySplit, toCitySplit] =
                            segmentKey.split("-");

                          // Get flightNumber and julianDate for each traveller's segment
                          const { flightNumber, julianDate } =
                            processTravellerInfo(
                              traveller,
                              bookingDetails?.itemInfos
                            );

                          passengerDetailsData = [
                            {
                              passengerName: `${traveller.lN}/${traveller.fN}`
                                .trim()
                                .toUpperCase()
                                .padEnd(20, " "),
                              pnrCode: pnr,
                              fromCityCode: fromCitySplit,
                              toCityCode: toCitySplit,
                              flightNumber: flightNumber,
                              julianDate: julianDate,
                            },
                          ];

                          console.log(
                            "passengerDetailsData =========> ",
                            passengerDetailsData
                          );
                        }

                        return (
                          <>
                            <tr key={`${travellerIndex}-${segmentIndex}`}>
                              <td className="px-4 py-3 border-b border-gray-200 text-black">
                                {travellerIndex + 1}
                              </td>
                              <td className="px-4 py-3 border-b border-gray-200 text-black">
                                {`${traveller.ti}. ${traveller.fN} ${traveller.lN}`}
                              </td>
                              <td className="px-4 py-3 border-b border-gray-200 text-black">
                                {traveller.pt}
                              </td>
                              <td className="px-4 py-3 border-b border-gray-200 text-black">
                                {segmentKey}
                              </td>
                              <td className="px-4 py-3 border-b border-gray-200 text-black">
                                {pnr}
                              </td>
                              <td className="px-4 py-3 border-b border-gray-200 text-black">
                                {ticket}
                              </td>
                            </tr>

                            {pnr !== "N/A" && (
                              <tr>
                                <td
                                  colSpan="6"
                                  className="px-4 py-3 border-b border-gray-200"
                                >
                                  <BarcodeGenerator
                                    passengerDetails={passengerDetailsData}
                                  />
                                </td>
                              </tr>
                            )}
                          </>
                        );
                      });
                    })}
                  </tbody>
                </table>

                <p className="text-lg-bold neutral-1000 mb-10 mt-20 mytestCas">
                  Contact Information
                </p>
                <div className="ant-form-item">
                  <div className="text-md neutral-1000 mb-2">
                    Email:{" "}
                    <strong>
                      {bookingDetails?.order?.deliveryInfo?.emails?.join(
                        ", "
                      ) || "N/A"}
                    </strong>
                  </div>
                  <div className="text-md neutral-1000">
                    Phone Number:{" "}
                    <strong>
                      {bookingDetails?.order?.deliveryInfo?.contacts?.join(
                        ", "
                      ) || "N/A"}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white border-2 border-black w-96 p-6 rounded-lg text-center shadow-lg">
            <p className="text-red-600 mb-4 font-semibold">Error: {error}</p>

            <button
              className="border-2 border-black px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
              // onClick={searchTickets}
            >
              Ok, Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Alldetails;
