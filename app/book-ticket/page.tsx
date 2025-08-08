"use client";
import dynamic from 'next/dynamic';

// Dynamically import BookingDetailsPage with ssr: false to disable SSR
const BookTicket = dynamic(() => import("./BookTicket"), { ssr: false });

export default function Page() {
  return (
    <div>
      <BookTicket />
    </div>
  );
}