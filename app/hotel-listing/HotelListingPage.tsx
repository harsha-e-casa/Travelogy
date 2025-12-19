"use client";

import React, { useState, useEffect, useMemo, Suspense, useRef } from "react";
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
// import rawHotelsData from "@/util/hotels.json";
import useHotelFilter, { Hotel } from "@/util/useHotelFilter";
import "../tickets/customeHeader_1.css";
import "./HotelListingPage.css";
import { useSearchParams, useRouter } from "next/navigation";
import dayjs from "dayjs";
import Link from "next/link";
import { AppTravellerHotel } from "@/components/searchEngine/TravellerForm";
// const hotelsData = rawHotelsData.map((hotel) => ({
//   ...hotel,
//   rating: parseFloat(hotel.rating as string),
// }));
import AppDateRange from "@/components/searchEngine/AppDateRange";
import CityListSearch from "@/components/searchEngine/CityListSearch";
import { useNationalities } from "@/util/HotelApi";
// import HotelListingSearch from "./searchHeader";
import { postData } from "@/services/NetworkAdapter";
import { checkTokenExpiry } from "@/services/Utils";
import citiesData from "../../util/cities.json";

type CityData = {
  id: number;
  cityName: string;
  countryName: string;
  type: string;
  fullRegionName: string;
};

type Nationality = {
  countryName: string;
  name: string;
  dialCode: string;
  countryId: string;
  code: string;
  isoCode: string;
};
type AppDateRageProps = {
  minDate?: dayjs.Dayjs | null | undefined;
};
export default function HotelListing() {
  const [loading, setLoading] = useState(true); // Loading state to wait for client-side rendering
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State for mobile filter panel
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
  const [openSearchModal, setOpenSearchModal] = useState(false);

  const childAgesRaw = searchParams.get("childAges");

  let parsedChildAges: number[][] = [];
  useEffect(() => {
    const tokenValid = checkTokenExpiry(); // Check if the token is valid

    console.log("tokenValid ==> ", tokenValid);

    if (!tokenValid) {
      console.log("Token is valid.");
      // If token is expired, remove from localStorage and redirect to login
      localStorage.removeItem("authToken");
      router.push("/login"); // Redirect to the login page
    } else {
      // If token is valid, continue loading the page
      setLoading(false);
    }
  }, [router]); // Ensures the effect runs once on mount (after client-side rendering)

  try {
    parsedChildAges = childAgesRaw ? JSON.parse(childAgesRaw) : [];
  } catch (e) {
    console.warn("Invalid childAges in query params", e);
  }

  const minPriceRaw = searchParams.get("minPrice");
  const maxPriceRaw = searchParams.get("maxPrice");
  const initialMinPrice = minPriceRaw ? Number(minPriceRaw) : 0;
  const initialMaxPrice = maxPriceRaw ? Number(maxPriceRaw) : 41087;

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
  const onPickCheckin = (date: any) => {
    const ci = dayjs(date).format("YYYY-MM-DD");
    setCheckinDate(ci);

    // If current checkout is not after new check-in, bump it to +1 day
    if (!checkoutDate || !dayjs(checkoutDate).isAfter(dayjs(ci))) {
      setCheckoutDate(dayjs(ci).add(1, "day").format("YYYY-MM-DD"));
    }
  };
  const [roomsData, setRoomsData] = useState(initialRoomsData);
  const [apiHotelData, setApiHotelData] = useState([]);

  const cleanRoomInfo = useMemo(() => {
    return roomsData.map((room) => {
      const childAgeList = Array.isArray(room.childAges) ? room.childAges : [];
      return {
        numberOfAdults: room.adults,
        numberOfChild: childAgeList.length,
        ...(childAgeList.length > 0 ? { childAge: childAgeList } : {}),
      };
    });
  }, [roomsData]);

  const transformedHotels: Hotel[] = useMemo(() => {
    return apiHotelData.map((hotel: any) => {
      const price = Number(hotel.ops?.[0]?.tp || 0);
      if (price <= 0 || isNaN(price)) {
        console.log("Invalid price for hotel:", hotel.name, price);
      }
      const finalPrice = price <= 0 || isNaN(price) ? 99999 : price;
      const address = hotel.ad?.adr || "";
      const address1 = hotel.ad?.adr2 || "";
      const city = hotel.ad?.city?.name || "";
      const fullAddress = `${address}${address1 ? `, ${address1}` : ""}${city ? `, ${city}` : ""
        }`;
      return {
        id: Number(hotel.uid || 0),
        name: hotel.name || "",
        price: finalPrice,
        hotelType: hotel.pt || "",
        amenities: "", // Default; update if API provides
        rating: Number(hotel.rt || 0),
        roomStyle: hotel.ops?.[0]?.ris?.[0]?.rc || "",
        location: city,
        image: hotel.img?.[0]?.url || "/assets/imgs/hotels/placeholder.jpg",
        fullAddress,
        checkInTime: hotel.checkInTime,
        checkOutTime: hotel.checkOutTime,
        rawData: hotel,
      };
    });
  }, [apiHotelData]);

  // Hotel price filter states (following flights pattern)
  const [priceRange, setPriceRange] = useState([0, 41087]);
  const [minPriceRange, setMinPriceRange] = useState<any>(0);
  const [maxPriceRange, setMaxPriceRange] = useState<any>(41087);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);

  // Calculate price range from hotel data (following flights pattern)
  const getPriceRangeFromData = (data: any[]) => {
    const prices: number[] = [];

    data.forEach((hotel) => {
      const totalPrice = hotel.price * nights; // multiply by nights like flights multiply by passengers
      if (totalPrice > 0 && totalPrice < 99999) { // exclude invalid/placeholder prices
        prices.push(totalPrice);
      }
    });

    if (prices.length === 0) {
      return [0, 99999]; // fallback
    }

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    return [minPrice, maxPrice];
  };

  // Update price range when hotel data changes (following flights pattern)
  useEffect(() => {
    if (transformedHotels.length > 0) {
      const [minPrice, maxPrice] = getPriceRangeFromData(transformedHotels);

      setMinPriceRange(minPrice);
      setMaxPriceRange(maxPrice);

      if (priceRange[0] !== minPrice || priceRange[1] !== maxPrice) {
        setPriceRange([minPrice, maxPrice]);
      }
    }
  }, [transformedHotels]);

  // Apply price filtering (following flights pattern)
  const applyPriceFilter = () => {
    if (transformedHotels.length > 0) {
      const filtered = transformedHotels.filter((hotel) => {
        const totalPrice = hotel.price * nights;
        return totalPrice >= priceRange[0] && totalPrice <= priceRange[1];
      });
      setFilteredHotels(filtered);
    }
  };

  useEffect(() => {
    applyPriceFilter();
  }, [priceRange, transformedHotels]);

  const totalAdults = roomsData.reduce((sum, r) => sum + r.adults, 0);
  const totalChildren = roomsData.reduce((sum, r) => sum + r.children, 0);
  const childAges = roomsData.flatMap((r) => r.childAges);

  const [showTraveller, setShowTraveller] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(true);
  const [showMobilePropertyType, setShowMobilePropertyType] = useState(true);
  const [showMobileStarRating, setShowMobileStarRating] = useState(true);
  const [showMobileLocation, setShowMobileLocation] = useState(true);

  // Toggle filter panel for mobile
  const toggleFilterPanel = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Close filter panel with animation
  const closeFilterPanel = () => {
    // Add closing class to trigger exit animation
    const panel = document.querySelector('.mobile-filter-panel');
    const backdrop = document.querySelector('.filter-backdrop');

    if (panel && backdrop) {
      panel.classList.add('closing');
      backdrop.classList.add('closing');

      // Wait for animation to complete before removing from DOM
      setTimeout(() => {
        setIsFilterOpen(false);
      }, 400); // Match animation duration
    } else {
      setIsFilterOpen(false);
    }
  };

  // Prevent body scroll when filter panel is open
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFilterOpen]);
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
    if (!selectFrom && location && nationalities.length > 0) {
      const matchedCity = (citiesData as CityData[]).find(
        (c: CityData) => c.cityName.toLowerCase() === location.toLowerCase()
      );
      const matchedNationality = nationalities.find((n) =>
        (matchedCity?.countryName || location)
          .toLowerCase()
          .includes(n.countryName.toLowerCase())
      );

      setSelectFrom({
        cityName: location,
        countryName:
          matchedCity?.countryName ||
          matchedNationality?.countryName ||
          "India",
        id: String(matchedCity?.id ?? city ?? 699261),
      });
      setNationalityId(String(matchedNationality?.countryId ?? "94"));
    }
  }, [location, city, nationalities, selectFrom]);

  useEffect(() => {
    if (!checkinDate) setCheckinDate(dayjs().format("YYYY-MM-DD"));
    if (!checkoutDate)
      setCheckoutDate(dayjs().add(1, "day").format("YYYY-MM-DD"));
  }, []);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  const [datedep, setDatedep] = useState(dayjs());

  const closeAllFields = () => {
    setShowSearchState(false);
    setOpenDateRage(false);
  };

  const starRatingParam = searchParams.get("starRating");
  const isTopDestination = starRatingParam === "4,5";

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
    itemsPerPage,
  } = useHotelFilter(
    filteredHotels, // use filtered hotels instead of all hotels
    isTopDestination && location
      ? { ratings: [4, 5], locations: [location] }
      : isTopDestination
        ? { ratings: [4, 5] }
        : undefined
  );

  // Apply star rating filter from query params if present and not top destination
  useEffect(() => {
    if (!isTopDestination && starRatingParam && apiHotelData.length > 0) {
      const starRatings = starRatingParam
        .split(",")
        .map((s) => parseInt(s.trim(), 10));
      if (starRatings.length > 0) {
        // Update filter to include only hotels with rating in starRatings
        handleClearFilters(); // Clear existing filters first
        starRatings.forEach((rating) => {
          if (!filter.ratings.includes(rating)) {
            const fakeEvent = {
              target: { value: rating.toString(), checked: true },
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            handleCheckboxChange(fakeEvent, "ratings");
          }
        });
      }
    }
  }, [
    starRatingParam,
    filter.ratings,
    handleCheckboxChange,
    handleClearFilters,
    apiHotelData.length,
    isTopDestination,
  ]);


  // const [sortCriteria, setSortCriteria] = useState("default");
  // const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSortCriteria(e.target.value);
  // };
  const clearLocalStorageExceptAuthToken = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key !== "authToken") {
        localStorage.removeItem(key); // Remove items except authToken
      }
    });
  };

  // Helper function to extract status code from error
  const extractStatusCode = (e: any): number | undefined => {
    // Check response status first
    if (e?.response?.status && typeof e.response.status === "number") {
      return e.response.status;
    }

    // Check direct status property
    if (typeof e?.status === "number") {
      return e.status;
    }

    // Check error code for timeout
    if (e?.code === "ECONNABORTED" || e?.code === "ETIMEDOUT") {
      return 504;
    }

    // Parse error message for status codes
    if (e?.message) {
      const statusMatch = e.message.match(/status code (\d+)/i);
      if (statusMatch) {
        return parseInt(statusMatch[1], 10);
      }

      // Check for specific error patterns
      if (/504|gateway timeout/i.test(e.message)) {
        return 504;
      }
      if (/503|service unavailable/i.test(e.message)) {
        return 503;
      }
      if (/502|bad gateway/i.test(e.message)) {
        return 502;
      }
      if (/500|internal server/i.test(e.message)) {
        return 500;
      }
    }

    return undefined;
  };

  const apiCall = async (payload: any, signal?: AbortSignal) => {
    try {
      const reqBody = {
        action: "hotelSearchQueryList",
        requestData: payload,
      };

      const response: any = await postData(
        "travelogy/hotel/fetch-data",
        reqBody,
        signal ? { signal } : {}
      );
      console.log("fetch-data ", response);
      clearLocalStorageExceptAuthToken();
      return response;
    } catch (e: any) {
      if (signal?.aborted) {
        console.log("Request aborted");
        return null;
      }

      console.error("API Call Error:", e);

      const err = new Error(e?.message || "Network error") as Error & {
        status?: number;
      };
      err.status = extractStatusCode(e);

      console.error("Extracted status code:", err.status);

      throw err;
    }
  };
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setErrorStatus(null);

    const safeCityId = selectFrom?.id || city || "699261";
    const safeCityName = selectFrom?.cityName || location || "Chennai";
    const safeCountry = selectFrom?.countryName || "India";

    const matchedNationality = nationalities.find(
      (n) => n.countryName.toLowerCase() === safeCountry.toLowerCase()
    );

    const nationalityIdToUse =
      matchedNationality?.countryId || nationalityId || "94";
    setNationalityId(nationalityIdToUse);

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

    // const data = await apiCall(payload);
    // if (data) {
    //   setApiHotelData(data.searchResult?.his || []);
    //   router.push(`/hotel-listing?${queryParams}`);
    //   return;
    // }
    try {
      const data = await apiCall(payload);

      if (!data?.searchResult?.his) {
        const err = new Error(data?.message || "No data received") as Error & {
          status?: number;
        };
        err.status = 200;
        throw err;
      }

      // Update data and URL
      setApiHotelData(data.searchResult?.his || []);
      router.push(`/hotel-listing?${queryParams}`);
      console.log('data1', data);
    } catch (e: any) {
      console.error("Error in handleSearch:", e);

      const statusCode = extractStatusCode(e);
      const errorMessage = e?.message || "Something went wrong. Please try again.";

      console.error("Setting error state - Status:", statusCode, "Message:", errorMessage);

      setError(errorMessage);
      setErrorStatus(statusCode ?? null);
    } finally {
      setLoading(false);
    }
  };
  // Load initial data from URL params on page load only
  useEffect(() => {
    const loadInitialData = async () => {
      // Only fetch if we have URL params and no existing data
      if (apiHotelData.length > 0) return;

      // Check if we have location (from TopHotels) or full search params
      const hasLocation = location || city;
      const hasDateParams = searchParams.get("checkinDate") && searchParams.get("checkoutDate");

      // If no location at all, don't fetch
      if (!hasLocation) return;

      setLoading(true);
      setError(null);
      setErrorStatus(null);

      // Use dates from URL params or default to today and tomorrow
      const checkinDateToUse = searchParams.get("checkinDate") || dayjs().format("YYYY-MM-DD");
      const checkoutDateToUse = searchParams.get("checkoutDate") || dayjs().add(1, "day").format("YYYY-MM-DD");

      // Find city ID from location name if not provided
      let cityIdToUse = selectFrom?.id || city;
      if (!cityIdToUse && location) {
        const matchedCity = (citiesData as CityData[]).find(
          (c: CityData) => c.cityName.toLowerCase() === location.toLowerCase()
        );
        cityIdToUse = String(matchedCity?.id || "699261");
      }

      // Find nationality from location if not provided
      let nationalityIdToUse = nationalityId;
      if (!nationalityIdToUse && location && nationalities.length > 0) {
        const matchedCity = (citiesData as CityData[]).find(
          (c: CityData) => c.cityName.toLowerCase() === location.toLowerCase()
        );
        const matchedNationality = nationalities.find((n) =>
          (matchedCity?.countryName || location)
            .toLowerCase()
            .includes(n.countryName.toLowerCase())
        );
        nationalityIdToUse = String(matchedNationality?.countryId || "94");
      }

      const payload = {
        searchQuery: {
          checkinDate: checkinDateToUse,
          checkoutDate: checkoutDateToUse,
          roomInfo: cleanRoomInfo,
          searchCriteria: {
            city: cityIdToUse,
            nationality: nationalityIdToUse || "94",
            currency: currency || "INR",
          },
          searchPreferences: { fsc: true },
        },
        sync: true,
      };

      try {
        const data = await apiCall(payload);
        if (data?.searchResult?.his) {
          setApiHotelData(data.searchResult.his);
        } else if (data && !data.searchResult?.his) {
          const err = new Error(data?.message || "No hotels found") as Error & {
            status?: number;
          };
          err.status = 200;
          throw err;
        }
        console.log('data2', data);
      } catch (e: any) {
        console.error("Error in loadInitialData:", e);

        const statusCode = extractStatusCode(e);
        const errorMessage = e?.message || "Failed to load hotels. Please try again.";

        console.error("Setting error state - Status:", statusCode, "Message:", errorMessage);

        setError(errorMessage);
        setErrorStatus(statusCode ?? null);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []); // Only run once on mount

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (dayjs(checkinDate).isAfter(dayjs(checkoutDate))) {
  //       alert("Check-out date cannot be earlier than check-in date.");
  //       return;
  //     }

  //     // Skip if already fetched and no key changes (e.g., dates/rooms)
  //     if (
  //       hasFetched.current &&
  //       checkinDate === dayjs().format("YYYY-MM-DD") &&
  //       checkoutDate === dayjs().add(1, "day").format("YYYY-MM-DD") &&
  //       roomsData.length === 1 &&
  //       roomsData[0].adults === 1
  //     ) {
  //       return;
  //     }

  //     const abortController = new AbortController();
  //     const formattedCheckIn = dayjs(checkinDate).format("YYYY-MM-DD");
  //     const formattedCheckOut = dayjs(checkoutDate).format("YYYY-MM-DD");
  //     setLoading(true);
  //     setError(null);
  //     setErrorStatus(null);

  //     const safeCityId = selectFrom?.id || city || "699261";
  //     const safeNationalityId = nationalityId || "94";
  //     const safeCurrency = currency || "INR";

  //     const payload = {
  //       searchQuery: {
  //         checkinDate: formattedCheckIn,
  //         checkoutDate: formattedCheckOut,
  //         roomInfo: cleanRoomInfo,
  //         searchCriteria: {
  //           city: safeCityId,
  //           nationality: safeNationalityId,
  //           currency: safeCurrency,
  //         },
  //         searchPreferences: { fsc: true },
  //       },
  //       sync: true,
  //     };
  //     console.log("hotelisting ", payload);
  //     try {
  //       const data = await apiCall(payload, abortController.signal);

  //       if (abortController.signal.aborted) return;

  //       if (!data?.searchResult?.his) {
  //         throw Object.assign(new Error(data?.message || "No data received"), {
  //           status: 200,
  //         });
  //       }

  //       setApiHotelData(data.searchResult.his || []);
  //       hasFetched.current = true;
  //     } catch (e: any) {
  //       if (abortController.signal.aborted) return;
  //       const s = typeof e?.status === "number" ? e.status : undefined;
  //       setError(e?.message || "Something went wrong.");
  //       setErrorStatus(s);
  //     } finally {
  //       if (!abortController.signal.aborted) {
  //         setLoading(false);
  //       }
  //     }

  //     return () => abortController.abort();
  //   };

  //   if ((selectFrom || city) && nationalities.length > 0) {
  //     // Only fetch if location and nationalities are ready
  //     fetchData();
  //   }
  // }, [
  //   checkinDate,
  //   checkoutDate,
  //   cleanRoomInfo,
  //   selectFrom,
  //   city,
  //   nationalityId,
  //   currency,
  //   location,
  //   nationalities,
  // ]);

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
  const nights = useMemo(() => {
    if (!checkinDate || !checkoutDate) return 0;
    return Math.max(dayjs(checkoutDate).diff(dayjs(checkinDate), "day"), 0);
  }, [checkinDate, checkoutDate]);

  console.log("DEBUG - error:", error)
  console.log("DEBUG - apiHotelData length:", apiHotelData.length)
  console.log("DEBUG - transformedHotels length:", transformedHotels.length)
  console.log("DEBUG - filteredHotels length:", filteredHotels.length)
  console.log("DEBUG - paginatedHotels length:", paginatedHotels.length)
  console.log("DEBUG - priceRange:", priceRange)
  console.log("DEBUG - minPriceRange:", minPriceRange)
  console.log("DEBUG - maxPriceRange:", maxPriceRange)
  console.log("DEBUG - nights:", nights)

  // Debug first few hotels
  if (transformedHotels.length > 0) {
    console.log("DEBUG - First 3 transformed hotels:", transformedHotels.slice(0, 3).map(h => ({
      name: h.name,
      price: h.price,
      totalPrice: h.price * nights,
      rating: h.rating,
      location: h.location
    })))
  }

  // Check for errors FIRST before rendering anything else
  if (error) {
    const isRetryable =
      !errorStatus || [408, 429, 500, 502, 503, 504].includes(errorStatus) ||
      error.includes("Request failed with status code 504");
    return (
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          <div className="flex flex-col items-center justify-center text-red-700 py-10 px-4">
            <h2 className="text-xl font-semibold mb-2">
              Oops! Something went wrong.
            </h2>
            {!isRetryable && <p className="text-sm">{error}</p>}
            {isRetryable && <p className="text-sm">504 - Gateway Timeout</p>}

            <div className="flex justify-center mt-4">
              {isRetryable && (
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition mr-4"
                >
                  Try Again
                </button>
              )}
              <Link href="/hotels" passHref>
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                  Retry Hotel
                </button>
              </Link>
            </div>
          </div>
        </main>
      </Layout>
    );
  }


  return (
    <Suspense
      fallback={
        <Layout headerStyle={1} footerStyle={1}>
          <div className="col-12 d-flex justify-center py-5">
            <div className="loader"></div>
          </div>
        </Layout>
      }
    >
      <Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          <div className="h-24 w-full z-20 sticky top-0 bg_cs_search search_header_list_lg">
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
                    // className="searchFfromSelect searchFfromSelect_1 appListDropdownCompact"
                    className="left-auto searchFfromSelect searchFromSelect"

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
                    <AppDateRange
                      minDate={dayjs() || null}
                      openToDateRange={() => setOpenCheckin(false)}
                      setDatedep={onPickCheckin}
                      valueDate={dayjs(checkinDate)}
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
                    <AppDateRange
                      minDate={
                        checkinDate
                          ? dayjs(checkinDate).add(1, "day")
                          : dayjs().add(1, "day")
                      }
                      openToDateRange={() => setOpenCheckout(false)}
                      setDatedep={(date: any) =>
                        setCheckoutDate(dayjs(date).format("YYYY-MM-DD"))
                      }
                      valueDate={dayjs(checkoutDate)}
                    />
                  </div>
                )}
              </div>
              <div
                className="hdt_header-item"
                onClick={(e) => e.stopPropagation()}
              >
                <label>Total Nights</label>
                <div className="input-field font-bold nights_width">
                  {checkinDate && checkoutDate ? (
                    <>
                      <div className="text-base font-bold text-center">
                        {" "}{nights}
                        {/* {nights} {nights === 1 ? "Night" : "Nights"} */}
                      </div>
                    </>
                  ) : (
                    "--"
                  )}
                </div>
              </div>

              <div
                className="hdt_header-item"
                onClick={(e) => e.stopPropagation()}
              >
                <label className="">Rooms & Guest</label>
                <div className="input-field text-base font-bold mb-5 mt-8">
                  <button onClick={toggleTraveller} style={{

                    background: "none",
                    border: 0,
                    padding: "1px 0px",
                    fontWeight: 700
                  }}>
                    {totalAdults} Adult{totalAdults > 1 ? "s" : ""},
                    {/* {totalChildren} Child{totalChildren > 1 ? "ren" : ""}, */}
                    {totalChildren > 0 && (
                      <>
                        {" "} {totalChildren} Child{totalChildren > 1 ? "ren" : ""},
                      </>
                    )}
                    {" "}
                    {roomsData.length} Room{roomsData.length > 1 ? "s" : ""}
                  </button>
                </div>
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
              {!loading && (
                <button className="hdt_search-btn" onClick={handleSearch}>
                  Search
                </button>
              )}

              {loading && (
                <button
                  className="hdt_search-btn opacity-70 cursor-not-allowed"
                  disabled
                >
                  Searching...
                </button>
              )}
            </div>
          </div>
          <div
            className="sticky top-0 z-20 search_header_list h-16 flex items-center px-4 cursor-pointer"
            onClick={() => setOpenSearchModal(true)}
          >
            <div className="text-sm search_header_list_truncate w-full flex flex-col items-center justify-center text-center">

              {/* Row 1: Location + Date */}
              <div className="font-medium">
                {selectFrom?.cityName} | {checkinDate} – {checkoutDate}
              </div>

              {/* Row 2: Guests + Rooms */}
              <div className="flex items-center gap-1 text-xs mt-1">
                {totalAdults} Adult{totalAdults > 1 ? "s" : ""}
                {totalChildren > 0 && (
                  <> , {totalChildren} Child{totalChildren > 1 ? "ren" : ""}</>
                )}
                , {roomsData.length} Room{roomsData.length > 1 ? "s" : ""}
              </div>

            </div>

          </div>

          <section className="box-section block-content-tourlist background-body min-h-screen">
            <div className="container-fluid" style={{ width: "98%" }}>
              <div className="">
                <div className="box-content-main top-14 left-0 right-0 z-10 bg-white w-[93%] mx-auto flex flex-col lg:flex-row h-[calc(100vh-6rem)]  gap-3">
                  <div className="content-right lg:w-3/4 overflow-y-auto p-3 h-full overflow-hidden">
                    <div className="box-filters mb-25 pb-5 border-bottom border-1">
                      <SortHotelsFilter
                        sortCriteria={sortCriteria}
                        handleSortChange={handleSortChange}
                        itemsPerPage={itemsPerPage}
                        handleItemsPerPageChange={handleItemsPerPageChange}
                        handleClearFilters={handleClearFilters}
                        startItemIndex={startItemIndex}
                        endItemIndex={endItemIndex}
                        totalResults={sortedHotels.length}
                        onFilterClick={toggleFilterPanel}
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
                      <div className="container">
                        {/* {loading ? (
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
                      )} */}
                        <div className="row" style={{ rowGap: '18px' }}>
                          {loading ? (
                            <div className="col-12 d-flex justify-center py-5">
                              <div className="loader"></div>
                            </div>
                          ) : paginatedHotels.length > 0 ? (
                            paginatedHotels.map((hotel: any, index: number) => (
                              <div
                                className="col-xl-4 col-lg-6 col-md-6"
                                key={hotel.id || index}
                              >
                                <HotelCard1 hotel={hotel} nights={nights} />
                              </div>
                            ))
                          ) : (
                            <div className="col-12 text-center py-4 text-neutral-500">
                              No hotels found for your criteria.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <ByPagination
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
                  /> */}
                    <ByPagination
                      handlePreviousPage={handlePreviousPage}
                      totalPages={totalPages}
                      currentPage={currentPage}
                      handleNextPage={handleNextPage}
                      handlePageChange={handlePageChange}
                    />
                  </div>
                  {/* Desktop Filter Sidebar */}
                  <div className="content-left order-lg-first lg:w-1/4 min-w-[250px] overflow-y-auto bg-white p-2 h-full desktop-filters">
                    <div className="sidebar-left border-1 background-body">
                      <div className="box-filters-sidebar">
                        <div className="block-filter border-1">
                          <div
                            className=" cursor-pointer"
                            onClick={() => setShowPriceFilter(!showPriceFilter)}
                          >
                            <h6 className="text-lg-bold item-collapse neutral-1000">
                              Price{" "}
                            </h6>
                          </div>
                          {showPriceFilter && (
                            <ByPrice
                              priceRange={priceRange}
                              setPriceRange={setPriceRange}
                              minPriceRange={minPriceRange}
                              maxPriceRange={maxPriceRange}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="sidebar-left border-1 background-body">
                      <div className="box-filters-sidebar">
                        <div className="block-filter border-1">
                          <h6 className="text-lg-bold item-collapse neutral-1000">
                            Property Type
                          </h6>
                          <ByHotelType
                            uniqueHotelsType={uniqueHotelsType}
                            filter={filter}
                            handleCheckboxChange={handleCheckboxChange}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="sidebar-left border-1 background-body">
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
                  </div> */}
                    {/* <div className="sidebar-left border-1 background-body">
                    <div className="box-filters-sidebar">
                      <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse neutral-1000">
                          Room Style
                        </h6>
                        <ByRoom
                          uniqueRoomStyles={uniqueRoomStyles}
                          filter={pendingFilter}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      </div>
                    </div>
                  </div> */}
                    <div className="sidebar-left border-1 background-body">
                      <div className="box-filters-sidebar">
                        <div className="block-filter border-1">
                          <h6 className="text-lg-bold item-collapse neutral-1000">
                            Star Rating{" "}
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
                            Location
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

                  {/* Mobile Filter Panel - Slides in from bottom-right */}
                  {isFilterOpen && (
                    <>
                      {/* Backdrop Overlay */}
                      <div
                        className="filter-backdrop"
                        onClick={closeFilterPanel}
                      />

                      {/* Filter Panel */}
                      <div className={`mobile-filter-panel ${isFilterOpen ? 'open' : ''}`}>
                        {/* Panel Header */}
                        <div className="filter-panel-header">
                          <h3 className="filter-panel-title">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                              <path d="M3 3h18L14 12v7l-4 2v-9L3 3z" fill="black" />
                            </svg>
                            Filters</h3>
                          <button
                            className="filter-close-btn"
                            onClick={closeFilterPanel}
                            aria-label="Close Filters"
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        </div>

                        {/* Panel Content */}
                        <div className="filter-panel-content">
                          <div className="sidebar-left border-1 background-body">
                            <div className="box-filters-sidebar">
                              <div className="block-filter border-1">
                                {/* <div
                                  className=" cursor-pointer"
                                  onClick={() => setShowPriceFilter(!showPriceFilter)}
                                > */}
                                <h6
                                  className={`text-lg-bold item-collapse neutral-1000 ${showPriceFilter ? "" : "collapsed-item"
                                    }`}
                                  onClick={() => setShowPriceFilter(prev => !prev)}
                                >
                                  {/* <h6 className="text-lg-bold item-collapse neutral-1000"> */}
                                  Price{" "}
                                </h6>
                                {/* </div> */}
                                {showPriceFilter && (
                                  <ByPrice
                                    priceRange={priceRange}
                                    setPriceRange={setPriceRange}
                                    minPriceRange={minPriceRange}
                                    maxPriceRange={maxPriceRange}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="sidebar-left border-1 background-body">
                            <div className="box-filters-sidebar">
                              <div className="block-filter border-1">
                                <h6
                                  className={`text-lg-bold item-collapse neutral-1000 ${showMobilePropertyType ? "" : "collapsed-item"
                                    }`}
                                  onClick={() => setShowMobilePropertyType(prev => !prev)}
                                >
                                  Property Type
                                </h6>

                                {showMobilePropertyType && (
                                  <ByHotelType
                                    uniqueHotelsType={uniqueHotelsType}
                                    filter={filter}
                                    handleCheckboxChange={handleCheckboxChange}
                                  />
                                )}
                              </div>

                            </div>
                          </div>
                          <div className="sidebar-left border-1 background-body">
                            <div className="box-filters-sidebar">
                              <div className="block-filter border-1">
                                <h6
                                  className={`text-lg-bold item-collapse neutral-1000 ${showMobileStarRating ? "" : "collapsed-item"
                                    }`}
                                  onClick={() => setShowMobileStarRating(prev => !prev)}
                                >
                                  Star Rating
                                </h6>


                                {showMobileStarRating && (
                                  <ByRating
                                    uniqueRatings={uniqueRatings}
                                    filter={filter}
                                    handleCheckboxChange={handleCheckboxChange}
                                  />
                                )}

                              </div>
                            </div>
                          </div>
                          <div className="sidebar-left border-1 background-body">
                            <div className="box-filters-sidebar">
                              <div className="block-filter border-1">
                                <h6
                                  className={`text-lg-bold item-collapse neutral-1000 ${showMobileLocation ? "" : "collapsed-item"
                                    }`}
                                  onClick={() => setShowMobileLocation(prev => !prev)}
                                >
                                  Location
                                </h6>


                                {showMobileLocation && (
                                  <ByLocation
                                    uniqueLocations={uniqueLocations}
                                    filter={filter}
                                    handleCheckboxChange={handleCheckboxChange}
                                  />
                                )}

                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Panel Footer with Apply Button */}
                        {/* <div className="filter-panel-footer">
                          <button 
                            className="filter-apply-btn"
                            onClick={closeFilterPanel}
                          >
                            Apply Filters
                          </button>
                        </div> */}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
          {/* <section className="section-box box-install-app-2 background-body mt-[calc(100vh-6rem)]">
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
          </section> */}
          <div className="pb-50 background-body" />
          {openSearchModal && (
            <div className="modal_search fixed top-9 z-50 bg-black/50 flex items-end">
              <div className="bg_white_opacity w-full rounded-t-2xl p-4 max-h-71vh overflow-y-auto">
                <button
                  className="w-full text-right text-white mb-3 font-bold text-xl"
                  onClick={() => setOpenSearchModal(false)}
                >
                  X
                </button>

                <div className=" d-block w-full z-20 sticky top-0 bg_cs_search">
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
                          // className="searchFfromSelect searchFfromSelect_1 appListDropdownCompact"
                          className="left-auto searchFfromSelect searchFromSelect"

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
                          <AppDateRange
                            minDate={dayjs() || null}
                            openToDateRange={() => setOpenCheckin(false)}
                            setDatedep={onPickCheckin}
                            valueDate={dayjs(checkinDate)}
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
                          <AppDateRange
                            minDate={
                              checkinDate
                                ? dayjs(checkinDate).add(1, "day")
                                : dayjs().add(1, "day")
                            }
                            openToDateRange={() => setOpenCheckout(false)}
                            setDatedep={(date: any) =>
                              setCheckoutDate(dayjs(date).format("YYYY-MM-DD"))
                            }
                            valueDate={dayjs(checkoutDate)}
                          />
                        </div>
                      )}
                    </div>
                    <div
                      className="hdt_header-item"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <label>Total Nights</label>
                      <div className="input-field font-bold nights_width">
                        {checkinDate && checkoutDate ? (
                          <>
                            <div className="text-base font-bold ">
                              {" "}{nights}
                              {/* {nights} {nights === 1 ? "Night" : "Nights"} */}
                            </div>
                          </>
                        ) : (
                          "--"
                        )}
                      </div>
                    </div>

                    <div
                      className="hdt_header-item"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <label className="">Rooms & Guest</label>
                      <div className="input-field text-base font-bold mb-5 mt-8">
                        <button onClick={toggleTraveller} style={{

                          background: "none",
                          border: 0,
                          padding: "1px 0px",
                          fontWeight: 700
                        }}>
                          {totalAdults} Adult{totalAdults > 1 ? "s" : ""},
                          {/* {totalChildren} Child{totalChildren > 1 ? "ren" : ""}, */}
                          {totalChildren > 0 && (
                            <>
                              {" "} {totalChildren} Child{totalChildren > 1 ? "ren" : ""},
                            </>
                          )}
                          {" "}
                          {roomsData.length} Room{roomsData.length > 1 ? "s" : ""}
                        </button>
                      </div>
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
                    {!loading && (
                      <button
                        className="hdt_search-btn"
                        onClick={() => {
                          handleSearch();
                          setOpenSearchModal(false);
                        }}
                      >
                        Search
                      </button>
                    )}

                    {loading && (
                      <button
                        className="hdt_search-btn opacity-70 cursor-not-allowed"
                        disabled
                      >
                        Searching...
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </Layout>
    </Suspense>
  );
}
