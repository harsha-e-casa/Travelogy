"use client";
import Layout from "@/components/layout/Layout";
import TopCategory2 from "@/components/sections/TopCategory2";
import Flights4 from "@/components/sections/Flights4";
import rawticketsData from "@/util/tickets.json";
import useTicketFilter from "@/util/useTicketFilter";
import EngineTabs from "@/components/searchEngine/engineHeader";
import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import ByActivities from "@/components/Filter/ByActivities";
import ByAttraction from "@/components/Filter/ByAttraction";
import ByDuration from "@/components/Filter/ByDuration";
import ByLanguage from "@/components/Filter/ByLanguage";
import ByPagination from "@/components/Filter/ByPagination";
import ByPrice from "@/components/Filter/ByPrice";
import ByRating from "@/components/Filter/ByRating";
import SearchFilterBottom from "@/components/elements/SearchFilterBottom";
import SortToursFilter from "@/components/elements/SortToursFilter";
import TourCard1 from "@/components/elements/tourcard/TourCard1";
import rawToursData from "@/util/tours.json";
import useTourFilter from "@/util/useTourFilter";
import Link from "next/link";

const AppDateRangeww = () => {
  const handleChange = (dates: any) => {
    if (dates) {
      const startDate = dayjs(dates[0]).format("MMM D YYYY"); // Format start date
      const endDate = dayjs(dates[1]).format("MMM D YYYY"); // Format end date
      console.log(`Start Date: ${startDate}`);
      console.log(`End Date: ${endDate}`);
      //   setDates([startDate, endDate]);
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
      />
    </div>
  );
};

const ticketsData = rawticketsData.map((ticket) => ({
  ...ticket,
  rating: parseFloat(ticket.rating as string),
}));
const toursData = rawToursData.map((tour) => ({
  ...tour,
  duration: parseFloat(tour.duration as string),
  groupSize: parseInt(tour.groupSize as unknown as string),
  rating: parseFloat(tour.rating as string),
}));
export default function Tickets() {
  const {
    filter,
    sortCriteria,
    itemsPerPage,
    currentPage,
    uniqueActivities,
    uniqueLanguages,
    uniqueAttractions,
    uniqueRatings,
    sortedTours,
    totalPages,
    paginatedTours,
    handleCheckboxChange,
    handleSortChange,
    handlePriceRangeChange,
    handleDurationRangeChange,
    handleItemsPerPageChange,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
    handleClearFilters,
    startItemIndex,
    endItemIndex,
  } = useTourFilter(toursData);

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div className="holiday-search-engine">
          <EngineTabs active_border={'2'} />
        </div>
        <main className="main">
          <section className="bg-gray-100 box-section block-content-tourlist">
            <div className="container">
              <div className="box-content-main">
                <div className="content-right">
                  <div className="box-filters mb-25 pb-5 border-bottom border-1">
                    <SortToursFilter
                      sortCriteria={sortCriteria}
                      handleSortChange={handleSortChange}
                      itemsPerPage={itemsPerPage}
                      handleItemsPerPageChange={handleItemsPerPageChange}
                      handleClearFilters={handleClearFilters}
                      startItemIndex={startItemIndex}
                      endItemIndex={endItemIndex}
                      sortedTours={sortedTours}
                    />
                  </div>
                  <div className="box-grid-tours wow fadeIn">
                    <div className="row">
                      {paginatedTours.map((tour) => (
                        <div
                          className="col-xl-4 col-lg-6 col-md-6"
                          key={tour.id}
                        >
                          <TourCard1 tour={tour} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <ByPagination
                    handlePreviousPage={handlePreviousPage}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handleNextPage={handleNextPage}
                    handlePageChange={handlePageChange}
                  />
                </div>
                <div className="content-left order-lg-first">
                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          Filter Price{" "}
                        </h6>
                        <ByPrice
                          filter={filter}
                          handlePriceRangeChange={handlePriceRangeChange}
                        />
                      </div>
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          By Activities
                        </h6>
                        <ByActivities
                          uniqueActivities={uniqueActivities}
                          filter={filter}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      </div>
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          By Attractions
                        </h6>
                        <ByAttraction
                          uniqueAttractions={uniqueAttractions}
                          filter={filter}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      </div>
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          By Durations
                        </h6>
                        <ByDuration
                          filter={filter}
                          handleDurationRangeChange={handleDurationRangeChange}
                        />
                      </div>
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          Review Score{" "}
                        </h6>
                        <ByRating
                          uniqueRatings={uniqueRatings}
                          filter={filter}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      </div>
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          By Language{" "}
                        </h6>
                        <ByLanguage
                          uniqueLanguages={uniqueLanguages}
                          filter={filter}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-left border-1 background-body">
                    <h6 className="text-lg-bold neutral-1000">Popular Tours</h6>
                    <div className="box-popular-posts">
                      <ul>
                        <li>
                          <div className="card-post">
                            <div className="card-image">
                              {" "}
                              <Link href="#">
                                {" "}
                                <img 
                                  src="/assets/imgs/page/tour/post.png"
                                  alt="Travalogy"
                                />
                              </Link>
                            </div>
                            <div className="card-info">
                              {" "}
                              <Link className="text-xs-bold" href="#">
                                Singapore Skylines: Urban Exploration
                              </Link>
                              <span className="price text-sm-bold neutral-1000">
                                $48.25
                              </span>
                              <span className="price-through text-sm-bold neutral-500">
                                $60.75
                              </span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="card-post">
                            <div className="card-image">
                              {" "}
                              <Link href="#">
                                {" "}
                                <img 
                                  src="/assets/imgs/page/tour/post2.png"
                                  alt="Travalogy"
                                />
                              </Link>
                            </div>
                            <div className="card-info">
                              {" "}
                              <Link className="text-xs-bold" href="#">
                                Singapore Skylines: Urban Exploration
                              </Link>
                              <span className="price text-sm-bold neutral-1000">
                                $48.25
                              </span>
                              <span className="price-through text-sm-bold neutral-500">
                                $60.75
                              </span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="card-post">
                            <div className="card-image">
                              {" "}
                              <Link href="#">
                                {" "}
                                <img 
                                  src="/assets/imgs/page/tour/post3.png"
                                  alt="Travalogy"
                                />
                              </Link>
                            </div>
                            <div className="card-info">
                              {" "}
                              <Link className="text-xs-bold" href="#">
                                Singapore Skylines: Urban Exploration
                              </Link>
                              <span className="price text-sm-bold neutral-1000">
                                $48.25
                              </span>
                              <span className="price-through text-sm-bold neutral-500">
                                $60.75
                              </span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="card-post">
                            <div className="card-image">
                              {" "}
                              <Link href="#">
                                {" "}
                                <img 
                                  src="/assets/imgs/page/tour/post4.png"
                                  alt="Travalogy"
                                />
                              </Link>
                            </div>
                            <div className="card-info">
                              {" "}
                              <Link className="text-xs-bold" href="#">
                                Singapore Skylines: Urban Exploration
                              </Link>
                              <span className="price text-sm-bold neutral-1000">
                                $48.25
                              </span>
                              <span className="price-through text-sm-bold neutral-500">
                                $60.75
                              </span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="card-post">
                            <div className="card-image">
                              {" "}
                              <Link href="#">
                                {" "}
                                <img 
                                  src="/assets/imgs/page/tour/post5.png"
                                  alt="Travalogy"
                                />
                              </Link>
                            </div>
                            <div className="card-info">
                              {" "}
                              <Link className="text-xs-bold" href="#">
                                Singapore Skylines: Urban Exploration
                              </Link>
                              <span className="price text-sm-bold neutral-1000">
                                $48.25
                              </span>
                              <span className="price-through text-sm-bold neutral-500">
                                $60.75
                              </span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="box-see-more mt-20 mb-25">
                      {" "}
                      <Link className="link-see-more" href="#">
                        See more
                        <svg
                          width={8}
                          height={6}
                          viewBox="0 0 8 6"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7.89553 1.02367C7.75114 0.870518 7.50961 0.864815 7.35723 1.00881L3.9998 4.18946L0.642774 1.00883C0.490387 0.86444 0.249236 0.870534 0.104474 1.02369C-0.0402885 1.17645 -0.0338199 1.4176 0.118958 1.56236L3.73809 4.99102C3.81123 5.06036 3.90571 5.0954 3.9998 5.0954C4.0939 5.0954 4.18875 5.06036 4.26191 4.99102L7.88104 1.56236C8.03382 1.41758 8.04029 1.17645 7.89553 1.02367Z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}
