"use client";
import Layout from "@/components/layout/Layout";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Alert, message, Table, Modal } from "antd";
import { MailOutlined, LockOutlined, RocketOutlined, PhoneOutlined, ReloadOutlined, SafetyOutlined } from "@ant-design/icons";
import { postData, getData } from "@/services/NetworkAdapter";
import CryptoJS from "crypto-js";

type CreateVendorResponse = { success?: boolean; message?: string; [k: string]: any };
type Vendor = { id: number; e_mail: string; phone: string; created_at?: string };

const CREATE_ENDPOINT = "/travelogy/flight/create-vendor";
const LIST_ENDPOINT   = "/travelogy/flight/list-vendors";
const RESET_ENDPOINT  = "/travelogy/flight/reset-vendor-password";

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
      if (e?.errorFields) return; // form validation error
      message.error(e?.message || "Failed to reset password");
    } finally {
      setResetSubmitting(false);
    }
  };

  return (
    <Layout headerStyle={1} footerStyle={7}>
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          padding: 16,
          gap: 16,
          background: "linear-gradient(145deg, rgba(255,167,37,0.06) 0%, rgba(0,0,0,0.03) 100%)",
          flexWrap: "wrap",
        }}
      >
        {/* Create Vendor */}
        <Card
          style={{ width: 420, borderRadius: 16, boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}
          bodyStyle={{ padding: 24 }}
          title={
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <RocketOutlined />
              <span>Create Vendor</span>
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

        {/* List Vendors */}
        <Card
          style={{ flex: "1 1 640px", minWidth: 480, borderRadius: 16, boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}
          title={
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <SafetyOutlined />
              <span>Vendors</span>
              <Button icon={<ReloadOutlined />} size="small" onClick={fetchVendors} loading={loadingList} style={{ marginLeft: "auto" }}>
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

      {/* Reset Password Modal */}
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
