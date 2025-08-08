import React, { useState } from "react";
import { Flex, Radio, Button } from "antd";
import { Divider, Select, Space } from "antd";
import PropTypes from "prop-types";
import { message } from "antd";

import "./TravellerForm.css";

import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const ageOptions = Array.from({ length: 11 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1} Yrs`,
}));

export const TravellerForm = ({
  showTraveller,
  adult,
  clickMinus,
  clickPlus,
  clickMinusChildren,
  clickPlusChildren,
  countchildren,
  countinfant,
  clickMinusinfant,
  clickPlusinfant,
  travellerClass,
  handleChangeClass,
  opentrvForm,
  totalPassenderCount,
  specificStyle,
}) => {
  return (
    <>
      {showTraveller ? (
        <>
          <div
            className="lg:w-[35%] md:w-2/5w-full absolute h-auto bg-white right-0 -mt-5 bx_shadow_dr1 passenger-details"
            style={{ ...specificStyle }}
          >
            <div
              className="form_dr1 flex justify-between items-center"
              style={{ marginBottom: "5px" }}
            >
              <div className="text-base font-bold">Adults</div>
              <div className="flex custome_addBtn1">
                <div
                  className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                  onClick={adult > 1 ? clickMinus : null}
                  style={{ cursor: adult > 1 ? "pointer" : "not-allowed" }}
                >
                  <MinusOutlined
                    className="text-blue-700"
                    style={{ color: "#EB5B00" }}
                  />
                </div>
                <div
                  className="w-10 h-8 flex justify-center items-center prevent-select"
                  type="number"
                  id="number"
                >
                  {adult}
                </div>
                <div
                  className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                  onClick={adult < 9 ? clickPlus : null}
                  style={{
                    cursor:
                      adult < 9 && totalPassenderCount < 9
                        ? "pointer"
                        : "not-allowed",
                  }}
                >
                  <PlusOutlined
                    className="text-blue-700"
                    style={{ color: "#EB5B00" }}
                  />
                </div>
              </div>
            </div>
            <div
              className="form_dr1 flex justify-between items-center pb-[5px]"
              style={{ marginBottom: "5px" }}
            >
              <div className="text-base font-bold">Children</div>
              <div className="flex custome_addBtn1">
                <div
                  className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                  onClick={countchildren > 0 ? clickMinusChildren : null} // Conditionally enable onClick
                  style={{
                    cursor: countchildren > 0 ? "pointer" : "not-allowed",
                  }} // Change cursor on disabled
                >
                  <MinusOutlined
                    className="text-blue-700"
                    style={{ color: "#EB5B00" }}
                  />
                </div>
                <div
                  className="w-10 h-8 flex justify-center items-center prevent-select"
                  type="number"
                  id="number"
                >
                  {countchildren}
                </div>
                <div
                  className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                  onClick={countchildren < 9 ? clickPlusChildren : null} // Conditionally enable onClick
                  style={{
                    cursor:
                      countchildren < 9 && totalPassenderCount < 9
                        ? "pointer"
                        : "not-allowed",
                  }} // Change cursor on disabled
                >
                  <PlusOutlined
                    className="text-blue-700"
                    style={{ color: "#EB5B00" }}
                  />
                </div>
              </div>
            </div>
            {/* infants */}
            <div
              className="form_dr1 flex justify-between items-center pb-[5px]"
              style={{ marginBottom: "5px" }}
            >
              <div className="text-base font-bold">Infant</div>
              <div className="flex custome_addBtn1">
                <div
                  className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                  onClick={countinfant > 0 ? clickMinusinfant : null} // Conditionally enable onClick
                  style={{
                    cursor: countinfant > 0 ? "pointer" : "not-allowed",
                  }} // Change cursor on disabled
                >
                  <MinusOutlined
                    className="text-blue-700"
                    style={{ color: "#EB5B00" }}
                  />
                </div>
                <div
                  className="w-10 h-8 flex justify-center items-center prevent-select"
                  type="number"
                  id="number"
                >
                  {countinfant}
                </div>
                <div
                  className="value-button flex justify-center items-center w-10 h-8 bg-white p-2"
                  onClick={countinfant < adult ? clickPlusinfant : null} // Conditionally enable onClick
                  style={{
                    cursor: countinfant < adult ? "pointer" : "not-allowed",
                  }} // Change cursor on disabled
                >
                  <PlusOutlined
                    className="text-blue-700"
                    style={{ color: "#EB5B00" }}
                  />
                </div>
              </div>
            </div>

            <Flex vertical gap="small" className="mt-10">
              CHOOSE TRAVEL CLASS
              <div>
                <Radio.Group
                  value={travellerClass}
                  onChange={handleChangeClass}
                  buttonStyle="solid"
                  className="custom-radio flex flex-wrap gap-2"
                >
                  <Radio.Button value="b">Economy</Radio.Button>
                  <Radio.Button value="a">Premium Economy</Radio.Button>
                  <Radio.Button value="c">Business</Radio.Button>
                  <Radio.Button value="d">First</Radio.Button>
                </Radio.Group>

                {/* <Radio.Group
                  value={travellerClass} // Bind state to value
                  onChange={handleChangeClass}
                  defaultValue={travellerClass}
                  buttonStyle="solid"
                  className="flex flex-wrap"
                >
                  <Radio.Button className="w-50" value="b">
                    Economy
                  </Radio.Button>
                  <Radio.Button className="w-50" value="a">
                    Premium Economy
                  </Radio.Button>
                  <Radio.Button className="w-50" value="c">
                    Business
                  </Radio.Button>
                  <Radio.Button className="w-50" value="d">
                    First
                  </Radio.Button>
                </Radio.Group> */}
              </div>
            </Flex>

            <Button
              type="primary"
              onClick={opentrvForm}
              block
              className="mt-15 apply-btn"
            >
              APPLY
            </Button>
          </div>
        </>
      ) : null}
    </>
  );
};
// export const AppTravellerHotel = ({ roomsData, onClose }) => {
//   const [rooms, setRooms] = useState(
//     roomsData || [{ adults: 1, children: 0, childAges: [] }]
//   );
//   const updateAdult = (roomIndex, delta) => {
//     setRooms((prev) => {
//       const updated = [...prev];
//       const room = updated[roomIndex];
//       const newAdultCount = room.adults + delta;

//       if (newAdultCount < 1 || newAdultCount > 9) return updated;

//       const totalPassengers = newAdultCount + room.children;
//       if (totalPassengers > 10) {
//         message.warning("Maximum 10 passengers allowed per room.");
//         return updated;
//       }

//       updated[roomIndex] = {
//         ...room,
//         adults: newAdultCount,
//       };
//       return updated;
//     });
//   };

//   const updateChildren = (roomIndex, delta) => {
//     setRooms((prev) => {
//       const updated = [...prev];
//       const room = updated[roomIndex];
//       const newChildCount = room.children + delta;

//       if (newChildCount < 0 || newChildCount > 3) return updated;

//       const totalPassengers = room.adults + newChildCount;
//       if (totalPassengers > 10) {
//         message.warning("Maximum 10 passengers allowed per room.");
//         return updated;
//       }

//       const newChildAges =
//         delta > 0 ? [...room.childAges, "1"] : room.childAges.slice(0, -1);

//       updated[roomIndex] = {
//         ...room,
//         children: newChildCount,
//         childAges: newChildAges,
//       };
//       return updated;
//     });
//   };

//   const updateChildAge = (roomIndex, childIndex, age) => {
//     const updated = [...rooms];
//     updated[roomIndex].childAges[childIndex] = age;
//     setRooms(updated);
//   };
//   // const updateAdult = (roomIndex, delta) => {
//   //   const updated = [...rooms];
//   //   const newAdultCount = updated[roomIndex].adults + delta;
//   //   if (newAdultCount >= 1 && newAdultCount <= 9) {
//   //     updated[roomIndex].adults = newAdultCount;
//   //     setRooms(updated);
//   //   }
//   // };
//   // const updateChildren = (roomIndex, delta) => {
//   //   const updated = [...rooms];
//   //   const newChildCount = updated[roomIndex].children + delta;
//   //   if (newChildCount >= 0 && newChildCount <= 3) {
//   //     updated[roomIndex].children = newChildCount;
//   //     if (delta > 0) {
//   //       updated[roomIndex].childAges.push(1);
//   //     } else {
//   //       updated[roomIndex].childAges.pop();
//   //     }
//   //     setRooms(updated);
//   //   }
//   // };
//   // const total = adults + children;
//   // if (total >= 10) {
//   //   message.warning("Maximum 10 passengers allowed per room.");
//   //   return;
//   // }

//   const handleRemoveRoom = (roomIndex) => {
//     if (rooms.length === 1) return;
//     const updated = [...rooms];
//     updated.splice(roomIndex, 1);
//     setRooms(updated);
//   };

//   const handleAddRoom = () => {
//     if (rooms.length < 5) {
//       setRooms([...rooms, { adults: 1, children: 0, childAges: [] }]);
//     } else {
//       message.warning("Maximum of 5 rooms allowed.");
//     }
//   };

//   const handleSubmit = () => {
//     if (typeof onClose === "function") {
//       onClose(rooms);
//     } else {
//       console.warn("onClose is not a function");
//     }
//   };

//   return (
//     <div className="relative w-1-6 bg-white right-5 -mt-5 bx_shadow_dr1 z-50 float-right h-80vh rounded-lg overflow-hidden">
//       <div className="h-calc-80-64 overflow-y-auto px-2 pt-2 pb-4">
//         {Array.isArray(rooms) &&
//           rooms.map((room, roomIndex) => (
//             <div
//               key={roomIndex}
//               className="border px-2 mb-2 rounded-lg relative"
//             >
//               <div className="font-bold primary-text-color text-md mb-2 text-left">
//                 Room {roomIndex + 1}
//                 <span
//                   className="absolute top-2 right-3 text-black cursor-pointer"
//                   onClick={() => handleRemoveRoom(roomIndex)}
//                 >
//                   x
//                 </span>
//               </div>

//               <div className="mb-3">
//                 <div className="flex justify-between items-center mb-2">
//                   <div className="font-semibold">{room.adults} - Adults</div>
//                   <div className="flex gap-2">
//                     <Button
//                       size="small"
//                       onClick={() => updateAdult(roomIndex, -1)}
//                       disabled={room.adults <= 1}
//                     >
//                       -
//                     </Button>
//                     <Button
//                       size="small"
//                       onClick={() => updateAdult(roomIndex, 1)}
//                       disabled={room.adults >= 9}
//                     >
//                       +
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <div className="font-semibold">
//                     {room.children} - Children
//                     <span className="text-gray-500 text-xs ml-2">
//                       0 - 11 Years Old
//                     </span>
//                   </div>
//                   <div className="flex gap-2">
//                     <Button
//                       size="small"
//                       onClick={() => updateChildren(roomIndex, -1)}
//                       disabled={room.children <= 0}
//                     >
//                       -
//                     </Button>
//                     <Button
//                       size="small"
//                       onClick={() => updateChildren(roomIndex, 1)}
//                       disabled={room.children >= 3}
//                     >
//                       +
//                     </Button>
//                   </div>
//                 </div>
//               </div>

//               {room.children > 0 && (
//                 <div className="mt-3">
//                   <div className="text-gray-600 text-sm mb-1">Age of Child</div>
//                   {Array.from({ length: room.children }).map(
//                     (_, childIndex) => (
//                       <Select
//                         key={childIndex}
//                         value={room.childAges[childIndex] ?? ""}
//                         onChange={(value) =>
//                           updateChildAge(roomIndex, childIndex, value)
//                         }
//                         style={{ width: 120, marginBottom: 8, padding: 3 }}
//                         options={ageOptions}
//                         placeholder="Select Age"
//                       />
//                     )
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//       </div>

//       {/* Sticky Footer */}
//       <div className="absolute bottom-0 left-0 w-full bg-white border-t px-4 py-3 flex justify-between z-10">
//         <button
//           className="primary-text-color font-semibold"
//           type="button"
//           onClick={handleAddRoom}
//         >
//           + Add Room
//         </button>
//         <button
//           className="primary-text-color font-semibold"
//           type="button"
//           onClick={handleSubmit}
//         >
//           Done
//         </button>
//       </div>
//     </div>
//   );
// };
// AppTravellerHotel.propTypes = {
//   roomsData: PropTypes.arrayOf(
//     PropTypes.shape({
//       adults: PropTypes.number.isRequired,
//       children: PropTypes.number.isRequired,
//       childAges: PropTypes.arrayOf(PropTypes.number).isRequired,
//     })
//   ),
//   onClose: PropTypes.func.isRequired,
// };

// AppTravellerHotel.defaultProps = {
//   roomsData: [{ adults: 1, children: 0, childAges: [] }],
// };

export const AppTravellerHotel = ({ roomsData, onClose }) => {
  const [rooms, setRooms] = useState(
    roomsData || [{ adults: 1, children: 0, childAges: [] }]
  );
  const updateAdult = (roomIndex, delta) => {
    setRooms((prev) => {
      const updated = [...prev];
      const room = updated[roomIndex];
      const newAdultCount = room.adults + delta;

      if (newAdultCount < 1 || newAdultCount > 9) return updated;

      const totalPassengers = newAdultCount + room.children;
      if (totalPassengers > 10) {
        message.warning("Maximum 10 passengers allowed per room.");
        updated[roomIndex].warningShown = true;
        return updated;
      }

      updated[roomIndex] = {
        ...room,
        adults: newAdultCount,
      };
      return updated;
    });
  };

  const updateChildren = (roomIndex, delta) => {
    setRooms((prev) => {
      const updated = [...prev];
      const room = updated[roomIndex];
      const newChildCount = room.children + delta;

      if (newChildCount < 0 || newChildCount > 3) return updated;

      const totalPassengers = room.adults + newChildCount;
      if (totalPassengers > 10) {
        message.warning("Maximum 10 passengers allowed per room.");
        updated[roomIndex].warningShown = true;
        return updated;
      }

      const newChildAges =
        delta > 0 ? [...room.childAges, "1"] : room.childAges.slice(0, -1);

      updated[roomIndex] = {
        ...room,
        children: newChildCount,
        childAges: newChildAges,
      };
      return updated;
    });
  };

  const updateChildAge = (roomIndex, childIndex, age) => {
    const updated = [...rooms];
    updated[roomIndex].childAges[childIndex] = age;
    setRooms(updated);
  };
  // const updateAdult = (roomIndex, delta) => {
  //   const updated = [...rooms];
  //   const newAdultCount = updated[roomIndex].adults + delta;
  //   if (newAdultCount >= 1 && newAdultCount <= 9) {
  //     updated[roomIndex].adults = newAdultCount;
  //     setRooms(updated);
  //   }
  // };
  // const updateChildren = (roomIndex, delta) => {
  //   const updated = [...rooms];
  //   const newChildCount = updated[roomIndex].children + delta;
  //   if (newChildCount >= 0 && newChildCount <= 3) {
  //     updated[roomIndex].children = newChildCount;
  //     if (delta > 0) {
  //       updated[roomIndex].childAges.push(1);
  //     } else {
  //       updated[roomIndex].childAges.pop();
  //     }
  //     setRooms(updated);
  //   }
  // };
  // const total = adults + children;
  // if (total >= 10) {
  //   message.warning("Maximum 10 passengers allowed per room.");
  //   return;
  // }

  const handleRemoveRoom = (roomIndex) => {
    if (rooms.length === 1) return;
    const updated = [...rooms];
    updated.splice(roomIndex, 1);
    setRooms(updated);
  };

  const handleAddRoom = () => {
    if (rooms.length < 5) {
      setRooms([...rooms, { adults: 1, children: 0, childAges: [] }]);
    } else {
      message.warning("Maximum of 5 rooms allowed.");
    }
  };

  const handleSubmit = () => {
    if (typeof onClose === "function") {
      onClose(rooms);
    } else {
      console.warn("onClose is not a function");
    }
  };

  return (
    <div className="p-2 w-1-6 md:w-2/5w-full absolute bg-white right-5 -mt-5 bx_shadow_dr1 z-50 max-h-full overflow-y-scroll overflow-x-hidden">
      {Array.isArray(rooms) &&
        rooms.map((room, roomIndex) => (
          <div key={roomIndex} className="border px-2 mb-2 rounded-lg relative">
            <div className="font-bold primary-text-color text-md mb-2 text-left">
              Room {roomIndex + 1}
              <span
                className="absolute top-2 right-3 text-black cursor-pointer"
                onClick={() => handleRemoveRoom(roomIndex)}
              >
                x
              </span>
            </div>

            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold">{room.adults} - Adults</div>
                <div className="flex gap-2">
                  <Button
                    size="small"
                    onClick={() => updateAdult(roomIndex, -1)}
                    disabled={room.adults <= 1}
                  >
                    -
                  </Button>
                  <Button
                    size="small"
                    onClick={() => updateAdult(roomIndex, 1)}
                    disabled={room.adults >= 9}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="font-semibold">
                  {room.children} - Children
                  <span className="text-gray-500 text-xs ml-2">
                    0 - 11 Years Old
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="small"
                    onClick={() => updateChildren(roomIndex, -1)}
                    disabled={room.children <= 0}
                  >
                    -
                  </Button>
                  <Button
                    size="small"
                    onClick={() => updateChildren(roomIndex, 1)}
                    disabled={room.children >= 3}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            {room.children > 0 && (
              <div className="mt-3">
                <div className="text-gray-600 text-sm mb-1">Age of Child</div>
                {Array.from({ length: room.children }).map((_, childIndex) => (
                  <Select
                    key={childIndex}
                    value={room.childAges[childIndex] ?? ""}
                    onChange={(value) =>
                      updateChildAge(roomIndex, childIndex, value)
                    }
                    style={{ width: 120, marginBottom: 8, padding: 3 }}
                    options={ageOptions}
                    placeholder="Select Age"
                  />
                ))}
              </div>
            )}
          </div>
        ))}

      <div className="sticky bottom-0 bg-white z-10 pt-3 border-t">
        <div className="flex justify-between items-center">
          <button
            className="primary-text-color font-semibold"
            type="link"
            onClick={handleAddRoom}
          >
            + Add Room
          </button>
          <button
            className="primary-text-color font-semibold"
            type="primary"
            onClick={handleSubmit}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
AppTravellerHotel.propTypes = {
  roomsData: PropTypes.arrayOf(
    PropTypes.shape({
      adults: PropTypes.number.isRequired,
      children: PropTypes.number.isRequired,
      childAges: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ),
  onClose: PropTypes.func.isRequired,
};

AppTravellerHotel.defaultProps = {
  roomsData: [{ adults: 1, children: 0, childAges: [] }],
};
