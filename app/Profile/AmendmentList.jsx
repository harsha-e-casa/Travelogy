import React, { useState, useEffect } from "react";
import Link from "next/link";
import AmendmentModal from "./AmendmentModal";

import { postAmendmentDetails } from "@/services/NetworkAdapter";

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

const AmendmentList = ({ amendments }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[1]);
  const [amountFilter, setAmountFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sortBy, setSortBy] = useState("idIndex");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);

  if (!amendments || amendments.length === 0) {
    return <p className="booking-tab">No amendments found.</p>;
  }

  const statusOptions = Array.from(
    new Set(amendments.map((b) => b.status).filter((v) => !!v))
  );

  const filteredBookings = amendments.filter((b) => {
    const bookingDate = b.time ? b.time.slice(0, 10) : "";
    let matches = true;

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

    if (fromDate) {
      matches = matches && bookingDate >= fromDate;
    }
    if (toDate) {
      matches = matches && bookingDate <= toDate;
    }

    return matches;
  });

  let sortedBookings = [...filteredBookings];
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
      const amendmentDetails = await postAmendmentDetails({
        amendmentId: amendmentId,
      });

      setModalData(amendmentDetails);
      setIsModalOpen(true);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching amendment details:", error);
      setModalData({ error: error.response.data.errors[0].message || "--" })
      setIsModalOpen(true);
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  return (
    <div className="overflow-x-auto">
      {/* Filter Row */}
      <div className="flex flex-wrap gap-3 items-center mb-2">
        <div>
          <label className="mr-1 text-sm font-medium">Status:</label>
          <select
            className="border px-2 py-1 rounded"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            style={{ width: "110px" }}
          >
            <option value="">All</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-1 text-sm font-medium">
            Amendment Date From:
          </label>
          <input
            type="date"
            className="border px-2 py-1 rounded"
            value={fromDate}
            onChange={(e) => {
              setFromDate(e.target.value);
              setPage(1);
            }}
            style={{ width: "150px" }}
          />
        </div>
        <div>
          <label className="mr-1 text-sm font-medium">To:</label>
          <input
            type="date"
            className="border px-2 py-1 rounded"
            value={toDate}
            onChange={(e) => {
              setToDate(e.target.value);
              setPage(1);
            }}
            style={{ width: "150px" }}
          />
        </div>
      </div>

      {/* Pagination Row */}
      <div className="flex justify-between">
        <div className="flex items-center" style={{ width: "30%" }}>
          <label className="mr-2 font-medium" style={{ width: "40%" }}>
            Rows per page:
          </label>
          <select
            className="border px-2 py-1 rounded"
            value={pageSize}
            onChange={handlePageSizeChange}
            style={{ width: "30%" }}
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end items-center mb-2">
          <span className="mr-2">
            Page {page} of {pageCount}
          </span>
          <button
            className="mx-1 px-2 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            className="mx-1 px-2 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((prev) => Math.min(prev + 1, pageCount))}
            disabled={page === pageCount}
          >
            Next
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th
              className="px-3 py-2 border cursor-pointer select-none"
              onClick={() => handleSort("idIndex")}
            >
              ID
              {sortBy === "idIndex" && (
                <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>
            <th className="px-3 py-2 border">Booking ID</th>
            <th className="px-3 py-2 border">Amendment ID</th>
            <th className="px-3 py-2 border cursor-pointer select-none">
              Amount
            </th>
            <th className="px-3 py-2 border">Status</th>
            <th className="px-3 py-2 border">Time of Amendment</th>
          </tr>
        </thead>
        <tbody>
          {pagedBookings.length > 0 ? (
            pagedBookings.map((b, idx) => (
              <tr key={b.id || idx}>
                <td className="px-3 py-2 border">{startIdx + idx + 1}</td>
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
                <td className="px-3 py-2 border">{b.refundable_amount || "--"}</td>
                <td className="px-3 py-2 border">{b.amendment_status || "--"}</td>
                <td className="px-3 py-2 border">
                  {formatDateTime(b.time)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No amendments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <AmendmentModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} data={modalData} loading={loading} />
      <div className="flex justify-end items-center mt-2 text-sm text-gray-600">
        Showing {total === 0 ? 0 : startIdx + 1} to {Math.min(endIdx, total)} of{" "}
        {total} amendments
      </div>
    </div>
  );
};

export default AmendmentList;
