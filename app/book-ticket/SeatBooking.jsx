import dayjs from "dayjs";
import React, { useEffect, useState, useContext } from "react";
import { postData } from "@/services/NetworkAdapter";
import { AppContext } from "@/util/AppContext";

const SeatBooking = ({ numAdults, numChild, apiData }) => {
  const { getCookie, setCookie } = useContext(AppContext);
  const [flightSeat, setFlightSeat] = useState(null);
  const [selectedPassengerIndex, setSelectedPassengerIndex] = useState(0); // default: Adult - 1
  // const [seatSelections, setSeatSelections] = useState([]); // Array of objects like { seatNo: "1A", cost: 500 }
  const [seatSelections, setSeatSelections] = useState({});
  const [selectedAmounts, setSelectedAmounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seatNo, setSeatNo] = useState({});
  // const prevIdRef = useRef();

  useEffect(() => {
    if (flightSeat) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [flightSeat]);

  const handleViewSeat = async ({ id, seg }) => {
    // prevIdRef.current = id;
    try {
      setLoading(true);

      let reqData = {
        action: "seatMap",
        requestData: {
          bookingId: apiData?.bookingId,
        },
      };
      const result = await postData("travelogy/one-way/fetch-data", reqData);

      if (result?.tripSeatMap?.tripSeat?.[id]) {
        setFlightSeat({ seat: result.tripSeatMap.tripSeat[id], seg: seg });
      } else {
        alert("No seat data found");
      }
    } catch (error) {
      console.log("SeatBooking error = ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = () => {
    console.log("handleProceed functionality == ");

    calculateAndStoreTotalAmount();

    showSeatNo();

    setFlightSeat(null);
  };

  const showSeatNo = () => {
    let setData = {};

    for (let i = 1; i <= 9; i++) {
      let cookieData = getCookie(`adult_seat_map-${i}`);
      if (!cookieData) continue; // skip if no cookie for this adult

      let adultSeatArray = JSON.parse(cookieData);

      adultSeatArray.forEach((item) => {
        const { seat, flightId } = item;

        if (!setData[flightId]) {
          setData[flightId] = [];
        }

        setData[flightId].push({ [`adult-${i}`]: seat });
      });
    }

    for (let i = 1; i <= 9; i++) {
      let cookieData = getCookie(`child_seat_map-${i}`);
      if (!cookieData) continue; // skip if no cookie for this child

      let childSeatArray = JSON.parse(cookieData);

      childSeatArray.forEach((item) => {
        const { seat, flightId } = item;

        if (!setData[flightId]) {
          setData[flightId] = [];
        }

        setData[flightId].push({ [`child-${i}`]: seat });
      });
    }

    console.log("setData == ", setData);
    setSeatNo(setData);
  };

  const calculateAndStoreTotalAmount = () => {
    let totalAmount = 0;

    const collectKeys = [
      ...Array.from({ length: 9 }, (_, i) => `adult_seat_map-${i + 1}`),
      ...Array.from({ length: 9 }, (_, i) => `child_seat_map-${i + 1}`),
    ];

    collectKeys.forEach((key) => {
      const cookieData = getCookie(key);
      if (cookieData) {
        try {
          const parsedArray = JSON.parse(cookieData); // Expecting an array
          parsedArray.forEach((item) => {
            if (item?.amount) {
              totalAmount += parseInt(item.amount);
            }
          });
        } catch (err) {
          console.error(`Error parsing cookie for key ${key}:`, err);
        }
      }
    });

    // Set final total into seatSsr_amount
    setCookie("seatSsr_amount", parseInt(totalAmount, 10).toString());
    console.log("Total amount calculated and stored:", totalAmount);
  };

  const handleSeatSelect = (seatNo, cost) => {
    console.log("seat no and amount =", seatNo, cost);
    const flightId = flightSeat?.seg?.id || null;

    // const updatedSelections = [...seatSelections];
    // updatedSelections[selectedPassengerIndex] = { seatNo, cost };
    // setSeatSelections(updatedSelections);

    const updatedSelections = { ...seatSelections };
    if (!updatedSelections[flightId]) {
      updatedSelections[flightId] = [];
    }
    updatedSelections[flightId][selectedPassengerIndex] = {
      seatNo,
      cost,
      flightId,
    };
    setSeatSelections(updatedSelections);

    const passengerKey =
      selectedPassengerIndex < numAdults
        ? `adult_seat_map-${selectedPassengerIndex + 1}`
        : `child_seat_map-${selectedPassengerIndex - numAdults + 1}`;

    // Prepare new seat entry
    const newSeatData = {
      seat: seatNo,
      amount: String(cost),
      flightId: String(flightId),
    };

    // Check existing cookie
    let existingData = getCookie(passengerKey);
    let updatedData = [];

    if (existingData) {
      try {
        updatedData = JSON.parse(existingData);
        let foundIndex = updatedData.findIndex(
          (entry) => entry.flightId === newSeatData.flightId
        );

        if (foundIndex !== -1) {
          // FlightId already exists => update seat & amount
          updatedData[foundIndex].seat = newSeatData.seat;
          updatedData[foundIndex].amount = newSeatData.amount;
        } else {
          // FlightId not present => add new entry
          updatedData.push(newSeatData);
        }
      } catch (err) {
        console.error("Invalid cookie data, resetting:", err);
        updatedData = [newSeatData];
      }
    } else {
      updatedData = [newSeatData];
    }

    setCookie(passengerKey, JSON.stringify(updatedData));
    console.log("Cookie updated:", passengerKey, updatedData);
  };

  // const renderSeatMap = (sInfo) => {
  //   console.log("renderSeatMaprenderSeatMaprenderSeatMap == ",sInfo);
  //   const maxRow = Math.max(...sInfo.map((seat) => seat.seatPosition.row));
  //   const maxCol = Math.max(...sInfo.map((seat) => seat.seatPosition.column));
  //   // const currentSelectedSeat = seatSelections[selectedPassengerIndex]?.seatNo;
  //   const currentSelectedSeat = seatSelections[flightSeat?.seg?.id]?.[selectedPassengerIndex]?.seatNo || null;

  //   // Get seats already selected by other passengers
  //   const alreadySelectedSeats = (seatSelections[flightSeat?.seg?.id] || [])
  //     .filter((sel, idx) => idx !== selectedPassengerIndex)
  //     .map((sel) => sel?.seatNo)
  //     .filter(Boolean); // filter out undefined/null

  //   const seatGrid = Array.from({ length: maxRow }, (_, rowIndex) => {
  //     return (
  //       <div key={rowIndex} className="flex gap-2 mb-2">
  //         {Array.from({ length: maxCol }, (_, colIndex) => {
  //           const seat = sInfo.find(
  //             (s) =>
  //               s.seatPosition.row === rowIndex + 1 &&
  //               s.seatPosition.column === colIndex + 1
  //           );

  //           if (!seat) {
  //             return <div key={colIndex} className="w-10 h-10" />;
  //           }

  //           const booked = seat.isBooked;
  //           const aisle = seat.isAisle;
  //           const legroom = seat.isLegroom;
  //           const isSelected = seat.code === currentSelectedSeat;
  //           const matchesFilter =
  //             selectedAmounts.length === 0 ||
  //             selectedAmounts.includes(seat.amount);
  //           const isSeatTakenByOthers = alreadySelectedSeats.includes(
  //             seat.code
  //           );

  //           const isSelectable =
  //             !booked && matchesFilter && !isSeatTakenByOthers;

  //           return (
  //             <div
  //               key={colIndex}
  //               title={seat.code}
  //               onClick={() => {
  //                 if (isSelectable) {
  //                   handleSeatSelect(seat.code, seat.amount || 0);
  //                 }
  //               }}
  //               className={`w-10 h-10 flex items-center justify-center text-sm font-medium border transition-all
  //               ${booked ? "bg-gray-400 text-white cursor-not-allowed" : ""}
  //               ${isSelectable && isSelected ? "bg-green-500" : ""}
  //               ${
  //                 isSelectable && !isSelected
  //                   ? "bg-green-200 hover:bg-green-300 cursor-pointer"
  //                   : ""
  //               }
  //               ${
  //                 !matchesFilter || isSeatTakenByOthers
  //                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
  //                   : ""
  //               }
  //               ${aisle ? "border-blue-500" : ""}
  //               ${legroom ? "rounded-full" : "rounded"}`}
  //             >
  //               {isSelected ? (
  //                 <span className="text-white font-bold text-lg">✓</span>
  //               ) : (
  //                 seat.code
  //               )}
  //             </div>
  //           );
  //         })}
  //       </div>
  //     );
  //   });

  //   return <div className="p-4">{seatGrid}</div>;
  // };

  // Function to dynamically generate color based on the amount value
  const getSeatColorClass = (amount, isSelected) => {
    const hue = amount % 360; // Ensure a value within 0-360 range
    const saturation = isSelected ? 10 : 50; // Normal saturation for selected, low saturation for unselected
    const lightness = isSelected ? 90 : 25; // Low lightness for selected, very high lightness for unselected

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`; // Apply HSL color
  };

  const renderSeatMap = (sInfo) => {
    const maxRow = Math.max(...sInfo.map((seat) => seat.seatPosition.row));
    const maxCol = Math.max(...sInfo.map((seat) => seat.seatPosition.column));

    const currentSelectedSeat =
      seatSelections[flightSeat?.seg?.id]?.[selectedPassengerIndex]?.seatNo ||
      null;

    // Get seats already selected by other passengers
    const alreadySelectedSeats = (seatSelections[flightSeat?.seg?.id] || [])
      .filter((sel, idx) => idx !== selectedPassengerIndex)
      .map((sel) => sel?.seatNo)
      .filter(Boolean); // filter out undefined/null

    const seatGrid = Array.from({ length: maxRow }, (_, rowIndex) => {
      return (
        <div key={rowIndex} className="flex gap-2 mb-2">
          {Array.from({ length: maxCol }, (_, colIndex) => {
            const seat = sInfo.find(
              (s) =>
                s.seatPosition.row === rowIndex + 1 &&
                s.seatPosition.column === colIndex + 1
            );

            if (!seat) {
              return <div key={colIndex} className="w-10 h-10" />;
            }

            const booked = seat.isBooked;
            const aisle = seat.isAisle;
            const legroom = seat.isLegroom;
            const isSelected = seat.code === currentSelectedSeat;
            const matchesFilter =
              selectedAmounts.length === 0 ||
              selectedAmounts.includes(seat.amount);
            const isSeatTakenByOthers = alreadySelectedSeats.includes(
              seat.code
            );

            const isSelectable =
              !booked && matchesFilter && !isSeatTakenByOthers;

            // Get the dynamic color for the seat based on the amount
            const seatColor = getSeatColorClass(seat.amount, isSelected); // Get the color based on the amount

            // If booked, grey out the seat with no other colors
            const seatStyle = booked
              ? "bg-gray-400 text-gray-300 cursor-not-allowed"
              : isSelectable && isSelected
              ? "bg-green-500"
              : isSelectable
              ? `cursor-pointer text-white` // Apply dynamic color for selectable
              : "bg-gray-300 text-gray-500 cursor-not-allowed";

            return (
              <div
                key={colIndex}
                title={seat.code}
                onClick={() => {
                  if (isSelectable) {
                    handleSeatSelect(seat.code, seat.amount || 0);
                  }
                }}
                className={`w-10 h-10 flex items-center justify-center text-sm font-medium border transition-all
                ${seatStyle} 
                ${aisle ? "border-blue-500" : ""}
                ${legroom ? "rounded-full" : "rounded"}`}
                style={{ backgroundColor: booked ? undefined : seatColor }} // Apply the dynamic color using inline style
              >
                {isSelected ? (
                  <span className="text-white font-bold text-lg">✓</span>
                ) : (
                  seat.code
                )}
              </div>
            );
          })}
        </div>
      );
    });

    return <div className="p-4">{seatGrid}</div>;
  };

  console.log("seatSelectionsseatSelections ============= ", seatSelections);

  return (
    <>
      {apiData?.tripInfos?.map((trip, idx) => {
        const segments = trip?.sI || [];
        return (
          <div key={idx} className="row mt-20">
            <div className="box-content-tickets-detail">
              {segments.map((seg) => {
                const dep = dayjs(seg.dt);
                return (
                  <React.Fragment key={seg.id}>
                    <div className="flex justify-between items-center p-4 border-b">
                      <div>
                        <p>
                          {seg.da.city} ({seg.da.code}) - {seg.aa.city} (
                          {seg.aa.code})
                        </p>
                        <p>{dep.format("DD MMM YYYY")}</p>
                      </div>

                      {/* change data based on seatNo use seg.id */}
                      <div className="mt-1 text-sm text-gray-700 flex flex-col space-y-1">
                        {(seatNo?.[seg.id] || []).map((item, index) => {
                          const key = Object.keys(item)[0]; // like 'adult-1' or 'child-1'
                          const seatNo = item[key];

                          return (
                            <div key={index}>
                              {key}: {seatNo}
                            </div>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => handleViewSeat({ id: seg.id, seg })}
                        className="border-2 border-black px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-black"
                      >
                        View Seats
                      </button>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        );
      })}

      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="font-semibold text-lg mb-2">Loading seat map...</p>
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        </div>
      )}

      {/* Seat Map Modal */}
      {flightSeat && (
        <div
          className="fixed top-0 left-0 right-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
          style={{ height: "100%" }}
          onClick={() => setFlightSeat(null)}
        >
          <div
            className="bg-white max-w-3xl overflow-y-auto p-6 rounded-lg relative"
            style={{ maxHeight: "80vh", width: "60%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-700"
              onClick={() => setFlightSeat(null)}
            >
              ❌
            </button>
            <h2 className="text-lg font-bold mb-4">Select Seats</h2>
            <div className="row">
              <div className="col-lg-5">
                {/* flight details */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <div className="flex item-center">
                    <img
                      style={{ width: "35px", height: "35px", margin: "5px" }}
                      src={`/assets/imgs/airlines/${flightSeat?.seg[
                        "fD"
                      ].aI.code.toLowerCase()}.png`}
                      alt=""
                    />
                    <div>
                      <p>{flightSeat?.seg["fD"].aI.name}</p>
                      <p className="text-small">
                        {flightSeat?.seg.fD.aI.code}-{flightSeat?.seg.fD.fN}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p>
                      {flightSeat?.seg.da.code} - {flightSeat?.seg.aa.code}
                    </p>
                  </div>
                </div>

                {/* Choose Seat */}
                <div>
                  <table className="w-full border-collapse mb-20">
                    <thead style={{ borderBottom: "1px solid grey" }}>
                      <tr>
                        <th className="px-2 py-2 text-left text-gray-600 border-b border-gray-300">
                          Passenger
                        </th>
                        <th className="px-2 py-2 text-left text-gray-600 border-b border-gray-300">
                          Seat No
                        </th>
                        <th className="px-2 py-2 text-left text-gray-600 border-b border-gray-300">
                          Cost
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(numAdults)].map((_, index) => (
                        <tr
                          key={`adult-${index}`}
                          className={
                            selectedPassengerIndex === index
                              ? "bg-blue-100 cursor-pointer"
                              : "cursor-pointer"
                          }
                          onClick={() => setSelectedPassengerIndex(index)}
                        >
                          <td className="px-2 py-2 text-gray-700">
                            Adult - {index + 1}
                          </td>
                          <td className="px-2 py-2 text-gray-700">
                            {seatSelections[flightSeat?.seg?.id]?.[index]
                              ?.seatNo || "—"}
                          </td>
                          <td className="px-2 py-2 text-gray-700">
                            {seatSelections[flightSeat?.seg?.id]?.[index]
                              ?.cost ||
                            seatSelections[flightSeat?.seg?.id]?.[index]
                              ?.cost == "0"
                              ? `₹ ${
                                  seatSelections[flightSeat?.seg?.id]?.[index]
                                    ?.cost
                                }`
                              : "—"}
                          </td>
                        </tr>
                      ))}
                      {numChild !== null &&
                        [...Array(numChild)].map((_, index) => {
                          const passengerIndex = numAdults + index;
                          return (
                            <tr
                              key={`child-${index}`}
                              className={
                                selectedPassengerIndex === passengerIndex
                                  ? "bg-blue-100 cursor-pointer"
                                  : "cursor-pointer"
                              }
                              onClick={() =>
                                setSelectedPassengerIndex(passengerIndex)
                              }
                            >
                              <td className="px-2 py-2 text-gray-700">
                                Child - {index + 1}
                              </td>
                              <td className="px-2 py-2 text-gray-700">
                                {seatSelections[flightSeat?.seg?.id]?.[
                                  passengerIndex
                                ]?.seatNo || "—"}
                              </td>
                              <td className="px-2 py-2 text-gray-700">
                                {seatSelections[flightSeat?.seg?.id]?.[
                                  passengerIndex
                                ]?.cost ||
                                seatSelections[flightSeat?.seg?.id]?.[
                                  passengerIndex
                                ]?.cost == "0"
                                  ? `₹${
                                      seatSelections[flightSeat?.seg?.id]?.[
                                        passengerIndex
                                      ].cost
                                    }`
                                  : "—"}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <div className="flex justify-end py-2 border-t border-gray-300">
                    <span className="font-semibold text-gray-800">
                      Total: ₹{" "}
                      {(seatSelections[flightSeat?.seg?.id] || []).reduce(
                        (total, seat) =>
                          total + (seat?.cost ? parseInt(seat.cost) : 0),
                        0
                      )}
                    </span>
                  </div>
                </div>

                <div className="w-full flex justify-center mt-2">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow"
                    onClick={handleProceed}
                  >
                    Proceed
                  </button>
                </div>

                {/* seat ledend */}
                <div>
                  <p style={{ paddingTop: "20px" }}>Seat Status</p>
                  <div
                    className="flex space-x-4 items-center"
                    style={{ paddingTop: "10px" }}
                  >
                    {/* Selected */}
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <span className="text-gray-700 text-sm">Selected</span>
                    </div>

                    {/* Booked */}
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-gray-400 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">×</span>
                      </div>
                      <span className="text-gray-700 text-sm">Booked</span>
                    </div>
                  </div>
                </div>

                {/* seat fee */}
                {/* <div>
                  <p className="font-semibold mb-2">Seat Fees</p>
                  <div>
                    {(() => {
                      const feeMap = {};
                      (flightSeat?.seat?.sInfo || []).forEach((seat) => {
                        if (!seat.isBooked) {
                          const cost = seat.amount || 0;
                          feeMap[cost] = (feeMap[cost] || 0) + 1;
                        }
                      });

                      const sortedFees = Object.entries(feeMap).sort(
                        (a, b) => a[0] - b[0]
                      );

                      const toggleAmount = (amount) => {
                        setSelectedAmounts((prev) =>
                          prev.includes(amount)
                            ? prev.filter((a) => a !== amount)
                            : [...prev, amount]
                        );
                      };

                      return sortedFees.map(([amount, count]) => (
                        <div
                          key={amount}
                          className="flex items-center justify-between py-1"
                          style={{ maxHeight: "25px" }}
                        >
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={selectedAmounts.includes(Number(amount))}
                              onChange={() => toggleAmount(Number(amount))}
                              style={{ height: "15px" }}
                            />
                            <span>₹{amount}</span>
                          </label>
                          <span className="text-sm text-gray-600">
                            {count} seat{count > 1 ? "s" : ""}
                          </span>
                        </div>
                      ));
                    })()}
                  </div>
                </div> */}
                <div>
                  <p className="font-semibold mb-2">Seat Fees</p>
                  <div>
                    {(() => {
                      const feeMap = {};
                      (flightSeat?.seat?.sInfo || []).forEach((seat) => {
                        if (!seat.isBooked) {
                          const cost = seat.amount || 0;
                          feeMap[cost] = (feeMap[cost] || 0) + 1;
                        }
                      });

                      const sortedFees = Object.entries(feeMap).sort(
                        (a, b) => a[0] - b[0]
                      );

                      const toggleAmount = (amount) => {
                        setSelectedAmounts((prev) =>
                          prev.includes(amount)
                            ? prev.filter((a) => a !== amount)
                            : [...prev, amount]
                        );
                      };

                      return sortedFees.map(([amount, count]) => {
                        const seatColor = getSeatColorClass(
                          Number(amount),
                          false
                        ); // Use the getSeatColorClass function for background color

                        return (
                          <div
                            key={amount}
                            className="flex items-center justify-between py-1"
                            style={{ maxHeight: "25px", margin: "6px" }}
                          >
                            <label className="flex items-center space-x-2">
                              {/* Add dynamic background color to the label */}
                              <input
                                type="checkbox"
                                checked={selectedAmounts.includes(
                                  Number(amount)
                                )}
                                onChange={() => toggleAmount(Number(amount))}
                                style={{ height: "15px" }}
                              />
                              {/* <div
                                style={{ width: "50px", height: "17px", backgroundColor: seatColor }}
                              ></div> */}
                              <span
                                style={{
                                  backgroundColor: seatColor, // Apply the dynamic background color here
                                  padding: "3px 10px",
                                  borderRadius: "4px",
                                  color: "#fff", // Ensure the text is readable with white text
                                }}
                              >
                                ₹{amount}
                              </span>
                            </label>
                            <span className="text-sm text-gray-600">
                              {count} seat{count > 1 ? "s" : ""}
                            </span>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </div>

              <div className="col-lg-7">
                {renderSeatMap(flightSeat?.seat?.sInfo || [])}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SeatBooking;
