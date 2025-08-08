import { useEffect, useReducer, useRef } from 'react';


function SessionTimer({ timeLeftRef,searchTickets }) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const hasExpired = useRef(false); // prevent repeated firing
  

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate();

      if (timeLeftRef.current <= 0 && !hasExpired.current) {
        hasExpired.current = true;
        alert('Your session has expired!');
        searchTickets()
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [searchTickets, timeLeftRef]);

  return (
    <div className="sm:rounded-sm text-md sticky bottom-0 z-50 mt-5 p-2 text-center ">
      {timeLeftRef.current > 0 ? (
        <p>
          The session will expire in: {Math.floor(timeLeftRef.current / 60)}:
          {String(timeLeftRef.current % 60).padStart(2, '0')} minutes
        </p>
      ) : (
        <p>Session expired</p>
      )}
    </div>
  );
}

export default SessionTimer;
