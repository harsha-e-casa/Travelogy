import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Select, DatePicker, Button } from "antd";
import { FilterOutlined, CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import AmendmentModal from "./AmendmentModal";
import TableSkeleton from "./TableSkeleton";

import { postAmendmentDetails, postData } from "@/services/NetworkAdapter";

function formatDateTime(isoString) {
  if (!isoString) return "--";
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hour}:${minute}`;
}

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];

const AmendmentList = ({
  loading,
  amendments,
  statusOptions,
  statusFilter,
  setStatusFilter,
  amountFilter,
  setAmountFilter,
  emailOptions,
  emailFilter,
  setEmailFilter,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[1]);
  const [sortBy, setSortBy] = useState("idIndex");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  let sortedBookings = amendments ? [...amendments] : [];
  if (sortBy === "idIndex") {
    if (sortOrder === "desc") sortedBookings.reverse();
  }
  if (sortBy === "amount") {
    sortedBookings.sort((a, b) => {
      const aAmt = Number(a.amount) || 0;
      const bAmt = Number(b.amount) || 0;
      return sortOrder === "asc" ? aAmt - bAmt : bAmt - aAmt;
    });
  }

  const total = sortedBookings.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const startIdx = (page - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const pagedBookings = sortedBookings.slice(startIdx, endIdx);


  const handleSort = (by) => {
    if (sortBy === by) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(by);
      setSortOrder("asc");
    }
    setPage(1);
  };

  const handleAmendmentClick = async (amendmentId) => {
    try {
      setIsModalLoading(true);
      let reqData = {
        action: "pollAmendment",
        requestData: { amendmentId: amendmentId },
      };
      const amendmentDetails = await postData(
        "travelogy/one-way/fetch-data",
        reqData
      );

      setModalData(amendmentDetails);
      setIsModalOpen(true);
      setIsModalLoading(false);
    } catch (error) {
      console.error("Error fetching amendment details:", error);
      setModalData({ error: error.response.data.errors[0].message || "--" });
      setIsModalOpen(true);
      setIsModalLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const getStatusClass = (status) => {
    if (!status) return "status-badge";
    const statusLower = status.toLowerCase();
    if (statusLower.includes("success")) return "status-badge status-success";
    if (statusLower.includes("pending")) return "status-badge status-pending";
    if (statusLower.includes("failed")) return "status-badge status-failed";
    if (statusLower.includes("unconfirmed"))
      return "status-badge status-unconfirmed";
    return "status-badge";
  };

  return (
    <div className="table-section">
      {/* Backdrop */}
      {showFilters && (
        <div
          className="filter-backdrop show"
          onClick={() => setShowFilters(false)}
        />
      )}

      <div className={`filters-section ${showFilters ? "show-filters" : ""}`}>
        <div className="filters-header md:hidden flex justify-between items-center mb-4 w-full" style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '15px',
          borderBottom: '1px solid #e5e7eb',
          paddingBottom: '15px'
        }}>
          <div className="flex items-center gap-2">
            <FilterOutlined />
            <span className="text-lg font-bold" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Filters</span>
          </div>
          <CloseOutlined onClick={() => setShowFilters(false)} style={{ fontSize: '1.2rem', padding: '5px', cursor: 'pointer' }} />
        </div>
        <div className="filter-group">
          <label className="filter-label">Email:</label>
          <Select
            style={{ width: 190, textAlign: "left" }}
            value={emailFilter}
            onChange={(value) => {
              setEmailFilter(value);
              setPage(1);
            }}
          >
            <Select.Option value="">All</Select.Option>
            {emailOptions?.map((email) => (
              <Select.Option key={email} value={email}>
                {email}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="filter-group">
          <label className="filter-label">Status:</label>
          <Select
            style={{ width: 150, textAlign: "left" }}
            value={statusFilter}
            onChange={(value) => {
              setStatusFilter(value);
              setPage(1);
            }}
          >
            <Select.Option value="">All</Select.Option>
            {statusOptions.map((status) => (
              <Select.Option key={status} value={status}>
                {status}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="filter-group">
          <label className="filter-label">Amendment Date From:</label>
          <DatePicker
            style={{ width: 160 }}
            format="YYYY-MM-DD"
            placeholder="DD/MM/YYYY"
            value={fromDate ? dayjs(fromDate) : null}
            onChange={(date, dateString) => {
              setFromDate(dateString);
              setPage(1);
            }}
          />
        </div>
        <div className="filter-group">
          <label className="filter-label">To:</label>
          <DatePicker
            style={{ width: 160 }}
            format="YYYY-MM-DD"
            placeholder="DD/MM/YYYY"
            value={toDate ? dayjs(toDate) : null}
            onChange={(date, dateString) => {
              setToDate(dateString);
              setPage(1);
            }}
          />
        </div>
        <Button
          onClick={() => {
            setEmailFilter("");
            setStatusFilter("");
            setFromDate("");
            setToDate("");
            setPage(1);
          }}
        >
          Reset
        </Button>
      </div>

      <div
        className="filters-toggle-btn"
        onClick={() => setShowFilters(!showFilters)}
      >
        <FilterOutlined /> Filters
      </div>

      {/* Pagination Row */}
      <div className="table-header">
        <div className="pagination-info">
          <div className="rows-per-page">
            <label className="filter-label">Rows per page:</label>
            <Select
              style={{ width: 80 }}
              value={pageSize}
              onChange={(value) => {
                setPageSize(Number(value));
                setPage(1);
              }}
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <Select.Option key={size} value={size}>
                  {size}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="pagination-controls">
          <span className="page-info">
            Page {page} of {pageCount}
          </span>
          <button
            className="pagination-btn"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            className="pagination-btn"
            onClick={() => setPage((prev) => Math.min(prev + 1, pageCount))}
            disabled={page === pageCount}
          >
            Next
          </button>
        </div>
      </div>
      <AmendmentModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        data={modalData}
        loading={isModalLoading}
      />
      <div className="table-responsive">
        {loading ? (
          <TableSkeleton rows={pageSize} columns={7} />
        ) : (
          <table className="modern-table">
          <thead>
            <tr>
              <th
                className="cursor-pointer select-none"
                onClick={() => handleSort("idIndex")}
              >
                ID
                {sortBy === "idIndex" && (
                  <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                )}
              </th>
              <th>Booking ID</th>
              <th>Amendment ID</th>
              <th
                className="cursor-pointer select-none"
                onClick={() => handleSort("amount")}
              >
                Amount
                {sortBy === "amount" && (
                  <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                )}
              </th>
              <th>Type Of Amendment</th>
              <th>Status</th>
              <th>Time Of Amendment</th>
            </tr>
          </thead>
          <tbody>
            {!amendments || amendments.length === 0 ? (
              <tr>
                <td colSpan={7} className="empty-state">
                  <div className="empty-state-text">No Amendments found</div>
                </td>
              </tr>
            ) : pagedBookings.length > 0 ? (
              pagedBookings.map((b, idx) => (
                <tr key={b.id || idx}>
                  <td>{startIdx + idx + 1}</td>
                  <td >
                    <Link href={`/BookingDetails?booking_id=${b.booking_id}`}>
                      {b.booking_id}
                    </Link>
                  </td>
                  <td
                    onClick={() => handleAmendmentClick(b.amendment_id)}
                  >
                    {b.amendment_id || "--"}
                  </td>
                  <td >
                    {b.refundable_amount || "--"}
                  </td>
                  <td >
                    {b.type_of_amendment || "--"}
                  </td>
                  <td >
                    {b.amendment_status || "--"}
                  </td>
                  <td >{formatDateTime(b.time)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="empty-state">
                  <div className="empty-state-text">No amendments found</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        )}
      </div>

      <div className="table-footer">
        <span>
          Showing {total === 0 ? 0 : startIdx + 1} to {Math.min(endIdx, total)}{" "}
          of {total} bookings
        </span>
      </div>
    </div >
  );
};

export default AmendmentList;
