"use client";
import Link from "next/link";
import "./home.css";
import React, { useState } from "react";
import { postData } from "@/services/NetworkAdapter";

const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  background: "rgba(255,255,255,0.1)",
  border: "1px solid rgba(255,255,255,0.3)",
  borderRadius: "8px",
  color: "white",
  fontSize: "14px",
  outline: "none",
};

const inputStyle = (hasError?: boolean): React.CSSProperties => ({
  ...inputBase,
  borderColor: hasError ? "rgba(244,63,94,0.9)" : "rgba(255,255,255,0.3)",
});

const textareaStyle = (hasError?: boolean): React.CSSProperties => ({
  ...inputBase,
  resize: "none",
  borderColor: hasError ? "rgba(244,63,94,0.9)" : "rgba(255,255,255,0.3)",
});

const errorText = (txt: string) => (
  <div style={{ marginTop: 6, fontSize: 12, color: "#ffb4b4" }}>{txt}</div>
);

interface PartnerFormData {
  companyName: string;
  contactPerson: string;
  contactNumber: string;
  email: string;
  address: string;
  secondaryNumber?: string;
  description: string;
}

interface FormErrors {
  companyName?: string;
  contactPerson?: string;
  contactNumber?: string;
  email?: string;
  address?: string;
  secondaryNumber?: string;
  description?: string;
}

export default function HomeContent(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<PartnerFormData>({
    companyName: "",
    contactPerson: "",
    contactNumber: "",
    email: "",
    address: "",
    secondaryNumber: "",
    description: "",
  });

  const setField = <K extends keyof PartnerFormData>(
    k: K,
    v: PartnerFormData[K]
  ) => setForm((p) => ({ ...p, [k]: v }));

  const onlyDigits = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    target.value = target.value.replace(/\D/g, "");
  };

  const validate = (): boolean => {
    const err: FormErrors = {};

    if (!form.companyName.trim()) err.companyName = "Company name is required.";
    if (!form.contactPerson.trim())
      err.contactPerson = "Contact person is required.";
    if (!/^\d{10}$/.test(form.contactNumber))
      err.contactNumber = "Enter a valid 10-digit number.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email.";
    if (!form.address.trim()) err.address = "Address is required.";
    if (form.secondaryNumber && !/^\d{10}$/.test(form.secondaryNumber))
      err.secondaryNumber = "Enter a valid 10-digit number.";
    if (!form.description.trim()) err.description = "Description is required.";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      const apiData: any = await postData("/travelogy/common/newPartner", {
        action: "partnerApply",
        requestData: form,
      });
      if (apiData?.ok) {
        setForm({
          companyName: "",
          contactPerson: "",
          contactNumber: "",
          email: "",
          address: "",
          secondaryNumber: "",
          description: "",
        });
      }
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="section-box box-video-banner">
        <div className="video-container">
          <video autoPlay muted loop className="banner-video">
            <source src="/assets/home/home_banner.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay">
            <div className="container">
              <div className="video-content text-center">
                <h1 className="video-title">Discover Your Next Adventure</h1>
                <p className="video-subtitle">
                  Experience the world like never before
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "#373742ff",
            color: "orange",
            padding: "12px 24px",
            borderRadius: "20px",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            zIndex: 3,
          }}
        >
          Connect as a Vendor
        </button>
      </section>

      <section className="section-box box-home-intro background-body">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 mb-30 mb-lg-0">
              <span className="btn btn-gray mb-5 d-flex align-items-center intro-badge">
                <img
                  className="mr-15"
                  src="/assets/imgs/page/homepage9/real.svg"
                  alt="Travelogy"
                />
                <span className="text-md neutral-600 text-bold-200">
                  Welcome to Travelogy
                </span>
              </span>
              <h1 className="neutral-1000 mt-15 mb-15 home-title">
                Your Gateway to{" "}
                <span style={{ color: "#e5a910ff" }}>Amazing Travel</span>{" "}
                Experiences
              </h1>
              <p className="text-xl-medium neutral-500 home-description">
                Discover the world with our comprehensive travel booking
                platform. From flights to hotels, we make your journey seamless
                and memorable.
              </p>
              <div className="box-button-home mt-35">
                <Link
                  className="btn btn-black-lg mr-20 mb-3 mb-md-0"
                  href="/flights"
                >
                  Book Flights
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 15L15 8L8 1M15 8L1 8"
                      stroke=""
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </Link>
                <Link className="btn btn-link-medium" href="/hotels">
                  Explore Hotels
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 15L15 8L8 1M15 8L1 8"
                      stroke=""
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 mb-30">
              <div className="box-image-home">
                <img src="/assets/imgs/page/pages/banner.png" alt="Travelogy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 16,
            paddingTop: 20,
          }}
          onClick={() => {
            setShowModal(false);
            setIsSubmitted(false);
            setErrors({});
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              borderRadius: "20px",
              padding: "28px",
              width: "max(380px, 36vw)",
              maxWidth: 640,
              border: "1px solid rgba(255,255,255,0.2)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setShowModal(false);
                setIsSubmitted(false);
                setErrors({});
              }}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "none",
                border: "none",
                color: "white",
                fontSize: "24px",
                cursor: "pointer",
                lineHeight: 1,
              }}
              aria-label="Close"
            >
              ×
            </button>

            {/* Modal Content */}
            <div style={{ color: "white" }}>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <h3
                    style={{
                      marginBottom: 8,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Become a Partner
                  </h3>
                  <p style={{ marginBottom: 20, fontSize: 14, opacity: 0.9 }}>
                    Share a few details and we’ll reach out with next steps.
                  </p>

                  {/* Company Name */}
                  <div style={{ marginBottom: 14 }}>
                    <input
                      type="text"
                      placeholder="Company Name *"
                      value={form.companyName}
                      onChange={(e) => setField("companyName", e.target.value)}
                      style={inputStyle(Boolean(errors.companyName))}
                    />
                    {errors.companyName && errorText(errors.companyName)}
                  </div>

                  {/* Contact Person & Contact Number */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 12,
                    }}
                  >
                    <div>
                      <input
                        type="text"
                        placeholder="Contact Person *"
                        value={form.contactPerson}
                        onChange={(e) =>
                          setField("contactPerson", e.target.value)
                        }
                        style={inputStyle(Boolean(errors.contactPerson))}
                      />
                      {errors.contactPerson && errorText(errors.contactPerson)}
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Contact Number (10 digits) *"
                        value={form.contactNumber}
                        onInput={onlyDigits}
                        maxLength={10}
                        inputMode="numeric"
                        onChange={(e) =>
                          setField("contactNumber", e.target.value)
                        }
                        style={inputStyle(Boolean(errors.contactNumber))}
                      />
                      {errors.contactNumber && errorText(errors.contactNumber)}
                    </div>
                  </div>

                  {/* Email & Secondary Number */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 12,
                      marginTop: 14,
                    }}
                  >
                    <div>
                      <input
                        type="email"
                        placeholder="Official Email ID *"
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        style={inputStyle(Boolean(errors.email))}
                      />
                      {errors.email && errorText(errors.email)}
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Secondary Contact Number (optional)"
                        value={form.secondaryNumber}
                        onInput={onlyDigits}
                        maxLength={10}
                        inputMode="numeric"
                        onChange={(e) =>
                          setField("secondaryNumber", e.target.value)
                        }
                        style={inputStyle(Boolean(errors.secondaryNumber))}
                      />
                      {errors.secondaryNumber &&
                        errorText(errors.secondaryNumber)}
                    </div>
                  </div>

                  {/* Address */}
                  <div style={{ marginTop: 14 }}>
                    <textarea
                      placeholder="Company Address *"
                      rows={1}
                      value={form.address}
                      onChange={(e) => setField("address", e.target.value)}
                      style={{
                        ...textareaStyle(Boolean(errors.address)),
                        minHeight: "60px",
                      }}
                    />
                    {errors.address && errorText(errors.address)}
                  </div>

                  {/* Description */}
                  <div style={{ marginTop: 14 }}>
                    <textarea
                      placeholder="Descriptions *"
                      rows={1}
                      value={form.description}
                      onChange={(e) => setField("description", e.target.value)}
                      style={{
                        ...textareaStyle(Boolean(errors.description)),
                        minHeight: "60px",
                      }}
                    />
                    {errors.description && errorText(errors.description)}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "12px",
                      marginTop: 18,
                      background: "#000",
                      color: "orange",
                      border: "none",
                      borderRadius: "25px",
                      fontSize: "16px",
                      cursor: loading ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      opacity: loading ? 0.7 : 1,
                    }}
                  >
                    {loading ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <h3
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    Thanks!
                  </h3>
                  <p style={{ fontSize: "16px", opacity: 0.9 }}>
                    We will contact you soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Services section commented out */}
      {/* <section className="section-box box-home-services background-body">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-30">
                            <h2 className="neutral-1000 mb-25">Our Travel Services</h2>
                            <p className="text-xl-medium neutral-500 mb-35">
                                From flights to accommodations, we provide comprehensive travel solutions for all your needs.
                            </p>
                            <div className="list-services">
                                <div className="item-service">
                                    <div className="service-icon">
                                        <img src="/assets/imgs/airplane_1604953.svg" alt="Flights" />
                                    </div>
                                    <div className="service-info">
                                        <h6 className="neutral-1000">Flight Booking</h6>
                                        <p className="text-sm-medium neutral-500">
                                            Book domestic and international flights at competitive prices
                                        </p>
                                    </div>
                                </div>
                                <div className="item-service">
                                    <div className="service-icon">
                                        <img src="/assets/imgs/template/icons/hotel.svg" alt="Hotels" />
                                    </div>
                                    <div className="service-info">
                                        <h6 className="neutral-1000">Hotel Reservations</h6>
                                        <p className="text-sm-medium neutral-500">
                                            Find and book the perfect accommodation for your stay
                                        </p>
                                    </div>
                                </div>
                                <div className="item-service">
                                    <div className="service-icon">
                                        <img src="/assets/imgs/template/icons/tour.svg" alt="Tours" />
                                    </div>
                                    <div className="service-info">
                                        <h6 className="neutral-1000">Tour Packages</h6>
                                        <p className="text-sm-medium neutral-500">
                                            Explore curated tour packages for memorable experiences
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-30">
                            <div className="box-image-services">
                                <img src="/assets/imgs/page/pages/banner.png" alt="Travelogy Services" />
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
    </>
  );
}
