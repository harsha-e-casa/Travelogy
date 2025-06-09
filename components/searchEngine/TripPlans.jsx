import React, { useState } from 'react';

export const TripPlans = ({selectedPlan, setSelectedPlan}) => {
  // Set initial selected plan to 'Round Trip'

  const handlePlanChange = (e) => {
    // Update the selected plan based on the radio button clicked
    setSelectedPlan(e.target.value);
  };

  return (
    <div className="plans mt-35 mb_8 ml_10">
      {/* One Way Plan */}
      <label className="plan basic-plan" htmlFor="basic">
        <input
          type="radio"
          id="basic"
          name="plan"
          value="one-way"
          checked={selectedPlan === 'one-way'}
          onChange={handlePlanChange}
        />
        <div className="plan-content">
          <div className="plan-details">
            <span>One way</span>
          </div>
        </div>
      </label>

      {/* Round Trip Plan */}
      <label className="plan complete-plan relative" htmlFor="complete">
        <input
          type="radio"
          id="complete"
          name="plan"
          value="round-trip"
          checked={selectedPlan === 'round-trip'}
          onChange={handlePlanChange}
        />
        <div className="plan-content">
          <div className="plan-details">
            <span>Round Trip</span>
          </div>
        </div>
      </label>

      {/* Multi City Plan */}
     <label className="plan complete-plan" htmlFor="complete2">
        <input
          type="radio"
          id="complete2"
          name="plan"
          value="multi-city"
          checked={selectedPlan === 'multi-city'}
          onChange={handlePlanChange}
        />
        <div className="plan-content">
          <div className="plan-details">
            <span>Multi City</span>
          </div>
        </div>
      </label>
    </div>
  );
};


export const TripPlansHotel = ({selectedPlan, setSelectedPlan}) => {
 
  // Set initial selected plan to 'Round Trip'

  const handlePlanChange = (e) => {
    // Update the selected plan based on the radio button clicked
    setSelectedPlan(e.target.value);
  };

  return (
    <div className="plans mt-35 mb_8 ml_10">
      {/* One Way Plan */}
      <label className="plan basic-plan" htmlFor="basic">
        <input
          type="radio"
          id="basic"
          name="plan"
          value="one-way"
          checked={selectedPlan === 'one-way'}
          onChange={handlePlanChange}
        />
        <div className="plan-content">
          <div className="plan-details">
            <span></span>
          </div>
        </div>
      </label>

      {/* Round Trip Plan */}
      <label className="plan complete-plan relative" htmlFor="complete">
        <input
          type="radio"
          id="complete"
          name="plan"
          value="round-trip"
          checked={selectedPlan === 'round-trip'}
          onChange={handlePlanChange}
        />
        <div className="plan-content">
          <div className="plan-details">
            <span>Round Trip</span>
          </div>
        </div>
      </label>

      {/* Multi City Plan */}
    {/*  <label className="plan complete-plan" htmlFor="complete2">
        <input
          type="radio"
          id="complete2"
          name="plan"
          value="multi-city"
          checked={selectedPlan === 'multi-city'}
          onChange={handlePlanChange}
        />
        <div className="plan-content">
          <div className="plan-details">
            <span>Multi City</span>
          </div>
        </div>
      </label>*/}
    </div>
  );
};
