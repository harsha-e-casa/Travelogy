"use client";
import dynamic from "next/dynamic";

// Dynamically import BookingDetailsPage with ssr: false to disable SSR
const StepperPage = dynamic(() => import("./StepperPage"), { ssr: false });

export default function Page() {
  return (
    <div>
      <StepperPage />
    </div>
  );
}
