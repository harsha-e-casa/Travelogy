import React, { useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

type AppDateRageProps = {
  openToDateRange: () => void;
  setDatedep: (date: dayjs.Dayjs | null) => void;
  minDate?: dayjs.Dayjs | null; // Allow Dayjs or null
  valueDate: dayjs.Dayjs | null;
};

const AppDateRange = ({
  openToDateRange,
  setDatedep,
  minDate = null,
  valueDate,
}: AppDateRageProps) => {
  const [open, setOpen] = useState(true);

  const disabledDate = (current: dayjs.Dayjs) => {
    const today = dayjs().startOf("day");
    const floor = (minDate ? dayjs(minDate) : today).startOf("day");
    return current && current.startOf("day").isBefore(floor);
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

  const dateRender = (current: dayjs.Dayjs) => {
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
        // getPopupContainer={(trigger) => trigger.parentNode}
      />
    </div>
  ) : null;
};

export default AppDateRange;
