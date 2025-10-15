"use client";
import dynamic from 'next/dynamic';

// Dynamically import BookingDetailsPage with ssr: false to disable SSR

// const Login = dynamic(() => import("./Login_static"), { ssr: false });
const Login = dynamic(() => import("./Login"), { ssr: false });

export default function Page() {
  return (
    <div>
      <Login />
    </div>
  );
}
