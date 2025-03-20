"use client";

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import React, { useState } from "react";
// import AnimatedSlider from "./AnimatedSlider";
import MicroallOffersPage from "@/app/microPage/MicroallOffersPage";
import YourJourney from "./TripSlider";

const Slider: React.FC = () => {
  const cardData: string[] = [
    "https://images.ixigo.com/image/upload/why-ixigo/6f088102ee84ca42818880b0e7a53013-qeinq.png",
    "https://images.ixigo.com/image/upload/why-ixigo/a18ed159795638a89940bf7bfbf7a029-buxfd.png",
    "https://images.ixigo.com/image/upload/why-ixigo/5390cf1e5644eced244bb1a8006bd040-syxpz.png",
    "https://images.ixigo.com/image/upload/why-ixigo/adba3b216ecddfadc97baf93119f6f28-fnuzr.png",
  ];
  const locations = [
    {
      city: "London",
      place: "Big Ben",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    },
    {
      city: "Paris",
      place: "Eiffel Tower",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1581010864468-c972b8705439?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      city: "Rome",
      place: "Colosseum",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1096&q=80",
    },
    {
      city: "Pisa",
      place: "Pisa Tower",
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1581473483413-313a5afffb08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=714&q=80",
    },
    {
      city: "New York",
      place: "Statue of Liberty",
      rating: 4.0,
      image:
        "https://images.unsplash.com/photo-1585155967849-91c736589c84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
    },
    {
      city: "Sydney",
      place: "Sydney Opera House",
      rating: 4.0,
      image:
        "https://images.unsplash.com/photo-1527915676329-fd5ec8a12d4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    },
  ];
  const StarIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 inline-block"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
  interface Destination {
    image: string;
    title: string;
    description: string;
  }
  const destinations: Destination[] = [
    {
      image:
        "https://images-cf.ixigo.workers.dev/v2/images_by_id/503b2a83e4b032e338f11b77.jpg?cityName=Jaipur",
      title: "Chennai Flights",
      description: "Chennai Flights Via - Delhi, Mumbai, Coimbatore, Madurai",
    },
    {
      image: "https://promos.makemytrip.com/store/GoaDT.JPG",
      title: "Goa Flights",
      description:
        "Hotels, Budget Hotels, Resorts, Best Hotels, North Goa, Villas",
    },
    {
      image:
        "https://images-cf.ixigo.workers.dev/v2/images_by_id/503b2a92e4b032e338f13fd5.jpg?cityName=Bathinda",
      title: "Goa",
      description: "Mumbai Flights Via - Delhi, Bangalore, Chennai, Ahmedabad",
    },
    {
      image: "http://promos.makemytrip.com/images/50x50-Ooty-23052019.png",
      title: "Goa",
      description: "Hyderabad Flights Via - Chennai, Mumbai, Bangalore, Delhi",
    },
    {
      image: "https://promos.makemytrip.com/store/DelhiDT.JPG",
      title: "Hyderabad Flights",
      description: "Delhi Flights Via - Mumbai, Pune, Bangalore, Chennai",
    },
    {
      image:
        "https://images-cf.ixigo.workers.dev/v2/images_by_id/503b2a83e4b032e338f11b77.jpg?cityName=Jaipur",
      title: "Delhi Flights",
      description:
        "Hotels, Budget Hotels, Resorts, Best Hotels, North Goa, Villas",
    },
    {
      image:
        "https://images-cf.ixigo.workers.dev/v2/images_by_id/503b2a83e4b032e338f11b77.jpg?cityName=Jaipur",
      title: "Pune Flights",
      description:
        "Hotels, Budget Hotels, Resorts, Best Hotels, North Goa, Villas",
    },
    {
      image:
        "https://images-cf.ixigo.workers.dev/v2/images_by_id/503b2a83e4b032e338f11b77.jpg?cityName=Jaipur",
      title: "Kolkata Flights",
      description: "Via - Delhi, Mumbai, Bangalore, Pune",
    },
    {
      image:
        "https://images-cf.ixigo.workers.dev/v2/images_by_id/503b2a83e4b032e338f11b77.jpg?cityName=Jaipur",
      title: "Bangalore Flights",
      description: "Via - Delhi, Pune, Mumbai, Kolkata",
    },
    {
      image: "https://promos.makemytrip.com/store/DelhiDT.JPG",
      title: "Hyderabad Flights",
      description: "Delhi Flights Via - Mumbai, Pune, Bangalore, Chennai",
    },
    {
      image:
        "https://images-cf.ixigo.workers.dev/v2/images_by_id/503b2a83e4b032e338f11b77.jpg?cityName=Jaipur",
      title: "Delhi Flights",
      description:
        "Hotels, Budget Hotels, Resorts, Best Hotels, North Goa, Villas",
    },
    {
      image:
        "https://images-cf.ixigo.workers.dev/v2/images_by_id/503b2a83e4b032e338f11b77.jpg?cityName=Jaipur",
      title: "Pune Flights",
      description:
        "Hotels, Budget Hotels, Resorts, Best Hotels, North Goa, Villas",
    },
  ];
  interface Destinations {
    id: string;
    label: string;
    image?: string;
  }

  const destination: Destinations[] = [
    { id: "cardUno", label: "Thailand" },
    { id: "cardDos", label: "Switzerland" },
    { id: "cardTres", label: "Australia" },
    { id: "cardCuatro", label: "London" },
  ];
  const [selectedCard, setSelectedCard] = useState<string>("cardUno");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const getActiveClass = (id: string) => {
    if (hoveredCard === id) return "active_content";
    if (!hoveredCard && selectedCard === id) return "active_content";
    return "";
  };
  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        {/* <EngineTabs /> */}
        {/* <AnimatedSlider /> */}
        <section className="my-8 pt-40">
          <div className="p-8">
            <h2 className="ml-8 text-xl font-bold text-gray-900 tracking-wide">
              Why Booking Travelogy
            </h2>
            <div className="m-12 grid gap-5 lg:grid-cols-4 lg:max-w-none">
              {cardData.map((url: string, index: number) => (
                <div
                  key={index}
                  className="flex flex-col rounded-xl h-24 shadow-lg overflow-hidden"
                  style={{
                    backgroundImage: `url(${url})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="flex p-1" />
                </div>
              ))}
            </div>
          </div>
        </section>
        <YourJourney />
        <div className="container mt-28">
          <MicroallOffersPage />
        </div>
        <h5
          className="container neutral-1000 wow fadeInUp mt-100"
          style={{ visibility: "visible" }}
        >
          Destination Dreams
        </h5>
        <section className="section__category container mb-30 box-top-category">
          {locations.map((loc, index) => (
            <div className="dgfry_card" key={index}>
              <div className="card__img">
                <img src={loc.image} alt={loc.place || "Travel Destination"} />
                <span>
                  <StarIcon /> {loc.rating}
                </span>
                <div className="card__overlay">
                  <h6>{loc.city}</h6>
                  <p>{loc.place}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
        <section>
          <div className="class_main_slider_de1 container shadow-700 mb-30  box-top-category">
            <div className="main_d2l_section p-8 pt-4">
              <h2 className="text-xl font-bold text-gray-900 tracking-wide">
                Best Selling Destination
              </h2>
              <div className="mt-12 max-w-lg mx-auto grid gap-10 lg:grid-cols-4 lg:max-w-none">
                {destinations.map((dest, index) => (
                  <div
                    key={index}
                    className="flex items-center rounded-lg aft_hvr w-full"
                  >
                    <div className="w-1/3 rounded-full overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.title}
                        className="h-20 w-20 rounded-full object-cover"
                      />
                    </div>
                    <div className="w-2/3 pl-3">
                      <p className="text-xl font-semibold text-gray-900">
                        {dest.title}
                      </p>
                      <p className="text-xs text-gray-900">
                        {dest.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="container mb-30 box-top-category">
          <h5
            className="neutral-1000 wow fadeInUp mb-30"
            style={{ visibility: "visible" }}
          >
            Travel Made Visa-Free
          </h5>
          <div className="general-container">
            {destination.map((dest) => (
              <React.Fragment key={dest.id}>
                <input
                  className="radio"
                  type="radio"
                  name="card"
                  id={dest.id}
                  checked={selectedCard === dest.id}
                  onChange={() => setSelectedCard(dest.id)}
                />
                <label
                  className={`content ${getActiveClass(dest.id)}`}
                  htmlFor={dest.id}
                  onMouseEnter={() => setHoveredCard(dest.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="book_now_offers absolute_b0">
                    <span className="font-bold">{dest.label}</span>
                  </div>
                </label>
              </React.Fragment>
            ))}
          </div>
        </section>
        {/* </main> */}
      </Layout>
    </>
  );
};
export default Slider;
