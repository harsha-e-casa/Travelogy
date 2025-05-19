import React, { useState, useContext } from "react";
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

  const handleTicketSelected = (ticket, selectedPriceIndex) => {
    if (tripPhase === "ONWARD") {
      console.log("ticketttttttttttttttt ", ticket);
      console.log("ticketttttttttttttttt ", selectedPriceIndex);
      setSelectedOnwardTicket({ ticket, selectedPriceIndex }); // save selected onward
      setCurrentTickets(flightData.RETURN); // move to return flights
      setTripPhase("RETURN");
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
      {selectedOnwardTicket && tripPhase === "RETURN" && (
        <div className="flex justify-between items-center p-4 bg-yellow-50 border border-yellow-300 rounded-md mb-4 shadow-sm">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-gray-800">
              Selected Departure Flight:{" "}
              <span className="font-normal">
                {selectedOnwardTicket.ticket.sI[0].da.city} (
                {selectedOnwardTicket.ticket.sI[0].da.code}) →
                {selectedOnwardTicket.ticket.sI[0].aa.city} (
                {selectedOnwardTicket.ticket.sI[0].aa.code})
              </span>
            </p>
            <p className="text-xs text-gray-600">
              Departure:{" "}
              {dayjs(selectedOnwardTicket.ticket.sI[0].dt).format("hh:mm A")} |
              Arrival: {dayjs(selectedOnwardTicket.ticket.sI[0].at).format("hh:mm A")}{" "}
              | Duration: {Math.floor(selectedOnwardTicket.ticket.sI[0].duration / 60)}
              h {selectedOnwardTicket.ticket.sI[0].duration % 60}m
            </p>
            <p className="text-sm text-gray-700 font-medium">
              Fare: ₹
              {new Intl.NumberFormat("en-IN").format(
                selectedOnwardTicket.ticket.totalPriceList[
                  selectedOnwardTicket.selectedPriceIndex
                ].fd.ADULT.fC.BF
              )}{" "}
              <span className="text-xs text-gray-500">
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
      )}

      {/* render onward and return ticket */}
      {currentTickets && currentTickets.length > 0 ? (
        <>
          <div>
            {tripPhase == "ONWARD" ? (
              <>
                <h6>Departure to {departureFrom}</h6>
              </>
            ) : (
              <h6>Return from {arrivalTo}</h6>
            )}
          </div>
          <div className="box-list-flights box-list-flights-2">
            {currentTickets.map((ticket: any) => (
              <DomesticRoundTripTicketCard
                ticket={ticket}
                handleTicketSelected={handleTicketSelected}
                tripPhase={tripPhase}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 py-12">
          <p className="text-xl font-semibold">No results found</p>
          <p className="text-sm mt-2 text-gray-400">
            Try adjusting your filters or search criteria.
          </p>
        </div>
      )}
    </>
  );
}
