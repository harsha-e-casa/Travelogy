import React, { useState } from "react";
import { Select } from "antd";
const apiListAirLineState = require("./apiListAirLineState");

const CityListSearch = ({
  setSelectFrom,
  operEngLocation,
  // setSelectFromSub,
  categoryType,
}) => {
  const [filteredOptions, setFilteredOptions] = useState(apiListAirLineState);

  const handleChange = (value) => {
    const getDtaa = value.split(",");
    // alert(getDtaa);

    setSelectFrom(getDtaa[0]);
    // setSelectFromSub(getDtaa[1]);
    operEngLocation();
  };

  const handleSearch = (searchText) => {
    if (!searchText) {
      setFilteredOptions(apiListAirLineState); // Show all if input is cleared
      return;
    }

    const filtered = apiListAirLineState.filter(
      (item) =>
        item?.key?.toLowerCase().startsWith(searchText.toLowerCase()) ||
        item?.city?.toLowerCase().startsWith(searchText.toLowerCase())
    );

    setFilteredOptions(filtered.slice(0, 10)); // Show top 10 only
  };

  const mappedOptions = filteredOptions.map((item) => ({
    label: (
      <div className="inline_flex">
        {!categoryType && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#000"
              d="M3 21v-2h18v2zm1.75-5L1 9.75l2.4-.65l2.8 2.35l3.5-.925l-5.175-6.9l2.9-.775L14.9 9.125l4.25-1.15q.8-.225 1.513.187t.937 1.213t-.187 1.513t-1.213.937z"
            />
          </svg>
        )}
        <div>
          {categoryType === "hotel" ? (
            <div>{item.city}</div>
          ) : (
            <>
              <div>
                {item.city} ({item.country})
              </div>
              <div>{item.name}</div>
            </>
          )}
        </div>
      </div>
    ),
    value: `${item.city},${item.key},${item.country}`,
  }));

  const options = [
    {
      label: <span>Suggestion</span>,
      title: "manager",
      options: mappedOptions,
    },
  ];

  return (
    <Select
      dropdownClassName="custom-select-dropdown" // custom class name for dropdown styling
      autoFocus
      showSearch
      open={true}
      style={{ width: "100%" }}
      onSearch={handleSearch}
      onChange={handleChange}
      options={options}
      placeholder="Select an airport..."
      filterOption={false} // disables built-in search
    />
  );
};
export default CityListSearch;
