import { useEffect, useState } from "react";
import { postDataBookingDetails } from "@/services/NetworkAdapter";
import dayjs from "dayjs";

const Alldetails = ({ bookingId }) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [bookingDetails, setBookingdetails] = useState(null);
  const [segmentPrices, setSegmentPrices] = useState([]); // State for storing segment prices

  const bookingDetailsapi = async (bookingId) => {
    setLoading(true);
    setError(null);

    if (!bookingId) {
      setError("Booking ID is missing");
      setLoading(false);
      return;
    }

    try {
      const parameter = { bookingId: bookingId, requirePaxPrizing: true };

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
  const departureCityCode=segments.map((e,i)=>e.da?.code)
  const arrivalCityCode=segments.map((e,i)=>e.aa?.code)
  const travellerinfos=bookingDetails?.itemInfos?.AIR?.travellerInfos?.map(traveller=>traveller)??[];
  console.log("segments",segments)

  return (
    <>
      <div className="mt-10 bg-white shadow rounded-lg p-6">
        <div className="mb-10 shadow-md p-3 rounded">
          <h4 className="neutral-1000">
            Booking {bookingDetails?.status?.success ? "Success" : "Failed"}
          </h4>
          <p className="text-sm-bold neutral-800">Booking Id: {bookingDetails?.order?.bookingId}</p>
        </div>
        <div className="mt-10 shadow-md p-3 rounded">
          <h6 className="neutral-1000">Flight Summary</h6>

          <div className="box-timeline">
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
                          Adult Check-in: {segmentPrices[0]?.fd?.ADULT?.bI?.iB} (01 Piece only)
                        </li>
                        <li className="cabin">
                          <svg width={10} height={16} viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.82422 3.76562H6.41016V0.9375H6.88281C7.14169 0.9375 7.35156 0.727625 7.35156 0.46875C7.35156 0.209875 7.14169 0 6.88281 0H3.11719C2.85831 0 2.64844 0.209875 2.64844 0.46875C2.64844 0.727625 2.85831 0.9375 3.11719 0.9375H3.58984V3.76562H2.17578C1.39822 3.76562 0.765625 4.39822 0.765625 5.17578V12.707C0.765625 13.3572 1.20803 13.9057 1.8075 14.0681C1.74294 14.2296 1.70703 14.4056 1.70703 14.5898C1.70703 15.3674 2.33963 16 3.11719 16C3.89475 16 4.52734 15.3674 4.52734 14.5898C4.52734 14.4241 4.49838 14.265 4.44559 14.1172H5.55437C5.50159 14.265 5.47262 14.4241 5.47262 14.5898C5.47262 15.3674 6.10522 16 6.88278 16C7.66034 16 8.29294 15.3674 8.29294 14.5898C8.29294 14.4056 8.25703 14.2296 8.19247 14.0681C8.79197 13.9057 9.23434 13.3572 9.23434 12.707V5.17578C9.23437 4.39822 8.60178 3.76562 7.82422 3.76562ZM4.52734 0.9375H5.47266V3.76562H4.52734V0.9375ZM3.58984 14.5898C3.58984 14.8505 3.37781 15.0625 3.11719 15.0625C2.85656 15.0625 2.64453 14.8505 2.64453 14.5898C2.64453 14.3292 2.85656 14.1172 3.11719 14.1172C3.37781 14.1172 3.58984 14.3292 3.58984 14.5898ZM6.88281 15.0625C6.62219 15.0625 6.41016 14.8505 6.41016 14.5898C6.41016 14.3292 6.62219 14.1172 6.88281 14.1172C7.14344 14.1172 7.35547 14.3292 7.35547 14.5898C7.35547 14.8505 7.14344 15.0625 6.88281 15.0625ZM8.29688 12.707C8.29688 12.9677 8.08484 13.1797 7.82422 13.1797H2.17578C1.91516 13.1797 1.70312 12.9677 1.70312 12.707V5.17578C1.70312 4.91516 1.91516 4.70312 2.17578 4.70312H7.82422C8.08484 4.70312 8.29688 4.91516 8.29688 5.17578V12.707Z" />
                          </svg>
                          Cabin Baggage {segmentPrices[0]?.fd?.ADULT?.bI?.cB}
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

           
          </div>
        </div>
        <div className="shadow-md rounded mt-20 p-2">
          <h6 className="neutral-1000">Passenger details</h6>
          <div>
            {travellerinfos.map((traveller, i) => {
              const segmentKey = `${departureCityCode}-${arrivalCityCode}`;
              const pnr = traveller.pnrDetails?.[segmentKey] ?? 'N/A';
              const ticket = traveller.ticketNumberDetails?.[segmentKey] ?? 'N/A';

              return (
                <div key={i} className="flex flex-row justify-start items-center gap-2 mt-5 p-3">
                    <div className="flex justify-center items-center "> <p className="" style={{width:"10px"}}>{i + 1}.</p></div>
                 
                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                       className="bi bi-person" viewBox="0 0 16 16">
                    <path
                      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                  </svg>

                  <div className="flex flex-row justify-between w-full">
                    <p className="text-sm-medium neutral-500 " style={{width:"200px"}}>{`${traveller.ti}. ${traveller.fN} ${traveller.lN}`}</p>
                    <p className="text-sm-medium neutral-500 " >{traveller.pt}</p>
                    <p className="text-sm-medium neutral-500">{segmentKey}: {pnr} ({ticket})</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded shadow-md p-2 mt-20"> <h6 className="neutral-1000">Contact information</h6>
        <p>Booking details will be sent to </p><span></span>
        
        </div>

      </div>
      
    </>
  );
};

export default Alldetails;
