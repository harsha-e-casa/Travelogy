export default function FlightContent() {
  return (
    <div 
      className="min-h-screen py-50 d-flex" 
      style={{
        backgroundImage: 'linear-gradient(135deg, #aca491ff 0%, #d09409 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-lg-10">
            <div className="card shadow-lg border-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', marginTop:'10px' }}>
              <div className="card-body p-30">
                <div className="text-center mb-40">
                  <h1 className="heading-44-medium mb-20 text-brand-1">Flight Booking</h1>
                  <p className="text-lg neutral-600">
                    Find and book flights to destinations around the world. Compare prices from multiple airlines and get the best deals.
                  </p>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-30">
                    <h4 className="heading-6-medium mb-20 text-brand-1">Flight Options</h4>
                    <ul className="list-unstyled">
                      <li className="text-md neutral-700 mb-10">✓ Domestic & International Flights</li>
                      <li className="text-md neutral-700 mb-10">✓ Economy, Business & First Class</li>
                      <li className="text-md neutral-700 mb-10">✓ One-way & Round-trip</li>
                      <li className="text-md neutral-700 mb-10">✓ Multi-city Itineraries</li>
                    </ul>
                  </div>

                  <div className="col-md-6 mb-30">
                    <h4 className="heading-6-medium mb-20 text-brand-1">Why Book With Us</h4>
                    <ul className="list-unstyled">
                      <li className="text-md neutral-700 mb-10">✓ Compare 500+ airlines</li>
                      <li className="text-md neutral-700 mb-10">✓ No hidden fees</li>
                      <li className="text-md neutral-700 mb-10">✓ Flexible booking options</li>
                      <li className="text-md neutral-700 mb-10">✓ 24/7 travel support</li>
                    </ul>
                  </div>
                </div>

                <div className="text-center mt-40">
                  <button className="btn btn-gray px-40 py-15">
                    Search Flights
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}