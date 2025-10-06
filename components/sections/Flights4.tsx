"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { swiperGroupAnimate } from "@/util/swiperOption";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { postData } from "@/services/NetworkAdapter";
import { AppContext } from "@/util/AppContext";
import "swiper/css";
import "swiper/css/navigation";

export default function Flights4() {
  const { setCookie } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState<any[]>([]);
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const cabinMap: Record<string, string> = {
    PREMIUM_ECONOMY: "a",
    ECONOMY: "b",
    BUSINESS: "c",
    FIRST: "d",
  };

  const buildTicketHref = (item: any) => {
    const sI = item?.data?.sI || [];
    const first = sI[0];
    const last = sI[sI.length - 1];

    const departureFrom = first?.da?.code ?? "";
    const arrivalTo = last?.aa?.code ?? "";
    const departDate = first?.dt?.slice(0, 10) ?? ""; // YYYY-MM-DD
    const returnDate = last?.at?.slice(0, 10) ?? departDate;

    const departureFromSr = first?.da?.city ?? "";
    const arrivalToSr = last?.aa?.city ?? "";

    const cabinCode =
      item?.data?.totalPriceList?.[0]?.fd?.ADULT?.cc ?? "ECONOMY";
    const cabinType = cabinMap[cabinCode] ?? "a";

    // If you want to use the counts from your search request, hardcode them here:
    const adults = "1";
    const children = "0";
    const infant = "0";

    //update in cookies
    setCookie("gy_aa", departureFrom);
    setCookie("gy_aa_str", departureFromSr);
    setCookie("gy_da", arrivalTo);
    setCookie("gy_da_str", arrivalToSr);
    setCookie("gy_adult", adults);
    setCookie("gy_child", children);
    setCookie("gy_infant", infant);
    setCookie("gy_class", cabinType);
    setCookie("gy_direct_flight", false);
    setCookie("gy_passender_type", "REGULAR");
    setCookie("gy_trd", departDate);
    setCookie("gy_triptype", "one-way");

    return {
      pathname: "/tickets",
      query: {
        departureFrom,
        arrivalTo,
        adults,
        children,
        infant,
        cabinType,
        departDate,
        departureFromSr,
        arrivalToSr,
        tripType: "one-way",
        passengerType: "REGULAR",
        returnDate,
      },
    };
  };

  const primeCookiesFromItem = (item: any) => {
    const sI = item?.data?.sI || [];
    const first = sI[0];
    const last = sI[sI.length - 1];

    const departureFrom = first?.da?.code ?? "";
    const arrivalTo = last?.aa?.code ?? "";
    const departDate = first?.dt?.slice(0, 10) ?? "";
    const returnDate = last?.at?.slice(0, 10) ?? departDate;

    const departureFromSr = first?.da?.city ?? "";
    const arrivalToSr = last?.aa?.city ?? "";

    const cabinCode =
      item?.data?.totalPriceList?.[0]?.fd?.ADULT?.cc ?? "ECONOMY";
    const cabinMap: Record<string, string> = {
      ECONOMY: "e",
      PREMIUM_ECONOMY: "pe",
      BUSINESS: "b",
      FIRST: "f",
    };
    const cabinType = cabinMap[cabinCode] ?? "e";

    const adults = "1";
    const children = "0";
    const infant = "0";

    // set cookies (add expires/path as needed)
    setCookie("gy_aa", departureFrom); // from
    setCookie("gy_aa_str", departureFromSr);
    setCookie("gy_da", arrivalTo); // to
    setCookie("gy_da_str", arrivalToSr);
    setCookie("gy_adult", adults);
    setCookie("gy_child", children);
    setCookie("gy_infant", infant);
    setCookie("gy_class", cabinType);
    setCookie("gy_direct_flight", false);
    setCookie("gy_passender_type", "REGULAR");
    setCookie("gy_trd", departDate);
    setCookie("gy_triptype", "one-way");
    setCookie("gy_return", returnDate);
  };

  const formatINR = (n?: number) =>
    typeof n === "number"
      ? new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n)
      : "-";

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const result: any = await postData(
          "/travelogy/flight/fetechTopFlights",
          {},
          { Authorization: `Bearer ${token}` }
        );
        // result shape = { date, count, results: [...] }
        if (mounted && result?.results) setApiData(result.results);
      } catch (e) {
        console.error("Top flights fetch failed:", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [token]);

  return (
    <>
      {!loading && (
        <>
          <section className="section-box background-body">
            <div className="container">
              <div className="row align-items-end">
                <div className="col-md-9 mb-30 wow fadeInUp">
                  <h2 className="title-svg neutral-1000">
                    <svg
                      width={27}
                      height={39}
                      viewBox="0 0 27 39"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.9721 38.9991C8.7171 38.9991 4.81518 36.9218 2.26676 33.3001C-2.75855 26.158 2.51539 14.3625 2.74208 13.8636C2.9258 13.4594 3.52612 13.5316 3.60747 13.9699C3.76126 14.8015 4.29256 16.7779 5.15293 17.7806C5.10151 14.7925 5.50964 5.77322 11.837 0.116751C12.0555 -0.0784021 12.5434 -0.0722321 12.6046 0.489233C12.7694 2.00841 13.5182 7.07279 16.2396 8.45395C16.5072 8.59014 19.041 11.7859 19.4825 14.7516C19.9265 14.1746 20.5412 12.9299 20.8221 10.3182C20.8639 9.92925 21.3458 9.7702 21.6118 10.0561C21.708 10.1596 31.1506 20.547 24.5663 32.0572C22.0801 36.4045 17.7458 38.9991 12.9718 38.9991H12.9721Z"
                        fill="#FFA725"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.6808 35.7816C16.2031 35.7816 18.5162 34.5504 20.0269 32.4035C23.0058 28.1695 19.8795 21.1774 19.7451 20.8817C19.6361 20.642 19.2803 20.6849 19.2321 20.9448C19.1409 21.4377 18.826 22.6093 18.316 23.2036C18.3464 21.4322 18.1046 16.0858 14.3538 12.7326C14.2242 12.6169 13.9351 12.6206 13.8988 12.9533C13.801 13.8539 13.3572 16.8559 11.7439 17.6747C11.5853 17.7554 10.0832 19.65 9.82136 21.408C9.5581 21.0659 9.19362 20.328 9.02726 18.7798C9.00235 18.5492 8.71671 18.4548 8.55926 18.6244C8.50213 18.6859 2.90484 24.8435 6.80791 31.6665C8.28184 34.2435 10.8511 35.7816 13.6812 35.7816H13.6808Z"
                        fill="#FF871E"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.85986 33.1274C9.45699 33.1274 9.24767 32.6357 9.53674 32.3471L16.8513 25.0323C17.2775 24.6061 17.9233 25.2537 17.498 25.6787L10.1832 32.9935C10.0939 33.0829 9.97709 33.1274 9.85986 33.1274Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.1965 28.6139C8.66976 28.6139 8.66816 24.77 11.196 24.77C13.7241 24.77 13.7229 28.6139 11.1965 28.6139ZM11.1965 25.6834C10.3041 25.6834 9.84959 26.7698 10.4835 27.4041C11.4056 28.3264 12.8596 26.93 11.9092 25.9789C11.7189 25.7881 11.4659 25.6834 11.1965 25.6834Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.839 33.2555C13.3121 33.2555 13.3109 29.4119 15.839 29.4119C18.3668 29.4119 18.3666 33.2555 15.839 33.2555ZM15.839 30.3252C14.9464 30.3252 14.4923 31.4116 15.1262 32.046C16.0481 32.9685 17.5021 31.5713 16.552 30.6207C16.3616 30.4299 16.1082 30.3252 15.839 30.3252Z"
                        fill="white"
                      />
                    </svg>
                    Top Flight Starting From
                  </h2>
                </div>
                <div className="col-md-3 position-relative mb-30 wow fadeInUp">
                  <div className="box-button-slider box-button-slider-team justify-content-end">
                    <div
                      ref={prevRef}
                      className="swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div
                      ref={nextRef}
                      className="swiper-button-next swiper-button-next-style-1 swiper-button-next-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="block-flights">
              <div className="box-swiper-padding container-slider">
                <div className="box-swiper mt-30">
                  <div className="swiper-container swiper-group-animate swiper-group-journey">
                    <Swiper
                      {...swiperGroupAnimate}
                      modules={[Navigation]}
                      navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                      }}
                      onInit={(swiper) => {
                        if (prevRef.current && nextRef.current) {
                          swiper.params.navigation.prevEl = prevRef.current;
                          swiper.params.navigation.nextEl = nextRef.current;
                          swiper.navigation.destroy();
                          swiper.navigation.init();
                          swiper.navigation.update();
                        }
                      }}
                    >
                      {apiData.length === 0 && (
                        <SwiperSlide>
                          <div className="p-6 text-center text-sm neutral-500">
                            No offers available right now.
                          </div>
                        </SwiperSlide>
                      )}

                      {apiData.map((item: any, idx: number) => {
                        const sI = item?.data?.sI ?? [];
                        const first = sI[0];
                        const last = sI[sI.length - 1];
                        const airline = first?.fD?.aI?.name;
                        const airlineCode = first?.fD?.aI?.code;
                        const fromCity = first?.da?.city ?? item?.from;
                        const toCity = last?.aa?.city ?? item?.to;
                        const outDate = first?.dt
                          ? dayjs(first.dt).format("DD MMM YYYY")
                          : "-";
                        const inDate = last?.at
                          ? dayjs(last.at).format("DD MMM YYYY")
                          : "-";
                        const priceObj =
                          item?.data?.totalPriceList?.[0]?.fd?.ADULT?.fC;
                        const netFare = priceObj?.NF;
                        const fareType =
                          item?.data?.totalPriceList?.[0]?.fareIdentifier;

                        return (
                          <SwiperSlide key={idx}>
                            <div className="card-flight background-card">
                              <div className="card-image">
                                {/* Static image placeholder; swap if you have airline logos */}
                                <img
                                  src="/assets/imgs/page/homepage1/flight2.png"
                                  alt={airline || "Flight"}
                                />
                              </div>

                              <div className="card-info">
                                {fareType === "SALE" && (
                                  <label className="sale-lbl">SALE</label>
                                )}

                                <div className="card-date">
                                  <span className="date-1">{outDate}</span>
                                  <span className="line" />
                                  <span className="date-1">{inDate}</span>
                                </div>

                                <div className="card-route">
                                  <h6 className="route-name neutral-1000">
                                    {fromCity}
                                  </h6>
                                  <span className="icon-route" />
                                  <h6 className="route-name neutral-1000">
                                    {toCity}
                                  </h6>
                                </div>

                                <div className="card-price">
                                  <div className="card-price-1">
                                    {/* <p className="text-md-medium">
                                      {airline}{" "}
                                      {first?.fD?.fN
                                        ? `• ${airlineCode}${first.fD.fN}`
                                        : ""}
                                    </p> */}
                                    <p>Starting From</p>
                                    <h6 className="neutral-1000">
                                      ₹ {formatINR(netFare)}
                                    </h6>
                                  </div>

                                  {/* Example: show class & baggage from ADULT */}
                                  <div className="card-price-1">
                                    <p className="text-md-medium">
                                      {item?.data?.totalPriceList?.[0]?.fd
                                        ?.ADULT?.cc ?? "ECONOMY"}
                                    </p>
                                    <p
                                      className="text-md-small neutral-1000"
                                      style={{ fontWeight: "800" }}
                                    >
                                      {item?.data?.totalPriceList?.[0]?.fd
                                        ?.ADULT?.bI?.iB ?? ""}
                                    </p>
                                  </div>
                                </div>

                                <div className="card-meta">
                                  <div className="card-seats">
                                    <p className="text-md-medium neutral-500">
                                      {/* Seats left not in response; show duration instead */}
                                      {sI.length > 0
                                        ? `${Math.floor(
                                            (first?.duration ?? 0) / 60
                                          )}h ${(first?.duration ?? 0) % 60}m`
                                        : ""}
                                    </p>
                                  </div>
                                  <div className="card-button">
                                    <Link
                                      className="btn btn-gray"
                                      href={buildTicketHref(item)}
                                      onClick={() => primeCookiesFromItem(item)}
                                    >
                                      Search Now
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {loading && <p className="text-center py-6">Fetching best flights…</p>}
    </>
  );
}
