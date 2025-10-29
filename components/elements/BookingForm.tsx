import { AppContext } from "@/util/AppContext";
import { useContext, useEffect, useState, useRef } from "react";

interface BookingFormProps {
  totalpricee: any;
  bookingData?: any;
  finalStage?: any;
  mealinfo?: any;
  baggageinfo?: any;
  seatinfo?: number;
  baggageAmount?: number;
  mealAmount?: number;
  bookingFormKey?: number;
  afsAmount?: number;
  rssrAmount?: number
}

const BookingForm: React.FC<BookingFormProps> = ({
  // segmentsPrice,
  totalpricee,
  bookingData = {},
  finalStage = false,
  mealinfo = {},
  baggageinfo = {},
  seatinfo = 0,
  baggageAmount = 0,
  mealAmount = 0,
  bookingFormKey,
  afsAmount = 0,
  rssrAmount = 0
}) => {
  // console.log("mealinfo 111111111111111111111==========> ", mealinfo);
  // console.log("baggageinfo 111111111111111111111==========> ", baggageinfo);
  console.log("baggageAmount 111111111111111111111==========> ", baggageAmount);
  console.log("seatinfo 111111111111111111111==========> ", seatinfo);
  console.log(
    "bookingFormKey 111111111111111111111==========> ",
    bookingFormKey
  );
  console.log("afsAmountafsAmountafsAmount ", afsAmount);
  console.log("rssrAmountrssrAmountrssrAmount ", rssrAmount);

  console.log("bookingData 111111111111111111111==========> ", bookingData);
  console.log(
    "totalpriceetotalpriceetotalpriceetotalpriceetotalpricee ",
    finalStage,
    totalpricee
  );

  if (totalpricee === undefined) {
    if (bookingData?.totalPriceInfo?.totalFareDetail) {
      totalpricee = bookingData?.totalPriceInfo?.totalFareDetail;
    }
    if (bookingData?.itemInfos?.AIR?.totalPriceInfo?.totalFareDetail) {
      totalpricee =
        bookingData?.itemInfos?.AIR?.totalPriceInfo?.totalFareDetail;
    }
  }
  console.log(
    "totalpriceetotalpriceetotalpriceetotalpriceetotalpricee11 ",
    totalpricee
  );
  const basefare = totalpricee?.fC?.BF || 0;
  const taxAndFees = totalpricee?.fC?.TAF || 0;
  const Airlinegst = totalpricee?.afC?.TAF?.AGST;
  const othertaxes = totalpricee?.afC?.TAF?.OT;
  const totalfare = totalpricee?.fC?.TF;
  // const netprice = totalpricee?.fC?.NF;
  const { getCookie, removeCookie } = useContext(AppContext);
  // const initLoaded = useRef(false);

  let computedAmount = 0;

  const [totalBaggageAmount, setTotalBaggageAmount] = useState(0);
  const [totalSeatAmount, setTotalSeatAmount] = useState(0);
  const [totalMealAmount, setTotalMealAmount] = useState(0);
  const [displayAmount, setDisplayAmount] = useState(0);
  const [netprice, setNetprice] = useState(totalpricee?.fC?.NF || 0);
  const [ammendmentFees, setAmmendmentFees] = useState(afsAmount);
  const [rssrFees, setRssrFees] = useState(rssrAmount);

  useEffect(() => {
    if (afsAmount != 0) {
      setAmmendmentFees(afsAmount);
    }
  }, [afsAmount]);

  useEffect(() => {
    if (rssrAmount != 0) {
      setRssrFees(rssrAmount);
    }
  }, [rssrAmount]);

  useEffect(() => {
    // if (totalpricee && !initLoaded.current) {

    if (totalpricee) {
      // initLoaded.current = true;
      // for booking details page
      console.log("bookingDatabookingData =====> ", bookingData);

      // except booking details page
      if (bookingData && Object.keys(bookingData).length === 0) {
        let savedBaggage = JSON.parse(getCookie("baggageinfo") || "[]");
        let totalBaggageAmount = savedBaggage.reduce(
          (acc: any, curr: any) => acc + curr.amount,
          0
        );
        console.log(
          "totalBaggageAmounttotalBaggageAmount ==> ",
          totalBaggageAmount
        );
        setTotalBaggageAmount(
          savedBaggage.reduce((acc: any, curr: any) => acc + curr.amount, 0)
        );
        let savedMeal = JSON.parse(getCookie("mealinfo") || "[]");
        setTotalMealAmount(
          savedMeal.reduce((acc: any, curr: any) => acc + curr.amount, 0)
        );
        let ssrSeatAmount = getCookie("seatSsr_amount");
        // setTotalSeatAmount(Number(ssrSeatAmount));
        setTotalSeatAmount(Number(ssrSeatAmount ?? 0));
        console.log("saved baggage", savedBaggage);
        console.log("saved meal", savedMeal);
        console.log("totalfare ====> ", totalfare);
        console.log("finalStage ===> ", finalStage);

        if (finalStage === false) {
          computedAmount =
            Number(totalfare) +
            savedBaggage.reduce((acc: any, curr: any) => acc + curr.amount, 0) +
            savedMeal.reduce((acc: any, curr: any) => acc + curr.amount, 0) +
            Number(ssrSeatAmount ?? 0);
          // (ssrSeatAmount ? Number(ssrSeatAmount) : 0);
        } else {
          computedAmount = Number(totalfare);
        }
        setNetprice(
          computedAmount -
            savedBaggage.reduce((acc: any, curr: any) => acc + curr.amount, 0) -
            savedMeal.reduce((acc: any, curr: any) => acc + curr.amount, 0) -
            Number(ssrSeatAmount ?? 0)
        );
      } else {
        console.log("else varaliay ??");
        let baggageTotal = 0;
        let seatTotal = 0;
        let mealTotal = 0;

        // let travellerInfo = bookingData?.travellerInfos;
        let travellerInfo = bookingData?.itemInfos?.AIR?.travellerInfos;

        if (travellerInfo && travellerInfo.length > 0) {
          travellerInfo.forEach((traveller: any) => {
            // Check if ssrBaggageInfos exists and has keys
            if (
              traveller?.ssrBaggageInfos &&
              Object.keys(traveller.ssrBaggageInfos).length > 0
            ) {
              Object.keys(traveller.ssrBaggageInfos).forEach((key) => {
                baggageTotal += traveller.ssrBaggageInfos[key].amount || 0;
              });
            }

            // Check if ssrSeatInfos exists and has keys
            if (
              traveller?.ssrSeatInfos &&
              Object.keys(traveller.ssrSeatInfos).length > 0
            ) {
              Object.keys(traveller.ssrSeatInfos).forEach((key) => {
                seatTotal += traveller.ssrSeatInfos[key].amount || 0;
              });
            }

            // Check if ssrMealInfos exists and has keys
            if (
              traveller?.ssrMealInfos &&
              Object.keys(traveller.ssrMealInfos).length > 0
            ) {
              Object.keys(traveller.ssrMealInfos).forEach((key) => {
                mealTotal += traveller.ssrMealInfos[key].amount || 0;
              });
            }
          });
        }

        setTotalBaggageAmount(baggageTotal);
        setTotalSeatAmount(seatTotal);
        setTotalMealAmount(mealTotal);

        console.log("Total Baggage Amount: ", baggageTotal);
        console.log("Total Seat Amount: ", seatTotal);
        console.log("Total Amount: ", Number(totalfare));
        computedAmount = Number(totalfare);
        setNetprice(totalfare - baggageTotal - seatTotal - mealTotal);
      }
      console.log("computedAmount ====== ", computedAmount);
      setDisplayAmount(computedAmount);
    }
  }, [totalpricee]);

  // useEffect(() => {
  //   if (seatinfo != 0) {
  //     setTotalSeatAmount(seatinfo);
  //     setDisplayAmount(totalfare + seatinfo);
  //   }
  // }, [seatinfo]);

  useEffect(() => {
    if (bookingFormKey == 1) {
      // if (mealAmount != 0) {
      //   setTotalMealAmount(mealAmount);
      // }
      // if (seatinfo != 0) {
      //   setTotalSeatAmount(seatinfo);
      // }
      // if (baggageAmount != 0) {
      //   setTotalBaggageAmount(baggageAmount);
      // }
      setTotalMealAmount(mealAmount);
      setTotalSeatAmount(seatinfo);
      setTotalBaggageAmount(baggageAmount);

      setDisplayAmount(
        Number(totalfare) +
          Number(seatinfo) +
          Number(baggageAmount) +
          Number(mealAmount)
      );
    }
  }, [totalpricee, seatinfo, baggageAmount, mealAmount]);

  // useEffect(() => {
  //   if (Object.keys(seatinfo).length === 0) {
  //     setTotalSeatAmount(0);
  //   }
  // }, []);

  // const displayAmount = computedAmount > Number(totalfare) ? computedAmount : Number(totalfare);

  return (
    <>
      <div className="content-booking-form">
        <div
          // className="item-line-booking flex flex-row"
          className="flex flex-row"
        >
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
                ₹{totalBaggageAmount}
                {/* {savedBaggage
                  .filter((item) => item.amount !== undefined) // Filter out items without the 'amount' property
                  .reduce((acc, curr) => acc + (curr.amount || 0), 0)} */}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div>
                <strong className="text-md-bold neutral-1000">
                  Meal Amount
                </strong>
              </div>
              <div className="text-md-bold neutral-1000">
                ₹{totalMealAmount}
                {/* {savedMeal
                  .filter((item) => item.amount !== undefined) // Filter out items without the 'amount' property
                  .reduce((acc, curr) => acc + (curr.amount || 0), 0)} */}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div>
                <strong className="text-md-bold neutral-1000">Seat Fees</strong>
              </div>
              <div className="text-md-bold neutral-1000">
                ₹{totalSeatAmount}
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
            {ammendmentFees != 0 && (
              <div className="flex flex-row justify-between">
                <div>
                  <strong className="text-md-bold neutral-1000">
                    Reissue Fees
                  </strong>
                </div>
                <div className="text-md-bold neutral-1000">
                  ₹{ammendmentFees}
                </div>
              </div>
            )}
            {rssrFees != 0 && (
              <div className="flex flex-row justify-between">
                <div>
                  <strong className="text-md-bold neutral-1000">
                    Old ancillary amount
                  </strong>
                </div>
                <div className="text-md-bold neutral-1000">
                  {rssrFees < 0 ? "- " : ""}
                  ₹{Math.abs(rssrFees)}
                </div>
              </div>
            )}
            <div className="line-booking-tickets">
              <div className="item-ticket">
                <p className="text-small neutral-500 mr-30">Net Price</p>
              </div>
              <div className="dropdown-quantity">
                <p>₹{netprice}</p>
              </div>
            </div>

            {/* <div className="line-booking-tickets">
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
            </div> */}
          </div>
        </div>

        {/* <div className="item-line-booking">
          <div className="box-tickets">
            <div className="flex flex-row justify-between">
              <div>
                <strong className="text-md-bold neutral-1000">
                  Amount to Pay
                </strong>
              </div>
              <div className="text-xl-bold neutral-1000">
                ₹{displayAmount}
              </div>
            </div>

            <div className="line-booking-tickets">
              <div className="item-ticket">
                <p className="text-small neutral-500 mr-30">Net Commission</p>
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
        </div> */}

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
        <div
          // className="item-line-booking last-item"
          className="flex flex-row justify-between"
        >
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
        {/* <div className="box-need-help">
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
        </div> */}
      </div>
    </>
  );
};

export default BookingForm;
