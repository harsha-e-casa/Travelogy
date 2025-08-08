"use client";

import React, { useState, useEffect } from "react";
import "../tickets/customeHeader_1.css";
import { useSearchParams, useRouter } from "next/navigation";
import dayjs from "dayjs";
import { AppTravellerHotel } from "@/components/searchEngine/TravellerForm";
import AppDateRage from "@/components/searchEngine/AppDateRage";
import CityListSearch from "@/components/searchEngine/CityListSearch.jsx";
import { useNationalities } from "@/util/HotelApi";
import { postData } from "@/services/NetworkAdapter";
type Nationality = {
  countryName: string;
  name: string;
  dialCode: string;
  countryId: string;
  code: string;
  isoCode: string;
};

export default function HotelListingSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const { nationalities } = useNationalities() as {
    nationalities: Nationality[];
    loading: boolean;
  };
  const city = searchParams.get("city");
  const currency = searchParams.get("currency");
  const childAgesRaw = searchParams.get("childAges");
  let parsedChildAges: number[][] = [];
  try {
    parsedChildAges = childAgesRaw ? JSON.parse(childAgesRaw) : [];
  } catch (e) {
    console.warn("Invalid childAges in query params", e);
  }

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

  useEffect(() => {
    if (!selectFrom && location && city && nationalities.length > 0) {
      const matchedNationality = nationalities.find((n) =>
        location.toLowerCase().includes(n.countryName.toLowerCase())
      );

      setSelectFrom({
        cityName: location,
        countryName: matchedNationality?.countryName || "India",
        id: city || "699261",
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

  const apiCall = async (payload: any) => {
    try {
      let reqData = {
        action: "search",
        requestData: payload,
      };
      const response = await postData("travelogy/hotel/fetch-data", reqData);
      console.log("hotel listing response == ", response);
      localStorage.clear();
      return response;
      // const response = await fetch(
      //   "https://apitest.tripjack.com/hms/v1/hotel-searchquery-list",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       apikey: "412605943ad923-4ae7-49f6-9c8e-8b75be573422",
      //     },
      //     body: JSON.stringify(payload),
      //   }
      // );
      // const data = await response.json();
      // localStorage.clear();
      // return data;
    } catch (error) {
      console.error("Search API error:", error);
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
    setLoading(true);
    const safeCityId = selectFrom?.id || city || "699261";
    const safeCityName = selectFrom?.cityName || location || "Chennai";
    const safeCountry = selectFrom?.countryName || "India";

    const matchedNationality = nationalities.find(
      (n) => n.countryName.toLowerCase() === safeCountry.toLowerCase()
    );

    const nationalityIdToUse =
      matchedNationality?.countryId || nationalityId || "94";

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

    try {
      const data = await apiCall(payload);
      if (data) {
        setApiHotelData(data.searchResult?.his || []);
        router.push(`/hotel-listing?${queryParams}`);
      }
    } catch (error) {
      console.error("Search API error:", error);
    } finally {
      setLoading(false);
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
      <div className="h-24 w-full z-20 sticky top-0 bg_cs_search">
        <div className="hdt_header">
          <div className="hdt_header-item" onClick={(e) => e.stopPropagation()}>
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
                />
              </div>
            )}
          </div>
          <div className="hdt_header-item" onClick={(e) => e.stopPropagation()}>
            <label>Check-in</label>
            {checkinDate && (
              <button onClick={toggleCheckin} className="input-field font-bold">
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
          <div className="hdt_header-item" onClick={(e) => e.stopPropagation()}>
            <label>Check-out</label>
            <button onClick={toggleCheckout} className="input-field font-bold">
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
                {totalAdults} Adult{totalAdults > 1 ? "s" : ""},{totalChildren}{" "}
                Child{totalChildren > 1 ? "ren" : ""},{roomsData.length} Room
                {roomsData.length > 1 ? "s" : ""}
              </div>
            </button>
            {showTraveller && (
              <div onClick={(e) => e.stopPropagation()}>
                {" "}
                <AppTravellerHotel
                  roomsData={roomsData}
                  onClose={(updatedRooms) => {
                    setRoomsData(updatedRooms);
                    setShowTraveller(false);
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
    </>
  );
}
