export default function AboutContent() {
  return (
    <div
      className="min-h-screen py-50"
      style={{
        backgroundImage: "linear-gradient(135deg, #aca491ff 0%, #d09409 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "130vh",
      }}
    >
      <div className="container-fluid px-4">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-8">
            <div
              className="card shadow-lg border-0"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                marginTop: "10px",
                width: "1000px",
              }}
            >
              <div className="card-body p-30">
                <div className="text-center mb-40">
                  <h1 className="heading-44-medium text-brand-1" style={{ fontSize: "32px" }} >
                    About Us
                  </h1>
                </div>

                <div className="row">
                  {/* <div className="col-md-6 mb-30"> */}
                  <div className="mb-30">
                    <h3 className="heading-6-medium text-brand-1" style={{ fontSize: "26px" }}>
                      Your Gateway to the World!
                    </h3>
                    <p className="text-md neutral-700">
                      Travelogy is a premier travel agency dedicated to curating
                      unforgettable travel experiences tailored to your unique
                      preferences and desires. Established in 2019, we have
                      built a reputation for excellence, reliability, and
                      personalized service. Our passionate team of travel
                      experts ensures that every journey is seamless, enriching,
                      and memorable. Our Mission is to inspire and enable
                      travelers to explore the world’s wonders through
                      customized itineraries, exceptional service, and authentic
                      experiences. Our Vision is to be the leading travel agency
                      known for innovation, customer satisfaction, and
                      sustainable travel practices.
                    </p>
                  </div>

                  <div className="mb-30">
                    <h3 className="heading-6-medium text-brand-1" style={{ fontSize: "26px" }} >
                      Services:
                    </h3>
                    <p className="text-md neutral-700">
                      Tailored Travel Packages, Custom-designed itineraries,
                      Luxury travel experiences, Family vacations, Adventure and
                      eco-tourism, Group Tours, Guided group tours, Corporate
                      retreats, Educational and cultural trips, Corporate
                      Travel, Business travel arrangements, Conference and event
                      planning, Incentive travel programs, Specialty Travel,
                      Honeymoons and romantic getaways, Wellness and spa
                      retreats, Culinary and wine tours, Travel Consultation,
                      Visa and travel insurance assistance, Destination
                      information and advice 24/7 customer support.
                    </p>
                  </div>
                  {/* </div> */}

                  {/* <div className="col-md-6 mb-30"> */}
                  <h3 className="heading-6-medium text-brand-1 font-bold" style={{ fontSize: "26px" }}>
                    Why Choose Us?
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-semibold">
                        Expertise and Experience:
                      </span>{" "}
                      Over a decade of industry experience with a team of seasoned travel consultants.
                    </li>
                    <li>
                      <span className="font-semibold">
                        Personalized Service:
                      </span>{" "}
                      Each travel plan is tailored to meet the specific needs and desires of our clients.
                    </li>
                    <li>
                      <span className="font-semibold">Global Network:</span>{" "}
                      Strong partnerships with global airlines, hotels, and local tour operators.
                    </li>
                    <li>
                      <span className="font-semibold">Sustainability:</span>{" "}
                      Commitment to promoting eco-friendly and sustainable travel options.
                    </li>
                    <li>
                      <span className="font-semibold">
                        Customer Satisfaction:
                      </span>{" "}
                      High customer retention rate and glowing testimonials from satisfied travelers.
                    </li>
                  </ul>
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
