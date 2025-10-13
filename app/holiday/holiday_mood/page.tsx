"use client";
import { Suspense } from 'react';
import Holidaymood from './holidaymood';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Holidaymood />
    </Suspense>
  );
}