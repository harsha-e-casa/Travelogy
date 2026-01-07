import React from "react";

interface HotelSearchFilterProps {
  searchName: string;
  onSearchNameChange: (value: string) => void;
  freeCancellation: boolean;
  onFreeCancellationChange: (value: boolean) => void;
}

export default function HotelSearchFilter({
  searchName,
  onSearchNameChange,
  freeCancellation,
  onFreeCancellationChange,
}: HotelSearchFilterProps) {
  return (
    <div className="pb-2">
      <h6 className="text-md-bold neutral-1000 mb-2">Search Hotel</h6>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by hotel name..."
        value={searchName}
        onChange={(e) => onSearchNameChange(e.target.value)}
        style={{ fontSize: '13px', height: '40px' }}
      />
      <label className="cb-container mt-2">
        <input
          type="checkbox"
          checked={freeCancellation}
          onChange={() => onFreeCancellationChange(!freeCancellation)}
        />
        <span className="text-sm-medium">Free Cancellation Available</span>
        <span className="checkmark" />
      </label>
    </div>
  );
}
