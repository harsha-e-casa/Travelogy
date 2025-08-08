"use client";
import dynamic from "next/dynamic";

// Dynamically import BookingDetailsPage with ssr: false to disable SSR
const HotelListingPage = dynamic(() => import("./HotelListingPage"), {
  ssr: false,
});

export default function Page() {
  return (
    <div>
      <HotelListingPage />
    </div>
  );
}
