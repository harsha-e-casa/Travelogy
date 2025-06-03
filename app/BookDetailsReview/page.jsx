

   'use client'
import "./style.css"
import BookingForm from "@/components/elements/BookingForm";
import Layout from "@/components/layout/Layout";
import { postDataFareDetails, postDataFlightDetails, postDataTJBookingAir } from "@/services/NetworkAdapter";
import { AppContext } from "@/util/AppContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Tabs } from 'antd';


// import "./style.css"

import { format } from 'date-fns';
import * as React from 'react'; 


  


const page = () => {
//   const searchParams = useSearchParams();
//   const priceId = searchParams.get('bookId'); 
//   const [flightData, setFlightData] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
//   const { getCookie } = useContext(AppContext);

//   const[fareDetails,setFareDetails]=useState(null)

//   const [travellers, setTravellers] = useState([]);
//   const [email, setEmail] = useState(null);
//   const [number, setNumber] = useState(null);
//   console.log("number",number)
//   const[totalPriceinfo,setTotalpriceinfo]=useState(null)
//   const [showMore, setShowMore] = useState(false);

//    const router = useRouter();
//   useEffect(() => {
//     const data = getCookie('travellerInfo');
//     if (data) {
//       try {
//         console.log(data)
//         const parsedData = JSON.parse(data);
//         setTravellers(parsedData);
//       } catch (err) {
//         console.error('Invalid JSON in cookie:', err);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const data = getCookie("email");
//     if (data) {
//       try {
//         console.log(data)
//         const parsedData = JSON.parse(data);
//         setEmail(parsedData);
//       } catch (err) {
//         console.error('Invalid JSON in cookie:', err);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const data = getCookie("number");
//     if (data) {
//       try {
//         console.log(data)
//         const parsedData = JSON.parse(data);
//         setNumber(parsedData);
//       } catch (err) {
//         console.error('Invalid JSON in cookie:', err);
//       }
//     }
//   }, []);
  
//   // Function to fetch flight details
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
//       console.log("Fetching with parameter FOR REVIEW:", parameter);

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
//     } finally {
//       setLoading(false);
//     }
//   };

// //to fetch fare rule
// const fetchFareRule = async (params) => {
//   setLoading(true);
//   setError(null);

  
//   try {
//     console.log("Fetching FARERULE with parameter:", params);
//     const data = await postDataFareDetails(params);
//     console.log("Flight details FROM FARERULE:", data);
//     setFareDetails(
//       data)
   
//   } catch (err) {
//     console.error("error caused", err);

//     if (err?.response?.data?.errors?.length) {
//       const firstError = err.response.data.errors[0];
//       const message = firstError?.message || 'An unknown error occurred.';
//       const details = firstError?.details ? ` - ${firstError.details}` : '';
//       setError(`${message}`);

//       console.log("API error message:", message);
//       console.log("Error details:", details);
//       console.log("Error status code:", err.response.status);
//     } else if (err?.message) {
//       setError(err.message);
//       console.log("Generic error message:", err.message);
//     } else {
//       setError("Something went wrong. Please try again.");
//     }
//   } finally {
//     setLoading(false);
//   }
// };
//  useEffect(()=>{
// console.log("logged fare details",fareDetails)
//  },[fareDetails])


//  useEffect(()=>{
//   console.log("logged fflight details",flightData)
//    },[flightData])
  



//   // UseEffect to call the function when 'tcs_id' is available in the search params
//   useEffect(() => {
//     console.log("Extracted tcs_id:", priceId); // Debug log to check if tcs_id is correct
//     if (priceId) {
//       fetchFlightDetails(priceId);
//     } else {
//       setError("No valid tcs_id found in the URL.");
//     }
//   }, [priceId]);


//   useEffect(() => {
//     console.log("Extracted tcs_id:", priceId);
//     if (priceId) {
//       fetchFareRule({ id: [priceId], flowType: "SEARCH" });
//     } else {
//       setError("No valid tcs_id found in the URL.");
//     }
//   }, [priceId]);
  
  
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



//   // Trip info
//   const segments = flightData?.tripInfos.flatMap(trip => trip.sI) ?? [];
//   const totalpriceinfos = flightData?.tripInfos.flatMap(trip => trip.totalPriceList) ?? [];
//   const cabinBaggage=totalpriceinfos.map((e)=>e.fd?.ADULT?.bI?.iB)
//   const checkinBaggage=totalpriceinfos.map((e)=>e.fd?.ADULT?.bI?.cB)
//   const flightNames = segments.map(segment => segment.fD?.aI?.name);
//   const flightnumber = segments.map(segment => segment.fD?.fN);
//   const flighteT=segments.map(segment => segment.fD?.eT);
//   const flightcode=segments.map(segment => (segment.fD?.aI?.code).toLowerCase());
//   const stops = segments.map(segment => 
//     segment.stops === 0 ? "Non Stop" : `${segment.stops} Stop${segment.stops > 1 ? 's' : ''}`
//   );
//   const duration = segments.map(segment => {
//     if (!segment.duration) return "";
  
//     const hours = Math.floor(segment.duration / 60);
//     const minutes = segment.duration % 60;
  
//     return `${hours}h ${minutes}m`;
//   });
//   const dt = segments.map(segment => segment.dt.split("T")[1]);
//   const at = segments.map(segment => segment.at.split("T")[1]);
//   let departureDate=segments.map(segment => segment.dt);
//   const arrivalDate=segments.map(segment => segment.at);
//   const formatDepartureDate = (dateString) => {
//     if (!dateString || isNaN(new Date(dateString))) return '';
//     return format(new Date(dateString), 'EEE, dd MMM');
//   };
  
//   const formatArrivalDate = (dateString) => {
//     if (!dateString || isNaN(new Date(dateString))) return '';
//     return format(new Date(dateString), 'EEE, dd MMM');
//   };
  


//   const dcountry = segments.map(segment => segment.da?.country);
//   const dcity = segments.map(segment => segment.da?.city);
//   const dcitycode=segments.map(segment => segment.da?.code);

//   const acountry = segments.map(segment => segment.aa?.country);
//  const aterminal=segments.map(segment => segment.aa?.terminal);
//  const acity=segments.map(segment => segment.aa?.city);
//  const acitycode=segments.map(segment => segment.aa?.code);
//   const aairportname=segments.map(segment => segment.aa?.name);
//   const dairportname = segments.map(segment => segment.da?.name);
//   const terminal = segments.map(segment => segment.da?.terminal);
 
//   // Search query
//   const routeinfo = flightData?.searchQuery?.routeInfos ?? [];
//   const fromCity = routeinfo.map((e) => e.fromCityOrAirport?.city);
//   const toCity = routeinfo.map((e) => e.toCityOrAirport.city);
//   const traveldata = routeinfo.map((e) => e.travelDate);


//   //bookingid
// const bookingId=flightData?flightData.bookingId:null
// console.log("bookingId",bookingId)

//   // Total price info
//   useEffect(() => {
//     if (flightData?.totalPriceInfo?.totalFareDetail) {
//       setTotalpriceinfo(flightData.totalPriceInfo.totalFareDetail);
//     }
//   }, [flightData]);
//   const fd = totalpriceinfos.map(e => e.fd) ?? {};
//   const fareIdentifier = totalpriceinfos.map(e => e.fareIdentifier) ?? {};
//   const cabinclass = fd.map((e) => e.ADULT?.cc);
//   const refundabletype=fd.map((e)=>e.ADULT?.rT===0?"Refundable":"non-refundable")
  
//   //totalfare
//   const totalprice=flightData?.totalPriceInfo?.totalFareDetail?.fC?.TF

//   //fare rule api
//   const fareRule = fareDetails?.fareRule?.[`${dcitycode}-${acitycode}`]?.tfr;

// const cancellation = fareRule?.CANCELLATION ?? [];
// const noShow = fareRule?.NO_SHOW ?? [];
// const dateChange = fareRule?.DATECHANGE ?? [];
// const seatCharge=fareRule?.SEAT_CHARGEABLE?? [];
// console.log("checking",cancellation?.map((e=>e.pp)))

// // Cancellation
// const cancellationAmount = cancellation.map((e) => e.amount);
// const cancellationPolicy = cancellation.map((e) =>  e.policyInfo);
// const cancellationPenaltyPeriod = cancellation.map((e) => e.pp);
// const cancellationLength=cancellation.length
// console.log("lenght",cancellationLength)
// const cancellationFee = cancellation.map((e) => e.fcs?.ACF)
// const cancellationST=cancellation.map((e)=>e.st?? 0)
// const cancellationET=cancellation.map((e)=>e.et?? 365)




// const hasFareRules = fareRule && Object.keys(fareRule).length > 0;

// console.log("Has Fare Rules?", hasFareRules);
// // No Show
// const noShowPolicy = noShow.map((e) => e.policyInfo?.includes('__nls__') 
// ? e.policyInfo.replace(/__nls__/g, '')
// : e.policyInfo);
// const noShowPenaltyPeriod = noShow.map((e) => e.pp);
// const noShowST=noShow.map((e)=>e.st??0)
// const noShowET=noShow.map((e)=>e.et/24??365)

// // Date Change
// const dateChangeAmount = dateChange.map((e) => e.amount);
// const dateChangePolicy = dateChange.map((e) => e.policyInfo);
// const dateChangePenaltyPeriod = dateChange.map((e) => e.pp);
// const dateChangeFee = dateChange.map((e) => e.fcs?.ARF);
// const dateChangeSt=dateChange.map((e)=>e.st?? 0)
// const dateChangeEt=dateChange.map((e)=>e.et/24?? 365)


// //seat charge
// const seatChargeSt=seatCharge.map((e)=>e.st?? null)
// const seatChargeEt=seatCharge.map((e)=>e.et/24?? null)
//   const searchTickets = () => {

//     let departureFrom = getCookie('gy_da')
//     let arrivalTo = getCookie('gy_aa')
//     let adults = getCookie('gy_adult')
//     let children = getCookie('gy_child')
//     let cabinType = getCookie('gy_class')
//     let departDate = getCookie('gy_trd')


//     const mydata = {
//         departureFrom: departureFrom,
//         arrivalTo: arrivalTo,
//         adults: adults,
//         children: children,
//         cabinType: cabinType,
//         departDate: departDate
//     };

//     const queryString = new URLSearchParams(mydata).toString(); // produces "id=10&date=1222"

//     router.push(`/tickets?${queryString}`);

// };

//   let date = new Date(traveldata);

//   // Subtract one day (24 hours in milliseconds)
//   date.setDate(date.getDate() - 1);
  
//   // Format the new date in the desired format (e.g., "Monday, April 28, 2025")
//   const options = {
//     weekday: 'short', // Mon
//     month: 'short',   // Apr
//     day: 'numeric'    // 28
//   };
//   const formattedDate = date.toLocaleDateString('en-US', options);
//   const options2 = {
//     month: 'short',   // Apr
//     day: 'numeric'    // 28
//   };
//   const formatteddate2= date.toLocaleDateString('en-US', options2);
//   const items = [
    
//     {
//       label:  <span className="text-sm-medium neutral-500">CANCELLATION FEE</span>  ,
//       key: '2',
//       children: (<>
//        <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
//           {/* Table Header */}
//           <div className="grid grid-cols-2 bg-gray-100 font-semibold text-gray-700 p-3 text-sm">
//             <div>Time Frame</div>
//             <div>Cancellation Fee</div>
//           </div>
  
//           {/* Table Row */}
//           <div className="grid grid-cols-2  px-3 py-4 border-t border-gray-200 text-sm">
//             <div className="text-gray-700"> {cancellation?.some(item => item.st && item.et) ? (
//                    cancellation
//                      .filter(item => item.st && item.et)
//                      .map((item, index) => (
//                        <div key={index}>
//                          {`${item.st} hrs to ${item.et/24} days`}
//                        </div>
//                      ))
//                  ) : (
//                 <p>{cancellation.map((e)=>e.pp)}</p>
//               )}</div>


//             <div className="text-gray-600">
//               {cancellation?.some(e=>e.pp===undefined)?(<><p>{cancellationPolicy ? cancellationPolicy
              
//               .flatMap((item) =>
//                  item
//               .split("__nls__") 
//               .filter(Boolean)  
//       )
//       .map((line, index) => (
//         <div key={index}>{line.trim()}</div>
//       )) : null}</p></>)
//       :(
//                 <p> ₹{cancellationAmount?cancellationAmount:null} </p>)}
              
//             </div>
//           </div>
//         </div>

//         </>),
//     },
//     {
//       label:  <span className="text-sm-medium neutral-500">DATE CHANGE FEE</span>  ,
//       key: '3',
//       children: (
//         <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
//           {/* Table Header */}
//           <div className="grid grid-cols-2 bg-gray-100 font-semibold text-gray-700 p-3 text-sm border-b border-gray-300">
//             <div>Time Frame</div>
//             <div>Date Change Fee</div>
//           </div>
  
//           {/* Dividing line between header and content */}
//           <div className="grid grid-cols-2 items-center   px-3 py-4 border-t border-gray-200 text-sm">
//           <div className="text-gray-700 space-y-5"> {dateChange?.some(item => item.st && item.et) ? (
//     dateChange
//       .filter(item => item.st && item.et)
//       .map((item, index) => (
//         <div key={index}>
//         {`${item.st} hrs to ${item.et > 24 ? item.et / 24 + " days" : item.et + " hrs"}`}
//       </div>
//       ))
//   ) : (
//     <p>{cancellation.map((e)=>e.pp)}</p>
//   )}</div>
//             <div className="text-gray-600 space-y-5">
//               {dateChange.some(e=>e.pp===undefined)?(<>
//               <p className="">{dateChangePolicy?dateChangePolicy
//               .flatMap((item)=>item.split("__nls__").filter(Boolean)).map((e,i)=>(<div key={i}>{dateChange[i]?.amount}{e.trim()}</div>)):null}</p></>):
//               (<>
//                 <p> ₹{dateChangeAmount}</p></>)}
              
//             </div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       label:  <span className="text-sm-medium neutral-500">NO SHOW FEE</span> ,
//       key: '4',
//       children: (
//         <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
//           {/* Table Header */}
//           <div className="grid grid-cols-2 bg-gray-100 font-semibold text-gray-700 p-3 text-sm border-b border-gray-300">
//             <div>Time Frame</div>
//             <div>NoShow Fee</div>
//           </div>
  
//           {/* Dividing line between header and content */}
//           <div className="grid grid-cols-2 items-center  px-3 py-4 border-t border-gray-200 text-sm">
//           <div className="text-gray-700"> {noShow?.some(item => item.st && item.et) ? (
//     noShow
//       .filter(item => item.st && item.et)
//       .map((item, index) => (
//         <div key={index}>
//         {`${item.st} hrs to ${item.et > 24 ? item.et / 24 + " days" : item.et + " hrs"}`}
//       </div>
//       ))
//   ) : (
//     <p>{cancellation.map((e)=>e.pp)}</p>
//   )}</div>
//             <div className="text-gray-600">
//               <p>{noShowPolicy}</p>
              
//             </div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       label:  <span className="text-sm-medium neutral-500">SEAT CHARGABLE FEE</span> ,
//       key: '5',
//       children: (
//         seatCharge.length > 0 ? (
//           <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
//           {/* Table Header */}
//           <div className="grid grid-cols-2 bg-gray-100 font-semibold text-gray-700 p-3 text-sm border-b border-gray-300">
//             <div>Time Frame</div>
//             <div>Seat Chargeable Fee</div>
//           </div>
  
//           {/* Dividing line between header and content */}
//           <div className="grid grid-cols-2 items-center  px-3 py-4 border-t border-gray-200 text-sm">
//           <div className="text-gray-700"> {seatCharge?.some(item => item.st && item.et) ? (
//     seatCharge
//       .filter(item => item.st && item.et)
//       .map((item, index) => (
//         <div key={index}>
//         {`${item.st} hrs to ${item.et > 24 ? item.et / 24 + " days" : item.et + " hrs"}`}
//       </div>
//       ))
//   ) : (
//     <p>{cancellation.map((e)=>e.pp)}</p>
//   )}</div>
//             <div className="text-gray-600">
//               <p>{seatCharge.map((e)=>e.policyInfo)}</p>
              
//             </div>
//           </div>
//         </div>
//         ) : (
//           <div className="text-gray-500 italic p-4">No data available.</div>
//         )
      
//       ),
//     },
//   ];
  
//   const loadDataBook = async (parameter) => {
//     try {
//           console.log('final', parameter);
//         // Call your API function with the properly constructed parameter
//         const result = await postDataTJBookingAir(parameter);
//         console.log(result)
//           console.log('success');
//           router.push(`/BookingDetails?tcs_id=${priceId}&booking_id=${bookingId}`);


//     } catch (err) {
//         console.error('Error while fetching flight data:', err);

//         // Optionally, you can show an error message to the user here
//     }
// };

// // Function to handle booking review and trigger loadDataBook
// const bookingReview = () => {
//  console.log("traveelers",travellers)
//  console.log("totalprice bookingid",totalprice,bookingId)
//   if (Array.isArray(travellers) && travellers.length > 0) {

//   if (totalprice && bookingId) {
   
//       // handlePayment();
//       // openNotificationWithIcon('success');
//       // Build the parameter object without extra curly braces
//       const parameter = {
//           bookingId: bookingId,
//           paymentInfos: [
//               {
//                   amount: totalprice
//               }
//           ],
//           travellerInfo: travellers,
      
//           // travellerInfo: [
//               // {
//               //     ti: 'Mr',
//               //     fN: 'Karthik',
//               //     lN: 'AdultA',
//               //     pt: 'ADULT'
//               // }
//               // Uncomment and include more traveller details as needed:
//               // {
//               //   ti: 'Ms',
//               //   fN: 'Test',
//               //   lN: 'ChildA',
//               //   pt: 'CHILD'
//               // },
//               // {
//               //   ti: 'Master',
//               //   fN: 'Test',
//               //   lN: 'InfantA',
//               //   pt: 'INFANT',
//               //   dob: '2019-08-09'
//               // }
//           // ],
//           // gstInfo: { // Uncomment this section when needed
//           //   gstNumber: '07AAGCT7826A1ZF',
//           //   email: 'prabhu@technogramsolutions.com',
//           //   registeredName: 'TGS Pvt Ltd',
//           //   mobile: '9538500324',
//           //   address: 'gurugram'
//           // },
//           deliveryInfo: {
//               emails: [email],
//               contacts: [`${number.code}${number.number}`]
//           }
//       };
//       console.log("traveelerinfo",parameter.travellerInfo)
//       loadDataBook(parameter);

//   }else{
//       console.error('Adult Is empty');
//   }
//   } else {
//       // Handle case when totalpricee is not set
//       console.error('Total price is not set');
//   }
// };

return(<>

<Layout headerStyle={1} footerStyle={1}>
        <main className="main">
          {/* <section className="box-section box-breadcrumb background-body">
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
          </section> */}

          <section className="section-box  background-card">
            <div className="container pt-1">
              <h4 className="neutral-1000 mt-10">Booking Details</h4>
              <p  className="text-md-bold neutral-900 mt-10">Flight Booking</p>
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

                  <section aria-labelledby="applicant-information-title" className="mt-20 ">
                    <div className="bg-white  relative  mb-30">
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
  <div className="shadow rounded-md p-3">
  {/* header */}
  <div className="flex flex-col justify-start  items-start">
  {/* City and direction row */}
  <div className="flex flex-row gap-3 items-center mb-2">
    <p className="lg:text-xl-bold neutral-1000 cityname">{ "DELHI"} 
        {/* <span>({dcitycode})</span> */}
        </p>
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
    <p className="cityname neutral-1000">{
    // toCity ||
     "MUMBAI"} 
     {/* <span>({acitycode})</span> */}
     </p>
  </div>

<div className="flex flex-row gap-2">
<p className="neutral-500 departuredate ">{
// formattedDate ||
 "Tue, May 20"}</p>
  {/* Info list below the cities */}
  <ul className="flex flex-row gap-4 mb-20 text-sm-medium neutral-500 list-disc">
    
    <li className=" neutral-500 stops ">{
    // stops ||
     "No stops"}</li>
    <li className=" neutral-500 duration ">{
    // duration ||
     "2h 55m"}</li>
  </ul>
</div>
  
</div>

  
{/* //flight information */} 
{/* <div className="flex flex-row mt-3 items-center gap-3 mb-3">

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
    

</div> */}
{/* //flightname and code
       */}
         <div className="flex flex-col justify-start mb-5 md:flex-row md:justify-between md:mb-0">
          
         <div className="logo-flight flex flex-row gap-3 items-center mb-20">
                                                                        {/* <img
                                                                            src={`/assets/imgs/airlines/${flightcode}.png`}
                                                                            
                                                                        /> */}
                                                                        <div className=" flightdetails">
                                                                          flightNames
                                                                        </div>
                                                                        <div className="text-md-medium neutral-500 flightdetails">
                                                                          flightnumber
                                                                        </div>
                                                                        <div className="text-md-medium neutral-500 border border-black-200 rounded-lg pl-10 pr-10 flightdetails">
                                                                          flighteT
                                                                        </div>
                                                                        
                                                                    </div>

                  <div className="flex flex-row items-center gap-3 ">
                    <p className="text-sm-medium neutral-500 flightdetails ">cabinclass 
                     </p>
                     <span
                className="fareidentifier text-xs font-bold pl-10 pr-10 rounded-full flightdetails"
                style={{
                  backgroundColor: 'rgb(245, 222, 179)',
                  color: 'rgb(92, 64, 51)',
                  padding: '1px 2px',
                }} 
              >
                fareIdentifier
              </span>
                   
                  </div>

         </div>


         <div className=" flex flex-col md:flex-row justify-between ticketdiv  bg-gray-100 p-2 rounded-md  space-y-6 ">
    
    {/* Flight Timings */}
    <div className="flex justify-between items-center gap-5 ">
      <div className="text-left space-y-1">
        {/* <p className="text-sm text-gray-500">{formatDepartureDate(departureDate)}</p> */}
        <h4 className="dtat font-normal" >06.00</h4>
        <p className="text-sm-medium neutral-500 ">
            {/* `${dcity},${dcountry}` */}

        </p>
        <p className=" neutral-500 airportname ">dairportname</p>
        <p className=" neutral-1000 terminal ">terminal</p>
      </div>

      <div className="text-center space-y-1">
        <p className="text-sm-medium neutral-500 duration ">2h 25m</p>
        <img src="https://edge.ixigo.com/st/vimaan/_next/static/media/line.9641f579.svg" alt="flight line" className="mx-auto w-20 durationsvg" />
      </div>

      <div className="text-right space-y-1">
        {/* <p className="text-sm text-gray-500">{formatArrivalDate(arrivalDate)}</p> */}
        <h4 className="dtat font-normal" >15.00</h4>
        <p className="text-sm-medium neutral-500 ">
            {/* `${acity},${acountry}` */}

        </p>
        <p className="text-sm-medium neutral-500 airportname ">aairportname</p>
        <p className="text-sm-medium neutral-1000 terminal">aterminal</p>
      </div>
    </div>
  


    {/* Baggage Info */}
    <div className="flex flex-col items-start  gap-3">
      
      
      <div className="flex items-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-suitcase-lg-fill" viewBox="0 0 16 16">
  <path d="M7 0a2 2 0 0 0-2 2H1.5A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14H2a.5.5 0 0 0 1 0h10a.5.5 0 0 0 1 0h.5a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2H11a2 2 0 0 0-2-2zM6 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1zM3 13V3h1v10zm9 0V3h1v10z"/>
</svg>
        <p className="text-sm-bold neutral-900 cabindetails">Cabin: <span className="text-sm-medium neutral-500 cabindetails">cabinBaggage per adult</span></p>
      </div>
      <div className="flex items-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-suitcase2-fill" viewBox="0 0 16 16">
  <path d="M6.5 0a.5.5 0 0 0-.5.5V3H4.5A1.5 1.5 0 0 0 3 4.5v9a1.5 1.5 0 0 0 1.003 1.416A1 1 0 1 0 6 15h4a1 1 0 1 0 1.996-.084A1.5 1.5 0 0 0 13 13.5v-9A1.5 1.5 0 0 0 11.5 3H10V.5a.5.5 0 0 0-.5-.5zM9 3H7V1h2zM4 7V6h8v1z"/>
</svg>
        <p className="text-sm-bold neutral-900 cabindetails ">Check-in: <span className="text-sm-medium neutral-500 cabindetails ">checkinBaggage, per adult</span></p>
      </div>
    </div>

    
  </div>
  {/* <div className="mt-30 text-sm-medium neutral-1000 p-3 bg-blue-100">
  {`Got excess baggage? Don’t stress, buy extra check-in baggage allowance for ${dcitycode}-${acitycode} at fab rates!`}
    </div> */}
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
                      <form id="validateOnly" autoComplete="off" className="ant-form ant-form-vertical shadow rounded-md mt-50 p-3">
                        <div className="ant-row" style={{ marginLeft: "-8px", marginRight: "-8px" }}>
                          {/* Country Code */}
                          <div className="ant-col ant-col-6" style={{ paddingLeft: "8px", paddingRight: "8px",  }}>
                            <div className="ant-form-item">
                              <p className="text-xl-bold neutral-1000 mb-10 heading ">Passenger information</p>
                              <div className="overflow-x-auto w-full">
                              <table className="w-max border-collapse mb-20 " >
  <thead style={{borderBottom:"grey 1px solid"}}>
    <tr>
      <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300 t-head">S.No</th>
      <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300 t-head">Mr/Mrs</th>
      <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300 t-head">First Name</th>
      <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300 t-head">Last Name</th>
      <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300 t-head">Airline Pnr</th>
      <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300 t-head">Ticket Number</th>
      
    </tr>
  </thead> 
  <tbody>
  {/* {travellers.length > 0 ? (
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
  ) : ( */}
    <tr>
      <td className="px-4 py-3 border-b border-gray-200 text-black t-value">1</td>
      <td className="px-4 py-3 border-b border-gray-200 text-black t-value">N/A</td>
      <td className="px-4 py-3 border-b border-gray-200 text-black t-value">N/A</td>
      <td className="px-4 py-3 border-b border-gray-200 text-black t-value">N/A</td>
    </tr>
  
</tbody>

</table>
</div>


                            </div>
                          </div>
                        
                         
                          {/* Email and Phone Number */}
                          <div className="ant-col ant-col-6 mt-30 mb-30" style={{ paddingLeft: "8px", paddingRight: "8px" }}>
                          <p className="text-lg-bold neutral-1000 mb-10 heading">Contact information</p>
                            <div className="ant-form-item">
                              <div className="text-md neutral-1000 contactinfo  ">Email: <strong>{"No email available"}</strong> </div>
                              <div className="text-md neutral-1000 contactinfo ">Phone Number: <strong><strong>
  {/* number?.code && number?.number
    ? `${number.code} ${number.number}`
    :  */}
    "No phone number available"
</strong>
</strong> </div>
                            </div>
                          </div>

                        
                        </div>
                        
                       
                      </form>





                      <form id="validateOnly" autoComplete="off" className="ant-form ant-form-vertical shadow rounded-md mt-50 p-3">
                        <div className="ant-row" style={{ marginLeft: "-8px", marginRight: "-8px" }}>
                          {/* Country Code */}
                          <div className="ant-col ant-col-6" style={{ paddingLeft: "8px", paddingRight: "8px",  }}>
                            <div className="ant-form-item">
                              <p className="text-xl-bold neutral-1000 mb-10 heading ">Payment Information</p>
                              <div className="overflow-x-auto w-full">
      <table className="w-max border-collapse mb-20">
        <thead style={{ borderBottom: "grey 1px solid" }}>
          <tr>
            <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300 t-head">Created On</th>
            <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300 t-head">Medium</th>
            <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300 t-head">Booking Id</th>
            <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300 t-head">Type</th>
            <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300 t-head">Credit</th>
            <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300 t-head">Debit</th>
            <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300 t-head">Status</th>
            <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300 t-head">Deposit Amount</th>
           
            <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300 t-head">Booking User</th>
            <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300 t-head">Payment Ref</th>
            <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300 t-head">TDS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-3 border-b border-gray-200 text-black w-max t-value" >Jun 2, 2025  11:06 AM</td>
            <td className="px-4 py-3 border-b border-gray-200 text-black t-value">Deposit</td>
            <td className="px-4 py-3 border-b border-gray-200 text-blue-600 t-value">TJS100301470098</td>
            <td className="px-4 py-3 border-b border-gray-200 text-black t-value">Paid For Order</td>
            <td className="px-4 py-3 border-b border-gray-200 text-black t-value">₹0.00</td>
            <td className="px-4 py-3 border-b border-gray-200 text-black t-value">₹16,473.00</td>
            <td className="px-4 py-3 border-b border-gray-200 text-green-600 t-value">Success</td>
            <td className="px-4 py-3 border-b border-gray-200 text-black t-value">₹16,473.00</td>
            
            <td className="px-4 py-3 border-b border-gray-200 text-blue-600 t-value">Test User</td>
            <td className="px-4 py-3 border-b border-gray-200 text-black t-value">5693197024</td>
            <td className="px-4 py-3 border-b border-gray-200 text-black t-value">0</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td className="px-4 py-3 border-t font-bold text-black">Total</td>
            <td className="px-4 py-3 border-t" colSpan={3}></td>
            <td className="px-4 py-3 border-t text-black font-bold">₹0.00</td>
            <td className="px-4 py-3 border-t text-black font-bold">₹16,473.00</td>
            <td className="px-4 py-3 border-t" colSpan={4}></td>
            <td className="px-4 py-3 border-t text-black font-bold">₹16,473.00</td>
          </tr>
        </tfoot>
      </table>
    </div>


                            </div>
                          </div>
                        
                         
                           {/* Buttons */}
                      <div className="bg-white relative flex justify-between  flex-col">
                        <div className="mt-60 flex justify-between">
                        <Link  href="/"
                        // href={`/book-ticket?tcs_id=${priceId}`}
                         className="cursor-pointer border-2 border-black px-4 py-2 bg-yellow-300 hover:bg-yellow-400 transition text-black">
  Back
</Link>
<div onClick={""}  className="cursor-pointer border-2 border-black px-4 py-2 bg-yellow-300 hover:bg-yellow-400 transition text-black">continue</div>
                        </div>
                       
                      </div>

                        
                        </div>
                        
                       
                      </form>
                     
                      
                    
                     
                    </div>
                    
                  </section>


                </div>

                {/* Right Column: Fare Summary */}
                <div className="col-lg-4">
                  <div className="booking-form add_sticky">
                  <div class="head-booking-form"><p class="text-xl-bold neutral-1000">Fare Summary</p></div>
                    <BookingForm
                    //  totalpricee={totalPriceinfo} 
                     />
                  </div>
                </div>
              </div></>)}
                            {error && <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white border-2 border-black w-96 p-6 rounded-lg text-center shadow-lg">
                          <p className="text-red-600 mb-4 font-semibold">Error: error</p>
                                 
                            <button className="border-2 border-black px-4 py-2 bg-gray-100 hover:bg-gray-200 transition" onClick={searchTickets}>
                           Ok, Got It
                           </button>
                                
                              </div>
                            </div>}
              
              
            </div>
            
           
 
          </section>
        </main>
      </Layout>
</>)
}
export default page