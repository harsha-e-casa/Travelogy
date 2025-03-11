"use client";

import React, { useState } from "react";
import { DateRange, Calendar } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import EngineTabs from "../searchEngine/engineHeader";
import { AutoComplete, Button } from "antd";
import { SwapOutlined } from "@ant-design/icons";
const airports = [
  {
    location: "Delhi",
    code: "DEL",
    name: "Indira Gandhi International Airport, Delhi",
  },
  {
    location: "Mumbai",
    code: "BOM",
    name: "Chhatrapati Shivaji Maharaj International Airport, Mumbai",
  },
  {
    location: "Bengaluru",
    code: "BLR",
    name: "Kempegowda International Airport, Bengaluru",
  },
  {
    location: "Chennai",
    code: "MAA",
    name: "Chennai International Airport, Chennai",
  },
  {
    location: "Hyderabad",
    code: "HYD",
    name: "Rajiv Gandhi International Airport, Hyderabad",
  },
  {
    location: "Kolkata",
    code: "CCU",
    name: "Netaji Subhas Chandra Bose International Airport, Kolkata",
  },
  {
    location: "Ahmedabad",
    code: "AMD",
    name: "Sardar Vallabhbhai Patel International Airport, Ahmedabad",
  },
  {
    location: "Goa",
    code: "GOI",
    name: "Goa International Airport, Goa",
  },
  {
    location: "Pune",
    code: "PNQ",
    name: "Pune Airport, Pune",
  },
  {
    location: "Jaipur",
    code: "JAI",
    name: "Jaipur International Airport, Jaipur",
  },
];

// Convert to options with custom render
const airportOptions = airports.map((airport) => ({
  label: (
    <div>
      {airport.location}
      <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
        {airport.code}, {airport.name}
      </p>
    </div>
  ),
  value: airport.location,
}));
const SearchEngine = () => {
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

  const [fromAirport, setFromAirport] = useState("");
  const [toAirport, setToAirport] = useState("");

  const swapAirports = () => {
    setFromAirport(toAirport);
    setToAirport(fromAirport);
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
              {/* <div className="input-grid airport-fields"> */}
              <div className="input-block">
                <label>From</label>
                <AutoComplete
                  style={{ width: "100%" }}
                  options={airportOptions}
                  value={fromAirport}
                  onChange={setFromAirport}
                  placeholder="Enter departure airport"
                  filterOption={(inputValue, option) =>
                    option?.value
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                  }
                />
                <Button
                  className="swap-button-container"
                  icon={<SwapOutlined />}
                  onClick={swapAirports}
                  type="default"
                  shape="circle"
                />
              </div>

              <div className="input-block">
                <label>To</label>
                <AutoComplete
                  style={{ width: "100%" }}
                  options={airportOptions}
                  value={toAirport}
                  onChange={setToAirport}
                  placeholder="Enter arrival airport"
                  filterOption={(inputValue, option) =>
                    option?.value
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                  }
                />
              </div>
              {/* </div> */}

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
                    <AutoComplete
                      style={{ width: "100%" }}
                      options={airportOptions}
                      value={city.fromAirport || ""}
                      onChange={(value) => {
                        const updated = [...multiCities];
                        updated[index].fromAirport = value;
                        setMultiCities(updated);
                      }}
                      placeholder="Enter departure airport"
                      filterOption={(inputValue, option) =>
                        option?.value
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                      }
                    />
                    <Button
                      className="swap-button-container"
                      icon={<SwapOutlined />}
                      onClick={() => {
                        const updated = [...multiCities];
                        const temp = updated[index].fromAirport;
                        updated[index].fromAirport = updated[index].toAirport;
                        updated[index].toAirport = temp;
                        setMultiCities(updated);
                      }}
                      type="default"
                      shape="circle"
                    />
                  </div>

                  <div className="input-block">
                    <label>To</label>
                    <AutoComplete
                      style={{ width: "100%" }}
                      options={airportOptions}
                      value={city.toAirport || ""}
                      onChange={(value) => {
                        const updated = [...multiCities];
                        updated[index].toAirport = value;
                        setMultiCities(updated);
                      }}
                      placeholder="Enter arrival airport"
                      filterOption={(inputValue, option) =>
                        option?.value
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                      }
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
                    <label>Traveller / Class</label>
                    <h3>1 Traveller</h3>
                    <p>Economy / Premium Economy</p>
                  </div>

                  {index === multiCities.length - 1 && (
                    <div className="">
                      <button
                        className="add-city-btn"
                        onClick={handleAddMultiCity}
                      >
                        + Add City
                      </button>
                    </div>
                  )}
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

export default SearchEngine;
