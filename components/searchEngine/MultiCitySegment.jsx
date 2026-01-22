import React, { useState, useEffect, useRef } from "react";
import AppListSearch from "./AppListSearch";
import AppDateRage from "./AppDateRage";
import AppDateRangeFlight from "./AppDateRangeFlight";
import dayjs from "dayjs";
import { Tooltip } from "antd"; // Import Tooltip

const MultiCitySegment = ({
  index,
  segment,
  updateSegment,
  removeSegment,
  addSegment,
  showAdd,
  showRemove,
  openSection,
  onToggleSection,
  minDate,
  onSegmentErrorChange, // New prop
  multiCityCloseAllFieldsFn,
}) => {
  const fromRef = useRef({ from: segment.from, fromCode: segment.fromCode });
  const toRef = useRef({ to: segment.to, toCode: segment.toCode });

  const [fromError, setFromError] = useState(""); // New state
  const [toError, setToError] = useState(""); // New state

  useEffect(() => {
    // Initial validation when component mounts or segment changes
    if (segment.from && segment.to && segment.from === segment.to) {
      setFromError("From and To cities cannot be the same.");
      setToError("From and To cities cannot be the same.");
      onSegmentErrorChange(index, true); // Report error to parent
    } else {
      setFromError("");
      setToError("");
      onSegmentErrorChange(index, false); // Report no error to parent
    }
  }, [segment.from, segment.to, index, onSegmentErrorChange]);

  const handleFromChange = (field, value) => {
    fromRef.current = {
      ...fromRef.current,
      [field]: value,
    };

    const newSegment = {
      ...segment,
      from: field === "from" ? value : fromRef.current.from,
      fromCode: field === "fromCode" ? value : fromRef.current.fromCode,
    };

    if (newSegment.from && newSegment.to && newSegment.from === newSegment.to) {
      setFromError("From and To cities cannot be the same.");
      setToError("From and To cities cannot be the same.");
      onSegmentErrorChange(index, true);
    } else {
      setFromError("");
      setToError("");
      onSegmentErrorChange(index, false);
    }

    if (fromRef.current.from && fromRef.current.fromCode) {
      updateSegment(index, newSegment);
    }
  };

  const handleToChange = (field, value) => {
    toRef.current = {
      ...toRef.current,
      [field]: value,
    };

    const newSegment = {
      ...segment,
      to: field === "to" ? value : toRef.current.to,
      toCode: field === "toCode" ? value : toRef.current.toCode,
    };

    if (newSegment.from && newSegment.to && newSegment.from === newSegment.to) {
      setFromError("From and To cities cannot be the same.");
      setToError("From and To cities cannot be the same.");
      onSegmentErrorChange(index, true);
    } else {
      setFromError("");
      setToError("");
      onSegmentErrorChange(index, false);
    }

    if (toRef.current.to && toRef.current.toCode) {
      updateSegment(index, newSegment);
    }
  };

  const displayDate = segment.departureDate
    ? dayjs(segment.departureDate)
    : dayjs().add(2, "day");

  const isOpen = (type) =>
    openSection.segmentIndex === index && openSection.type === type;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onToggleSection(null, null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onToggleSection]);

  useEffect(() => {
    // Check if From or To is empty or default placeholder
    const hasInvalidCity =
      !segment.from ||
      segment.from === "Select City" ||
      !segment.to ||
      segment.to === "Select City";

    // Send validity to parent
    onSegmentErrorChange(index, hasInvalidCity);
  }, [segment.from, segment.to, index, onSegmentErrorChange]);

  return (
    <div
      className="flex items-start flex-wrap"
      style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}
    >
      {/* From */}
      <div className="text_start b_right_2px g_w_1 css_pointer relative box_left_ddr1 country_from" onClick={() => multiCityCloseAllFieldsFn()}>
        <div onClick={() => onToggleSection(index, "from")}>
          <div className="pt-2 pl-6 pb-2 text-xl-small text-gray-500">From</div>
          <div className="pl-6 pb-4 relative">
            <h2 className="text_4xl font_bold text-black tracking-wide">
              {segment.from || "Select City"}
            </h2>
            <p className="text-xl_small truncate-text">
              {segment.fromCode || "---"}
            </p>
          </div>
        </div>
        {isOpen("from") && (
          <div className="searchFfromSelect searchFfromSelect_1">
            <AppListSearch
              operEngLocation={() => onToggleSection(null, null)}
              setSelectFrom={(val) => handleFromChange("from", val)}
              setSelectFromSub={(val) => handleFromChange("fromCode", val)}
            />
          </div>
        )}
        <Tooltip
          className="flex shadow-md z-10"
          placement="bottom"
          title={fromError}
          open={!!fromError}
          arrow={{ pointAtCenter: true }}
          overlayInnerStyle={{
            backgroundColor: "#ffeaea",
            color: "#ff4d4f",
            fontWeight: 500,
          }}
        ></Tooltip>
      </div>

      {/* Swap Icon */}
      <div className="searchReplaceLocation">
        <svg
          onClick={() => {
            const newFrom = segment.to;
            const newFromCode = segment.toCode;
            const newTo = segment.from;
            const newToCode = segment.fromCode;

            const updatedSegment = {
              ...segment,
              from: newFrom,
              fromCode: newFromCode,
              to: newTo,
              toCode: newToCode,
            };

            updateSegment(index, updatedSegment);

            // Re-validate after swap
            if (
              updatedSegment.from &&
              updatedSegment.to &&
              updatedSegment.from === updatedSegment.to
            ) {
              setFromError("From and To cities cannot be the same.");
              setToError("From and To cities cannot be the same.");
              onSegmentErrorChange(index, true);
            } else {
              setFromError("");
              setToError("");
              onSegmentErrorChange(index, false);
            }
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
      <div className="text_start b_right_2px g_w_2 css_pointer relative country_to" onClick={() => multiCityCloseAllFieldsFn()}>
        <div onClick={() => onToggleSection(index, "to")}>
          <div className="pt-2 pl-6 pb-2 text-xl-small text-gray-400">To</div>
          <div className="pl-6 pb-4 relative">
            <h2 className="text_4xl font_bold text-black tracking-wide">
              {segment.to || "Select City"}
            </h2>
            <p className="text-xl_small truncate-text">
              {segment.toCode || "---"}
            </p>
          </div>
        </div>
        {isOpen("to") && (
          <div className="searchFfromSelect searchFfromSelect_1">
            <AppListSearch
              operEngLocation={() => onToggleSection(null, null)}
              setSelectFrom={(val) => handleToChange("to", val)}
              setSelectFromSub={(val) => handleToChange("toCode", val)}
            />
            <Tooltip
              className="flex shadow-md z-50"
              placement="bottom"
              title={toError}
              open={!!toError}
              arrow={{ pointAtCenter: true }}
              overlayInnerStyle={{
                backgroundColor: "#ffeaea",
                color: "#ff4d4f",
                fontWeight: 500,
              }}
            ></Tooltip>
          </div>
        )}
      </div>

      <div
        className="text_start b_right_2px g_w_3 css_pointer"
        onClick={() => multiCityCloseAllFieldsFn()}
      >
        <div
          className="flex pl-6 justify_content_space"
          onClick={() => onToggleSection(index, "date")}
        >
          <div>
            <div className="pt-2 pb-2">{displayDate.format("dddd")}</div>
            <div>
              <span className="text-4xl font-bold text-gray-900">
                {displayDate.format("DD")}
              </span>
              <sub className="sub_txt1">
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
        {isOpen("date") && (
          <AppDateRangeFlight
            openToDateRange={() => onToggleSection(null, null)}
            setDate={(date) =>
              updateSegment(index, {
                ...segment,
                departureDate: dayjs(date),
              })
            }
            minDate={minDate ? dayjs(minDate) : null}
            value={segment.departureDate ? dayjs(segment.departureDate) : null}
          />
        )}
        {showRemove && (
          <div
            onClick={() => removeSegment(index)}
            className="text-red-600 font-bold text-lg css_pointer"
            style={{ position: "absolute", top: "0px", right: "0px", fontSize: "35px", cursor: "pointer", zIndex: 10 }}
          >
            ×
          </div>
        )}
      </div>

      {/* Actions */}
      {showAdd && (
        <div style={{ width: "65%", display: "flex", justifyContent: "center", marginTop: "10px" }}>
          <div
            onClick={addSegment}
            className="text-blue-600 font-semibold text-sm px-3 py-1 border border-blue-600 rounded css_pointer"
            style={{ width: "100%", textAlign: "center" }}
          >
            + Add City
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiCitySegment;
