"use client";

import Layout from "@/components/layout/Layout";
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { postData } from "@/services/NetworkAdapter";

const page = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setloading] = useState(false);
  const [userData, setUserData] = useState();
  const [userBookingData, setUserBookingData] = useState();

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
      console.log("oooooooooooooooooooooooooooooo 1");
      try {
        setloading(true);

        const reqParams = {
          phone: "9677179866",
          e_mail: "h@gmail.com",
        };

        const result = await postData(
          "/travelogy/flight/fetch-user",
          reqParams
        );
        console.log("fetchUserDataresssssssssssss = ", result);
        setUserData(result);
        setloading(false);
      } catch (error) {
        console.log("error ==> ", error);
        setloading(false);
      }
    };

    fetchUserData();

    const fetchflightBookings = async () => {
      console.log("fetchflightBookings == ");
      try {
        setloading(true);

        const reqParams = {
          phone: "9677179800",
        };

        const result = await postData(
          "/travelogy/flight/fetech-bookings",
          reqParams
        );
        console.log("fetchflightBookingsresssssssssssss = ", result);
        setUserBookingData(result);
        setloading(false);
      } catch (error) {
        console.log("error ==> ", error);
        setloading(false);
      }
    };

    fetchflightBookings();
  }, []);

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          <section>
            <div className=" bg-gray-100 p-40 border   flex gap-6">
              {/* Sidebar */}
              <div
                className="w-25  bg-white rounded-2xl  p-4 shadow-lg "
                style={{
                  position: "sticky",
                  top: "10px", // Adjust this based on your header height
                  height: "fit-content",
                  maxHeight: "calc(100vh - 100px)", // Prevent overflow
                  overflowY: "auto",
                }}
              >
                <div className="w-full bg-white mt-30">
                  <div
                    className={`flex justify-between items-center pr-25 pl-25 pt-4 pb-4 border-b ${
                      activeTab === "profile"
                        ? "bg-gray-100 font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                    style={{ borderBottom: "1px solid gray" }}
                    onClick={() =>
                      document
                        .getElementById("profile")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    <div className="flex flex-row items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-person-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path
                          fill-rule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                        />
                      </svg>
                      <span className="text-md neutral-500">Profile</span>
                    </div>

                    <span className="text-gray-500 text-lg">{">"}</span>
                  </div>

                  <div
                    className={`flex justify-between items-center pr-25 pl-25 pt-4 pb-4 border-b ${
                      activeTab === "login"
                        ? "bg-gray-100 font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                    style={{ borderBottom: "1px solid gray" }}
                    onClick={() =>
                      document
                        .getElementById("login")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    <div className="flex flex-row items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-box-arrow-in-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                        />
                      </svg>
                      <span className="text-md neutral-500">Login Details</span>
                    </div>
                    <span className="text-gray-500 text-lg">{">"}</span>
                  </div>

                  {/* <div className="flex justify-between items-center pr-25  pl-25 pt-4 pb-4   border-b" style={{borderBottom:"1px solid gray"}}>
        <div className="flex flex-row items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pc-display" viewBox="0 0 16 16">
  <path d="M8 1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1zm1 13.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0m2 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0M9.5 1a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM9 3.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5M1.5 2A1.5 1.5 0 0 0 0 3.5v7A1.5 1.5 0 0 0 1.5 12H6v2h-.5a.5.5 0 0 0 0 1H7v-4H1.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5H7V2z"/>
</svg>
        <span className="text-md neutral-500">Logged In devices</span>
        </div>
        <span className="text-gray-500 text-lg">{'>'}</span>
      </div> */}

                  <div
                    className={`flex justify-between items-center pr-25 pl-25 pt-4 pb-4 border-b ${
                      activeTab === "coTravellers"
                        ? "bg-gray-100 font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                    style={{ borderBottom: "1px solid gray" }}
                    onClick={() =>
                      document
                        .getElementById("coTravellers")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    <div className="flex flex-row items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-people-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                      </svg>
                      <span className="text-md neutral-500">Co-Travellers</span>
                    </div>
                    <span className="text-gray-500 text-lg">{">"}</span>
                  </div>

                  <div
                    className={`flex justify-between items-center pr-25 pl-25 pt-4 pb-4 border-b ${
                      activeTab === "bookings"
                        ? "bg-gray-100 font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                    style={{ borderBottom: "1px solid gray" }}
                    onClick={() =>
                      document
                        .getElementById("bookings")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    <div className="flex flex-row items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-ticket-perforated-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6zm4-1v1h1v-1zm1 3v-1H4v1zm7 0v-1h-1v1zm-1-2h1v-1h-1zm-6 3H4v1h1zm7 1v-1h-1v1zm-7 1H4v1h1zm7 1v-1h-1v1zm-8 1v1h1v-1zm7 1h1v-1h-1z" />
                      </svg>
                      <span className="text-md neutral-500">Your Bookings</span>
                    </div>
                    <span className="text-gray-500 text-lg">{">"}</span>
                  </div>

                  <button className="w-full mt-4 bg-red-400 text-white text-md  font-medium py-2 rounded hover:bg-gray-300 transition">
                    Log out
                  </button>
                </div>
              </div>

              {/* end of sidebar */}

              {/* Main content */}
              <div className="flex-1 space-y-6 ml-20 ">
                {/* Profile*/}
                <div
                  className="bg-white rounded-2xl shadow-md scroll-auto"
                  id="profile"
                >
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-bold neutral-1000">Profile</h4>
                      </div>
                    </div>

                    <div className="flex flex-col items-center flex flex-row items-center gap-2 shadow-md rounded p-2 border">
                      <div className="w-20 h-20 mb-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white text-3xl font-semibold flex items-center justify-center">
                        N
                      </div>
                      <div className="flex flex-col">
                        <div className="font-semibold text-xl-bold neutral-1000">
                          {!loading ? userData?.userData?.user_name : null}
                        </div>
                        <div className="text-md neutral-500 text-gray-500">
                          {!loading ? userData?.userData?.e_mail : null}
                        </div>
                      </div>
                    </div>

                    <div className="rounded shadow-md border p-4">
                      <div className="flex flex-row justify-between items-center  mb-20">
                        <h6 className="">Personal Information</h6>
                        <button
                          className="bg-orange-500 rounded   text-white text-sm-bold"
                          style={{ backgroundColor: "orange" }}
                        >
                          Edit
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-10 text-sm text-gray-600 mt-10 ">
                        {/* Column 1 */}
                        <div className="space-y-4">
                          <div className="grid grid-cols-10 border-b pb-2">
                            <span className="col-span-4 text-sm neutral-500">
                              NAME
                            </span>{" "}
                            <br />
                            <span className="col-span-6 text-black">
                              {!loading ? userData?.userData?.user_name : null}
                            </span>
                          </div>
                          <div className="grid grid-cols-10 border-b pt-2 pb-2">
                            <span className="col-span-4 text-neutral-500">
                              MARITAL STATUS
                            </span>{" "}
                            <br />
                            <span className="col-span-6 text-black">
                              {!loading
                                ? userData?.userData?.marital_status
                                : null}
                            </span>
                          </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-4">
                          <div className="grid grid-cols-10 border-b pb-2">
                            <span className="col-span-4 text-neutral-500">
                              DOB
                            </span>{" "}
                            <br />
                            <span className="col-span-6 text-black">
                              {!loading
                                ? userData?.userData?.dob.split("T")[0]
                                : null}
                            </span>
                          </div>
                          <div className="grid grid-cols-10 border-b pt-2 pb-2">
                            <span className="col-span-4 text-neutral-500">
                              ADDRESS
                            </span>{" "}
                            <br />
                            <span className="col-span-6 text-black">
                              {!loading ? userData?.userData?.address : null}
                            </span>
                          </div>
                        </div>

                        {/* Column 3 */}
                        <div className="space-y-4">
                          <div className="grid grid-cols-10 border-b pb-2">
                            <span className="col-span-4 text-neutral-500">
                              GENDER
                            </span>{" "}
                            <br />
                            <span className="col-span-6 text-black">
                              {!loading ? userData?.userData?.gender : null}
                            </span>
                          </div>
                          {/* <div className="grid grid-cols-10 border-b pt-2 pb-2">
                            <span className="col-span-4 text-neutral-500">
                              STATE
                            </span>{" "}
                            <br />
                            <span className="col-span-6 text-black">
                              Jakarta, Indonesia
                            </span>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Login Details */}
                <div id="login">
                  <div className="bg-white rounded-2xl shadow-md">
                    <div className="p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-bold neutral-1000">
                            Login Details
                          </h4>
                        </div>
                      </div>

                      <div className="p-6 bg-white shadow-md rounded border">
                        <div className="grid grid-cols-2 gap-4">
                          {/* Mobile Number Section */}
                          <div className="flex items-center">
                            <div className="text-gray-600">MOBILE NUMBER</div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="font-bold">+91 - 9360417046</div>
                            {/* <div className="text-green-600 flex items-center"> */}
                            {/* <span>✔️ Verified</span>
            <span className="ml-2 cursor-pointer text-gray-400 hover:text-gray-600">
              
            </span>
          </div> */}
                          </div>

                          {/* Email ID Section */}
                          <div className="flex items-center">
                            <div className="text-gray-600">EMAIL ID</div>
                          </div>
                          <div className="flex items-center">
                            <div className="text-blue-600 cursor-pointer">
                              + Add your Email ID
                            </div>
                          </div>

                          {/* Password Section */}
                          <div className="flex items-center">
                            <div className="text-gray-600">PASSWORD</div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="font-bold">******</div>
                            {/* <div className="text-blue-600 cursor-pointer">Change Password?</div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* co-travellers */}
                <div
                  className="bg-white rounded-2xl shadow-md"
                  id="coTravellers"
                >
                  <div className="p-4">
                    <div className="flex flex-row justify-between items-center">
                      <h4 className="font-bold text-neutral-900">
                        Co-Travellers
                      </h4>
                      <button
                        className="text-white rounded"
                        style={{ backgroundColor: "orange" }}
                      >
                        + Add Travellers
                      </button>
                    </div>
                  </div>
                </div>

                {/* bookings */}
                <div
                  className="bg-white rounded-2xl shadow-md mb-40"
                  id="bookings"
                >
                  <div className="p-4">
                    <div className="flex flex-row justify-between items-center">
                      <h4 className="font-bold text-neutral-900">
                        Your Bookings
                      </h4>
                    </div>

                    <div></div>
                    <Tabs
                      defaultActiveKey="1"
                      centered
                      className="pl-40 pr-40"
                      items={[
                        {
                          label: (
                            <span className="text-md neutral-500">
                              Flight Booking
                            </span>
                          ),
                          key: "1",
                          children: (
                            <div className="p-3">
                              {/* Your flight booking content here */}
                              <p>
                                Here you can book your flights. Select
                                destination, dates, and preferences.
                              </p>
                              <div>
                                {userBookingData?.bookings?.map((bookingId, index) => (
                                <div key={index}>{bookingId}</div>
                                ))}
                              </div>
                            </div>
                          ),
                        },
                        {
                          label: (
                            <span className="text-md neutral-500">
                              Hotel Booking
                            </span>
                          ),
                          key: "2",
                          children: (
                            <div className="p-3">
                              {/* Your hotel booking content here */}
                              <p>
                                Find and book hotels easily. Choose location,
                                check-in and check-out dates.
                              </p>
                            </div>
                          ),
                        },
                      ]}
                    />
                  </div>
                </div>

                <div></div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};
export default page;
