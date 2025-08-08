"use client";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { Button } from "antd";
import TravelForm from "./travelForm";
import { useState, useEffect } from "react";
import SearchEngHeader from "@/components/searchEngine/SearchEngHeader";

const InsurancePage = () => {
  const [isAccordion, setIsAccordion] = useState(0);

  const handleAccordion = (key) => {
    setIsAccordion((prevState) => (prevState === key ? null : key));
  };

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div className="bg-white lg:overflow-hidden">
          <div className="w-full">
            <div className="mx-auto px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center text-center">
              <div className="pt-20 py-10">
                <h1 className="mt-4 mb-1 text-1x2 tracking-tight font-extrabold text-black sm:text-6xl lg:mt-6 xl:text-6xl py-2">
                  {/* <div className="mt-10">
                    <SearchEngHeader active_border={active_border} />
                  </div> */}
                  <span className="block">
                    Get Travel Insurance, quick and easy.
                  </span>
                </h1>
                <TravelForm />
              </div>
            </div>

            <div className="flex flex-wrap w-1/2 mx-auto gap-2 justify-center">
              <div>
                <Button shape="round">United States (US)</Button>{" "}
              </div>
              <div>
                <Button shape="round">France (FR)</Button>
              </div>
              <div>
                <Button shape="round">Germany (DE)</Button>
              </div>
              <div>
                <Button shape="round">Italy (IT)</Button>
              </div>
              <div>
                <Button shape="round">Thailand (TH)</Button>
              </div>
              <div>
                <Button shape="round">Worldwide Coverage</Button>
              </div>
            </div>
          </div>
        </div>

        <section className="section-box box-how-it-work background-body">
          <div className="container">
            <div className="text-center"></div>
            <div className="row mt-60 align-items-center">
              <div className="col-lg-6">
                <div className="text-center pb-4">
                  <h2 className="neutral-1000">How it works?</h2>
                </div>
                <div className="card-why-travel card-why-travel-2 background-1">
                  <div className="card-image">
                    {" "}
                    <img
                      src="/assets/imgs/page/homepage2/security.svg"
                      alt="Insurance"
                    />
                  </div>
                  <div className="card-info">
                    {" "}
                    <Link className="text-xl-bold card-title" href="#">
                      You submit your details
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
                <div className="card-why-travel card-why-travel-2 background-2">
                  <div className="card-image">
                    {" "}
                    <img
                      src="/assets/imgs/page/homepage2/support.svg"
                      alt="Insurance"
                    />
                  </div>
                  <div className="card-info">
                    {" "}
                    <Link className="text-xl-bold card-title" href="#">
                      We process your insurance
                    </Link>
                    <p className="text-sm-medium neutral-500 card-desc">
                      We handle all paperwork and ensure you get the coverage
                      you need.
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
                <div className="card-why-travel card-why-travel-2 background-3">
                  <div className="card-image">
                    {" "}
                    <img
                      src="/assets/imgs/page/homepage2/policy.svg"
                      alt="Insurance"
                    />
                  </div>
                  <div className="card-info">
                    {" "}
                    <Link className="text-xl-bold card-title" href="#">
                      Get your coverage
                    </Link>
                    <p className="text-sm-medium neutral-500 card-desc">
                      Once approved, you’ll receive your travel insurance
                      details. It’s that simple.
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
                      alt="Insurance"
                    />
                  </div>
                  <div className="image-bottom-how">
                    {" "}
                    <img
                      src="/assets/imgs/page/homepage4/img-how2.png"
                      alt="Insurance"
                    />
                    <img
                      src="/assets/imgs/page/homepage4/img-how3.png"
                      alt="Insurance"
                    />
                    <div className="shape">
                      {" "}
                      <img
                        className="light-mode"
                        src="/assets/imgs/page/homepage4/wave.png"
                        alt="Insurance"
                      />
                      <img
                        className="dark-mode"
                        src="/assets/imgs/page/homepage4/wave-dark.png"
                        alt="Insurance"
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
                  <p>Why should I get travel insurance?</p>
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
                  Travel insurance ensures you're covered in case of
                  emergencies, trip cancellations, or unexpected incidents
                  during your travels.
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
                  <p>What do I need to do to get travel insurance?</p>
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
                  To get your insurance, simply fill out a form, choose your
                  coverage, and pay the premium. We'll handle the rest.
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
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                  onClick={() => handleAccordion(3)}
                >
                  <h3>03</h3>
                  <p>When will my insurance be active?</p>
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
                  Your insurance will be active as soon as payment is processed
                  and the policy is issued.
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
                  <p>Why is my destination not covered by travel insurance?</p>
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
                  Some regions may not be covered due to policy restrictions.
                  Please check the available destinations and terms on our
                  website.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container pt-120 pb-80">
          <div className="text-center">
            <h2 className="neutral-1000">
              Why Choose Us for Your Travel Insurance?
            </h2>
            <p className="text-xl-medium neutral-500">
              The best insurance platform you can trust
            </p>
          </div>
          <div className="row mt-55">
            <div className="col-lg-3 col-md-6">
              <div className="card-why-travel background-2 hover-up">
                <div className="card-image">
                  <img
                    src="/assets/imgs/page/homepage2/security.svg"
                    alt="Insurance"
                  />
                </div>
                <div className="card-info">
                  <a className="text-xl-bold card-title" href="#">
                    Comprehensive Coverage
                  </a>
                  <p className="text-sm-medium neutral-500 card-desc">
                    Offers protection against trip cancellations, medical
                    emergencies, and lost baggage.
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
                    alt="Insurance"
                  />
                </div>
                <div className="card-info">
                  <a className="text-xl-bold card-title" href="#">
                    24/7 Emergency Support
                  </a>
                  <p className="text-sm-medium neutral-500 card-desc">
                    Access global emergency assistance whenever you need it
                    during your travels.
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
                    alt="Insurance"
                  />
                </div>
                <div className="card-info">
                  <a className="text-xl-bold card-title" href="#">
                    Customizable Plans
                  </a>
                  <p className="text-sm-medium neutral-500 card-desc">
                    Tailor your insurance policy to your unique travel needs and
                    preferences.
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
                    alt="Insurance"
                  />
                </div>
                <div className="card-info">
                  <a className="text-xl-bold card-title" href="#">
                    Affordable Premiums
                  </a>
                  <p className="text-sm-medium neutral-500 card-desc">
                    Enjoy comprehensive coverage without breaking the bank. Our
                    plans are designed for every budget.
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
};
export default InsurancePage;
