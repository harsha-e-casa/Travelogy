export default function HotelContent() {
  return (
    <div className="container mt-100 mb-100">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="heading-44-medium mb-30">Hotel Booking</h1>
          
          <div className="mb-40">
            <h3 className="heading-6-medium mb-20">Find Your Perfect Stay</h3>
            <p className="text-md neutral-700 mb-20">
              Book hotels worldwide with Travelogy. From luxury resorts to budget-friendly accommodations, find the perfect place to stay.
            </p>
          </div>

          <div className="mb-40">
            <h3 className="heading-6-medium mb-20">Accommodation Types</h3>
            <ul className="list-disc ml-20">
              <li className="text-md neutral-700 mb-10">Luxury Hotels & Resorts</li>
              <li className="text-md neutral-700 mb-10">Boutique Hotels</li>
              <li className="text-md neutral-700 mb-10">Budget Hotels & Hostels</li>
              <li className="text-md neutral-700 mb-10">Vacation Rentals</li>
            </ul>
          </div>

          <div className="mb-40">
            <h3 className="heading-6-medium mb-20">Booking Benefits</h3>
            <ul className="list-disc ml-20">
              <li className="text-md neutral-700 mb-10">Best rate guarantee</li>
              <li className="text-md neutral-700 mb-10">Free cancellation on most bookings</li>
              <li className="text-md neutral-700 mb-10">24/7 customer support</li>
              <li className="text-md neutral-700 mb-10">Instant confirmation</li>
            </ul>
          </div>

          <div className="text-center mt-50">
            <button className="btn btn-gray">Search Hotels</button>
          </div>
        </div>
      </div>
    </div>
  );
}