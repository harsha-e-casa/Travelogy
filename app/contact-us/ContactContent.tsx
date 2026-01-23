export default function ContactContent() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #aca491ff 0%, #d09409 100%)",
      }}
      className="min-vh-100 py-5"
    >
      <div className="container mt-100 mb-100">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="bg-white rounded-4 shadow-lg p-5">
              <div className="text-center mb-5">
                <h1 className="heading-44-medium" style={{ fontSize: "32px" }}>Contact Us</h1>
                <p className="text-md neutral-700 mt-20">
                  Have questions about your booking or need travel assistance? Our customer support team is here to help you 24/7.
                </p>
              </div>

              <div className="row">
                <div className="col-md-6 mb-40">
                  <h4 className="heading-6-medium mb-20" style={{ fontSize: "26px" }}>Contact Information</h4>
                  <div className="mb-20">
                    <strong className="text-brand-2">Phone:</strong>
                    <p className="text-md neutral-700 mb-0">+91 95662 66061</p>
                  </div>
                  <div className="mb-20">
                    <strong className="text-brand-2">Email:</strong>
                    <p className="text-md neutral-700 mb-0">info@casagrandtravelogy.co.in</p>
                  </div>
                  <div className="mb-20">
                    <strong className="text-brand-2">Address:</strong>
                    <p className="text-md neutral-700 mb-0">NPL Devi, 111, Lattice Brg Rd, Thiruvanmiyur, Chennai, Tamil Nadu 600041</p>
                  </div>
                  <div>
                    <strong className="text-brand-2">Hours:</strong>
                    <p className="text-md neutral-700 mb-0">8:00 AM - 7:00 PM, Mon - Fri</p>
                  </div>
                </div>

                <div className="col-md-6 mb-40">
                  <h4 className="heading-6-medium mb-20" style={{ fontSize: "26px" }}>Quick Support</h4>
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
        </div>
      </div>
    </div>
  );
}