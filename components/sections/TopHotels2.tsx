
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TopHotels2() {
  const router = useRouter();

  const cities = [
    "Chennai",
    "Mumbai",
    "Hyderabad",
    "Delhi",
    "Dubai",
    "Paris",
    "Singapore",
    "London",
  ];

  const handleTopHotels = (city: string) => {
    if (cities.includes(city)) {
      router.push(`/hotel-listing?location=${city}&starRating=4,5`);
    } else {
      alert("Selected city is not in the list.");
    }
  };

  return (
    <>
      <section className="section-box box-top-category background-body">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-md-8">
              <h2 className="neutral-1000">Top Hotels</h2>
              {/*<p className="text-xl-medium neutral-500">
                Favorite place based on customer reviews
              </p>*/}
            </div>
            <div className="col-md-4">
              <div className="d-flex justify-content-end">
                {/* <Link className="btn btn-black-lg" href="/tour-grid">
                  View More
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 15L15 8L8 1M15 8L1 8"
                      stroke=""
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </Link> */}
              </div>
            </div>
          </div>
          <div className="box-list-populars">
            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <div className="card-popular background-card hover-up">
                  <div className="card-image">
                    <img
                      src="/assets/imgs/holiday/chennai.jpg"
                      alt="Travelogy"
                      style={{width: "100%", height: "200px", objectFit: "cover"}}
                    />
                  </div>
                  <div className="card-info">
                      <div
                        className="card-button text-center"
                        onClick={() => handleTopHotels("Chennai")}
                      >
                         {" "}
                        <Link
                      className="card-title"
                      href="/hotel-listing?location=Chennai&starRating=4,5"
                    >
                      Chennai
                    </Link>
                        {/* {" "}
                        <svg
                          width={10}
                          height={10}
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg> */}
                      </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card-popular background-card hover-up">
                  <div className="card-image">
                    <img
                      src="/assets/imgs/holiday/mumbai_1.jpg"
                      alt="Travelogy"
                      style={{width: "100%", height: "200px", objectFit: "cover"}}
                    />
                  </div>
                  <div className="card-info">
                      <div
                        className="card-button text-center"
                        onClick={() => handleTopHotels("Mumbai")}
                      >
                         {" "}
                    <Link
                      className="card-title"
                      href="/hotel-listing?location=Mumbai&starRating=4,5"
                    >
                      Mumbai
                    </Link>
                        {/* {" "}
                        <svg
                          width={10}
                          height={10}
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg> */}
                      </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card-popular background-card hover-up">
                  <div className="card-image">
                    <img
                      src="/assets/imgs/holiday/hyderabad.jpg"
                      alt="Travelogy"
                      style={{width: "100%", height: "200px", objectFit: "cover"}}
                    />
                  </div>
                  <div className="card-info">
                      <div
                        className="card-button text-center"
                        onClick={() => handleTopHotels("Hyderabad")}
                      >
                        {" "}
                    <Link className="card-title" href="/hotel-listing?location=Hyderabad&starRating=4,5">
                      Hyderabad
                    </Link>
                        {/* {" "}
                        <svg
                          width={10}
                          height={10}
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg> */}
                      </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card-popular background-card hover-up">
                  <div className="card-image">
                    <img
                      src="/assets/imgs/holiday/delhi.jpg"
                      alt="Travelogy"
                      style={{width: "100%", height: "200px", objectFit: "cover"}}
                    />
                  </div>
                  <div className="card-info">
                      <div
                        className="card-button text-center"
                        onClick={() => handleTopHotels("Delhi")}
                      >
                         {" "}
                    <Link className="card-title" href="/hotel-listing?location=Delhi&starRating=4,5">
                      Delhi
                    </Link>
                        {/* {" "}
                        <svg
                          width={10}
                          height={10}
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg> */}
                      </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card-popular background-card hover-up">
                  <div className="card-image" >
                    {" "}
                    <img
                      src="/assets/imgs/holiday/dubai.jpg"
                      alt="Travelogy"
                       style={{width: "100%", height: "200px", objectFit: "cover"}}
                    />
                  </div>
                  <div className="card-info">
                      <div
                        className="card-button text-center"
                        onClick={() => handleTopHotels("Dubai")}
                      >
                         {" "}
                    <Link className="card-title" href="/hotel-listing?location=Dubai&starRating=4,5">
                      Dubai
                    </Link>
                        {/* {" "}
                        <svg
                          width={10}
                          height={10}
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg> */}
                      </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card-popular background-card hover-up">
                  <div className="card-image" >
                    {" "}
                    <img
                      src="/assets/imgs/holiday/paris.jpg"
                      alt="Travelogy"
                       style={{width: "100%", height: "200px", objectFit: "cover"}}
                    />
                  </div>
                  <div className="card-info">
                   
                      <div
                        className="card-button text-center"
                        onClick={() => handleTopHotels("Paris")}
                      >
                         {" "}
                    <Link className="card-title" href="/hotel-listing?location=Paris&starRating=4,5">
                      Paris
                    </Link>
                        {/* {" "}
                        <svg
                          width={10}
                          height={10}
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg> */}
                      </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card-popular background-card hover-up">
                  <div className="card-image">
                    {" "}
                    <img
                      src="/assets/imgs/holiday/singapore.jpg"
                      alt="Travelogy"
                      style={{width: "100%", height: "200px", objectFit: "cover"}}
                    />
                  </div>
                  <div className="card-info">
                      <div
                        className="card-button text-center"
                        onClick={() => handleTopHotels("Singapore")}
                      >
                         {" "}
                    <Link className="card-title" href="/hotel-listing?location=Singapore&starRating=4,5">
                      Singapore
                    </Link>
                        {/* {" "}
                        <svg
                          width={10}
                          height={10}
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg> */}
                      </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card-popular background-card hover-up">
                  <div className="card-image">
                    {" "}
                    <img
                      src="/assets/imgs/holiday/london.jpg"
                      alt="Travelogy"
                       style={{width: "100%", height: "200px", objectFit: "cover"}}
                    />
                  </div>
                  <div className="card-info">
                    
                      <div
                        className="card-button text-center"
                        onClick={() => handleTopHotels("London")}
                      >
                        {" "}
                    <Link className="card-title" href="/hotel-listing?location=London&starRating=4,5">
                      London
                    </Link>
                        {/* {" "}
                        <svg
                          width={10}
                          height={10}
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg> */}
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
