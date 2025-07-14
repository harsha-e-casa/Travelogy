"use client";

import React, { useState, useEffect, useRef } from "react";
import SearchEngHeader from "./SearchEngHeader";
import CityListSearch from "./CityListSearch";
import AppDateRage from "./AppDateRage";
import { TripPlansHotel } from "./TripPlans";
import dayjs from "dayjs";
import Link from "next/link";
import { AppTravellerHotel } from "./TravellerForm";
import { useRouter } from "next/navigation";
import { useNationalities } from "../../util/HotelApi";

const EngineHeaderHotel = ({ active_border }) => {
  const [showSearchState, setShowSearchState] = useState(false); // Consistent naming
  const [showSearchStateTo, setShowSearchStateTo] = useState(false); // Consistent naming
  const [selectFrom, setSelectFrom] = useState(null);
  // const [selectFromSub, setSelectFromSub] = useState(
  //   "Indira Gandhi International Airp"
  // ); // Consistent naming
  const [nationalityId, setNationalityId] = useState(null); // fallback to India

  const { nationalities } = useNationalities();

  const router = useRouter();
  const [openDateRage, setOpenDateRage] = useState(false);
  const [openDateRageR, setOpenDateRageR] = useState(false);
  const [showTraveller, setShowYTraveller] = useState(false);
  const [datedep, setDatedep] = useState(dayjs());
  const [datedepr, setDatedepr] = useState(dayjs().add(2, "day"));
  const dateRangeRef = useRef(null); // Ref for date range container

  const [dd_monthStr, setDd_monthStr] = useState(null);

  const [dd_strdate, setDd_strdate] = useState(null);
  const [dd_date, setDd_date] = useState(null);
  const [dd_year, setDd_year] = useState(null);

  const [ddr_strdate, setDdr_strdate] = useState(null);
  const [ddr_monthStr, setDdr_monthStr] = useState(null);

  const [ddr_date, setDdr_date] = useState(null);
  const [ddr_year, setDdr_year] = useState(null);

  const [rooms, setRooms] = useState(1);
  const [adult, setAdult] = useState(1);
  const [countchildren, setcountChildren] = useState(0);
  // State to store the selected value
  const [childAgesPerRoom, setChildAgesPerRoom] = useState([]);

  const [travellerClass, setTravellerClass] = useState("a"); // Default value is 'a'

  useEffect(() => {
    if (selectFrom && nationalities.length > 0) {
      const matched = nationalities.find(
        (n) =>
          n.countryName.toLowerCase() === selectFrom.countryName.toLowerCase()
      );
      if (matched) {
        console.log("Matched Nationality:", matched);

        setNationalityId(matched.countryId);
      } else {
        alert("Nationality could not be determined from selected city.");
      }
    }
  }, [selectFrom, nationalities]);

  const classLabels = {
    a: "Economy/Premium Economy",
    b: "Premium Economy",
    c: "Business",
    d: "First Class",
  };

  // Handler to capture the selected radio button value
  const handleChangeClass = (e) => {
    setTravellerClass(e.target.value); // Update the selected value in state
  };

  const [selectedPlan, setSelectedPlan] = useState("round-trip");
  const [roomsData, setRoomsData] = useState([
    { adults: 1, children: 0, childAges: [] },
  ]);

  const clickMinus = () => {
    setAdult(adult - 1); // Correct way to toggle the state
  };
  const clickPlus = () => {
    setAdult(adult + 1); // Correct way to toggle the state
  };
  const clickMinusChildren = () => {
    setcountChildren(countchildren - 1); // Correct way to toggle the state
  };
  const clickPlusChildren = () => {
    setcountChildren(countchildren + 1); // Correct way to toggle the state
  };

  const clickRoomAdd = () => {
    setRooms(rooms + 1); // Correct way to toggle the state
  };
  const clickRoomMinus = () => {
    setRooms(rooms - 1); // Correct way to toggle the state
  };

  const openTraveller = () => {
    setShowYTraveller((prevState) => !prevState); // Correct way to toggle the state
  };
  const openfrom = () => {
    if (showSearchState) {
      closeAllFields();
    } else {
      closeAllFields();
      setShowSearchState(true);
    }
  };
  const closeAllFields = () => {
    setShowSearchState(false);
    setShowSearchStateTo(false);
    setOpenDateRage(false);
    setOpenDateRageR(false);
    setShowYTraveller(false);
  };
  useEffect(() => {
    if (datedep) {
      const formattedDate = dayjs(datedep);
      setDd_strdate(formattedDate.format("dddd")); // Format as string
      setDd_monthStr(formattedDate.format("MMM")); // Format as string
      setDd_date(formattedDate.format("DD")); // Format as string
      setDd_year(formattedDate.format("YYYY")); // Format as string
    }
  }, [datedep]);

  useEffect(() => {
    if (datedepr && selectedPlan === "round-trip") {
      const formattedDateR = dayjs(datedepr);
      setDdr_strdate(formattedDateR.format("dddd")); // Format as string
      setDdr_monthStr(formattedDateR.format("MMM")); // Format as string
      setDdr_date(formattedDateR.format("DD")); // Format as string
      setDdr_year(formattedDateR.format("YYYY")); // Format as string
    }
  }, [datedepr, selectedPlan]);

  const openToDateRange = () => {
    setOpenDateRage((prevState) => !prevState); // Correct way to toggle the state
    closeallform();
    setOpenDateRage(true);
  };
  const openToDateRangeR = () => {
    setOpenDateRageR((prevState) => !prevState); // Correct way to toggle the state
    closeallform();
    setOpenDateRageR(true);
  };
  const closeallform = () => {
    setOpenDateRage(false);
    setOpenDateRageR(false);
    setShowYTraveller(false);
    setShowSearchState(false);
    setShowSearchStateTo(false);
  };
  useEffect(() => {
    const handleclick = () => {
      closeallform();
    };
    window.addEventListener("click", handleclick);
    return () => {
      window.removeEventListener("click", handleclick);
    };
  }, []);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSearch = () => {
    if (!selectFrom) {
      setErrorMessage("Please select a city before proceeding.");
      return;
    }

    setErrorMessage(null);
    const matchedNationality = nationalities.find(
      (n) =>
        selectFrom &&
        n.countryName.toLowerCase() === selectFrom.countryName.toLowerCase()
    );

    if (!matchedNationality) {
      alert("Could not determine nationality for selected city.");
      return;
    }

    const nationalityIdToUse = matchedNationality.countryId;
    console.log("nationalityId", nationalityId, nationalityIdToUse);

    const totalAdults = roomsData.reduce((sum, room) => sum + room.adults, 0);
    const totalChildren = roomsData.reduce(
      (sum, room) => sum + room.children,
      0
    );
    const childAges = roomsData.flatMap((room) => room.childAges || []);

    const formattedCheckIn = dayjs(datedep).format("YYYY-MM-DD");
    const formattedCheckOut = dayjs(datedepr).format("YYYY-MM-DD");

    const queryParams = new URLSearchParams({
      checkinDate: formattedCheckIn,
      checkoutDate: formattedCheckOut,
      location: selectFrom?.cityName || "",
      city: selectFrom?.id?.toString() || "",

      // location: selectFrom,
      // city: "699261",
      nationality: nationalityIdToUse,

      currency: "INR",
      rooms: roomsData.length.toString(),
      adults: totalAdults.toString(),
      children: totalChildren.toString(),
      childAges: JSON.stringify(childAges),
      roomsData: JSON.stringify(roomsData),
    }).toString();

    router.push(`/hotel-listing?${queryParams}`);
  };

  return (
    <section className="section_main_book_dash_01 relative_MainBanner">
      <div
        className="grid_main_section_2 w_90 rounded-md h_80 absolute b_40"
        onClick={(e) => e.stopPropagation()}
      >
        <SearchEngHeader active_border={active_border} />

        <div className="search_btn absolute bg_t_2 p_4 rounded-full -bottom-7 right-0 left-0 m-auto">
          <button
            onClick={handleSearch}
            className="search_btn_font text-white uppercase tracking-wide"
          >
            Search
          </button>
        </div>
        <br />
        <br />

        <div className="plans mt-35 mb_8 ml_10"></div>
        <div className="custom-grid justify-center">
          <div className="text_start b_right_2px grid_w_1 box_left_ddr1 css_pointer relative p-2">
            <div className="" onClick={openfrom}>
              <div className="pt-2 pl-6 pb-2 text-xl-small text-gray-500">
                Location/City
              </div>
              <div className="pl-6 relative">
                <h2 className="text_4xl font_bold text-black tracking-wide">
                  {selectFrom?.cityName || "Select City"}
                </h2>{" "}
                {errorMessage && (
                  <div className="text-red-500 text-sm mt-2">
                    {errorMessage}
                  </div>
                )}
                {/* <p className="text-xl_small truncate-text">{selectFromSub}</p> */}
              </div>
            </div>

            {showSearchState ? (
              <div className="searchFfromSelect searchFfromSelect_1">
                <CityListSearch
                  operEngLocation={openfrom}
                  setSelectFrom={setSelectFrom}
                  // setSelectFromSub={setSelectFromSub}
                />
              </div>
            ) : null}
          </div>

          <div
            className="text_start b_right_2px grid_w_2 css_pointer pb-6"
            onClick={openToDateRange}
          >
            <div className="flex cus_mdls_pl md:pl-4 lg:pl-6 xl:pl-6 justify_content_space">
              <div>
                <div className="ml__txt">
                  <div className="pt-3 lg:pb-0 xl:pb-2 text-xl-small txt_travelClass">
                    Check-In
                  </div>
                  <div className="flex">
                    <div>
                      <span className="cus-text-5xl text-5xl font-bold text-gray-900">
                        {" "}
                        {dd_date}
                      </span>{" "}
                    </div>
                    <div className="flex flex-wrap content-center cus_margin_frm mt-2 line_height">
                      <div className="w-full font-bold cust_text_res">
                        {" "}
                        {dd_monthStr} {dd_year}
                      </div>
                      <div className="w-full font-bold cust_text_res">
                        {" "}
                        {dd_strdate}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text_start mt-0 flex"></div>
              </div>
            </div>

            {openDateRage ? (
              <AppDateRage
                openToDateRange={openToDateRange}
                setDatedep={setDatedep}
              />
            ) : null}
          </div>

          {selectedPlan === "round-trip" ? (
            <div
              className="text_start b_right_2px grid_w_3 css_pointer"
              onClick={openToDateRangeR}
            >
              <div className="flex cus_mdls_pl md:pl-4 lg:pl-6 xl:pl-6 justify_content_space">
                <div className="ml__txt">
                  <div className="pt-3 lg:pb-0 xl:pb-2 text-xl-small txt_travelClass">
                    Check-Out
                  </div>
                  <div className="flex">
                    <div>
                      <span className="cus-text-5xl text-5xl font-bold text-gray-900">
                        {" "}
                        {ddr_date}{" "}
                      </span>{" "}
                    </div>
                    <div className="flex flex-wrap content-center cus_margin_frm mt-2 line_height">
                      <div className="w-full font-bold cust_text_res">
                        {" "}
                        {ddr_monthStr} {ddr_year}
                      </div>
                      <div className="w-full font-bold cust_text_res">
                        {" "}
                        {ddr_strdate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {openDateRageR ? (
                <AppDateRage
                  openToDateRange={openToDateRangeR}
                  setDatedep={setDatedepr}
                />
              ) : null}
            </div>
          ) : null}

          <div
            className="b_right_2px grid_w_4 css_pointer relative box_left_ddr2"
            onClick={openTraveller}
          >
            <div className="text_start flex xs:pl-2 sm:pl-3 md:pl-4 lg:pl-6 slider-labels">
              <div class="cus_mt_travelGroup xs:mt-0 sm:mt-2 md:mt-2 lg:mt-4 flex">
                <div className="txt_travelSelect">
                  <span className="cus_txt_traveller lg:text-4xl xl:text-4xl font-bold text-gray-900">
                    {adult}{" "}
                  </span>
                  <span className="cus_txt_traveller lg:text-2xl xl:text-2xl font-bold text-gray-900">
                    {adult > 1 ? "Adults" : "Adult"}{" "}
                    {countchildren > 0 ? "," : null}{" "}
                  </span>

                  {countchildren > 0 ? (
                    <>
                      <span className="cus_txt_traveller lg:text-4xl xl:text-4xl font-bold text-gray-900">
                        {" "}
                        {countchildren}{" "}
                      </span>
                      <span className="cus_txt_traveller lg:text-2xl xl:text-2xl font-bold text-gray-900">
                        {countchildren > 1 ? "Children" : "Child"}{" "}
                      </span>
                    </>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex md:pl-5 lg:pl-7 xl:pl-7 -pt-2 -mt-2">
              <div className="flex">
                <div className="txt_travelSelect">
                  <span className="cus_txt_traveller text-xl font-bold text-gray-900">
                    {" "}
                    {rooms} {rooms > 1 ? "Rooms" : "Room"}{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showTraveller && (
          <AppTravellerHotel
            roomsData={roomsData}
            onClose={(updatedRooms) => {
              setRoomsData(updatedRooms);
              const totalAdults = updatedRooms.reduce(
                (sum, r) => sum + r.adults,
                0
              );
              const totalChildren = updatedRooms.reduce(
                (sum, r) => sum + r.children,
                0
              );

              setAdult(totalAdults);
              setcountChildren(totalChildren);
              setRooms(updatedRooms.length);
              setChildAgesPerRoom(updatedRooms.map((r) => r.childAges || []));
              setShowYTraveller(false);
            }}
          />
        )}
      </div>
    </section>
  );
};

export default EngineHeaderHotel;
