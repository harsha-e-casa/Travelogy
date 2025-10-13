"use client";
import Link from "next/link";
import "./home.css";

export default function HomeContent() {
    return (
        <>
            <section className="section-box box-video-banner">
                <div className="video-container">
                    <video autoPlay muted loop className="banner-video">
                        <source src="/assets/home/home_banner.mp4" type="video/mp4" />
                    </video>
                    <div className="video-overlay">
                        <div className="container">
                            <div className="video-content text-center">
                                <h1 className="video-title">Discover Your Next Adventure</h1>
                                <p className="video-subtitle">Experience the world like never before</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-box box-home-intro background-body">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-30">
                            <span className="btn btn-gray mb-5">
                                <img className="mr-10" src="/assets/imgs/page/homepage9/real.svg" alt="Travelogy" />
                                Welcome to Travelogy
                            </span>
                            <h1 className="neutral-1000 mt-15 mb-15">
                                Your Gateway to <span style={{color: '#e5a910ff'}}>Amazing Travel</span> Experiences
                            </h1>
                            <p className="text-xl-medium neutral-500">
                                Discover the world with our comprehensive travel booking platform. From flights to hotels, we make your journey seamless and memorable.
                            </p>
                            <div className="box-button-home mt-35">
                                <Link className="btn btn-black-lg mr-20" href="/flights">
                                    Book Flights
                                    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 15L15 8L8 1M15 8L1 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    </svg>
                                </Link>
                                <Link className="btn btn-link-medium" href="/hotels">
                                    Explore Hotels
                                    <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 15L15 8L8 1M15 8L1 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-30">
                            <div className="box-image-home">
                                <img src="/assets/imgs/page/pages/banner.png" alt="Travelogy" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="section-box box-home-services background-body">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-30">
                            <h2 className="neutral-1000 mb-25">Our Travel Services</h2>
                            <p className="text-xl-medium neutral-500 mb-35">
                                From flights to accommodations, we provide comprehensive travel solutions for all your needs.
                            </p>
                            <div className="list-services">
                                <div className="item-service">
                                    <div className="service-icon">
                                        <img src="/assets/imgs/airplane_1604953.svg" alt="Flights" />
                                    </div>
                                    <div className="service-info">
                                        <h6 className="neutral-1000">Flight Booking</h6>
                                        <p className="text-sm-medium neutral-500">
                                            Book domestic and international flights at competitive prices
                                        </p>
                                    </div>
                                </div>
                                <div className="item-service">
                                    <div className="service-icon">
                                        <img src="/assets/imgs/template/icons/hotel.svg" alt="Hotels" />
                                    </div>
                                    <div className="service-info">
                                        <h6 className="neutral-1000">Hotel Reservations</h6>
                                        <p className="text-sm-medium neutral-500">
                                            Find and book the perfect accommodation for your stay
                                        </p>
                                    </div>
                                </div>
                                <div className="item-service">
                                    <div className="service-icon">
                                        <img src="/assets/imgs/template/icons/tour.svg" alt="Tours" />
                                    </div>
                                    <div className="service-info">
                                        <h6 className="neutral-1000">Tour Packages</h6>
                                        <p className="text-sm-medium neutral-500">
                                            Explore curated tour packages for memorable experiences
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-30">
                            <div className="box-image-services">
                                <img src="/assets/imgs/page/pages/banner.png" alt="Travelogy Services" />
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    );
}