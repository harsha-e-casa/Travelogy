import Link from "next/link";
import "./destinations-grid.css";

export default function PopularDestinationsGrid() {
    return (
        <>
            <section className="section-box box-popular-destinations-grid background-body">
                <div className="container correct-row">
                    <div className="text-center mb-60 mb-md-40 mb-sm-30">
                        <h2 className="neutral-1000 h2-responsive">DISCOVER <span style={{color: '#e5a910ff'}}>DESTINATIONS</span></h2>
                        <p className="text-xl-medium neutral-500 p-responsive">
                            Uncover your next adventure with our curated selection of must-visit destinations.
                        </p>
                    </div>
                    
                    <div className="destinations-grid">
                        <div className="destination-card large">
                            <Link href="/holiday">
                                <img src="/assets/imgs/holiday/india.jpg" alt="Dubai" />
                                <div className="destination-overlay">
                                    <h3>INDIA</h3>
                                </div>
                            </Link>
                        </div>

                        <div className="destination-card medium">
                            <Link href="/holiday">
                                <img src="/assets/imgs/holiday/dubai.jpg" alt="Kenya" />
                                <div className="destination-overlay">
                                    <h3>DUBAI</h3>
                                </div>
                            </Link>
                        </div>

                        <div className="destination-card large">
                            <Link href="/holiday">
                                <img src="/assets/imgs/holiday/mumbai.jpg" alt="Japan" />
                                <div className="destination-overlay">
                                    <h3>MUMBAI</h3>
                                </div>
                            </Link>
                        </div>
                        
                        <div className="destination-card medium">
                            <Link href="/holiday">
                                <img src="/assets/imgs/holiday/goa.jpg" alt="Azerbaijan" />
                                <div className="destination-overlay">
                                    <h3>GOA</h3>
                                </div>
                            </Link>
                        </div>

                        <div className="destination-card large">
                            <Link href="/holiday">
                                <img src="/assets/imgs/page/destination/banner6.png" alt="Kazakhstan" />
                                <div className="destination-overlay">
                                    <h3>KAZAKHSTAN</h3>
                                </div>
                            </Link>
                        </div>
                        
                        <div className="destination-card medium">
                            <Link href="/holiday">
                                <img src="/assets/imgs/page/destination/banner7.png" alt="Sri Lanka" />
                                <div className="destination-overlay">
                                    <h3>SRILANKA</h3>
                                </div>
                            </Link>
                        </div>
                        
                        <div className="destination-card large">
                            <Link href="/holiday">
                                <img src="/assets/imgs/holiday/delhi.jpg" alt="Maldives" />
                                <div className="destination-overlay">
                                    <h3>DELHI</h3>
                                </div>
                            </Link>
                        </div>
                        
                        <div className="destination-card medium">
                            <Link href="/holiday">
                                <img src="/assets/imgs/holiday/paris.jpg" alt="paris" />
                                <div className="destination-overlay">
                                    <h3>PARIS</h3>
                                </div>
                            </Link>
                        </div>
                        
                        <div className="destination-card medium">
                            <Link href="/holiday">
                                <img src="/assets/imgs/page/destination/banner10.png" alt="Georgia" />
                                <div className="destination-overlay">
                                    <h3>GEORGIA</h3>
                                </div>
                            </Link>
                        </div>
                        
                        <div className="destination-card medium">
                            <Link href="/holiday">
                                <img src="/assets/imgs/page/destination/banner11.png" alt="Armenia" />
                                <div className="destination-overlay">
                                    <h3>ARMENIA</h3>
                                </div>
                            </Link>
                        </div>
                        
                        <div className="destination-card medium">
                            <Link href="/holiday">
                                <img src="/assets/imgs/holiday/turkey.jpg" alt="Turkey" />
                                <div className="destination-overlay">
                                    <h3>TURKEY</h3>
                                </div>
                            </Link>
                        </div>
                        
                        {/* <div className="destination-card large">
                            <Link href="/destination/europe">
                                <img src="/assets/imgs/page/destination/banner13.png" alt="Europe" />
                                <div className="destination-overlay">
                                    <h3>EUROPE</h3>
                                </div>
                            </Link>
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    );
}