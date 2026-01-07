import Link from "next/link";
import { Tooltip } from "antd";
import "./HotelCard1.css";

export default function HotelCard1({ hotel, nights }: any) {
  const name = hotel?.name || "Unnamed Hotel";
  const fullAddress = hotel?.fullAddress || "";
  const rating = hotel?.rating || 0;
  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const id = hotel?.rawData?.id || "unknown-id";
  // console.log("Hotel ID:", hotel); // Debugging line to check the id value
  const image = hotel?.image;
  const pricePerNight = hotel?.price ?? 0;
  // const totalPrice = nights && nights > 0 ? (pricePerNight * nights).toFixed(2) : pricePerNight;
  const totalPrice = pricePerNight;

  const checkInTime = hotel?.checkInTime;
  const checkOutTime = hotel?.checkOutTime;

  return (
    <div className="card-journey-small background-card setHeightSlider">
      <div className="card-image">
        {/* <div className="label top-rated-badge">
          Top Rated
        </div> */}
        {/* <Link className="wish" href="#">
          <svg
            width={20}
            height={18}
            viewBox="0 0 20 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link> */}
        <Link href={`/hotel-listing/${id}`}>
          <img src={image} alt={name} className="w-full h-48 object-cover rounded-t-lg" />
        </Link>
      </div>
      <div className="card-info">
        <div className="card-rating">
          <div className="card-left"> </div>
          <div className="card-right"> <span className="rating">{rating.toFixed(1)} </span></div>
        </div>
        <div className="card-title"> <Link className="text-lg-bold neutral-1000" href={`/hotel-listing/${id}`}>{name} </Link></div>
        <div className="card-program">
          <div className="card-location">
            <Tooltip title={fullAddress} placement="top">
              <p className="text-location text-sm-medium neutral-700">{fullAddress}</p>
            </Tooltip>
          </div>
          <div className="card-pricing-section">
            <div className="price-info">
              <p className="starts-from-text neutral-700">Starts From</p>
              <div className="price-container">
                <h5 className="price-amount">₹{totalPrice}</h5>
                <p className="price-period neutral-700">
                  {nights && nights > 1 ? `/ ${nights} nights` : "/ night"}
                </p>
              </div>
            </div>
            <div className="book-button-container">
              <Link className="btn btn-book-now" href={`/hotel-listing/${id}`}>Book Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
