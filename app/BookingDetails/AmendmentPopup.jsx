import { useState } from "react";
import TravellerDetailsModal from "./TravellerDetailsModal";

const AmendmentPopup = ({ bookingId, onSubmit }) => {
  const [showModal, setShowModal] = useState(false);
  const [amendmentType, setAmendmentType] = useState("");
  const [showTravellerModal, setShowTravellerModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedAmendmentId, setSelectedAmendmentId] = useState(null);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);


  const getTravellerInfo = (bookingId, amendmentId) => {
    setSelectedBookingId(bookingId);
    setSelectedAmendmentId(amendmentId);
    setShowTravellerModal(true); // 👈 Opens the TravellerModal
  };

  const handleSubmit = () => {
  console.log("Submitting Amendment");

  if (!amendmentType) {
    alert("Please select an amendment type.");
    return;
  }

   onSubmit(bookingId, amendmentType, "Cancel due to rescheduling", (data) => {
      if (data?.amendmentId) {
        // Now open traveller modal
        getTravellerInfo(bookingId, data.amendmentId);
      } else {
        alert("Amendment ID not found.");
      }
    });
};

  // const handleSubmit = () => {
  //   console.log("Submitting Amendment");

  //   if (!amendmentType) {
  //     alert("Please select an amendment type.");
  //     return;
  //   }
  //   handleClose();
  //   onSubmit(bookingId, amendmentType, "Cancel due to rescheduling", (data) => {
  //     console.log("🔎 Callback received data:", JSON.stringify(data, null, 2));
  //     alert(`Amendment raised successfully. ID: ${data?.amendmentId || "Not Found"}`);
  //     handleClose();
  //   });
  // };

  return (
    <div>
      <button onClick={handleOpen} className="border border-gray-400 rounded px-4 py-2">
        Cancellation
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-xl relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-2xl text-black"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold text-blue-800 mb-6">AMENDMENTS</h2>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="text-gray-500 mb-1 block">Booking Id</label>
                <div className="text-md text-gray-700">{bookingId}</div>
              </div>
              <div>
                <label className="text-gray-500 mb-1 block">Amendment Type</label>
                <select
                  value={amendmentType}
                  onChange={(e) => setAmendmentType(e.target.value)}
                  className="w-full border-b border-gray-400 py-1 bg-transparent outline-none"
                >
                  <option value="">-- Select --</option>
                  <option value="CANCELLATION">Cancellation</option>
                  <option value="ssr">SSR</option>
                  <option value="full_refund">Full Refund</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="btn btn-gray"
            >
              Raise
            </button>
          </div>
        </div>
      )}

         {showTravellerModal && (
        <TravellerDetailsModal
          bookingId={selectedBookingId}
          amendmentId={selectedAmendmentId}
          onClose={() => setShowTravellerModal(false)}
        />
      )}
    </div>
  );
};

export default AmendmentPopup;
