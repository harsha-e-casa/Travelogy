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
  return (
    <ul className="list-filter">
      {uniqueRatings.map((rating) => (
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
  );
};

export default ByRating;