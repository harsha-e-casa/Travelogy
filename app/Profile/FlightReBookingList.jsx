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
  return `${year}-${month}-${day} ${hour}:${minute}`;
}

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];

const FlightReBookingList = ({ bookings }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[1]);
  const [amountFilter, setAmountFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sortBy, setSortBy] = useState("idIndex"); // "idIndex" or "amount"
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

  if (!bookings || bookings.length === 0) {
    return <p className="booking-tab">No bookings found.</p>;
  }

  // Get unique statuses for dropdown
  const statusOptions = Array.from(
    new Set(bookings.map((b) => b.status).filter((v) => !!v))
  );

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

  return (
    <div className="overflow-x-auto">
      {/* Filter Row */}
      <div className="flex flex-wrap gap-3 items-center mb-2">
        {/* <div>
          <label className="mr-1 text-sm font-medium">Amount:</label>
          <input
            type="text"
            className="border px-2 py-1 rounded"
            placeholder="100 or 100-300"
            value={amountFilter}
            onChange={(e) => {
              setAmountFilter(e.target.value);
              setPage(1);
            }}
            style={{ width: "100px" }}
          />
        </div> */}
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
          <label className="mr-1 text-sm font-medium">Booking Date From:</label>
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
        <div className="flex items-center" style={{ width: "30%"}}>
          <label className="mr-2 font-medium" style={{ width: "40%"}}>Rows per page:</label>
          <select
            className="border px-2 py-1 rounded"
            value={pageSize}
            onChange={handlePageSizeChange}
            style={{ width: "30%"}}
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
            <th className="px-3 py-2 border cursor-pointer select-none"
                onClick={() => handleSort("idIndex")}>
              ID
              {sortBy === "idIndex" && (
                <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>
            <th className="px-3 py-2 border">Old Booking ID</th>
            <th className="px-3 py-2 border">Booking ID</th>
            <th className="px-3 py-2 border cursor-pointer select-none"
                onClick={() => handleSort("amount")}>
              Amount
              {sortBy === "amount" && (
                <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>
            <th className="px-3 py-2 border">Status</th>
            <th className="px-3 py-2 border">Booking Time</th>
          </tr>
        </thead>
        <tbody>
          {pagedBookings.length > 0 ? (
            pagedBookings.map((b, idx) => (
              <tr key={b.id || idx}>
                <td className="px-3 py-2 border">
                  {startIdx + idx + 1}
                </td>
                <td className="px-3 py-2 border">
                  <Link href={`/BookingDetails?booking_id=${b.old_booking_id}`}>
                    {b.old_booking_id}
                  </Link>
                </td>
                <td className="px-3 py-2 border">
                  <Link href={`/BookingDetails?booking_id=${b.booking_id}`}>
                    {b.booking_id}
                  </Link>
                </td>
                <td className="px-3 py-2 border">{b.amount || "--"}</td>
                <td className="px-3 py-2 border">{b.status || "--"}</td>
                <td className="px-3 py-2 border">{formatDateTime(b.booking_time)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-end items-center mt-2 text-sm text-gray-600">
        Showing {total === 0 ? 0 : startIdx + 1} to {Math.min(endIdx, total)} of {total} bookings
      </div>
    </div>
  );
};

export default FlightReBookingList;

