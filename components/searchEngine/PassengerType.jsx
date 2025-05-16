import React, { useState } from "react";

export const TripPlans = ({
  selectedPassengerType,
  setSelectedPassengerType,
}) => {
  // Set initial selected plan to 'Round Trip'

  const handlePlanChange = (e) => {
    // Update the selected plan based on the radio button clicked
    setSelectedPassengerType(e.target.value);
  };

  return (
    <div className="plans mt-35 mb_8 ml_10">
      {/* One Way Plan */}
      <label className="plan basic-plan" htmlFor="basic">
        <input
          type="radio"
          id="basic"
          name="plan"
          value="REGULAR"
          checked={selectedPassengerType === "REGULAR"}
          onChange={handlePlanChange}
        />
        <div className="plan-content">
          <div className="plan-details">
            <span>REGULAR</span>
          </div>
        </div>
      </label>

      {/* Round Trip Plan */}
      <label className="plan complete-plan relative" htmlFor="complete">
        <input
          type="radio"
          id="complete"
          name="plan"
          value="STUDENT"
          checked={selectedPlan === "STUDENT"}
          onChange={handlePlanChange}
        />
        <div className="plan-content">
          <div className="plan-details">
            <span>STUDENT</span>
          </div>
        </div>
      </label>

      <label className="plan complete-plan relative" htmlFor="complete">
        <input
          type="radio"
          id="complete"
          name="plan"
          value="STUDENT"
          checked={selectedPlan === "STUDENT"}
          onChange={handlePlanChange}
        />
        <div className="plan-content">
          <div className="plan-details">
            <span>STUDENT</span>
          </div>
        </div>
      </label>
    </div>
  );
};
