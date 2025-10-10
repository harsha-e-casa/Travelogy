export default function HotelContent() {
  return (
    <div 
      className="min-h-screen py-50" 
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
            <div className="card shadow-lg border-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', marginTop:'10px', width:'1000px' }}>
              <div className="card-body p-30">
                <div className="text-center mb-40">
                  <h1 className="heading-44-medium mb-20 text-brand-1">Hotel Booking</h1>
                  <p className="text-lg neutral-600">
                    Book hotels worldwide with Travelogy. From luxury resorts to budget-friendly accommodations, find the perfect place to stay.
                  </p>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-30">
                    <h4 className="heading-6-medium mb-20 text-brand-1">Accommodation Types</h4>
                    <ul className="list-unstyled">
                      <li className="text-md neutral-700 mb-10">✓ Luxury Hotels & Resorts</li>
                      <li className="text-md neutral-700 mb-10">✓ Boutique Hotels</li>
                      <li className="text-md neutral-700 mb-10">✓ Budget Hotels & Hostels</li>
                      <li className="text-md neutral-700 mb-10">✓ Vacation Rentals</li>
                    </ul>
                  </div>

                  <div className="col-md-6 mb-30">
                    <h4 className="heading-6-medium mb-20 text-brand-1">Booking Benefits</h4>
                    <ul className="list-unstyled">
                      <li className="text-md neutral-700 mb-10">✓ Best rate guarantee</li>
                      <li className="text-md neutral-700 mb-10">✓ Free cancellation on most bookings</li>
                      <li className="text-md neutral-700 mb-10">✓ 24/7 customer support</li>
                      <li className="text-md neutral-700 mb-10">✓ Instant confirmation</li>
                    </ul>
                  </div>
                </div>

                <div className="text-center mt-40">
                  <button className="btn btn-gray px-40 py-15">
                    Search Hotels
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