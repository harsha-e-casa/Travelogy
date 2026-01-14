import Link from "next/link";

export default function HomeDashboard() {
    return (
        <>
            <section className="section-box box-home-dashboard background-body">
                <div className="container">
                    <div className="text-center mb-50">
                        <h2 className="neutral-1000">Quick Access</h2>
                        <p className="text-xl-medium neutral-500">
                            Access all your travel needs in one place
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 mb-30">
                            <div className="card-dashboard background-card hover-up">
                                <div className="card-image">
                                    <img src="/assets/imgs/airplane_1604953.svg" alt="Flights" />
                                </div>
                                <div className="card-info">
                                    <h5 className="neutral-1000">Flights</h5>
                                    <p className="text-sm-medium neutral-500">
                                        Search and book flights worldwide
                                    </p>
                                    <Link className="btn btn-gray mt-15" href="/flights">
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-30">
                            <div className="card-dashboard background-card hover-up">
                                <div className="card-image">
                                    <img src="/assets/imgs/template/icons/hotel.svg" alt="Hotels" />
                                </div>
                                <div className="card-info">
                                    <h5 className="neutral-1000">Hotels</h5>
                                    <p className="text-sm-medium neutral-500">
                                        Find perfect accommodations
                                    </p>
                                    <Link className="btn btn-gray mt-15" href="/hotels">
                                        Search Hotels
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-30">
                            <div className="card-dashboard background-card hover-up">
                                <div className="card-image">
                                    <img src="/assets/imgs/template/icons/tour.svg" alt="Tours" />
                                </div>
                                <div className="card-info">
                                    <h5 className="neutral-1000">Tours</h5>
                                    <p className="text-sm-medium neutral-500">
                                        Discover amazing tour packages
                                    </p>
                                    <Link className="btn btn-gray mt-15" href="/holiday">
                                        Explore Tours
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-30">
                            <div className="card-dashboard background-card hover-up">
                                <div className="card-image">
                                    <img src="/assets/imgs/template/icons/ticket.svg" alt="Tickets" />
                                </div>
                                <div className="card-info">
                                    <h5 className="neutral-1000">Bookings</h5>
                                    <p className="text-sm-medium neutral-500">
                                        Manage your travel bookings
                                    </p>
                                    <Link className="btn btn-gray mt-15" href="/dashboard">
                                        View Bookings
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-box box-home-features background-1">
                <div className="container">
                    <div className="text-center mb-50">
                        <h2 className="neutral-1000">Why Choose Travelogy?</h2>
                        <p className="text-xl-medium neutral-500">
                            Experience the difference with our premium travel services
                        </p>
                    </div>
                    <div className="row correct-row">
                        <div className="col-lg-4 col-md-6 mb-30">
                            <div className="card-feature text-center background-card">
                                <div className="card-image">
                                    <img src="/assets/imgs/page/homepage1/destination.png" alt="Travelogy" />
                                </div>
                                <div className="card-info">
                                    <h5 className="neutral-1000">Best Destinations</h5>
                                    <p className="text-md-medium neutral-500">
                                        Handpicked destinations from around the world for your perfect getaway
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-30">
                            <div className="card-feature text-center background-card">
                                <div className="card-image">
                                    <img src="/assets/imgs/page/homepage1/support.png" alt="Travelogy" />
                                </div>
                                <div className="card-info">
                                    <h5 className="neutral-1000">24/7 Support</h5>
                                    <p className="text-md-medium neutral-500">
                                        Round-the-clock customer support to assist you throughout your journey
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-30">
                            <div className="card-feature text-center background-card">
                                <div className="card-image">
                                    <img src="/assets/imgs/page/homepage6/experience.png" alt="Travelogy" />
                                </div>
                                <div className="card-info">
                                    <h5 className="neutral-1000">Secure Booking</h5>
                                    <p className="text-md-medium neutral-500">
                                        Safe and secure payment processing with instant booking confirmation
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}