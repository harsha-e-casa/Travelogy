"use client";
import React, { useState, useEffect } from "react";
import { getBookingDetails } from "../../../../util/HotelApi";
import { useSearchParams } from "next/navigation";
import { Step2Review, FareAmount } from "../../stepper/Stepper";

const BookingDetailsPage = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [Category2, setCategory2] = useState(null);

  console.log("Booking ID from URL:", bookingId);

  useEffect(() => {
    if (bookingId) {
      getBookingDetails(bookingId)
        .then((data) => {
          console.log("API Response:", data);
          setBookingDetails(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching booking details:", error);
          setError("Failed to load booking details.");
          setLoading(false);
        });
    } else {
      setError("Booking ID is missing.");
      setLoading(false);
    }
  }, [bookingId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!bookingDetails || !bookingDetails.order || !bookingDetails.itemInfos) {
    return <div>Invalid booking details</div>;
  }

  const { order, itemInfos } = bookingDetails || {};
  const hotelInfo = itemInfos?.HOTEL?.hInfo || {};
  const deliveryInfo = order?.deliveryInfo || {};
  const { bookingId: orderBookingId, amount } = order || {};
  const rating = parseFloat(hotelInfo?.rt) || 0;
  const totalStars = 5;
  const filledStars = Math.round(rating);

  console.log("Form Data:", formData);
  console.log("Hotel Review Data (bookingDetails):", bookingDetails);
  const email = deliveryInfo.emails?.[0];
  const contact = deliveryInfo.contacts?.[0];
  const countryCode = deliveryInfo.code?.[0];

  // Displaying the mapped values
  console.log(`Email: ${email}`);
  console.log(`Contact: ${contact}`);
  console.log(`Country Code: ${countryCode}`);
  return (
    <div className="container w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-8 border-r border-gray-200">
        <h2 className="text-base font-semibold ml-6">
          Booking ID: {orderBookingId}
        </h2>
        <div className="text-base font-semibold">
          {bookingDetails ? (
            <Step2Review
              formData={formData}
              Category2={Category2}
              Category={"abook"}
              hotelReviewData={bookingDetails.itemInfos.HOTEL}
            />
          ) : null}
        </div>
      </div>
      <div className="md:col-span-4">
        <div className="p-6 rounded-md text-sm space-y-4">
          <FareAmount
            hotelReviewData={bookingDetails.itemInfos.HOTEL}
            Category={"abook"}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
