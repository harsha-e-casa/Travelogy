import React, { useState } from "react";
import { Flex, Radio, Button } from "antd";
import { Divider, Select, Space } from "antd";
import PropTypes from "prop-types";

import "./TravellerForm.css";

import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const ageOptions = Array.from({ length: 18 }, (_, i) => ({
  value: i,
  label: i === 0 ? "<1 Yrs" : `${i} Yrs`,
}));

export const AppTravellerHotel = ({ roomsData, onClose }) => {
  const [rooms, setRooms] = useState(
    roomsData || [{ adults: 1, children: 0, childAges: [] }]
  );
  const updateAdult = (roomIndex, delta) => {
    const updated = [...rooms];
    const newAdultCount = updated[roomIndex].adults + delta;
    if (newAdultCount >= 1 && newAdultCount <= 10) {
      updated[roomIndex].adults = newAdultCount;
      setRooms(updated);
    }
  };
  const updateChildren = (roomIndex, delta) => {
    const updated = [...rooms];
    const newChildCount = updated[roomIndex].children + delta;
    if (newChildCount >= 0 && newChildCount <= 6) {
      updated[roomIndex].children = newChildCount;
      if (delta > 0) {
        updated[roomIndex].childAges.push(0);
      } else {
        updated[roomIndex].childAges.pop();
      }
      setRooms(updated);
    }
  };
  const updateChildAge = (roomIndex, childIndex, age) => {
    const updated = [...rooms];
    updated[roomIndex].childAges[childIndex] = age;
    setRooms(updated);
  };

  const handleRemoveRoom = (roomIndex) => {
    if (rooms.length === 1) return; // Prevent deleting last room
    const updated = [...rooms];
    updated.splice(roomIndex, 1);
    setRooms(updated);
  };

  const handleAddRoom = () => {
    if (rooms.length < 5) {
      setRooms([...rooms, { adults: 1, children: 0, childAges: [] }]);
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
    <div className="p-2 lg:w-2/6 md:w-2/5w-full absolute bg-white right-5 -mt-5 bx_shadow_dr1 z-50 max-h-full overflow-y-scroll overflow-x-hidden">
      {Array.isArray(rooms) &&
        rooms.map((room, roomIndex) => (
          <div key={roomIndex} className="border p-4 mb-4 rounded-lg relative">
            <div className="font-bold text-orange-600 text-lg mb-2">
              Room {roomIndex + 1}
              <span
                className="absolute top-2 right-3 text-black cursor-pointer"
                onClick={() => handleRemoveRoom(roomIndex)}
              >
                ✕
              </span>
            </div>

            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <div>{room.adults} Adults</div>
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
                    disabled={room.adults >= 10}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  {room.children} Children{" "}
                  {/* {room.children === 0 && (
                    <span className="text-gray-500 text-sm ml-2">
                      0 - 0 Years Old
                    </span>
                  )} */}
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
                    disabled={room.children >= 6}
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

      <div className="flex justify-between pt-4 border-t mt-4">
        <Button type="link" onClick={handleAddRoom}>
          + ADD ROOM
        </Button>
        <Button type="primary" onClick={handleSubmit}>
          DONE
        </Button>
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
