"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import BookingCard from "../booking";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import HotelData from "./hotelData";
import { postData } from "@/services/NetworkAdapter";
import "../HotelListingPage.css";

const Modal = ({
  images,
  isOpen,
  filledStars,
  hotelName,
  onClose,
  selectedImage,
  setSelectedImage,
}) => {
  const standardImages = useMemo(() => {
    const filteredImages = images.filter((image) => image.sz === "XXL");

    return filteredImages.length > 0 ? filteredImages : images;
  }, [images]);

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (isOpen && standardImages.length > 0) {
      setSelectedImage(
        standardImages[0]?.url ||
          "https://via.placeholder.com/400x300.png?text=No+Image+Available"
      );
    }
  }, [isOpen, standardImages, setSelectedImage]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === standardImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? standardImages.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (standardImages.length > 0) {
      setSelectedImage(
        standardImages[currentIndex]?.url ||
          "https://via.placeholder.com/400x300.png?text=No+Image+Available"
      );
    }
  }, [currentIndex, standardImages, setSelectedImage]);

  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center justify-center gap-3 flex-1">
            <h1 className="text-xl font-bold">{hotelName}</h1>
            <span className="rating flex gap-1 -mt-2">
              {[...Array(filledStars)].map((_, index) => (
                <svg
                  key={`filled-${index}`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gold"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 .25l1.8 5.8h6.2l-5 3.6 1.9 5.8-5-3.6-5 3.6 1.9-5.8-5-3.6h6.2L8 .25z" />
                </svg>
              ))}
            </span>
          </div>
          <button className="close-modal-btn" onClick={onClose}>
            x
          </button>
        </div>
        <div className="modal-slider">
          <button className="prev" onClick={handlePrev}>
            {/* {" "}
            &#60;{" "} */}
            <svg
              height="60"
              width="60"
              viewBox="0 0 128 128"
              role="presentation"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M73.7 96a4 4 0 0 1-2.9-1.2L40 64l30.8-30.8a4 4 0 0 1 5.7 5.6L51.3 64l25.2 25.2a4 4 0 0 1-2.8 6.8z"></path>
            </svg>
          </button>
          <img
            src={selectedImage}
            alt={`Image ${currentIndex + 1}`}
            className="slider-image"
          />
          <button className="next" onClick={handleNext}>
            {/* {" "}
            &#62;{" "} */}
            <svg
              height="60"
              width="60"
              viewBox="0 0 128 128"
              role="presentation"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M54.3 96a4 4 0 0 1-2.8-6.8L76.7 64 51.5 38.8a4 4 0 0 1 5.7-5.6L88 64 57.2 94.8a4 4 0 0 1-2.9 1.2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default function ActivitiesDetail4() {
  const router = useRouter();
  const hotelDataRef = useRef(null);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [hotelData, setHotelData] = useState(null);
  const [searchQueryData, setSearchQueryData] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const [availabilityError, setAvailabilityError] = useState(null);
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [roomsData, setRoomsData] = useState([
    { numberOfAdults: 1, numberOfChild: 0, childAge: [] },
  ]);
  const [showTraveller, setShowTraveller] = useState(false);
  const [openCheckin, setOpenCheckin] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  
  // Markup State
  const [markupObj, setMarkupObj] = useState({ global: 0, individual: {} });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("hotelMarkupData");
      if (saved) {
        setMarkupObj(JSON.parse(saved));
      } else {
        const old = localStorage.getItem("hotelMarkup");
        if (old) setMarkupObj({ global: Number(old), individual: {} });
      }
    } catch (e) {
      console.error("Error loading markup", e);
    }
  }, []);

  const handleMarkupUpdate = (amount, isGlobal, id = null) => {
    setMarkupObj((prev) => {
      const newState = isGlobal
        ? { ...prev, global: amount, individual: {} }
        : {
            ...prev,
            individual: { ...prev.individual, [id]: amount },
          };

      localStorage.setItem("hotelMarkupData", JSON.stringify(newState));
      if (isGlobal) localStorage.setItem("hotelMarkup", amount); // Backward compatibility
      return newState;
    });
  };

  // useEffect(() => {
  //   if (searchQueryData?.roomInfo) {
  //     const convertedRooms = searchQueryData.roomInfo.map((room) => ({
  //       numberOfAdults: room.numberOfAdults,
  //       numberOfChild: room.numberOfChild,
  //       childAges: room.childAge || [],
  //     }));
  //     setRoomsData(convertedRooms);
  //   }
  // }, [searchQueryData?.roomInfo]);

  useEffect(() => {
    if (searchQueryData?.roomInfo) {
      const convertedRooms = searchQueryData.roomInfo.map((room) => ({
        numberOfAdults: room.numberOfAdults ?? 1,
        numberOfChild: room.numberOfChild ?? 0,
        childAge: Array.isArray(room.childAge) ? room.childAge : [],
      }));
      setRoomsData(convertedRooms);
    }
  }, [searchQueryData?.roomInfo]);
  const normalizeRooms = (rs = []) =>
    rs.map(({ numberOfAdults, numberOfChild, childAge, childAges }) => ({
      numberOfAdults,
      numberOfChild,
      childAge: Array.isArray(childAge)
        ? childAge
        : Array.isArray(childAges)
        ? childAges
        : [],
    }));
  const toggleTraveller = () => {
    setShowTraveller((prevState) => !prevState);
  };

  const scrollToHotelData = () => {
    hotelDataRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const roomInfo = searchQueryData?.roomInfo || [];

  // const prevCheckinDate = useRef(checkinDate);
  // const prevCheckoutDate = useRef(checkoutDate);
  // const prevRoomsData = useRef(JSON.stringify(normalizeRooms(roomsData)));
  // baseline refs + a gate so the watcher ignores the first hydration
  const prevCheckinDate = useRef(null);
  const prevCheckoutDate = useRef(null);
  const prevRoomsData = useRef("");
  const readyRef = useRef(false);

  const [searchCriteria, setSearchCriteria] = useState({});
  const [searchPreferences, setSearchPreferences] = useState({});
  const [dynamicId, setDynamicId] = useState(id); // Store dynamic id
  const [isFetchingButton, setIsFetchingButton] = useState(false);

  const [openDateRange, setOpenDateRange] = useState(null);
  const [triggerFetch, setTriggerFetch] = useState(0); // Counter to force fetch

  // useEffect(() => {
  //   if (dynamicId !== id) {
  //     router.push(`/hotel-listing/${dynamicId}`, undefined, { shallow: true });
  //   }
  // }, [dynamicId, id, router]);
  useEffect(() => {
    if (!dynamicId) return;
    if (dynamicId !== id) {
      router.replace(`/hotel-listing/${dynamicId}`);
    }
  }, [dynamicId, id, router]);

  const fetchHotelDetails = async (
    updatedData,
    { showButtonLoading = false } = {}
  ) => {
    try {
      if (showButtonLoading) {
        setIsFetchingButton(true);
      } else {
        setLoading(true);
      }
      const reqData = {
        action: "hotelDetaiSearch",
        requestData: {
          id: dynamicId,
          searchQuery: {
            ...updatedData,
            searchCriteria: searchCriteria,
            searchPreferences: searchPreferences,
          },
        },
      };
      const response = await postData("travelogy/hotel/fetch-data", reqData);

      console.log("karthik", response.status);
      if (response?.status?.success) {
        setHotelData(response.hotel);
        setSearchQueryData(response.searchQuery);
        setCheckinDate(response.searchQuery?.checkinDate);
        setCheckoutDate(response.searchQuery?.checkoutDate);
        setDynamicId(response.hotel.id);
        setRoomsData(response.searchQuery?.roomInfo);
        setAvailabilityError(null); // Clear availability error on success
        console.log("roomInfo", response.searchQuery?.roomInfo);
      } else {
        console.log("error", response?.error);
        const errorMessage = response?.error || "Error fetching hotel details";

        // Check if it's a network/server error (status codes, request failed, etc.)
        const isNetworkError =
          errorMessage.toLowerCase().includes("status code") ||
          errorMessage.toLowerCase().includes("request failed") ||
          errorMessage.toLowerCase().includes("network error") ||
          errorMessage.toLowerCase().includes("timeout");

        // Check if it's an availability error (hotel not available, no rooms, etc.)
        const isAvailabilityError =
          !isNetworkError &&
          (errorMessage.toLowerCase().includes("no longer available") ||
            errorMessage.toLowerCase().includes("not available") ||
            errorMessage.toLowerCase().includes("no rooms") ||
            response?.status === undefined);

        if (isAvailabilityError && hotelData) {
          // If we already have hotel data, show error in availability section (booking card)
          setAvailabilityError(errorMessage);
        } else {
          // Network/server errors or critical errors - show full error layout
          setError(errorMessage);
        }
        console.error(errorMessage);
      }
    } catch (error) {
      setError("Error fetching hotel details: " + error.message);
      console.error("Error fetching hotel details:", error.message);
    } finally {
      if (showButtonLoading) {
        setIsFetchingButton(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!readyRef.current) return;

    const normalizedRooms = normalizeRooms(roomsData);
    const roomsChanged =
      JSON.stringify(normalizedRooms) !== prevRoomsData.current;

    // Only fetch when:
    // 1. Checkout date changes AND both dates are complete, OR
    // 2. Rooms change AND both dates are complete, OR
    // 3. Manual trigger (when user re-selects same date)
    const bothDatesComplete = checkinDate && checkoutDate;
    const isCheckoutChanged = checkoutDate !== prevCheckoutDate.current;
    const shouldFetch =
      (isCheckoutChanged && bothDatesComplete) ||
      (roomsChanged && bothDatesComplete) ||
      (triggerFetch > 0 && bothDatesComplete);

    console.log("Fetch Debug:", {
      bothDatesComplete,
      isCheckoutChanged,
      roomsChanged,
      triggerFetch,
      shouldFetch,
      checkinDate,
      checkoutDate,
      prevCheckinDate: prevCheckinDate.current,
      prevCheckoutDate: prevCheckoutDate.current,
    });

    if (shouldFetch) {
      console.log("Triggering fetch with:", {
        checkinDate,
        checkoutDate,
        roomInfo: normalizedRooms,
      });

      fetchHotelDetails(
        {
          checkinDate,
          checkoutDate,
          roomInfo: normalizedRooms,
        },
        { showButtonLoading: true }
      );

      prevCheckinDate.current = checkinDate;
      prevCheckoutDate.current = checkoutDate;
      prevRoomsData.current = JSON.stringify(normalizedRooms);

      // Reset trigger after fetch
      if (triggerFetch > 0) {
        setTriggerFetch(0);
      }
    } else {
      // Update refs even when not fetching to track state changes
      const isCheckinChanged = checkinDate !== prevCheckinDate.current;
      if (isCheckinChanged) {
        prevCheckinDate.current = checkinDate;
      }

      if (isCheckoutChanged) {
        prevCheckoutDate.current = checkoutDate;
      }
    }
  }, [checkinDate, checkoutDate, roomsData, triggerFetch]);

  useEffect(() => {
    async function fetchInitialHotelDetails({
      showButtonLoading = false,
    } = {}) {
      try {
        if (showButtonLoading) setIsFetchingButton(true);
        else setLoading(true);
        let reqData = {
          action: "hotelDetaiSearch",
          requestData: { id: dynamicId },
        };
        const response = await postData("travelogy/hotel/fetch-data", reqData);

        if (response?.error) {
          // Initial load errors should show full error layout
          setError(response.error);
        } else if (response?.errors?.[0]?.message) {
          setError(response.errors?.[0].message);
        } else if (response?.status?.success) {
          setAvailabilityError(null); // Clear any previous availability errors
          const hotel = response.hotel;
          const searchData = response.searchQuery;
          if (searchData) {
            // Dynamically fetch and set adults and children from API response
            setAdults(searchData.adults); // Set adults from API response
            setChildren(searchData.children); // Set children from API response
          }
          setSearchCriteria(searchData?.searchCriteria || {});
          setSearchPreferences(searchData?.searchPreferences || {});

          setHotelData(hotel);
          setSearchQueryData(searchData);
          setCheckinDate(searchData?.checkinDate || null);
          setCheckoutDate(searchData?.checkoutDate || null);
          setDynamicId(hotel.id);
          setRoomsData(response.searchQuery?.roomInfo);
          console.log(
            "12312312312312312312312312312312321",
            response.searchQuery?.roomInfo
          );
          // 🔒 Baseline "previous" refs so the watcher sees NO change right after initial load
          const normalized = normalizeRooms(
            response.searchQuery?.roomInfo || []
          );
          prevRoomsData.current = JSON.stringify(normalized);
          prevCheckinDate.current = response.searchQuery?.checkinDate || null;
          prevCheckoutDate.current = response.searchQuery?.checkoutDate || null;

          // ✅ Now allow the watcher to respond to real user changes
          readyRef.current = true;
        }
      } catch (error) {
        setError("Error fetching hotel data: " + error.message);
        console.error("Error fetching hotel data", error);
      } finally {
        if (showButtonLoading) setIsFetchingButton(false);
        else setLoading(false);
      }
    }

    fetchInitialHotelDetails();
  }, [id]);
  const [openSections, setOpenSections] = useState({
    overview: true,
    facilities: true,
    location: true,
  });

  const handleAccordion = (section) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
  if (loading) {
    return (
      <Layout headerStyle={1} footerStyle={1}>
        <div className="col-12 d-flex justify-center py-5">
          <div className="loader"></div>
        </div>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          <div className="flex flex-col items-center justify-center text-red-700 py-10 px-4">
            <h2 className="text-xl font-semibold mb-2">
              Oops! Something went wrong.
            </h2>
            <p className="text-sm">{error}</p>
            <div className="flex justify-center mt-4">
              <Link href="/hotels" passHref>
                <button
                  // onClick={handleRetry}
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Retry Hotel
                </button>
              </Link>
            </div>
          </div>
        </main>
      </Layout>
    );
  }
  const selectedOption = hotelData?.ops?.[0];
  const ris = selectedOption?.ris || [];
  const basefare = ris.reduce((acc, room) => acc + (room.tfcs?.BF || 0), 0);
  const taxAndFees = ris.reduce((acc, room) => acc + (room.tfcs?.TAF || 0), 0);
  const netprice = ris.reduce((acc, room) => acc + (room.tfcs?.NF || 0), 0);

  const RoomType = ris[0]?.mb;
  const RoomCategory = ris[0]?.rc;
  const totalfare = selectedOption?.tp;
  const baggageinfo = [];
  const mealinfo = [];
  const rating = hotelData?.rt || 0;
  const filledStars = Math.round(rating);
  const { ln, lt } = hotelData?.gl || {};

  // Create a more descriptive Google Maps URL with hotel name and address
  const hotelName = hotelData?.name || "Hotel";
  const hotelAddress = hotelData?.ad?.adr || "";
  const hotelCity = hotelData?.ad?.city?.name || "";
  const hotelCountry = hotelData?.ad?.country?.name || "";

  // Encode the search query for Google Maps
  const searchQuery = encodeURIComponent(
    `${hotelName}, ${hotelAddress}, ${hotelCity}, ${hotelCountry}`
  );
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;

  const images = hotelData?.img || [];
  // Filter XXL images for display
  const displayImages = images.filter(
    (image) => !image.sz || image.sz === "XXL"
  );
  const totalImageCount = displayImages.length;
  const hasMultipleImages = totalImageCount > 1;

  // Debug: Log the images to see what we're working with
  console.log("Hotel images:", images);
  console.log("Display images:", displayImages);
  console.log("Total image count:", totalImageCount);
  console.log("Has multiple images:", hasMultipleImages);

  let hotelDescription = {};
  try {
    hotelDescription = hotelData?.des ? JSON.parse(hotelData.des) : {};
  } catch (err) {
    console.error("Invalid hotel description JSON", err);
  }

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <main className="main">
        <section className="box-section box-content-tour-detail background-body">
          <div className="container">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <div className="xl:col-span-8 order-1 px-4 md:px-6 lg:px-8 xl:px-0">
                <div className="box-banner-activities-detail-4">
                  <div
                    className={`image-gallery ${
                      hasMultipleImages ? "has-button-overlay" : ""
                    }`}
                  >
                    <div className="image-row">
                      <div
                        className={`image-column ${
                          hasMultipleImages ? "has-overlay" : ""
                        }`}
                      >
                        <img
                          className="main-banner-img"
                          src={
                            displayImages[0]?.url ||
                            hotelData?.img?.[0]?.url ||
                            "/mnt/data/025be28a-239a-4b79-8f15-236603e87e5e.png"
                          }
                          alt="Main Hotel Image"
                        />
                      </div>
                      {hasMultipleImages && (
                        <div className="image-column">
                          <div className="image-row-3">
                            {displayImages.slice(1, 4).map((image, index) => (
                              <div key={index} className="image-item">
                                <img
                                  src={image.url}
                                  alt={`Thumbnail ${index + 1}`}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {hasMultipleImages && (
                      <div
                        className={`image-row ${
                          hasMultipleImages ? "has-button-overlay" : ""
                        }`}
                      >
                        {displayImages.slice(4, 8).map((image, index) => (
                          <div key={index} className="image-item">
                            <img
                              src={image.url}
                              alt={`Thumbnail ${index + 4}`}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    className={`container-banner-activities ${
                      !hasMultipleImages ? "single-image-mode" : ""
                    }`}
                  >
                    {hasMultipleImages && (
                      <div className="box-button-abs box-button-abs-right">
                        <Link
                          className="btn btn-brand-secondary"
                          href="#"
                          onClick={() => setIsModalOpen(true)}
                        >
                          <svg
                            width={22}
                            height={22}
                            viewBox="0 0 22 22"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M20 8V2.75C20 2.3375 19.6625 2 19.25 2H14C13.5875 2 13.25 2.3375 13.25 2.75V8C13.25 8.4125 13.5875 8.75 14 8.75H19.25C19.6625 8.75 20 8.4125 20 8ZM19.25 0.5C20.495 0.5 21.5 1.505 21.5 2.75V8C21.5 9.245 20.495 10.25 19.25 10.25H14C12.755 10.25 11.75 9.245 11.75 8V2.75C11.75 1.505 12.755 0.5 14 0.5H19.25Z" />
                            <path d="M20 19.25V14C20 13.5875 19.6625 13.25 19.25 13.25H14C13.5875 13.25 13.25 13.5875 13.25 14V19.25C13.25 19.6625 13.5875 20 14 20H19.25C19.6625 20 20 19.6625 20 19.25ZM19.25 11.75C20.495 11.75 21.5 12.755 21.5 14V19.25C21.5 20.495 20.495 21.5 19.25 21.5H14C12.755 21.5 11.75 20.495 11.75 19.25V14C11.75 12.755 12.755 11.75 14 11.75H19.25Z" />
                            <path d="M8 8.75C8.4125 8.75 8.75 8.4125 8.75 8V2.75C8.75 2.3375 8.4125 2 8 2H2.75C2.3375 2 2 2.3375 2 2.75V8C2 8.4125 2.3375 8.75 2.75 8.75H8ZM8 0.5C9.245 0.5 10.25 1.505 10.25 2.75V8C10.25 9.245 9.245 10.25 8 10.25H2.75C1.505 10.25 0.5 9.245 0.5 8V2.75C0.5 1.505 1.505 0.5 2.75 0.5H8Z" />
                            <path d="M8 20C8.4125 20 8.75 19.6625 8.75 19.25V14C8.75 13.5875 8.4125 13.25 8 13.25H2.75C2.3375 13.25 2 13.5875 2 14V19.25C2 19.6625 2.3375 20 2.75 20H8ZM8 11.75C9.245 11.75 10.25 12.755 10.25 14V19.25C10.25 20.495 9.245 21.5 8 21.5H2.75C1.505 21.5 0.5 20.495 0.5 19.25V14C0.5 12.755 1.505 11.75 2.75 11.75H8Z" />
                          </svg>
                          {totalImageCount}{" "}
                          {totalImageCount === 1 ? "Photo" : "Photos"}
                        </Link>

                        <Modal
                          images={images}
                          hotelName={hotelName}
                          filledStars={filledStars}
                          isOpen={isModalOpen}
                          onClose={() => setIsModalOpen(false)}
                          setSelectedImage={setSelectedImage}
                          selectedImage={selectedImage}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="xl:col-span-8 order-3 px-4 md:px-6 lg:px-8 xl:px-0">
                <div className="box-collapse-expand">
                  <div className="group-collapse-expand">
                    <button
                      className={
                        openSections.overview
                          ? "btn btn-collapse"
                          : "btn btn-collapse collapsed"
                      }
                      onClick={() => handleAccordion("overview")}
                    >
                      <h6>Overview</h6>
                    </button>
                    <div
                      className={
                        openSections.overview ? "collapse show" : "collapse"
                      }
                      id="collapseOverview"
                    >
                      <div className="cards card-body">
                        <div className="space-y-4">
                          {Object.entries(hotelDescription).map(
                            ([key, value]) => {
                              if (!value?.trim()) return null;

                              const label = key
                                .split("_")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join(" ");

                              const hasDoubleSpace = value.includes("  ");
                              const listItems = hasDoubleSpace
                                ? value
                                    .split(/ {2,}/)
                                    .map((item) => item.trim())
                                    .filter(Boolean)
                                : [];

                              return (
                                <div key={key} className="mb-6">
                                  <h3 className="text-base font-bold text-gray-900 mb-1">
                                    {label}:
                                  </h3>

                                  {hasDoubleSpace ? (
                                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                                      {listItems.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p className="text-sm text-gray-700 whitespace-pre-line">
                                      {value}
                                    </p>
                                  )}
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="box-collapse-expand">
                  <div className="group-collapse-expand">
                    <button
                      className={
                        openSections.facilities
                          ? "btn btn-collapse"
                          : "btn btn-collapse collapsed"
                      }
                      onClick={() => handleAccordion("facilities")}
                    >
                      <h6>Facilities</h6>
                    </button>
                    <div
                      className={
                        openSections.facilities ? "collapse show" : "collapse"
                      }
                      id="collapseIncluded"
                    >
                      <div className="cards card-body">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 list-disc pl-6 text-gray-700 text-sm leading-relaxed">
                          {(hotelData?.facilities || hotelData?.fl)?.length > 0 ? (
                            (hotelData?.facilities || hotelData?.fl).map((item, index) => (
                              <li key={index} className="relative pl-1">
                                {item}
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500 italic">
                              No facilities listed.
                            </li>
                          )}
                        </ul>{" "}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="box-collapse-expand">
                  <div className="group-collapse-expand">
                    <button
                      className={
                        openSections.location
                          ? "btn btn-collapse"
                          : "btn btn-collapse collapsed"
                      }
                      onClick={() => handleAccordion("location")}
                    >
                      <h6>Location</h6>
                    </button>
                    <div
                      className={
                        openSections.location ? "collapse show" : "collapse"
                      }
                      id="collapseMap"
                    >
                      <div className="cards card-body">
                        <iframe
                          src={`https://www.google.com/maps?q=${encodeURIComponent(
                            `${hotelName}, ${hotelAddress}, ${hotelCity}`
                          )}&ll=${hotelData?.gl?.lt},${
                            hotelData?.gl?.ln
                          }&z=15&output=embed`}
                          width="100%"
                          height={290}
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-10 container" ref={hotelDataRef}>
                  <hr />
                  <HotelData
                    facilities={hotelData?.facilities || hotelData?.fl || []}
                    longitude={hotelData?.gl?.lt}
                    latitude={hotelData?.gl?.ln}
                    fetchHotelData={hotelData?.ops?.flatMap((o) => o) || []}
                    hotelId={hotelData?.id}
                    availabilityError={availabilityError}
                    markupObj={markupObj}
                    hotelName={hotelData?.name}
                    hotelAddress={`${hotelData?.ad?.adr}, ${hotelData?.ad?.city?.name}`}
                    hotelImage={displayImages[0]?.url || hotelData?.img?.[0]?.url}
                    checkinDate={checkinDate}
                    checkoutDate={checkoutDate}
                    hotelData={hotelData}
                  />
                </div>
              </div>
              <div className="xl:col-span-4 order-2 xl:row-span-2 px-4 md:px-6 lg:px-8 xl:px-0 mb-40">
                <div className="xl:sticky xl:top-4">
                  <div className="tour-header">
                    <div className="tour-title-main">
                      <h6 className="neutral-1000">
                        {hotelData?.name || "Hotel Name"}
                      </h6>
                      <>
                        <p>
                          {hotelData?.ad?.adr} {hotelData?.ad?.postalCode}
                        </p>
                      </>
                    </div>
                    <div className="tour-rate mb-1">
                      <div className="rates-element">
                        <span className="rating">
                          {[...Array(filledStars)].map((_, index) => (
                            <svg
                              key={`filled-${index}`}
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="gold"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 .25l1.8 5.8h6.2l-5 3.6 1.9 5.8-5-3.6-5 3.6 1.9-5.8-5-3.6h6.2L8 .25z" />
                            </svg>
                          ))}
                        </span>
                      </div>
                    </div>
                    <div className="tour-metas">
                      <div className="tour-meta-left">
                        <p className="text-sm neutral-500 mr-20 tour-location">
                          <svg
                            width={12}
                            height={16}
                            viewBox="0 0 12 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M5.99967 0C2.80452 0 0.205078 2.59944 0.205078 5.79456C0.205078 9.75981 5.39067 15.581 5.61145 15.8269C5.81883 16.0579 6.18089 16.0575 6.38789 15.8269C6.60867 15.581 11.7943 9.75981 11.7943 5.79456C11.7942 2.59944 9.1948 0 5.99967 0ZM5.99967 8.70997C4.39211 8.70997 3.0843 7.40212 3.0843 5.79456C3.0843 4.187 4.39214 2.87919 5.99967 2.87919C7.6072 2.87919 8.91502 4.18703 8.91502 5.79459C8.91502 7.40216 7.6072 8.70997 5.99967 8.70997Z" />
                          </svg>
                          {hotelData?.ad?.city?.name},
                          {hotelData?.ad?.country?.name}
                        </p>
                        <Link
                          className="text-sm neutral-1000 mr-30"
                          href={googleMapsUrl}
                          target="_blank"
                        >
                          Show on map
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="booking-form">
                    <BookingCard
                      isFetching={isFetchingButton}
                      markupObj={markupObj}
                      onMarkupUpdate={handleMarkupUpdate}
                      segmentsPrice={hotelData?.ops}
                      totalpricee={{
                        fC: {
                          BF: basefare,
                          MB: RoomType,
                          TF: totalfare,
                          NF: netprice,
                          OID: hotelData?.ops?.[0]?.id,
                          RC: RoomCategory,
                          HID: hotelData?.id,
                          TAF: taxAndFees,
                        },
                        tfcs: {
                          TAF: taxAndFees,
                        },
                      }}
                      baggageinfo={baggageinfo}
                      mealinfo={mealinfo}
                      onSelectOtherRoom={scrollToHotelData}
                      searchData={searchQueryData}
                      hotelData={hotelData}
                      checkinDate={checkinDate}
                      checkoutDate={checkoutDate}
                      setCheckinDate={setCheckinDate}
                      setCheckoutDate={setCheckoutDate}
                      setTriggerFetch={setTriggerFetch}
                      setOpenCheckin={setOpenCheckin}
                      setOpenCheckout={setOpenCheckout}
                      toggleTraveller={toggleTraveller}
                      showTraveller={showTraveller}
                      roomsData={roomsData}
                      setRoomsData={setRoomsData}
                      openDateRange={openDateRange}
                      setOpenDateRange={setOpenDateRange}
                      availabilityError={availabilityError}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
