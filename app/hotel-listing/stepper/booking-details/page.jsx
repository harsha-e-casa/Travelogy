"use client";
import React, { useState, useEffect, useRef } from "react";
import { getBookingDetails } from "../../../../util/HotelApi";
import { useSearchParams } from "next/navigation";
import { Step2Review, FareAmount } from "../../stepper/Stepper";
import Layout from "@/components/layout/Layout";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { DownOutlined } from "@ant-design/icons"; // Import the Ant Design Down icon

const BookingDetailsPage = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [Category2, setCategory2] = useState(null);
  const dropdownRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const handlePayClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirm = async () => {
    setShowModal(false);
    try {
      // Fetch the total amount from the booking details
      const amount = totalAmount;

      // Prepare the payment info to send to the API
      const paymentData = {
        bookingId: bookingId,
        paymentInfos: [{ amount: amount }],
      };

      // Make the API call to confirm the booking
      const response = await fetch(
        "https://apitest.tripjack.com/oms/v1/hotel/confirm-book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: "412605943ad923-4ae7-49f6-9c8e-8b75be573422",
          },
          body: JSON.stringify(paymentData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Handle the successful booking confirmation
        console.log("Booking Success:", data);
        alert("Booking confirmed successfully!");
        onConfirmPayment(bookingId);
      } else {
        // Handle the API error response
        console.error("Error confirming booking:", data);
        alert("Booking confirmation failed. Please try again.");
      }
    } catch (error) {
      // Handle any errors during the fetch or confirmation process
      console.error("Booking failed:", error);
      // alert("Booking failed. Please try again.");
    }
  };

  console.log("Booking ID from URL:", bookingId);

  useEffect(() => {
    if (bookingId) {
      getBookingDetails(bookingId)
        .then((data) => {
          console.log("API Response:", data);
          setBookingDetails(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching booking details:", error);
          setError("Failed to load booking details.");
          setLoading(false);
        });
    } else {
      setError("Booking ID is missing.");
      setLoading(false);
    }
  }, [bookingId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!bookingDetails || !bookingDetails.order || !bookingDetails.itemInfos) {
    return <div>Invalid booking details</div>;
  }

  const { order, itemInfos } = bookingDetails || {};
  const hotelInfo = itemInfos?.HOTEL?.hInfo || {};
  const deliveryInfo = order?.deliveryInfo || {};
  const { bookingId: orderBookingId, amount } = order || {};
  const rating = parseFloat(hotelInfo?.rt) || 0;
  const status = order?.status;
  // console.log("statusstatusstatusstatusstatusstatusstatusstatus", status);
  const totalAmount = order.amount;

  console.log("Formstatus Data:", order.amount);

  console.log("Form Data:", formData);
  console.log("Hotel Review Data (bookingDetails):", bookingDetails);
  const email = deliveryInfo.emails?.[0];
  const contact = deliveryInfo.contacts?.[0];
  const countryCode = deliveryInfo.code?.[0];

  console.log(`Email: ${email}`);
  console.log(`Contact: ${contact}`);
  console.log(`Country Code: ${countryCode}`);
  const handleOptionClick = (action) => {
    setShowOptions(false);
    switch (action) {
      case "cancel":
        cancelBooking(bookingId);
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
  const cancelBooking = async (bookingId) => {
    try {
      const response = await fetch(
        `https://apitest.tripjack.com/oms/v1/hotel/cancel-booking/${bookingId}`,
        {
          method: "POST",
          headers: {
            apikey: "412605943ad923-4ae7-49f6-9c8e-8b75be573422",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Booking cancelled successfully:", data);
        alert("Booking has been cancelled successfully.");
      } else {
        console.error("Error cancelling booking:", data);
        alert("Failed to cancel booking. Please try again.");
      }
    } catch (error) {
      console.error("Error in API call:", error);
      alert("An error occurred while cancelling the booking.");
    }
  };

  const handlePrint = () => {
    const content = document.querySelector(".print_pdf");
    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write(content.innerHTML);
    printWindow.document.close();
    printWindow.print();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    const content = document.querySelector(".print_pdf");

    if (content) {
      doc.html(content, {
        callback: function (doc) {
          doc.save("booking_details.pdf");
        },
        x: 15,
        y: 15,
        width: 180,
        html2canvas: {
          scale: 0.3,
          logging: true,
          letterRendering: true,
          useCORS: true,
        },
        autoPaging: true,
      });
    } else {
      console.error("No content found to generate PDF.");
    }
  };

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <main className="main">
        <div className="container w-full max-w-7xl">
          {status === "ON_HOLD" ? (
            <div className="p-6 flex justify-start items-center w-full">
              <img
                style={{ width: "50px", marginRight: "10px" }}
                src="/assets/imgs/tick.png"
                alt="tick"
              />
              <h6 className="status_texts">{status}</h6>
              <button
                className="book-now-btn bg-orange-500 hover:bg-orange-600 text-white ml-auto" // Added ml-auto to push the button to the right
                onClick={handlePayClick}
              >
                Pay Now
              </button>
            </div>
          ) : status === "CANCELLED" ? (
            <div className="p-6 flex justify-start items-center w-full">
              <img
                style={{ width: "50px", marginRight: "10px" }}
                src="/assets/imgs/tick.png"
                alt="tick"
              />
              <h6 className="status_texts">{status}</h6>
            </div>
          ) : (
            <div className="p-6 flex justify-between items-center w-full">
              <div className="flex items-center">
                <img
                  style={{ width: "50px", marginRight: "10px" }}
                  src="/assets/imgs/tick.png"
                  alt="tick"
                />
                <h6 className="status_texts">
                  {status
                    .replace(/_/g, " ")
                    .toLowerCase()
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </h6>
              </div>
              <div
                className="relative inline-block text-left"
                ref={dropdownRef}
              >
                <button
                  className="book-now-btn ml-auto" // Added ml-auto to push the button to the right
                  onClick={() => setShowOptions((prev) => !prev)}
                  aria-haspopup="true" // Add ARIA attributes for accessibility
                  aria-expanded={showOptions ? "true" : "false"}
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
          <h2 className="text-base font-light ml-6 -mt-4">
            Booking ID: {orderBookingId}
          </h2>
        </div>
        <div className="print_pdf container w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 border-r border-gray-200">
            <div className="text-base font-semibold">
              {bookingDetails ? (
                <Step2Review
                  formData={formData}
                  Category2={Category2}
                  Category={"abook"}
                  hotelReviewData={bookingDetails.itemInfos.HOTEL}
                  hotelReviewData1={bookingDetails?.order?.deliveryInfo}
                />
              ) : null}
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="p-6 rounded-md text-sm space-y-4">
              <FareAmount
                hotelReviewData={bookingDetails.itemInfos.HOTEL}
                Category={"abook"}
              />
            </div>
          </div>
        </div>{" "}
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
                >
                  BACK
                </button>
                <button
                  className="book-now-btn px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                  onClick={handleConfirm}
                >
                  CONTINUE
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default BookingDetailsPage;
