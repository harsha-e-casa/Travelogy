"use client";

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { postData } from "@/services/NetworkAdapter";
import { message, Select, ConfigProvider } from "antd";
import "../../../public/assets/css/holidayStyle.css";


export default function Holidaymood() {
  const searchParams = useSearchParams();
  const mood = searchParams.get("mood") || "romantic";
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    mood: mood
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, mood: mood }));
  }, [mood]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      // Allow only numbers
      const numericValue = value.replace(/\D/g, "");
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.mood) {
      message.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response: any = await postData("travelogy/common/holiday-mood", {
        action: "holidayMoodSave",
        requestData: formData
      });

      if (response.success) {
        setIsSubmitted(true);
        // Clear form
        setFormData({ name: "", phone: "", mood: mood });
      } else {
        message.error(response.message || "Failed to submit request.");
      }
    } catch (error) {
      console.error("Error submitting callback request:", error);
      message.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const mood_destinations = [
    "Bali",
    "Dubai",
    "Europe",
    "Singapore",
    "Australia",
    "Vietnam",
    "Philippines",
    "Thailand",
    "Switzerland",
    "Sri Lanka",
  ];

  const moodData = {
    romantic: {
      title: "Romantic",
      bannerImage:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      mood_destinations: [
        "Maldives",
        "Bali",
        "Paris",
        "Santorini",
        "Venice",
        "Seychelles",
        "Mauritius",
        "Tuscany",
        "Fiji",
        "Tahiti",
      ],
      packages: [
        {
          image:
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Romantic Dinner Setup",
          location: "Bali",
        },
        {
          image:
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Couple's Paradise",
          location: "Maldives",
        },
        {
          image:
            "https://images.unsplash.com/photo-1586500036706-41963de24d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Heart Shaped Gate",
          location: "Bali",
        },
        {
          image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Tropical Romance",
          location: "Philippines",
        },
      ],
    },
    adventure: {
      title: "Adventure",
      bannerImage:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      mood_destinations: [
        "Nepal",
        "New Zealand",
        "Costa Rica",
        "Switzerland",
        "Norway",
        "Iceland",
        "Peru",
        "Chile",
        "Canada",
        "Patagonia",
      ],
      packages: [
        {
          image:
            "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Mountain Climbing",
          location: "Nepal",
        },
        {
          image:
            "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "River Rafting",
          location: "Costa Rica",
        },
        {
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Hiking Trails",
          location: "Switzerland",
        },
        {
          image:
            "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Rock Climbing",
          location: "Thailand",
        },
      ],
    },
    beaches: {
      title: "Beaches",
      bannerImage:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      mood_destinations: [
        "Maldives",
        "Bali",
        "Hawaii",
        "Seychelles",
        "Mauritius",
        "Barbados",
        "Fiji",
        "Thailand",
        "Philippines",
        "Greece",
      ],
      packages: [
        {
          image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Tropical Paradise",
          location: "Maldives",
        },
        {
          image:
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Beach Resort",
          location: "Bali",
        },
        {
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Sunset Beach",
          location: "Philippines",
        },
        {
          image:
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Crystal Waters",
          location: "Thailand",
        },
      ],
    },
    wildlife: {
      title: "Wildlife",
      bannerImage:
        "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      mood_destinations: [
        "Kenya",
        "Tanzania",
        "South Africa",
        "Botswana",
        "Costa Rica",
        "Madagascar",
        "India",
        "Sri Lanka",
        "Australia",
        "Brazil",
      ],
      packages: [
        {
          image:
            "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Safari Adventure",
          location: "Kenya",
        },
        {
          image:
            "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Jungle Trek",
          location: "Costa Rica",
        },
        {
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Bird Watching",
          location: "Australia",
        },
        {
          image:
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Marine Life",
          location: "Maldives",
        },
      ],
    },
    luxury: {
      title: "Luxury",
      bannerImage:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      mood_destinations: [
        "Dubai",
        "Monaco",
        "Switzerland",
        "Maldives",
        "Singapore",
        "Japan",
        "France",
        "Italy",
        "Qatar",
        "Bahrain",
      ],
      packages: [
        {
          image:
            "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "5-Star Resort",
          location: "Dubai",
        },
        {
          image:
            "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Private Villa",
          location: "Bali",
        },
        {
          image:
            "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Luxury Cruise",
          location: "Mediterranean",
        },
        {
          image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Spa Retreat",
          location: "Thailand",
        },
      ],
    },
    nightlife: {
      title: "NightLife",
      bannerImage:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      mood_destinations: [
        "Dubai",
        "Monaco",
        "Switzerland",
        "Maldives",
        "Singapore",
        "Japan",
        "France",
        "Italy",
      ],
      packages: [
        {
          image:
            "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "5-Star Resort",
          location: "Dubai",
        },
        {
          image:
            "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Private Villa",
          location: "Bali",
        },
        {
          image:
            "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Luxury Cruise",
          location: "Mediterranean",
        },
        {
          image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          title: "Spa Retreat",
          location: "Thailand",
        },
      ],
    },
  };

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
        "/assets/imgs/holiday/chennai.jpg",
      title: "Chennai ",
      description: "A coastal city known for its rich culture, temples, and Marina Beach.",
    },
    {
      image: "/assets/imgs/holiday/goa.jpg",
      title: "Goa ",
      description:
        "India’s party paradise known for its beaches, nightlife, and Portuguese heritage.",
    },
    {
      image:
        "/assets/imgs/holiday/dubai.jpg",
      title: "Dubai",
      description: "A global hub of luxury, innovation, and skyscrapers like the Burj Khalifa.",
    },
    {
      image: "/assets/imgs/holiday/mumbai.jpg",
      title: "Mumbai",
      description: "The financial capital of India, famous for Bollywood and the Gateway of India.",
    },
    {
      image: "/assets/imgs/holiday/hyderabad.jpg",
      title: "Hyderabad ",
      description: "The city of pearls, known for its tech industry and delicious biryani.",
    },
    {
      image:
        "/assets/imgs/holiday/delhi.jpg",
      title: "Delhi ",
      description:
        "India’s capital, blending ancient heritage with modern vibrance.",
    },
    {
      image:
        "/assets/imgs/holiday/pune.jpg",
      title: "Pune ",
      description:
        "A youthful city known for education, IT, and pleasant weather.",
    },
    {
      image:
        "/assets/imgs/holiday/kolkatha.jpg",
      title: "Kolkata ",
      description: "The cultural capital of India, famed for art, literature, and sweets.",
    },
    {
      image:
        "/assets/imgs/holiday/banglore.jpg",
      title: "Bangalore ",
      description: "India’s Silicon Valley, thriving with startups and pleasant climate.",
    },
    {
      image: "/assets/imgs/holiday/malaysia.jpg",
      title: "Malaysia ",
      description: "A tropical nation known for its diverse culture and modern skyline.",
    },
    {
      image:
        "/assets/imgs/holiday/paris.jpg",
      title: "Paris ",
      description:
        "The city of love, art, and the iconic Eiffel Tower.",
    },
    {
      image:
        "/assets/imgs/holiday/rajasthan.jpg",
      title: "Rajasthan ",
      description:
        "The land of kings, showcasing grand forts, deserts, and royal heritage.",
    },
  ];

  const currentMood =
    moodData[mood as keyof typeof moodData] || moodData.romantic;

  return (
    <Layout headerStyle={1} footerStyle={1}>
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${currentMood.bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.4)",
          }}
        ></div>

        {/* Request call back button - top right */}
        <button
          onClick={() => setShowModal(true)}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "#373742ff",
            color: "orange",
            padding: "12px 24px",
            borderRadius: "20px",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            zIndex: 3,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="orange"
            viewBox="0 0 24 24"
          >
            <path d="M6.62 10.79a15.464 15.464 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.58.57 1 1 0 011 1v3.48a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.58 1 1 0 01-.24 1.01l-2.21 2.2z" />
          </svg>{" "}
          Request a call back
        </button>

        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <h1
            style={{
              color: "white",
              fontSize: "4rem",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            {currentMood.title}
          </h1>
        </div>
      </section>

      {/* Top Picks Section */}
      <section className="container mt-5 mb-5">
        <h2 className="mb-4" style={{ fontSize: "2rem", fontWeight: "bold" }}>
          Top Picks
        </h2>

        {/* Destination Tags */}
        <div
          className="mb-4"
          style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
        >
          {currentMood.mood_destinations.map((dest, index) => (
            <span
              key={index}
              style={{
                background: index === 0 ? "#f3f4f6" : "transparent",
                color: index === 0 ? "#000" : "#666",
                padding: "8px 16px",
                borderRadius: "20px",
                border: "1px solid #e5e7eb",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              {dest}
            </span>
          ))}
        </div>

        {/* Package Cards */}
        <div className="row">
          {currentMood.packages.map((pkg, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div
                style={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
                onClick={() => setShowModal(true)}
              >
                <div
                  style={{
                    backgroundImage: `url(${pkg.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "200px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "10px",
                      color: "white",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
                    }}
                  >
                    <div style={{ fontSize: "14px", fontWeight: "500" }}>
                      {pkg.title}
                    </div>
                    <div style={{ fontSize: "12px", opacity: 0.9 }}>
                      {pkg.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <h2 className="container neutral-1000 mt-20">Destination Dreams</h2>
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
            <h2 className="text-4xl font-bold tracking-wide">
              Best Destinations
            </h2>
            <div className="mt-12 mx-auto grid gap-6 sm:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:max-w-none">
              {destinations.map((dest, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-lg aft_hvr w-full gap-4"
                >
                  <div className="flex-shrink-0 rounded-full overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.title}
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xl font-semibold text-gray-900 truncate">
                      {dest.title}
                    </p>
                    <p className="text-xs text-gray-900 line-clamp-3">
                      {dest.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal Popup */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              borderRadius: "20px",
              padding: "30px",
              width: "90%",
              maxWidth: "400px",
              border: "1px solid rgba(255,255,255,0.2)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => { setShowModal(false); setIsSubmitted(false); }}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "none",
                border: "none",
                color: "white",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            {/* Modal Content */}
            <div style={{ color: "white" }}>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <h3
                    style={{
                      marginBottom: "10px",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Planning a trip? We are here to help!
                  </h3>
                  <p
                    style={{
                      marginBottom: "30px",
                      fontSize: "14px",
                      opacity: 0.9,
                    }}
                  >
                    Give us your details. We will reach out and help you craft
                    your dream trip
                  </p>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your Name"
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "12px",
                      marginBottom: "30px",
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      borderRadius: "8px",
                      color: "white",
                      fontSize: "14px",
                    }}
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your Phone Number"
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "12px",
                      marginBottom: "20px",
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      borderRadius: "8px",
                      color: "white",
                      fontSize: "14px",
                    }}
                  />
                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          selectorBg: "rgba(255,255,255,0.1)",
                          colorBorder: "rgba(255,255,255,0.3)",
                          colorText: "white",
                          colorTextPlaceholder: "rgba(255,255,255,0.5)",
                          colorIcon: "white",
                          colorTextQuaternary: "white",
                          colorTextTertiary: "white",
                          borderRadius: 8,
                          optionSelectedBg: "rgba(255,255,255,0.2)",
                          optionActiveBg: "rgba(255,255,255,0.1)",
                          optionSelectedColor: "white",
                          colorPrimary: "rgba(255,255,255,0.5)",
                          colorPrimaryHover: "rgba(255,255,255,0.5)",
                        },
                      },
                    }}
                  >
                    <Select
                      value={formData.mood}
                      onChange={(value) => setFormData(prev => ({ ...prev, mood: value }))}
                      disabled={loading}
                      placeholder="Select your mood..."
                      style={{
                        width: "100%",
                        height: "44px",
                        marginBottom: "30px",
                      }}
                      dropdownStyle={{ background: "#333" }}
                    >
                      <Select.Option value="romantic">Romantic</Select.Option>
                      <Select.Option value="adventure">Adventure</Select.Option>
                      <Select.Option value="beaches">Beaches</Select.Option>
                      <Select.Option value="wildlife">Wildlife</Select.Option>
                      <Select.Option value="luxury">Luxury</Select.Option>
                      <Select.Option value="nightlife">Nightlife</Select.Option>
                    </Select>
                  </ConfigProvider>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "12px",
                      background: "#000",
                      color: "orange",
                      border: "none",
                      borderRadius: "25px",
                      fontSize: "16px",
                      cursor: loading ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      opacity: loading ? 0.7 : 1
                    }}
                  >
                    {loading ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="orange"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6.62 10.79a15.464 15.464 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.58.57 1 1 0 011 1v3.48a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.58 1 1 0 01-.24 1.01l-2.21 2.2z" />
                        </svg>
                        Request a call back
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>Thanks!</h3>
                  <p style={{ fontSize: "16px", opacity: 0.9 }}>We will contact you soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )
      }
    </Layout >
  );
}