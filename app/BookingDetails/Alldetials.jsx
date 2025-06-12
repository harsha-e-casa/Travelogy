import { useContext, useEffect, useState } from "react";
import {
  postDataBookingDetails,
  postAirDataBookingDetails,
  postFareValidate,
  postUnHold,
} from "@/services/NetworkAdapter";
import dayjs from "dayjs";
import { AppContext } from "@/util/AppContext";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

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
  const { flightData } = useContext(AppContext);
  const toggleAllPassengers = () => {
    setShowAllPassengers((prev) => !prev);
  };

  const handleCancellation = () => {
    console.log("handleCancellation function == > ");
  }

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

    const result = await postUnHold(unHoldParams);
    console.log("resulttttttttttttttt ==> ", result);

    if (result?.status?.success === true) {
      // router.push(`/BookingDetails?booking_id=${bookingId}`);
      window.location.reload();
    }
  };

  const handlePayNow = async () => {
    console.log("handlePayNow ==> ");
    const parameter = { bookingId: bookingId };
    try {
      const result = await postFareValidate(parameter);
      console.log("resultttttttt ", result);

      if (result?.status && result.status === true) {
        // payment
        // then
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
        console.log("callAirBookResult ==> ", callAirBookResult);
      }
    } catch (error) {
      console.log("zzzzzzzzzz ", error);
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

      const data = await postDataBookingDetails(parameter);
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

  return (
    <>
      <h4 className="neutral-1000">Booking Details</h4>
      <div className="mt-20 bg-white shadow rounded-lg p-6 mb-20">
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
                  <button
                    className="border border-grey rounded"
                    onClick={handleCancellation}
                  >
                    Cancellation
                  </button>
                </div>
              )}
            </div>

            <div>
              {bookingDetails?.order?.status === "SUCCESS" ? (
                <button className="border border-grey rounded">More</button>
              ) : (
                <>
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
                    <button className="border border-grey rounded">More</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-20">
          {bookingDetails?.itemInfos?.AIR?.tripInfos.map((trip, tripIndex) => {
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
                          style={{ fontSize: "28px", fontWeight: "normal" }}
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
                          {`${hours}h ${minutes}m` || "Duration not available"}
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
                          style={{ fontSize: "28px", fontWeight: "normal" }}
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
          })}

          {/* //table */}
          <div className="shadow rounded-md mt-50 p-3 bg-white">
            {/* Passenger Information */}
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
                {/* {travellerinfos.map((traveller, travellerIndex) => {
                  console.log("render traveller --> ",traveller);
                  const segmentKeys = Object.keys(traveller.pnrDetails || {});
                  console.log("render segmentKeys --> ",segmentKeys);
                  return segmentKeys.map((segmentKey, segmentIndex) => {
                    const pnr = traveller.pnrDetails?.[segmentKey] ?? "N/A";
                    const ticket =
                      traveller.ticketNumberDetails?.[segmentKey] ?? "N/A";

                    return (
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
                    );
                  });
                })} */}
                {travellerinfos?.map((traveller, travellerIndex) => {
                  const segmentKeys = Object.keys(
                    traveller.pnrDetails || { "N/A": undefined }
                  );

                  return segmentKeys.map((segmentKey, segmentIndex) => {
                    const pnr = traveller.pnrDetails?.[segmentKey] ?? "N/A";
                    const ticket =
                      traveller.ticketNumberDetails?.[segmentKey] ?? "N/A";
                    console.log("segmentKey ========== ", segmentKey);
                    if (segmentKey === "N/A") {
                      const fallbackKeys = Object.keys(
                        traveller.checkinStatusMap || {}
                      );
                      if (fallbackKeys.length > 0) {
                        segmentKey = fallbackKeys[0]; // or handle multiple if needed
                      }
                    }

                    return (
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
                    );
                  });
                })}
              </tbody>
              {/* <thead style={{ borderBottom: "1px solid grey" }}>
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
                    Ticket Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {travellerinfos.map((e, i) => {
                  const segmentKey = `${departureCityCode}-${arrivalCityCode}`;
                  const pnr = e.pnrDetails?.[segmentKey] ?? "N/A";
                  const ticket = e.ticketNumberDetails?.[segmentKey] ?? "N/A";
                  return (
                    <tr>
                      <td className="px-4 py-3 border-b border-gray-200 text-black">
                        {i + 1}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-200 text-black">
                        {`${e.ti}. ${e.fN} ${e.lN}`}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-200 text-black">
                        {e.pt}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-200 text-black">
                        {segmentKey}: {pnr} ({ticket})
                      </td>
                    </tr>
                  );
                })}
              </tbody> */}
            </table>

            {/* Contact Information */}
            <p className="text-lg-bold neutral-1000 mb-10 mt-20">
              Contact Information
            </p>
            <div className="ant-form-item">
              <div className="text-md neutral-1000 mb-2">
                Email:{" "}
                <strong>
                  {bookingDetails?.order?.deliveryInfo?.emails?.join(", ") ||
                    "N/A"}
                </strong>
              </div>
              <div className="text-md neutral-1000">
                Phone Number:{" "}
                <strong>
                  {bookingDetails?.order?.deliveryInfo?.contacts?.join(", ") ||
                    "N/A"}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Alldetails;
