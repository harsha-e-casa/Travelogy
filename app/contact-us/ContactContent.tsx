export default function ContactContent() {
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
      <div className="container-fluid px-4">
        <div className="row justify-content-center">
          <div className="col-sm-10 col-md-10">
            <div className="card shadow-lg border-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', marginTop:'25px', width:'75%' }}>
              <div className="card-body p-10">
                <div className="text-center mb-40">
                  <h1 className="heading-44-medium text-brand-1" style={{ fontSize: "32px" }}>Contact Us</h1>
                  <p className="text-lg neutral-600">
                    Have questions about your booking or need travel assistance? Our customer support team is here to help you 24/7.
                  </p>
                </div>

                <div className="row px-10">
                  <div className="col-md-6 mb-30">
                    <h4 className="heading-6-medium text-brand-1" style={{ fontSize: "26px" }}>Contact Information</h4>
                    <div className="mb-15">
                      <strong className="text-brand-2">Phone:</strong>
                      <p className="text-md neutral-700 mb-0">+91 95662 66061</p>
                    </div>
                    <div className="mb-15">
                      <strong className="text-brand-2">Email:</strong>
                      <p className="text-md neutral-700 mb-0">info@casagrandtravelogy.co.in</p>
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

                  <div className="col-md-6 mb-30">
                    <h4 className="heading-6-medium text-brand-1" style={{ fontSize: "26px" }}>Quick Support</h4>
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

                {/* <div className="text-center mt-40">
                  <button className="btn btn-gray px-40 py-15">
                    Send Message
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}