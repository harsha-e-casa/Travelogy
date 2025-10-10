export default function FlightContent() {
  return (
    <div className="container mt-100 mb-100">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="heading-44-medium mb-30">Flight Booking</h1>
          
          <div className="mb-40">
            <h3 className="heading-6-medium mb-20">Book Flights Worldwide</h3>
            <p className="text-md neutral-700 mb-20">
              Find and book flights to destinations around the world. Compare prices from multiple airlines and get the best deals.
            </p>
          </div>

          <div className="mb-40">
            <h3 className="heading-6-medium mb-20">Flight Options</h3>
            <ul className="list-disc ml-20">
              <li className="text-md neutral-700 mb-10">Domestic & International Flights</li>
              <li className="text-md neutral-700 mb-10">Economy, Business & First Class</li>
              <li className="text-md neutral-700 mb-10">One-way & Round-trip</li>
              <li className="text-md neutral-700 mb-10">Multi-city Itineraries</li>
            </ul>
          </div>

          <div className="mb-40">
            <h3 className="heading-6-medium mb-20">Why Book With Us</h3>
            <ul className="list-disc ml-20">
              <li className="text-md neutral-700 mb-10">Compare 500+ airlines</li>
              <li className="text-md neutral-700 mb-10">No hidden fees</li>
              <li className="text-md neutral-700 mb-10">Flexible booking options</li>
              <li className="text-md neutral-700 mb-10">24/7 travel support</li>
            </ul>
          </div>

          <div className="text-center mt-50">
            <button className="btn btn-gray">Search Flights</button>
          </div>
        </div>
      </div>
    </div>
  );
}