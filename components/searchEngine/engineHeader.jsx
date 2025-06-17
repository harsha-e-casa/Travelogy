"use client";

import React, { useState, useEffect, useRef, useContext, use } from "react";

import SearchEngHeader from "./SearchEngHeader";
import AppListSearch from "./AppListSearch";
import AppDateRage from "./AppDateRage";
import { TripPlans } from "./TripPlans";
import { PassengerType } from "./PassengerType";
import dayjs from "dayjs";
import Link from "next/link";
import { TravellerForm } from "./TravellerForm";
import { AppContext } from "../../util/AppContext";
import { useSearchParams, useRouter } from "next/navigation";
import "./DirectFlight.jsx";
import DirectFlight from "./DirectFlight.jsx";
import MultiCityContainer from "./MultiCityContainer.jsx";

import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const EngineTabs = ({ active_border }) => {
  const searchParams = useSearchParams();
  // Extract query parameters from the URL

  const departureFrom = searchParams.get("departureFrom");
  const arrivalTo = searchParams.get("arrivalTo");
  const adults = searchParams.get("adults");
  const children = searchParams.get("children");
  const cabinType = searchParams.get("cabinType");
  const departDate = searchParams.get("departDate");

  const { value, updateValue, setCookie, getCookie } = useContext(AppContext);

  const [showSearchState, setShowSearchState] = useState(false); // Consistent naming
  const [showSearchStateTo, setShowSearchStateTo] = useState(false); // Consistent naming
  const [selectFrom, setSelectFrom] = useState("Delhi"); // Consistent naming
  const [selectFromSub, setSelectFromSub] = useState("DEL"); // Consistent naming
  const [selectFromTo, setSelectFromTo] = useState("Bengaluru"); // Consistent naming
  // const [selectFromSubTo, setSelectFromSubTo] = useState(arrivalTo ? arrivalTo : 'BLR'); // Consistent naming
  const [selectFromSubTo, setSelectFromSubTo] = useState("BLR"); // Consistent naming
  const [openDateRage, setOpenDateRage] = useState(false);
  const [openDateRageR, setOpenDateRageR] = useState(false);
  const [showTraveller, setShowYTraveller] = useState(false);
  // const [datedep, setDatedep] = useState(dayjs());
  const [datedep, setDatedep] = useState(dayjs(dayjs().format("YYYY-MM-DD")));

  const [datedepr, setDatedepr] = useState(dayjs().add(2, "day"));
  const dateRangeRef = useRef(null); // Ref for date range container

  const [dd_monthStr, setDd_monthStr] = useState(null);
  const [dd_strdate, setDd_strdate] = useState(null);
  const [dd_date, setDd_date] = useState(null);
  const [dd_year, setDd_year] = useState(null);

  const [ddr_monthStr, setDdr_monthStr] = useState(null);
  const [ddr_strdate, setDdr_strdate] = useState(null);
  const [ddr_date, setDdr_date] = useState(null);
  const [ddr_year, setDdr_year] = useState(null);

  const [adult, setAdult] = useState(1);
  const [countchildren, setcountChildren] = useState(0);
  const [countinfant, setcountInfant] = useState(0);
  const [totalPassenderCount, setTotalPassenderCount] = useState(
    adult + countchildren
  );

  // reset
  useEffect(() => {
    // Reset all traveller cookies when arriving at this page
    setCookie("gy_adult", 1);
    setCookie("gy_child", 0);
    setCookie("gy_infant", 0);
  }, []);

  useEffect(() => {
    if (getCookie("gy_adult") == undefined || getCookie("gy_adult") == "Nan") {
      setCookie("gy_adult", 1);
    }
  }, [adult]);
  useEffect(() => {
    if (getCookie("gy_child") == undefined || getCookie("gy_child") == "Nan") {
      setCookie("gy_child", 0);
    }
  }, [countchildren]);
  useEffect(() => {
    if (
      getCookie("gy_infant") == undefined ||
      getCookie("gy_infant") == "Nan"
    ) {
      setCookie("gy_infant", 0);
    }
  }, [countinfant]);
  // State to store the selected value
  const [travellerClass, setTravellerClass] = useState("b"); // Default value is 'a'

  const router = useRouter();
  useEffect(() => {
    const handleClick = () => {
      closeAllFields();
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const searchTickets = () => {
    console.log("fn searchTickettttttttttt ");
    console.log(multicitySegments);

    let departureFrom = getCookie("gy_da");
    let arrivalTo = getCookie("gy_aa");
    let adults = getCookie("gy_adult");
    let children = getCookie("gy_child");
    let infant = getCookie("gy_infant");
    let cabinType = getCookie("gy_class");
    let departDate = getCookie("gy_trd");
    let returnDate = getCookie("gy_return");
    let departureFromSr = getCookie("gy_da_str");
    let arrivalToSr = getCookie("gy_aa_str");
    let tripType = getCookie("gy_triptype");
    let passengerType = getCookie("gy_passender_type");

    // save multicity condition

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
      passengerType: passengerType,
    };

    if (tripType == "multi-city") {
      mydata.multicitySegments = multicitySegments;
      console.log(
        " flight search save ==? ",
        JSON.stringify(multicitySegments)
      );
      setCookie("gy_multi_city", JSON.stringify(multicitySegments));
    }

    if (returnDate != undefined || returnDate != "Nan") {
      mydata.returnDate = returnDate;
    }

    const queryString = new URLSearchParams(mydata).toString(); // produces "id=10&date=1222"

    router.push(`/tickets?${queryString}`);
  };

  const classLabels = {
    a: "PREMIUM_ECONOMY", // PREMIUM_ECONOMY
    b: "ECONOMY", //ECONOMY
    c: "BUSINESS",
    d: "FIRST",
  };

  // Handler to capture the selected radio button value
  const handleChangeClass = (e) => {
    setTravellerClass(e.target.value); // Update the selected value in state
  };

  const [selectedPlan, setSelectedPlan] = useState("one-way");
  const [selectedPassengerType, setSelectedPassengerType] = useState("REGULAR");
  const [isDirectFlight, setIsDirectFlight] = useState(false);

  const openfrom = () => {
    if (showSearchState) {
      closeAllFields();
    } else {
      closeAllFields();
      setShowSearchState(true);
    }
  };

  const clickMinus = () => {
    let adultCnt = adult - 1;
    setCookie("gy_adult", adultCnt);
    if (adultCnt < countinfant) {
      clickMinusinfant();
    }
    setAdult(adultCnt); // Correct way to toggle the state
  };

  useEffect(() => {
    setTotalPassenderCount(adult + countchildren);
  }, [adult, countchildren]);

  const clickPlus = () => {
    let adultMin = adult + 1;
    if (totalPassenderCount < 9) {
      setCookie("gy_adult", adultMin);
      setAdult(adultMin); // Correct way to toggle the state
    }
  };

  const clickMinusChildren = () => {
    let childtMin = countchildren - 1;
    setCookie("gy_child", childtMin);
    setcountChildren(childtMin); // Correct way to toggle the state
  };

  const clickPlusChildren = () => {
    let childtCnt = countchildren + 1;
    if (totalPassenderCount < 9) {
      setCookie("gy_child", childtCnt);
      setcountChildren(childtCnt); // Correct way to toggle the state
    }
  };

  const clickMinusinfant = () => {
    let infantMin = countinfant - 1;
    setCookie("gy_infant", infantMin);
    setcountInfant(infantMin);
  };

  const clickPlusinfant = () => {
    let infantCnt = countinfant + 1;
    // if (adult >= infantCnt) {
    setCookie("gy_infant", infantCnt);
    setcountInfant(infantCnt);
    // }
  };

  const openTraveller = () => {
    if (showTraveller) {
      closeAllFields();
    } else {
      closeAllFields();
      setShowYTraveller(true);
    }
  };
  const locationSwap = () => {
    // Swap logic for month, date, year
    setSelectFromTo(selectFrom);
    setSelectFromSubTo(selectFromSub);

    setSelectFrom(selectFromTo);
    setSelectFromSub(selectFromSubTo);
  };

  useEffect(() => {
    setShowSearchStateTo(false);
  }, [selectFromTo]);
  useEffect(() => {
    setShowSearchState(false);
  }, [selectFrom]);

  useEffect(() => {
    setCookie("gy_class", travellerClass);
  }, [travellerClass]);

  useEffect(() => {
    setCookie("gy_da", selectFromSub.trim());
  }, [selectFromSub]);

  useEffect(() => {
    setCookie("gy_da_str", selectFrom.trim());
  }, [selectFrom]);

  useEffect(() => {
    setCookie("gy_aa", selectFromSubTo.trim());
  }, [selectFromSubTo]);

  useEffect(() => {
    setCookie("gy_aa_str", selectFromTo.trim());
  }, [selectFromTo]);

  useEffect(() => {
    setCookie("gy_passender_type", selectedPassengerType);
  }, [selectedPassengerType]);

  useEffect(() => {
    setCookie("gy_direct_flight", isDirectFlight ? "true" : "false");
  }, [isDirectFlight]);
  useEffect(() => {
    if (datedep) {
      const formattedDate = dayjs(datedep);
      // setCookie('gy_trd', datedep);
      setCookie("gy_trd", formattedDate.format("YYYY-MM-DD"));

      setDd_monthStr(formattedDate.format("MMM")); // Format as string
      setDd_strdate(formattedDate.format("dddd")); // Format as string
      setDd_date(formattedDate.format("DD")); // Format as string
      setDd_year(formattedDate.format("YY")); // Format as string
    }
  }, [datedep]);

  useEffect(() => {
    setCookie("gy_triptype", selectedPlan);

    if (
      datedep &&
      datedepr &&
      (selectedPlan === "round-trip" || selectedPlan === "multi-city")
    ) {
      const formattedDate = dayjs(datedep);
      const formattedDateR = dayjs(datedepr);
      setCookie("gy_trd", formattedDate.format("YYYY-MM-DD"));
      setCookie("gy_return", formattedDateR.format("YYYY-MM-DD"));
      setDdr_monthStr(formattedDateR.format("MMM")); // Format as string
      setDdr_strdate(formattedDateR.format("dddd")); // Format as string
      setDdr_date(formattedDateR.format("DD")); // Format as string
      setDdr_year(formattedDateR.format("YY")); // Format as string
    }
  }, [datedepr, selectedPlan, datedep]);

  const openTo = () => {
    if (showSearchStateTo) {
      closeAllFields();
    } else {
      closeAllFields();
      setShowSearchStateTo(true);
    }
  };

  const openToDateRange = () => {
    if (openDateRage) {
      closeAllFields();
    } else {
      closeAllFields();
      setOpenDateRage(true);
    }
  };
  const openToDateRangeR = () => {
    if (openDateRageR) {
      closeAllFields();
    } else {
      closeAllFields();
      setOpenDateRageR(true);
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
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeAllFields();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const displayDate = dayjs().add(2, "day");
  const [multicitySegments, setMulticitySegments] = useState([
    {
      from: selectFromTo,
      fromCode: selectFromSubTo,
      to: "",
      toCode: "",
      departureDate: displayDate,
    },
  ]);

  const multicityUpdateSegment = (index, newData) => {
    const newSegments = [...multicitySegments];
    newSegments[index] = newData;
    setMulticitySegments(newSegments);
  };

  const [segmentError, setSegmentError] = useState("");

  const multicityAddSegment = () => {
    if (multicitySegments.length < 5) {
      const prevSegment = multicitySegments[multicitySegments.length - 1];

      // Validate previous segment
      if (
        !prevSegment.to ||
        !prevSegment.toCode ||
        !prevSegment.departureDate
      ) {
        setSegmentError(
          "Please complete the previous segment before adding a new one."
        );
        setTimeout(() => setSegmentError(""), 3500);
        return;
      }

      setMulticitySegments([
        ...multicitySegments,
        {
          from: prevSegment.to,
          fromCode: prevSegment.toCode,
          to: "",
          toCode: "",
          departureDate: displayDate,
        },
      ]);
    }
  };

  const multicityRemoveSegment = (index) => {
    if (multicitySegments.length > 1) {
      setMulticitySegments(multicitySegments.filter((_, i) => i !== index));
    }
  };

  console.log("multicitySegmentsmulticitySegments ==> ", multicitySegments);

  return (
    <section
      className="section_main_book_dash_01 relative_MainBanner "
      style={{ padding: "3% 7% 7% 7%" }}
    >
      <div
        className="rounded-md"
        style={{
          background: "#ffffffcc",
          borderRadius: "14px",
          position: "relative",
          top: "61px",
          width: "90%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <SearchEngHeader active_border={active_border} />

        <div style={{ marginTop: "7%" }}>
          <TripPlans
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />

          <div
            className="custom-grid justify-center"
            style={{ flexDirection: "column" }}
          >
            <div className="flex">
              <div className="text_start b_right_2px g_w_1 css_pointer relative box_left_ddr1">
                <div className="" onClick={openfrom}>
                  <div className="pt-2 pl-6 pb-2 text-xl-small text-gray-500">
                    From
                  </div>
                  <div className="pl-6 relative">
                    <h2 className="text_4xl font_bold text-black tracking-wide">
                      {selectFrom}
                    </h2>
                    <p className="text-xl_small truncate-text">
                      {selectFromSub}
                    </p>
                  </div>
                </div>

                {showSearchState ? (
                  <div className="searchFfromSelect searchFfromSelect_1">
                    <AppListSearch
                      operEngLocation={openfrom}
                      setSelectFrom={setSelectFrom}
                      setSelectFromSub={setSelectFromSub}
                    />
                  </div>
                ) : null}
              </div>

              <div className="searchReplaceLocation">
                <svg
                  onClick={locationSwap}
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#e88400"
                    d="M4.993 11.016a1 1 0 0 1-.531-1.848L7.15 6.48a1 1 0 0 1 1.414 1.415l-1.121 1.12h7.55a1 1 0 0 1 0 2zm14.014 1.969a1 1 0 0 1 .531 1.848L16.85 17.52a1 1 0 1 1-1.414-1.415l1.121-1.12h-7.55a1 1 0 1 1 0-2z"
                  />
                </svg>
              </div>

              <div className="text_start b_right_2px g_w_2 css_pointer relative ">
                <div className="" onClick={openTo}>
                  <div className="pt-2 pl-6 pb-2 text-xl-small text-gray-400">
                    To
                  </div>
                  <div className="pl-6 pb-4 relative">
                    <h2 className="text_4xl font_bold text-black tracking-wide">
                      {" "}
                      {selectFromTo}{" "}
                    </h2>
                    <p className="text-xl_small truncate-text">
                      {selectFromSubTo}
                    </p>
                  </div>
                </div>
                {showSearchStateTo ? (
                  <div className="searchFfromSelect searchFfromSelect_1">
                    <AppListSearch
                      operEngLocation={openTo}
                      setSelectFrom={setSelectFromTo}
                      setSelectFromSub={setSelectFromSubTo}
                    />
                  </div>
                ) : null}
              </div>

              <div className="text_start b_right_2px g_w_3 css_pointer">
                <div
                  className="flex pl-6 justify_content_space"
                  onClick={openToDateRange}
                >
                  <div>
                    <div className="pt-2 pb-2">{dd_strdate}</div>

                    <div className="">
                      <span className="text-4xl font-bold text-gray-900">
                        {" "}
                        {dd_date}{" "}
                      </span>{" "}
                      <sub className="sub_txt1">{dd_monthStr}</sub>{" "}
                    </div>
                    <div className="text_start mt-0 flex">
                      <div className="txt_travelSelect3 txt_travelFrom">
                        {" "}
                        Departure Date
                      </div>
                    </div>
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
                <div className="text_start b_right_2px g_w_4 css_pointer">
                  <div
                    className="flex pl-6 justify_content_space"
                    onClick={openToDateRangeR}
                  >
                    <div className="ml__txt">
                      <div className="pt-2 pb-2">{ddr_strdate}</div>
                      <div>
                        <span className="text-4xl font-bold text-gray-900">
                          {" "}
                          {ddr_date}{" "}
                        </span>{" "}
                        <sub className="sub_txt1"> {ddr_monthStr}</sub>
                      </div>

                      <div className="text_start mt-0 flex">
                        <div className="txt_travelSelect3 txt_travelreturn">
                          {" "}
                          Return
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
                className="b_right_2px g_w_5 css_pointer relative box_left_ddr2"
                onClick={openTraveller}
              >
                <div className="text_start flex pl-6 slider-labels">
                  <div className="">
                    <span className="text-7xl font-bold text-gray-900">
                      {" "}
                      {adult + countchildren + countinfant}{" "}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="txt_travelSelect">Traveller</div>
                    <p className="txt_travelSelect2">
                      {classLabels[travellerClass]}
                    </p>
                  </div>
                </div>
                <div className="text_start pl-6 flex">
                  <div className="txt_travelSelect3 txt_travelClass">
                    {" "}
                    Traveller / Class
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="flex">{selectedPlan == "multi-city" && <MultiCityContainer />}</div> */}
            {selectedPlan === "multi-city" && (
              <div className="w-full mt-4">
                <MultiCityContainer
                  segments={multicitySegments}
                  updateSegment={multicityUpdateSegment}
                  addSegment={multicityAddSegment}
                  removeSegment={multicityRemoveSegment}
                />
                {segmentError && (
                  <div className="text-red-500 text-sm font-medium my-2">
                    {segmentError}
                  </div>
                )}
              </div>
            )}
          </div>

          <TravellerForm
            showTraveller={showTraveller}
            adult={adult}
            opentrvForm={openTraveller}
            clickMinus={clickMinus}
            clickPlus={clickPlus}
            clickMinusChildren={clickMinusChildren}
            clickPlusChildren={clickPlusChildren}
            countchildren={countchildren}
            countinfant={countinfant}
            clickMinusinfant={clickMinusinfant}
            clickPlusinfant={clickPlusinfant}
            handleChangeClass={handleChangeClass}
            travellerClass={travellerClass}
            totalPassenderCount={totalPassenderCount}
            specificStyle={{ right: "0", top: "" }}
            setTravellerClass={setTravellerClass}
          />

          <div className="">
            <PassengerType
              selectedPassengerType={selectedPassengerType}
              setSelectedPassengerType={setSelectedPassengerType}
            />
            <DirectFlight
              isDirectFlight={isDirectFlight}
              setIsDirectFlight={setIsDirectFlight}
            />
          </div>

          <div
            className="search_btn bg_t_2 p_4 rounded-full -bottom-7 right-0 left-0 m-auto"
            style={{ position: "relative" }}
          >
            <div
              onClick={searchTickets}
              className="search_btn_font text-white uppercase tracking-wide cursor-pointer"
            >
              {" "}
              Search
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineTabs;
