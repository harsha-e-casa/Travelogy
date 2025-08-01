import React from "react";

const AmendmentModal = ({ isOpen, closeModal, data, loading }) => {
  if (!isOpen) return null;

  // Inline styles for the spinner
  const spinnerStyle = {
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #3498db",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    animation: "spin 1s linear infinite",
  };

  // Inline keyframes for spin animation
  const spinKeyframes = {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  };

  // Inject keyframes using a style element
  const styleElement = (
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Amendment Details</h2>

        {/* Show loading spinner if data is still being fetched */}
        {loading ? (
          <div className="flex justify-center items-center py-4">
            {styleElement} {/* Inject the keyframe styles */}
            <div style={spinnerStyle}></div> {/* Apply spinner styles */}
            <p className="ml-2">Loading...</p>
          </div>
        ) : (
          <div>
            {data?.amendmentId && (
              <p>
                <strong>Amendment ID:</strong> {data?.amendmentId || "--"}
              </p>
            )}
            {data?.amendmentStatus && (
              <p>
                <strong>Status:</strong> {data?.amendmentStatus || "--"}
              </p>
            )}
            {data?.refundableAmount && (
              <p>
                <strong>Amount:</strong> {data?.refundableAmount || "--"}
              </p>
            )}
            {data?.remarks && (
              <p>
                <strong>Remark:</strong> {data?.remarks || "--"}
              </p>
            )}
            {data?.error && (
              <p>
                <strong>Error:</strong> {data?.error}
              </p>
            )}
          </div>
        )}

        <button
          onClick={closeModal}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AmendmentModal;