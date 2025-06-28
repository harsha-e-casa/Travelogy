"use client";

import BookingCard from "../booking";
import VideoPopup from "@/components/elements/VideoPopup";
import Layout from "@/components/layout/Layout";
import Slider from "react-slick";
import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// const SlickArrowLeft = (props) => (
//   <button {...props} className="slick-prev slick-arrow" type="button">
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="16"
//       height="16"
//       viewBox="0 0 16 16"
//       fill="none"
//     >
//       <path
//         d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   </button>
// );

// const SlickArrowRight = (props) => (
//   <button {...props} className="slick-next slick-arrow" type="button">
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="16"
//       height="16"
//       viewBox="0 0 16 16"
//       fill="none"
//     >
//       <path
//         d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   </button>
// );

export default function ActivitiesDetail() {
  const { id } = useParams();
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const [nav1, setNav1] = useState(undefined);
  const [nav2, setNav2] = useState(undefined);
  const [hotelData, setHotelData] = useState(null);
  const [isAccordion, setIsAccordion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    setNav1(slider1.current ?? undefined);
    setNav2(slider2.current ?? undefined);
  }, []);

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
              apikey: "412605c3683c38-96bd-45b6-ae06-02e22a8be1b1",
            },
          }
        );
        setHotelData(response.data.hotel);
        setSelectedImage(response.data.hotel?.img[0]?.url);
      } catch (error) {
        console.error("Error fetching hotel data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHotelDetails();
  }, []);

  const settingsMain = {
    asNavFor: slider2.current, // Sync with the thumbnail slider
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    // prevArrow: <SlickArrowLeft />,
    // nextArrow: <SlickArrowRight />,
    // infinite: true, // Enable infinite loop to cycle through images
  };

  const settingsThumbs = {
    slidesToShow: 6,
    slidesToScroll: 1,
    dots: false,
    focusOnSelect: true,
    infinite: true,
    asNavFor: slider1.current,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 700, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  console.log(hotelData?.img);
  const handleAccordion = (key) => {
    setIsAccordion((prev) => (prev === key ? null : key));
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
  const basefare = hotelData?.ops?.[0]?.ris?.[0]?.tfcs?.BF;
  const taxAndFees = hotelData?.ops?.[0]?.ris?.[0]?.tfcs?.TAF;
  const totalfare = hotelData?.ops?.[0]?.ris?.[0]?.tfcs?.TF;
  const netprice = hotelData?.ops?.[0]?.ris?.[0]?.tfcs?.NF;

  const baggageinfo = []; // Example: you can fetch baggage info here if needed
  const mealinfo = []; // Example: you can fetch meal info here if needed

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <main className="main">
        {/* <section className="box-section box-breadcrumb background-body">
          <div className="container">
            <ul className="breadcrumbs">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/destination">Tours</Link>
              </li>
              <li>{hotelData?.name || "Loading..."}</li>
            </ul>
          </div>
        </section> */}

        <section className="section-box box-banner-home2 background-body">
          <div className="container">
            <div className="container-banner-activities">
              <div className="box-banner-activities">
                <Slider
                  {...settingsMain}
                  ref={slider1}
                  className="banner-activities-detail"
                >
                  {hotelData?.img
                    ?.filter((img) => img.sz === "Standard" || !img.sz)
                    .map((img, i) => (
                      <div className="banner-slide-activity" key={i}>
                        <img
                          className="w_500"
                          src={selectedImage || img.url}
                          alt={`Image ${i + 1}`}
                        />
                      </div>
                    ))}
                </Slider>
                {/* <div className="box-button-abs">
                  <Link className="btn btn-brand-secondary" href="#">
                    See All Photos
                  </Link>
                  <VideoPopup vdocls="btn btn-white-md popup-youtube" style2 />
                </div> */}
              </div>

              <div className="slider-thumnail-activities">
                <Slider
                  {...settingsThumbs}
                  ref={slider2}
                  className="slider-nav-thumbnails-activities-detail"
                >
                  {hotelData?.img
                    ?.filter((img) => img.sz === "Standard" || !img.sz)
                    .map((img, i) => (
                      <div
                        className="banner-slide"
                        key={i}
                        onClick={() => handleImageClick(img.url)}
                      >
                        <img src={img.url} alt={`Thumbnail ${i + 1}`} />
                      </div>
                    ))}
                </Slider>
              </div>
            </div>
          </div>
        </section>

        <section className="box-section box-content-tour-detail background-body">
          <div className="container">
            <div className="tour-header">
              <h4 className="neutral-1000">
                {hotelData?.name || "Hotel Name"}
              </h4>
              <p className="text-md-medium neutral-500 tour-location">
                {hotelData?.ad?.adr} <br />
                {hotelData?.ad?.city?.name}
                <br /> {hotelData?.ad?.country?.name}
              </p>
            </div>

            <div className="row mt-30">
              <div className="col-lg-8">
                <div className="box-info-tour">
                  <div className="box-collapse-expand">
                    <div className="group-collapse-expand">
                      <button
                        className={`btn btn-collapse ${
                          isAccordion === 1 ? "collapsed" : ""
                        }`}
                        onClick={() => handleAccordion(1)}
                      >
                        <h6>Overview</h6>
                      </button>
                      <div
                        className={`collapse ${
                          isAccordion === 1 ? "" : "show"
                        }`}
                      >
                        <div className="cards card-body">
                          {hotelData?.des && (
                            <>
                              <p>{JSON.parse(hotelData.des).amenities}</p>
                              <p>{JSON.parse(hotelData.des).rooms}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="group-collapse-expand">
                      <button
                        className={`btn btn-collapse ${
                          isAccordion === 4 ? "collapsed" : ""
                        }`}
                        onClick={() => handleAccordion(4)}
                      >
                        <h6>Tour Map</h6>
                      </button>
                      <div
                        className={`collapse ${
                          isAccordion === 4 ? "" : "show"
                        }`}
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
                </div>
              </div>

              <div className="col-lg-4">
                <div className="booking-form">
                  <div className="head-booking-form">
                    <p className="text-xl-bold neutral-1000">Booking Form</p>
                  </div>
                  <BookingCard
                    segmentsPrice={hotelData?.ops} // Pass the full operations data if necessary
                    totalpricee={{
                      fC: {
                        BF: basefare,
                        TAF: taxAndFees,
                        TF: totalfare,
                        NF: netprice,
                      },
                    }}
                    baggageinfo={baggageinfo} // Populate this as needed
                    mealinfo={mealinfo} // Populate this as needed
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
