import { useEffect, useRef } from 'react';

function useSessionTime(sessionCreatedTimeStr, sessionDurationSec, onExpire) {
  const timeLeftRef = useRef(0);
  const expired = useRef(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    let sessionEndTime;

    if (sessionCreatedTimeStr && sessionDurationSec) {
      const createdTime = new Date(sessionCreatedTimeStr);
      sessionEndTime = new Date(createdTime.getTime() + sessionDurationSec * 1000);
      localStorage.setItem("sessionEndTime", sessionEndTime.toISOString());
    } else {
      const storedEnd = localStorage.getItem("sessionEndTime");
      if (storedEnd) {
        sessionEndTime = new Date(storedEnd);
      }
    }

    if (!sessionEndTime) return;

    const updateTimer = () => {
      const now = new Date();
      const diff = Math.floor((sessionEndTime - now) / 1000);
      const newTimeLeft = diff > 0 ? diff : 0;
      timeLeftRef.current = newTimeLeft;

      if (newTimeLeft === 0 && !expired.current) {
        expired.current = true;
        onExpire?.();
        clearInterval(intervalRef.current);
      }
    };

    updateTimer();  // initialize immediately
    intervalRef.current = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalRef.current);
  }, [sessionCreatedTimeStr, sessionDurationSec, onExpire]);

  return timeLeftRef;  // return ref, not value
}

export default useSessionTime;
