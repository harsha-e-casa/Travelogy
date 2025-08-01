import {
  postAmendmentDetails,
  postSumbitAmendment,
  postData,
} from "@/services/NetworkAdapter";
import { Dayjs } from "dayjs";
import { useState } from "react";

import cancelAmendmentCharges1 from "./cancelAmendmentCharges1.json";

const TravellerDetailsModal = ({
  bookingId,
  amendmentType,
  onClose,
  bookingDetails,
  tripKey,
}) => {
  console.log("ddddddddddddddddddddddd ", bookingId);
  console.log("ddddddddddddddddddddddd ", amendmentType);
  console.log("ddddddddddddddddddddddd ", bookingDetails);
  const [selectedTravellersPerTrip, setSelectedTravellersPerTrip] = useState(
    {}
  );

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const shortTripKey = tripKey?.split("-")?.slice(0, 2)?.join("-");
  console.log("ddddddddddddddddddddddd ", shortTripKey);
  const allTrips = bookingDetails?.itemInfos?.AIR?.tripInfos || [];
  const travellerInfos = bookingDetails?.itemInfos?.AIR?.travellerInfos || [];
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [amendmentDetailData, setAmendmentDetailData] = useState(null);
  const [reqAmendmentCharges, setReqAmendmentCharges] = useState("");
  const [reqAmendmentChargesPopUp, setReqAmendmentChargesPopUp] =
    useState(false);
  const [amendmentId, setAmendmentId] = useState(null);
  const [] = useState(null);

  // Debug logs
  console.log("📦 travellerInfos:", travellerInfos);
  console.log("🔑 tripKey:", tripKey);

  // Log each traveler's pnrDetails keys to understand the structure
  travellerInfos?.forEach((traveller, index) => {
    console.log(
      `👤 Traveller ${index + 1} PNR Keys:`,
      Object.keys(traveller?.pnrDetails || {})
    );
  });

  const handleConfirm = () => {
    const finalPayload = Object.entries(selectedPerTrip).map(
      ([tripKey, travellers]) => {
        const [src, dest, departureDate] = tripKey.split("-");
        return { src, dest, departureDate, travellers };
      }
    );

    console.log("🚀 Final API Payload:", finalPayload);

    onClose(); // close the modal
  };

  const toggleTraveller = (tripKey, traveller) => {
    setSelectedTravellersPerTrip((prev) => {
      const current = prev[tripKey] || [];
      const exists = current.find(
        (t) => t.fN === traveller.fN && t.lN === traveller.lN
      );

      return {
        ...prev,
        [tripKey]: exists
          ? current.filter(
              (t) => t.fN !== traveller.fN || t.lN !== traveller.lN
            )
          : [...current, traveller],
      };
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center"
      style={{ background: "grey" }}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl relative overflow-y-auto"
        style={{ top: "3%" }}
      >
        <div>
          <div className="flex flex-row justify-between items-center pr-20 ">
            <div className="flex flex-col justify-center items-start pl-2 pr-4 ">
              <div>
                <strong>Type:</strong> {amendmentType}
              </div>
              <div>
                <strong>Booking ID:</strong>{" "}
                {bookingDetails?.order?.bookingId || "N/A"}
              </div>
            </div>
            <button onClick={onClose} className="text-xl">
              ×
            </button>
          </div>

          <div
            className="bg-gray-100 p-4 rounded-md shadow-sm mb-6  overflow-y-auto"
            style={{ maxHeight: "500px" }}
          >
            {allTrips.map((trip, i) => {
              const firstSegment = trip?.sI?.[0];
              const lastSegment = trip?.sI?.[trip?.sI.length - 1];
              const tripKey = `${firstSegment?.da?.code}-${
                lastSegment?.aa?.code
              }-${firstSegment?.dt?.split("T")[0]}`;
              return (
                <div
                  key={i}
                  className="bg-gray-100 p-4 rounded-md shadow-sm mb-6  overflow-y-auto"
                >
                  <div className="text-blue-800 font-semibold mb-3">
                    {trip?.sI
                      ?.map((seg) => `${seg?.da?.city} → ${seg?.aa?.city}`)
                      .join(", ")}
                  </div>

                  {trip?.sI.map((segment, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-4 mb-4 justify-center"
                    >
                      <div className="flex flex-row items-center">
                        <img
                          style={{
                            width: "50px",
                            height: "50px",
                            padding: "5px",
                          }}
                          src={`/assets/imgs/airlines/${segment[
                            "fD"
                          ].aI.code.toLowerCase()}.png`}
                        />
                        <div className="font-medium text-md  flex flex-col items-center">
                          <p>{segment?.fD?.aI?.name}</p>
                          <p>{segment?.fD?.fN}</p>
                        </div>
                      </div>

                      <div className="flex flex-row gap-3 items-center">
                        <div className="text-sm text-gray-500 flex flex-col">
                          <p>
                            {" "}
                            {`${segment?.da?.city}(${segment?.da?.name})-${segment?.da?.code}`}
                          </p>
                          <p>
                            {new Date(segment?.dt).toLocaleString("en-GB", {
                              hour: "2-digit",
                              minute: "2-digit",
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                            })}
                          </p>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-arrow-right"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                          />
                        </svg>
                        <div className="text-sm text-gray-500 flex flex-col">
                          <p>
                            {" "}
                            {`${segment?.aa?.city}(${segment?.aa?.name})-${segment?.aa?.code}`}
                          </p>
                          <p>
                            {new Date(segment?.dt).toLocaleString("en-GB", {
                              hour: "2-digit",
                              minute: "2-digit",
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div
                    key={i}
                    className="bg-gray-100 p-4 rounded-md shadow-sm mb-6"
                  >
                    {/* Traveller List */}
                    {/* {!travellerInfos || travellerInfos.length === 0 ? (
                      <p className="text-red-500">No travellers found</p>
                    ) : (
                      travellerInfos
                        ?.filter((t) => t?.pnrDetails?.[shortTripKey])
                        .map((traveller, k) => {
                          const isChecked = (
                            selectedTravellersPerTrip[tripKey] || []
                          ).some(
                            (t) =>
                              t.fN === traveller.fN && t.lN === traveller.lN
                          );

                          console.log("oooooooooopppppppppssssssssss ",traveller)

                          return (
                            <div
                              key={k}
                              className="flex justify-between items-center mt-2"
                            >
                              <span className="font-medium">{`${traveller.fN} ${traveller.lN}`}</span>
                              <input
                                type="checkbox"
                                className="w-5 h-5"
                                checked={isChecked}
                                onChange={() =>
                                  toggleTraveller(tripKey, traveller)
                                }
                              />
                            </div>
                          );
                        })
                    )} */}
                    {!travellerInfos || travellerInfos.length === 0 ? (
                      <p className="text-red-500">No travellers found</p>
                    ) : (
                      // Ensure uniqueness by filtering out duplicate travelers based on fN and lN
                      travellerInfos
                        ?.reduce((acc, traveller) => {
                          // Check if the traveler already exists in the accumulator
                          const isAlreadyAdded = acc.some(
                            (t) =>
                              t.fN === traveller.fN && t.lN === traveller.lN
                          );

                          // Add the traveler if it's not already in the accumulator
                          if (!isAlreadyAdded) {
                            acc.push(traveller);
                          }

                          return acc;
                        }, []) // Accumulator for unique travelers
                        .map((traveller, k) => {
                          const isChecked = (
                            selectedTravellersPerTrip[tripKey] || []
                          ).some(
                            (t) =>
                              t.fN === traveller.fN && t.lN === traveller.lN
                          );

                          console.log("Traveller: ", traveller);

                          return (
                            <div
                              key={k}
                              className="flex justify-between items-center mt-2"
                            >
                              <span className="font-medium">{`${traveller.fN} ${traveller.lN}`}</span>
                              <input
                                type="checkbox"
                                className="w-5 h-5"
                                checked={isChecked}
                                onChange={() =>
                                  toggleTraveller(tripKey, traveller)
                                }
                              />
                            </div>
                          );
                        })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button
          onClick={() => {
            const trips = Object.entries(selectedTravellersPerTrip)
              .filter(([_, travellers]) => travellers.length > 0)
              .map(([key, travellers]) => {
                const [src, dest, ...dateParts] = key.split("-");
                const departureDate = dateParts.join("-");
                return {
                  src,
                  dest,
                  departureDate,
                  travellers: travellers.map((t) => ({
                    fn: t.fN,
                    ln: t.lN,
                  })),
                };
              });

            if (
              amendmentType == "REQUEST_CANCELLATION" ||
              amendmentType == "REQUEST_FULL_REFUND" ||
              amendmentType == "REQUEST_VOIDED"
            ) {
              console.log("33333333333333");
              const reqAmendmentCharges = async () => {
                try {
                  let splitWords = amendmentType.split("_");
                  splitWords = splitWords.filter((word) => word !== "REQUEST");
                  const splitResult = splitWords.join("_");
                  const param = {
                    bookingId,
                    remarks: "Conform full refund",
                    type: splitResult,
                    trips,
                  };
                  let reqData = {
                    action: "amendmentCharges",
                    requestData: param,
                  };
                  console.log("📤 Sending parameters to API:", reqData);

                  // const req = postData("travelogy/one-way/fetch-data", reqData);
                  const req = cancelAmendmentCharges1;
                  console.log("rrrrrrrrrrr ", req);
                  setReqAmendmentCharges(req);
                  setReqAmendmentChargesPopUp(true);
                } catch (error) {
                  console.log("Error while requesting Amendment: ", error);
                }
              };
              reqAmendmentCharges();
            } else {
              // ✅ Call the API function immediately

              const submitAmendmentapi = async () => {
                try {
                  const parameter = {
                    bookingId,
                    type: amendmentType,
                    remarks: "test cancellation",
                    trips, // 🔁 include this if your API expects it
                  };

                  console.log("📤 Sending parameters to API:", parameter);

                  const response = await postSumbitAmendment(parameter);
                  const data = response;

                  console.log("📌 amendmentId received:", data?.amendmentId);

                  setAmendmentDetailData(data);
                  setAmendmentId(data?.amendmentId);

                  // onClose();
                  if (data?.amendmentId) {
                    try {
                      console.log("📨 Sending amendmentId to details API:", {
                        amendmentId: data.amendmentId,
                      });

                      const amendmentDetails = await postAmendmentDetails({
                        amendmentId: data.amendmentId,
                      });

                      // save the ammendment details
                      const saveAmendmentID = async () => {
                        const req = {
                          phone: "9677179866",
                          booking_id: bookingDetails?.order?.bookingId,
                          amendment_id: data.amendmentId,
                          amendment_status: amendmentDetails?.amendmentStatus,
                          refundable_amount: amendmentDetails?.refundableAmount,
                          is_active: 1,
                          // time: dayjs().format()
                        };

                        const result = await postData(
                          "travelogy/flight/save-amendment",
                          req
                        );
                        console.log("saveAmendmentID result ===> ", result);
                      };
                      saveAmendmentID();

                      console.log("📋 Amendment Details:", amendmentDetails);
                      setAmendmentDetailData(amendmentDetails);
                      setShowDetailsModal(true);
                    } catch (err) {
                      console.error("error caused", err);

                      if (err?.response?.data?.errors?.length) {
                        const firstError = err.response.data.errors[0];
                        const message =
                          firstError?.message || "An unknown error occurred.";
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
                } catch (err) {
                  console.error("error caused", err);

                  if (err?.response?.data?.errors?.length) {
                    const firstError = err.response.data.errors[0];
                    const message =
                      firstError?.message || "An unknown error occurred.";
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
              };

              // 🚀 CALL THE FUNCTION HERE
              submitAmendmentapi();
            }
          }}
          className="btn btn-gray"
        >
          Confirm Traveller
        </button>
      </div>
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
                <strong>Status:</strong> {amendmentDetailData?.amendmentStatus}
              </p>
              <p>
                <strong>Refundable Amount:</strong> ₹
                {amendmentDetailData?.refundableAmount}
              </p>
              <p>
                <strong>Remarks:</strong> {amendmentDetailData?.remarks}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* {reqAmendmentChargesPopUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setReqAmendmentChargesPopUp(false)}
              className="absolute top-4 right-4 text-2xl text-black"
            >
              &times;
            </button>

            <h3 className="text-xl font-bold text-green-700 mb-4">
              Requested Amendment
            </h3>

            <div className="space-y-3 text-gray-700">
              
            </div>
          </div>
        </div>
      )} */}

      {reqAmendmentChargesPopUp &&
        reqAmendmentCharges &&
        reqAmendmentCharges.trips && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative">
              <button
                onClick={() => {
                  setReqAmendmentChargesPopUp(false);
                  setShowDetailsModal(false);
                }}
                className="absolute top-4 right-4 text-2xl text-black"
              >
                &times;
              </button>

              <h3 className="text-xl font-bold text-green-700 mb-4">
                Requested Amendment
              </h3>

              <div className="space-y-3 text-gray-700">
                {reqAmendmentCharges.trips.map((trip, index) => {
                  return (
                    <div key={index} className="space-y-2">
                      <p className="font-semibold text-gray-900">
                        <strong>Route:</strong> {trip.src} → {trip.dest}
                      </p>
                      <p>
                        <strong>Departure Date:</strong>{" "}
                        {new Date(trip.departureDate).toLocaleString()}
                      </p>
                      <p>
                        <strong>Flight Numbers:</strong>{" "}
                        {trip.flightNumbers.join(", ")}
                      </p>
                      <p>
                        <strong>Airlines:</strong> {trip.airlines.join(", ")}
                      </p>

                      <div className="mt-3">
                        <h4 className="font-medium text-lg">
                          Amendment Charges
                        </h4>
                        <div className="space-y-2">
                          <p>
                            <strong>Charges:</strong> ₹
                            {trip.amendmentInfo.ADULT.amendmentCharges}
                          </p>
                          <p>
                            <strong>Refund Amount:</strong> ₹
                            {trip.amendmentInfo.ADULT.refundAmount}
                          </p>
                          <p>
                            <strong>Total Fare:</strong> ₹
                            {trip.amendmentInfo.ADULT.totalFare}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white border-2 border-black w-96 p-6 rounded-lg text-center shadow-lg">
            <p className="text-red-600 mb-4 font-semibold">Error: {error}</p>

            <button
              className="border-2 border-black px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
              onClick={() => {
                setError(null);
                onClose();
              }}
            >
              Ok, Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravellerDetailsModal;
