"use client";
import dynamic from 'next/dynamic';

// Dynamically import BookingDetailsPage with ssr: false to disable SSR
const ReviewPage = dynamic(() => import("./ReviewPage"), { ssr: false });

export default function Page() {
  return (
    <div>
      <ReviewPage />
    </div>
  );
}