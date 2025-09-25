"use client";
import React, { Suspense, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { GoogleOutlined, FacebookFilled, AppleFilled, LockOutlined, MailOutlined } from "@ant-design/icons";
import { postDatav1 } from "@/services/NetworkAdapter"; // Ensure postData function is defined
import CryptoJS from "crypto-js"; // Importing crypto-js to encrypt the password

export default function Login() {
  const [loading, setLoading] = useState(false); // For handling loading state during login

  // Login handler
  const onFinish = async (values: any) => {
    setLoading(true);

    console.log("Login values:", values);

    try {
      // Encrypt password using crypto-js before sending it
      const encryptedPassword = CryptoJS.AES.encrypt(values.password, 'yourSecretKey').toString();

      // Prepare the request data
      let reqData = {
        email: values.email,
        password: encryptedPassword,
      };

      // Make the API request to the backend
      const response: any = await postDatav1("travelogy/flight/login", reqData); // Assuming the backend URL

      console.log("rrrrrrrrrrrrr ",response)
      console.log("rrrrrrrrrrrrr ",response.status)
      console.log("rrrrrrrrrrrrr ",response.data.token)

      // If the login is successful, response will contain the JWT token
      if (response.status === 200) {
        message.success("Login successful!");

        // Store the JWT token in localStorage (or sessionStorage, or cookies depending on your needs)
        localStorage.setItem("authToken", response.data.token);

        // Redirect to the protected page
        setTimeout(() => {
          window.location.href = "/flights"; // Redirect to flights or dashboard
        }, 1000);
      } else if (response.status === 401) {
        message.error("Incorrect password. Please try again.");
      } else if (response.status === 403) {
        message.error("Your account is inactive. Please contact support.");
      } else {
        message.error("Login failed. Please try again later.");
      }
    } catch (error) {
      message.error("Login failed. Please try again later.");
      console.error(error);
    }

    setLoading(false); // Hide the loading spinner after the request
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#00aaff",
        fontFamily: "sans-serif",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}>
        <div style={{
          display: "flex",
          backgroundColor: "#fff",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          maxWidth: 1000,
          width: "100%",
        }}>
          <div style={{
            flex: 1,
            backgroundImage: `url('https://static.toiimg.com/photo/msid-108650501,width-96,height-65.cms')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 30,
            color: "#fff",
            position: "relative",
          }}>
            <div style={{ position: "absolute", top: 20, left: 20 }}>
              <h2 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 0 }}>
                Travelista Tours
              </h2>
              <p style={{ fontSize: 14 }}>Travel is the only purchase that enriches you in ways beyond material wealth.</p>
            </div>
          </div>

          <div style={{ flex: 1.2, padding: 40 }}>
            <h2 style={{ fontSize: 32, color: "#00aaff", textAlign: "center" }}>Welcome</h2>
            <p style={{ textAlign: "center", marginBottom: 30, color: "#888" }}>Login with Email</p>

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
                rules={[{ required: true, message: "Please enter your password" }]}
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
                  style={{ backgroundColor: "#00aaff", borderColor: "#00aaff" }}
                >
                  LOGIN
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Suspense>
  );
}