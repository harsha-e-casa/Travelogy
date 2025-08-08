"use client";
import dynamic from 'next/dynamic';

// Dynamically import BookingDetailsPage with ssr: false to disable SSR
const ReissueReviewPage = dynamic(() => import("./ReissueReviewPage"), { ssr: false });

export default function Page() {
  return (
    <div>
      <ReissueReviewPage />
    </div>
  );
}