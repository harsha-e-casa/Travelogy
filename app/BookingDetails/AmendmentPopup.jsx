import { useState } from "react";
import TravellerDetailsModal from "./TravellerDetailsModal";

const AmendmentPopup = ({ bookingId, onSubmit, bookingDetails }) => {
  const [showModal, setShowModal] = useState(false);
  const [amendmentType, setAmendmentType] = useState("");
  const [showTravellerModal, setShowTravellerModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedAmendmentId, setSelectedAmendmentId] = useState(null);
  const [selectedAmendmentType, setSelectedAmendmentType] = useState("");

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const tripInfos = bookingDetails?.itemInfos?.AIR?.tripInfos || [];

  const firstTrip = tripInfos[0];
  const segmentList = firstTrip?.sI || [];
  const firstSegment = segmentList[0];
  const lastSegment = segmentList[segmentList.length - 1];

  const getTravellerInfo = (bookingId, amendmentId, type) => {
    setSelectedBookingId(bookingId);
    setSelectedAmendmentId(amendmentId);
    setSelectedAmendmentType(type); // ✅ Now it works
    setShowTravellerModal(true);
  };

  const handleSubmit = () => {
    console.log("Submitting Amendment ", amendmentType);

    if (!amendmentType) {
      alert("Please select an amendment type.");
      return;
    }

    getTravellerInfo(bookingId, "", amendmentType);

    handleClose();

    // onSubmit(bookingId, amendmentType, "Cancel due to rescheduling", (data) => {
    //   console.log("sssddddd ", data)
    //   if (data?.amendmentId) {
    //     getTravellerInfo(bookingId, data.amendmentId, amendmentType); // ✅ Pass it here
    //   } else {
    //     alert("Amendment ID not found.");
    //   }
    // });
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
      <button
        onClick={handleOpen}
        className="border border-gray-400 rounded px-4 py-2"
      >
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
                <label className="text-gray-500 mb-1 block">
                  Amendment Type
                </label>
                <select
                  value={amendmentType}
                  onChange={(e) => setAmendmentType(e.target.value)}
                  className="w-full border-b border-gray-400 py-1 bg-transparent outline-none"
                >
                  <option value="">-- Select --</option>
                  <option value="CANCELLATION">Cancellation</option>
                  <option value="SSR">SSR</option>
                  <option value="FULL_REFUND">Full Refund</option>
                  <option value="REQUEST_CANCELLATION">Get Cancellation Chareges</option>
                  <option value="REQUEST_FULL_REFUND">Get Full Refund Chareges</option>
                  <option value="REQUEST_VOIDED">Get Void Chareges</option>
                </select>
              </div>
            </div>

            <button onClick={handleSubmit} className="btn btn-gray">
              Raise
            </button>
          </div>
        </div>
      )}

      {showTravellerModal && (
        <TravellerDetailsModal
          bookingId={selectedBookingId}
          amendmentId={selectedAmendmentId}
          amendmentType={selectedAmendmentType}
          bookingDetails={bookingDetails}
          tripKey={`${firstSegment?.da?.code}-${lastSegment?.aa?.code}-${
            firstSegment?.dt?.split("T")[0]
          }`}
          onClose={() => setShowTravellerModal(false)}
        />
      )}
    </div>
  );
};

export default AmendmentPopup;
