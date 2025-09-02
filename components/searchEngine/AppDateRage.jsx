// import React, { useState, useEffect } from "react";
// import { DatePicker } from "antd";
// import dayjs from "dayjs";

// const AppDateRange = ({ openToDateRange, setDate, minDate, value }) => {
//   const [dates, setDates] = useState([]);
//   const [open, setOpen] = useState(true);

//   const handleChange = (dates, dateString) => {
//     if (dateString) {
//       setDate(dateString);
//       openToDateRange();
//       setOpen(false);
//     } else {
//       setDate(null);
//       console.log("No dates selected");
//     }
//   };

//   const dateFormat = "DD-MM-YYYY";

//   const disabledDate = (current) => {
//     if (minDate) {
//       return current && current < dayjs(minDate).startOf("day");
//     }
//     return current && current < dayjs().startOf("day");
//   };

//   return (
//     <>
//       {open ? (
//         <div className="custome-date-rage">
//           <DatePicker
//             className="custom-date-picker"
//             open={open}
//             disabledDate={disabledDate}
//             onChange={handleChange}
//             value={value ? dayjs(value) : null}
//           />
//         </div>
//       ) : null}
//     </>
//   );
// };

// export default AppDateRange;

import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const AppDateRange = ({
  openToDateRange,
  setDatedep,
  minDate = null,
  valueDate,
}) => {
  const [open, setOpen] = useState(true);

  const disabledDate = (current) => {
    const today = dayjs().startOf("day");
    const floor = (minDate ? dayjs(minDate) : today).startOf("day");
    return current && current.startOf("day").isBefore(floor);
  };

  const handleChange = (date) => {
    if (date) {
      setDatedep(dayjs(date));
      openToDateRange?.();
      setOpen(false);
    } else {
      setDatedep(null);
    }
  };

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) openToDateRange?.();
  };
  const dateRender = (current) => {
    const isSelected = valueDate && current.isSame(valueDate, "day");
    return (
      <div
        className={`ant-picker-cell-inner ${
          isSelected ? "my-selected-date" : ""
        }`}
      >
        {current.date()}
      </div>
    );
  };
  return open ? (
    <div className="custome-date-rage" onClick={(e) => e.stopPropagation()}>
      <DatePicker
        open={open}
        onOpenChange={handleOpenChange}
        disabledDate={disabledDate}
        onChange={handleChange}
        value={valueDate || null}
        dateRender={dateRender}
        inputReadOnly
        format="DD-MM-YYYY"
        showToday={false}
        getPopupContainer={(trigger) => trigger.parentNode}
      />
    </div>
  ) : null;
};

export default AppDateRange;
