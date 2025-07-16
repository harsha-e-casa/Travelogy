"use client";

import BookingForm from "@/components/elements/BookingForm";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import {
  postDataFlightDetails,
  postDataTJBookingAir,
  postData,
} from "../../services/NetworkAdapter";
import dayjs from "dayjs";
import { useSearchParams, useRouter } from "next/navigation";
import { AppContext } from "@/util/AppContext";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import AppFormAdult from "./AppFormAdult.jsx";
import AppFormChild from "./AppFormChild.jsx";
import AppFormInfant from "./AppFormInfant.jsx";
import AppFormCustomer from "./AppFormCustomer.jsx";
import type { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";
import "./MealInfo.jsx";
import "./ExtraBaggage.jsx";
import "./SessionTime.jsx";
import { notification } from "antd";
import "./style.css";
import useSessionTime from "./useSessionTime.js";
import useForceUpdate from "./useForceUpdate.js";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";

import ExtraBaggage from "./ExtraBaggage.jsx";
import MealInfo from "./MealInfo.jsx";
import SessionTime from "./SessionTime.jsx";
import SeatBooking from "./SeatBooking.jsx";

const url =
  "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

export default function BookTicket() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { getCookie, setCookie, updateemail, updatephone, removeCookie } =
    useContext(AppContext);

  interface FlightSegment {
    id: string;
    dt: string;
    at: string;
    duration: number;
    da: { code: string; city: string; name: string; terminal?: string };
    aa: { code: string; city: string; name: string; terminal?: string };
    fD: { aI: { code: string; name: string }; fN: string };
    ssrInfo?: { MEAL?: { code: string; desc: string }[] };
  }

  interface TotalPriceListSeg {
    id: string;
    fareIdentifier: string;
    pc: {
      code: string;
      name: string;
      isLcc: boolean;
    };
    fd: {
      ADULT: {
        fC: { BF: number; NF: number; TAF: number; TF: number };
        afC: { TAF: { AGST: number; OT: number; YR: number } };
        sR: number;
        bI: { iB: string; cB: string };
        rT: number;
        cc: string;
        cB: string;
        fB: string;
      };
    };
  }

  interface TripInfo {
    sI?: FlightSegment[];
    totalPriceList?: TotalPriceListSeg[];
    airFlowType?: string;
  }

  interface ApiResponse {
    status?: { success: boolean; httpStatus: number };
    tripInfos?: TripInfo[];
    totalPriceInfo?: TotalPriceInfo[];
  }
  interface TotalPriceInfo {
    totalFareDetail: {
      fC: {
        TF: number;
        BF: number;
        TAF: number;
        NF: number;
      };
      afC: {
        TAF: {
          YQ: number;
          AGST: number;
          OT: number;
        };
      };
    };
  }

  const [apiData, setApiData] = useState([]);
  const [segments, setSegments] = useState<FlightSegment[]>([]);
  const [segmentsPrice, setSegmentsPrice] = useState<TotalPriceListSeg[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalpricee, setTotalpricee] = useState<string | null>(null);
  const [tdnetPrice, setNetFare] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [isBaggageOpen, setIsBaggageOpen] = useState(false);

  const [groupedAdultsV, setGroupedAdults] = useState(null);
  const [groupedChildrenV, setGroupedChildren] = useState(null);
  const [groupedInfantsV, setGroupedInfants] = useState(null);

  const [travellerInfoV, setTravellerInfoV] = useState(null);

  const [baggageinfo, setBaggageinfo] = useState([]);
  const fareAlert = useRef({});
  const [isFareAlertModalOpen, setIsFareAlertModalOpen] = useState(false);
  const closeFareAlertModal = () => {
    setIsFareAlertModalOpen(false);
    fareAlert.current = {};
  };

  const rsData = getCookie("rs_data");
  const fetchRescheduleData = JSON.parse(rsData);
  console.log(
    "fetchRescheduleDatafetchRescheduleData == ",
    fetchRescheduleData
  );

  const [numAdults, setNumAdults] = useState(null);
  const [numChild, setNumChild] = useState(null);
  const [numInfants, setNumInfants] = useState(null);

  if (fetchRescheduleData?.searchQuery?.paxInfo?.ADULT) {
    setNumAdults(fetchRescheduleData?.searchQuery?.paxInfo?.ADULT);
  }

  if (fetchRescheduleData?.searchQuery?.paxInfo?.CHILD) {
    setNumChild(fetchRescheduleData?.searchQuery?.paxInfo?.CHILD);
  }

  if (fetchRescheduleData?.searchQuery?.paxInfo?.INFANT) {
    setNumInfants(fetchRescheduleData?.searchQuery?.paxInfo?.INFANT);
  }

  const fetchFlights = async (priceId: string) => {
    setLoading(true);
    setError(null);

    try {
      let ids = [];

      if (priceId && typeof priceId === "string") {
        ids = priceId.includes(",") ? priceId.split(",") : [priceId];
      }
      const parameter = {
        priceIds: ids,
        oldBookingId: fetchRescheduleData?.searchQuery?.oldBookingId,
        priceValidation: true,
      };
      console.log("reschedule - parameter with price id == ", parameter);

      let reqData = {
        action: "reissueReview",
        requestData: parameter,
      };
      const data: ApiResponse = await postData(
        "travelogy/one-way/fetch-data",
        reqData
      );

      if (!data.status?.success) {
        const apiErrorMessage =
          data.errors?.[0]?.message || "Unknown API error";
        const apiErrorDetails = data.errors?.[0]?.details || "";
        const fullErrorMessage = `${apiErrorMessage}${
          apiErrorDetails ? ` - ${apiErrorDetails}` : ""
        }`;

        throw new Error(fullErrorMessage);
      }

      console.log("data from page.tsx", data);
      localStorage.setItem("apiData", JSON.stringify(data));
      console.log("apidata from book-ticket page.tsx", apiData);

      // const segregateTravellerResult = segregateTravellerInfo(data?.travellers);
      // console.log("segregateTravellerResultsegregateTravellerResult ",segregateTravellerResult);

      setApiData(data);

      const firstTrip = data.tripInfos?.[0];
      setBookingId(data.bookingId);

      const segs = firstTrip?.sI;
      const id = segs?.[0]?.id.trim();

      fareAlert.current = data?.alerts?.[0] || {};
      if (Object.keys(fareAlert.current).length > 0) {
        setIsFareAlertModalOpen(true);
      }

      if (!segs || !id) {
        throw new Error("No segment or price data returned by the API");
      }

      setSelectedId(id);
      setSegments(segs);

      const totalFareDetail = data.totalPriceInfo.totalFareDetail;
      console.log("total fare detail", totalFareDetail);
      setTotalpricee(totalFareDetail);

      const netFare = totalFareDetail.fC.NF;

      setNetFare(netFare);

      const ssrInfo = segs?.[0]?.ssrInfo;
      console.log("ssr info from page.tsx", ssrInfo);
      const mealOptions = ssrInfo?.MEAL || [];

      const fareRuleInformation = firstTrip?.fareRuleInformation || {};
      setSegmentsPrice(firstTrip.totalPriceList ?? []);

      const cabinClass = data.searchQuery.cabinClass;
      console.log("Cabin Class:", cabinClass);

      const paxInfo = data.searchQuery.paxInfo;

      if (paxInfo.ADULT) {
        setNumAdults(paxInfo.ADULT);
      }

      if (paxInfo.CHILD) {
        setNumChild(paxInfo.CHILD);
      }

      if (paxInfo.INFANT) {
        setNumInfants(paxInfo.INFANT);
      }
    } catch (err: any) {
      console.error("error caused", err);

      if (err?.response?.data?.errors?.length) {
        const firstError = err.response.data.errors[0];
        const message = firstError?.message || "An unknown error occurred.";
        const details = firstError?.details ? ` - ${firstError.details}` : "";
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

  // useEffect(() => {
  //   removeCookie("travellerInfo");
  //   removeCookie("mealinfo");
  //   removeCookie("baggageinfo");
  //   removeCookie("seatSsr_amount");

  //   for (let i = 1; i <= 9; i++) {
  //     removeCookie(`adult_seat_map-${i}`);
  //     removeCookie(`child_seat_map-${i}`);
  //   }
  // }, []);

  const tcs_id = searchParams.get("tcs_id");
  useEffect(() => {
    if (tcs_id) fetchFlights(tcs_id);
  }, []);

  const { Option } = Select;

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  useEffect(() => {
    if (totalpricee) {
      console.log("Updated totalpricee:", totalpricee);
    }
  }, [totalpricee]);

  useEffect(() => {
    if (apiData) {
      console.log("api data from the page.tsx kk", apiData);
    }
  }, [apiData]);

  const searchTickets = () => {
    let departureFrom = getCookie("gy_da");
    let arrivalTo = getCookie("gy_aa");
    let adults = getCookie("gy_adult");
    let children = getCookie("gy_child");
    let cabinType = getCookie("gy_class");
    let departDate = getCookie("gy_trd");

    const mydata = {
      departureFrom: departureFrom,
      arrivalTo: arrivalTo,
      adults: adults,
      children: children,
      cabinType: cabinType,
      departDate: departDate,
    };

    const queryString = new URLSearchParams(mydata).toString(); // produces "id=10&date=1222"

    router.push(`/tickets?${queryString}`);
  };

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "Booking Sucessfully",
    });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Failed to load Razorpay SDK. Please check your internet.");
      return;
    }

    // // Open Razorpay Checkout
    // const options = {
    //   key: 'rzp_test_XePr1ssr53tEik', // Replace with your Razorpay key_id
    //   amount: '50000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //   currency: 'INR',
    //   name: 'Acme Corp',
    //   description: 'Test Transaction',
    //   order_id: 'order_IluGWxBm9U8zJ8', // This is the order_id created in the backend
    //   callback_url: 'http://localhost:3000/payment-success', // Your success URL
    //   prefill: {
    //     name: 'Gaurav Kumar',
    //     email: 'gaurav.kumar@example.com',
    //     contact: '9999999999'
    //   },
    //   theme: {
    //     color: '#F37254'
    //   },
    // };

    // const rzp = new Razorpay(options);
    // rzp.open();

    // const options: any = {
    //   key: "rzp_test_XePr1ssr53tEik", // Replace with your key
    //   amount: "10",
    //   currency: "INR",
    //   name: "Your Company Name",
    //   description: "Test Transaction",
    //   order_id: 'order_IluGWxBm9U8zJ8',
    //   handler: function (response: any) {
    //     alert("Payment Successful!");
    //     console.log("Payment Response:", response);
    //   },
    //   prefill: {
    //     name: "Test User",
    //     email: "test@example.com",
    //     contact: "9999999999",
    //   },
    //   theme: {
    //     color: "#3399cc",
    //   },
    // };

    // const paymentObject = new (window as any).Razorpay(options);
    // paymentObject.open();

    const options = {
      key: "rzp_test_r6FiJfddJh76SI", // Enter the Key ID generated from the Dashboard
      amount: "500",
      currency: "INR",
      name: "Soumya Corp.",
      description: "Test Transaction",
      order_id: "93ruhs89ere",
      handler: async function (response) {
        const data = {
          orderCreationId: "93ruhs89ere",
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        alert(data);
      },
      prefill: {
        name: "Soumya Dey",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  const [form] = Form.useForm();

  const handleNextClick = () => {
    form
      .validateFields()
      .then(() => {
        const formValues = form.getFieldsValue(true);
        console.log("all form vlaues", formValues);

        console.log(
          "Bacis Form Data:",
          formValues[`select_code`],
          formValues[`mNumber`],
          formValues[`mEmail`]
        );
        updateemail(formValues["mEmail"]);
        updatephone({
          code: formValues["select_code"],
          number: formValues["mNumber"],
        });

        const segmentinfo = apiData.tripInfos.flatMap((trip) => trip.sI || []);
        const segmentId = segmentinfo.map((segment) => segment.id).join(",");

        let baggageInfosPayload = [];
        let mealinfosPaylode = [];

        let groupedAdults = [];

        for (let i = 0; i < numAdults; i++) {
          const ti = formValues[`select-${i}`];
          const fN = formValues[`fname-${i}`];
          const lN = formValues[`lname-${i}`];
          const documentId = formValues[`documentId-${i}`];

          const seatCookie = getCookie(`adult_seat_map-${i + 1}`);
          let seatInfo = [];

          try {
            seatInfo = seatCookie ? JSON.parse(seatCookie) : [];
          } catch (error) {
            console.error(
              "Error parsing seat info for adult " + (i + 1),
              error
            );
          }

          if (ti && fN && lN) {
            const traveller = { ti, fN, lN, pt: "ADULT" };

            if (documentId) {
              traveller.di = documentId;
            }

            const baggageInfos = [];
            const mealInfos = [];

            segmentinfo.forEach((segment, flightIndex) => {
              const baggageValue =
                formValues[`adultBaggage-${flightIndex}-${i}`];
              if (baggageValue) {
                const [segmentId, baggageCode] = baggageValue.split("|");

                baggageInfos.push({
                  key: segmentId,
                  code: baggageCode,
                });

                const matchedSegment = segmentinfo.find(
                  (seg) => seg.id === segmentId
                );
                const baggageOption = matchedSegment?.ssrInfo?.BAGGAGE?.find(
                  (bag) => bag.code === baggageCode
                );

                if (baggageOption) {
                  baggageInfosPayload.push({
                    key: segmentId,
                    code: baggageCode,
                    amount: baggageOption.amount,
                  });
                }
              }

              const mealValue = formValues[`adultMeal-${flightIndex}-${i}`];
              if (mealValue) {
                const [segmentId, mealCode] = mealValue.split("|");

                mealInfos.push({
                  key: segmentId,
                  code: mealCode,
                });

                const matchedSegment = segmentinfo.find(
                  (seg) => seg.id === segmentId
                );
                const mealOption = matchedSegment?.ssrInfo?.MEAL?.find(
                  (meal) => meal.code === mealCode
                );

                if (mealOption) {
                  mealinfosPaylode.push({
                    key: segmentId,
                    code: mealCode,
                    amount: mealOption.amount,
                    desc: mealOption.desc,
                  });
                }
              }
            });
            const adultSeatInfo = [];
            if (seatInfo?.length > 0) {
              for (let i = 0; i < seatInfo.length; i++) {
                const item = seatInfo[i];
                adultSeatInfo.push({
                  key: item.flightId,
                  code: item.seat,
                });
              }
              traveller.ssrSeatInfos = adultSeatInfo;
            }
            if (baggageInfos.length > 0) {
              traveller.ssrBaggageInfos = baggageInfos;
            }
            if (mealInfos.length > 0) {
              traveller.ssrMealInfos = mealInfos;
            }
            groupedAdults.push(traveller);
          }
        }

        // Group children
        const groupedChildren = [];

        for (let i = 0; i < numChild; i++) {
          const ti = formValues[`childselect-${i}`];
          const fN = formValues[`childName-${i}`];
          const lN = formValues[`childlast-${i}`];

          const seatCookie = getCookie(`child_seat_map-${i + 1}`);
          let seatInfo = [];

          try {
            seatInfo = seatCookie ? JSON.parse(seatCookie) : [];
          } catch (error) {
            console.error(
              "Error parsing seat info for child " + (i + 1),
              error
            );
          }

          const baggageInfos = [];
          const mealInfos = [];

          console.log("groupedChildren seatInfo = ", seatInfo);

          if (ti && fN && lN) {
            const traveller = { ti, fN, lN, pt: "CHILD" };

            segmentinfo.forEach((segment, flightIndex) => {
              const baggageValue =
                formValues[`childBaggage-${flightIndex}-${i}`];
              if (baggageValue) {
                const [segmentId, baggageCode] = baggageValue.split("|");

                baggageInfos.push({ key: segmentId, code: baggageCode });

                const matchedSegment = segmentinfo.find(
                  (seg) => seg.id === segmentId
                );
                const baggageOption = matchedSegment?.ssrInfo?.BAGGAGE?.find(
                  (bag) => bag.code === baggageCode
                );

                if (baggageOption) {
                  baggageInfosPayload.push({
                    key: segmentId,
                    code: baggageCode,
                    amount: baggageOption.amount,
                  });
                }
              }

              const mealValue = formValues[`childMeal-${flightIndex}-${i}`];
              if (mealValue) {
                const [segmentId, mealCode] = mealValue.split("|");

                mealInfos.push({ key: segmentId, code: mealCode });

                const matchedSegment = segmentinfo.find(
                  (seg) => seg.id === segmentId
                );
                const mealOption = matchedSegment?.ssrInfo?.MEAL?.find(
                  (meal) => meal.code === mealCode
                );

                if (mealOption) {
                  mealinfosPaylode.push({
                    key: segmentId,
                    code: mealCode,
                    amount: mealOption.amount,
                    desc: mealOption.desc,
                  });
                }
              }
            });

            const childSeatInfo = [];
            if (seatInfo?.length > 0) {
              for (let i = 0; i < seatInfo.length; i++) {
                const item = seatInfo[i];
                childSeatInfo.push({
                  key: item.flightId,
                  code: item.seat,
                });
              }
              traveller.ssrSeatInfos = childSeatInfo;
            }

            if (baggageInfos.length > 0) {
              traveller.ssrBaggageInfos = baggageInfos;
            }

            if (mealInfos.length > 0) {
              traveller.ssrMealInfos = mealInfos;
            }

            groupedChildren.push(traveller);
          }
        }

        const groupedInfants = [];

        for (let i = 0; i < numInfants; i++) {
          const ti = formValues[`infantselect-${i}`];
          const fN = formValues[`infantName-${i}`];
          const lN = formValues[`infantLast-${i}`];
          const rawDob = formValues[`infantDOB-${i}`];
          const dob = rawDob
            ? new Date(rawDob).toISOString().split("T")[0]
            : "";

          if (ti && fN && lN && dob) {
            const traveller = { ti, fN, lN, pt: "INFANT", dob };
            groupedInfants.push(traveller);
          }
        }

        setCookie("baggageinfo", JSON.stringify(baggageInfosPayload), {
          expires: 7,
        });
        setCookie("mealinfo", JSON.stringify(mealinfosPaylode), {
          expires: 7,
        });

        const travellerInfoV = [
          ...groupedAdults,
          ...groupedChildren,
          ...groupedInfants,
        ];
        console.log("travellerinfo", travellerInfoV);
        setCookie("travellerInfo", JSON.stringify(travellerInfoV), {
          expires: 7,
        });
        console.log("document cookie", document.cookie);

        console.log("Cookies after update:", document.cookie);
        console.log("Stored Email:", getCookie("user_email"));
        console.log("Stored Phone:", getCookie("user_number"));
        console.log("Stored Email: key emale", getCookie("email"));
        console.log("Stored Phone: key number", getCookie("number"));

        const saveTravellerInfo = async () => {
          const reqTravellerInfo = {
            travellerInfoV,
            email: getCookie("email"),
            number: getCookie("number"),
          };
          console.log("reqTravellerInfo === > ", reqTravellerInfo);
          const result = await postData(
            "travelogy/flight/save-traveller-info",
            reqTravellerInfo
          );
          console.log("reqTravellerInfo result === > ", result);
        };
        saveTravellerInfo();
        router.push(`/reviewpage?tcs_id=${tcs_id}`);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const BookingSkeleton = () => {
    return (
      <section className="section-box block-content-book-tickets background-card">
        <div className="container pt-60">
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

  const handleSessionExpire = useCallback(() => {
    if (!hasExpired.current) {
      hasExpired.current = true;
      console.log("Session expired");
    }
  }, []);
  const timeLeftRef = useSessionTime(
    apiData?.conditions?.sct,
    apiData?.conditions?.st,
    handleSessionExpire
  );

  const hasExpired = useRef(false);

  function segregateTravellerInfo(travellers) {
    const segrigatedTravellerInfo = {};

    travellers.forEach((traveller) => {
      const type = traveller.pt;
      if (!segrigatedTravellerInfo[type]) {
        segrigatedTravellerInfo[type] = [];
      }
      segrigatedTravellerInfo[type].push(traveller);
    });

    return { segrigatedTravellerInfo };
  }

  return (
    <>
      {contextHolder}

      <Layout headerStyle={1} footerStyle={1}>
        <main className="main relative">
          <section className="box-section box-breadcrumb background-body">
            <div className="container pt-1">
              <ul className="breadcrumbs">
                <li>
                  {" "}
                  <Link href="/">Home</Link>
                  <span className="arrow-right">
                    <svg
                      width={7}
                      height={12}
                      viewBox="0 0 7 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 11L6 6L1 1"
                        stroke=""
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                </li>
                <li>
                  {" "}
                  <Link href="/">Tickets</Link>
                  <span className="arrow-right">
                    <svg
                      width={7}
                      height={12}
                      viewBox="0 0 7 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 11L6 6L1 1"
                        stroke=""
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                </li>
                <li>
                  {" "}
                  <span className="text-breadcrumb">Booking</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="section-box block-content-book-tickets background-card">
            <div className="container pt-1">
              <h4 className="neutral-1000 mb-20">Complete your booking</h4>

              {loading ? (
                <BookingSkeleton />
              ) : (
                <div className="row">
                  <div className="col-lg-8">
                    {apiData?.tripInfos?.map((trip, idx) => {
                      const segmentsPrice = trip?.totalPriceList || [];
                      const segments = trip?.sI || [];
                      return (
                        <>
                          {apiData?.tripInfos?.length <= 2 ? (
                            idx === 0 ? (
                              <h5>Onward Journey</h5>
                            ) : idx === 1 ? (
                              <h5 className="pt-15">Return Journey</h5>
                            ) : null
                          ) : (
                            <>
                              <h5 className="pt-15">
                                {trip?.sI?.[0]?.da?.city} →{" "}
                                {trip?.sI?.[trip?.sI.length - 1]?.aa?.city}
                              </h5>
                            </>
                          )}
                          <div className="row mt-20">
                            <div>
                              <div className="box-content-tickets-detail">
                                {!loading && !error && (
                                  <div className="box-timeline">
                                    {segments.map((seg) => {
                                      const dep = dayjs(seg.dt);
                                      const arr = dayjs(seg.at);
                                      const hrs = Math.floor(seg.duration / 60);
                                      const mins = seg.duration % 60;

                                      return (
                                        <React.Fragment key={seg.id}>
                                          <div className="item-timeline">
                                            <span className="text-xl-bold text-ads-middle">
                                              {hrs}h {mins}m
                                            </span>
                                            <div className="item-line-timeline">
                                              <div className="time-flight">
                                                <p className="text-sm-bold neutral-1000 icon-time">
                                                  {dep.format("HH:mm")}
                                                </p>
                                                <p className="text-sm-medium neutral-500">
                                                  {dep.format("DD MMM YYYY")}
                                                </p>
                                              </div>
                                              <div className="location-flight">
                                                <p className="text-xl-bold neutral-1000 mb-5">
                                                  {seg.da.city} ({seg.da.code})
                                                </p>
                                                <p className="text-sm-medium neutral-500">
                                                  {seg.da.name}
                                                  {seg.da.terminal
                                                    ? ` • ${seg.da.terminal}`
                                                    : ""}
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
                                                  {seg.fD.aI.code}-{seg.fD.fN} •
                                                  Economy
                                                </p>
                                              </div>
                                              <div className="list-flight-facilities">
                                                <li className="baggage">
                                                  <svg
                                                    width={16}
                                                    height={16}
                                                    viewBox="0 0 16 16"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path d="M14.122 7.23384H12.3453V5.80934C12.3453 5.55009 12.135 5.33991 11.8757 5.33991H9.33781C9.1025 4.62166 8.42469 4.10641 7.63672 4.10641H6.82216V0.469438C6.82216 0.210188 6.61194 0 6.35262 0H3.07384C2.81453 0 2.60428 0.210188 2.60428 0.469438V4.10644H1.78972C0.802875 4.10644 0 4.90906 0 5.89566V14.2107C0 15.1973 0.802875 16 1.78972 16H14.122C15.1575 16 16 15.1578 16 14.1225V9.11134C16 8.07609 15.1575 7.23384 14.122 7.23384ZM15.0609 9.11134V12.0802H5.77616V9.11134C5.77616 8.59378 6.19734 8.17269 6.71506 8.17269H14.122C14.6397 8.17269 15.0609 8.59375 15.0609 9.11134ZM11.4062 7.23384H9.43094V6.27878H11.4062V7.23384ZM3.54338 0.938844H5.88306V4.10641H3.54338V0.938844ZM0.939094 14.2107V5.89566C0.939094 5.42675 1.32069 5.04528 1.78972 5.04528H7.63672C8.08409 5.04528 8.45697 5.39431 8.48556 5.83991C8.48669 5.85728 8.48887 5.87431 8.49178 5.89106V7.23384H6.71503C5.6795 7.23384 4.83703 8.07609 4.83703 9.11134V14.1225C4.83703 14.4643 4.92931 14.7848 5.08962 15.0612H1.78972C1.32069 15.0612 0.939094 14.6797 0.939094 14.2107ZM14.122 15.0612H7.63672H6.71506C6.19734 15.0612 5.77616 14.6401 5.77616 14.1225V13.0191H15.0609V14.1225C15.0609 14.6401 14.6397 15.0612 14.122 15.0612Z">
                                                      {" "}
                                                    </path>
                                                  </svg>
                                                  : (Adult) Check-in :{" "}
                                                  {
                                                    segmentsPrice[0].fd.ADULT.bI
                                                      .iB
                                                  }{" "}
                                                  (01 Piece only)
                                                </li>
                                                <li className="cabin">
                                                  <svg
                                                    width={10}
                                                    height={16}
                                                    viewBox="0 0 10 16"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path d="M7.82422 3.76562H6.41016V0.9375H6.88281C7.14169 0.9375 7.35156 0.727625 7.35156 0.46875C7.35156 0.209875 7.14169 0 6.88281 0H3.11719C2.85831 0 2.64844 0.209875 2.64844 0.46875C2.64844 0.727625 2.85831 0.9375 3.11719 0.9375H3.58984V3.76562H2.17578C1.39822 3.76562 0.765625 4.39822 0.765625 5.17578V12.707C0.765625 13.3572 1.20803 13.9057 1.8075 14.0681C1.74294 14.2296 1.70703 14.4056 1.70703 14.5898C1.70703 15.3674 2.33963 16 3.11719 16C3.89475 16 4.52734 15.3674 4.52734 14.5898C4.52734 14.4241 4.49838 14.265 4.44559 14.1172H5.55437C5.50159 14.265 5.47262 14.4241 5.47262 14.5898C5.47262 15.3674 6.10522 16 6.88278 16C7.66034 16 8.29294 15.3674 8.29294 14.5898C8.29294 14.4056 8.25703 14.2296 8.19247 14.0681C8.79197 13.9057 9.23434 13.3572 9.23434 12.707V5.17578C9.23437 4.39822 8.60178 3.76562 7.82422 3.76562ZM4.52734 0.9375H5.47266V3.76562H4.52734V0.9375ZM3.58984 14.5898C3.58984 14.8505 3.37781 15.0625 3.11719 15.0625C2.85656 15.0625 2.64453 14.8505 2.64453 14.5898C2.64453 14.3292 2.85656 14.1172 3.11719 14.1172C3.37781 14.1172 3.58984 14.3292 3.58984 14.5898ZM6.88281 15.0625C6.62219 15.0625 6.41016 14.8505 6.41016 14.5898C6.41016 14.3292 6.62219 14.1172 6.88281 14.1172C7.14344 14.1172 7.35547 14.3292 7.35547 14.5898C7.35547 14.8505 7.14344 15.0625 6.88281 15.0625ZM8.29688 12.707C8.29688 12.9677 8.08484 13.1797 7.82422 13.1797H2.17578C1.91516 13.1797 1.70312 12.9677 1.70312 12.707V5.17578C1.70312 4.91516 1.91516 4.70312 2.17578 4.70312H7.82422C8.08484 4.70312 8.29688 4.91516 8.29688 5.17578V12.707Z" />
                                                    <path d="M3.11719 5.64844C2.85831 5.64844 2.64844 5.85831 2.64844 6.11719V11.7656C2.64844 12.0245 2.85831 12.2344 3.11719 12.2344C3.37606 12.2344 3.58594 12.0245 3.58594 11.7656V6.11719C3.58594 5.85831 3.37606 5.64844 3.11719 5.64844Z" />
                                                    <path d="M5 5.64844C4.74112 5.64844 4.53125 5.85831 4.53125 6.11719V11.7656C4.53125 12.0245 4.74112 12.2344 5 12.2344C5.25888 12.2344 5.46875 12.0245 5.46875 11.7656V6.11719C5.46875 5.85831 5.25888 5.64844 5 5.64844Z" />
                                                    <path d="M6.88281 5.64844C6.62394 5.64844 6.41406 5.85831 6.41406 6.11719V11.7656C6.41406 12.0245 6.62394 12.2344 6.88281 12.2344C7.14169 12.2344 7.35156 12.0245 7.35156 11.7656V6.11719C7.35156 5.85831 7.14169 5.64844 6.88281 5.64844Z">
                                                      {" "}
                                                    </path>
                                                  </svg>
                                                  Cabin baggage{" "}
                                                  {
                                                    segmentsPrice[0].fd.ADULT.bI
                                                      .cB
                                                  }
                                                </li>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="item-timeline">
                                            <div className="item-line-timeline">
                                              <div className="time-flight">
                                                <p className="text-sm-bold neutral-1000 icon-time">
                                                  {arr.format("HH:mm")}
                                                </p>
                                                <p className="text-sm-medium neutral-500">
                                                  {arr.format("DD MMM YYYY")}
                                                </p>
                                              </div>
                                              <div className="location-flight">
                                                <p className="text-xl-bold neutral-1000">
                                                  {seg.aa.city} ({seg.aa.code})
                                                </p>
                                                <p className="text-sm-medium neutral-500">
                                                  {seg.aa.name}
                                                  {seg.aa.terminal
                                                    ? ` • ${seg.aa.terminal}`
                                                    : ""}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </React.Fragment>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <div className="col-lg-4">
                    <div className="booking-form add_sticky">
                      <div className="head-booking-form">
                        <p className="text-xl-bold neutral-1000">
                          Fare Summary
                        </p>
                      </div>
                      <BookingForm
                        totalpricee={totalpricee}
                        segmentsPrice={segmentsPrice}
                      />
                    </div>
                  </div>
                </div>
              )}

              {loading ? (
                <BookingSkeleton />
              ) : (
                <>
                  <div className="row mt-20">
                    <div className="col-lg-8 ">
                      <section
                        aria-labelledby="applicant-information-title"
                        className="mt-20"
                      >
                        <div className="bg-white shadow sm:rounded-lg relative">
                          <div className="px-4 py-3 border_xcolor_1px">
                            <h2
                              id="applicant-information-title"
                              className="text-lg leading-6 font-bold text-gray-900"
                            >
                              Traveller Details
                            </h2>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                              Log in to view your saved traveller list, unlock
                              amazing deals & much more!
                            </p>

                            <a
                              className="btn btn-brand-secondary p-3 pt-1 pb-1 absolute right-4 top-4"
                              href="#"
                            >
                              Login
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 15L15 8L8 1M15 8L1 8"
                                  stroke=""
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  {" "}
                                </path>
                              </svg>
                            </a>
                          </div>
                          <div className="border-t border-gray-200 px-4 py-4 sm:px-6 border_xcolor_1px">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                              <div className="sm:col-span-1">
                                <dd className="mt-1 text-sm font-medium text-gray-900">
                                  <Avatar
                                    className="mr-1"
                                    style={{
                                      backgroundColor: "rgb(255 201 84)",
                                    }}
                                    icon={
                                      <UserOutlined className="text-black" />
                                    }
                                  />{" "}
                                  ADULT (12 yrs+)
                                </dd>
                              </div>
                              <div className="sm:col-span-2 pb-4">
                                <dd className="text-sm text-gray-900">
                                  <ul
                                    role="list"
                                    className="border border-gray-200 rounded-md divide-y divide-gray-200 pb-2"
                                  >
                                    {Array.from({ length: numAdults }).map(
                                      (_, index) => (
                                        <div className="p-3" key={index}>
                                          <span className="text-sm leading-5 font-bold text-gray-900">
                                            ADULT {index + 1}
                                          </span>
                                          <AppFormAdult
                                            form={form}
                                            index={index}
                                            showDocumentField={
                                              apiData?.conditions?.dc?.ida ===
                                              true
                                            }
                                            // fieldData={aaaaaaaaaaaaaa}
                                            disabled={true}
                                          />
                                        </div>
                                      )
                                    )}
                                  </ul>
                                </dd>
                              </div>
                            </dl>

                            {numChild ? (
                              <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                  <dd className="mt-1 text-sm font-medium text-gray-900">
                                    <Avatar
                                      className="mr-1"
                                      style={{
                                        backgroundColor: "rgb(254 99 214)",
                                      }}
                                      icon={
                                        <UserOutlined className="text-black" />
                                      }
                                    />{" "}
                                    CHILD (2-12 Yrs){" "}
                                  </dd>
                                </div>

                                <div className="sm:col-span-2 pb-4">
                                  <dd className="text-sm text-gray-900">
                                    <ul
                                      role="list"
                                      className="border border-gray-200 rounded-md divide-y divide-gray-200"
                                    >
                                      {Array.from({ length: numChild }).map(
                                        (_, index) => (
                                          <div className="p-3" key={index}>
                                            <span className="text-sm leading-5 font-bold text-gray-900">
                                              CHILD {index + 1}
                                            </span>
                                            <AppFormChild
                                              form={form}
                                              index={index}
                                            />
                                          </div>
                                        )
                                      )}
                                    </ul>
                                  </dd>
                                </div>
                              </dl>
                            ) : null}
                            {numInfants ? (
                              <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                  <dd className="mt-1 text-sm font-medium text-gray-900">
                                    <Avatar
                                      className="mr-1"
                                      style={{ backgroundColor: "#ebc7ff" }}
                                      icon={
                                        <UserOutlined className="text-black" />
                                      }
                                    />{" "}
                                    Infant (15 days - 2 Yrs){" "}
                                  </dd>
                                </div>

                                <div className="sm:col-span-2 pb-4">
                                  <dd className="text-sm text-gray-900">
                                    <ul
                                      role="list"
                                      className="border border-gray-200 rounded-md divide-y divide-gray-200"
                                    >
                                      {Array.from({ length: numInfants }).map(
                                        (_, index) => (
                                          <div className="p-3" key={index}>
                                            <span className="text-sm leading-5 font-bold text-gray-900">
                                              INFANT {index + 1}
                                            </span>
                                            <AppFormInfant
                                              form={form}
                                              index={index}
                                            />
                                          </div>
                                        )
                                      )}
                                    </ul>
                                  </dd>
                                </div>
                              </dl>
                            ) : null}
                          </div>

                          <div className="px-4 py-3 border_xcolor_1px">
                            <h2
                              id="applicant-information-title"
                              className="text-lg leading-6 font-bold text-gray-900"
                            >
                              Booking details will be sent to
                            </h2>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                              This is where your confirmation will be sent
                            </p>

                            <a
                              className="btn btn-brand-secondary p-3 pt-1 pb-1 absolute right-4 top-4"
                              href="#"
                            >
                              Login
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 15L15 8L8 1M15 8L1 8"
                                  stroke=""
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  {" "}
                                </path>
                              </svg>
                            </a>
                          </div>
                          <AppFormCustomer form={form} />

                          <div className="text-lg leading-6 font-bold text-gray-900 p-4">
                            Add Meal and Baggage
                            <div>
                              <div className="px-4 py-3 border_xcolor_1px">
                                <h2
                                  id="applicant-information-title"
                                  className="text-lg leading-6 font-bold text-gray-900"
                                >
                                  Baggage
                                </h2>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                  <ExtraBaggage
                                    form={form}
                                    numAdults={numAdults}
                                    numChild={numChild}
                                    numInfants={numInfants}
                                    apiData={apiData}
                                  />
                                </p>
                              </div>

                              <div className="px-4 py-3 border_xcolor_1px">
                                <h2
                                  id="applicant-information-title"
                                  className="text-lg leading-6 font-bold text-gray-900"
                                >
                                  Meal
                                </h2>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                  <MealInfo
                                    form={form}
                                    numAdults={numAdults}
                                    numChild={numChild}
                                    numInfants={numInfants}
                                    apiData={apiData}
                                  />
                                </p>
                              </div>
                            </div>
                          </div>

                          {apiData?.conditions?.isa === true && (
                            <div className="text-lg leading-6 font-bold text-gray-900 p-4">
                              Add Seats
                              <div>
                                <div className="px-4 py-3 border_xcolor_1px">
                                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    <SeatBooking
                                      numAdults={numAdults}
                                      numChild={numChild}
                                      apiData={apiData}
                                    />
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="bg-white shadow sm:rounded-lg relative">
                            <div className="px-4 py-3 border_xcolor_1px flex justify-between">
                              <button className="cursor-pointer border-2 border-black px-4 py-2 bg-yellow-300 hover:bg-yellow-400 transition">
                                Back
                              </button>

                              <button
                                onClick={handleNextClick}
                                className="cursor-pointer border-2 border-black px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-black transition inline-block text-center"
                              >
                                Continue
                              </button>
                            </div>
                          </div>

                          <div className="px-4 py-3 border_xcolor_1px">
                            <a
                              className="btn btn-brand-secondary p-3 pt-1 pb-1 absolute right-4 top-4"
                              href="#"
                            >
                              Login
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 15L15 8L8 1M15 8L1 8"
                                  stroke=""
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                >
                                  {" "}
                                </path>
                              </svg>
                            </a>
                          </div>
                        </div>
                        <br />
                        <br />
                      </section>
                    </div>
                  </div>
                </>
              )}

              {Object.keys(fareAlert.current).length > 0 &&
                isFareAlertModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white border-2 border-black w-96 p-6 rounded-lg text-center shadow-lg">
                      <p className="text-red-600 mb-4 font-semibold">
                        Old Fare: {fareAlert.current.oldFare}
                      </p>
                      <p className="text-red-600 mb-4 font-semibold">
                        New Fare: {fareAlert.current.newFare}
                      </p>

                      <button
                        className="border-2 border-black px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
                        onClick={closeFareAlertModal}
                      >
                        Ok, Got It
                      </button>
                    </div>
                  </div>
                )}

              {error && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white border-2 border-black w-96 p-6 rounded-lg text-center shadow-lg">
                    <p className="text-red-600 mb-4 font-semibold">
                      Error: {error}
                    </p>

                    <button
                      className="border-2 border-black px-4 py-2 bg-gray-100 hover:bg-gray-200 transition"
                      onClick={searchTickets}
                    >
                      Ok, Got It
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
          {/* {loading ? null : (
            <div className="session shadow sm:rounded-sm text-md sticky bottom-0 z-50 mt-5 p-2 text-center">
              <SessionTime
                timeLeftRef={timeLeftRef}
                searchTickets={searchTickets}
              />
            </div>
          )} */}
        </main>
      </Layout>
    </>
  );
}
