export default function AboutContent() {
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
                <h1 className="heading-44-medium" style={{ fontSize: "32px" }}>About Us</h1>
              </div>

              <div className="mb-40">
                <h3 className="heading-6-medium mb-20" style={{ fontSize: "26px" }}>Your Gateway to the World!</h3>
                <p className="text-md neutral-700 mb-20">
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

              <div className="mb-40">
                <h3 className="heading-6-medium mb-20" style={{ fontSize: "26px" }}>Services</h3>
                <p className="text-md neutral-700 mb-20">
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

              <div className="mb-40">
                <h3 className="heading-6-medium mb-20" style={{ fontSize: "26px" }}>Why Choose Us?</h3>
                <ul className="list-disc ml-20">
                  <li className="text-md neutral-700 mb-10">
                    <span className="font-semibold">Expertise and Experience:</span>{" "}
                    Over a decade of industry experience with a team of seasoned travel consultants.
                  </li>
                  <li className="text-md neutral-700 mb-10">
                    <span className="font-semibold">Personalized Service:</span>{" "}
                    Each travel plan is tailored to meet the specific needs and desires of our clients.
                  </li>
                  <li className="text-md neutral-700 mb-10">
                    <span className="font-semibold">Global Network:</span>{" "}
                    Strong partnerships with global airlines, hotels, and local tour operators.
                  </li>
                  <li className="text-md neutral-700 mb-10">
                    <span className="font-semibold">Sustainability:</span>{" "}
                    Commitment to promoting eco-friendly and sustainable travel options.
                  </li>
                  <li className="text-md neutral-700 mb-10">
                    <span className="font-semibold">Customer Satisfaction:</span>{" "}
                    High customer retention rate and glowing testimonials from satisfied travelers.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
