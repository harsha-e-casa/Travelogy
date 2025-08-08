"use client";
import dynamic from "next/dynamic";

// Dynamically import BookingDetailsPage with ssr: false to disable SSR
const BookingDetailsPage = dynamic(() => import("./BookingDetailsPage"), {
  ssr: false,
});

export default function Page() {
  return (
    <div>
      <BookingDetailsPage />
    </div>
  );
}
