"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Alert, Table, Modal, message } from "antd";
import { MailOutlined, LockOutlined, PhoneOutlined, ReloadOutlined, SafetyOutlined } from "@ant-design/icons";
import { postData, getData } from "@/services/NetworkAdapter";
import CryptoJS from "crypto-js";
import Layout from "@/components/layout/Layout";

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
        <section className="section_main_book_dash_01 relative_MainBanner" style={{
          // background: "url('https://img.freepik.com/free-photo/tourist-carrying-baggage_23-2151747383.jpg') no-repeat center center",
          backgroundSize: "cover",
          minHeight: "100vh",
          position: "relative"
        }}>
          <div className="footer_overlay" style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.4)",
            zIndex: 1
          }}></div>
          
          <div className="hero-section" style={{
            background: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(5px)",
            padding: "60px 20px",
            color: "white",
            textAlign: "center",
            position: "relative",
            zIndex: 2
          }}>
            <div className="hero-content" style={{
              maxWidth: "1200px",
              margin: "0 auto",
              position: "relative",
              zIndex: 1
            }}>
              <div className="hero-text">
                <h1 className="hero-title" style={{
                  fontSize: "3rem",
                  fontWeight: 700,
                  margin: "0 0 20px 0",
                  lineHeight: 1.2,
                  background: "linear-gradient(45deg, #fff, #f0f8ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}>Vendor Management</h1>
                <p className="hero-subtitle" style={{
                  fontSize: "1.3rem",
                  opacity: 0.9,
                  margin: 0,
                  fontWeight: 300
                }}>Create and manage travel vendors with ease</p>
              </div>
            </div>
          </div>

          <div className="main-content" style={{
            background: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(10px)",
            minHeight: "60vh",
            padding: "60px 20px",
            position: "relative",
            zIndex: 3,
            borderRadius: "20px 20px 0 0",
            marginTop: "40px",
            boxShadow: "0 -10px 30px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)"
          }}>
            <div style={{
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
              gap: 16,
              flexWrap: "wrap",
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(15px)",
              borderRadius: 20,
              padding: 20,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.3)"
            }}>
              <Card
                style={{ 
                  width: 420, 
                  borderRadius: 16, 
                  boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)"
                }}
                bodyStyle={{ padding: 24 }}
                title={
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <img src="/assets/imgs/airplane_1604953.svg" alt="Flights" style={{ width:"20px", height:"20px" }}/>
                    <span style={{ color: "#333", fontWeight: 600 }}>Create Vendor</span>
                  </div>
                }
              >
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

              <Card
                style={{ 
                  flex: "1 1 640px", 
                  minWidth: 480, 
                  borderRadius: 16, 
                  boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)"
                }}
                title={
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <SafetyOutlined style={{ color: "#ff8a00" }} />
                    <span style={{ color: "#333", fontWeight: 600 }}>Vendors</span>
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
                }
              >
                <Table<Vendor>
                  rowKey="id"
                  size="small"
                  loading={loadingList}
                  dataSource={vendors}
                  pagination={{ pageSize: 8 }}
                  columns={[
                    { title: "Email", dataIndex: "e_mail" },
                    { title: "Phone", dataIndex: "phone", width: 230 },
                    {
                      title: "Actions",
                      key: "actions",
                      width: 250,
                      render: (_, rec) => (
                        <Button type="link" onClick={() => openReset(rec)}>
                          Reset Password
                        </Button>
                      ),
                    },
                  ]}
                />
              </Card>
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