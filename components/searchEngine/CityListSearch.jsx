import React, { useState, useEffect } from "react";
import { Select } from "antd";
import citiesData from "../../util/cities.json"; // adjust path as needed

const CityListSearch = ({ setSelectFrom, operEngLocation }) => {
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    setFilteredOptions(citiesData);
  }, []);

  const handleChange = (id) => {
    const selectedCity = filteredOptions.find((item) => item.id === id);
    if (selectedCity) {
      setSelectFrom({
        cityName: selectedCity.cityName,
        countryName: selectedCity.countryName,
        id: selectedCity.id,
      });
      operEngLocation();
    }
  };

  const handleSearch = (searchText) => {
    if (!searchText) {
      setFilteredOptions(citiesData);
      return;
    }

    const filtered = citiesData.filter(
      (item) =>
        item.cityName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.fullRegionName.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredOptions(filtered.slice(0, 10));
  };

  const mappedOptions = filteredOptions.map((item) => ({
    label: (
      <div>
        <div className="font-semibold text-gray-800">{item.cityName}</div>
        <div className="text-xs text-gray-500">{item.fullRegionName}</div>
      </div>
    ),
    value: item.id,
  }));

  const options = [
    {
      label: "Suggestions",
      options: mappedOptions,
    },
  ];

  return (
    <>
      <Select
        showSearch
        onSearch={handleSearch}
        onChange={handleChange}
        options={options}
        placeholder="Select a city..."
        filterOption={false}
        style={{ width: "100%" }}
      />
      {filteredOptions.length === 0 && (
        <div className="p-4 text-center text-gray-500">No results found</div>
      )}
    </>
  );
};

export default CityListSearch;
