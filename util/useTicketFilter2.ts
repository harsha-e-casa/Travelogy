// useTicketFilter.ts

import { ChangeEvent, useState } from "react";
import { Ticket, Filter } from "./types";

type SortCriteria = "name" | "price" | "rating";

const useTicketFilter = (ticketsData: Ticket[]) => {
    // console.log('quyewuye', ticketsData);
  const [filter, setFilter] = useState<Filter>({
    names: [],
    class: [],
    locations: [],
    priceRange: [0, 10000],
    ratings: [],
    airlines: [],
    fareIdentifier: []
  });

//   const [sortCriteria, setSortCriteria] = useState<SortCriteria>("name");
//   const [itemsPerPage, setItemsPerPage] = useState<number>(10);
//   const [currentPage, setCurrentPage] = useState<number>(1);

//   const uniqueNames = [...new Set(ticketsData.map((t) => t.name))];
//   const uniqueClasses = [...new Set(ticketsData.map((t) => t.class))];
//   const uniqueLocations = [...new Set(ticketsData.map((t) => t.location))];
//   const uniqueRatings = [...new Set(ticketsData.map((t) => t.rating))];
  const uniqueAirlines = [...new Set(ticketsData.map((t) => t.airlines))];
  const uniqueReturnAirlines = [...new Set(ticketsData.map((t) => t.returnairlines))];
  const fareIdentifier = [...new Set(ticketsData.map((t) => t.fareIdentifier))];

  // const filteredTickets = ticketsData.filter((ticket) => {
  //   return (
  //     (filter.names.length === 0 || filter.names.includes(ticket.name)) &&
  //     (filter.class.length === 0 || filter.class.includes(ticket.class)) &&
  //     (filter.locations.length === 0 || filter.locations.includes(ticket.location)) &&
  //     (ticket.price >= filter.priceRange[0] && ticket.price <= filter.priceRange[1]) &&
  //     (filter.ratings.length === 0 || filter.ratings.includes(ticket.rating)) &&
  //     (filter.airlines.length === 0 || filter.airlines.includes(ticket.airlines))
  //   );
  // });

//   const sortedTickets = [...filteredTickets].sort((a, b) => {
//     if (sortCriteria === "name") return a.name.localeCompare(b.name);
//     if (sortCriteria === "price") return a.price - b.price;
//     if (sortCriteria === "rating") return b.rating - a.rating;
//     return 0;
//   });

//   const totalPages = Math.ceil(sortedTickets.length / itemsPerPage);
//   const paginatedTickets = sortedTickets.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

    const handleCheckboxChange = (field: keyof Filter, value: string | number) => (e: ChangeEvent<HTMLInputElement>) => {
        // console.log("filter -- ");
        const checked = e.target.checked
        alert(field);

        setFilter((prevFilter) => {
            const values = prevFilter[field] as (string | number)[]
            if (checked) {
                return { ...prevFilter, [field]: [...values, value] }
            } else {
                return {
                    ...prevFilter,
                    [field]: values.filter((item) => item !== value),
                }
            }
        })
    }
  const handleClearFilters = () => {
    setFilter({
      names: [],
      class: [],
      locations: [],
      priceRange: [0, 10000],
      ratings: [],
      airlines: [],
    });
    // setSortCriteria("name");
    // setItemsPerPage(10);
    // setCurrentPage(1);
  };

  return {
    filter,
	setFilter,
    // uniqueNames,
    // uniqueClasses,
    // uniqueLocations,
    // uniqueRatings,
    // paginatedTickets,
    // totalPages,
    // currentPage,
    // setCurrentPage,
    uniqueAirlines,
    uniqueReturnAirlines,
    fareIdentifier,
    handleCheckboxChange,
    handleClearFilters,
  };
};

export default useTicketFilter;
