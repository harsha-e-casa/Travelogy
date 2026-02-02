import { useContext, useEffect, useRef, useState } from "react";
import {
  postDataBookingDetails,
  postFareValidate,
  postUnHold,
  postSumbitAmendment,
  postAmendmentDetails,
  postData,
} from "@/services/NetworkAdapter";
import dayjs from "dayjs";
import { AppContext } from "@/util/AppContext";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import "./AmendmentPopup.jsx";
import "./TravellerDetailsModal.jsx";
import AmendmentPopup from "./AmendmentPopup.jsx";
import TravellerDetailsModal from "./TravellerDetailsModal.jsx";
import BarcodeGenerator from "./BarcodeGenerator.jsx";
import { request } from "http";
import { type } from "os";
import BookingForm from "@/components/elements/BookingForm";
import { DatePicker } from "antd";
import { printTicket, downloadTicketPdf, generateTicketHTML } from "./TicketPrint";
import "./style.css";
import { jwtDecode } from "jwt-decode";


// import staticBookingData from "./staticBookingData.json";

const Alldetails = ({ totalpricee }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const bookingId = searchParams.get("booking_id");
  const reStatus = searchParams.get("re");
  const [paymentFailurePopup, setPaymentFailurePopup] = useState(
    new URLSearchParams(window.location.search).get("payment") === "retry"
  );
  const [paymentModel, setPaymentModel] = useState(false);
  const [paymsg, setPaymsg] = useState("");

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [bookingDetails, setBookingdetails] = useState(null);
  const [segmentPrices, setSegmentPrices] = useState([]); // State for storing segment prices
  const [showAllPassengers, setShowAllPassengers] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [isNoPrintVisible, setNoPrintVisible] = useState(true);
  const printRef = useRef(null);
  const mobileAmendmentRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [fareType, setFareType] = useState("");
  const [afsAmount, setAfsAmount] = useState(0);
  const [rssrAmount, setRssrAmount] = useState(0);
  const [markup, setMarkup] = useState(0);

  useEffect(() => {
    const savedMarkup = localStorage.getItem("hotelMarkup");
    if (savedMarkup) {
      setMarkup(Number(savedMarkup));
    }
  }, []);

  // Calculate total amounts for Baggage, Meal, and Seat from bookingDetails
  let baggageTotal = 0;
  let mealTotal = 0;
  let seatTotal = 0;

  if (bookingDetails?.itemInfos?.AIR?.travellerInfos) {
    bookingDetails.itemInfos.AIR.travellerInfos.forEach((traveller) => {
      if (traveller?.ssrBaggageInfos) {
        Object.values(traveller.ssrBaggageInfos).forEach((item) => {
          baggageTotal += item.amount || 0;
        });
      }
      if (traveller?.ssrMealInfos) {
        Object.values(traveller.ssrMealInfos).forEach((item) => {
          mealTotal += item.amount || 0;
        });
      }
      if (traveller?.ssrSeatInfos) {
        Object.values(traveller.ssrSeatInfos).forEach((item) => {
          seatTotal += item.amount || 0;
        });
      }
    });
  }

  const [ticketData, setTicketData] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingLoadingWallet, setBookingLoadingWallet] = useState(false);

  useEffect(() => {
    if (bookingId) {
      const fetchMarkup = async () => {
        try {
          const res = await postData("travelogy/flight/get-markup", {
            bookingId,
          });
          if (res?.markup) {
            setMarkup(Number(res.markup));
          }
        } catch (error) {
          console.error("Error fetching markup:", error);
        }
      };
      fetchMarkup();
    }
  }, [bookingId]);

  // useEffect(() => {
  //   // setTicketData(...) once your parent passes it or your API completes.
  //   // Example seed so you can test print now:
  //   setTicketData({
  //     bookingRef: "6PNR12",
  //     airlineLogo:
  //       "https://upload.wikimedia.org/wikipedia/commons/4/4b/IndiGo_Airlines_logo.svg",
  //     airlineName: "IndiGo",
  //     passengers: [
  //       { title: "MR", firstName: "ARUN", lastName: "K", pnr: "AB12CD" },
  //       { title: "MS", firstName: "PRIYA", lastName: "R" },
  //     ],
  //     segments: [
  //       {
  //         flightNo: "6E-502",
  //         from: { code: "MAA", name: "Chennai" },
  //         to: { code: "DEL", name: "Delhi" },
  //         depTime: "2025-11-05T06:00:00+05:30",
  //         arrTime: "2025-11-05T08:30:00+05:30",
  //         durationMins: 150,
  //         cabin: "ECONOMY",
  //         fareClass: "T",
  //       },
  //     ],
  //     contact: { email: "user@email.com", phone: "+91 9xxxx xxxxx" },
  //   });
  // }, []);

  const openPrintWindowSync = (name) => {
    // 1) Try normal window.open with only 'noopener'
    let win = window.open("", name, "noopener,width=900,height=1200");
    if (win) return win;

    // 2) Fallback: anchor-click trick (often bypasses blockers)
    const a = document.createElement("a");
    a.href = "about:blank";
    a.target = name;
    a.rel = "noopener"; // do NOT use noreferrer here
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // 3) Grab a handle to the newly opened named window
    try {
      win = window.open("", name);
    } catch (_) {
      win = null;
    }
    return win;
  };

  const handlePrintv1 = () => {
    if (!ticketData) return;
    printTicket(ticketData);
  };

  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const [amendmentId, setAmendmentId] = useState(null);
  const [submitAmmendmentDetails, setSumitAmendmentDetails] = useState(null);
  const [amendmentDetailData, setAmendmentDetailData] = useState(null);

  const { setCookie } = useContext(AppContext);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [showTravellerModal, setShowTravellerModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedAmendmentId, setSelectedAmendmentId] = useState(null);
  const [travellerData, setTravellerData] = useState(null);
  const [validateSuccess, setValidateSuccess] = useState(null);

  const [rescheduleDate, setRescheduleDate] = useState("");

  const toggleAllPassengers = () => {
    setShowAllPassengers((prev) => !prev);
  };

  const [isReIssueModalOpen, setIsReIssueModalOpen] = useState(false);
  const [selectedTravellers, setSelectedTravellers] = useState([]);

  // Email Share State
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailToShare, setEmailToShare] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);

  const handleOpenEmailModal = () => {
    const defaultEmail = bookingDetails?.order?.deliveryInfo?.emails?.[0] || "";
    setEmailToShare(defaultEmail);
    setShowEmailModal(true);
  };

  const handleEmailShare = async () => {
    if (!emailToShare) {
      setError("Please enter an email address.");
      return;
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailToShare)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setEmailLoading(true);

      // Generate HTML on client side
      const generatedHtml = generateTicketHTML(bookingDetails, markup);

      const payload = {
        email: emailToShare,
        htmlContent: generatedHtml,
        subject: `Your Booking Ticket - ${bookingDetails?.order?.bookingId || ""}`
      };

      // Use "travelogy/common/share-booking" endpoint
      await postData("travelogy/common/share-booking", payload);

      // alert("Ticket sent successfully!");
      setShowEmailModal(false);
    } catch (err) {
      console.error("Share email error:", err);
      setError(err?.response?.data?.message || "Failed to send email. Please try again.");
    } finally {
      setEmailLoading(false);
    }
  };

  useEffect(() => {
    const afsAmt =
      bookingDetails?.itemInfos?.AIR?.totalPriceInfo?.totalFareDetail?.fC?.AFS;
    // const adultAfs = bookingDetails?.itemInfos?.AIR?.tripInfos?.[0]?.sI?.[0]?.bI?.tI?.[0]?.fd?.fC?.AFS;
    // const childAfs = bookingDetails?.itemInfos?.AIR?.tripInfos?.[0]?.sI?.[0]?.bI?.tI?.[0]?.fd?.fC?.AFS;
    // const infantAfs = bookingDetails?.itemInfos?.AIR?.tripInfos?.[0]?.sI?.[0]?.bI?.tI?.[0]?.fd?.fC?.AFS;
    setAfsAmount(afsAmt);
    const rssrAmt =
      bookingDetails?.itemInfos?.AIR?.totalPriceInfo?.totalFareDetail?.fC?.RSSR;
    setRssrAmount(rssrAmt);
  }, [bookingDetails]);

  // const createStructuredData = (bookingDetails) => {
  //   console.log("bookingDetailsbookingDetails -------- bookingDetails ",bookingDetails)
  //   const result = {
  //     pnrs: {},
  //     pnrFlightDetails: {},
  //     pnrPassengerDetails: {},
  //   };

  //   const pnrMap = {};
  //   const pnrPassengers = {};

  //   bookingDetails.itemInfos.AIR.travellerInfos.forEach((traveller) => {
  //     Object.entries(traveller.pnrDetails).forEach(([segmentKey, pnr]) => {
  //       bookingDetails.itemInfos.AIR.tripInfos.forEach((trip) => {
  //         trip.sI.forEach((segment) => {
  //           if (
  //             segment.da.code === segmentKey.split("-")[0] &&
  //             segment.aa.code === segmentKey.split("-")[1]
  //           ) {

  //             if (!pnrMap[pnr]) pnrMap[pnr] = [];
  //             pnrMap[pnr].push(segment);

  //             if (!pnrPassengers[pnr]) pnrPassengers[pnr] = [];
  //             pnrPassengers[pnr].push({
  //               firstName: traveller.fN,
  //               lastName: traveller.lN,
  //               title: traveller.ti,
  //               passengerType: traveller.pt,
  //             });
  //           }
  //         });
  //       });
  //     });
  //   });

  //   Object.entries(pnrMap).forEach(([pnr, segments]) => {
  //     segments.sort((a, b) => new Date(a.dt) - new Date(b.dt));
  //     const fromCode = segments[0].da.code;
  //     const toCode = segments[segments.length - 1].aa.code;
  //     const journeyKey = `${fromCode}-${toCode}`;

  //     result.pnrs[journeyKey] = pnr;

  //     result.pnrFlightDetails[journeyKey] = {
  //       flightNumber: segments.map((s) => s.fD.fN).join("/"),
  //       from: segments[0].da.city,
  //       to: segments[segments.length - 1].aa.city,
  //       departureTime: segments[0].dt,
  //       arrivalTime: segments[segments.length - 1].at,
  //     };

  //     const uniquePassengers = [];
  //     const seen = new Set();
  //     pnrPassengers[pnr].forEach((p) => {
  //       const key = `${p.firstName}-${p.lastName}-${p.title}`;
  //       if (!seen.has(key)) {
  //         uniquePassengers.push(p);
  //         seen.add(key);
  //       }
  //     });
  //     result.pnrPassengerDetails[journeyKey] = uniquePassengers;
  //   });

  //   console.log("resultresultresult--result == ",result)

  //   return result;
  // };

  // const createStructuredData = (bookingDetails) => {
  //   console.log("bookingDetails -------- bookingDetails ", bookingDetails);
  //   const result = {
  //     pnrs: {},
  //     pnrFlightDetails: {},
  //     pnrPassengerDetails: {},
  //   };

  //   const pnrMap = {};
  //   const pnrPassengers = {};

  //   bookingDetails.itemInfos.AIR.travellerInfos.forEach((traveller) => {
  //     Object.entries(traveller.pnrDetails).forEach(([segmentKey, pnr]) => {
  //       bookingDetails.itemInfos.AIR.tripInfos.forEach((trip) => {
  //         trip.sI.forEach((segment) => {
  //           if (
  //             segment.da.code === segmentKey.split("-")[0] &&
  //             segment.aa.code === segmentKey.split("-")[1]
  //           ) {
  //             if (!pnrMap[pnr]) pnrMap[pnr] = [];
  //             pnrMap[pnr].push(segment);

  //             if (!pnrPassengers[pnr]) pnrPassengers[pnr] = [];
  //             pnrPassengers[pnr].push({
  //               firstName: traveller.fN,
  //               lastName: traveller.lN,
  //               title: traveller.ti,
  //               passengerType: traveller.pt,
  //             });
  //           }
  //         });
  //       });
  //     });
  //   });

  //   Object.entries(pnrMap).forEach(([pnr, segments]) => {
  //     segments.forEach((segment) => {
  //       const journeyKey = `${segment.da.code}-${segment.aa.code}`;
  //       result.pnrs[journeyKey] = pnr;
  //       result.pnrFlightDetails[journeyKey] = {
  //         flightNumber: segment.fD.fN,
  //         from: segment.da.city,
  //         to: segment.aa.city,
  //         departureTime: segment.dt,
  //         arrivalTime: segment.at,
  //       };

  //       const uniquePassengers = [];
  //       const seen = new Set();
  //       pnrPassengers[pnr].forEach((p) => {
  //         const key = `${p.firstName}-${p.lastName}-${p.title}`;
  //         if (!seen.has(key)) {
  //           uniquePassengers.push(p);
  //           seen.add(key);
  //         }
  //       });
  //       result.pnrPassengerDetails[journeyKey] = uniquePassengers;
  //     });
  //   });

  //   console.log("result == ", result);

  //   return result;
  // };

  const createStructuredData = (bookingDetails) => {
    const result = {
      pnrs: {},
      pnrFlightDetails: {},
      pnrPassengerDetails: {},
    };

    bookingDetails.itemInfos.AIR.tripInfos.forEach((trip) => {
      const segments = trip.sI;
      if (!segments.length) return;

      // Journey key: from first departure to last arrival
      const fromCode = segments[0].da.code;
      const toCode = segments[segments.length - 1].aa.code;
      const journeyKey = `${fromCode}-${toCode}`;

      // Collect all involved segment keys
      const involvedSegmentKeys = segments.map(
        (seg) => `${seg.da.code}-${seg.aa.code}`
      );

      // Collect all unique PNRs from travellerInfos' pnrDetails for these segment keys
      const pnrSet = new Set();
      if (bookingDetails.itemInfos.AIR.travellerInfos) {
        bookingDetails.itemInfos.AIR.travellerInfos.forEach((traveller) => {
          if (traveller.pnrDetails) {
            Object.entries(traveller.pnrDetails).forEach(([segKey, pnr]) => {
              if (involvedSegmentKeys.includes(segKey)) {
                pnrSet.add(pnr);
              }
            });
          }
        });
      }

      // Join all unique PNRs with `/`
      const pnr = [...pnrSet].join("/") || "UNKNOWN";

      // Collect all passengers (from travellerInfos)
      let passengers = [];
      if (bookingDetails.itemInfos.AIR.travellerInfos) {
        passengers = bookingDetails.itemInfos.AIR.travellerInfos.map(
          (traveller) => ({
            firstName: traveller.fN,
            lastName: traveller.lN,
            title: traveller.ti,
            passengerType: traveller.pt,
          })
        );
      }

      // Combine flight numbers for all segments
      result.pnrs[journeyKey] = pnr;
      result.pnrFlightDetails[journeyKey] = {
        flightNumber: segments.map((s) => s.fD.fN).join("/"),
        from: segments[0].da.city,
        to: segments[segments.length - 1].aa.city,
        departureTime: segments[0].dt,
        arrivalTime: segments[segments.length - 1].at,
      };
      result.pnrPassengerDetails[journeyKey] = passengers;
    });

    return result;
  };

  const [rescheduleData, setRescheduleData] = useState(null);
  const [selectedPNR, setSelectedPNR] = useState(null);
  const [reissueApiError, setReissueApiError] = useState("");

  const handlePNRSelect = (pnr) => {
    setSelectedPNR(pnr);
    setSelectedTravellers([]);
  };

  const getTravellerCategoryCount = (type) => {
    // type should be 'ADULT', 'CHILD', or 'INFANT'
    return selectedTravellers.filter(
      (traveller) => traveller.passengerType === type
    ).length;
  };

  const getTotalTravellerCategoryCount = (type) => {
    if (selectedPNR && rescheduleData.pnrPassengerDetails[selectedPNR]) {
      return rescheduleData.pnrPassengerDetails[selectedPNR].filter(
        (traveller) => traveller.passengerType === type
      ).length;
    }
  };

  const [rescheduleError, setRescheduleError] = useState("");
  const [rescheduleLoading, setRescheduleLoading] = useState(false);

  const getAllTravellerIndexes = () => {
    return selectedTravellers.map((traveller) => traveller.index + 1);
  };

  const handleSubmitReIssue = async () => {

    setRescheduleLoading(true);
    setRescheduleError("");
    setReissueApiError("");

    const pnr = rescheduleData.pnrs[selectedPNR] || "";
    const pnrKey = Object.keys(rescheduleData.pnrs).find(
      (key) => rescheduleData.pnrs[key] === pnr
    );

    const [from, to] = pnrKey.split("-");

    const parameter = {
      paxInfo: {
        ADULT: getTotalTravellerCategoryCount("ADULT"),
        CHILD: getTotalTravellerCategoryCount("CHILD"),
        INFANT: getTotalTravellerCategoryCount("INFANT"),
      },
      routeInfos: [
        {
          fromCityOrAirport: {
            code: from,
          },
          toCityOrAirport: {
            code: to,
          },
          travelDate: rescheduleDate,
        },
      ],
      oldBookingId: bookingId,
      pnr: pnr,
      paxIds: getAllTravellerIndexes(),

      // paxIds: [
      //   getTravellerCategoryCount("ADULT") +
      //   getTravellerCategoryCount("CHILD") +
      //   getTravellerCategoryCount("INFANT"),
      // ],
    };

    try {
      let reqData = { action: "searchQuery", requestData: parameter };
      const result = await postData("travelogy/one-way/fetch-data", reqData);

      if (result?.searchQuery?.requestId) {
        // call search using requestid
        setCookie("rs_data", JSON.stringify(result));
        const mydata = {
          requestId: result?.searchQuery?.requestId,
        };
        const queryString = new URLSearchParams(mydata).toString();
        // router.push(`/tickets?${queryString}`);
        setRescheduleLoading(false);
        router.push(`/rescheduletickets?${queryString}`);
      } else if (result?.errCode === "810" || result?.message) {
        setReissueApiError(result?.message);
        setRescheduleLoading(false);
      } else if (result?.errors?.[0]?.message) {
        setRescheduleError(result?.errors?.[0]?.message);
        setRescheduleLoading(false);
      }
    } catch (error) {
      setRescheduleLoading(false);
      setReissueApiError("Something went wrong with the request.");
    }
  };

  const openReIssueModal = () => {
    const rescheduleData = createStructuredData(bookingDetails);
    setRescheduleData(rescheduleData);
    setIsReIssueModalOpen(true);
  };

  const closeReIssueModal = () => {
    setRescheduleError("");
    setIsReIssueModalOpen(false);
  };

  const handleCancellation = async () => {
    // console.log("handleCancellation function == > ");
    // try {
    //   let reqData = { action: "amendmentCharges", requestData: parameter };
    //   const result = await postData("travelogy/one-way/fetch-data", reqData);
    //   console.log("resultttttttttt ", result);
    // } catch (error) {
    //   console.log("handlePayNow error ", error);
    // }
  };

  const handleUnHold = async () => {
    setPaymentFailurePopup(false);
    setModalLoading(true);

    // Validate Fare
    // const validateFare = async () => {};

    // Call validateFare function to validate the booking details
    // await validateFare();

    const travellerInfos = bookingDetails?.itemInfos?.AIR?.travellerInfos || [];
    const pnrs = [];

    if (Array.isArray(travellerInfos)) {
      travellerInfos.forEach((traveller) => {
        const pnrDetails = traveller.pnrDetails;
        if (pnrDetails && typeof pnrDetails === "object") {
          const pnrValues = Object.values(pnrDetails);
          pnrs.push(...pnrValues);
        }
      });
    }

    const unHoldParams = {
      bookingId: bookingId,
      pnrs: pnrs,
    };

    try {
      // const result = await postUnHold(unHoldParams);
      let reqData = { action: "unholdBooking", requestData: unHoldParams };
      const result = await postData("travelogy/one-way/fetch-data", reqData);

      if (result?.status?.success === true) {
        window.location.reload();
      } else if (result?.errCode === "1072") {
        setError(result?.message || "Cancellation not available for PNR");
      } else {
        setError("Unhold operation failed");
      }
    } catch (err) {
      console.error("error caused", err);

      if (err?.response?.data?.errors?.length) {
        const firstError = err.response.data.errors[0];
        const message = firstError?.message || "An unknown error occurred.";
        setError(message);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setModalLoading(false);
    }
  };

  const swapBarcodesForImages = () => {
    const swaps = [];

    // 1) Canvas -> PNG <img>
    document.querySelectorAll("canvas[data-barcode]").forEach((cnv) => {
      try {
        const dataURL = cnv.toDataURL("image/png");
        const img = document.createElement("img");
        img.src = dataURL;
        img.style.maxWidth = "100%";
        cnv.parentNode.insertBefore(img, cnv);
        cnv.style.display = "none";
        swaps.push(() => {
          cnv.style.display = "";
          img.remove();
        });
      } catch { }
    });

    // 2) SVG -> PNG <img>
    document.querySelectorAll("svg[data-barcode]").forEach((svg) => {
      try {
        const svgString = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgString], {
          type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);

        const img = new Image();
        img.onload = () => URL.revokeObjectURL(url);
        img.src = url;
        img.style.maxWidth = "100%";
        svg.parentNode.insertBefore(img, svg);
        svg.style.display = "none";
        swaps.push(() => {
          svg.style.display = "";
          img.remove();
        });
      } catch { }
    });

    return () => swaps.forEach((undo) => undo());
  };

  const handleDownload = async () => {
    const { jsPDF } = await import("jspdf");
    const html2canvas = (await import("html2canvas")).default;

    setNoPrintVisible(false);

    if (document.fonts?.ready) await document.fonts.ready;
    await new Promise((r) =>
      requestAnimationFrame(() => requestAnimationFrame(r))
    );

    const undo = swapBarcodesForImages();

    try {
      // Render the element as canvas
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        svgRendering: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 10; // 10 mm margin
      const imgProps = pdf.getImageProperties(imgData);

      // Calculate scaled dimensions with margins
      const pdfWidth = pageWidth - margin * 2;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Check if image height exceeds page height
      let position = margin;
      if (pdfHeight > pageHeight - margin * 2) {
        // scale height to fit page
        const scaleFactor = (pageHeight - margin * 2) / pdfHeight;
        pdf.addImage(
          imgData,
          "PNG",
          margin,
          position,
          pdfWidth * scaleFactor,
          pdfHeight * scaleFactor,
          undefined,
          "FAST"
        );
      } else {
        pdf.addImage(
          imgData,
          "PNG",
          margin,
          position,
          pdfWidth,
          pdfHeight,
          undefined,
          "FAST"
        );
      }

      pdf.save("ticket.pdf");
    } finally {
      undo();
      setNoPrintVisible(true);
    }
  };

  // const handleDownload = async () => {
  //   const { jsPDF } = await import("jspdf");
  //   const html2canvas = (await import("html2canvas")).default;

  //   setNoPrintVisible(false);

  //   if (document.fonts?.ready) await document.fonts.ready;
  //   await new Promise((r) =>
  //     requestAnimationFrame(() => requestAnimationFrame(r))
  //   );

  //   const undo = swapBarcodesForImages();

  //   try {
  //     const canvas = await html2canvas(printRef.current, {
  //       scale: 2,
  //       useCORS: true,
  //       allowTaint: false,
  //       svgRendering: true,
  //     });

  //     const imgData = canvas.toDataURL("image/png");

  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const pageWidth = pdf.internal.pageSize.getWidth();
  //     const imgProps = pdf.getImageProperties(imgData);
  //     const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;
  //     pdf.addImage(
  //       imgData,
  //       "PNG",
  //       0,
  //       0,
  //       pageWidth,
  //       pdfHeight,
  //       undefined,
  //       "FAST"
  //     );
  //     pdf.save("ticket.pdf");
  //   } finally {
  //     undo();
  //     setNoPrintVisible(true);
  //   }
  // };

  const [loginPhone, setLoginPhone] = useState(null)

  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken");
      const decoded = jwtDecode(token);
      setLoginPhone(decoded.phone);

    } catch {
      // setIsVisible(false);
    }
  }, []);

  const handlePrint = async (ref) => {
    const html2canvas = (await import("html2canvas")).default;

    setNoPrintVisible(false);

    if (document.fonts?.ready) await document.fonts.ready;
    await new Promise((r) =>
      requestAnimationFrame(() => requestAnimationFrame(r))
    );

    const undo = swapBarcodesForImages(); // make sure barcodes show up

    try {
      // Render the element as canvas
      const canvas = await html2canvas(ref.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        svgRendering: true,
      });

      // Convert canvas to image
      const imgData = canvas.toDataURL("image/png");

      // Open a new window for printing
      const printWindow = window.open("", "_blank");

      printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Ticket</title>
          <style>
            body { margin: 0; padding: 0; text-align: center; }
            img { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          <img src="${imgData}" />
        </body>
      </html>
    `);

      printWindow.document.close();
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    } finally {
      undo();
      setNoPrintVisible(true);
    }
  };

  // const handlePayNow = async () => {
  //   setModalLoading(true);
  //   const parameter = { bookingId: bookingId };
  //   try {
  //     let reqData = { action: "fareValidate", requestData: parameter };
  //     const result = await postData("travelogy/one-way/fetch-data", reqData);

  //     if (result?.status?.success === true) {
  //       const fetchBookingData = await postData(
  //         "travelogy/flight/fetch-booking-data",
  //         { bookingId: bookingId }
  //       );
  //       const airBookParameter = {
  //         bookingId: bookingId,
  //         paymentInfos: [
  //           {
  //             amount: fetchBookingData?.data?.[0]?.amount,
  //           },
  //         ],
  //       };
  //       let reqData = { action: "conformBook", requestData: airBookParameter };
  //       const airBookResponse = await postData(
  //         "travelogy/one-way/fetch-data",
  //         reqData
  //       );
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     console.log("handlePayNow error ", error);
  //   }
  //   setModalLoading(false);
  // };

  const handlePayNow = async () => {
    setPaymentFailurePopup(false);
    // setModalLoading(true);
    setBookingLoading(true);

    try {
      // 1. Validate Fare
      const reqValidate = {
        action: "fareValidate",
        requestData: { bookingId },
      };
      const validateRes = await postData(
        "travelogy/one-way/fetch-data",
        reqValidate
      );

      if (!validateRes?.status?.success) {
        // alert("Fare validation failed. Please try again.");
        setModalLoading(false);
        return;
      }

      // 2. Fetch booking fare info
      const fetchBookingData = await postData(
        "travelogy/flight/fetch-booking-data",
        { bookingId }
      );

      const payableAmount = fetchBookingData?.data?.[0]?.amount;
      if (!payableAmount) {
        // alert("Amount not found.");
        setModalLoading(false);
        return;
      }

      // 3. Prepare payload for backend to start CCAvenue Payment
      const frontendUrl = window.location.href; // Return URL after payment
      const paymentRequest = {
        booking_id: bookingId,
        amount: payableAmount,
        fe_url: frontendUrl, // your current page
        data: {
          action: "conformBook",
          requestData: {
            bookingId: bookingId,
            paymentInfos: [{ amount: payableAmount }],
          },
        },
      };

      // 4. Call backend createPayment API
      const paymentRes = await postData(
        "travelogy/payment/ccavenue/create",
        paymentRequest
      );

      if (!paymentRes?.fields?.encRequest || !paymentRes?.fields?.access_code) {
        // alert("Payment initiation failed.");
        setModalLoading(false);
        return;
      }

      // 5. Create and auto-submit hidden form to CCAvenue
      const form = document.createElement("form");
      form.method = "POST";
      form.action = paymentRes.action;
      form.style.display = "none";

      Object.entries(paymentRes.fields).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit(); // 🔥 Redirects to CCAvenue Payment Page
    } catch (error) {
      // console.log("handlePayNow error ", error);
    }

    // setModalLoading(false);
    setBookingLoading(true);
  };

  function formatDateTime(isoString) {
    if (!isoString) return "";
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const date = new Date(isoString);
    return date.toLocaleString("en-IN", options); // Change locale as needed
  }

  const fetchFareType = async (bookingId) => {
    if (!bookingId) return;

    try {
      let reqData = { bookingId };
      const data = await postData("/travelogy/flight/fetch-fare-type", reqData);
      if (data?.bookingData?.fare_type)
        setFareType(data?.bookingData?.fare_type);
    } catch (e) {
      // console.log("error in fetchFareType ", e);
    }
  };

  const bookingDetailsapi = async (bookingId) => {
    setLoading(true);
    setError(null);

    if (!bookingId) {
      setError("Booking ID is missing");
      setLoading(false);
      return;
    } else {
      // console.log("found");
    }

    try {
      const parameter = { bookingId: bookingId, requirePaxPricing: true };

      let reqData = { action: "bookingDetails", requestData: parameter };
      // const data = await postData("travelogy/one-way/fetch-data", reqData);
      const token = localStorage.getItem("authToken");
      const data = await postData("travelogy/one-way/fetch-data", reqData, {
        Authorization: `Bearer ${token}`,
      });

      // const data = await postDataBookingDetails(parameter);

      if (data?.error) {
        setError(data?.error);
      }

      setBookingdetails(data);

      // save the bookingstatus
      const saveBookingStatus = async () => {
        let phoneFromToken = null;
        try {
          const token = localStorage.getItem("authToken");
          if (token) {
            const decoded = jwtDecode(token);
            phoneFromToken = decoded.phone;
          }
        } catch (e) {
          console.error("Error decoding token in saveBookingStatus:", e);
        }

        const reqSaveBookingId = {
          type: "update",
          booking_id: bookingId,
          status: data?.order?.status,
          phone: phoneFromToken,
        };

        const result = await postData(
          "travelogy/flight/save-booking",
          reqSaveBookingId
        );
      };
      saveBookingStatus();

      setSegmentPrices(
        data?.AIR?.tripInfos?.map((trip) => trip.sI.map((seg) => seg.price)) ??
        []
      );
    } catch (err) {

      if (err?.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err?.response?.data?.errors?.length) {
        const firstError = err.response.data.errors[0];
        const message = firstError?.message || "An unknown error occurred.";
        setError(message);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  const getTravellerInfo = (bookingId, amendmentId) => {
    setSelectedBookingId(bookingId);
    setSelectedAmendmentId(amendmentId);
    setShowTravellerModal(true);
  };

  // const sumbitAmendmentapi = async (bookingId, amendmentType, remarks, callback) => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     if (!bookingId || !amendmentType) {
  //       setError("Booking ID or amendment type is missing");
  //       setLoading(false);
  //       return;
  //     }

  //     const parameter = { bookingId, type: amendmentType, remarks };
  //     console.log("📤 Sending parameters to API:", parameter);

  //     const response = await postSumbitAmendment(parameter);
  //     const data = response; // direct response, no .data nesting

  //     console.log("📌 amendmentId received:", data?.amendmentId);

  //     setSumitAmendmentDetails(data);
  //     setAmendmentId(data?.amendmentId);

  //     // if (data?.amendmentId) {
  //     //   try {
  //     //     console.log("📨 Sending amendmentId to details API:", { amendmentId: data.amendmentId });

  //     //     const amendmentDetails = await postAmendmentDetails({ amendmentId: data.amendmentId });

  //     //     console.log("📋 Amendment Details:", amendmentDetails);
  //     //     setAmendmentDetailData(amendmentDetails);
  //     //     setShowDetailsModal(true);
  //     //   } catch (err) {
  //     //     console.error("error caused", err);

  //     //     if (err?.response?.data?.errors?.length) {
  //     //       const firstError = err.response.data.errors[0];
  //     //       const message = firstError?.message || "An unknown error occurred.";
  //     //       const details = firstError?.details ? ` - ${firstError.details}` : "";
  //     //       setError(`${message}`);

  //     //       console.log("API error message:", message);
  //     //       console.log("Error details:", details);
  //     //       console.log("Error status code:", err.response.status);
  //     //     } else if (err?.message) {
  //     //       setError(err.message);
  //     //       console.log("Generic error message:", err.message);
  //     //     } else {
  //     //       setError("Something went wrong. Please try again.");
  //     //     }
  //     //   }
  //     // }
  //     <TravellerDetailsModal />

  //     if (callback && typeof callback === "function") {
  //       callback(data);
  //     }
  //   } catch (err) {
  //     console.error("error caused", err);

  //     if (err?.response?.data?.errors?.length) {
  //       const firstError = err.response.data.errors[0];
  //       const message = firstError?.message || "An unknown error occurred.";
  //       const details = firstError?.details ? ` - ${firstError.details}` : "";
  //       setError(`${message}`);

  //       console.log("API error message:", message);
  //       console.log("Error details:", details);
  //       console.log("Error status code:", err.response.status);
  //     } else if (err?.message) {
  //       setError(err.message);
  //       console.log("Generic error message:", err.message);
  //     } else {
  //       setError("Something went wrong. Please try again.");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const sumbitAmendmentapi = async (
    bookingId,
    amendmentType,
    remarks,
    callback
  ) => {
    setLoading(true);
    setError(null);

    try {
      if (!bookingId || !amendmentType) {
        setError("Booking ID or amendment type is missing");
        setLoading(false);
        return;
      }

      // const parameter = { bookingId, type: amendmentType, remarks };
      // console.log("📤 Sending parameters to API:", parameter);

      // const response = await postSumbitAmendment(parameter);
      // const data = response;

      // console.log("📌 amendmentId received:", data?.amendmentId);

      // setSumitAmendmentDetails(data);
      // setAmendmentId(data?.amendmentId);

      // ✅ Show Traveller Modal
      // if (data?.amendmentId) {
      setTravellerData({ bookingId, amendmentId: "dal;kdja;j" });
      setShowTravellerModal(true);
      // }

      // if (callback && typeof callback === "function") {
      //   callback(data);
      // }
    } catch (err) {
      console.error("error caused", err);

      // if (err?.response?.data?.errors?.length) {
      //   const firstError = err.response.data.errors[0];
      //   const message = firstError?.message || "An unknown error occurred.";
      //   const details = firstError?.details ? ` - ${firstError.details}` : "";
      //   setError(`${message}`);
      // } else if (err?.message) {
      //   setError(err.message);
      // } else {
      //   setError("Something went wrong. Please try again.");
      // }
    } finally {
      setLoading(false);
    }
  };
  const tripInfos = bookingDetails?.itemInfos?.AIR?.tripInfos || [];

  const firstTrip = tripInfos[0];
  const segmentList = firstTrip?.sI || [];

  const firstSegment = segmentList[0];
  const lastSegment = segmentList[segmentList.length - 1];

  const BookingSkeleton = () => {
    return (
      <section className="section-box block-content-book-tickets background-card">
        <div className="container pt-60">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-4 animate-pulse"></div>

          <div className="row mt-20">
            <div className="col-lg-8">
              <div className="box-content-tickets-detail p-3 flex gap-3 items-center bg-gray-100 animate-pulse rounded">
                <div className="w-24 h-4 bg-gray-300 rounded" />
                <div className="w-4 h-4 bg-gray-400 rounded-full" />
                <div className="w-24 h-4 bg-gray-300 rounded" />
                <div className="w-10 h-4 bg-gray-300 rounded" />
                <div className="w-32 h-4 bg-gray-300 rounded" />
              </div>

              <div className="mt-10 bg-white shadow rounded-lg p-6">
                <div className="h-4 w-1/3 bg-gray-300 rounded mb-6 animate-pulse"></div>

                <div className="item-flight border border-black-200 rounded p-5 mb-6 animate-pulse flex flex-col gap-4">
                  <div className="h-4 w-40 bg-gray-300 rounded" />
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-24 bg-gray-300 rounded" />
                      <div className="h-3 w-20 bg-gray-200 rounded" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-24 bg-gray-300 rounded" />
                      <div className="h-3 w-20 bg-gray-200 rounded" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-24 bg-gray-300 rounded" />
                      <div className="h-3 w-20 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>

                <div className="h-4 w-1/3 bg-gray-300 rounded mb-6 animate-pulse"></div>

                <div className="h-24 bg-gray-200 rounded mb-6"></div>
                <div className="h-20 bg-gray-200 rounded mb-6"></div>

                <div className="flex justify-between mt-6">
                  <div className="h-10 w-24 bg-gray-300 rounded"></div>
                  <div className="h-10 w-24 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="h-96 bg-gray-200 rounded add_sticky animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  useEffect(() => {
    if (bookingId) {
      bookingDetailsapi(bookingId);
      fetchFareType(bookingId);
    } else {
      setError("No valid booking id found in the URL.");
    }
  }, [bookingId]);

  const segments =
    bookingDetails?.itemInfos?.AIR?.tripInfos?.map((trip) => trip.sI).flat() ??
    [];
  // const totalpriceinfoss = flightData?.tripInfos.flatMap((trip) => trip.totalPriceList) ?? [];
  // const cabinclass = totalpriceinfoss.map((e) => e.fd?.ADULT?.cc);
  const departuredate = segments.map((e) => e.dt);
  const arrivalDate = segments.map((e) => e.at);
  const firstBaggage = segments.flatMap((segment) => segment?.bI?.tI || [])[0]; // Get the first passenger's baggage info

  // const fareidentifier = firstBaggage?.fd?.cc;
  const baggageInfo = {
    cabinBaggage: firstBaggage?.fd?.bI?.cB || "N/A",
    checkinBaggage: firstBaggage?.fd?.bI?.iB || "N/A",
  };
  const formatDepartureDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString))) return "";
    return format(new Date(dateString), "EEE, dd MMM");
  };

  const formatArrivalDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString))) return "";
    return format(new Date(dateString), "EEE, dd MMM");
  };

  const departureCityCode = segments.map((e, i) => e.da?.code);
  const arrivalCityCode = segments.map((e, i) => e.aa?.code);
  const travellerinfos =
    bookingDetails?.itemInfos?.AIR?.travellerInfos?.map(
      (traveller) => traveller
    ) ?? [];

  const convertToJulianDate = (dateString) => {
    const date = new Date(dateString); // Convert the string to a Date object

    // Julian date calculation
    const startDate = new Date(Date.UTC(1, 0, 1)); // Start from January 1, 1 AD
    const julianDate =
      Math.floor((date - startDate) / (1000 * 60 * 60 * 24)) + 1; // Calculate days since start date

    return julianDate;
  };

  const processTravellerInfo = (traveller, itemInfos) => {
    let flightNumber = null;
    let julianDate = null;
    let flightCode = null;

    // Iterate through pnrDetails of the traveller to handle multiple segments
    if (traveller.pnrDetails && typeof traveller.pnrDetails === "object") {
      Object.keys(traveller.pnrDetails).forEach((pnrKey) => {
        const [fromCity, toCity] = pnrKey.split("-");

        // Find the corresponding tripInfo in itemInfos based on departure and arrival city codes
        const matchingTripInfo = itemInfos.AIR.tripInfos.find((tripInfo) => {
          return tripInfo.sI.some(
            (sI) => sI.da.code === fromCity && sI.aa.code === toCity
          );
        });

        if (matchingTripInfo) {
          // Get the flight number (fN) from the matching sI object
          const matchedSegment = matchingTripInfo.sI.find(
            (sI) => sI.da.code === fromCity && sI.aa.code === toCity
          );

          if (matchedSegment) {
            flightNumber = matchedSegment.fD.fN;
            flightCode = matchedSegment.fD.aI.code;

            // Get the departure date (dt) and convert to Julian date
            const departureDate = matchedSegment.dt;

            // Convert the departure date (dt) to Julian date and get the last 3 digits
            const julianDateValue = convertToJulianDate(departureDate);
            julianDate = julianDateValue.toString().slice(-3); // Get the last 3 digits of the Julian date
          }
        }
      });
    }

    // Return flightNumber and julianDate specific to the current segment
    return { flightNumber, julianDate, flightCode };
  };

  const bookingReviewWIthWallet = async () => {
    setBookingLoadingWallet(true);
    setPaymsg("");

    const fetchBookingData = await postData(
      "travelogy/flight/fetch-booking-data",
      { bookingId }
    );

    const payableAmount = fetchBookingData?.data?.[0]?.amount;

    const payWallet = async () => {
      const reqpayWallet = {
        booking_id: bookingId,
        amount: payableAmount,
      };
      const result = await postData(
        "travelogy/flight/payWallet",
        reqpayWallet,
        { Authorization: `Bearer ${token}` }
      );
      return result;
    };
    const payWalletRes = await payWallet();

    if (payWalletRes?.success && payWalletRes.success == true) {
      const parameter = { bookingId: bookingId };
      try {
        let reqData = { action: "fareValidate", requestData: parameter };
        const result = await postData("travelogy/one-way/fetch-data", reqData);

        if (result?.status?.success === true) {
          const fetchBookingData = await postData(
            "travelogy/flight/fetch-booking-data",
            { bookingId: bookingId }
          );
          const airBookParameter = {
            bookingId: bookingId,
            paymentInfos: [
              {
                amount: payableAmount,
              },
            ],
          };
          let reqData = {
            action: "conformBook",
            requestData: airBookParameter,
          };
          const airBookResponse = await postData(
            "travelogy/one-way/fetch-data",
            reqData
          );
          if (airBookResponse?.status?.success === true) {
            // payment success
          } else {
            await postData(
              "travelogy/flight/refundWallet",
              {
                booking_id: bookingId,
                amount: fetchBookingData?.data?.[0]?.amount,
              },
              { Authorization: `Bearer ${token}` }
            );
          }
          window.location.reload();
        } else {
          await postData(
            "travelogy/flight/refundWallet",
            {
              booking_id: bookingId,
              amount: fetchBookingData?.data?.[0]?.amount,
            },
            { Authorization: `Bearer ${token}` }
          );
          window.location.reload();
        }
      } catch (error) {
        // console.log("handlePayNow error ", error);
      }
    } else {
      // handle edge case
      setPaymsg(payWalletRes);
      setBookingLoadingWallet(false);
    }
  };

  return (
    <>
      <h4 className="neutral-1000">Booking Details</h4>
      {loading ? (
        <BookingSkeleton />
      ) : (
        <>
          <div
            className="mt-20 bg-white shadow rounded-lg p-2 sm:p-6 mb-20 print-area"
            ref={printRef}
          >
            <div className="mb-10 shadow-md p-3 rounded">
              <div className="flex flex-col sm:flex-row justify-between gap-2">
                <div className="flex flex-col justify-start">
                  <p className="text-md-medium neutral-1000">
                    Booking status:{" "}
                    <span
                      className={
                        bookingDetails?.order?.status === "SUCCESS"
                          ? "bg-green-600 text-white pl-1 pr-1 rounded-full"
                          : "bg-red-600 text-white pl-1 pr-1 rounded-full"
                      }
                    >
                      {bookingDetails?.order?.status}
                    </span>{" "}
                  </p>
                  <p className="text-sm-medium neutral-500">
                    Booking Id: {bookingDetails?.order?.bookingId}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-2 sm:gap-3 mt-2 sm:mt-0">


                  {isReIssueModalOpen && (
                    <div className="fixed inset-0 p-t-reissue z-50 flex items-center justify-center bg-black bg-opacity-50">
                      <div
                        className="bg-white rounded-lg p-6 shadow-lg relative"
                        style={{ width: "75%" }}
                      >
                        <button
                          onClick={closeReIssueModal}
                          className="absolute top-4 right-4 text-2xl text-black"
                        >
                          &times;
                        </button>
                        <h2 className="text-xl font-bold text-blue-800">
                          Reschedule Flight
                        </h2>

                        <div className="mb-4">
                          <label
                            htmlFor="pnr-select"
                            className="block text-gray-500"
                          >
                            Select PNR
                          </label>
                          <select
                            id="pnr-select"
                            value={selectedPNR}
                            onChange={(e) => handlePNRSelect(e.target.value)}
                            className="reschedule-opt-w border-b border-gray-400 py-2 px-4"
                          >
                            <option value="">-- Select PNR --</option>
                            {Object.keys(rescheduleData.pnrs).map(
                              (pnr, index) => (
                                <option key={index} value={pnr}>
                                  {pnr} - {rescheduleData.pnrs[pnr]}{" "}
                                </option>
                              )
                            )}
                          </select>
                        </div>

                        {selectedPNR && (
                          <div className="mb-6 flex justify-around">
                            <div>
                              <h6 className="font-bold text-gray-700">
                                Travel Details:
                              </h6>
                              <p className="text-gray-600">
                                From:{" "}
                                {
                                  rescheduleData.pnrFlightDetails[selectedPNR]
                                    .from
                                }
                              </p>
                              <p className="text-gray-600">
                                To:{" "}
                                {
                                  rescheduleData.pnrFlightDetails[selectedPNR]
                                    .to
                                }
                              </p>
                              <p className="text-gray-600">
                                Departure Time:{" "}
                                {formatDateTime(
                                  rescheduleData.pnrFlightDetails[selectedPNR]
                                    .departureTime
                                )}
                              </p>
                              <p className="text-gray-600">
                                Arrival Time:{" "}
                                {formatDateTime(
                                  rescheduleData.pnrFlightDetails[selectedPNR]
                                    .arrivalTime
                                )}
                              </p>
                            </div>

                            <div>
                              <label
                                className="block text-gray-700 font-medium mb-2"
                                htmlFor="reschedule-date"
                              >
                                Select New Travel Date:
                              </label>
                              <DatePicker
                                id="reschedule-date"
                                format="MM/DD/YYYY"
                                value={
                                  rescheduleDate ? dayjs(rescheduleDate) : null
                                }
                                onChange={(d) =>
                                  setRescheduleDate(
                                    d ? d.format("YYYY-MM-DD") : ""
                                  )
                                }
                                disabled={!selectedPNR}
                                disabledDate={(current) =>
                                  current && current < dayjs().startOf("day")
                                }
                                className="border border-gray-400 px-2 py-2 rounded w-full"
                                popupClassName="z-[9999]"
                                getPopupContainer={() => document.body}
                                placement="bottomLeft"
                                onKeyDown={(e) => {
                                  const okKeys = [
                                    "Backspace",
                                    "Tab",
                                    "ArrowLeft",
                                    "ArrowRight",
                                    "Delete",
                                    "Enter",
                                  ];
                                  if (okKeys.includes(e.key)) return;
                                  if (!/[\d/]/.test(e.key)) e.preventDefault();
                                }}
                                onPaste={(e) => {
                                  const text = (
                                    e.clipboardData.getData("text") || ""
                                  ).trim();
                                  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(text))
                                    e.preventDefault();
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {selectedPNR &&
                          rescheduleData.pnrPassengerDetails[selectedPNR] && (
                            <div className="mb-6">
                              <h6 className="font-bold text-gray-700">
                                Travellers:
                              </h6>
                              <div>
                                {rescheduleData.pnrPassengerDetails[
                                  selectedPNR
                                ].map((passenger, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <input
                                      type="checkbox"
                                      style={{ width: "20px" }}
                                      id={`traveller-${index}`}
                                      className="form-checkbox"
                                      checked={selectedTravellers.some(
                                        (p) =>
                                          p.firstName === passenger.firstName &&
                                          p.lastName === passenger.lastName &&
                                          p.title === passenger.title &&
                                          p.passengerType ===
                                          passenger.passengerType &&
                                          p.index === index
                                      )}
                                      onChange={(e) => {
                                        let updated;
                                        if (e.target.checked) {
                                          updated = [
                                            ...selectedTravellers,
                                            { ...passenger, index },
                                          ];
                                        } else {
                                          updated = selectedTravellers.filter(
                                            (p) =>
                                              !(
                                                p.firstName ===
                                                passenger.firstName &&
                                                p.lastName ===
                                                passenger.lastName &&
                                                p.title === passenger.title &&
                                                p.passengerType ===
                                                passenger.passengerType &&
                                                p.index === index
                                              )
                                          );
                                        }
                                        setSelectedTravellers(updated);
                                      }}
                                    />

                                    <label htmlFor={`traveller-${index}`}>
                                      {passenger.title} {passenger.firstName}{" "}
                                      {passenger.lastName} (
                                      {passenger.passengerType})
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        <button
                          onClick={handleSubmitReIssue}
                          className="btn btn-gray bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
                          disabled={
                            !rescheduleDate ||
                            selectedTravellers.length === 0 ||
                            rescheduleLoading
                          }
                        >
                          {rescheduleLoading ? (
                            <>
                              <svg
                                className="animate-spin h-5 w-5 mr-2"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="white"
                                  strokeWidth="4"
                                  fill="none"
                                />
                                <path
                                  className="opacity-75"
                                  fill="white"
                                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z"
                                />
                              </svg>
                              Loading...
                            </>
                          ) : (
                            "Submit"
                          )}
                        </button>

                        {rescheduleError !== "" && (
                          <p className="text-sm-medium text-red-400">
                            {rescheduleError}
                          </p>
                        )}
                        {reissueApiError !== "" && (
                          <p className="text-sm-medium text-red-400 mt-2">
                            {reissueApiError}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {isNoPrintVisible && (
                    <div className={isNoPrintVisible ? "" : "no-print"}>

                      {/* --- MOBILE DROPDOWN (Visible only on small screens) --- */}
                      <div className="relative w-full sm:w-auto sm:mt-0">
                        <div className="flex gap-2">
                          {bookingDetails?.order?.status === "PENDING" || bookingDetails?.order?.status === "ON_HOLD" ? (
                            <>
                              <button
                                onClick={() => setPaymentModel(true)}
                                className="flex-1 sm:flex-none sm:w-auto bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg shadow-sm whitespace-nowrap"
                              >
                                Pay Now
                              </button>
                              <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg shadow-sm flex items-center justify-center gap-2"
                              >
                                More
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => setShowDropdown(!showDropdown)}
                              className="w-full sm:w-auto bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                              More Options
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </button>
                          )}
                        </div>

                        {showDropdown && (
                          <div className="absolute right-0 top-full mt-2 w-full sm:w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                            <div className="flex flex-col">
                              {/* Print */}
                              <button
                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 text-left text-sm font-medium text-gray-700"
                                onClick={() => {
                                  printTicket(bookingDetails, markup);
                                  setShowDropdown(false);
                                }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                                Print Ticket
                              </button>

                              {/* Email */}
                              <button
                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 text-left text-sm font-medium text-gray-700"
                                onClick={() => {
                                  handleOpenEmailModal();
                                  setShowDropdown(false);
                                }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                Email Ticket
                              </button>

                              {/* Cancellation (Success Only) */}
                              {bookingDetails?.order?.status === "SUCCESS" && (
                                <button
                                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 text-left text-sm font-medium text-red-600 w-full"
                                  onClick={() => {
                                    setShowDropdown(false);
                                    mobileAmendmentRef.current?.open();
                                  }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                                  Cancel Booking
                                </button>
                              )}

                              {/* Reschedule (Success + Date Validation) */}
                              {bookingDetails?.order?.status === "SUCCESS" && departuredate && departuredate.length > 0 && new Date() < new Date(departuredate[0]) && !reStatus && (
                                <button
                                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 text-left text-sm font-medium text-blue-600"
                                  onClick={() => {
                                    openReIssueModal();
                                    setShowDropdown(false);
                                  }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                  Reschedule
                                </button>
                              )}

                              {/* Unhold (Pending Only) */}
                              {(bookingDetails?.order?.status === "PENDING" || bookingDetails?.order?.status === "ON_HOLD") && (
                                <button
                                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-gray-100 text-left text-sm font-medium text-gray-700"
                                  onClick={() => {
                                    handleUnHold();
                                    setShowDropdown(false);
                                  }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>
                                  Unhold Booking
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Hidden AmendmentPopup for Trigger */}
                        <AmendmentPopup
                          ref={mobileAmendmentRef}
                          className="hidden"
                          bookingId={bookingId}
                          bookingDetails={bookingDetails}
                          onSubmit={(
                            bookingId,
                            amendmentType,
                            remarks,
                            callback
                          ) =>
                            sumbitAmendmentapi(
                              bookingId,
                              amendmentType,
                              remarks,
                              (data) => {
                                callback?.(data);
                                setShowTravellerModal(true);
                              }
                            )
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-20">
              <div className="mt-20">
                {bookingDetails?.itemInfos?.AIR?.tripInfos.map(
                  (trip, tripIndex) => {
                    return trip?.sI.map((seg, segIndex) => {
                      const segDt = seg?.dt;
                      const date = new Date(segDt);
                      const formattedDate = date.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      });

                      const dT = segDt.split("T")[1];
                      const segAt = seg?.at;
                      const aT = segAt.split("T")[1];
                      const [startHour, startMin] = dT.split(":").map(Number);
                      const [endHour, endMin] = aT.split(":").map(Number);

                      let startMinutes = startHour * 60 + startMin;
                      let endMinutes = endHour * 60 + endMin;

                      if (endMinutes < startMinutes) {
                        endMinutes += 24 * 60;
                      }

                      const diffMinutes = endMinutes - startMinutes;
                      const hours = Math.floor(diffMinutes / 60);
                      const minutes = diffMinutes % 60;
                      let fareIdentifier = seg?.bI?.tI?.[0]?.fd?.cc;

                      return (
                        <div
                          key={`${tripIndex}-${segIndex}`}
                          className="premium-flight-card mb-4 shadow-sm"
                        >
                          <div className="bg-slate-50 px-4 py-3 flex flex-wrap justify-between items-center border-b border-slate-100 gap-3">
                            <div className="flex items-center gap-2 md:gap-4">
                              <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm flex items-center justify-center min-w-fit md:min-w-[100px]">
                                <span className="font-extrabold text-slate-800 tracking-tight text-sm">
                                  {seg?.fD?.aI?.name}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                                  {seg?.fD?.fN}
                                </span>
                                <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded self-start">
                                  {seg?.fD?.eT}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              {fareType && (
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${fareType.toLowerCase().includes('non') ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                                  {fareType}
                                </span>
                              )}
                              {fareIdentifier && (
                                <span className="bg-amber-50 text-amber-600 border border-amber-100 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                                  {fareIdentifier}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Card Body: Departure -> Timeline -> Arrival */}
                          <div className="p-4 md:p-6 mobile-sm-padding">
                            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-0 md:gap-6">
                              {/* Departure */}
                              <div className="flex-1">
                                <div className="flex custom-flex justify-between md:justify-start items-stretch gap-0 md:gap-4">
                                  <div className="text-left">
                                    <div className="airport-info-label mb-1">Departure</div>
                                    <div className="time-display mb-1">{seg?.dt.split("T")[1]}</div>
                                    <div className="text-sm font-bold text-slate-500 mb-0 md:mb-4">{formattedDate}</div>
                                  </div>
                                  <div className="text-right md:text-left mt-0 md:mt-0">
                                    <div className="city-display mb-1">
                                      {seg?.da?.city} <span className="text-slate-400 ml-1">({seg?.da?.code})</span>
                                    </div>
                                    <div className="text-xs text-slate-400 font-medium truncate max-w-[180px] ml-auto md:ml-0">
                                      {seg?.da?.name}
                                    </div>
                                    {seg?.da?.terminal && (
                                      <div className="inline-block bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">
                                        {seg?.da?.terminal}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Timeline Connector */}
                              <div className="flex-[1.4] w-full flex flex-col items-center py-4">
                                <div className="duration-badge mb-5 shadow-sm">
                                  {hours}h {minutes}m
                                </div>
                                <div className="w-full relative flex items-center px-6">
                                  <div className="connector-line"></div>
                                  <div className="plane-icon-mid">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" />
                                    </svg>
                                  </div>
                                </div>
                                <div className="mt-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                                  Non-Stop Flight
                                </div>
                              </div>

                              {/* Arrival */}
                              <div className="flex-1">
                                <div className="flex custom-flex justify-between md:justify-start items-stretch gap-0 md:gap-4">
                                  <div className="text-left md:text-right">
                                    <div className="airport-info-label mb-1">Arrival</div>
                                    <div className="time-display mb-1">{seg?.at?.split("T")[1]}</div>
                                    <div className="text-sm font-bold text-slate-500 mb-0 md:mb-4">
                                      {new Date(seg?.at).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })}
                                    </div>
                                  </div>
                                  <div className="text-right md:text-right mt-0 md:mt-0">
                                    <div className="city-display mb-1">
                                      {seg?.aa?.city} <span className="text-slate-400 ml-1">({seg?.aa?.code})</span>
                                    </div>
                                    <div className="text-xs text-slate-400 font-medium truncate max-w-[180px] ml-auto md:mr-0">
                                      {seg?.aa?.name}
                                    </div>
                                    {seg?.aa?.terminal && (
                                      <div className="inline-block bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">
                                        {seg?.aa?.terminal}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Baggage Information Footer */}
                            <div className="mt-0 md:mt-6 pt-5 border-t border-slate-50 flex flex-wrap gap-4 justify-center md:justify-start">
                              <div className="baggage-tag shadow-sm border border-slate-100">
                                <div className="bg-blue-50 p-1.5 rounded-md">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
                                  </svg>
                                </div>
                                <div className="flex flex-col">
                                  <span className="baggage-label">Cabin</span>
                                  <span className="baggage-value">{baggageInfo.cabinBaggage || "7 KG"}</span>
                                </div>
                              </div>
                              <div className="baggage-tag shadow-sm border border-slate-100">
                                <div className="bg-blue-50 p-1.5 rounded-md">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" />
                                  </svg>
                                </div>
                                <div className="flex flex-col">
                                  <span className="baggage-label">Check-in</span>
                                  <span className="baggage-value">{baggageInfo.checkinBaggage || "15 KG"}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  }
                )}
              </div>

              <div className="shadow rounded-md mt-50 p-3 bg-white">
                <p className="text-xl-bold neutral-1000 mb-10">
                  Passenger Information
                </p>
                <div className="overflow-x-auto table-container">
                  <table className="min-w-full border-collapse mb-20">
                    <thead style={{ borderBottom: "1px solid grey" }}>
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">
                          S.No
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">
                          Name
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">
                          Person Type
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">
                          Segment
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">
                          PNR
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">
                          Ticket Number
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">
                          SSR
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {travellerinfos?.map((traveller, travellerIndex) => {
                        const segmentKeys = Object.keys(
                          traveller.pnrDetails || { "N/A": undefined }
                        );
                        return segmentKeys.map((segmentKey, segmentIndex) => {
                          const pnr =
                            traveller.pnrDetails?.[segmentKey] ?? "N/A";
                          const baggage =
                            traveller?.ssrBaggageInfos?.[segmentKey]?.desc ??
                            "N/A";
                          const meal =
                            traveller?.ssrMealInfos?.[segmentKey]?.desc ??
                            "N/A";
                          const seat =
                            traveller?.ssrSeatInfos?.[segmentKey]?.code ??
                            "N/A";
                          const ticket =
                            traveller.ticketNumberDetails?.[segmentKey] ??
                            "N/A";

                          if (segmentKey === "N/A") {
                            const fallbackKeys = Object.keys(
                              traveller.checkinStatusMap || {}
                            );
                            if (fallbackKeys.length > 0) {
                              segmentKey = fallbackKeys[0];
                            }
                          }

                          let passengerDetailsData = [];
                          if (pnr !== "N/A") {
                            const [fromCitySplit, toCitySplit] =
                              segmentKey.split("-");
                            const { flightNumber, julianDate, flightCode } =
                              processTravellerInfo(
                                traveller,
                                bookingDetails?.itemInfos
                              );
                            passengerDetailsData = [
                              {
                                passengerName: `${traveller.lN}/${traveller.fN}`
                                  .trim()
                                  .toUpperCase()
                                  .padEnd(20, " "),
                                pnrCode: pnr,
                                fromCityCode: fromCitySplit,
                                toCityCode: toCitySplit,
                                flightNumber: flightNumber,
                                flightCode: flightCode,
                                julianDate: julianDate,
                              },
                            ];
                          }

                          return (
                            <>
                              <tr key={`${travellerIndex}-${segmentIndex}`}>
                                <td className="px-4 py-3 border-b border-gray-200 text-black">
                                  {travellerIndex + 1}
                                </td>
                                <td className="px-4 py-3 border-b border-gray-200 text-black flex flex-col">
                                  {`${traveller.ti}. ${traveller.fN} ${traveller.lN}`}
                                  {traveller &&
                                    traveller.di &&
                                    traveller.di !== "undefined" && (
                                      <span>ID: {traveller.di}</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 border-b border-gray-200 text-black">
                                  {traveller.pt}
                                </td>
                                <td className="px-4 py-3 border-b border-gray-200 text-black">
                                  {segmentKey}
                                </td>
                                <td className="px-4 py-3 border-b border-gray-200 text-black">
                                  {pnr}
                                </td>
                                <td className="px-4 py-3 border-b border-gray-200 text-black">
                                  {ticket}
                                </td>
                                <td className="px-4 py-3 border-b border-gray-200 text-black">
                                  Baggage: {baggage} | Meal: {meal} | Seat:{" "}
                                  {seat}
                                </td>
                              </tr>
                              {pnr !== "N/A" && (
                                <tr>
                                  <td
                                    colSpan="6"
                                    className="px-4 py-3 border-b border-gray-200"
                                  >
                                    <BarcodeGenerator
                                      passengerDetails={passengerDetailsData}
                                    />
                                  </td>
                                </tr>
                              )}
                            </>
                          );
                        });
                      })}
                    </tbody>
                  </table>
                </div>

                <p className="text-lg-bold neutral-1000 mb-10 mt-20 mytestCas">
                  Contact Information
                </p>
                <div className="ant-form-item">
                  <div className="text-md neutral-1000 mb-2">
                    Email:{" "}
                    <strong>
                      {bookingDetails?.order?.deliveryInfo?.emails?.join(
                        ", "
                      ) || "N/A"}
                    </strong>
                  </div>
                  <div className="text-md neutral-1000">
                    Phone Number:{" "}
                    <strong>
                      {bookingDetails?.order?.deliveryInfo?.contacts?.join(
                        ", "
                      ) || "N/A"}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
            <div className=" mt-20">
              <div className="booking-form add_sticky">
                <div class="head-booking-form">
                  <p class="text-xl-bold neutral-1000">Fare Summary</p>
                </div>
                <BookingForm
                  totalpricee={totalpricee}
                  bookingData={bookingDetails}
                  finalStage={true}
                  afsAmount={afsAmount}
                  rssrAmount={rssrAmount}
                  markup={markup}
                  onHold={bookingDetails?.order?.status === "PENDING"}
                  markupProp={markup}
                  baggageAmount={baggageTotal}
                  mealAmount={mealTotal}
                  seatinfo={seatTotal}
                />
              </div>
            </div>
          </div>
        </>
      )
      }

      {
        modalLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
            <div className="bg-white px-6 py-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
              {/* Dot Pulse Loader */}
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse delay-150"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse delay-300"></div>
              </div>

              <p className="text-gray-700 font-medium">
                Processing, please wait...
              </p>
            </div>
          </div>
        )
      }

      {
        error && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white border-2 border-black w-96 p-6 rounded-lg text-center shadow-lg">
              <p className="text-red-600 mb-4 font-semibold">Error: {error}</p>

              <button
                className="border-2 border-black px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
                onClick={() => setError("")}
              >
                Ok, Got It
              </button>
            </div>
          </div>
        )
      }

      {
        paymentFailurePopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
              className="bg-white border-2 border-black w-96 p-6 rounded-lg text-center shadow-lg relative"
              style={{ width: "35%" }}
            >
              <button
                // onClick={() => setPaymentFailurePopup(false)}
                onClick={() => {
                  setPaymentFailurePopup(false);
                  setPaymsg("");
                }}
                className="absolute top-2 right-2 text-gray-700 hover:text-black text-xl font-bold"
              >
                ×
              </button>

              <p className="text-red-600 mb-2 font-semibold">Payment Failed</p>
              <p>Your payment could not be completed.</p>
              <p>You can retry the payment or hold this booking and pay later.</p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  paddingTop: "10px",
                }}
              >
                <div
                  onClick={bookingReviewWIthWallet}
                  className={`cursor-pointer border-2 border-black px-4 py-2 transition text-black rounded-md flex items-center justify-center ${bookingLoadingWallet
                    ? "bg-gray-300"
                    : "bg-yellow-300 hover:bg-yellow-400"
                    }`}
                  disabled={bookingLoadingWallet}
                >
                  {bookingLoadingWallet ? (
                    <div className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    "Wallet Payment"
                  )}
                </div>

                <div
                  // onClick={bookingReview}
                  onClick={handlePayNow}
                  className={`cursor-pointer border-2 border-black px-4 py-2 transition text-black rounded-md flex items-center justify-center ${bookingLoading
                    ? "bg-gray-300"
                    : "bg-yellow-300 hover:bg-yellow-400"
                    }`}
                  disabled={bookingLoading}
                >
                  {bookingLoading ? (
                    <div className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    "Retry Payment"
                  )}
                </div>
              </div>
              {paymsg && (
                <p className="text-red-600 pt-2" style={{ textAlign: "center" }}>
                  {paymsg.message}, Balance: {paymsg.balance}
                </p>
              )}
            </div>
          </div>
        )
      }
      {
        paymentModel && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
              className="bg-white border text-center border-gray-200 w-full max-w-md p-6 rounded-xl shadow-2xl relative mx-4"
            >
              <button
                onClick={() => {
                  setPaymentModel(false);
                  setPaymsg("");
                }}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-xl font-bold text-gray-800 mb-6 mt-1">
                Choose Payment Mode
              </h3>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div
                  onClick={bookingReviewWIthWallet}
                  className={`flex-1 cursor-pointer font-medium px-4 py-3 rounded-lg transition border flex items-center justify-center
                    ${bookingLoadingWallet
                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-yellow-400 hover:bg-yellow-500 text-black border-transparent shadow-sm hover:shadow-md"
                    }`}
                >
                  {bookingLoadingWallet ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "Wallet Payment"
                  )}
                </div>

                <div
                  onClick={handlePayNow}
                  className={`flex-1 cursor-pointer font-medium px-4 py-3 rounded-lg transition border flex items-center justify-center
                    ${bookingLoading
                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-yellow-400 hover:bg-yellow-500 text-black border-transparent shadow-sm hover:shadow-md"
                    }`}
                >
                  {bookingLoading ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "Pay via Gateway"
                  )}
                </div>
              </div>

              {paymsg && (
                <div className="mt-4 bg-red-50 text-red-600 px-3 py-2 rounded text-sm">
                  {paymsg.message}, Balance: {paymsg.balance}
                </div>
              )}
            </div>
          </div>
        )
      }
      {
        showEmailModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
            <div className="bg-white px-6 py-6 rounded-lg shadow-lg flex flex-col items-center gap-4 w-[400px]">
              <h3 className="text-xl font-bold mb-2">Share Ticket</h3>
              <p className="text-sm text-gray-600 mb-4 text-center">Enter the email address to send the booking details.</p>

              <input
                type="email"
                className="w-full border p-2 rounded"
                placeholder="Enter email address"
                value={emailToShare}
                onChange={(e) => setEmailToShare(e.target.value)}
              />

              <div className="flex gap-4 w-full mt-4">
                <button
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition"
                  onClick={() => setShowEmailModal(false)}
                  disabled={emailLoading}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  onClick={handleEmailShare}
                  disabled={emailLoading}
                >
                  {emailLoading ? "Sending..." : "Send Email"}
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Alldetails;
