import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const AppDateRangeFlight = ({ openToDateRange, setDate, minDate, value }) => {
  const [dates, setDates] = useState([]);
  const [open, setOpen] = useState(true);

  const handleChange = (dates, dateString) => {
    if (dateString) {
      setDate(dateString);
      openToDateRange();
      setOpen(false);
    } else {
      setDate(null);
    }
  };

  const dateFormat = "DD-MM-YYYY";

  const disabledDate = (current) => {
    if (minDate) {
      return current && current < dayjs(minDate).startOf("day");
    }
    return current && current < dayjs().startOf("day");
  };

  return (
    <>
      {open ? (
        <div className="custome-date-rage" style={{ transform: "scale(0.85)", transformOrigin: "top left", width: "260px", position: "absolute", zIndex: 1000 }}>
          <style>
            {`
              .small-flight-datepicker .ant-picker-content th,
              .small-flight-datepicker .ant-picker-content td {
                padding: 2px 0 !important;
                height: 24px !important;
              }
              .small-flight-datepicker .ant-picker-header {
                padding: 4px 8px !important;
                margin-bottom: 0 !important;
              }
              .small-flight-datepicker .ant-picker-body {
                padding: 4px 8px !important;
              }
              .small-flight-datepicker .ant-picker-date-panel .ant-picker-content {
                height: 220px !important;
              }
            `}
          </style>
          <DatePicker
            getPopupContainer={(trigger) => trigger.parentNode}
            popupClassName="small-flight-datepicker"
            size="small"
            className="custom-date-picker"
            open={open}
            disabledDate={disabledDate}
            onChange={handleChange}
            value={value ? dayjs(value) : null}
            style={{ width: "100%" }}
          />
        </div>
      ) : null}
    </>
  );
};

export default AppDateRangeFlight;
