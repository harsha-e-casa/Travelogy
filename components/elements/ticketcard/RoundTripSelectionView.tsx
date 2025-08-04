import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "@/util/AppContext";
import dayjs from "dayjs";
import DomesticRoundTripTicketCard from "./DomesticRoundTripTicketCard";
import ByPrice from "@/components/Filter/ByPrice";
import ByStops from "@/components/Filter/ByStops";
import ByDepartureTime from "@/components/Filter/ByDepartureTime";
import ByArrivalTime from "@/components/Filter/ByArrivalTime";
import ByAirline from "@/components/Filter/ByAirline";
// import TicketCard1 from "./TicketCard1";

export default function RoundTripSelectionView({ flightData }: any) {
  const { getCookie } = useContext(AppContext);
  const departureFrom = getCookie("gy_da_str");
  const arrivalTo = getCookie("gy_aa_str");
  const [selectedOnwardTicket, setSelectedOnwardTicket] = useState(null);
  const [currentTickets, setCurrentTickets] = useState(flightData.ONWARD);
  const [tripPhase, setTripPhase] = useState<"ONWARD" | "RETURN">("ONWARD");

  const [onwardPriceRange, setOnwardPriceRange] = useState([0, 100000]);
  const [onwardStops, setOnwardStops] = useState("all");
  const [onwardDepartureTime, setOnwardDepartureTime] = useState("all");
  const [onwardArrivalTime, setOnwardArrivalTime] = useState("all");
  const [onwardSelectedAirlines, setOnwardSelectedAirlines] = useState<string[]>([]);

  const [returnPriceRange, setReturnPriceRange] = useState([0, 100000]);
  const [returnStops, setReturnStops] = useState("all");
  const [returnDepartureTime, setReturnDepartureTime] = useState("all");
  const [returnArrivalTime, setReturnArrivalTime] = useState("all");
  const [returnSelectedAirlines, setReturnSelectedAirlines] = useState<string[]>([]);

  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  useEffect(() => {
    if (
      getCookie("gy_adult") !== undefined &&
      getCookie("gy_adult") !== "Nan"
    ) {
      setAdultCount(getCookie("gy_adult"));
    }
    if (
      getCookie("gy_child") !== undefined &&
      getCookie("gy_child") !== "Nan"
    ) {
      setChildCount(getCookie("gy_child"));
    }
    if (
      getCookie("gy_infant") !== undefined &&
      getCookie("gy_infant") !== "Nan"
    ) {
      setInfantCount(getCookie("gy_infant"));
    }
  }, []);

  const applyFilters = () => {
    let filteredData = tripPhase === "ONWARD" ? flightData.ONWARD : flightData.RETURN;
    const priceRange = tripPhase === "ONWARD" ? onwardPriceRange : returnPriceRange;
    const stops = tripPhase === "ONWARD" ? onwardStops : returnStops;
    const departureTime = tripPhase === "ONWARD" ? onwardDepartureTime : returnDepartureTime;
    const arrivalTime = tripPhase === "ONWARD" ? onwardArrivalTime : returnArrivalTime;
    const selectedAirlines = tripPhase === "ONWARD" ? onwardSelectedAirlines : returnSelectedAirlines;

    // Price Range Filter
    filteredData = filteredData.filter(
      (ticket) => {
        return ticket?.totalPriceList?.[0]?.fd?.ADULT?.fC?.NF >= priceRange[0] &&
          ticket?.totalPriceList?.[0]?.fd?.ADULT?.fC?.NF <= priceRange[1]
      }
    );

    // Stops Filter
    if (stops !== "all") {
      filteredData = filteredData.filter((ticket) => {
        if (stops === "non-stop") {
          return ticket.sI.length === 1;
        } else if (stops === "1-stop") {
          return ticket.sI.length === 2;
        } else if (stops === "2-stops") {
          return ticket.sI.length > 2;
        }
        return true;
      });
    }

    // Departure Time Filter
    if (departureTime !== "all") {
      filteredData = filteredData.filter((ticket) => {
        const departureHour = new Date(ticket.sI[0].dt).getHours();
        if (departureTime === "early-morning") {
          return departureHour >= 0 && departureHour < 6;
        } else if (departureTime === "morning") {
          return departureHour >= 6 && departureHour < 12;
        } else if (departureTime === "afternoon") {
          return departureHour >= 12 && departureHour < 18;
        } else if (departureTime === "evening") {
          return departureHour >= 18 && departureHour < 24;
        }
        return true;
      });
    }

    // Arrival Time Filter
    if (arrivalTime !== "all") {
      filteredData = filteredData.filter((ticket) => {
        const arrivalHour = new Date(
          ticket.sI[ticket.sI.length - 1].at
        ).getHours();
        if (arrivalTime === "early-morning") {
          return arrivalHour >= 0 && arrivalHour < 6;
        } else if (arrivalTime === "morning") {
          return arrivalHour >= 6 && arrivalHour < 12;
        } else if (arrivalTime === "afternoon") {
          return arrivalHour >= 12 && arrivalHour < 18;
        } else if (arrivalTime === "evening") {
          return arrivalHour >= 18 && arrivalHour < 24;
        }
        return true;
      });
    }

    // Airline Filter
    if (selectedAirlines.length > 0) {
      filteredData = filteredData.filter((ticket) =>
        selectedAirlines.includes(ticket.sI[0].fD.aI.name)
      );
    }

    setCurrentTickets(filteredData);
  };

  useEffect(() => {
    applyFilters();
  }, [
    onwardPriceRange,
    onwardStops,
    onwardDepartureTime,
    onwardArrivalTime,
    onwardSelectedAirlines,
    returnPriceRange,
    returnStops,
    returnDepartureTime,
    returnArrivalTime,
    returnSelectedAirlines,
    tripPhase,
  ]);

  const handleTicketSelected = (ticket, selectedPriceIndex) => {
    if (tripPhase === "ONWARD") {
      console.log("ticketttttttttttttttt ", ticket);
      console.log("ticketttttttttttttttt ", selectedPriceIndex);
      setSelectedOnwardTicket({ ticket, selectedPriceIndex }); // save selected onward
      setCurrentTickets(flightData.RETURN); // move to return flights
      setTripPhase("RETURN");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Final step — onward and return selected
      console.log("Selected ONWARD:", selectedOnwardTicket);
      console.log("Selected RETURN:", ticket);
      // handle complete selection
    }
  };

  console.log("selectedOnwardTicket == ", selectedOnwardTicket);

  return (
    <>
      {/* render departure ticket with cancell */}
      

      {/* {selectedOnwardTicket && tripPhase === "RETURN" && (
        <div
          className="flex justify-between items-center p-3 bg-yellow-50 border border-yellow-300 rounded-md mb-4 shadow-sm fixed"
          style={{
            zIndex: "10",
            bottom: "-24px",
            width: "61%",
            background: "#1a1a2e",
          }}
        >
          <div className="">
            <div style={{ width: "175%" }}>
              <p className="text-sm font-semibold text-white mb-2">
                Selected Departure Flight
              </p>
              <div className="flex justify-evenly">
                {selectedOnwardTicket?.ticket?.sI?.map(
                  (segment: any, index: number) => (
                    <div key={index} className="mb-2 w-full justify-around items-center border border-white rounded px-2 py-0.5 flex">
                      <img
                        style={{
                          width: "35px",
                          height: "35px",
                          padding: "1px",
                        }}
                        src={`/assets/imgs/airlines/${segment[
                          "fD"
                        ].aI.code.toLowerCase()}.png`}
                      />
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {segment.da.city}
                        </p>
                        <p className="text-sm font-semibold text-white">
                          {dayjs(segment.dt).format("hh:mm A")}
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-sm font-semibold text-white">
                          {Math.floor(segment.duration / 60)}h{" "}
                          {segment.duration % 60}m
                        </p>
                        <img
                          src="https://edge.ixigo.com/st/vimaan/_next/static/media/line.9641f579.svg"
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {segment.aa.city}
                        </p>
                        <p className="text-sm font-semibold text-white">
                          {dayjs(segment.at).format("hh:mm A")}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <p className="text-sm text-white font-medium">
              Fare: ₹
              {(() => {
                console.log("ssss");
                let adultCost = 0;
                let childCost = 0;
                let infantCost = 0;
                if (
                  selectedOnwardTicket.ticket.totalPriceList[
                    selectedOnwardTicket.selectedPriceIndex
                  ].fd?.ADULT
                ) {
                  if (
                    getCookie("gy_adult") !== undefined &&
                    getCookie("gy_adult") !== "Nan"
                  ) {
                    console.log("adult count state == ", adultCount);
                    adultCost =
                      adultCount *
                      selectedOnwardTicket.ticket.totalPriceList[
                        selectedOnwardTicket.selectedPriceIndex
                      ].fd?.ADULT?.fC?.NF;
                    console.log("adult total cost = ", adultCost);
                  }
                }
                if (
                  selectedOnwardTicket.ticket.totalPriceList[
                    selectedOnwardTicket.selectedPriceIndex
                  ].fd?.CHILD
                ) {
                  if (
                    getCookie("gy_child") !== undefined &&
                    getCookie("gy_child") !== "Nan"
                  ) {
                    console.log("child count state == ", childCount);
                    childCost =
                      childCount *
                      selectedOnwardTicket.ticket.totalPriceList[
                        selectedOnwardTicket.selectedPriceIndex
                      ].fd?.CHILD?.fC?.NF;
                    console.log("child total cost = ", childCost);
                  }
                }
                if (
                  selectedOnwardTicket.ticket.totalPriceList[
                    selectedOnwardTicket.selectedPriceIndex
                  ].fd?.INFANT
                ) {
                  if (
                    getCookie("gy_infant") !== undefined &&
                    getCookie("gy_infant") !== "Nan"
                  ) {
                    console.log("infant count state == ", infantCount);
                    infantCost =
                      infantCount *
                      selectedOnwardTicket.ticket.totalPriceList[
                        selectedOnwardTicket.selectedPriceIndex
                      ].fd?.INFANT?.fC?.NF;
                    console.log("infant total cost = ", infantCost);
                  }
                }

                return new Intl.NumberFormat("en-IN").format(
                  adultCost + childCost + infantCost
                );
              })()}{" "}
              <span className="text-xs text-white-500">
                (
                {
                  selectedOnwardTicket.ticket.totalPriceList[
                    selectedOnwardTicket.selectedPriceIndex
                  ].fareIdentifier
                }
                )
              </span>
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedOnwardTicket(null);
              setTripPhase("ONWARD");
              setCurrentTickets(flightData.ONWARD);
            }}
            className="text-sm text-red-500 underline hover:text-red-600"
          >
            Cancel
          </button>
        </div>
      )} */}

      {/* render onward and return ticket */}
      <div className="row">
        <div className="col-lg-3">
          <div className="sidebar-left border-1 background-body">
            <div className="box-filters-sidebar">
              <div className="block-filter border-1">
                <h6 className="text-lg-bold item-collapse neutral-1000">
                  Filter Price{" "}
                </h6>
                <ByPrice
                  priceRange={tripPhase === "ONWARD" ? onwardPriceRange : returnPriceRange}
                  setPriceRange={tripPhase === "ONWARD" ? setOnwardPriceRange : setReturnPriceRange}
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
                  stops={tripPhase === "ONWARD" ? onwardStops : returnStops}
                  setStops={tripPhase === "ONWARD" ? setOnwardStops : setReturnStops}
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
                  departureTime={tripPhase === "ONWARD" ? onwardDepartureTime : returnDepartureTime}
                  setDepartureTime={tripPhase === "ONWARD" ? setOnwardDepartureTime : setReturnDepartureTime}
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
                  arrivalTime={tripPhase === "ONWARD" ? onwardArrivalTime : returnArrivalTime}
                  setArrivalTime={tripPhase === "ONWARD" ? setOnwardArrivalTime : setReturnArrivalTime}
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
                    uniqueAirlines={[
                      ...new Set(
                        (tripPhase === "ONWARD" ? flightData.ONWARD : flightData.RETURN)?.map(
                          (ticket) => ticket.sI[0].fD.aI.name
                        ) || []
                      ),
                    ]}
                    selectedAirlines={tripPhase === "ONWARD" ? onwardSelectedAirlines : returnSelectedAirlines}
                    setSelectedAirlines={tripPhase === "ONWARD" ? setOnwardSelectedAirlines : setReturnSelectedAirlines}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          {currentTickets && currentTickets.length > 0 ? (
            <>
              <div>
                {tripPhase == "ONWARD" ? (
                  <>
                    <h6 className="pb-10">Departure to {departureFrom}</h6>
                  </>
                ) : (
                  <h6 className="pb-10">Return from {arrivalTo}</h6>
                )}
              </div>
              <div className="box-list-flights box-list-flights-2">
                {currentTickets.map((ticket: any) => (
                  <DomesticRoundTripTicketCard
                    ticket={ticket}
                    handleTicketSelected={handleTicketSelected}
                    tripPhase={tripPhase}
                    selectedOnwardTicket={selectedOnwardTicket}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-grey-500 py-12">
              <p className="text-xl font-semibold">No results found</p>
              <p className="text-sm mt-2 text-grey-400">
                Try adjusting your filters or search criteria.
              </p>
            </div>
          )}
        </div>
      </div>
      {selectedOnwardTicket && tripPhase === "RETURN" && (
        <div
          className="items-center p-3 border border-yellow-300 rounded-md mb-4 shadow-sm"
          style={{
            position: "sticky",
            bottom: "0px",
            zIndex: 10,
            background: "#1a1a2e",
            width: "100%",
          }}
        >
          <div className="row">
            <div className="col-lg-11">
              {/* {selectedOnwardTicket?.ticket?.sI?.map(
              (segment: any, index: number) => (
                <div key={index} className="mb-2 flex">
                  <img
                    style={{ width: "35px", height: "35px", padding: "5px" }}
                    src={`/assets/imgs/airlines/${segment[
                      "fD"
                    ].aI.code.toLowerCase()}.png`}
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Selected Departure Flight:{" "}
                      <span className="font-normal">
                        {segment.da.city} ({segment.da.code}) →{" "}
                        {segment.aa.city} ({segment.aa.code})
                      </span>
                    </p>
                    <p className="text-xs text-white">
                      Departure: {dayjs(segment.dt).format("hh:mm A")}{" "}
                      {"    |    "}
                      Arrival: {dayjs(segment.at).format("hh:mm A")}{" "}
                      {"    |    "}
                      Duration: {Math.floor(segment.duration / 60)}h{" "}
                      {segment.duration % 60}m
                    </p>
                  </div>
                </div>
              )
            )} */}
              <div>
                <p className="text-sm font-semibold text-white mb-2">
                  Selected Departure Flight
                </p>
                <div className="flex justify-evenly">
                  {selectedOnwardTicket?.ticket?.sI?.map(
                    (segment: any, index: number) => (
                      <div
                        key={index}
                        className="mb-2 w-[50%] justify-around items-center border border-white rounded px-2 py-0.5 flex"
                        style={{ margin: "2px", width: "50%" }}
                      >
                        <img
                          style={{
                            width: "35px",
                            height: "35px",
                            padding: "1px",
                          }}
                          src={`/assets/imgs/airlines/${segment[
                            "fD"
                          ].aI.code.toLowerCase()}.png`}
                        />
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {segment.da.city}
                          </p>
                          {/* <p className="text-sm font-semibold text-white">
                          {segment.da.code}
                        </p> */}
                          <p className="text-sm font-semibold text-white">
                            {dayjs(segment.dt).format("hh:mm A")}
                          </p>
                        </div>
                        <div className="flex flex-col items-center">
                          <p className="text-sm font-semibold text-white">
                            {Math.floor(segment.duration / 60)}h{" "}
                            {segment.duration % 60}m
                          </p>
                          <img
                            src="https://edge.ixigo.com/st/vimaan/_next/static/media/line.9641f579.svg"
                            alt=""
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {segment.aa.city}
                          </p>
                          {/* <p className="text-sm font-semibold text-white">
                          {segment.aa.code}
                        </p> */}
                          <p className="text-sm font-semibold text-white">
                            {dayjs(segment.at).format("hh:mm A")}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <p className="text-sm text-white font-medium">
                Fare: ₹
                {/* {new Intl.NumberFormat("en-IN").format(
                selectedOnwardTicket.ticket.totalPriceList[
                  selectedOnwardTicket.selectedPriceIndex
                ].fd.ADULT.fC.BF
              )}{" "} */}
                {(() => {
                  console.log("ssss");
                  let adultCost = 0;
                  let childCost = 0;
                  let infantCost = 0;
                  if (
                    selectedOnwardTicket.ticket.totalPriceList[
                      selectedOnwardTicket.selectedPriceIndex
                    ].fd?.ADULT
                  ) {
                    if (
                      getCookie("gy_adult") !== undefined &&
                      getCookie("gy_adult") !== "Nan"
                    ) {
                      console.log("adult count state == ", adultCount);
                      adultCost =
                        adultCount *
                        selectedOnwardTicket.ticket.totalPriceList[
                          selectedOnwardTicket.selectedPriceIndex
                        ].fd?.ADULT?.fC?.NF;
                      console.log("adult total cost = ", adultCost);
                    }
                  }
                  if (
                    selectedOnwardTicket.ticket.totalPriceList[
                      selectedOnwardTicket.selectedPriceIndex
                    ].fd?.CHILD
                  ) {
                    if (
                      getCookie("gy_child") !== undefined &&
                      getCookie("gy_child") !== "Nan"
                    ) {
                      console.log("child count state == ", childCount);
                      childCost =
                        childCount *
                        selectedOnwardTicket.ticket.totalPriceList[
                          selectedOnwardTicket.selectedPriceIndex
                        ].fd?.CHILD?.fC?.NF;
                      console.log("child total cost = ", childCost);
                    }
                  }
                  if (
                    selectedOnwardTicket.ticket.totalPriceList[
                      selectedOnwardTicket.selectedPriceIndex
                    ].fd?.INFANT
                  ) {
                    if (
                      getCookie("gy_infant") !== undefined &&
                      getCookie("gy_infant") !== "Nan"
                    ) {
                      console.log("infant count state == ", infantCount);
                      infantCost =
                        infantCount *
                        selectedOnwardTicket.ticket.totalPriceList[
                          selectedOnwardTicket.selectedPriceIndex
                        ].fd?.INFANT?.fC?.NF;
                      console.log("infant total cost = ", infantCost);
                    }
                  }

                  return new Intl.NumberFormat("en-IN").format(
                    adultCost + childCost + infantCost
                  );
                })()}{" "}
                <span className="text-xs text-white-500">
                  (
                  {
                    selectedOnwardTicket.ticket.totalPriceList[
                      selectedOnwardTicket.selectedPriceIndex
                    ].fareIdentifier
                  }
                  )
                </span>
              </p>
            </div>
            <div className="col-lg-1">
              <button
                onClick={() => {
                  setSelectedOnwardTicket(null);
                  setTripPhase("ONWARD");
                  setCurrentTickets(flightData.ONWARD);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-sm text-red-500 underline hover:text-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}