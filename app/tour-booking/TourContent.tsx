export default function TourContent() {
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
                  <h1 className="heading-44-medium mb-20 text-brand-1">Tour Booking</h1>
                  <p className="text-lg neutral-600">
                    Book unforgettable tours and experiences with Travelogy. From cultural city walks to adventure expeditions, we offer curated tours worldwide.
                  </p>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-30">
                    <h4 className="heading-6-medium mb-20 text-brand-1">Popular Tour Categories</h4>
                    <ul className="list-unstyled">
                      <li className="text-md neutral-700 mb-10">✓ Cultural & Historical Tours</li>
                      <li className="text-md neutral-700 mb-10">✓ Adventure & Outdoor Activities</li>
                      <li className="text-md neutral-700 mb-10">✓ Food & Wine Tours</li>
                      <li className="text-md neutral-700 mb-10">✓ Wildlife & Nature Tours</li>
                    </ul>
                  </div>

                  <div className="col-md-6 mb-30">
                    <h4 className="heading-6-medium mb-20 text-brand-1">Why Choose Our Tours</h4>
                    <ul className="list-unstyled">
                      <li className="text-md neutral-700 mb-10">✓ Expert local guides</li>
                      <li className="text-md neutral-700 mb-10">✓ Small group experiences</li>
                      <li className="text-md neutral-700 mb-10">✓ Flexible cancellation</li>
                      <li className="text-md neutral-700 mb-10">✓ Best price guarantee</li>
                    </ul>
                  </div>
                </div>

                <div className="text-center mt-40">
                  <button className="btn btn-gray px-40 py-15">
                    Browse Tours
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