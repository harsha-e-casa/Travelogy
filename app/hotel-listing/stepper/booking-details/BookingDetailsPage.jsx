"use client";
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  Suspense,
} from "react";
import { getBookingDetails } from "../../../../util/HotelApi";
import { useSearchParams } from "next/navigation";
import { Step2Review, FareAmount } from "../../stepper/Stepper";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { DownOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { postData, getData } from "@/services/NetworkAdapter";
import CancellationModal from "./CancellationModal";
import { printHotelBooking, downloadHotelBookingAsPDF } from "./HotelPrint";
import "../../stepper/StepperPage.css";
import "../../booking-mobile.css";

const BookingDetailsPage = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [markup, setMarkup] = useState(0);
  const [formData, setFormData] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [Category2, setCategory2] = useState(null);

  useEffect(() => {
    if (bookingId) {
      postData("travelogy/flight/get-markup", { bookingId }).then((res) => {
        if (res && res.markup !== undefined) {
          setMarkup(Number(res.markup));
        } else {
          const savedMarkup = localStorage.getItem("hotelMarkup");
          if (savedMarkup) {
            setMarkup(Number(savedMarkup));
          }
        }
      }).catch(err => {
        console.error("Error fetching markup from DB:", err);
        const savedMarkup = localStorage.getItem("hotelMarkup");
        if (savedMarkup) {
          setMarkup(Number(savedMarkup));
        }
      });
    }
  }, [bookingId]);
  const dropdownRef = useRef(null);
  const printRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [showCancellationModal, setShowCancellationModal] = useState(false);

  const handlePayClick = () => setShowModal(true);
  const handleCloseModal = () => !confirming && setShowModal(false);

  const handleConfirm = async () => {
    setShowModal(false);
    setConfirming(true);
    try {
      const amount = totalAmount;
      const paymentData = {
        bookingId,
        paymentInfos: [{ amount }],
      };

      // const response = await fetch(
      //   "https://apitest.tripjack.com/oms/v1/hotel/confirm-book",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       apikey: "412605943ad923-4ae7-49f6-9c8e-8b75be573422",
      //     },
      //     body: JSON.stringify(paymentData),
      //   }
      // );

      const reqBody = {
        action: "conformBook",
        requestData: paymentData,
      };

      const response = await postData("travelogy/hotel/fetch-data", reqBody);

      console.log("Booking response Success:", response);
      console.log("Booking response Success:", response.status);

      // const data = await response.json();

      // if (!response.ok) {
      //   console.error("Error confirming booking:", data);
      //   alert(
      //     data?.message || "Booking confirmation failed. Please try again."
      //   );
      //   return;
      // }

      // alert("Booking confirmed successfully!");

      setLoading(true);
      try {
        const fresh = await getBookingDetails(bookingId);
        setBookingDetails(fresh);
      } catch (e) {
        console.error("Refresh failed:", e);
        alert(
          "Payment succeeded, but refreshing details failed. Please reload."
        );
      } finally {
        setLoading(false);
      }

      if (typeof onConfirmPayment === "function") {
        setTimeout(() => {
          onConfirmPayment(bookingId);
        }, 20000);
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    } finally {
      setConfirming(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (bookingId) {
      getBookingDetails(bookingId, setError)
        .then((data) => {
          setBookingDetails(data);
          if (data?.error) {
            setError(data.error);
            // setErrorStatus(data.status || null);

            setLoading(false);
            return;
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching booking details:", error);
          setError(error.message);

          setLoading(false);
        });
    } else {
      setError("Booking ID is missing.");
      // setErrorStatus(data.status || null);

      setLoading(false);
    }
  }, [bookingId]);
  if (loading)
    return (
      <Layout headerStyle={1} footerStyle={1}>
        <div className="col-12 d-flex justify-center py-5">
          <div className="loader"></div>
        </div>
      </Layout>
    );
  if (error) {
    const isForbiddenError = error.includes("403");
    const isAccessDenied = error.includes("408");

    return (
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          <div className="flex flex-col items-center justify-center text-red-700 py-10 px-4">
            <h2 className="text-xl font-semibold mb-2">
              Oops! Something went wrong.
            </h2>
            <p className="text-sm">
              {isForbiddenError
                ? "You do not have permission to access this resource."
                : error}
            </p>
            {isAccessDenied && (
              <p className="text-sm mt-2 text-red-600">
                Error: Access Denied (Code: 408). Please contact support if you
                believe this is an error.
              </p>
            )}
            <div className="flex justify-center mt-4">
              {/* {isForbiddenError ? ( */}
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition mr-4"
              >
                Try Again
              </button>
              {/* ) : ( */}
              <Link href="/hotels" passHref>
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                  Retry Hotel
                </button>
              </Link>
              {/* )} */}
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  // if (!bookingDetails || !bookingDetails.order || !bookingDetails.itemInfos)
  //   return <div>Invalid booking details</div>;

  const { order, itemInfos } = bookingDetails || {};
  const hotelInfo = itemInfos?.HOTEL?.hInfo || {};
  const deliveryInfo = order?.deliveryInfo || {};
  const { bookingId: orderBookingId } = order || {};
  const status = order?.status;
  const totalAmount = order?.amount;

  const email = deliveryInfo.emails?.[0];
  const contact = deliveryInfo.contacts?.[0];
  const countryCode = deliveryInfo.code?.[0];

  const handleOptionClick = (action) => {
    setShowOptions(false);
    switch (action) {
      case "cancel":
        setShowCancellationModal(true);
        break;
      case "pdf":
        handleDownloadPDF();
        break;
      case "print":
        handlePrint();
        break;
      default:
        break;
    }
  };

  const handleDownloadPDF = async () => {
    if (!bookingDetails) {
      console.error("No booking details available for PDF generation");
      alert("Unable to generate PDF. Booking details are not available.");
      return;
    }

    try {
      await downloadHotelBookingAsPDF(bookingDetails, markup);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const cancelBooking = async () => {
    setShowCancellationModal(false);
    setCancelling(true);

    try {
      const reqBody = {
        action: "cancelBooking",
        requestData: {
          bookingId: bookingId,
          remarks: "User Requested Cancellation",
          requestType: "CANCEL",
          type: "HOTEL"
        },
      };

      const response = await postData("travelogy/hotel/fetch-data", reqBody);
 console.log("Initiating cancellation for response:", response);
      if (response) {
        console.log("Booking cancelled successfully:", response);

        try {
          const fresh = await getBookingDetails(bookingId);
          if (fresh?.error) {
            setError(fresh.error);
          } else {
            setBookingDetails(fresh);
          }
        } catch (e) {
          console.error("Refresh after cancel failed:", e);
          alert("Cancellation succeeded, but refreshing details failed. Please reload.");
        }
      } else {
        console.error("Error cancelling booking:", response);
        alert("Failed to cancel booking. Please try again.");
      }
    } catch (error) {
      console.error("Error in API call:", error);
      alert("An error occurred while cancelling the booking.");
    } finally {
      setCancelling(false);
    }
  };

  const handlePrint = () => {
    if (!bookingDetails) {
      console.error("No booking details available for printing");
      return;
    }

    try {
      printHotelBooking(bookingDetails, markup);
    } catch (error) {
      console.error("Print failed:", error);
      alert("Failed to print booking details. Please try again.");
    }
  };



  const statusLabel =
    status
      ?.replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase()) ?? "";

  // Extract cancellation policy
  const cancellationPolicy =
    bookingDetails?.itemInfos?.HOTEL?.hInfo?.ops?.[0]?.cnp?.pd || [];

  return (
    <Suspense
      fallback={
        <Layout headerStyle={1} footerStyle={1}>
          <div className="col-12 d-flex justify-center py-5">
            <div className="loader"></div>
          </div>
        </Layout>
      }
    >
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          <div className="print-container" ref={printRef}>
            <div
              className="print-logo print-only"
              style={{ textAlign: "center", marginBottom: 20 }}
            >
              <img
                src="/assets/imgs/logo-print.png"
                alt="Travelogy Logo"
                style={{ height: 50, width: "auto" }}
              />
            </div>
            <div className="container w-full max-w-7xl">
              {status === "ON_HOLD" ? (
                <div className="booking-status-container p-6 flex justify-start items-center w-full">
                  <img
                    style={{ width: "50px", marginRight: "10px" }}
                    src="/assets/imgs/tick.png"
                    alt="tick"
                  />
                  <h6 className="status_text1 print_pdf1">{statusLabel}</h6>
                  <button
                    className="book-now-btn bg-orange-500 hover:bg-orange-600 text-white ml-auto disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={handlePayClick}
                    disabled={confirming}
                  >
                    {confirming ? "Processing…" : "Pay Now"}
                  </button>
                </div>
              ) : status === "CANCELLED" ||
                status === "CANCELLATION_PENDING" ? (
                <div className="booking-status-container p-6 flex justify-between items-center w-full">
                  <div className="flex items-center">
                    <img
                      style={{ width: "50px", marginRight: "10px" }}
                      src="/assets/imgs/tick.png"
                      alt="tick"
                    />
                    <h6 className="status_text2 print_pdf1">{statusLabel}</h6>
                  </div>
                  <div
                    id="more-options"
                    className="relative inline-block text-left no-print"
                    ref={dropdownRef}
                  >
                    <button
                      className="book-now-btn ml-auto disabled:opacity-60 disabled:cursor-not-allowed"
                      onClick={() =>
                        !confirming && setShowOptions((prev) => !prev)
                      }
                      aria-haspopup="true"
                      aria-expanded={showOptions ? "true" : "false"}
                      disabled={confirming}
                    >
                      More Options
                      <DownOutlined className="ml-2 mt-1" />
                    </button>
                    {showOptions && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <button
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                          onClick={() => handleOptionClick("print")}
                        >
                          Print
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                          onClick={() => handleOptionClick("pdf")}
                        >
                          Download as PDF
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="booking-status-container p-6 flex justify-between items-center w-full">
                  <div className="flex items-center">
                    <img
                      style={{ width: "50px", marginRight: "10px" }}
                      src="/assets/imgs/tick.png"
                      alt="tick"
                    />
                    <h6 className="status_text3 print_pdf1">{statusLabel}</h6>
                  </div>
                  <div
                    id="more-options"
                    className="relative inline-block text-left no-print"
                    ref={dropdownRef}
                  >
                    <button
                      className="book-now-btn ml-auto disabled:opacity-60 disabled:cursor-not-allowed"
                      onClick={() =>
                        !confirming && setShowOptions((prev) => !prev)
                      }
                      aria-haspopup="true"
                      aria-expanded={showOptions ? "true" : "false"}
                      disabled={confirming}
                    >
                      More Options
                      <DownOutlined className="ml-2 mt-1" />
                    </button>
                    {showOptions && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <button
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                          onClick={() => handleOptionClick("cancel")}
                        >
                          Cancel Booking
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                          onClick={() => handleOptionClick("print")}
                        >
                          Print
                        </button>
                        <button
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                          onClick={() => handleOptionClick("pdf")}
                        >
                          Download as PDF
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <h2 className="print_pdf2 text-base font-light ml-6 -mt-4">
                Booking ID: {orderBookingId}
              </h2>
            </div>

            <div className="container w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 lg:border-r border-gray-200">
                <div className="print_pdf3 text-base font-semibold">
                  {bookingDetails ? (
                    <Step2Review
                      formData={formData}
                      Category2={Category2}
                      Category={"abook"}
                      hotelReviewData={bookingDetails?.itemInfos?.HOTEL}
                      hotelReviewData1={bookingDetails?.order?.deliveryInfo}
                      markup={markup}
                    />
                  ) : null}
                </div>
                <div className="mt-2 print-only">
                  <h3 className="text-lg font-semibold mb-2">
                    Total Fare Summary
                  </h3>
                  <div className="p-6 rounded-md text-sm space-y-4 border border-gray-200">
                    <FareAmount
                      hotelReviewData={bookingDetails?.itemInfos?.HOTEL}
                      Category={"abook"}
                      markup={markup}
                    />
                  </div>
                </div>
              </div>

              {/* Remove md:col-span-4 for PDF */}
              <div className="print_pdf4 lg:col-span-4 fare-summary-wrapper lg:block">
                <div className="p-6 rounded-md text-sm space-y-4">
                  <FareAmount
                    hotelReviewData={bookingDetails?.itemInfos?.HOTEL}
                    Category={"abook"}
                    markup={markup}
                  />
                </div>
              </div>
            </div>

            {/* For PDF Export, Remove the column classes and just keep container */}
            <div className="container w-full max-w-7xl">
              <div className="print_pdf3 text-base font-semibold print-only">
                {bookingDetails ? (
                  <Step2Review
                    formData={formData}
                    Category2={Category2}
                    Category={"abook"}
                    hotelReviewData={bookingDetails?.itemInfos?.HOTEL}
                    hotelReviewData1={bookingDetails?.order?.deliveryInfo}
                    markup={markup}
                  />
                ) : null}
              </div>
              <div className="mt-2 print-only">
                <h3 className="text-lg font-semibold mb-2">
                  Total Fare Summary
                </h3>
                <div className="p-6 rounded-md text-sm space-y-4 border border-gray-200">
                  <FareAmount
                    hotelReviewData={bookingDetails?.itemInfos?.HOTEL}
                    Category={"abook"}
                    markup={markup}
                  />
                </div>
              </div>
            </div>
          </div>
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
                <h2 className="text-center text-lg font-bold text-orange-600 mb-4">
                  CONFIRM TRANSACTION
                </h2>
                <p className="text-center mb-4">
                  You have choosen to make the following payment. Please confirm
                  to proceed.
                </p>
                <p className="text-center text-xl font-semibold mb-6">
                  ₹{totalAmount}
                </p>

                <div className="flex justify-center gap-4">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={handleCloseModal}
                    disabled={confirming}
                  >
                    BACK
                  </button>
                  <button
                    className="book-now-btn px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={handleConfirm}
                    disabled={confirming}
                  >
                    {confirming ? "Processing…" : "CONTINUE"}
                  </button>
                </div>
              </div>
            </div>
          )}
          <CancellationModal
            isOpen={showCancellationModal}
            onClose={() => setShowCancellationModal(false)}
            onConfirm={cancelBooking}
            cancellationPolicy={cancellationPolicy}
            isProcessing={cancelling}
          />

          {cancelling && (
            <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative text-center m-3">
                <div className="flex items-center justify-center gap-2">
                  <Spin size="medium" />
                  <span>Cancelling your booking…</span>
                </div>
              </div>
            </div>
          )}

          {confirming && (
            <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative text-center m-3">
                <div className="flex items-center justify-center gap-2">
                  <Spin size="medium" />
                  <span>Processing your payment…</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </Layout>
    </Suspense>
  );
};

export default BookingDetailsPage;
