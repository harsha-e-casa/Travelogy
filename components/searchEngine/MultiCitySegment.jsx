import React, { useState, useEffect, useRef } from "react";
import AppListSearch from "./AppListSearch";
import AppDateRage from "./AppDateRage";
import dayjs from "dayjs";

const MultiCitySegment = ({
  index,
  segment,
  updateSegment,
  removeSegment,
  disableRemove,
  addSegment,
  isLast,
}) => {
  const [showFromSearch, setShowFromSearch] = useState(false);
  const [showToSearch, setShowToSearch] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const fromRef = useRef({ from: segment.from, fromCode: segment.fromCode });
  const toRef = useRef({ to: segment.to, toCode: segment.toCode });

  const handleFromChange = (field, value) => {
    fromRef.current = {
      ...fromRef.current,
      [field]: value,
    };

    if (fromRef.current.from && fromRef.current.fromCode) {
      updateSegment(index, {
        ...segment,
        from: fromRef.current.from,
        fromCode: fromRef.current.fromCode,
      });
    }
  };

  const handleToChange = (field, value) => {
    toRef.current = {
      ...toRef.current,
      [field]: value,
    };

    if (toRef.current.to && toRef.current.toCode) {
      updateSegment(index, {
        ...segment,
        to: toRef.current.to,
        toCode: toRef.current.toCode,
      });
    }
  };

  console.log("segment ==> ", segment);

  const displayDate = segment.departureDate
    ? dayjs(segment.departureDate)
    : dayjs().add(2, "day");

  return (
    <div
      className="flex items-start flex-wrap"
      style={{ alignItems: "center" }}
    >
      {/* From */}
      <div className="text_start b_right_2px g_w_1 css_pointer relative box_left_ddr1">
        <div onClick={() => setShowFromSearch(!showFromSearch)}>
          <div className="pt-2 pl-6 pb-2 text-xl-small text-gray-500">From</div>
          <div className="pl-6 relative" style={{ paddingBottom: "10px" }}>
            <h6 className="font_bold text-black tracking-wide">
              {segment.from || "Select City"}
            </h6>
            <p className="text-xl_small truncate-text">
              {segment.fromCode || "---"}
            </p>
          </div>
        </div>
        {showFromSearch && (
          <div className="searchFfromSelect searchFfromSelect_1">
            <AppListSearch
              operEngLocation={() => setShowFromSearch(false)}
              setSelectFrom={(val) => handleFromChange("from", val)}
              setSelectFromSub={(val) => handleFromChange("fromCode", val)}
            />
          </div>
        )}
      </div>

      {/* Swap Icon */}
      <div className="searchReplaceLocation mt-8">
        <svg
          onClick={() => {
            const newFrom = segment.to;
            const newFromCode = segment.toCode;
            const newTo = segment.from;
            const newToCode = segment.fromCode;
            updateSegment(index, {
              ...segment,
              from: newFrom,
              fromCode: newFromCode,
              to: newTo,
              toCode: newToCode,
            });
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
        >
          <path
            fill="#e88400"
            d="M4.993 11.016a1 1 0 0 1-.531-1.848L7.15 6.48a1 1 0 0 1 1.414 1.415l-1.121 1.12h7.55a1 1 0 0 1 0 2zm14.014 1.969a1 1 0 0 1 .531 1.848L16.85 17.52a1 1 0 1 1-1.414-1.415l1.121-1.12h-7.55a1 1 0 1 1 0-2z"
          />
        </svg>
      </div>

      {/* To */}
      <div className="text_start b_right_2px g_w_2 css_pointer relative">
        <div onClick={() => setShowToSearch(!showToSearch)}>
          <div className="pt-2 pl-6 pb-2 text-xl-small text-gray-400">To</div>
          <div className="pl-6 relative" style={{ paddingBottom: "10px" }}>
            <h6 className="font_bold text-black tracking-wide">
              {segment.to || "Select City"}
            </h6>
            <p className="text-xl_small truncate-text">
              {segment.toCode || "---"}
            </p>
          </div>
        </div>
        {showToSearch && (
          <div className="searchFfromSelect searchFfromSelect_1">
            <AppListSearch
              operEngLocation={() => setShowToSearch(false)}
              setSelectFrom={(val) => handleToChange("to", val)}
              setSelectFromSub={(val) => handleToChange("toCode", val)}
            />
          </div>
        )}
      </div>

      {/* Departure Date */}
      <div
        className="text_start b_right_2px g_w_3 css_pointer"
        style={{ paddingBottom: "13px" }}
      >
        <div
          className="flex pl-6 justify_content_space"
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          <div>
            <div className="pt-2 pb-2">{displayDate.format("dddd")}</div>
            <div>
              <span
                className="font-bold text-gray-900"
                style={{ fontSize: "20px" }}
              >
                {displayDate.format("DD")}
              </span>
              <sub className="sub_txt1" style={{ margin: "5px" }}>
                {displayDate.format("MMM")}
              </sub>
            </div>
            <div className="text_start mt-0 flex">
              <div className="txt_travelSelect3 txt_travelFrom">
                Departure Date
              </div>
            </div>
          </div>
        </div>
        {showDatePicker && (
          <AppDateRage
            openToDateRange={() => setShowDatePicker(false)}
            setDatedep={(date) =>
              updateSegment(index, {
                ...segment,
                departureDate: dayjs(date),
              })
            }
          />
        )}
      </div>

      {/* <div className="b_right_2px g_w_5 css_pointer relative box_left_ddr2"> */}
      <div style={{ display: "flex" , justifyContent: "space-around", width: "20%" }}>
        {!disableRemove && (
          <div
            onClick={() => removeSegment(index)}
            className="text-red-600 font-bold text-lg px-2 py-1 border border-red-500 rounded-full css_pointer"
            style={{ fontSize: "30px" }}
          >
            ×
          </div>
        )}
        {isLast && (
          <div
            onClick={addSegment}
            className="text-blue-600 font-semibold text-sm px-3 py-1 border border-blue-600 rounded css_pointer"
          >
            + Add City
          </div>
        )}
      </div>
      {/* </div> */}
    </div>
  );
};

export default MultiCitySegment;
