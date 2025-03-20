"use client";

import React, { useState, useEffect, useRef} from "react";
import SearchEngHeader from './SearchEngHeader';
import AppListSearch from './AppListSearch';
import AppDateRage from './AppDateRage';
import { TripPlansHotel } from './TripPlans';
import dayjs from 'dayjs';
import Link from 'next/link'
import { AppTravellerHotel } from './TravellerForm';

import {
  PlusOutlined,
  MinusOutlined
} from '@ant-design/icons';

const engineHeaderHotel = ({active_border}) => {

  const [showSearchState, setShowSearchState] = useState(false); // Consistent naming
  const [showSearchStateTo, setShowSearchStateTo] = useState(false); // Consistent naming
  const [selectFrom, setSelectFrom] = useState('Goa'); // Consistent naming
  const [selectFromSub, setSelectFromSub] = useState('Indira Gandhi International Airp'); // Consistent naming


  const [openDateRage, setOpenDateRage] = useState(false);
  const [openDateRageR, setOpenDateRageR] = useState(false);
  const [showTraveller, setShowYTraveller] = useState(false);
  const [datedep, setDatedep] = useState(dayjs());
  const [datedepr, setDatedepr] = useState(dayjs().add(2, 'day'));
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
  const [children, setChildren] = useState(0);
  // State to store the selected value
  const [travellerClass, setTravellerClass] = useState('a'); // Default value is 'a'

  const classLabels = {
    a: 'Economy/Premium Economy',
    b: 'Premium Economy',
    c: 'Business',
    d: 'First Class',
  };

  // Handler to capture the selected radio button value
  const handleChangeClass = (e) => {
    setTravellerClass(e.target.value); // Update the selected value in state
  };


  const [selectedPlan, setSelectedPlan] = useState('round-trip');

  const openfrom = () => {
    setShowSearchState((prevState) => !prevState); // Correct way to toggle the state
  }

  const clickMinus = () => {
    setAdult(adult - 1); // Correct way to toggle the state
  }
  const clickPlus = () => {
    setAdult(adult + 1); // Correct way to toggle the state
  }
  const clickMinusChildren = () => {
    setChildren(children - 1); // Correct way to toggle the state
  }
  const clickPlusChildren = () => {
    setChildren(children + 1); // Correct way to toggle the state
  }

   const clickRoomAdd = () => {
    setRooms(rooms + 1); // Correct way to toggle the state
  }
  const clickRoomMinus = () => {
    setRooms(rooms - 1); // Correct way to toggle the state
  }
 
  const openTraveller = () => {
    setShowYTraveller((prevState) => !prevState); // Correct way to toggle the state
  }
 

  useEffect(() => {
    
    if(datedep){
      const formattedDate = dayjs(datedep)
      setDd_strdate(formattedDate.format('dddd')); // Format as string
      setDd_monthStr(formattedDate.format('MMM')); // Format as string
      setDd_date(formattedDate.format('DD')); // Format as string
      setDd_year(formattedDate.format('YYYY')); // Format as string
    }

  },[datedep]);

  useEffect(() => {
    
    if(datedepr && selectedPlan === 'round-trip'){
      const formattedDateR = dayjs(datedepr)
      setDdr_strdate(formattedDateR.format('dddd')); // Format as string
      setDdr_monthStr(formattedDateR.format('MMM')); // Format as string
      setDdr_date(formattedDateR.format('DD')); // Format as string
      setDdr_year(formattedDateR.format('YYYY')); // Format as string
    }


  },[datedepr]);


  useEffect(() => {
    
    if(selectedPlan){

    }

  },[selectedPlan]);

  const openToDateRange = () => {
    setOpenDateRage((prevState) => !prevState); // Correct way to toggle the state
  }
  const openToDateRangeR = () => {
    setOpenDateRageR((prevState) => !prevState); // Correct way to toggle the state
  }

  return (
    // <div className="tabs">
    //   <div className="tab active">
    //     <img src="/assets/imgs/airplane_1604953.svg" alt="Flights" />
    //     <span>Flights</span>
    //   </div>
    //   <div className="tab">
    //     <img src="/assets/imgs/travel_16190539.svg" alt="Hotels" />
    //     <span>Hotels</span>
    //   </div>
    //   <div className="tab">
    //     <img src="/assets/imgs/duty-free_2664702.svg" alt="Holiday" />
    //     <span>Holiday package</span>
    //   </div>
    //   <div className="tab">
    //     <img src="/assets/imgs/safe-flight_1585574.svg" alt="Insurance" />
    //     <span>Travel Insurance</span>
    //   </div>
    //   <div className="tab">
    //     <img src="/assets/imgs/passport_1257113.svg" alt="Visa" />
    //     <span>Visa</span>
    //   </div>
    // </div>

 <section
  // className="section_main_book_dash_01 relative_MainBanner mb-60"
  className="section_main_book_dash_01 relative_MainBanner"

>
  
  
  <div className="grid_main_section_2 w_90 rounded-md h_80 absolute b_40">
  {/*<div className="grid_main_section_2 w_90 rounded-md h_80 fixed z__9 top_banner_eng">*/}
  <SearchEngHeader active_border={active_border} />

    <div className="search_btn absolute bg_t_2 p_4 rounded-full -bottom-7 right-0 left-0 m-auto">
      <Link href="/tickets" className="search_btn_font text-white uppercase tracking-wide">
        {" "} Search
      </Link>
    </div>
    <br />
    <br />

    {/*<TripPlansHotel selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />*/}

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

      <div className="plans mt-35 mb_8 ml_10">
      </div>
    <div className="custom-grid justify-center">
    


      <div className="text_start b_right_2px grid_w_1 box_left_ddr1 css_pointer relative p-2">



    <div className="" onClick={openfrom}>
        <div className="pt-2 pl-6 pb-2 text-xl-small text-gray-500">
          City, Location Or Property 
        </div>
        <div className="pl-6 relative">
          <h2 className="text_4xl font_bold text-black tracking-wide">
            {selectFrom}
          </h2>
          <p className="text-xl_small truncate-text">India</p>
       
        </div>

      </div>

       {showSearchState ? 
          <div className="searchFfromSelect">
            <AppListSearch categoryType={'hotel'} operEngLocation={openfrom} setSelectFrom={setSelectFrom} setSelectFromSub={setSelectFromSub} />
          </div>
           : null }


           </div>
        
 



      <div className="text_start b_right_2px grid_w_2 css_pointer" onClick={openToDateRange}>
        <div className="flex pl-6 justify_content_space">
          <div>
          {/*<div className="pt-2 pb-2 txt_travelClass">Check-In</div>*/}
           <div className="pt-3 pb-2 text-xl-small txt_travelClass">
          Check-In
        </div>
{/*
            <div className="">
              <span className="text-4xl font-bold text-gray-900">
                {" "}
                {dd_date}
                {" "}
              </span> {" "}
              <sub className="sub_txt1 font-bold">{dd_monthStr} 2025</sub> {" "}
               <span className="text-4xl font-bold text-gray-900">
                {" "}
                
                {" "}
              </span> {" "}
            </div>
*/}

         <div className="flex">
                    <div>
                     <span className="text-5xl font-bold text-gray-900"> {dd_date} </span>{" "}
                    </div>
                    <div className="flex flex-wrap content-center mt-2 line_height">
                      <div className="w-full font-bold">{" "}{dd_monthStr} {dd_year}</div>
                      <div className="w-full font-bold">{" "}{dd_strdate}</div>
                     </div>
                  </div>
                    

            
            
            {/* <div class="mt-6">
    Departure Date
  </div> */}
            <div className="text_start mt-0 flex">
              {/*<div className="txt_travelSelect3"> </div>*/}
              
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
          <div className="text_start b_right_2px grid_w_3 css_pointer" onClick={openToDateRangeR}>
            <div className="flex pl-6 justify_content_space">
              <div className="ml__txt">
                {/*<div className="pt-2 pb-2 txt_travelClass">Check-Out</div>*/}
              <div className="pt-3 pb-2 text-xl-small txt_travelClass">
          Check-Out
        </div>
                  <div className="flex">
                    <div>
                     <span className="text-5xl font-bold text-gray-900"> {ddr_date} </span>{" "}
                    </div>
                    <div className="flex flex-wrap content-center mt-2 line_height">
                      <div className="w-full font-bold">{" "} {ddr_monthStr} {ddr_year}</div>
                      <div className="w-full font-bold">{" "} {ddr_strdate}</div>
                     </div>
                  </div>
                    

                  {/*<div className="text_start mt-0 flex">
                    <div className="txt_travelSelect3 txt_travelreturn"> Return</div>
                  </div>*/}
              </div>
            </div> 

              {openDateRageR ? (<AppDateRage
              openToDateRange={openToDateRangeR} 
              setDatedep={setDatedepr}
              /> ): null }

          </div>
        ) : null}


      <div className="b_right_2px grid_w_4 css_pointer relative box_left_ddr2" onClick={openTraveller}>
        <div className="text_start flex pl-6 slider-labels">

          <div className="mt-6 flex">
            <div className="txt_travelSelect">

            	<span className="text-4xl font-bold text-gray-900">{adult}</span>
            	<span className="text-2xl font-bold text-gray-900">{adult>1?'Adults':'Adult'} {children > 0 ? ',' : null} </span>
            	
            	{children > 0 ?
	            	<>
	            	 <span className="text-4xl font-bold text-gray-900"> {children}</span>
	            	 <span className="text-2xl font-bold text-gray-900">{children > 1 ? 'Children' : 'Child'} </span>
	            	 {/*<span className="text-2xl font-bold text-gray-900">   </span>*/}
	            	</>
	            	: null 
	            }
	          

            </div>

          </div>
        </div>

         <div className="flex pl-7 -pt-2 -mt-2">
          
          <div className="flex">
            <div className="txt_travelSelect">

            	            	
	            	 {/*<span className="text-4xl font-bold text-gray-900">  </span>*/}
	            	 <span className="text-xl font-bold text-gray-900"> {rooms} {rooms > 1 ? 'Rooms' : 'Room'} </span>
	            	 {/*<span className="text-2xl font-bold text-gray-900">   </span>*/}


            </div>

          </div>
        </div>

        {/*<div className="text_start flex pl-6 slider-labels">*/}
          {/*<div className="font-bold text-base"> {rooms} {rooms > 1 ? 'Rooms' : 'Room'}  </div>*/}
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
        {/*</div>*/}
      
      </div>

    </div>

    <AppTravellerHotel
	    showTraveller={showTraveller} adult={adult}
	    opentrvForm={openTraveller} clickMinus={clickMinus} clickPlus={clickPlus}
	    clickMinusChildren={clickMinusChildren} clickPlusChildren={clickPlusChildren} 
	    children={children} handleChangeClass={handleChangeClass} travellerClass={travellerClass}
	    clickRoomAdd={clickRoomAdd} clickRoomMinus={clickRoomMinus} rooms={rooms}
    />


  </div>
</section>

  );
};

export default engineHeaderHotel;
