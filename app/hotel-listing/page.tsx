"use client";
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
import EngineTabsHotel from "@/components/searchEngine/engineHeaderHotel";
import { useSearchParams, useRouter } from "next/navigation";
import dayjs from "dayjs";
import Link from "next/link";
// import AppTravellerHotel from "@/components/searchEngine/TravellerForm";
const hotelsData = rawHotelsData.map((hotel) => ({
  ...hotel,
  rating: parseFloat(hotel.rating as string),
}));

export default function HotelListing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const checkinDate = searchParams.get("checkinDate");
  const checkoutDate = searchParams.get("checkoutDate");
  const city = searchParams.get("city") || "699261"; // Static default city if none
  const nationality = searchParams.get("nationality") || "106"; // Static default nationality
  const currency = searchParams.get("currency") || "INR"; // Static default currency
  const rooms = Number(searchParams.get("rooms")) || 1; // Default to 1 if no rooms in query
  const adults = Number(searchParams.get("adults")) || 1; // Default to 1 if no adults in query
  const children = Number(searchParams.get("children")) || 0; // Default to 0 if no children in query
  const childAges = JSON.parse(searchParams.get("childAges") || "[]"); // Default to empty array if no childAges

  console.log(
    checkinDate,
    checkoutDate,
    location,
    city,
    nationality,
    currency,
    rooms,
    adults,
    children,
    childAges
  );

  //   const handleSearch = async () => {
  //     const formattedCheckIn = dayjs(datedep).format("YYYY-MM-DD");
  //     const formattedCheckOut = dayjs(datedepr).format("YYYY-MM-DD");

  //     // Generate roomInfo array
  //     const roomInfo = [];

  //     for (let i = 0; i < rooms; i++) {
  //       roomInfo.push({
  //         numberOfAdults: adult,
  //         numberOfChild: countchildren,
  //         ...(countchildren > 0 ? { childAge: childAgesPerRoom[i] || [] } : {}),
  //       });
  //     }

  //     // Construct query parameters
  //     const queryParams = new URLSearchParams({
  //       checkinDate: formattedCheckIn,
  //       checkoutDate: formattedCheckOut,
  //       city: "699261", // Static city ID (can be dynamic if needed)
  //       nationality: "106", // Static nationality (can be dynamic if needed)
  //       currency: "INR", // Static currency (can be dynamic if needed)
  //       rooms: rooms.toString(),
  //       adults: adult.toString(),
  //       children: countchildren.toString(),
  //       childAges: JSON.stringify(childAgesPerRoom), // If you want to pass child ages as a JSON string
  //     }).toString();

  //     try {
  //       // Optionally, make a POST request (payload structure as before)
  //       const payload = {
  //         searchQuery: {
  //           checkinDate: formattedCheckIn,
  //           checkoutDate: formattedCheckOut,
  //           roomInfo,
  //           searchCriteria: {
  //             city: "699261",
  //             nationality: "106",
  //             currency: "INR",
  //           },
  //           searchPreferences: {
  //             fsc: true,
  //           },
  //         },
  //         sync: true,
  //       };

  //       const response = await fetch(
  //         "https://apitest.tripjack.com/hms/v1/hotel-searchquery-list",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             apikey: "412605c3683c38-96bd-45b6-ae06-02e22a8be1b1",
  //           },
  //           body: JSON.stringify(payload),
  //         }
  //       );

  //       const data = await response.json();
  //       console.log("Search result:", data);

  //       // Redirect to HotelListing with query parameters
  //       router.push(`/hotel-listing?${queryParams}`);
  //     } catch (error) {
  //       console.error("Search API error:", error);
  //     }
  //   };
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
    // Validate check-in and check-out dates
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

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          {/* <EngineTabsHotel active_border={'2'} /> */}
          {/* <div className="h-20 w-full z-20 sticky top-0 bg_cs_search"> */}
          {/* Search Engine section */}
          <div className="pt-4 flex items-center justify-center space-x-4">
            {/* Location */}
            <div className="flex items-center space-x-2 hdt_header-item">
              <label>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter Location"
                className="input-field"
              />
            </div>

            {/* Check-in Date */}
            <div className="flex items-center space-x-2 hdt_header-item">
              <label>Check-in</label>
              <input
                type="date"
                value={checkinDate}
                onChange={(e) => setCheckinDate(e.target.value)}
                className="input-field"
              />
            </div>

            {/* Check-out Date */}
            <div className="flex items-center space-x-2 hdt_header-item">
              <label>Check-out</label>
              <input
                type="date"
                value={checkoutDate}
                onChange={(e) => setCheckoutDate(e.target.value)}
                className="input-field"
              />
            </div>

            {/* Rooms */}
            <div className="flex items-center space-x-2 hdt_header-item">
              <label>Rooms</label>
              <input
                type="number"
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                min="1"
                className="input-field"
              />
            </div>

            {/* Adults */}
            <div className="flex items-center space-x-2 hdt_header-item">
              <label>Adults</label>
              <input
                type="number"
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                min="1"
                className="input-field"
              />
            </div>

            {/* Children */}
            <div className="flex items-center space-x-2 hdt_header-item">
              <label>Children</label>
              <input
                type="number"
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                min="0"
                className="input-field"
              />
            </div>
          </div>
          {/* </div> */}

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
