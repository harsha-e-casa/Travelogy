"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { swiperGroupAnimateHoliday } from "@/util/swiperOption";
import Link from "next/link";

const cardStyles = `
  .holiday-card {
    cursor: pointer;
    transition: transform 0.3s ease;
    width:100%;
    display:block;
  }
  .holiday-card:hover {
    transform: translateY(-5px);
  }
  .card-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.7));
    padding: 40px 30px 30px;
    border-radius: 0 0 30px 30px;
  }
  .destination-name {
    color: white;
    font-size: 28px;
    font-weight: 600;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
`;

export default function YourJourney() {
  const currentTime = new Date();
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cardStyles }} />
      <section className="section-box box-your-journey background-body tabadjust">
        <div className="container">
          <div className="row align-items-center mt-20 tabadjust">
            {/* Left side - Catchy content */}
            <div className="col-lg-6 col-md-6 mb-30">
              <div className="pr-4">
                <h1 className="neutral-1000 wow fadeInUp mb-20 font_familyadd discover-title" style={{ fontSize: '3.5rem', fontWeight: '700', lineHeight: '1.2' }}>
                  Discover Your Perfect
                  <span style={{ color: '#ff6b35' }}> Holiday Vibe</span>
                </h1>
                <p className="text-lg neutral-600 wow fadeInUp mb-30 discover-text" style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                  From romantic getaways to thrilling adventures, find the perfect mood for your next unforgettable journey. Let your wanderlust guide you to extraordinary experiences.
                </p>
                <div className="wow fadeInUp">
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', marginRight: '15px', backgroundColor: '#ff6b35', flexShrink: 0 }}>
                      <img src="/assets/imgs/page/tour/post5.png" alt="heart" style={{ width: '40px', height: '40px', borderRadius: "20px", objectFit: "cover" }} />
                    </div>
                    <span className="text-lg neutral-700">Curated experiences just for you</span>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', marginRight: '15px', backgroundColor: '#28a745', flexShrink: 0 }}>
                      <img src="/assets/imgs/page/tour/post2.png" alt="map" style={{ width: '40px', height: '40px', borderRadius: "20px", objectFit: "cover" }} />
                    </div>
                    <span className="text-lg neutral-700">Handpicked destinations worldwide</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', marginRight: '15px', backgroundColor: '#ffc107', flexShrink: 0 }}>
                      <img src="/assets/imgs/page/tour/post3.png" alt="star" style={{ width: '40px', height: '40px', borderRadius: "20px", objectFit: "cover" }} />
                    </div>
                    <span className="text-lg neutral-700">Premium travel experiences</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Holiday cards */}
            <div className="col-lg-6 col-md-6 mt-60">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 mb-30">
                  <Link href="/holiday/holiday_mood?mood=romantic">
                    <div className="holiday-card">
                      <div className="card-image" style={{
                        backgroundImage: 'url(/assets/imgs/page/holiday/Clara-on-a-Longboat.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '200px',
                        borderRadius: '20px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div className="card-overlay">
                          <h3 className="destination-name" style={{ fontSize: '20px' }}>Romantic</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 mb-30">
                  <Link href="/holiday/holiday_mood?mood=adventure">
                    <div className="holiday-card">
                      <div className="card-image" style={{
                        backgroundImage: 'url(/assets/imgs/page/homepage5/activity-big.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '200px',
                        borderRadius: '20px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div className="card-overlay">
                          <h3 className="destination-name" style={{ fontSize: '20px' }}>Adventure</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 mb-30">
                  <Link href="/holiday/holiday_mood?mood=beaches">
                    <div className="holiday-card">
                      <div className="card-image" style={{
                        backgroundImage: 'url(/assets/imgs/page/holiday/demo3.jpeg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '200px',
                        borderRadius: '20px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div className="card-overlay">
                          <h3 className="destination-name" style={{ fontSize: '20px' }}>Beaches</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 mb-30">
                  <Link href="/holiday/holiday_mood?mood=wildlife">
                    <div className="holiday-card">
                      <div className="card-image" style={{
                        backgroundImage: 'url(/assets/imgs/page/homepage5/activity-big3.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '200px',
                        borderRadius: '20px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div className="card-overlay">
                          <h3 className="destination-name" style={{ fontSize: '20px' }}>Wildlife</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 mb-30">
                  <Link href="/holiday/holiday_mood?mood=luxury">
                    <div className="holiday-card">
                      <div className="card-image" style={{
                        backgroundImage: 'url(/assets/imgs/page/homepage5/activity-big5.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '200px',
                        borderRadius: '20px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div className="card-overlay">
                          <h3 className="destination-name" style={{ fontSize: '20px' }}>Luxury</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 mb-30">
                  <Link href="/holiday/holiday_mood?mood=nightlife">
                    <div className="holiday-card">
                      <div className="card-image" style={{
                        backgroundImage: 'url(/assets/imgs/page/homepage4/spot5.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '200px',
                        borderRadius: '20px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div className="card-overlay">
                          <h3 className="destination-name" style={{ fontSize: '20px' }}>Night Life</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}