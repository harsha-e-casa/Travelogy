import { postData } from "@/services/NetworkAdapter";
import { message } from "antd";
import React, { useState } from "react";

const VisaForm = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const [isOtherSelected, setIsOtherSelected] = useState(false);

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

    const fullName = form.name.value.trim();
    const mobile = form.mobile.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const travelingDestination = form.travelingDestination.value.trim();
    const country = form.country.value.trim();

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
        purposeOfTravel: purposeResolved,
        rawPurpose: purpose,
        ...(purpose === "other" ? { otherPurpose: otherText } : {}),
      },
    };

    try {
      const response = await postData("/travelogy/common/save", reqData, {
        Authorization: `Bearer ${token}`,
      });
      console.log("responseresponse ==> ", response);
      if (response.success) {
        message.success("Data saved successfully!");
        form.reset();
      } else {
        message.error("Failed to save data.");
      }
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  return (
    <div className="visa_form max-w-2xl mx-auto relative z-10 p-9">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-item pt-8">
            <label
              className="font-semibold flex items-center gap-2 text-foreground"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              className="visa_input_fields flex text-left"
            />
            {errors.fullName && (
              <span className="flex item-left form-error-space text-red-500 text-xs mt-1">
                {errors.fullName}
              </span>
            )}
          </div>
          <div className="form-item pt-8">
            <label
              className="font-semibold flex items-center gap-2 text-foreground"
              htmlFor="mobile"
            >
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              placeholder="Enter your mobile number"
              className="visa_input_fields flex text-left"
              maxLength={10}
              inputMode="numeric"
              pattern="[0-9]*"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
            />

            {errors.mobile && (
              <span className="flex item-left form-error-space text-red-500 text-xs mt-1">
                {errors.mobile}
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-item pt-8">
            <label
              className="font-semibold flex items-center gap-2 text-foreground"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              className="visa_input_fields flex text-left"
            />
            {errors.email && (
              <span className="flex item-left form-error-space text-red-500 text-xs mt-1">
                {errors.email}
              </span>
            )}
          </div>
          <div className="form-item pt-8">
            <label
              className="font-semibold flex items-center gap-2 text-foreground"
              htmlFor="travelingDestination"
            >
              Traveling Destination
            </label>
            <input
              type="text"
              id="travelingDestination"
              name="travelingDestination"
              placeholder="Where are you traveling to?"
              className="visa_input_fields flex text-left"
            />
            {errors.travelingDestination && (
              <span className="flex item-left form-error-space text-red-500 text-xs mt-1">
                {errors.travelingDestination}
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-item pt-8">
            <label
              className="font-semibold flex items-center gap-2 text-foreground"
              htmlFor="country"
            >
              For Which Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Country for visa application"
              className="visa_input_fields flex text-left"
            />
            {errors.country && (
              <span className="flex item-left form-error-space text-red-500 text-xs mt-1">
                {errors.country}
              </span>
            )}
          </div>
        </div>

        <div className="form-item pt-8">
          <label
            className="font-semibold flex items-center gap-2 text-foreground"
            htmlFor="purposeOfTravel"
          >
            Purpose of Travel
          </label>

          <div className="custom-radio-group">
            <div
              className="pt-8 grid grid-cols-2 gap-4"
              role="radiogroup"
              aria-invalid={Boolean(errors.purposeOfTravel)}
            >
              <label className="custom-radio-button flex items-center gap-2">
                <input
                  type="radio"
                  id="leisure"
                  name="purposeOfTravel"
                  value="leisure"
                  className="radio-input w-4 h-4"
                  onChange={handleRadioChange}
                />
                <span className="radio_label text-sm">Leisure</span>
              </label>

              <label className="custom-radio-button flex items-center gap-2">
                <input
                  type="radio"
                  id="business"
                  name="purposeOfTravel"
                  value="business"
                  className="radio-input w-4 h-4"
                  onChange={handleRadioChange}
                />
                <span className="radio_label text-sm">Business</span>
              </label>

              <label className="custom-radio-button flex items-center gap-2">
                <input
                  type="radio"
                  id="student"
                  name="purposeOfTravel"
                  value="student"
                  className="radio-input w-4 h-4"
                  onChange={handleRadioChange}
                />
                <span className="radio_label text-sm">Student</span>
              </label>

              <label className="custom-radio-button flex items-center gap-2">
                <input
                  type="radio"
                  id="other"
                  name="purposeOfTravel"
                  value="other"
                  className="radio-input w-4 h-4"
                  onChange={handleRadioChange}
                />
                <span className="radio_label text-sm">Other</span>
              </label>
            </div>

            {errors.purposeOfTravel && (
              <p className="flex item-left form-error-space text-red-500 text-xs mt-1">
                {errors.purposeOfTravel}
              </p>
            )}
          </div>
        </div>

        {/* Only show this div when 'Other' is selected */}
        {isOtherSelected && (
          <div className="form-item pt-8">
            <label
              className="font-semibold flex items-center gap-2 text-foreground"
              htmlFor="otherPurpose"
            >
              Please specify the purpose
            </label>
            <textarea
              id="otherPurpose"
              name="otherPurpose"
              placeholder="Please describe your purpose of travel"
              className={`h-12 transition-all duration-300 hover:!border-primary/50 focus:!ring-2 focus:!ring-primary/20 ${
                errors.otherPurpose ? "border-red-500" : ""
              }`}
              aria-invalid={Boolean(errors.otherPurpose)}
            />
            {errors.otherPurpose && (
              <p className="flex item-left form-error-space text-red-500 text-xs mt-1">
                {errors.otherPurpose}
              </p>
            )}
          </div>
        )}

        <div className="form-item pt-12">
          <button type="submit" className="book-now-btn">
            Submit Visa Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisaForm;
