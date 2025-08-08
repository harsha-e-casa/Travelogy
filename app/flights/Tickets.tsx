"use client";
import ByAirline from "@/components/Filter/ByAirline";
import ByClass from "@/components/Filter/ByClass";
import ByLocation from "@/components/Filter/ByLocation";
import ByPagination from "@/components/Filter/ByPagination";
import ByPrice from "@/components/Filter/ByPrice";
import ByRating from "@/components/Filter/ByRating";
import SearchFilterBottom from "@/components/elements/SearchFilterBottom";
import SortTicketsFilter from "@/components/elements/SortTicketsFilter";
import TicketCard1 from "@/components/elements/ticketcard/TicketCard1";
import Layout from "@/components/layout/Layout";
import SwiperGroupPayment10Slider from "@/components/slider/SwiperGroupPayment10Slider";
import TopCategory2 from "@/components/sections/TopCategory2";
import SlideBanner1 from "@/components/sections/SlideBanner1";
import Banner from "@/components/sections/Banner";
import Flights4 from "@/components/sections/Flights4";
// import rawticketsData from "@/util/tickets.json";
import useTicketFilter from "@/util/useTicketFilter";
import EngineTabs from "@/components/searchEngine/engineHeader";
import Link from "next/link";
import React, { Suspense } from "react";
import LoveUs from "@/components/sections/LoveUs";
import Section6Home3 from "@/components/sections/Section6Home3";
import MicroallOffersPage from "@/app/microPage/MicroallOffersPage";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const AppDateRangeww = () => {
  const handleChange = (dates: any, dateString: any) => {
    if (dates) {
      const startDate = dayjs(dates[0]).format("MMM D YYYY"); // Format start date
      const endDate = dayjs(dates[1]).format("MMM D YYYY"); // Format end date
      console.log(`Start Date: ${startDate}`);
      console.log(`End Date: ${endDate}`);
      // setDates([startDate, endDate]);
    } else {
      console.log("No dates selected");
    }
  };

  return (
    <div className="custome-date-rage">
      <DatePicker.RangePicker
        placeholder={["Allow Empty", "Till Now"]}
        allowEmpty={[false, false]}
        onChange={handleChange}
        suffixIcon={null} // This will remove the calendar icon
      />
    </div>
  );
};

// const ticketsData = rawticketsData.map((ticket) => ({
//   ...ticket,
//   rating: parseFloat(ticket.rating as string),
// }));
const ticketsData: any = [];

export default function Tickets() {
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

  return (
    <Suspense fallback={<div>Loading....</div>}>
      <Layout headerStyle={1} footerStyle={1}>
        <EngineTabs active_border={"1"} />
        <main className="main">
          {/*<SlideBanner1 />*/}
          {/*<Banner />*/}

          <div className="container mt-28">
            <Flights4 />

            <MicroallOffersPage />
          </div>

          <TopCategory2 />
          <section className="section-box box-how-it-work-3 mt-80 background-3">
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
                          {" "}
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
                          {" "}
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
                          {" "}
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
                          {" "}
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

          <br />
          <br />
          <br />
          <br />

          <Section6Home3 />

          <LoveUs />

          <div className="background-body" />
        </main>
      </Layout>
    </Suspense>
  );
}
