import Link from "next/link";
import dayjs from "dayjs";
import React, { useState, useContext, useEffect } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import "./ticketCard1.css";
import { AppContext } from "@/util/AppContext";

export default function DomesticRoundTripTicketCard({
  ticket,
  handleTicketSelected,
  tripPhase,
  selectedOnwardTicket,
  markup = 0,
  onPriceClick,
  shareMode = false,
  selectedQuoteFlights = [],
  onQuoteSelectionChange,
  selectedFareTypes = [], // New prop
}: any) {
  const isUat = process.env.UAT_ENV === "true";
  const { getCookie } = useContext(AppContext);
  const tripType = getCookie("gy_triptype");
  const [showAllFares, setShowAllFares] = useState(false);

  // State for mobile detection
  const [isMobile, setIsMobile] = useState(false);

  const formatTime = (minutes: any) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  };

  const [value, setValue] = useState(0);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);

  useEffect(() => {
    if (
      getCookie("gy_adult") !== undefined &&
      getCookie("gy_adult") !== "Nan"
    ) {
      setAdultCount(getCookie("gy_adult"));
    }
    if (
      getCookie("gy_child") !== undefined &&
      getCookie("gy_child") !== "Nan"
    ) {
      setChildCount(getCookie("gy_child"));
    }
    if (
      getCookie("gy_infant") !== undefined &&
      getCookie("gy_infant") !== "Nan"
    ) {
      setInfantCount(getCookie("gy_infant"));
    }

    // Add event listener for resizing the window and update isMobile state
    const handleResize = () => {
      if (window.innerWidth <= 770) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Set initial value on mount
    handleResize();

    // Listen for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate fare price
  const calculateTotalPrice = (fare: any) => {
    let total = 0;
    if (fare?.fd?.ADULT) total += adultCount * fare.fd.ADULT.fC.NF;
    if (fare?.fd?.CHILD) total += childCount * fare.fd.CHILD.fC.NF;
    if (fare?.fd?.INFANT) total += infantCount * fare.fd.INFANT.fC.NF;
    total += (Number(markup) || 0);
    return new Intl.NumberFormat("en-IN").format(total);
  };

  // Mobile View UI layout
  const mobileView = (
    <div className="ticket-card-mobile card-flight drtm">
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
      </div>

      <div className="mobile-flight-segments">
        {ticket.sI.map((segment: any, index: number) => (
          <div key={index} className="mobile-segment-row">
            <div className="mobile-city-block">
              <span className="mobile-time">{dayjs(segment.dt).format("HH:mm")}</span>
              <span className="mobile-city-code">{segment.da.code}</span>
            </div>

            <div className="mobile-duration-block">
              <span className="mobile-duration">{formatTime(segment.duration)}</span>
              <div className="mobile-arrow-icon"></div>
              <span className="mobile-stops">
                {segment.stops > 0
                  ? `${segment.stops} Stop${segment.stops > 1 ? 's' : ''}`
                  : "Non-stop"}
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
          <span className="mobile-price">₹{calculateTotalPrice(ticket.totalPriceList[value])}</span>
          <span className="mobile-fare-type">{ticket.totalPriceList[value].fareIdentifier}</span>
        </div>
        {tripPhase === "ONWARD" ? (
          <button
            className="mobile-book-btn"
            onClick={() => handleTicketSelected(ticket, value, markup)}
          >
            Select
          </button>
        ) : (
          selectedOnwardTicket && (
            <Link
              href={`book-ticket?tcs_id=${selectedOnwardTicket.ticket.totalPriceList[
                selectedOnwardTicket.selectedPriceIndex
              ]?.id
                },${ticket.totalPriceList[value]?.id}&markup=${(Number(selectedOnwardTicket.markup) || 0) + (Number(markup) || 0)}`}
              className="mobile-book-btn"
            >
              Book Now
            </Link>
          )
        )}
      </div>

      {ticket.totalPriceList.length > 1 && (
        <div className="mobile-view-more" onClick={(e) => {
          e.stopPropagation();
          setShowAllFares(!showAllFares);
        }}>
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

  // Desktop View UI layout (if needed, you can keep the current structure)
  const desktopView = (
    <div>
      <div>
        <div className="item-flight background-card border-1 ticket-container relative">
          {/* need to render dynamic city if layover */}
          <div className="flex-1 w-full" style={{ minWidth: 0 }}>
            {ticket.sI.map((segment: any, index: number) => (
              <div className="flex justify-evenly" key={segment.id || index}>

                <div className="flight-route flight-route-type-2 city1">
                  <div className="flex flex-col items-center justify-center w-max">
                    {isUat && (
                      <img
                        style={{ width: "50%", margin: "5px" }}
                        src={`/assets/imgs/airlines/${segment["fD"].aI.code}.png`}
                      />
                    )}
                    {!isUat && (
                      <img
                        style={{ width: "50%", margin: "5px" }}
                        src={`/assets/imgs/airlines/${segment[
                          "fD"
                        ].aI.code.toLowerCase()}.png`}
                      />
                    )}
                    <div className="text-sm-medium">
                      {segment["fD"].aI.name}
                    </div>
                  </div>
                </div>
                <div className="flight-route flight-route-type-2 city1">
                  <div className="flight-route-1">
                    <div className="flight-name">
                      <div className="flight-info flex flex-col justify-center items-center">
                        <p className="text-md-bold neutral-1000 city1name">
                          {segment["da"].city}
                          <span className="text-md-bold neutral-1000">
                            ({segment["da"].code})
                          </span>{" "}
                        </p>

                        <p className="text-sm-medium time-flight timelogo">
                          <span className="neutral-1000 time ">
                            {dayjs(segment["dt"]).format("HH:mm")}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* duration */}
                <div className="flight-route flight-route-type-2 city1">
                  <div className="flight-route-1">
                    <div className=" flight-name duration flex flex-col items-center align-center duration">
                      <p className="text-sm-medium neutral-500 totalduration">
                        {" "}
                        {formatTime(segment["duration"])}{" "}
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-arrow-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                        />
                      </svg>

                      <p className="text-sm-medium neutral-500 totalduration">
                        {" "}
                        {segment["stops"] > 0
                          ? `${segment["stops"]}stops`
                          : "non stop"}{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flight-route flight-route-type-2 city1">
                  <div className="flight-route-1">
                    <div className="flight-name">
                      <div className="flight-info flex flex-col items-center align-center">
                        <p className="text-md-bold neutral-1000 align-center city1name">
                          {segment["aa"].city}{" "}
                          <span className="text-md-bold neutral-1000 citycode">
                            ({segment["aa"].code})
                          </span>
                        </p>

                        <p className="text-sm-medium time-flight timelogo">
                          <span className="neutral-1000 time">
                            {dayjs(segment["at"]).format("HH:mm")}{" "}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="flight-price-1 border-1 price-div flex justify-center items-center flex-col cursor-pointer hover:bg-gray-50 transition-colors"
            style={{ width: "auto", minWidth: "220px", paddingLeft: "10px" }}
            onClick={(e) => {
              onPriceClick && onPriceClick(ticket.id, markup, ticket, value);
            }}
          >
            <Radio.Group
              onChange={onChange}
              value={value}
              className="fare-options flex flex-col gap-2  w-full"
            >
              {(showAllFares
                ? ticket.totalPriceList
                : ticket.totalPriceList.slice(0, 2)
              )
                .filter((fare: any) => {
                  if (selectedFareTypes && selectedFareTypes.length > 0) {
                    const fareTypeMap: { [key: number]: string } = {
                      0: "Non Refundable",
                      1: "Refundable",
                      2: "Partial Refundable",
                    };
                    const fareTypeLabel = fareTypeMap[fare.fd.ADULT.rT];
                    return selectedFareTypes.includes(fareTypeLabel);
                  }
                  return true;
                })
                .map((e: any, i: number) => {
                  return (
                    <div key={i} style={{ display: "flex", width: "100%", alignItems: "center" }}>
                      <div style={{ flex: 1 }}>
                        {shareMode ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <Radio value={i} className="w-full radiocomp" disabled={shareMode} style={{ pointerEvents: "none", opacity: 0.6 }}>
                              <div
                                className={`p-0 rounded-lg border-2 transition-all duration-200 radiodiv
                             ${"border-gray-300 hover:border-gray-500"}`}
                              >
                                <div className="flex flex-row gap-2 items-center">
                                  <div className="text-lg font-bold text-gray-800 price">
                                    ₹
                                    {(() => {
                                      let adultCost = 0;
                                      let childCost = 0;
                                      let infantCost = 0;
                                      if (e?.fd?.ADULT) {
                                        if (
                                          getCookie("gy_adult") !== undefined &&
                                          getCookie("gy_adult") !== "Nan"
                                        ) {
                                          adultCost = adultCount * e?.fd?.ADULT?.fC?.NF;
                                        }
                                      }
                                      if (e?.fd?.CHILD) {
                                        if (
                                          getCookie("gy_child") !== undefined &&
                                          getCookie("gy_child") !== "Nan"
                                        ) {
                                          childCost = childCount * e?.fd?.CHILD?.fC?.NF;
                                        }
                                      }
                                      if (e?.fd?.INFANT) {
                                        if (
                                          getCookie("gy_infant") !== undefined &&
                                          getCookie("gy_infant") !== "Nan"
                                        ) {
                                          infantCost =
                                            infantCount * e?.fd?.INFANT?.fC?.NF;
                                        }
                                      }

                                      return new Intl.NumberFormat("en-IN").format(
                                        adultCost + childCost + infantCost + (Number(markup) || 0)
                                      );
                                    })()}
                                  </div>
                                  <span
                                    className=" fareidentifier  text-xs font-bold"
                                    style={{
                                      backgroundColor: "#f5deb3",
                                      color: "#5c4033",
                                      padding: "1px 2px",
                                    }}
                                  >
                                    {e.fareIdentifier}
                                  </span>{" "}
                                </div>

                                <div className="text-xs text-gray-600">
                                  <span className="ml-2 cabinclass">
                                    {e.fd.ADULT.cc} |
                                    <span
                                      className="refundable"
                                      style={{
                                        color:
                                          e.fd.ADULT.rT === 1 || e.fd.ADULT.rT === 2
                                            ? "#22c55e"
                                            : "#dc2626",
                                      }}
                                    >
                                      {" "}
                                      {e.fd.ADULT.rT === 1
                                        ? "Refundable"
                                        : e.fd.ADULT.rT === 2
                                          ? "Partial Refundable"
                                          : "Non Refundable"}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </Radio>
                            <input
                              type="checkbox"
                              style={{ width: "20px", height: "20px", cursor: "pointer" }}
                              checked={selectedQuoteFlights && selectedQuoteFlights.some((f: any) => f.ticketId === ticket.id && f.fareIndex === i)}
                              onChange={(event) => {
                                if (onQuoteSelectionChange) {
                                  onQuoteSelectionChange(ticket, i, event.target.checked);
                                }
                              }}
                              onClick={(event) => event.stopPropagation()}
                            />
                          </div>
                        ) : (
                          <Radio value={i} className="w-full radiocomp">
                            <div
                              className={`p-0 rounded-lg border-2 transition-all duration-200 radiodiv
                           ${"border-gray-300 hover:border-gray-500"}`}
                            >
                              <div className="flex flex-row gap-2 items-center">
                                <div className="text-lg font-bold text-gray-800 price">
                                  ₹
                                  {(() => {
                                    let adultCost = 0;
                                    let childCost = 0;
                                    let infantCost = 0;
                                    if (e?.fd?.ADULT) {
                                      if (
                                        getCookie("gy_adult") !== undefined &&
                                        getCookie("gy_adult") !== "Nan"
                                      ) {
                                        adultCost = adultCount * e?.fd?.ADULT?.fC?.NF;
                                      }
                                    }
                                    if (e?.fd?.CHILD) {
                                      if (
                                        getCookie("gy_child") !== undefined &&
                                        getCookie("gy_child") !== "Nan"
                                      ) {
                                        childCost = childCount * e?.fd?.CHILD?.fC?.NF;
                                      }
                                    }
                                    if (e?.fd?.INFANT) {
                                      if (
                                        getCookie("gy_infant") !== undefined &&
                                        getCookie("gy_infant") !== "Nan"
                                      ) {
                                        infantCost =
                                          infantCount * e?.fd?.INFANT?.fC?.NF;
                                      }
                                    }

                                    return new Intl.NumberFormat("en-IN").format(
                                      adultCost + childCost + infantCost + (Number(markup) || 0)
                                    );
                                  })()}
                                </div>
                                <span
                                  className=" fareidentifier  text-xs font-bold"
                                  style={{
                                    backgroundColor: "#f5deb3",
                                    color: "#5c4033",
                                    padding: "1px 2px",
                                  }}
                                >
                                  {e.fareIdentifier}
                                </span>{" "}
                              </div>

                              <div className="text-xs text-gray-600">
                                <span className="ml-2 cabinclass">
                                  {e.fd.ADULT.cc} |
                                  <span className="refundable" style={{
                                    color:
                                      e.fd.ADULT.rT === 1 || e.fd.ADULT.rT === 2
                                        ? "#22c55e"
                                        : "#dc2626",
                                  }}>
                                    {" "}
                                    {e.fd.ADULT.rT === 1
                                      ? "Refundable"
                                      : e.fd.ADULT.rT === 2
                                        ? "Partial Refundable"
                                        : "Non Refundable"}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </Radio>
                        )}
                      </div>
                    </div>
                  );
                })}
              {ticket.totalPriceList.length > 2 && (
                <button
                  className="view-more-txt"
                  style={{ textAlign: "right", fontSize: "10px" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAllFares((prev) => !prev);
                  }}
                >
                  {showAllFares ? "(-) View Less" : "(+) View More"}
                </button>
              )}
            </Radio.Group>
          </div>

          <div className="flight-price-2 border-1 btndiv">
            <div className="flight-price-2 border-1 btndiv">
              {tripPhase === "ONWARD" ? (
                <button
                  className="btn-book-now"
                  onClick={() => handleTicketSelected(ticket, value, markup)}
                >
                  Select
                </button>
              ) : (
                selectedOnwardTicket && (
                  <Link
                    href={`book-ticket?tcs_id=${selectedOnwardTicket.ticket.totalPriceList[
                      selectedOnwardTicket.selectedPriceIndex
                    ]?.id
                      },${ticket.totalPriceList[value]?.id}&markup=${(Number(selectedOnwardTicket.markup) || 0) + (Number(markup) || 0)}`}
                    className="btn-book-now"
                  >
                    Book Now
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return isMobile ? mobileView : desktopView;
}
