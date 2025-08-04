export default function ByStops({ stops, setStops }: any) {
  return (
    <div className="box-collapse scrollFilter">
      <ul className="list-filter-checkbox">
        <li>
          <label className="cb-container">
            <input
              type="radio"
              name="stops"
              value="all"
              checked={stops === "all"}
              onChange={(e) => setStops(e.target.value)}
            />
            <span className="text-sm-medium">All</span>
            <span className="checkmark" />
          </label>
        </li>
        <li>
          <label className="cb-container">
            <input
              type="radio"
              name="stops"
              value="non-stop"
              checked={stops === "non-stop"}
              onChange={(e) => setStops(e.target.value)}
            />
            <span className="text-sm-medium">Non-stop</span>
            <span className="checkmark" />
          </label>
        </li>
        <li>
          <label className="cb-container">
            <input
              type="radio"
              name="stops"
              value="1-stop"
              checked={stops === "1-stop"}
              onChange={(e) => setStops(e.target.value)}
            />
            <span className="text-sm-medium">1 Stop</span>
            <span className="checkmark" />
          </label>
        </li>
        <li>
          <label className="cb-container">
            <input
              type="radio"
              name="stops"
              value="2-stops"
              checked={stops === "2-stops"}
              onChange={(e) => setStops(e.target.value)}
            />
            <span className="text-sm-medium">2+ Stops</span>
            <span className="checkmark" />
          </label>
        </li>
      </ul>
    </div>
  );
}
