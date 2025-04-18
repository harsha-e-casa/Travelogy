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

export default function TicketCard1({ ticket }: any) {

	const formatTime = (minutes:any) => {
		  const hours = Math.floor(minutes / 60);
		  const remainingMinutes = minutes % 60;
		  return `${hours}h ${remainingMinutes}m`;
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
								<p className="text-md-bold neutral-1000 city1name">{ticket.sI[0]['da'].city} ({ticket.sI[0]['da'].code})</p>
								<p className="text-sm-medium time-flight timelogo"> 
									<span className="neutral-1000 time">
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
				<div className=" flight-name duration flex flex-col items-center align-center">	    
					<p className="text-sm-medium neutral-500 totalduration"> {formatTime(ticket.sI[0]['duration'])} </p>
					<p className="text-sm-medium neutral-500 totalduration"> {ticket.sI[0]['stops'] > 0 ? ticket.sI[0]['stops'] `stops` : 'non stop' } </p> 
				</div>
				</div>
				</div>
				
            {/* city2 */}
			<div className="flight-route flight-route-type-2 city1">
            
			<div className="flight-route-1">
                <div className="flight-name">
		                    
							 <div className="flight-info flex flex-col items-center align-center">
								<p className="text-md-bold neutral-1000 city1name">{ticket.sI[0]['aa'].city} ({ticket.sI[0]['aa'].code})</p>
								<p className="text-sm-medium time-flight timelogo"> 
									<span className="neutral-1000 time">{dayjs(ticket.sI[0]['at']).format('hh:mm A')} </span></p>
							 </div>
				</div>
				</div>
				</div>

            {/* price and btn */}
				
					{/* price */}

					{/* ticket.sI['totalPriceList'] */}
					<div className="flight-price-1 border-1 price-div flex justify-center flex-col items-center ">
						<p className="text-sm-medium neutral-500 business">{ticket.totalPriceList[0]['fd']['ADULT']['cc']}</p>
						<p className="heading-5 neutral-1000 price">₹{new Intl.NumberFormat('en-IN').format(ticket.totalPriceList[0]['fd']['ADULT']['fC']['BF']) // 27,387
						} </p>
						{/* <p className="text-sm-medium neutral-500 mb-15 seats">4 Seat(s) left</p> */}
					</div>
 

                 {/* btn */}
					<div className="flight-price-2 border-1 btndiv">
						<Link href={`book-ticket?tcs_id=${ticket.totalPriceList[0]['id']}`} className="btn btn-gray booknow">Book Now</Link>
					</div>

			    
			</div>





		</div>
			






				
		</>
	)
}


