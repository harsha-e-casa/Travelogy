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
  const [filteredHotelBookings, setFilteredHotelBookings] = useState([]);
  const [hotelStatusFilter, setHotelStatusFilter] = useState("");
  const [hotelAmountFilter, setHotelAmountFilter] = useState("");
  const [hotelFromDate, setHotelFromDate] = useState("");
  const [hotelToDate, setHotelToDate] = useState("");
  const [filteredFlightBookings, setFilteredFlightBookings] = useState([]);
  const [flightStatusFilter, setFlightStatusFilter] = useState("");
  const [flightAmountFilter, setFlightAmountFilter] = useState("");
  const [flightFromDate, setFlightFromDate] = useState("");
  const [flightToDate, setFlightToDate] = useState("");
  const [filteredAmendments, setFilteredAmendments] = useState([]);
  const [amendmentStatusFilter, setAmendmentStatusFilter] = useState("");
  const [amendmentAmountFilter, setAmendmentAmountFilter] = useState("");
  const [amendmentFromDate, setAmendmentFromDate] = useState("");
  const [amendmentToDate, setAmendmentToDate] = useState("");
  const [filteredReBookings, setFilteredReBookings] = useState([]);
  const [reBookingStatusFilter, setReBookingStatusFilter] = useState("");
  const [reBookingAmountFilter, setReBookingAmountFilter] = useState("");
  const [reBookingFromDate, setReBookingFromDate] = useState("");
  const [reBookingToDate, setReBookingToDate] = useState("");



    // Helper function to count bookings grouped by status
  const countByStatus = (items, key = "status") => {
    if (!items || !Array.isArray(items)) return {};
    return items.reduce((acc, item) => {
      const status = item[key] || "UNKNOWN";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
  };

  // bookingCounts holds counts grouped by status for each booking type
  const bookingCounts = {
    flight: countByStatus(filteredFlightBookings),
    amendments: countByStatus(filteredAmendments, "amendment_status"),
    reBookings: countByStatus(filteredReBookings),
    hotel: countByStatus(filteredHotelBookings),
  };

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


  const hotelStatusOptions = Array.from(
    new Set(userHotelBookingData?.bookings?.map((b) => b.status).filter((v) => !!v)) || []
  );

  const flightStatusOptions = Array.from(
    new Set(userBookingData?.bookings?.map((b) => b.status).filter((v) => !!v)) || []
  );

  const amendmentStatusOptions = Array.from(
    new Set(userAmendmentData?.amendments?.map((b) => b.amendment_status).filter((v) => !!v)) || []
  );

  const reBookingStatusOptions = Array.from(
    new Set(userReBookingData?.reBookings?.map((b) => b.status).filter((v) => !!v)) || []
  );

  useEffect(() => {
    if (!userHotelBookingData?.bookings) {
      setFilteredHotelBookings([]);
      return;
    }
    const filtered = userHotelBookingData.bookings.filter((b) => {
      const bookingDate = b.booking_time ? b.booking_time.slice(0, 10) : "";
      let matches = true;

      // Amount filter
      if (hotelAmountFilter.trim() !== "") {
        const val = hotelAmountFilter.trim();
        if (val.includes("-")) {
          const [min, max] = val.split("-").map((s) => s.trim());
          const amt = Number(b.amount);
          if (!isNaN(amt)) {
            matches = matches && amt >= Number(min) && amt <= Number(max);
          } else {
            matches = false;
          }
        } else {
          matches =
            matches &&
            b.amount &&
            b.amount.toString().toLowerCase().includes(val.toLowerCase());
        }
      }

      if (hotelStatusFilter.trim() !== "") {
        matches =
          matches &&
          b.status &&
          b.status.toString().toLowerCase().includes(hotelStatusFilter.toLowerCase());
      }

      // Date range
      if (hotelFromDate) {
        matches = matches && bookingDate >= hotelFromDate;
      }
      if (hotelToDate) {
        matches = matches && bookingDate <= hotelToDate;
      }

      return matches;
    });
    setFilteredHotelBookings(filtered);
  }, [userHotelBookingData, hotelStatusFilter, hotelAmountFilter, hotelFromDate, hotelToDate]);

  useEffect(() => {
    if (!userBookingData?.bookings) {
      setFilteredFlightBookings([]);
      return;
    }
    const filtered = userBookingData.bookings.filter((b) => {
      const bookingDate = b.booking_time ? b.booking_time.slice(0, 10) : "";
      let matches = true;

      // Amount filter
      if (flightAmountFilter.trim() !== "") {
        const val = flightAmountFilter.trim();
        if (val.includes("-")) {
          const [min, max] = val.split("-").map((s) => s.trim());
          const amt = Number(b.amount);
          if (!isNaN(amt)) {
            matches = matches && amt >= Number(min) && amt <= Number(max);
          } else {
            matches = false;
          }
        } else {
          matches =
            matches &&
            b.amount &&
            b.amount.toString().toLowerCase().includes(val.toLowerCase());
        }
      }

      if (flightStatusFilter.trim() !== "") {
        matches =
          matches &&
          b.status &&
          b.status.toString().toLowerCase().includes(flightStatusFilter.toLowerCase());
      }

      // Date range
      if (flightFromDate) {
        matches = matches && bookingDate >= flightFromDate;
      }
      if (flightToDate) {
        matches = matches && bookingDate <= flightToDate;
      }

      return matches;
    });
    setFilteredFlightBookings(filtered);
  }, [userBookingData, flightStatusFilter, flightAmountFilter, flightFromDate, flightToDate]);

  useEffect(() => {
    if (!userAmendmentData?.amendments) {
      setFilteredAmendments([]);
      return;
    }
    const filtered = userAmendmentData.amendments.filter((b) => {
      const amendmentDate = b.time ? b.time.slice(0, 10) : "";
      let matches = true;

      // Amount filter
      if (amendmentAmountFilter.trim() !== "") {
        const val = amendmentAmountFilter.trim();
        if (val.includes("-")) {
          const [min, max] = val.split("-").map((s) => s.trim());
          const amt = Number(b.refundable_amount);
          if (!isNaN(amt)) {
            matches = matches && amt >= Number(min) && amt <= Number(max);
          } else {
            matches = false;
          }
        } else {
          matches =
            matches &&
            b.refundable_amount &&
            b.refundable_amount.toString().toLowerCase().includes(val.toLowerCase());
        }
      }

      if (amendmentStatusFilter.trim() !== "") {
        matches =
          matches &&
          b.amendment_status &&
          b.amendment_status.toString().toLowerCase().includes(amendmentStatusFilter.toLowerCase());
      }

      // Date range
      if (amendmentFromDate) {
        matches = matches && amendmentDate >= amendmentFromDate;
      }
      if (amendmentToDate) {
        matches = matches && amendmentDate <= amendmentToDate;
      }

      return matches;
    });
    setFilteredAmendments(filtered);
  }, [userAmendmentData, amendmentStatusFilter, amendmentAmountFilter, amendmentFromDate, amendmentToDate]);

  useEffect(() => {
    if (!userReBookingData?.reBookings) {
      setFilteredReBookings([]);
      return;
    }
    const filtered = userReBookingData.reBookings.filter((b) => {
      const bookingDate = b.booking_time ? b.booking_time.slice(0, 10) : "";
      let matches = true;

      // Amount filter
      if (reBookingAmountFilter.trim() !== "") {
        const val = reBookingAmountFilter.trim();
        if (val.includes("-")) {
          const [min, max] = val.split("-").map((s) => s.trim());
          const amt = Number(b.amount);
          if (!isNaN(amt)) {
            matches = matches && amt >= Number(min) && amt <= Number(max);
          } else {
            matches = false;
          }
        } else {
          matches =
            matches &&
            b.amount &&
            b.amount.toString().toLowerCase().includes(val.toLowerCase());
        }
      }

      if (reBookingStatusFilter.trim() !== "") {
        matches =
          matches &&
          b.status &&
          b.status.toString().toLowerCase().includes(reBookingStatusFilter.toLowerCase());
      }

      // Date range
      if (reBookingFromDate) {
        matches = matches && bookingDate >= reBookingFromDate;
      }
      if (reBookingToDate) {
        matches = matches && bookingDate <= reBookingToDate;
      }

      return matches;
    });
    setFilteredReBookings(filtered);
  }, [userReBookingData, reBookingStatusFilter, reBookingAmountFilter, reBookingFromDate, reBookingToDate]);



  // Helper to get total count from status counts
  const getTotalCount = (statusCounts) => {
    if (!statusCounts || Object.keys(statusCounts).length === 0) return 0;
    return Object.values(statusCounts).reduce((total, count) => total + count, 0);
  };

  return (
    <>
      <Layout headerStyle={1} footerStyle={7}>
        <main className="main">
          <section>
            <div className="dashboard-container">

              {/* Dashboard Header */}
              <div className="dashboard-header">
                <div className="header-content">
                  <div className="header-left">
                    <h1 className="dashboard-title">Dashboard</h1>
                    <p className="welcome-message" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                      Welcome back{userData?.user?.name ? `, ${userData.user.name}` : ''}! Here's an overview of your bookings.
                    </p>
                  </div>
                  <div className="header-right">
                    <div className="status-cards cards-container">
                      <div className="status-card">
                        {/* <div className="status-icon" style={{ fontSize: '0.8rem' }}></div> */}
                        <div className="status-info">
                          <h4 style={{ margin: '0' }}>✈️ Flight Bookings</h4>
                          <div className="count" style={{ textAlign: 'center' }}>{getTotalCount(bookingCounts.flight)}</div>
                        </div>
                      </div>
                      <div className="status-card">
                        {/* <div className="status-icon" style={{ fontSize: '0.8rem' }}></div> */}
                        <div className="status-info">
                          <h4 style={{ margin: '0' }}>✏️ Flight Amendments</h4>
                          <div className="count" style={{ textAlign: 'center' }}>{getTotalCount(bookingCounts.amendments)}</div>
                        </div>
                      </div>
                      <div className="status-card">
                        {/* <div className="status-icon" style={{ fontSize: '0.8rem' }}></div> */}
                        <div className="status-info">
                          <h4 style={{ margin: '0' }}>🔄 Re-Flight Bookings</h4>
                          <div className="count" style={{ textAlign: 'center' }}>{getTotalCount(bookingCounts.reBookings)}</div>
                        </div>
                      </div>
                      <div className="status-card">
                        {/* <div className="status-icon" style={{ fontSize: '0.8rem' }}></div> */}
                        <div className="status-info">
                          <h4 style={{ margin: '0' }}>🏨 Hotel Bookings</h4>
                          <div className="count" style={{ textAlign: 'center' }}>{getTotalCount(bookingCounts.hotel)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                            bookings={filteredFlightBookings}
                            statusOptions={flightStatusOptions}
                            statusFilter={flightStatusFilter}
                            setStatusFilter={setFlightStatusFilter}
                            amountFilter={flightAmountFilter}
                            setAmountFilter={setFlightAmountFilter}
                            fromDate={flightFromDate}
                            setFromDate={setFlightFromDate}
                            toDate={flightToDate}
                            setToDate={setFlightToDate}
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
                            amendments={filteredAmendments}
                            statusOptions={amendmentStatusOptions}
                            statusFilter={amendmentStatusFilter}
                            setStatusFilter={setAmendmentStatusFilter}
                            amountFilter={amendmentAmountFilter}
                            setAmountFilter={setAmendmentAmountFilter}
                            fromDate={amendmentFromDate}
                            setFromDate={setAmendmentFromDate}
                            toDate={amendmentToDate}
                            setToDate={setAmendmentToDate}
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
                            bookings={filteredReBookings}
                            statusOptions={reBookingStatusOptions}
                            statusFilter={reBookingStatusFilter}
                            setStatusFilter={setReBookingStatusFilter}
                            amountFilter={reBookingAmountFilter}
                            setAmountFilter={setReBookingAmountFilter}
                            fromDate={reBookingFromDate}
                            setFromDate={setReBookingFromDate}
                            toDate={reBookingToDate}
                            setToDate={setReBookingToDate}
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
                            bookings={filteredHotelBookings}
                            statusOptions={hotelStatusOptions}
                            statusFilter={hotelStatusFilter}
                            setStatusFilter={setHotelStatusFilter}
                            amountFilter={hotelAmountFilter}
                            setAmountFilter={setHotelAmountFilter}
                            fromDate={hotelFromDate}
                            setFromDate={setHotelFromDate}
                            toDate={hotelToDate}
                            setToDate={setHotelToDate}
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
