import { postData } from "@/services/NetworkAdapter";
import { message, DatePicker } from "antd";
import React, { useState } from "react";

const VisaForm = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    mobile: "",
    email: "",
    travelingDestination: "",
    country: "",
  });

  const handleRadioChange = (event) => {
    if (event.target.value === "other") {
      setIsOtherSelected(true);
      setErrors((prev) => ({ ...prev, purposeOfTravel: "" }));
    } else {
      setIsOtherSelected(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    let newErrors = {};

    if (!event.target.name.value) {
      newErrors.fullName = "Full name is required.";
    }

    if (!event.target.mobile.value) {
      newErrors.mobile = "Mobile number is required.";
    }

    if (!event.target.email.value) {
      newErrors.email = "Email address is required.";
    }

    if (!event.target.travelingDestination.value) {
      newErrors.travelingDestination = "Travel destination is required.";
    }

    if (!event.target.country.value) {
      newErrors.country = "Country for visa application is required.";
    }

    if (!event.target.age.value) {
      newErrors.age = "Age is required.";
    }

    if (!dates.startDate) {
      newErrors.startDate = "Start date is required.";
    }

    if (!dates.endDate) {
      newErrors.endDate = "End date is required.";
    }

    const purpose = form.purposeOfTravel?.value;
    if (!purpose) {
      newErrors.purposeOfTravel = "Please select your purpose of travel.";
    }

    let otherText = "";
    if (purpose === "other") {
      otherText = (form.otherPurpose?.value || "").trim();
      if (!otherText) {
        newErrors.otherPurpose = "Please specify your purpose of travel.";
      }
    }

    setErrors(newErrors);

    // If there are errors, stop submission
    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }

    const fullName = form.name.value.trim();
    const mobile = form.mobile.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const travelingDestination = form.travelingDestination.value.trim();
    const country = form.country.value.trim();
    const age = form.age.value.trim();
    const startDate = dates.startDate ? dates.startDate.format("YYYY-MM-DD") : null;
    const endDate = dates.endDate ? dates.endDate.format("YYYY-MM-DD") : null;

    // Use the 'other' text when "other" is selected, else the selected purpose
    const purposeResolved = purpose === "other" ? otherText : purpose;

    const reqData = {
      action: "visaSave",
      requestData: {
        fullName,
        mobile,
        email,
        travelingDestination,
        country,
        age,
        startDate,
        endDate,
        purposeOfTravel: purposeResolved,
        rawPurpose: purpose,
        ...(purpose === "other" ? { otherPurpose: otherText } : {}),
      },
    };

    setLoading(true);

    try {
      const response = await postData("/travelogy/common/save", reqData, {
        Authorization: `Bearer ${token}`,
      });
      if (response.success) {
        // message.success("Data saved successfully!");
        setSuccessMessage(
          "Your request has been successfully submitted, we will get back to you soon."
        );

        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);

        form.reset();
        setDates({ startDate: null, endDate: null });
        setIsOtherSelected(false);
      } else {
        message.error("Failed to save data.");
      }
    } catch (err) {
      console.error("Save failed:", err);
    }

    setLoading(false);
  };

  const handleClearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="visa_form max-w-2xl mx-auto relative z-10 p-9 rounded-xl">
      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center text-sm font-medium">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="form-item">
            <label
              htmlFor="name"
              className="font-semibold flex items-center gap-2 text-foreground"
            >
              Full Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              className="visa_input_fields flex text-left"
              onFocus={() => handleClearError("fullName")}
            />

            {errors.fullName && (
              <span className="flex items-start text-red-500 text-xs mt-1">
                {errors.fullName}
              </span>
            )}
          </div>

          {/* Mobile Number */}
          <div className="form-item">
            <label
              htmlFor="mobile"
              className="font-semibold flex items-center gap-2 text-foreground"
            >
              Mobile Number
            </label>

            <input
              type="text"
              id="mobile"
              name="mobile"
              placeholder="Enter your mobile number"
              className="visa_input_fields pl-3"
              maxLength={10}
              inputMode="numeric"
              pattern="[0-9]*"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              onFocus={() => handleClearError("mobile")}
            />

            {errors.mobile && (
              <span className="flex items-start text-red-500 text-xs mt-1">
                {errors.mobile}
              </span>
            )}
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div className="form-item pt-8">
            <label
              htmlFor="email"
              className="font-semibold flex items-center gap-2 text-foreground"
            >
              Email Address
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              className="visa_input_fields pl-3"
              onFocus={() => handleClearError("email")}
            />

            {errors.email && (
              <span className="flex items-start text-red-500 text-xs mt-1">
                {errors.email}
              </span>
            )}
          </div>

          {/* Traveling Destination */}
          <div className="form-item pt-8">
            <label
              htmlFor="travelingDestination"
              className="font-semibold flex items-center gap-2 text-foreground"
            >
              Traveling Destination
            </label>

            <input
              type="text"
              id="travelingDestination"
              name="travelingDestination"
              placeholder="Where are you traveling to?"
              className="visa_input_fields pl-3"
              onFocus={() => handleClearError("travelingDestination")}
            />

            {errors.travelingDestination && (
              <span className="flex items-start text-red-500 text-xs mt-1">
                {errors.travelingDestination}
              </span>
            )}
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="form-item pt-8">
            <label
              htmlFor="country"
              className="font-semibold flex items-center gap-2 text-foreground"
            >
              For Which Country
            </label>

            <input
              type="text"
              id="country"
              name="country"
              placeholder="Country for visa application"
              className="visa_input_fields pl-3"
              onFocus={() => handleClearError("country")}
            />

            {errors.country && (
              <span className="flex items-start text-red-500 text-xs mt-1">
                {errors.country}
              </span>
            )}
          </div>
          <div className="form-item pt-8">
            <label
              className="font-semibold flex items-center gap-2 text-foreground"
              htmlFor="age"
            >
              Age
            </label>

            <input
              type="text"
              id="age"
              name="age"
              placeholder="Enter your Age"
              className="visa_input_fields pl-3"
              inputMode="numeric"
              pattern="[0-9]*"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              onFocus={() => handleClearError("age")}
            />

            {errors.age && (
              <span className="flex items-start text-red-500 text-xs mt-1">
                {errors.age}
              </span>
            )}
          </div>
        </div>

        {/* Row New: Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Date */}
          <div className="form-item pt-8">
            <label
              className="font-semibold flex items-center gap-2 text-foreground"
              htmlFor="startDate"
            >
              Start Date
            </label>

            <DatePicker
              id="startDate"
              name="startDate"
              className="visa_input_fields w-full"
              placeholder="Select Start Date"
              value={dates.startDate}
              onChange={(date) => {
                setDates((prev) => ({ ...prev, startDate: date }));
                handleClearError("startDate");
              }}
            />

            {errors.startDate && (
              <span className="flex items-start text-red-500 text-xs mt-1">
                {errors.startDate}
              </span>
            )}
          </div>

          {/* End Date */}
          <div className="form-item pt-8">
            <label
              className="font-semibold flex items-center gap-2 text-foreground"
              htmlFor="endDate"
            >
              End Date
            </label>

            <DatePicker
              id="endDate"
              name="endDate"
              className="visa_input_fields pl-3 w-full"
              placeholder="Select End Date"
              value={dates.endDate}
              onChange={(date) => {
                setDates((prev) => ({ ...prev, endDate: date }));
                handleClearError("endDate");
              }}
            />

            {errors.endDate && (
              <span className="flex items-start text-red-500 text-xs mt-1">
                {errors.endDate}
              </span>
            )}
          </div>
        </div>

        {/* Purpose of Travel */}
        <div className="form-item pt-8">
          <label
            htmlFor="purposeOfTravel"
            className="font-semibold flex items-center gap-2 text-foreground"
          >
            Purpose of Travel
          </label>

          <div className="custom-radio-group">
            <div
              className="pt-2 grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-[90%]"
              role="radiogroup"
              aria-invalid={Boolean(errors.purposeOfTravel)}
            >
              {["leisure", "business", "student", "workPermit"].map((option) => (
                <label
                  key={option}
                  className="custom-radio-button flex items-center gap-2"
                >
                  <input
                    type="radio"
                    id={option}
                    name="purposeOfTravel"
                    value={option}
                    className="radio-input w-5 h-5 min-w-[1.25rem] min-h-[1.25rem] shrink-0"
                    onChange={handleRadioChange}
                    onFocus={() => handleClearError("purposeOfTravel")}
                  />
                  <span className="radio_label text-sm capitalize">
                    {option}
                  </span>
                </label>
              ))}
            </div>

            {errors.purposeOfTravel && (
              <p className="flex items-start text-red-500 text-xs mt-1">
                {errors.purposeOfTravel}
              </p>
            )}
          </div>
        </div>

        {/* Other Purpose Textarea */}
        {isOtherSelected && (
          <div className="form-item pt-8">
            <label
              htmlFor="otherPurpose"
              className="font-semibold flex items-center gap-2 text-foreground"
            >
              Please specify the purpose
            </label>

            <textarea
              id="otherPurpose"
              name="otherPurpose"
              placeholder="Please describe your purpose of travel"
              className={`visa_input_fields h-12 w-full p-2 rounded-lg border transition-all duration-300 hover:border-primary/50 focus:ring-2 focus:ring-primary/20 ${errors.otherPurpose ? "border-red-500" : ""
                }`}
              aria-invalid={Boolean(errors.otherPurpose)}
              onFocus={() => handleClearError("otherPurpose")}
            />

            {errors.otherPurpose && (
              <p className="flex items-start text-red-500 text-xs mt-1">
                {errors.otherPurpose}
              </p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <div className="form-item pt-6">
          <button type="submit" className="book-now-btn">
            {loading ? "Submitting ..." : "Submit Visa Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisaForm;
