"use client";

import React from "react";

const EngineTabs = () => {
  return (
    <div className="tabs">
      <div className="tab active">
        <img src="/assets/imgs/airplane_1604953.svg" alt="Flights" />
        <span>Flights</span>
      </div>
      <div className="tab">
        <img src="/assets/imgs/travel_16190539.svg" alt="Hotels" />
        <span>Hotels</span>
      </div>
      <div className="tab">
        <img src="/assets/imgs/duty-free_2664702.svg" alt="Holiday" />
        <span>Holiday package</span>
      </div>
      <div className="tab">
        <img src="/assets/imgs/safe-flight_1585574.svg" alt="Insurance" />
        <span>Travel Insurance</span>
      </div>
      <div className="tab">
        <img src="/assets/imgs/passport_1257113.svg" alt="Visa" />
        <span>Visa</span>
      </div>
    </div>
  );
};

export default EngineTabs;
