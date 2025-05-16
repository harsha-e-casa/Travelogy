"use client"

import BookingForm from "@/components/elements/BookingForm";
import Layout from "@/components/layout/Layout"
import "./Alldetials"
import { AppContext } from "@/util/AppContext";
import Link from "next/link"

import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Alldetails from "./Alldetials";

const page=()=>{
    const router=useRouter()
    const searchParams = useSearchParams();
    const priceId = searchParams.get('tcs_id');
    const bookingId=searchParams.get('booking_id')
    
    const BookingSkeleton = () => {
        return (
          <section className="section-box block-content-book-tickets background-card mb-20">
            <div className="container pt-1">
              <div className="h-6 bg-gray-300 rounded w-1/4 mb-4 animate-pulse"></div>
      
              <div className="row mt-20">
                <div className="col-lg-8">
                  <div className="box-content-tickets-detail p-3 flex gap-3 items-center bg-gray-100 animate-pulse rounded">
                    <div className="w-24 h-4 bg-gray-300 rounded" />
                    <div className="w-4 h-4 bg-gray-400 rounded-full" />
                    <div className="w-24 h-4 bg-gray-300 rounded" />
                    <div className="w-10 h-4 bg-gray-300 rounded" />
                    <div className="w-32 h-4 bg-gray-300 rounded" />
                  </div>
      
                  <div className="mt-10 bg-white shadow rounded-lg p-6">
                    <div className="h-4 w-1/3 bg-gray-300 rounded mb-6 animate-pulse"></div>
      
                    <div className="item-flight border border-black-200 rounded p-5 mb-6 animate-pulse flex flex-col gap-4">
                      <div className="h-4 w-40 bg-gray-300 rounded" />
                      <div className="flex justify-between">
                        <div className="flex flex-col gap-2">
                          <div className="h-4 w-24 bg-gray-300 rounded" />
                          <div className="h-3 w-20 bg-gray-200 rounded" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="h-4 w-24 bg-gray-300 rounded" />
                          <div className="h-3 w-20 bg-gray-200 rounded" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="h-4 w-24 bg-gray-300 rounded" />
                          <div className="h-3 w-20 bg-gray-200 rounded" />
                        </div>
                      </div>
                    </div>
      
                    <div className="h-4 w-1/3 bg-gray-300 rounded mb-6 animate-pulse"></div>
      
                    <div className="h-24 bg-gray-200 rounded mb-6"></div>
                    <div className="h-20 bg-gray-200 rounded mb-6"></div>
      
                    <div className="flex justify-between mt-6">
                      <div className="h-10 w-24 bg-gray-300 rounded"></div>
                      <div className="h-10 w-24 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
      
                <div className="col-lg-4">
                  <div className="h-96 bg-gray-200 rounded add_sticky animate-pulse"></div>
                </div>
              </div>
            </div>
          </section>
        );
      };
    
    
    //get the review detaisl from the context
    const {
        flightData,
        error,
        loading,
        fetchFlightDetails,
        travelerInfo,
        email,
        number,
        getCookie,
        setLoading,
        setError
      } = useContext(AppContext);

     



    //   const fetchFlightDetails = async (priceId) => {
    //     setLoading(true);
    //     setError(null);
    
    //     if (!priceId) {
    //       setError("Price ID is missing");
    //       setLoading(false);
    //       return;
    //     }
    
    //     try {
    //       const parameter = { priceIds: [priceId] };
         
    
    //       const data = await postDataFlightDetails(parameter);
    //       console.log("Flight detailsssss FOR REVIEW:", data);
    //       setFlightData(data); // Update state with flight details
    //     } catch (err) {
    //       console.error("error caused", err);
      
    //       if (err?.response?.data?.errors?.length) {
    //         const firstError = err.response.data.errors[0];
    //         const message = firstError?.message || 'An unknown error occurred.';
    //         const details = firstError?.details ? ` - ${firstError.details}` : '';
    //         setError(`${message}`);
      
    //         console.log("API error message:", message);
    //         console.log("Error details:", details);
    //         console.log("Error status code:", err.response.status);
    //       } else if (err?.message) {
    //         setError(err.message);
    //         console.log("Generic error message:", err.message);
    //       } else {
    //         setError("Something went wrong. Please try again.");
    //       }
    //     } 
    //   };
    //   useEffect(() => {
    //     console.log("Extracted tcs_id:", priceId); // Debug log to check if tcs_id is correct
    //     if (priceId) {
    //       fetchFlightDetails(priceId);
    //     } else {
    //       setError("No valid tcs_id found in the URL.");
    //     }
    //   }, [priceId]);    


      //to get the flightdeatails from the context
      useEffect(() => {
        if (priceId) {
          fetchFlightDetails(priceId);
        }
      }, [priceId]);

       //to send the priceinfo to the booking form
       const[totalPriceinfo,setTotalpriceinfo]=useState(null)

       useEffect(() => {
        if (flightData?.totalPriceInfo?.totalFareDetail) {
          setTotalpriceinfo(flightData.totalPriceInfo.totalFareDetail);
        }
      }, [flightData]);

     
      //for rounter when it is error
      const searchTickets = () => {

        let departureFrom = getCookie('gy_da')
        let arrivalTo = getCookie('gy_aa')
        let adults = getCookie('gy_adult')
        let children = getCookie('gy_child')
        let cabinType = getCookie('gy_class')
        let departDate = getCookie('gy_trd')
    
    
        const mydata = {
            departureFrom: departureFrom,
            arrivalTo: arrivalTo,
            adults: adults,
            children: children,
            cabinType: cabinType,
            departDate: departDate
        };
    
        const queryString = new URLSearchParams(mydata).toString(); // produces "id=10&date=1222"
    
        router.push(`/tickets?${queryString}`);
    
    };


    //getting the booking details

     
    
  
    return(<>
    <Layout headerStyle={1} footerStyle={1}>
            <main className="main">
              <section className="box-section box-breadcrumb background-body">
                <div className="container pt-1">
                  <ul className="breadcrumbs">
                    <li>
                      <Link href="/">Home</Link>
                      <span className="arrow-right">
                        <svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 11L6 6L1 1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                      </span>
                    </li>
                    <li>
                      <Link href="/">Tickets</Link>
                      <span className="arrow-right">
                        <svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 11L6 6L1 1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                      </span>
                    </li>
                    <li>
                    <Link href="/">Booking</Link>
                      <span className="arrow-right">
                        <svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 11L6 6L1 1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                      </span>
                    </li>
                    <li>
                      <span className="text-breadcrumb">Review</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* {loading?(<BookingSkeleton />):(<>  </>)} */}
              <section className="section-box  background-card">
          <div className="container pt-1">
            <div className="row">
              <div className="">
                
              <Alldetails bookingId={bookingId} />
                
              </div>

              <div className=" mt-20">
                  <div className="booking-form add_sticky">
                  <div class="head-booking-form"><p class="text-xl-bold neutral-1000">Fare Summary</p></div>
                    <BookingForm totalpricee={totalPriceinfo}  />
                  </div>
                </div>

            </div>
          </div>
         
        </section>
           
         {/* {error && <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white border-2 border-black w-96 p-6 rounded-lg text-center shadow-lg">
                          <p className="text-red-600 mb-4 font-semibold">Error: {error}</p>
                                 
                            <button className="border-2 border-black px-4 py-2 bg-gray-100 hover:bg-gray-200 transition" onClick={searchTickets}>
                           Ok, Got It
                           </button>
                                
                              </div>
                            </div>} */}

              </main>
              </Layout>
    </>)


}
export default page  