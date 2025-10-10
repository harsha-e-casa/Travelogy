export default function ContactContent() {
  return (
    <div 
      className="min-h-screen py-50" 
      style={{
        backgroundImage: 'linear-gradient(135deg, #aca491ff 0%, #e3b23dff 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container-fluid px-4">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="card shadow-lg border-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', height:'100%', marginTop:'5px', marginBottom:'5px' }}>
              <div className="card-body p-30">
                <div className="text-center mb-40">
                  <h1 className="heading-44-medium mb-20 text-brand-1">Contact Us</h1>
                  <p className="text-lg neutral-600">
                    Have questions about your booking or need travel assistance? Our customer support team is here to help you 24/7.
                  </p>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-30">
                    <div className="card border-1">
                      <div className="card-body p-30">
                        <h4 className="heading-6-medium mb-20 text-brand-1">Contact Information</h4>
                        <div className="mb-15">
                          <strong className="text-brand-2">Phone:</strong>
                          <p className="text-md neutral-700 mb-0">+91 9818739838</p>
                        </div>
                        <div className="mb-15">
                          <strong className="text-brand-2">Email:</strong>
                          <p className="text-md neutral-700 mb-0">support@travelogy.com</p>
                        </div>
                        <div className="mb-15">
                          <strong className="text-brand-2">Address:</strong>
                          <p className="text-md neutral-700 mb-0">NPL Devi, 111, Lattice Brg Rd, Thiruvanmiyur, Chennai, Tamil Nadu 600041</p>
                        </div>
                        <div>
                          <strong className="text-brand-2">Hours:</strong>
                          <p className="text-md neutral-700 mb-0">8:00 AM - 7:00 PM, Mon - Fri</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mb-30">
                    <div className="card border-1">
                      <div className="card-body p-30">
                        <h4 className="heading-6-medium mb-20 text-brand-1">Quick Support</h4>
                        <p className="text-md neutral-700 mb-20">
                          For immediate assistance with:
                        </p>
                        <ul className="list-unstyled">
                          <li className="text-md neutral-700 mb-10">✓ Booking modifications</li>
                          <li className="text-md neutral-700 mb-10">✓ Cancellations and refunds</li>
                          <li className="text-md neutral-700 mb-10">✓ Travel emergencies</li>
                          <li className="text-md neutral-700 mb-10">✓ General inquiries</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-40">
                  <button className="btn btn-brand-1 px-40 py-15">
                    Send Message
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