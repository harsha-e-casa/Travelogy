import { useEffect, useState, useRef } from "react";
import { AppContext } from "@/util/AppContext";
import { useContext } from "react";
import Link from "next/link";
import { AppTravellerHotel } from "@/components/searchEngine/TravellerForm";
// import AppDateRage from "@/components/searchEngine/AppDateRage";
import AppDateRange from "@/components/searchEngine/AppDateRange";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { postData } from "@/services/NetworkAdapter";

import dayjs from "dayjs";

export default function BookingCard({
  segmentsPrice,
  totalpricee,
  isFetching,
  onSelectOtherRoom,
  searchData,
  hotelData,
  checkinDate,
  checkoutDate,
  setCheckinDate,
  setCheckoutDate,
  setTriggerFetch,
  setOpenCheckin,
  setOpenCheckout,
  toggleTraveller,
  showTraveller,
  roomsData,
  setRoomsData,
  openDateRange,
  setOpenDateRange,
  availabilityError,
  markupObj,
  onMarkupUpdate,
}) {
  const basefare = totalpricee?.fC?.BF;
  const taxAndFees = totalpricee?.tfcs?.TAF || 0;
  const RoomType = totalpricee?.fC?.MB;
  const RoomCategory = totalpricee?.fC?.RC;

  const Airlinegst = totalpricee?.afC?.TAF?.AGST;
  const othertaxes = totalpricee?.afC?.TAF?.OT;
  const totalfare = totalpricee?.fC?.TF;
  const hotelId = totalpricee?.fC?.HID || totalpricee?.hotelId;
  const optionId = totalpricee?.fC?.OID || totalpricee?.optionId;

  const roomCount = searchData?.roomInfo?.length;
  const netprice = totalpricee?.fC?.NF;
  const { getCookie, setCookie } = useContext(AppContext);

  // Markup & Breakdown States
  const markup =
    markupObj?.individual?.[optionId] !== undefined
      ? markupObj.individual[optionId]
      : markupObj?.global || 0;

  const [showMarkupPopup, setShowMarkupPopup] = useState(false);
  const [tempMarkup, setTempMarkup] = useState("0");
  const [showTaxDetails, setShowTaxDetails] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleUpdateMarkup = () => {
    const newMarkup = Number(tempMarkup);
    if (onMarkupUpdate) {
      onMarkupUpdate(newMarkup, false, optionId);
    }
    setShowMarkupPopup(false);
    setSnackbarOpen(true);

    // Save to cookies for persistence across pages
    setCookie("hotel_markup_" + optionId, newMarkup.toString());
  };

  const handleUpdateAllMarkup = () => {
    console.log("Updating all markup to:", tempMarkup);
    const newMarkup = Number(tempMarkup);
    if (onMarkupUpdate) {
      onMarkupUpdate(newMarkup, true);
    }
    setShowMarkupPopup(false);
    setSnackbarOpen(true);

    // Save to cookies for all options if needed, but usually we just save the current one
    // or we could save a global markup cookie
    setCookie("hotel_markup_global", newMarkup.toString());
  };
  
  const displayAmount = (Number(totalfare) || 0) + markup;

  const totalAdults = roomsData.reduce(
    (sum, room) => sum + room.numberOfAdults,
    0
  );
  const totalChildren = roomsData.reduce(
    (sum, room) => sum + room.numberOfChild,
    0
  ); // Helpers placed at the top of the component
  const normalizeRoomsForModal = (rooms) =>
    (rooms || []).map((r) => ({
      adults: r?.adults ?? r?.numberOfAdults ?? 1,
      children: r?.children ?? r?.numberOfChild ?? 0,
      childAges: Array.isArray(r?.childAges) ? r.childAges : r?.childAge ?? [],
    }));

  const denormalizeRoomsFromModal = (rooms) =>
    (rooms || []).map((r) => ({
      numberOfAdults: r?.adults ?? 1,
      numberOfChild: r?.children ?? 0,
      childAge: Array.isArray(r?.childAges) ? r.childAges : [],
    }));

  // Use ref to store temporary check-in date and calculated checkout
  const tempCheckinRef = useRef(null);
  const tempCheckoutRef = useRef(null);
  const isSelectionRef = useRef(false);

  // Calculate display checkout date (either temp or actual)
  const displayCheckoutDate = tempCheckoutRef.current || checkoutDate;

  return (
    <div className="p-0 bg-white space-y-4">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%", marginTop: "60px" }}
        >
          Markup updated successfully.
        </Alert>
      </Snackbar>
      <div className="item-line-booking">
        <div className="">
          
           {/* Total Price + Markup Edit Icon */}
           <div className="flex flex-row items-center gap-2 mb-1 relative">
             <p className="text-2xl font-bold text-neutral-900 leading-none m-0">
               ₹{displayAmount?.toLocaleString()}
             </p>
             <div
                  className="cursor-pointer flex items-center justify-center"
                  onClick={() => {
                    setTempMarkup(markup.toString());
                    setShowMarkupPopup(!showMarkupPopup);
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
             </div>

             {/* Markup Popup */}
             {showMarkupPopup && (
                  <div className="absolute top-8 left-0 bg-white shadow-xl rounded-lg p-3 border border-gray-200 z-50 w-60">
                    <button
                      onClick={() => setShowMarkupPopup(false)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>

                    <div className="mt-5 mb-3 bg-gray-50 border border-gray-100 rounded p-2">
                      <label className="block text-xs text-gray-400 font-medium mb-0.5">
                        Markup Price
                      </label>
                      <input
                        type="number"
                        value={tempMarkup}
                        onChange={(e) => setTempMarkup(e.target.value)}
                        className="w-full bg-transparent text-lg text-gray-900 font-semibold focus:outline-none placeholder-gray-300"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleUpdateMarkup}
                        className="flex-1 text-white rounded px-2 py-2 text-xs font-bold bg-orange-500 hover:bg-orange-600 transition shadow-sm uppercase"
                        style={{background:"orange"}}
                      >
                        Update
                      </button>
                      <button
                        onClick={handleUpdateAllMarkup}
                        className="flex-1 text-white rounded px-2 py-2 text-xs font-bold bg-orange-500 hover:bg-orange-600 transition shadow-sm uppercase"
                        style={{background:"orange"}}
                      >
                        Update All
                      </button>
                    </div>
                  </div>
                )}
           </div>

           {/* Room Info */}
          <span className="line-booking-tickets block mb-1">{RoomCategory}</span>
        </div>
        <div className="line-booking-tickets text-sm text-neutral-700 uppercase mb-2">
          {RoomType}
        </div>
        
        {/* Select Other Room */}
        <div className="line-booking-tickets py-2 border-b border-dashed border-gray-200 mb-2">
          <a
            onClick={(e) => {
              e.preventDefault();
              onSelectOtherRoom?.();
            }}
            className="room_fac flex items-center gap-1 text-md cursor-pointer text-orange-600 font-medium"
          >
            Select Other Room
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </div>

        {/* Collapsible Tax Breakdown (Optional/Subtle) */}
         <div className="flex flex-col mb-2">
            <div className="flex flex-row items-center cursor-pointer gap-2" onClick={() => setShowTaxDetails(!showTaxDetails)}>
                <span className="text-xs text-gray-400 underline">View Price Breakdown</span>
            </div>
            {showTaxDetails && (
              <div className="mt-2 pl-2 flex flex-col gap-1 border-l-2 border-gray-100">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Base Fare</span>
                  <span>₹{Number(basefare)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Taxes and Fees</span>
                  <span>₹{Number(taxAndFees)}</span>
                </div>
                {markup > 0 && (
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Markup</span>
                    <span>₹{Number(markup).toFixed(2)}</span>
                  </div>
                )}
              </div>
            )}
         </div>

        {/* Display availability error if present */}
        {availabilityError && (
          <div className="mt-3 p-3 bg-red-50 border border-red-300 rounded-md">
            <div className="flex items-start gap-2">
              <div className="flex-1">
                {/* <p className="text-xs font-semibold text-red-800 mb-1">
                  Availability Issue
                </p> */}
                <p className="text-xs text-red-700">
                  {availabilityError}
                </p>
                <p className="text-xs text-red-600 mt-1">
                  Please try different dates or room selections.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="space-y-3">
        <h5 className="text-md font-bold text-neutral-800">
          {/* Check availability */}
          Check Avaiability
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                isSelectionRef.current = false;
                setOpenDateRange("checkin");
              }}
              className="w-full border px-3 py-2 rounded text-left bg-white"
            >
              {" "}
              <label className="text-xs text-gray-500 mb-1 block">
                Check-in
              </label>
              <span className="text-xs font-semibold">{checkinDate}</span>
            </button>

            {openDateRange === "checkin" && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute z-50 bg-white shadow-xl mt-2"
              >
                <AppDateRange
                  minDate={dayjs()}
                  valueDate={checkinDate ? dayjs(checkinDate) : null}
                  openToDateRange={() => {
                    // Only open checkout if a selection was made (handled by setDatedep logic setting state)
                    // If not selecting (just closing/cancelling), close the picker by setting null
                    if (!isSelectionRef.current) {
                      setOpenDateRange(null);
                    }
                  }}
                  setDatedep={(date) => {
                    const newDate = date ? date.format("YYYY-MM-DD") : null;
                    const dateChanged = newDate !== checkinDate;

                    if (dateChanged && newDate) {
                      isSelectionRef.current = true;
                      // Store new check-in date in ref (temporary)
                      tempCheckinRef.current = newDate;

                      // Calculate new checkout date (check-in + 1 day) and store in ref
                      const newCheckoutDate = dayjs(newDate).add(1, "day").format("YYYY-MM-DD");
                      tempCheckoutRef.current = newCheckoutDate;

                      // Update check-in date in state
                      setCheckinDate(newDate);

                      // DON'T clear checkout or trigger fetch yet - wait for checkout confirmation

                      // Open checkout picker after changing date
                      setOpenDateRange("checkout");
                    } else {
                      setCheckinDate(newDate);
                      // If date didn't change, we still might want to open checkout if they re-clicked same date?
                      // User said "checkout data should open when the checkin data is changed."
                      // If it's NOT changed, maybe we shouldn't open checkout?
                      // But usually selecting *any* date implies moving forward.
                      // Let's assume selecting (even same date) should move forward, 
                      // but closing without any action should not.
                      // So we treat 'clicking a date' as a selection event.
                      isSelectionRef.current = true;
                      setOpenDateRange("checkout");
                    }
                  }}
                />
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenDateRange("checkout");
              }}
              className="w-full border px-3 py-2 rounded text-left bg-white"
            >
              <label className="text-xs text-gray-500 mb-1 block">
                Check-out
              </label>
              <span className="text-xs font-semibold">{displayCheckoutDate}</span>
            </button>

            {openDateRange === "checkout" && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute z-50 bg-white shadow-xl mt-2"
              >
                <AppDateRange
                  minDate={
                    checkinDate ? dayjs(checkinDate) : dayjs()
                  }
                  valueDate={displayCheckoutDate ? dayjs(displayCheckoutDate) : null}
                  isCheckout={true}
                  openToDateRange={() => {
                    // Just close the date picker without triggering any fetch
                    setOpenDateRange(null);
                  }}
                  setDatedep={(date) => {
                    const newDate = date ? date.format("YYYY-MM-DD") : null;

                    console.log('Checkout date selected:', {
                      newDate,
                      currentCheckoutDate: checkoutDate,
                      tempCheckin: tempCheckinRef.current,
                      tempCheckout: tempCheckoutRef.current
                    });

                    // Check if we have a temporary check-in date from recent selection
                    const effectiveCheckinDate = tempCheckinRef.current || checkinDate;

                    if (newDate && effectiveCheckinDate) {
                      console.log('Triggering fetch with:', {
                        checkin: effectiveCheckinDate,
                        checkout: newDate
                      });

                      // If we have a temp check-in, update it
                      if (tempCheckinRef.current) {
                        setCheckinDate(tempCheckinRef.current);
                      }

                      // Update the checkout date
                      setCheckoutDate(newDate);

                      // Always trigger fetch when user selects a checkout date
                      setTriggerFetch(prev => {
                        console.log('setTriggerFetch called, prev:', prev);
                        return prev + 1;
                      });

                      // Clear the temp refs after processing
                      tempCheckinRef.current = null;
                      tempCheckoutRef.current = null;
                    } else {
                      // Just update checkout if no valid dates
                      setCheckoutDate(newDate);
                    }

                    setOpenDateRange(null);
                  }}
                />
              </div>
            )}
          </div>

          <div className="relative">
            <div className="w-full border px-3 py-2 rounded text-left bg-white">
              <label className="text-xs text-gray-500 mb-1 block">
                Total Night(s)
              </label>{" "}
              <span className="p-2 text-xs font-semibold">
                {checkinDate && displayCheckoutDate
                  ? Math.ceil(
                    (new Date(displayCheckoutDate) - new Date(checkinDate)) /
                    (1000 * 60 * 60 * 24)
                  )
                  : "-"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-neutral-700">
          <div className="flex flex-col border rounded px-3 py-2">
            <span className="text-xs text-gray-500">Check in From</span>
            <span className="text-xs font-semibold">
              {hotelData?.checkInTime?.beginTime || "-"}
            </span>
          </div>
          <div className="flex flex-col border rounded px-3 py-2">
            <span className="text-xs text-gray-500">Check out Till</span>
            <span className="text-xs font-semibold">
              {hotelData?.checkOutTime?.beginTime || "-"}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2 border rounded p-2 text-sm text-neutral-700">
          <div className="text-sm text-neutral-700">
            <label className="text-xs text-gray-500">Persons and Room</label>
            <button
              onClick={toggleTraveller}
              className="w-full text-left text-xs font-semibold"
            >
              {roomsData?.length} Room{roomsData?.length > 1 ? "s" : ""},{" "}
              {totalAdults} Adult
              {totalAdults > 1 ? "s" : ""}, {totalChildren} Child
              {totalChildren > 1 ? "ren" : ""}
            </button>

            {showTraveller && (
              <div
                className="check-avail-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <AppTravellerHotel
                  roomsData={normalizeRoomsForModal(roomsData)}
                  onClose={(updatedRooms) => {
                    setRoomsData(denormalizeRoomsFromModal(updatedRooms));
                    toggleTraveller();
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="box-button-book">
        <Link
          href={`/hotel-listing/stepper?hid=${hotelId}&oid=${optionId}`}
          className="btn btn-book mb-2"
          aria-disabled={isFetching}
          aria-busy={isFetching}
          onClick={(e) => {
            if (isFetching) {
              e.preventDefault();
              return;
            }

            // Call save-markup API when booking is initiated
            // const idToSave = totalpricee?.bookingId || optionId;
            // if (idToSave) {
            //   postData("travelogy/flight/save-markup", {
            //     bookingId: idToSave,
            //     markup: markup,
            //   }).catch((error) => {
            //     console.error("Error saving markup on book click:", error);
            //   });
            // }
          }}
        >
          {isFetching ? "Updating Room Details..." : "Book This Room"}
          {!isFetching && (
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 inline-block"
            >
              <path
                d="M8 15L15 8L8 1M15 8L1 8"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </Link>
      </div>
    </div>
  );
}
