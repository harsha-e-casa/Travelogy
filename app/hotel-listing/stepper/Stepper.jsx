"use client";
import dayjs from "dayjs";
import React, { useState, useRef, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { hotelBooking } from "../../../util/HotelApi";
import { Input, Checkbox, message, Radio, Select } from "antd";
import AppDateRange from "@/components/searchEngine/AppDateRage";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { postData } from "@/services/NetworkAdapter";
export function HotelReviewComponent({
  setHotelReviewData,
  setLoading,
  setError,
}) {
  const searchParams = useSearchParams();
  const hid = searchParams.get("hid");
  const oid = searchParams.get("oid");

  useEffect(() => {
    if (!hid || !oid) return;
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const reqData = {
          action: "hotelReview",
          requestData: { hotelId: hid, optionId: oid },
        };
        const response = await postData("travelogy/hotel/fetch-data", reqData);
        if (response.error) {
          throw new Error(response.error);
        }
        if (!cancelled) setHotelReviewData(response);
      } catch (error) {
        if (!cancelled) setError(error?.message || "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [hid, oid, setLoading, setError, setHotelReviewData]);

  return null;
}

export function Step1TravellerDetails({
  hotelReviewData,
  formData,
  setFormData,
  onNext,
}) {
  console.log("CheckinDate", hotelReviewData?.query?.checkinDate);
  const hasDigit = (s = "") => /\d/.test(s);
  const isValidFirstName = (v = "") =>
    v.trim() && v.trim().length >= 2 && !hasDigit(v);
  const isValidLastName = (v = "") =>
    v.trim() && v.trim().length >= 2 && !hasDigit(v);
  const isValidMobile = (v = "") => /^\d{10}$/.test(v);
  const isValidEmail = (v = "") => {
    if (!v) return false;
    const email = v.trim().toLowerCase();
    const regex = /^(?!\.)(?!.*\.\.)[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return regex.test(email);
  };
  const ipmValue = hotelReviewData?.hInfo?.ops?.[0]?.ipm;
  const isValidPassport = (v = "") => {
    if (!v) return false;
    const passport = v.trim().toUpperCase();

    return /^[A-HJ-NP-Z][0-9]{7}$/.test(passport);
  };
  const errorRefs = useRef({});
  const [errors, setErrors] = useState({});
  const rating = parseFloat(hotelReviewData?.hInfo?.rt) || 0;
  const filledStars = Math.round(rating);
  const [showConsentModal, setShowConsentModal] = useState(false);
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

  useEffect(() => {
    if (hotelReviewData?.query?.checkinDate) {
      const checkin = dayjs(hotelReviewData.query.checkinDate).format(
        "YYYY-MM-DD"
      );
      const today = dayjs().format("YYYY-MM-DD");
      if (checkin === today) {
        setShowConsentModal(true);
      }
    }
  }, [hotelReviewData?.query?.checkinDate]);

  const handleConsent = () => {
    setShowConsentModal(false);
    // handleNext();
  };
  // A. drop-in helper
  const clearFieldError = (key) =>
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const handleGuestInputChange = (roomIndex, field, rawValue) => {
    let value = rawValue;
    if (field === "firstName" || field === "lastName") {
      value = rawValue.replace(/\d/g, "").toUpperCase(); // no digits, uppercase
    }

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

    // clear specific errors when valid
    if (field === "firstName") {
      if (isValidFirstName(value)) clearFieldError(`firstName_r${roomIndex}`);
    }
    if (field === "lastName") {
      if (isValidLastName(value)) clearFieldError(`lastName_r${roomIndex}`);
    }
  };

  useEffect(() => {
    localStorage.setItem("bookingFormData", JSON.stringify(formData));
  }, [formData]);
  const leadGuest = formData.guests?.[0] || {};
  // const [passportNumber, setPassportNumber] = useState(
  //   formData?.guests?.[0]?.passportNumber || ""
  // );
  const [passportExpiryDate, setPassportExpiryDate] = useState(
    formData?.guests?.[0]?.passportExpiryDate || ""
  );

  const validateFields = () => {
    const newErrors = {};
    const rooms = hotelReviewData?.query?.roomInfo || [];
    const hasDigit = (s = "") => /\d/.test(s);

    // --- per-room: first & last name ---
    rooms.forEach((_, roomIndex) => {
      const g = formData?.guests?.[roomIndex] || {};
      const fn = (g.firstName || "").trim();
      const ln = (g.lastName || "").trim();

      if (!fn) {
        newErrors[`firstName_r${roomIndex}`] = "First name is required";
      } else if (hasDigit(fn)) {
        newErrors[`firstName_r${roomIndex}`] =
          "First name cannot contain numbers";
      } else if (fn.length < 2) {
        newErrors[`firstName_r${roomIndex}`] =
          "First name must be at least 2 characters";
      }

      if (!ln) {
        newErrors[`lastName_r${roomIndex}`] = "Last name is required";
      } else if (hasDigit(ln)) {
        newErrors[`lastName_r${roomIndex}`] =
          "Last name cannot contain numbers";
      } else if (ln.length < 2) {
        newErrors[`lastName_r${roomIndex}`] =
          "Last name must be at least 2 characters";
      }
    });

    // --- contact: mobile & email (global) ---
    if (!(formData?.mobile ?? "").trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!isValidMobile(formData.mobile)) {
      newErrors.mobile = "Mobile must be 10 digits";
    }

    if (!(formData?.email ?? "").trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // --- per-room: passport (only if ipmValue truthy) ---
    if (ipmValue) {
      rooms.forEach((_, roomIndex) => {
        const pn = (formData?.guests?.[roomIndex]?.passportNumber || "").trim();
        if (!pn) {
          newErrors[`passportNumber_r${roomIndex}`] =
            "Passport number is required";
        } else if (!isValidPassport(pn)) {
          newErrors[`passportNumber_r${roomIndex}`] =
            "Invalid passport number format";
        }
      });
    }

    setErrors(newErrors);

    // scroll to first error (expects refs like firstName_r0, lastName_r1, passportNumber_r2, mobile, email)
    if (Object.keys(newErrors).length > 0) {
      const firstKey = Object.keys(newErrors)[0];
      const el = errorRefs.current[firstKey];
      if (el?.scrollIntoView) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus?.();
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  const handleNext = () => {
    const isValid = validateFields();
    if (isValid) {
      onNext();
    }
  };
  // auto-clear errors when fields become valid
  useEffect(() => {
    const lead = formData?.guests?.[0] || {};
    setErrors((prev) => {
      const next = { ...prev };
      if (isValidFirstName(lead.firstName)) delete next.firstName;
      if (isValidLastName(lead.lastName)) delete next.lastName;
      if (isValidMobile((formData?.mobile ?? "").trim())) delete next.mobile;
      if (isValidEmail((formData?.email ?? "").trim())) delete next.email;
      const leadPassport = lead.passportNumber || "";
      if (!ipmValue || isValidPassport(leadPassport)) {
        delete next.passportNumber;
      }
      return next;
    });
  }, [
    formData?.guests?.[0]?.firstName,
    formData?.guests?.[0]?.lastName,
    formData?.mobile,
    formData?.email,
    formData?.guests?.[0]?.passportNumber,
    ipmValue,
  ]);

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

  const [openDatePicker, setOpenDatePicker] = useState(false); // Control datepicker visibility
  const [openPicker, setOpenPicker] = useState(null);
  const handleDateChange = (val, roomIndex) => {
    // supports Date | dayjs | { startDate, endDate }
    let picked = val?.startDate ?? val?.endDate ?? val ?? null; // choose what your UX wants
    const formatted = picked ? dayjs(picked).format("YYYY-MM-DD") : "";

    setFormData((prev) => ({
      ...prev,
      guests: {
        ...prev.guests,
        [roomIndex]: {
          ...(prev.guests?.[roomIndex] || {}),
          passportExpiryDate: formatted,
        },
      },
    }));

    setOpenPicker(null);
  };

  const handlePassportNumberChange = (e, roomIndex) => {
    let value = (e.target.value || "")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 8); // 1 letter + 7 digits

    setFormData((prev) => ({
      ...prev,
      guests: {
        ...prev.guests,
        [roomIndex]: {
          ...(prev.guests?.[roomIndex] || {}),
          passportNumber: value,
        },
      },
    }));

    if (!ipmValue || isValidPassport(value)) {
      clearFieldError(`passportNumber_r${roomIndex}`);
    }
  };
  useEffect(() => {
    const rooms = hotelReviewData?.query?.roomInfo || [];
    setErrors((prev) => {
      const next = { ...prev };
      rooms.forEach((_, i) => {
        const g = formData?.guests?.[i] || {};
        if (isValidFirstName(g.firstName)) delete next[`firstName_r${i}`];
        if (isValidLastName(g.lastName)) delete next[`lastName_r${i}`];
        if (!ipmValue || isValidPassport(g.passportNumber || "")) {
          delete next[`passportNumber_r${i}`];
        }
      });
      return next;
    });
  }, [formData?.guests, ipmValue, hotelReviewData?.query?.roomInfo]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="max-w-4xl p-6 rounded-md text-sm space-y-6">
        {showConsentModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full text-center">
              <h2 className="text-orange-600 font-bold text-lg mb-4">
                FOR YOUR CONSENT
              </h2>
              <p className="text-gray-700 mb-6 text-sm">
                Kindly note that this booking is selected for Same day Check-in
                and might take 3-4 hrs to get reflected in the hotel reservation
                system. Kindly approve the same to proceed with the reservation.
              </p>
              <button
                onClick={handleConsent}
                className="rounded-none book-now-btn"
              >
                CONTINUE
              </button>
            </div>
          </div>
        )}
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

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 bg-blue-50 p-4 rounded-md text-sm text-gray-800 booking_grid">
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
            <p className="text-gray-700 text-sm">
              {hotelReviewData?.query?.roomInfo?.length || 0}
            </p>
          </div>

          <div className="border-l-1 pl-4 ">
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
            <span className="text-xs text-red-600">(Enter the Lead Name)</span>
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
              <div key={roomIndex} className="space-y-4 border-b">
                <h4 className="font-semibold text-sm mt-6">
                  For Room {roomIndex + 1} - {roomDetails?.rc} (
                  {roomDetails?.mb}){" "}
                  <span className="text-gray-500 font-normal">
                    ({room.numberOfAdults} Adults {room.numberOfChild}{" "}
                    {room.numberOfChild === 1 ? "Child" : "Children"})
                  </span>
                </h4>
                <div className="stepper-guest-row">
                  <Select
                    // className="stepper_select-Mr"
                    value={formData.guests?.[roomIndex]?.title || "Mr"}
                    onChange={(value) =>
                      handleGuestInputChange(roomIndex, "title", value)
                    }
                    suffixIcon={
                      <DownOutlined style={{ marginBottom: "15px" }} />
                    }
                    style={{ width: 90, height: 60 }}
                  >
                    <Select.Option value="Mr">Mr</Select.Option>
                    <Select.Option value="Ms">Ms</Select.Option>
                    <Select.Option value="Mrs">Mrs</Select.Option>
                  </Select>
                  <div className="flex flex-col">
                    <input
                      ref={(el) =>
                        (errorRefs.current[`firstName_r${roomIndex}`] = el)
                      }
                      className="border p-2 rounded stepper_input"
                      placeholder="Lead Pax First Name"
                      value={formData.guests?.[roomIndex]?.firstName || ""}
                      onChange={(e) =>
                        handleGuestInputChange(
                          roomIndex,
                          "firstName",
                          e.target.value.toUpperCase()
                        )
                      }
                    />
                    <span className="text-red-500 text-xs mt-1">
                      {errors[`firstName_r${roomIndex}`] || ""}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <input
                      ref={(el) =>
                        (errorRefs.current[`lastName_r${roomIndex}`] = el)
                      }
                      className="border p-2 rounded stepper_input"
                      placeholder="Last Name"
                      value={formData.guests?.[roomIndex]?.lastName || ""}
                      onChange={(e) =>
                        handleGuestInputChange(
                          roomIndex,
                          "lastName",
                          e.target.value.toUpperCase()
                        )
                      }
                    />
                    <span className="text-red-500 text-xs mt-1">
                      {errors[`lastName_r${roomIndex}`] || ""}
                    </span>
                  </div>
                  {ipmValue && (
                    <>
                      <div className="flex flex-col">
                        <input
                          ref={(el) =>
                            (errorRefs.current[`passportNumber_r${roomIndex}`] =
                              el)
                          }
                          className="border p-2 rounded stepper_input"
                          placeholder="Passport Number"
                          value={
                            formData?.guests?.[roomIndex]?.passportNumber || ""
                          }
                          onChange={(e) =>
                            handlePassportNumberChange(e, roomIndex)
                          }
                        />

                        <span className="text-red-500 text-xs mt-1">
                          {errors[`passportNumber_r${roomIndex}`] || ""}
                        </span>
                      </div>

                      <div className="flex flex-col">
                        <input
                          className="border p-2 rounded stepper_input"
                          placeholder="Passport Expiry Date"
                          value={
                            formData?.guests?.[roomIndex]?.passportExpiryDate ||
                            ""
                          }
                          readOnly
                          onClick={() =>
                            setOpenPicker({
                              roomIndex,
                              field: "passportExpiry",
                            })
                          }
                        />

                        {openPicker?.field === "passportExpiry" &&
                          openPicker.roomIndex === roomIndex && (
                            <div className="relative">
                              <div className="absolute z-50">
                                <AppDateRange
                                  // close picker when done
                                  openToDateRange={() => setOpenPicker(null)}
                                  // unified handler (see C)
                                  setDatedep={(val) =>
                                    handleDateChange(val, roomIndex)
                                  }
                                />
                              </div>
                            </div>
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
                      <Select
                        // className={
                        //   guest.type === "children"
                        //     ? "stepper_select-Master"
                        //     : "stepper_select-Mr"
                        // }
                        value={guest.title}
                        onChange={(value) => {
                          const updated = [
                            ...formData.guests[roomIndex].extraGuests,
                          ];
                          updated[i].title = value;
                          updateExtraGuests(roomIndex, updated);
                        }}
                        suffixIcon={
                          <DownOutlined style={{ marginBottom: "15px" }} />
                        }
                        style={{ width: 90, height: 60 }}
                      >
                        {guest.type === "children" ? (
                          <>
                            <Select.Option value="Master">Master</Select.Option>
                            <Select.Option value="Miss">Miss</Select.Option>
                          </>
                        ) : (
                          <>
                            <Select.Option value="Mr">Mr</Select.Option>
                            <Select.Option value="Ms">Ms</Select.Option>
                            <Select.Option value="Mrs">Mrs</Select.Option>
                          </>
                        )}
                      </Select>

                      <input
                        className="border p-2 rounded stepper_input"
                        placeholder="First Name"
                        value={guest.firstName}
                        onChange={(e) => {
                          const updated = [
                            ...formData.guests[roomIndex].extraGuests,
                          ];
                          updated[i].firstName = e.target.value
                            .replace(/\d/g, "")
                            .toUpperCase();
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
                          updated[i].lastName = e.target.value
                            .replace(/\d/g, "")
                            .toUpperCase();
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
                      + Add Guest(s) Details(Optional)
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
            {/* <div className="flex flex-col"> */}
            <Select
              // className="form-field"
              value={formData.countryCode || "+91"}
              onChange={(value) =>
                setFormData({ ...formData, countryCode: value })
              }
              suffixIcon={<DownOutlined style={{ marginBottom: "15px" }} />}
              style={{ width: 90, height: 60 }}
            >
              <Select.Option value="+91">India (+91)</Select.Option>
              <Select.Option value="+1">USA (+1)</Select.Option>
              <Select.Option value="+44">UK (+44)</Select.Option>
            </Select>
            {/* </div> */}
            <div className="flex flex-col">
              {" "}
              <input
                ref={(el) => (errorRefs.current.mobile = el)}
                type="text"
                placeholder="Mobile No."
                className="border p-2 rounded form-field stepper_input"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
              />{" "}
              <span className="text-red-500 text-xs mt-1">
                {errors.mobile || ""}
              </span>
            </div>
            <div className="flex flex-col">
              {" "}
              <input
                ref={(el) => (errorRefs.current.email = el)}
                type="email"
                placeholder="Email ID"
                className="border p-2 rounded form-field stepper_input"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />{" "}
              <span className="text-red-500 text-xs mt-1">
                {errors.email || ""}
              </span>
            </div>
          </div>
          <div className="mobile-fare-summary mt-4 mb-4 screen-only p-0">
            <FareAmount hotelReviewData={hotelReviewData} Category={"bbook"} />
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
          CONTINUE
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
  const [loading, setLoading] = useState(false);
  const handleBlock = async () => {
    if (!accepted) {
      message.warning(
        "Please accept the Terms & Conditions before proceeding."
      );
      return;
    }

    try {
      setLoading(true);
      const response = await hotelBooking({
        formData,
        hotelReviewData,
        isBlock: true,
      });

      if (response.error) {
        throw new Error(response.error);
      }
      //work with ai for fixing this to next routing
      // setTimeout(() => {
      window.location.href = `/hotel-listing/stepper/booking-details/?bookingId=${hotelReviewData?.bookingId}`;
      // }, 100000);
    } catch (error) {
      console.error("Error during block:", error.message);
    } finally {
      setLoading(false);
    }
  };
  if (loading)
    return (
      <div className="col-12 d-flex justify-center py-5">
        <div className="loader"></div>
      </div>
    );
  let freeCancellationDate = null;
  const policies = hotelReviewData?.hInfo?.ops?.[0]?.cnp?.pd;
  const hotelPassenger = hotelReviewData?.hInfo?.ops?.[0]?.ris || [];
  const passengerContact = hotelReviewData1;
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
        <div className="border-b">
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
          <p className="text-md text-gray-600">
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
                <div className="text-sm mb-1 font-bold">
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
            <p className="text-gray-700 text-sm">
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
        <h3 className="font-bold text-base">Guest Details:</h3>
        {Category !== "abook"
          ? Object.values(formData.guests || {}).map((guest, roomIndex) => {
              // Filter valid guests (lead + extra guests with valid data)
              const allGuests = [guest, ...(guest.extraGuests || [])];
              const validGuests = allGuests.filter((g) => {
                const firstName = g?.firstName?.trim() || "";
                const lastName = g?.lastName?.trim() || "";
                return firstName && lastName;
              });

              // Only render if there are valid guests
              if (validGuests.length === 0) return null;

              // Get the actual room configuration for accurate guest count
              const roomConfig = hotelReviewData?.query?.roomInfo?.[roomIndex];
              const totalGuestCount =
                (roomConfig?.numberOfAdults || 0) +
                (roomConfig?.numberOfChild || 0);

              return (
                <div key={roomIndex} className="border-b pb-4">
                  <h4 className="font-bold text-md">
                    <div>
                      <p>
                        {hotelReviewData?.hInfo?.ops?.[0]?.ris?.[roomIndex]?.rc}{" "}
                        -{" "}
                        {hotelReviewData?.hInfo?.ops?.[0]?.ris?.[roomIndex]?.mb}
                        <span className="text-gray-500">
                          {" "}
                          ({totalGuestCount}{" "}
                          {totalGuestCount === 1 ? "Guest" : "Guests"})
                        </span>
                      </p>
                    </div>
                  </h4>
                  <div className="guest-details-table-wrapper desktop-only-table">
                    <table className="w-full mt-2 bg-sky-100 border border-gray-300 rounded-3">
                      <thead className="bg-blue-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                            No.
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                            Title
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                            First Name
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                            Last Name
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {validGuests.map((validGuest, index) => (
                          <tr key={index} className="border-b">
                            <td className="px-4 py-2 text-sm text-gray-800">
                              {index + 1}.
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-800">
                              {validGuest.title}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-800">
                              {validGuest.firstName}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-800">
                              {validGuest.lastName}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mobile-guest-details">
                    {validGuests.map((validGuest, index) => (
                      <div
                        key={index}
                        className="mobile-guest-row border-b py-2"
                      >
                        <span className="font-semibold mr-2">{index + 1}.</span>
                        <span>
                          {validGuest.title}. {validGuest.firstName}&nbsp;{" "}
                          {validGuest.lastName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          : hotelPassenger?.map((room, roomIndex) => {
              // Filter valid guests (excluding TBA and empty values)
              const validGuests =
                room?.ti?.filter((passenger) => {
                  const firstName = passenger?.fN?.trim() || "";
                  const lastName = passenger?.lN?.trim() || "";

                  // Filter out TBA, empty, or undefined values
                  return (
                    firstName &&
                    lastName &&
                    firstName.toUpperCase() !== "TBA" &&
                    lastName.toUpperCase() !== "TBA"
                  );
                }) || [];

              // Only render the room section if there are valid guests
              if (validGuests.length === 0) return null;

              // Total guest count includes all guests (for display purposes)
              const totalGuestCount = room?.ti?.length || 0;

              return (
                <div key={roomIndex} className="border-b space-y-2">
                  <h4 className="font-bold text-md">
                    <p>
                      {room?.rc} <span className="text-md">( {room?.mb})</span>
                      <span className="text-gray-500">
                        {" "}
                        ({totalGuestCount}{" "}
                        {totalGuestCount === 1 ? "Guest" : "Guests"})
                      </span>
                    </p>
                  </h4>

                  <div className="guest-details-table-wrapper desktop-only-table">
                    <table className="w-full mt-2 bg-sky-100 border border-gray-300 rounded-3">
                      <thead className="bg-blue-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                            No.
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                            Title
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                            First Name
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                            Last Name
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {validGuests.map((passenger, index) => (
                          <tr key={index} className="border-b">
                            <td className="px-4 py-2 text-sm text-gray-800">
                              {index + 1}.
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-800">
                              {passenger?.ti}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-800">
                              {passenger?.fN}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-800">
                              {passenger?.lN}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mobile-guest-details">
                    {validGuests.map((passenger, index) => (
                      <div
                        key={index}
                        className="mobile-guest-row border-b py-2"
                      >
                        <span className="font-semibold mr-2">{index + 1}.</span>
                        <span>
                          {passenger?.ti}. {passenger?.fN}&nbsp; {passenger?.lN}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

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
              <p key={index} className="text-md text-gray-700 mt-1">
                {item.rm?.trim() && item.rm}{" "}
              </p>
            ))}
          </div>
        ) : null}

        {Category !== "abook" ? (
          formData.email?.trim() ? (
            <div className="mt-4">
              <h3 className="font-bold text-base text-md mb-2">
                Contact Details
              </h3>
              <table className="w-full mt-2 bg-sky-100 border border-gray-300 rounded-3 desktop-only-table">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                      Email
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                      Mobile
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {formData.email}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {formData.countryCode} {formData.mobile}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mobile-contact-details mt-2">
                <div className="mobile-guest-row">
                  <span className="font-semibold mr-2">Email:</span>
                  <span>{formData.email}</span>
                </div>
                <div className="mobile-guest-row">
                  <span className="font-semibold mr-2">Mobile:</span>
                  <span>
                    {formData.countryCode} {formData.mobile}
                  </span>
                </div>
              </div>
            </div>
          ) : null
        ) : passengerContact?.emails?.length > 0 ? (
          <div className="mt-4">
            <h3 className="font-bold text-base text-md mb-2">
              Contact Details
            </h3>
            <table className="w-full mt-2 bg-sky-100 border border-gray-300 rounded-3 desktop-only-table">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Mobile
                  </th>
                </tr>
              </thead>
              <tbody>
                {passengerContact.emails.map((email, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2 text-sm text-gray-800">{email}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {passengerContact.code[0]}{" "}
                      {passengerContact.contacts[index]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mobile-contact-details mt-2">
              {passengerContact.emails.map((email, index) => (
                <div key={index}>
                  <div className="mobile-guest-row">
                    <span className="font-semibold mr-2">Email:</span>
                    <span>{email}</span>
                  </div>
                  <div className="mobile-guest-row">
                    <span className="font-semibold mr-2">Mobile:</span>
                    <span>
                      {passengerContact.code[0]}{" "}
                      {passengerContact.contacts[index]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mobile-fare-summary mt-40 mb-4 screen-only p-0">
          <FareAmount hotelReviewData={hotelReviewData} Category={Category} />
        </div>

        <div className="border-t pt-3">
          <h3 className="font-semibold text-base mb-2">Cancellation Policy:</h3>

          <table className="w-full border text-center text-sm">
            <thead className="bg-blue-50">
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

          <ul className="policy_content text-sm text-gray-600 mt-2">
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
                <h3 className="font-bold text-base mb-2">Booking Notes:</h3>
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
                      <strong className="text-md text-dark-800 block mb-1">
                        {note.type
                          .replace(/_/g, " ")
                          .toLowerCase()
                          .replace(/^\w/, (c) => c.toUpperCase())}
                      </strong>

                      {typeof parsedMsg === "object" ? (
                        <ul className="policy_content text-sm text-grey-700 space-y-1">
                          {Object.entries(parsedMsg).map(([key, value]) => (
                            <li className="text-sm" key={key}>
                              <span className="text-sm">
                                {key
                                  .replace(/_/g, " ")
                                  .replace(/\b\w/g, (char) =>
                                    char.toUpperCase()
                                  )}
                                :
                              </span>{" "}
                              <span className="text-sm text-grey-700">
                                {value}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-md text-gray-700">{parsedMsg.raw}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
        </div>
        <div className="border-t pt-3">
          <h3 className="font-semibold text-base mb-2">
            General Terms & Conditions:
          </h3>
          <ul className="policy_content text-sm text-gray-700 list-decimal ml-6 space-y-1">
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
          <div className="mt-2">
            <span className="text-sm">
              <a
                href={hotelReviewData?.hInfo?.tac?.sc?.[0]?.info}
                className="text-red-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {hotelReviewData?.hInfo?.tac?.sc?.[0]?.label}
              </a>
            </span>
            <br />
            <span className="text-sm">
              <a
                href={hotelReviewData?.hInfo?.tac?.sc?.[1]?.info}
                className="text-red-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {hotelReviewData?.hInfo?.tac?.sc?.[1]?.label}
              </a>
            </span>
          </div>
          {Category === "bbook" ? (
            <div className="flex items-center space-x-2 mt-4">
              <input
                type="checkbox"
                id="acceptTerms"
                className="w-3 h-3 border border-gray-400 rounded"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />

              <label
                htmlFor="acceptTerms"
                className="mb-0 text-sm text-gray-700"
              >
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
                type="button"
                // disabled={!accepted}
                className={`book-now-btn ${
                  accepted
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={handleNext}
              >
                CONTINUE
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
  // helper (top-level in component)
  const isMaster = (t) => !!t && /\bmaster\b/i.test(t);

  const [samePANForAll, setSamePANForAll] = useState(false);
  const [guardianPANs, setGuardianPANs] = useState({});
  const [individualPANs, setIndividualPANs] = useState({});
  const [samePANValue, setSamePANValue] = useState("");
  const [guardianMode, setGuardianMode] = useState({});
  const [selectedTCS, setSelectedTCS] = useState(null);
  const blockRoom = hotelReviewData?.conditions?.isBA;
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const [errors, setErrors] = useState({
    samePAN: "",
    tcs: "",
    individual: {},
    guardian: {},
  });
  const PanRequired = hotelReviewData?.hInfo?.ops?.[0]?.ipr;
  const PassportRequired = hotelReviewData?.hInfo?.ops?.[0]?.ipm;
  console.log("PanRequired", PanRequired);
  console.log("PassportRequired", PassportRequired);

  const isValidPAN = (v) => panRegex.test((v || "").trim());
  const getUiGuests = (roomIdx) => {
    const leadGuest = formData?.guests?.[roomIdx];
    const extraGuests = leadGuest?.extraGuests || [];
    return [leadGuest, ...extraGuests].filter(Boolean);
  };

  const samePANRef = useRef(null);
  const guardianRefs = useRef({});
  const individualRefs = useRef({});
  const tcsErrorRef = useRef(null);
  const validateAll = () => {
    const nextErrors = { samePAN: "", tcs: "", individual: {}, guardian: {} };
    let hasError = false;

    if (selectedTCS === null) {
      nextErrors.tcs = "Please select a TCS declaration.";
      hasError = true;
    }

    if (samePANForAll) {
      if (!isValidPAN(samePANValue)) {
        nextErrors.samePAN = "Enter a valid PAN (e.g., ABCDE1234F).";
        hasError = true;
      }
    } else {
      (hotelReviewData?.query?.roomInfo || []).forEach((room, rIdx) => {
        if (guardianMode[rIdx]) {
          const g = guardianPANs[rIdx] || {};
          const gErr = { first: "", last: "", pan: "" };
          if (!g.first?.trim()) {
            gErr.first = "First name is required.";
            hasError = true;
          }
          if (!g.last?.trim()) {
            gErr.last = "Last name is required.";
            hasError = true;
          }
          if (!isValidPAN(g.pan)) {
            gErr.pan = "Enter a valid PAN.";
            hasError = true;
          }
          nextErrors.guardian[rIdx] = gErr;
        } else {
          const guests = getUiGuests(rIdx);
          guests.forEach((guest, gIdx) => {
            const key = `${rIdx}-${gIdx}`;
            if (guest?.title?.toLowerCase().includes("master")) {
              if (nextErrors.individual[key]) delete nextErrors.individual[key];
              return;
            }
            if (!isValidPAN(individualPANs[key])) {
              nextErrors.individual[key] = "Enter a valid PAN.";
              hasError = true;
            }
          });
        }
      });
    }

    setErrors(nextErrors);
    return !hasError;
  };
  useEffect(() => {
    if (Object.values(errors).some((err) => err)) {
      const firstErrorField = Object.entries(errors).find(
        ([key, value]) => value
      );
      if (firstErrorField) {
        const [field, errorMessage] = firstErrorField;

        if (field === "samePAN" && samePANRef.current) {
          samePANRef.current.focus();
        } else if (
          field.startsWith("guardian") &&
          guardianRefs.current[field]
        ) {
          guardianRefs.current[field].focus();
        } else if (
          field.startsWith("individual") &&
          individualRefs.current[field]
        ) {
          individualRefs.current[field].focus();
        } else if (field === "tcs" && tcsErrorRef.current) {
          tcsErrorRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    }
  }, [errors]);
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
      // if (Array.isArray(room?.guests)) {
      //   room.guests.forEach((_, gIdx) => {
      //     initialPANs[`${rIdx}-${gIdx}`] = "";
      //   });
      // }
      const guests = getUiGuests(rIdx);
      guests.forEach((guest, gIdx) => {
        if (!isMaster(guest?.title)) {
          initialPANs[`${rIdx}-${gIdx}`] = "";
        }
      });
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
    const newValue = value.toUpperCase();
    const key = `${roomIdx}-${guestIdx}`;
    setIndividualPANs((prev) => ({ ...prev, [key]: newValue }));

    setErrors((prev) => {
      const updated = { ...prev, individual: { ...prev.individual } };
      if (isValidPAN(newValue)) {
        delete updated.individual[key]; // remove error
      } else {
        updated.individual[key] = "Enter a valid PAN.";
      }
      return updated;
    });
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
        const guests = getUiGuests(roomIdx);
        for (let g = 0; g < guests.length; g++) {
          const val = individualPANs[`${roomIdx}-${g}`];
          if (!panRegex.test((val || "").trim())) return false;
        }
      }
    }
    if (selectedTCS === null) {
      return false;
    }

    return true;
  };
  const handleProceed = () => {
    if (!validateAll()) {
      message.error("Please fix the highlighted errors.");
      return;
    }
    const isMaster = (t) => !!t && /\bmaster\b/i.test(t);

    const finalPanInfo = samePANForAll
      ? { mode: "same", pan: (samePANValue || "").toUpperCase().trim() }
      : {
          mode: "custom",
          rooms: (hotelReviewData?.query?.roomInfo || []).map(
            (room, rIdx) =>
              guardianMode[rIdx]
                ? {
                    useGuardian: true,
                    guardian: {
                      first: (guardianPANs[rIdx]?.first || "").trim(),
                      last: (guardianPANs[rIdx]?.last || "").trim(),
                      pan: (guardianPANs[rIdx]?.pan || "").toUpperCase().trim(),
                    },
                  }
                : {
                    useGuardian: false,
                    guests: getUiGuests(rIdx).map((guest, gIdx) => ({
                      pan: isMaster(guest?.title)
                        ? ""
                        : (individualPANs[`${rIdx}-${gIdx}`] || "")
                            .toUpperCase()
                            .trim(),
                    })),
                  }
            // : {
            //     useGuardian: false,
            //     guests: (room?.guests || []).map((_, gIdx) => ({
            //       pan: (individualPANs[`${rIdx}-${gIdx}`] || "")
            //         .toUpperCase()
            //         .trim(),
            //     })),
            //   }
          ),
        };

    const panInfo = { ...finalPanInfo, tcsDeclaration: selectedTCS };

    setFormData({ ...formData, panInfo });
    onNext();
  };

  const [loading, setLoading] = useState(false);
  const handleBlock = async () => {
    if (!validateAll()) {
      message.error("Please fix the highlighted errors.");
      return;
    }
    setLoading(true);
    const finalPanInfo = samePANForAll
      ? { mode: "same", pan: (samePANValue || "").toUpperCase().trim() }
      : {
          mode: "custom",
          rooms: (hotelReviewData?.query?.roomInfo || []).map((room, rIdx) =>
            guardianMode[rIdx]
              ? {
                  useGuardian: true,
                  guardian: {
                    first: (guardianPANs[rIdx]?.first || "").trim(),
                    last: (guardianPANs[rIdx]?.last || "").trim(),
                    pan: (guardianPANs[rIdx]?.pan || "").toUpperCase().trim(),
                  },
                }
              : {
                  useGuardian: false,
                  guests: (room?.guests || []).map((_, gIdx) => ({
                    pan: (individualPANs[`${rIdx}-${gIdx}`] || "")
                      .toUpperCase()
                      .trim(),
                  })),
                }
          ),
        };

    const panInfo = { ...finalPanInfo, tcsDeclaration: selectedTCS };

    try {
      await hotelBooking({
        formData: { ...formData, panInfo },
        hotelReviewData,
        isBlock: true,
      });
      setTimeout(() => {
        window.location.href = `/hotel-listing/stepper/booking-details/?bookingId=${hotelReviewData?.bookingId}`;
      }, 100000);
      // window.location.href = `/hotel-listing/stepper/booking-details/?bookingId=${hotelReviewData?.bookingId}`;
    } catch (error) {
      message.error("There was an error with the booking process.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="col-12 d-flex justify-center py-5">
        <div className="loader"></div>
      </div>
    );
  }
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
                    {/* First */}
                    <Input
                      className={`w-60 stepper_input ${
                        errors.guardian?.[rIdx]?.first ? "border-red-500" : ""
                      }`}
                      placeholder="First Name"
                      value={guardianPANs[rIdx]?.first || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^[A-Za-z\s]*$/.test(val)) {
                          setGuardianPANs((p) => ({
                            ...p,
                            [rIdx]: { ...p[rIdx], first: val },
                          }));

                          setErrors((prev) => {
                            const next = {
                              ...prev,
                              guardian: { ...prev.guardian },
                            };
                            const gErr = { ...(next.guardian[rIdx] || {}) };
                            gErr.first = val.trim()
                              ? ""
                              : "First name is required.";
                            next.guardian[rIdx] = gErr;
                            return next;
                          });
                        }
                      }}
                      ref={(el) => (guardianRefs.current[`first-${rIdx}`] = el)}
                    />
                    {errors.guardian?.[rIdx]?.first && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.guardian[rIdx].first}
                      </p>
                    )}

                    <Input
                      className={`w-60 stepper_input ${
                        errors.guardian?.[rIdx]?.last ? "border-red-500" : ""
                      }`}
                      placeholder="Last Name"
                      value={guardianPANs[rIdx]?.last || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^[A-Za-z\s]*$/.test(val)) {
                          setGuardianPANs((p) => ({
                            ...p,
                            [rIdx]: { ...p[rIdx], last: val },
                          }));

                          setErrors((prev) => {
                            const next = {
                              ...prev,
                              guardian: { ...prev.guardian },
                            };
                            const gErr = { ...(next.guardian[rIdx] || {}) };
                            gErr.last = val.trim()
                              ? ""
                              : "Last name is required.";
                            next.guardian[rIdx] = gErr;
                            return next;
                          });
                        }
                      }}
                      ref={(el) => (guardianRefs.current[`last-${rIdx}`] = el)}
                    />
                    {errors.guardian?.[rIdx]?.last && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.guardian[rIdx].last}
                      </p>
                    )}

                    {/* PAN */}
                    <Input
                      className={`w-60 stepper_input ${
                        errors.guardian?.[rIdx]?.pan ? "border-red-500" : ""
                      }`}
                      placeholder="PAN Number"
                      value={guardianPANs[rIdx]?.pan || ""}
                      onChange={(e) => {
                        const val = e.target.value.toUpperCase();

                        setGuardianPANs((p) => ({
                          ...p,
                          [rIdx]: {
                            ...p[rIdx],
                            pan: val,
                          },
                        }));

                        setErrors((prev) => {
                          const next = {
                            ...prev,
                            guardian: { ...prev.guardian },
                          };
                          const gErr = { ...(next.guardian[rIdx] || {}) };
                          if (
                            /^[A-Z]{5}[0-9]{4}[A-Z]$/.test((val || "").trim())
                          ) {
                            gErr.pan = "";
                          } else {
                            gErr.pan = "Enter a valid PAN.";
                          }
                          next.guardian[rIdx] = gErr;
                          return next;
                        });
                      }}
                      ref={(el) => (guardianRefs.current[`pan-${rIdx}`] = el)}
                    />
                    {errors.guardian?.[rIdx]?.pan && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.guardian[rIdx].pan}
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    {/* {[leadGuest, ...extraGuests].map((guest, gIdx) => (
                      <div key={`guest-${rIdx}-${gIdx}`} className="mb-2">
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          {`${guest?.title || ""}. ${
                            guest?.firstName || ""
                          } ${guest?.lastName || ""}`.trim()}
                        </p>
                        <Input
                          className={`w-60 stepper_input ${
                            errors.individual?.[`${rIdx}-${gIdx}`]
                              ? "border-red-500"
                              : ""
                          }`}
                          placeholder="Enter PAN Individual"
                          value={individualPANs[`${rIdx}-${gIdx}`] || ""}
                          onChange={(e) =>
                            handlePANChange(rIdx, gIdx, e.target.value)
                          }
                          ref={(el) =>
                            (individualRefs.current[`${rIdx}-${gIdx}`] = el)
                          }
                        />
                        {errors.individual?.[`${rIdx}-${gIdx}`] && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.individual[`${rIdx}-${gIdx}`]}
                          </p>
                        )}
                      </div>
                    ))} */}
                    {[leadGuest, ...extraGuests].map((guest, gIdx) => (
                      <div
                        key={`guest-${rIdx}-${gIdx}`}
                        className="flex items-center justify-between mb-3 space-x-3"
                      >
                        <p className="text-sm font-medium text-gray-700 w-2/6">
                          {`${guest?.title || ""}. ${guest?.firstName || ""} ${
                            guest?.lastName || ""
                          }`.trim()}
                        </p>

                        {!guest?.title?.toLowerCase().includes("master") && (
                          <div className="flex-1">
                            <Input
                              className={`w-full border-0 border-bottom_1 border-gray-300 rounded-none focus:ring-0 focus:border-blue-500 stepper_input ${
                                errors.individual?.[`${rIdx}-${gIdx}`]
                                  ? "border-red-500"
                                  : ""
                              }`}
                              placeholder="Enter PAN Individual"
                              value={individualPANs[`${rIdx}-${gIdx}`] || ""}
                              onChange={(e) =>
                                handlePANChange(rIdx, gIdx, e.target.value)
                              }
                              ref={(el) =>
                                (individualRefs.current[`${rIdx}-${gIdx}`] = el)
                              }
                            />
                            {errors.individual?.[`${rIdx}-${gIdx}`] && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors.individual[`${rIdx}-${gIdx}`]}
                              </p>
                            )}
                          </div>
                        )}
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
              className={`w-60 stepper_input ${
                errors.samePAN ? "border-red-500" : ""
              }`}
              placeholder="Enter PAN"
              value={samePANValue}
              onChange={(e) => {
                const val = e.target.value.toUpperCase();
                setSamePANValue(val);

                setErrors((prev) => {
                  const next = { ...prev };
                  if (/^[A-Z]{5}[0-9]{4}[A-Z]$/.test((val || "").trim())) {
                    next.samePAN = ""; // clear error immediately
                  } else {
                    next.samePAN = "Enter a valid PAN (e.g., ABCDE1234F).";
                  }
                  return next;
                });
              }}
              ref={samePANRef}
              maxLength={10}
            />
            {errors.samePAN && (
              <p className="text-xs text-red-500 mt-1">{errors.samePAN}</p>
            )}
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
                declaration{" "}
                <span>
                  <a
                    href="/assets/imgs/Standard_declaration_TCS.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    (link to the declaration)
                  </a>
                </span>
              </Radio>
              <Radio className="tcs-radio" value="standalone-products">
                We are purchasing these travel products from Tripjack to be sold
                to end customers as standalone products.I am accepting the
                attached declaration{" "}
                <span>
                  <a
                    href="/assets/imgs/Standard_declaration_TCS.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    (link to the declaration)
                  </a>
                </span>
                . The total foreign remittances made by the end customers during
                the current financial year under the Liberalised Remittance
                Scheme of Reserve Bank of India (including value of remittance
                intended to be made for these travel products) (“TOTAL LRS
                REMITTANCE VALUE”) is less than the threshold of INR 7,00,000.
              </Radio>
            </Radio.Group>
            {errors.tcs && (
              <p className="text-xs text-red-500 mt-2" ref={tcsErrorRef}>
                {errors.tcs}
              </p>
            )}
          </div>
          <br />
          We hereby confirm that the above information is correct and validated
          on the basis of documents / declarations provided by the end
          customers. We further confirm that we have read and understood the
          detailed terms and conditions w.r.t the TCS regulations under Section
          206C(1G) of the Income Tax Act, 1961
        </div>
        <div className="mobile-fare-summary mt-4 mb-4 screen-only p-0">
          <FareAmount hotelReviewData={hotelReviewData} Category={"bbook"} />
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
              // disabled={!isAllValid()}
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
  setError,
  bookingId,
  setCurrentStep,
  onConfirmPayment,
}) {
  const [showModal, setShowModal] = useState(false);
  const { totalBaseFare, totalTax } = useFareBreakdown(hotelReviewData);
  const [globalToast, setGlobalToast] = useState(null); // for a top toast/banner
  const [panError, setPanError] = useState(null);
  const handlePayClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // const handleConfirm = async () => {
  //   setShowModal(false);
  //   try {
  //     const result = await hotelBooking({formData, hotelReviewData});
  //     if (result?.error) {
  //       console.error("Booking error:", result.error);
  //       setError(result.error);
  //       return;
  //     }
  //     console.log("Booking success:", result);
  //     onConfirmPayment(bookingId);
  //     // setTimeout(() => {
  //     //   onConfirmPayment(bookingId);
  //     // }, 100000);
  //   } catch (error) {
  //     console.error("Booking failed:", error);
  //     setError(error.message || "Something went wrong");
  //   }
  // };

  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setShowModal(false);
    setLoading(true);
    try {
      const result = await hotelBooking({ formData, hotelReviewData });
      console.log("result: ", result);
      console.log("formdata", formData);
      setLoading(false);
      if (result?.error) {
        console.error("Booking error:", result.error);

        const errorMessage =
          typeof result.error === "string"
            ? result.error
            : JSON.stringify(result.error);

        setError(errorMessage);
        return;
      }
      console.log("Booking success:", result);
      setTimeout(() => {
        onConfirmPayment(bookingId);
      }, 1000);//time decreased to check the booking flow from 100000
    } catch (error) {
      setLoading(false);
      console.error("Booking failed:", error);
      setError(error?.message || "Something went wrong");
    }
  };
  if (loading) {
    return (
      <div className="col-12 d-flex justify-center py-5">
        <div className="loader"></div>
      </div>
    );
  }
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
              <div key={roomIndex} className="border-b space-y-2">
                {room?.tfcs && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">{room?.rt}</span>

                      <span className="text-xs text-gray-400">
                        ₹
                        {(room.tfcs?.BF || 0)
                          //  + (room.tfcs?.TAF || 0)
                          .toFixed(2)}
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
