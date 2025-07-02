import React, { useState } from "react";

const HotelData = ({ facilities, longitude, latitude, fetchHotelData }) => {
  const [activeTab, setActiveTab] = useState("Rooms");

  // const renderContent = () => {
  //   switch (activeTab) {
  //     case "Rooms":
  //       return (
  //         <table className="w-full text-sm text-left text-gray-700 border border-gray-300">
  //           <thead className="bg-gray-100 text-gray-800 font-semibold">
  //             <tr>
  //               <th className="px-4 py-2 border-b">Room Name</th>
  //               <th className="px-4 py-2 border-b">Meal Basis</th>
  //               <th className="px-4 py-2 border-b">Room Type</th>
  //               <th className="px-4 py-2 border-b">Cancellation</th>
  //               <th className="px-4 py-2 border-b text-right">Price</th>
  //             </tr>
  //           </thead>
  //           <tbody className="divide-y">
  //             {fetchHotelData?.map((room, index) => {
  //               const price = room?.tfcs?.TF ? room.tfcs.TF.toFixed(2) : "0.00";
  //               const isRefundable = room?.cnp?.inra === false;
  //               return (
  //                 <tr key={index} className="hover:bg-gray-50">
  //                   <td className="px-4 py-3">{room.srn}</td>
  //                   <td className="px-4 py-3">{room.mb}</td>
  //                   <td className="px-4 py-3">
  //                     <div>{room.rt}</div>
  //                     <div className="text-orange-600 text-xs underline cursor-pointer">
  //                       Room Facilities
  //                     </div>
  //                   </td>
  //                   <td className="px-4 py-3">
  //                     {isRefundable
  //                       ? "Free Cancellation"
  //                       : "No Free Cancellation / Non-Refundable"}
  //                   </td>
  //                   <td className="px-4 py-3 text-right">
  //                     <div className="text-lg font-bold text-gray-900">
  //                       ₹{price}
  //                     </div>
  //                     <div className="text-xs text-gray-500 mb-1">
  //                       for {room.pis?.length || 1} Night(s) for {room.adt}{" "}
  //                       adult(s)
  //                       {room.chd ? ` & ${room.chd} child` : ""}
  //                     </div>
  //                     <button className="btn btn-gray">BOOK NOW</button>
  //                   </td>
  //                 </tr>
  //               );
  //             })}
  //           </tbody>
  //         </table>
  //       );

  //     case "Facilities":
  //       return (
  //         <div className="mt-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
  //           <h5 className="text-lg font-semibold text-gray-800 mb-4">
  //             Hotel Facilities
  //           </h5>
  //           <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 list-disc pl-6 text-gray-700 text-sm leading-relaxed">
  //             {facilities?.length > 0 ? (
  //               facilities.map((item, index) => (
  //                 <li key={index} className="relative pl-1">
  //                   {item}
  //                 </li>
  //               ))
  //             ) : (
  //               <li className="text-gray-500 italic">No facilities listed.</li>
  //             )}
  //           </ul>
  //         </div>
  //       );
  //     case "Location":
  //       return (
  //         <div className="group-collapse-expand">
  //           <div className="cards card-body">
  //             <iframe
  //               src={`https://www.google.com/maps?q=${longitude},${latitude}&z=15&output=embed`}
  //               width="100%"
  //               height={290}
  //               style={{ border: 0 }}
  //               allowFullScreen
  //               loading="lazy"
  //             />
  //           </div>
  //         </div>
  //       );
  //     default:
  //       return null;
  //   }
  // };
  const [expandedGroup, setExpandedGroup] = useState({});

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
                            <div className="text-[#f58220] text-xs underline cursor-pointer">
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
                            <button className="bg-[#f58220] text-white text-xs px-3 py-1 rounded">
                              BOOK NOW
                            </button>
                            <div className="text-[#f58220] text-xs mt-1">
                              Add to Quote
                            </div>
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
                            className="text-sm text-gray-700 underline"
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
      <div className="flex border-b">
        {["Rooms", "Facilities", "Location"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-0 pr-10 mr-10 font-semibold ${
              activeTab === tab
                ? "border-b-2 border-red-500 text-red-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4 bg-gray-50 border rounded-b">{renderContent()}</div>
    </>
  );
};

export default HotelData;
