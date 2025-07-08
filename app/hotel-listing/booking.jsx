import { useEffect, useState } from "react";
import { AppContext } from "@/util/AppContext";
import { useContext } from "react";
import Link from "next/link";

export default function BookingCard({
  segmentsPrice,
  totalpricee,
  onSelectOtherRoom,
}) {
  const basefare = totalpricee?.fC?.BF;
  const RoomType = totalpricee?.fC?.TAF;
  const Airlinegst = totalpricee?.afC?.TAF?.AGST;
  const othertaxes = totalpricee?.afC?.TAF?.OT;
  const totalfare = totalpricee?.fC?.TF;
  const hotelId = totalpricee?.fC?.HID || totalpricee?.hotelId;
  const optionId = totalpricee?.fC?.OID || totalpricee?.optionId;

  console.log("totalfare", totalfare);
  console.log("optionId", optionId);
  console.log("hotelId", hotelId);

  const netprice = totalpricee?.fC?.NF;
  const { getCookie } = useContext(AppContext);

  return (
    <>
      <div className="content-booking-form">
        <div className="item-line-booking flex flex-col gap-2">
          <div className="line-booking-tickets text-md-bold neutral-1000">
            <h5>₹{totalfare}</h5>
          </div>
          <div className="line-booking-tickets text-md-medium neutral-700">
            {RoomType}
          </div>

          <div className="line-booking-tickets">
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

        <div className="box-button-book">
          <Link
            href={`/hotel-listing/stepper?hid=${hotelId}&oid=${optionId}`}
            className="btn btn-book"
          >
            Book Now
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

        <div className="box-need-help">
          {" "}
          <a href="help-center.html"></a>
        </div>
        <div className="box-need-help">
          {" "}
          <a href="#">
            <svg
              width={12}
              height={14}
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.83366 3.66667C2.83366 1.92067 4.25433 0.5 6.00033 0.5C7.74633 0.5 9.16699 1.92067 9.16699 3.66667C9.16699 5.41267 7.74633 6.83333 6.00033 6.83333C4.25433 6.83333 2.83366 5.41267 2.83366 3.66667ZM8.00033 7.83333H4.00033C1.88699 7.83333 0.166992 9.55333 0.166992 11.6667C0.166992 12.678 0.988992 13.5 2.00033 13.5H10.0003C11.0117 13.5 11.8337 12.678 11.8337 11.6667C11.8337 9.55333 10.1137 7.83333 8.00033 7.83333Z"
                fill="#0D0D0D"
              />
            </svg>
            Need some help?
          </a>
        </div>
      </div>
    </>
  );
}
