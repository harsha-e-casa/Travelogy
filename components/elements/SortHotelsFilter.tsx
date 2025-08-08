"use client";
import Link from "next/link";

export default function SortHotelsFilter({
  sortCriteria,
  handleSortChange,
  itemsPerPage,
  handleItemsPerPageChange,
  handleClearFilters,
  startItemIndex,
  endItemIndex,
  // totalResults, // ✅ new prop instead of sortedHotels
}: {
  sortCriteria: string;
  handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  itemsPerPage: number;
  handleItemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleClearFilters: () => void;
  startItemIndex: number;
  endItemIndex: number;
  // totalResults: number; // ✅ instead of sortedHotels.length
}) {
  return (
    <>
      <div className="row align-items-center">
        <div className="col-xl-4 col-md-4 mb-10 text-lg-start text-center">
          <div className="box-view-type">
            <Link
              className="display-type display-grid active"
              href="/tour-grid"
            >
              <svg
                width={22}
                height={22}
                viewBox="0 0 22 22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 8V2.75...Z" />
                {/* Truncated SVG paths for brevity */}
              </svg>
            </Link>
            <Link className="display-type display-list" href="/tour-list">
              <svg
                width={21}
                height={21}
                viewBox="0 0 21 21"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.788 0H1.09497...Z" />
                {/* Truncated SVG paths for brevity */}
              </svg>
            </Link>
            <span className="text-sm-bold neutral-500 number-found">
              {startItemIndex} - {endItemIndex} of {/* {totalResults} */} hotels found
            </span>
          </div>
        </div>
        <div className="col-xl-8 col-md-8 mb-10 text-lg-end text-center">
          <div className="box-item-sort">
            <button onClick={handleClearFilters}>Clear Filters</button>
            <div className="item-sort border-1">
              <span className="text-xs-medium neutral-500 mr-5">Show</span>
              <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className="item-sort border-1">
              <span className="text-xs-medium neutral-500 mr-5">Sort by:</span>
              <select value={sortCriteria} onChange={handleSortChange}>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
