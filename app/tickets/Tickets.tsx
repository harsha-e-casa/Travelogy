"use client";

import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  Suspense,
  useMemo,
} from "react";
import ByAirline from "@/components/Filter/ByAirline";
import ByClass from "@/components/Filter/ByClass";
import ByLocation from "@/components/Filter/ByLocation";
import ByPagination from "@/components/Filter/ByPagination";
import ByPrice from "@/components/Filter/ByPrice";
import ByStops from "@/components/Filter/ByStops";
import ByDepartureTime from "@/components/Filter/ByDepartureTime";
import ByArrivalTime from "@/components/Filter/ByArrivalTime";
import ByRating from "@/components/Filter/ByRating";
import SearchFilterBottom from "@/components/elements/SearchFilterBottom";
import SortTicketsFilter from "@/components/elements/SortTicketsFilter";
import TicketCard1 from "@/components/elements/ticketcard/TicketCard1";
import TicketCardMobile from "@/components/elements/ticketcard/TicketCardMobile";
import DomesticRoundTripTicketCard from "@/components/elements/ticketcard/DomesticRoundTripTicketCard";
import RoundTripSelectionView from "@/components/elements/ticketcard/RoundTripSelectionView";
import QuoteShareModal from "@/components/elements/QuoteShareModal";
import MulticitySelectionView from "@/components/elements/ticketcard/MulticitySelectionView.jsx";
import DirectFlight from "@/components/searchEngine/DirectFlight.jsx";
import Layout from "@/components/layout/Layout";
import SwiperGroupPayment10Slider from "@/components/slider/SwiperGroupPayment10Slider";
// import rawticketsData from "@/util/tickets.json";
import useTicketFilter from "@/util/useTicketFilter";
import EngineTabs from "@/components/searchEngine/engineHeader";
import Link from "next/link";
import { postDataTJ, postData } from "../../services/NetworkAdapter";
import { useSearchParams, useRouter } from "next/navigation";
import { Skeleton, Tooltip } from "antd";
import AppListSearch from "@/components/searchEngine/AppListSearch";
import AppDateRage from "@/components/searchEngine/AppDateRage";
import AppDateRangeFlight from "@/components/searchEngine/AppDateRangeFlight";
import "./customeHeader_1.css";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { DownOutlined, FilterOutlined, ShareAltOutlined, CloseOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Drawer, Button, Modal, Input, message } from "antd";
import { tree } from "next/dist/build/templates/app-page";
import { AppContext } from "../../util/AppContext";
import { TravellerForm } from "@/components/searchEngine/TravellerForm";
import { checkTokenExpiry } from "@/services/Utils";
import ByFareIdentifier from "@/components/Filter/ByFareIdentifier";
import ByAirlineSearch from "@/components/Filter/ByAirlineSearch";
import ByFareType from "@/components/Filter/ByFareType";
import BySortPrice from "@/components/Filter/BySortPrice";

// Convert ticket ratings from string to number
// const ticketsData = rawticketsData.map((ticket) => ({
//   ...ticket,
//   rating: parseFloat(ticket.rating as string),
// }));

const ticketsData: any = [];

const generateStableId = (ticket: any) => {
  if (!ticket || !ticket.sI) return Math.random().toString(36).substr(2, 9);

  // Create a stable ID based on flight segments (Airlines, Flight Numbers, Times, Codes)
  const segments = ticket.sI.map((seg: any) => {
    const flightNo = seg.fD?.fN || '000';
    const airline = seg.fD?.aI?.code || 'XX';
    const depTime = seg.dt || '0000';
    const fromCode = seg.da?.code || 'AAA';
    const toCode = seg.aa?.code || 'BBB';
    return `${airline}${flightNo}_${depTime}_${fromCode}${toCode}`;
  });

  const basePrice = ticket.totalPriceList?.[0]?.fd?.ADULT?.fC?.NF || 0;
  return `${segments.join("|")}_${basePrice}`;
};

export default function Tickets() {
  // Using custom hook for ticket filter logic
  const {
    filter,
    setFilter,
    sortCriteria,
    setSortCriteria,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    uniqueNames,
    uniqueClasses,
    uniqueLocations,
    uniqueRatings,
    uniqueAirlines,
    filteredTickets,
    sortedTickets,
    totalPages,
    startIndex,
    endIndex,
    paginatedTickets,
    handleCheckboxChange,
    handleSortChange,
    handlePriceRangeChange,
    handleItemsPerPageChange,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
    handleClearFilters,
    startItemIndex,
    endItemIndex,
  } = useTicketFilter(ticketsData);

  const { setCookie, getCookie, removeCookie } = useContext(AppContext);

  // State for mobile/tablet filter drawer
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const showFilterDrawer = () => {
    setFilterDrawerOpen(true);
  };

  const onCloseFilterDrawer = () => {
    setFilterDrawerOpen(false);
  };

  // Markup and Share State
  const router = useRouter();
  const searchParams = useSearchParams();
  const [markup, setMarkup] = useState<number>(0);
  const [isMarkupModalOpen, setIsMarkupModalOpen] = useState(false);
  const [markupInput, setMarkupInput] = useState<string>("");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState("");



  const [ticketMarkups, setTicketMarkups] = useState<Record<string, number>>({});
  const [currentTicketId, setCurrentTicketId] = useState<string | null>(null);

  // Share Quote State
  const [shareMode, setShareMode] = useState(false);
  const [selectedQuoteFlights, setSelectedQuoteFlights] = useState<any[]>([]);
  const [isQuoteSharing, setIsQuoteSharing] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);

  const handleQuoteSelectionChange = (ticket: any, fareIndex: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedQuoteFlights((prev) => [
        ...prev,
        {
          ticketId: ticket.id,
          fareIndex: fareIndex,
          ticket: ticket,
        },
      ]);
    } else {
      setSelectedQuoteFlights((prev) =>
        prev.filter(
          (f) =>
            !(f.ticketId === ticket.id && f.fareIndex === fareIndex)
        )
      );
    }
  };

  const handleSendQuote = async (emails: string[], withPrice: boolean) => {
    if (selectedQuoteFlights.length === 0) {
      message.warning("Please select at least one flight.");
      return;
    }
    setShareLoading(true);
    try {
      const passengerInfo = {
        adult: getCookie("gy_adult"),
        child: getCookie("gy_child"),
        infant: getCookie("gy_infant"),
        class: classLabels[srx_cabinType]
      };

      // Construct payload with full details needed for email
      const payload = {
        emails,
        withPrice,
        flights: selectedQuoteFlights.map(item => {
          const fareOption = item.ticket.totalPriceList[item.fareIndex];
          const specificMarkup = ticketMarkups[`${item.ticket.id}_${item.fareIndex}`];
          const itemMarkup = specificMarkup ?? ticketMarkups[item.ticket.id] ?? markup;
          return {
            ticket: item.ticket,
            fare: fareOption,
            fareIndex: item.fareIndex,
            markup: itemMarkup
          };
        }),
        tripType: srx_tripType,
        passengerInfo
      };

      await postData("travelogy/flight/send-quote", payload);
      message.success("Quote sent successfully!");
      setIsQuoteSharing(false);
      setShareMode(false);
      setSelectedQuoteFlights([]);
    } catch (err) {
      console.error(err);
      message.error("Failed to send quote");
    } finally {
      setShareLoading(false);
    }
  };

  const classLabels: any = {
    a: "PREMIUM_ECONOMY",
    b: "ECONOMY",
    c: "BUSINESS",
    d: "FIRST",
  };

  useEffect(() => {
    const markupParam = searchParams.get("markup");
    if (markupParam) {
      const parsedMarkup = Number(markupParam);
      if (!isNaN(parsedMarkup)) {
        setMarkup(parsedMarkup);
      }
    }
  }, [searchParams]);

  const [currentTicket, setCurrentTicket] = useState<any>(null);
  const [selectedFareIndex, setSelectedFareIndex] = useState<number>(0);
  const [previousTickets, setPreviousTickets] = useState<any[]>([]); // For combined quotes
  const [shareStatus, setShareStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const openMarkupModal = (ticketId: string, currentVal: number, ticket: any = null, fareIndex: number = 0, prevTickets: any[] = []) => {
    setCurrentTicketId(ticketId);
    setCurrentTicket(ticket);
    setMarkupInput(currentVal.toString());
    setSelectedFareIndex(fareIndex);
    setPreviousTickets(prevTickets);
    setIsMarkupModalOpen(true);
  };

  const handleApplyToTicket = () => {
    const newMarkup = Number(markupInput);
    if (isNaN(newMarkup) || newMarkup < 0) {
      message.error("Please enter a valid non-negative markup amount.");
      return;
    }
    if (currentTicketId) {
      // Use composite key for specific fare markup
      const key = `${currentTicketId}_${selectedFareIndex}`;
      setTicketMarkups((prev) => ({ ...prev, [key]: newMarkup }));
      message.success("Markup applied to this fare.");
    }
    setIsMarkupModalOpen(false);
  };

  const handleApplyToAll = () => {
    const newMarkup = Number(markupInput);
    if (isNaN(newMarkup) || newMarkup < 0) {
      message.error("Please enter a valid non-negative markup amount.");
      return;
    }
    setMarkup(newMarkup);
    setTicketMarkups({}); // Clear individual overrides
    setIsMarkupModalOpen(false);

    // Update URL with markup
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("markup", newMarkup.toString());
    router.push(currentUrl.toString());
    message.success("Markup applied to all tickets.");
  };

  const handleShareQuote = async () => {
    if (!shareEmail) {
      message.error("Please enter a valid email.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shareEmail)) {
      message.error("Please enter a valid email address.");
      return;
    }

    try {
      const shareMarkup = Number(markupInput);

      // Combine previous tickets with the current one for the quote
      // Use their individual markups if they exist, otherwise fallback to the current session markup (shareMarkup)
      const allTicketsInQuote = [
        ...previousTickets.map(pt => ({
          ticket: pt.ticket,
          fareIndex: pt.selectedPriceIndex,
          markup: ticketMarkups[`${pt.ticket.id}_${pt.selectedPriceIndex}`] ?? ticketMarkups[pt.ticket.id] ?? (isNaN(shareMarkup) ? 0 : shareMarkup)
        })),
        {
          ticket: currentTicket,
          fareIndex: selectedFareIndex,
          markup: isNaN(shareMarkup) ? 0 : shareMarkup
        }
      ];

      const passengerCounts = {
        adult: parseInt(Cookies.get("gy_adult") || "1", 10),
        child: parseInt(Cookies.get("gy_child") || "0", 10),
        infant: parseInt(Cookies.get("gy_infant") || "0", 10),
      };

      const ticketHTML = generateTicketHTML(allTicketsInQuote, passengerCounts);

      const payload = {
        email: shareEmail,
        link: `${window.location.origin}${window.location.pathname}?${searchParams.toString()}&markup=${markupInput}`, // Keep link for reference
        htmlContent: ticketHTML,
      };

      setShareStatus("sending");
      const response: any = await postData("/travelogy/common/send-quote", payload);
      if (response && (response.success || response.status)) {
        setShareStatus("success");
        message.success("Quote sent successfully!");

        // Wait 3 seconds before closing automatically
        setTimeout(() => {
          setIsShareModalOpen(false);
          setIsMarkupModalOpen(false);
          setShareEmail("");
          setShareStatus("idle");
        }, 3000);
      } else {
        setShareStatus("error");
        message.error(response?.message || "Failed to send quote.");
        setTimeout(() => setShareStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Error sharing quote:", error);
      message.error("An error occurred while sharing the quote.");
    }
  };

  const generateTicketHTML = (ticketItems: { ticket: any, fareIndex: number, markup: number }[], passengerCounts?: { adult: number, child: number, infant: number }) => {
    if (!ticketItems || ticketItems.length === 0) return "<p>Details unavailable.</p>";

    const dfadu = passengerCounts ? passengerCounts.adult : parseInt(getCookie("gy_adult") || "1", 10);
    const dfchi = passengerCounts ? passengerCounts.child : parseInt(getCookie("gy_child") || "0", 10);
    const dfinf = passengerCounts ? passengerCounts.infant : parseInt(getCookie("gy_infant") || "0", 10);
    const gyClass = getCookie("gy_class") || "b";

    const cabinClassLabel = (classLabels[gyClass] || "ECONOMY").replace("_", " ");
    const totalPassengers = dfadu + dfchi + dfinf;
    const passengerParts = [];
    if (dfadu > 0) passengerParts.push(`${dfadu} Adult${dfadu > 1 ? "s" : ""}`);
    if (dfchi > 0) passengerParts.push(`${dfchi} Child${dfchi > 1 ? "ren" : ""}`);
    if (dfinf > 0) passengerParts.push(`${dfinf} Infant${dfinf > 1 ? "s" : ""}`);
    const passengerBreakdown = passengerParts.join(", ");

    let totalAmount = 0;
    let allSegmentsHTML = "";

    ticketItems.forEach((item) => {
      const { ticket, fareIndex, markup: itemMarkup } = item;
      if (!ticket) return;

      const fare = ticket.totalPriceList?.[fareIndex] || ticket.totalPriceList?.[0];
      if (fare) {
        if (fare.fd?.ADULT) totalAmount += dfadu * fare.fd.ADULT.fC.NF;
        if (fare.fd?.CHILD) totalAmount += dfchi * fare.fd.CHILD.fC.NF;
        if (fare.fd?.INFANT) totalAmount += dfinf * fare.fd.INFANT.fC.NF;

        // Add markup for this specific ticket/item
        totalAmount += (itemMarkup || 0);
      }

      const segments = ticket.sI || [];
      segments.forEach((seg: any) => {
        const depDate = dayjs(seg.dt).format("DD MMM YYYY");
        const arrDate = dayjs(seg.at).format("DD MMM YYYY");
        const depTime = dayjs(seg.dt).format("HH:mm");
        const arrTime = dayjs(seg.at).format("HH:mm");
        const durationHours = Math.floor(seg.duration / 60);
        const durationMinutes = seg.duration % 60;
        const airlineCode = seg.fD?.aI?.code || "AI";
        const airlineName = seg.fD?.aI?.name || "Airline";
        const flightNo = seg.fD?.fN || "";

        allSegmentsHTML += `
            <div style="margin-bottom: 25px; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <img src="https://travelogy.co/assets/imgs/airlines/${airlineCode}.png" width="24" height="24" style="margin-right: 10px; border-radius: 4px;" />
                    <span style="font-weight: 700; color: #334155; font-size: 14px;">${airlineName} <span style="color: #94a3b8; font-weight: 400; margin-left: 5px;">${airlineCode}-${flightNo}</span></span>
                </div>
                
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td width="30%" style="vertical-align: top;">
                            <div style="font-weight: 800; font-size: 20px; color: #0f172a; line-height: 1;">${seg.da.code}</div>
                            <div style="color: #64748b; font-size: 12px; margin: 4px 0;">${seg.da.city}</div>
                            <div style="color: #94a3b8; font-size: 11px;">${depDate}</div>
                            <div style="font-weight: 700; font-size: 15px; color: #e11d48; margin-top: 6px;">${depTime}</div>
                        </td>
                        <td width="40%" style="vertical-align: middle; text-align: center; padding: 0 10px;">
                            <div style="color: #94a3b8; font-size: 11px; margin-bottom: 4px; font-weight: 600;">${durationHours}h ${durationMinutes}m</div>
                            <div style="border-top: 1px dashed #cbd5e1; position: relative; margin: 10px 0;">
                                <div style="position: absolute; top: -4px; left: 50%; margin-left: -4px; width: 8px; height: 8px; background: #cbd5e1; border-radius: 50%;"></div>
                            </div>
                            <div style="background: #f1f5f9; color: #475569; font-size: 10px; padding: 3px 8px; border-radius: 10px; display: inline-block; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">
                                ${seg.stops === 0 ? "Non-stop" : seg.stops + " stop(s)"}
                            </div>
                        </td>
                        <td width="30%" style="vertical-align: top; text-align: right;">
                            <div style="font-weight: 800; font-size: 20px; color: #0f172a; line-height: 1;">${seg.aa.code}</div>
                            <div style="color: #64748b; font-size: 12px; margin: 4px 0;">${seg.aa.city}</div>
                            <div style="color: #94a3b8; font-size: 11px;">${arrDate}</div>
                            <div style="font-weight: 700; font-size: 15px; color: #e11d48; margin-top: 6px;">${arrTime}</div>
                        </td>
                    </tr>
                </table>
            </div>
        `;
      });
    });

    const formattedPrice = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(totalAmount);

    return `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background-color: #0f172a; padding: 25px 30px; text-align: center;">
                <div style="color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">Travelogy Quote</div>
                <div style="color: #94a3b8; font-size: 12px; margin-top: 4px;">Premium Flight Selection</div>
                <div style="color: #94a3b8; font-size: 11px; margin-top: 6px;">Travel Class : <strong style="color: #ffffff;">${cabinClassLabel}</strong> | Passenger(s) : <strong style="color: #ffffff;">${totalPassengers} (${passengerBreakdown})</strong></div>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
                ${allSegmentsHTML}
                
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 10px; border-top: 2px solid #f1f5f9; padding-top: 20px;">
                    <tr>
                        <td style="text-align: right; font-family: Arial, sans-serif;">
                            <div style="color: #64748b; font-size: 14px; margin-bottom: 4px; font-weight: 600;">Total Amount</div>
                            <div style="color: #e11d48; font-size: 32px; font-weight: 900; letter-spacing: -1px;">${formattedPrice}</div>
                        </td>
                    </tr>
                </table>
                
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 20px;">
                    <tr>
                        <td style="text-align: center; font-family: Arial, sans-serif;">
                            <div style="color: #64748b; font-size: 13px; font-style: italic;">Note: Prices are subject to change based on availability at the time of booking.</div>
                        </td>
                    </tr>
                </table>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8fafc; padding: 15px; text-align: center; border-top: 1px solid #f1f5f9;">
                <div style="color: #94a3b8; font-size: 11px;">&copy; ${dayjs().year()} Travelogy. All rights reserved.</div>
            </td>
          </tr>
        </table>
      </div>
    `;
  };

  const [modifySearchOpen, setModifySearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDirectFlight, setIsDirectFlight] = useState(false);

  useEffect(() => {
    const directFlightCookie = Cookies.get("gy_direct_flight");
    setIsDirectFlight(directFlightCookie === "true");
  }, []);

  useEffect(() => {
    setCookie("gy_direct_flight", isDirectFlight ? "true" : "false");
  }, [isDirectFlight]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDepartureDateChange = (date: any) => {
    setDatedep(date);

    if (date) {
      const formattedDate = dayjs(date);
      setCookie("gy_trd", formattedDate.format("YYYY-MM-DD"));
      setDd_monthStr(formattedDate.format("MMM")); // Format as string
      setDd_strdate(formattedDate.format("dddd")); // Format as string
      setDd_date(formattedDate.format("DD")); // Format as string
      setDd_year(formattedDate.format("YY")); // Format as string
    }

    if ((srx_tripType?.toLowerCase() || "") === "round-trip" && datedepr) {
      if (dayjs(date).isAfter(dayjs(datedepr))) {
        const newReturnDate = dayjs(date).add(2, 'day');
        setDatedepr(newReturnDate);

        const formattedReturnDate = dayjs(newReturnDate);

        setCookie("gy_return", formattedReturnDate.format("YYYY-MM-DD"));
        setDdr_monthStr(formattedReturnDate.format("MMM"));
        setDdr_strdate(formattedReturnDate.format("dddd"));
        setDdr_date(formattedReturnDate.format("DD"));
        setDdr_year(formattedReturnDate.format("YY"));
      } else {
        // console.log("Departure is NOT after Return. No update needed.");
      }
    } else {
      // console.log("Not round-trip or no return date set.");
    }
  };

  const renderFilters = () => (
    <>
      {isFilterApplied && (
        <div className="sticky top-36 lg:top-48 z-50 sidebar-left border-1 background-body mb-10" style={{ height: "60px", paddingTop: "15px" }}>
          <div className="box-filters-sidebar">
            <div className="block-filter border-1">
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="text-lg-bold filter-sty neutral-1000">Applied Filters <span className="text-sm font-normal text-gray-500">({activeFilterCount})</span></h6>
                <Button
                  type="link"
                  onClick={handleResetAllFilters}
                  style={{ padding: 0, height: "auto", color: "#ffa726", fontWeight: "bold", marginBottom: "20px" }}
                >
                  Reset All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="sidebar-left border-1 background-body">
        <div className="box-filters-sidebar">
          <div className="block-filter border-1">
            <h6 className="text-lg-bold filter-sty neutral-1000">Filter Price </h6>
            <ByPrice
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              minPriceRange={minPriceRange}
              maxPriceRange={maxPriceRange}
            />
          </div>
        </div>
      </div>
      <div className="sidebar-left border-1 background-body">
        <div className="box-filters-sidebar">
          <div className="block-filter border-1">
            <h6 className="text-lg-bold filter-sty neutral-1000">Sort by Price</h6>
            <BySortPrice sort={priceSort} setSort={setPriceSort} />
          </div>
        </div>
      </div>
      <div className="sidebar-left border-1 background-body">
        <div className="box-filters-sidebar">
          <div className="block-filter border-1">
            <h6 className="text-lg-bold filter-sty neutral-1000">Stops</h6>
            <ByStops stops={stops} setStops={setStops} />
          </div>
        </div>
      </div>
      <div className="sidebar-left border-1 background-body">
        <div className="box-filters-sidebar">
          <div className="block-filter border-1">
            <h6 className="text-lg-bold filter-sty neutral-1000">Departure Time</h6>
            <ByDepartureTime
              departureTime={departureTime}
              setDepartureTime={setDepartureTime}
            />
          </div>
        </div>
      </div>
      <div className="sidebar-left border-1 background-body">
        <div className="box-filters-sidebar">
          <div className="block-filter border-1">
            <h6 className="text-lg-bold filter-sty neutral-1000">Arrival Time</h6>
            <ByArrivalTime
              arrivalTime={arrivalTime}
              setArrivalTime={setArrivalTime}
            />
          </div>
        </div>
      </div>
      <div className="sidebar-left border-1 background-body">
        <div className="box-filters-sidebar">
          <div className="block-filter border-1">
            <h6 className="text-lg-bold filter-sty neutral-1000">Airlines</h6>
            <div className="box-collapse scrollFilter">
              <ByAirline
                uniqueAirlines={[
                  ...new Set(
                    (flightData?.ONWARD || flightData?.COMBO || [])
                      ?.map((ticket: any) => ticket.sI[0].fD.aI.name) || []
                  ),
                ]}
                selectedAirlines={selectedAirlines}
                setSelectedAirlines={setSelectedAirlines}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-left border-1 background-body">
        <div className="box-filters-sidebar">
          <div className="block-filter border-1">
            <h6 className="text-lg-bold filter-sty neutral-1000">Fare Identifier</h6>
            <ByFareIdentifier
              fareIdentifiers={fareIdentifiers}
              setFareIdentifiers={setFareIdentifiers}
              options={uniqueFareIdentifiers}
            />
          </div>
        </div>
      </div>
      <div className="sidebar-left border-1 background-body">
        <div className="box-filters-sidebar">
          <div className="block-filter border-1">
            <h6 className="text-lg-bold filter-sty neutral-1000">Flight Number</h6>
            <ByAirlineSearch
              flightNumberSearch={flightNumberSearch}
              setFlightNumberSearch={setFlightNumberSearch}
            />
          </div>
        </div>
      </div>
      <div className="sidebar-left border-1 background-body">
        <div className="box-filters-sidebar">
          <div className="block-filter border-1">
            <h6 className="text-lg-bold filter-sty neutral-1000">Fare Type</h6>
            <ByFareType
              selectedFareTypes={selectedFareTypes}
              setSelectedFareTypes={setSelectedFareTypes}
              options={uniqueFareTypes}
            />
          </div>
        </div>
      </div>
    </>
  );

  type MultiSeg = {
    from: string;
    fromCode: string;
    to: string;
    toCode: string;
    departureDate: Date | null;
    lastEditedField?: "from" | "to";
    // errors
    fromError?: string;
    toError?: string;
    dateError?: string;
  };

  const validateMultiCity = (opts?: { focusFirstError?: boolean }) => {
    let ok = true;
    let firstBadIndex: number | null = null;

    const next = multicitySegments.map((seg, idx, arr) => {
      const e: any = { ...seg };
      e.fromError = "";
      e.toError = "";
      e.dateError = "";
      e.forceOpen = false; // NEW: track if dropdown should stay open

      // --- Empty / Placeholder checks ---
      if (!e.from || !e.fromCode || e.from === "Select City") {
        e.fromError = "Select a valid departure city";
        e.forceOpen = true;
      }
      if (!e.to || !e.toCode || e.to === "Select City") {
        e.toError = "Select a valid arrival city";
        e.forceOpen = true;
      }
      if (!e.departureDate) {
        e.dateError = "Select a date";
        e.forceOpen = true;
      }

      // --- Same city check ---
      if (
        !e.fromError &&
        !e.toError &&
        e.fromCode &&
        e.toCode &&
        e.fromCode === e.toCode
      ) {
        e.toError = "From and To cities cannot be the same";
        e.forceOpen = true;
      }

      // --- Date order check (ascending) ---
      if (!e.dateError) {
        let prevDate = null;
        if (idx === 0) {
          prevDate = departDate;
        } else {
          prevDate = arr[idx - 1]?.departureDate;
        }

        if (prevDate && e.departureDate) {
          if (dayjs(e.departureDate).isBefore(dayjs(prevDate), "day")) {
            e.dateError = `Date must be on or after previous segment (${dayjs(
              prevDate
            ).format("ddd, MMM D YYYY")})`;
            e.forceOpen = true;
          }
        }
      }

      // --- Track first error for scrolling/focus ---
      if (ok && (e.fromError || e.toError || e.dateError)) {
        ok = false;
        firstBadIndex = idx;
      }

      return e;
    });

    setMulticitySegments(next);

    // --- Set global error message ---
    if (!ok) {
      setErrorMsg(
        "Please fix the highlighted fields in your multi-city itinerary."
      );
      if (opts?.focusFirstError && firstBadIndex !== null) {
        const el = document.querySelector(`[data-seg-row="${firstBadIndex}"]`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      setErrorMsg(""); // clear error if everything is okay
    }

    return ok;
  };

  useEffect(() => {
    removeCookie("travellerInfo");
    removeCookie("mealinfo");
    removeCookie("baggageinfo");
    removeCookie("seatSsr_amount");
    removeCookie("gst_info");
    removeCookie("email");
    removeCookie("number");

    // for loop to remover adult_seat_map-1 till 9 and same goes for child_seat_map-1
    for (let i = 1; i <= 9; i++) {
      removeCookie(`adult_seat_map-${i}`);
      removeCookie(`child_seat_map-${i}`);
    }
  }, []);

  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    const tokenValid = checkTokenExpiry();
    if (!tokenValid) {
      localStorage.removeItem("authToken");
      router.push("/login");
    } else {
      setloading(false);
    }
  }, [router]);

  const [flightData, setFlightData] = useState<any>(null);
  const [filteredFlightData, setFilteredFlightData] = useState<any>(null);

  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [minPriceRange, setMinPriceRange] = useState<any>(null);
  const [maxPriceRange, setMaxPriceRange] = useState<any>(null);
  const [stops, setStops] = useState("all");
  const [priceSort, setPriceSort] = useState<"asc" | "desc">("asc");
  const [departureTime, setDepartureTime] = useState("all");
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [arrivalTime, setArrivalTime] = useState("all");
  const [fareIdentifiers, setFareIdentifiers] = useState<string[]>([]);
  const [uniqueFareIdentifiers, setUniqueFareIdentifiers] = useState<any[]>([]);
  const [flightNumberSearch, setFlightNumberSearch] = useState("");
  const [selectedFareTypes, setSelectedFareTypes] = useState<string[]>([]);
  const [uniqueFareTypes, setUniqueFareTypes] = useState<any[]>([]);

  const handleResetAllFilters = () => {
    setPriceRange([minPriceRange, maxPriceRange]);
    setStops("all");
    setPriceSort("asc");
    setDepartureTime("all");
    setSelectedAirlines([]);
    setArrivalTime("all");
    setFareIdentifiers([]);
    setFlightNumberSearch("");
    setSelectedFareTypes([]);
  };

  const isFilterApplied = useMemo(() => {
    return (
      stops !== "all" ||
      departureTime !== "all" ||
      arrivalTime !== "all" ||
      selectedAirlines.length > 0 ||
      fareIdentifiers.length > 0 ||
      flightNumberSearch !== "" ||
      selectedFareTypes.length > 0 ||
      priceSort !== "asc" ||
      (priceRange[0] !== minPriceRange || priceRange[1] !== maxPriceRange)
    );
  }, [stops, departureTime, arrivalTime, selectedAirlines, fareIdentifiers, flightNumberSearch, selectedFareTypes, priceSort, priceRange, minPriceRange, maxPriceRange]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (stops !== "all") count++;
    if (departureTime !== "all") count++;
    if (arrivalTime !== "all") count++;
    if (selectedAirlines.length > 0) count++; // Count airline filter as 1 regardless of how many airlines selected
    if (fareIdentifiers.length > 0) count++;
    if (flightNumberSearch !== "") count++;
    if (selectedFareTypes.length > 0) count++;
    if (priceSort !== "asc") count++;
    if (priceRange[0] !== minPriceRange || priceRange[1] !== maxPriceRange) count++;
    return count;
  }, [stops, departureTime, arrivalTime, selectedAirlines, fareIdentifiers, flightNumberSearch, selectedFareTypes, priceSort, priceRange, minPriceRange, maxPriceRange]);

  useEffect(() => {
    if (flightData && (flightData.ONWARD || flightData.COMBO)) {
      let dataToCheck = (flightData.ONWARD || flightData.COMBO) || [];

      // Filter data by fare type FIRST to get accurate price range
      if (selectedFareTypes.length > 0) {
        const typeMap: { [key: number]: string } = {
          0: "Non Refundable",
          1: "Refundable",
          2: "Partial Refundable",
        };

        dataToCheck = dataToCheck.filter((ticket: any) => {
          return ticket.totalPriceList.some((priceInfo: any) =>
            Object.keys(priceInfo.fd).some((paxType) => {
              const fareType = typeMap[priceInfo.fd[paxType].rT];
              return selectedFareTypes.includes(fareType);
            })
          );
        });
      }

      const [minPrice, maxPrice] = getPriceRangeFromData(dataToCheck);

      // Only update if range has meaningfully changed or wasn't set
      // (avoid infinite loops by checking against current state if possible, or trigger once)
      setMinPriceRange(minPrice);
      setMaxPriceRange(maxPrice);

      // Auto-adjust current range if it's out of bounds or this is a "reset" / filter change
      // A simple logic: reset to full range on filter change to allow user to see all filtered results
      setPriceRange([minPrice, maxPrice]);
    }
  }, [flightData, selectedFareTypes]);

  useEffect(() => {
    if (flightData && (flightData.ONWARD || flightData.COMBO)) {
      setStops("all");
      setPriceSort("asc");
      setDepartureTime("all");
      setSelectedAirlines([]);
      setArrivalTime("all");
      setFareIdentifiers([]);
      setFlightNumberSearch("");
      setSelectedFareTypes([]);
    }
  }, [flightData]);

  useEffect(() => {
    if (flightData && (flightData.ONWARD || flightData.COMBO)) {
      const dataToCheck = flightData.ONWARD || flightData.COMBO;
      const allFareIdentifiers = dataToCheck
        .flatMap((ticket: any) =>
          ticket.totalPriceList.map(
            (priceInfo: any) => priceInfo.fareIdentifier
          )
        )
        .filter(Boolean);

      const fareCounts = allFareIdentifiers.reduce((acc: any, fare: string) => {
        acc[fare] = (acc[fare] || 0) + 1;
        return acc;
      }, {});

      const uniqueFaresWithCounts = Object.keys(fareCounts).map((fare) => ({
        name: fare,
        count: fareCounts[fare],
      }));

      setUniqueFareIdentifiers(uniqueFaresWithCounts);
    }
  }, [flightData]);

  const getTicketPrice = (ticket: any) => {
    const dfadu = parseInt(Cookies.get("gy_adult") || "1", 10);
    const dfchi = parseInt(Cookies.get("gy_child") || "0", 10);
    const dfinf = parseInt(Cookies.get("gy_infant") || "0", 10);

    const typeMap: { [key: number]: string } = {
      0: "Non Refundable",
      1: "Refundable",
      2: "Partial Refundable",
    };

    let selectedFareIndex = 0;

    // If strict fare types are selected, find the first matching fare Option
    if (selectedFareTypes.length > 0) {
      const matchIndex = ticket.totalPriceList.findIndex((priceInfo: any) =>
        Object.keys(priceInfo.fd).some((paxType) => {
          const fareType = typeMap[priceInfo.fd[paxType].rT];
          return selectedFareTypes.includes(fareType);
        })
      );
      if (matchIndex !== -1) {
        selectedFareIndex = matchIndex;
      }
    }

    const fareOption = ticket.totalPriceList?.[selectedFareIndex];

    const adultFare = (fareOption?.fd?.ADULT?.fC?.NF ?? 0) * dfadu;
    const childFare = (fareOption?.fd?.CHILD?.fC?.NF ?? 0) * dfchi;
    const infantFare = (fareOption?.fd?.INFANT?.fC?.NF ?? 0) * dfinf;

    return adultFare + childFare + infantFare;
  };

  const sortedFlightData = useMemo(() => {
    if (!filteredFlightData) return [];

    const arr = [...filteredFlightData];

    if (priceSort === "asc") {
      arr.sort((a, b) => getTicketPrice(a) - getTicketPrice(b));
    } else if (priceSort === "desc") {
      arr.sort((a, b) => getTicketPrice(b) - getTicketPrice(a));
    }

    return arr;
  }, [filteredFlightData, priceSort, selectedFareTypes]);

  useEffect(() => {
    if (!filteredFlightData) return;

    let sorted = [...filteredFlightData];

    if (priceSort === "asc") {
      sorted.sort((a, b) => getTicketPrice(a) - getTicketPrice(b));
    }
    if (priceSort === "desc") {
      sorted.sort((a, b) => getTicketPrice(b) - getTicketPrice(a));
    }

    setFilteredFlightData(sorted);
  }, [priceSort, selectedFareTypes]);



  // Helper function to check if a ticket passes filters, ignoring specified filters
  const checkPassesFilters = (ticket: any, ignoreFilters: string[] = []) => {
    // 1. Strict Fare Type Filter
    if (!ignoreFilters.includes("fareType") && selectedFareTypes.length > 0) {
      const typeMap: { [key: number]: string } = {
        0: "Non Refundable",
        1: "Refundable",
        2: "Partial Refundable",
      };
      const passesFareType = ticket.totalPriceList.some((priceInfo: any) =>
        Object.keys(priceInfo.fd).some((paxType) => {
          const fareType = typeMap[priceInfo.fd[paxType]?.rT || 0];
          return selectedFareTypes.includes(fareType);
        })
      );
      if (!passesFareType) return false;
    }

    // Fare Identifier Filter
    if (!ignoreFilters.includes("fareIdentifier") && fareIdentifiers.length > 0) {
      const passesFareId = ticket.totalPriceList.some((priceInfo: any) =>
        fareIdentifiers.includes(priceInfo.fareIdentifier)
      );
      if (!passesFareId) return false;
    }

    // 2. Price Range Filter
    if (!ignoreFilters.includes("price")) {
      const price = getTicketPrice(ticket);
      if (price < priceRange[0] || price > priceRange[1]) return false;
    }

    // Stops Filter
    if (!ignoreFilters.includes("stops") && stops !== "all") {
      const stopCount = ticket.sI.length;
      if (stops === "non-stop" && stopCount !== 1) return false;
      if (stops === "1-stop" && stopCount !== 2) return false;
      if (stops === "2-stops" && stopCount <= 2) return false;
    }

    // Departure Time Filter
    if (!ignoreFilters.includes("departureTime") && departureTime !== "all") {
      const departureHour = new Date(ticket.sI[0].dt).getHours();
      if (departureTime === "early-morning" && !(departureHour >= 0 && departureHour < 6)) return false;
      if (departureTime === "morning" && !(departureHour >= 6 && departureHour < 12)) return false;
      if (departureTime === "afternoon" && !(departureHour >= 12 && departureHour < 18)) return false;
      if (departureTime === "evening" && !(departureHour >= 18 && departureHour < 24)) return false;
    }

    // Airline Filter
    if (!ignoreFilters.includes("airline") && selectedAirlines.length > 0) {
      if (!selectedAirlines.includes(ticket.sI[0].fD.aI.name)) return false;
    }

    // Arrival Time Filter
    if (!ignoreFilters.includes("arrivalTime") && arrivalTime !== "all") {
      const arrivalHour = new Date(ticket.sI[ticket.sI.length - 1].at).getHours();
      if (arrivalTime === "early-morning" && !(arrivalHour >= 0 && arrivalHour < 6)) return false;
      if (arrivalTime === "morning" && !(arrivalHour >= 6 && arrivalHour < 12)) return false;
      if (arrivalTime === "afternoon" && !(arrivalHour >= 12 && arrivalHour < 18)) return false;
      if (arrivalTime === "evening" && !(arrivalHour >= 18 && arrivalHour < 24)) return false;
    }

    if (!ignoreFilters.includes("flightNumber") && flightNumberSearch) {
      const passesFlightNumber = ticket.sI.some((segment: any) => {
        const flightCode = `${segment.fD.aI.code} ${segment.fD.fN}`;
        return flightCode.toLowerCase().includes(flightNumberSearch.toLowerCase());
      });
      if (!passesFlightNumber) return false;
    }

    return true;
  };

  useEffect(() => {
    if (flightData && (flightData.ONWARD || flightData.COMBO)) {
      const dataToCheck = (flightData.ONWARD || flightData.COMBO) || [];

      // Calculate Fare Type Counts (Ignore Fare Type filter)
      const fareTypesMap: Record<string, number> = {};
      const typeMap: any = {
        0: "Non Refundable",
        1: "Refundable",
        2: "Partial Refundable",
      };

      dataToCheck.forEach((ticket: any) => {
        if (checkPassesFilters(ticket, ["fareType"])) {
          // Extract fare types from this ticket
          const ticketFareTypes = new Set<string>();
          ticket.totalPriceList.forEach((priceInfo: any) => {
            Object.keys(priceInfo.fd).forEach((paxType) => {
              const rT = priceInfo.fd[paxType]?.rT || 0;
              const typeName = typeMap[rT];
              if (typeName) ticketFareTypes.add(typeName);
            });
          });

          ticketFareTypes.forEach(ft => {
            fareTypesMap[ft] = (fareTypesMap[ft] || 0) + 1;
          });
        }
      });

      const uniqueFaresWithCounts = Object.keys(fareTypesMap).map(fareType => ({
        name: fareType,
        count: fareTypesMap[fareType]
      }));
      setUniqueFareTypes(uniqueFaresWithCounts);


      // Calculate Fare Identifier Counts (Ignore Fare Identifier filter)
      const fareIdMap: Record<string, number> = {};

      dataToCheck.forEach((ticket: any) => {
        if (checkPassesFilters(ticket, ["fareIdentifier"])) {
          const ticketFareIds = new Set<string>();
          ticket.totalPriceList.forEach((priceInfo: any) => {
            if (priceInfo.fareIdentifier) ticketFareIds.add(priceInfo.fareIdentifier);
          });

          ticketFareIds.forEach(fid => {
            fareIdMap[fid] = (fareIdMap[fid] || 0) + 1;
          });
        }
      });

      const uniqueIdsWithCounts = Object.keys(fareIdMap).map(fid => ({
        name: fid,
        count: fareIdMap[fid]
      }));

      // Verify ByFareIdentifier props structure. Assuming it takes list of strings or objects.
      // Based on previous code flow, it was `uniqueFareIdentifiers`.
      // Let's assume it wants { option: string, count: number } or similar.
      // Looking at usage: `options={uniqueFareIdentifiers}`. 
      // Standard generic filter usually takes objects.
      // I will stick to { option: fid, count } or similar if I can confirm.
      // But wait, the original code for fare type used { name: ..., count: ... }.
      // Identify ByFareIdentifier expectations?
      // Let's assume generic object is fine.
      setUniqueFareIdentifiers(uniqueIdsWithCounts);

    }
  }, [
    flightData,
    priceRange,
    stops,
    departureTime,
    selectedAirlines,
    arrivalTime,
    fareIdentifiers, // dependency for other group
    flightNumberSearch,
    selectedFareTypes, // dependency for other group
  ]);

  const applyFilters = () => {
    if (flightData && (flightData.ONWARD || flightData.COMBO)) {
      let dataToFilter = (flightData.ONWARD || flightData.COMBO) || [];

      // 1. Strict Fare Type Filter (First Priority)
      if (selectedFareTypes.length > 0) {
        const typeMap: { [key: number]: string } = {
          0: "Non Refundable",
          1: "Refundable",
          2: "Partial Refundable",
        };

        dataToFilter = dataToFilter.filter((ticket: any) => {
          return ticket.totalPriceList.some((priceInfo: any) =>
            Object.keys(priceInfo.fd).some((paxType) => {
              const fareType = typeMap[priceInfo.fd[paxType].rT];
              return selectedFareTypes.includes(fareType);
            })
          );
        });
      }

      // Fare Identifier Filter
      if (fareIdentifiers.length > 0) {
        dataToFilter = dataToFilter.filter((ticket: any) => {
          return ticket.totalPriceList.some((priceInfo: any) =>
            fareIdentifiers.includes(priceInfo.fareIdentifier)
          );
        });
      }

      // 2. Price Range Filter (Uses updated getTicketPrice)
      let filteredData = dataToFilter.filter((ticket: any) => {
        const price = getTicketPrice(ticket);
        return price >= priceRange[0] && price <= priceRange[1];
      });

      // Stops Filter
      if (stops !== "all") {
        filteredData = filteredData.filter((ticket: any) => {
          const stopCount = ticket.sI.length;
          if (stops === "non-stop") {
            return stopCount === 1;
          } else if (stops === "1-stop") {
            return stopCount === 2;
          } else if (stops === "2-stops") {
            return stopCount > 2;
          }
          return true;
        });
      }

      // Departure Time Filter
      if (departureTime !== "all") {
        filteredData = filteredData.filter((ticket: any) => {
          const departureHour = new Date(ticket.sI[0].dt).getHours();
          if (departureTime === "early-morning") {
            return departureHour >= 0 && departureHour < 6;
          } else if (departureTime === "morning") {
            return departureHour >= 6 && departureHour < 12;
          } else if (departureTime === "afternoon") {
            return departureHour >= 12 && departureHour < 18;
          } else if (departureTime === "evening") {
            return departureHour >= 18 && departureHour < 24;
          }
          return true;
        });
      }

      // Airline Filter
      if (selectedAirlines.length > 0) {
        filteredData = filteredData.filter((ticket: any) =>
          selectedAirlines.includes(ticket.sI[0].fD.aI.name)
        );
      }

      // Arrival Time Filter
      if (arrivalTime !== "all") {
        filteredData = filteredData.filter((ticket: any) => {
          const arrivalHour = new Date(
            ticket.sI[ticket.sI.length - 1].at
          ).getHours();
          if (arrivalTime === "early-morning") {
            return arrivalHour >= 0 && arrivalHour < 6;
          } else if (arrivalTime === "morning") {
            return arrivalHour >= 6 && arrivalHour < 12;
          } else if (arrivalTime === "afternoon") {
            return arrivalHour >= 12 && arrivalHour < 18;
          } else if (arrivalTime === "evening") {
            return arrivalHour >= 18 && arrivalHour < 24;
          }
          return true;
        });
      }

      if (fareIdentifiers.length > 0) {
        filteredData = filteredData.filter((ticket: any) => {
          return ticket.totalPriceList.some((priceInfo: any) =>
            fareIdentifiers.includes(priceInfo.fareIdentifier)
          );
        });
      }

      if (flightNumberSearch) {
        filteredData = filteredData.filter((ticket: any) => {
          return ticket.sI.some((segment: any) => {
            const flightCode = `${segment.fD.aI.code} ${segment.fD.fN}`;
            return flightCode.toLowerCase().includes(flightNumberSearch.toLowerCase());
          });
        });
      }

      setFilteredFlightData(filteredData);
    }
  };

  const getPriceRangeFromData = (data: any[]) => {
    const prices: number[] = [];

    data.forEach((ticket) => {
      // Use getTicketPrice to account for strict fare types
      const price = getTicketPrice(ticket);
      if (price !== undefined && !isNaN(price)) {
        prices.push(price);
      }
    });

    if (prices.length === 0) return [0, 100000]; // Fallback

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return [minPrice, maxPrice];
  };

  useEffect(() => {
    applyFilters();
  }, [
    priceRange,
    stops,
    departureTime,
    selectedAirlines,
    arrivalTime,
    fareIdentifiers,
    flightNumberSearch,
    selectedFareTypes,
    flightData,
  ]);

  const [activeFlight, setActiveFlight] = useState<any>(true);

  // const router = useRouter();
  // const searchParams = useSearchParams();

  // const requestId = searchParams.get("requestId");
  // console.log("requestIdrequestIdrequestId ", requestId);

  // Extract query parameters from the URL
  // const departureFrom   =  searchParams.get('departureFrom')
  // const arrivalTo       =  searchParams.get('arrivalTo')
  // const adults          =  searchParams.get('adults')
  // const children        =  searchParams.get('children')
  // const cabinType       =  searchParams.get('cabinType')
  // const departDate      =  searchParams.get('departDate')

  // const departureFromSr =  searchParams.get('gy_da_str')
  // const arrivalToSr     =  searchParams.get('gy_aa_str');

  const departureFrom = getCookie("gy_da");
  const arrivalTo = getCookie("gy_aa");
  if (getCookie("gy_adult") == undefined || getCookie("gy_adult") == "Nan") {
    setCookie("gy_adult", 1);
  }
  if (getCookie("gy_child") == undefined || getCookie("gy_child") == "Nan") {
    setCookie("gy_child", 0);
  }

  const adults = getCookie("gy_adult");
  const children = getCookie("gy_child");
  const cabinType = getCookie("gy_class");
  const departDate = getCookie("gy_trd");
  const returnDate = getCookie("gy_return");

  const departureFromSr = getCookie("gy_da_str");
  const arrivalToSr = getCookie("gy_aa_str");
  const tripType = getCookie("gy_triptype");
  const fareType = getCookie("gy_passender_type");
  const passengerType = getCookie("gy_passender_type");
  const isDirectFlightCookie =
    String(getCookie("gy_direct_flight") || "false").toLowerCase() === "true";
  const infant = getCookie("gy_infant");

  const [multicitySegments, setMulticitySegments] = useState(() => {
    const cookieValue = getCookie("gy_multi_city");
    console.error("existing multi city value in cookie: ", cookieValue);

    const addErrorFields = (segment: any) => ({
      ...segment,
      departureDate: segment.departureDate
        ? dayjs(segment.departureDate).format("YYYY-MM-DD")
        : "",
      fromError: "",
      toError: "",
      lastEditedField: null,
    });

    try {
      const parsed = cookieValue ? JSON.parse(cookieValue) : null;

      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(addErrorFields);
      }

      return [
        addErrorFields({
          from: "Select City",
          fromCode: "NIL",
          to: "Select City",
          toCode: "NIL",
          departureDate: "",
        }),
      ];
    } catch (e) {
      console.error("Failed to parse multi-city cookie:", e);
      return [
        addErrorFields({
          from: "Delhi",
          fromCode: "DEL",
          to: "Bengaluru",
          toCode: "BLR",
          departureDate: "",
        }),
      ];
    }
  });

  useEffect(() => {
    setCookie("gy_multi_city", JSON.stringify(multicitySegments));
  }, [multicitySegments]);

  const [errorMsg, setErrorMsg] = useState("");
  const [dateError, setDateError] = useState("");
  const [srx_tripType, setTripType] = useState(tripType);

  useEffect(() => {
    if (srx_tripType === "multi-city") {
      // Check for empty fields
      for (const segment of multicitySegments) {
        if (!segment.fromCode || !segment.toCode || !segment.departureDate) {
          setErrorMsg("Please fill all fields in each segment.");
          return;
        }
      }

      // Check for ascending dates
      for (let i = 0; i < multicitySegments.length - 1; i++) {
        const currentSegment = multicitySegments[i];
        const nextSegment = multicitySegments[i + 1];
        if (
          currentSegment.departureDate &&
          nextSegment.departureDate &&
          dayjs(currentSegment.departureDate).isAfter(
            dayjs(nextSegment.departureDate)
          )
        ) {
          setDateError("Departure dates must be in ascending order.");
          return;
        }
      }
    }
    setErrorMsg("");
    setDateError("");
  }, [multicitySegments, srx_tripType]);

  const addSegment = () => {
    const lastSegment = multicitySegments[multicitySegments.length - 1];

    if (
      !lastSegment ||
      !lastSegment.fromCode ||
      !lastSegment.toCode ||
      !lastSegment.departureDate
    ) {
      setErrorMsg(
        "Please fill in the previous segment before adding a new one."
      );
      return;
    }

    setErrorMsg(""); // Clear error if validation passed

    const newDepartureDate = dayjs(lastSegment.departureDate).add(2, "day").format("YYYY-MM-DD");
    setMulticitySegments((prev) => [
      ...prev,
      {
        from: lastSegment.to,
        fromCode: lastSegment.toCode,
        to: "Select City",
        toCode: "",
        departureDate: newDepartureDate,
        fromError: "",
        toError: "",
        lastEditedField: null,
      },
    ]);
  };

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  const [openFromMultiIndex, setOpenFromMultiIndex] = useState<number | null>(
    null
  );
  const [openToMultiIndex, setOpenToMultiIndex] = useState<number | null>(null);

  useEffect(() => {
    let needsUpdate = false;
    const updatedSegments = multicitySegments.map((segment, idx) => {
      const newSegment = { ...segment };
      let fromError = "";
      let toError = "";

      if (
        segment.fromCode &&
        segment.toCode &&
        segment.fromCode === segment.toCode
      ) {
        if (segment.lastEditedField === "from") {
          fromError = "From and To cities cannot be the same";
        } else {
          toError = "From and To cities cannot be the same";
        }
      }

      if (segment.from === "Select City" && openFromMultiIndex !== idx) {
        fromError = "Select a City";
      }

      if (segment.to === "Select City" && openToMultiIndex !== idx) {
        toError = "Select a City";
      }

      if (newSegment.fromError !== fromError) {
        newSegment.fromError = fromError;
        needsUpdate = true;
      }
      if (newSegment.toError !== toError) {
        newSegment.toError = toError;
        needsUpdate = true;
      }

      return newSegment;
    });

    if (needsUpdate) {
      setMulticitySegments(updatedSegments);
    }
  }, [multicitySegments, openFromMultiIndex, openToMultiIndex]);

  const removeSegment = (index: number) => {
    setMulticitySegments((prev) => prev.filter((_, i) => i !== index));
  };

  // const multicitySegments = JSON.parse(getCookie("gy_multi_city"));

  let firstSegment = [
    {
      from: departureFromSr || "",
      fromCode: departureFrom || "",
      to: arrivalToSr || "",
      toCode: arrivalTo || "",
      departureDate: departDate || "",
    },
  ];

  useEffect(() => {
    setCookie("gy_multi_city", JSON.stringify(multicitySegments));
  }, [multicitySegments]);

  let combinedMulticitySegment = [...firstSegment, ...multicitySegments];
  const mydata: any = {
    departureFrom: departureFrom,
    arrivalTo: arrivalTo,
    adults: adults,
    children: children,
    infant: infant,
    cabinType: cabinType,
    departDate: departDate,
    departureFromSr: departureFromSr,
    arrivalToSr: arrivalToSr,
    tripType: tripType,
    passengerType: passengerType,
  };

  if (returnDate != undefined || returnDate != "Nan") {
    mydata.returnDate = returnDate;
  }

  const queryString = new URLSearchParams(mydata).toString(); // produces "id=10&date=1222"

  // hide or not ??
  // router.push(`/ tickets ? ${ queryString } `);

  // const modifySearchRef = useRef(false);
  const [modifySearchRef, setModifySearchRef] = useState(false);

  useEffect(() => {
    if (
      (srx_tripType?.toLowerCase() || "") === "multi-city" &&
      modifySearchRef
    ) {
      // live validate but don't auto-scroll
      validateMultiCity({ focusFirstError: false });
    }
  }, [srx_tripType, modifySearchRef]);

  const handleModifySearch = () => {
    // alert(" search modified ");
    setModifySearchRef(true);
  };

  const handlesearFlight = () => {
    if ((srx_tripType?.toLowerCase() || "") === "multi-city") {
      const pass = validateMultiCity({ focusFirstError: true });
      if (!pass) return; // stop if invalid
    }

    if (fromError || toError) {
      return; // Do not proceed if there are city selection errors
    }

    if ((srx_tripType || "").toLowerCase() === "multi-city") {
      SetSearchFlight(true);
    } else {
      // single and round trip
      SetSearchFlight(true);
    }
  };

  // const onClickSearch = () => {
  //   if ((srx_tripType?.toLowerCase() || "") === "multi-city") {
  //     const pass = validateMultiCity({ focusFirstError: true });
  //     if (!pass) return; // stop if invalid
  //   }
  //   // single/round-trip can use your existing checks...
  //   handlesearFlight();
  // };

  const [true_Tripconst, setTripconst] = useState<boolean>(false);
  const [searchFlight, SetSearchFlight] = useState<boolean>(true);
  const hasFetchedRef = useRef(false);

  const [srx_cabinType, setCabinType] = useState<any>(null);

  // Not required for API call but kept in state for other uses if needed.
  const [ticketParams, setTicketParams] = useState({ id: null, date: null });
  const [searchedTripType, setSearchedTripType] = useState<string>("");


  useEffect(() => {
    // handle reschedule
    // if (requestId) {
    //   const loadReissueTicket = async () => {
    //     setFlightData(null);
    //     setActiveFlight(true);
    //     setloading(true);

    //     try {
    //       let parameter = {
    //         requestId: requestId,
    //       };
    //       let reqData = {
    //         action: "searchReissue2",
    //         requestData: parameter,
    //       };
    //       const result = await postData(
    //         "travelogy/one-way/fetch-data",
    //         reqData
    //       );
    //       if (result && result.status && result.status.success && result.status.success === true && result.searchResult && result.searchResult.tripInfos) {
    //         setFlightData(result.searchResult.tripInfos);
    //         setError("")
    //       } else {
    //         setError(result.errors[0].message);
    //       }
    //     } catch (err: any) {
    //       console.error("error caused", err);

    //       if (err?.response?.data) {
    //         const errorData = err.response.data;
    //         if (typeof errorData.error === "string") {
    //           if (errorData.error.toLowerCase().includes("invalid airport")) {
    //             setError("Invalid route. Please choose a different route.");
    //           } else {
    //             setError(errorData.error);
    //           }
    //         } else if (
    //           Array.isArray(errorData.errors) &&
    //           errorData.errors.length
    //         ) {
    //           const firstError = errorData.errors[0];
    //           const message =
    //             firstError?.message || "An unknown error occurred.";
    //           setError(message);
    //         }
    //       } else if (err?.message) {
    //         setError(err.message);
    //       } else {
    //         setError("Something went wrong. Please try again.");
    //       }
    //     } finally {
    //       setloading(false);
    //       setActiveFlight(false);
    //       SetSearchFlight(false); // reset trigger
    //       hasFetchedRef.current = false; // allow next fetch
    //     }
    //   };
    //   loadReissueTicket();
    //   return
    // } else {
    //   // might move the code
    // }

    if (!searchFlight || hasFetchedRef.current) return;
    closeAllFields();
    hasFetchedRef.current = true;

    if ((srx_tripType?.toLowerCase() || "") === "multi-city") {
      setModifySearchRef(false);
    }

    // Ensure all required query parameters are available before making the API call.
    if (!departureFrom || !arrivalTo || !cabinType || !departDate) {
      return;
    }

    // Parse passenger counts from string to number; use defaults if not provided.
    const numAdults = adults ? parseInt(adults, 10) : 1;
    const numChildren = children ? parseInt(children, 10) : 0;
    const numInfant = infant ? parseInt(children, 10) : 0;

    setCabinType(cabinType);

    let tripBasedRouteInfo: any = [];

    // gy_triptype
    if ((srx_tripType?.toLowerCase() || "") === "one-way") {
      tripBasedRouteInfo = [
        {
          fromCityOrAirport: {
            code: departureFrom,
          },
          toCityOrAirport: {
            code: arrivalTo,
          },
          travelDate: departDate,
        },
      ];
    }
    if ((srx_tripType?.toLowerCase() || "") === "round-trip") {
      tripBasedRouteInfo = [
        {
          fromCityOrAirport: {
            code: departureFrom,
          },
          toCityOrAirport: {
            code: arrivalTo,
          },
          travelDate: departDate,
        },
        {
          fromCityOrAirport: {
            code: arrivalTo,
          },
          toCityOrAirport: {
            code: departureFrom,
          },
          travelDate: returnDate,
        },
      ];
    }

    let parsedSegments = [];

    if (typeof multicitySegments === "string") {
      try {
        parsedSegments = JSON.parse(multicitySegments);
      } catch (err) {
        console.error("Failed to parse multicitySegments:", err);
      }
    } else {
      parsedSegments = multicitySegments;
    }

    if (
      (srx_tripType?.toLowerCase() || "") === "multi-city" &&
      Array.isArray(parsedSegments) &&
      parsedSegments.length > 0
    ) {
      let tripBasedRouteInfoMain = [
        {
          fromCityOrAirport: {
            code: departureFrom,
          },
          toCityOrAirport: {
            code: arrivalTo,
          },
          travelDate: departDate,
        },
      ];
      let tripBasedRouteInfoSub = parsedSegments.map((item) => ({
        fromCityOrAirport: {
          code: item.fromCode,
        },
        toCityOrAirport: {
          code: item.toCode,
        },
        travelDate:
          item?.departureDate &&
            typeof item.departureDate === "string" &&
            item.departureDate.includes("T")
            ? item.departureDate.split("T")[0]
            : item?.departureDate,
      }));

      tripBasedRouteInfo = [
        ...tripBasedRouteInfoMain,
        ...tripBasedRouteInfoSub,
      ];
    }

    const mapPassengerType: any = {
      "SENIOR CITIZEN": "SENIOR_CITIZEN",
      STUDENT: "STUDENT",
      REGULAR: "REGULAR",
    };

    // Build the parameter object without extra curly braces
    const parameter = {
      searchQuery: {
        cabinClass: classLabels[cabinType],
        paxInfo: {
          ADULT: adultCount,
          CHILD: countChildren,
          INFANT: countInfant,
        },
        routeInfos: tripBasedRouteInfo,
        searchModifiers: {
          // pfts: [mapPassengerType[passengerType]],
          // sourceId: "22",
          pft: mapPassengerType[passengerType],
          isDirectFlight: isDirectFlight, // always true if isDirectFlight is false
          isConnectingFlight: false,
          // "sourceId": 0,
          // "pnrCreditInfo": {
          //   "pnr": ""
          // },
          // "iiss": false
        },
      },
    };

    // Async function to fetch flight data
    const loadData = async () => {
      setFlightData(null);
      setActiveFlight(true);
      setloading(true);

      try {
        // Call your API function with the properly constructed parameter
        // const result = await postDataTJ(parameter)
        let reqData = {
          action: "search",
          requestData: parameter,
        };
        const result: any = await postData(
          "travelogy/one-way/fetch-data",
          reqData
        );
        if (result && result.searchResult && result.searchResult.tripInfos) {
          const tripInfos = result.searchResult.tripInfos;
          Object.keys(tripInfos).forEach((key) => {
            if (Array.isArray(tripInfos[key])) {
              tripInfos[key] = tripInfos[key].map((ticket: any, index: number) => ({
                ...ticket,
                id: generateStableId(ticket)
              }));
            }
          });
          setFlightData(tripInfos);
          setSearchedTripType(srx_tripType || "");
        } else if (result?.error) {
          if (typeof result.error === "string") {
            if (result?.error?.toLowerCase()?.includes("invalid airport")) {
              setError("Invalid route. Please choose a different route.");
            } else {
              setError(result.error);
            }
          }
        } else {
          setError("");
        }
      } catch (err: any) {
        console.error("error caused", err);

        if (err?.response?.data) {
          const errorData = err.response.data;

          // Check for specific known error message
          if (typeof errorData.error === "string") {
            if (errorData?.error?.toLowerCase()?.includes("invalid airport")) {
              setError("Invalid route. Please choose a different route.");
            } else {
              setError(errorData.error);
            }
          }

          // Optional fallback for structured error arrays
          else if (Array.isArray(errorData.errors) && errorData.errors.length) {
            const firstError = errorData.errors[0];
            const message = firstError?.message || "An unknown error occurred.";
            setError(message);
          }
        } else if (err?.message) {
          setError(err.message);
        } else {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setloading(false);
        setActiveFlight(false);
        SetSearchFlight(false); // reset trigger
        hasFetchedRef.current = false; // allow next fetch
        setIsSearchPerformed(true);
      }
    };

    // if (searchFlight) {
    //   loadData();
    //   SetSearchFlight(false);
    // }
    loadData();

    // Run the effect whenever any dependency changes
  }, [
    // departureFrom,
    // arrivalTo,
    // cabinType,
    // departDate,
    // adults,
    // children,
    searchFlight,
  ]);

  const fareItems: MenuProps["items"] = [
    {
      label: "Regular",
      key: "REGULAR",
    },
    {
      label: "Student",
      key: "STUDENT",
    },
    {
      label: "Senior Citizen",
      key: "SENIOR CITIZEN",
    },
  ];

  const items: MenuProps["items"] = [
    {
      label: "One-Way",
      key: "One-Way",
    },
    {
      label: "Round-Trip",
      key: "Round-Trip",
    },
    {
      label: "Multi-city",
      key: "Multi-city",
    },
  ];

  // controls visibility
  const [open, setOpen] = useState(false);
  const [fareOpen, setFareOpen] = useState(false);
  const [srx_fareType, setfareType] = useState(fareType);

  useEffect(() => {
    const t = Cookies.get("gy_triptype") || "";
    setTripType(t);
    const f = Cookies.get("gy_passender_type") || "";
    setfareType(f);
  }, []);

  const [srx_departureFrom, setdepartureFrom] = useState<string>("");
  const [srx_departureCode, setDepartureToCode] = useState<string>("");

  useEffect(() => {
    if (!getCookie("gy_da_str")) {
      setCookie("gy_da_str", "Delhi");
      setCookie("gy_da", "DEL");
      setdepartureFrom("Delhi");
      setDepartureToCode("DEL");
    }
    if (!getCookie("gy_aa_str")) {
      setCookie("gy_da_str", "Bengaluru");
      setCookie("gy_da", "BLR");
      setdepartureFrom("Bengaluru");
      setDepartureToCode("BLR");
    }
    if (!getCookie("gy_triptype")) {
      setCookie("gy_triptype", "One-Way");
      setTripType("One-Way");
    }
  });

  useEffect(() => {
    if (srx_departureFrom) {
      setCookie("gy_da_str", srx_departureFrom.trim());
    }
  }, [srx_departureFrom]);

  useEffect(() => {
    if (srx_departureCode) {
      setCookie("gy_da", srx_departureCode.trim());
    }
  }, [srx_departureCode]);

  useEffect(() => {
    const df = Cookies.get("gy_da_str") || "";
    setdepartureFrom(df);
  }, []);

  const [error, setError] = useState<string>("");
  const [fromError, setFromError] = useState<string>("");
  const [toError, setToError] = useState<string>("");
  const [srx_arrivalTo, setArrivalTo] = useState<string>("");
  const [srx_arrivalCode, setArrivalToCode] = useState<string>("");
  const [lastEditedField, setLastEditedField] = useState<string | null>(null);
  const [isSearchPerformed, setIsSearchPerformed] = useState<boolean>(false);

  const handleFromCityChange = (city: string) => {
    setdepartureFrom(city);
    setLastEditedField("from");
  };

  const handleToCityChange = (city: string) => {
    setArrivalTo(city);
    setLastEditedField("to");
  };

  // useEffect(() => {
  // 	if (!getCookie('gy_aa_str')) {
  // 		setCookie('gy_da_str', 'Bengaluru');
  // 		setCookie('gy_da', 'BLR');
  // 		setdepartureFrom('Bengaluru');
  // 		setDepartureToCode('BLR');
  // 	}
  // });

  useEffect(() => {
    if (
      srx_departureFrom &&
      srx_arrivalTo &&
      srx_departureFrom === srx_arrivalTo
    ) {
      if (lastEditedField === "from") {
        setFromError("From and To cities cannot be the same.");
        setToError("");
      } else if (lastEditedField === "to") {
        setToError("From and To cities cannot be the same.");
        setFromError("");
      }
    } else {
      setFromError("");
      setToError("");
    }
  }, [srx_departureFrom, srx_arrivalTo, lastEditedField]);

  useEffect(() => {
    const dfa = Cookies.get("gy_aa_str") || "";
    setArrivalTo(dfa);
  }, []);

  useEffect(() => {
    if (srx_arrivalCode) {
      setCookie("gy_aa", srx_arrivalCode.trim());
    }
  }, [srx_arrivalCode]);

  useEffect(() => {
    if (srx_arrivalTo) {
      setCookie("gy_aa_str", srx_arrivalTo.trim());
    }
  }, [srx_arrivalTo]);

  const [srx_traveller, setTraveller] = useState(1);

  const [adultCount, setAdultCount] = useState(parseInt(mydata.adults));
  const [countChildren, setCountChildren] = useState(parseInt(mydata.children));
  const [countInfant, setcountInfant] = useState(parseInt(mydata.infant));
  const adultChildCount = adultCount + countChildren;
  const [totalPassenderCount, setTotalPassenderCount] =
    useState(adultChildCount);

  useEffect(() => {
    if ((fareType === "STUDENT") || (fareType === "SENIOR CITIZEN")) {
      const childtCnt = 0;
      const infantCnt = 0;
      setCookie("gy_child", childtCnt);
      setCountChildren(childtCnt);
      setCookie("gy_infant", infantCnt);
      setcountInfant(infantCnt);
    }
  }, [fareType]);

  useEffect(() => {
    const dfadu = parseInt(Cookies.get("gy_adult") || "1", 10);
    const dfchi = parseInt(Cookies.get("gy_child") || "0", 10);
    const dfinf = parseInt(Cookies.get("gy_infant") || "0", 10);
    setTraveller(dfadu + dfchi + dfinf);
  }, [countChildren, adultCount, countInfant]);

  const [dd_monthStr, setDd_monthStr] = useState<string | null>(null);
  const [dd_strdate, setDd_strdate] = useState<string | null>(null);
  const [dd_date, setDd_date] = useState<string | null>(null);
  const [dd_year, setDd_year] = useState<string | null>(null);
  const [srx_depart, setDepartDate] = useState<string | null>(null);

  // menu click handler
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    setTripType(key);
    setCookie("gy_triptype", key);
    if (key.toLowerCase() === "multi-city") {
      setModifySearchRef(true);
    }
    setOpen((prev) => !prev);
    setIsSearchPerformed(false);
    // setFlightData(null);
  };

  const handleFareMenuClick: MenuProps["onClick"] = ({ key }) => {
    setfareType(key);
    setCookie("gy_passender_type", key);
    setFareOpen((prev) => !prev);
  };

  const [showSearchState, setShowSearchState] = useState<boolean>(false);
  const [openDepartMultiIndex, setOpenDepartMultiIndex] = useState<
    number | null
  >(null);

  const multiOpenfrom = (idx: number) => {
    setOpenFromMultiIndex((prev) => (prev === idx ? null : idx));
    const newSegs = [...multicitySegments];
    if (newSegs[idx]) {
      newSegs[idx].fromError = "";
      setMulticitySegments(newSegs);
    }
  };

  const multiOpenToSecond = (idx: number) => {
    setOpenToMultiIndex((prev) => (prev === idx ? null : idx));
    const newSegs = [...multicitySegments];
    if (newSegs[idx]) {
      newSegs[idx].toError = "";
      setMulticitySegments(newSegs);
    }
  };

  const multiOpenToDateRange = (idx: number) => {
    setOpenDepartMultiIndex((prev) => (prev === idx ? null : idx));
    const newSegs = [...multicitySegments];
    if (newSegs[idx]) {
      newSegs[idx].dateError = "";
      setMulticitySegments(newSegs);
    }
  };

  const [showTraveller, setShowYTraveller] = useState<boolean>(false);
  const [showSearchStateTo, setShowSearchStateTo] = useState<boolean>(false);
  const [openDateRage, setOpenDateRage] = useState<boolean>(false);
  const [openDateRageR, setOpenDateRageR] = useState(false);

  const [datedep, setDatedep] = useState<Dayjs>(() => {
    const cookieDate = Cookies.get("gy_trd");
    return cookieDate ? dayjs(cookieDate) : dayjs();
  });

  const [datedepr, setDatedepr] = useState<Dayjs>(() => {
    const cookieDate = Cookies.get("gy_return");
    return cookieDate ? dayjs(cookieDate) : dayjs();
  });

  // useEffect(() => {

  //   const formattedDatedep = dayjs(datedep);
  //   const fDepartureDate =  formattedDatedep.format("YYYY-MM-DD");

  //   const formattedDatedepr = dayjs(datedepr);
  //   const fReturnDate =  formattedDatedepr.format("YYYY-MM-DD");

  //   if (((srx_tripType?.toLowerCase() || "") === "round-trip") && (fDepartureDate == fReturnDate)) {
  //     console.log("should throw validation !!!!!!!!!!!!!!!")
  //   }
  // }, [datedep, datedepr]);

  const openfrom = () => {
    if (showSearchState) {
      closeAllFields();
    } else {
      closeAllFields();
      setShowSearchState(true);
    }
    setFromError("");
  };

  const openTo = () => {
    if (showSearchStateTo) {
      closeAllFields();
    } else {
      closeAllFields();
      setShowSearchStateTo(true);
    }
    setToError("");
  };

  const openToDateRange = () => {
    if (openDateRage) {
      closeAllFields();
    } else {
      closeAllFields();
      setOpenDateRage(true);
    }
  };

  const openTraveller = () => {
    if (showTraveller) {
      closeAllFields();
    } else {
      closeAllFields();
      setShowYTraveller(true);
    }
  };

  const handleFareOpen = () => {
    if (fareOpen) {
      closeAllFields();
    } else {
      closeAllFields();
      setFareOpen(true);
    }
  };

  const handleOpen = () => {
    if (open) {
      closeAllFields();
    } else {
      closeAllFields();
      setOpen(true);
    }
  };

  const openToDateRangeR = () => {
    if (openDateRageR) {
      closeAllFields();
    } else {
      closeAllFields();
      setOpenDateRageR(true);
    }
  };

  const closeAllFields = () => {
    setShowSearchState(false);
    setShowSearchStateTo(false);
    setOpenDateRage(false);
    setOpenDateRageR(false);
    setShowYTraveller(false);
    setOpen(false);
    setFareOpen(false);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // console.log("Escape pressed - Closing attributes");
        closeAllFields();
        setOpenFromMultiIndex(null);
        setOpenToMultiIndex(null);
        setOpenDepartMultiIndex(null);
      }
    };
    // Use capture phase to handle event before other components
    window.addEventListener("keydown", handleEsc, true);

    return () => {
      window.removeEventListener("keydown", handleEsc, true);
    };
  }, []);

  useEffect(() => {
    setTotalPassenderCount(adultCount + countChildren);
  }, [adultCount, countChildren]);

  const clickMinus = () => {
    let adultCnt = adultCount - 1;
    setCookie("gy_adult", adultCnt);
    if (adultCnt < countInfant) {
      clickMinusinfant();
    }
    setAdultCount(adultCnt); // Correct way to toggle the state
  };

  const clickPlus = () => {
    let adultMin = adultCount + 1;
    if (totalPassenderCount < 9) {
      setCookie("gy_adult", adultMin);
      setAdultCount(adultMin); // Correct way to toggle the state
    }
  };

  const clickMinusChildren = () => {
    let childtMin = countChildren - 1;
    setCookie("gy_child", childtMin);
    setCountChildren(childtMin); // Correct way to toggle the state
  };

  const clickPlusChildren = () => {
    let childtCnt = countChildren + 1;
    if (totalPassenderCount < 9) {
      setCookie("gy_child", childtCnt);
      setCountChildren(childtCnt); // Correct way to toggle the state
    }
  };

  const clickMinusinfant = () => {
    let infantMin = countInfant - 1;
    setCookie("gy_infant", infantMin);
    setcountInfant(infantMin);
  };

  const clickPlusinfant = () => {
    let infantCnt = countInfant + 1;
    // if (adult >= infantCnt) {
    setCookie("gy_infant", infantCnt);
    setcountInfant(infantCnt);
    // }
  };

  const handleChangeClass = (e: any) => {
    setCookie("gy_class", e.target.value);
    setCabinType(e.target.value); // Update the selected value in state
  };

  // useEffect(() => {
  // 	setCookie('gy_class', srx_cabinType);
  // }, [srx_cabinType]);

  useEffect(() => {
    if (datedep) {
      const formattedDate = dayjs(datedep);

      setCookie("gy_trd", formattedDate.format("YYYY-MM-DD"));
      setDd_monthStr(formattedDate.format("MMM")); // Format as string
      setDd_strdate(formattedDate.format("dddd")); // Format as string
      setDd_date(formattedDate.format("DD")); // Format as string
      setDd_year(formattedDate.format("YY")); // Format as string
    }
  }, [datedep]);

  const [ddr_monthStr, setDdr_monthStr] = useState<string | null>(null);
  const [ddr_strdate, setDdr_strdate] = useState<string | null>(null);
  const [ddr_date, setDdr_date] = useState<string | null>(null);
  const [ddr_year, setDdr_year] = useState<string | null>(null);

  useEffect(() => {
    if (datedepr) {
      const formattedDate: any = dayjs(datedepr);

      setCookie("gy_return", formattedDate.format("YYYY-MM-DD"));
      setDdr_monthStr(formattedDate.format("MMM"));
      setDdr_strdate(formattedDate.format("dddd"));
      setDdr_date(formattedDate.format("DD"));
      setDdr_year(formattedDate.format("YY"));
    }
  }, [datedepr]);

  const closePopUp = () => {
    setError("");
  };
  const handleGotItClick = () => {
    closePopUp();
    handleModifySearch();
  };

  // let searchEnginewidth = {};
  // if ((srx_tripType?.toLowerCase() || "") === "multi-city") {
  //   searchEnginewidth = {
  //     width: "65%",
  //   };
  // }

  // if ((srx_tripType?.toLowerCase() || "") === "round-trip") {
  //   searchEnginewidth = {
  //     width: "90%",
  //   };
  // }

  const getHeaderClass = () => {
    const t = srx_tripType?.toLowerCase();
    if (t === "one-way") {
      return "hdt_header-fligt-w-o";
    }
    if (t === "multi-city") {
      return "hdt_header-fligt-w-m";
    }
    if (t === "round-trip") {
      return "hdt_header-fligt-w-r";
    }

    return "";
  };

  const getTravellerClass = () => {
    const t = srx_tripType?.toLowerCase();
    // if (t === "one-way") {
    //   return "pos-t-r";
    // }
    // if (t === "multi-city") {
    //   return "pos-t-r_m";
    // }
    // if (t === "round-trip") {
    //   return "pos-t-r_o";
    // }

    return "";
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          {/* <EngineTabs active_border={'1'} /> */}

          <div
            className="h-[auto] w-full bg_cs_search"
            style={{ position: 'sticky', top: isMobile ? '70px' : '70px', zIndex: 900 }} // Lower z-index to stay below header's dropdown
          >
            {/* Desktop Header */}
            {!isMobile && (
              <>
                <div className={`hdt_header ${getHeaderClass()} `}>
                  <div className="hdt_header-item">
                    <label>Fare Types</label>
                    <Dropdown
                      menu={{ items: fareItems, onClick: handleFareMenuClick }}
                      open={fareOpen}
                      trigger={[]}
                      placement="bottomLeft"
                      overlayStyle={{ zIndex: 10000001 }}
                      getPopupContainer={(trigger) => trigger.parentElement!}

                    >
                      <div
                        className="hdt_value"
                        onClick={() => {
                          if (
                            ((srx_tripType?.toLowerCase() || "") === "multi-city" &&
                              modifySearchRef) ||
                            (srx_tripType?.toLowerCase() || "") !== "multi-city"
                          ) {
                            handleFareOpen();
                          }
                        }}
                        style={{ cursor: "pointer", display: "inline-block" }}
                      >
                        {srx_fareType}
                      </div>
                    </Dropdown>
                    <div className="mt-2 pl-2">
                      <DirectFlight
                        isDirectFlight={isDirectFlight}
                        setIsDirectFlight={setIsDirectFlight}
                        isHeader={true}
                      />
                    </div>
                  </div>
                  <div className="hdt_header-item">
                    <label>Trip Type</label>
                    <Dropdown
                      menu={{ items, onClick: handleMenuClick }}
                      open={open}
                      trigger={[]} // ← disable all built‑in open/close triggers
                      placement="bottomLeft" // or wherever you like
                      overlayStyle={{ zIndex: 10000001 }}
                      getPopupContainer={(trigger) => trigger.parentElement!}
                    >
                      <div
                        className="hdt_value"
                        // onClick={() => setOpen(prev => !prev)}  // ← your toggle
                        onClick={() => {
                          if (
                            ((srx_tripType?.toLowerCase() || "") === "multi-city" &&
                              modifySearchRef) ||
                            (srx_tripType?.toLowerCase() || "") !== "multi-city"
                          ) {
                            handleOpen();
                          }
                        }}
                        style={{ cursor: "pointer", display: "inline-block" }}
                      >
                        {srx_tripType}
                      </div>
                    </Dropdown>
                  </div>
                  {(srx_tripType?.toLowerCase() || "") === "multi-city" &&
                    !modifySearchRef && (
                      <div className="hdt_header-item" style={{ width: "25%" }}>
                        <label>Trip Info</label>
                        <div className="multicity-scrollplace">
                          {combinedMulticitySegment.map((segment, idx) => (
                            <div key={idx} className="place-flights hdt_value">
                              <ul className="al-selist al-selist-positionHandle">
                                <li className="whitecolor">
                                  {segment.fromCode}
                                  <br />
                                </li>
                                <li>
                                  <div className="right-arrow"></div>
                                </li>
                                <li className="whitecolor">
                                  {segment.toCode}
                                  <br />
                                </li>
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {(((srx_tripType?.toLowerCase() || "") === "multi-city" &&
                    modifySearchRef) ||
                    (srx_tripType?.toLowerCase() || "") !== "multi-city") && (
                      <>
                        <div className="hdt_header-item relative">
                          <label>From</label>
                          <div onClick={openfrom} className="hdt_value">
                            {srx_departureFrom}
                          </div>

                          {showSearchState ? (
                            <div className="searchFfromSelect searchFfromSelect_2" style={{ zIndex: 10000002 }}>
                              <AppListSearch
                                operEngLocation={openfrom}
                                setSelectFrom={handleFromCityChange}
                                setSelectFromSub={setDepartureToCode}
                              />
                            </div>
                          ) : null}
                          <Tooltip
                            className="flex shadow-md z-10"
                            placement="bottom"
                            title={fromError}
                            open={!!fromError}
                            arrow={{ pointAtCenter: true }}
                            overlayInnerStyle={{
                              backgroundColor: "#ffeaea",
                              color: "#ff4d4f",
                              fontWeight: 500,
                            }}
                          ></Tooltip>
                        </div>

                        <div className="hdt_header-item relative">
                          <label>To</label>
                          <div onClick={openTo} className="hdt_value">
                            {srx_arrivalTo}
                          </div>

                          {showSearchStateTo ? (
                            <div className="searchFfromSelect searchFfromSelect_2" style={{ zIndex: 10000002 }}>
                              <AppListSearch
                                operEngLocation={openTo}
                                setSelectFrom={handleToCityChange}
                                setSelectFromSub={setArrivalToCode}
                              />
                            </div>
                          ) : null}
                          <Tooltip
                            className="flex shadow-md z-50"
                            placement="bottom"
                            title={toError}
                            open={!!toError}
                            arrow={{ pointAtCenter: true }}
                            overlayInnerStyle={{
                              backgroundColor: "#ffeaea",
                              color: "#ff4d4f",
                              fontWeight: 500,
                            }}
                          ></Tooltip>
                        </div>
                      </>
                    )}

                  {(((srx_tripType?.toLowerCase() || "") === "multi-city" &&
                    modifySearchRef) ||
                    (srx_tripType?.toLowerCase() || "") !== "multi-city") && (
                      <div className="hdt_header-item">
                        <label>Depart</label>
                        <div
                          onClick={() => {
                            if (
                              ((srx_tripType?.toLowerCase() || "") === "multi-city" &&
                                modifySearchRef) ||
                              (srx_tripType?.toLowerCase() || "") !== "multi-city"
                            ) {
                              openToDateRange();
                            }
                          }}
                          className="hdt_value"
                        >
                          {dd_strdate}, {dd_monthStr} {dd_date} {dd_year}
                        </div>

                        {openDateRage ? (
                          <div className="relative" style={{ zIndex: 10000002 }}>
                            <AppDateRangeFlight
                              openToDateRange={openToDateRange}
                              setDate={handleDepartureDateChange}
                              minDate={null}
                              value={datedep}
                            />
                          </div>
                        ) : null}
                      </div>
                    )}

                  {(srx_tripType?.toLowerCase() || "") === "round-trip" ? (
                    <>
                      <div className="hdt_header-item">
                        <label>Return</label>
                        <div onClick={openToDateRangeR} className="hdt_value">
                          {ddr_strdate}, {ddr_monthStr} {ddr_date} {ddr_year}
                        </div>
                        {openDateRageR ? (
                          <div className="relative" style={{ zIndex: 10000002 }}>
                            <AppDateRangeFlight
                              openToDateRange={openToDateRangeR}
                              setDate={setDatedepr}
                              minDate={datedep}
                              value={datedepr}
                            />
                          </div>
                        ) : null}
                      </div>
                    </>
                  ) : null}

                  <div
                    className="hdt_header-item relative"
                  >
                    <div
                      onClick={() => {
                        if (
                          ((srx_tripType?.toLowerCase() || "") === "multi-city" &&
                            modifySearchRef) ||
                          (srx_tripType?.toLowerCase() || "") !== "multi-city"
                        ) {
                          openTraveller();
                        }
                      }}
                    >
                      <label>Passengers &amp; Class</label>
                      <div className="hdt_value">
                        <span>
                          {srx_traveller}{" "}
                          {srx_traveller > 1 ? "travellers" : "traveller"} |{" "}
                          <span className="text-sm">
                            {classLabels[srx_cabinType]}
                          </span>
                        </span>
                      </div>
                    </div>
                    {/* Render TravellerForm here for correct positioning */}
                    {showTraveller && (
                      <div style={{ position: 'absolute', top: '130%', right: '-40%', zIndex: 10000002 }}>
                        <TravellerForm
                          showTraveller={showTraveller}
                          adult={adultCount}
                          opentrvForm={openTraveller}
                          clickMinus={clickMinus}
                          clickPlus={clickPlus}
                          clickMinusChildren={clickMinusChildren}
                          clickPlusChildren={clickPlusChildren}
                          countchildren={countChildren}
                          countinfant={countInfant}
                          handleChangeClass={handleChangeClass}
                          travellerClass={srx_cabinType}
                          clickMinusinfant={clickMinusinfant}
                          clickPlusinfant={clickPlusinfant}
                          totalPassenderCount={totalPassenderCount}
                          specificStyle={`${getTravellerClass()} !w-[190%]`}
                          selectedPassengerType={srx_fareType}
                          contentWidth="max-content"
                        />
                      </div>
                    )}
                  </div>

                  {(srx_tripType?.toLowerCase() || "") === "multi-city" &&
                    !modifySearchRef ? (
                    <div className="hdt_header-item">
                      <label style={{ visibility: "hidden" }}>Search</label>
                      <button
                        onClick={handleModifySearch}
                        className="hdt_search-btn"
                      >
                        Modify Search
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="hdt_header-item">
                        <label style={{ visibility: "hidden" }}>Search</label>

                        <div
                          onClick={
                            fromError ||
                              toError ||
                              errorMsg ||
                              dateError ||
                              ((srx_tripType?.toLowerCase() || "") === "multi-city" &&
                                multicitySegments.some(
                                  (s) => s.fromError || s.toError || s.dateError
                                ))
                              ? () => { }
                              : handlesearFlight
                            // onClickSearch
                          }
                          className={`hdt_search-btn ${fromError ||
                            toError ||
                            errorMsg ||
                            dateError ||
                            ((srx_tripType?.toLowerCase() || "") === "multi-city" &&
                              multicitySegments.some(
                                (s) => s.fromError || s.toError || s.dateError
                              ))
                            ? "cursor-not-allowed opacity-50"
                            : ""
                            } `}
                        >
                          Search
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {(srx_tripType?.toLowerCase() || "") === "multi-city" &&
                  modifySearchRef && (
                    <>
                      <div style={{ width: "48%", margin: "0 auto" }}>
                        {multicitySegments.map((segment: any, idx: any) => (
                          <div key={idx} className="flex justify-left items-center">
                            <div
                              className="hdt_header-item relative"
                              style={{ width: "20%" }}
                            >
                              <div>
                                <label>From</label>
                                <div
                                  onClick={() => multiOpenfrom(idx)}
                                  className="hdt_value"
                                >
                                  {segment.from}
                                </div>
                                {/* {segment.fromError && <span className="error">{segment.fromError}</span>} */}
                              </div>
                              {openFromMultiIndex === idx && (
                                <div className="searchFfromSelect searchFfromSelect_2" style={{ zIndex: 10000002 }}>
                                  <AppListSearch
                                    operEngLocation={() => multiOpenfrom(idx)}
                                    setSelectFrom={(val: any) => {
                                      const newSegs = [...multicitySegments];
                                      newSegs[idx].from = val;
                                      newSegs[idx].lastEditedField = "from";
                                      setMulticitySegments(newSegs);
                                    }}
                                    setSelectFromSub={(val: any) => {
                                      const newSegs = [...multicitySegments];
                                      newSegs[idx].fromCode = val;
                                      setMulticitySegments(newSegs);
                                    }}
                                  />
                                </div>
                              )}
                              <Tooltip
                                className="flex shadow-md z-10"
                                placement="bottom"
                                title={segment.fromError}
                                open={!!segment.fromError}
                                arrow={{ pointAtCenter: true }}
                                overlayInnerStyle={{
                                  backgroundColor: "#ffeaea",
                                  color: "#ff4d4f",
                                  fontWeight: 500,
                                }}
                              ></Tooltip>
                            </div>

                            <div
                              className="hdt_header-item relative"
                              style={{ width: "20%" }}
                            >
                              <div>
                                <label>To</label>
                                <div
                                  onClick={() => multiOpenToSecond(idx)}
                                  className="hdt_value"
                                >
                                  {segment.to}
                                </div>
                                {/* {segment.toError && <span className="error">{segment.toError}</span>} */}
                              </div>
                              {openToMultiIndex === idx && (
                                <div className="searchFfromSelect searchFfromSelect_2" style={{ zIndex: 10000002 }}>
                                  <AppListSearch
                                    operEngLocation={() => multiOpenToSecond(idx)}
                                    setSelectFrom={(val: any) => {
                                      const newSegs = [...multicitySegments];
                                      newSegs[idx].to = val;
                                      newSegs[idx].lastEditedField = "to";
                                      setMulticitySegments(newSegs);
                                    }}
                                    setSelectFromSub={(val: any) => {
                                      const newSegs = [...multicitySegments];
                                      newSegs[idx].toCode = val;
                                      setMulticitySegments(newSegs);
                                    }}
                                  />
                                </div>
                              )}
                              <Tooltip
                                className="flex shadow-md z-50"
                                placement="bottom"
                                title={segment.toError}
                                open={!!segment.toError}
                                arrow={{ pointAtCenter: true }}
                                overlayInnerStyle={{
                                  backgroundColor: "#ffeaea",
                                  color: "#ff4d4f",
                                  fontWeight: 500,
                                }}
                              ></Tooltip>
                            </div>

                            <div className="hdt_header-item">
                              <div>
                                <label>Depart</label>
                                <div
                                  onClick={() => multiOpenToDateRange(idx)}
                                  className="hdt_value"
                                >
                                  {segment.departureDate
                                    ? dayjs(segment.departureDate).format(
                                      "ddd, MMM D YYYY"
                                    )
                                    : "Select Date"}
                                </div>
                              </div>
                              {/* {segment.dateError && <span className="error">{segment.dateError}</span>} */}
                              {openDepartMultiIndex === idx && (
                                <div className="relative" style={{ zIndex: 10000002 }}>
                                  <AppDateRangeFlight
                                    openToDateRange={() => multiOpenToDateRange(idx)}
                                    setDate={(val: any) => {
                                      const newSegs = [...multicitySegments];
                                      newSegs[idx].departureDate = val;
                                      setMulticitySegments(newSegs);
                                    }}
                                    minDate={
                                      idx > 0
                                        ? multicitySegments[idx - 1].departureDate
                                        : datedep
                                    } // Use datedep for the first segment
                                    value={multicitySegments[idx].departureDate}
                                  />
                                </div>
                              )}
                              <Tooltip
                                className="flex shadow-md z-50"
                                placement="bottom"
                                title={segment.dateError}
                                open={!!segment.dateError}
                                arrow={{ pointAtCenter: true }}
                                overlayInnerStyle={{
                                  backgroundColor: "#ffeaea",
                                  color: "#ff4d4f",
                                  fontWeight: 500,
                                }}
                              ></Tooltip>
                            </div>

                            {/* Add/Remove buttons */}
                            <div
                              className="hdt_segment-controls"
                              style={{ paddingTop: "10px" }}
                            >
                              {idx === multicitySegments.length - 1 && (
                                <>
                                  {multicitySegments.length > 1 && (
                                    <button
                                      style={{
                                        background: "grey",
                                        borderRadius: "10px",
                                        marginTop: "14px",
                                      }}
                                      onClick={() => removeSegment(idx)}
                                      className="remove-segment text-white"
                                    >
                                      Remove
                                    </button>
                                  )}

                                  {multicitySegments.length < 5 && (
                                    <button
                                      style={{
                                        background: "grey",
                                        borderRadius: "10px",
                                        margin: "10px",
                                      }}
                                      onClick={addSegment}
                                      className="add-segment text-white"
                                    >
                                      Add
                                    </button>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      {errorMsg && (
                        <div
                          className="text-red-500 mt-2 text-sm font-medium"
                          style={{ textAlign: "center", padding: "10px" }}
                        >
                          {errorMsg}
                        </div>
                      )}
                      {dateError && (
                        <div
                          className="text-red-500 mt-2 text-sm font-medium"
                          style={{ textAlign: "center", padding: "10px" }}
                        >
                          {dateError}
                        </div>
                      )}
                    </>
                  )}
              </>
            )}

            {isMobile && (
              <div className="mobile-search-summary py-2 px-3 flex justify-between items-center text-white" style={{ background: "#1a1a2e" }}>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">
                    {srx_departureFrom} → {srx_arrivalTo}
                  </span>
                  <span className="text-xs opacity-80">
                    {dayjs(datedep).format("DD MMM")} | {srx_traveller} {srx_traveller > 1 ? "Travellers" : "Traveller"}
                  </span>
                </div>
                <Button
                  size="small"
                  ghost
                  onClick={() => setModifySearchOpen(true)}
                  style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}
                >
                  Modify
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Header Summary */}
          {/* {isMobile && (
            <div className="mobile-search-summary py-2 px-3 flex justify-between items-center text-white" style={{ background: "#1a1a2e" }}>
              <div className="flex flex-col">
                <span className="text-sm font-bold">
                  {srx_departureFrom} → {srx_arrivalTo}
                </span>
                <span className="text-xs opacity-80">
                  {dayjs(datedep).format("DD MMM")} | {srx_traveller} {srx_traveller > 1 ? "Travellers" : "Traveller"}
                </span>
              </div>
              <Button
                size="small"
                ghost
                onClick={() => setModifySearchOpen(true)}
                style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}
              >
                Modify
              </Button>
            </div>
          )} */}

          {/* Modify Search Drawer for Mobile */}
          <Drawer
            title="Modify Search"
            placement="bottom"
            onClose={() => setModifySearchOpen(false)}
            open={isMobile && modifySearchOpen}
            height="100%"
            className="modify-search-drawer"
            zIndex={10000001}
          >
            <div className="flex flex-col gap-4 p-2">
              <div className="modify-field">
                <label className="text-xs font-bold text-gray-500 uppercase">Fare Type</label>
                <Dropdown menu={{ items: fareItems, onClick: handleFareMenuClick }}>
                  <div className="border p-2 rounded cursor-pointer">{srx_fareType}</div>
                </Dropdown>
              </div>
              <div className="modify-field">
                <label className="text-xs font-bold text-gray-500 uppercase">Trip Type</label>
                <Dropdown menu={{ items, onClick: handleMenuClick }}>
                  <div className="border p-2 rounded cursor-pointer">{srx_tripType}</div>
                </Dropdown>
              </div>

              {/* One-Way and Round-Trip Fields */}
              {(srx_tripType?.toLowerCase() || "") !== "multi-city" && (
                <>
                  <div className="flex gap-2">
                    <div className="modify-field flex-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">From</label>
                      <div onClick={openfrom} className="border p-2 rounded cursor-pointer truncate">{srx_departureFrom}</div>
                      {showSearchState && (
                        <div className="absolute z-50 bg-white border w-full max-h-60 overflow-y-auto">
                          <AppListSearch
                            operEngLocation={openfrom}
                            setSelectFrom={handleFromCityChange}
                            setSelectFromSub={setDepartureToCode}
                          />
                        </div>
                      )}
                    </div>
                    <div className="modify-field flex-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">To</label>
                      <div onClick={openTo} className="border p-2 rounded cursor-pointer truncate">{srx_arrivalTo}</div>
                      {showSearchStateTo && (
                        <div className="absolute z-50 bg-white border w-full max-h-60 overflow-y-auto">
                          <AppListSearch
                            operEngLocation={openTo}
                            setSelectFrom={handleToCityChange}
                            setSelectFromSub={setArrivalToCode}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="modify-field">
                    <label className="text-xs font-bold text-gray-500 uppercase">Depart</label>
                    <div onClick={openToDateRange} className="border p-2 rounded cursor-pointer">
                      {dayjs(datedep).format("ddd, DD MMM YYYY")}
                    </div>
                    {openDateRage && (
                      <AppDateRangeFlight
                        openToDateRange={openToDateRange}
                        setDate={handleDepartureDateChange}
                        minDate={null}
                        value={datedep}
                      />
                    )}
                  </div>

                  {/* Round-Trip Return Date */}
                  {(srx_tripType?.toLowerCase() || "") === "round-trip" && (
                    <div className="modify-field">
                      <label className="text-xs font-bold text-gray-500 uppercase">Return</label>
                      <div onClick={openToDateRangeR} className="border p-2 rounded cursor-pointer">
                        {dayjs(datedepr).format("ddd, DD MMM YYYY")}
                      </div>
                      {openDateRageR && (
                        <AppDateRangeFlight
                          openToDateRange={openToDateRangeR}
                          setDate={setDatedepr}
                          minDate={datedep}
                          value={datedepr}
                        />
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Multi-City Segments */}
              {(srx_tripType?.toLowerCase() || "") === "multi-city" && (
                <div className="flex flex-col gap-3">
                  {/* First Segment (Original From/To/Depart) */}
                  <div className="border rounded p-3 bg-blue-50">
                    <div className="text-xs font-bold text-gray-600 mb-2">Segment 1 (Main Route)</div>
                    <div className="flex gap-2 mb-2">
                      <div className="flex-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">From</label>
                        <div onClick={openfrom} className="border p-2 rounded cursor-pointer bg-white truncate text-sm">
                          {srx_departureFrom}
                        </div>
                        {showSearchState && (
                          <div className="absolute z-50 bg-white border w-full max-h-60 overflow-y-auto">
                            <AppListSearch
                              operEngLocation={openfrom}
                              setSelectFrom={handleFromCityChange}
                              setSelectFromSub={setDepartureToCode}
                            />
                          </div>
                        )}
                        {fromError && (
                          <div className="text-xs text-red-500 mt-1">{fromError}</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">To</label>
                        <div onClick={openTo} className="border p-2 rounded cursor-pointer bg-white truncate text-sm">
                          {srx_arrivalTo}
                        </div>
                        {showSearchStateTo && (
                          <div className="absolute z-50 bg-white border w-full max-h-60 overflow-y-auto">
                            <AppListSearch
                              operEngLocation={openTo}
                              setSelectFrom={handleToCityChange}
                              setSelectFromSub={setArrivalToCode}
                            />
                          </div>
                        )}
                        {toError && (
                          <div className="text-xs text-red-500 mt-1">{toError}</div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Depart</label>
                      <div onClick={openToDateRange} className="border p-2 rounded cursor-pointer bg-white text-sm">
                        {dayjs(datedep).format("ddd, MMM D YYYY")}
                      </div>
                      {openDateRage && (
                        <AppDateRangeFlight
                          openToDateRange={openToDateRange}
                          setDate={setDatedep}
                          minDate={null}
                          value={datedep}
                        />
                      )}
                    </div>
                  </div>

                  {/* Additional Multi-City Segments */}
                  {multicitySegments.map((segment: any, idx: any) => (
                    <div key={idx} className="border rounded p-3 bg-gray-50">
                      <div className="text-xs font-bold text-gray-600 mb-2">Segment {idx + 2}</div>
                      <div className="flex gap-2 mb-2">
                        <div className="flex-1 relative">
                          <label className="text-xs font-bold text-gray-500 uppercase">From</label>
                          <div onClick={() => multiOpenfrom(idx)} className="border p-2 rounded cursor-pointer bg-white truncate text-sm">
                            {segment.from}
                          </div>
                          {openFromMultiIndex === idx && (
                            <div className="absolute z-50 bg-white border w-full max-h-60 overflow-y-auto">
                              <AppListSearch
                                operEngLocation={() => multiOpenfrom(idx)}
                                setSelectFrom={(val: any) => {
                                  const newSegs = [...multicitySegments];
                                  newSegs[idx].from = val;
                                  newSegs[idx].lastEditedField = "from";
                                  setMulticitySegments(newSegs);
                                }}
                                setSelectFromSub={(val: any) => {
                                  const newSegs = [...multicitySegments];
                                  newSegs[idx].fromCode = val;
                                  setMulticitySegments(newSegs);
                                }}
                              />
                            </div>
                          )}
                          {segment.fromError && (
                            <div className="text-xs text-red-500 mt-1">{segment.fromError}</div>
                          )}
                        </div>
                        <div className="flex-1 relative">
                          <label className="text-xs font-bold text-gray-500 uppercase">To</label>
                          <div onClick={() => multiOpenToSecond(idx)} className="border p-2 rounded cursor-pointer bg-white truncate text-sm">
                            {segment.to}
                          </div>
                          {openToMultiIndex === idx && (
                            <div className="absolute z-50 bg-white border w-full max-h-60 overflow-y-auto">
                              <AppListSearch
                                operEngLocation={() => multiOpenToSecond(idx)}
                                setSelectFrom={(val: any) => {
                                  const newSegs = [...multicitySegments];
                                  newSegs[idx].to = val;
                                  newSegs[idx].lastEditedField = "to";
                                  setMulticitySegments(newSegs);
                                }}
                                setSelectFromSub={(val: any) => {
                                  const newSegs = [...multicitySegments];
                                  newSegs[idx].toCode = val;
                                  setMulticitySegments(newSegs);
                                }}
                              />
                            </div>
                          )}
                          {segment.toError && (
                            <div className="text-xs text-red-500 mt-1">{segment.toError}</div>
                          )}
                        </div>
                      </div>
                      <div className="relative">
                        <label className="text-xs font-bold text-gray-500 uppercase">Depart</label>
                        <div onClick={() => multiOpenToDateRange(idx)} className="border p-2 rounded cursor-pointer bg-white text-sm">
                          {segment.departureDate ? dayjs(segment.departureDate).format("ddd, MMM D YYYY") : "Select Date"}
                        </div>
                        {openDepartMultiIndex === idx && (
                          <AppDateRangeFlight
                            openToDateRange={() => multiOpenToDateRange(idx)}
                            setDate={(val: any) => {
                              const newSegs = [...multicitySegments];
                              newSegs[idx].departureDate = val ? dayjs(val).format("YYYY-MM-DD") : "";
                              setMulticitySegments(newSegs);
                            }}
                            minDate={idx > 0 ? multicitySegments[idx - 1].departureDate : datedep}
                            value={multicitySegments[idx].departureDate}
                          />
                        )}
                        {segment.dateError && (
                          <div className="text-xs text-red-500 mt-1">{segment.dateError}</div>
                        )}
                      </div>
                      {idx === multicitySegments.length - 1 && (
                        <div className="flex gap-2 mt-3">
                          {multicitySegments.length > 1 && (
                            <button
                              onClick={() => removeSegment(idx)}
                              className="flex-1 bg-red-500 text-white py-2 px-3 rounded text-sm"
                            >
                              Remove
                            </button>
                          )}
                          {multicitySegments.length < 5 && (
                            <button
                              onClick={addSegment}
                              className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm"
                            >
                              Add Segment
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Global Error Messages */}
                  {errorMsg && (
                    <div className="text-red-500 text-sm font-medium text-center p-2 bg-red-50 rounded">
                      {errorMsg}
                    </div>
                  )}
                  {dateError && (
                    <div className="text-red-500 text-sm font-medium text-center p-2 bg-red-50 rounded">
                      {dateError}
                    </div>
                  )}
                </div>
              )}

              <div className="modify-field">
                <DirectFlight
                  isDirectFlight={isDirectFlight}
                  setIsDirectFlight={setIsDirectFlight}
                  isHeader={false}
                />
              </div>

              <div className="modify-field">
                <label className="text-xs font-bold text-gray-500 uppercase">Travellers & Class</label>
                <div onClick={openTraveller} className="border p-2 rounded cursor-pointer">
                  {srx_traveller} {srx_traveller > 1 ? "Travellers" : "Traveller"} | {classLabels[srx_cabinType]}
                </div>

                {/* Traveller Form Popup - Mobile Optimized */}
                {showTraveller && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end" onClick={openTraveller}>
                    <div className="bg-white w-full rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Select Travellers & Class</h3>
                        <button onClick={openTraveller} className="text-2xl">&times;</button>
                      </div>

                      {/* Adults */}
                      <div className="flex justify-between items-center mb-4 pb-3 border-b">
                        <div className="text-base font-bold">Adults</div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={adultCount > 1 ? clickMinus : undefined}
                            disabled={adultCount <= 1}
                            className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xl font-bold disabled:opacity-30"
                            style={{ borderColor: "#EB5B00", color: "#EB5B00" }}
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-bold text-lg">{adultCount}</span>
                          <button
                            onClick={adultCount < 9 && totalPassenderCount < 9 ? clickPlus : undefined}
                            disabled={adultCount >= 9 || totalPassenderCount >= 9}
                            className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xl font-bold disabled:opacity-30"
                            style={{ borderColor: "#EB5B00", color: "#EB5B00" }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className={`flex justify-between items-center mb-4 pb-3 border-b ${srx_fareType !== "REGULAR" ? "opacity-50" : ""} `}>
                        <div className="text-base font-bold">Children</div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={countChildren > 0 ? clickMinusChildren : undefined}
                            disabled={countChildren <= 0}
                            className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xl font-bold disabled:opacity-30"
                            style={{ borderColor: "#EB5B00", color: "#EB5B00" }}
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-bold text-lg">{countChildren}</span>
                          <button
                            onClick={countChildren < 9 && totalPassenderCount < 9 ? clickPlusChildren : undefined}
                            disabled={countChildren >= 9 || totalPassenderCount >= 9}
                            className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xl font-bold disabled:opacity-30"
                            style={{ borderColor: "#EB5B00", color: "#EB5B00" }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Infants */}
                      <div className={`flex justify-between items-center mb-4 pb-3 border-b ${srx_fareType !== "REGULAR" ? "opacity-50" : ""} `}>
                        <div className="text-base font-bold">Infant</div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={countInfant > 0 ? clickMinusinfant : undefined}
                            disabled={countInfant <= 0}
                            className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xl font-bold disabled:opacity-30"
                            style={{ borderColor: "#EB5B00", color: "#EB5B00" }}
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-bold text-lg">{countInfant}</span>
                          <button
                            onClick={countInfant < adultCount ? clickPlusinfant : undefined}
                            disabled={countInfant >= adultCount}
                            className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xl font-bold disabled:opacity-30"
                            style={{ borderColor: "#EB5B00", color: "#EB5B00" }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Travel Class */}
                      <div className="mt-6">
                        <div className="text-sm font-bold mb-3 uppercase">Choose Travel Class</div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleChangeClass({ target: { value: "b" } })}
                            className={`p-3 rounded border-2 font-semibold ${srx_cabinType === "b" ? "bg-blue-500 text-white border-blue-500" : "border-gray-300"} `}
                          >
                            Economy
                          </button>
                          <button
                            onClick={() => handleChangeClass({ target: { value: "a" } })}
                            className={`p-3 rounded border-2 font-semibold text-sm ${srx_cabinType === "a" ? "bg-blue-500 text-white border-blue-500" : "border-gray-300"} `}
                          >
                            Premium Economy
                          </button>
                          <button
                            onClick={() => handleChangeClass({ target: { value: "c" } })}
                            className={`p-3 rounded border-2 font-semibold ${srx_cabinType === "c" ? "bg-blue-500 text-white border-blue-500" : "border-gray-300"} `}
                          >
                            Business
                          </button>
                          <button
                            onClick={() => handleChangeClass({ target: { value: "d" } })}
                            className={`p-3 rounded border-2 font-semibold ${srx_cabinType === "d" ? "bg-blue-500 text-white border-blue-500" : "border-gray-300"} `}
                          >
                            First
                          </button>
                        </div>
                      </div>

                      {/* Apply Button */}
                      <Button
                        type="primary"
                        onClick={openTraveller}
                        block
                        size="large"
                        className="mt-6"
                        style={{ background: "#008cff" }}
                      >
                        APPLY
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <Button
                type="primary"
                block
                size="large"
                style={{ background: "#008cff", marginTop: "20px" }}
                onClick={() => {
                  handlesearFlight();
                  setModifySearchOpen(false);
                }}
              >
                Search Flights
              </Button>
            </div>
          </Drawer>

          {/* <TravellerForm
            showTraveller={showTraveller}
            adult={adultCount}
            opentrvForm={openTraveller}
            clickMinus={clickMinus}
            clickPlus={clickPlus}
            clickMinusChildren={clickMinusChildren}
            clickPlusChildren={clickPlusChildren}
            countchildren={countChildren}
            countinfant={countInfant}
            handleChangeClass={handleChangeClass}
            travellerClass={srx_cabinType}
            clickMinusinfant={clickMinusinfant}
            clickPlusinfant={clickPlusinfant}
            totalPassenderCount={totalPassenderCount}
            // specificStyle={{ top: "23%", right: "9%" }}
            // specificStyle={"pos-t-r"}
            specificStyle={`${getTravellerClass()} `}
            selectedPassengerType={srx_fareType}
          /> */}

          {/* Block Banner Tickets */}
          {/* <section className="section-box box-logos-2 box-logos-tickets background-body">
            <div className="container">
              <div className="box-swiper pt-0">
                <div className="swiper-container swiper-group-payment-10 wow fadeInUp">
                  <SwiperGroupPayment10Slider />
                </div>
              </div>
            </div>
          </section> */}

          {/* Ticket List Section */}

          <section className="box-section block-content-tourlist background-body">
            <div className="container-fluid" style={{ width: "100%" }}>
              <div className="box-content-main">
                <div className="content-right border ">
                  {/* <div className="box-filters mb-25 pb-5 border-bottom border-1">
                    <SortTicketsFilter
                      sortCriteria={sortCriteria}
                      handleSortChange={handleSortChange}
                      itemsPerPage={itemsPerPage}
                      handleItemsPerPageChange={handleItemsPerPageChange}
                      handleClearFilters={handleClearFilters}
                      startItemIndex={startItemIndex}
                      endItemIndex={endItemIndex}
                      sortedTickets={sortedTickets}
                    />
                  </div> */}

                  {loading && (
                    <div
                      className="box-list-flights box-list-flights-2"
                      style={{ padding: "10px" }}
                    >
                      <div>
                        <div />

                        <div className="item-flight background-card border-1 ticket-container relative">
                          <div className="air_detailes"></div>
                          <div className="flight-route flight-route-type-2 city1"></div>

                          <Skeleton active={activeFlight} />
                        </div>
                      </div>

                      <div>
                        <div />

                        <div className="item-flight background-card border-1 ticket-container relative">
                          <div className="air_detailes"></div>
                          <div className="flight-route flight-route-type-2 city1"></div>

                          <Skeleton active={activeFlight} />
                        </div>
                      </div>

                      <div>
                        <div />

                        <div className="item-flight background-card border-1 ticket-container relative">
                          <div className="air_detailes"></div>
                          <div className="flight-route flight-route-type-2 city1"></div>

                          <Skeleton active={activeFlight} />
                        </div>
                      </div>

                      <div>
                        <div />

                        <div className="item-flight background-card border-1 ticket-container relative">
                          <div className="air_detailes"></div>
                          <div className="flight-route flight-route-type-2 city1"></div>

                          <Skeleton active={activeFlight} />
                        </div>
                      </div>
                      <div>
                        <div />

                        <div className="item-flight background-card border-1 ticket-container relative">
                          <div className="air_detailes"></div>
                          <div className="flight-route flight-route-type-2 city1"></div>

                          <Skeleton active={activeFlight} />
                        </div>
                      </div>
                    </div>
                  )}

                  {((searchedTripType?.trim().toLowerCase() === "one-way" &&
                    flightData?.ONWARD?.length > 0) ||
                    (searchedTripType?.trim().toLowerCase() === "round-trip" &&
                      flightData?.COMBO?.length > 0) ||
                    (searchedTripType?.trim().toLowerCase() === "multi-city" &&
                      flightData?.COMBO?.length > 0)) &&
                    (() => {
                      // const tripInfo = filteredFlightData;
                      const tripInfo = sortedFlightData;

                      return (
                        <>
                          <div className="box-grid-tours">
                            {/* Mobile Filter Button */}
                            <div className="d-xl-none d-block p-2" style={{ textAlign: "right" }}>
                              <Button
                                type="primary"
                                icon={<FilterOutlined />}
                                onClick={showFilterDrawer}
                                style={{ marginBottom: "10px" }}
                              >
                                Filters
                              </Button>
                            </div>

                            {/* Drawer */}
                            <Drawer
                              title="Filter Flights"
                              placement="left"
                              onClose={onCloseFilterDrawer}
                              open={filterDrawerOpen}
                              width={300}
                              zIndex={10000001}
                            >
                              <div className="content-left">
                                {renderFilters()}
                              </div>
                            </Drawer>

                            <div className="row">
                              {/* Sidebar Desktop */}
                              <div className="col-xl-3 d-none d-xl-block content-left" style={{ paddingTop: "10px" }}>
                                {renderFilters()}
                              </div>

                              <div className="col-xl-9 col-12">
                                {(searchedTripType?.trim().toLowerCase() === "one-way" ||
                                  searchedTripType?.trim().toLowerCase() === "round-trip") && (
                                    <div className="sticky top-36 lg:top-48 z-10 mb-3 flex justify-end items-center bg-white p-2 rounded shadow-sm border border-gray-100" style={{ marginTop: "10px" }}>
                                      {!shareMode ? (
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                          <ShareAltOutlined />
                                          <span className="font-semibold">Share By :</span>
                                          <span
                                            className="cursor-pointer hover:text-orange-500 font-medium text-orange-500"
                                            onClick={() => setShareMode(true)}
                                          >
                                            Email
                                          </span>
                                        </div>
                                      ) : (
                                        <div className="flex items-center gap-3 w-full justify-between">
                                          <div className="text-gray-600 text-sm font-medium">
                                            Select flights to share ({selectedQuoteFlights.length} selected)
                                          </div>
                                          <div className="flex gap-2">
                                            <span
                                              className="cursor-pointer text-orange-500 font-bold hover:text-orange-600 flex items-center gap-1"
                                              onClick={() => setIsQuoteSharing(true)}
                                            >
                                              Send <ShareAltOutlined />
                                            </span>
                                            <span
                                              className="cursor-pointer text-gray-500 hover:text-gray-700 flex items-center gap-1 ml-2"
                                              onClick={() => {
                                                setShareMode(false);
                                                setSelectedQuoteFlights([]);
                                              }}
                                            >
                                              <CloseOutlined />
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                {tripInfo?.length > 0 ? (
                                  <div
                                    className="box-list-flights box-list-flights-2"
                                    style={{ padding: isMobile ? "0" : "10px" }}
                                  >
                                    {tripInfo.map((ticket: any, index: number) => {
                                      const ticketId = ticket.id;
                                      const currentMarkup = ticketMarkups[ticketId] ?? markup;
                                      return (
                                        <React.Fragment key={ticketId}>
                                          {isMobile ? (
                                            <TicketCardMobile
                                              ticket={{ ...ticket, id: ticketId }}
                                              flightData={flightData}
                                              markup={currentMarkup}
                                              allTicketMarkups={ticketMarkups}
                                              onPriceClick={openMarkupModal}
                                              shareMode={shareMode}
                                              selectedQuoteFlights={selectedQuoteFlights}
                                              onQuoteSelectionChange={handleQuoteSelectionChange}
                                              selectedFareTypes={selectedFareTypes}
                                              selectedFareIdentifiers={fareIdentifiers}
                                            />
                                          ) : (
                                            <TicketCard1
                                              ticket={{ ...ticket, id: ticketId }}
                                              flightData={flightData}
                                              markup={currentMarkup}
                                              allTicketMarkups={ticketMarkups}
                                              onPriceClick={openMarkupModal}
                                              shareMode={shareMode}
                                              selectedQuoteFlights={selectedQuoteFlights}
                                              onQuoteSelectionChange={handleQuoteSelectionChange}
                                              selectedFareTypes={selectedFareTypes}
                                              selectedFareIdentifiers={fareIdentifiers}
                                            />
                                          )}
                                        </React.Fragment>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  !loading && (
                                    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                                      <p className="text-xl font-semibold">
                                        No flights found for your filter criteria.
                                      </p>
                                      <p className="text-sm mt-2 text-gray-400">
                                        Try adjusting your filters to see more results.
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                          <QuoteShareModal
                            isOpen={isQuoteSharing}
                            onClose={() => setIsQuoteSharing(false)}
                            onSend={handleSendQuote}
                            loading={shareLoading}
                          />
                        </>
                      );
                    })()}

                  {(!flightData || (flightData && (!flightData.ONWARD || flightData.ONWARD.length === 0))) && searchedTripType?.trim().toLowerCase() === "one-way" &&
                    (() => {
                      return (
                        <>
                          {!loading && isSearchPerformed && (
                            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                              <p className="text-xl font-semibold">
                                No flights found for your search criteria.
                              </p>
                              <p className="text-sm mt-2 text-gray-400">
                                Please try adjusting your travel dates, airports, or filters.
                              </p>
                            </div>
                          )}
                        </>
                      );
                    })()}

                  {/* {(srx_tripType && srx_tripType.trim().toLowerCase() === "one-way") ? (
                    <>
                      {flightData && flightData.ONWARD && flightData.ONWARD.length > 0 ?
                        (<><div className="box-grid-tours">
                          <div className="row">
                            <div className="box-list-flights box-list-flights-2">
                              {flightData.ONWARD.map((ticket: any) => (
                                <React.Fragment key={ticket.id}>
                                  <TicketCard1 ticket={ticket} />
                                </React.Fragment>
                              ))
                              }
                            </div>
                          </div>
                        </div>
                          <ByPagination
                            handlePreviousPage={handlePreviousPage}
                            totalPages={totalPages}
                            currentPage={currentPage}
                            handleNextPage={handleNextPage}
                            handlePageChange={handlePageChange}
                          />
                        </>) : (<>
                          {loading === false && <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                            <p className="text-xl font-semibold">No result found</p>
                            <p className="text-sm mt-2 text-gray-400">Try adjusting your filters or search criteria.</p>
                          </div>}
                      </>)}
                    </>
                  ) : null } */}

                  {/* domestic - ONWARD RETURN - ticketCard */}
                  {searchedTripType &&
                    searchedTripType.trim().toLowerCase() === "round-trip" &&
                    searchedTripType.trim().toLowerCase() !== "one-way" &&
                    searchedTripType.trim().toLowerCase() !== "multi-city" ? (
                    <>
                      {flightData &&
                        flightData.ONWARD &&
                        flightData.ONWARD.length > 0 &&
                        flightData.RETURN &&
                        flightData.RETURN.length > 0 ? (
                        <RoundTripSelectionView
                          flightData={flightData}
                          departureFrom={departureFrom}
                          arrivalTo={arrivalTo}
                          markup={markup}
                          ticketMarkups={ticketMarkups}
                          onPriceClick={openMarkupModal}
                        />
                      ) : (
                        <>
                          {loading === false && isSearchPerformed && (
                            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                              <p className="text-xl font-semibold">
                                No flights found for your search criteria.
                              </p>
                              <p className="text-sm mt-2 text-gray-400">
                                Please try adjusting your travel dates, airports, or filters.
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  ) : null}
                  {searchedTripType &&
                    searchedTripType.trim().toLowerCase() === "multi-city" &&
                    !flightData?.COMBO ? (
                    <>
                      {flightData ? (
                        <MulticitySelectionView
                          flightData={flightData}
                          // departureFrom={departureFrom}
                          // arrivalTo={arrivalTo}
                          markup={markup}
                          ticketMarkups={ticketMarkups}
                          onPriceClick={openMarkupModal}
                        />
                      ) : (
                        <>
                          {loading === false && isSearchPerformed && (
                            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                              <p className="text-xl font-semibold">
                                No flights found for your search criteria.
                              </p>
                              <p className="text-sm mt-2 text-gray-400">
                                Please try adjusting your travel dates, airports, or filters.
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  ) : null}

                  {/* Invalid airport */}
                  {error && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <div className="bg-white border-2 border-black w-96 p-6 rounded-lg text-center shadow-lg">
                        <p className="text-red-600 mb-4 font-semibold">
                          Error: {error}
                        </p>

                        <button
                          className="border-2 border-black px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
                          onClick={handleGotItClick}
                        >
                          Ok, Got It
                        </button>
                      </div>
                    </div>
                  )}
                  {/* {error == "" && (
                                        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                                            <p className="text-xl font-semibold">No result found</p>
                                            <p className="text-sm mt-2 text-gray-400">
                                                Try adjusting your filters or search criteria.
                                            </p>
                                        </div>
                                    )} */}

                  {/* {srx_tripType && srx_tripType.trim().toLowerCase() === "round-trip" ? (
                    <>
                      {flightData && flightData.ONWARD && flightData.ONWARD.length > 0 && flightData.RETURN && flightData.RETURN.length > 0 ?
                        (<>
                          <div className="box-grid-tours">
                            <div className="row">
                              <p>ONWARD</p>
                              <div className="box-list-flights box-list-flights-2">
                                {flightData.ONWARD.map((ticket: any) => (
                                  <React.Fragment key={ticket.id}>
                                    <DomesticRoundTripTicketCard ticket={ticket} markup={markup} />
                                  </React.Fragment>
                                ))
                                }
                              </div>
                              <p>RETURN</p>
                              <div className="box-list-flights box-list-flights-2">
                                {flightData.RETURN.map((ticket: any) => (
                                  <React.Fragment key={ticket.id}>
                                    <DomesticRoundTripTicketCard ticket={ticket} markup={markup} />
                                  </React.Fragment>
                                ))
                                }
                              </div>
                            </div>
                          </div>
                          <ByPagination
                            handlePreviousPage={handlePreviousPage}
                            totalPages={totalPages}
                            currentPage={currentPage}
                            handleNextPage={handleNextPage}
                            handlePageChange={handlePageChange}
                          />
                        </>) : (<>
                          {loading === false && <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                            <p className="text-xl font-semibold">No result found</p>
                            <p className="text-sm mt-2 text-gray-400">Try adjusting your filters or search criteria.</p>
                          </div>}
                      </>)}
                    </>
                  ) : null } */}
                </div>

                {/* Left Sidebar Filters */}
                {/* {(
                  (srx_tripType?.trim().toLowerCase() === "round-trip" && flightData?.COMBO?.length > 0) ||
                  (srx_tripType?.trim().toLowerCase() === "multi-city" && flightData?.COMBO?.length > 0)) && (
                    <div className="content-left order-lg-first d1-class">
                      <div className="sidebar-left border-1 background-body">
                        <div className="box-filters-sidebar">
                          <div className="border-1">
                            <h6 className="text-lg-bold filter-sty neutral-1000">
                              Filter Price{" "}
                            </h6>
                            <ByPrice
                              priceRange={priceRange}
                              setPriceRange={setPriceRange}
                              minPriceRange={minPriceRange}
                              maxPriceRange={maxPriceRange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="sidebar-left border-1 background-body">
                        <div className="box-filters-sidebar">
                          <div className="border-1">
                            <h6 className="text-lg-bold filter-sty neutral-1000">
                              Stops
                            </h6>
                            <ByStops stops={stops} setStops={setStops} />
                          </div>
                        </div>
                      </div>
                      <div className="sidebar-left border-1 background-body">
                        <div className="box-filters-sidebar">
                          <div className="border-1">
                            <h6 className="text-lg-bold filter-sty neutral-1000">
                              Price
                            </h6>
                            <BySortPrice
                              sort={priceSort}
                              setSort={setPriceSort}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="sidebar-left border-1 background-body">
                        <div className="box-filters-sidebar">
                          <div className="border-1">
                            <h6 className="text-lg-bold filter-sty neutral-1000">
                              Departure Time
                            </h6>
                            <ByDepartureTime
                              departureTime={departureTime}
                              setDepartureTime={setDepartureTime}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="sidebar-left border-1 background-body">
                        <div className="box-filters-sidebar">
                          <div className="border-1">
                            <h6 className="text-lg-bold filter-sty neutral-1000">
                              Arrival Time
                            </h6>
                            <ByArrivalTime
                              arrivalTime={arrivalTime}
                              setArrivalTime={setArrivalTime}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="sidebar-left border-1 background-body">
                        <div className="box-filters-sidebar">
                          <div className="border-1">
                            <h6 className="text-lg-bold filter-sty neutral-1000">
                              Airlines
                            </h6>
                            <div className="box-collapse scrollFilter">
                              <ByAirline
                                uniqueAirlines={[
                                  ...new Set(
                                    (
                                      flightData?.ONWARD ||
                                      flightData?.COMBO ||
                                      []
                                    ).map(
                                      (ticket: any) => ticket.sI[0].fD.aI.name
                                    )
                                  ),
                                ]}
                                selectedAirlines={selectedAirlines}
                                setSelectedAirlines={setSelectedAirlines}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="sidebar-left border-1 background-body">
                        <div className="box-filters-sidebar">
                          <div className="border-1">
                            <h6 className="text-lg-bold filter-sty neutral-1000">
                              Fare Identifier
                            </h6>
                            <ByFareIdentifier
                              fareIdentifiers={fareIdentifiers}
                              setFareIdentifiers={setFareIdentifiers}
                              options={uniqueFareIdentifiers}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="sidebar-left border-1 background-body">
                        <div className="box-filters-sidebar">
                          <div className="border-1">
                            <h6 className="text-lg-bold filter-sty neutral-1000">
                              Flight Number
                            </h6>
                            <ByAirlineSearch
                              flightNumberSearch={flightNumberSearch}
                              setFlightNumberSearch={setFlightNumberSearch}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="sidebar-left border-1 background-body">
                        <div className="box-filters-sidebar">
                          <div className="border-1">
                            <h6 className="text-lg-bold filter-sty neutral-1000">
                              Fare Type
                            </h6>
                            <ByFareType
                              selectedFareTypes={selectedFareTypes}
                              setSelectedFareTypes={setSelectedFareTypes}
                              options={uniqueFareTypes}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )} */}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="section-box box-how-it-work-3 background-body">
            <div className="container">
              <div className="box-how-it-work-inner background-3">
                <h3 className="neutral-1000 wow fadeInUp">How It Work ?</h3>
                <p className="text-xl-medium neutral-500 mb-30 wow fadeInUp">
                  Just 4 easy and quick steps
                </p>
                <div className="row">
                  <div className="col-lg-10">
                    <ul className="list-steps list-steps-2-col wow fadeInUp">
                      <li>
                        <div className="step-no">
                          <span>1</span>
                        </div>
                        <div className="step-info">
                          <p className="text-xl-bold neutral-1000">
                            Search for Flights
                          </p>
                          <p className="text-sm-medium neutral-500">
                            Begin your journey by entering your departure city,
                            destination, travel dates, and the number of
                            passengers
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="step-no">
                          <span>2</span>
                        </div>
                        <div className="step-info">
                          <p className="text-xl-bold neutral-1000">
                            Select Your Flight
                          </p>
                          <p className="text-sm-medium neutral-500">
                            Review the search results and compare the details of
                            each flight, including departure and arrival times,
                            durations, and prices.
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="step-no">
                          <span>3</span>
                        </div>
                        <div className="step-info">
                          <p className="text-xl-bold neutral-1000">
                            Provide Passenger Information
                          </p>
                          <p className="text-sm-medium neutral-500">
                            Enter the required passenger information for all
                            individuals traveling, including names, contact
                            details, and any special requests
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="step-no">
                          <span>4</span>
                        </div>
                        <div className="step-info">
                          <p className="text-xl-bold neutral-1000">
                            Payment and Confirmation
                          </p>
                          <p className="text-sm-medium neutral-500">
                            Review the booking summary, including the total
                            cost, flight details, and passenger information
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="pb-90 background-body" />
        </main>
        {/* Markup Modal */}
        <Modal
          title="Set Markup Amount"
          open={isMarkupModalOpen}
          onCancel={() => setIsMarkupModalOpen(false)}
          style={{ top: "230px" }}
          footer={[
            <Button key="cancel" onClick={() => setIsMarkupModalOpen(false)}>
              Cancel
            </Button>,
            <Button key="apply-ticket" onClick={handleApplyToTicket}>
              Apply to This Ticket
            </Button>,
            <Button key="apply-all" type="primary" onClick={handleApplyToAll}>
              Apply to All
            </Button>,
            // <Button key="share-ticket" onClick={() => setIsShareModalOpen(true)}>
            //   Share
            // </Button>,
          ]}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Markup (₹)
            </label>
            <Input
              type="number"
              value={markupInput}
              onChange={(e) => {
                const val = e.target.value;
                if (val.length <= 5) {
                  setMarkupInput(val);
                }
              }}
              placeholder="Enter markup amount"
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </Modal>

        {/* Share Modal */}
        <Modal
          title="Share Quote via Email"
          open={isShareModalOpen}
          onOk={handleShareQuote}
          onCancel={() => setIsShareModalOpen(false)}
          okText={shareStatus === "sending" ? "Sending..." : "Send"}
          confirmLoading={shareStatus === "sending"}
          okButtonProps={{ disabled: shareStatus !== "idle" }}
          cancelButtonProps={{ disabled: shareStatus !== "idle" }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Email
            </label>
            <Input
              type="email"
              value={shareEmail}
              onChange={(e) => setShareEmail(e.target.value)}
              placeholder="Enter recipient email"
              disabled={shareStatus !== "idle"}
            />
          </div>
          {shareStatus === "sending" && (
            <div className="text-blue-600 text-sm font-medium mt-2">
              Sending quote... please wait.
            </div>
          )}
          {shareStatus === "success" && (
            <div className="text-green-600 text-sm font-medium mt-2 p-2 bg-green-50 border border-green-200 rounded">
              ✅ Quote sent successfully! This window will close in 3 seconds.
            </div>
          )}
          {shareStatus === "error" && (
            <div className="text-red-600 text-sm font-medium mt-2 p-2 bg-red-50 border border-red-200 rounded">
              ❌ Failed to send quote. Please try again.
            </div>
          )}
        </Modal>
      </Layout>
    </Suspense >
  );
}
