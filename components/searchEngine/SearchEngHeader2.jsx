"use client";

import React, { useState, useEffect} from "react";
import SearchEngHeader from './SearchEngHeader';
import AppListSearch from './AppListSearch';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import Link from 'next/link'

const EngineTabs = () => {

  const [showSearchState, setShowSearchState] = useState(false); // Consistent naming
  const [showSearchStateTo, setShowSearchStateTo] = useState(false); // Consistent naming
  const [selectFrom, setSelectFrom] = useState('Delhi'); // Consistent naming
  const [selectFromSub, setSelectFromSub] = useState('Indira Gandhi International Airp'); // Consistent naming
  const [selectFromTo, setSelectFromTo] = useState('Mumbai'); // Consistent naming
  const [selectFromSubTo, setSelectFromSubTo] = useState('Chhatrapati Shivaji Maharaj International Airport (BOM)'); // Consistent naming

  const openfrom = () => {
    setShowSearchState((prevState) => !prevState); // Correct way to toggle the state
  }

  useEffect(() => {
    setShowSearchStateTo(false)
  },[selectFromTo]);

  const openTo = () => {
    setShowSearchStateTo((prevState) => !prevState); // Correct way to toggle the state
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
  <SearchEngHeader />

    <div className="search_btn absolute bg-yellow-500 p_4 rounded-full -bottom-7 right-0 left-0 m-auto">
      <Link href="/tickets" className="search_btn_font text-white uppercase tracking-wide">
        {" "} Search
      </Link>
    </div>
    <br />
    <br />
    <div className="plans mt-15 mb_8 ml_10">
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
    </div>
    <div className="custom-grid">
      <div className="text_start b_right_2px h_search_section css_pointer" onClick={openfrom}>
        <div className="pt-2 pl-6 pb-2 text-xl-small text-gray-500">
          From
        </div>
        <div className="pl-6 relative">
          <h2 className="text_4xl font_bold text-black tracking-wide">
            {selectFrom}
          </h2>
          <p className="text-xl_small truncate-text">{selectFromSub}</p>
          {showSearchState ? 
          <div className="searchFfromSelect">
          <AppListSearch setSelectFrom={setSelectFrom} setSelectFromSub={setSelectFromSub} />
          </div>
           : null }
       
        </div>
      </div>
      <div className="text_start b_right_2px h_search_section css_pointer" onClick={openTo}>
       <div className="pt-2 pl-6 pb-2 text-xl-small text-gray-400">
          To
        </div>
        <div className="pl-6 relative">
          <h2 className="text_4xl font_bold text-black tracking-wide">
            {" "}
            {selectFromTo}
            {" "}
          </h2>
          <p className="text-xl_small truncate-text">{selectFromSubTo}</p>

          {showSearchStateTo ? 
          <div className="searchFfromSelect">
          <AppListSearch setSelectFrom={setSelectFromTo} setSelectFromSub={setSelectFromSubTo} />
          </div>
           : null }

        </div>
      </div>
      <div className="text_start b_right_2px h_search_section css_pointer">
        <div className="flex justify_content_space">
          <div>
            <div className="">
              <span className="text-4xl pl-6 pb-4 font-bold text-gray-900">
                {" "}
                29{" "}
              </span>{" "}
              <sub className="sub_txt1">Jan</sub>{" "}
            </div>
            <p className="search_txt_g3 text-gray-900 tracking-wide pl-6 pb-2">Wednesday</p>
            {/* <div class="mt-6">
    Departure Date
  </div> */}
            <div className="text_start mt-0 flex pl-6">
              <div className="txt_travelSelect3"> Departure Date</div>
              <div className="">
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
              </div>
            </div>
          </div>
          <div className="ml__txt">
            <div>
              <span className="text-4xl font-bold text-gray-900"> 29 </span>{" "}
              <sub className="sub_txt1">Jan</sub>{" "}
            </div>
            <p className="search_txt_g3 text-gray-900 tracking-wide">Wednesday</p>
            <div className="text_start mt-2 flex pl-6">
              <div className="txt_travelSelect3"> Return</div>
              <div className="">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="b_right_2px h_search_section css_pointer">
        <div className="text_start flex pl_4">
          <div className="">
            <span className="text-7xl font-bold text-gray-900"> 1 </span>
          </div>
          <div className="mt-3">
            <div className="txt_travelSelect">Traveller</div>
            <p className="txt_travelSelect2">Economy / Premium Economy</p>
          </div>
        </div>
        <div className="text_start pl-6 flex">
          <div className="txt_travelSelect3"> Traveller / Class</div>
          <div className="-mt-1">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default EngineTabs;
