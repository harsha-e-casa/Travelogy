"use client";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { fetchHotelReviewData } from "../../../util/HotelApi";

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
    if (hid && oid) {
      setLoading(true);
      fetchHotelReviewData(hid, oid)
        .then((data) => setHotelReviewData(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [hid, oid]);

  // if (error) {
  //   return <div className="text-red-500 text-center">{error}</div>;
  // }

  return null; // This component only handles fetching.
}

export function Step1TravellerDetails({
  formData,
  setFormData,
  onNext,
  hotelReviewData,
}) {
  const [errors, setErrors] = useState({});

  // console.log("Step1TravellerDetails Hotel Review Data:", hotelReviewData);
  useEffect(() => {
    localStorage.setItem("bookingFormData", JSON.stringify(formData));
  }, [formData]);
  const validateFields = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile must be 10 digits";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateFields()) {
      onNext();
    }
  };

  return (
    <div className="max-w-4xl p-6 rounded-md text-sm space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">
          {hotelReviewData?.hInfo?.name}
          <span className="text-orange-500">★★★☆☆</span>
        </h2>
        <p className="text-gray-600">
          {hotelReviewData?.hInfo?.ad?.adr}
          <br />
          {hotelReviewData?.hInfo?.ad?.ctn}, {hotelReviewData?.hInfo?.ad?.cn}.
          Psotal code: {hotelReviewData?.hInfo?.ad?.postalCode}
        </p>
        <p className="text-gray-500 text-sm">
          Last Cancellation Date:
          <span className="text-blue-700 font-semibold">
            <strong>Doubt</strong>
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
        <h6> Guest Details</h6>
        {hotelReviewData?.query?.roomInfo?.map((room, roomIndex) => {
          const roomDetails =
            hotelReviewData?.hInfo?.ops?.[0]?.ris?.[roomIndex];
          return (
            <div key={roomIndex} className="space-y-3">
              {/* <p className="font-semibold text-sm mt-6">
                Room {roomIndex + 1}: {roomDetails?.rc} ({roomDetails?.mb}) (
                {room.numberOfAdults} Adults {room.numberOfChild}{" "}
                {room.numberOfChild === 1 ? "Child" : "Children"})
              </p> */}
              <h4 className="font-semibold text-sm mt-6">
                For Room {roomIndex + 1} - {roomDetails?.rc} ({roomDetails?.mb}){" "}
                <span className="text-gray-500 font-normal">
                  ({room.numberOfAdults} Adults {room.numberOfChild}{" "}
                  {room.numberOfChild === 1 ? "Child" : "Children"})
                </span>
              </h4>

              {[...Array(room.numberOfAdults)].map((_, adultIndex) => (
                <div
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  key={`room-${roomIndex}-adult-${adultIndex}`}
                >
                  <div className="flex flex-col">
                    <select
                      className="border p-2 rounded form-field"
                      value={
                        formData[`room${roomIndex}-adult${adultIndex}-title`] ||
                        ""
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [`room${roomIndex}-adult${adultIndex}-title`]:
                            e.target.value,
                        })
                      }
                    >
                      <option>Mr</option>
                      <option>Ms</option>
                      <option>Mrs</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      className="border p-2 rounded form-field"
                      placeholder={
                        adultIndex === 0 ? "Lead Pax First Name" : "First Name"
                      }
                      value={
                        formData[`room${roomIndex}-adult${adultIndex}-first`] ||
                        ""
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [`room${roomIndex}-adult${adultIndex}-first`]:
                            e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      className="border p-2 rounded form-field"
                      placeholder="Last Name"
                      value={
                        formData[`room${roomIndex}-adult${adultIndex}-last`] ||
                        ""
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [`room${roomIndex}-adult${adultIndex}-last`]:
                            e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              ))}

              {/* Children */}
              {[...Array(room.numberOfChild)].map((_, childIndex) => (
                <div
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  key={`room-${roomIndex}-child-${childIndex}`}
                >
                  <div className="flex flex-col">
                    <select
                      className="border p-2 rounded form-field"
                      value={
                        formData[`room${roomIndex}-child${childIndex}-title`] ||
                        "Master"
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [`room${roomIndex}-child${childIndex}-title`]:
                            e.target.value,
                        })
                      }
                    >
                      <option>Master</option>
                      <option>Miss</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      className="border p-2 rounded form-field"
                      placeholder="First Name"
                      value={
                        formData[`room${roomIndex}-child${childIndex}-first`] ||
                        ""
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [`room${roomIndex}-child${childIndex}-first`]:
                            e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      className="border p-2 rounded form-field"
                      placeholder="Last Name"
                      value={
                        formData[`room${roomIndex}-child${childIndex}-last`] ||
                        ""
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [`room${roomIndex}-child${childIndex}-last`]:
                            e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </>
      <div className="space-y-2">
        <h3 className="font-semibold text-base">Contact Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <select
              className="border p-2 rounded form-field"
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
              className="border p-2 rounded form-field"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
            />{" "}
            {errors.mobile && (
              <span className="form-error">{errors.mobile}</span>
            )}
          </div>
          <div className="flex flex-col">
            {" "}
            <input
              type="email"
              placeholder="Email ID"
              className="border p-2 rounded form-field"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />{" "}
            {errors.email && <span className="form-error">{errors.email}</span>}
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
  );
}

export function Step2Review({ formData, onNext, hotelReviewData }) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-6 rounded-md text-sm space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">
          {hotelReviewData?.hInfo?.name}
          <span className="text-orange-500">★★★☆☆</span>
        </h2>
        <p className="text-gray-600">
          {hotelReviewData?.hInfo?.ad?.adr}
          <br />
          {hotelReviewData?.hInfo?.ad?.ctn}, {hotelReviewData?.hInfo?.ad?.cn}.
          Psotal code: {hotelReviewData?.hInfo?.ad?.postalCode}
        </p>
        <p className="text-gray-500 text-sm">
          Last Cancellation Date:
          <span className="text-blue-700 font-semibold">
            <strong>Doubt</strong>
          </span>
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-blue-50 p-4 rounded-md">
        <div>
          <strong>Check In</strong>
          <p className="text-gray-700">
            {hotelReviewData?.query?.checkinDate}
            <br />
            {hotelReviewData?.hInfo?.checkInTime?.beginTime ||
              "No Clock-in Time"}
          </p>
        </div>
        <div>
          <strong>Check Out</strong>
          <p className="text-gray-700">
            {hotelReviewData?.query?.checkoutDate}
            <br />
            {hotelReviewData?.hInfo?.checkOutTime?.beginTime ||
              "No Clock-out Time"}{" "}
          </p>
        </div>
        {/* <div>
          <strong>Total Rooms</strong>
          <p>{hotelReviewData?.query?.roomInfo?.[0]}</p>
        </div>
        <div>
          <strong>Total Guests</strong>
          <p>{hotelReviewData?.query?.roomInfo?.[0]}</p>
        </div> */}
      </div>

      <div className="border-t pt-4 space-y-1">
        <h3 className="font-semibold text-base">Special request(s)</h3>
        <p>{formData.specialRequest}</p>
        <h3 className="font-semibold text-base">Contact Details</h3>
        <p>Email: {formData.email}</p>
        <p>
          Mobile: {formData.countryCode} {formData.mobile}
        </p>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold text-base mb-2">Cancellation Policy</h3>
        <table className="w-full border text-center text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Cancellation on or After</th>
              <th className="border p-2">Cancellation on or Before</th>
              <th className="border p-2">Cancellation Charges/Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">02-07-2025</td>
              <td className="border p-2">03-07-2025</td>
              <td className="border p-2">₹0.00</td>
            </tr>
            <tr>
              <td className="border p-2">03-07-2025</td>
              <td className="border p-2">05-07-2025</td>
              <td className="border p-2">₹1,387.59</td>
            </tr>
            <tr>
              <td className="border p-2">05-07-2025</td>
              <td className="border p-2">06-07-2025</td>
              <td className="border p-2">₹1,387.59</td>
            </tr>
          </tbody>
        </table>

        <ul className="text-xs text-gray-600 mt-2 list-disc ml-4">
          <li>
            Each booking is applicable for ₹20 per room/night non-refundable
            service fee.
          </li>
          <li>
            No Show will attract full cancellation charge unless otherwise
            specified.
          </li>
          <li>
            Early checkout will attract full cancellation charge unless
            otherwise specified.
          </li>
          <li className="text-red-500">* Taxes & fees are non-refundable.</li>
        </ul>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold text-base">Booking Notes</h3>
        <p className="text-sm mt-2">
          <strong>Policies:</strong> Know Before You Go – No pets and no service
          animals are allowed at this property.
        </p>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold text-base mb-2">
          General Terms & Conditions
        </h3>
        <ul className="text-sm text-gray-700 list-decimal ml-6 space-y-1">
          <li>
            Each country/state may have COVID-19 rules. Check with hotel/state
            website.
          </li>
          <li>
            Your booking is confirmed. Your name will be added closer to arrival
            date.
          </li>
          <li>Guest Photo ID is required at check-in.</li>
          <li>Credit card or cash deposit may be required for incidentals.</li>
          <li>All extra charges to be paid directly at the hotel.</li>
          <li>Extra guest/bed charges apply as per property policy.</li>
          <li>Late arrival or postponement may still be charged.</li>
          <li>
            Incorrect nationality/residency may affect price. Pay difference at
            hotel.
          </li>
          <li>Special requests are not guaranteed.</li>
          <li>Early checkout = full cancellation charges unless specified.</li>
          <li>
            Hotel may deny check-in to unmarried/unrelated couples at its
            discretion.
          </li>
          <li>City/resort fees (if any) to be paid directly.</li>
          <li>Complimentary car pickup: Inform 24 hours in advance.</li>
          <li>Foreign guests: Passport scan required for check-in.</li>
          <li>GST to be paid at hotel if applicable.</li>
        </ul>

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
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="flex gap-4">
          <button
            disabled={!accepted}
            className={`book-now-btn ${
              accepted
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={onNext}
          >
            Proceed to Pay
          </button>
          <button
            disabled={!accepted}
            className={`px-6 py-2 rounded text-white font-medium ${
              accepted
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Block
          </button>
        </div>
      </div>
    </div>
  );
}

export function Step3PersonalDocuments({ formData, onPrev, onNext }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [useGuardianPAN, setUseGuardianPAN] = useState(false);
  const [samePANForAll, setSamePANForAll] = useState(false);
  const [guardianDetails, setGuardianDetails] = useState({
    firstName: "",
    lastName: "",
    pan: "",
  });
  const [sharedPAN, setSharedPAN] = useState("");
  const [panError, setPanError] = useState("");

  const handleValidate = () => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!sharedPAN.trim()) {
      setPanError("Please enter PAN");
    } else if (!panRegex.test(sharedPAN)) {
      setPanError("Invalid PAN format (e.g., ABCDE1234F)");
    } else {
      setPanError("");
    }
  };

  const isFormValid =
    (useGuardianPAN && guardianDetails.pan.trim()) ||
    (samePANForAll && sharedPAN.trim() && !panError);
  const canProceed = isFormValid && selectedOption;

  return (
    <div className="max-w-5xl mx-auto p-6 text-sm text-[#1e1e1e] font-sans">
      <h2 className="text-xl font-semibold mb-1">Personal Documents</h2>
      <p className="form-error mb-4">
        Below documents are mandatory for completing this booking:
      </p>

      <div className="border rounded-md p-4 mb-4">
        <div className="flex items-center justify-between border rounded bg-[#f5f5f5] p-2 mb-4 text-sm font-medium">
          <div className="flex items-center gap-2 px-2 py-1 border-r w-1/2">
            <svg
              className="w-4 h-4 text-gray-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
            <span>Guest Name</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 w-1/2">
            <svg
              className="w-4 h-4 text-gray-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 8h8v2H6V8zm0 4h5v2H6v-2z" />
            </svg>
            <span>PAN Info</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-2">
          <span className="text-[#cc3300] text-lg font-semibold">Room 1 -</span>
          <div className="flex flex-col md:flex-row gap-4 text-sm font-medium text-[#cc3300] mb-3">
            <label className="flex items-center gap-2 border px-3 py-2 rounded cursor-pointer w-full md:w-fit">
              <input
                type="radio"
                name="panOption"
                className="w-4 h-4"
                checked={useGuardianPAN}
                onChange={() => {
                  setUseGuardianPAN(true);
                  setSamePANForAll(false);
                  setPanError("");
                }}
              />
              Use Only Guardian PAN
            </label>
            <label className="flex items-center gap-2 border px-3 py-2 rounded cursor-pointer w-full md:w-fit">
              <input
                type="radio"
                name="panOption"
                className="w-4 h-4"
                checked={samePANForAll}
                onChange={() => {
                  setUseGuardianPAN(false);
                  setSamePANForAll(true);
                  setPanError("");
                }}
              />
              Same PAN for All Guest
            </label>
          </div>
        </div>

        {useGuardianPAN && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="First Name"
              className="border p-2 rounded"
              value={guardianDetails.firstName}
              onChange={(e) =>
                setGuardianDetails({
                  ...guardianDetails,
                  firstName: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border p-2 rounded"
              value={guardianDetails.lastName}
              onChange={(e) =>
                setGuardianDetails({
                  ...guardianDetails,
                  lastName: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="PAN Number"
              className="border p-2 rounded"
              value={guardianDetails.pan}
              onChange={(e) =>
                setGuardianDetails({ ...guardianDetails, pan: e.target.value })
              }
            />
          </div>
        )}

        {samePANForAll && (
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-2">
            <input
              type="text"
              placeholder="PAN Number"
              className="border p-2 rounded w-full md:w-1/2"
              value={sharedPAN}
              onChange={(e) => setSharedPAN(e.target.value)}
            />
            <button
              className="text-orange-600 border border-orange-500 px-4 py-1 rounded hover:bg-orange-50"
              onClick={handleValidate}
            >
              VALIDATE
            </button>
          </div>
        )}
        {panError && <p className="text-red-600 text-sm mt-1">❌ {panError}</p>}

        <div className="text-base font-medium pl-1 mt-4">
          <p>
            {formData.title} {formData.firstName} {formData.lastName}
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-600 mb-4">
        Note: Please enter valid PAN linked with Aadhar and If PAN not exists,
        click on "Parent/Guardian PAN" and then provide details.
      </p>

      <div className="border rounded-md p-4 mb-6">
        <h3 className="text-base font-semibold border-b pb-2 mb-4">
          TCS Declaration
        </h3>

        <div className="space-y-6">
          <label className="flex items-start gap-3">
            <input
              type="radio"
              name="tcs"
              className="mt-1 w-4 h-4"
              checked={selectedOption === "option1"}
              onChange={() => setSelectedOption("option1")}
            />
            <span>
              We are purchasing these travel products from Tripjack to be sold
              to end customers as part of “Overseas Tour Program Package” and
              confirm that we will collect / have collected TCS at applicable
              rates from each traveller in accordance with Section 206C(1G)(b)
              of the Income Tax Act, 1961. I am accepting the attached
              declaration (
              <a href="#" className="text-blue-600 underline">
                link to the declaration
              </a>
              )
            </span>
          </label>

          <label className="flex items-start gap-3">
            <input
              type="radio"
              name="tcs"
              className="mt-1 w-4 h-4"
              checked={selectedOption === "option2"}
              onChange={() => setSelectedOption("option2")}
            />
            <span>
              We are purchasing these travel products from Tripjack to be sold
              to end customers as standalone products. I am accepting the
              attached declaration (
              <a href="#" className="text-blue-600 underline">
                link to the declaration
              </a>
              ). The total foreign remittances made by the end customers during
              the current financial year under the Liberalised Remittance Scheme
              of Reserve Bank of India (including value of remittance intended
              to be made for these travel products) (“TOTAL LRS REMITTANCE
              VALUE”) is less than the threshold of INR 7,00,000.
            </span>
          </label>
        </div>

        <p className="text-sm mt-6">
          We hereby confirm that the above information is correct and validated
          on the basis of documents / declarations provided by the end
          customers. We further confirm that we have read and understood the
          detailed terms and conditions w.r.t the TCS regulations under Section
          206C(1G) of the Income Tax Act, 1961.
        </p>
      </div>

      <button
        className={`book-now-btn ${
          canProceed ? "" : "cursor-not-allowed bg-gray-300"
        }`}
        disabled={!canProceed}
        onClick={onNext}
      >
        Proceed to Pay
      </button>
    </div>
  );
}

export function Step4Payment({ amount = 969.13, onConfirmPayment }) {
  const [showModal, setShowModal] = useState(false);

  const handlePayClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    setShowModal(false);
    onConfirmPayment();
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
                PAY NOW ₹{amount.toFixed(2)}
              </button>
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
              ₹{amount.toFixed(2)}
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

export function FareAmount({ hotelReviewData }) {
  console.log(
    "FareAmount Hotel Review Data:",
    // hotelReviewData?.hInfo?.ops?.[0]?.tp?.toFixed(2)
    //     // hotelReviewData?.hInfo?.ops?.[0],
    // hotelReviewData?.hInfo?.ops?.[0]?.tfcs?.TAF

    hotelReviewData?.hInfo?.ops?.[0]?.ris?.[0]?.tfcs?.BF,
    hotelReviewData?.hInfo?.ops?.[0]?.ris?.[0]?.tfcs?.TAF
  );
  const tfcs = hotelReviewData?.hInfo?.ops?.[0]?.ris?.[0]?.tfcs;

  const baseFare = tfcs?.BF || 0;
  const taxes = tfcs?.TAF || 0;
  const total = baseFare + taxes;
  return (
    <>
      <h3 className="font-semibold text-base text-gray-600">FARE SUMMARY</h3>
      <div className="flex justify-between border-b pb-2">
        <span>Base Fare</span>
        <span>₹{baseFare.toFixed(2)}</span>
      </div>
      <div className="flex justify-between border-b pb-2">
        <span>Taxes and Fees</span>
        <span>₹{taxes.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-semibold text-gray-800">
        <span>Total Amount Payable</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
    </>
  );
}
