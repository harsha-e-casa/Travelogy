"use client";
import React, { useState, useEffect } from "react";
import { getBookingDetails } from "../../../../util/HotelApi";
import { useSearchParams } from "next/navigation";

const BookingDetailsPage = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  // Debugging: Log the bookingId
  console.log("Booking ID from URL:", bookingId);

  useEffect(() => {
    if (bookingId) {
      getBookingDetails(bookingId)
        .then((data) => {
          console.log("API Response:", data); // Log the API response
          setBookingDetails(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching booking details:", error); // Log the error
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

  // Check if bookingDetails exists and has the necessary properties before rendering
  if (!bookingDetails || !bookingDetails.order || !bookingDetails.itemInfos) {
    return <div>Invalid booking details</div>;
  }

  // Destructure the data safely using optional chaining
  const { order, itemInfos } = bookingDetails || {};
  const hotelInfo = itemInfos?.HOTEL?.hInfo || {};
  const deliveryInfo = order?.deliveryInfo || {};
  const { bookingId: orderBookingId, amount } = order || {};

  return (
    <div>
      <h1>Booking Details</h1>
      <h2>Booking ID: {orderBookingId}</h2>
      <h3>Hotel Name: {hotelInfo.name || "N/A"}</h3>
      <p>Amount: ₹{amount ? amount.toFixed(2) : "N/A"}</p>
      <p>Customer Email: {deliveryInfo?.emails?.[0] || "N/A"}</p>
      <p>Customer Contact: {deliveryInfo?.contacts?.[0] || "N/A"}</p>
      <p>Hotel Location: {hotelInfo?.ad?.adr || "N/A"}</p>
      {/* Render other details as needed */}
    </div>
  );
};

export default BookingDetailsPage;
