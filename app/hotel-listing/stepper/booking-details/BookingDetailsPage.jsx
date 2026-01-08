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
import { Spin, message, Modal, Input } from "antd";

message.config({
  top: 80,
  duration: 3,
});
import { postData, getData } from "@/services/NetworkAdapter";
import CancellationModal from "./CancellationModal";
import { printHotelBooking, downloadHotelBookingAsPDF, generateHotelTicketHTML } from "./HotelPrint";
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
  const [cancelling, setCancelling] = useState(false);
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [exportType, setExportType] = useState("print"); // "print" or "pdf"
  const [printOptions, setPrintOptions] = useState({
    withPrice: true,
    withAgency: true,
    withCancellation: true,
  });

  const [paymentModel, setPaymentModel] = useState(false);
  const [showWalletConfirm, setShowWalletConfirm] = useState(false);
  const [bookingLoadingWallet, setBookingLoadingWallet] = useState(false);
  const [paymsg, setPaymsg] = useState("");

  const { order, itemInfos } = bookingDetails || {};
  const hotelInfo = itemInfos?.HOTEL?.hInfo || {};
  const deliveryInfo = order?.deliveryInfo || {};
  const { bookingId: orderBookingId } = order || {};
  const status = order?.status;
  const totalAmount = order?.amount;

  useEffect(() => {
    console.log("Current Booking Status:", status);
  }, [status]);

  const handlePayClick = () => {
    console.log("Pay Now clicked, starting bookingReviewWIthWallet");
    setPaymsg("");
    bookingReviewWIthWallet();
  };

  useEffect(() => {
    console.log("paymentModel state changed:", paymentModel);
  }, [paymentModel]);

  const bookingReviewWIthWallet = async () => {
    console.log("bookingReviewWIthWallet ==> ");
    setBookingLoadingWallet(true);
    setPaymsg("");

    if (totalAmount && bookingId) {
      const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
      const finalAmount = Number(totalAmount) + Number(markup);

      const parameter = {
        bookingId,
        paymentInfos: [{ amount: finalAmount }],
      };

      // reduce amount in wallet and call the third party apis
      const payWallet = async () => {
        const reqpayWallet = {
          booking_id: bookingId,
          amount: finalAmount,
        };
        const result = await postData(
          "travelogy/flight/payWallet",
          reqpayWallet,
          { Authorization: `Bearer ${token}` }
        );
        console.log("payWallet result ===>", result);
        return result;
      };

      try {
        const payWalletRes = await payWallet();
        console.log("payWalletRes ==> ", payWalletRes);

        if (payWalletRes?.success) {
          // Confirm booking with hotel API
          const reqBody = {
            action: "conformBook",
            requestData: parameter,
          };

          const response = await postData("travelogy/hotel/fetch-data", reqBody);
          console.log("Booking response Success:", response);

          if (response?.error) {
            console.log("Booking error, refunding wallet...");
            // Refund wallet if booking fails
            await postData(
              "travelogy/flight/refundWallet",
              {
                booking_id: bookingId,
                amount: finalAmount,
              },
              { Authorization: `Bearer ${token}` }
            );
            setPaymsg({ message: "Booking failed, amount refunded to wallet." });
            setBookingLoadingWallet(false);
          } else {
            // Success
            setLoading(true);
            try {
              const fresh = await getBookingDetails(bookingId);
              setBookingDetails(fresh);
              setPaymentModel(false);
            } catch (e) {
              console.error("Refresh failed:", e);
              alert("Payment succeeded, but refreshing details failed. Please reload.");
            } finally {
              setLoading(false);
              setBookingLoadingWallet(false);
            }
          }
        } else {
          setPaymsg(payWalletRes);
          setBookingLoadingWallet(false);
        }
      } catch (error) {
        console.error("Wallet payment failed:", error);
        setPaymsg({ message: "An error occurred during wallet payment." });
        setBookingLoadingWallet(false);
      }
    } else {
      console.error("Booking ID or total price is missing");
      setPaymsg({ message: "Booking information is missing. Please try again." });
      setBookingLoadingWallet(false);
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
      case "share":
        setShareEmail(email || "");
        setShowShareModal(true);
        break;
      default:
        break;
    }
  };

  const handleShareEmail = async () => {
    if (!shareEmail) {
      message.error("Please enter an email address");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shareEmail)) {
      message.error("Please enter a valid email address");
      return;
    }

    setIsSharing(true);
    try {
      // Generate HTML content for the email
      const generatedHtml = generateHotelTicketHTML(bookingDetails, markup);

      const payload = {
        email: shareEmail,
        htmlContent: generatedHtml,
        subject: `Your Hotel Booking Ticket - ${bookingDetails?.order?.bookingId || ""}`
      };

      // Use the sharing endpoint
      const response = await postData("travelogy/common/share-booking", payload);

      if (response && !response.error) {
        message.success("Email sent successfully!");
        setTimeout(() => {
          setShowShareModal(false);
        }, 0);
      } else {
        message.error(response?.message || "Failed to share booking details. Please try again.");
      }
    } catch (err) {
      console.error("Share email error:", err);
      message.error("An error occurred while sharing. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!bookingDetails) {
      console.error("No booking details available for PDF generation");
      alert("Unable to generate PDF. Booking details are not available.");
      return;
    }
    setExportType("pdf");
    setShowPrintModal(true);
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

      if (response && !response.error) {
        console.log("Booking cancelled successfully:", response);

        // Refund to wallet logic
        try {
          const now = new Date();
          let cancellationCharge = 0;
          
          if (cancellationPolicy && cancellationPolicy.length > 0) {
            // Find applicable cancellation charge from policy
            const applicablePolicy = cancellationPolicy.find(policy => {
              const fromDate = new Date(policy.fdt);
              const toDate = new Date(policy.tdt);
              return now >= fromDate && now <= toDate;
            });

            if (applicablePolicy) {
              cancellationCharge = Number(applicablePolicy.am);
            } else {
              // If no matching period found, check if it's before the first period or after the last
              const firstPolicy = cancellationPolicy[0];
              const lastPolicy = cancellationPolicy[cancellationPolicy.length - 1];
              
              if (now < new Date(firstPolicy.fdt)) {
                cancellationCharge = 0; // Assuming free cancellation before first period
              } else if (now > new Date(lastPolicy.tdt)) {
                cancellationCharge = Number(lastPolicy.am);
              }
            }
          }

          const hotelPassenger = hotelInfo?.ops?.[0]?.ris || [];
          const totalBaseFareSum = hotelPassenger.reduce((sum, room) => {
            return sum + (room.tfcs?.BF || 0);
          }, 0);

          const finalRefundAmount = totalBaseFareSum - cancellationCharge;

          if (finalRefundAmount > 0) {
            const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
            const refundRes = await postData(
              "https://api.travelogy.co/travelogy/flight/refundWallet",
              {
                booking_id: bookingId,
                amount: finalRefundAmount,
              },
              { Authorization: `Bearer ${token}` }
            );
            console.log("Wallet refund result:", refundRes);
          }
        } catch (refundErr) {
          console.error("Error during wallet refund calculation/execution:", refundErr);
        }

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
        console.error("Error cancelling booking:", response?.error || response);
        alert(`Failed to cancel booking: ${response?.error || "Unknown error"}`);
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
    setExportType("print");
    setShowPrintModal(true);
  };

  const executePrint = () => {
    try {
      if (exportType === "print") {
        printHotelBooking(bookingDetails, markup, printOptions);
      } else {
        downloadHotelBookingAsPDF(bookingDetails, markup, printOptions);
      }
      setShowPrintModal(false);
    } catch (error) {
      console.error(`${exportType === "print" ? "Print" : "PDF"} failed:`, error);
      alert(`Failed to ${exportType === "print" ? "print" : "generate PDF"} booking details. Please try again.`);
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
                    disabled={bookingLoadingWallet}
                  >
                    {bookingLoadingWallet ? "Processing…" : "Pay Now"}
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
                        !bookingLoadingWallet && setShowOptions((prev) => !prev)
                      }
                      aria-haspopup="true"
                      aria-expanded={showOptions ? "true" : "false"}
                      disabled={bookingLoadingWallet}
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
                        !bookingLoadingWallet && setShowOptions((prev) => !prev)
                      }
                      aria-haspopup="true"
                      aria-expanded={showOptions ? "true" : "false"}
                      disabled={bookingLoadingWallet}
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
                        <button
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                          onClick={() => handleOptionClick("share")}
                        >
                          Share via Email
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
          <CancellationModal
            isOpen={showCancellationModal}
            onClose={() => setShowCancellationModal(false)}
            onConfirm={cancelBooking}
            cancellationPolicy={cancellationPolicy}
            isProcessing={cancelling}
          />

          <Modal
            title={<h2 className="text-xl font-bold text-orange-600 text-center">SHARE BOOKING DETAILS</h2>}
            open={showShareModal}
            onCancel={() => setShowShareModal(false)}
            footer={null}
            centered
          >
            <div className="p-4">
              <p className="mb-4 text-gray-600">Enter the email address you want to share the booking details</p>
              <Input
                placeholder="Enter email address"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                className="mb-6 h-12"
              />
              <div className="flex justify-center gap-4">
                <button
                  className="px-8 py-2 bg-gray-200 rounded hover:bg-gray-300 font-semibold"
                  onClick={() => setShowShareModal(false)}
                >
                  CANCEL
                </button>
                <button
                  className="book-now-btn px-8 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed font-semibold"
                  onClick={handleShareEmail}
                  disabled={isSharing}
                >
                  {isSharing ? "SHARING..." : "SHARE"}
                </button>
              </div>
            </div>
          </Modal>

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

          {showPrintModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
              <div className="bg-white rounded shadow-lg w-full max-w-lg p-0 overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b relative">
                  <h2 className="text-xl font-bold text-orange-600 text-center flex-1">
                    {exportType === "print" ? "PRINT YOUR HOTEL VOUCHER" : "DOWNLOAD YOUR HOTEL VOUCHER"}
                  </h2>
                  <button
                    onClick={() => setShowPrintModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-3xl absolute right-4 top-2"
                  >
                    &times;
                  </button>
                </div>
                <div className="p-10">
                  <div className="flex flex-wrap justify-center gap-6 mb-12">
                    <label className="flex items-center gap-2 cursor-pointer text-base font-medium">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="appearance-none w-5 h-5 border-2 rounded transition-all bg-white"
                          style={{ borderColor: "#f37021" }}
                          checked={printOptions.withPrice}
                          onChange={(e) =>
                            setPrintOptions({
                              ...printOptions,
                              withPrice: e.target.checked,
                            })
                          }
                        />
                        {printOptions.withPrice && (
                          <svg
                            className="absolute w-3.5 h-3.5 pointer-events-none"
                            style={{ color: "#f37021" }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      With Price
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-base font-medium">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="appearance-none w-5 h-5 border-2 rounded transition-all bg-white"
                          style={{ borderColor: "#f37021" }}
                          checked={printOptions.withAgency}
                          onChange={(e) =>
                            setPrintOptions({
                              ...printOptions,
                              withAgency: e.target.checked,
                            })
                          }
                        />
                        {printOptions.withAgency && (
                          <svg
                            className="absolute w-3.5 h-3.5 pointer-events-none"
                            style={{ color: "#f37021" }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      With Agency
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-base font-medium">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="appearance-none w-5 h-5 border-2 rounded transition-all bg-white"
                          style={{ borderColor: "#f37021" }}
                          checked={printOptions.withCancellation}
                          onChange={(e) =>
                            setPrintOptions({
                              ...printOptions,
                              withCancellation: e.target.checked,
                            })
                          }
                        />
                        {printOptions.withCancellation && (
                          <svg
                            className="absolute w-3.5 h-3.5 pointer-events-none"
                            style={{ color: "#f37021" }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      With Cancellation
                    </label>
                  </div>

                  <div className="flex justify-center">
                    <button
                      className="text-white px-16 py-3 rounded text-lg font-bold transition shadow-md uppercase"
                      style={{ backgroundColor: "#f37021" }}
                      onClick={executePrint}
                    >
                      {exportType === "print" ? "PRINT" : "DOWNLOAD"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {bookingLoadingWallet && (
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
