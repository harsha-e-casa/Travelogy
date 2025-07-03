"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  Step1TravellerDetails,
  Step2Review,
  Step3PersonalDocuments,
  Step4Payment,
} from "./Stepper";
const CheckIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const FileTextIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const UploadIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);

const CreditCardIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />
  </svg>
);

export default function Stepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "Mr",
    firstName: "",
    lastName: "",
    countryCode: "+91",
    mobile: "",
    email: "",
    specialRequest: "",
  });

  const { hotelId, optionId } = useParams();
  const cleanedHotelId = hotelId;
  const cleanedOptionId = optionId;

  console.log("hotelId", cleanedHotelId, cleanedOptionId);

  const steps = [
    {
      id: 1,
      title: "Traveller Details",
      subtitle: "Personal info",
      icon: <UserIcon />,
    },
    { id: 2, title: "Review", subtitle: "Check info", icon: <FileTextIcon /> },
    {
      id: 3,
      title: "Upload Document",
      subtitle: "Attach files",
      icon: <UploadIcon />,
    },
    {
      id: 4,
      title: "Payments",
      subtitle: "Complete payment",
      icon: <CreditCardIcon />,
    },
  ];

  const goNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const goPrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleStepClick = (stepId) => {
    if (stepId <= currentStep) setCurrentStep(stepId);
  };
  const handlePayment = () => {
    // Redirect to bank/payment gateway
    alert("Redirecting to payment gateway...");
    // window.location.href = '/bank-payment'; // real redirect
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Booking Progress
      </h1>
      <div className="w-full max-w-6xl relative flex justify-between mb-10">
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 z-0">
          <div
            className="h-full bg-grey-500 transition-all duration-500"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {steps.map((step) => {
          const status =
            currentStep > step.id
              ? "completed"
              : currentStep === step.id
              ? "current"
              : "upcoming";

          return (
            <div
              key={step.id}
              onClick={() => handleStepClick(step.id)}
              className="relative z-10 flex flex-col items-center cursor-pointer group"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full border-2 mb-2
                ${
                  status === "completed"
                    ? "bg-green-500 border-green-500 text-white"
                    : status === "current"
                    ? "bg-blue-500 border-blue-500 text-white ring-4 ring-blue-200"
                    : "bg-gray-300 border-gray-300 text-white"
                }`}
              >
                {status === "completed" ? <CheckIcon /> : step.icon}
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-gray-600">
                  {step.title}
                </p>
                <p className="text-xs text-gray-400">{step.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Stepper + Progress Bar */}
        <div className="md:col-span-8 border-r-1">
          <div className="rounded-lg">
            {currentStep === 1 && (
              <Step1TravellerDetails
                formData={formData}
                setFormData={setFormData}
                onNext={goNext}
              />
            )}
            {currentStep === 2 && (
              <Step2Review
                formData={formData}
                onPrev={goPrev}
                onNext={goNext}
              />
            )}

            {currentStep === 3 && (
              <Step3PersonalDocuments
                formData={formData}
                onPrev={goPrev}
                onNext={goNext}
              />
            )}
            {currentStep === 4 && (
              <Step4Payment amount={433.45} onConfirmPayment={handlePayment} />
            )}
          </div>
        </div>

        {/* Fare Summary (col-4) */}
        <div className="md:col-span-4">
          <div className="p-6 rounded-md text-sm space-y-4 ">
            <h3 className="font-semibold text-base text-gray-600">
              FARE SUMMARY
            </h3>
            <div className="flex justify-between border-b pb-2">
              <span>Base Fare</span>
              <span>₹818.50</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Taxes and fees</span>
              <span>₹11.80</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-800">
              <span>Total Amount Payable</span>
              <span>₹830.30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
