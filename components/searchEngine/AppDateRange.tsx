import React, { useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

type AppDateRageProps = {
  openToDateRange: () => void;
  setDatedep: (date: dayjs.Dayjs | null) => void;
  minDate?: dayjs.Dayjs | null; // Allow Dayjs or null
  valueDate: dayjs.Dayjs | null;
  isCheckout?: boolean; // New prop to identify checkout date picker
};

const AppDateRange = ({
  openToDateRange,
  setDatedep,
  minDate = null,
  valueDate,
  isCheckout = false,
}: AppDateRageProps) => {
  const [open, setOpen] = useState(true);

  const disabledDate = (current: dayjs.Dayjs) => {
    const today = dayjs().startOf("day");
    let floor = (minDate ? dayjs(minDate) : today).startOf("day");
    
    // For checkout date picker, add 1 day to ensure checkout is after check-in
    if (isCheckout && minDate) {
      floor = floor.add(1, "day");
    }
    
    // Use isSameOrBefore to disable the floor date and all dates before it
    return current && current.startOf("day").isSameOrBefore(floor.subtract(1, "day"));
  };

  const handleChange = (date: any) => {
    if (date) {
      setDatedep(dayjs(date));
      openToDateRange?.();
      setOpen(false);
    } else {
      setDatedep(null);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) openToDateRange?.();
  };

  const handleDateClick = (current: dayjs.Dayjs) => {
    // This handles clicks on date cells, including already-selected dates
    setDatedep(dayjs(current));
    openToDateRange?.();
    setOpen(false);
  };

  const dateRender = (current: dayjs.Dayjs) => {
    const isSelected = valueDate && current.isSame(valueDate, "day");
    const isDisabled = disabledDate(current);
    
    return (
      <div
        className={`ant-picker-cell-inner ${
          isSelected ? "my-selected-date" : ""
        }`}
        onClick={(e) => {
          if (!isDisabled) {
            e.stopPropagation();
            handleDateClick(current);
          }
        }}
        style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
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
        // getPopupContainer={(trigger) => trigger.parentNode}
      />
    </div>
  ) : null;
};

export default AppDateRange;
