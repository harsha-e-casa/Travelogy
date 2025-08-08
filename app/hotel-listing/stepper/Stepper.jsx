"use client";
import dayjs from "dayjs";
import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { fetchHotelReviewData, hotelBooking } from "../../../util/HotelApi";
import { Input, Checkbox, message, Radio } from "antd";
import AppDateRange from "@/components/searchEngine/AppDateRage";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { postData } from "@/services/NetworkAdapter";

export function HotelReviewComponent({
  setHotelReviewData,
  setLoading,
  setError,
}) {
  // const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const hid = searchParams.get("hid");
  const oid = searchParams.get("oid");

  useEffect(() => {
    // if (hid && oid) {
    //   setLoading(true);
    //   fetchHotelReviewData(hid, oid)
    //     .then((data) => setHotelReviewData(data))
    //     .catch((err) => setError(err.message))
    //     .finally(() => setLoading(false));
    // }
    const apiCall = async (hid, oid) => {
      try {
        let reqData = {
          action: "hotelReview",
          requestData: {
            hotelId: hid,
            optionId: oid,
          },
        };
        const response = await postData("travelogy/hotel/fetch-data", reqData);
        console.log("hotel listing response == ", response);
        setHotelReviewData(response);
        setLoading(false);
      } catch (error) {
        console.error("Search API error:", error);
        setError(error.message);
        setLoading(false);
        return null;
      }
    };
    apiCall(hid, oid);
  }, [hid, oid]);

  // if (error) {
  //   return <div className="text-red-500 text-center">{error}</div>;
  // }

  return null;
}

export function Step1TravellerDetails({
  hotelReviewData,
  formData,
  setFormData,
  onNext,
}) {
  const ipmValue = hotelReviewData?.hInfo?.ops?.[0]?.ipm;

  const [errors, setErrors] = useState({});
  const rating = parseFloat(hotelReviewData?.hInfo?.rt) || 0;
  const filledStars = Math.round(rating);
  useEffect(() => {
    if (hotelReviewData?.query?.roomInfo?.length) {
      const guests = {};
      hotelReviewData.query.roomInfo.forEach((_, roomIndex) => {
        if (!formData.guests?.[roomIndex]) {
          guests[roomIndex] = {
            title: "Mr",
            firstName: "",
            lastName: "",
            extraGuests: [],
          };
        }
      });
      setFormData((prev) => ({
        ...prev,
        guests: { ...guests, ...(prev.guests || {}) },
      }));
    }
  }, [hotelReviewData]);
  const handleGuestInputChange = (roomIndex, field, value) => {
    setFormData((prev) => ({
      ...prev,
      guests: {
        ...prev.guests,
        [roomIndex]: {
          ...prev.guests?.[roomIndex],
          [field]: value,
        },
      },
    }));
  };

  useEffect(() => {
    localStorage.setItem("bookingFormData", JSON.stringify(formData));
  }, [formData]);
  const leadGuest = formData.guests?.[0] || {};

  const validateFields = () => {
    const newErrors = {};

    if (!leadGuest.firstName?.trim()) {
      newErrors.firstName = "First name is required";
    } else if (leadGuest.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!leadGuest.lastName?.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (leadGuest.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!(formData?.mobile ?? "").trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile must be 10 digits";
    }

    if (!(formData?.email ?? "").trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleNext = () => {
    const isValid = validateFields();
    if (isValid) {
      onNext();
    }
  };

  // const [roomGuestState, setRoomGuestState] = useState({}); // { [roomIndex]: { adults: [], children: [] } }

  const updateExtraGuests = (roomIndex, newGuests) => {
    setFormData((prev) => ({
      ...prev,
      guests: {
        ...prev.guests,
        [roomIndex]: {
          ...prev.guests?.[roomIndex],
          extraGuests: newGuests,
        },
      },
    }));
  };

  const addGuest = (roomIndex, type) => {
    const currentExtras = formData.guests?.[roomIndex]?.extraGuests || [];
    const newGuest = {
      title: type === "children" ? "Master" : "Mr",
      firstName: "",
      lastName: "",
      type,
    };
    updateExtraGuests(roomIndex, [...currentExtras, newGuest]);
  };

  const removeGuest = (roomIndex, index) => {
    const currentExtras = formData.guests?.[roomIndex]?.extraGuests || [];
    const updated = [...currentExtras];
    updated.splice(index, 1);
    updateExtraGuests(roomIndex, updated);
  };
  let freeCancellationDate = null;
  const policies = hotelReviewData?.hInfo?.ops?.[0]?.cnp?.pd;

  if (Array.isArray(policies)) {
    const freeCancellation = policies.find((p) => p.am === 0);
    if (freeCancellation?.tdt) {
      const dateObj = new Date(freeCancellation.tdt);
      freeCancellationDate = dateObj.toLocaleDateString("en-GB");
    }
  }
  const [passportNumber, setPassportNumber] = useState(
    formData?.guests?.[0]?.passportNumber || ""
  );
  const [passportExpiryDate, setPassportExpiryDate] = useState(
    formData?.guests?.[0]?.passportExpiryDate || ""
  );

  const [openDatePicker, setOpenDatePicker] = useState(false); // Control datepicker visibility

  const handleDateChange = (date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : "";
    setPassportExpiryDate(formattedDate);
    setFormData((prev) => ({
      ...prev,
      guests: {
        ...prev.guests,
        [0]: {
          ...prev.guests?.[0],
          passportExpiryDate: formattedDate,
        },
      },
    }));
    setOpenDatePicker(false); // Close the date picker after selecting a date
  };

  const handlePassportNumberChange = (e) => {
    const value = e.target.value;
    setPassportNumber(value);
    setFormData((prev) => ({
      ...prev,
      guests: {
        ...prev.guests,
        [0]: {
          ...prev.guests?.[0],
          passportNumber: value,
        },
      },
    }));
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="max-w-4xl p-6 rounded-md text-sm space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-base font-semibold">
            {hotelReviewData?.hInfo?.name}
            <span className="text-star ml-2">
              {[...Array(filledStars)].map((_, index) => (
                <svg
                  key={`filled-${index}`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gold"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 .25l1.8 5.8h6.2l-5 3.6 1.9 5.8-5-3.6-5 3.6 1.9-5.8-5-3.6h6.2L8 .25z" />
                </svg>
              ))}
            </span>
          </h2>
          <p className="text-xs text-gray-600">
            {hotelReviewData?.hInfo?.ad?.adr && (
              <>{hotelReviewData.hInfo.ad.adr} </>
            )}
            <br />
            {hotelReviewData?.hInfo?.ad?.adr2 && (
              <>{hotelReviewData.hInfo.ad.adr2}, </>
            )}
            {hotelReviewData?.hInfo?.ad?.ctn && (
              <>{hotelReviewData.hInfo.ad.ctn}, </>
            )}
            {hotelReviewData?.hInfo?.ad?.cn && (
              <>{hotelReviewData.hInfo.ad.cn} - </>
            )}
            {hotelReviewData?.hInfo?.ad?.postalCode && (
              <> Postal code: {hotelReviewData.hInfo.ad.postalCode}</>
            )}
          </p>
          <p className="text-gray-500 text-sm">
            <span className="text-blue-700 font-semibold">
              {freeCancellationDate && (
                <div className="text-xs mb-1">
                  Last Cancellation Date:
                  {freeCancellationDate}
                </div>
              )}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 bg-blue-50 p-4 rounded-md text-sm text-gray-800">
          <div>
            <strong className="block text-gray-900">Check In</strong>
            <p className="text-gray-700">
              {hotelReviewData?.query?.checkinDate || "N/A"}
              <br />
              {hotelReviewData?.hInfo?.checkInTime?.beginTime ||
                "No Clock-in Time"}
            </p>
          </div>

          <div className="border-l-1 pl-4">
            <strong className="block text-gray-900">Check Out</strong>
            <p className="text-gray-700">
              {hotelReviewData?.query?.checkoutDate || "N/A"}
              <br />
              {hotelReviewData?.hInfo?.checkOutTime?.beginTime ||
                "No Clock-out Time"}
            </p>
          </div>

          <div className="border-l-1 pl-4">
            <strong className="block text-gray-900">Total Rooms</strong>
            <p className="text-gray-700 text-xs">
              {hotelReviewData?.query?.roomInfo?.length || 0}
            </p>
          </div>

          <div className="border-l-1 pl-4 md:col-span-2">
            <strong className="block text-gray-900 text-base">
              Total Guests
            </strong>
            <p className="text-gray-700 text-sm">
              {(() => {
                const rooms = hotelReviewData?.query?.roomInfo || [];
                const totalAdults = rooms.reduce(
                  (sum, r) => sum + (r.numberOfAdults || 0),
                  0
                );
                const totalChildren = rooms.reduce(
                  (sum, r) => sum + (r.numberOfChild || 0),
                  0
                );
                return `${totalAdults} Adults, ${totalChildren} Children`;
              })()}
            </p>
          </div>

          <div className="border-l-1 pl-4">
            <strong className="block text-gray-900">Total Nights</strong>
            <p className="text-gray-700">
              {(() => {
                const checkin = hotelReviewData?.query?.checkinDate;
                const checkout = hotelReviewData?.query?.checkoutDate;
                if (checkin && checkout) {
                  const nights = dayjs(checkout).diff(dayjs(checkin), "day");
                  return `${nights} Night${nights > 1 ? "s" : ""}`;
                }
                return "N/A";
              })()}
            </p>
          </div>
        </div>
        <>
          <h6 className="text-sm font-bold">
            Guest Details
            <span className="text-xs text-red-600">
              (Only Lead Guest Name is Required)
            </span>
          </h6>
          {hotelReviewData?.query?.roomInfo?.map((room, roomIndex) => {
            const roomDetails =
              hotelReviewData?.hInfo?.ops?.[0]?.ris?.[roomIndex];
            const leadGuest = formData.guests?.[roomIndex] || {};
            const extraGuests = leadGuest.extraGuests || [];

            const currentAdults = extraGuests.filter(
              (g) => g.type === "adults"
            );
            const currentChildren = extraGuests.filter(
              (g) => g.type === "children"
            );

            return (
              <div key={roomIndex} className="space-y-4 border-b pb-6">
                <h4 className="font-semibold text-sm mt-6">
                  For Room {roomIndex + 1} - {roomDetails?.rc} (
                  {roomDetails?.mb}){" "}
                  <span className="text-gray-500 font-normal">
                    ({room.numberOfAdults} Adults {room.numberOfChild}{" "}
                    {room.numberOfChild === 1 ? "Child" : "Children"})
                  </span>
                </h4>
                <div className="stepper-guest-row">
                  <select
                    className="border p-2 rounded stepper_select"
                    value={formData.guests?.[roomIndex]?.title || "Mr"}
                    onChange={(e) =>
                      handleGuestInputChange(roomIndex, "title", e.target.value)
                    }
                  >
                    <option>Mr</option>
                    <option>Ms</option>
                    <option>Mrs</option>
                  </select>

                  <div className="flex flex-col">
                    <input
                      className="border p-2 rounded stepper_input"
                      placeholder="Lead Pax First Name"
                      value={formData.guests?.[roomIndex]?.firstName || ""}
                      onChange={(e) =>
                        handleGuestInputChange(
                          roomIndex,
                          "firstName",
                          e.target.value
                        )
                      }
                    />
                    {errors.firstName && (
                      <span className="form-error-space text-red-500 text-xs mt-1">
                        {errors.firstName}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <input
                      className="border p-2 rounded stepper_input"
                      placeholder="Last Name"
                      value={formData.guests?.[roomIndex]?.lastName || ""}
                      onChange={(e) =>
                        handleGuestInputChange(
                          roomIndex,
                          "lastName",
                          e.target.value
                        )
                      }
                    />
                    {errors.lastName && (
                      <span className="form-error-space text-red-500 text-xs mt-1">
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                  {ipmValue && (
                    <>
                      <div className="flex flex-col">
                        <input
                          className="border p-2 rounded stepper_input"
                          placeholder="Passport Number"
                          value={passportNumber}
                          onChange={handlePassportNumberChange}
                        />
                      </div>

                      <div className="flex flex-col">
                        <input
                          className="border p-2 rounded stepper_input"
                          placeholder="Passport Expiry Date"
                          value={passportExpiryDate}
                          readOnly
                          onClick={() => setOpenDatePicker(true)} // Open the date picker on click
                        />
                        {openDatePicker && (
                          <AppDateRange
                            openToDateRange={() => setOpenDatePicker(false)} // Close on selection
                            setDatedep={handleDateChange}
                          />
                        )}
                      </div>
                    </>
                  )}
                </div>
                {(formData.guests?.[roomIndex]?.extraGuests || []).map(
                  (guest, i) => (
                    <div
                      key={`guest-${roomIndex}-${i}`}
                      className="stepper-guest-row"
                    >
                      <select
                        className="border p-2 rounded stepper_select"
                        value={guest.title}
                        onChange={(e) => {
                          const updated = [
                            ...formData.guests[roomIndex].extraGuests,
                          ];
                          updated[i].title = e.target.value;
                          updateExtraGuests(roomIndex, updated);
                        }}
                      >
                        {guest.type === "children" ? (
                          <>
                            <option>Master</option>
                            <option>Miss</option>
                          </>
                        ) : (
                          <>
                            <option>Mr</option>
                            <option>Ms</option>
                            <option>Mrs</option>
                          </>
                        )}
                      </select>

                      <input
                        className="border p-2 rounded stepper_input"
                        placeholder="First Name"
                        value={guest.firstName}
                        onChange={(e) => {
                          const updated = [
                            ...formData.guests[roomIndex].extraGuests,
                          ];
                          updated[i].firstName = e.target.value;
                          updateExtraGuests(roomIndex, updated);
                        }}
                      />

                      <input
                        className="border p-2 rounded stepper_input"
                        placeholder="Last Name"
                        value={guest.lastName}
                        onChange={(e) => {
                          const updated = [
                            ...formData.guests[roomIndex].extraGuests,
                          ];
                          updated[i].lastName = e.target.value;
                          updateExtraGuests(roomIndex, updated);
                        }}
                      />

                      <button
                        onClick={() => removeGuest(roomIndex, i)}
                        className="text-red-500 self-center"
                      >
                        🗑️
                      </button>
                    </div>
                  )
                )}
                <div className="mt-2 text-sm font-semibold text-orange-600">
                  {currentAdults.length + 1 < room.numberOfAdults ||
                  currentChildren.length < room.numberOfChild ? (
                    <button
                      onClick={() => {
                        if (currentAdults.length + 1 < room.numberOfAdults) {
                          addGuest(roomIndex, "adults");
                        } else if (
                          currentChildren.length < room.numberOfChild
                        ) {
                          addGuest(roomIndex, "children");
                        }
                      }}
                    >
                      + Add Guest(s) Details
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </>
        <div className="space-y-2">
          <h3 className="font-semibold text-base">Contact Details</h3>
          <div className="stepper-guest-row">
            <div className="flex flex-col">
              <select
                className="border p-2 rounded form-field stepper_select"
                value={formData.countryCode}
                onChange={(e) =>
                  setFormData({ ...formData, countryCode: e.target.value })
                }
              >
                <option value="+91">India (+91)</option>
                <option value="+1">USA (+1)</option>
                <option value="+44">UK (+44)</option>
              </select>
            </div>
            <div className="flex flex-col">
              {" "}
              <input
                type="text"
                placeholder="Mobile No."
                className="border p-2 rounded form-field stepper_input"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
              />{" "}
              {errors.mobile && (
                <span className="form-error-space">{errors.mobile}</span>
              )}
            </div>
            <div className="flex flex-col">
              {" "}
              <input
                type="email"
                placeholder="Email ID"
                className="border p-2 rounded form-field stepper_input"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />{" "}
              {errors.email && (
                <span className="form-error-space">{errors.email}</span>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-base">
            Special Request(s) (Optional)
          </h3>
          <textarea
            rows="3"
            className="w-full border p-2 rounded"
            placeholder="Write any requests here..."
            value={formData.specialRequest}
            onChange={(e) =>
              setFormData({ ...formData, specialRequest: e.target.value })
            }
          />
        </div>

        <button className="rounded-none book-now-btn" onClick={handleNext}>
          PROCEED TO REVIEW
        </button>
      </div>
    </Suspense>
  );
}

export function Step2Review({
  formData,
  onNext,
  hotelReviewData,
  hotelReviewData1,
  Category,
}) {
  const [accepted, setAccepted] = useState(false);
  useEffect(() => {
    const savedAccepted = localStorage.getItem("acceptTerms");
    if (savedAccepted !== null) {
      setAccepted(JSON.parse(savedAccepted));
    }
  }, []);
  const PanRequired = hotelReviewData?.hInfo?.ops?.[0]?.ipr;
  useEffect(() => {
    localStorage.setItem("acceptTerms", JSON.stringify(accepted));
  }, [accepted]);
  const handleNext = () => {
    if (!accepted) {
      message.warning(
        "Please accept the Terms & Conditions before proceeding."
      );
    } else {
      onNext();
    }
  };
  const handleBlock = async () => {
    try {
      const response = await hotelBooking({
        formData,
        hotelReviewData,
        isBlock: true,
      });
    } catch (error) {
      console.error("Error during block:", error.message);
    }
  };
  let freeCancellationDate = null;
  const policies = hotelReviewData?.hInfo?.ops?.[0]?.cnp?.pd;
  const hotelPassenger = hotelReviewData?.hInfo?.ops?.[0]?.ris || [];
  const passengerContact = hotelReviewData1;
  console.log("passengerContact", passengerContact);
  const blockRoom = hotelReviewData?.conditions?.isBA;
  if (Array.isArray(policies)) {
    const freeCancellation = policies.find((p) => p.am === 0);
    if (freeCancellation?.tdt) {
      const dateObj = new Date(freeCancellation.tdt);
      freeCancellationDate = dateObj.toLocaleDateString("en-GB");
    }
  }
  const rating = parseFloat(hotelReviewData?.hInfo?.rt) || 0;
  const filledStars = Math.round(rating);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="max-w-5xl mx-auto p-6 rounded-md text-sm space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-base font-semibold">
            {hotelReviewData?.hInfo?.name}{" "}
            <span className="text-star ml-2">
              {[...Array(filledStars)].map((_, index) => (
                <svg
                  key={`filled-${index}`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gold"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 .25l1.8 5.8h6.2l-5 3.6 1.9 5.8-5-3.6-5 3.6 1.9-5.8-5-3.6h6.2L8 .25z" />
                </svg>
              ))}
            </span>
          </h2>
          <p className="text-xs text-gray-600">
            {hotelReviewData?.hInfo?.ad?.adr && (
              <>{hotelReviewData.hInfo.ad.adr} </>
            )}
            <br />
            {hotelReviewData?.hInfo?.ad?.adr2 && (
              <>{hotelReviewData.hInfo.ad.adr2}, </>
            )}
            {hotelReviewData?.hInfo?.ad?.ctn && (
              <>{hotelReviewData.hInfo.ad.ctn}, </>
            )}
            {hotelReviewData?.hInfo?.ad?.cn && (
              <>{hotelReviewData.hInfo.ad.cn} - </>
            )}
            {hotelReviewData?.hInfo?.ad?.postalCode && (
              <> Postal code: {hotelReviewData.hInfo.ad.postalCode}</>
            )}
          </p>
          <br />
          <p className="text-blue-700 text-sm">
            <span className="text-blue-700 font-semibold">
              {freeCancellationDate && (
                <div className="text-xs mb-1">
                  Last Cancellation Date:
                  {freeCancellationDate}
                </div>
              )}
            </span>
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 bg-blue-50 p-4 rounded-md text-sm text-gray-800">
          <div>
            <strong className="block text-gray-900">Check In</strong>
            {Category === "abook" ? (
              <p className="text-gray-700">
                {hotelReviewData?.query?.checkinDate || "N/A"}
              </p>
            ) : (
              <p className="text-gray-700">
                {hotelReviewData?.query?.checkinDate || "N/A"}
                <br />
                {hotelReviewData?.hInfo?.checkInTime?.beginTime ||
                  "No Clock-in Time"}
              </p>
            )}
          </div>

          <div className="border-l-1 pl-4">
            <strong className="block text-gray-900">Check Out</strong>
            {Category === "abook" ? (
              <p className="text-gray-700">
                {hotelReviewData?.query?.checkoutDate || "N/A"}
              </p>
            ) : (
              <p className="text-gray-700">
                {hotelReviewData?.query?.checkoutDate || "N/A"}
                <br />
                {hotelReviewData?.hInfo?.checkOutTime?.beginTime ||
                  "No Clock-out Time"}
              </p>
            )}
          </div>

          <div className="border-l-1 pl-4">
            <strong className="block text-gray-900">Total Rooms</strong>
            <p className="text-gray-700 text-xs">
              {hotelReviewData?.query?.roomInfo?.length || 0}
            </p>
          </div>

          <div className="border-l-1 pl-4 md:col-span-2">
            <strong className="block text-gray-900 text-base">
              Total Guests
            </strong>
            <p className="text-gray-700 text-sm">
              {(() => {
                const rooms = hotelReviewData?.query?.roomInfo || [];
                const totalAdults = rooms.reduce(
                  (sum, r) => sum + (r.numberOfAdults || 0),
                  0
                );
                const totalChildren = rooms.reduce(
                  (sum, r) => sum + (r.numberOfChild || 0),
                  0
                );
                return `${totalAdults} Adults, ${totalChildren} Children`;
              })()}
            </p>
          </div>

          <div className="border-l-1 pl-4">
            <strong className="block text-gray-900">Total Nights</strong>
            <p className="text-gray-700">
              {(() => {
                const checkin = hotelReviewData?.query?.checkinDate;
                const checkout = hotelReviewData?.query?.checkoutDate;
                if (checkin && checkout) {
                  const nights = dayjs(checkout).diff(dayjs(checkin), "day");
                  return `${nights} Night${nights > 1 ? "s" : ""}`;
                }
                return "N/A";
              })()}
            </p>
          </div>
        </div>
        <h3 className="font-semibold text-base">Guest Details:</h3>
        {Category !== "abook"
          ? Object.values(formData.guests || {}).map((guest, roomIndex) => (
              <div key={roomIndex} className="border-b pb-4">
                <h4 className="font-bold text-sm">
                  <div>
                    <p>
                      {hotelReviewData?.hInfo?.ops?.[0]?.ris?.[0]?.rc} -{" "}
                      {hotelReviewData?.hInfo?.ops?.[0]?.ris?.[0]?.mb}
                      <span className="text-gray-500">
                        {" "}
                        ({guest.extraGuests?.length + 1}{" "}
                        {guest.extraGuests?.length + 1 === 1
                          ? "Guest"
                          : "Guests"}
                        )
                      </span>
                    </p>
                  </div>
                </h4>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    {guest.title} {guest.firstName} {guest.lastName}
                  </p>
                  {guest.extraGuests?.map((extraGuest, index) => (
                    <div key={index}>
                      <p className="text-gray-700 text-sm">
                        {extraGuest.title} {extraGuest.firstName}{" "}
                        {extraGuest.lastName}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          : hotelPassenger?.map((room, roomIndex) => (
              <div key={roomIndex} className="border-b pb-4 space-y-2">
                <p className="text-gray-800 font-bold">
                  {room?.rc} <span className="text-xs">( {room?.mb})</span>
                </p>

                <p className="text-gray-700 text-sm">
                  {room?.ti?.map((passenger, passengerIndex) => (
                    <>
                      {passenger?.ti}
                      {"."}
                      {passenger?.fN} {passenger?.lN}
                      {passengerIndex < room?.ti?.length - 1 && ", "}
                    </>
                  ))}
                </p>
              </div>
            ))}

        {Category !== "abook" ? (
          formData.specialRequest?.trim() ? (
            <div className="mt-4">
              <h3 className="font-semibold text-base">Special request(s)</h3>
              <p className="text-sm text-gray-700 mt-1">
                {formData.specialRequest}
              </p>
            </div>
          ) : null
        ) : Array.isArray(hotelPassenger) &&
          hotelPassenger.length > 0 &&
          hotelPassenger[0]?.ssr?.length > 0 ? (
          <div className="mt-4">
            <h3 className="font-semibold text-base">Special request(s)</h3>
            {hotelPassenger[0]?.ssr.map((item, index) => (
              <p key={index} className="text-sm text-gray-700 mt-1">
                {item.rm?.trim() && item.rm}{" "}
              </p>
            ))}
          </div>
        ) : null}

        {Category !== "abook" ? (
          formData.email?.trim() ? (
            <>
              <h3 className="font-semibold text-base">Contact Details</h3>
              <p>Email: {formData.email}</p>
              <p>
                Mobile: {formData.countryCode} {formData.mobile}
              </p>
            </>
          ) : null
        ) : passengerContact?.emails?.length > 0 ? (
          <div className="mt-4">
            <h3 className="font-semibold text-base pb-4">Contact Details</h3>
            {passengerContact.emails.map((email, index) => (
              <div key={index}>
                <p className="pb-3">Email: {email}</p>
                <p>
                  Mobile: {passengerContact.code[0]}{" "}
                  {passengerContact.contacts[index]}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        <div className="border-t pt-4">
          <h3 className="font-semibold text-base mb-2">Cancellation Policy:</h3>
          <table className="w-full border text-center text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Cancellation on or After</th>
                <th className="border p-2">Cancellation on or Before</th>
                <th className="border p-2">Cancellation Charges/Comments</th>
              </tr>
            </thead>
            <tbody>
              {(hotelReviewData?.hInfo?.ops?.[0]?.cnp?.pd || []).map(
                (item, idx) => (
                  <tr key={idx}>
                    <td className="border p-2">
                      {dayjs(item.fdt).format("DD-MM-YYYY")}
                    </td>
                    <td className="border p-2">
                      {dayjs(item.tdt).format("DD-MM-YYYY")}
                    </td>
                    <td className="border p-2">₹{item.am.toFixed(2)}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <ul className="text-xs text-gray-600 mt-2">
            <li>
              * Each booking is applicable for ₹20 per room/night non-refundable
              service fee.
            </li>
            <li>
              * No Show will attract full cancellation charge unless otherwise
              specified.
            </li>
            <li>
              * Early checkout will attract full cancellation charge unless
              otherwise specified.
            </li>
            <li className="text-red-600">* Taxes & fees are non-refundable.</li>
          </ul>
        </div>
        <div>
          {/* <h3 className="font-semibold text-base mb-2">Booking Notes:</h3> */}
          {Array.isArray(hotelReviewData?.hInfo?.inst) &&
            hotelReviewData.hInfo.inst.length > 0 && (
              <div>
                <h3 className="font-semibold text-base mb-2">Booking Notes:</h3>
                {hotelReviewData.hInfo.inst.map((note, idx) => {
                  let parsedMsg;
                  try {
                    parsedMsg = JSON.parse(note.msg);
                  } catch {
                    parsedMsg = { raw: note.msg };
                  }

                  const noteContent =
                    typeof parsedMsg === "object"
                      ? Object.values(parsedMsg).join("").trim()
                      : parsedMsg.raw?.trim();

                  // Skip empty messages
                  if (!noteContent) return null;

                  return (
                    <div key={idx} className="mb-4">
                      <strong className="text-sm text-dark-800 block mb-1">
                        {note.type
                          .replace(/_/g, " ")
                          .toLowerCase()
                          .replace(/^\w/, (c) => c.toUpperCase())}
                      </strong>

                      {typeof parsedMsg === "object" ? (
                        <ul className="text-sm text-grey-700 space-y-1">
                          {Object.entries(parsedMsg).map(([key, value]) => (
                            <li className="text-xs" key={key}>
                              <span className="text-xs">
                                {key
                                  .replace(/_/g, " ")
                                  .replace(/\b\w/g, (char) =>
                                    char.toUpperCase()
                                  )}
                                :
                              </span>{" "}
                              <span className="text-grey-700">{value}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-700">{parsedMsg.raw}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
        </div>
        <div className="border-t pt-4">
          <h3 className="font-semibold text-base mb-2">
            General Terms & Conditions:
          </h3>
          <ul className="text-xs text-gray-700 list-decimal ml-6 space-y-1">
            <li>
              Each country/state may have its own set of COVID-19 guidelines and
              restrictions. Please check with the hotel or visit the
              country’s/state's website for the same.
            </li>
            <li>
              Your booking is confirmed. However, your name will be listed in
              the hotel’s reservation system closer to your arrival date.
            </li>
            <li>Guest Photo ID must be presented at the time of check-in.</li>
            <li>
              Credit card or cash deposit may be required for extra services at
              the time of check-in.
            </li>
            <li>
              All extra charges will be borne by the guest directly prior to
              departure.
            </li>
            <li>
              Extra-person and/or Extra-bed charges may apply and vary depending
              on property policy.
            </li>
            <li>
              In case of the guest arrival delayed or postponed due to any
              unforeseen occurrences, additional charges will be borne by the
              guest.
            </li>
            <li>
              In case of incorrect residency and nationality chosen by the user
              at the time of booking, additional charges may be applicable which
              will be borne by the guest and paid to the hotel at the time of
              check-in/check-out.
            </li>
            <li>
              Any special requests are all subject to availability at the time
              of check-in and are not guaranteed at the time of booking (bed
              type, smoking room, early check-in, late check-out etc.).
            </li>
            <li>
              Full cancellation charges are applicable on early check-out unless
              otherwise specified.
            </li>
            <li>
              Hotels do not permit unmarried or unrelated couples and it is at
              the hotel management’s discretion to allow or cancel the booking.
              In such case no refund is applicable if the hotel disallows
              check-in.
            </li>
            <li>
              City tax and resort fee (if any) are to be paid directly to the
              hotel.
            </li>
            <li>
              If your booking offers complimentary car transfer you need to
              inform the hotel of your travel details 24 hours prior to
              check-in.
            </li>
            <li>
              As per RBI guidelines: in case of foreign nationals, it is
              mandatory to submit a passport copy of the guest. Please send a
              scanned copy of the guest's passport to us. Failure to comply may
              result in the cancellation of the booking without notice.
            </li>
            <li>
              Additional GST Payment (if any) to be paid to the hotel directly
              by the guest.
            </li>
          </ul>
          {Category === "bbook" ? (
            <div className="flex items-center space-x-2 mt-4">
              <input
                type="checkbox"
                id="acceptTerms"
                className="w-3 h-3 border border-gray-400 rounded"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />

              <label for="acceptTerms" className="mb-0 text-sm text-gray-700">
                Accept Terms & Conditions
              </label>
            </div>
          ) : null}
        </div>
        {Category === "bbook" && (
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-4">
              {blockRoom && PanRequired === false && (
                <button className="book-now-btn" onClick={handleBlock}>
                  BLOCK
                </button>
              )}
              <button
                disabled={!accepted}
                className={`book-now-btn ${
                  accepted
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={handleNext}
              >
                PROCEED TO PAY
              </button>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
}

export function Step3PersonalDocuments({
  formData,
  setFormData,
  hotelReviewData,
  onNext,
}) {
  const [samePANForAll, setSamePANForAll] = useState(false);
  const [guardianPANs, setGuardianPANs] = useState({});
  const [individualPANs, setIndividualPANs] = useState({});
  const [samePANValue, setSamePANValue] = useState("");
  const [guardianMode, setGuardianMode] = useState({});
  const [selectedTCS, setSelectedTCS] = useState(null);
  const blockRoom = hotelReviewData?.conditions?.isBA;
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("personalDocumentsData"));
    if (savedData) {
      setSamePANForAll(savedData.samePANForAll || false);
      setSamePANValue(savedData.samePANValue || "");
      setGuardianPANs(savedData.guardianPANs || {});
      setIndividualPANs(savedData.individualPANs || {});
      setGuardianMode(savedData.guardianMode || {});
      setSelectedTCS(savedData.selectedTCS || null);
    }
    const initialGuardian = {};
    const initialPANs = {};
    hotelReviewData?.query?.roomInfo?.forEach((room, rIdx) => {
      initialGuardian[rIdx] = false;
      if (Array.isArray(room?.guests)) {
        room.guests.forEach((_, gIdx) => {
          initialPANs[`${rIdx}-${gIdx}`] = "";
        });
      }
    });
    setGuardianMode(initialGuardian);
    setIndividualPANs(initialPANs);
  }, [hotelReviewData]);
  useEffect(() => {
    const formState = {
      samePANForAll,
      samePANValue,
      guardianPANs,
      individualPANs,
      guardianMode,
      selectedTCS,
    };
    localStorage.setItem("personalDocumentsData", JSON.stringify(formState));
  }, [
    samePANForAll,
    samePANValue,
    guardianPANs,
    individualPANs,
    guardianMode,
    selectedTCS,
  ]);

  const handleGuardianToggle = (roomIndex, checked) => {
    setGuardianMode((prev) => ({ ...prev, [roomIndex]: checked }));
  };

  const handlePANChange = (roomIdx, guestIdx, value) => {
    setIndividualPANs((prev) => ({
      ...prev,
      [`${roomIdx}-${guestIdx}`]: value.toUpperCase(),
    }));
  };
  const handleTCSChange = (e) => {
    setSelectedTCS(e.target.value);
  };

  const isAllValid = () => {
    if (samePANForAll) return panRegex.test(samePANValue);

    for (const [roomIdx, useGuardian] of Object.entries(guardianMode)) {
      if (useGuardian) {
        const guardian = guardianPANs[roomIdx];
        if (
          !guardian ||
          !guardian.first ||
          !guardian.last ||
          !panRegex.test(guardian.pan)
        )
          return false;
      } else {
        const guests =
          hotelReviewData?.query?.roomInfo?.[roomIdx]?.guests || [];
        for (let g = 0; g < guests.length; g++) {
          const val = individualPANs[`${roomIdx}-${g}`];
          if (!panRegex.test(val)) return false;
        }
      }
    }
    if (selectedTCS === null) {
      return false;
    }

    return true;
  };

  const handleProceed = () => {
    if (samePANForAll && selectedTCS === null) {
      message.warning("Please select a TCS declaration before proceeding.");
      return false;
    }
    if (!isAllValid()) {
      if (selectedTCS === null) {
        message.warning("Please select a TCS declaration before proceeding.");
      } else {
        message.error("Please enter valid PAN details before proceeding.");
      }
      return;
    }
    const finalData = {};
    if (samePANForAll) {
      finalData.mode = "same";
      finalData.pan = samePANValue;
    } else {
      finalData.mode = "custom";
      finalData.rooms = hotelReviewData.query.roomInfo.map((room, rIdx) => {
        if (guardianMode[rIdx]) {
          return {
            useGuardian: true,
            guardian: guardianPANs[rIdx],
          };
        } else {
          return {
            useGuardian: false,
            guests: (room?.guests || []).map((_, gIdx) => ({
              pan: individualPANs[`${rIdx}-${gIdx}`],
            })),
          };
        }
      });
    }
    finalData.tcsDeclaration = selectedTCS;
    setFormData((prev) => ({ ...prev, panInfo: finalData }));
    onNext();
  };

  const handleBlock = async () => {
    const updatedFormData = {
      panInfo: samePANForAll
        ? { mode: "same", pan: samePANValue } // Add the samePANValue if samePANForAll is selected
        : formData?.panInfo, // Else retain the custom PAN data from formData
    };

    try {
      const response = await hotelBooking({
        formData,
        updatedFormData, // Send updated formData with PAN details
        hotelReviewData,
        isBlock: true, // Indicating it's a block request
      });
      localStorage.removeItem("formData"); // Clean up localStorage
      window.location.href = `/hotel-listing/stepper/booking-details/?bookingId=${hotelReviewData?.bookingId}`; // Redirect to the booking details page
    } catch (error) {
      console.error("Error during block:", error.message);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h2 className="text-md font-bold">
          Personal Documents{" "}
          <span className="text-xs text-red-500 mb-4">
            {" "}
            Below documents are mandatory for completing this booking
          </span>
        </h2>
        <div className="flex items-center mb-6">
          <Checkbox
            checked={samePANForAll}
            onChange={(e) => setSamePANForAll(e.target.checked)}
          >
            Same PAN for All Guest
          </Checkbox>
        </div>
        {!samePANForAll ? (
          hotelReviewData?.query?.roomInfo?.map((room, rIdx) => {
            const leadGuest = formData?.guests?.[rIdx];
            const extraGuests = leadGuest?.extraGuests || [];

            return (
              <div key={`room-${rIdx}`} className="mb-6 border-t pt-4">
                <div className="flex items-center mb-2">
                  <Checkbox
                    checked={guardianMode[rIdx]}
                    onChange={(e) =>
                      handleGuardianToggle(rIdx, e.target.checked)
                    }
                  >
                    Room {rIdx + 1} - Use Only Guardian PAN
                  </Checkbox>
                </div>

                {guardianMode[rIdx] ? (
                  <div className="flex gap-2 mb-2">
                    <Input
                      className="w-60 stepper_input"
                      placeholder="First Name"
                      value={guardianPANs[rIdx]?.first || ""}
                      onChange={(e) =>
                        setGuardianPANs((prev) => ({
                          ...prev,
                          [rIdx]: {
                            ...prev[rIdx],
                            first: e.target.value,
                          },
                        }))
                      }
                    />
                    <Input
                      className="w-60 stepper_input"
                      placeholder="Last Name"
                      value={guardianPANs[rIdx]?.last || ""}
                      onChange={(e) =>
                        setGuardianPANs((prev) => ({
                          ...prev,
                          [rIdx]: {
                            ...prev[rIdx],
                            last: e.target.value,
                          },
                        }))
                      }
                    />
                    <Input
                      className="w-60 stepper_input"
                      placeholder="PAN Number"
                      value={guardianPANs[rIdx]?.pan || ""}
                      onChange={(e) =>
                        setGuardianPANs((prev) => ({
                          ...prev,
                          [rIdx]: {
                            ...prev[rIdx],
                            pan: e.target.value.toUpperCase(),
                          },
                        }))
                      }
                    />
                  </div>
                ) : (
                  <>
                    {[leadGuest, ...extraGuests].map((guest, gIdx) => (
                      <div key={`guest-${rIdx}-${gIdx}`} className="mb-2">
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          {`${guest?.firstName || ""} ${
                            guest?.lastName || ""
                          }`.trim()}
                        </p>
                        <Input
                          className="w-60 stepper_input"
                          placeholder="Enter PAN"
                          value={individualPANs[`${rIdx}-${gIdx}`] || ""}
                          onChange={(e) =>
                            handlePANChange(rIdx, gIdx, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex gap-2 mb-4">
            <Input
              className="w-60 stepper_input"
              placeholder="Enter PAN"
              value={samePANValue}
              onChange={(e) => setSamePANValue(e.target.value.toUpperCase())}
            />
          </div>
        )}

        <p className="text-xs text-gray-500 mb-4">
          Note: Please enter valid PAN linked with Aadhar. If PAN not exists,
          click on “Parent/Guardian PAN” and provide details.
        </p>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">TCS Declaration</h3>
          <div>
            {" "}
            <Radio.Group onChange={handleTCSChange} value={selectedTCS}>
              <Radio className="tcs-radio" value="travel-products">
                We are purchasing these travel products from Tripjack to be sold
                to end customers as part of “Overseas Tour Program Package” and
                confirm that we will collect / have collected TCS at applicable
                rates from each traveller in accordance with Section 206C(1G)(b)
                of the Income Tax Act, 1961. I am accepting the attached
                declaration (link to the declaration)
              </Radio>
              <Radio className="tcs-radio" value="standalone-products">
                We are purchasing these travel products from Tripjack to be sold
                to end customers as standalone products.I am accepting the
                attached declaration (link to the declaration). The total
                foreign remittances made by the end customers during the current
                financial year under the Liberalised Remittance Scheme of
                Reserve Bank of India (including value of remittance intended to
                be made for these travel products) (“TOTAL LRS REMITTANCE
                VALUE”) is less than the threshold of INR 7,00,000.
              </Radio>
            </Radio.Group>
          </div>
          <br />
          We hereby confirm that the above information is correct and validated
          on the basis of documents / declarations provided by the end
          customers. We further confirm that we have read and understood the
          detailed terms and conditions w.r.t the TCS regulations under Section
          206C(1G) of the Income Tax Act, 1961
        </div>
        {/* {Category === "bbook" && ( */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-4">
            {blockRoom && (
              <button className="book-now-btn" onClick={handleBlock}>
                BLOCK
              </button>
            )}
            <button
              disabled={!isAllValid()}
              onClick={handleProceed}
              className="rounded-none book-now-btn"
            >
              PROCEED TO PAY
            </button>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export function Step4Payment({
  formData,
  hotelReviewData,
  amount,
  bookingId,
  onConfirmPayment,
}) {
  const [showModal, setShowModal] = useState(false);
  const { totalBaseFare, totalTax } = useFareBreakdown(hotelReviewData);

  const handlePayClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirm = async () => {
    setShowModal(false);
    try {
      const result = await hotelBooking({ formData, hotelReviewData });
      onConfirmPayment(bookingId);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    }
  };
  return (
    <div className="max-w-5xl mx-auto gap-6 p-6 text-sm relative">
      <div className="p-4">
        <h3 className="font-lightbold mb-2">Deposit</h3>
        <div className="flex p-6">
          <div className="mb-6">
            <div className="text-orange-800 px-4 py-3 text-sm">
              <p>
                <strong>Please note:</strong> You may be redirected to a bank
                page to complete your transaction. By making this booking, you
                agree to our
                <a href="#" className="text-blue-600 underline">
                  Terms of Use
                </a>
                and
                <a href="#" className="text-blue-600 underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>

            <div className="mt-9 flex justify-center">
              <button
                className="book-now-btn bg-orange-500 hover:bg-orange-600 text-white"
                onClick={handlePayClick}
              >
                PAY NOW ₹{(totalBaseFare + totalTax).toFixed(2)}
              </button>
              {/* <span>₹{(totalBaseFare + totalTax).toFixed(2)}</span> */}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
            <h2 className="text-center text-lg font-bold text-orange-600 mb-4">
              CONFIRM TRANSACTION
            </h2>
            <p className="text-center mb-4">
              You have choosen to make the following payment. Please confirm to
              proceed.
            </p>
            <p className="text-center text-xl font-semibold mb-6">
              ₹{(totalBaseFare + totalTax).toFixed(2)}
            </p>

            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={handleCloseModal}
              >
                BACK
              </button>
              <button
                className="book-now-btn px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                onClick={handleConfirm}
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function useFareBreakdown(hotelReviewData) {
  const searchParams = useSearchParams();
  const oid = searchParams.get("oid");

  const { totalBaseFare, totalTax } = useMemo(() => {
    if (!hotelReviewData || !oid) return { totalBaseFare: 0, totalTax: 0 };

    const selectedOption = hotelReviewData?.hInfo?.ops?.find(
      (op) => op.id === oid
    );

    if (!selectedOption) return { totalBaseFare: 0, totalTax: 0 };

    const { BF, TAF } = selectedOption.ris.reduce(
      (acc, item) => {
        const tfcs = item.tfcs || {};
        acc.BF += tfcs.BF || 0;
        acc.TAF += tfcs.TAF || 0;
        return acc;
      },
      { BF: 0, TAF: 0 }
    );

    return { totalBaseFare: BF, totalTax: TAF };
  }, [hotelReviewData, oid]);

  return { totalBaseFare, totalTax };
}

export function FareAmount({ hotelReviewData, Category }) {
  const { totalBaseFare, totalTax } = useFareBreakdown(hotelReviewData);
  const hotelPassenger = hotelReviewData?.hInfo?.ops?.[0]?.ris || [];
  const totalBaseFareSum = hotelPassenger.reduce((sum, room) => {
    return sum + (room.tfcs?.BF || 0);
  }, 0);

  const totalTaxSum = hotelPassenger.reduce((sum, room) => {
    return sum + (room.tfcs?.TAF || 0);
  }, 0);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const toggleDetails = () => {
    setIsDetailsVisible((prevState) => !prevState);
  };

  console.log(hotelPassenger, "hotelPassenger");

  return (
    <>
      {Category !== "abook" ? (
        <>
          <h3 className="font-semibold text-base text-gray-600">
            FARE SUMMARY
          </h3>
          <div className="flex justify-between border-b pb-2">
            <span>Base Fare</span>
            <span>₹{totalBaseFare.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span>Taxes and Fees</span>
            <span>₹{totalTax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-gray-800">
            <span>Total Amount Payable</span>
            <span>₹{(totalBaseFare + totalTax).toFixed(2)}</span>
          </div>
        </>
      ) : (
        <div className="pt-2">
          <h3 className="font-semibold text-base text-black-600 pb-2">
            TOTAL FARE SUMMARY
          </h3>
          <div className="flex justify-between items-center pb-3">
            <div className="flex items-center space-x-2">
              <span>Base Fare</span>
              <button onClick={toggleDetails} className="text-black-500 pl-0">
                {isDetailsVisible ? (
                  <UpOutlined className="w-2 h-2 mt-2" />
                ) : (
                  <DownOutlined className="w-2 h-2 mt-2" />
                )}
              </button>
            </div>
            <span>₹{totalBaseFareSum.toFixed(2)}</span>
          </div>

          {isDetailsVisible &&
            hotelPassenger?.map((room, roomIndex) => (
              <div key={roomIndex} className="border-b pb-4 space-y-2">
                {room?.tfcs && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">{room?.rt}</span>

                      <span className="text-xs text-gray-400">
                        ₹
                        {((room.tfcs?.BF || 0) + (room.tfcs?.TAF || 0)).toFixed(
                          2
                        )}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}

          <div className="flex justify-between pb-4">
            <span>Taxes and Fees</span>
            <span>₹{totalTaxSum.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-gray-800">
            <span>Total Amount Payable</span>
            <span>₹{(totalBaseFareSum + totalTaxSum).toFixed(2)}</span>
          </div>
        </div>
      )}
    </>
  );
}
