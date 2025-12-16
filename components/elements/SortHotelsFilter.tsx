"use client";
import Link from "next/link";
import { Select } from "antd";
import "antd/dist/reset.css";

export default function SortHotelsFilter({
  sortCriteria,
  handleSortChange,
  itemsPerPage,
  handleItemsPerPageChange,
  handleClearFilters,
  startItemIndex,
  endItemIndex,
  totalResults,
  onFilterClick,
}: {
  sortCriteria: string;
  handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  itemsPerPage: number;
  handleItemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleClearFilters: () => void;
  startItemIndex: number;
  endItemIndex: number;
  totalResults: number;
  onFilterClick?: () => void;
}) {
  return (
    <>
      <div className="row align-items-center sort-filter-row">
        <div className="col-xl-4 col-md-4 col-12 mb-10 text-lg-start text-center">
          <div className="box-view-type">
            {/* <Link
              className="display-type display-grid active"
              href="/tour-grid"
            >
              <svg
                width={11}
                height={22}
                viewBox="0 0 22 22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 8V2.75...Z" />
              </svg>
            </Link>
            <Link className="display-type display-list" href="/tour-list">
              <svg
                width={11}
                height={21}
                viewBox="0 0 21 21"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.788 0H1.09497...Z" />
              </svg>
            </Link> */}
            <span className="text-sm-bold neutral-500 number-found">
              {startItemIndex} - {endItemIndex} of {totalResults} hotels found
            </span>
          </div>
        </div>
        <div className="col-xl-8 col-md-8 col-12 mb-10 text-lg-end text-center">
          <div className="box-item-sort">
            <button className="btn btn-gray rounded-4" onClick={handleClearFilters}>Clear Filters</button>
            <div className="item-sort border-1 rounded-3">
              <span className="text-xs-medium neutral-500 mr-5">Sort by:</span>
              <Select 
              value={sortCriteria}
              onChange={(value) =>
                  // keep existing handler signature by synthesizing an event object
                  handleSortChange({ target: { value } } as unknown as React.ChangeEvent<HTMLSelectElement>)
                }
                style={{ minWidth: 5, textAlign:"left" }}
                bordered={false}   // remove input border
                suffixIcon={null}  
              >
                <Select.Option value="name">Name</Select.Option>
                    <Select.Option value="price">Price</Select.Option>
                    <Select.Option value="rating">Rating</Select.Option>
              </Select>
            </div>
            {/* Mobile Filter Button - Inline with sort options */}
            {onFilterClick && (
              <button 
                className="filter-hamburger-btn-inline"
                onClick={onFilterClick}
                aria-label="Open Filters"
              >
                <div className="hamburger-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M3 3h18L14 12v7l-4 2v-9L3 3z" fill="grey"/>
                  </svg>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
