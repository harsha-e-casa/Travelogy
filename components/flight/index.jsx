"use client";

import React, { useState } from "react";
import { DateRange, Calendar } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { AutoComplete, Button } from "antd";
import ListShow from "./ListShow.jsx";
import { SwapOutlined } from "@ant-design/icons";
import "./FromSearch.css";

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
  const [showFrom, setShowFrom] = useState(true);

  const openFrom = () => {
    setShowFrom(false);
  };

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
        <>
        </>
  );
};

export default SearchEngine;
