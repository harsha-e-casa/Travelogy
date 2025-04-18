'use client'
import React, { useEffect, useState } from 'react'
import ByAirline from '@/components/Filter/ByAirline'
import ByClass from '@/components/Filter/ByClass'
import ByLocation from '@/components/Filter/ByLocation'
import ByPagination from '@/components/Filter/ByPagination'
import ByPrice from '@/components/Filter/ByPrice'
import ByRating from '@/components/Filter/ByRating'
import SearchFilterBottom from '@/components/elements/SearchFilterBottom'
import SortTicketsFilter from '@/components/elements/SortTicketsFilter'
import TicketCard1 from '@/components/elements/ticketcard/TicketCard1'
import Layout from "@/components/layout/Layout"
import SwiperGroupPayment10Slider from '@/components/slider/SwiperGroupPayment10Slider'
import rawticketsData from "@/util/tickets.json"
import useTicketFilter from '@/util/useTicketFilter'
import EngineTabs from "@/components/searchEngine/engineHeader"
import Link from "next/link"
import { postDataTJ } from '../../services/NetworkAdapter'
import { useSearchParams, useRouter } from 'next/navigation'

// Convert ticket ratings from string to number
const ticketsData = rawticketsData.map(ticket => ({
  ...ticket,
  rating: parseFloat(ticket.rating as string)
}))

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
  } = useTicketFilter(ticketsData)

  const [flightData, setFlightData] = useState<any>(null)

  const router = useRouter()
  const searchParams = useSearchParams()

  // Extract query parameters from the URL
  const departureFrom = searchParams.get('departureFrom')
  const arrivalTo = searchParams.get('arrivalTo')
  const adults = searchParams.get('adults')
  const children = searchParams.get('children')
  const cabinType = searchParams.get('cabinType')
  const departDate = searchParams.get('departDate')

  // Not required for API call but kept in state for other uses if needed.
  const [ticketParams, setTicketParams] = useState({ id: null, date: null })

  useEffect(() => {
    // Ensure all required query parameters are available before making the API call.
    if (!departureFrom || !arrivalTo || !cabinType || !departDate) {
      return
    }

    // Parse passenger counts from string to number; use defaults if not provided.
    const numAdults = adults ? parseInt(adults, 10) : 1
    const numChildren = children ? parseInt(children, 10) : 0

    // Determine the cabin class from the cabinType parameter
    let cabintypeF = 'ECONOMY'
    switch (cabinType) {
      case 'a':
        cabintypeF = 'PREMIUM_ECONOMY'
        break
      case 'b':
        cabintypeF = 'ECONOMY'
        break
      case 'c':
        cabintypeF = 'BUSINESS'
        break
      case 'd':
        cabintypeF = 'FIRST'
        break
      default:
        cabintypeF = 'ECONOMY'
    }

    // Build the parameter object without extra curly braces
    const parameter = {
      searchQuery: {
        cabinClass: cabintypeF,
        paxInfo: {
          ADULT: numAdults,
          CHILD: numChildren,
          INFANT: 0
        },
        routeInfos: [
          {
            fromCityOrAirport: {
              code: departureFrom
            },
            toCityOrAirport: {
              code: arrivalTo
            },
            travelDate: departDate,
          }
        ],
        searchModifiers: {}
      }
    }

    // Async function to fetch flight data
    const loadData = async () => {

      try {
		console.log(parameter);
        // Call your API function with the properly constructed parameter
        const result = await postDataTJ(parameter)
        if (result && result.searchResult && result.searchResult.tripInfos) {
          setFlightData(result.searchResult.tripInfos.ONWARD)
        }
      } catch (err) {
        console.error('Error while fetching flight data:', err)
      }
    }

    loadData()

    // Run the effect whenever any dependency changes
  }, [departureFrom, arrivalTo, cabinType, departDate, adults, children])

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          <EngineTabs active_border={'1'} />

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
            <div className="container">
              <div className="box-content-main">
                <div className="content-right">
                  <div className="box-filters mb-25 pb-5 border-bottom border-1">
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
                  </div>
                  <div className="box-grid-tours">
                    <div className="row">
                      <div className="box-list-flights box-list-flights-2">
                        {flightData
                          ? flightData.map((ticket: any) => (
                              <React.Fragment key={ticket.id}>
                                <TicketCard1 ticket={ticket} />
                              </React.Fragment>
                            ))
                          : null}
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
                </div>

                {/* Left Sidebar Filters */}
                <div className="content-left order-lg-first">
                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">Filter Price </h6>
                        <ByPrice filter={filter} handlePriceRangeChange={handlePriceRangeChange} />
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">Airlines</h6>
                        <div className="box-collapse scrollFilter">
                          <ByAirline
                            uniqueAirlines={uniqueAirlines}
                            filter={filter}
                            handleCheckboxChange={handleCheckboxChange}
                          />
                          <div className="box-see-more mt-20 mb-25">
                            <Link className="link-see-more" href="#">
                              See more
                              <svg width={8} height={6} viewBox="0 0 8 6" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.89553 1.02367C7.75114 0.870518 7.50961 0.864815 7.35723 1.00881L3.9998 4.18946L0.642774 1.00883C0.490387 0.86444 0.249236 0.870534 0.104474 1.02369C-0.0402885 1.17645 -0.0338199 1.4176 0.118958 1.56236L3.73809 4.99102C3.81123 5.06036 3.90571 5.0954 3.9998 5.0954C4.0939 5.0954 4.18875 5.06036 4.26191 4.99102L7.88104 1.56236C8.03382 1.41758 8.04029 1.17645 7.89553 1.02367Z" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">Class / Cabin</h6>
                        <ByClass uniqueClasses={uniqueClasses} filter={filter} handleCheckboxChange={handleCheckboxChange} />
                      </div>
                    </div>
                  </div>
                  {/* <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">Review Score </h6>
                        <ByRating uniqueRatings={uniqueRatings} filter={filter} handleCheckboxChange={handleCheckboxChange} />
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">Booking Location</h6>
                        <ByLocation uniqueLocations={uniqueLocations} filter={filter} handleCheckboxChange={handleCheckboxChange} />
                      </div>
                    </div>
                  </div> */}
                  <div className="sidebar-banner">
                    <Link href="#">
                      <img src="/assets/imgs/page/tickets/banner-ads.png" alt="Travalogy" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="section-box box-how-it-work-3 background-body">
            <div className="container">
              <div className="box-how-it-work-inner background-3">
                <h3 className="neutral-1000 wow fadeInUp">How It Work ?</h3>
                <p className="text-xl-medium neutral-500 mb-30 wow fadeInUp">Just 4 easy and quick steps</p>
                <div className="row">
                  <div className="col-lg-10">
                    <ul className="list-steps list-steps-2-col wow fadeInUp">
                      <li>
                        <div className="step-no">
                          <span>1</span>
                        </div>
                        <div className="step-info">
                          <p className="text-xl-bold neutral-1000">Search for Flights</p>
                          <p className="text-sm-medium neutral-500">
                            Begin your journey by entering your departure city, destination, travel dates, and the number of passengers
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="step-no">
                          <span>2</span>
                        </div>
                        <div className="step-info">
                          <p className="text-xl-bold neutral-1000">Select Your Flight</p>
                          <p className="text-sm-medium neutral-500">
                            Review the search results and compare the details of each flight, including departure and arrival times, durations, and prices.
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="step-no">
                          <span>3</span>
                        </div>
                        <div className="step-info">
                          <p className="text-xl-bold neutral-1000">Provide Passenger Information</p>
                          <p className="text-sm-medium neutral-500">
                            Enter the required passenger information for all individuals traveling, including names, contact details, and any special requests
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="step-no">
                          <span>4</span>
                        </div>
                        <div className="step-info">
                          <p className="text-xl-bold neutral-1000">Payment and Confirmation</p>
                          <p className="text-sm-medium neutral-500">
                            Review the booking summary, including the total cost, flight details, and passenger information
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
      </Layout>
    </>
  )
}
