import Link from "next/link";

// import { Tooltip } from "antd";

export default function HotelCard1({ hotel }: any) {
  const name = hotel?.name || "Unnamed Hotel";
  const fullAddress = hotel?.fullAddress || "";
  const rating = Math.round(hotel?.rating) || 0;
  const totalStars = 5;
  const filledStars = Math.round(rating);

  const id = hotel?.id || "unknown-id";
  const image = hotel?.image;
  const totalPrice = hotel?.price ?? "N/A";
  const checkInTime = hotel?.checkInTime;
  const checkOutTime = hotel?.checkOutTime;

  return (
    <div className="card-journey-small background-card setHeightSlider">
      <div className="card-image">
        {/* <Link className="label" href="#">
          Top Rated
        </Link> */}
        <Link className="wish" href="#">
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
        </Link>
        <Link href={`/hotel-listing/${id}`}>
          <img src={image} alt={name} />
        </Link>
      </div>
      <div className="card-info">
        <div className="card-title">
          <Link
            className="text-md-bold neutral-1000"
            href={`/hotel-listing/${id}`}
          >
            {name}
          </Link>
        </div>
        <div className="card-program">
          <div className="card-location">
            <p
              className="cursor-pointer text-location text-xs-medium neutral-500"
              title={fullAddress}
            >
              {fullAddress}
            </p>
            <p className="text-star">
              {[...Array(filledStars)].map((_, index) => (
                <svg
                  key={`filled-${index}`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gold"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 .25l1.8 5.8h6.2l-5 3.6 1.9 5.8-5-3.6-5 3.6 1.9-5.8-5-3.6h6.2L8 .25z" />
                </svg>
              ))}
            </p>
            {checkInTime && (
              <p className="text-xs-medium neutral-500">
                Check-in: {checkInTime.beginTime} - {checkInTime.endTime}
              </p>
            )}
            {checkOutTime && (
              <p className="text-xs-medium neutral-500">
                Check-out: {checkOutTime.beginTime}
              </p>
            )}
          </div>
          <div className="endtime">
            <p className="neutral-1000">
              {" "}
              Starts from <br />
              <span className="text-lg-bold "> ₹ {totalPrice}</span>
            </p>
            <div className="card-button">
              <Link className="btn btn-gray" href={`/hotel-listing/${id}`}>
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
