"use client";

import React, { useState } from "react";
import { DateRange, Calendar } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import EngineTabs from "../searchEngine/engineHeader";

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
  const [multiCities, setMultiCities] = useState([
    {
      from: "",
      to: "",
      departure: null,
      class: "",
    },
  ]);
  const [activeCalendar, setActiveCalendar] = useState(null);

  const formattedDeparture = format(dateRange[0].startDate, "dd MMM yyyy");
  const formattedReturn = dateRange[0].endDate
    ? format(dateRange[0].endDate, "dd MMM yyyy")
    : "";

  const handleRangeChange = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const handleAddMultiCity = () => {
    setMultiCities([
      ...multiCities,
      {
        from: "",
        to: "",
        departure: null,
        class: "",
      },
    ]);
  };
  const toggleCalendar = (index) => {
    setActiveCalendar(activeCalendar === index ? null : index);
  };
  return (
    <div style={{ backgroundImage: "url('/assets/imgs/home_bg.webp')" }}>
      <div className="flight-search-container">
        <EngineTabs />
        <div className="form-box">
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

          {tripType !== "multi" && (
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
                <label>Departure Date</label>
                <div
                  className="datepicker-input"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  {formattedDeparture}
                </div>
                {showCalendar && tripType !== "round" && (
                  <div className="calendar-popup">
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
                  </div>
                )}
              </div>

              {tripType === "round" && (
                <div className="input-block relative">
                  <label>Return Date</label>
                  <div
                    className="datepicker-input"
                    onClick={() => setShowCalendar(!showCalendar)}
                  >
                    {formattedReturn || "Return Date"}
                  </div>
                  {showCalendar && (
                    <div className="calendar-popup">
                      <DateRange
                        editableDateInputs={true}
                        onChange={handleRangeChange}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                        minDate={new Date()}
                      />
                    </div>
                  )}
                </div>
              )}

              {tripType === "oneway" && (
                <div className="input-block note">
                  <label>Return Date</label>
                  <p style={{ color: "#007bff" }}>
                    Add return date for bigger discount!
                  </p>
                </div>
              )}

              <div className="input-block">
                <label>Traveller / Class</label>
                <h3>1 Traveller</h3>
                <p>Economy / Premium Economy</p>
              </div>
            </div>
          )}

          {/* Multi City Input Blocks */}
          {tripType === "multi" && (
            <>
              {multiCities.map((city, index) => (
                <div className="input-grid" key={index}>
                  <div className="input-block">
                    <label>From</label>
                    <input
                      type="text"
                      placeholder="Enter city"
                      value={city.from}
                      onChange={(e) => {
                        const updated = [...multiCities];
                        updated[index].from = e.target.value;
                        setMultiCities(updated);
                      }}
                    />
                  </div>

                  <div className="input-block">
                    <label>To</label>
                    <input
                      type="text"
                      placeholder="Enter city"
                      value={city.to}
                      onChange={(e) => {
                        const updated = [...multiCities];
                        updated[index].to = e.target.value;
                        setMultiCities(updated);
                      }}
                    />
                  </div>

                  <div className="input-block relative">
                    <label>Departure</label>
                    <div
                      className="datepicker-input"
                      onClick={() => toggleCalendar(index)}
                    >
                      {city.departure
                        ? format(new Date(city.departure), "dd MMM yyyy")
                        : "Select Date"}
                    </div>

                    {activeCalendar === index && (
                      <div className="calendar-popup">
                        <Calendar
                          date={
                            city.departure
                              ? new Date(city.departure)
                              : new Date()
                          }
                          onChange={(date) => {
                            const updated = [...multiCities];
                            updated[index].departure = date;
                            setMultiCities(updated);
                            setActiveCalendar(null);
                          }}
                          minDate={new Date()}
                        />
                      </div>
                    )}
                  </div>

                  <div className="input-block">
                    <label>Class</label>
                    <select
                      value={city.class}
                      onChange={(e) => {
                        const updated = [...multiCities];
                        updated[index].class = e.target.value;
                        setMultiCities(updated);
                      }}
                    >
                      <option value="">Select</option>
                      <option value="economy">Economy</option>
                      <option value="business">Business</option>
                    </select>
                  </div>
                  <div className="">
                    <button
                      className="add-city-btn"
                      onClick={handleAddMultiCity}
                    >
                      + Add City
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

          <button className="search-btn">SEARCH</button>
        </div>
      </div>
    </div>
  );
};

export default FilterSearch;
