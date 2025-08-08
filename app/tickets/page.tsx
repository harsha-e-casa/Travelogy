"use client";
import dynamic from "next/dynamic";

const Tickets = dynamic(() => import("./Tickets"), { ssr: false });

export default function Page() {
  return (
    <div>
      <Tickets />
    </div>
  );
}
