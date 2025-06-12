import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/util/AppContext";
import { Segmented, Tabs } from "antd";
import dayjs from "dayjs";
import "./Multicity.css";
import { Input, Radio } from "antd";
import Link from "next/link";

export default function MulticitySelectionView({ flightData }) {
  const { getCookie } = useContext(AppContext);
  const [activeBoxIndex, setActiveBoxIndex] = useState(0);
  const [selectedFlights, setSelectedFlights] = useState({});
  const [activeTabKey, setActiveTabKey] = useState("1");

  const [departureFrom, setDepartureFrom] = useState("");
  const [arrivalTo, setArrivalTo] = useState("");

  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [selectedFares, setSelectedFares] = useState({});
  const [showAllFares, setShowAllFares] = useState(false);
  useEffect(() => {
    console.log("Selected Flights:", selectedFlights);
  }, [selectedFlights]);
  const setSelectedFare = (ticketIndex, fareIndex) => {
    setSelectedFares((prev) => ({ ...prev, [ticketIndex]: fareIndex }));
  };

  useEffect(() => {
    setDepartureFrom(getCookie("gy_da_str") || "");
    setArrivalTo(getCookie("gy_aa_str") || "");

    const adult = parseInt(getCookie("gy_adult"));
    const child = parseInt(getCookie("gy_child"));
    const infant = parseInt(getCookie("gy_infant"));

    if (!isNaN(adult)) setAdultCount(adult);
    if (!isNaN(child)) setChildCount(child);
    if (!isNaN(infant)) setInfantCount(infant);
  }, []);

  const onChange = (key) => {
    console.log("Selected Tab:", key);
  };

  const fromCity = getCookie("gy_da_str");
  const toCity = getCookie("gy_aa_str");
  const multicity = JSON.parse(getCookie("gy_multi_city"));
  const simplifiedSegments = multicity.map(({ from, to }) => ({
    from: from,
    to: to,
  }));

  const firstIdxCity = [
    {
      from: fromCity,
      to: toCity,
    },
  ];

  const cities = [...firstIdxCity, ...simplifiedSegments];

  const matchedFlights = cities.map(({ from, to }) => {
    const flights = [];

    Object.values(flightData).forEach((flightGroup) => {
      flightGroup.forEach((flight) => {
        const segment = flight?.sI?.[0];
        const depCity = segment?.da?.city;
        const arrCity = segment?.aa?.city;

        if (depCity === from && arrCity === to) {
          flights.push(flight);
        }
      });
    });


    return {
      from,
      to,
      flights, // all matching flights for this city pair
    };
  });
  console.log("matched flight", matchedFlights);

  const formatTime = (durationInMinutes) => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    if (hours === 0) return `${minutes}m`;
    if (minutes === 0) return `${hours}h`;

    return `${hours}h ${minutes}m`;
  };
  const tabItems = matchedFlights.map((pair, tabIndex) => {
    const firstFlight = pair.flights[0];
    let travelDate = "";

    if (firstFlight?.sI?.[0]?.dt) {
      travelDate = dayjs(firstFlight.sI[0].dt).format("ddd, DD MMM YYYY");
    }
    const calculateTotalFare = (
      fd,
      adultCount,
      childCount,
      infantCount,
      getCookie
    ) => {
      const adult = fd?.ADULT?.fC?.NF || 0;
      const child = fd?.CHILD?.fC?.NF || 0;
      const infant = fd?.INFANT?.fC?.NF || 0;
      return new Intl.NumberFormat("en-IN").format(
        adultCount * adult + childCount * child + infantCount * infant
      );
    };

    return {
      key: String(tabIndex + 1),
      label: (
        <div>
          <p className="text-sm-bold text-gray-600">
            {pair.from} → {pair.to}
          </p>
          {travelDate && (
            <p style={{ fontSize: "12px", color: "#888" }}>{travelDate}</p>
          )}
        </div>
      ),
      children: (
        <>
          {pair.flights.length > 0 ? (
            pair.flights.map((ticket, i) => (
              <div key={i}>
                <div className="" style={{ paddingBottom: "10px" }}>
                  
                  
                  {ticket.sI.length === 2 ? (
  // 🟢 Combined view for connecting flights
  <div className="combined-connecting-flight">
    <div className="flex justify-between gap-4 border rounded-md p-4">
      {ticket.sI.map((segment, index) => (
        <div key={index} className="w-1/2 border-r last:border-none pr-4 last:pr-0">
          <div className="flex items-center gap-2 mb-2">
            <img
              className="w-8 h-8"
              src={`/assets/imgs/airlines/${segment.fD.aI.code.toLowerCase()}.png`}
              alt={segment.fD.aI.name}
            />
            <div className="text-xs">{segment.fD.aI.name}</div>
          </div>
          <div className="text-sm mb-1">
            <strong>{segment.da.city} ({segment.da.code})</strong> →
            <strong> {segment.aa.city} ({segment.aa.code})</strong>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>{dayjs(segment.dt).format("HH:mm")}</span>
            <span>{formatTime(segment.duration)}</span>
            <span>{dayjs(segment.at).format("HH:mm")}</span>
          </div>
          <div className="text-xs mt-1">
            {segment.stops > 0 ? `${segment.stops} stops` : "Non-stop"}
          </div>
        </div>
      ))}
    </div>
  </div>
) : (
  // 🔵 Normal single-segment logic (same as before)
  ticket.sI.map((segment, index) => (
     <div className="relative flex flex-col">
                        <div
                          className="air_detailes  "
                          style={{
                            width: "unset",
                            top: index === 0 ? "0" : "49%",
                            marginBottom: "00px",
                            display: "block",
                          }}
                        >
                          <div className="flex items-center justify-center  ">
                            <img
                              style={{
                                width: "35px",
                                height: "35px",
                                padding: "5px",
                              }}
                              src={`/assets/imgs/airlines/${segment.fD.aI.code.toLowerCase()}.png`}
                            />
                            <div className="text-[10px]">
                              {segment.fD.aI.name}
                            </div>
                          </div>
                        </div>

                        <div
                          className="flex justify-evenly items-center border rounded-md "
                          style={{ padding: "40px 20px 20px 20px" }}
                          key={index}
                        >
                          <div className="flight-route flight-route-type-2 city1">
                            <div className="flight-route-1">
                              <div className="flight-name">
                                <div className="flight-info flex flex-col justify-center items-center">
                                  <p className="text-md-bold neutral-1000 city1name">
                                    {segment.da.city} ({segment.da.code})
                                  </p>
                                  <p className="text-sm-medium time-flight timelogo">
                                    <span className="neutral-1000 time">
                                      {dayjs(segment.dt).format("HH:mm")
                                      }
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flight-route flight-route-type-2 city1">
                            <div className="flight-route-1">
                              <div className=" flight-name duration flex flex-col items-center align-center duration">
                                <p className="text-sm-medium neutral-500 totalduration">
                                  {formatTime(segment.duration)}
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
                                <p className="text-sm-medium neutral-500 totalduration">
                                  {segment.stops > 0
                                    ? `${segment.stops} stops`
                                    : "non stop"}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flight-route flight-route-type-2 city1">
                            <div className="flight-route-1">
                              <div className="flight-name">
                                <div className="flight-info flex flex-col items-center align-center">
                                  <p className="text-md-bold neutral-1000 align-center city1name">
                                    {segment.aa.city} ({segment.aa.code})
                                  </p>
                                  <p className="text-sm-medium time-flight timelogo">
                                    <span className="neutral-1000 time">
                                      {dayjs(segment.at).format("HH:mm")}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            className="flight-price-1 border-1  price-div flex justify-center items-center flex-col "
                            style={{ width: "245px", paddingLeft: "20px" }}
                          >
                            <Radio.Group
                              onChange={(e) =>
                                setSelectedFare(i, e.target.value)
                              }
                              value={selectedFares[i] || 0}
                              className="fare-options flex flex-col gap-2  w-full"
                            >
                              {(showAllFares
                                ? ticket.totalPriceList
                                : ticket.totalPriceList.slice(0, 2)
                              ).map((e, j) => {
                                const fareValue = calculateTotalFare(
                                  e.fd,
                                  adultCount,
                                  childCount,
                                  infantCount,
                                  getCookie
                                );
                                return (
                                  <Radio
                                    key={j}
                                    value={j}
                                    className="w-full radiocomp"
                                  >
                                    <div className="p-0 rounded-lg border-2 transition-all duration-200 radiodiv border-gray-300 hover:border-gray-500">
                                      <div className="flex flex-row gap-2 items-center">
                                        <div className="text-lg font-bold text-gray-800 price">
                                          ₹{fareValue}
                                        </div>
                                        <span
                                          className="fareidentifier text-xs font-bold"
                                          style={{
                                            backgroundColor: "#f5deb3",
                                            color: "#5c4033",
                                            padding: "1px 2px",
                                          }}
                                        >
                                          {e.fareIdentifier}
                                        </span>
                                      </div>
                                      <div className="text-xs text-gray-600">
                                        <span className="ml-2 cabinclass">
                                          {e.fd.ADULT.cc} |{" "}
                                          <span className="refundable">
                                            {e.fd.rT === 1
                                              ? "Non-refundable"
                                              : "Refundable"}
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                  </Radio>
                                );
                              })}
                              {ticket.totalPriceList.length > 2 && (
                                <button
                                  className="view-more-txt"
                                  style={{
                                    textAlign: "right",
                                    fontSize: "10px",
                                  }}
                                  onClick={() =>
                                    setShowAllFares((prev) => !prev)
                                  }
                                >
                                  {showAllFares
                                    ? "(-) View Less"
                                    : "(+) View More"}
                                </button>
                              )}
                            </Radio.Group>
                          </div>

                          <div>
                            <button
                              className="btn btn-gray btn"
                              onClick={() => {
                                const selectedFareIndex = selectedFares[i] || 0;
                                const selectedFare =
                                  ticket.totalPriceList[selectedFareIndex];
                                const fareFD = selectedFare.fd;

                                const totalPrice = calculateTotalFare(
                                  fareFD,
                                  adultCount,
                                  childCount,
                                  infantCount,
                                  getCookie
                                );
                                const adultFare = fareFD.ADULT?.fC?.NF || 0;

                                const updatedFlight = {
                                  priceId: selectedFare.id,

                                  flightName: segment.fD.aI.name,
                                  depCityCode: segment.da.code,
                                  arrCityCode: segment.aa.code,
                                  airlineCode: segment.fD.aI.code,
                                  flightNumber: segment.fD.fN,
                                  depCity: segment.da.city,
                                  arrCity: segment.aa.city,
                                  depTime: dayjs(segment.dt).format("HH:mm"),
                                  arrTime: dayjs(segment.at).format("HH:mm"),

                                  airlineLogo: `/assets/imgs/airlines/${segment.fD.aI.code.toLowerCase()}.png`,
                                  price: totalPrice,
                                  adultFare: new Intl.NumberFormat("en-IN").format(adultFare),
                                };

                                setSelectedFlights((prev) => {
                                  const newFlights = {
                                    ...prev,
                                    [tabIndex]: updatedFlight,
                                  };

                                  // Move to next tab if on tab 1 or 2 (i.e., index 0 or 1)
                                  if (tabIndex === 0 || tabIndex === 1) {
                                    setActiveTabKey(String(tabIndex + 2));
                                  }

                                  return newFlights;
                                });
                              }}
                            >
                              Select
                            </button>
                          </div>
                        </div>
                      </div>
  ))
)}


                  {/* Pricing and fare selection */}
                </div>
              </div>
            ))
          ) : (
            <p>No matching flights found for this route.</p>
          )}
          {Object.keys(selectedFlights).length > 0 &&
            (() => {
              const totalFlightPrice = Object.values(selectedFlights).reduce(
                (sum, flight) => {
                  const numericPrice =
                    typeof flight.price === "string"
                      ? parseInt(flight.price.replace(/[^0-9]/g, ""))
                      : flight.price || 0;
                  return sum + numericPrice;
                },
                0
              );

              return (
                <div className=" p-4 rounded bg-black text-white sticky-summary  ">
                  <div className="flex items-center justify-between gap-6">
                    {/* Flight Segments */}
                    <div
                      className=" flight-scroll pb-2  flex items-center flex-row gap-6 overflow-x-auto whitespace-nowrap "
                      style={{ width: "900px" }}
                    >
                      {Object.entries(selectedFlights).map(
                        ([key, flight], i) => (
                          <div
                            key={i}
                            className=""
                            style={{
                              borderLeft:
                                i === 1 || i == 2 ? "2px solid white" : "",

                              padding: "0 12px",
                            }}
                          >
                            <div
                              key={i}
                              className="flex items-center gap-5 border-r border-white pr-4"
                            >
                              <div className="text-sm flex flex-row items-center gap-2">
                                <img
                                  src={flight.airlineLogo}
                                  alt="airline"
                                  className="w-8 h-8 object-contain "
                                />
                                <div className="flex flex-col">
                                  <p className="font-semibold text-sm">
                                    {flight.flightName}
                                  </p>
                                  <p>
                                    {flight.airlineCode}-{flight.flightNumber}
                                  </p>
                                </div>
                              </div>

                              <div className="text-sm flex flex-row gap-3 items-center">
                                <div className="flex flex-row">
                                  <div className="flex flex-col items-center">
                                    <p>{flight.depCityCode}</p>
                                    <p>({flight.depTime})</p>
                                  </div>
                                  <div> → </div>
                                  <div className="flex flex-col items-center">
                                    <p>{flight.arrCityCode}</p>
                                    <p>({flight.arrTime})</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-row justify-end pr-4">
                              {flight.price && (
                                <p className="font-semibold mt-1 text-white">
                                  Fare: ₹{flight.price}
                                </p>
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {/* Total Price & Book Button */}
                    <div className="ml-auto flex flex-row items-center gap-4">
                      <div className="text-lg font-bold text-white">
                        ₹
                        {new Intl.NumberFormat("en-IN").format(
                          totalFlightPrice
                        )}
                      </div>
                      <Link
                        href={`/book-ticket?tcs_id=${Object.values(selectedFlights)
                          .slice(0, 3) // get up to 3 priceIds
                          .map(f => f?.priceId || "")
                          .join(",")}`}
                        passHref
                      >
                        <button
                          className="book-button"
                          onClick={(e) => e.stopPropagation()}
                        >
                          BOOK
                        </button>
                      </Link>


                    </div>
                  </div>
                </div>
              );
            })()}
        </>
      )
    };
  });

  return (
    <>
      <Tabs
        activeKey={activeTabKey}
        items={tabItems}
        onChange={(key) => setActiveTabKey(key)}
      />
    </>
  );
}
