"use client";

import React, { useState, useEffect } from "react";
import ByAmenities from "@/components/Filter/ByAmenities";
import ByHotelType from "@/components/Filter/ByHotelType";
import ByLocation from "@/components/Filter/ByLocation";
import ByPagination from "@/components/Filter/ByPagination";
import ByPrice from "@/components/Filter/ByPrice";
import ByRating from "@/components/Filter/ByRating";
import ByRoom from "@/components/Filter/ByRoom";
import SortHotelsFilter from "@/components/elements/SortHotelsFilter";
import HotelCard1 from "@/components/elements/hotelcard/HotelCard1";
import Layout from "@/components/layout/Layout";
import rawHotelsData from "@/util/hotels.json";
import useHotelFilter from "@/util/useHotelFilter";
import "../tickets/customeHeader_1.css";
import { useSearchParams, useRouter } from "next/navigation";
import dayjs from "dayjs";
import Link from "next/link";
import { AppTravellerHotel } from "@/components/searchEngine/TravellerForm";
const hotelsData = rawHotelsData.map((hotel) => ({
  ...hotel,
  rating: parseFloat(hotel.rating as string),
}));
import AppDateRage from "@/components/searchEngine/AppDateRage";
import CityListSearch from "@/components/searchEngine/CityListSearch.jsx";

export default function HotelListing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "Goa"; // or any default

  // const checkinDate = searchParams.get("checkinDate");
  // const checkoutDate = searchParams.get("checkoutDate");

  const city = searchParams.get("city") || "699261"; // Static default city if none
  const nationality = searchParams.get("nationality") || "106"; // Static default nationality
  const currency = searchParams.get("currency") || "INR"; // Static default currency
  const rooms = Number(searchParams.get("rooms")) || 1;
  const adults = Number(searchParams.get("adults")) || 1;
  const children = Number(searchParams.get("children")) || 0;
  const childAgesRaw = searchParams.get("childAges");

  let parsedChildAges: number[][] = [];

  try {
    parsedChildAges = childAgesRaw ? JSON.parse(childAgesRaw) : [];
  } catch (e) {
    console.warn("Invalid childAges in query params", e);
  }

  const [openDateRage, setOpenDateRage] = useState(false);
  const [openCheckin, setOpenCheckin] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [checkinDate, setCheckinDate] = useState<string>(
    searchParams.get("checkinDate") || dayjs().format("YYYY-MM-DD")
  );
  const [checkoutDate, setCheckoutDate] = useState<string>(
    searchParams.get("checkoutDate") ||
      dayjs().add(1, "day").format("YYYY-MM-DD")
  );
  const rawRoomsData = searchParams.get("roomsData");
  let initialRoomsData = [{ adults: 1, children: 0, childAges: [] }];
  try {
    initialRoomsData = rawRoomsData
      ? JSON.parse(rawRoomsData)
      : initialRoomsData;
  } catch (e) {
    console.warn("Invalid roomsData JSON", e);
  }
  const [roomsData, setRoomsData] = useState(initialRoomsData);
  const [apiHotelData, setApiHotelData] = useState([]);
  const [apiCurrentPage, setApiCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const apiTotalPages = Math.ceil(apiHotelData.length / itemsPerPage);
  const paginatedApiHotels = apiHotelData.slice(
    (apiCurrentPage - 1) * itemsPerPage,
    apiCurrentPage * itemsPerPage
  );
  const handleApiPageChange = (pageNumber: any) => {
    setApiCurrentPage(pageNumber);
  };

  const handleApiPreviousPage = () => {
    if (apiCurrentPage > 1) {
      setApiCurrentPage(apiCurrentPage - 1);
    }
  };

  const handleApiNextPage = () => {
    if (apiCurrentPage < apiTotalPages) {
      setApiCurrentPage(apiCurrentPage + 1);
    }
  };

  const totalAdults = roomsData.reduce((sum, r) => sum + r.adults, 0);
  const totalChildren = roomsData.reduce((sum, r) => sum + r.children, 0);
  const childAges = roomsData.flatMap((r) => r.childAges);

  const [showTraveller, setShowTraveller] = useState(false);
  const [selectFrom, setSelectFrom] = useState(location);

  useEffect(() => {
    if (!checkinDate) setCheckinDate(dayjs().format("YYYY-MM-DD"));
    if (!checkoutDate)
      setCheckoutDate(dayjs().add(1, "day").format("YYYY-MM-DD"));
  }, []);
  const [loading, setLoading] = useState(false);

  const [datedep, setDatedep] = useState(dayjs());

  const closeAllFields = () => {
    setShowSearchState(false);
    setOpenDateRage(false);
  };
  // console.log(
  //   checkinDate,
  //   checkoutDate,
  //   location,
  //   city,
  //   nationality,
  //   currency,
  //   rooms,
  //   adults,
  //   children,
  //   childAges
  // );

  const {
    filter,
    sortCriteria,
    // itemsPerPage,
    currentPage,
    uniqueRoomStyles,
    uniqueAmenities,
    uniqueLocations,
    uniqueRatings,
    uniqueHotelsType,
    sortedHotels,
    totalPages,
    paginatedHotels,
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
  } = useHotelFilter(hotelsData);
  const apiCall = async (payload: any) => {
    try {
      const response = await fetch(
        "https://apitest.tripjack.com/hms/v1/hotel-searchquery-list",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: "412605c3683c38-96bd-45b6-ae06-02e22a8be1b1",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log("Search result:", data);
      return data;
    } catch (error) {
      console.error("Search API error:", error);
      // alert("An error occurred while searching for hotels. Please try again.");
      return null;
    }
  };
  const cleanRoomInfo = roomsData.map((room) => {
    const childAgeList = Array.isArray(room.childAges) ? room.childAges : [];
    return {
      numberOfAdults: room.adults,
      numberOfChild: childAgeList.length,
      ...(childAgeList.length > 0 ? { childAge: childAgeList } : {}),
    };
  });
  const handleSearch = async () => {
    if (dayjs(checkinDate).isAfter(dayjs(checkoutDate))) {
      alert("Check-out date cannot be earlier than check-in date.");
      return;
    }
    setLoading(true);
    const formattedCheckIn = dayjs(checkinDate).format("YYYY-MM-DD");
    const formattedCheckOut = dayjs(checkoutDate).format("YYYY-MM-DD");

    const roomInfo = roomsData.map((room) => ({
      numberOfAdults: room.adults,
      numberOfChild: room.children,
      ...(room.children > 0 ? { childAge: room.childAges } : {}),
    }));

    const queryParams = new URLSearchParams({
      checkinDate: formattedCheckIn,
      checkoutDate: formattedCheckOut,
      location: selectFrom,
      city: "699261",
      nationality: "106",
      currency: "INR",
      rooms: roomsData.length.toString(),
      adults: totalAdults.toString(),
      children: totalChildren.toString(),
      childAges: JSON.stringify(childAges),
      roomsData: JSON.stringify(roomsData),
    }).toString();

    const payload = {
      searchQuery: {
        checkinDate: formattedCheckIn,
        checkoutDate: formattedCheckOut,
        roomInfo: cleanRoomInfo,
        searchCriteria: { city, nationality, currency },
        searchPreferences: { fsc: true },
      },
      sync: true,
    };

    const data = await apiCall(payload);
    setLoading(false);
    if (data) {
      console.log("Search result in handleSearch:", data);
      router.push(`/hotel-listing?${queryParams}`);
    }
  };

  useEffect(() => {
    if (dayjs(checkinDate).isAfter(dayjs(checkoutDate))) {
      alert("Check-out date cannot be earlier than check-in date.");
      return;
    }
    setLoading(true);

    const formattedCheckIn = dayjs(checkinDate).format("YYYY-MM-DD");
    const formattedCheckOut = dayjs(checkoutDate).format("YYYY-MM-DD");

    const roomInfo = roomsData.map((room) => ({
      numberOfAdults: room.adults,
      numberOfChild: room.children,
      ...(room.children > 0 ? { childAge: room.childAges } : {}),
    }));

    const fetchData = async () => {
      const payload = {
        searchQuery: {
          checkinDate: formattedCheckIn,
          checkoutDate: formattedCheckOut,
          roomInfo: cleanRoomInfo,
          searchCriteria: { city, nationality, currency },
          searchPreferences: { fsc: true },
        },
        sync: true,
      };

      const data = await apiCall(payload);
      setLoading(false);
      if (data) {
        console.log("Search result in handleSearch:", data);
        setApiHotelData(data.searchResult?.his || []);

        // console.log("HotelCard1 data", data.searchResult.his);
      }
    };
    fetchData();
  }, []);

  const openToDateRange = () => {
    setOpenDateRage((prevState) => !prevState); // Correct way to toggle the state
    closeallform();
    setOpenDateRage(true);
  };
  const closeallform = () => {
    setOpenDateRage(false);
  };
  const closeAllDropdowns = () => {
    setShowSearchState(false); // Location
    setOpenCheckin(false); // Check-in calendar
    setOpenCheckout(false); // Check-out calendar
    setShowTraveller(false); // Rooms & Guest
  };

  const openfrom = () => {
    if (showSearchState) {
      setShowSearchState(false);
    } else {
      closeAllDropdowns(); // CLOSE others before opening
      setShowSearchState(true);
    }
  };

  const toggleCheckin = () => {
    if (!openCheckin) {
      closeAllDropdowns(); // CLOSE others before opening
      setOpenCheckin(true);
    } else {
      setOpenCheckin(false);
    }
  };

  const toggleCheckout = () => {
    if (!openCheckout) {
      closeAllDropdowns(); // CLOSE others before opening
      setOpenCheckout(true);
    } else {
      setOpenCheckout(false);
    }
  };

  const toggleTraveller = () => {
    if (!showTraveller) {
      closeAllDropdowns(); // CLOSE others before opening
      setShowTraveller(true);
    } else {
      setShowTraveller(false);
    }
  };

  const [showSearchState, setShowSearchState] = useState(false);
  type AppListSearchProps = {
    operEngLocation: () => void;
    setSelectFrom: (val: string) => void;
    // setSelectFromSub: (val: string) => void;
    categoryType?: string;
  };

  const SafeAppListSearch = CityListSearch as React.FC<AppListSearchProps>;

  useEffect(() => {
    const handleClickOutside = () => {
      setShowSearchState(false);
      setOpenCheckin(false);
      setOpenCheckout(false);
      setShowTraveller(false);
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          <div className="h-24 w-full z-20 sticky top-0 bg_cs_search">
            {/* Location */}
            <div className="hdt_header">
              <div
                className="hdt_header-item"
                onClick={(e) => e.stopPropagation()}
              >
                <label>Location</label>

                <span className="input-field font-bold" onClick={openfrom}>
                  {selectFrom}
                </span>
                {showSearchState && (
                  <div
                    className="searchFfromSelect searchFfromSelect_1 appListDropdownCompact"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <CityListSearch
                      operEngLocation={openfrom}
                      setSelectFrom={setSelectFrom}
                      categoryType={undefined}
                      // setSelectFromSub={setSelectFromSub}
                    />
                  </div>
                )}
              </div>
              <div
                className="hdt_header-item"
                onClick={(e) => e.stopPropagation()}
              >
                <label>Check-in</label>
                {checkinDate && (
                  <button
                    onClick={toggleCheckin}
                    className="input-field font-bold"
                  >
                    {checkinDate}
                  </button>
                )}

                {openCheckin && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <AppDateRage
                      openToDateRange={() => setOpenCheckin(false)}
                      setDatedep={(date: any) => setCheckinDate(date)}
                    />
                  </div>
                )}
              </div>
              <div
                className="hdt_header-item"
                onClick={(e) => e.stopPropagation()}
              >
                <label>Check-out</label>
                <button
                  onClick={toggleCheckout}
                  className="input-field font-bold"
                >
                  {checkoutDate}
                </button>
                {openCheckout && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <AppDateRage
                      openToDateRange={() => setOpenCheckout(false)}
                      setDatedep={(date: any) => setCheckoutDate(date)}
                    />
                  </div>
                )}
              </div>

              <div
                className="hdt_header-item hotel_room"
                onClick={(e) => e.stopPropagation()}
              >
                <label>Rooms & Guest</label>
                <button onClick={toggleTraveller}>
                  <div className="input-field text-base font-bold">
                    {totalAdults} Adult{totalAdults > 1 ? "s" : ""},
                    {totalChildren} Child{totalChildren > 1 ? "ren" : ""},
                    {roomsData.length} Room{roomsData.length > 1 ? "s" : ""}
                  </div>
                </button>
                {showTraveller && (
                  <div onClick={(e) => e.stopPropagation()}>
                    {" "}
                    <AppTravellerHotel
                      roomsData={roomsData}
                      onClose={(updatedRooms) => {
                        setRoomsData(updatedRooms);
                        setShowTraveller(false); // Close the form
                      }}
                    />
                  </div>
                )}
              </div>
              <button className="hdt_search-btn" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>

          <section className="box-section block-content-tourlist background-body">
            <div className="container-fluid" style={{ width: "93%" }}>
              <div className="box-content-main">
                <div className="content-right">
                  <div className="box-filters mb-25 pb-5 border-bottom border-1">
                    <SortHotelsFilter
                      sortCriteria={sortCriteria}
                      handleSortChange={handleSortChange}
                      itemsPerPage={itemsPerPage}
                      handleItemsPerPageChange={handleItemsPerPageChange}
                      handleClearFilters={handleClearFilters}
                      startItemIndex={startItemIndex}
                      endItemIndex={endItemIndex}
                      sortedHotels={sortedHotels}
                    />
                  </div>
                  <div className="box-grid-tours wow fadeIn">
                    {/* <div className="row">
                      {paginatedHotels.map((hotel) => (
                        <div
                          className="col-xl-4 col-lg-6 col-md-6"
                          key={hotel.id}
                        >
                          <HotelCard1 hotel={hotel} />
                        </div>
                      ))}
                    </div> */}
                    <div className="row">
                      {loading ? (
                        <div className="col-12 d-flex justify-center py-5">
                          <div className="loader"></div>
                        </div>
                      ) : (
                        (apiHotelData.length > 0
                          ? paginatedApiHotels
                          : paginatedHotels
                        ).map((hotel) => (
                          <div
                            className="col-xl-4 col-lg-6 col-md-6"
                            key={hotel.id}
                          >
                            <HotelCard1 hotel={hotel} />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <ByPagination
                    handlePreviousPage={
                      apiHotelData.length > 0
                        ? handleApiPreviousPage
                        : handlePreviousPage
                    }
                    totalPages={
                      apiHotelData.length > 0 ? apiTotalPages : totalPages
                    }
                    currentPage={
                      apiHotelData.length > 0 ? apiCurrentPage : currentPage
                    }
                    handleNextPage={
                      apiHotelData.length > 0
                        ? handleApiNextPage
                        : handleNextPage
                    }
                    handlePageChange={
                      apiHotelData.length > 0
                        ? handleApiPageChange
                        : handlePageChange
                    }
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
                    </div>
                  </div>
                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          Hotel Type
                        </h6>
                        <ByHotelType
                          uniqueHotelsType={uniqueHotelsType}
                          filter={filter}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          Amenities
                        </h6>
                        <ByAmenities
                          uniqueAmenities={uniqueAmenities}
                          filter={filter}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          Room Style
                        </h6>
                        <ByRoom
                          uniqueRoomStyles={uniqueRoomStyles}
                          filter={filter}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
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
                    </div>
                  </div>
                  <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          Booking Location
                        </h6>
                        <ByLocation
                          uniqueLocations={uniqueLocations}
                          filter={filter}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="section-box box-install-app-2 background-body">
            <div className="container">
              <div className="block-install-app background-6">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="box-item-download wow fadeInUp">
                      {" "}
                      <span className="btn btn-brand-secondary">
                        Install APP Get discount code
                      </span>
                      <h5 className="mt-15 mb-30">
                        Up to 55% Discount
                        <br className="d-none d-lg-block" />
                        and lots of special gifts
                      </h5>
                      <div className="box-button-download">
                        {" "}
                        <Link href="#">
                          <img
                            src="/assets/imgs/page/homepage6/googleplay.png"
                            alt="Travalogy"
                          />
                        </Link>
                        <Link href="#">
                          <img
                            src="/assets/imgs/page/homepage6/appstore.png"
                            alt="Travalogy"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <img
                      className="wow fadeInUp"
                      src="/assets/imgs/page/homepage6/img-download-app.png"
                      alt="Travalogy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="pb-90 background-body" />
        </main>
      </Layout>
    </>
  );
}
