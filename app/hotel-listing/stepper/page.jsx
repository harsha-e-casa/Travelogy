"use client";
import React, { useState, useEffect } from "react";
// import { fetchHotelReviewData } from "../../../util/HotelApi";
import Skeleton from "../Skeleton";
import {
  Step1TravellerDetails,
  Step2Review,
  Step3PersonalDocuments,
  Step4Payment,
  HotelReviewComponent,
  FareAmount,
} from "./Stepper";
import Layout from "@/components/layout/Layout";
import { getBookingDetails } from "../../../util/HotelApi"; // Assuming this is where your getBookingDetails function is
// import { useSearchParams } from "next/navigation";

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
  const [hotelReviewData, setHotelReviewData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("formData");
    return savedFormData ? JSON.parse(savedFormData) : {};
  });
  const [Category1, setCategory1] = useState(null);
  useEffect(() => {
    if (formData) {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);
  if (error) {
    return (
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          <div className="flex flex-col items-center justify-center text-red-700 py-10 px-4">
            {/* <div className="p-6 rounded-lg  border-red-200 text-center"> */}
            <h2 className="text-xl font-semibold mb-2">
              Oops! Something went wrong.
            </h2>
            <p className="text-sm">{error}</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Retry Hotel Load
              </button>
            </div>
            {/* </div> */}
          </div>
        </main>
      </Layout>
    );
  }
  const PanRequired = hotelReviewData?.hInfo?.ops?.[0]?.ipr;
  const steps = [
    {
      id: 1,
      title: "Traveller Details",
      subtitle: "Personal info",
      icon: <UserIcon />,
    },
    { id: 2, title: "Review", subtitle: "Check info", icon: <FileTextIcon /> },
    ...(PanRequired !== false
      ? [
          {
            id: 3,
            title: "Upload Document",
            subtitle: "Attach files",
            icon: <UploadIcon />,
          },
        ]
      : []),
    {
      id: 4,
      title: "Payments",
      subtitle: "Complete payment",
      icon: <CreditCardIcon />,
    },
  ];

  // Handle Next Step
  const goNext = () => {
    if (
      currentStep === 2 &&
      formData?.guests &&
      hotelReviewData?.query?.roomInfo
    ) {
      const updatedRoomInfo = hotelReviewData.query.roomInfo.map(
        (room, index) => ({
          ...room,
          guests: [
            {
              name: `${formData.guests?.[index]?.firstName || ""} ${
                formData.guests?.[index]?.lastName || ""
              }`.trim(),
            },
            ...(formData.guests?.[index]?.extraGuests || []),
          ],
        })
      );

      setHotelReviewData((prev) => ({
        ...prev,
        query: {
          ...prev.query,
          roomInfo: updatedRoomInfo,
        },
      }));
    }

    // Skip Step 3 (Upload Document) and go directly to Step 4 (Payment) if PanRequired is true
    if (currentStep === 2 && PanRequired === false) {
      setCurrentStep(4); // Directly go to Step 4 (Payment)
    } else if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1); // Proceed to the next step
    }
  };

  // Handle Previous Step
  const goPrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Handle Click on Step (for direct navigation)
  const handleStepClick = (stepId) => {
    if (stepId <= currentStep) setCurrentStep(stepId);
  };

  const handlePayment = async (bookingId) => {
    try {
      if (!bookingId) {
        throw new Error("Booking ID is missing.");
      }

      console.log("Fetched booking details:", bookingId);
      localStorage.removeItem("formData");
      setFormData({});
      window.location.href = `/hotel-listing/stepper/booking-details/?bookingId=${bookingId}`;
    } catch (error) {
      console.error("Error during payment handling:", error.message);
    }
  };
  // useEffect(() => {
  //   // Example: Dynamically set Category1 based on some condition
  //   if (hotelReviewData) {
  //     setCategory1(hotelReviewData?.someCondition ? "someCategory" : null);
  //   }
  // }, [hotelReviewData]);
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div className="bg-gray-50 flex flex-col items-center justify-center py-4">
        <div className="w-full max-w-6xl relative flex justify-between mb-10">
          <div className="w-full flex justify-between items-center relative mb-10">
            {steps.map((step, index) => {
              const status =
                currentStep > step.id
                  ? "completed"
                  : currentStep === step.id
                  ? "current"
                  : "upcoming";

              const stepLabelMap = [
                "FIRST STEP",
                "SECOND STEP",
                ...(PanRequired === false ? [] : ["THIRD STEP"]),
                "FINISH",
              ];

              return (
                <div
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className="flex items-center gap-2 w-full group cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full
                        ${
                          status === "completed"
                            ? "bg-4aa301 text-white"
                            : status === "current"
                            ? "bg-black text-white ring-2 ring-gray-400"
                            : "bg-gray-200 text-gray-400"
                        }`}
                    >
                      {status === "completed" ? <CheckIcon /> : step.icon}
                    </div>
                  </div>

                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px] tracking-wide text-gray-500 uppercase">
                      {stepLabelMap[index]}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        status === "completed" ? "text-4aa301" : "text-gray-700"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>

                  {index !== steps.length - 1 && (
                    <div
                      className={`flex-1 h-px mx-4 ${
                        currentStep > step.id ? "bg-4aa301" : "bg-gray-300"
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-6">
          <HotelReviewComponent
            setHotelReviewData={setHotelReviewData}
            setLoading={setLoading}
            setError={setError}
          />

          {loading ? (
            <Skeleton />
          ) : (
            <>
              <div className="md:col-span-8 border-r-1">
                {currentStep === 1 && (
                  <Step1TravellerDetails
                    formData={formData}
                    setFormData={setFormData}
                    onNext={goNext}
                    hotelReviewData={hotelReviewData}
                  />
                )}
                {currentStep === 2 && (
                  <Step2Review
                    formData={formData}
                    onPrev={goPrev}
                    onNext={goNext}
                    Category1={Category1}
                    Category={"bbook"}
                    hotelReviewData={hotelReviewData}
                  />
                )}
                {currentStep === 3 && PanRequired !== false && (
                  <Step3PersonalDocuments
                    formData={formData}
                    setFormData={setFormData}
                    hotelReviewData={hotelReviewData}
                    onNext={goNext}
                  />
                )}

                {currentStep === 4 && (
                  <Step4Payment
                    formData={formData}
                    hotelReviewData={hotelReviewData}
                    amount={
                      hotelReviewData?.hInfo?.ops?.[0]?.ris?.[0]?.tfcs?.BF +
                      hotelReviewData?.hInfo?.ops?.[0]?.ris?.[0]?.tfcs?.TAF
                    }
                    bookingId={hotelReviewData?.bookingId}
                    onConfirmPayment={handlePayment}
                  />
                )}
              </div>

              <div className="md:col-span-4">
                <div className="p-6 rounded-md text-sm space-y-4">
                  <FareAmount
                    hotelReviewData={hotelReviewData}
                    Category={"bbook"}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
