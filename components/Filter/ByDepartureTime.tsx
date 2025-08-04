export default function ByDepartureTime({ departureTime, setDepartureTime }: any) {
  return (
    <div className="box-collapse scrollFilter">
      <ul className="list-filter-checkbox">
        <li>
          <label className="cb-container">
            <input
              type="radio"
              name="departureTime"
              value="all"
              checked={departureTime === "all"}
              onChange={(e) => setDepartureTime(e.target.value)}
            />
            <span className="text-sm-medium">All</span>
            <span className="checkmark" />
          </label>
        </li>
        <li>
          <label className="cb-container">
            <input
              type="radio"
              name="departureTime"
              value="early-morning"
              checked={departureTime === "early-morning"}
              onChange={(e) => setDepartureTime(e.target.value)}
            />
            <span className="text-sm-medium">Early Morning (12am - 6am)</span>
            <span className="checkmark" />
          </label>
        </li>
        <li>
          <label className="cb-container">
            <input
              type="radio"
              name="departureTime"
              value="morning"
              checked={departureTime === "morning"}
              onChange={(e) => setDepartureTime(e.target.value)}
            />
            <span className="text-sm-medium">Morning (6am - 12pm)</span>
            <span className="checkmark" />
          </label>
        </li>
        <li>
          <label className="cb-container">
            <input
              type="radio"
              name="departureTime"
              value="afternoon"
              checked={departureTime === "afternoon"}
              onChange={(e) => setDepartureTime(e.target.value)}
            />
            <span className="text-sm-medium">Afternoon (12pm - 6pm)</span>
            <span className="checkmark" />
          </label>
        </li>
        <li>
          <label className="cb-container">
            <input
              type="radio"
              name="departureTime"
              value="evening"
              checked={departureTime === "evening"}
              onChange={(e) => setDepartureTime(e.target.value)}
            />
            <span className="text-sm-medium">Evening (6pm - 12am)</span>
            <span className="checkmark" />
          </label>
        </li>
      </ul>
    </div>
  );
}
