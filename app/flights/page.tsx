"use client";
import dynamic from 'next/dynamic';

// Dynamically import BookingDetailsPage with ssr: false to disable SSR
const Tickets = dynamic(() => import("./Tickets"), { ssr: false });

export default function Page() {
  return (
    <div>
      <Tickets />
    </div>
  );
}
