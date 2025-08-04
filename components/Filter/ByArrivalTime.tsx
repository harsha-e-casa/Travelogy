export default function ByArrivalTime({ arrivalTime, setArrivalTime }: any) {
  return (
    <div className="box-collapse scrollFilter">
      <ul className="list-filter-checkbox">
        <li>
          <label className="cb-container">
            <input
              type="radio"
              name="arrivalTime"
              value="all"
              checked={arrivalTime === "all"}
              onChange={(e) => setArrivalTime(e.target.value)}
            />
            <span className="text-sm-medium">All</span>
            <span className="checkmark" />
          </label>
        </li>
        <li>
          <label className="cb-container">
            <input
              type="radio"
              name="arrivalTime"
              value="early-morning"
              checked={arrivalTime === "early-morning"}
              onChange={(e) => setArrivalTime(e.target.value)}
            />
            <span className="text-sm-medium">Early Morning (12am - 6am)</span>
            <span className="checkmark" />
          </label>
        </li>
        <li>
          <label className="cb-container">
            <input
              type="radio"
              name="arrivalTime"
              value="morning"
              checked={arrivalTime === "morning"}
              onChange={(e) => setArrivalTime(e.target.value)}
            />
            <span className="text-sm-medium">Morning (6am - 12pm)</span>
            <span className="checkmark" />
          </label>
        </li>
        <li>
          <label className="cb-container">
            <input
              type="radio"
              name="arrivalTime"
              value="afternoon"
              checked={arrivalTime === "afternoon"}
              onChange={(e) => setArrivalTime(e.target.value)}
            />
            <span className="text-sm-medium">Afternoon (12pm - 6pm)</span>
            <span className="checkmark" />
          </label>
        </li>
        <li>
          <label className="cb-container">
            <input
              type="radio"
              name="arrivalTime"
              value="evening"
              checked={arrivalTime === "evening"}
              onChange={(e) => setArrivalTime(e.target.value)}
            />
            <span className="text-sm-medium">Evening (6pm - 12am)</span>
            <span className="checkmark" />
          </label>
        </li>
      </ul>
    </div>
  );
}
