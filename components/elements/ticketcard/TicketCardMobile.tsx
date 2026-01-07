"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { Radio, Checkbox } from "antd";
import { AppContext } from "@/util/AppContext";
import "./ticketCardMobile.css";

export default function TicketCardMobile({
    ticket,
    flightData,
    reschedule = false,
    requestId = "",
    markup = 0,
    onPriceClick,
    onSelect,
    shareMode = false,
    selectedQuoteFlights = [],
    onQuoteSelectionChange,
}: any) {
    const { getCookie } = useContext(AppContext);
    const isUat = process.env.UAT_ENV === "true";
    const [value, setValue] = useState(0);
    const [showAllFares, setShowAllFares] = useState(false);

    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [infantCount, setInfantCount] = useState(0);

    useEffect(() => {
        const adult = getCookie("gy_adult");
        const child = getCookie("gy_child");
        const infant = getCookie("gy_infant");

        if (adult !== undefined && adult !== "Nan") setAdultCount(Number(adult));
        if (child !== undefined && child !== "Nan") setChildCount(Number(child));
        if (infant !== undefined && infant !== "Nan") setInfantCount(Number(infant));
    }, [getCookie]);

    const formatDuration = (minutes: any) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };

    const calculateTotalPrice = (fare: any) => {
        let total = 0;
        if (fare?.fd?.ADULT) total += adultCount * fare.fd.ADULT.fC.NF;
        if (fare?.fd?.CHILD) total += childCount * fare.fd.CHILD.fC.NF;
        if (fare?.fd?.INFANT) total += infantCount * fare.fd.INFANT.fC.NF;
        total += (Number(markup) || 0);
        return new Intl.NumberFormat("en-IN").format(total);
    };

    const selectedFare = ticket.totalPriceList[value];

    const isQuoteSelected = selectedQuoteFlights?.some(
        (f: any) => f.ticketId === ticket.id && f.fareIndex === value
    );

    const handleCheckboxChange = (e: any) => {
        if (onQuoteSelectionChange) {
            onQuoteSelectionChange(ticket, value, e.target.checked);
        }
    };

    return (
        <div className="ticket-card-mobile card-flight tcm">
            <div className="mobile-card-header">
                {isUat ? (
                    <img
                        className="mobile-airline-logo"
                        src={`/assets/imgs/airlines/${ticket.sI[0].fD.aI.code}.png`}
                        alt={ticket.sI[0].fD.aI.name}
                        onError={(e: any) => {
                            e.target.src = "/assets/imgs/page/homepage1/flight.png";
                        }}
                    />
                ) : (
                    <img
                        className="mobile-airline-logo"
                        src={`/assets/imgs/airlines/${ticket.sI[0].fD.aI.code.toLowerCase()}.png`}
                        alt={ticket.sI[0].fD.aI.name}
                        onError={(e: any) => {
                            e.target.src = "/assets/imgs/page/homepage1/flight.png";
                        }}
                    />
                )}
                {/* <img
                    className="mobile-airline-logo"
                    src={`/assets/imgs/airlines/${ticket.sI[0].fD.aI.code.toLowerCase()}.png`}
                    alt={ticket.sI[0].fD.aI.name}
                    onError={(e: any) => {
                        e.target.src = "/assets/imgs/page/homepage1/flight.png";
                    }}
                /> */}
                <span className="mobile-airline-name">{ticket.sI[0].fD.aI.name}</span>
                {shareMode && (
                    <div style={{ marginLeft: "auto" }}>
                        <Checkbox
                            checked={isQuoteSelected}
                            onChange={handleCheckboxChange}
                        />
                    </div>
                )}
            </div>

            <div className="mobile-flight-segments">
                {ticket.sI.map((segment: any, index: number) => (
                    <div key={index} className="mobile-segment-row">
                        <div className="mobile-city-block">
                            <span className="mobile-time">{dayjs(segment.dt).format("HH:mm")}</span>
                            <span className="mobile-city-code">{segment.da.code}</span>
                        </div>

                        <div className="mobile-duration-block">
                            <span className="mobile-duration">{formatDuration(segment.duration)}</span>
                            <div className="mobile-arrow-icon"></div>
                            <span className="mobile-stops">
                                {segment.stops > 0 ? `${segment.stops} Stop${segment.stops > 1 ? 's' : ''}` : "Non-stop"}
                            </span>
                        </div>

                        <div className="mobile-city-block" style={{ textAlign: "right" }}>
                            <span className="mobile-time">{dayjs(segment.at).format("HH:mm")}</span>
                            <span className="mobile-city-code">{segment.aa.code}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mobile-card-footer">
                <div className="mobile-price-section" onClick={() => onPriceClick && onPriceClick(ticket.id, markup, ticket, value)}>
                    <span className="mobile-price">₹{calculateTotalPrice(selectedFare)}</span>
                    <span className="mobile-fare-type">{selectedFare.fareIdentifier}</span>
                </div>

                {onSelect ? (
                    <button
                        className="mobile-book-btn"
                        onClick={() => onSelect(selectedFare, value)}
                    >
                        Select
                    </button>
                ) : (
                    <Link
                        href={
                            reschedule
                                ? `reschedule-book-ticket?tcs_id=${selectedFare.id}&requestId=${requestId}`
                                : `book-ticket?tcs_id=${selectedFare.id}&markup=${markup || 0}`
                        }
                        className="mobile-book-btn"
                    >
                        Book Now
                    </Link>
                )}
            </div>

            {ticket.totalPriceList.length > 1 && (
                <div className="mobile-view-more" onClick={() => setShowAllFares(!showAllFares)}>
                    {showAllFares ? "Hide additional fares" : "View more fares"}
                </div>
            )}

            {showAllFares && (
                <div className="mt-3">
                    <Radio.Group onChange={(e) => setValue(e.target.value)} value={value} className="w-full flex flex-col gap-2">
                        {ticket.totalPriceList.map((fare: any, idx: number) => (
                            <Radio key={idx} value={idx} className="w-full border p-2 rounded">
                                <div className="flex justify-between items-center w-full">
                                    <span className="text-sm font-bold">₹{calculateTotalPrice(fare)}</span>
                                    <span className="text-xs opacity-70">{fare.fareIdentifier}</span>
                                </div>
                            </Radio>
                        ))}
                    </Radio.Group>
                </div>
            )}
        </div>
    );
}
