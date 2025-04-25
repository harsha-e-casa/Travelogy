"use client";

import React, { useState, useEffect, useRef, useContext, use} from "react";
import SearchEngHeader from './SearchEngHeader';
import AppListSearch from './AppListSearch';
import AppDateRage from './AppDateRage';
import {TripPlans} from './TripPlans';
import dayjs from 'dayjs';
import Link from 'next/link'
import {TravellerForm} from './TravellerForm';
import { AppContext } from '../../util/AppContext';
import { useSearchParams, useRouter } from 'next/navigation'

import {
  PlusOutlined,
  MinusOutlined
} from '@ant-design/icons';



const EngineTabs = ({active_border}) => {
  
  const searchParams = useSearchParams();
  // Extract query parameters from the URL

  const departureFrom = searchParams.get('departureFrom')
  const arrivalTo = searchParams.get('arrivalTo')
  const adults = searchParams.get('adults')
  const children = searchParams.get('children')
  const cabinType = searchParams.get('cabinType')
  const departDate = searchParams.get('departDate')


  const { value, updateValue, setCookie, getCookie } = useContext(AppContext);

  const [showSearchState, setShowSearchState] = useState(false); // Consistent naming
  const [showSearchStateTo, setShowSearchStateTo] = useState(false); // Consistent naming
  const [selectFrom, setSelectFrom] = useState('Delhi'); // Consistent naming
  const [selectFromSub, setSelectFromSub] = useState('DEL'); // Consistent naming
  const [selectFromTo, setSelectFromTo] = useState('Bengaluru'); // Consistent naming
  // const [selectFromSubTo, setSelectFromSubTo] = useState(arrivalTo ? arrivalTo : 'BLR'); // Consistent naming
  const [selectFromSubTo, setSelectFromSubTo] = useState('BLR'); // Consistent naming
  const [openDateRage, setOpenDateRage] = useState(false);
  const [openDateRageR, setOpenDateRageR] = useState(false);
  const [showTraveller, setShowYTraveller] = useState(false);
  // const [datedep, setDatedep] = useState(dayjs());
  const [datedep, setDatedep] = useState(dayjs(dayjs().format('YYYY-MM-DD')));

  const [datedepr, setDatedepr] = useState(dayjs().add(2, 'day'));
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
  // State to store the selected value
  const [travellerClass, setTravellerClass] = useState('a'); // Default value is 'a'

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

    let departureFrom = getCookie('gy_da')
    let arrivalTo = getCookie('gy_aa')
    let adults = getCookie('gy_adult')
    let children = getCookie('gy_child')
    let cabinType = getCookie('gy_class')
    let departDate = getCookie('gy_trd')
    let departureFromSr = getCookie('gy_da_str')
    let arrivalToSr = getCookie('gy_aa_str')
    let tripType = getCookie('gy_triptype')
    
    
    const mydata = { 
      departureFrom: departureFrom,
      arrivalTo: arrivalTo,
      adults: adults,
      children: children,
      cabinType: cabinType,
      departDate: departDate,
      departureFromSr: departureFromSr,
      arrivalToSr: arrivalToSr,
      tripType: tripType
    };

    const queryString = new URLSearchParams(mydata).toString(); // produces "id=10&date=1222"

    router.push(`/tickets?${queryString}`);

  };

  
  const classLabels = {
    a: 'PREMIUM_ECONOMY', // PREMIUM_ECONOMY
    b: 'ECONOMY', //ECONOMY
    c: 'BUSINESS',
    d: 'FIRST',
  };

  // Handler to capture the selected radio button value
  const handleChangeClass = (e) => {
    setTravellerClass(e.target.value); // Update the selected value in state
  };


  const [selectedPlan, setSelectedPlan] = useState('one-way');

  const openfrom = () => {
    setShowSearchState((prevState) => !prevState); // Correct way to toggle the state
    closeAllFields();
    setShowSearchState(true);

  
  }

  const clickMinus = () => {

    let adultCnt = adult - 1;
    setCookie('gy_adult', adultCnt);
    setAdult(adultCnt); // Correct way to toggle the state
  }

  const clickPlus = () => {
    
    let adultMin = adult + 1;
    setCookie('gy_adult', adultMin);
    setAdult(adultMin); // Correct way to toggle the state
  } 

  const clickMinusChildren = () => {
    let childtMin = countchildren - 1;
    setCookie('gy_child', childtMin);
    setcountChildren(childtMin); // Correct way to toggle the state
  }
  const clickPlusChildren = () => {
    let childtCnt = countchildren + 1;
    setCookie('gy_child', childtCnt);
    setcountChildren(childtCnt); // Correct way to toggle the state
  }
 
  const openTraveller = () => {
    setShowYTraveller((prevState) => !prevState); // Correct way to toggle the state
    closeAllFields();
    setShowYTraveller(true);
  }
  const locationSwap = () => {
    
    // Swap logic for month, date, year 
    setSelectFromTo(selectFrom);
    setSelectFromSubTo(selectFromSub);

    setSelectFrom(selectFromTo);
    setSelectFromSub(selectFromSubTo);

  }

  useEffect(() => {
    setShowSearchStateTo(false)
  },[selectFromTo]);
  useEffect(() => {
    setShowSearchState(false)
  },[selectFrom]);

  
  
  

  useEffect(() => {
    setCookie('gy_class', travellerClass);
  },[travellerClass]);


  useEffect(() => {
    setCookie('gy_da', selectFromSub.trim());
  },[selectFromSub]);

  useEffect(() => {
    setCookie('gy_da_str', selectFrom.trim());
  },[selectFrom]);

  useEffect(() => {
    setCookie('gy_aa', selectFromSubTo.trim());
  },[selectFromSubTo]);

  useEffect(() => {
    setCookie('gy_aa_str', selectFromTo.trim());
  },[selectFromTo]);


  useEffect(() => {
    
    if(datedep){
      const formattedDate = dayjs(datedep);
      // setCookie('gy_trd', datedep);
      setCookie('gy_trd', formattedDate.format('YYYY-MM-DD'));

      setDd_monthStr(formattedDate.format('MMM')); // Format as string
      setDd_strdate(formattedDate.format('dddd')); // Format as string
      setDd_date(formattedDate.format('DD')); // Format as string
      setDd_year(formattedDate.format('YY')); // Format as string
    }

  },[datedep]);

  useEffect(() => {

    setCookie('gy_triptype', selectedPlan);

    if(datedepr && selectedPlan === 'round-trip'){
      const formattedDateR = dayjs(datedepr)
      setCookie('gy_trd', formattedDateR.format('YYYY-MM-DD'));
      setDdr_monthStr(formattedDateR.format('MMM')); // Format as string
      setDdr_strdate(formattedDateR.format('dddd')); // Format as string
      setDdr_date(formattedDateR.format('DD')); // Format as string
      setDdr_year(formattedDateR.format('YY')); // Format as string
      
    }

  },[datedepr, selectedPlan]);




  const openTo = () => {
    setShowSearchStateTo((prevState) => !prevState); // Correct way to toggle the state
    closeAllFields();
    setShowSearchStateTo(true);
  }

  const openToDateRange = () => {
    setOpenDateRage((prevState) => !prevState); // Correct way to toggle the state
    closeAllFields();
    setOpenDateRage(true);
  }
  const openToDateRangeR = () => {
    setOpenDateRageR((prevState) => !prevState); // Correct way to toggle the state
    closeAllFields();
    setOpenDateRageR(true);
  }
  const closeAllFields = () => {
    setShowSearchState(false);
    setShowSearchStateTo(false);
    setOpenDateRage(false);
    setOpenDateRageR(false);
    setShowYTraveller(false);
  };
  

  return (
    // <div className="tabs">
    //   <div className="tab active">
    //     <img  src="/assets/imgs/airplane_1604953.svg" alt="Flights" />
    //     <span>Flights</span>
    //   </div>
    //   <div className="tab">
    //     <img  src="/assets/imgs/travel_16190539.svg" alt="Hotels" />
    //     <span>Hotels</span>
    //   </div>
    //   <div className="tab">
    //     <img  src="/assets/imgs/duty-free_2664702.svg" alt="Holiday" />
    //     <span>Holiday package</span>
    //   </div>
    //   <div className="tab">
    //     <img  src="/assets/imgs/safe-flight_1585574.svg" alt="Insurance" />
    //     <span>Travel Insurance</span>
    //   </div>
    //   <div className="tab">
    //     <img  src="/assets/imgs/passport_1257113.svg" alt="Visa" />
    //     <span>Visa</span>
    //   </div>
    // </div>

 <section
  // className="section_main_book_dash_01 relative_MainBanner mb-60"
  className="section_main_book_dash_01 relative_MainBanner"
>
  
  
  <div className="grid_main_section_2 w_90 rounded-md h_80 absolute b_40" onClick={(e) => e.stopPropagation()}>
  {/*<div className="grid_main_section_2 w_90 rounded-md h_80 fixed z__9 top_banner_eng">*/}
  <SearchEngHeader active_border={active_border} />

    <div className="search_btn absolute bg_t_2 p_4 rounded-full -bottom-7 right-0 left-0 m-auto">
      <div onClick={searchTickets} className="search_btn_font text-white uppercase tracking-wide cursor-pointer">
        {" "} Search
      </div>
    </div>
    <br />
    <br />

    <TripPlans selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />

  {/*  <div className="plans mt-35 mb_8 ml_10">
      <label className="plan basic-plan" htmlFor="basic">
        <input defaultChecked={false} type="radio" name="plan" id="basic" />
        <div className="plan-content">
          <div className="plan-details">
            <span>One way</span>
          </div>
        </div>
      </label>
      <label className="plan complete-plan" htmlFor="complete">
        <input type="radio" defaultChecked={true} id="complete" name="plan" />
        <div className="plan-content">
          <div className="plan-details">
            <span>Round Trip</span>
          </div>
        </div>
      </label>
      <label className="plan complete-plan" htmlFor="complete2">
        <input type="radio" id="complete2" name="plan" />
        <div className="plan-content">
          <div className="plan-details">
            <span>Multi City</span>
          </div>
        </div>
      </label>
    </div>*/}

      
    <div className="custom-grid justify-center">
    


      <div className="text_start b_right_2px g_w_1 css_pointer relative box_left_ddr1">



    <div className="" onClick={openfrom}>
        <div className="pt-2 pl-6 pb-2 text-xl-small text-gray-500">
          From
        </div>
        <div className="pl-6 relative">
          <h2 className="text_4xl font_bold text-black tracking-wide">
            {selectFrom}
          </h2>
          <p className="text-xl_small truncate-text">{selectFromSub}</p>
       
        </div>

      </div>

       {showSearchState ? 
          <div className="searchFfromSelect searchFfromSelect_1">
            <AppListSearch operEngLocation={openfrom} setSelectFrom={setSelectFrom} setSelectFromSub={setSelectFromSub} />
          </div>
           : null }


           </div>
        
 <div className="searchReplaceLocation">
            {/*<svg onClick={locationSwap} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#e88400" d="M12.005 22.003c-5.523 0-10-4.477-10-10s4.477-10 10-10s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m-5-7h9v2h-4v3zm5-4v-3l5 5h-9v-2z"/></svg>*/}
            <svg onClick={locationSwap} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#e88400" d="M4.993 11.016a1 1 0 0 1-.531-1.848L7.15 6.48a1 1 0 0 1 1.414 1.415l-1.121 1.12h7.55a1 1 0 0 1 0 2zm14.014 1.969a1 1 0 0 1 .531 1.848L16.85 17.52a1 1 0 1 1-1.414-1.415l1.121-1.12h-7.55a1 1 0 1 1 0-2z"/></svg>
      {/*<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 32 32"><path fill="#e88400" d="m21.786 12.876l7.556-4.363l-7.556-4.363v2.598H2.813v3.5h18.973zm-11.418 5.248l-7.556 4.362l7.556 4.362V24.25h18.974v-3.5H10.368z"/></svg>*/}
            </div>

      <div className="text_start b_right_2px g_w_2 css_pointer relative">
      <div className="" onClick={openTo}>
       <div className="pt-2 pl-6 pb-2 text-xl-small text-gray-400">
          To
        </div>
        <div className="pl-6 pb-4 relative">
          <h2 className="text_4xl font_bold text-black tracking-wide">
            {" "}
            {selectFromTo}
            {" "}
          </h2>
          <p className="text-xl_small truncate-text">{selectFromSubTo}</p>
        </div>
      </div>
       {showSearchStateTo ? 
          <div className="searchFfromSelect searchFfromSelect_1">
          <AppListSearch operEngLocation={openTo} setSelectFrom={setSelectFromTo} setSelectFromSub={setSelectFromSubTo} />
          </div>
           : null }

      </div>


      <div className="text_start b_right_2px g_w_3 css_pointer">
        <div className="flex pl-6 justify_content_space" onClick={openToDateRange}>
          <div>
          <div className="pt-2 pb-2">{dd_strdate}</div>

            <div className="">
              <span className="text-4xl font-bold text-gray-900">
                {" "}
                {dd_date}
                {" "}
              </span> {" "}
              <sub className="sub_txt1">{dd_monthStr}</sub> {" "}
            </div>

            
            
            {/* <div class="mt-6">
    Departure Date
  </div> */}
            <div className="text_start mt-0 flex">
              <div className="txt_travelSelect3 txt_travelFrom"> Departure Date</div>
              
              {/*<div className="">
                {" "}
                <svg
                  className="-mt-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width={34}
                  height={34}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#ffac33"
                    d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6z"
                  />
                </svg>
              </div>*/}
            </div>
          </div>
          
        </div>


        {openDateRage ? (<AppDateRage 
              openToDateRange={openToDateRange} 
              setDatedep={setDatedep}



              
              /> ): null }


      </div>
      {selectedPlan === 'round-trip' ? ( 
          <div className="text_start b_right_2px g_w_4 css_pointer">
            <div className="flex pl-6 justify_content_space" onClick={openToDateRangeR}>
              <div className="ml__txt">
                <div className="pt-2 pb-2">{ddr_strdate}</div>
                  <div>
                    <span className="text-4xl font-bold text-gray-900"> {ddr_date} </span>{" "}
                    <sub className="sub_txt1">{" "}{ddr_monthStr}</sub>
                  </div>

                  <div className="text_start mt-0 flex">
                    <div className="txt_travelSelect3 txt_travelreturn"> Return</div>
                  </div>
              </div>
            </div> 

              {openDateRageR ? (<AppDateRage
              openToDateRange={openToDateRangeR} 
              setDatedep={setDatedepr}
              /> ): null }

          </div>
        ) : null}


      <div className="b_right_2px g_w_5 css_pointer relative box_left_ddr2" onClick={openTraveller}>
        <div className="text_start flex pl-6 slider-labels">
          <div className="">
            <span className="text-7xl font-bold text-gray-900"> { adult+countchildren } </span>
          </div>
          <div className="mt-3">
            <div className="txt_travelSelect">Traveller</div>
            <p className="txt_travelSelect2">{classLabels[travellerClass]}</p>
          </div>
        </div>
        <div className="text_start pl-6 flex">
          <div className="txt_travelSelect3 txt_travelClass"> Traveller / Class</div>
         {/* <div className="-mt-1">
            {" "}
            <svg
              className="-mt-0"
              xmlns="http://www.w3.org/2000/svg"
              width={34}
              height={34}
              viewBox="0 0 24 24"
            >
              <path
                fill="#ffac33"
                d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6z"
              />
            </svg>
          </div>*/}
        </div>


      </div>
    </div>

    <TravellerForm showTraveller={showTraveller} adult={adult}
     opentrvForm={openTraveller} clickMinus={clickMinus} clickPlus={clickPlus}
    clickMinusChildren={clickMinusChildren} clickPlusChildren={clickPlusChildren} 
    countchildren={countchildren} handleChangeClass={handleChangeClass} travellerClass={travellerClass} />

  </div>
</section>

  );
};

export default EngineTabs;
