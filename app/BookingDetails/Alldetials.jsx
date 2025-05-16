import { useContext, useEffect, useState } from "react";
import { postDataBookingDetails } from "@/services/NetworkAdapter";
import dayjs from "dayjs";
import { AppContext } from "@/util/AppContext";
import { format } from 'date-fns';

const Alldetails = ({ bookingId }) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [bookingDetails, setBookingdetails] = useState(null);
  const [segmentPrices, setSegmentPrices] = useState([]); // State for storing segment prices
  const [showAllPassengers, setShowAllPassengers] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const {flightData}=useContext(AppContext)
  const toggleAllPassengers = () => {
    setShowAllPassengers((prev) => !prev);
  };

  const bookingDetailsapi = async (bookingId) => {
    setLoading(true);
    setError(null);

    if (!bookingId) {
      setError("Booking ID is missing");
      setLoading(false);
      return;
    }

    try {
      const parameter = { bookingId: bookingId, requirePaxPricing: true };

      const data = await postDataBookingDetails(parameter);
      console.log("Booking details:", data);
      
      setBookingdetails(data); // Update state with flight details
      setSegmentPrices(data?.AIR?.tripInfos?.map((trip) => trip.sI.map((seg) => seg.price)) ?? []); // Storing segment prices
    } catch (err) {
      console.error("error caused", err);

      if (err?.response?.data?.errors?.length) {
        const firstError = err.response.data.errors[0];
        const message = firstError?.message || "An unknown error occurred.";
        setError(message);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Extracted Booking Id:", bookingId); // Debug log to check if bookingId is correct
    if (bookingId) {
      bookingDetailsapi(bookingId);
    } else {
      setError("No valid booking id found in the URL.");
    }
  }, [bookingId]);

  const segments = bookingDetails?.itemInfos?.AIR?.tripInfos?.map(trip => trip.sI).flat() ?? [];
  const totalpriceinfos = flightData?.tripInfos.flatMap(trip => trip.totalPriceList) ?? [];
  const cabinclass=totalpriceinfos.map((e)=>e.fd?.ADULT?.cc)
  const departuredate=segments.map((e)=>e.dt)
  const arrivalDate=segments.map((e)=>e.at)
  const firstBaggage = segments
  .flatMap(segment => segment?.bI?.tI || [])
  [0]; // Get the first passenger's baggage info

  const fareidentifier=firstBaggage?.fd?.cc
const baggageInfo = {
  cabinBaggage: firstBaggage?.fd?.bI?.cB || "N/A",
  checkinBaggage: firstBaggage?.fd?.bI?.iB || "N/A"
};

console.log(baggageInfo);




  const formatDepartureDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString))) return '';
    return format(new Date(dateString), 'EEE, dd MMM');
  };
  
  const formatArrivalDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString))) return '';
    return format(new Date(dateString), 'EEE, dd MMM');
  };
  

  const departureCityCode=segments.map((e,i)=>e.da?.code)
  const arrivalCityCode=segments.map((e,i)=>e.aa?.code)
  const travellerinfos=bookingDetails?.itemInfos?.AIR?.travellerInfos?.map(traveller=>traveller)??[];
  console.log("segments",segments)

  return (
    <>
    <h4 className="neutral-1000">Booking Details
    </h4>
      <div className="mt-20 bg-white shadow rounded-lg p-6 mb-20">
      
        <div className="mb-10 shadow-md p-3 rounded">
          
          <div className="flex flex-row gap-2">
        

<div className="flex flex-col justify-start">
<p className="text-md-medium neutral-1000">Booking status: <span className={bookingDetails?.status?.success ? "bg-green-600 text-white pl-1 pr-1 rounded-full" : "bg-red-600 text-white pl-1 pr-1 rounded-full"}>{bookingDetails?.status?.success ? "Success" : "Failed"}</span> </p>
<p className="text-sm-medium neutral-500">Booking Id: {bookingDetails?.order?.bookingId}</p></div>

          </div>
        
        </div>
        <div className="mt-20">
          {/* <div className="flex flex-row gap-2">
            <div style={{width:"30px",height:"5px"}}>
            <svg id="fi_9581121" className=" text-center"  viewBox="0 0 500 500"  xmlns="http://www.w3.org/2000/svg" data-name="circle flat gradient" >
        <path d="M506.489,85.504c-11.508-19.932-37.145-26.52-56.836-14.604l-107.784,65.224l-118.35-77.776l-71.987,41.027l91.336,96.657
			L131.93,263.164l-53.169-24.033l-49.467,28.56l74.089,50.546l61.968,2.814l325.368-179.024
			C510.883,130.932,517.997,105.436,506.489,85.504z"></path>
      </svg>
            </div>
          
          <h6 className="neutral-1000">Flight Summary</h6>
          </div> */}


        
{/* flightdetails div */}



          <div className="shadow rounded-md p-3 ">
  {/* header */}
  <div className="flex flex-col justify-start  items-start">
  {/* City and direction row */}
  <div className="flex flex-row gap-3 items-center mb-2">
    <p className="text-xl-bold neutral-1000">{segments.map((e)=>e.da?.city) || "DELHI"}<span>({segments.map((e)=>e.da?.code) })</span></p>
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
    <p className="text-xl-bold neutral-1000">{segments.map((e)=>e.aa?.city) } <span>({segments.map((e)=>e.aa?.code) })</span></p>
  </div>

<div className="flex flex-row gap-2">
<p className="text-sm-bold neutral-500 ">{formatDepartureDate(departuredate) ||"Date not available"}</p>
  {/* Info list below the cities */}
  <ul className="flex flex-row gap-4 mb-20 text-sm-medium neutral-500 list-disc">
    
    <li className="text-sm-medium neutral-500 ">{segments.map(segment => 
    segment.stops === 0 ? "Non Stop" : `${segment.stops} Stop${segment.stops > 1 ? 's' : ''}`
  )||"No stop info"}</li>
    <li className="text-sm-medium neutral-500 ">{segments.map(segment => {
    if (!segment.duration) return "";
  
    const hours = Math.floor(segment.duration / 60);
    const minutes = segment.duration % 60;
  
    return `${hours}h ${minutes}m`;
  })|| "Duration not available"}</li>
  </ul>
</div>
  
</div>

  

         <div className="flex flex-row justify-between">
          
         <div className="logo-flight flex flex-row gap-3 items-center mb-20">
                                                                        {/* <img
                                                                            src={`/assets/imgs/airlines/${flightcode}.png`}
                                                                            
                                                                        /> */}
                                                                        <div className="text-md-bold neutral-900">
                                                                         {segments.map(segment => segment.fD?.aI?.name)}
                                                                        </div>
                                                                        <div className="text-md-medium neutral-500">
                                                                          {segments.map(segment => segment.fD?.fN)}
                                                                        </div>
                                                                        <div className="text-md-medium neutral-500 border border-black-200 rounded-lg pl-10 pr-10">
                                                                       { segments.map(segment => segment.fD?.eT)}
                                                                        </div>
                                                                        
                                                                    </div>

                  <div className="flex flex-row items-center gap-3">
                    <p className="text-sm-medium neutral-500 ">{cabinclass}
                     </p>
                     <span
                className="fareidentifier text-xs font-bold pl-10 pr-10 rounded-full"
                style={{
                  backgroundColor: 'rgb(245, 222, 179)',
                  color: 'rgb(92, 64, 51)',
                  padding: '1px 2px',
                }} 
              >
                {fareidentifier}
              </span>
                   
                  </div>

         </div>

 {/* flightdetails    */}
<div className=" flex   w-full justify-between items-center bg-gray-100 pl-50 pr-50 pt-10 pb-10 rounded-md  ">
    
   
      <div className="text-left space-y-1">
        {/* <p className="text-sm text-gray-500">{formatDepartureDate(departureDate)}</p> */}
        <h4 className="" style={{fontSize:"28px",fontWeight:"normal"}}>{segments.map(segment => segment.dt.split("T")[1])}</h4>
        <p className="text-sm-medium neutral-500 ">{segments.map(e=>e.da.city)} {segments.map(e=>e.da.country)}</p>
        <p className="text-sm-medium neutral-500 ">{segments.map(e=>e.da.name)}</p>
        <p className="text-sm-medium neutral-1000 ">{segments.map(e=>e.da.terminal)}</p>
      </div>

      <div className="text-center space-y-1">
        <p className="text-sm-medium neutral-500 ">{segments.map(segment => {
    if (!segment.duration) return "";
  
    const hours = Math.floor(segment.duration / 60);
    const minutes = segment.duration % 60;
  
    return `${hours}h ${minutes}m`;
  })|| "Duration not available"}</p>
        <img src="https://edge.ixigo.com/st/vimaan/_next/static/media/line.9641f579.svg" alt="flight line" className="mx-auto w-20" />
      </div>

      <div className="text-right space-y-1">
        {/* <p className="text-sm text-gray-500">{formatArrivalDate(arrivalDate)}</p> */}
        <h4 className="" style={{fontSize:"28px",fontWeight:"normal"}}>{segments.map(segment => segment.at.split("T")[1])}</h4>
        <p className="text-sm-medium neutral-500 ">{segments.map(e=>e.aa.city)} {segments.map(e=>e.aa.country)}</p>
        <p className="text-sm-medium neutral-500 ">{segments.map(e=>e.aa.name)}</p>
        <p className="text-sm-medium neutral-1000 ">{segments.map(e=>e.aa.terminal)}</p>
      </div>
 {/* Baggage Info */}
 <div className="flex flex-col items-start justify-start gap-3">
      
      
      <div className="flex items-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-suitcase-lg-fill" viewBox="0 0 16 16">
  <path d="M7 0a2 2 0 0 0-2 2H1.5A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14H2a.5.5 0 0 0 1 0h10a.5.5 0 0 0 1 0h.5a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2H11a2 2 0 0 0-2-2zM6 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1zM3 13V3h1v10zm9 0V3h1v10z"/>
</svg>
        <p className="text-sm-bold neutral-900">Cabin: <span className="text-sm-medium neutral-500">     {baggageInfo.cabinBaggage|| "N/A"}</span></p>
      </div>
      <div className="flex items-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-suitcase2-fill" viewBox="0 0 16 16">
  <path d="M6.5 0a.5.5 0 0 0-.5.5V3H4.5A1.5 1.5 0 0 0 3 4.5v9a1.5 1.5 0 0 0 1.003 1.416A1 1 0 1 0 6 15h4a1 1 0 1 0 1.996-.084A1.5 1.5 0 0 0 13 13.5v-9A1.5 1.5 0 0 0 11.5 3H10V.5a.5.5 0 0 0-.5-.5zM9 3H7V1h2zM4 7V6h8v1z"/>
</svg>
        <p className="text-sm-bold neutral-900 ">Check-in: <span className="text-sm-medium neutral-500 ">{baggageInfo.checkinBaggage|| "N/A"}</span></p>
      </div>
    </div>

    
  


   

    
  </div>

  
  <div className="mt-30 text-sm-medium neutral-1000 p-3 bg-blue-100">
  {`Got excess baggage? Don’t stress, buy extra check-in baggage allowance for $dcitycode-$acitycode at fab rates!`}
    </div>
  </div>


  {/* //table */}

  <div className="shadow rounded-md mt-50 p-3 bg-white">
  {/* Passenger Information */}
  <p className="text-xl-bold neutral-1000 mb-10">Passenger Information</p>
  <table className="w-full border-collapse mb-20">
    <thead style={{ borderBottom: "1px solid grey" }}>
      <tr>
        <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">S.No</th>
        <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">Name</th>
        <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">Person Type</th>
        <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">Ticket Number</th>
      </tr>
    </thead>
    <tbody>
      {travellerinfos.map((e,i)=>{
       const segmentKey = `${departureCityCode}-${arrivalCityCode}`;
       const pnr = e.pnrDetails?.[segmentKey] ?? "N/A";
       const ticket = e.ticketNumberDetails?.[segmentKey] ?? "N/A";
 return(   <tr>
        <td className="px-4 py-3 border-b border-gray-200 text-black">{i+1}</td>
        <td className="px-4 py-3 border-b border-gray-200 text-black">{`${e.ti}. ${e.fN} ${e.lN}`}</td>
        <td className="px-4 py-3 border-b border-gray-200 text-black">{e.pt}</td>
        <td className="px-4 py-3 border-b border-gray-200 text-black">{segmentKey}: {pnr} ({ticket})</td>
      </tr>)
 } )}
    </tbody>
  </table>

  {/* Contact Information */}
  <p className="text-lg-bold neutral-1000 mb-10 mt-20">Contact Information</p>
  <div className="ant-form-item">
    <div className="text-md neutral-1000 mb-2">
      Email: <strong>{bookingDetails?.order?.deliveryInfo?.emails?.join(", ") || "N/A"}</strong>
    </div>
    <div className="text-md neutral-1000">
      Phone Number: <strong>{bookingDetails?.order?.deliveryInfo?.contacts?.join(", ") || "N/A"}</strong>
    </div>
  </div>
</div>


          {/* <div className="box-timeline">
            {segments.map((seg, idx) => {
              const dep = dayjs(seg.dt);
              const arr = dayjs(seg.at);
              const hrs = Math.floor(seg.duration / 60);
              const mins = seg.duration % 60;

              return (
                <>
                  <div className="item-timeline">
                    <span className="text-xl-bold text-ads-middle">
                      {hrs}h {mins}m
                    </span>
                    <div className="item-line-timeline">
                      <div className="time-flight">
                        <p className="text-sm-bold neutral-1000 icon-time">{dep.format("HH:mm")}</p>
                        <p className="text-sm-medium neutral-500">{dep.format("DD MMM YYYY")}</p>
                      </div>
                      <div className="location-flight">
                        <p className="text-xl-bold neutral-1000 mb-5">
                          {seg.da.city} ({seg.da.code})
                        </p>
                        <p className="text-sm-medium neutral-500">
                          {seg.da.name}
                          {seg.da.terminal ? ` • ${seg.da.terminal}` : ""}
                        </p>
                      </div>
                    </div>
                    <div className="item-info-flight">
                      <div className="logo-flight">
                        <img
                          src={`/assets/imgs/airlines/${seg.fD.aI.code.toLowerCase()}.png`}
                          alt={seg.fD.aI.name}
                        />
                      </div>
                      <div className="flight-code">
                        <p className="text-sm-medium neutral-500">
                          {seg.fD.aI.code}-{seg.fD.fN} • Economy
                        </p>
                      </div>
                      <div className="list-flight-facilities">
                        <li className="baggage">
                          <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.122 7.23384H12.3453V5.80934C12.3453 5.55009 12.135 5.33991 11.8757 5.33991H9.33781C9.1025 4.62166 8.42469 4.10641 7.63672 4.10641H6.82216V0.469438C6.82216 0.210188 6.61194 0 6.35262 0H3.07384C2.81453 0 2.60428 0.210188 2.60428 0.469438V4.10644H1.78972C0.802875 4.10644 0 4.90906 0 5.89566V14.2107C0 15.1973 0.802875 16 1.78972 16H14.122C15.1575 16 16 15.1578 16 14.1225V9.11134C16 8.07609 15.1575 7.23384 14.122 7.23384ZM15.0609 9.11134V12.0802H5.77616V9.11134C5.77616 8.59378 6.19734 8.17269 6.71506 8.17269H14.122C14.6397 8.17269 15.0609 8.59375 15.0609 9.11134ZM11.4062 7.23384H9.43094V6.27878H11.4062V7.23384ZM3.54338 0.938844H5.88306V4.10641H3.54338V0.938844ZM0.939094 14.2107V5.89566C0.939094 5.42675 1.32069 5.04528 1.78972 5.04528H7.63672C8.08409 5.04528 8.45697 5.39431 8.48556 5.83991C8.48669 5.85728 8.48887 5.87431 8.49178 5.89106V7.23384H6.71503C5.6795 7.23384 4.83703 8.07609 4.83703 9.11134V14.1225C4.83703 14.4643 4.92931 14.7848 5.08962 15.0612H1.78972C1.32069 15.0612 0.939094 14.6797 0.939094 14.2107ZM14.122 15.0612H7.63672H6.71506C6.19734 15.0612 5.77616 14.6401 5.77616 14.1225V13.0191H15.0609V14.1225C15.0609 14.6401 14.6397 15.0612 14.122 15.0612Z" />
                          </svg>
                          Adult Check-in: {flightData?.tripInfos?.[0]?.totalPriceList?.[0]?.fd?.ADULT?.bI?.iB || "N/A"} (01 Piece only)
                        </li>
                        <li className="cabin">
                          <svg width={10} height={16} viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.82422 3.76562H6.41016V0.9375H6.88281C7.14169 0.9375 7.35156 0.727625 7.35156 0.46875C7.35156 0.209875 7.14169 0 6.88281 0H3.11719C2.85831 0 2.64844 0.209875 2.64844 0.46875C2.64844 0.727625 2.85831 0.9375 3.11719 0.9375H3.58984V3.76562H2.17578C1.39822 3.76562 0.765625 4.39822 0.765625 5.17578V12.707C0.765625 13.3572 1.20803 13.9057 1.8075 14.0681C1.74294 14.2296 1.70703 14.4056 1.70703 14.5898C1.70703 15.3674 2.33963 16 3.11719 16C3.89475 16 4.52734 15.3674 4.52734 14.5898C4.52734 14.4241 4.49838 14.265 4.44559 14.1172H5.55437C5.50159 14.265 5.47262 14.4241 5.47262 14.5898C5.47262 15.3674 6.10522 16 6.88278 16C7.66034 16 8.29294 15.3674 8.29294 14.5898C8.29294 14.4056 8.25703 14.2296 8.19247 14.0681C8.79197 13.9057 9.23434 13.3572 9.23434 12.707V5.17578C9.23437 4.39822 8.60178 3.76562 7.82422 3.76562ZM4.52734 0.9375H5.47266V3.76562H4.52734V0.9375ZM3.58984 14.5898C3.58984 14.8505 3.37781 15.0625 3.11719 15.0625C2.85656 15.0625 2.64453 14.8505 2.64453 14.5898C2.64453 14.3292 2.85656 14.1172 3.11719 14.1172C3.37781 14.1172 3.58984 14.3292 3.58984 14.5898ZM6.88281 15.0625C6.62219 15.0625 6.41016 14.8505 6.41016 14.5898C6.41016 14.3292 6.62219 14.1172 6.88281 14.1172C7.14344 14.1172 7.35547 14.3292 7.35547 14.5898C7.35547 14.8505 7.14344 15.0625 6.88281 15.0625ZM8.29688 12.707C8.29688 12.9677 8.08484 13.1797 7.82422 13.1797H2.17578C1.91516 13.1797 1.70312 12.9677 1.70312 12.707V5.17578C1.70312 4.91516 1.91516 4.70312 2.17578 4.70312H7.82422C8.08484 4.70312 8.29688 4.91516 8.29688 5.17578V12.707Z" />
                          </svg>
                          Cabin Baggage {flightData?.tripInfos?.[0]?.totalPriceList?.[0]?.fd?.ADULT?.bI?.cB || "N/A"}
                        </li>
                      </div>
                    </div>
                  </div>
                  <div className="item-timeline ">
                                                                <div className="item-line-timeline">
                                                                    <div className="time-flight">
                                                                        <p className="text-sm-bold neutral-1000 icon-time">
                                                                            {arr.format('HH:mm')}
                                                                        </p>
                                                                        <p className="text-sm-medium neutral-500">
                                                                            {arr.format('DD MMM YYYY')}
                                                                        </p>
                                                                    </div>
                                                                    <div className="location-flight">
                                                                        <p className="text-xl-bold neutral-1000">
                                                                            {seg.aa.city} ({seg.aa.code})
                                                                        </p>
                                                                        <p className="text-sm-medium neutral-500">
                                                                            {seg.aa.name}
                                                                            {seg.aa.terminal ? ` • ${seg.aa.terminal}` : ''}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                 
                </>
              );
            })}

           
          </div> */}
        </div>
        

   



      </div>
      
    </>
  );
};

export default Alldetails;
