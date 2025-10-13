import React from "react";

type ByRatingProps = {
  uniqueRatings: (string | number)[];
  filter: {
    ratings: (string | number)[];
  };
  handleCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    category: string
  ) => void;
};

const ByRating: React.FC<ByRatingProps> = ({
  uniqueRatings,
  filter,
  handleCheckboxChange,
}) => {
  const sortedRatings = [...uniqueRatings].sort((a, b) => Number(a) - Number(b));

  return (
    <div className="box-collapse scrollFilter">
    <ul className="list-filter-checkbox">
      {sortedRatings.map((rating) => (
        <li key={rating}>
          <label className="cb-container">
            <input
              type="checkbox"
              value={rating}
              checked={filter.ratings.includes(rating)}
              onChange={(e) => handleCheckboxChange(e, "ratings")}
            />
            <span className="text-sm-medium neutral-1000">{rating} Stars</span>
            <span className="checkmark" />
          </label>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default ByRating;