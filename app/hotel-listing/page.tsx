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
import { useNationalities } from "@/util/HotelApi";
type Nationality = {
  countryName: string;
  name: string;
  dialCode: string;
  countryId: string;
  code: string;
  isoCode: string;
};

export default function HotelListing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const { nationalities } = useNationalities() as {
    nationalities: Nationality[];
    loading: boolean;
  };
  const city = searchParams.get("city");
  const currency = searchParams.get("currency");
  const rooms = Number(searchParams.get("rooms"));
  const adults = Number(searchParams.get("adults"));
  const children = Number(searchParams.get("children"));

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
  const [selectFrom, setSelectFrom] = useState<{
    cityName: string;
    countryName: string;
    id?: string;
  } | null>(null);
  const [nationalityId, setNationalityId] = useState<string | null>(
    searchParams.get("nationality") || null
  );
  // useEffect(() => {
  //   if (selectFrom && selectFrom.countryName && nationalities.length > 0) {
  //     const matched = nationalities.find(
  //       (n) =>
  //         n.countryName.toLowerCase() === selectFrom.countryName.toLowerCase()
  //     );
  //     setNationalityId(matched ? matched.countryId : null);
  //   }
  // }, [selectFrom, nationalities]);

  useEffect(() => {
    if (!selectFrom && location && city && nationalities.length > 0) {
      const matchedNationality = nationalities.find((n) =>
        location.toLowerCase().includes(n.countryName.toLowerCase())
      );

      setSelectFrom({
        cityName: location,
        countryName: matchedNationality?.countryName || "India",
        id: city || "699261", // fallback
      });
      setNationalityId(matchedNationality?.countryId || "94");
    }
  }, [location, city, nationalities]);

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

  const {
    filter,
    sortCriteria,
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
            apikey: "412605943ad923-4ae7-49f6-9c8e-8b75be573422",
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
    const safeCityId = selectFrom?.id || city || "699261"; // fallback to default city ID
    const safeCityName = selectFrom?.cityName || location || "Chennai";
    const safeCountry = selectFrom?.countryName || "India";

    const matchedNationality = nationalities.find(
      (n) => n.countryName.toLowerCase() === safeCountry.toLowerCase()
    );

    const nationalityIdToUse =
      matchedNationality?.countryId || nationalityId || "94";

    // fallback selectFrom object if null
    if (!selectFrom) {
      setSelectFrom({
        cityName: safeCityName,
        countryName: safeCountry,
        id: safeCityId,
      });
    }

    const payload = {
      searchQuery: {
        checkinDate: checkinDate,
        checkoutDate: checkoutDate,
        roomInfo: cleanRoomInfo,
        searchCriteria: {
          city: safeCityId,
          nationality: nationalityIdToUse,
          currency: currency || "INR",
        },
        searchPreferences: { fsc: true },
      },
      sync: true,
    };

    const queryParams = new URLSearchParams({
      checkinDate,
      checkoutDate,
      location: safeCityName,
      city: safeCityId,
      nationality: nationalityIdToUse,
      currency: "INR",
      rooms: roomsData.length.toString(),
      adults: totalAdults.toString(),
      children: totalChildren.toString(),
      childAges: JSON.stringify(childAges),
      roomsData: JSON.stringify(roomsData),
    }).toString();

    const data = await apiCall(payload);
    if (data) {
      setApiHotelData(data.searchResult?.his || []);
      router.push(`/hotel-listing?${queryParams}`);
      return;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (dayjs(checkinDate).isAfter(dayjs(checkoutDate))) {
        alert("Check-out date cannot be earlier than check-in date.");
        return;
      }

      setLoading(true);
      const formattedCheckIn = dayjs(checkinDate).format("YYYY-MM-DD");
      const formattedCheckOut = dayjs(checkoutDate).format("YYYY-MM-DD");

      const payload = {
        searchQuery: {
          checkinDate: formattedCheckIn,
          checkoutDate: formattedCheckOut,
          roomInfo: cleanRoomInfo,
          searchCriteria: {
            city,
            nationality: nationalityId,
            currency,
          },
          searchPreferences: { fsc: true },
        },
        sync: true,
      };

      const data = await apiCall(payload);
      setLoading(false);
      if (data) {
        const hotelOnlyResults = data.searchResult?.his || [];
        setApiHotelData(hotelOnlyResults);
      }
    };

    fetchData();
  }, [
    city,
    checkinDate,
    checkoutDate,
    nationalityId,
    currency,
    roomsData,
    location,
  ]);

  const openToDateRange = () => {
    setOpenDateRage((prevState) => !prevState);
    closeallform();
    setOpenDateRage(true);
  };
  const closeallform = () => {
    setOpenDateRage(false);
  };
  const closeAllDropdowns = () => {
    setShowSearchState(false);
    setOpenCheckin(false);
    setOpenCheckout(false);
    setShowTraveller(false);
  };

  const openfrom = () => {
    if (showSearchState) {
      setShowSearchState(false);
    } else {
      closeAllDropdowns();
      setShowSearchState(true);
    }
  };

  const toggleCheckin = () => {
    if (!openCheckin) {
      closeAllDropdowns();
      setOpenCheckin(true);
    } else {
      setOpenCheckin(false);
    }
  };

  const toggleCheckout = () => {
    if (!openCheckout) {
      closeAllDropdowns();
      setOpenCheckout(true);
    } else {
      setOpenCheckout(false);
    }
  };

  const toggleTraveller = () => {
    if (!showTraveller) {
      closeAllDropdowns();
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
                  {selectFrom?.cityName || location}
                </span>

                {showSearchState && (
                  <div
                    className="searchFfromSelect searchFfromSelect_1 appListDropdownCompact"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <CityListSearch
                      operEngLocation={openfrom}
                      setSelectFrom={setSelectFrom}
                      // categoryType={undefined}
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
