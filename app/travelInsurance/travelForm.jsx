import { postData } from "@/services/NetworkAdapter";
import { message } from "antd";
import React, { useState } from "react";

const TravelForm = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const [errors, setErrors] = useState({
    durationOfStay: "",
    country: "",
    policyType: "",
    insuranceCoverage: "",
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
    const email = trim(form.email?.value).toLowerCase();
    const durationOfStay = trim(formData.get("durationOfStay"));
    const policyType = trim(formData.get("policyType"));
    const insuranceCoverage = trim(formData.get("insuranceCoverage")); // leisure | business | student | other
    const otherCoverageDetails = trim(formData.get("otherCoverageDetails"));

    // validations
    const newErrors = {};

    if (!fullName) newErrors.fullName = "Full name is required.";
    if (!mobile) newErrors.mobile = "Mobile number is required.";
    if (!email) newErrors.email = "Email address is required.";
    if (!durationOfStay)
      newErrors.durationOfStay = "Duration of stay is required.";
    if (!policyType) newErrors.policyType = "Policy type is required.";
    if (!insuranceCoverage)
      newErrors.insuranceCoverage = "Insurance coverage is required.";
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
        durationOfStay,
        policyType,
        insuranceCoverage: resolvedCoverage,
        rawCoverage: insuranceCoverage,
        ...(insuranceCoverage === "other" ? { otherCoverageDetails } : {}),
        submittedAt: new Date().toISOString(),
      },
    };

    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      const resp = await postData("/travelogy/common/save", reqData, headers);

      if (resp?.success) {
        message.success("Successfully submitted your query");
        form.reset();
        setIsOtherSelected(false);
        setErrors({});
      } else {
        message.error("Failed to submit your query");
      }
    } catch (err) {
      message.error("Something went wrong while saving.");
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
              htmlFor="durationOfStay"
            >
              Duration of stay
            </label>
            <input
              type="text"
              id="durationOfStay"
              name="durationOfStay"
              placeholder="Enter duration of stay"
              className="visa_input_fields flex text-left"
            />
            {errors.durationOfStay && (
              <span className="flex item-left form-error-space text-red-500 text-xs mt-1">
                {errors.durationOfStay}
              </span>
            )}
          </div>
        </div>
        <div className="form-item pt-8">
          <label
            className="font-semibold flex items-center gap-2 text-foreground"
            htmlFor="policyType"
          >
            Policy Type
          </label>
          <div className="custom-radio-group">
            <div className="pt-2 grid grid-cols-2 gap-4">
              <label className="custom-radio-button flex items-center gap-2">
                <input
                  type="radio"
                  id="grpIns"
                  name="policyType"
                  value="grpIns"
                  className="radio-input w-4 h-4"
                  onChange={handleRadioChange}
                />
                <span className="radio_label text-sm">Group Insurance</span>
              </label>
              <label className="custom-radio-button flex items-center gap-2">
                <input
                  type="radio"
                  id="indIns"
                  name="policyType"
                  value="indIns"
                  className="radio-input w-4 h-4"
                  onChange={handleRadioChange}
                />
                <span className="radio_label text-sm">
                  Individual Insurance
                </span>
              </label>
            </div>
            {errors.policyType && (
              <span className="flex item-left form-error-space text-red-500 text-xs mt-1">
                {errors.policyType}
              </span>
            )}
          </div>
        </div>

        <div className="form-item pt-8">
          <label
            className="font-semibold flex items-center gap-2 text-foreground"
            htmlFor="insuranceCoverage"
          >
            Insurance Coverage
          </label>
          <div className="custom-radio-group">
            <div className="pt-2 grid grid-cols-2 gap-4">
              <label className="custom-radio-button flex items-center gap-2">
                <input
                  type="radio"
                  id="usd50k"
                  name="insuranceCoverage"
                  value="usd50k"
                  className="radio-input w-4 h-4"
                  onChange={handleRadioChange}
                />
                <span className="radio_label text-sm">USD 50k</span>
              </label>
              <label className="custom-radio-button flex items-center gap-2">
                <input
                  type="radio"
                  id="usd100k"
                  name="insuranceCoverage"
                  value="usd100k"
                  className="radio-input w-4 h-4"
                  onChange={handleRadioChange}
                />
                <span className="radio_label text-sm">USD 100k</span>
              </label>
              <label className="custom-radio-button flex items-center gap-2">
                <input
                  type="radio"
                  id="usd250k"
                  name="insuranceCoverage"
                  value="usd250k"
                  className="radio-input w-4 h-4"
                  onChange={handleRadioChange}
                />
                <span className="radio_label text-sm">USD 250k</span>
              </label>
              <label className="custom-radio-button flex items-center gap-2">
                <input
                  type="radio"
                  id="otherCoverage"
                  name="insuranceCoverage"
                  value="other"
                  className="radio-input w-4 h-4"
                  onChange={handleRadioChange}
                />
                <span className="radio_label text-sm">Other</span>
              </label>
            </div>
            {errors.insuranceCoverage && (
              <span className="flex item-left form-error-space text-red-500 text-xs mt-1">
                {errors.insuranceCoverage}
              </span>
            )}
          </div>
        </div>

        {/* If 'Other' is selected in Insurance Coverage */}
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
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="form-item pt-12">
          <button type="submit" className="book-now-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TravelForm;
