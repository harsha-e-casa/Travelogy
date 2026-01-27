import React, { useState } from "react";

export const PassengerType = ({
  selectedPassengerType,
  setSelectedPassengerType,
}) => {
  const [hoveredStudent, setHoveredStudent] = useState(false);
  const [hoveredSenior, setHoveredSenior] = useState(false);
  const passangerMap = {
    "Regular": "REGULAR",
    "Student": "STUDENT",
    "Senior Citizen": "SENIOR CITIZEN"
  };
  const handlePlanChange = (e) => {
    setSelectedPassengerType(passangerMap[e.target.value]);
  };

  return (
    <div className="plans ml_10 ">
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

      <label
        className="plan complete-plan relative"
        htmlFor="student"
        onMouseEnter={() => setHoveredStudent(true)}
        onMouseLeave={() => setHoveredStudent(false)}
      >
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
        {hoveredStudent && (
          <div
            className="hidden lg:block"
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              background: "white",
              padding: "10px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              zIndex: 10,
              width: "250px",
              fontSize: "12px",
              color: "black",
              textAlign: "left",
              marginTop: "10px",
              border: "1px solid #e0e0e0",
            }}
          >
            Only students above 12 years of age are eligible for special fares
            and/or additional baggage allowances. Carrying valid student ID
            cards and student visas (where applicable) is mandatory, else the
            passenger may be denied boarding or asked to pay for extra baggage.
          </div>
        )}
      </label>

      <label
        className="plan complete-plan relative"
        htmlFor="seniorCitizen"
        style={{ width: "155px" }}
        onMouseEnter={() => setHoveredSenior(true)}
        onMouseLeave={() => setHoveredSenior(false)}
      >
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
        {hoveredSenior && (
          <div
            className="hidden lg:block"
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              background: "white",
              padding: "10px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              zIndex: 1000,
              width: "250px",
              fontSize: "12px",
              color: "black",
              textAlign: "left",
              marginTop: "10px",
              border: "1px solid #e0e0e0",
            }}
          >
            Only senior citizens above the age of 61 years can avail this
            special fare. It is mandatory to produce proof of Date of Birth at
            the airport, without which prevailing fares will be charged.
          </div>
        )}
      </label>
    </div>
  );
};
