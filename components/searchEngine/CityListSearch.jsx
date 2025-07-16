import React, { useState, useEffect } from "react";
import { Select } from "antd";
// const apiListAirLineState = require("./apiListAirLineState");
import { useCities } from "../../util/HotelApi"; // or same file

const CityListSearch = ({
  setSelectFrom,
  operEngLocation,
  // setSelectFromSub,
  categoryType,
}) => {
  const { cities, loading } = useCities();
  const [filteredOptions, setFilteredOptions] = useState([]);
  const handleChange = (value) => {
    const getDtaa = value.split(",");
    // alert(getDtaa);
    const selectedCity = filteredOptions.find(
      (item) => `${item.cityName},${item.id},${item.countryName}` === value
    );

    if (selectedCity) {
      setSelectFrom({
        cityName: selectedCity.cityName,
        countryName: selectedCity.countryName,
        id: selectedCity.id,
      });
    }

    // setSelectFrom(getDtaa[0]);
    // setSelectFromSub(getDtaa[1]);
    operEngLocation();
  };
  useEffect(() => {
    if (cities.length > 0) {
      setFilteredOptions(cities);
      // setSelectFrom(cities[4]); // ✅ Immediately select the first city
    }
  }, [cities]);

  const handleSearch = (searchText) => {
    if (!searchText) {
      setFilteredOptions(cities);
      return;
    }

    const filtered = cities.filter(
      (item) =>
        item?.cityName?.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.fullRegionName?.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredOptions(filtered.slice(0, 10));
  };
  {
    !loading && cities.length === 0 && (
      <div className="p-4 text-center text-gray-500">No cities available</div>
    );
  }

  const mappedOptions = filteredOptions.map((item) => ({
    label: (
      <div>
        <div className="font-semibold text-gray-800">{item.cityName}</div>
        <div className="text-xs text-gray-500">{item.fullRegionName}</div>
      </div>
    ),

    value: `${item.cityName},${item.id},${item.countryName}`,
  }));

  const options = [
    {
      label: "Suggestions",
      options: mappedOptions,
    },
  ];

  return (
    <>
      {loading ? (
        <div className="p-4 text-center text-gray-500">Loading cities...</div>
      ) : (
        <Select
          showSearch
          onSearch={handleSearch}
          onChange={handleChange}
          options={options}
          placeholder="Select a city..."
          filterOption={false}
          style={{ width: "100%" }}
        />
      )}
    </>
  );
};
export default CityListSearch;
