"use client";
import React, { Suspense, useEffect, useState } from "react";
import "./style.css";
import { Form, Input, Button, message } from "antd";
import {
  GoogleOutlined,
  FacebookFilled,
  AppleFilled,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { postDatav1 } from "@/services/NetworkAdapter"; // Ensure postData function is defined
import CryptoJS from "crypto-js"; // Importing crypto-js to encrypt the password
import { useRouter, useSearchParams } from "next/navigation";
import { checkTokenExpiry } from "@/services/Utils";
import { url } from "inspector";

export default function Login() {
  // const [loading, setLoading] = useState(false); // For handling loading state during login

  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const nextUrl = searchParams.get("next") || "/flights";
  console.log("nextUrlnextUrl login page ==> ",nextUrl)

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
  //       "yourSecretKey"
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

      console.log("resres ==> ",res)
      const data = await res.json();
      console.log("data from /api/login => ", data);

      if (data && data?.token) {
        localStorage.setItem("authToken", data.token);
      }

      message.success("Login successful");
      console.log("nextUrlnextUrl ==> ",nextUrl)
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
      <div
        style={{
          backgroundImage: `url(/assets/imgs/bg_login.png)`,
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {/* left side */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "15px",
              paddingLeft: "60px",
            }}
          >
            <div className="p-20">
              <img
                src="/assets/imgs/logo_login.png"
                width={594}
                // height={195}
              />
            </div>
            <div className="p-20">
              <img
                src="/assets/imgs/login_bg.png"
                width={694}
                // height={259}
              />
            </div>
            <div
              style={{
                textAlign: "center",
                color: "white",
                fontFamily: "Puritan",
              }}
              className="p-20"
            >
              <h2 style={{ color: "white", fontFamily: "Puritan" }}>
                Login & Let Your
              </h2>
              <h2 style={{ color: "white", fontFamily: "Puritan" }}>
                Dreams Take Your Flight
              </h2>
            </div>
          </div>

          {/* right side */}
          <div style={{ padding: "35px", width: "38%", margin: "40px" }}>
            {/* <div
              style={{
                display: "flex",
                background: "linear-gradient(180deg, white, transparent)",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
              }}
            >
              <div style={{ flex: 1.2, padding: 40 }}>
                <h2
                  style={{
                    fontSize: 32,
                    color: "#00aaff",
                    textAlign: "center",
                  }}
                >
                  Welcome
                </h2>
                <p
                  style={{
                    textAlign: "center",
                    marginBottom: 30,
                    color: "#888",
                  }}
                >
                  Login with Email
                </p>

                <Form layout="vertical" onFinish={onFinish}>
                  <Form.Item
                    name="email"
                    label="Email Id"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <Input
                      size="large"
                      prefix={<MailOutlined />}
                      placeholder="Enter your email"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      { required: true, message: "Please enter your password" },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      prefix={<LockOutlined />}
                      placeholder="Enter your password"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      size="large"
                      loading={loading} // Show loading indicator while logging in
                      style={{
                        backgroundColor: "#00aaff",
                        borderColor: "#00aaff",
                      }}
                    >
                      LOGIN
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div> */}

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
                    prefix={<MailOutlined style={{ paddingRight: "10px" }}/>}
                    placeholder="Enter your email"
                    // style={{ paddingLeft: "10px" }}
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
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
