"use client";
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function SessionTimer({ startTime }) {
  const [remainingTime, setRemainingTime] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (typeof startTime === "number" && startTime > 0) {
      setRemainingTime(startTime);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const id = window.setInterval(() => {
        setRemainingTime((prev) => {
          if (prev === null) return null;
          if (prev > 1) return prev - 1;

          // Redirect to previous page if time is 0 or negative
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
          setTimeout(() => {
            window.history.back(); // Go to the previous page
          }, 1000);

          return 0; // Ensure it doesn't continue decreasing after expiration
        });
      }, 1000);

      intervalRef.current = id;

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    } else {
      setRemainingTime(null);
    }
  }, [startTime]);

  if (remainingTime === null) return null;

  return (
    <div className="session shadow sm:rounded-sm text-md sticky bottom-0 z-50 p-2 text-center">
      <div className="sm:rounded-sm text-md sticky bottom-0 z-50 mt-5 p-2 text-center">
        {remainingTime > 0 ? (
          <p>
            The session will expire in: {Math.floor(remainingTime / 60)}:
            {String(remainingTime % 60).padStart(2, "0")} minutes
          </p>
        ) : (
          <p>Session expired</p>
        )}
      </div>
    </div>
  );
}

SessionTimer.propTypes = {
  startTime: PropTypes.number,
};
