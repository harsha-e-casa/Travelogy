export default function ByAirlineSearch({ 
  flightNumberSearch,
  setFlightNumberSearch,
}: any) {
  return (
    <div className="box-collapse">
      <div className="search-filter">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Flight Number"
          value={flightNumberSearch}
          onChange={(e) => setFlightNumberSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
