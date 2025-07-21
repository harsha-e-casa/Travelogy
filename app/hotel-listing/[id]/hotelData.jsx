import React, { useState } from "react";

const HotelData = ({ fetchHotelData = [] }) => {
  const [showFacilityModal, setShowFacilityModal] = useState(false);
  const [currentFacilities, setCurrentFacilities] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]); // ← This tracks ops[].ris[]

  const handleBookNow = (room) => {
    const isAlreadySelected = selectedRooms.some(
      (r) => r.rid === room.rid // Assuming each room has unique `rid` (room ID)
    );
    if (!isAlreadySelected) {
      setSelectedRooms([...selectedRooms, room]);
    }
  };
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [cancellationPolicyData, setCancellationPolicyData] = useState([]);

  return (
    <>
      <h6 className="mt-3">Rooms</h6>
      <div className="border rounded-md mt-10">
        {fetchHotelData.map((room, index) => {
          const dataLen = room.ris?.length;
          return (
            <>
              {room.ris.map((data, index2) => {
                const price = data?.tfcs?.TF?.toFixed(2);
                const nights = data?.pis?.length;
                const isRefundable = room?.cnp?.inra;
                const panRequired = room?.ipr;
                let freeCancellationDate = null;
                if (room?.cnp?.inra === false && Array.isArray(room?.cnp?.pd)) {
                  const freeCancellation = room.cnp.pd.find((p) => p.am === 0);
                  if (freeCancellation?.tdt) {
                    // Format the date if needed
                    const dateObj = new Date(freeCancellation.tdt);
                    freeCancellationDate = dateObj.toLocaleDateString("en-GB"); // DD-MM-YYYY
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
                        {isRefundable === false && freeCancellationDate ? (
                          <div className="text-xs mb-1">
                            Free Cancellation Till:{" "}
                            <span className="text-green-600 font-semibold">
                              {freeCancellationDate}
                            </span>
                          </div>
                        ) : (
                          <div className="text-red-600 text-xs mb-1">
                            ❌ No Free Cancellation / Non-Refundable
                          </div>
                        )}

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

                    {/* Price & Actions */}
                    <div className="col-span-6 text-right">
                      <div className="font-bold text-lg text-gray-900">
                        ₹{Number(price).toLocaleString("en-IN")}
                      </div>
                      <div className="text-xs text-gray-500 mb-1">
                        for {nights} Night(s) For {data.adt} adult
                        {data.adt > 1 ? "s" : ""}
                        {room.chd ? ` ${data.chd} child` : ""}
                      </div>
                      <div className="text-xs text-blue-500 mb-2">
                        Per Night Price
                      </div>
                      {dataLen == index2 + 1 ? (
                        <button
                          className={`book-now-btn `}
                          onClick={() => handleBookNow(data)}
                        >
                          {/* {alreadyBooked ? "ADDED" : "BOOK NOW"} */}
                          Book Now
                        </button>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </>
          );
        })}
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
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Room Facilities
            </h3>
            {currentFacilities.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                {currentFacilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
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
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Cancellation Policy
            </h3>

            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100 text-left text-gray-700">
                <tr>
                  <th className="p-2 border">Cancellation on or After</th>
                  <th className="p-2 border">Cancellation on or Before</th>
                  <th className="p-2 border">
                    Cancellation Charges / Comments
                  </th>
                </tr>
              </thead>
              <tbody>
                {cancellationPolicyData.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 border">
                      {new Date(item.fdt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="p-2 border">
                      {new Date(item.tdt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="p-2 border">
                      ₹{Number(item.am).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default HotelData;
