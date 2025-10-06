// "use client";

// import React, { Suspense, useEffect } from "react";
// import { useRouter } from "next/router";
// import Layout from "@/components/layout/Layout";
// import TopCategory2 from "@/components/sections/TopCategory2";
// import Flights4 from "@/components/sections/Flights4";
// import EngineTabs from "@/components/searchEngine/engineHeader";
// import LoveUs from "@/components/sections/LoveUs";
// import Section6Home3 from "@/components/sections/Section6Home3";
// import MicroallOffersPage from "@/app/microPage/MicroallOffersPage";
// import { checkTokenExpiry } from "@/services/Utils";

// export default function Tickets() {

//   const router = useRouter();

//   useEffect(() => {
//     const tokenValid = checkTokenExpiry();
//     console.log("tokenValid ==> ",tokenValid)

//     if (!tokenValid) {
//       // If token is expired, remove from localStorage and redirect to login
//       localStorage.removeItem("authToken");
//       router.push("/login"); // Redirect to the login page
//     }
//   }, [router]);

//   return (
//     <Suspense fallback={<div>Loading....</div>}>
//       <Layout headerStyle={1} footerStyle={1}>
//         <EngineTabs active_border={"1"} />
//         <main className="main">
//           {/*<SlideBanner1 />*/}
//           {/*<Banner />*/}

//           <div className="container mt-28">
//             <Flights4 />

//             <MicroallOffersPage />
//           </div>

//           <TopCategory2 />
//           <section className="section-box box-how-it-work-3 mt-80 background-3">
//             <div className="container">
//               <div className="box-how-it-work-inner background-3">
//                 <h3 className="neutral-1000 wow fadeInUp">How It Work ?</h3>
//                 <p className="text-xl-medium neutral-500 mb-30 wow fadeInUp">
//                   Just 4 easy and quick steps
//                 </p>
//                 <div className="row">
//                   <div className="col-lg-10">
//                     <ul className="list-steps list-steps-2-col wow fadeInUp">
//                       <li>
//                         <div className="step-no">
//                           {" "}
//                           <span>1</span>
//                         </div>
//                         <div className="step-info">
//                           <p className="text-xl-bold neutral-1000">
//                             Search for Flights
//                           </p>
//                           <p className="text-sm-medium neutral-500">
//                             Begin your journey by entering your departure city,
//                             destination, travel dates, and the number of
//                             passengers
//                           </p>
//                         </div>
//                       </li>
//                       <li>
//                         <div className="step-no">
//                           {" "}
//                           <span>2</span>
//                         </div>
//                         <div className="step-info">
//                           <p className="text-xl-bold neutral-1000">
//                             Select Your Flight
//                           </p>
//                           <p className="text-sm-medium neutral-500">
//                             Review the search results and compare the details of
//                             each flight, including departure and arrival times,
//                             durations, and prices.
//                           </p>
//                         </div>
//                       </li>
//                       <li>
//                         <div className="step-no">
//                           {" "}
//                           <span>3</span>
//                         </div>
//                         <div className="step-info">
//                           <p className="text-xl-bold neutral-1000">
//                             Provide Passenger Information
//                           </p>
//                           <p className="text-sm-medium neutral-500">
//                             Enter the required passenger information for all
//                             individuals traveling, including names, contact
//                             details, and any special requests
//                           </p>
//                         </div>
//                       </li>
//                       <li>
//                         <div className="step-no">
//                           {" "}
//                           <span>4</span>
//                         </div>
//                         <div className="step-info">
//                           <p className="text-xl-bold neutral-1000">
//                             Payment and Confirmation
//                           </p>
//                           <p className="text-sm-medium neutral-500">
//                             Review the booking summary, including the total
//                             cost, flight details, and passenger information
//                           </p>
//                         </div>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>

//           <br />
//           <br />
//           <br />
//           <br />

//           <Section6Home3 />

//           <LoveUs />

//           <div className="background-body" />
//         </main>
//       </Layout>
//     </Suspense>
//   );
// }

"use client";
import React, { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
import TopCategory2 from "@/components/sections/TopCategory2";
import Flights4 from "@/components/sections/Flights4";
import EngineTabs from "@/components/searchEngine/engineHeader";
import LoveUs from "@/components/sections/LoveUs";
import Section6Home3 from "@/components/sections/Section6Home3";
import MicroallOffersPage from "@/app/microPage/MicroallOffersPage";
import { checkTokenExpiry } from "@/services/Utils";

export default function Tickets() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Loading state to wait for client-side rendering

  useEffect(() => {
    const tokenValid = checkTokenExpiry(); // Check if the token is valid

    console.log("tokenValid ==> ", tokenValid);

    if (!tokenValid) {
      // If token is expired, remove from localStorage and redirect to login
      localStorage.removeItem("authToken");
      router.push("/login"); // Redirect to the login page
    } else {
      // If token is valid, continue loading the page
      setLoading(false);
    }
  }, [router]); // Ensures the effect runs once on mount (after client-side rendering)

  // if (loading) {
  //   return <div>Loading...</div>; // Show loading until token check is complete
  // }

  return (
    <Suspense fallback={<div>Loading....</div>}>
      <Layout headerStyle={1} footerStyle={1}>
        <EngineTabs active_border={"1"} />
        <main className="main">
          {/* <SlideBanner1 /> */}
          {/* <Banner /> */}

          <div className="container mt-28">
            <Flights4 />

            {/* <MicroallOffersPage /> */}
          </div>

          {/* <TopCategory2 /> */}
          <section className="section-box box-how-it-work-3 mt-80 background-3">
            <div className="container">
              <div className="box-how-it-work-inner background-3">
                <h3 className="neutral-1000 wow fadeInUp">How It Work ?</h3>
                <p className="text-xl-medium neutral-500 mb-30 wow fadeInUp">
                  Just 4 easy and quick steps
                </p>
                <div className="row">
                  <div className="col-lg-10">
                    <ul className="list-steps list-steps-2-col wow fadeInUp">
                      <li>
                        <div className="step-no">
                          {" "}
                          <span>1</span>
                        </div>
                        <div className="step-info">
                          <p className="text-xl-bold neutral-1000">
                            Search for Hotels
                          </p>
                          <p className="text-sm-medium neutral-500">
                            Begin your journey by entering your departure city,
                            destination, travel dates, and the number of
                            passengers
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="step-no">
                          {" "}
                          <span>2</span>
                        </div>
                        <div className="step-info">
                          <p className="text-xl-bold neutral-1000">
                            Select Your Flight
                          </p>
                          <p className="text-sm-medium neutral-500">
                            Review the search results and compare the details of
                            each flight, including departure and arrival times,
                            durations, and prices.
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="step-no">
                          {" "}
                          <span>3</span>
                        </div>
                        <div className="step-info">
                          <p className="text-xl-bold neutral-1000">
                            Provide Passenger Information
                          </p>
                          <p className="text-sm-medium neutral-500">
                            Enter the required passenger information for all
                            individuals traveling, including names, contact
                            details, and any special requests
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="step-no">
                          {" "}
                          <span>4</span>
                        </div>
                        <div className="step-info">
                          <p className="text-xl-bold neutral-1000">
                            Payment and Confirmation
                          </p>
                          <p className="text-sm-medium neutral-500">
                            Review the booking summary, including the total
                            cost, flight details, and passenger information
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <br />
          <br />
          <br />
          <br />

          {/* <Section6Home3 /> */}

          <LoveUs />

          <div className="background-body" />
        </main>
      </Layout>
    </Suspense>
  );
}
