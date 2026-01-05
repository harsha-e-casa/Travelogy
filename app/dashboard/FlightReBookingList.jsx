import React, { useState } from "react";
import Link from "next/link";
import { Select, DatePicker, Button } from "antd";
import dayjs from "dayjs";

function formatDateTime(isoString) {
  if (!isoString) return "--";
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}`;
}

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];

const FlightReBookingList = ({
  bookings,
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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[1]);
  const [sortBy, setSortBy] = useState("idIndex"); // "idIndex" or "amount"
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

  // SORT LOGIC
  let sortedBookings = [...bookings];
  if (sortBy === "idIndex") {
    // sort by index (which is just order of appearance)
    if (sortOrder === "desc") sortedBookings.reverse();
    // else keep as is for asc
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

  const handlePageSizeChange = (value) => {
    setPageSize(Number(value));
    setPage(1);
  };

  // SORT HANDLERS
  const handleSort = (by) => {
    if (sortBy === by) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(by);
      setSortOrder("asc");
    }
    setPage(1);
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
      <div className="filters-section">
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
          <label className="filter-label">Booking Date From:</label>
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

      {/* Pagination Row */}
      <div className="table-header">
        <div className="pagination-info">
          <div className="rows-per-page">
            <label className="filter-label">Rows per page:</label>
            <Select
              style={{ width: 80 }}
              value={pageSize}
              onChange={handlePageSizeChange}
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
            <th>Old Booking ID</th>
            <th>Booking ID</th>
            <th
              className="cursor-pointer select-none"
              onClick={() => handleSort("amount")}
            >
              Amount
              {sortBy === "amount" && (
                <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>
            <th>Status</th>
            <th>Booking Time</th>
          </tr>
        </thead>
        <tbody>
          {!bookings || bookings.length === 0 ? (
            <tr>
              <td colSpan={6} className="empty-state">
                <div className="empty-state-text">No Re-bookings found</div>
              </td>
            </tr>
          ) : pagedBookings.length > 0 ? (
            pagedBookings.map((b, idx) => (
              <tr key={b.id || idx}>
                <td>{startIdx + idx + 1}</td>
                <td>
                  <Link
                    href={`/BookingDetails?booking_id=${b.old_booking_id}`}
                    className="booking-id"
                  >
                    {b.old_booking_id}
                  </Link>
                </td>
                <td>
                  <Link
                    href={`/BookingDetails?booking_id=${b.booking_id}?re=true`}
                    className="booking-id"
                  >
                    {b.booking_id}
                  </Link>
                </td>
                <td>{b.amount || "--"}</td>
                <td>
                  <span className={getStatusClass(b.status)}>
                    {b.status || "--"}
                  </span>
                </td>
                <td>{formatDateTime(b.booking_time)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="empty-state">
                <div className="empty-state-icon"></div>
                <div className="empty-state-text">No Re-bookings found</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="table-footer">
        <span>
          Showing {total === 0 ? 0 : startIdx + 1} to {Math.min(endIdx, total)}{" "}
          of {total} bookings
        </span>
      </div>
    </div>
  );
};

export default FlightReBookingList;
