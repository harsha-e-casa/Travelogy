import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const AppDateRange = ({ openToDateRange, setDatedep }) => {
  const [dates, setDates] = useState([]);
  const [open, setOpen] = useState(true);

  const handleChange = (dates, dateString) => {
    if (dateString) {
      setDatedep(dateString);
      openToDateRange();
      setOpen(false);
    } else {
      setDatedep(null);
      console.log("No dates selected");
    }
  };

  const dateFormat = "DD-MM-YYYY";

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  return (
    <>
      {open ? (
        <div className="custome-date-rage">
          <DatePicker
            open={open}
            disabledDate={disabledDate}
            onChange={handleChange}
          />
        </div>
      ) : null}
    </>
  );
};

export default AppDateRange;
