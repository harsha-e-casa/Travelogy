import Link from "next/link";

export default function HotelCard1({ hotel }: any) {
  const name = hotel?.name || "Unnamed Hotel";
  const city = hotel?.ad?.city?.name || "Unknown City";
  const rating = hotel?.rt || "N/A";
  const id = hotel?.id || "unknown-id";
  const image = hotel?.img?.[0]?.url;
  const totalPrice = hotel?.ops?.[0]?.tp ?? "N/A";
  const refund = hotel?.ops?.cnp?.ifra;
  const noRefund = hotel?.ops?.cnp?.inra;

  return (
    <div className="card-journey-small background-card setHeightSlider">
      <div className="card-image">
        <Link className="label" href="#">
          Top Rated
        </Link>
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
            className="text-lg-bold neutral-1000"
            href={`/hotel-listing/${id}`}
          >
            {name}
          </Link>
        </div>
        <div className="card-program">
          <div className="card-location">
            <p className="text-location text-sm-medium neutral-500">{city}</p>
            <p className="text-star">
              {[...Array(5)].map((_, i) =>
                i < rating ? (
                  <img
                    key={i}
                    className="light-mode"
                    src="/assets/imgs/template/icons/star-black.svg"
                    alt="Star"
                  />
                ) : null
              )}
            </p>
          </div>
          <div className="endtime">
            <p
              className="text-lg-bold neutral-1000"
              // href={`/hotel-listing/book-details?id=${id}`}
            >
              ₹ {totalPrice}
            </p>
            {refund}
            {noRefund}
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
