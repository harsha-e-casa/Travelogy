import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import dayjs from "dayjs";
import { postData } from "@/services/NetworkAdapter";
import { ShareAltOutlined } from "@ant-design/icons";

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
  hotelData,
}) => {
  const [showFacilityModal, setShowFacilityModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [currentFacilities, setCurrentFacilities] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]); // ← This tracks ops[].ris[]
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedQuoteRooms, setSelectedQuoteRooms] = useState([]);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [currentPriceDetails, setCurrentPriceDetails] = useState([]);

  // Quote State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [shareStatus, setShareStatus] = useState("idle");

  const router = useRouter();

  const toggleSelectionMode = () => {
    if (isSelectionMode) {
      setSelectedQuoteRooms([]);
    }
    setIsSelectionMode(!isSelectionMode);
  };

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
      const hotelHTML = generateHotelHTML(selectedQuoteRooms);
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
          setIsSelectionMode(false);
          setSelectedQuoteRooms([]);
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

  const generateHotelHTML = (selectedIds = []) => {
    if (!fetchHotelData || fetchHotelData.length === 0)
      return "<p>Details unavailable.</p>";

    let roomsHTML = "";
    fetchHotelData.forEach((room) => {
      room.ris.forEach((data, index2) => {
        const roomKey = `${room.id}-${index2}`;
        if (selectedIds.length > 0 && !selectedIds.includes(roomKey)) {
          return;
        }

        const optionId = room.id;
        const markup =
          markupObj?.individual?.[optionId] !== undefined
            ? markupObj.individual[optionId]
            : markupObj?.global || 0;
        const price = ((data?.tfcs?.TF || 0) + markup).toFixed(2);
        const nights = data?.pis?.length;
        const cancellationText =
          room?.cnp?.ifra === false && room?.cnp?.inra === true
            ? "Non-Refundable"
            : room?.cnp?.ifra === false && room?.cnp?.inra === false
            ? "No Free Cancellation"
            : room?.cnp?.ifra === true && room?.cnp?.inra === false && room?.cnp?.pd?.[0]?.tdt
            ? `Free Cancellation Till: ${dayjs(room?.cnp?.pd[0]?.tdt).format("DD/MM/YYYY")}`
            : "";

        const facilitiesHTML = data?.fcs?.length > 0 
          ? `<div style="margin-top: 15px;">
               <div style="font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 8px;">Room Facilities:</div>
               <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                 ${data.fcs.map(f => `<span style="background-color: #f1f5f9; color: #475569; padding: 4px 12px; border-radius: 6px; font-size: 12px; border: 1px solid #e2e8f0;">${f}</span>`).join('')}
               </div>
             </div>`
          : "";

        roomsHTML += `
          <div style="margin-bottom: 25px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
            <div style="background-color: #ffffff; padding: 15px 20px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-weight: 800; color: #1e293b; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px;">${data.mb || "ROOM ONLY"}</span>
                ${cancellationText ? `<span style="font-size: 13px; font-weight: 700; color: ${cancellationText.startsWith('Free Cancellation Till') ? '#10b981' : '#ef4444'}; margin-left: 5px;">${cancellationText}</span>` : ""}
              </div>
            </div>
            
            <div style="padding: 20px;">
              <table width="100%" cellpadding="12" cellspacing="0" border="1" style="border-collapse: collapse; border: 1px solid #e2e8f0; margin-bottom: 15px; font-size: 14px;">
                <tr>
                  <td width="35%" style="color: #64748b; background-color: #f8fafc; font-weight: 500;">Room Name:</td>
                  <td style="color: #0f172a; font-weight: 800; font-size: 15px;">${data.srn}</td>
                </tr>
                <tr>
                  <td width="35%" style="color: #64748b; background-color: #f8fafc; font-weight: 500;">Room Category:</td>
                  <td style="color: #334155; font-weight: 500;">${data.rc}</td>
                </tr>
                <tr>
                  <td width="35%" style="color: #64748b; background-color: #f8fafc; font-weight: 500;">Room Type:</td>
                  <td style="color: #334155; font-weight: 500;">${data.rt}</td>
                </tr>
              </table>

              ${facilitiesHTML}

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 20px; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
                <tr>
                  <td style="vertical-align: middle;">
                    <div style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Stay Details</div>
                    <div style="color: #334155; font-size: 14px; font-weight: 600;">
                      ${nights} ${nights !== 1 ? "Nights" : "Night"} for ${data.adt} ${data.adt !== 1 ? "Adults" : "Adult"} ${data.chd ? `& ${data.chd} ${data.chd !== 1 ? "Children" : "Child"}` : ""}
                    </div>
                  </td>
                  <td style="text-align: right; vertical-align: middle;">
                    <div style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Total Price</div>
                    <div style="font-weight: 900; font-size: 24px; color: #e11d48; letter-spacing: -0.5px;">₹${Number(price).toLocaleString("en-IN")}</div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        `;
      });
    });

    const checkin = dayjs(checkinDate).format("DD MMM YYYY");
    const checkout = dayjs(checkoutDate).format("DD MMM YYYY");

    const checkinTime = 
      hotelData?.checkInTime?.beginTime || 
      hotelData?.ad?.checkInTime || 
      hotelData?.ad?.checkInTime?.beginTime || 
      "02:00 PM";
      
    const checkoutTime = 
      hotelData?.checkOutTime?.beginTime || 
      hotelData?.ad?.checkOutTime || 
      hotelData?.ad?.checkOutTime?.beginTime || 
      "11:00 AM";

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
                      <div style="color: #64748b; font-size: 12px; margin-top: 2px;">From: ${checkinTime}</div>
                    </td>
                    <td width="50%" style="border-left: 1px solid #e2e8f0;">
                      <div style="color: #94a3b8; font-size: 11px; text-transform: uppercase; font-weight: 700; margin-bottom: 4px;">Check-out</div>
                      <div style="color: #334155; font-weight: 700; font-size: 15px;">${checkout}</div>
                      <div style="color: #64748b; font-size: 12px; margin-top: 2px;">Till: ${checkoutTime}</div>
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
      <div className="flex justify-between items-center mt-3"style={{
        position:"sticky",
        padding: "5px",
        top: "20px",
        background: "white"
      }}>
        <h2 className="text-xl font-bold text-gray-800">Rooms</h2>
        <button
          onClick={
            isSelectionMode && selectedQuoteRooms.length > 0
              ? () => setIsShareModalOpen(true)
              : toggleSelectionMode
          }
          className={`text-sm font-semibold px-4 py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 flex items-center gap-2 ${
            isSelectionMode
              ? selectedQuoteRooms.length > 0
                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              : "bg-blue-600 text-white hover:bg-yellow-500"
          }`}
        >
          {isSelectionMode
            ? selectedQuoteRooms.length > 0
              ? "Send Quote"
              : "Cancel"
            : "Share Quote"}
           {(selectedQuoteRooms.length > 0 || !isSelectionMode) && (
            <ShareAltOutlined />
          )}
        </button>
      </div>
      <div className="border rounded-xl mt-6 overflow-hidden shadow-sm">
        {isSelectionMode && fetchHotelData.length > 0 && (
          <div className="px-4 py-3 border-b bg-gray-50 flex items-center gap-4">
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={
                selectedQuoteRooms.length ===
                fetchHotelData.reduce((acc, room) => acc + room.ris.length, 0)
              }
              onChange={(e) => {
                if (e.target.checked) {
                  const allKeys = [];
                  fetchHotelData.forEach((room) => {
                    room.ris.forEach((_, idx) => {
                      allKeys.push(`${room.id}-${idx}`);
                    });
                  });
                  setSelectedQuoteRooms(allKeys);
                } else {
                  setSelectedQuoteRooms([]);
                }
              }}
            />
            <span className="text-xs font-semibold text-gray-700">Select All Rooms</span>
          </div>
        )}
        {fetchHotelData.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-sm">No rooms available for the selected dates.</p>
            <p className="text-xs mt-2">Please try different dates or room configurations.</p>
          </div>
        ) : (
          fetchHotelData.map((room, index) => {
          const dataLen = room.ris?.length;
          return (
            <React.Fragment key={index}>
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
                const roomKey = `${room.id}-${index2}`;
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
                    className={`flex items-start border-t p-4 hover:bg-gray-50/50 transition-colors gap-4 ${
                      dataLen == index2 + 1 ? "room_options" : ""
                    }`}
                  >
                    {isSelectionMode && (
                      <div className="pt-1">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-[#f2994a] focus:ring-[#f2994a]"
                          checked={selectedQuoteRooms.includes(roomKey)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedQuoteRooms((prev) => [
                                ...prev,
                                roomKey,
                              ]);
                            } else {
                              setSelectedQuoteRooms((prev) =>
                                prev.filter((id) => id !== roomKey)
                              );
                            }
                          }}
                        />
                      </div>
                    )}
                    <div className="flex-grow flex flex-col">
                      {/* Top row: Meal Plan and Links grouped together */}
                      <div className="flex gap-5 mb-3">
                      <div className="text-gray-800 text-xs font-bold uppercase tracking-wider">
                        {data.mb || "ROOM ONLY"}
                      </div>
                      <div className="flex gap-5">
                          
                          {room?.cnp?.ifra === false &&
                          room?.cnp?.inra === true ? (
                            <div className="text-red-500 text-xs font-medium">
                              No Free Cancellation / Non-Refundable
                            </div>
                          ) : room?.cnp?.ifra === false &&
                            room?.cnp?.inra === false ? (
                            <div className="text-red-500 text-xs font-medium">
                              No Free Cancellation
                            </div>
                          ) : room?.cnp?.ifra === true &&
                            room?.cnp?.inra === false &&
                            room?.cnp?.pd?.[0]?.tdt ? (
                            <div className="text-green-600 text-xs font-medium">
                              Free Cancellation Till:{" "}
                              {new Date(
                                room?.cnp?.pd[0]?.tdt
                              ).toLocaleDateString("en-GB")}
                            </div>
                          ) : null}

                          {panRequired === false && (
                            <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[7px] font-bold uppercase inline-block">
                              PAN not Required
                            </div>
                          )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-start gap-6">
                      <div className="flex-grow">
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs border-collapse border border-gray-200">
                            <tbody>
                              <tr>
                                <td className="text-gray-500 p-3 border border-gray-200 w-1/3 text-sm">
                                  Room Name:
                                </td>
                                <td className="text-gray-800 p-3 border border-gray-200 font-bold text-sm">
                                  {data.srn}
                                </td>
                              </tr>
                              <tr>
                                <td className="text-gray-500 p-3 border border-gray-200 text-sm">
                                  Room Category:
                                </td>
                                <td className="text-gray-800 p-3 border border-gray-200 text-sm">
                                  {data.rc}
                                </td>
                              </tr>
                              <tr>
                                <td className="text-gray-500 p-3 border border-gray-200 text-sm">
                                  Room Type:
                                </td>
                                <td className="text-gray-800 p-3 border border-gray-200 text-sm">
                                  {data.rt}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Cancellation Policy and Room Facilities (Bottom Left) */}
                        
                        <div className="flex gap-5 mt-6">
                        <span
                          className="text-xs text-black underline cursor-pointer font-medium"
                          onClick={() => {
                            setCancellationPolicyData(room?.cnp?.pd || []);
                            setShowCancellationModal(true);
                          }}
                        >
                          Cancellation Policy
                        </span>

                        <span
                          className="text-xs text-black underline cursor-pointer font-medium"
                          onClick={() => {
                            setModalTitle("Room Facilities");
                            setCurrentFacilities(data?.fcs || []);
                            setShowFacilityModal(true);
                          }}
                        >
                          Room Facilities
                        </span>
                      </div>
                      </div>

                      <div className="flex flex-col items-end justify-center min-w-[180px] self-center -mt-8">
                        <div className="text-2xl font-bold text-gray-900">
                          ₹{Number(price).toLocaleString("en-IN")}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 text-right font-bold">
                          for {nights} {nights !== 1 ? "Nights" : "Night"} For {data.adt} {data.adt !== 1 ? "Adults" : "Adult"}{" "}
                          {data.chd} {data.chd !== 1 ? "Children" : "Child"}
                        </div>
                        <div
                          className="text-xs text-blue-600 hover:text-blue-800 mt-2 underline cursor-pointer font-medium"
                          onClick={() => handlePriceClick(data.pis)}
                        >
                          Per Night Price
                        </div>
                        {dataLen === index2 + 1 && (
                          <div className="mt-2">
                            <button
                              className="book-now-btn"
                              onClick={() => handleBookNow(room.id)}
                            >
                              Book Now
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
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
              {modalTitle}
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
              <p className="text-gray-500 italic">No {modalTitle.toLowerCase()} available.</p>
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
