import React from 'react';
import { Tabs } from 'antd';
import TopRated43 from "@/components/sections/TopRated43";
import SortHotelsFilter from '@/components/elements/SortHotelsFilter'

import rawHotelsData from "@/util/hotels.json"
import useHotelFilter from '@/util/useHotelFilter'
import HotelCard1 from '@/components/elements/hotelcard/HotelCard1'

import { Swiper, SwiperSlide } from "swiper/react"
import { swiperGroupAnimateMicro, swiperGroupOffersAll } from "@/util/swiperOption"
import Link from "next/link"


const onChange = (key : any) => {
  console.log(key); // Log the active tab key
};


const hotelsData = rawHotelsData.map(hotel => ({
  ...hotel,
  rating: parseFloat(hotel.rating)
}))

const SortHotelsFilterApp = () => {

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
  } = useHotelFilter(hotelsData)


  return (
    <div className="">
    <div className="box-filters mt-4">
              
    {/*<p className="text-xl-medium neutral-500">Competitive fares for your route-specific searches.</p>             */}

              </div>
              <div className="">
                <div className="box-grid-tours wow fadeIn">
                  <div className="row">
                  <div className="swiper-container swiper-group-animate swiper-group-journey">
                      <Swiper {...swiperGroupAnimateMicro}>
                        {paginatedHotels.map((hotel, index) => (
                          <SwiperSlide key={index}>
                            
                              <HotelCard1 hotel={hotel} key={index} />
                          
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                </div>
                </div>
              </div>
        </div>
    )
}; 

const AllOffersList = () => {

  return (
        <div className="">
          
        {/*<div className="box-filters mt-4">
          <p className="text-xl-medium neutral-500">Competitive fares for your route-specific searches.</p>             
        </div>*/}

          <div className="">
            <div className="box-grid-tours">
              <div className="row">
                <div className="swiper-container swiper-group-animate swiper-group-journey">
                  <Swiper {...swiperGroupOffersAll}>

                          <SwiperSlide>
                            <div className="offersSection_1">
                              
                              <div className="offersSection_1_left">
                                <img alt="travalogy" src="http://localhost:3000/assets/imgs/page/homepage1/flight3.png" />
                              </div>
                              
                              <div className="offersSection_1_right p-20 relative">
                                <span className="text-lg-medium">Recharge Yourself with a Relaxing Stay:</span>
                                <div className="text-md-small neutral-500">Grab Up to 25% Savings* on Stays @ Trident
                                <br /> Hotels!</div>
                                <div className="view_offer text-md-medium mt-10 bg-red-800">View Offers</div>
                              </div>

                            </div>

                            <div className="offersSection_1 mt-20">
                              
                              <div className="offersSection_1_left">
                                <img alt="travalogy" src="https://promos.makemytrip.com/notification/xhdpi//116X11-paul-john-10062024.jpg?im=Resize=(134,134)" />
                              </div>
                              
                              <div className="offersSection_1_right p-20 relative">
                                <span className="text-lg-medium">Recharge Yourself with a Relaxing Stay:</span>
                                <div className="text-md-small neutral-500">Grab Up to 25% Savings* on Stays @ Trident
                                <br /> Hotels!</div>
                                <div className="view_offer text-md-medium mt-10 bg-red-800">View Offers</div>
                              </div>

                            </div> 
                          </SwiperSlide>

                             <SwiperSlide>
                            <div className="offersSection_1">
                              
                              <div className="offersSection_1_left">
                                <img alt="travalogy" src="http://localhost:3000/assets/imgs/page/homepage5/media.png" />
                              </div>
                              
                              <div className="offersSection_1_right p-20 relative">
                                <span className="text-lg-medium">Recharge Yourself with a Relaxing Stay:</span>
                                <div className="text-md-small neutral-500">Grab Up to 25% Savings* on Stays @ Trident
                                <br /> Hotels!</div>
                                <div className="view_offer text-md-medium mt-10 bg-red-800">View Offers</div>
                              </div>

                            </div>

                            <div className="offersSection_1 mt-20">
                              
                              <div className="offersSection_1_left">
                                <img alt="travalogy" src="http://localhost:3000/assets/imgs/page/homepage1/flight3.png" />
                              </div>
                              
                              <div className="offersSection_1_right p-20 relative">
                                <span className="text-lg-medium">Recharge Yourself with a Relaxing Stay:</span>
                                <div className="text-md-small neutral-500">Grab Up to 25% Savings* on Stays @ Trident
                                <br /> Hotels!</div>
                                <div className="view_offer text-md-medium mt-10 bg-red-800">View Offers</div>
                              </div>

                            </div> 
                          </SwiperSlide>

                             <SwiperSlide>
                            <div className="offersSection_1">
                              
                              <div className="offersSection_1_left">
                                <img alt="travalogy" src="https://promos.makemytrip.com/appfest/2x//j-and-k-116x116-19022025.jpg?im=Resize=(134,134)" />
                              </div>
                              
                              <div className="offersSection_1_right p-20 relative">
                                <span className="text-lg-medium">Recharge Yourself with a Relaxing Stay:</span>
                                <div className="text-md-small neutral-500">Grab Up to 25% Savings* on Stays @ Trident
                                <br /> Hotels!</div>
                                <div className="view_offer text-md-medium mt-10 bg-red-800">View Offers</div>
                              </div>

                            </div>

                            <div className="offersSection_1 mt-20">
                              
                              <div className="offersSection_1_left">
                                <img alt="travalogy" src="http://localhost:3000/assets/imgs/page/homepage1/flight2.png" />
                              </div>
                              
                              <div className="offersSection_1_right p-20 relative">
                                <span className="text-lg-medium">Recharge Yourself with a Relaxing Stay:</span>
                                <div className="text-md-small neutral-500">Grab Up to 25% Savings* on Stays @ Trident
                                <br /> Hotels!</div>
                                <div className="view_offer text-md-medium mt-10 bg-red-800">View Offers</div>
                              </div>

                            </div> 
                          </SwiperSlide>

                             <SwiperSlide>
                            <div className="offersSection_1">
                              
                              <div className="offersSection_1_left">
                                <img alt="travalogy" src="https://promos.makemytrip.com/notification/xhdpi//116X116-icici-ih-13102023.jpg?im=Resize=(134,134)" />
                              </div>
                              
                              <div className="offersSection_1_right p-20 relative">
                                <span className="text-lg-medium">Recharge Yourself with a Relaxing Stay:</span>
                                <div className="text-md-small neutral-500">Grab Up to 25% Savings* on Stays @ Trident
                                <br /> Hotels!</div>
                                <div className="view_offer text-md-medium mt-10 bg-red-800">View Offers</div>
                              </div>

                            </div>

                            <div className="offersSection_1 mt-20">
                              
                              <div className="offersSection_1_left">
                                <img alt="travalogy" src="http://localhost:3000/assets/imgs/page/homepage5/media.png" />
                              </div>
                              
                              <div className="offersSection_1_right p-20 relative">
                                <span className="text-lg-medium">Recharge Yourself with a Relaxing Stay:</span>
                                <div className="text-md-small neutral-500">Grab Up to 25% Savings* on Stays @ Trident
                                <br /> Hotels!</div>
                                <div className="view_offer text-md-medium mt-10 bg-red-800">View Offers</div>
                              </div>

                            </div> 
                          </SwiperSlide>
                          

                    </Swiper>
                </div>
              </div>
            </div>
          </div>
        
        </div>
  )
};



const items = [
  {
    key: '1',
    label: <span className="text-sm-medium">All Offers</span>,
    children: <AllOffersList />,
  },
  {
    key: '2',
    label: <span className="text-sm-medium">Hotels</span>,
    children: <SortHotelsFilterApp />,
  },
  {
    key: '3',
    label: <span className="text-sm-medium">Flights</span>,
    children: <AllOffersList />,
  },
  {
    key: '4',
    label: <span className="text-sm-medium">Holidays</span>,
    children: <AllOffersList />,
  },
  // {
  //   key: '5',
  //   label: <span className="text-sm-medium">Trains</span>,
  //   children: 'Content of Tab Pane 3',
  // },
  // {
  //   key: '6',
  //   label: <span className="text-sm-medium">Cabs</span>,
  //   children: 'Content of Tab Pane 3',
  // },
  // {
  //   key: '7',
  //   label: <span className="text-sm-medium">Bank Offers</span>,
  //   children: 'Content of Tab Pane 3',
  // },
];



const MicroallOffersPage = () => {
  return (
    <>
      <h2 className="neutral-1000 mt-20 mb-4">Offers</h2>
      <div className="offermicro_section mb-8">
        <Tabs defaultActiveKey="1" onChange={onChange}>
          {items.map((item, index) => (
            <Tabs.TabPane tab={item.label} key={index}>
              {item.children} {/* The content of the tab */}
            </Tabs.TabPane>
          ))}
        </Tabs>

      </div>
    </>
  );
};

export default MicroallOffersPage;
