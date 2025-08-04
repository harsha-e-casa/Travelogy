export default function ByStops({ stops, setStops, tabIndex }: any) {
  return (
    <div className="box-collapse scrollFilter">
      <ul className="list-filter-checkbox">
        <li key="all">
          <label className="cb-container">
            <input
              type="radio"
              name={`stops-${tabIndex}`}
              value="all"
              checked={stops === "all"}
              onChange={(e) => setStops(e.target.value)}
            />
            <span className="text-sm-medium">All</span>
            <span className="checkmark" />
          </label>
        </li>
        <li key="non-stop">
          <label className="cb-container">
            <input
              type="radio"
              name={`stops-${tabIndex}`}
              value="non-stop"
              checked={stops === "non-stop"}
              onChange={(e) => setStops(e.target.value)}
            />
            <span className="text-sm-medium">Non-stop</span>
            <span className="checkmark" />
          </label>
        </li>
        <li key="1-stop">
          <label className="cb-container">
            <input
              type="radio"
              name={`stops-${tabIndex}`}
              value="1-stop"
              checked={stops === "1-stop"}
              onChange={(e) => setStops(e.target.value)}
            />
            <span className="text-sm-medium">1 Stop</span>
            <span className="checkmark" />
          </label>
        </li>
        <li key="2-stops">
          <label className="cb-container">
            <input
              type="radio"
              name={`stops-${tabIndex}`}
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
