import React, { useState } from "react";

const HotelData = ({ facilities, longitude, latitude, fetchHotelData }) => {
  const [activeTab, setActiveTab] = useState("Rooms");

  const [expandedGroup, setExpandedGroup] = useState({});
  const [showFacilityModal, setShowFacilityModal] = useState(false);
  const [currentFacilities, setCurrentFacilities] = useState([]);

  const toggleGroup = (groupName) => {
    setExpandedGroup((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };
  const renderContent = () => {
    if (activeTab === "Rooms") {
      const groupedRooms = fetchHotelData?.reduce((acc, room) => {
        const key = room.srn || "Other";
        if (!acc[key]) acc[key] = [];
        acc[key].push(room);
        return acc;
      }, {});
      return (
        <div className="border rounded overflow-hidden">
          <table className="w-full text-sm border border-gray-300">
            <thead className="bg-dark text-white font-semibold">
              <tr>
                <th className="px-4 py-2 border-r text-left">Room Type</th>
                <th className="px-4 py-2 border-r text-left">Room Options</th>
                <th className="px-4 py-2 border-r text-left">Description</th>
                <th className="px-4 py-2 border-r text-left">
                  Cancellation Policy
                </th>
                <th className="px-4 py-2 text-right">Price</th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(groupedRooms).map(([roomName, rooms]) => {
                const isExpanded = expandedGroup[roomName];
                const firstRoom = rooms[0];
                const remainingRooms = rooms.slice(1);
                const allRooms = [
                  firstRoom,
                  ...(isExpanded ? remainingRooms : []),
                ];

                return (
                  <React.Fragment key={roomName}>
                    {allRooms.map((room, i) => {
                      const price = room?.tfcs?.TF?.toFixed(2) || "0.00";
                      const isRefundable = room?.cnp?.inra === false;

                      return (
                        <tr
                          key={`${roomName}-${i}`}
                          className="bg-[#fefaf4] border-b"
                        >
                          {i === 0 && (
                            <td
                              rowSpan={allRooms.length}
                              className="font-semibold px-4 py-3 text-gray-800 border-r align-top"
                            >
                              {roomName}
                            </td>
                          )}
                          <td className="px-4 py-3 border-r text-gray-800">
                            Room Only
                          </td>
                          <td className="px-4 py-3 border-r">
                            <div className="font-semibold">{room.rt}</div>
                            <div
                              className="room_fac text-xs underline cursor-pointer"
                              onClick={() => {
                                setCurrentFacilities(room.fcs || []);
                                setShowFacilityModal(true);
                              }}
                            >
                              Room Facilities
                            </div>
                          </td>
                          <td className="px-4 py-3 border-r text-gray-800">
                            {isRefundable
                              ? "Free Cancellation"
                              : "No Free Cancellation / Non-Refundable"}
                          </td>
                          <td className="px-4 py-3 text-right text-gray-900">
                            <div className="text-lg font-bold">₹{price}</div>
                            <div className="text-xs text-gray-500 mb-1">
                              for {room.pis?.length || 1} Night(s) for{" "}
                              {room.adt} adult(s)
                              {room.chd ? ` & ${room.chd} child` : ""}
                            </div>
                            <button className="book-now-btn">BOOK NOW</button>
                            {/* <div className="text-[#f58220] text-xs mt-1">
                              Add to Quote
                            </div> */}
                          </td>
                        </tr>
                      );
                    })}

                    {remainingRooms.length > 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="bg-white text-right px-4 py-2"
                        >
                          <button
                            onClick={() => toggleGroup(roomName)}
                            className="underline room_option"
                          >
                            {isExpanded ? "Less Options" : "More Options"}
                          </button>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    if (activeTab === "Facilities") {
      return (
        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h5 className="text-lg font-semibold text-gray-800 mb-4">
            Hotel Facilities
          </h5>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 list-disc pl-6 text-gray-700 text-sm leading-relaxed">
            {facilities?.length > 0 ? (
              facilities.map((item, index) => (
                <li key={index} className="relative pl-1">
                  {item}
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">No facilities listed.</li>
            )}
          </ul>
        </div>
      );
    }

    if (activeTab === "Location") {
      return (
        <div className="group-collapse-expand">
          <div className="cards card-body">
            <iframe
              src={`https://www.google.com/maps?q=${longitude},${latitude}&z=15&output=embed`}
              width="100%"
              height={290}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div className="flex border-b hotel_tab mt-20 mb-2">
        {["Rooms", "Facilities", "Location"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-0 pr-10 mr-10 ${
              activeTab === tab ? "border-b-2 room_fac" : "text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4 bg-gray-50 border rounded-b">{renderContent()}</div>
      {showFacilityModal && (
        <div className="fixed inset-0 bg-black-40 flex items-center justify-center z-50">
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
    </>
  );
};

export default HotelData;
