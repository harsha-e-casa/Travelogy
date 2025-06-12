"use client";

import React, { useState, useEffect } from "react";
import ByAmenities from "@/components/Filter/ByAmenities";
import ByHotelType from "@/components/Filter/ByHotelType";
import ByLocation from "@/components/Filter/ByLocation";
import ByPagination from "@/components/Filter/ByPagination";
import ByPrice from "@/components/Filter/ByPrice";
import ByRating from "@/components/Filter/ByRating";
import ByRoom from "@/components/Filter/ByRoom";
import SearchFilterBottom from "@/components/elements/SearchFilterBottom";
import SortHotelsFilter from "@/components/elements/SortHotelsFilter";
import HotelCard1 from "@/components/elements/hotelcard/HotelCard1";
import Layout from "@/components/layout/Layout";
import SwiperGroup8Slider from "@/components/slider/SwiperGroup8Slider";
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
import AppListSearch from "@/components/searchEngine/AppListSearch.jsx";

export default function HotelListing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "Goa"; // or any default

  // const checkinDate = searchParams.get("checkinDate");
  // const checkoutDate = searchParams.get("checkoutDate");

  const city = searchParams.get("city") || "699261"; // Static default city if none
  const nationality = searchParams.get("nationality") || "106"; // Static default nationality
  const currency = searchParams.get("currency") || "INR"; // Static default currency
  const rooms = Number(searchParams.get("rooms")) || 1; // Default to 1 if no rooms in query
  const adults = Number(searchParams.get("adults")) || 1; // Default to 1 if no adults in query
  const children = Number(searchParams.get("children")) || 0; // Default to 0 if no children in query
  const childAges = JSON.parse(searchParams.get("childAges") || "[]"); // Default to empty array if no childAges

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

  const [adult, setAdult] = useState(adults);
  const [countchildren, setCountchildren] = useState(children);
  const [room1, setRoom1] = useState(rooms);
  const [childAgesPerRoom, setChildAgesPerRoom] = useState(childAges);
  const [showTraveller, setShowTraveller] = useState(false);
  const clickRoomAdd = () => setRoom1((prev) => Math.min(prev + 1, 10));
  const clickRoomMinus = () => setRoom1((prev) => Math.max(prev - 1, 1));
  const [selectFrom, setSelectFrom] = useState(location);
  const clickPlus = () => setAdult((prev) => Math.min(prev + 1, 10));
  const clickMinus = () => setAdult((prev) => Math.max(prev - 1, 1));

  const clickPlusChildren = () => {
    if (countchildren < 10) {
      setCountchildren((prev) => prev + 1);
      setChildAgesPerRoom((prev) => [...prev]);
    }
  };
  const opentrvForm = () => {
    setShowTraveller(false);
    // Optional: Trigger search with new data
    handleSearch();
  };

  const clickMinusChildren = () => {
    if (countchildren > 0) {
      setCountchildren((prev) => prev - 1);
      setChildAgesPerRoom((prev) => prev.slice(0, -1));
    }
  };

  useEffect(() => {
    if (!checkinDate) setCheckinDate(dayjs().format("YYYY-MM-DD"));
    if (!checkoutDate)
      setCheckoutDate(dayjs().add(1, "day").format("YYYY-MM-DD"));
  }, []);

  const [datedep, setDatedep] = useState(dayjs());
  const openfrom = () => {
    console.log("Location clicked");
    if (showSearchState) {
      closeAllFields();
    } else {
      closeAllFields();
      setShowSearchState(true);
    }
  };

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
    itemsPerPage,
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

  const handleSearch = async () => {
    if (dayjs(checkinDate).isAfter(dayjs(checkoutDate))) {
      alert("Check-out date cannot be earlier than check-in date.");
      return;
    }

    const formattedCheckIn = dayjs(checkinDate).format("YYYY-MM-DD");
    const formattedCheckOut = dayjs(checkoutDate).format("YYYY-MM-DD");

    const roomInfo = [];
    for (let i = 0; i < rooms; i++) {
      roomInfo.push({
        numberOfAdults: adults,
        numberOfChild: children,
        ...(children > 0 ? { childAge: childAges[i] || [] } : {}),
      });
    }

    const queryParams = new URLSearchParams({
      checkinDate: formattedCheckIn,
      checkoutDate: formattedCheckOut,
      location: location.toString(),
      city,
      nationality,
      currency,
      rooms: rooms.toString(),
      adults: adults.toString(),
      children: children.toString(),
      childAges: JSON.stringify(childAges),
    }).toString();

    try {
      const payload = {
        searchQuery: {
          checkinDate: formattedCheckIn,
          checkoutDate: formattedCheckOut,
          roomInfo,
          searchCriteria: { city, nationality, currency },
          searchPreferences: { fsc: true },
        },
        sync: true,
      };

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

      if (response.ok) {
        router.push(`/hotel-listing?${queryParams}`);
      } else {
        throw new Error("API call failed");
      }
    } catch (error) {
      console.error("Search API error:", error);
      alert("An error occurred while searching for hotels. Please try again.");
    }
  };
  const openToDateRange = () => {
    setOpenDateRage((prevState) => !prevState); // Correct way to toggle the state
    closeallform();
    setOpenDateRage(true);
  };
  const closeallform = () => {
    setOpenDateRage(false);
  };
  const toggleCheckin = () => {
    setOpenCheckin(!openCheckin);
    setOpenCheckout(false); // Close other
  };

  const toggleCheckout = () => {
    setOpenCheckout(!openCheckout);
    setOpenCheckin(false); // Close other
  };

  const [showSearchState, setShowSearchState] = useState(false);
  type AppListSearchProps = {
    operEngLocation: () => void;
    setSelectFrom: (val: string) => void;
    // setSelectFromSub: (val: string) => void;
    categoryType?: string;
  };

  const SafeAppListSearch = AppListSearch as React.FC<AppListSearchProps>;

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          <div className="h-20 w-full z-20 sticky top-0 bg_cs_search">
            {/* Location */}
            <div className="hdt_header">
              <div className="hdt_header-item">
                <label>Location</label>

                <span className="input-field font-bold" onClick={openfrom}>
                  {selectFrom}
                </span>
                {showSearchState && (
                  <div className="searchFfromSelect searchFfromSelect_1 appListDropdownCompact">
                    <AppListSearch
                      operEngLocation={openfrom}
                      setSelectFrom={setSelectFrom}
                      // setSelectFromSub={setSelectFromSub}
                    />
                  </div>
                )}
              </div>
              <div className="hdt_header-item">
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
                  <AppDateRage
                    openToDateRange={() => setOpenCheckin(false)}
                    setDatedep={(date) => setCheckinDate(date)}
                  />
                )}
              </div>
              <div className="hdt_header-item">
                <label>Check-out</label>
                <button
                  onClick={toggleCheckout}
                  className="input-field font-bold"
                >
                  {checkoutDate}
                </button>
                {openCheckout && (
                  <AppDateRage
                    openToDateRange={() => setOpenCheckout(false)}
                    setDatedep={(date) => setCheckoutDate(date)}
                  />
                )}
              </div>
              <div className="hdt_header-item hotel_room">
                <label>Rooms & Guest</label>
                <button onClick={() => setShowTraveller((prev) => !prev)}>
                  <div className="input-field text-base font-bold">
                    {adult} Adult{adult > 1 ? "s" : ""}, {countchildren} Child,
                    {room1} Room{room1 > 1 ? "s" : ""}
                  </div>
                </button>
                <AppTravellerHotel
                  showTraveller={showTraveller}
                  adult={adult}
                  clickMinus={clickMinus}
                  clickPlus={clickPlus}
                  clickMinusChildren={clickMinusChildren}
                  clickPlusChildren={clickPlusChildren}
                  countchildren={countchildren}
                  rooms={rooms}
                  clickRoomAdd={clickRoomAdd}
                  clickRoomMinus={clickRoomMinus}
                  travellerClass={"a"} // Optional class field
                  handleChangeClass={() => {}}
                  opentrvForm={() => setShowTraveller(false)}
                  childAgesPerRoom={childAgesPerRoom}
                  setChildAgesPerRoom={setChildAgesPerRoom}
                />
              </div>
              <button className="hdt_search-btn">Search</button>
            </div>
          </div>

          <section className="box-section block-content-tourlist background-body">
            <div className="container-fluid" style={{width:"93%"}}>
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
                    <div className="row">
                      {paginatedHotels.map((hotel) => (
                        <div
                          className="col-xl-4 col-lg-6 col-md-6"
                          key={hotel.id}
                        >
                          <HotelCard1 hotel={hotel} />
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
