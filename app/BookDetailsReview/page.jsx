"use client";
import dynamic from 'next/dynamic';

const BookDetailReview = dynamic(() => import("./BookDetailReview"), { ssr: false });

export default function Page() {
  return (
    <div>
      <BookDetailReview />
    </div>
  );
}