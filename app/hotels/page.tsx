import FilterSearch from "@/components/sections/FilterSearch"
import Layout from "@/components/layout/Layout"
import BannerHome3 from "@/components/sections/BannerHome3"
import Banner from "@/components/sections/Banner"
import HowItWork1 from "@/components/sections/HowItWork1"
import OurFeatured2 from "@/components/sections/OurFeatured2" 
import Link from "next/link"
import VideoPopup from '@/components/elements/VideoPopup'
import SlideBanner1 from "@/components/sections/SlideBanner1"
import Testimonials3 from "@/components/sections/Testimonials3"
import EngineTabsHotel from "@/components/searchEngine/engineHeaderHotel";
import WhyBookTravila3 from "@/components/sections/WhyBookTravila3"
import LoveUs from "@/components/sections/LoveUs"
import News3 from "@/components/sections/News3"
import Numbers1 from "@/components/sections/Numbers1"
import PopularDestinations2 from "@/components/sections/PopularDestinations2"
import PopularDestinations3 from "@/components/sections/PopularDestinations3"
import RecommendedForYou from "@/components/sections/RecommendedForYou"
import Section6Home3 from "@/components/sections/Section6Home3"
import VideoGallery from "@/components/sections/VideoGallery"
import Faqs1 from "@/components/sections/Faqs1"

export default function Home4() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>  

            {/*<EngineTabs />*/}
            <EngineTabsHotel active_border={'2'} />


<section className="section-box box-top-rated-3 box-nearby best-room-hotel background-body">
                        <div className="container">
                            <h2 className="neutral-1000 wow fadeInUp">Our Best Rooms</h2>
                            <p className="text-xl-medium neutral-500 wow fadeInUp">Book online today and look forward to a relaxing stay with usQ</p>
                            <div className="box-button-tabs wow fadeInUp"> <Link className="btn btn-white" href="#">All</Link><Link className="btn btn-white" href="#">Luxury</Link><Link className="btn btn-white" href="#">Standard</Link><Link className="btn btn-white" href="#">Economy</Link><Link className="btn btn-white" href="#">Business</Link><Link className="btn btn-white" href="#">Royal Class</Link><Link className="btn btn-white" href="#">Superior</Link></div>
                            <div className="row mt-65">
                                <div className="col-lg-4 col-md-6 wow fadeInUp">
                                    <div className="card-journey-small card-journey-small-type-3 background-card">
                                        <div className="card-image"> <Link className="wish" href="#">
                                            <svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                            </svg></Link><Link href="/room-detail"><img src="/assets/imgs/page/hotel/room.png" alt="Travila" /></Link></div>
                                        <div className="card-info">
                                            <div className="card-rating">
                                                <div className="card-left"> </div>
                                                <div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
                                            </div>
                                            <div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/room-detail">Deluxe Queen Room</Link></div>
                                            <div className="card-program">
                                                <div className="card-facilities">
                                                    <div className="item-facilities">
                                                        <p className="pax text-md-medium neutral-1000">2 adults </p>
                                                    </div>
                                                    <div className="item-facilities">
                                                        <p className="size text-md-medium neutral-1000">35 sqm</p>
                                                    </div>
                                                    <div className="item-facilities">
                                                        <p className="bed text-md-medium neutral-1000">2 Beds</p>
                                                    </div>
                                                    <div className="item-facilities">
                                                        <p className="bathroom text-md-medium neutral-1000">1 Bathrooms</p>
                                                    </div>
                                                </div>
                                                <div className="endtime">
                                                    <div className="card-price">
                                                        <h6 className="heading-6 neutral-1000">Rs.800</h6>
                                                        <p className="text-md-medium neutral-500">/ night</p>
                                                    </div>
                                                    <div className="card-button"> <Link className="btn btn-gray" href="#">Book Now</Link></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow fadeInUp">
                                    <div className="card-journey-small card-journey-small-type-3 background-card">
                                        <div className="card-image"> <Link className="wish" href="#">
                                            <svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                            </svg></Link><Link href="/room-detail"><img src="/assets/imgs/page/hotel/room2.png" alt="Travila" /></Link></div>
                                        <div className="card-info">
                                            <div className="card-rating">
                                                <div className="card-left"> </div>
                                                <div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
                                            </div>
                                            <div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/room-detail">King Ensuite Room</Link></div>
                                            <div className="card-program">
                                                <div className="card-facilities">
                                                    <div className="item-facilities">
                                                        <p className="pax text-md-medium neutral-1000">2 adults </p>
                                                    </div>
                                                    <div className="item-facilities">
                                                        <p className="size text-md-medium neutral-1000">35 sqm</p>
                                                    </div>
                                                    <div className="item-facilities">
                                                        <p className="bed text-md-medium neutral-1000">2 Beds</p>
                                                    </div>
                                                    <div className="item-facilities">
                                                        <p className="bathroom text-md-medium neutral-1000">1 Bathrooms</p>
                                                    </div>
                                                </div>
                                                <div className="endtime">
                                                    <div className="card-price">
                                                        <h6 className="heading-6 neutral-1000">Rs.100</h6>
                                                        <p className="text-md-medium neutral-500">/ night</p>
                                                    </div>
                                                    <div className="card-button"> <Link className="btn btn-gray" href="#">Book Now</Link></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow fadeInUp">
                                    <div className="card-journey-small card-journey-small-type-3 background-card">
                                        <div className="card-image"> <Link className="wish" href="#">
                                            <svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                            </svg></Link><Link href="/room-detail"><img src="/assets/imgs/page/hotel/room3.png" alt="Travila" /></Link></div>
                                        <div className="card-info">
                                            <div className="card-rating">
                                                <div className="card-left"> </div>
                                                <div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
                                            </div>
                                            <div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/room-detail">Deluxe Ensuite Room</Link></div>
                                            <div className="card-program">
                                                <div className="card-facilities">
                                                    <div className="item-facilities">
                                                        <p className="pax text-md-medium neutral-1000">2 adults </p>
                                                    </div>
                                                    <div className="item-facilities">
                                                        <p className="size text-md-medium neutral-1000">35 sqm</p>
                                                    </div>
                                                    <div className="item-facilities">
                                                        <p className="bed text-md-medium neutral-1000">2 Beds</p>
                                                    </div>
                                                    <div className="item-facilities">
                                                        <p className="bathroom text-md-medium neutral-1000">1 Bathrooms</p>
                                                    </div>
                                                </div>
                                                <div className="endtime">
                                                    <div className="card-price">
                                                        <h6 className="heading-6 neutral-1000">Rs.1500</h6>
                                                        <p className="text-md-medium neutral-500">/ night</p>
                                                    </div>
                                                    <div className="card-button"> <Link className="btn btn-gray" href="#">Book Now</Link></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow fadeInUp">
                                    <div className="card-journey-small card-journey-small-type-3 background-card">
                                        <div className="card-image"> <Link className="wish" href="#">
                                            <svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                            </svg></Link><Link href="/room-detail"><img src="/assets/imgs/page/hotel/room4.png" alt="Travila" /></Link></div>
                                        <div className="card-info">
                                            <div className="card-rating">
                                                <div className="card-left"> </div>
                                                <div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
                                            </div>
                                            <div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/room-detail">Deluxe Queen Room</Link></div>
                                            <div className="card-program">
                                                <div className="card-facilities">
                                                    <div className="item-facilities">
                                                        <p className="pax text-md-medium neutral-1000">2 adults </p>
                                                    </div>
                                                    <div className="item-facilities">
                                                        <p className="size text-md-medium neutral-1000">35 sqm</p>
                                                    </div>
                                                    <div className="item-facilities">
                                                        <p className="bed text-md-medium neutral-1000">2 Beds</p>
                                                    </div>
                                                    <div className="item-facilities">
                                                        <p className="bathroom text-md-medium neutral-1000">1 Bathrooms</p>
                                                    </div>
                                                </div>
                                                <div className="endtime">
                                                    <div className="card-price">
                                                        <h6 className="heading-6 neutral-1000">Rs.1200</h6>
                                                        <p className="text-md-medium neutral-500">/ night</p>
                                                    </div>
                                                    <div className="card-button"> <Link className="btn btn-gray" href="#">Book Now</Link></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow fadeInUp">
                                    <div className="card-journey-small card-journey-small-type-3 background-card">
                                        <div className="card-image"> <Link className="wish" href="#">
                                            <svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                            </svg></Link><Link href="/room-detail"><img src="/assets/imgs/page/hotel/room5.png" alt="Travila" /></Link></div>
                                        <div className="card-info">
                                            <div className="card-rating">
                                                <div className="card-left"> </div>
                                                <div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
                                            </div>
                                            <div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/room-detail">Deluxe Queen Room</Link></div>
                                            <div className="card-program">
                                                <div className="card-facilities">
                                                    <div className="item-facilities">
                                                        <p className="pax text-md-medium neutral-1000">2 adults </p>
                                                    </div>
                                                    <div className="item-facilities">
                                                        <p className="size text-md-medium neutral-1000">35 sqm</p>
                                                    </div>
                                                    <div className="item-facilities">
                                                        <p className="bed text-md-medium neutral-1000">2 Beds</p>
                                                    </div>
                                                    <div className="item-facilities">
                                                        <p className="bathroom text-md-medium neutral-1000">1 Bathrooms</p>
                                                    </div>
                                                </div>
                                                <div className="endtime">
                                                    <div className="card-price">
                                                        <h6 className="heading-6 neutral-1000">Rs.900</h6>
                                                        <p className="text-md-medium neutral-500">/ night</p>
                                                    </div>
                                                    <div className="card-button"> <Link className="btn btn-gray" href="#">Book Now</Link></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow fadeInUp">
                                    <div className="card-journey-small card-journey-small-type-3 background-card">
                                        <div className="card-image"> <Link className="wish" href="#">
                                            <svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                            </svg></Link><Link href="/room-detail"><img src="/assets/imgs/page/hotel/room6.png" alt="Travila" /></Link></div>
                                        <div className="card-info">
                                            <div className="card-rating">
                                                <div className="card-left"> </div>
                                                <div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
                                            </div>
                                            <div className="card-title"> <Link className="text-lg-bold neutral-1000" href="/room-detail">Deluxe Queen Room</Link></div>
                                            <div className="card-program">
                                                <div className="card-facilities">
                                                    <div className="item-facilities">
                                                        <p className="pax text-md-medium neutral-1000">2 adults </p>
                                                    </div>
                                                    <div className="item-facilities">
                                                        <p className="size text-md-medium neutral-1000">35 sqm</p>
                                                    </div>
                                                    <div className="item-facilities">
                                                        <p className="bed text-md-medium neutral-1000">2 Beds</p>
                                                    </div>
                                                    <div className="item-facilities">
                                                        <p className="bathroom text-md-medium neutral-1000">1 Bathrooms</p>
                                                    </div>
                                                </div>
                                                <div className="endtime">
                                                    <div className="card-price">
                                                        <h6 className="heading-6 neutral-1000">Rs.1800</h6>
                                                        <p className="text-md-medium neutral-500">/ night</p>
                                                    </div>
                                                    <div className="card-button"> <Link className="btn btn-gray" href="#">Book Now</Link></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

<section className="section-box box-picked box-hotel-video background-body">
                        <div className="container">
                            <div className="row align-items-end">
                                <div className="col-md-9 mb-30 wow fadeInUp">
                                    <h2 className="neutral-1000">Our Video Gallery</h2>
                                    <p className="text-xl-medium neutral-500">Quality as judged by customers. Book at the ideal price!</p>
                                </div>
                                <div className="col-md-3 mb-30 wow fadeInUp">
                                    <div className="d-flex justify-content-center justify-content-md-end"><Link className="btn btn-black-lg" href="#">View More
                                        <svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 15L15 8L8 1M15 8L1 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                        </svg></Link></div>
                                </div>
                            </div>
                            <div className="box-videos-small wow fadeInUp">
                                <div className="bg-video background-2" />
                                <div className="row">
                                    <div className="col-lg-7">
                                        <div className="card-grid-video">
                                            <div className="card-image">
                                                <VideoPopup vdocls="btn btn-play popup-youtube" />
                                                <img className="mr-10" src="/assets/imgs/page/homepage7/img-video.png" alt="Travile" /></div>
                                            <div className="card-info">
                                                <h4>The Venetian and The Palazzo - Las Vegas, USA</h4>
                                                <p className="text-md-medium">8 Resort. 24 rooms</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="list-videos-small">
                                            <div className="item-video-small">
                                                <div className="item-image">

                                                    <VideoPopup vdocls="btn btn-play-sm popup-youtube" />

                                                    <img className="mr-10" src="/assets/imgs/page/homepage7/img-video.png" alt="Travile" /></div>
                                                <div className="item-info"> <Link className="heading-6" href="#">The Burj Al Arab Dubai, UAE</Link>
                                                    <p className="text-md-medium neutral-500">8 Resort. 24 rooms</p>
                                                </div>
                                            </div>
                                            <div className="item-video-small">
                                                <div className="item-image"><VideoPopup vdocls="btn btn-play-sm popup-youtube" /><img className="mr-10" src="/assets/imgs/page/homepage7/img-video2.png" alt="Travile" /></div>
                                                <div className="item-info"> <Link className="heading-6" href="#">The Burj Al Arab Dubai, UAE</Link>
                                                    <p className="text-md-medium neutral-500">8 Resort. 24 rooms</p>
                                                </div>
                                            </div>
                                            <div className="item-video-small">
                                                <div className="item-image"><VideoPopup vdocls="btn btn-play-sm popup-youtube" /><img className="mr-10" src="/assets/imgs/page/homepage7/img-video3.png" alt="Travile" /></div>
                                                <div className="item-info"> <Link className="heading-6" href="#">The Burj Al Arab Dubai, UAE</Link>
                                                    <p className="text-md-medium neutral-500">8 Resort. 24 rooms</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section-box mt-100 box-how-it-work-hotel-detail background-body">
                        <div className="container">
                            <div className="box-banner-left-how" />
                            <div className="row">
                                <div className="col-md-6" />
                                <div className="col-md-6">
                                    <h3 className="neutral-1000 wow fadeInUp">How It Work ?</h3>
                                    <p className="text-xl-medium neutral-500 wow fadeInUp mb-40">Just 4 easy and quick steps</p>
                                    <ul className="list-steps wow fadeInUp">
                                        <li>
                                            <div className="step-no">   <span>1</span></div>
                                            <div className="step-info">
                                                <p className="text-xl-bold neutral-1000">Browse and Select</p>
                                                <p className="text-sm-medium neutral-500">Easily find your perfect car. Filter by model, brand, and size for a seamless selection process.</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="step-no">   <span>2</span></div>
                                            <div className="step-info">
                                                <p className="text-xl-bold neutral-1000">Booking and Reservation</p>
                                                <p className="text-sm-medium neutral-500">Quickly reserve with flexible dates and locations. Real-time availability updates ensure a smooth booking experience.</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="step-no">   <span>3</span></div>
                                            <div className="step-info">
                                                <p className="text-xl-bold neutral-1000">Payment and Confirmation</p>
                                                <p className="text-sm-medium neutral-500">Secure payments, various methods accepted. Instant confirmation for a hassle-free rental process.</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="step-no">   <span>4</span></div>
                                            <div className="step-info">
                                                <p className="text-xl-bold neutral-1000">Pickup and Return</p>
                                                <p className="text-sm-medium neutral-500">Effortless pickup and return. Simple documentation, optional services like delivery, and excellent customer support.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
            {/*<PopularDestinations3 />*/}
                {/*<Vide/oGallery />*/}

   
                {/*<BannerHome3 />*/}
                {/*<Logos1 />*/}
                {/*<PopularDestinations4 />*/}
                {/*<OurFeatured2 />*/}
                {/*<Banner />*/}
                    {/*<WhyBookTravila3 />*/}
                {/*<SlideBanner1 />*/}
                {/*<HowItWork1 />*/}
                
                {/*<Testimonials3 />*/}


                {/*<Section6Home3 />*/}
                {/*<LoveUs />*/}
                {/*<PopularDestinations3 />*/}
                {/*<VideoGallery />*/}
                {/*<Faqs1 />*/}
                {/*<News3 />*/}


                    <div className="background-body mt-140" />
                    <section className="section-box box-media background-body">
                        <div className="container-media wow fadeInUp"> <img src="/assets/imgs/page/homepage5/media.png" alt="Travila" /><img src="/assets/imgs/page/homepage5/media2.png" alt="Travila" /><img src="/assets/imgs/page/homepage5/media3.png" alt="Travila" /><img src="/assets/imgs/page/homepage5/media4.png" alt="Travila" /><img src="/assets/imgs/page/homepage5/media5.png" alt="Travila" /><img src="/assets/imgs/page/homepage5/media6.png" alt="Travila" /><img src="/assets/imgs/page/homepage5/media7.png" alt="Travila" /></div>
                    </section>

            </Layout>
        </>
    )
}