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
            <div className=" bg-gray-100 p-6 md:p-12 border border-black maindiv flex flex-col lg:flex-row lg:gap-6">

              {/* Main content */}
              <div className="flex-1 space-y-6 ml-20">

                {/* bookings */}
                <div className="bg-white rounded-2xl shadow-md" id="bookings">
                  <div className="p-4">
                    <div className="flex flex-row justify-between items-center">
                      <h4 className="font-bold text-neutral-900 booking-text headings">
                        Your Bookings
                      </h4>
                    </div>

                    <div></div>
                    <Tabs
                      defaultActiveKey="1"
                      className="" // Optional: reduce padding if needed
                      items={[
                        {
                          label: (
                            <span className="text-md text-neutral-500 booking-tab">
                              Flight Booking
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
                            <span className="text-md text-neutral-500 booking-tab">
                              Flight Amendments
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
                            <span className="text-md text-neutral-500 booking-tab">
                              Re - Flight Booking
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
                            <span className="text-md text-neutral-500 booking-tab">
                              Hotel Booking
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
