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
        <div className="custome-date-rage">
          <DatePicker
            className="custom-date-picker"
            open={open}
            disabledDate={disabledDate}
            onChange={handleChange}
            value={value ? dayjs(value) : null}
          />
        </div>
      ) : null}
    </>
  );
};

export default AppDateRangeFlight;
