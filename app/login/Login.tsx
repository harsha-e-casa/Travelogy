"use client";
import React, { Suspense, useEffect, useState } from "react";
import "./style.css";
import { Form, Input, Button, message, Divider } from "antd";
import {
  GoogleOutlined,
  FacebookFilled,
  AppleFilled,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { postDatav1, postData } from "@/services/NetworkAdapter"; // Ensure postData function is defined
import CryptoJS from "crypto-js"; // Importing crypto-js to encrypt the password
import { useRouter, useSearchParams } from "next/navigation";
import { checkTokenExpiry } from "@/services/Utils";
import { url } from "inspector";

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

const errorText = (txt?: string) => (
  txt ? <div style={{ marginTop: 6, fontSize: 12, color: "#ffb4b4" }}>{txt}</div> : null
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

export default function Login() {
  // const [loading, setLoading] = useState(false); // For handling loading state during login

  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const nextUrl = searchParams.get("next") || "/flights";
  // Vendor Modal State
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [modalLoading, setModalLoading] = useState<boolean>(false);
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
    if (form.description.trim().length < 5) err.description = "Description must be at least 5 characters.";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleClearError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setModalLoading(true);
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
      setModalLoading(false);
    }
  };

  // useEffect(() => {
  //   const tokenValid = checkTokenExpiry();

  //   if (!tokenValid) {
  //     localStorage.removeItem("authToken");
  //     router.push("/login"); // Redirect to the login page
  //   } else {
  //     setLoading(false);
  //     // router.push("/flights");
  //   }
  // }, [router]);

  // Login handler
  // const onFinish = async (values: any) => {
  //   setLoading(true);

  //   console.log("Login values:", values);

  //   try {
  //     // Encrypt password using crypto-js before sending it
  //     const encryptedPassword = CryptoJS.AES.encrypt(
  //       values.password,
  //       "92077e393546d4310a2af55592879820c7af16b4153f484f70e41fbdd127239b"
  //     ).toString();

  //     // Prepare the request data
  //     let reqData = {
  //       email: values.email,
  //       password: encryptedPassword,
  //     };

  //     // Make the API request to the backend
  //     const response: any = await postDatav1("travelogy/flight/login", reqData); // Assuming the backend URL
  //     console.log("response === > ",response)

  //     // If the login is successful, response will contain the JWT token
  //     if (response.status === 200) {
  //       // message.success("Login successful!");

  //       // Store the JWT token in localStorage (or sessionStorage, or cookies depending on your needs)
  //       localStorage.setItem("authToken", response.data.token);

  //       // Redirect to the protected page
  //       setTimeout(() => {
  //         window.location.href = "/flights"; // Redirect to flights or dashboard
  //       }, 1000);
  //     } else if (response.status === 401) {
  //       message.error("Incorrect password. Please try again.");
  //     } else if (response.status === 403) {
  //       message.error("Your account is inactive. Please contact support.");
  //     } else {
  //       message.error("Login failed. Please try again later.");
  //     }
  //   } catch (error) {
  //     message.error("Login failed. Please try again later.");
  //     console.error(error);
  //   }

  //   setLoading(false); // Hide the loading spinner after the request
  // };
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Same-origin; cookies are handled automatically
        body: JSON.stringify({
          email: values.email,
          password: values.password, // 🔒 rely on HTTPS; avoid client-side "encryption"
          next: nextUrl,
        }),
      });

      if (!res.ok) {
        const { message: msg } = await res
          .json()
          .catch(() => ({ message: "Login failed" }));
        message.error(msg || "Login failed");
        return;
      }

      const data = await res.json();

      if (data && data?.token) {
        localStorage.setItem("authToken", data.token);
      }

      message.success("Login successful");
      // router.push(nextUrl);
      window.location.href = nextUrl;
    } catch (e) {
      console.error(e);
      message.error("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="login-page-container" style={{ position: "relative" }}>
        <div className="login-flex-wrapper">
          {/* left side */}
          <div className="login-left-section">
            <div className="p-20 flex justify-center">
              <img
                src="/assets/imgs/logo_login.png"
                className="login-logo"
                alt="Logo"
              />
            </div>
            <div className="p-20 flex justify-center">
              <img
                src="/assets/imgs/login_bg.png"
                className="login-illustration"
                alt="Illustration"
              />
            </div>
            <div className="login-text-content p-20">
              <h2 style={{ lineHeight: "1.15", marginBottom: "5px" }}>Login & Let Your</h2>
              <h2 style={{ lineHeight: "1.15", marginTop: "0" }}>Dreams Take Your Flight</h2>
            </div>
          </div>

          {/* right side */}
          <div className="login-right-section">
            <div className="glass-card">
              <h1 className="title">Welcome</h1>

              <Form layout="vertical" onFinish={onFinish}>
                <label style={{ color: "white" }}>Email ID</label>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<MailOutlined style={{ paddingRight: "10px" }} />}
                    placeholder="Enter your email"
                  />
                </Form.Item>

                <label style={{ marginTop: "12px", color: "white" }}>
                  Password
                </label>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}
                >
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined style={{ paddingRight: "10px" }} />}
                    placeholder="Enter your password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    className="btn-orange"
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    loading={loading}
                    style={{
                      marginTop: "16px",
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    LOGIN
                  </Button>
                </Form.Item>

                <Divider
                  style={{
                    borderColor: "rgba(255,255,255,0.3)",
                    color: "rgba(255,255,255,0.8)",
                    margin: "24px 0",
                    fontSize: "14px",
                    fontWeight: 400
                  }}
                >
                  or Register
                </Divider>

                <div className="flex justify-center" style={{ marginTop: "10px", width: "100%" }}>
                  <Button
                    type="primary"
                    block
                    size="large"
                    onClick={() => setShowModal(true)}
                    style={{
                      background: "#373742ff",
                      borderColor: "#373742ff",
                      color: "white",
                      fontWeight: 700,
                      borderRadius: "10px",
                      boxShadow: "0 8px 18px rgba(55, 55, 66, 0.35)",
                    }}
                  >
                    Connect as a Vendor
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      {
        showModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: 16,
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
              {/* Close */}
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
                  fontSize: 24,
                  cursor: "pointer",
                }}
              >
                ×
              </button>

              {/* CONTENT */}
              <div style={{ color: "white" }}>
                {!isSubmitted ? (
                  <form onSubmit={handleModalSubmit}>
                    <h3 style={{ fontSize: 18, fontWeight: "bold" }}>
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
                        onFocus={() => handleClearError("companyName")}
                        style={inputStyle(Boolean(errors.companyName))}
                      />
                      {errors.companyName && errorText(errors.companyName)}
                    </div>

                    {/* Contact Person & Number */}
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
                          onFocus={() => handleClearError("contactPerson")}
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
                          onFocus={() => handleClearError("contactNumber")}
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
                          onFocus={() => handleClearError("email")}
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
                          onFocus={() => handleClearError("secondaryNumber")}
                          style={inputStyle(Boolean(errors.secondaryNumber))}
                        />
                        {errors.secondaryNumber &&
                          errorText(errors.secondaryNumber)}
                      </div>
                    </div>

                    {/* Address & Description */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                      }}
                    >
                      <div style={{ marginTop: 14 }}>
                        <textarea
                          placeholder="Company Address *"
                          value={form.address}
                          onChange={(e) => setField("address", e.target.value)}
                          onFocus={() => handleClearError("address")}
                          style={{
                            ...textareaStyle(Boolean(errors.address)),
                            minHeight: 60,
                          }}
                        />
                        {errors.address && errorText(errors.address)}
                      </div>

                      <div style={{ marginTop: 14 }}>
                        <textarea
                          placeholder="Descriptions *"
                          value={form.description}
                          onChange={(e) =>
                            setField("description", e.target.value)
                          }
                          onFocus={() => handleClearError("description")}
                          style={{
                            ...textareaStyle(Boolean(errors.description)),
                            minHeight: 60,
                          }}
                        />
                        {errors.description && errorText(errors.description)}
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={modalLoading}
                      style={{
                        width: "100%",
                        padding: 12,
                        marginTop: 18,
                        background: "#000",
                        color: "orange",
                        border: "none",
                        borderRadius: 25,
                        fontSize: 16,
                        cursor: modalLoading ? "not-allowed" : "pointer",
                      }}
                    >
                      {modalLoading ? "Submitting..." : "Submit Application"}
                    </button>
                  </form>
                ) : (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <h3
                      style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        marginBottom: 10,
                      }}
                    >
                      Thanks!
                    </h3>
                    <p style={{ fontSize: 16, opacity: 0.9 }}>
                      We will contact you soon.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      }
    </Suspense >
  );
}
