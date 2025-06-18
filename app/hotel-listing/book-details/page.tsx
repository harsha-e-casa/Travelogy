"use client";
import { useState } from "react";
import BookingForm from "@/components/elements/BookingForm";
import VideoPopup from "@/components/elements/VideoPopup";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
export default function BookDetails() {
  const [isAccordion, setIsAccordion] = useState(null);

  const handleAccordion = (key: any) => {
    setIsAccordion((prevState) => (prevState === key ? null : key));
  };
  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          <section className="box-section box-breadcrumb background-body">
            <div className="container">
              <ul className="breadcrumbs">
                <li>
                  {" "}
                  <Link href="/">Home</Link>
                  <span className="arrow-right">
                    <svg
                      width={7}
                      height={12}
                      viewBox="0 0 7 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 11L6 6L1 1"
                        stroke=""
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                </li>
                <li>
                  {" "}
                  <Link href="/destination">Hotel</Link>
                  <span className="arrow-right">
                    <svg
                      width={7}
                      height={12}
                      viewBox="0 0 7 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 11L6 6L1 1"
                        stroke=""
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                </li>
                <li>
                  {" "}
                  <span className="text-breadcrumb">Hotel Le Meurice</span>
                </li>
              </ul>
            </div>
          </section>
          <section className="box-section box-banner-property-detail background-body">
            <div className="container">
              <div className="block-banner-property-detail container-banner-activities">
                <div className="row">
                  <div className="col-xl-6 col-lg-6">
                    <div className="banner-property-detail-1">
                      {" "}
                      <img
                        src="/assets/imgs/page/property/banner2.png"
                        alt="Travile"
                      />
                      <div className="box-button-abs">
                        {" "}
                        <Link className="btn btn-brand-secondary" href="#">
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
                          See All Photos
                        </Link>
                        <VideoPopup
                          vdocls="btn btn-white-md popup-youtube"
                          style2
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-sm-6">
                    <div className="banner-property-detail-2">
                      {" "}
                      <img
                        src="/assets/imgs/page/property/banner3.png"
                        alt="Travile"
                      />
                    </div>
                    <div className="banner-property-detail-3">
                      {" "}
                      <img
                        src="/assets/imgs/page/property/banner4.png"
                        alt="Travile"
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-sm-6">
                    <div className="banner-property-detail-4">
                      {" "}
                      <img
                        src="/assets/imgs/page/property/banner5.png"
                        alt="Travile"
                      />
                    </div>
                    <div className="banner-property-detail-5">
                      {" "}
                      <img
                        src="/assets/imgs/page/property/banner6.png"
                        alt="Travile"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="box-section box-buttons-destination box-buttons-property-detail background-card pt-40">
            <div className="container-fluid">
              <div className="box-button-faq wow fadeInRight">
                {" "}
                <Link className="btn btn-border-1" href="#">
                  {" "}
                  <img
                    className="light-mode"
                    src="/assets/imgs/page/room/airport.svg"
                    alt="Travile"
                  />
                  <img
                    className="dark-mode"
                    src="/assets/imgs/page/room/airport-w.svg"
                    alt="Travile"
                  />
                  Airport Transfer
                </Link>
                <Link className="btn btn-border-1" href="#">
                  {" "}
                  <img
                    className="light-mode"
                    src="/assets/imgs/page/room/safety-box.svg"
                    alt="Travile"
                  />
                  <img
                    className="dark-mode"
                    src="/assets/imgs/page/room/safety-box-w.svg"
                    alt="Travile"
                  />
                  Safety Box
                </Link>
                <Link className="btn btn-border-1" href="#">
                  {" "}
                  <img
                    className="light-mode"
                    src="/assets/imgs/page/room/coffee-shop.svg"
                    alt="Travile"
                  />
                  <img
                    className="dark-mode"
                    src="/assets/imgs/page/room/coffee-shop-w.svg"
                    alt="Travile"
                  />
                  Balcony
                </Link>
                <Link className="btn btn-border-1" href="#">
                  {" "}
                  <img
                    className="light-mode"
                    src="/assets/imgs/page/room/massage.svg"
                    alt="Travile"
                  />
                  <img
                    className="dark-mode"
                    src="/assets/imgs/page/room/massage-w.svg"
                    alt="Travile"
                  />
                  Spa Sauna
                </Link>
                <Link className="btn btn-border-1" href="#">
                  {" "}
                  <img
                    className="light-mode"
                    src="/assets/imgs/page/room/animal.svg"
                    alt="Travile"
                  />
                  <img
                    className="dark-mode"
                    src="/assets/imgs/page/room/animal-w.svg"
                    alt="Travile"
                  />
                  Pet Allowed
                </Link>
                <Link className="btn btn-border-1" href="#">
                  {" "}
                  <img
                    className="light-mode"
                    src="/assets/imgs/page/room/wifi.svg"
                    alt="Travile"
                  />
                  <img
                    className="dark-mode"
                    src="/assets/imgs/page/room/wifi-w.svg"
                    alt="Travile"
                  />
                  Free Wifi
                </Link>
                <Link className="btn btn-border-1" href="#">
                  {" "}
                  <img
                    className="light-mode"
                    src="/assets/imgs/page/room/hairdryer.svg"
                    alt="Travile"
                  />
                  <img
                    className="dark-mode"
                    src="/assets/imgs/page/room/hairdryer-w.svg"
                    alt="Travile"
                  />
                  Air Dryer
                </Link>
                <Link className="btn btn-border-1" href="#">
                  {" "}
                  <img
                    className="light-mode"
                    src="/assets/imgs/page/room/air-conditioner.svg"
                    alt="Travile"
                  />
                  <img
                    className="dark-mode"
                    src="/assets/imgs/page/room/air-conditioner-w.svg"
                    alt="Travile"
                  />
                  Air Condition
                </Link>
                <Link className="btn btn-border-1" href="#">
                  {" "}
                  <img
                    className="light-mode"
                    src="/assets/imgs/page/room/loundry.svg"
                    alt="Travile"
                  />
                  <img
                    className="dark-mode"
                    src="/assets/imgs/page/room/loundry-w.svg"
                    alt="Travile"
                  />
                  Loundry Service
                </Link>
                <Link className="btn btn-border-1" href="#">
                  {" "}
                  <img
                    className="light-mode"
                    src="/assets/imgs/page/room/bed.svg"
                    alt="Travile"
                  />
                  <img
                    className="dark-mode"
                    src="/assets/imgs/page/room/bed-w.svg"
                    alt="Travile"
                  />
                  King Size Bed
                </Link>
                <Link className="btn btn-border-1" href="#">
                  {" "}
                  <img
                    className="light-mode"
                    src="/assets/imgs/page/room/food.svg"
                    alt="Travile"
                  />
                  <img
                    className="dark-mode"
                    src="/assets/imgs/page/room/food-w.svg"
                    alt="Travile"
                  />
                  Front desk
                </Link>
                <Link className="btn btn-border-1" href="#">
                  {" "}
                  <img
                    className="light-mode"
                    src="/assets/imgs/page/room/living.svg"
                    alt="Travile"
                  />
                  <img
                    className="dark-mode"
                    src="/assets/imgs/page/room/living-w.svg"
                    alt="Travile"
                  />
                  Living Area
                </Link>
                <Link className="btn btn-border-1" href="#">
                  {" "}
                  <img
                    className="light-mode"
                    src="/assets/imgs/page/room/living.svg"
                    alt="Travile"
                  />
                  <img
                    className="dark-mode"
                    src="/assets/imgs/page/room/living-w.svg"
                    alt="Travile"
                  />
                  Living Area
                </Link>
              </div>
            </div>
          </section>
          <section className="box-section box-content-tour-detail box-content-room-detail background-body">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="tour-header">
                    <div className="tour-rate">
                      <div className="rate-element">
                        <span className="rating">
                          4.96{" "}
                          <span className="text-sm-medium neutral-500">
                            (672 reviews)
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="tour-title-main">
                      <h4 className="neutral-1000">
                        Tuscany | Farmhouse with pool and restaurant
                      </h4>
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
                          Las Vegas, USA
                        </p>
                        <Link
                          className="text-md-medium neutral-1000 mr-30"
                          href="#"
                        >
                          Show on map
                        </Link>
                      </div>
                      <div className="tour-meta-right">
                        {" "}
                        <Link className="btn btn-share" href="#">
                          <svg
                            width={16}
                            height={18}
                            viewBox="0 0 16 18"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M13 11.5332C12.012 11.5332 11.1413 12.0193 10.5944 12.7584L5.86633 10.3374C5.94483 10.0698 6 9.79249 6 9.49989C6 9.10302 5.91863 8.72572 5.77807 8.37869L10.7262 5.40109C11.2769 6.04735 12.0863 6.46655 13 6.46655C14.6543 6.46655 16 5.12085 16 3.46655C16 1.81225 14.6543 0.466553 13 0.466553C11.3457 0.466553 10 1.81225 10 3.46655C10 3.84779 10.0785 4.20942 10.2087 4.54515L5.24583 7.53149C4.69563 6.90442 3.8979 6.49989 3 6.49989C1.3457 6.49989 0 7.84559 0 9.49989C0 11.1542 1.3457 12.4999 3 12.4999C4.00433 12.4999 4.8897 11.9996 5.4345 11.2397L10.147 13.6529C10.0602 13.9331 10 14.2249 10 14.5332C10 16.1875 11.3457 17.5332 13 17.5332C14.6543 17.5332 16 16.1875 16 14.5332C16 12.8789 14.6543 11.5332 13 11.5332Z" />
                          </svg>
                          Share
                        </Link>
                        <Link className="btn btn-wishlish" href="#">
                          <svg
                            width={20}
                            height={18}
                            viewBox="0 0 20 18"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M2.2222 2.3638C4.34203 0.243977 7.65342 0.0419426 10.0004 1.7577C12.3473 0.0419426 15.6587 0.243977 17.7786 2.3638C20.1217 4.70695 20.1217 8.50594 17.7786 10.8491L12.1217 16.5059C10.9501 17.6775 9.05063 17.6775 7.87906 16.5059L2.2222 10.8491C-0.120943 8.50594 -0.120943 4.70695 2.2222 2.3638Z"
                            />
                          </svg>
                          Wishlish
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="box-collapse-expand">
                    <div className="group-collapse-expand">
                      <button
                        className={
                          isAccordion == 1
                            ? "btn btn-collapse collapsed"
                            : "btn btn-collapse"
                        }
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOverview"
                        aria-expanded="false"
                        aria-controls="collapseOverview"
                        onClick={() => handleAccordion(1)}
                      >
                        <h6>Overview</h6>
                        <svg
                          width={12}
                          height={7}
                          viewBox="0 0 12 7"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L6 6L11 1"
                            stroke=""
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </button>
                      <div
                        className={
                          isAccordion == 1 ? "collapse" : "collapse show"
                        }
                        id="collapseOverview"
                      >
                        <div className="cards card-body">
                          <p>
                            Elevate your Las Vegas experience to new heights
                            with a journey aboard The High Roller at The LINQ.
                            As the tallest observation wheel in the world,
                            standing at an impressive 550 feet tall, The High
                            Roller offers a bird's-eye perspective of the iconic
                            Las Vegas Strip and its surrounding desert
                            landscape. From the moment you step into one of the
                            spacious cabins, you'll be transported on a
                            mesmerizing adventure, where every turn offers a new
                            and breathtaking vista of the vibrant city below.
                          </p>
                          <p>
                            Whether you're a first-time visitor or a seasoned
                            Las Vegas aficionado, The High Roller promises an
                            unparalleled experience that will leave you in awe.
                            With its climate-controlled cabins and immersive
                            audio commentary, this attraction provides a unique
                            opportunity to see Las Vegas from a whole new
                            perspective, while learning about its rich history
                            and famous landmarks along the way.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="group-collapse-expand">
                      <button
                        className={
                          isAccordion == 2
                            ? "btn btn-collapse collapsed"
                            : "btn btn-collapse"
                        }
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseHighlight"
                        aria-expanded="false"
                        aria-controls="collapseHighlight"
                        onClick={() => handleAccordion(2)}
                      >
                        <h6>What this place offers</h6>
                        <svg
                          width={12}
                          height={7}
                          viewBox="0 0 12 7"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L6 6L11 1"
                            stroke=""
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </button>
                      <div
                        className={
                          isAccordion == 1 ? "collapse" : "collapse show"
                        }
                        id="collapseHighlight"
                      >
                        <div className="cards card-body">
                          <div className="row">
                            <div className="col-lg-6">
                              <p className="text-md-bold">Included:</p>
                              <ul>
                                <li>Terrace/ Balcony with lounge chairs</li>
                                <li>Air conditioner</li>
                                <li>Rain shower</li>
                                <li>Hand-carved granite bathtub</li>
                                <li>Coffee and Tea making facilities</li>
                                <li>Complimentary WiFi connection</li>
                                <li>Safety box</li>
                                <li>Minibar</li>
                              </ul>
                            </div>
                            <div className="col-lg-6">
                              <p className="text-md-bold">Excluded:</p>
                              <ul>
                                <li>Work desk</li>
                                <li>
                                  Flat screen TV with international channel
                                  selection
                                </li>
                                <li>Deluxe custom-made bathroom amenities</li>
                                <li>Non-smoking</li>
                                <li>Seating area</li>
                                <li>24-hour security</li>
                                <li>Wood or granite flooring</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="group-collapse-expand">
                      <button
                        className={
                          isAccordion == 3
                            ? "btn btn-collapse collapsed"
                            : "btn btn-collapse"
                        }
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseMap"
                        aria-expanded="false"
                        aria-controls="collapseMap"
                        onClick={() => handleAccordion(3)}
                      >
                        <h6>Tour Map</h6>
                        <svg
                          width={12}
                          height={7}
                          viewBox="0 0 12 7"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L6 6L11 1"
                            stroke=""
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </button>
                      <div
                        className={
                          isAccordion == 1 ? "collapse" : "collapse show"
                        }
                        id="collapseMap"
                      >
                        <div className="cards card-body">
                          <div className="pb-35">
                            <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d85639.97343647551!2d1.8298143252444794!3d47.873502871808036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e4e4d49df386e3%3A0x9eb97de479c38029!2zT3Jsw6lhbnMsIFBow6Fw!5e0!3m2!1svi!2s!4v1711200672635!5m2!1svi!2s"
                              width="100%"
                              height={290}
                              style={{ border: 0 }}
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
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
                    <BookingForm />
                  </div>
                  <div className="sidebar-left border-1 background-3">
                    <h6 className="text-xl-bold neutral-1000">
                      Agent Information
                    </h6>
                    <div className="box-sidebar-content">
                      <div className="box-agent-support">
                        <div className="card-author">
                          <div className="card-author-image">
                            {" "}
                            <img
                              src="/assets/imgs/page/property/author.png"
                              alt="Travila"
                            />
                          </div>
                          <div className="card-author-info">
                            <p className="text-lg-bold neutral-1000">
                              Emily Rose
                            </p>
                            <p className="text-sm-medium neutral-500">
                              Las Vegas, USA{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="box-info-contact">
                        <p className="text-md-medium mobile-phone neutral-1000">
                          Mobile: 1-222-333-4444
                        </p>
                        <p className="text-md-medium email neutral-1000">
                          Email: emily-rose@gmail.com
                        </p>
                        <p className="text-md-medium whatsapp neutral-1000">
                          WhatsApp: 1-222-333-4444
                        </p>
                        <p className="text-md-medium fax neutral-1000">
                          Fax: 1-222-333-4444
                        </p>
                      </div>
                      <div className="box-link-bottom">
                        {" "}
                        <Link className="link-black" href="#">
                          View My Listings
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 15L15 8L8 1M15 8L1 8"
                              stroke=""
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}
