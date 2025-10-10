export default function TourContent() {
  return (
    <div className="container mt-100 mb-100">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="heading-44-medium mb-30">Tour Booking</h1>
          
          <div className="mb-40">
            <h3 className="heading-6-medium mb-20">Discover Amazing Tours</h3>
            <p className="text-md neutral-700 mb-20">
              Book unforgettable tours and experiences with Travelogy. From cultural city walks to adventure expeditions, we offer curated tours worldwide.
            </p>
          </div>

          <div className="mb-40">
            <h3 className="heading-6-medium mb-20">Popular Tour Categories</h3>
            <ul className="list-disc ml-20">
              <li className="text-md neutral-700 mb-10">Cultural & Historical Tours</li>
              <li className="text-md neutral-700 mb-10">Adventure & Outdoor Activities</li>
              <li className="text-md neutral-700 mb-10">Food & Wine Tours</li>
              <li className="text-md neutral-700 mb-10">Wildlife & Nature Tours</li>
            </ul>
          </div>

          <div className="mb-40">
            <h3 className="heading-6-medium mb-20">Why Choose Our Tours</h3>
            <ul className="list-disc ml-20">
              <li className="text-md neutral-700 mb-10">Expert local guides</li>
              <li className="text-md neutral-700 mb-10">Small group experiences</li>
              <li className="text-md neutral-700 mb-10">Flexible cancellation</li>
              <li className="text-md neutral-700 mb-10">Best price guarantee</li>
            </ul>
          </div>

          <div className="text-center mt-50">
            <button className="btn btn-gray">Browse Tours</button>
          </div>
        </div>
      </div>
    </div>
  );
}