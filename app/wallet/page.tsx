"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  Statistic,
  Tag,
  Select,
  Skeleton,
  Row,
  Col,
  DatePicker,
} from "antd";
import {
  LockOutlined,
  PhoneOutlined,
  ReloadOutlined,
  SafetyOutlined,
  HistoryOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { postData, getData } from "@/services/NetworkAdapter";
import { jwtDecode } from "jwt-decode";
import CryptoJS from "crypto-js";
import Layout from "@/components/layout/Layout";
import "../dashboard/style.css";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;
// import "../dashboard/responsive.css";

type CreateVendorResponse = {
  success?: boolean;
  message?: string;
  [k: string]: any;
};
type Vendor = {
  id: number;
  user_id?: number;
  e_mail: string;
  phone: string;
  is_admin?: number;
  created_at?: string;
};

type WalletTx = {
  id: number;
  booking_id: string;
  amount: number;
  description: string;
  type: "CREDIT" | "DEBIT";
  created_at: string;
  original_date?: string; // For filtering
  booking_type?: "FLIGHT" | "HOTEL";
};

type WalletStats = {
  totalTopup: number;
  pendingAmount: number;
  totalUsage: number;
};

const CREATE_ENDPOINT = "/travelogy/flight/create-vendor";
const LIST_ENDPOINT = "/travelogy/flight/list-vendors";
const RESET_ENDPOINT = "/travelogy/flight/reset-vendor-password";
const Wallet_Transactions = "/travelogy/flight/wallet";

export default function WalletOption(): JSX.Element {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  const [resetOpen, setResetOpen] = useState(false);
  const [resetTarget, setResetTarget] = useState<Vendor | null>(null);
  const [resetSubmitting, setResetSubmitting] = useState(false);
  const [resetForm] = Form.useForm();

  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [activeVendor, setActiveVendor] = useState<Vendor | null>(null);
  const [walletAmount, setWalletAmount] = useState<number>(0);
  const [walletOperation, setWalletOperation] = useState<"ADD" | "DEDUCT">(
    "ADD"
  );
  const [walletDescription, setWalletDescription] = useState("");

  // Wallet History State
  const [history, setHistory] = useState<WalletTx[]>([]);
  const [stats, setStats] = useState<WalletStats>({
    totalTopup: 0,
    pendingAmount: 0,
    totalUsage: 0,
  });
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [loadingTable, setLoadingTable] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedVendorId, setSelectedVendorId] = useState<number | null>(null);
  const [adminInfo, setAdminInfo] = useState<{ id: number; e_mail: string } | null>(
    null
  );

  // Date Filter State
  const [dateFilter, setDateFilter] = useState<"ALL" | "TODAY" | "WEEK" | "MONTH" | "CUSTOM">("ALL");
  const [customRange, setCustomRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "vendors">("overview");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const authHeader = useMemo(() => ({ Authorization: token ? `Bearer ${token}` : "" }), [token]);

  useEffect(() => {
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setIsAdmin(!!decoded?.travelogy_admin);

        // Try to get admin ID and email from token if available
        if (decoded?.id || decoded?.userId) {
          setAdminInfo({
            id: decoded?.id || decoded?.userId,
            e_mail: decoded?.e_mail || decoded?.email || "Admin",
          });
        }
      } catch (e) {
        console.error("Token decode error", e);
      }
    }
  }, [token]);

  useEffect(() => {
    const fetchAdminData = async () => {
      if (isAdmin && !adminInfo && token) {
        try {
          const res: any = await postData(
            "/travelogy/flight/fetch-user",
            { phone: "", e_mail: "" },
            authHeader
          );
          if (res?.user) {
            setAdminInfo({
              id: res.user.id,
              e_mail: res.user.e_mail || res.user.email || "Admin",
            });
          }
        } catch (e) {
          console.error("Failed to fetch admin info", e);
        }
      }
    };
    fetchAdminData();
  }, [isAdmin, adminInfo, token]);

  const fetchVendors = useCallback(async () => {
    try {
      setLoadingList(true);
      const res = await getData(LIST_ENDPOINT, {}, authHeader);
      setVendors(Array.isArray(res?.vendors) ? res.vendors : []);
    } catch (e: any) {
      message.error(e?.message || "Failed to load vendors");
    } finally {
      setLoadingList(false);
    }
  }, [authHeader]);

  useEffect(() => {
    if (isAdmin) {
      fetchVendors();
    }
  }, [isAdmin, fetchVendors]);

  const fetchWalletHistory = useCallback(async (vendorId?: number | null) => {
    setLoadingHistory(true);
    try {
      const params: any = {};
      if (vendorId) {
        params.vendor_id = vendorId;
        params.user_id = vendorId; // Some endpoints might use user_id
      }
      const res = await getData(Wallet_Transactions, params, { Authorization: `Bearer ${token}` });

      if (res.success && Array.isArray(res.transactions)) {
        let transactions = res.transactions.map((t: any) => ({
          id: t.id,
          user_id: t.user_id,
          vendor_id: t.vendor_id,
          booking_id: t.booking_id || "-",
          amount: parseFloat(t.amount),
          type: t.type,
          description: t.description,
          created_at: new Date(t.created_at).toLocaleString(),
          original_date: t.created_at,
          booking_type: t.booking_type,
        }));

        // Frontend filter fallback: if backend didn't filter, we do it here
        if (vendorId) {
          transactions = transactions.filter(
            (t: any) =>
              Number(t.user_id) === Number(vendorId) ||
              Number(t.vendor_id) === Number(vendorId)
          );
        }

        setHistory(transactions);

        // Calculate stats based on transactions (already filtered if vendorId exists)
        const totalTopup = transactions
          .filter((t: any) => t.type === "CREDIT")
          .reduce((sum: number, t: any) => sum + (parseFloat(t.amount) || 0), 0);

        const totalUsage = transactions
          .filter((t: any) => t.type === "DEBIT")
          .reduce((sum: number, t: any) => sum + (parseFloat(t.amount) || 0), 0);

        setStats({
          totalTopup,
          totalUsage,
          pendingAmount: totalTopup - totalUsage,
        });
      } else {
        setHistory([]);
        setStats({ totalTopup: 0, totalUsage: 0, pendingAmount: 0 });
      }
    } catch (e: any) {
      console.error(e);
      message.error(e?.message || "Failed to load wallet history");
    } finally {
      setLoadingHistory(false);
    }
  }, [token]);

  useEffect(() => {
    fetchWalletHistory(selectedVendorId);
  }, [selectedVendorId, fetchWalletHistory]);

  const filteredHistory = React.useMemo(() => {
    if (dateFilter === "ALL") return history;
    const now = dayjs();
    return history.filter((item) => {
      const dateStr = item.original_date || item.created_at; // Fallback
      const itemDate = dayjs(dateStr);
      if (!itemDate.isValid()) return true;

      if (dateFilter === "TODAY") {
        return itemDate.isSame(now, "day");
      } else if (dateFilter === "WEEK") {
        return itemDate.isSame(now, "week");
      } else if (dateFilter === "MONTH") {
        return itemDate.isSame(now, "month");
      } else if (
        dateFilter === "CUSTOM" &&
        customRange &&
        customRange[0] &&
        customRange[1]
      ) {
        return itemDate.isBetween(customRange[0], customRange[1], "day", "[]");
      }
      return true;
    });
  }, [history, dateFilter, customRange]);

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
        fetchWalletHistory();
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
    await fetchWalletHistory(); // refresh history
    if (isAdmin) await fetchVendors(); // refresh vendors list

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

          <div className="main-content">
            <div
              className="bookings-container wallet_container"
            >
              <div style={{ padding: "20px 25px 0", background: "#f8fafc", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
                <h2 className="wallet-title" style={{ margin: 0, fontWeight: 700, textAlign: "left" }}>
                  {activeTab === "overview" ? "Wallet History Overview" : "Vendor Section"}
                </h2>
              </div>

              {isAdmin && (
                <div className="modern-tabs" style={{ padding: "10px 20px 15px 15px", background: "#f8fafc", display: "flex", gap: "20px" }}>
                  <div
                    className="tab-item"
                    onClick={() => setActiveTab("overview")}
                    style={{
                      cursor: "pointer",
                      border: activeTab === "overview" ? "2px solid #ff8a00" : "2px solid #e5e7eb",
                      boxShadow: activeTab === "overview" ? "0 4px 12px rgba(255, 138, 0, 0.2)" : "none",
                    }}
                  >
                    <HistoryOutlined style={{ marginRight: "8px", color: activeTab === "overview" ? "#ff8a00" : "#666" }} />
                    <span className="tab-text" style={{ fontWeight: 600, color: activeTab === "overview" ? "#ff8a00" : "#666" }}>Wallet Overview</span>
                  </div>
                  <div
                    className="tab-item"
                    onClick={() => setActiveTab("vendors")}
                    style={{
                      cursor: "pointer",
                      border: activeTab === "vendors" ? "2px solid #ff8a00" : "2px solid #e5e7eb",
                      boxShadow: activeTab === "vendors" ? "0 4px 12px rgba(255, 138, 0, 0.2)" : "none",
                    }}
                  >
                    <UserOutlined style={{ marginRight: "8px", color: activeTab === "vendors" ? "#ff8a00" : "#666" }} />
                    <span className="tab-text" style={{ fontWeight: 600, color: activeTab === "vendors" ? "#ff8a00" : "#666" }}>Vendors</span>
                  </div>
                </div>
              )}

              {/* Wallet History Section */}
              {activeTab === "overview" && (
                <div style={{ marginTop: "20px", padding: "0 25px" }}>
                  <style jsx>{`
                    @media (min-width: 769px) {
                      .wallet-title {
                        font-size: 24px;
                      }
                      .tab-item {
                         min-width: 200px;
                         padding: 8px 16px; /* consistent padding desktop */
                         display: flex;
                         align-items: center;
                         justify-content: center;
                         border-radius: 8px; /* Assuming some border radius was implicit or inherited */
                      }
                    }
                    @media (max-width: 768px) {
                      .wallet-title {
                        font-size: 18px;
                      }
                      .modern-tabs {
                        gap: 10px !important;
                      }
                      .tab-item {
                        min-width: auto;
                        padding: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                         border-radius: 8px;
                      }
                      .tab-text {
                        display: none;
                      }
                      /* Icons larger on mobile if needed, or keeping standard */
                      
                      .wallet-controls-container {
                        flex-direction: column;
                        align-items: flex-start !important;
                        gap: 15px !important;
                      }
                      .wallet-date-filter-group {
                        display: flex !important;
                        flex-wrap: wrap;
                        gap: 8px;
                        width: 100%;
                      }
                      .wallet-date-filter-group .ant-radio-button-wrapper {
                        flex: 1 1 calc(50% - 8px);
                        text-align: center;
                        margin-bottom: 0;
                        border-radius: 4px; 
                      }
                      .wallet-filter-section {
                         width: 100%;
                         display: flex;
                         flex-direction: column;
                         align-items: flex-start !important;
                         gap: 8px !important;
                      }
                      .wallet-filter-select {
                        width: 100% !important;
                        min-width: 100% !important;
                      }
                    }
                    @media (max-width: 425px) {
                      .wallet-stats-grid {
                        grid-template-columns: 1fr !important;
                        gap: 12px !important;
                        margin-top: 20px !important;
                      }
                      .wallet-stat-card {
                        min-width: 100% !important;
                      }
                    }
                  `}</style>

                  <div className="wallet-controls-container" style={{ marginBottom: 20, marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", width: "100%" }}>
                      <span style={{ fontWeight: 600 }}>Date Filter:</span>
                      <Radio.Group
                        className="wallet-date-filter-group"
                        value={dateFilter}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDateFilter(val); // Always update state
                          if (val !== "CUSTOM") {
                            setLoadingTable(true);
                            setTimeout(() => setLoadingTable(false), 1000);
                          }
                        }}
                        buttonStyle="solid"
                      >
                        <Radio.Button value="ALL">All</Radio.Button>
                        <Radio.Button value="TODAY">Today</Radio.Button>
                        <Radio.Button value="WEEK">This Week</Radio.Button>
                        <Radio.Button value="MONTH">This Month</Radio.Button>
                        <Radio.Button value="CUSTOM">Custom Range</Radio.Button>
                      </Radio.Group>
                      {dateFilter === "CUSTOM" && (
                        <RangePicker
                          value={customRange}
                          onChange={(dates: any) => {
                            setLoadingTable(true);
                            setCustomRange(dates);
                            setTimeout(() => setLoadingTable(false), 1000);
                          }}
                        />
                      )}
                    </div>

                    {isAdmin && (
                      <div className="wallet-filter wallet-filter-section" style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%" }}>
                        <span className="wallet-filter-label" style={{ fontWeight: 600, margin: 0 }}>Filter by Vendor:</span>
                        <Select
                          placeholder="Select Vendor"
                          className="wallet-filter-select"
                          style={{ minWidth: "200px" }}
                          allowClear
                          loading={loadingList}
                          onChange={(val) => setSelectedVendorId(val)}
                          value={selectedVendorId}
                          showSearch
                          optionFilterProp="children"
                        >
                          {isAdmin && adminInfo && (
                            <Select.Option key="admin-self" value={adminInfo.id}>
                              {adminInfo.e_mail} (Admin)
                            </Select.Option>
                          )}
                          {vendors
                            // .filter((v) => v.is_admin !== 1)
                            .map((v) => (
                              <Select.Option key={v.id} value={v.user_id || v.id}>
                                {v.e_mail}
                              </Select.Option>
                            ))}
                        </Select>
                      </div>
                    )}
                  </div>


                  {/* Stats Cards */}
                  <div
                    className="wallet-stats-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: "20px",
                      marginBottom: "30px",
                    }}
                  >
                    {[1, 2, 3].map((i) => (
                      <Card
                        key={i}
                        bordered={false}
                        className="wallet-stat-card"
                        style={{
                          borderRadius: "16px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          border: "1px solid #f0f0f0",
                        }}
                      >
                        <Skeleton loading={loadingHistory} active avatar={false} paragraph={{ rows: 1 }}>
                          <Statistic
                            title={
                              <span style={{ fontWeight: 600, color: i === 1 ? "#389e0d" : i === 2 ? "#d46b08" : "#cf1322" }}>
                                {i === 1 ? "Total Top-up Amount" : i === 2 ? "Pending Amount" : "Total Usage Amount"}
                              </span>
                            }
                            value={i === 1 ? stats.totalTopup : i === 2 ? stats.pendingAmount : stats.totalUsage}
                            precision={2}
                            prefix="₹"
                            valueStyle={{
                              color: i === 1 ? "#389e0d" : i === 2 ? "#d46b08" : "#cf1322",
                              fontWeight: "700",
                              fontSize: "28px",
                            }}
                          />
                        </Skeleton>
                      </Card>
                    ))}
                  </div>

                  {/* Transactions Table */}
                  <Card
                    style={{
                      borderRadius: "16px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Skeleton loading={loadingHistory || loadingTable} active paragraph={{ rows: 10 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 20,
                        }}
                      >
                        <span
                          style={{
                            color: "#333",
                            fontWeight: 600,
                            fontSize: "18px",
                          }}
                        >
                          Recent Transactions
                        </span>
                        <Button
                          icon={<ReloadOutlined />}
                          size="small"
                          onClick={() => fetchWalletHistory(selectedVendorId)}
                          loading={loadingHistory}
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

                      <Table<WalletTx>
                        rowKey="id"
                        loading={loadingHistory}
                        dataSource={filteredHistory}
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 'max-content' }}
                        columns={[
                          // { title: "#ID", dataIndex: "id", width: 80 },
                          {
                            title: "Booking ID",
                            dataIndex: "booking_id",
                            filters: [
                              { text: "Flight", value: "FLIGHT" },
                              { text: "Hotel", value: "HOTEL" },
                              { text: "Payments", value: "WALLET" },
                            ],
                            onFilter: (value: any, record: any) => {
                              if (value === "FLIGHT") return record.booking_type === "FLIGHT";
                              if (value === "HOTEL") return record.booking_type === "HOTEL";
                              if (value === "WALLET") {
                                return record.booking_id === "-";
                              }
                              return true;
                            },
                            render: (text, record) => {
                              return text === "-" ? (
                                <span style={{ color: "#aaa" }}>-</span>
                              ) : (
                                <a
                                  href={
                                    record.booking_type === "HOTEL"
                                      ? `/hotel-listing/stepper/booking-details?bookingId=${text}`
                                      : `/BookingDetails?booking_id=${text}`
                                  }
                                  style={{
                                    fontWeight: 600,
                                    fontFamily: "monospace",
                                    color: "#1890ff",
                                  }}
                                >
                                  {record.booking_type === "HOTEL" ? "H-" : "F-"}
                                  {text}
                                </a>
                              );
                            },
                          },
                          { title: "Description", dataIndex: "description" },
                          {
                            title: "Date & Time",
                            dataIndex: "created_at",
                            width: 200,
                            render: (text) => (
                              <span style={{ color: "#666" }}>{text}</span>
                            ),
                          },
                          {
                            title: "Amount",
                            dataIndex: "amount",
                            align: "right",
                            render: (amount, record) => (
                              <span
                                style={{
                                  color:
                                    record.type === "CREDIT" ? "#389e0d" : "#cf1322",
                                  fontWeight: "bold",
                                  fontSize: "16px",
                                }}
                              >
                                {record.type === "CREDIT" ? "+" : "-"} ₹
                                {amount.toLocaleString()}
                              </span>
                            ),
                          },
                        ]}
                      />
                    </Skeleton>
                  </Card>
                </div>
              )}

              {/* Vendors Section */}
              {activeTab === "vendors" && isAdmin && (
                <div style={{ marginTop: "20px", padding: "20px" }}>
                  <style jsx>{`
                    @media (max-width: 768px) {
                      .vendor-header-actions {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 12px !important;
                      }
                      .vendor-title-wrapper {
                        width: 100%;
                        margin-bottom: 4px;
                      }
                      .vendor-header-actions .ant-btn {
                        margin-left: 0 !important;
                        margin-right: 0 !important;
                        width: auto !important;
                      }
                    }
                  `}</style>
                  <Card
                    style={{
                      borderRadius: "16px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div
                      className="vendor-header-actions"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 20,
                      }}
                    >
                      <div className="vendor-title-wrapper" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <SafetyOutlined style={{ color: "#ff8a00" }} />
                        <span
                          style={{
                            color: "#333",
                            fontWeight: 600,
                            fontSize: "18px",
                          }}
                        >
                          Vendors
                        </span>
                      </div>
                      <Button
                        onClick={() => window.location.href = '/user-create'}
                        style={{
                          // marginLeft: "auto",
                          marginRight: 8,
                          background: "linear-gradient(90deg,#ff8a00,#ff6a00)",
                          border: "none",
                          color: "white",
                        }}
                      >
                        Create Vendor
                      </Button>
                      <Button
                        icon={<ReloadOutlined />}
                        size="small"
                        onClick={fetchVendors}
                        loading={loadingList}
                        style={{
                          background: "linear-gradient(90deg,#ff8a00,#ff6a00)",
                          border: "none",
                          color: "white",
                        }}
                      >
                        Refresh
                      </Button>
                    </div>

                    <div style={{ flex: 1, overflow: "auto" }}>
                      <Table<Vendor>
                        rowKey="id"
                        loading={loadingList}
                        dataSource={vendors}
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 'max-content' }}
                        columns={[
                          { title: "Email", dataIndex: "e_mail", ellipsis: true },
                          { title: "Phone", dataIndex: "phone" },
                          { title: "Wallet", dataIndex: "balance" },

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
                  </Card>
                </div>
              )}
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
