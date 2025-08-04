import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/util/AppContext";
import { Segmented, Tabs } from "antd";
import dayjs from "dayjs";
import "./Multicity.css";
import { Input, Radio } from "antd";
import Link from "next/link";
import ByPrice from "@/components/Filter/ByPrice";
import ByStops from "@/components/Filter/ByStops";
import ByDepartureTime from "@/components/Filter/ByDepartureTime";
import ByArrivalTime from "@/components/Filter/ByArrivalTime";
import ByAirline from "@/components/Filter/ByAirline";

export default function MulticitySelectionView({ flightData }) {
  const { getCookie } = useContext(AppContext);
  const [activeBoxIndex, setActiveBoxIndex] = useState(0);
  const [selectedFlights, setSelectedFlights] = useState({});
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [filters, setFilters] = useState([]);

  const applyFilters = (flights, filter) => {
    if (!filter) return flights;
    let filteredData = flights;

    // Price Range Filter
    filteredData = filteredData.filter(
      (ticket) => {
        const ticketPrice = ticket?.totalPriceList?.[0]?.fd?.ADULT?.fC?.NF;
        return (
          ticketPrice !== undefined &&
          ticketPrice >= filter.priceRange[0] &&
          ticketPrice <= filter.priceRange[1]
        );
      }
    );

    // Stops Filter
    if (filter.stops !== "all") {
      filteredData = filteredData.filter((ticket) => {
        if (filter.stops === "non-stop") {
          return ticket.sI.length === 1;
        } else if (filter.stops === "1-stop") {
          return ticket.sI.length === 2;
        } else if (filter.stops === "2-stops") {
          return ticket.sI.length > 2;
        }
        return true;
      });
    }

    // Departure Time Filter
    if (filter.departureTime !== "all") {
      filteredData = filteredData.filter((ticket) => {
        const departureHour = new Date(ticket.sI[0].dt).getHours();
        if (filter.departureTime === "early-morning") {
          return departureHour >= 0 && departureHour < 6;
        } else if (filter.departureTime === "morning") {
          return departureHour >= 6 && departureHour < 12;
        } else if (filter.departureTime === "afternoon") {
          return departureHour >= 12 && departureHour < 18;
        } else if (filter.departureTime === "evening") {
          return departureHour >= 18 && departureHour < 24;
        }
        return true;
      });
    }

    // Arrival Time Filter
    if (filter.arrivalTime !== "all") {
      filteredData = filteredData.filter((ticket) => {
        const arrivalHour = new Date(
          ticket.sI[ticket.sI.length - 1].at
        ).getHours();
        if (filter.arrivalTime === "early-morning") {
          return arrivalHour >= 0 && arrivalHour < 6;
        } else if (filter.arrivalTime === "morning") {
          return arrivalHour >= 6 && arrivalHour < 12;
        } else if (filter.arrivalTime === "afternoon") {
          return arrivalHour >= 12 && arrivalHour < 18;
        } else if (filter.arrivalTime === "evening") {
          return arrivalHour >= 18 && arrivalHour < 24;
        }
        return true;
      });
    }

    // Airline Filter
    if (filter.selectedAirlines.length > 0) {
      filteredData = filteredData.filter((ticket) =>
        filter.selectedAirlines.includes(ticket.sI[0].fD.aI.name)
      );
    }

    return filteredData;
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

  useEffect(() => {
    // Initialize filters only when the number of cities/legs changes
    if (filters.length !== cities.length) {
      const initialFilters = cities.map(() => ({
        priceRange: [0, 100000],
        stops: "all",
        departureTime: "all",
        arrivalTime: "all",
        selectedAirlines: [],
      }));
      setFilters(initialFilters);
    }
  }, [cities.length]); // Depend on cities.length to re-initialize only when legs change

  const [departureFrom, setDepartureFrom] = useState("");
  const [arrivalTo, setArrivalTo] = useState("");

  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [selectedFares, setSelectedFares] = useState({});
  const [showAllFares, setShowAllFares] = useState(false);
  
  const setSelectedFare = (tabIndex, flightIndex, fareIndex) => {
    setSelectedFares((prev) => ({
      ...prev,
      [tabIndex]: {
        ...(prev[tabIndex] || {}),
        [flightIndex]: fareIndex
      }
    }));
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

  const matchedFlights = cities.map((cityPair, tabIndex) => {
    const flightsForSegment = flightData[String(tabIndex)] || [];

    return {
      from: cityPair.from,
      to: cityPair.to,
      flights: flightsForSegment,
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
        <div className="row">
          <div className="col-lg-3">
            <div className="sidebar-left border-1 background-body">
              <div className="box-filters-sidebar">
                <div className="block-filter border-1">
                  <h6 className="text-lg-bold item-collapse neutral-1000">
                    Filter Price{" "}
                  </h6>
                  <ByPrice
                    key={`price-${tabIndex}`}
                    priceRange={filters[tabIndex]?.priceRange}
                    setPriceRange={(newRange) => {
                      setFilters(prevFilters => {
                        const newFilters = [...prevFilters];
                        newFilters[tabIndex] = {
                          ...newFilters[tabIndex],
                          priceRange: newRange
                        };
                        return newFilters;
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="sidebar-left border-1 background-body">
              <div className="box-filters-sidebar">
                <div className="block-filter border-1">
                  <h6 className="text-lg-bold item-collapse neutral-1000">
                    Stops
                  </h6>
                  <ByStops
                    key={`stops-${tabIndex}`}
                    stops={filters[tabIndex]?.stops}
                    setStops={(newStops) => {
                      setFilters(prevFilters => {
                        const newFilters = [...prevFilters];
                        newFilters[tabIndex] = {
                          ...newFilters[tabIndex],
                          stops: newStops
                        };
                        return newFilters;
                      });
                    }}
                    tabIndex={tabIndex}
                  />
                </div>
              </div>
            </div>
            <div className="sidebar-left border-1 background-body">
              <div className="box-filters-sidebar">
                <div className="block-filter border-1">
                  <h6 className="text-lg-bold item-collapse neutral-1000">
                    Departure Time
                  </h6>
                  <ByDepartureTime
                    key={`departureTime-${tabIndex}`}
                    departureTime={filters[tabIndex]?.departureTime}
                    setDepartureTime={(newDepartureTime) => {
                      setFilters(prevFilters => {
                        const newFilters = [...prevFilters];
                        newFilters[tabIndex] = {
                          ...newFilters[tabIndex],
                          departureTime: newDepartureTime
                        };
                        return newFilters;
                      });
                    }}
                    tabIndex={tabIndex}
                  />
                </div>
              </div>
            </div>
            <div className="sidebar-left border-1 background-body">
              <div className="box-filters-sidebar">
                <div className="block-filter border-1">
                  <h6 className="text-lg-bold item-collapse neutral-1000">
                    Arrival Time
                  </h6>
                  <ByArrivalTime
                    key={`arrivalTime-${tabIndex}`}
                    arrivalTime={filters[tabIndex]?.arrivalTime}
                    setArrivalTime={(newArrivalTime) => {
                      setFilters(prevFilters => {
                        const newFilters = [...prevFilters];
                        newFilters[tabIndex] = {
                          ...newFilters[tabIndex],
                          arrivalTime: newArrivalTime
                        };
                        return newFilters;
                      });
                    }}
                    tabIndex={tabIndex}
                  />
                </div>
              </div>
            </div>
            <div className="sidebar-left border-1 background-body">
              <div className="box-filters-sidebar">
                <div className="block-filter border-1">
                  <h6 className="text-lg-bold item-collapse neutral-1000">
                    Airlines
                  </h6>
                  <div className="box-collapse scrollFilter">
                    <ByAirline
                      key={`airline-${tabIndex}`}
                      uniqueAirlines={[
                        ...new Set(
                          pair.flights.map(
                            (ticket) => ticket.sI[0].fD.aI.name
                          ) || []
                        ),
                      ]}
                      selectedAirlines={filters[tabIndex]?.selectedAirlines}
                      setSelectedAirlines={(newAirlines) => {
                        setFilters(prevFilters => {
                          const newFilters = [...prevFilters];
                          newFilters[tabIndex] = {
                            ...newFilters[tabIndex],
                            selectedAirlines: newAirlines
                          };
                          return newFilters;
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            {pair.flights.length > 0 ? (
              applyFilters(pair.flights, filters[tabIndex]).map((ticket, i) => (
                <div key={i}>
                  <div className="" style={{ paddingBottom: "10px" }}>

                    {ticket.sI.length >= 1 ? (
                      <div className="combined-connecting-flight  ">
                        <div className="flex gap-4 border rounded-md justify-between items-center pr-20 ">
                          <div className="flex flex-col">
                            {ticket.sI.map((segment, index) => (
                              <div key={index} className="relative flex flex-col rounded-md p-5">
                                <div
                                  className="air_detailes  "
                                  style={{
                                    width: "unset",
                                    top: index === 0 ? "0" : "0%",
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
                                <div className="flex  justify-between" style={{ width: "500px" }}>
                                  <div className="text-sm  flex flex-col justify-center items-center " style={{ width: "150px" }}>
                                    <p className="text-md-bold neutral-1000 city1name">{segment.da.city} ({segment.da.code})</p>
                                    <p className="neutral-1000 time">{dayjs(segment.dt).format("HH:mm")}</p>


                                  </div>
                                  <div className="text-xs text-center  " style={{ width: "100px" }}>
                                    < p className="text-sm-medium neutral-500">{formatTime(segment.duration)}</p>
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
                                    <p className="text-sm-medium neutral-500">  {segment.stops > 0 ? `${segment.stops} stops` : "non-stop"}</p>


                                  </div>
                                  <div className="text-sm  flex flex-col justify-center items-center gap-1 " style={{ width: "200px" }}>
                                    <p className="text-md-bold neutral-1000 city1name">{segment.aa.city} ({segment.aa.code})</p>
                                    <p className="neutral-1000 time">{dayjs(segment.at).format("HH:mm")}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flight-price-1 border-1 price-div flex flex-row justify-center items-center flex-col mt-4">
                            <Radio.Group
                              onChange={(e) => setSelectedFare(tabIndex, i, e.target.value)}
                              value={selectedFares[tabIndex]?.[i] ?? 0}
                              className="fare-options flex flex-col gap-2 w-full"
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
                                  <Radio key={j} value={j} className="w-full radiocomp">
                                    <div className="p-0 rounded-lg border-2 radiodiv border-gray-300 hover:border-gray-500">
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
                                            {e.fd.rT === 1 ? "Non-refundable" : "Refundable"}
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
                                  style={{ textAlign: "right", fontSize: "10px" }}
                                  onClick={() => setShowAllFares((prev) => !prev)}
                                >
                                  {showAllFares ? "(-) View Less" : "(+) View More"}
                                </button>
                              )}
                            </Radio.Group>


                          </div>
                          <div>
                            <button
                              className="btn btn-gray mt-2 "
                              onClick={() => {
                                const selectedFareIndex = selectedFares[tabIndex]?.[i] ?? 0;
                                const selectedFare = ticket.totalPriceList[selectedFareIndex];
                                const fareFD = selectedFare.fd;

                                const totalPrice = calculateTotalFare(
                                  fareFD,
                                  adultCount,
                                  childCount,
                                  infantCount,
                                  getCookie
                                );
                                const firstSegment = ticket.sI[0];
                                const lastSegment =
                                  ticket.sI[ticket.sI.length - 1];

                                const updatedFlight = {
                                  priceId: selectedFare.id,
                                  flightName: firstSegment.fD.aI.name,
                                  depCityCode: firstSegment.da.code,
                                  arrCityCode: lastSegment.aa.code,
                                  airlineCode: firstSegment.fD.aI.code,
                                  flightNumber: firstSegment.fD.fN,
                                  depCity: firstSegment.da.city,
                                  arrCity: lastSegment.aa.city,
                                  depTime: dayjs(firstSegment.dt).format("HH:mm"),
                                  arrTime: dayjs(lastSegment.at).format("HH:mm"),
                                  airlineLogo: `/assets/imgs/airlines/${firstSegment.fD.aI.code.toLowerCase()}.png`,
                                  price: totalPrice,
                                  adultFare: new Intl.NumberFormat("en-IN").format(
                                    fareFD.ADULT?.fC?.NF || 0
                                  ),
                                };

                                setSelectedFlights((prev) => {
                                  const newFlights = {
                                    ...prev,
                                    [tabIndex]: updatedFlight,
                                  };
                                  const nextTabIndex = tabIndex + 1;
                                  if (nextTabIndex < matchedFlights.length) {
                                    setActiveTabKey(String(nextTabIndex + 1)); // Because tab keys are 1-based
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

                    ) : (null)}



                  </div>
                </div>
              ))
            ) : (
              <p>No matching flights found for this route.</p>
            )}
          </div>
        </div>
      ),
    };
  });

  return (
    <>
      <Tabs
        activeKey={activeTabKey}
        items={tabItems}
        onChange={(key) => setActiveTabKey(key)}
        destroyInactiveTabPane={false}
      />
    </>
  );
}