import { useEffect, useState } from "react";
import { AppContext } from "@/util/AppContext";
import { useContext } from "react";
import Link from "next/link";
import { AppTravellerHotel } from "@/components/searchEngine/TravellerForm";
import AppDateRage from "@/components/searchEngine/AppDateRage";
import dayjs from "dayjs";

export default function BookingCard({
  segmentsPrice,
  totalpricee,
  onSelectOtherRoom,
  searchData,
  hotelData,
  checkinDate,
  checkoutDate,
  setCheckinDate,
  setCheckoutDate,
  setOpenCheckin,
  setOpenCheckout,
  toggleTraveller,
  showTraveller,
  roomsData,
  setRoomsData,
}) {
  const basefare = totalpricee?.fC?.BF;
  const RoomType = totalpricee?.fC?.MB;
  const RoomCategory = totalpricee?.fC?.RC;

  const Airlinegst = totalpricee?.afC?.TAF?.AGST;
  const othertaxes = totalpricee?.afC?.TAF?.OT;
  const totalfare = totalpricee?.fC?.TF;
  const hotelId = totalpricee?.fC?.HID || totalpricee?.hotelId;
  const optionId = totalpricee?.fC?.OID || totalpricee?.optionId;
  const [openDateRange, setOpenDateRange] = useState(null);

  const roomCount = searchData?.roomInfo?.length;
  console.log("totalfare", totalfare);
  console.log("optionId", optionId);
  console.log("hotelId", hotelId);

  const netprice = totalpricee?.fC?.NF;
  const { getCookie } = useContext(AppContext);
  const totalAdults = roomsData.reduce(
    (sum, room) => sum + room.numberOfAdults,
    0
  );
  const totalChildren = roomsData.reduce(
    (sum, room) => sum + room.numberOfChild,
    0
  );
  console.log("roomsData", roomsData);
  return (
    <div className="p-4 bg-white space-y-4">
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
      </div>
      <div className="space-y-3">
        <h5 className="text-md font-bold text-neutral-800">
          {/* Check availability */}
          Search Details
        </h5>
        <div className="grid grid-cols-3 gap-1">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
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
                <AppDateRage
                  value={checkinDate ? new Date(checkinDate) : new Date()}
                  openToDateRange={() => setOpenDateRange(null)}
                  setDatedep={(date) => {
                    if (date) {
                      setCheckinDate(dayjs(date).format("YYYY-MM-DD"));
                    }
                    setOpenDateRange(null);
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
              <span className="text-xs font-semibold">{checkoutDate}</span>
            </button>

            {openDateRange === "checkout" && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute z-50 bg-white shadow-xl mt-2"
              >
                <AppDateRage
                  value={checkoutDate ? new Date(checkoutDate) : new Date()}
                  openToDateRange={() => setOpenDateRange(null)}
                  setDatedep={(date) => {
                    if (date) {
                      setCheckoutDate(dayjs(date).format("YYYY-MM-DD"));
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
                {checkinDate && checkoutDate
                  ? Math.ceil(
                      (new Date(checkoutDate) - new Date(checkinDate)) /
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
              {roomsData?.reduce((sum, room) => sum + room.adults, 0)} Adult
              {roomsData?.reduce((sum, room) => sum + room.adults, 0) > 1
                ? "s"
                : ""}
              , {roomsData?.reduce((sum, room) => sum + room.children, 0)} Child
              {roomsData?.reduce((sum, room) => sum + room.children, 0) > 1
                ? "ren"
                : ""}
            </button>

            {showTraveller && (
              <div
                className="check-avail-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <AppTravellerHotel
                  roomsData={roomsData}
                  onClose={(updatedRooms) => {
                    setRoomsData(updatedRooms);
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
          className="btn btn-book"
        >
          Book This Room
          <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 15L15 8L8 1M15 8L1 8"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
