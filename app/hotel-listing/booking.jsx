import { useEffect, useState, useRef } from "react";
import { AppContext } from "@/util/AppContext";
import { useContext } from "react";
import Link from "next/link";
import { AppTravellerHotel } from "@/components/searchEngine/TravellerForm";
// import AppDateRage from "@/components/searchEngine/AppDateRage";
import AppDateRange from "@/components/searchEngine/AppDateRange";

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
  availabilityError
}) {
  const basefare = totalpricee?.fC?.BF;
  const RoomType = totalpricee?.fC?.MB;
  const RoomCategory = totalpricee?.fC?.RC;

  const Airlinegst = totalpricee?.afC?.TAF?.AGST;
  const othertaxes = totalpricee?.afC?.TAF?.OT;
  const totalfare = totalpricee?.fC?.TF;
  const hotelId = totalpricee?.fC?.HID || totalpricee?.hotelId;
  const optionId = totalpricee?.fC?.OID || totalpricee?.optionId;


  const roomCount = searchData?.roomInfo?.length;
  const netprice = totalpricee?.fC?.NF;
  const { getCookie } = useContext(AppContext);
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
      <div className="item-line-booking">
        <div className="">
          <p className="text-2xl font-bold text-neutral-900">
            ₹{totalfare?.toLocaleString()}
          </p>
          <span className="line-booking-tickets">{RoomCategory}</span>
        </div>
        <div className=" line-booking-tickets text-sm text-neutral-700">
          {RoomType}
        </div>
        <div className="line-booking-tickets py-2">
          <a
            onClick={(e) => {
              e.preventDefault();
              onSelectOtherRoom?.();
            }}
            className="room_fac flex items-center gap-1 text-md cursor-pointer"
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
            if (isFetching) e.preventDefault();
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
