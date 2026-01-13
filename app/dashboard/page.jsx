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
import { jwtDecode } from "jwt-decode";
// import "./responsive.css";

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
  const [hotelEmailFilter, setHotelEmailFilter] = useState("");
  const [hotelFromDate, setHotelFromDate] = useState("");
  const [hotelToDate, setHotelToDate] = useState("");
  const [filteredFlightBookings, setFilteredFlightBookings] = useState([]);
  const [flightStatusFilter, setFlightStatusFilter] = useState("");
  const [flightAmountFilter, setFlightAmountFilter] = useState("");
  const [flightEmailFilter, setFlightEmailFilter] = useState("");
  const [flightFromDate, setFlightFromDate] = useState("");
  const [flightToDate, setFlightToDate] = useState("");
  const [filteredAmendments, setFilteredAmendments] = useState([]);
  const [amendmentStatusFilter, setAmendmentStatusFilter] = useState("");
  const [amendmentAmountFilter, setAmendmentAmountFilter] = useState("");
  const [amendmentEmailFilter, setAmendmentEmailFilter] = useState("");
  const [amendmentFromDate, setAmendmentFromDate] = useState("");
  const [amendmentToDate, setAmendmentToDate] = useState("");
  const [filteredReBookings, setFilteredReBookings] = useState([]);
  const [reBookingStatusFilter, setReBookingStatusFilter] = useState("");
  const [reBookingAmountFilter, setReBookingAmountFilter] = useState("");
  const [reBookingEmailFilter, setReBookingEmailFilter] = useState("");
  const [reBookingFromDate, setReBookingFromDate] = useState("");
  const [reBookingToDate, setReBookingToDate] = useState("");

  // useEffect(() => {
  //   const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  //   const decodedToken = jwtDecode(token);
  //   if (decodedToken?.travelogy_admin != 1) {
  //     router.push("/profile");
  //   }
  // }, [router]);

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
    new Set(
      userHotelBookingData?.bookings?.map((b) => b.status).filter((v) => !!v)
    ) || []
  );

  const hotelEmailOptions = Array.from(
    new Set(
      userHotelBookingData?.bookings?.map((b) => b.user_email).filter((v) => !!v)
    ) || []
  );

  const flightStatusOptions = Array.from(
    new Set(
      userBookingData?.bookings?.map((b) => b.status).filter((v) => !!v)
    ) || []
  );

  const flightEmailOptions = Array.from(
    new Set(
      userBookingData?.bookings?.map((b) => b.user_email).filter((v) => !!v)
    ) || []
  );

  const amendmentStatusOptions = Array.from(
    new Set(
      userAmendmentData?.amendments
        ?.map((b) => b.amendment_status)
        .filter((v) => !!v)
    ) || []
  );

  const amendmentEmailOptions = Array.from(
    new Set(
      userAmendmentData?.amendments?.map((b) => b.user_email).filter((v) => !!v)
    ) || []
  );

  const reBookingStatusOptions = Array.from(
    new Set(
      userReBookingData?.reBookings?.map((b) => b.status).filter((v) => !!v)
    ) || []
  );

  const reBookingEmailOptions = Array.from(
    new Set(
      userReBookingData?.reBookings?.map((b) => b.user_email).filter((v) => !!v)
    ) || []
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
          b.status
            .toString()
            .toLowerCase()
            .includes(hotelStatusFilter.toLowerCase());
      }

      if (hotelEmailFilter.trim() !== "") {
        matches =
          matches &&
          b.user_email &&
          b.user_email
            .toString()
            .toLowerCase()
            .includes(hotelEmailFilter.toLowerCase());
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
  }, [
    userHotelBookingData,
    hotelStatusFilter,
    hotelAmountFilter,
    hotelEmailFilter,
    hotelFromDate,
    hotelToDate,
  ]);

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
          b.status
            .toString()
            .toLowerCase()
            .includes(flightStatusFilter.toLowerCase());
      }

      if (flightEmailFilter.trim() !== "") {
        matches =
          matches &&
          b.user_email &&
          b.user_email
            .toString()
            .toLowerCase()
            .includes(flightEmailFilter.toLowerCase());
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
  }, [
    userBookingData,
    flightStatusFilter,
    flightAmountFilter,
    flightEmailFilter,
    flightFromDate,
    flightToDate,
  ]);

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
            b.refundable_amount
              .toString()
              .toLowerCase()
              .includes(val.toLowerCase());
        }
      }

      if (amendmentStatusFilter.trim() !== "") {
        matches =
          matches &&
          b.amendment_status &&
          b.amendment_status
            .toString()
            .toLowerCase()
            .includes(amendmentStatusFilter.toLowerCase());
      }

      if (amendmentEmailFilter.trim() !== "") {
        matches =
          matches &&
          b.user_email &&
          b.user_email
            .toString()
            .toLowerCase()
            .includes(amendmentEmailFilter.toLowerCase());
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
  }, [
    userAmendmentData,
    amendmentStatusFilter,
    amendmentAmountFilter,
    amendmentEmailFilter,
    amendmentFromDate,
    amendmentToDate,
  ]);

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
          b.status
            .toString()
            .toLowerCase()
            .includes(reBookingStatusFilter.toLowerCase());
      }

      if (reBookingEmailFilter.trim() !== "") {
        matches =
          matches &&
          b.user_email &&
          b.user_email
            .toString()
            .toLowerCase()
            .includes(reBookingEmailFilter.toLowerCase());
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
  }, [
    userReBookingData,
    reBookingStatusFilter,
    reBookingAmountFilter,
    reBookingEmailFilter,
    reBookingFromDate,
    reBookingToDate,
  ]);

  // Helper to get total count from status counts
  const getTotalCount = (statusCounts) => {
    if (!statusCounts || Object.keys(statusCounts).length === 0) return 0;
    return Object.values(statusCounts).reduce(
      (total, count) => total + count,
      0
    );
  };

  return (
    <>
      <Layout headerStyle={1} footerStyle={7}>
        <main className="modern-dashboard">
          <section className="section_main_book_dash_01 relative_MainBanner">
            {/* Loading Overlay */}
            {loading && (
              <div className="modern-loading">
                <div className="loading-spinner"></div>
                <p>Loading your dashboard...</p>
              </div>
            )}

            {/* Hero Section */}
            <div className="hero-section">
              <div className="hero-content">
                <div className="hero-text">
                  <h1 className="hero-title">
                    Welcome back
                    {userData?.user?.name ? `, ${userData.user.name}` : ""}!
                  </h1>
                  <p className="hero-subtitle">
                    Manage your travel bookings with ease
                  </p>
                </div>
                {/* <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">
                    {getTotalCount(bookingCounts.flight) +
                      getTotalCount(bookingCounts.hotel) +
                      getTotalCount(bookingCounts.amendments) +
                      getTotalCount(bookingCounts.reBookings)}
                  </span>
                  <span className="stat-label">Total Bookings</span>
                </div>
              </div> */}
              </div>
            </div>

            {/* Stats Grid */}
            {/* <div className="stats-grid">
            <div className="stat-card flight">
              <div className="stat-icon">✈️</div>
              <div className="stat-content">
                <h3 className="stat-title">Flight Bookings</h3>
                <div className="stat-number">
                  {getTotalCount(bookingCounts.flight)}
                </div>
                <div className="stat-trend">Active bookings</div>
              </div>
            </div>

            <div className="stat-card amendment">
              <div className="stat-icon">✏️</div>
              <div className="stat-content">
                <h3 className="stat-title">Amendments</h3>
                <div className="stat-number">
                  {getTotalCount(bookingCounts.amendments)}
                </div>
                <div className="stat-trend">Modifications</div>
              </div>
            </div>

            <div className="stat-card rebooking">
              <div className="stat-icon">🔄</div>
              <div className="stat-content">
                <h3 className="stat-title">Re-bookings</h3>
                <div className="stat-number">
                  {getTotalCount(bookingCounts.reBookings)}
                </div>
                <div className="stat-trend">New bookings</div>
              </div>
            </div>

            <div className="stat-card hotel">
              <div className="stat-icon">🏨</div>
              <div className="stat-content">
                <h3 className="stat-title">Hotel Bookings</h3>
                <div className="stat-number">
                  {getTotalCount(bookingCounts.hotel)}
                </div>
                <div className="stat-trend">Accommodations</div>
              </div>
            </div>
          </div> */}

            {/* Main Content */}
            <div className="main-content">
              {/* <div className="content-header">
              <h2 className="section-title">Your Bookings</h2>
              <p className="section-subtitle">
                Manage and track all your travel reservations
              </p>
            </div> */}

              <div className="bookings-container">
                <Tabs
                  defaultActiveKey="1"
                  className="modern-tabs"
                  items={[
                    {
                      label: (
                        <div className="tab-item">
                          <span className="tab-icon"><img src="/assets/dashboard/Flight booking.svg" alt="Flight booking" /></span>
                          <span className="tab-text">Flight Booking</span>
                          <span className="tab-badge">
                            {getTotalCount(bookingCounts.flight)}
                          </span>
                        </div>
                      ),
                      key: "1",
                      children: (
                        <div className="tab-content">
                          <FlightBookingList
                            bookings={filteredFlightBookings}
                            statusOptions={flightStatusOptions}
                            statusFilter={flightStatusFilter}
                            setStatusFilter={setFlightStatusFilter}
                            amountFilter={flightAmountFilter}
                            setAmountFilter={setFlightAmountFilter}
                            emailOptions={flightEmailOptions}
                            emailFilter={flightEmailFilter}
                            setEmailFilter={setFlightEmailFilter}
                            fromDate={flightFromDate}
                            setFromDate={setFlightFromDate}
                            toDate={flightToDate}
                            setToDate={setFlightToDate}
                          />
                        </div>
                      ),
                    },
                    {
                      label: (
                        <div className="tab-item">
                          <span className="tab-icon"><img src="/assets/dashboard/Amendments.svg" alt="Amendments" /></span>
                          <span className="tab-text">Flight Amendments</span>
                          <span className="tab-badge">
                            {getTotalCount(bookingCounts.amendments)}
                          </span>
                        </div>
                      ),
                      key: "2",
                      children: (
                        <div className="tab-content">
                          <AmendmentList
                            amendments={filteredAmendments}
                            statusOptions={amendmentStatusOptions}
                            statusFilter={amendmentStatusFilter}
                            setStatusFilter={setAmendmentStatusFilter}
                            amountFilter={amendmentAmountFilter}
                            setAmountFilter={setAmendmentAmountFilter}
                            emailOptions={amendmentEmailOptions}
                            emailFilter={amendmentEmailFilter}
                            setEmailFilter={setAmendmentEmailFilter}
                            fromDate={amendmentFromDate}
                            setFromDate={setAmendmentFromDate}
                            toDate={amendmentToDate}
                            setToDate={setAmendmentToDate}
                          />
                        </div>
                      ),
                    },
                    {
                      label: (
                        <div className="tab-item">
                          <span className="tab-icon"><img src="/assets/dashboard/Re Booking.svg" alt="Re booking" /></span>
                          <span className="tab-text">Re-Flight Bookings</span>
                          <span className="tab-badge">
                            {getTotalCount(bookingCounts.reBookings)}
                          </span>
                        </div>
                      ),
                      key: "3",
                      children: (
                        <div className="tab-content">
                          <FlightReBookingList
                            bookings={filteredReBookings}
                            statusOptions={reBookingStatusOptions}
                            statusFilter={reBookingStatusFilter}
                            setStatusFilter={setReBookingStatusFilter}
                            amountFilter={reBookingAmountFilter}
                            setAmountFilter={setReBookingAmountFilter}
                            emailOptions={reBookingEmailOptions}
                            emailFilter={reBookingEmailFilter}
                            setEmailFilter={setReBookingEmailFilter}
                            fromDate={reBookingFromDate}
                            setFromDate={setReBookingFromDate}
                            toDate={reBookingToDate}
                            setToDate={setReBookingToDate}
                          />
                        </div>
                      ),
                    },
                    {
                      label: (
                        <div className="tab-item">
                          <span className="tab-icon"><img src="/assets/dashboard/Hotel booking.svg" alt="Hotel booking" /></span>
                          <span className="tab-text">Hotel Booking</span>
                          <span className="tab-badge">
                            {getTotalCount(bookingCounts.hotel)}
                          </span>
                        </div>
                      ),
                      key: "4",
                      children: (
                        <div className="tab-content">
                          <HotelBookingList
                            bookings={filteredHotelBookings}
                            statusOptions={hotelStatusOptions}
                            statusFilter={hotelStatusFilter}
                            setStatusFilter={setHotelStatusFilter}
                            amountFilter={hotelAmountFilter}
                            setAmountFilter={setHotelAmountFilter}
                            emailOptions={hotelEmailOptions}
                            emailFilter={hotelEmailFilter}
                            setEmailFilter={setHotelEmailFilter}
                            fromDate={hotelFromDate}
                            setFromDate={setHotelFromDate}
                            toDate={hotelToDate}
                            setToDate={setHotelToDate}
                          />
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};
export default Page;
