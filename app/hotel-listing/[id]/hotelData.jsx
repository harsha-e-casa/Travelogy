import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import dayjs from "dayjs";
import { postData } from "@/services/NetworkAdapter";

const HotelData = ({
  fetchHotelData = [],
  hotelId,
  availabilityError,
  markupObj,
  hotelName,
  hotelAddress,
  hotelImage,
  checkinDate,
  checkoutDate,
}) => {
  const [showFacilityModal, setShowFacilityModal] = useState(false);
  const [currentFacilities, setCurrentFacilities] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]); // ← This tracks ops[].ris[]
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [currentPriceDetails, setCurrentPriceDetails] = useState([]);

  // Quote State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [shareStatus, setShareStatus] = useState("idle");

  const router = useRouter();

  const handleShareQuote = async () => {
    if (!shareEmail) {
      message.error("Please enter a valid email.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shareEmail)) {
      message.error("Please enter a valid email address.");
      return;
    }

    try {
      const hotelHTML = generateHotelHTML();
      const payload = {
        email: shareEmail,
        link: window.location.href,
        htmlContent: hotelHTML,
      };

      setShareStatus("sending");
      const response = await postData("/travelogy/common/send-quote", payload);
      if (response && (response.success || response.status)) {
        setShareStatus("success");
        message.success("Quote sent successfully!");
        setTimeout(() => {
          setIsShareModalOpen(false);
          setShareEmail("");
          setShareStatus("idle");
        }, 2000);
      } else {
        setShareStatus("error");
        message.error(response?.message || "Failed to send quote.");
        setTimeout(() => setShareStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Error sharing quote:", error);
      message.error("An error occurred while sharing the quote.");
      setShareStatus("idle");
    }
  };

  const generateHotelHTML = () => {
    if (!fetchHotelData || fetchHotelData.length === 0)
      return "<p>Details unavailable.</p>";

    let roomsHTML = "";
    fetchHotelData.forEach((room) => {
      room.ris.forEach((data) => {
        const optionId = room.id;
        const markup =
          markupObj?.individual?.[optionId] !== undefined
            ? markupObj.individual[optionId]
            : markupObj?.global || 0;
        const price = ((data?.tfcs?.TF || 0) + markup).toFixed(2);
        const nights = data?.pis?.length;

        roomsHTML += `
          <div style="margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px;">
            <div style="font-weight: 700; color: #334155; font-size: 16px; margin-bottom: 5px;">${data.rc}</div>
            <div style="color: #64748b; font-size: 14px; margin-bottom: 8px;">${data.mb}</div>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="color: #94a3b8; font-size: 12px;">
                  ${nights} Night(s) for ${data.adt} Adult(s) ${data.chd ? `& ${data.chd} Child` : ""}
                </td>
                <td style="text-align: right; font-weight: 800; font-size: 18px; color: #e11d48;">
                  ₹${Number(price).toLocaleString("en-IN")}
                </td>
              </tr>
            </table>
          </div>
        `;
      });
    });

    const checkin = dayjs(checkinDate).format("DD MMM YYYY");
    const checkout = dayjs(checkoutDate).format("DD MMM YYYY");

    return `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background-color: #c7941dff; padding: 25px 30px; text-align: center;">
                <div style="color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">Travelogy Hotel Quote</div>
                <div style="color: #ffffff; font-size: 12px; margin-top: 4px;">Premium Accommodation Selection</div>
            </td>
          </tr>
          ${hotelImage ? `
          <tr>
            <td>
              <img src="${hotelImage}" style="width: 100%; height: 250px; object-fit: cover;" alt="${hotelName}" />
            </td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding: 30px;">
                <div style="margin-bottom: 25px;">
                  <h2 style="margin: 0 0 5px 0; color: #0f172a; font-size: 22px; font-weight: 800;">${hotelName}</h2>
                  <div style="color: #64748b; font-size: 14px;">${hotelAddress}</div>
                </div>

                <table width="100%" cellpadding="10" cellspacing="0" border="0" style="background-color: #f8fafc; border-radius: 8px; margin-bottom: 30px;">
                  <tr>
                    <td width="50%">
                      <div style="color: #94a3b8; font-size: 11px; text-transform: uppercase; font-weight: 700; margin-bottom: 4px;">Check-in</div>
                      <div style="color: #334155; font-weight: 700; font-size: 15px;">${checkin}</div>
                    </td>
                    <td width="50%" style="border-left: 1px solid #e2e8f0;">
                      <div style="color: #94a3b8; font-size: 11px; text-transform: uppercase; font-weight: 700; margin-bottom: 4px;">Check-out</div>
                      <div style="color: #334155; font-weight: 700; font-size: 15px;">${checkout}</div>
                    </td>
                  </tr>
                </table>

                <h3 style="color: #0f172a; font-size: 18px; font-weight: 700; margin-bottom: 15px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">Available Room Options</h3>
                
                ${roomsHTML}
                
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 20px;">
                    <tr>
                        <td style="text-align: center; font-family: Arial, sans-serif;">
                            <div style="color: #64748b; font-size: 13px; font-style: italic;">Note: Prices are subject to change based on availability at the time of booking.</div>
                        </td>
                    </tr>
                </table>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8fafc; padding: 15px; text-align: center; border-top: 1px solid #f1f5f9;">
                <div style="color: #94a3b8; font-size: 11px;">&copy; ${dayjs().year()} Travelogy. All rights reserved.</div>
            </td>
          </tr>
        </table>
      </div>
    `;
  };

  const handleBookNow = (optionId) => {
    router.push(`/hotel-listing/stepper?hid=${hotelId}&oid=${optionId}`);
  };

  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [cancellationPolicyData, setCancellationPolicyData] = useState([]);
  const handlePriceClick = (pis) => {
    setCurrentPriceDetails(pis); // Set pis data when clicking on the price
    setShowPriceModal(true); // Show the modal
  };

  const closePriceModal = () => {
    setShowPriceModal(false); // Close the modal
  };
  return (
    <>
      <h6 className="mt-3">Rooms</h6>
      <div className="border rounded-md mt-10">
        {fetchHotelData.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-sm">No rooms available for the selected dates.</p>
            <p className="text-xs mt-2">Please try different dates or room configurations.</p>
          </div>
        ) : (
          fetchHotelData.map((room, index) => {
          const dataLen = room.ris?.length;
          return (
            <>
              {room.ris.map((data, index2) => {
                const optionId = room.id;
                const markup =
                  markupObj?.individual?.[optionId] !== undefined
                    ? markupObj.individual[optionId]
                    : markupObj?.global || 0;
                const price = ((data?.tfcs?.TF || 0) + markup).toFixed(2);
                const nights = data?.pis?.length;
                const isRefundable = room?.cnp?.inra;
                const panRequired = room?.ipr;
                let freeCancellationDate = null;
                if (room?.cnp?.inra === false && Array.isArray(room?.cnp?.pd)) {
                  const freeCancellation = room.cnp.pd.find((p) => p.am === 0);
                  if (freeCancellation?.tdt) {
                    const dateObj = new Date(freeCancellation.tdt);
                    freeCancellationDate = dateObj.toLocaleDateString("en-GB");
                  }
                }
                return (
                  <div
                    key={index2}
                    className={`grid grid-cols-12 border-t p-3 items-center gap-4 ${
                      dataLen == index2 + 1 ? "room_options" : ""
                    }`}
                  >
                    <div className="col-span-6">
                      <h4 className="font-semibold text-gray-800 text-sm mb-1">
                        {data.rc}
                        {/* {data.mb ? ` (${data.mb})` : ""} */}
                      </h4>
                      <br />
                      <div>
                        {panRequired === false && (
                          <div className="text-green-600 text-xs mb-1">
                            PAN not Required
                          </div>
                        )}
                      </div>
                      <br />
                      <div className="flex flex-wrap justify-between items-center text-xs mb-1">
                        {/* {isRefundable === false && freeCancellationDate ? (
                          <div className="text-xs mb-1">
                            Free Cancellation Till:{" "}
                            <span className="text-green-600 font-semibold">
                              {freeCancellationDate}
                            </span>
                          </div>
                        ) : (
                          <div className="text-red-600 text-xs mb-1">
                            No Free Cancellation / Non-Refundable
                          </div>
                        )} */}
                        {room?.cnp?.ifra === false &&
                        room?.cnp?.inra === true ? (
                          <div className="text-red-600 text-xs mb-1">
                            No Free Cancellation / Non-Refundable
                          </div>
                        ) : room?.cnp?.ifra === false &&
                          room?.cnp?.inra === false ? (
                          <div className="text-red-600 text-xs mb-1">
                            No Free Cancellation
                          </div>
                        ) : room?.cnp?.ifra === true &&
                          room?.cnp?.inra === false &&
                          room?.cnp?.pd?.[0]?.tdt ? (
                          <div className="text-xs mb-1">
                            Free Cancellation Till:{" "}
                            <span className="text-green-600 font-semibold">
                              {new Date(
                                room?.cnp?.pd[0]?.tdt
                              ).toLocaleDateString("en-GB")}
                            </span>
                          </div>
                        ) : null}

                        <div className="text-sm text-gray-700">{data.mb}</div>
                      </div>
                      {dataLen == index2 + 1 ? (
                        <div className="mt-4 flex flex-wrap gap-4 text-xs text-orange-600">
                          <span
                            className="underline cursor-pointer"
                            onClick={() => {
                              setCancellationPolicyData(room?.cnp?.pd || []);
                              setShowCancellationModal(true);
                            }}
                          >
                            Cancellation Policy
                          </span>

                          <span
                            className="underline cursor-pointer"
                            onClick={() => {
                              setCurrentFacilities(data?.fcs || []);
                              setShowFacilityModal(true);
                            }}
                          >
                            Room Facilities
                          </span>
                        </div>
                      ) : null}
                    </div>

                    <div className="col-span-6 text-right">
                      <div className="font-bold text-lg text-gray-900">
                        ₹{Number(price).toLocaleString("en-IN")}
                      </div>
                      <div className="text-xs text-gray-500 mb-1">
                        for {nights} Night(s) For {data.adt} adult
                        {data.adt > 1 ? "s" : ""}
                        {room.chd ? ` ${data.chd} child` : ""}
                      </div>
                      <div
                        className="text-xs text-blue-500 mb-2 underline cursor-pointer"
                        onClick={() => handlePriceClick(data.pis)}
                      >
                        Per Night Price
                      </div>
                      {dataLen === index2 + 1 && (
                        <div className="flex flex-col gap-2 items-end">
                          <button
                            className="book-now-btn"
                            onClick={() => handleBookNow(room.id)}
                          >
                            Book Now
                          </button>
                          <div
                            className="text-xs text-yellow-600 underline cursor-pointer font-semibold mt-1"
                            onClick={() => setIsShareModalOpen(true)}
                          >
                            Share Quote
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          );
        })
        )}
      </div>

      {/* Facilities Modal */}
      {showFacilityModal && (
        <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setShowFacilityModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-lg"
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-4 text-gray-800 text-center">
              Room Facilities
            </h3>
            {currentFacilities.length > 0 ? (
              <div className="flex flex-wrap space-x-4">
                {currentFacilities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-gray-700 text-sm"
                  >
                    <span className="text-orange-500">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No facilities available.</p>
            )}
          </div>
        </div>
      )}

      {showCancellationModal && (
        <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg relative overflow-auto max-h-[90vh]">
            <button
              onClick={() => setShowCancellationModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-lg"
            >
              ×
            </button>
            <h3 className="text-center text-lg font-bold mb-4 text-gray-800">
              Cancellation Policy
            </h3>

            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100 text-left text-gray-700">
                <tr>
                  <th className="text-center p-2 border">
                    Cancellation on or After
                  </th>
                  <th className="text-center p-2 border">
                    Cancellation on or Before
                  </th>
                  <th className="text-center p-2 border">
                    Cancellation Charges / Comments
                  </th>
                </tr>
              </thead>
              <tbody>
                {cancellationPolicyData.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center p-2 border">
                      {new Date(item.fdt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="text-center p-2 border">
                      {new Date(item.tdt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="text-center p-2 border">
                      ₹{Number(item.am).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {showPriceModal && (
        <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <button
              onClick={closePriceModal}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-lg"
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-4 text-gray-800 text-center">
              Per Night Pricing Details
            </h3>
            {currentPriceDetails.length > 0 ? (
              <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100 text-left text-gray-700">
                  <tr>
                    <th className="text-center p-2 border">Day</th>
                    <th className="text-center p-2 border">Price </th>
                  </tr>
                </thead>
                <tbody>
                  {currentPriceDetails.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center p-2 border">{item.day}</td>
                      <td className="text-center p-2 border">
                        ₹{Number(item.fc.TF).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 italic">
                No pricing details available.
              </p>
            )}{" "}
          </div>
        </div>
      )}

      {/* Share Quote Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-3xl"
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-4 text-gray-800 text-center">
              Share Quote
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Email
              </label>
              <input
                type="email"
                className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="Enter email address"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
              />
            </div>
            <button
              className={`w-full py-2 rounded-md text-white font-semibold transition-colors ${
                shareStatus === "sending"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
              onClick={handleShareQuote}
              disabled={shareStatus === "sending"}
            >
              {shareStatus === "sending" ? "Sending..." : "Send Quote"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HotelData;
