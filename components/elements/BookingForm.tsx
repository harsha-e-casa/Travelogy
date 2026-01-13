import { AppContext } from "@/util/AppContext";
import { useContext, useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { postData } from "../../services/NetworkAdapter";

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
  rssrAmount?: number;
  markup?: number;
  setMarkup?: (value: number) => void;
  onHold?: boolean;
  bookingId?: string;
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
  rssrAmount = 0,
  onHold = false,
  markup = 0,
  setMarkup,
  bookingId,
}) => {

  if (totalpricee === undefined) {
    if (bookingData?.totalPriceInfo?.totalFareDetail) {
      totalpricee = bookingData?.totalPriceInfo?.totalFareDetail;
    }
    if (bookingData?.itemInfos?.AIR?.totalPriceInfo?.totalFareDetail) {
      totalpricee =
        bookingData?.itemInfos?.AIR?.totalPriceInfo?.totalFareDetail;
    }
  }
  const basefare = totalpricee?.fC?.BF || 0;
  const taxAndFees = totalpricee?.fC?.TAF || 0;
  const Airlinegst = totalpricee?.afC?.TAF?.AGST;
  const othertaxes = totalpricee?.afC?.TAF?.OT;
  const totalfare = totalpricee?.fC?.TF;
  // const netprice = totalpricee?.fC?.NF;
  const { getCookie, removeCookie } = useContext(AppContext);
  // const initLoaded = useRef(false);
  const pathname = usePathname();

  let computedAmount = 0;

  const [totalBaggageAmount, setTotalBaggageAmount] = useState(0);
  const [totalSeatAmount, setTotalSeatAmount] = useState(0);
  const [totalMealAmount, setTotalMealAmount] = useState(0);
  const [displayAmount, setDisplayAmount] = useState(0);
  const [netprice, setNetprice] = useState(totalpricee?.fC?.NF || 0);
  const [ammendmentFees, setAmmendmentFees] = useState(afsAmount);
  const [rssrFees, setRssrFees] = useState(rssrAmount);

  // Markup & Breakdown States
  // const [markup, setMarkup] = useState(0);
  const [showMarkupPopup, setShowMarkupPopup] = useState(false);
  const [tempMarkup, setTempMarkup] = useState("0");
  const [showTaxDetails, setShowTaxDetails] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  const handleUpdateMarkup = async () => {
    const newMarkup = Number(tempMarkup);
    if (setMarkup) {
      setMarkup(newMarkup);
    }
    setShowMarkupPopup(false);

    if (bookingId) {
      try {
        await postData("travelogy/flight/save-markup", {
          bookingId,
          markup: newMarkup,
        });
      } catch (error) {
        console.error("Error saving markup:", error);
      }
    }
  };

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

      // except booking details page
      if (bookingData && Object.keys(bookingData).length === 0) {
        let savedBaggage = JSON.parse(getCookie("baggageinfo") || "[]");
        let totalBaggageAmount = savedBaggage.reduce(
          (acc: any, curr: any) => acc + curr.amount,
          0
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

        if (finalStage === false) {
          computedAmount =
            Number(totalfare) +
            savedBaggage.reduce((acc: any, curr: any) => acc + curr.amount, 0) +
            savedMeal.reduce((acc: any, curr: any) => acc + curr.amount, 0) +
            Number(ssrSeatAmount ?? 0) +
            Number(markup || 0);
          // (ssrSeatAmount ? Number(ssrSeatAmount) : 0);
        } else {
          computedAmount = Number(totalfare) + Number(markup || 0);
        }
        setNetprice(
          computedAmount -
          savedBaggage.reduce((acc: any, curr: any) => acc + curr.amount, 0) -
          savedMeal.reduce((acc: any, curr: any) => acc + curr.amount, 0) -
          Number(ssrSeatAmount ?? 0) -
          Number(markup || 0)
        );
      } else {
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
        computedAmount = Number(totalfare) + Number(markup || 0);
        // setNetprice(totalfare - baggageTotal - seatTotal - mealTotal);
        setNetprice(computedAmount);
      }
      setDisplayAmount(computedAmount);
    }
  }, [totalpricee, markup]);

  // useEffect(() => {
  //   if (seatinfo != 0) {
  //     setTotalSeatAmount(seatinfo);
  //     setDisplayAmount(totalfare + seatinfo);
  //   }
  // }, [seatinfo]);

  useEffect(() => {
    if (bookingFormKey == 1 || bookingFormKey === undefined) {
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
        Number(mealAmount) +
        Number(markup)
      );
    }
  }, [totalpricee, seatinfo, baggageAmount, mealAmount, markup]);

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
            {!onHold && (
              <>
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
                    <strong className="text-md-bold neutral-1000">
                      Seat Fees
                    </strong>
                  </div>
                  <div className="text-md-bold neutral-1000">
                    ₹{totalSeatAmount}
                  </div>
                </div>
              </>
            )}
            {/* Taxes and Fees with Breakdown and Markup Edit */}
            <div className="flex flex-col">
              <div className="flex flex-row justify-between items-center">
                <div
                  className="flex items-center cursor-pointer gap-2"
                  onClick={() => setShowTaxDetails(!showTaxDetails)}
                >
                  <strong className="text-md-bold neutral-1000">
                    Taxes and fees
                  </strong>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform ${showTaxDetails ? "rotate-180" : ""
                      }`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                <div className="flex items-center gap-2 relative">
                  <div className="text-md-bold neutral-1000">₹{Number(taxAndFees) + Number(markup)}</div>
                  {pathname?.includes("/book-ticket") && (
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setTempMarkup(markup.toString());
                        setShowMarkupPopup(!showMarkupPopup);
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </div>
                  )}
                  {/* Markup Popup */}
                  {showMarkupPopup && pathname?.includes("/book-ticket") && (
                    <div className="absolute top-8 right-0 bg-white shadow-xl rounded-lg p-3 border border-gray-200 z-50 w-60">
                      <button
                        onClick={() => setShowMarkupPopup(false)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>

                      <div className="mt-5 mb-3 bg-gray-50 border border-gray-100 rounded p-2">
                        <label className="block text-xs text-gray-400 font-medium mb-0.5">
                          Markup Price
                        </label>
                        <input
                          type="number"
                          value={tempMarkup}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === "" || Number(val) <= 1000000) {
                              setTempMarkup(val);
                            }
                          }}
                          onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                          className="w-full bg-transparent text-lg text-gray-900 font-semibold focus:outline-none placeholder-gray-300"
                          placeholder="0"
                        />
                      </div>

                      <button
                        onClick={handleUpdateMarkup}
                        className="btn-logout text-white rounded px-4 py-1.5 text-sm font-bold hover:bg-orange-600 transition shadow-sm"
                      >
                        Update
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {showTaxDetails && (
                <div className="mt-2 pl-4 flex flex-col gap-2">
                  <div className="flex justify-between text-sm neutral-500">
                    <span>Taxes and Fees</span>
                    <span>₹{taxAndFees}</span>
                  </div>
                  {markup > 0 && (
                    <div className="flex justify-between text-sm neutral-500">
                      <span>Total Airline Tax</span>
                      <span>₹{Number(markup).toFixed(2)}</span>
                    </div>
                  )}
                </div>
              )}
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
                  {rssrFees < 0 ? "- " : ""}₹{Math.abs(rssrFees)}
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
        {/* Amount to Pay Section with Breakdown */}
        <div className="flex flex-col mt-4 pt-4 border-t border-gray-200">
          <div
            className="flex flex-row justify-between items-center cursor-pointer"
            onClick={() => setShowPaymentDetails(!showPaymentDetails)}
          >
            <div className="flex items-center gap-2">
              <strong className="text-xl-bold neutral-1000">Amount to Pay</strong>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform ${showPaymentDetails ? "rotate-180" : ""
                  }`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <div className="line-booking-right">
              {!finalStage && (
                <p className="text-xl-bold neutral-1000">
                  ₹{!onHold ? (displayAmount) : (displayAmount - totalBaggageAmount - totalMealAmount - totalSeatAmount)}
                </p>
              )}
              {finalStage && (
                <p className="text-xl-bold neutral-1000">
                  ₹{!onHold ? (displayAmount - totalBaggageAmount - totalMealAmount - totalSeatAmount) : (displayAmount - totalBaggageAmount - totalMealAmount - totalSeatAmount)}
                </p>
              )}
            </div>
          </div>

          {showPaymentDetails && (
            <div className="mt-3 pl-0 flex flex-col gap-2">
              {/* <div className="flex justify-between text-md font-medium text-gray-500">
                <span>Commission</span>
                <span>-₹0.00</span>
              </div> */}
              <div className="flex justify-between text-md font-medium text-gray-500">
                <span>Markup</span>
                <span>-₹{Number(markup).toFixed(2)}</span>
              </div>
              {/* <div className="flex justify-between text-md font-medium text-gray-500">
                <span>TDS</span>
                <span>+₹0.00</span>
              </div> */}
              <div className="flex justify-between text-md font-bold text-gray-700">
                <span>Net Price</span>
                {!finalStage && (
                  <span>₹{(!onHold ? (displayAmount) : (displayAmount - totalBaggageAmount - totalMealAmount - totalSeatAmount)) - Number(markup)}</span>
                )}
                {finalStage && (
                  <span>₹{(!onHold ? (displayAmount - totalBaggageAmount - totalMealAmount - totalSeatAmount) : (displayAmount - totalBaggageAmount - totalMealAmount - totalSeatAmount)) - Number(markup)}</span>
                )}
              </div>
            </div>
          )}
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