import { useEffect, useState } from "react";

const TravellerDetailsModal = ({ bookingId, onClose }) => {
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    // Replace with your actual API call
    const fetchBookingDetails = async () => {
      try {
        const response = await postBookingDetails({ bookingId });
        setBookingData(response);
      } catch (error) {
        console.error("❌ Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (!bookingData) return null;

  const trip = bookingData?.trips?.[0];
  const segment = trip?.segments?.[0];
  const traveller = bookingData?.travellers?.[0];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl relative">
        <button
        
          className="absolute top-4 right-4 text-xl font-bold text-gray-700"
        >
          ×
        </button>

        <div className="mb-4 text-gray-700">
          <div className="flex justify-between mb-2">
            <div><strong>Type:</strong> CANCELLATION</div>
            <div><strong>Booking ID:</strong> bookingId</div>
          </div>

          <div className="bg-gray-100 p-4 rounded-md shadow-sm">
            <div className="text-blue-800 font-semibold mb-2">
              segment?.fromCity → segment?.toCity on segment?.departureDate
            </div>

            <div className="flex items-center gap-4 mb-2">
              <img alt="Airline" className="w-10 h-10" />
              <div>
                <div className="font-medium text-lg">segment?.airlineName segment?.flightNumber</div>
                <div className="text-sm text-gray-500">
                  segment?.fromAirport - segment?.departureTime, segment?.departureDay<br />
                  segment?.toAirport - segment?.arrivalTime, segment?.arrivalDay
                </div>
              </div>
            </div>

            <div className="border-t pt-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">traveller name</span>
                <input type="checkbox" className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        <button className="bg-orange-500 text-white px-6 py-2 rounded-full mt-4">
          Confirm Traveller
        </button>
      </div>
    </div>
  );
};

export default TravellerDetailsModal;
