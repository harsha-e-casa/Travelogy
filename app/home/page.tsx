"use client";
import dynamic from 'next/dynamic';

// Dynamically import BookingDetailsPage with ssr: false to disable SSR

// const Login = dynamic(() => import("./Login_static"), { ssr: false });
const Home = dynamic(() => import("./home"), { ssr: false });

export default function Page() {
  return (
    <div>
      <Home />
    </div>
  );
}
