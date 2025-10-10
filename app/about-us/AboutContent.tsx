export default function AboutContent() {
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
          <div className="col-md-8 col-lg-8">
            <div className="card shadow-lg border-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', marginTop:'10px', width:'1000px' }}>
              <div className="card-body p-30">
                <div className="text-center mb-40">
                  <h1 className="heading-44-medium mb-20 text-brand-1">About Us</h1>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-30">
                    <div className="mb-30">
                      <h3 className="heading-6-medium mb-20 text-brand-1">Our Story</h3>
                      <p className="text-md neutral-700">
                        Travelogy was founded with a simple mission: to make travel accessible, enjoyable, and memorable for everyone. We believe that travel has the power to transform lives and create lasting memories.
                      </p>
                    </div>

                    <div className="mb-30">
                      <h3 className="heading-6-medium mb-20 text-brand-1">Our Mission</h3>
                      <p className="text-md neutral-700">
                        To provide travelers with seamless booking experiences, curated travel options, and exceptional customer service that exceeds expectations.
                      </p>
                    </div>
                  </div>

                  <div className="col-md-6 mb-30">
                    <div className="mb-30">
                      <h3 className="heading-6-medium mb-20 text-brand-1">What We Offer</h3>
                      <ul className="list-unstyled">
                        <li className="text-md neutral-700 mb-10">✓ Comprehensive travel booking platform</li>
                        <li className="text-md neutral-700 mb-10">✓ Curated travel experiences</li>
                        <li className="text-md neutral-700 mb-10">✓ 24/7 customer support</li>
                        <li className="text-md neutral-700 mb-10">✓ Best price guarantees</li>
                      </ul>
                    </div>

                    <div className="mb-30">
                      <h3 className="heading-6-medium mb-20 text-brand-1">Our Values</h3>
                      <ul className="list-unstyled">
                        <li className="text-md neutral-700 mb-10">✓ Customer-first approach</li>
                        <li className="text-md neutral-700 mb-10">✓ Transparency and trust</li>
                        <li className="text-md neutral-700 mb-10">✓ Innovation in travel technology</li>
                        <li className="text-md neutral-700 mb-10">✓ Sustainable travel practices</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}