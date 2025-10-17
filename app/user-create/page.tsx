"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Alert, Table, Modal, message } from "antd";
import { MailOutlined, LockOutlined, PhoneOutlined, ReloadOutlined, SafetyOutlined } from "@ant-design/icons";
import { postData, getData } from "@/services/NetworkAdapter";
import CryptoJS from "crypto-js";
import Layout from "@/components/layout/Layout";
import "../dashboard/style.css";
// import "../dashboard/responsive.css";

type CreateVendorResponse = { success?: boolean; message?: string; [k: string]: any };
type Vendor = { id: number; e_mail: string; phone: string; created_at?: string };

const CREATE_ENDPOINT = "/travelogy/flight/create-vendor";
const LIST_ENDPOINT = "/travelogy/flight/list-vendors";
const RESET_ENDPOINT = "/travelogy/flight/reset-vendor-password";

export default function VendorCreate(): JSX.Element {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loadingList, setLoadingList] = useState(false);

  const [resetOpen, setResetOpen] = useState(false);
  const [resetTarget, setResetTarget] = useState<Vendor | null>(null);
  const [resetSubmitting, setResetSubmitting] = useState(false);
  const [resetForm] = Form.useForm();

  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const authHeader = { Authorization: token ? `Bearer ${token}` : "" };

  const fetchVendors = async () => {
    try {
      setLoadingList(true);
      const res = await getData(LIST_ENDPOINT, authHeader);
      setVendors(Array.isArray(res?.vendors) ? res.vendors : []);
    } catch (e: any) {
      message.error(e?.message || "Failed to load vendors");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => { fetchVendors(); }, []);

  const onFinish = async (vals: { email: string; password: string; phone: string }) => {
    setSubmitting(true);
    setSuccessMsg(null);
    setErrorMsg(null);
    try {
      const encryptedPassword = CryptoJS.AES.encrypt(vals.password, "yourSecretKey").toString();
      const reqData = { email: vals.email, phone: vals.phone, password: encryptedPassword };

      const res = (await postData(CREATE_ENDPOINT, reqData, authHeader)) as CreateVendorResponse;

      if (res?.success !== false) {
        const msg = res?.message || "Vendor created successfully.";
        setSuccessMsg(msg);
        message.success(msg);
        form.resetFields();
        fetchVendors();
      } else {
        const msg = res?.message || "Failed to create vendor.";
        setErrorMsg(msg);
        message.error(msg);
      }
    } catch (err: any) {
      const msg = err?.message || "Something went wrong while creating vendor.";
      setErrorMsg(msg);
      message.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const openReset = (vendor: Vendor) => {
    setResetTarget(vendor);
    resetForm.resetFields();
    setResetOpen(true);
  };

  const submitReset = async () => {
    try {
      const { newPassword } = await resetForm.validateFields();
      setResetSubmitting(true);
      const encrypted = CryptoJS.AES.encrypt(newPassword, "yourSecretKey").toString();
      await postData(
        RESET_ENDPOINT,
        { email: resetTarget?.e_mail, newPasswordEncrypted: encrypted },
        authHeader
      );
      message.success("Password reset successfully");
      setResetOpen(false);
    } catch (e: any) {
      if (e?.errorFields) return;
      message.error(e?.message || "Failed to reset password");
    } finally {
      setResetSubmitting(false);
    }
  };

  return (
    <Layout headerStyle={1} footerStyle={7}>
      <main className="modern-dashboard">
        <section className="section_main_book_dash_01 relative_MainBanner">
          
          <div className="hero-section">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">
                  Vendor Management
                </h1>
                <p className="hero-subtitle">
                  Create and manage travel vendors with ease
                </p>
              </div>
            </div>
          </div>

          <div className="main-content">
            <div className="bookings-container" style={{
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "10px",
              minHeight: "70vh"
            }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: "20px",
                alignItems: "start",
                minHeight: "600px"
              }}>
                <Card style={{
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                        <img src="/assets/imgs/airplane_1604953.svg" alt="Flights" style={{ width:"20px", height:"20px" }}/>
                        <span style={{ color: "#333", fontWeight: 600, fontSize: "16px" }}>Create Vendor</span>
                      </div>

                      {successMsg && <Alert style={{ marginBottom: 16 }} type="success" showIcon message={successMsg} />}
                      {errorMsg && <Alert style={{ marginBottom: 16 }} type="error" showIcon message={errorMsg} />}

                      <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off" requiredMark={false}>
                        <Form.Item
                          label="Email"
                          name="email"
                          rules={[
                            { required: true, message: "Please enter vendor email" },
                            { type: "email", message: "Please enter a valid email" },
                          ]}
                        >
                          <Input size="large" prefix={<MailOutlined />} placeholder="vendor@example.com" autoComplete="email" />
                        </Form.Item>

                        <Form.Item
                          label="Phone"
                          name="phone"
                          rules={[
                            { required: true, message: "Please enter phone number" },
                            { pattern: /^[0-9]{10}$/, message: "Phone must be 10 digits" },
                          ]}
                        >
                          <Input
                            size="large"
                            prefix={<PhoneOutlined />}
                            placeholder="10-digit phone"
                            inputMode="numeric"
                            maxLength={10}
                            onKeyDown={(e) => {
                              const ok = ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "Home", "End"];
                              if (ok.includes(e.key)) return;
                              if (!/^\d$/.test(e.key)) e.preventDefault();
                            }}
                          />
                        </Form.Item>

                        <Form.Item
                          label="Password"
                          name="password"
                          rules={[
                            { required: true, message: "Please enter a password" },
                            { min: 6, message: "Password must be at least 6 characters" },
                          ]}
                        >
                          <Input.Password size="large" prefix={<LockOutlined />} placeholder="Enter a secure password" autoComplete="new-password" />
                        </Form.Item>

                        <Button
                          block
                          size="large"
                          type="primary"
                          htmlType="submit"
                          loading={submitting}
                          style={{ fontWeight: 700, letterSpacing: 0.2, background: "linear-gradient(90deg,#ff8a00,#ff6a00)", border: "none" }}
                        >
                          Create Vendor
                        </Button>
                      </Form>
                </Card>

                <Card style={{
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  height: "600px",
                  display: "flex",
                  flexDirection: "column"
                }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                        <SafetyOutlined style={{ color: "#ff8a00" }} />
                        <span style={{ color: "#333", fontWeight: 600, fontSize: "16px" }}>Vendors</span>
                        <Button 
                          icon={<ReloadOutlined />} 
                          size="small" 
                          onClick={fetchVendors} 
                          loading={loadingList} 
                          style={{ 
                            marginLeft: "auto",
                            background: "linear-gradient(90deg,#ff8a00,#ff6a00)",
                            border: "none",
                            color: "white"
                          }}>
                          Refresh
                        </Button>
                      </div>

                      <div style={{ flex: 1, overflow: "auto" }}>
                        <Table<Vendor>
                          rowKey="id"
                          size="small"
                          loading={loadingList}
                          dataSource={vendors}
                          pagination={{ pageSize: 10, showSizeChanger: false }}
                          columns={[
                            { title: "Email", dataIndex: "e_mail", ellipsis: true },
                            { title: "Phone", dataIndex: "phone", width: 130 },
                            {
                              title: "Actions",
                              key: "actions",
                              width: 120,
                              render: (_, rec) => (
                                <Button type="link" onClick={() => openReset(rec)}>
                                  Reset
                                </Button>
                              ),
                            },
                          ]}
                        />
                      </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Modal
        title={`Reset Password: ${resetTarget?.e_mail || ""}`}
        open={resetOpen}
        onCancel={() => setResetOpen(false)}
        onOk={submitReset}
        confirmLoading={resetSubmitting}
        okText="Reset"
      >
        <Form form={resetForm} layout="vertical">
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Enter a new password" },
              { min: 6, message: "At least 6 characters" },
            ]}
          >
            <Input.Password placeholder="New password" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}