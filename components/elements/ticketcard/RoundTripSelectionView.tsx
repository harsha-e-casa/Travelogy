import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "@/util/AppContext";
import dayjs from "dayjs";
import DomesticRoundTripTicketCard from "./DomesticRoundTripTicketCard";
// import TicketCard1 from "./TicketCard1";

export default function RoundTripSelectionView({ flightData }: any) {
  const { getCookie } = useContext(AppContext);
  const departureFrom = getCookie("gy_da_str");
  const arrivalTo = getCookie("gy_aa_str");
  const [selectedOnwardTicket, setSelectedOnwardTicket] = useState(null);
  const [currentTickets, setCurrentTickets] = useState(flightData.ONWARD);
  const [tripPhase, setTripPhase] = useState<"ONWARD" | "RETURN">("ONWARD");

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
