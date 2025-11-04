"use client";
import React from "react";
import PropTypes from "prop-types";

export default function CancellationModal({
  isOpen,
  onClose,
  onConfirm,
  cancellationPolicy,
  isProcessing = false,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      aria-live="assertive"
    >
      <div className="absolute inset-0 bg-black/50 z-0" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-[92%] max-w-2xl rounded-md bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b">
          <h2 className="text-center text-orange-500 font-semibold text-lg sm:text-xl tracking-wide">
            CANCELLATION POLICY
          </h2>
        </div>
        
        <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
          {cancellationPolicy && cancellationPolicy.length > 0 ? (
            <div className="space-y-4">
              <p className="text-gray-700 text-sm mb-4">
                Please review the cancellation policy before proceeding:
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Period
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        From Date
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        To Date
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        Cancellation Charges
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cancellationPolicy.map((policy, index) => {
                      const fromDate = policy.fdt
                        ? new Date(policy.fdt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A";
                      const toDate = policy.tdt
                        ? new Date(policy.tdt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A";

                      return (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="border border-gray-300 px-4 py-3 text-sm text-gray-800">
                            Period {index + 1}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            {fromDate}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            {toDate}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-sm">
                            <span
                              className={`font-semibold ${
                                policy.am === 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {policy.am === 0
                                ? "Free Cancellation"
                                : `₹${policy.am.toLocaleString()}`}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Once you confirm cancellation, this
                  action cannot be undone. Applicable charges will be deducted
                  as per the policy above.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-700">
                No cancellation policy information available.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Do you want to proceed with the cancellation?
              </p>
            </div>
          )}
        </div>

        <div className="px-6 pb-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-none back-to-btn"
            disabled={isProcessing}
          >
            BACK
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-none book-now-btn disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isProcessing}
          >
            {isProcessing ? "CANCELLING..." : "CONFIRM CANCELLATION"}
          </button>
        </div>
      </div>
    </div>
  );
}

CancellationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  cancellationPolicy: PropTypes.arrayOf(
    PropTypes.shape({
      fdt: PropTypes.string,
      tdt: PropTypes.string,
      am: PropTypes.number,
    })
  ),
  isProcessing: PropTypes.bool,
};
