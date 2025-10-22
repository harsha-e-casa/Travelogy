import React, { useState, useEffect } from "react";
import Link from "next/link";
import AmendmentModal from "./AmendmentModal";

import { postAmendmentDetails, postData } from "@/services/NetworkAdapter";

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

const AmendmentList = ({
  amendments,
  statusOptions,
  statusFilter,
  setStatusFilter,
  amountFilter,
  setAmountFilter,
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
  const [loading, setLoading] = useState(false);

  if (!amendments || amendments.length === 0) {
    return <p className="booking-tab">No amendments found.</p>;
  }

  let sortedBookings = [...amendments];
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

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPage(1);
  };

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
      setLoading(true);
      // const amendmentDetails = await postAmendmentDetails({
      //   amendmentId: amendmentId,
      // });
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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching amendment details:", error);
      setModalData({ error: error.response.data.errors[0].message || "--" });
      setIsModalOpen(true);
      setLoading(false);
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
      <div className="filters-section">
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
          <label className="filter-label">Amendment Date From:</label>
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
            value={toDate}
            onChange={(e) => {
              setToDate(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* Pagination Row */}
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
      <AmendmentModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        data={modalData}
        loading={loading}
      />
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
            <th>Status</th>
            <th>Time Of Amendment</th>
          </tr>
        </thead>
        <tbody>
          {pagedBookings.length > 0 ? (
            pagedBookings.map((b, idx) => (
              <tr key={b.id || idx}>
                <td>{startIdx + idx + 1}</td>
                <td className="px-3 py-2 border">
                  <Link href={`/BookingDetails?booking_id=${b.booking_id}`}>
                    {b.booking_id}
                  </Link>
                </td>
                <td
                  className="px-3 py-2 border cursor-pointer text-blue-500"
                  onClick={() => handleAmendmentClick(b.amendment_id)}
                >
                  {b.amendment_id || "--"}
                </td>
                <td className="px-3 py-2 border">
                  {b.refundable_amount || "--"}
                </td>
                <td className="px-3 py-2 border">
                  {b.amendment_status || "--"}
                </td>
                <td className="px-3 py-2 border">{formatDateTime(b.time)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="empty-state">
                <div className="empty-state-icon">✏️</div>
                <div className="empty-state-text">No amendments found.</div>
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

export default AmendmentList;
