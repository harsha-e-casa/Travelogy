import React, { useState } from "react";

export const PassengerType = ({
  selectedPassengerType,
  setSelectedPassengerType,
}) => {
  const passangerMap = {
    "Regular": "REGULAR",
    "Student": "STUDENT",
    "Senior Citizen": "SENIOR CITIZEN"
  };
  const handlePlanChange = (e) => {
    setSelectedPassengerType(passangerMap[e.target.value]);
  };

  return (
    <div className="plans mt-35 mb_8 ml_10">
      <label className="plan basic-plan" htmlFor="regular">
        <input
          type="radio"
          id="regular"
          name="regular"
          value="Regular"
          checked={selectedPassengerType === "REGULAR"}
          onChange={handlePlanChange}
        />
        <div className="plan-content">
          <div className="plan-details">
            <span>Regular</span>
          </div>
        </div>
      </label>

      <label className="plan complete-plan relative" htmlFor="student">
        <input
          type="radio"
          id="student"
          name="Student"
          value="Student"
          checked={selectedPassengerType === "STUDENT"}
          onChange={handlePlanChange}
        />
        <div className="plan-content">
          <div className="plan-details">
            <span>Student</span>
          </div>
        </div>
      </label>

      <label className="plan complete-plan relative" htmlFor="seniorCitizen" style={{ width: "155px" }}>
        <input
          type="radio"
          id="seniorCitizen"
          name="seniorCitizen"
          value="Senior Citizen"
          checked={selectedPassengerType === "SENIOR CITIZEN"}
          onChange={handlePlanChange}
        />
        <div className="plan-content">
          <div className="plan-details">
            <span>Senior Citizen</span>
          </div>
        </div>
      </label>
    </div>
  );
};
