import React, { useState, useMemo, useEffect } from "react";
import { Radio } from "antd";
import dayjs from "dayjs";

export default function MulticityTicketCardDesktop({
    ticket,
    i,
    tabIndex,
    selectedFares,
    setSelectedFare,
    filters,
    markup,
    ticketMarkups,
    onPriceClick,
    shareMode,
    selectedQuoteFlights,
    handleQuoteSelectionChange,
    isUat,
    adultCount,
    childCount,
    infantCount,
    selectedFlights,
    setSelectedFlights,
    setActiveTabKey,
    matchedFlightsLength,
}) {
    const [showAllFares, setShowAllFares] = useState(false);

    // Helper functions
    const calculateTotalFare = (fd, specificMarkup = 0) => {
        const adult = fd?.ADULT?.fC?.NF || 0;
        const child = fd?.CHILD?.fC?.NF || 0;
        const infant = fd?.INFANT?.fC?.NF || 0;
        return new Intl.NumberFormat("en-IN").format(
            adultCount * adult + childCount * child + infantCount * infant + (Number(specificMarkup) || 0)
        );
    };

    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };

    const currentFilters = filters[tabIndex];
    const selectedFareTypes = currentFilters?.selectedFareTypes || [];
    const selectedFareIdentifiers = currentFilters?.fareIdentifiers || [];

    const enrichedFares = useMemo(() => {
        return ticket.totalPriceList.map((fare, index) => ({
            ...fare,
            originalIndex: index,
        }));
    }, [ticket.totalPriceList]);

    const filteredFares = useMemo(() => {
        return enrichedFares.filter((fare) => {
            if (selectedFareIdentifiers.length > 0) {
                if (!selectedFareIdentifiers.includes(fare.fareIdentifier)) return false;
            }
            if (selectedFareTypes.length > 0) {
                const fareTypeMap = {
                    0: "Non Refundable",
                    1: "Refundable",
                    2: "Partial Refundable",
                };
                const fareTypeLabel = fareTypeMap[fare.fd.ADULT.rT];
                return selectedFareTypes.includes(fareTypeLabel);
            }
            return true;
        });
    }, [enrichedFares, selectedFareIdentifiers, selectedFareTypes]);

    const displayedFares = showAllFares ? filteredFares : filteredFares.slice(0, 2);

    const selectedFareIndex = selectedFares[tabIndex]?.[i] ?? 0;

    useEffect(() => {
        const isSelectedAvailable = filteredFares.some(
            (f) => f.originalIndex === selectedFareIndex
        );
        if (!isSelectedAvailable && filteredFares.length > 0) {
            setSelectedFare(tabIndex, i, filteredFares[0].originalIndex);
        }
    }, [filteredFares, selectedFareIndex, tabIndex, i, setSelectedFare]);

    return (
        <div className="" style={{ paddingBottom: "10px" }}>
            {ticket.sI.length >= 1 ? (
                <div className="combined-connecting-flight">
                    <div className="flex gap-4 border rounded-md justify-around items-center p-20">
                        <div className="flex flex-col">
                            {ticket.sI.map((segment, index) => (
                                <div key={index} className="relative flex flex-col rounded-md p-1 xl:p-5">
                                    <div className="flex justify-between" style={{ width: "500px" }}>
                                        <div className="flex flex-col items-center justify-center w-max">
                                            <div className="text-xs text-gray-500 mb-1">
                                                {segment["fD"].aI.code} {segment["fD"].fN}
                                            </div>
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
                                            <div className="text-sm-medium" style={{ textAlign: "center" }}>
                                                {segment["fD"].aI.name}
                                            </div>
                                        </div>
                                        <div
                                            className="text-sm  flex flex-col justify-center items-center "
                                            style={{ width: "150px" }}
                                        >
                                            <p className="text-md-bold neutral-1000 city1name">
                                                {segment.da.city} ({segment.da.code})
                                            </p>
                                            <p className="neutral-1000 time">
                                                {dayjs(segment.dt).format("HH:mm")}
                                            </p>
                                        </div>
                                        <div className="text-xs text-center  " style={{ width: "100px" }}>
                                            <p className="text-sm-medium neutral-500">
                                                {formatTime(segment.duration)}
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
                                                    fillRule="evenodd"
                                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                                                />
                                            </svg>
                                            <p className="text-sm-medium neutral-500">
                                                {" "}
                                                {segment.stops > 0
                                                    ? `${segment.stops} stops`
                                                    : "non-stop"}
                                            </p>
                                        </div>
                                        <div
                                            className="text-sm  flex flex-col justify-center items-center gap-1 "
                                            style={{ width: "200px" }}
                                        >
                                            <p className="text-md-bold neutral-1000 city1name">
                                                {segment.aa.city} ({segment.aa.code})
                                            </p>
                                            <p className="neutral-1000 time">
                                                {dayjs(segment.at).format("HH:mm")}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flight-price-1 border-1 price-div flex flex-row justify-center items-center flex-col">
                            <Radio.Group
                                onChange={(e) => setSelectedFare(tabIndex, i, e.target.value)}
                                value={selectedFareIndex}
                                className="fare-options flex flex-col gap-2 w-full"
                            >
                                {displayedFares.map((e) => {
                                    const j = e.originalIndex;
                                    const specificMarkup = ticketMarkups[`${ticket.id}_${j}`];
                                    const ticketLevelMarkup = ticketMarkups[ticket.id] ?? markup;
                                    const finalMarkup = specificMarkup ?? ticketLevelMarkup;

                                    const fareValue = calculateTotalFare(e.fd, finalMarkup);
                                    return (
                                        <Radio key={j} value={j} className="w-full radiocomp" onClick={(e) => e.stopPropagation()}>
                                            <div className="p-0 rounded-lg border-2 radiodiv border-gray-300 hover:border-gray-500">
                                                <div className="flex flex-row gap-2 items-center">
                                                    <div
                                                        className="text-lg font-bold text-gray-800 price cursor-pointer hover:bg-gray-50 transition-colors"
                                                        onClick={() => {
                                                            const prevSegments = Object.keys(selectedFlights)
                                                                .filter((key) => parseInt(key) < tabIndex)
                                                                .map((key) => ({
                                                                    ticket: selectedFlights[key].ticket,
                                                                    selectedPriceIndex:
                                                                        selectedFlights[key].selectedPriceIndex,
                                                                }));
                                                            onPriceClick &&
                                                                onPriceClick(
                                                                    ticket.id,
                                                                    finalMarkup,
                                                                    ticket,
                                                                    j, // Use correct index
                                                                    prevSegments
                                                                );
                                                        }}
                                                    >
                                                        ₹{fareValue}
                                                    </div>
                                                    {/* Share Checkbox Inline */}
                                                    {shareMode && (
                                                        <div className="ml-2" onClick={(e) => e.stopPropagation()}>
                                                            <input
                                                                type="checkbox"
                                                                className="w-5 h-5 cursor-pointer accent-orange-500"
                                                                checked={selectedQuoteFlights.some(
                                                                    (f) =>
                                                                        f.ticketId === ticket.id && f.fareIndex === j
                                                                )}
                                                                onChange={(e) =>
                                                                    handleQuoteSelectionChange(
                                                                        ticket,
                                                                        j,
                                                                        e.target.checked,
                                                                        tabIndex
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                    <span
                                                        className="fareidentifier text-xs font-bold"
                                                        style={{
                                                            backgroundColor: "#f5deb3",
                                                            color: "#5c4033",
                                                            padding: "1px 2px",
                                                        }}
                                                    >
                                                        {e.fareIdentifier}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-gray-600">
                                                    <span className="ml-2 cabinclass">
                                                        {e.fd.ADULT.cc} |{" "}
                                                        <span
                                                            className="refundable"
                                                            style={{
                                                                color:
                                                                    e.fd.ADULT.rT === 1 || e.fd.ADULT.rT === 2
                                                                        ? "#22c55e"
                                                                        : "#dc2626",
                                                            }}
                                                        >
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
                                    );
                                })}
                                {filteredFares.length > 2 && (
                                    <button
                                        className="view-more-txt"
                                        style={{
                                            textAlign: "right",
                                            fontSize: "10px",
                                        }}
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
                        <div>
                            <button
                                className="btn-book-now"
                                onClick={() => {
                                    const selectedFare = ticket.totalPriceList[selectedFareIndex];
                                    const fareFD = selectedFare.fd;

                                    const specificMarkup = ticketMarkups[`${ticket.id}_${selectedFareIndex}`];
                                    const ticketLevelMarkup = ticketMarkups[ticket.id] ?? markup;
                                    const finalMarkup = specificMarkup ?? ticketLevelMarkup;

                                    const totalPrice = calculateTotalFare(fareFD, finalMarkup);
                                    const firstSegment = ticket.sI[0];
                                    const lastSegment = ticket.sI[ticket.sI.length - 1];

                                    const isUatAirlineLogo = isUat
                                        ? `/assets/imgs/airlines/${firstSegment.fD.aI.code}.png`
                                        : `/assets/imgs/airlines/${firstSegment.fD.aI.code.toLowerCase()}.png`;

                                    const updatedFlight = {
                                        priceId: selectedFare.id,
                                        flightName: firstSegment.fD.aI.name,
                                        depCityCode: firstSegment.da.code,
                                        arrCityCode: lastSegment.aa.code,
                                        airlineCode: firstSegment.fD.aI.code,
                                        flightNumber: firstSegment.fD.fN,
                                        depCity: firstSegment.da.city,
                                        arrCity: lastSegment.aa.city,
                                        depTime: dayjs(firstSegment.dt).format("HH:mm"),
                                        arrTime: dayjs(lastSegment.at).format("HH:mm"),
                                        airlineLogo: isUatAirlineLogo,
                                        price: totalPrice,
                                        markup: finalMarkup,
                                        adultFare: new Intl.NumberFormat("en-IN").format(
                                            fareFD.ADULT?.fC?.NF || 0
                                        ),
                                        ticket: ticket,
                                        selectedPriceIndex: selectedFareIndex,
                                    };

                                    setSelectedFlights((prev) => {
                                        const newFlights = {
                                            ...prev,
                                            [tabIndex]: updatedFlight,
                                        };
                                        const nextTabIndex = tabIndex + 1;
                                        if (nextTabIndex < matchedFlightsLength) {
                                            setActiveTabKey(String(nextTabIndex + 1));
                                        }

                                        return newFlights;
                                    });
                                }}
                            >
                                Select
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
