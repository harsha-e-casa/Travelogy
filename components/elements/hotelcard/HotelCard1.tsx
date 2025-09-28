import Link from "next/link";

// import { Tooltip } from "antd";

export default function HotelCard1({ hotel }: any) {
  const name = hotel?.name || "Unnamed Hotel";
  const fullAddress = hotel?.fullAddress || "";
  const rating = hotel?.rating || 0;
  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const id = hotel?.rawData?.id || "unknown-id";
  console.log("Hotel ID:", hotel); // Debugging line to check the id value
  const image = hotel?.image;
  const totalPrice = hotel?.price ?? "N/A";
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
            <p className="text-location text-sm-medium neutral-500">{fullAddress}</p>
            {/* <p className="text-star">
              {[...Array(rating)].map((_, index) => (
                <img
                  key={`filled-${index}`}
                  className="light-mode"
                  src="/assets/imgs/template/icons/star-black.svg"
                  alt="star"
                />
              ))}
              {hasHalfStar && (
                <img
                  key="half-star"
                  className="light-mode"
                  src="/assets/imgs/template/icons/star-black.svg"
                  alt="half-star"
                />
              )}
              {[...Array(totalStars - rating - (hasHalfStar ? 1 : 0))].map((_, index) => (
                <img
                  key={`empty-${index}`}
                  className="light-mode"
                  src="/assets/imgs/template/icons/star-black.svg"
                  alt="empty-star"
                />
              ))}
            </p> */}
          </div>
          <div className="endtime">
            <div className="card-price">
              <h6 className="heading-6 neutral-1000">₹{totalPrice}</h6>
              <p className="text-md-medium neutral-500">/ night</p>
            </div>
            <div className="card-button"> <Link className="btn btn-gray" href={`/hotel-listing/${id}`}>Book Now</Link></div>
          </div>
        </div>
      </div>
    </div>
  );
}
