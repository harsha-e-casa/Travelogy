// import Link from 'next/link'

// export default function TicketCard1({ ticket }: any) {
// 	return (
// 		<>
// 			<div className="item-flight background-card border-1">
// 				<div className="flight-route flight-route-type-2">
// 					<div className="flight-route-1">
// 						<div className="flight-name"> <img  src="/assets/imgs/page/homepage10/logo1.png" alt="Travalogy" />
// 							<div className="flight-info">
// 								<p className="text-md-bold neutral-1000">New York (JFK)</p>
// 								<p className="text-sm-medium time-flight"> <span className="neutral-1000">20:00 </span>- 05 Jan 2024</p>
// 							</div>
// 						</div>
// 						<div className="flight-route-icon" />
// 						<div className="flight-name">
// 							<div className="flight-info">
// 								<p className="text-md-bold neutral-1000">New York (JFK)</p>
// 								<p className="text-sm-medium time-flight"><span className="neutral-1000">20:00 </span>- 05 Jan 2024</p>
// 							</div>
// 						</div>
// 					</div>
// 					<div className="flight-route-2">
// 						<div className="flight-name"> <img  src="/assets/imgs/page/tickets/logo2.png" alt="Travalogy" />
// 							<div className="flight-info">
// 								<p className="text-md-bold neutral-1000">New York (JFK)</p>
// 								<p className="text-sm-medium time-flight"> <span className="neutral-1000">20:00 </span>- 05 Jan 2024</p>
// 							</div>
// 						</div>
// 						<div className="flight-route-icon" />
// 						<div className="flight-name">
// 							<div className="flight-info">
// 								<p className="text-md-bold neutral-1000">New York (JFK)</p>
// 								<p className="text-sm-medium time-flight"><span className="neutral-1000">20:00 </span>- 05 Jan 2024</p>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="flight-price">
// 					<div className="flight-price-1 border-1">
// 						<p className="text-sm-medium neutral-500">Business</p>
// 						<p className="heading-5 neutral-1000">$189.56</p>
// 						<p className="text-sm-medium neutral-500 mb-15">8 Seat(s) left</p><Link className="btn btn-gray" href="#">Book Now</Link>
// 					</div>
// 					<div className="flight-price-2 border-1">
// 						<p className="text-sm-medium neutral-500">Economy</p>
// 						<p className="heading-5 neutral-1000">$189.56</p>
// 						<p className="text-sm-medium neutral-500 mb-15">4 Seat(s) left</p><Link className="btn btn-gray" href="#">Book Now</Link>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	)
// }


import Link from 'next/link'
import dayjs from 'dayjs';
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Input, Radio } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import "./ticketCard1.css"

export default function TicketCard1({ ticket }: any) {

	const formatTime = (minutes: any) => {
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;
		return `${hours}h ${remainingMinutes}m`;
	};

	const style: React.CSSProperties = {
	  display: 'flex',
	  flexDirection: 'column',
	  gap: 8,
	};
	
	
	  const [value, setValue] = useState(0);
	
	  const onChange = (e: RadioChangeEvent) => {
		setValue(e.target.value);
		console.log("the value is",value)
	  };
	

	return (
		<>
			<div>
				<div>

				</div>
				<div className="item-flight background-card border-1 ticket-container relative">


					{/* city1 */}

					<div className='air_detailes'>
						{ticket.sI[0]['fD'].aI.name}
					</div>

					<div className="flight-route flight-route-type-2 city1">
						<div className="flight-route-1">
							<div className="flight-name">

								<div className="flight-info flex flex-col justify-center items-center">
									<p className="text-md-bold neutral-1000 city1name" >{ticket.sI[0]['da'].city}<span className='text-md-bold neutral-1000'>({ticket.sI[0]['da'].code})</span> </p>
									
									<p className="text-sm-medium time-flight timelogo" >
										<span className="neutral-1000 time ">
											{dayjs(ticket.sI[0]['dt']).format('hh:mm A')}
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>


{/* duration */}
<div className="flight-route flight-route-type-2 city1">
			<div className="flight-route-1">
				<div className=" flight-name duration flex flex-col items-center align-center duration">	    
					<p className="text-sm-medium neutral-500 totalduration"> {formatTime(ticket.sI[0]['duration'])} </p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
</svg>

					<p className="text-sm-medium neutral-500 totalduration"> {ticket.sI[0]['stops'] > 0 ? ticket.sI[0]['stops'] `stops` : 'non stop' } </p> 
				</div>
				</div>
				</div>
				
					{/* duration */}
					{/* <div className="flight-route flight-route-type-2 city1">
						<div className="flight-route-1">
							<div className=" flight-name duration flex flex-col items-center align-center">
								<p className="text-sm-medium neutral-500 totalduration"> {formatTime(ticket.sI[0]['duration'])} </p>
								<p className="text-sm-medium neutral-500 totalduration"> {ticket.sI[0]['stops'] > 0 ? ticket.sI[0]['stops']`stops` : 'non stop'} </p>
							</div>
						</div>
					</div> */}

					{/* city2 */}
					<div className="flight-route flight-route-type-2 city1">

						<div className="flight-route-1">
							<div className="flight-name">

								<div className="flight-info flex flex-col items-center align-center">

									<p className="text-md-bold neutral-1000 align-center city1name">{ticket.sI[0]['aa'].city} <span className='text-md-bold neutral-1000 citycode'>({ticket.sI[0]['aa'].code})</span></p>

									<p className="text-sm-medium time-flight timelogo">
										<span className="neutral-1000 time">{dayjs(ticket.sI[0]['at']).format('hh:mm A')} </span></p>
								</div>
							</div>
						</div>
					</div>

					{/* price and btn */}

					{/* price */}

					{/* ticket.sI['totalPriceList'] */}
					{/* <div className="flight-price-1 border-1 price-div flex justify-center flex-col items-center ">
						<p className="text-sm-medium neutral-500 business">{ticket.totalPriceList[0]['fd']['ADULT']['cc']}</p>
						<p className="heading-5 neutral-1000 price">₹{new Intl.NumberFormat('en-IN').format(ticket.totalPriceList[0]['fd']['ADULT']['fC']['BF']) // 27,387
						} </p>
						 */}
					{/* </div> */}

					<div className="flight-price-1 border-1  price-div flex justify-center items-center flex-col items-center    " style={{width:"245px", paddingLeft:"20px"}} >
						
						<Radio.Group onChange={onChange} value={value} className="fare-options flex flex-col gap-2  w-full" >
								  {ticket.totalPriceList.map((e: any, i: number) => {
								  
	
						 return (
							 <Radio key={i} value={i} className="w-full radiocomp">
									<div className={`p-0 rounded-lg border-2 transition-all duration-200 radiodiv
												   ${'border-gray-300 hover:border-gray-500'}`} >
											   <div className='flex flex-row gap-2 items-center'>
													  <div className="text-lg font-bold text-gray-800 price" >
												   ₹{new Intl.NumberFormat('en-IN').format(e.fd.ADULT.fC.BF)}
													  </div>
	
													  <span className=" fareidentifier  text-xs font-bold" style={{backgroundColor:"#f5deb3",color:"#5c4033",padding:"1px 2px"}}>
												   {e.fareIdentifier}
												   </span>{' '}
											   </div>
					 
											 <div className="text-xs text-gray-600">
												   <span className="ml-2 cabinclass">
												{e.fd.ADULT.cc} |<span className='refundable'> {e.fd.rT === 1 ? 'Non-refundable' : 'Refundable'}</span>
												</span>
											</div>
									</div>
							</Radio>
								);
										 
										 })}
						</Radio.Group>
					</div>



					{/* btn */}
					<div className="flight-price-2 border-1 btndiv">
					<Link
                     href={`book-ticket?tcs_id=${ticket.totalPriceList[value]?.id}`}
                     className="btn btn-gray booknow btn"
                     >
                     Book Now
                     </Link>
					</div>

				</div>





			</div>








		</>
	)
}


