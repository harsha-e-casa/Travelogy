"use client";

import React, { useState } from "react";
import { DateRange, Calendar } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const FilterSearch = () => {
  const [tripType, setTripType] = useState("oneway");

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);

  const formattedDeparture = format(dateRange[0].startDate, "dd MMM yyyy");
  const formattedReturn = dateRange[0].endDate
    ? format(dateRange[0].endDate, "dd MMM yyyy")
    : "";

  const handleRangeChange = (ranges) => {
    setDateRange([ranges.selection]);
  };

  return (
    <div style={{ backgroundImage: "url('/assets/imgs/home_bg.webp')" }}>
      <div className="flight-search-container">
        {/* Tabs */}
        <div className="tabs">
          {" "}
          <div className="tab active">
            <img src="/assets/imgs/airplane_1604953.svg" alt="Flights" />
            <span>Flights</span>
          </div>
          <div className="tab">
            <img src="/assets/imgs/travel_16190539.svg" alt="Hotels" />
            <span>Hotels</span>
          </div>
          <div className="tab">
            <img src="/assets/imgs/duty-free_2664702.svg" alt="Holiday" />
            <span>Holiday package</span>
          </div>
          <div className="tab">
            <img src="/assets/imgs/safe-flight_1585574.svg" alt="Insurance" />
            <span>Travel Insurance</span>
          </div>
          <div className="tab">
            <img src="/assets/imgs/passport_1257113.svg" alt="Visa" />
            <span>Visa</span>
          </div>
        </div>

        {/* Form Box */}
        <div className="form-box">
          {/* Trip Types */}
          <div className="trip-types">
            {["oneway", "round", "multi"].map((type) => (
              <label
                key={type}
                className={`trip-type-btn ${tripType === type ? "active" : ""}`}
              >
                <input
                  type="radio"
                  name="tripType"
                  value={type}
                  checked={tripType === type}
                  onChange={() => {
                    setTripType(type);
                    setShowCalendar(false);
                  }}
                />
                {type === "oneway" && "One way"}
                {type === "round" && "Round Trip"}
                {type === "multi" && "Multi City"}
              </label>
            ))}
          </div>

          {/* Input Grid */}
          <div className="input-grid">
            <div className="input-block">
              <label>From</label>
              <h3>Delhi</h3>
              <p>DEL, Delhi Airport India</p>
            </div>

            <div className="input-block">
              <label>To</label>
              <h3>Bengaluru</h3>
              <p>BLR, Bengaluru International...</p>
            </div>

            <div className="input-block relative">
              <label>{tripType === "round" ? "Dates" : "Departure Date"}</label>
              <div
                className="datepicker-input"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                {tripType === "round"
                  ? `${formattedDeparture} - ${
                      formattedReturn || "Return Date"
                    }`
                  : formattedDeparture}
              </div>
              {showCalendar && (
                <div className="calendar-popup">
                  {tripType === "round" ? (
                    <DateRange
                      editableDateInputs={true}
                      onChange={handleRangeChange}
                      moveRangeOnFirstSelection={false}
                      ranges={dateRange}
                      minDate={new Date()}
                    />
                  ) : (
                    <Calendar
                      date={dateRange[0].startDate}
                      onChange={(date) =>
                        setDateRange([
                          {
                            ...dateRange[0],
                            startDate: date,
                            endDate: null,
                          },
                        ])
                      }
                      minDate={new Date()}
                    />
                  )}
                </div>
              )}
            </div>

            <div className="input-block">
              <label>Traveller / Class</label>
              <h3>1 Traveller</h3>
              <p>Economy / Premium Economy</p>
            </div>
          </div>

          {/* Search Button */}
          <button className="search-btn">SEARCH</button>
        </div>
      </div>
    </div>
  );
};

export default FilterSearch;
