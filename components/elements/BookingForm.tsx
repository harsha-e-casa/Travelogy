import { AppContext } from "@/util/AppContext";
import { useContext, useEffect } from "react";
export default function BookingForm({
  segmentsPrice,
  totalpricee,
  // baggageinfo,
}) {
  const basefare = totalpricee?.fC?.BF;
  const taxAndFees = totalpricee?.fC?.TAF;
  const Airlinegst = totalpricee?.afC?.TAF?.AGST;
  const othertaxes = totalpricee?.afC?.TAF?.OT;
  const totalfare = totalpricee?.fC?.TF;
  const netprice = totalpricee?.fC?.NF;
  const { getCookie } = useContext(AppContext);
  const savedBaggage = JSON.parse(getCookie("baggageinfo") || "[]");
  const savedMeal = JSON.parse(getCookie("mealinfo") || "[]");
  const ssrSeatAmount = getCookie("seatSsr_amount");
  console.log("saved baggage", savedBaggage);
  console.log("saved meal", savedMeal);

  const computedAmount =
    Number(totalfare) +
    savedBaggage.reduce((acc, curr) => acc + curr.amount, 0) +
    savedMeal.reduce((acc, curr) => acc + curr.amount, 0) +
    (ssrSeatAmount ? Number(ssrSeatAmount) : 0);

  const displayAmount = computedAmount > Number(totalfare) ? computedAmount : Number(totalfare);

  console.log("Computed Amount:", computedAmount);
  console.log("totalfare Amount:", Number(totalfare));
  console.log("displayAmount:", displayAmount);

  return (
    <>
      <div className="content-booking-form">
        <div className="item-line-booking flex flex-row">
          <div className="box-tickets">
            <strong className="text-md-bold neutral-1000">Base Fare:</strong>
          </div>
          <div className="line-booking-tickets ">
            <div className="dropdown-quantity text-md-bold neutral-1000">
              <p>₹{Number(basefare)}</p>
            </div>
          </div>
        </div>

        <div className="item-line-booking">
          <div className="box-tickets">
            <div className="flex flex-row justify-between">
              <div>
                <strong className="text-md-bold neutral-1000">
                  Baggage Amount
                </strong>
              </div>
              <div className="text-md-bold neutral-1000">
                ₹
                {savedBaggage
                  .filter((item) => item.amount !== undefined) // Filter out items without the 'amount' property
                  .reduce((acc, curr) => acc + (curr.amount || 0), 0)}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div>
                <strong className="text-md-bold neutral-1000">
                  Meal Amount
                </strong>
              </div>
              <div className="text-md-bold neutral-1000">
                ₹
                {savedMeal
                  .filter((item) => item.amount !== undefined) // Filter out items without the 'amount' property
                  .reduce((acc, curr) => acc + (curr.amount || 0), 0)}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div>
                <strong className="text-md-bold neutral-1000">Seat Fees</strong>
              </div>
              <div className="text-md-bold neutral-1000">
                ₹{ssrSeatAmount ? ssrSeatAmount : "0"}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div>
                <strong className="text-md-bold neutral-1000">
                  Taxes and fees
                </strong>
              </div>
              <div className="text-md-bold neutral-1000">₹{taxAndFees}</div>
            </div>

            <div className="line-booking-tickets">
              <div className="item-ticket">
                <p className="text-small neutral-500 mr-30">Airline GST</p>
              </div>
              <div className="dropdown-quantity">
                <p>₹{Airlinegst ? Airlinegst : "0.0"}</p>
              </div>
            </div>
            <div className="line-booking-tickets">
              <div className="item-ticket">
                <p className="text-small neutral-500 mr-30">Other Taxes</p>
              </div>

              <div className="dropdown-quantity">
                <p>₹{othertaxes}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="item-line-booking">
          <div className="box-tickets">
            <div className="flex flex-row justify-between">
              <div>
                <strong className="text-md-bold neutral-1000">
                  Amount to Pay
                </strong>
              </div>
              <div className="text-xl-bold neutral-1000">
                ₹{displayAmount}
                {/* {Number(totalfare) +
                  savedBaggage.reduce((acc, curr) => acc + curr.amount, 0) +
                  savedMeal.reduce((acc, curr) => acc + curr.amount, 0) +
                  (ssrSeatAmount ? Number(ssrSeatAmount) : 0)} */}
              </div>
            </div>

            <div className="line-booking-tickets">
              <div className="item-ticket">
                <p className="text-small neutral-500 mr-30">Commisiion</p>
              </div>
              <div className="dropdown-quantity">
                <p>₹0.0</p>
              </div>
            </div>
            <div className="line-booking-tickets">
              <div className="item-ticket">
                <p className="text-small neutral-500 mr-30">TDS</p>
              </div>
              <div className="dropdown-quantity">
                <p>₹0.0</p>
              </div>
            </div>
            <div className="line-booking-tickets">
              <div className="item-ticket">
                <p className="text-small neutral-500 mr-30">Net Price</p>
              </div>
              <div className="dropdown-quantity">
                <p>₹{netprice}</p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="item-line-booking">
				<div className="box-tickets"><strong className="text-md-bold neutral-1000">Add Extra:</strong>
					<div className="line-booking-tickets">
						<div className="item-ticket">
							<ul className="list-filter-checkbox">
								<li>
									<label className="cb-container">
										<input type="checkbox" /><span className="text-sm-medium">Add service per Booking </span><span className="checkmark" />
									</label>
								</li>
							</ul>
						</div>
						<div className="include-price">
							<p className="text-md-bold neutral-1000
							
							">$32.00</p>
						</div>
					</div>
					<div className="line-booking-tickets">
						<div className="item-ticket">
							<ul className="list-filter-checkbox">
								<li>
									<label className="cb-container">
										<input type="checkbox" /><span className="text-sm-medium">Add service per Personal </span><span className="checkmark" />
									</label>
								</li>
							</ul>
						</div>
						<div className="include-price">
							<p className="text-md-bold neutral-1000">$24.00</p>
						</div>
					</div>
				</div>
			</div> */}
        <div className="item-line-booking last-item">
          {" "}
          <strong className="text-md-bold neutral-1000">Total Amount:</strong>
          <div className="line-booking-right">
            <p className="text-xl-bold neutral-1000">
              {" "}
              ₹{displayAmount}
              {/* {Number(totalfare) +
                savedBaggage.reduce((acc, curr) => acc + curr.amount, 0) +
                savedMeal.reduce((acc, curr) => acc + curr.amount, 0) +
                (ssrSeatAmount ? Number(ssrSeatAmount) : 0)} */}
            </p>
          </div>
        </div>
        {/* <div className="box-button-book"> <a className="btn btn-book" href="#">Book Now
				<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M8 15L15 8L8 1M15 8L1 8" stroke='#0D0D0D' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg></a></div> */}
        {/* <div className="box-need-help"> <a href="help-center.html"></a> */}
        <div className="box-need-help">
          {" "}
          <a href="#">
            <svg
              width={12}
              height={14}
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.83366 3.66667C2.83366 1.92067 4.25433 0.5 6.00033 0.5C7.74633 0.5 9.16699 1.92067 9.16699 3.66667C9.16699 5.41267 7.74633 6.83333 6.00033 6.83333C4.25433 6.83333 2.83366 5.41267 2.83366 3.66667ZM8.00033 7.83333H4.00033C1.88699 7.83333 0.166992 9.55333 0.166992 11.6667C0.166992 12.678 0.988992 13.5 2.00033 13.5H10.0003C11.0117 13.5 11.8337 12.678 11.8337 11.6667C11.8337 9.55333 10.1137 7.83333 8.00033 7.83333Z"
                fill="#0D0D0D"
              />
            </svg>
            Need some help?
          </a>
        </div>
      </div>
    </>
  );
}
