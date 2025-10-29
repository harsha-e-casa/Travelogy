import React, { useState } from "react";
import Link from "next/link";

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

const FlightBookingList = ({
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

  if (!bookings || bookings.length === 0) {
    return <p className="booking-tab">No bookings found.</p>;
  }

  // FILTER LOGIC
  const filteredBookings = bookings.filter((b) => {
    const bookingDate = b.booking_time ? b.booking_time.slice(0, 10) : "";
    let matches = true;

    // Amount filter: supports number, string, range (eg: "100-300")
    if (amountFilter.trim() !== "") {
      const val = amountFilter.trim();
      if (val.includes("-")) {
        const [min, max] = val.split("-").map((s) => s.trim());
        const amt = Number(b.amount);
        if (!isNaN(amt)) {
          matches = matches && amt >= Number(min) && amt <= Number(max);
        } else {
          matches = false;
        }
      } else {
        matches =
          matches &&
          b.amount &&
          b.amount.toString().toLowerCase().includes(val.toLowerCase());
      }
    }

    if (statusFilter.trim() !== "") {
      matches =
        matches &&
        b.status &&
        b.status.toString().toLowerCase().includes(statusFilter.toLowerCase());
    }

    // Date range
    if (fromDate) {
      matches = matches && bookingDate >= fromDate;
    }
    if (toDate) {
      matches = matches && bookingDate <= toDate;
    }

    return matches;
  });

  // SORT LOGIC
  let sortedBookings = [...filteredBookings];
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

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
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
    if (statusLower.includes("on_hold")) return "status-badge status-on_hold";
    if (statusLower.includes("aborted")) return "status-badge status-aborted";
    return "status-badge";
  };

  return (
    <div className="table-section">
      {/* Filter Section */}
      <div className="filters-section">
        <div className="filter-group">
          <label className="filter-label">Email:</label>
          <select
            className="filter-select"
            value={emailFilter}
            onChange={(e) => {
              setEmailFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All</option>
            {emailOptions?.map((email) => (
              <option key={email} value={email}>
                {email}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label">Status:</label>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label">Booking Date From:</label>
          <input
            type="date"
            className="filter-input"
            placeholder="DD/MM/YYYY"
            value={fromDate}
            onChange={(e) => {
              setFromDate(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="filter-group">
          <label className="filter-label">To:</label>
          <input
            type="date"
            className="filter-input"
            placeholder="DD/MM/YYYY"
            value={toDate}
            onChange={(e) => {
              setToDate(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <button
          className="bg-gray-200 text-sm text-black py-1 px-3 rounded hover:bg-gray-300"
          onClick={() => {
            setStatusFilter("");
            setFromDate("");
            setToDate("");
            setPage(1);
          }}
        >
          Reset
        </button>
      </div>

      {/* Table Header */}
      <div className="table-header">
        <div className="pagination-info">
          <div className="rows-per-page">
            <label className="filter-label">Rows per page:</label>
            <select
              className="filter-select"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
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
          {pagedBookings.length > 0 ? (
            pagedBookings.map((b, idx) => (
              <tr key={b.id || idx}>
                <td>{startIdx + idx + 1}</td>
                <td>
                  <Link
                    href={`/BookingDetails?booking_id=${b.booking_id}`}
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
                <td>{formatDateTime(b.created)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="empty-state">
                <div className="empty-state-icon">📋</div>
                <div className="empty-state-text">No bookings found.</div>
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

export default FlightBookingList;
