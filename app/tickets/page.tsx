'use client'
import React, { useEffect, useState, useContext } from 'react'
import ByAirline from '@/components/Filter/ByAirline'
import ByClass from '@/components/Filter/ByClass'
import ByLocation from '@/components/Filter/ByLocation'
import ByPagination from '@/components/Filter/ByPagination'
import ByPrice from '@/components/Filter/ByPrice'
import ByRating from '@/components/Filter/ByRating'
import SearchFilterBottom from '@/components/elements/SearchFilterBottom'
import SortTicketsFilter from '@/components/elements/SortTicketsFilter'
import TicketCard1 from '@/components/elements/ticketcard/TicketCard1'
import DomesticRoundTripTicketCard from '@/components/elements/ticketcard/DomesticRoundTripTicketCard'
import RoundTripSelectionView from '@/components/elements/ticketcard/RoundTripSelectionView'
import Layout from "@/components/layout/Layout"
import SwiperGroupPayment10Slider from '@/components/slider/SwiperGroupPayment10Slider'
import rawticketsData from "@/util/tickets.json"
import useTicketFilter from '@/util/useTicketFilter'
import EngineTabs from "@/components/searchEngine/engineHeader"
import Link from "next/link"
import { postDataTJ, postData } from '../../services/NetworkAdapter'
import { useSearchParams, useRouter } from 'next/navigation'
import { Skeleton } from 'antd';
import AppListSearch from '@/components/searchEngine/AppListSearch';
import AppDateRage from '@/components/searchEngine/AppDateRage';
import './customeHeader_1.css';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { tree } from 'next/dist/build/templates/app-page'
import { AppContext } from '../../util/AppContext';
import { TravellerForm } from '@/components/searchEngine/TravellerForm'

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



  const { setCookie, getCookie } = useContext(AppContext);
  const [flightData, setFlightData] = useState<any>(null)
  const [activeFlight, setActiveFlight] = useState<any>(true)
  const [loading, setloading] = useState<boolean>(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  // Extract query parameters from the URL
  // const departureFrom   =  searchParams.get('departureFrom')
  // const arrivalTo       =  searchParams.get('arrivalTo')
  // const adults          =  searchParams.get('adults')
  // const children        =  searchParams.get('children')
  // const cabinType       =  searchParams.get('cabinType')
  // const departDate      =  searchParams.get('departDate')

  // const departureFromSr =  searchParams.get('gy_da_str')
  // const arrivalToSr     =  searchParams.get('gy_aa_str');

  const departureFrom = getCookie('gy_da')
  const arrivalTo = getCookie('gy_aa')
  if (getCookie('gy_adult') == undefined || getCookie('gy_adult') == 'Nan') {
    setCookie('gy_adult', 1)
  }
  if (getCookie('gy_child') == undefined || getCookie('gy_child') == 'Nan') {
    setCookie('gy_child', 0)
  }
  const adults = getCookie('gy_adult')
  const children = getCookie('gy_child')
  const cabinType = getCookie('gy_class')
  const departDate = getCookie('gy_trd')
  const returnDate = getCookie('gy_return')

  const departureFromSr = getCookie('gy_da_str')
  const arrivalToSr = getCookie('gy_aa_str');
  const tripType = getCookie('gy_triptype');
  const passengerType = getCookie('gy_passender_type')
  const infant = getCookie('gy_infant')


  const mydata = {
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
    passengerType: passengerType
  };

  if (returnDate != undefined || returnDate != 'Nan') {
    mydata.returnDate = returnDate
  }

  const queryString = new URLSearchParams(mydata).toString(); // produces "id=10&date=1222"

  // hide or not ??
  // router.push(`/tickets?${queryString}`);


  const [true_Tripconst, setTripconst] = useState<boolean>(false)
  const [searchFlight, SetSearchFlight] = useState<boolean>(true)

  const [srx_cabinType, setCabinType] = useState<any>(null)

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
    const numInfant = infant ? parseInt(children, 10) : 0

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

    setCabinType(cabintypeF);

    let tripBasedRouteInfo = []

    // gy_triptype
    if (srx_tripType.toLowerCase() == "one-way") {
      tripBasedRouteInfo = [
        {
          fromCityOrAirport: {
            code: departureFrom
          },
          toCityOrAirport: {
            code: arrivalTo
          },
          travelDate: departDate,
        }
      ];
    }
    if (srx_tripType.toLowerCase() == "round-trip") {
      tripBasedRouteInfo = [
        {
          fromCityOrAirport: {
            code: departureFrom
          },
          toCityOrAirport: {
            code: arrivalTo
          },
          travelDate: departDate,
        },
        {
          fromCityOrAirport: {
            code: arrivalTo
          },
          toCityOrAirport: {
            code: departureFrom
          },
          travelDate: returnDate,
        },
      ];
    }

    // console.log("tripBasedRouteInfo == ",tripBasedRouteInfo);

    // Build the parameter object without extra curly braces
    const parameter = {
      searchQuery: {
        cabinClass: cabintypeF,
        paxInfo: {
          ADULT: adultCount,
          CHILD: countChildren,
          INFANT: countInfant
        },
        routeInfos: tripBasedRouteInfo,
        "searchModifiers": {
          // "pfts": [
          //   passengerType
          // ],
          "isDirectFlight": false,
          "isConnectingFlight": false,
          // "sourceId": 0,
          // "pnrCreditInfo": {
          //   "pnr": ""
          // },
          // "iiss": false
        }
      }
    }

    // Async function to fetch flight data
    const loadData = async () => {

      setFlightData(null);
      setActiveFlight(true);
      setloading(true)

      try {
        // Call your API function with the properly constructed parameter
        // const result = await postDataTJ(parameter)
        let reqData = {
          action: "search",
          requestData: parameter
        }
        const result = await postData('travelogy/one-way/fetch-data', reqData)
        if (result && result.searchResult && result.searchResult.tripInfos) {
          // setFlightData(result.searchResult.tripInfos.ONWARD)
          setFlightData(result.searchResult.tripInfos)
          setActiveFlight(false);
          setloading(false)
        }
        else {
          setloading(false)
          setActiveFlight(false);
        }

      } catch (err) {
        console.error('Error while fetching flight data:', err)
        setloading(false)
        setActiveFlight(false);
      }
    }

    if (searchFlight) {
      loadData()
      SetSearchFlight(false);
    }

    // Run the effect whenever any dependency changes
  }, [departureFrom, arrivalTo, cabinType, departDate, adults, children, searchFlight])
  

  const items: MenuProps['items'] = [
    {
      label: (
        'One-Way'
      ),
      key: 'One-Way',
    },
    {
      label: (
        'Round-Trip'
      ),
      key: 'Round-Trip',
    },
  ];


  // controls visibility
  const [open, setOpen] = useState(false)
  // stores the selected label
  const [srx_tripType, setTripType] = useState(tripType)

  useEffect(() => {
    const t = Cookies.get('gy_triptype') || ''
    setTripType(t)
  }, []);

  const [srx_departureFrom, setdepartureFrom] = useState()
  const [srx_departureCode, setDepartureToCode] = useState()

  useEffect(() => {

    if (!getCookie('gy_da_str')) {
      setCookie('gy_da_str', 'Delhi');
      setCookie('gy_da', 'DEL');
      setdepartureFrom('Delhi');
      setDepartureToCode('DEL');
    }
    if (!getCookie('gy_aa_str')) {
      setCookie('gy_da_str', 'Bengaluru');
      setCookie('gy_da', 'BLR');
      setdepartureFrom('Bengaluru');
      setDepartureToCode('BLR');
    }
    if (!getCookie('gy_triptype')) {
      setCookie('gy_triptype', 'One-Way');
      setTripType('One-Way')
    }
  });

  useEffect(() => {

    if (srx_departureFrom) {
      setCookie('gy_da_str', srx_departureFrom.trim());
    }

  }, [srx_departureFrom]);

  useEffect(() => {
    if (srx_departureCode) {
      setCookie('gy_da', srx_departureCode.trim());
    }
  }, [srx_departureCode]);


  useEffect(() => {
    const df = Cookies.get('gy_da_str') || '';
    setdepartureFrom(df)
  }, [])

  const [srx_arrivalTo, setArrivalTo] = useState();
  const [srx_arrivalCode, setArrivalToCode] = useState();

  // useEffect(() => {
  // 	if (!getCookie('gy_aa_str')) {
  // 		setCookie('gy_da_str', 'Bengaluru');
  // 		setCookie('gy_da', 'BLR');
  // 		setdepartureFrom('Bengaluru');
  // 		setDepartureToCode('BLR');
  // 	}
  // });

  useEffect(() => {
    const dfa = Cookies.get('gy_aa_str') || ''
    setArrivalTo(dfa)
  }, [])

  useEffect(() => {
    if (srx_arrivalCode) {
      setCookie('gy_aa', srx_arrivalCode.trim());
    }
  }, [srx_arrivalCode]);

  useEffect(() => {
    if (srx_arrivalTo) {
      setCookie('gy_aa_str', srx_arrivalTo.trim());
    }
  }, [srx_arrivalTo]);

  const [srx_traveller, setTraveller] = useState(1);
  
  const [adultCount, setAdultCount] = useState(parseInt(mydata.adults));
  const [countChildren, setCountChildren] = useState(parseInt(mydata.children));
  const [countInfant, setcountInfant] = useState(parseInt(mydata.infant));
  const adultChildCount = adultCount+ countChildren;
  const [totalPassenderCount, setTotalPassenderCount] = useState(adultChildCount);

  useEffect(() => {
    const dfadu = parseInt(Cookies.get('gy_adult') || '1', 10);
    const dfchi = parseInt(Cookies.get('gy_child') || '0', 10);
    setTraveller(dfadu + dfchi);
  }, [countChildren, adultCount]);


  const [dd_monthStr, setDd_monthStr] = useState<string | null>(null);
  const [dd_strdate, setDd_strdate] = useState<string | null>(null);
  const [dd_date, setDd_date] = useState<string | null>(null);
  const [dd_year, setDd_year] = useState<string | null>(null);
  const [srx_depart, setDepartDate] = useState<string | null>(null);

  // menu click handler
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    setTripType(key);
    setCookie('gy_triptype', key)
    setOpen(prev => !prev)
  }


  const [showSearchState, setShowSearchState] = useState<boolean>(false);
  const [showTraveller, setShowYTraveller] = useState<boolean>(false);
  const [showSearchStateTo, setShowSearchStateTo] = useState<boolean>(false);
  const [openDateRage, setOpenDateRage] = useState<boolean>(false);
  const [openDateRageR, setOpenDateRageR] = useState(false);


  const [datedep, setDatedep] = useState<Dayjs>(() => {
    const cookieDate = Cookies.get('gy_trd');
    return cookieDate ? dayjs(cookieDate) : dayjs().format('YYYY-MM-DD');
  });

  const [datedepr, setDatedepr] = useState<Dayjs>(() => {
    const cookieDate = Cookies.get('gy_return');
    return cookieDate ? dayjs(cookieDate) : dayjs().format('YYYY-MM-DD');
  });


  const openfrom = () => {
    if (showSearchState) {
      closeAllFields();
    } else {
      closeAllFields();
      setShowSearchState(true);
    }
  };

  const openTo = () => {
    if (showSearchStateTo) {
      closeAllFields()
    } else {
      closeAllFields();
      setShowSearchStateTo(true)
    }
  }

  const openToDateRange = () => {
    if (openDateRage) {
      closeAllFields()
    } else {
      closeAllFields();
      setOpenDateRage(true)
    }
  }

  const openTraveller = () => {
    if (showTraveller) {
      closeAllFields()
    } else {
      closeAllFields()
      setShowYTraveller(true)
    }
  }

  const handleOpen = () => {
    if (open) {
      closeAllFields()
    } else {
      closeAllFields()
      setOpen(true)
    }
  }

  const openToDateRangeR = () => {
    if (openDateRageR) {
      closeAllFields();
    } else {
      closeAllFields();
      setOpenDateRageR(true);
    }
  }

  const closeAllFields = () => {
    setShowSearchState(false);
    setShowSearchStateTo(false);
    setOpenDateRage(false);
    setOpenDateRageR(false);
    setShowYTraveller(false);
    setOpen(false)
  };

  useEffect(() => {
    setTotalPassenderCount(adultCount + countChildren);
  }, [adultCount, countChildren]);

  const clickMinus = () => {
    let adultCnt = adultCount - 1;
    setCookie('gy_adult', adultCnt);
    if (adultCnt < countInfant) {
      clickMinusinfant();
    }
    setAdultCount(adultCnt); // Correct way to toggle the state
  }

  const clickPlus = () => {
    let adultMin = adultCount + 1;
    if (totalPassenderCount < 9) {
      setCookie('gy_adult', adultMin);
      setAdultCount(adultMin); // Correct way to toggle the state
    }
  }

  const clickMinusChildren = () => {
    let childtMin = countChildren - 1;
    setCookie('gy_child', childtMin);
    setCountChildren(childtMin); // Correct way to toggle the state
  }
  
  const clickPlusChildren = () => {
    let childtCnt = countChildren + 1;
    if (totalPassenderCount < 9) {
      setCookie('gy_child', childtCnt);
      setCountChildren(childtCnt); // Correct way to toggle the state
    }
  }

  const clickMinusinfant = () => {
    let infantMin = countInfant - 1;
    setCookie('gy_infant', infantMin);
    setcountInfant(infantMin);
  }
  
  const clickPlusinfant = () => {
    let infantCnt = countInfant + 1;
    // if (adult >= infantCnt) {
    setCookie('gy_infant', infantCnt);
    setcountInfant(infantCnt);
    // }
  }

  const handleChangeClass = (e) => {
    setCookie('gy_class', e.target.value)
    // setCabinType(e.target.value); // Update the selected value in state
  };

  // useEffect(() => {
  // 	setCookie('gy_class', srx_cabinType);
  // }, [srx_cabinType]);

  useEffect(() => {
    if (datedep) {
      const formattedDate = dayjs(datedep);

      setCookie('gy_trd', formattedDate.format('YYYY-MM-DD'));
      setDd_monthStr(formattedDate.format('MMM')); // Format as string
      setDd_strdate(formattedDate.format('dddd')); // Format as string
      setDd_date(formattedDate.format('DD')); // Format as string
      setDd_year(formattedDate.format('YY')); // Format as string
    }
  }, [datedep]);

  const [ddr_monthStr, setDdr_monthStr] = useState(null);
  const [ddr_strdate, setDdr_strdate] = useState(null);
  const [ddr_date, setDdr_date] = useState(null);
  const [ddr_year, setDdr_year] = useState(null);

  useEffect(() => {
    if (datedepr) {
      const formattedDate = dayjs(datedepr);

      setCookie('gy_return', formattedDate.format('YYYY-MM-DD'));
      setDdr_monthStr(formattedDate.format('MMM'));
      setDdr_strdate(formattedDate.format('dddd'));
      setDdr_date(formattedDate.format('DD'));
      setDdr_year(formattedDate.format('YY'));
    }
  }, [datedepr]);

  console.log("vvvvvvvvvvvvvvvvvvvvvv ",flightData);
  console.log("srx_tripType typeof --------------------- ", typeof srx_tripType);
  console.log("srx_tripType---------------------",srx_tripType.trim().toLowerCase());

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">

          {/* <EngineTabs active_border={'1'} /> */}

          <div className='h-20 w-full z-20 sticky top-0 bg_cs_search'>

            {/* Header Section */}
            <div className="hdt_header">
              <div className="hdt_header-item">
                <label>Trip Type</label>
                <Dropdown
                  menu={{ items, onClick: handleMenuClick }}
                  open={open}
                  trigger={[]}            // ← disable all built‑in open/close triggers
                  placement="bottomLeft"  // or wherever you like
                >
                  <div
                    className="hdt_value"
                    // onClick={() => setOpen(prev => !prev)}  // ← your toggle
                    onClick={() => (handleOpen())}
                    style={{ cursor: 'pointer', display: 'inline-block' }}
                  >
                    {srx_tripType}
                  </div>
                </Dropdown>

              </div>
              <div className="hdt_header-item relative">
                <label>From</label>
                <div onClick={openfrom} className="hdt_value">{srx_departureFrom}, India</div>

                {showSearchState ?
                  <div className="searchFfromSelect searchFfromSelect_2">
                    <AppListSearch operEngLocation={openfrom} setSelectFrom={setdepartureFrom} setSelectFromSub={setDepartureToCode} />
                  </div>
                  : null}

              </div>



              <div className="hdt_header-item relative">
                <label>To</label>
                <div onClick={openTo} className="hdt_value">{srx_arrivalTo}, India</div>

                {showSearchStateTo ?
                  <div className="searchFfromSelect searchFfromSelect_2">
                    <AppListSearch operEngLocation={openTo} setSelectFrom={setArrivalTo} setSelectFromSub={setArrivalToCode} />
                  </div>
                  : null}

              </div>
              <div className="hdt_header-item">
                <label>Depart</label>
                <div onClick={openToDateRange} className="hdt_value">{dd_strdate}, {dd_monthStr} {dd_date} {dd_year}</div>



                {openDateRage ? (<AppDateRage
                  openToDateRange={openToDateRange}
                  setDatedep={setDatedep}
                />) : null}


              </div>
              {srx_tripType.toLowerCase() === 'round-trip' ? (
                <>
                  <div className="hdt_header-item">
                    <label>Return</label>
                    <div onClick={openToDateRangeR} className="hdt_value">{ddr_strdate}, {ddr_monthStr} {ddr_date} {ddr_year}</div>
                    {openDateRageR ? (<AppDateRage
                      openToDateRange={openToDateRangeR}
                      setDatedep={setDatedepr}
                    />) : null}
                  </div>
                </>
              ) : null}
              {/* <div className="hdt_header-item">
      <label>Return</label>
      <div className="hdt_value">Select Return</div>
    </div> */}
              <div className="hdt_header-item" onClick={openTraveller}>
                <label>Passengers &amp; Class</label>
                <div className="hdt_value">
                  <span>{srx_traveller} {srx_traveller.length > 0 ? 'travellers' : 'traveller'} | <span className='text-sm'>{srx_cabinType}</span></span>
                </div>
              </div>
              <button onClick={() => SetSearchFlight(prev => !prev)} className="hdt_search-btn">Search</button>
            </div>

            {/* <AppListSearch operEngLocation={openTo} setSelectFrom={setSelectFromTo} setSelectFromSub={setSelectFromSubTo} /> */}
          </div>
          <TravellerForm showTraveller={showTraveller} adult={adultCount}
            opentrvForm={openTraveller} clickMinus={clickMinus} clickPlus={clickPlus}
            clickMinusChildren={clickMinusChildren} clickPlusChildren={clickPlusChildren}
            countchildren={countChildren} countinfant={countInfant} 
            handleChangeClass={handleChangeClass} travellerClass={srx_cabinType} clickMinusinfant={clickMinusinfant} clickPlusinfant={clickPlusinfant}  totalPassenderCount={totalPassenderCount} />

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

                  {loading && <div className="box-list-flights box-list-flights-2">
                    <div>
                      <div />

                      <div className="item-flight background-card border-1 ticket-container relative">
                        <div className="air_detailes"></div>
                        <div className="flight-route flight-route-type-2 city1">
                        </div>

                        <Skeleton active={activeFlight} />
                      </div>

                    </div>

                    <div>
                      <div />

                      <div className="item-flight background-card border-1 ticket-container relative">
                        <div className="air_detailes"></div>
                        <div className="flight-route flight-route-type-2 city1">
                        </div>

                        <Skeleton active={activeFlight} />
                      </div>

                    </div>

                    <div>
                      <div />

                      <div className="item-flight background-card border-1 ticket-container relative">
                        <div className="air_detailes"></div>
                        <div className="flight-route flight-route-type-2 city1">
                        </div>

                        <Skeleton active={activeFlight} />
                      </div>

                    </div>

                    <div>
                      <div />

                      <div className="item-flight background-card border-1 ticket-container relative">
                        <div className="air_detailes"></div>
                        <div className="flight-route flight-route-type-2 city1">
                        </div>

                        <Skeleton active={activeFlight} />
                      </div>

                    </div>
                    <div>
                      <div />

                      <div className="item-flight background-card border-1 ticket-container relative">
                        <div className="air_detailes"></div>
                        <div className="flight-route flight-route-type-2 city1">
                        </div>

                        <Skeleton active={activeFlight} />
                      </div>

                    </div>
                  </div>}

                  {(
                    (srx_tripType?.trim().toLowerCase() === "one-way" && flightData?.ONWARD?.length > 0) ||
                    (srx_tripType?.trim().toLowerCase() === "round-trip" && flightData?.COMBO?.length > 0)
                  ) && (() => {
                    const tripInfo = srx_tripType?.trim().toLowerCase() === "round-trip"
                      ? flightData.COMBO
                      : flightData.ONWARD;

                    return (
                      <>
                        {tripInfo?.length > 0 ? (
                          <>
                            <div className="box-grid-tours">
                              <div className="row">
                                <div className="box-list-flights box-list-flights-2">
                                  {tripInfo.map((ticket: any) => (
                                    <React.Fragment key={ticket.id}>
                                      <TicketCard1 ticket={ticket} />
                                    </React.Fragment>
                                  ))}
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
                          </>
                        ) : (
                          !loading && (
                            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                              <p className="text-xl font-semibold">No result found</p>
                              <p className="text-sm mt-2 text-gray-400">Try adjusting your filters or search criteria.</p>
                            </div>
                          )
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
                  {srx_tripType && srx_tripType.trim().toLowerCase() === "round-trip" ? (
                    <>
                      {flightData && flightData.ONWARD && flightData.ONWARD.length > 0 && flightData.RETURN && flightData.RETURN.length > 0 ? (
                        <RoundTripSelectionView flightData={flightData} departureFrom={departureFrom} arrivalTo={arrivalTo} />
                      ) : (<>
                          {loading === false && <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                            <p className="text-xl font-semibold">No result found</p>
                            <p className="text-sm mt-2 text-gray-400">Try adjusting your filters or search criteria.</p>
                          </div>}
                      </>) }
                    </>
                  ) : null }

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
                                    <DomesticRoundTripTicketCard ticket={ticket} />
                                  </React.Fragment>
                                ))
                                }
                              </div>
                              <p>RETURN</p>
                              <div className="box-list-flights box-list-flights-2">
                                {flightData.RETURN.map((ticket: any) => (
                                  <React.Fragment key={ticket.id}>
                                    <DomesticRoundTripTicketCard ticket={ticket} />
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
