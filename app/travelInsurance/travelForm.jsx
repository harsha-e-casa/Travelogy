import React, { useState } from "react";

const TravelForm = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target); // Create a new FormData instance
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

    if (!formData.get("durationOfStay")) {
      newErrors.durationOfStay = "Travel destination is required.";
    }

    if (!formData.get("policyType")) {
      newErrors.policyType = "Policy type is required.";
    }

    if (!formData.get("insuranceCoverage")) {
      newErrors.insuranceCoverage = "Insurance coverage is required.";
    }

    setErrors(newErrors);
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

        {/* Insurance Coverage Section */}
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
