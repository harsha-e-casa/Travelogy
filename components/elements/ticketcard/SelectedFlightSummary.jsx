import React, { useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import { Drawer } from "antd";
import "./ticketCard1.css";

export default function SelectedFlightSummary({
  selectedFlights,
  cities,
  isLastFlightSelected,
  isMobile = false,
}) {
  const [showDetails, setShowDetails] = useState(false);

  const selectedIds = Object.values(selectedFlights).map(
    (flight) => flight.priceId
  );
  const flightIds = selectedIds.join(",");

  const selectedFlightsArray = Object.entries(selectedFlights);
  const totalFlights = selectedFlightsArray.length;

  // Calculate total price
  const totalPrice = selectedFlightsArray.reduce((sum, [_, flight]) => {
    const price = typeof flight.price === 'string'
      ? parseFloat(flight.price.replace(/,/g, ''))
      : flight.price;
    return sum + (isNaN(price) ? 0 : price);
  }, 0);


  // Mobile View
  if (isMobile) {
    return (
      <>
        <div
          className="mobile-view p-3 cursor-pointer"
          style={{
            position: "sticky",
            bottom: 0,
            zIndex: 100,
            backgroundColor: "#f8f9fa",
            borderTop: "2px solid #dee2e6",
            width: "100%",
            boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.15)",
          }}
          onClick={() => setShowDetails(true)}
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                {totalFlights} Flight{totalFlights > 1 ? 's' : ''} Selected
              </span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-gray-800">
                  {selectedFlightsArray.map(([_, flight], idx) => (
                    <span key={idx}>
                      {flight.depCityCode}
                      {idx < selectedFlightsArray.length - 1 ? ' → ' : ''}
                    </span>
                  ))}
                  {selectedFlightsArray.length > 0 && ` → ${selectedFlightsArray[selectedFlightsArray.length - 1][1].arrCityCode}`}
                </span>
                <span className="text-xs text-blue-600 font-medium ml-2">(View Details)</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-lg font-bold text-blue-600">
                ₹{new Intl.NumberFormat("en-IN").format(totalPrice)}
              </span>
            </div>
          </div>
        </div>

        <Drawer
          title="Selected Flights"
          placement="bottom"
          onClose={() => setShowDetails(false)}
          open={showDetails}
          height="70vh"
          className="mobile-flight-details-drawer"
          styles={{
            body: { padding: '16px', maxHeight: 'calc(70vh - 55px)', overflowY: 'auto' },
            header: { padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }
          }}
        >
          <div className="flex flex-col gap-4">
            {selectedFlightsArray.map(([tabIndex, flight]) => (
              <div
                key={tabIndex}
                className="flex flex-col gap-3 pb-4 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={flight.airlineLogo}
                    alt={flight.flightName}
                    className="w-10 h-10 object-contain p-1 bg-gray-50 rounded"
                    onError={(e) => {
                      e.target.src = "/assets/imgs/page/homepage1/flight.png";
                    }}
                  />
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{flight.flightName}</p>
                    <p className="text-xs text-gray-500">{flight.flightNumber}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-800">{flight.depTime}</p>
                    <p className="text-xs font-bold text-gray-500">{flight.depCityCode}</p>
                    <p className="text-[10px] text-gray-400">{flight.depCity}</p>
                  </div>

                  <div className="flex flex-col items-center gap-1 w-1/3">
                    <div className="w-full h-[1px] bg-gray-300 relative">
                      <div className="absolute right-0 top-[-3px] w-0 h-0 border-l-[6px] border-l-transparent border-b-[6px] border-b-gray-300 rotate-[-90deg]"></div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-800">{flight.arrTime}</p>
                    <p className="text-xs font-bold text-gray-500">{flight.arrCityCode}</p>
                    <p className="text-[10px] text-gray-400">{flight.arrCity}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Price:</span>
                  <span className="text-lg font-bold text-blue-600">₹{typeof flight.price === 'string' ? flight.price : new Intl.NumberFormat("en-IN").format(flight.price)}</span>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-3 border-t-2 border-gray-200">
              <span className="text-base font-bold text-gray-800">Total Price:</span>
              <span className="text-xl font-bold text-blue-600">₹{new Intl.NumberFormat("en-IN").format(totalPrice)}</span>
            </div>

            {isLastFlightSelected && (
              <Link
                href={`/book-ticket?tcs_id=${flightIds}`}
                className="btn btn-primary br-10-imp w-full text-center"
                style={{ marginTop: '12px' }}
              >
                Continue to Booking
              </Link>
            )}
          </div>
        </Drawer>
      </>
    );
  }

  // Desktop View (existing design)
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
        {selectedFlightsArray.map(([tabIndex, flight]) => (
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
              <p className="text-sm font-semibold text-white">{typeof flight.price === 'string' ? flight.price : new Intl.NumberFormat("en-IN").format(flight.price)}</p>
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
