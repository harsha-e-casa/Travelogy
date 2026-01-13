import { postData } from "@/services/NetworkAdapter";
import { message, DatePicker } from "antd";
import React, { useState } from "react";

const TravelForm = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });

  const [errors, setErrors] = useState({
    durationOfStay: "",
    country: "",
    policyType: "",
    insuranceCoverage: "",
    startDate: "",
    endDate: "",
  });

  const handleRadioChange = (event) => {
    if (event.target.value === "other") {
      setIsOtherSelected(true);
    } else {
      setIsOtherSelected(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    // helper
    const trim = (v) => String(v ?? "").trim();

    // read values
    const fullName = trim(form.name?.value);
    const mobile = trim(form.mobile?.value);
    const age = trim(form.age?.value);
    const packs = trim(form.numberOfPacks?.value);
    const email = trim(form.email?.value).toLowerCase();
    const country = trim(form.country?.value);
    const durationOfStay = trim(form.durationOfStay?.value);
    const policyType = form.policyType?.value;
    const insuranceCoverage = form.insuranceCoverage?.value; // usd50k | usd100k | usd250k | other
    const otherCoverageDetails = trim(form.otherCoverageDetails?.value);
    const startDate = dates.startDate;
    const endDate = dates.endDate;

    // validations
    const newErrors = {};

    if (!fullName) newErrors.fullName = "Full name is required.";
    if (!mobile) newErrors.mobile = "Mobile number is required.";
    if (!age) newErrors.age = "Age is required.";
    if (!packs) newErrors.numberOfPacks = "Number of packs is required.";
    if (!country) newErrors.country = "Country is required.";
    if (!email) newErrors.email = "Email address is required.";
    if (!durationOfStay)
      newErrors.durationOfStay = "Duration of stay is required.";
    if (!policyType) newErrors.policyType = "Policy type is required.";
    if (!insuranceCoverage)
      newErrors.insuranceCoverage = "Insurance coverage is required.";
    if (!startDate) newErrors.startDate = "Start Date is required.";
    if (!endDate) newErrors.endDate = "End Date is required.";
    if (startDate && endDate && startDate > endDate) {
      newErrors.endDate = "End Date cannot be before Start Date.";
    }
    if (insuranceCoverage === "other" && !otherCoverageDetails) {
      newErrors.otherCoverageDetails =
        "Please specify your insurance coverage.";
    }

    // (optional) stricter mobile rule: 10 digits only
    // if (!/^\d{10}$/.test(mobile)) newErrors.mobile = "Enter a valid 10-digit mobile number.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    // resolve coverage to a meaningful value
    const resolvedCoverage =
      insuranceCoverage === "other" ? otherCoverageDetails : insuranceCoverage;

    const reqData = {
      action: "insuranceSave",
      requestData: {
        fullName,
        mobile,
        email,
        age,
        packs,
        country,
        durationOfStay,
        policyType,
        insuranceCoverage: resolvedCoverage,
        rawCoverage: insuranceCoverage,
        startDate: startDate ? startDate.format("YYYY-MM-DD") : "",
        endDate: endDate ? endDate.format("YYYY-MM-DD") : "",
        ...(insuranceCoverage === "other" ? { otherCoverageDetails } : {}),
        submittedAt: new Date().toISOString(),
      },
    };

    setLoading(true);

    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      const resp = await postData("/travelogy/common/save", reqData, headers);

      if (resp?.success) {
        setSuccessMessage(
          "Your request has been successfully submitted, we will get back to you soon."
        );

        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
        form.reset();
        setDates({ startDate: null, endDate: null });
        setIsOtherSelected(false);
        setErrors({});
      } else {
        message.error("Failed to submit your query");
      }
    } catch (err) {
      message.error("Something went wrong while saving.");
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
              className="visa_input_fields pl-3"
              onFocus={() => handleClearError("fullName")}
            />

            {errors.fullName && (
              <span className="flex items-start text-red-500 text-xs mt-1">
                {errors.fullName}
              </span>
            )}
          </div>

          {/* Mobile */}
          <div className="form-item">
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
              className="visa_input_fields pl-3"
              onFocus={() => handleClearError("email")}
            />

            {errors.email && (
              <span className="flex items-start text-red-500 text-xs mt-1">
                {errors.email}
              </span>
            )}
          </div>

          {/* Duration of Stay */}
          <div className="form-item pt-8">
            <label
              className="font-semibold flex items-center gap-2 text-foreground"
              htmlFor="durationOfStay"
            >
              Duration of stay
            </label>

            <input
              type="text"
              id="durationOfStay"
              name="durationOfStay"
              placeholder="Enter duration of stay"
              className="visa_input_fields pl-3"
              onFocus={() => handleClearError("durationOfStay")}
            />

            {errors.durationOfStay && (
              <span className="flex items-start text-red-500 text-xs mt-1">
                {errors.durationOfStay}
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

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* age */}
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

          {/* Number of pacs */}
          <div className="form-item pt-8">
            <label
              className="font-semibold flex items-center gap-2 text-foreground"
              htmlFor="numberOfPacks"
            >
              Number of packs
            </label>

            <input
              type="text"
              id="numberOfPacks"
              name="numberOfPacks"
              placeholder="Enter Number of packs"
              className="visa_input_fields pl-3"
              onFocus={() => handleClearError("numberOfPacks")}
            />

            {errors.numberOfPacks && (
              <span className="flex items-start text-red-500 text-xs mt-1">
                {errors.numberOfPacks}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div className="form-item pt-8">
            <label
              className="font-semibold flex items-center gap-2 text-foreground"
              htmlFor="country"
            >
              Country
            </label>

            <input
              type="text"
              id="country"
              name="country"
              placeholder="Enter the Country"
              className="visa_input_fields pl-3"
              onFocus={() => handleClearError("country")}
            />

            {errors.country && (
              <span className="flex items-start text-red-500 text-xs mt-1">
                {errors.country}
              </span>
            )}
          </div>
        </div>

        {/* Policy Type */}
        <div className="form-item pt-8">
          <label
            className="font-semibold flex items-center gap-2 text-foreground"
            htmlFor="policyType"
          >
            Policy Type
          </label>

          <div className="custom-radio-group">
            <div className="pl-20 pt-2 grid grid-cols-2 gap-4">
              {/* Group Insurance */}
              <label className="custom-radio-button flex items-center gap-2">
                <input
                  type="radio"
                  id="grpIns"
                  name="policyType"
                  value="grpIns"
                  className="radio-input w-4 h-4"
                  onChange={handleRadioChange}
                  onFocus={() => handleClearError("policyType")}
                />
                <span className="radio_label text-sm">Group Insurance</span>
              </label>

              {/* Individual */}
              <label className="custom-radio-button flex items-center gap-2">
                <input
                  type="radio"
                  id="indIns"
                  name="policyType"
                  value="indIns"
                  className="radio-input w-4 h-4"
                  onChange={handleRadioChange}
                  onFocus={() => handleClearError("policyType")}
                />
                <span className="radio_label text-sm">
                  Individual Insurance
                </span>
              </label>
            </div>

            {errors.policyType && (
              <span className="flex items-start text-red-500 text-xs mt-1">
                {errors.policyType}
              </span>
            )}
          </div>
        </div>

        {/* Insurance Coverage */}
        <div className="form-item pt-8">
          <label
            className="font-semibold flex items-center gap-2 text-foreground"
            htmlFor="insuranceCoverage"
          >
            Insurance Coverage
          </label>

          <div className="custom-radio-group">
            <div
              className="pt-2 grid grid-cols-4 gap-2"
              style={{
                width: "90%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {["usd50k", "usd2.5L", "usd5L", "usd10L"].map((option) => (
                <label
                  key={option}
                  className="custom-radio-button flex items-center gap-2"
                >
                  <input
                    type="radio"
                    id={option}
                    name="insuranceCoverage"
                    value={option}
                    className="radio-input w-4 h-4"
                    onChange={handleRadioChange}
                    onFocus={() => handleClearError("insuranceCoverage")}
                  />
                  <span className="radio_label text-sm">
                    {option === "other"
                      ? "Other"
                      : option.replace("usd", "USD ")}
                  </span>
                </label>
              ))}
            </div>

            {errors.insuranceCoverage && (
              <span className="flex items-start text-red-500 text-xs mt-1">
                {errors.insuranceCoverage}
              </span>
            )}
          </div>
        </div>

        {/* Other Coverage Textarea */}
        {isOtherSelected && (
          <div className="form-item pt-8">
            <label
              className="font-semibold flex items-center gap-2 text-foreground"
              htmlFor="otherCoverageDetails"
            >
              Please specify the coverage
            </label>

            <textarea
              id="otherCoverageDetails"
              name="otherCoverageDetails"
              placeholder="Please describe your insurance coverage"
              className="h-12 resize-none px-3 py-2 transition-all duration-300 hover:!border-primary/50 focus:!ring-2 focus:!ring-primary/20"
              onFocus={() => handleClearError("otherCoverageDetails")}
            />
            {errors.otherCoverageDetails && (
              <span className="flex items-start text-red-500 text-xs mt-1">
                {errors.otherCoverageDetails}
              </span>
            )}
          </div>
        )}

        {/* Submit */}
        <div className="form-item pt-6">
          <button type="submit" className="book-now-btn">
            {loading ? "Submitting ..." : "Submit Travell Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TravelForm;
