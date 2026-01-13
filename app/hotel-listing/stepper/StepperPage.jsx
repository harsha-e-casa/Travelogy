import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import SessionTimerWithModal from "./SessionTimer";
// import { fetchHotelReviewData } from "../../../util/HotelApi";
import Skeleton from "../Skeleton";
import {
  //   Step1TravellerDetails,
  //   Step2Review,
  //   Step3PersonalDocuments,
  Step4Payment,
  HotelReviewComponent,
  FareAmount,
} from "./Stepper";
import "./StepperPage.css";
const Step1TravellerDetails = dynamic(
  () => import("./Stepper").then((mod) => mod.Step1TravellerDetails),
  { ssr: false }
);
const Step2Review = dynamic(
  () => import("./Stepper").then((mod) => mod.Step2Review),
  { ssr: false }
);
const Step3PersonalDocuments = dynamic(
  () => import("./Stepper").then((mod) => mod.Step3PersonalDocuments),
  { ssr: false }
);

import Layout from "@/components/layout/Layout";
import Link from "next/link";

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
  // const [currentStep, setCurrentStep] = useState(1);
  const searchParams = useSearchParams();
  const hid = searchParams.get("hid");
  const oid = searchParams.get("oid");
  const stepKey = React.useMemo(
    () => `currentStep:${hid || "nohid"}:${oid || "nooid"}`,
    [hid, oid]
  );
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentModel, setPaymentModel] = useState(false);
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("formData");
    return savedFormData ? JSON.parse(savedFormData) : {};
  });
  
  // Markup State
  const [markup, setMarkup] = useState(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("hotelMarkupData");
      if (savedData) {
        try {
          const markupObj = JSON.parse(savedData);
          if (oid && markupObj.individual?.[oid] !== undefined) {
            return markupObj.individual[oid];
          }
          return markupObj.global || 0;
        } catch (e) {
          console.error(e);
        }
      }
      return Number(localStorage.getItem("hotelMarkup")) || 0;
    }
    return 0;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("hotelMarkupData");
      let markupObj = { global: 0, individual: {} };
      if (savedData) {
        try {
          markupObj = JSON.parse(savedData);
        } catch (e) {}
      }

      if (oid) {
        markupObj.individual = { ...markupObj.individual, [oid]: markup };
        localStorage.setItem("hotelMarkupData", JSON.stringify(markupObj));
      }
      // Also update legacy simple key for other consumers if needed, 
      // but strictly we are editing a specific room here so maybe not overwrite global 'hotelMarkup' unless we consider this global?
      // Existing logic was overwriting global. Let's keep it safe by NOT overwriting global if we are in specific flow.
      // But for backward compatibility with simple 'hotelMarkup' usage...
      // localStorage.setItem("hotelMarkup", markup); 
    }
  }, [markup, oid]);

  const router = useRouter();
  const apiOk = !loading && !error && Boolean(hotelReviewData);

  const stepperRef = useRef(null);

  useEffect(() => {
    if (stepperRef.current) {
      const activeStepElement = stepperRef.current.querySelector(
        `[data-step="${currentStep}"]`
      );
      if (activeStepElement) {
        activeStepElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentStep]);

  useEffect(() => {
    const saved = localStorage.getItem(stepKey);
    if (saved) {
      const num = Number(saved);
      if (!Number.isNaN(num) && num >= 1 && num <= 4) {
        setCurrentStep(num);
      }
    }
  }, [stepKey]);

  useEffect(() => {
    localStorage.setItem(stepKey, String(currentStep));
  }, [currentStep, stepKey]);
  const [Category1, setCategory1] = useState(null);
  useEffect(() => {
    if (formData) {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

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
  useEffect(() => {
    if (PanRequired === false && currentStep === 3) {
      setCurrentStep(4);
    }
    if (currentStep < 1) setCurrentStep(1);
    if (currentStep > 4) setCurrentStep(4);
  }, [PanRequired]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

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
              name: `${formData.guests?.[index]?.firstName || ""} ${formData.guests?.[index]?.lastName || ""
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

    if (currentStep === 2 && PanRequired === false) {
      setCurrentStep(4);
      return;
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goPrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleStepClick = (stepId) => {
    if (stepId <= currentStep) setCurrentStep(stepId);
  };

  const handlePayment = async (bookingId) => {
    try {
      if (!bookingId) {
        throw new Error("Booking ID is missing.");
      }
      localStorage.removeItem("formData");
      setFormData({});
      window.location.href = `/hotel-listing/stepper/booking-details/?bookingId=${bookingId}`;
    } catch (error) {
      console.error("Error during payment handling:", error.message);
    }
  };
  const isPanError =
    typeof error === "string" &&
    error.includes("Please, enter valid PAN number");

  const handleBackToListing = () => {
    if (!hotelReviewData?.query) {
      router.back();
      return;
    }

    const { checkinDate, checkoutDate, roomInfo, searchCriteria } =
      hotelReviewData.query;
    const cityId = searchCriteria?.city;
    const nationalityId = searchCriteria?.nationality;
    const currency = searchCriteria?.currency || "INR";

    // Calculate totals
    const totalAdults =
      roomInfo?.reduce((sum, r) => sum + (r.numberOfAdults || 0), 0) || 0;
    const totalChildren =
      roomInfo?.reduce((sum, r) => sum + (r.numberOfChild || 0), 0) || 0;
    const childAges = roomInfo?.flatMap((r) => r.childAge || []) || [];

    // Construct query params
    const params = new URLSearchParams({
      checkinDate: checkinDate || "",
      checkoutDate: checkoutDate || "",
      location: hotelReviewData?.hInfo?.ad?.city?.name || "", // Fallback location name
      city: cityId || "",
      nationality: nationalityId || "",
      currency: currency,
      rooms: (roomInfo?.length || 1).toString(),
      adults: totalAdults.toString(),
      children: totalChildren.toString(),
      childAges: JSON.stringify(childAges),
      roomsData: JSON.stringify(
        roomInfo?.map((r) => ({
          adults: r.numberOfAdults,
          children: r.numberOfChild,
          childAges: r.childAge || [],
        })) || []
      ),
    });

    router.push(`/hotel-listing?${params.toString()}`);
  };

  return (
    <Layout headerStyle={1} footerStyle={1}>
      {" "}
      {error && (
        <main className="main">
          <div className="flex flex-col items-center justify-center text-red-700 py-10 px-4">
            <h2 className="text-xl font-semibold mb-2">
              Oops! Something went wrong.
            </h2>
            <p className="text-sm">{error}</p>
            <div className="flex justify-center mt-4">
              {isPanError && (
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setCurrentStep(
                      hotelReviewData?.hInfo?.ops?.[0]?.ipr === false ? 4 : 3
                    );
                  }}
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition mr-3"
                  aria-label="Go to PAN step"
                  title="Fix PAN"
                >
                  PAN
                </button>
              )}{" "}
              <Link href="/hotels" passHref>
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                  Retry Hotel
                </button>
              </Link>{" "}
            </div>
          </div>{" "}
        </main>
      )}
      {!error && (
        <div className="bg-gray-50 flex flex-col items-center justify-center py-4">
          <div className="w-full max-w-6xl relative flex justify-between mb-10 stepper-steps">
            <div
              ref={stepperRef}
              className="w-full flex justify-between items-center relative mb-10 overflow-x-auto no-scrollbar"
            >
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
                  "THIRD STEP",
                  ...(PanRequired === false ? [] : ["THIRD STEP"]),
                  "FINISH",
                ];

                return (
                  <div
                    key={step.id}
                    data-step={step.id}
                    onClick={() => handleStepClick(step.id)}
                    className="flex items-center gap-2 w-full group cursor-pointer"
                  >
                    <div className="flex flex-col items-center justify-center text-center">
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full
                        ${status === "completed"
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
                        className={`text-sm font-medium ${status === "completed"
                            ? "text-4aa301"
                            : "text-gray-700"
                          }`}
                      >
                        {step.title}
                      </span>
                    </div>

                    {index !== steps.length - 1 && (
                      <div
                        className={`flex-1 h-px mx-4 ${currentStep > step.id ? "bg-4aa301" : "bg-gray-300"
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
              markup={markup}
            />

            {loading ? (
              <Skeleton />
            ) : (
              <>
                <div className="md:col-span-8 border-r-1 stepper-content p-3">
                  {currentStep === 1 && (
                    <Step1TravellerDetails
                      formData={formData}
                      setFormData={setFormData}
                      onNext={goNext}
                      hotelReviewData={hotelReviewData}
                      markup={markup}
                      setMarkup={setMarkup}
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
                      markup={markup}
                    />
                  )}
                  {currentStep === 3 && PanRequired !== false && (
                    <Step3PersonalDocuments
                      formData={formData}
                      setFormData={setFormData}
                      hotelReviewData={hotelReviewData}
                      onNext={goNext}
                      markup={markup}
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
                      setError={setError}
                      setCurrentStep={setCurrentStep}
                      markup={markup}
                      paymentModel={paymentModel}
                      setPaymentModel={setPaymentModel}
                    />
                  )}
                </div>
                {!paymentModel && (
                  <div className="hidden md:block md:col-span-4 desktop-fare-summary">
                    <FareAmount
                      hotelReviewData={hotelReviewData}
                      Category="bbook"
                      markup={markup}
                      setMarkup={setMarkup}
                      showEdit={currentStep === 1}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      <>
        {apiOk && !paymentModel && (
          <SessionTimerWithModal
            active={!loading && !error && !!hotelReviewData}
            startTime={Number(hotelReviewData?.conditions?.st ?? 0)}
            onBack={handleBackToListing}
          // onContinue={() => setOpen(false)}
          />
        )}
      </>
    </Layout>
  );
}
