'use client'

import BookingForm from "@/components/elements/BookingForm";
import Layout from "@/components/layout/Layout";
import { postDataFareDetails, postDataFlightDetails } from "@/services/NetworkAdapter";
import { AppContext } from "@/util/AppContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import FareRuleTabs from "./cancelattion.jsx"
import { Timeline } from "antd";


const Page = () => {
  const searchParams = useSearchParams();
  const priceId = searchParams.get('tcs_id'); 
  const [flightData, setFlightData] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const { getCookie } = useContext(AppContext);

  const[fareDetails,setFareDetails]=useState(null)

  const [travellers, setTravellers] = useState([]);
  const [email, setEmail] = useState(null);
  const [number, setNumber] = useState(null);

  const[totalPriceinfo,setTotalpriceinfo]=useState(null)


   const router = useRouter();
  useEffect(() => {
    const data = getCookie('travellerInfo');
    if (data) {
      try {
        console.log(data)
        const parsedData = JSON.parse(data);
        setTravellers(parsedData);
      } catch (err) {
        console.error('Invalid JSON in cookie:', err);
      }
    }
  }, []);

  useEffect(() => {
    const data = getCookie("email");
    if (data) {
      try {
        console.log(data)
        const parsedData = JSON.parse(data);
        setEmail(parsedData);
      } catch (err) {
        console.error('Invalid JSON in cookie:', err);
      }
    }
  }, []);

  useEffect(() => {
    const data = getCookie("number");
    if (data) {
      try {
        console.log(data)
        const parsedData = JSON.parse(data);
        setNumber(parsedData);
      } catch (err) {
        console.error('Invalid JSON in cookie:', err);
      }
    }
  }, []);
  
  // Function to fetch flight details
  const fetchFlightDetails = async (priceId) => {
    setLoading(true);
    setError(null);

    if (!priceId) {
      setError("Price ID is missing");
      setLoading(false);
      return;
    }

    try {
      const parameter = { priceIds: [priceId] };
      console.log("Fetching with parameter FOR REVIEW:", parameter);

      const data = await postDataFlightDetails(parameter);
      console.log("Flight detailsssss FOR REVIEW:", data);
      setFlightData(data); // Update state with flight details
    } catch (err) {
      console.error("error caused", err);
  
      if (err?.response?.data?.errors?.length) {
        const firstError = err.response.data.errors[0];
        const message = firstError?.message || 'An unknown error occurred.';
        const details = firstError?.details ? ` - ${firstError.details}` : '';
        setError(`${message}`);
  
        console.log("API error message:", message);
        console.log("Error details:", details);
        console.log("Error status code:", err.response.status);
      } else if (err?.message) {
        setError(err.message);
        console.log("Generic error message:", err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

//to fetch fare rule
const fetchFareRule = async (params) => {
  setLoading(true);
  setError(null);

  
  try {
    console.log("Fetching FARERULE with parameter:", params);
    const data = await postDataFareDetails(params);
    console.log("Flight details FROM FARERULE:", data);
    setFareDetails(data)
   
  } catch (err) {
    console.error("error caused", err);

    if (err?.response?.data?.errors?.length) {
      const firstError = err.response.data.errors[0];
      const message = firstError?.message || 'An unknown error occurred.';
      const details = firstError?.details ? ` - ${firstError.details}` : '';
      setError(`${message}`);

      console.log("API error message:", message);
      console.log("Error details:", details);
      console.log("Error status code:", err.response.status);
    } else if (err?.message) {
      setError(err.message);
      console.log("Generic error message:", err.message);
    } else {
      setError("Something went wrong. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};




  // UseEffect to call the function when 'tcs_id' is available in the search params
  useEffect(() => {
    console.log("Extracted tcs_id:", priceId); // Debug log to check if tcs_id is correct
    if (priceId) {
      fetchFlightDetails(priceId);
    } else {
      setError("No valid tcs_id found in the URL.");
    }
  }, [priceId]);


  useEffect(() => {
    console.log("Extracted tcs_id:", priceId);
    if (priceId) {
      fetchFareRule({ id: [priceId], flowType: "SEARCH" });
    } else {
      setError("No valid tcs_id found in the URL.");
    }
  }, [priceId]);
  

  const BookingSkeleton = () => {
    return (
      <section className="section-box block-content-book-tickets background-card">
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



  // Trip info
  const segments = flightData?.tripInfos.flatMap(trip => trip.sI) ?? [];
  const totalpriceinfos = flightData?.tripInfos.flatMap(trip => trip.totalPriceList) ?? [];
  const flightNames = segments.map(segment => segment.fD?.aI?.name);
  const flightnumber = segments.map(segment => segment.fD?.fN);
  const flighteT=segments.map(segment => segment.fD?.eT);
  const flightcode=segments.map(segment => (segment.fD?.aI?.code).toLowerCase());
  const stops = segments.map(segment => 
    segment.stops === 0 ? "Non Stop" : `${segment.stops} Stop${segment.stops > 1 ? 's' : ''}`
  );
  const duration = segments.map(segment => {
    if (!segment.duration) return "";
  
    const hours = Math.floor(segment.duration / 60);
    const minutes = segment.duration % 60;
  
    return `${hours}h ${minutes}m`;
  });
  const dt = segments.map(segment => segment.dt.split("T")[1]);
  const at = segments.map(segment => segment.at.split("T")[1]);
  const dcountry = segments.map(segment => segment.da?.country);
  const dcity = segments.map(segment => segment.da?.city);
  const dcitycode=segments.map(segment => segment.da?.code);

  const acountry = segments.map(segment => segment.aa?.country);
 const aterminal=segments.map(segment => segment.aa?.terminal);
 const acity=segments.map(segment => segment.aa?.city);
 const acitycode=segments.map(segment => segment.aa?.code);
  const aairportname=segments.map(segment => segment.aa?.name);
  const dairportname = segments.map(segment => segment.da?.name);
  const terminal = segments.map(segment => segment.da?.terminal);
 
  // Search query
  const routeinfo = flightData?.searchQuery?.routeInfos ?? [];
  const fromCity = routeinfo.map((e) => e.fromCityOrAirport?.city);
  const toCity = routeinfo.map((e) => e.toCityOrAirport.city);
  const traveldata = routeinfo.map((e) => e.travelDate);

  // Total price info
  useEffect(() => {
    if (flightData?.totalPriceInfo?.totalFareDetail) {
      setTotalpriceinfo(flightData.totalPriceInfo.totalFareDetail);
    }
  }, [flightData]);
  const fd = totalpriceinfos.map(e => e.fd) ?? {};
  const fareIdentifier = totalpriceinfos.map(e => e.fareIdentifier) ?? {};
  const cabinclass = fd.map((e) => e.ADULT?.cc);
  const refundabletype=fd.map((e)=>e.ADULT?.rT===0?"Refundable":"non-refundable")
  
  //totalfare
  const totalprice=flightData?.totalPriceInfo?.totalFareDetail?.fC?.TF

  //fare rule api
  const fareRule = fareDetails?.fareRule?.[`${dcitycode}-${acitycode}`]?.tfr;

const cancellation = fareRule?.CANCELLATION ?? [];
const noShow = fareRule?.NO_SHOW ?? [];
const dateChange = fareRule?.DATECHANGE ?? [];

// Cancellation
const cancellationAmount = cancellation.map((e) => e.amount);
const cancellationPolicy = cancellation.map((e) => e.policyInfo);
const cancellationPenaltyPeriod = cancellation.map((e) => e.pp);
const cancellationFee = cancellation.map((e) => e.fcs?.ACF);

// No Show
const noShowPolicy = noShow.map((e) => e.policyInfo);
const noShowPenaltyPeriod = noShow.map((e) => e.pp);

// Date Change
const dateChangeAmount = dateChange.map((e) => e.amount);
const dateChangePolicy = dateChange.map((e) => e.policyInfo);
const dateChangePenaltyPeriod = dateChange.map((e) => e.pp);
const dateChangeFee = dateChange.map((e) => e.fcs?.ARF);
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

  let date = new Date(traveldata);

  // Subtract one day (24 hours in milliseconds)
  date.setDate(date.getDate() - 1);
  
  // Format the new date in the desired format (e.g., "Monday, April 28, 2025")
  const options = { 
    weekday: 'long', // Include the day of the week
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return ( 
    <>
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
                  <span className="text-breadcrumb">Booking</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="section-box block-content-book-tickets background-card">
            <div className="container pt-1">
              <h4 className="neutral-1000">Review</h4>
              {loading?(<BookingSkeleton />):
              (<><div className="row mt-20">
                <div className="col-lg-8">
                  {/* <div className="box-content-tickets-detail flex flex-row items-center gap-3 p-3">
                    <p className="text-sm-medium neutral-500 totalduration">{fromCity}</p>
                    <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-right"
          viewBox="0 0 16 16"
        > 
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 
            .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 
            8.5H1.5A.5.5 0 0 1 1 8"
          />
        </svg>
        <p className="text-sm-medium neutral-500 totalduration">{toCity}</p>
        <p className="text-sm-medium neutral-500 totalduration">on</p>
        <p className="text-sm-medium neutral-500 totalduration">{formattedDate||null}</p>
                  </div> */}

                  <section aria-labelledby="applicant-information-title" className="mt-20">
                    <div className="bg-white shadow sm:rounded-lg relative p-3 mb-30">
                      {/* <div className="px-4 py-3 border_xcolor_1px flex flex-row justify-between items-center">
                        <div className="flex flex-col justify-between">
                          <div>
                            {flightNames}{flightnumber}
                          </div>
                          <div>
                            {fareIdentifier}
                          </div>
                        </div>
                        <div>
                          <p>{dt}</p>
                          <p>{dcountry},{dcity}</p>
                          <p>{dairportname}</p>
                          <p>{terminal}</p>
                        </div>
                        <div>
                          <p>{dt}</p>
                          <p>{dcountry},{dcity}</p>
                          <p>{dairportname}</p>
                          <p>{terminal}</p>
                        </div>
                        <div>{cabinclass}</div>
                      </div> */}

  {/* header */}
<div className="flex flex-row justify-between items-center">
<div className="flex flex-row gap-3 items-center ">
        <p className="text-xl-bold neutral-1000 mb-5">{fromCity||"DELHI"} <span>({dcitycode})</span></p>
        <p className="text-xl-bold neutral-1000"><svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-right"
          viewBox="0 0 16 16"
        > 
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 
            .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 
            8.5H1.5A.5.5 0 0 1 1 8"
          />
        </svg></p>
        <p className="text-xl-bold neutral-1000 mb-5">{toCity||"DELHI"} <span>({acitycode})</span></p>
        <div>
        <p className="text-sm-medium neutral-500">{formattedDate||null}</p>
      </div>
      </div>
      
</div>
  
{/* //flight information */}
<div className="flex flex-row mt-3 items-center gap-3 mb-3">

<div className=" flex flex-row justify-between items-center">
                        
                        <div className="flex flex-row gap-2">
                         [<p className="text-sm-medium neutral-500">{dcountry},{dcity}</p>|
                          <p className="text-sm-medium neutral-500">{dairportname}</p>|
                          <p className="text-sm-medium neutral-500">{terminal}</p>]
                        </div>
                        
                      </div>
    

<div>
<svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-right"
          viewBox="0 0 16 16"
        > 
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 
            .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 
            8.5H1.5A.5.5 0 0 1 1 8"
          />
        </svg>
</div>

    
<div className=" flex flex-row justify-between items-center">
                        
<div className="flex flex-row gap-2 ">
                         [ <p className="text-sm-medium neutral-500">{acountry},{acity}</p>|
                          <p className="text-sm-medium neutral-500">{aairportname}</p>|
                          <p className="text-sm-medium neutral-500">{aterminal}</p>]
                        </div>
                        
                      </div>
    

</div>
{/* //flightname and code
       */}
         <div className="flex flex-row justify-between">
          
         <div className="logo-flight flex flex-row gap-3 items-center mb-20">
                                                                        {/* <img
                                                                            src={`/assets/imgs/airlines/${flightcode}.png`}
                                                                            
                                                                        /> */}
                                                                        <div className="text-md-medium neutral-500">
                                                                          {flightNames}
                                                                        </div>
                                                                        <div className="text-md-medium neutral-500">
                                                                          {flightnumber}
                                                                        </div>
                                                                        <div className="text-md-medium neutral-500 border border-black-200 rounded-lg pl-10 pr-10">
                                                                          {flighteT}
                                                                        </div>
                                                                        
                                                                    </div>

                  <div className="flex flex-row items-center gap-3">
                    <p className="text-sm-medium neutral-500 ">{cabinclass} 
                     </p>
                     <span
                className="fareidentifier text-xs font-bold"
                style={{
                  backgroundColor: 'rgb(245, 222, 179)',
                  color: 'rgb(92, 64, 51)',
                  padding: '1px 2px',
                }} 
              >
                {fareIdentifier}
              </span>
                   
                  </div>

         </div>

         {/* //cancelattion */}
   <p className="text-md-bold neutral-1000 mb-10 mt-10">Cancellation</p>
   <Timeline className="pl-50" style={{ paddingBottom: 0 }}>
      {cancellation.map((item, index) => (
        <>
          {/* Timeline Item for Amount */}
          <Timeline.Item key={`amount-${index}`}>
            <p className="text-small neutral-500 mr-30"><strong>Amount:</strong> ₹{item.amount}</p>
          </Timeline.Item>

          {/* Timeline Item for Policy */}
          <Timeline.Item key={`policy-${index}`}>
            <p className="text-small neutral-500 mr-30"><strong>Policy:</strong> {item.policyInfo}</p>
          </Timeline.Item>

          {/* Timeline Item for Penalty Applies */}
          <Timeline.Item key={`penalty-${index}`} style={{ paddingBottom: 0 }}>
            <p className="text-small neutral-500 mr-30"><strong>Penalty Applies:</strong> {item.pp}</p>
          </Timeline.Item>

          {/* Timeline Item for Fee (ACF) */}
          
        </>
      ))}
    </Timeline>



    <p className="text-md-bold neutral-1000 mb-10 mt-10">No show</p>
   <Timeline className="pl-50">
      {noShow.map((item, index) => (
        <>
          {/* Timeline Item for Amount */}
          <Timeline.Item key={`amount-${index}`}>
            <p className="text-small neutral-500 mr-30"><strong>Amount:</strong> ₹{item.policyInfo}</p>
          </Timeline.Item>

          {/* Timeline Item for Policy */}
          <Timeline.Item key={`policy-${index}`} style={{ paddingBottom: 0 }}>
            <p className="text-small neutral-500 mr-30"><strong>Policy:</strong> {item.pp}</p>
          </Timeline.Item>
        </>
      ))}
    </Timeline>

    <p className="text-md-bold neutral-1000 mb-10 mt-10">Date Change</p>
    <div className="flex flex-row items-start justify-start  gap-5">
    
    <Timeline className="pt-5 pl-50">
      {dateChange.map((item, index) => (
        
        <>
          {/* Timeline Item for Amount */}
          <Timeline.Item>
            <p className="text-small neutral-500 mr-30"><strong>Amount:</strong> ₹{item.amount}</p>
          </Timeline.Item>

          {/* Timeline Item for Policy */}
          <Timeline.Item>
            <p className="text-small neutral-500 mr-30"><strong>Policy:</strong> {item.policyInfo}</p>
          </Timeline.Item>

          {/* Timeline Item for Penalty Applies */}
          <Timeline.Item style={{ paddingBottom: 0 }}>
            <p className="text-sm-medium neutral-500"><strong>Penalty Applies:</strong> {item.pp}</p>
          </Timeline.Item>

         
        </>
      ))}
    </Timeline>

    </div>
    
    
                      {/* <div className="item-flight background-card border border-black-200 ticket-container relative flex flex-row justify-between items-center p-5">
  <div className="air_detailes border border-black-200">{flightNames }</div>

  <div className="flight-route flight-route-type-2 city1">
    <div className="flight-route-1">
      <div className="flight-name">
        <div className="flight-info flex flex-col justify-center items-center  ">
          <p className="text-md-bold neutral-1000 city1name">
            {dcity}
             <span className="text-md-bold neutral-1000"> {`(${dcitycode})`}</span>
          </p>
          <p className="text-sm-medium time-flight timelogo">
            <span className="neutral-1000 time">{dt}</span>
          </p>
        </div>
      </div>
    </div>
  </div>

  <div className="flight-route flight-route-type-2 city1">
    <div className="flight-route-1">
      <div className="flight-name duration flex flex-col items-center align-center">
        <p className="text-sm-medium neutral-500 totalduration">{duration}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 
            .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 
            8.5H1.5A.5.5 0 0 1 1 8"
          />
        </svg>
        <p className="text-sm-medium neutral-500 totalduration">{stops}</p>
      </div>
    </div>
  </div>

  <div className="flight-route flight-route-type-2 city1">
    <div className="flight-route-1">
      <div className="flight-name">
        <div className="flight-info flex flex-col items-center align-center">
          <p className="text-md-bold neutral-1000 align-center city1name">
            {acity} <span className="text-md-bold neutral-1000 citycode">{`(${acitycode})`}</span>
          </p>
          <p className="text-sm-medium time-flight timelogo">
            <span className="neutral-1000 time">{at}</span>
          </p>
        </div>
      </div>
    </div>
  </div>

  <div
    className="flight-price-1 border-1 price-div flex justify-center items-center flex-col"
    style={{ width: '245px', paddingLeft: '20px' }}
  >
    <div className="ant-radio-group ant-radio-group-outline fare-options flex flex-col gap-2 w-full css-dev-only-do-not-override-1261szd">
      <label className="ant-radio-wrapper ant-radio-wrapper-checked w-full radiocomp css-dev-only-do-not-override-1261szd">
       
        <span className="ant-radio-label">
          <div className="p-0 rounded-lg border-2 transition-all duration-200 radiodiv border-gray-300 hover:border-gray-500">
            <div className="flex flex-row gap-2 items-center">
              <div className="text-lg font-bold text-gray-800 price">₹{totalprice}</div>
              <span
                className="fareidentifier text-xs font-bold"
                style={{
                  backgroundColor: 'rgb(245, 222, 179)',
                  color: 'rgb(92, 64, 51)',
                  padding: '1px 2px',
                }} 
              >
                {fareIdentifier}
              </span>
            </div>
            <div className="text-xs text-gray-600">
              <span className="ml-2 cabinclass">
               {cabinclass} | <span className="refundable">{refundabletype}</span>
              </span>
            </div>
          </div>
        </span>
      </label>
    </div>
  </div>

 
</div> */}

                      

                      {/* Form */}
                      <form id="validateOnly" autoComplete="off" className="ant-form ant-form-vertical p-6">
                        <div className="ant-row" style={{ marginLeft: "-8px", marginRight: "-8px" }}>
                          {/* Country Code */}
                          <div className="ant-col ant-col-6" style={{ paddingLeft: "8px", paddingRight: "8px",  }}>
                            <div className="ant-form-item">
                              <p className="text-lg-bold neutral-1000 mb-10 ">Passenger information</p>
                              <table className="w-full border-collapse mb-20 " >
  <thead style={{borderBottom:"grey 1px solid"}}>
    <tr>
      <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">S.No</th>
      <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">Mr/Mrs</th>
      <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">First Name</th>
      <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">Last Name</th>
    </tr>
  </thead> 
  <tbody>
  {travellers.length > 0 ? (
    travellers.map((traveller, index) => {
      // Log for debugging, check the content of traveller
      console.log(`Traveller ${index + 1} Title:`, traveller?.ti);

      return (
        <tr key={index}>
          <td className="px-4 py-3 border-b border-gray-200 text-black">{index + 1}</td>
          <td className="px-4 py-3 border-b border-gray-200 text-black">
            {traveller?.ti?.trim() || "N/A"}
          </td>
          <td className="px-4 py-3 border-b border-gray-200 text-black">
            {traveller?.fN?.trim() || "N/A"}
          </td>
          <td className="px-4 py-3 border-b border-gray-200 text-black">
            {traveller?.lN?.trim() || "N/A"}
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td className="px-4 py-3 border-b border-gray-200 text-black">1</td>
      <td className="px-4 py-3 border-b border-gray-200 text-black">N/A</td>
      <td className="px-4 py-3 border-b border-gray-200 text-black">N/A</td>
      <td className="px-4 py-3 border-b border-gray-200 text-black">N/A</td>
    </tr>
  )}
</tbody>

</table>


                            </div>
                          </div>
                        
                        

                          {/* Email and Phone Number */}
                          <div className="ant-col ant-col-6 mt-30 mb-30" style={{ paddingLeft: "8px", paddingRight: "8px" }}>
                          <p className="text-lg-bold neutral-1000 mb-10 ">Contact information</p>
                            <div className="ant-form-item">
                              <div className="text-md neutral-1000 ">Email: <strong>{email ? email : "No email available"}</strong> </div>
                              <div className="text-md neutral-1000 ">Phone Number: <strong><strong>
  {number?.code && number?.number
    ? `${number.code} ${number.number}`
    : "No phone number available"}
</strong>
</strong> </div>
                            </div>
                          </div>
                        </div>
                        
                      </form>
                      
                      
                      {/* Buttons */}
                      <div className="bg-white shadow sm:rounded-lg relative">
                        <div className="px-4 py-3 border_xcolor_1px flex justify-between">
                        <Link href={`/book-ticket?tcs_id=${priceId}`} className="cursor-pointer border-2 border-black px-4 py-2 bg-yellow-300 hover:bg-yellow-400 transition text-black">
  Back
</Link>
                          <button className="cursor-pointer border-2 border-black px-4 py-2 bg-yellow-300 hover:bg-yellow-400 transition" >Continue</button>
                        </div>
                      </div>
                    </div>
                    
                  </section>
                </div>

                {/* Right Column: Fare Summary */}
                <div className="col-lg-4">
                  <div className="booking-form add_sticky">
                  <div class="head-booking-form"><p class="text-xl-bold neutral-1000">Fare Summary</p></div>
                    <BookingForm totalpricee={totalPriceinfo} />
                  </div>
                </div>
              </div></>)}
                            {error && <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white border-2 border-black w-96 p-6 rounded-lg text-center shadow-lg">
                          <p className="text-red-600 mb-4 font-semibold">Error: {error}</p>
                                 
                            <button className="border-2 border-black px-4 py-2 bg-gray-100 hover:bg-gray-200 transition" onClick={searchTickets}>
                           Ok, Got It
                           </button>
                                
                              </div>
                            </div>}
              
              
            </div>
            
           
 
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Page;
 