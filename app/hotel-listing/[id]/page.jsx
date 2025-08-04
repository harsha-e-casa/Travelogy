"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import BookingCard from "../booking";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import HotelData from "./hotelData";

const Modal = ({
  images,
  isOpen,
  onClose,
  selectedImage,
  setSelectedImage,
}) => {
  // const standardImages = useMemo(
  //   () => images.filter((image) => image.sz === "Standard"),
  //   [images]
  // );

  const standardImages = useMemo(() => {
    const filteredImages = images.filter((image) => image.sz === "Standard");

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
        <button className="close-modal-btn" onClick={onClose}>
          x
        </button>
        <div className="modal-slider">
          <button className="prev" onClick={handlePrev}>
            {" "}
            &#60;{" "}
          </button>
          <img
            src={selectedImage}
            alt={`Image ${currentIndex + 1}`}
            className="slider-image"
          />
          <button className="next" onClick={handleNext}>
            {" "}
            &#62;{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
export default function ActivitiesDetail4() {
  const hotelDataRef = useRef(null);
  const [hotelData, setHotelData] = useState(null);
  const [searchQueryData, setSearchQueryData] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [selectFrom, setSelectFrom] = useState("Goa");
  const [roomsData, setRoomsData] = useState([
    { adults: 1, children: 0, childAges: [] },
  ]);
  // const [totalAdults, setTotalAdults] = useState(1);
  // const [totalChildren, setTotalChildren] = useState(0);
  const [showSearchState, setShowSearchState] = useState(false);
  const [showTraveller, setShowTraveller] = useState(false);
  const [openCheckin, setOpenCheckin] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [openDateRange, setOpenDateRange] = useState(false);

  const handleSearch = () => {
    console.log("Searching with the following data:");
    console.log("Check-in:", checkinDate);
    console.log("Check-out:", checkoutDate);
    console.log("Location:", selectFrom);
    console.log("Rooms Data:", roomsData);
  };
  useEffect(() => {
    if (searchQueryData?.roomInfo) {
      const convertedRooms = searchQueryData.roomInfo.map((room) => ({
        adults: room.numberOfAdults,
        children: room.numberOfChild,
        childAges: room.childAge || [],
      }));
      setRoomsData(convertedRooms);
    }
  }, [searchQueryData?.roomInfo]);

  const toggleCheckin = () => {
    setOpenCheckin((prevState) => !prevState);
  };

  const toggleCheckout = () => {
    setOpenCheckout((prevState) => !prevState);
  };

  const toggleTraveller = () => {
    setShowTraveller((prevState) => !prevState);
  };

  const openfrom = () => {
    setShowSearchState((prevState) => !prevState);
  };

  const scrollToHotelData = () => {
    hotelDataRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    async function fetchHotelDetails() {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://apitest.tripjack.com/hms/v1/hotelDetail-search",
          { id },
          {
            headers: {
              "Content-Type": "application/json",
              apikey: "412605943ad923-4ae7-49f6-9c8e-8b75be573422",
            },
          }
        );
        if (response.data.status.success) {
          const hotel = response.data.hotel;
          const searchData = response.data.searchQuery;

          setHotelData(hotel);
          setSearchQueryData(searchData);

          setCheckinDate(searchData?.checkinDate || null);
          setCheckoutDate(searchData?.checkoutDate || null);
          console.log(response.data.hotel);
          console.log(response.data.searchQuery);
        } else {
          setError(response.data.errors[0]?.message);
          console.log(
            "fgiusdhgsfgugsufguysgfygyfdygfugfudy",
            response.data.errors[0]?.message
          );
        }
      } catch (error) {
        console.error("Error fetching hotel data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHotelDetails();
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
        <div className="col-12 d-flex justify-center py-5">
          <div className="text">{error}</div>
        </div>
      </Layout>
    );
  }
  const basefare = hotelData?.ops?.[0]?.ris?.[0]?.tfcs?.BF;

  const RoomType = hotelData?.ops?.[0]?.ris?.[0]?.mb;
  const RoomCategory = hotelData?.ops?.[0]?.ris?.[0]?.rc;

  // const totalfare = hotelData?.pops?.[0]?.tpc;
  const totalfare = hotelData?.ops?.[0]?.tp;

  const hotelId = hotelData?.id;
  const optionId = hotelData?.ops?.[0]?.id;

  const netprice = hotelData?.ops?.[0]?.ris?.[0]?.tfcs?.NF;

  const baggageinfo = [];
  const mealinfo = [];
  const rating = hotelData?.rt || 0;
  const totalStars = 5;
  const filledStars = Math.round(rating);
  const emptyStars = totalStars - filledStars;
  const { ln, lt } = hotelData?.gl || {};
  const googleMapsUrl = `https://www.google.com/maps?q=${lt},${ln}`;
  const images = hotelData?.img || [];
  // Calculate total adults, children, and rooms
  const roomInfo = searchQueryData?.roomInfo || [];
  const totalAdults = roomInfo.reduce(
    (sum, room) => sum + (room.numberOfAdults || 0),
    0
  );
  const totalChildren = roomInfo.reduce(
    (sum, room) => sum + (room.numberOfChild || 0),
    0
  );
  const roomCount = roomInfo.length;
  console.log("Rooms & Guest", searchQueryData?.roomInfo);
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <div className="box-banner-activities-detail-4">
                  <div className="image-gallery">
                    <div className="image-row">
                      <div className="image-column">
                        <img
                          className="main-banner-img"
                          src={
                            hotelData?.img?.find(
                              (image) => image.sz === "Standard"
                            )?.url ||
                            hotelData?.img?.[0]?.url ||
                            "/mnt/data/025be28a-239a-4b79-8f15-236603e87e5e.png"
                          }
                          alt="Main Hotel Image"
                        />
                      </div>
                      <div className="image-column">
                        <div className="image-row-3">
                          {hotelData?.img
                            ?.filter(
                              (image) => !image.sz || image.sz === "Standard"
                            )
                            .slice(1, 4)
                            .map((image, index) => (
                              <div key={index} className="image-item">
                                <img
                                  src={image.url}
                                  alt={`Thumbnail ${index + 1}`}
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className="image-row">
                      {hotelData?.img
                        ?.filter(
                          (image) => !image.sz || image.sz === "Standard"
                        )
                        .slice(4, 8)
                        .map((image, index) => (
                          <div key={index} className="image-item">
                            <img
                              src={image.url}
                              alt={`Thumbnail ${index + 1}`}
                            />
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="container-banner-activities">
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
                        {hotelData?.img?.filter(
                          (image) => image.sz === "Standard"
                        ).length + 1}{" "}
                        {hotelData?.img?.filter(
                          (image) => image.sz === "Standard"
                        ).length +
                          1 ===
                        1
                          ? "Photo"
                          : "Photos"}
                      </Link>

                      <Modal
                        images={images}
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        setSelectedImage={setSelectedImage}
                        selectedImage={selectedImage}
                      />
                    </div>
                  </div>
                </div>

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
                        {/* {hotelData?.des && (
                          <>
                            <p>{JSON.parse(hotelData.des).amenities}</p>
                            <p>{JSON.parse(hotelData.des).rooms}</p>
                          </>
                        )} */}
                        <div className="space-y-4">
                          {Object.entries(hotelDescription).map(
                            ([key, value]) => {
                              if (!value?.trim()) return null; // skip empty or null values

                              // Convert key like "onsite_payments" => "Onsite Payments"
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
                                  <h3 className="text-base font-semibold text-gray-800 mb-1">
                                    {label}
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
                          {hotelData?.fl?.length > 0 ? (
                            hotelData?.fl.map((item, index) => (
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
                          src={`https://www.google.com/maps?q=${hotelData?.gl?.lt},${hotelData?.gl?.ln}&z=15&output=embed`}
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
                    facilities={hotelData?.fl || []}
                    longitude={hotelData?.gl?.lt}
                    latitude={hotelData?.gl?.ln}
                    fetchHotelData={hotelData?.ops?.flatMap((o) => o) || []}
                    hotelId={hotelData?.id}
                    // fetchHotelData={hotelData?.ops?.flatMap((o) => o.ris) || []}
                  />
                </div>
              </div>
              <div className="lg:col-span-4">
                <div className="sticky top-4">
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
                    <div className="tour-rate">
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
                        <p className="text-md-medium neutral-500 mr-20 tour-location">
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
                          className="text-md-medium neutral-1000 mr-30"
                          href={googleMapsUrl}
                          target="_blank"
                        >
                          Show on map
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="booking-form">
                    {/* <div className="head-booking-form">
                      <p className="text-xl-bold neutral-1000">Booking Form</p>
                    </div> */}
                    <BookingCard
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
                      setOpenCheckin={setOpenCheckin}
                      setOpenCheckout={setOpenCheckout}
                      toggleTraveller={toggleTraveller}
                      showTraveller={showTraveller}
                      roomsData={roomsData}
                      setRoomsData={setRoomsData}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section></section> */}
      </main>
    </Layout>
  );
}
