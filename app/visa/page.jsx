"use client";
import ByPagination from "@/components/Filter/ByPagination";
import CagegoryFilter2 from "@/components/elements/CagegoryFilter2";
import SearchFilterBottom from "@/components/elements/SearchFilterBottom";
import SortHotelsFilter from "@/components/elements/SortHotelsFilter";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { Button } from "antd";
import VisaForm from "./visaform";
import { useState, useEffect } from "react";
import LoveUs from "@/components/sections/LoveUs";
export default function VisaPage() {
  const [isAccordion, setIsAccordion] = useState(0);

  const handleAccordion = (key) => {
    setIsAccordion((prevState) => (prevState === key ? null : key));
  };

  // useEffect(() => {
  //   // Add smooth scrolling to all anchor links with href starting with #
  //   const anchors = document.querySelectorAll('a[href^="#"]');
  //   anchors.forEach((anchor) => {
  //     anchor.addEventListener("click", function (e) {
  //       e.preventDefault();
  //       const targetElement = document.querySelector(this.getAttribute("href"));
  //       if (targetElement) {
  //         targetElement.scrollIntoView({
  //           behavior: "smooth",
  //         });
  //       }
  //     });
  //   });

  //   // Cleanup event listeners when component unmounts
  //   return () => {
  //     anchors.forEach((anchor) => {
  //       anchor.removeEventListener("click", function (e) {
  //         e.preventDefault();
  //         const targetElement = document.querySelector(
  //           this.getAttribute("href")
  //         );
  //         if (targetElement) {
  //           targetElement.scrollIntoView({
  //             behavior: "smooth",
  //           });
  //         }
  //       });
  //     });
  //   };
  // }, []); // Empty dependency array to run effect only once on mount

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div className="bg-white lg:overflow-hidden">
          <div className="w-full">
            <div className="">
              <div className="mx-auto px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center text-center">
                <div className="pb-10">
                  <h1 className="text-1x2 tracking-tight font-extrabold text-black sm:text-6xl xl:text-6xl">
                    <span className="block p-4">
                      Get a tourist visa, quick and easy.
                    </span>
                  </h1>
                  <VisaForm />
                </div>
              </div>
            </div>

            {/* <div className="flex flex-wrap w-1/2 mx-auto gap-2 justify-center">
              <div>
                <Button shape="round">United Arab Emirates (Dubai) (AE)</Button>{" "}
              </div>
              <div>
                <Button shape="round"> Spain (ES) </Button>
              </div>
              <div>
                <Button shape="round"> Vietnam (VN) </Button>
              </div>
              <div>
                <Button shape="round"> Malaysia (MY) </Button>
              </div>
              <div>
                <Button shape="round"> Australia (AU) </Button>
              </div>
              <div>
                <Button shape="round"> 40+ Countries </Button>
              </div>
            </div> */}
          </div>
        </div>
        <div className="container pt-30 pb-80">
          <LoveUs />
        </div>
        <section className="section-box box-how-it-work background-body">
          <div className="container">
            {/*<div className="text-center wow fadeInUp">*/}
            <div className="text-center">
              {/*<h2 className="neutral-1000">How It Work?</h2>*/}
              {/*<p className="text-xl-medium neutral-500">Competitive fares for your route-specific searches.</p>*/}
            </div>
            <div className="row mt-60 align-items-center">
              {/*<div className="col-lg-6 wow fadeInUp">*/}

              <div className="col-lg-6">
                <div className="text-center pb-4">
                  <h2 className="neutral-1000">How it works?</h2>
                </div>
                {/*<div className="card-why-travel card-why-travel-2 background-1 wow fadeInUp">*/}
                <div className="card-why-travel card-why-travel-2 background-1">
                  <div className="card-image">
                    {" "}
                    <img
                      src="/assets/imgs/page/homepage2/security.svg"
                      alt="Travelogy"
                    />
                  </div>
                  <div className="card-info">
                    {" "}
                    <Link className="text-xl-bold card-title" href="#">
                      You submit the details
                    </Link>
                    <p className="text-sm-medium neutral-500 card-desc">
                      This is a simple process that can be done entirely online.
                    </p>
                    <Link className="text-sm-medium card-link" href="#">
                      Learn More
                      <svg
                        width={11}
                        height={10}
                        viewBox="0 0 11 10"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.50011 9.08347L9.58347 5.00011L5.50011 0.916748M9.58347 5.00011L1.41675 5.00011"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
                {/*<div className="card-why-travel card-why-travel-2 background-2 wow fadeInUp">*/}
                <div className="card-why-travel card-why-travel-2 background-2">
                  <div className="card-image">
                    {" "}
                    <img
                      src="/assets/imgs/page/homepage2/support.svg"
                      alt="Travelogy"
                    />
                  </div>
                  <div className="card-info">
                    {" "}
                    <Link className="text-xl-bold card-title" href="#">
                      We work our magic
                    </Link>
                    <p className="text-sm-medium neutral-500 card-desc">
                      We process your visa. Easily track progress via your
                      account
                    </p>
                    <Link className="text-sm-medium card-link" href="#">
                      Learn More
                      <svg
                        width={11}
                        height={10}
                        viewBox="0 0 11 10"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.50011 9.08347L9.58347 5.00011L5.50011 0.916748M9.58347 5.00011L1.41675 5.00011"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
                {/*<div className="card-why-travel card-why-travel-2 background-3 wow fadeInUp">*/}
                <div className="card-why-travel card-why-travel-2 background-3">
                  <div className="card-image">
                    {" "}
                    <img
                      src="/assets/imgs/page/homepage2/policy.svg"
                      alt="Travelogy"
                    />
                  </div>
                  <div className="card-info">
                    {" "}
                    <Link className="text-xl-bold card-title" href="#">
                      You get your visa
                    </Link>
                    <p className="text-sm-medium neutral-500 card-desc">
                      Get your visa, once it’s approved. It's that easy
                    </p>
                    <Link className="text-sm-medium card-link" href="#">
                      Learn More
                      <svg
                        width={11}
                        height={10}
                        viewBox="0 0 11 10"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.50011 9.08347L9.58347 5.00011L5.50011 0.916748M9.58347 5.00011L1.41675 5.00011"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="box-image-how">
                  <div className="image-top-how">
                    {" "}
                    <img
                      src="/assets/imgs/page/homepage4/img-how.png"
                      alt="Travelogy"
                    />
                  </div>
                  <div className="image-bottom-how">
                    {" "}
                    <img
                      src="/assets/imgs/page/homepage4/img-how2.png"
                      alt="Travelogy"
                    />
                    <img
                      src="/assets/imgs/page/homepage4/img-how3.png"
                      alt="Travelogy"
                    />
                    <div className="shape">
                      {" "}
                      <img
                        className="light-mode"
                        src="/assets/imgs/page/homepage4/wave.png"
                        alt="Travelogy"
                      />
                      <img
                        className="dark-mode"
                        src="/assets/imgs/page/homepage4/wave-dark.png"
                        alt="Travelogy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="block-faqs">
          <div className="accordion" id="accordionFAQ">
            <div className="accordion-item wow fadeInUp">
              <h5 className="accordion-header" id="headingOne">
                <button
                  className={
                    isAccordion == 1
                      ? "accordion-button text-heading-5"
                      : "accordion-button text-heading-5 collapsed"
                  }
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  onClick={() => handleAccordion(1)}
                >
                  <h3>01</h3>
                  <p>Why should I use Travalogy?</p>
                </button>
              </h5>
              <div
                className={
                  isAccordion == 1
                    ? "accordion-collapse collapse show"
                    : "accordion-collapse collapse"
                }
                id="collapseOne"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionFAQ"
              >
                <div className="accordion-body">
                  Travalogy makes it easy for you to apply for your travel visa.
                  Instead of spending hours trying to find information on the
                  process and navigating embassy websites, you can answer a few
                  easy questions on Travalogy and we apply for and manage the
                  entire visa process on your behalf.
                </div>
              </div>
            </div>
            <div className="accordion-item wow fadeInUp">
              <h5 className="accordion-header" id="headingTwo">
                <button
                  className={
                    isAccordion == 2
                      ? "accordion-button text-heading-5"
                      : "accordion-button text-heading-5 collapsed"
                  }
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  onClick={() => handleAccordion(2)}
                >
                  <h3>02</h3>
                  <p>What do I need to do?</p>
                </button>
              </h5>
              <div
                className={
                  isAccordion == 2
                    ? "accordion-collapse collapse show"
                    : "accordion-collapse collapse"
                }
                id="collapseTwo"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionFAQ"
              >
                <div className="accordion-body">
                  Applying for visa with Travalogy is simple and quick. Answer a
                  few basic questions about your trip, pay the visa fee and you
                  are good to go. Certain embassy require additional travel
                  documents for your trip. In such a case, post payment, you can
                  upload the documents on our website or send them to us easily
                  on WhatsApp.
                </div>
              </div>
            </div>
            <div className="accordion-item wow fadeInUp">
              <h5 className="accordion-header" id="headingThree">
                <button
                  className={
                    isAccordion == 3
                      ? "accordion-button text-heading-5"
                      : "accordion-button text-heading-5 collapsed"
                  }
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  onClick={() => handleAccordion(3)}
                >
                  <h3>03</h3>
                  <p>When will I get my visa?</p>
                </button>
              </h5>
              <div
                className={
                  isAccordion == 3
                    ? "accordion-collapse collapse show"
                    : "accordion-collapse collapse"
                }
                id="collapseThree"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionFAQ"
              >
                <div className="accordion-body">
                  Each country has its own timelines for approving the visa.
                  Kindly select the country you’d like to go to to understand
                  visa processing timelines.
                </div>
              </div>
            </div>
            <div className="accordion-item wow fadeInUp">
              <h5 className="accordion-header" id="headingFour">
                <button
                  className={
                    isAccordion == 4
                      ? "accordion-button text-heading-5"
                      : "accordion-button text-heading-5 collapsed"
                  }
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                  onClick={() => handleAccordion(4)}
                >
                  <h3>04</h3>
                  <p>Why is my destination not on the list?</p>
                </button>
              </h5>
              <div
                className={
                  isAccordion == 4
                    ? "accordion-collapse collapse show"
                    : "accordion-collapse collapse"
                }
                id="collapseFour"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionFAQ"
              >
                <div className="accordion-body">
                  We’re sorry for this. Travalogy currently only provides
                  tourist visas to a few countries. We’ll be launching other
                  countries and types of visas soon.
                </div>
              </div>
            </div>
            <div className="accordion-item wow fadeInUp">
              <h5 className="accordion-header" id="headingFive">
                <button
                  className={
                    isAccordion == 5
                      ? "accordion-button text-heading-5"
                      : "accordion-button text-heading-5 collapsed"
                  }
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  aria-expanded="false"
                  aria-controls="collapseFive"
                  onClick={() => handleAccordion(5)}
                >
                  <h3>05</h3>
                  <p>
                    What are the working hours, and what can I expect in terms
                    of response times?
                  </p>
                </button>
              </h5>
              <div
                className={
                  isAccordion == 5
                    ? "accordion-collapse collapse show"
                    : "accordion-collapse collapse"
                }
                id="collapseFive"
                aria-labelledby="headingFive"
                data-bs-parent="#accordionFAQ"
              >
                <div className="accordion-body">
                  For any other questions, WhatsApp us on +917550071116.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container pt-120 pb-80">
          <div className="text-center">
            <h2 className="neutral-1000">Why Travel With Us?</h2>
            <p className="text-xl-medium neutral-500">
              The best booking platform you can trust
            </p>
          </div>
          <div className="row mt-55">
            <div className="col-lg-3 col-md-6">
              <div className="card-why-travel background-2 hover-up">
                <div className="card-image">
                  <img
                    src="/assets/imgs/page/homepage2/security.svg"
                    alt="Visa Services"
                  />
                </div>
                <div className="card-info">
                  <a className="text-xl-bold card-title" href="#">
                    Easy Visa Application
                  </a>
                  <p className="text-sm-medium neutral-500 card-desc">
                    Simplified process for obtaining your visa with minimal
                    hassle.
                  </p>
                  <a className="text-sm-medium card-link" href="#">
                    Learn More
                    <svg
                      width={11}
                      height={10}
                      viewBox="0 0 11 10"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.50011 9.08347L9.58347 5.00011L5.50011 0.916748M9.58347 5.00011L1.41675 5.00011"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card-why-travel background-7 hover-up">
                <div className="card-image">
                  <img
                    src="/assets/imgs/page/homepage2/support.svg"
                    alt="Visa Services"
                  />
                </div>
                <div className="card-info">
                  <a className="text-xl-bold card-title" href="#">
                    24/7 Visa Assistance
                  </a>
                  <p className="text-sm-medium neutral-500 card-desc">
                    Get expert support for visa-related queries anytime,
                    anywhere.
                  </p>
                  <a className="text-sm-medium card-link" href="#">
                    Learn More
                    <svg
                      width={11}
                      height={10}
                      viewBox="0 0 11 10"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.50011 9.08347L9.58347 5.00011L5.50011 0.916748M9.58347 5.00011L1.41675 5.00011"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card-why-travel background-3 hover-up">
                <div className="card-image">
                  <img
                    src="/assets/imgs/page/homepage2/policy.svg"
                    alt="Visa Services"
                  />
                </div>
                <div className="card-info">
                  <a className="text-xl-bold card-title" href="#">
                    Customizable Visa Plans
                  </a>
                  <p className="text-sm-medium neutral-500 card-desc">
                    Tailor your visa requirements according to your travel
                    needs.
                  </p>
                  <a className="text-sm-medium card-link" href="#">
                    Learn More
                    <svg
                      width={11}
                      height={10}
                      viewBox="0 0 11 10"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.50011 9.08347L9.58347 5.00011L5.50011 0.916748M9.58347 5.00011L1.41675 5.00011"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card-why-travel background-8 hover-up">
                <div className="card-image">
                  <img
                    src="/assets/imgs/page/homepage2/repu.svg"
                    alt="Visa Services"
                  />
                </div>
                <div className="card-info">
                  <a className="text-xl-bold card-title" href="#">
                    Affordable Visa Fees
                  </a>
                  <p className="text-sm-medium neutral-500 card-desc">
                    Enjoy affordable visa application fees without compromising
                    on service.
                  </p>
                  <a className="text-sm-medium card-link" href="#">
                    Learn More
                    <svg
                      width={11}
                      height={10}
                      viewBox="0 0 11 10"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.50011 9.08347L9.58347 5.00011L5.50011 0.916748M9.58347 5.00011L1.41675 5.00011"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
