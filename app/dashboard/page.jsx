"use client";

import Layout from "@/components/layout/Layout";
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import Link from "next/link";
import "./style.css";
import { postData } from "@/services/NetworkAdapter";
import FlightBookingList from "./FlightBookingList.jsx";
import AmendmentList from "./AmendmentList.jsx";
import FlightReBookingList from "./FlightReBookingList.jsx";
import HotelBookingList from "./HotelBookingList.jsx";
import { checkTokenExpiry } from "@/services/Utils";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setloading] = useState(false);
  const [userData, setUserData] = useState();
  const [userBookingData, setUserBookingData] = useState();
  const [userHotelBookingData, setUserHotelBookingData] = useState();
  const [userAmendmentData, setUseramendmentData] = useState();
  const [userReBookingData, setReUserBookingData] = useState();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("authToken");

    // Redirect the user to the login page
    window.location.href = "/login"; // Redirect to login page or public page
  };

  useEffect(() => {
    const tokenValid = checkTokenExpiry();

    console.log("tokenValid ==> ", tokenValid);

    if (!tokenValid) {
      localStorage.removeItem("authToken");
      router.push("/login");
    } else {
      // setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["profile", "login", "coTravellers", "bookings"];

      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveTab(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setloading(true);

        const reqParams = {
          phone: "",
          e_mail: "",
        };

        const result = await postData(
          "/travelogy/flight/fetch-user",
          reqParams,
          { Authorization: `Bearer ${token}` }
        );

        setUserData(result);
        setloading(false);
      } catch (error) {
        setloading(false);
      }
    };
    fetchUserData();

    const fetchflightBookings = async () => {
      try {
        setloading(true);

        const reqParams = {
          phone: "",
        };

        const result = await postData(
          "/travelogy/flight/fetech-bookings",
          reqParams,
          { Authorization: `Bearer ${token}` }
        );
        setUserBookingData(result);
        setloading(false);
      } catch (error) {
        setloading(false);
      }
    };
    fetchflightBookings();

    const fetchAmendmentId = async () => {
      try {
        setloading(true);

        const reqParams = {
          phone: "",
        };

        const result = await postData(
          "/travelogy/flight/fetch-amendment",
          reqParams,
          { Authorization: `Bearer ${token}` }
        );
        setUseramendmentData(result);
        setloading(false);
      } catch (error) {
        setloading(false);
      }
    };
    fetchAmendmentId();

    const fetchreflightBookings = async () => {
      try {
        setloading(true);

        const reqParams = {
          phone: "",
        };

        const result = await postData(
          "/travelogy/flight/fetech-re-bookings",
          reqParams,
          { Authorization: `Bearer ${token}` }
        );
        setReUserBookingData(result);
        setloading(false);
      } catch (error) {
        console.log("error ==> ", error);
        setloading(false);
      }
    };
    fetchreflightBookings();

    const fetchHotelBookings = async () => {
      try {
        setloading(true);

        const reqParams = {
          phone: "",
        };

        const result = await postData(
          "/travelogy/hotel/fetch-bookings",
          reqParams,
          { Authorization: `Bearer ${token}` }
        );
        setUserHotelBookingData(result);
        setloading(false);
      } catch (error) {
        setloading(false);
      }
    };
    fetchHotelBookings();
  }, []);

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          <section>
            <div className="dashboard-container">

              {/* Dashboard Header */}
              <div className="dashboard-header">
                <div className="header-content">
                  <h1 className="dashboard-title">Dashboard</h1>
                  <p className="welcome-message">
                    Welcome back{userData?.user?.name ? `, ${userData.user.name}` : ''}! Here's an overview of your bookings.
                  </p>
                </div>
                {/* <div className="header-actions">
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div> */}
              </div>

              {/* Loading Overlay */}
              {loading && (
                <div className="loading-overlay">
                  <div className="loading-spinner"></div>
                  <p>Loading your dashboard...</p>
                </div>
              )}

              {/* Main content */}
              <div className="dashboard-content">

                {/* bookings */}
              <div className="bookings-card" id="bookings">
                <div className="card-header">
                  <div className="card-title-section">
                    <div className="card-icon">📋</div>
                    {/* <h4 className="card-title">
                      Your Bookings
                    </h4> */}
                  </div>
                </div>

                <div className="card-content" style={{ minWidth: '320px', overflowX: 'auto', overflowY: 'auto', height:'68vh', background:'white' }}>
                  <Tabs
                    defaultActiveKey="1"
                    className="enhanced-tabs"
                    items={[
                      {
                        label: (
                          <span className="tab-label">
                            ✈️ Flight Booking
                          </span>
                        ),
                        key: "1",
                        children: (
                          <FlightBookingList
                            bookings={userBookingData?.bookings}
                          />
                        ),
                      },
                      {
                        label: (
                          <span className="tab-label">
                            ✏️ Flight Amendments
                          </span>
                        ),
                        key: "2",
                        children: (
                          <AmendmentList
                            amendments={userAmendmentData?.amendments}
                          />
                        ),
                      },
                      {
                        label: (
                          <span className="tab-label">
                            🔄 Re - Flight Booking
                          </span>
                        ),
                        key: "3",
                        children: (
                          <FlightReBookingList
                            bookings={userReBookingData?.reBookings}
                          />
                        ),
                      },
                      {
                        label: (
                          <span className="tab-label">
                            🏨 Hotel Booking
                          </span>
                        ),
                        key: "4",
                        children: (
                          <HotelBookingList
                            bookings={userHotelBookingData?.bookings}
                          />
                        ),
                      },
                    ]}
                  />
                </div>
              </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};
export default Page;
