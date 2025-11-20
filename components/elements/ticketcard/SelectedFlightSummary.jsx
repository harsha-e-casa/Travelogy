import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import "./ticketCard1.css";

export default function SelectedFlightSummary({
  selectedFlights,
  cities,
  isLastFlightSelected,
}) {
  const selectedIds = Object.values(selectedFlights).map(
    (flight) => flight.priceId
  );
  const flightIds = selectedIds.join(",");

  return (
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
      <p className="text-sm font-semibold text-white mb-2">Selected Flights</p>
      <div className="flex">
        {Object.entries(selectedFlights).map(([tabIndex, flight]) => (
          <div
            key={tabIndex}
            className="mb-2 w-full justify-around items-center border border-white rounded px-2 py-0.5 flex"
            style={{ margin: "2px" }}
          >
            <img
              style={{
                width: "35px",
                height: "35px",
                padding: "1px",
              }}
              src={flight.airlineLogo}
              alt={flight.flightName}
            />
            <div>
              <p className="text-sm font-semibold text-white">
                {flight.depCity} → {flight.arrCity}
              </p>
              <p className="text-sm font-semibold text-white">
                {flight.depTime} - {flight.arrTime}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm font-semibold text-white">{flight.price}</p>
            </div>
          </div>
        ))}
      </div>
      {isLastFlightSelected && (
        <div className="flex justify-end" style={{ fontSize: "14px" }}>
          <Link
            href={`/book-ticket?tcs_id=${flightIds}`}
            className="btn btn-primary br-10-imp"
          >
            Continue
          </Link>
        </div>
      )}
    </div>
  );
}
