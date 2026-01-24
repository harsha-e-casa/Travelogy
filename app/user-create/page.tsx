"use client";
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Alert,
  Table,
  Modal,
  message,
  Space,
  Switch,
  InputNumber,
  Radio,
  Segmented,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  ReloadOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { postData, getData } from "@/services/NetworkAdapter";
import CryptoJS from "crypto-js";
import Layout from "@/components/layout/Layout";
import "../dashboard/style.css";
// import "../dashboard/responsive.css";

type CreateVendorResponse = {
  success?: boolean;
  message?: string;
  [k: string]: any;
};
type Vendor = {
  id: number;
  e_mail: string;
  phone: string;
  user_id: any;
  created_at?: string;
};

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

  const [activeTab, setActiveTab] = useState<"create" | "list">("create");

  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [activeVendor, setActiveVendor] = useState<Vendor | null>(null);
  const [walletAmount, setWalletAmount] = useState<number>(0);
  const [walletOperation, setWalletOperation] = useState<"ADD" | "DEDUCT">(
    "ADD"
  );
  const [walletDescription, setWalletDescription] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
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

  useEffect(() => {
    fetchVendors();
  }, []);

  const onFinish = async (vals: {
    email: string;
    password: string;
    phone: string;
  }) => {
    setSubmitting(true);
    setSuccessMsg(null);
    setErrorMsg(null);
    try {
      const encryptedPassword = CryptoJS.AES.encrypt(
        vals.password,
        "92077e393546d4310a2af55592879820c7af16b4153f484f70e41fbdd127239b"
      ).toString();
      const reqData = {
        email: vals.email,
        phone: vals.phone,
        password: encryptedPassword,
      };

      const res = (await postData(
        CREATE_ENDPOINT,
        reqData,
        authHeader
      )) as CreateVendorResponse;

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
      const encrypted = CryptoJS.AES.encrypt(
        newPassword,
        "92077e393546d4310a2af55592879820c7af16b4153f484f70e41fbdd127239b"
      ).toString();
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

  const openWalletModal = (vendor: Vendor) => {
    setActiveVendor(vendor);
    setWalletAmount(0);
    setWalletOperation("ADD");
    setWalletDescription("");
    setWalletModalOpen(true);
  };

  const submitWalletChange = async () => {
    if (!activeVendor) return;

    if (!walletDescription.trim()) {
      message.error("Description is required");
      return;
    }

    const req: any = {
      vendor_id: activeVendor.user_id,
      amount: walletAmount,
      type: walletOperation, // ADD or DEDUCT
      description: walletDescription,
    };

    await postData("/travelogy/flight/vendor/update-wallet", req, authHeader);

    message.success("Wallet updated successfully!");
    await fetchVendors(); // refresh the table

    setWalletModalOpen(false);
  };

  const toggleActive = async (vendor: any, isActive: boolean) => {
    const req = {
      vendor_id: vendor.user_id,
      is_active: isActive ? 1 : 0,
    };

    await postData("/travelogy/flight/vendor/update-status", req, authHeader);
    message.success(`Vendor ${isActive ? "activated" : "deactivated"}!`);
    await fetchVendors();
  };

  return (
    <Layout headerStyle={1} footerStyle={7}>
      <main className="modern-dashboard">
        <section className="section_main_book_dash_01 relative_MainBanner">
          <div className="hero-section">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">Vendor Management</h1>
                <p className="hero-subtitle">
                  Create and manage travel vendors with ease
                </p>
              </div>
            </div>
          </div>

          <div className="main-content">
            <div
              className="bookings-container"
              style={{
                maxWidth: "1400px",
                margin: "0 auto",
                padding: "10px",
                minHeight: "70vh",
              }}
            >
              <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 425px) {
                  .bookings-container {
                    padding: 5px !important;
                  }
                  .vendor-grid-wrapper {
                    grid-template-columns: 1fr !important;
                    gap: 15px !important;
                    min-height: auto !important;
                  }
                  .vendor-create-card,
                  .vendor-list-card {
                    border-radius: 12px !important;
                    height: auto !important;
                    min-height: auto !important;
                  }
                  .vendor-create-card .ant-card-body {
                    padding: 16px !important;
                  }
                  .vendor-list-card .ant-card-body {
                    padding: 16px !important;
                  }
                  .card-header {
                    flex-wrap: wrap !important;
                    gap: 8px !important;
                    margin-bottom: 16px !important;
                  }
                  .card-header img {
                    width: 16px !important;
                    height: 16px !important;
                  }
                  .card-header span {
                    font-size: 14px !important;
                  }
                  .vendor-create-card .ant-form-item {
                    margin-bottom: 16px !important;
                  }
                  .vendor-create-card .ant-form-item-label > label {
                    font-size: 13px !important;
                  }
                  .vendor-create-card .ant-input,
                  .vendor-create-card .ant-input-password,
                  .vendor-create-card .ant-input-affix-wrapper {
                    font-size: 14px !important;
                  }
                  .vendor-create-card .ant-btn-lg {
                    height: 40px !important;
                    font-size: 14px !important;
                  }
                  .vendor-list-card .ant-table {
                    font-size: 11px !important;
                  }
                  .vendor-list-card .ant-btn {
                    font-size: 11px !important;
                    padding: 4px 8px !important;
                    height: auto !important;
                  }
                  .vendor-list-card .ant-table-thead > tr > th {
                    padding: 6px 4px !important;
                    font-size: 10px !important;
                  }
                  .vendor-list-card .ant-table-tbody > tr > td {
                    padding: 6px 4px !important;
                    font-size: 10px !important;
                  }
                }
                @media (max-width: 375px) {
                  .bookings-container {
                    padding: 12px !important;
                  }
                  .vendor-grid-wrapper {
                    gap: 12px !important;
                  }
                  .vendor-create-card .ant-card-body,
                  .vendor-list-card .ant-card-body {
                    padding: 12px !important;
                  }
                }
              `}} />
              <div className="mobile-tabs-container" style={{ marginBottom: 20, display: 'none' }}>
                <Segmented
                  block
                  options={[
                    { label: 'Create Vendor', value: 'create', icon: <div className="tab-icon create-icon" /> },
                    { label: 'View Vendors', value: 'list', icon: <div className="tab-icon list-icon" /> },
                  ]}
                  value={activeTab}
                  onChange={(val: any) => setActiveTab(val)}
                  size="large"
                  style={{ background: '#f0f0f0', padding: 4 }}
                />
              </div>

              <div className="vendor-grid-wrapper"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "20px",
                  alignItems: "start",
                  minHeight: "600px",
                }}
              >
                <div className={`create-section-wrapper ${activeTab === 'list' ? 'hidden-mobile' : ''}`}>
                  <Card
                    className="vendor-create-card"
                    style={{
                      borderRadius: "16px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div
                      className="card-header"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 20,
                      }}
                    >
                      <img
                        src="/assets/imgs/airplane_1604953.svg"
                        alt="Flights"
                        style={{ width: "20px", height: "20px" }}
                      />
                      <span
                        style={{
                          color: "#333",
                          fontWeight: 600,
                          fontSize: "16px",
                        }}
                      >
                        Create Vendor
                      </span>
                    </div>

                    {successMsg && (
                      <Alert
                        style={{ marginBottom: 16 }}
                        type="success"
                        showIcon
                        message={successMsg}
                      />
                    )}
                    {errorMsg && (
                      <Alert
                        style={{ marginBottom: 16 }}
                        type="error"
                        showIcon
                        message={errorMsg}
                      />
                    )}

                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={onFinish}
                      autoComplete="off"
                      requiredMark={false}
                    >
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Please enter vendor email",
                          },
                          {
                            type: "email",
                            message: "Please enter a valid email",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          prefix={<MailOutlined />}
                          placeholder="vendor@example.com"
                          autoComplete="email"
                        />
                      </Form.Item>

                      <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: "Please enter phone number",
                          },
                          {
                            pattern: /^[0-9]{10}$/,
                            message: "Phone must be 10 digits",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          prefix={<PhoneOutlined />}
                          placeholder="10-digit phone"
                          inputMode="numeric"
                          maxLength={10}
                          onKeyDown={(e) => {
                            const ok = [
                              "Backspace",
                              "Delete",
                              "Tab",
                              "ArrowLeft",
                              "ArrowRight",
                              "Home",
                              "End",
                            ];
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
                          {
                            min: 6,
                            message: "Password must be at least 6 characters",
                          },
                        ]}
                      >
                        <Input.Password
                          size="large"
                          prefix={<LockOutlined />}
                          placeholder="Enter a secure password"
                          autoComplete="new-password"
                        />
                      </Form.Item>

                      <Button
                        block
                        size="large"
                        type="primary"
                        htmlType="submit"
                        loading={submitting}
                        style={{
                          fontWeight: 700,
                          letterSpacing: 0.2,
                          background: "linear-gradient(90deg,#ff8a00,#ff6a00)",
                          border: "none",
                          color: "#fff",
                        }}
                      >
                        Create Vendor
                      </Button>
                    </Form>
                  </Card>
                </div>

                <div className={`list-section-wrapper ${activeTab === 'create' ? 'hidden-mobile' : ''}`}>
                  <Card
                    className="vendor-list-card"
                    style={{
                      borderRadius: "16px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      height: "600px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      className="card-header"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 20,
                      }}
                    >
                      <SafetyOutlined style={{ color: "#ff8a00" }} />
                      <span
                        style={{
                          color: "#333",
                          fontWeight: 600,
                          fontSize: "16px",
                        }}
                      >
                        Vendors
                      </span>
                      <Button
                        icon={<ReloadOutlined />}
                        size="small"
                        onClick={fetchVendors}
                        loading={loadingList}
                        style={{
                          marginLeft: "auto",
                          background: "linear-gradient(90deg,#ff8a00,#ff6a00)",
                          border: "none",
                          color: "white",
                        }}
                      >
                        Refresh
                      </Button>
                    </div>

                    {/* DESKTOP TABLE */}
                    <div className="desktop-table-view" style={{ flex: 1, overflow: "auto" }}>
                      <Table<Vendor>
                        rowKey="id"
                        size="small"
                        loading={loadingList}
                        dataSource={vendors}
                        pagination={{ pageSize: 10, showSizeChanger: false }}
                        columns={[
                          { title: "Email", dataIndex: "e_mail", ellipsis: true, width: 150 },
                          { title: "Phone", dataIndex: "phone", width: 130 },
                          { title: "Wallet", dataIndex: "balance", width: 130 },

                          // 🟦 WALLET ACTIONS
                          {
                            title: "Wallet Actions",
                            key: "walletActions",
                            width: 160,
                            render: (_, rec) => (
                              <Space>
                                <Button
                                  size="small"
                                  onClick={() => openWalletModal(rec)}
                                >
                                  Add / Deduct
                                </Button>
                              </Space>
                            ),
                          },

                          // 🟩 ACTIVE / INACTIVE TOGGLE
                          {
                            title: "Status",
                            dataIndex: "is_active",
                            width: 120,
                            render: (_, rec: any) => {
                              const isActive =
                                rec.is_active === 1 ||
                                rec.is_active === true ||
                                (typeof rec.status === "string" &&
                                  rec.status.toLowerCase() === "active");

                              return (
                                <Switch
                                  checked={isActive}
                                  onChange={(v) => toggleActive(rec, v)}
                                />
                              );
                            },
                          },

                          {
                            title: "Password Reset",
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

                    {/* MOBILE CARD LIST */}
                    <div className="mobile-list-view" style={{ display: 'none', flex: 1, overflowY: 'auto' }}>
                      {vendors.map((vendor: any) => {
                        const isActive =
                          vendor.user_id === 1 || // Assuming logic mapping
                          (vendor as any).is_active === 1 ||
                          (vendor as any).is_active === true ||
                          (typeof (vendor as any).status === "string" &&
                            (vendor as any).status.toLowerCase() === "active");

                        return (
                          <div key={vendor.id} style={{
                            border: '1px solid #eee',
                            borderRadius: 12,
                            padding: 12,
                            marginBottom: 12,
                            background: '#fafafa'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                              <span style={{ fontWeight: 600, color: '#333' }}>{vendor.e_mail}</span>
                              <Switch size="small" checked={isActive} onChange={(v) => toggleActive(vendor, v)} />
                            </div>
                            <div style={{ display: 'flex', gap: 10, fontSize: 13, color: '#666', marginBottom: 8 }}>
                              <span>📞 {vendor.phone}</span>
                              <span>💰 {vendor.balance || 0}</span>
                            </div>
                            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                              <Button size="small" type="dashed" onClick={() => openWalletModal(vendor)} style={{ flex: 1, fontSize: 12 }}>
                                Wallet
                              </Button>
                              <Button size="small" onClick={() => openReset(vendor)} style={{ flex: 1, fontSize: 12 }}>
                                Reset Pass
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                      {vendors.length === 0 && !loadingList && (
                        <div style={{ textAlign: 'center', padding: 20, color: '#999' }}>No vendors found</div>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 768px) {
           .vendor-grid-wrapper {
              display: block !important;
              min-height: auto !important;
           }
           .mobile-tabs-container {
              display: block !important;
           }
           .hidden-mobile {
              display: none !important;
           }
           .desktop-table-view {
              display: none !important;
           }
           .mobile-list-view {
              display: block !important;
           }
           .vendor-create-card, .vendor-list-card {
              height: auto !important;
              min-height: 400px;
           }
        }
        @media (max-width: 425px) {
            .ant-modal {
              max-width: calc(100vw - 32px) !important;
              margin: 16px !important;
            }
            .ant-modal-content {
              border-radius: 12px !important;
            }
            .ant-modal-header {
              padding: 12px 16px !important;
            }
            .ant-modal-title {
              font-size: 14px !important;
            }
            .ant-modal-body {
              padding: 16px !important;
            }
            .ant-modal-footer {
              padding: 10px 16px !important;
            }
            .ant-modal-footer .ant-btn {
              font-size: 13px !important;
              height: 36px !important;
              padding: 4px 12px !important;
            }
            .ant-input,
            .ant-input-password,
            .ant-input-affix-wrapper,
            .ant-input-number,
            .ant-input-number-input {
              font-size: 14px !important;
              padding: 8px 11px !important;
            }
            .ant-form-item-label > label {
              font-size: 13px !important;
            }
            .ant-radio-wrapper {
              font-size: 13px !important;
            }
            .ant-input-number {
              width: 100% !important;
            }
          }
          @media (max-width: 375px) {
            .ant-modal {
              max-width: calc(100vw - 20px) !important;
              margin: 10px !important;
            }
            .ant-modal-header,
            .ant-modal-body,
            .ant-modal-footer {
              padding: 12px !important;
            }
          }
          @media (max-width: 320px) {
            .ant-modal {
              max-width: calc(100vw - 16px) !important;
              margin: 8px !important;
            }
            .ant-modal-title {
              font-size: 13px !important;
            }
            .ant-modal-body {
              padding: 10px !important;
            }
          }
        `
      }} />

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

      <Modal
        title={`Update Wallet – ${activeVendor?.e_mail}`}
        open={walletModalOpen}
        onCancel={() => setWalletModalOpen(false)}
        onOk={submitWalletChange}
      >
        <div style={{ marginBottom: 12 }}>Amount</div>
        <InputNumber
          value={walletAmount}
          onChange={(v) => setWalletAmount(Number(v))}
          min={1}
          style={{ width: "100%", marginBottom: 20 }}
        />

        <Radio.Group
          value={walletOperation}
          onChange={(e) => setWalletOperation(e.target.value)}
          style={{ marginBottom: 20 }}
        >
          <Radio value="ADD">Add Amount</Radio>
          <Radio value="DEDUCT">Deduct Amount</Radio>
        </Radio.Group>

        <div style={{ marginBottom: 12 }}>Description <span style={{ color: 'red' }}>*</span></div>
        <Input.TextArea
          value={walletDescription}
          onChange={(e) => setWalletDescription(e.target.value)}
          placeholder="Enter reason for update (e.g. Manual Topup, Correction)"
          rows={3}
        />
      </Modal>
    </Layout>
  );
}
