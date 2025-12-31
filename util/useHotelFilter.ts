'use client'
import { ChangeEvent, useState, useEffect } from "react"

export interface Hotel {
	id: number
	price: number
	// duration: number
	hotelType: string
	amenities: string
	rating: number
	name: string
	roomStyle: string
	location: string
	image: string
	fullAddress: string
	checkInTime: any
	checkOutTime: any
	rawData: any
	freeCancellation: boolean
}

export interface Filter {
	names: string[]
	roomStyle: string[]
	amenities: string[]
	locations: string[]
	priceRange: [number, number]
	// durationRange: [number, number]
	ratings: number[]
	hotelType: string[]
	searchName: string
	freeCancellation: boolean
}

type SortCriteria = "name" | "price" | "rating"

interface UseHotelFilterReturn {
	filter: Filter
	sortCriteria: SortCriteria
	setSortCriteria: (criteria: SortCriteria) => void
	itemsPerPage: number
	setItemsPerPage: (items: number) => void
	currentPage: number
	setCurrentPage: (page: number) => void
	uniqueNames: string[]
	uniqueRoomStyles: string[]
	uniqueAmenities: string[]
	uniqueLocations: string[]
	uniqueRatings: number[]
	uniqueHotelsType: string[]
	filteredHotels: Hotel[]
	sortedHotels: Hotel[]
	totalPages: number
	startIndex: number
	endIndex: number
	paginatedHotels: Hotel[]
	handleCheckboxChange: (e: ChangeEvent<HTMLInputElement>, category: string) => void
	handleSearchNameChange: (value: string) => void
	handleFreeCancellationChange: (value: boolean) => void
	handleSortChange: (e: ChangeEvent<HTMLSelectElement>) => void
	handlePriceRangeChange: (values: [number, number]) => void
	handleItemsPerPageChange: (e: ChangeEvent<HTMLSelectElement>) => void
	handlePageChange: (newPage: number) => void
	handlePreviousPage: () => void
	handleNextPage: () => void
	handleClearFilters: () => void
	startItemIndex: number
	endItemIndex: number
	totalResults: number
}

const useHotelFilter = (hotelsData: Hotel[], initialFilter?: Partial<Filter>, minPrice: number = 0, maxPrice: number = 41087): UseHotelFilterReturn => {
	const [filter, setFilter] = useState<Filter>({
		names: [],
		roomStyle: [],
		amenities: [],
		locations: [],
		priceRange: [minPrice, maxPrice],
		// durationRange: [0, 30],
		ratings: [],
		hotelType: [],
		searchName: "",
		freeCancellation: false,
		...initialFilter,
	})
	const [priceRangeInitialized, setPriceRangeInitialized] = useState(false)

	// Update price range only when min/max prices change and haven't been manually set
	useEffect(() => {
		if (!priceRangeInitialized && hotelsData.length > 0) {
			setFilter(prev => ({
				...prev,
				priceRange: [minPrice, maxPrice]
			}))
			setPriceRangeInitialized(true)
		}
	}, [minPrice, maxPrice, hotelsData.length, priceRangeInitialized])
	const [sortCriteria, setSortCriteria] = useState<SortCriteria>("name")
	const [itemsPerPage, setItemsPerPage] = useState<number>(10)
	const [currentPage, setCurrentPage] = useState<number>(1)

	const uniqueNames = [...new Set(hotelsData.map((hotel) => hotel.name))]
	const uniqueRoomStyles = [...new Set(hotelsData.map((hotel) => hotel.roomStyle))]
	const uniqueAmenities = [...new Set(hotelsData.map((hotel) => hotel.amenities))]
	const uniqueLocations = [...new Set(hotelsData.map((hotel) => hotel.location))]
	const uniqueRatings = [...new Set(hotelsData.map((hotel) => hotel.rating))]
	// const uniqueDurations = [...new Set(hotelsData.map((hotel) => hotel.duration))]
	const uniqueHotelsType = [...new Set(hotelsData.map((hotel) => hotel.hotelType))]

	const filteredHotels = hotelsData.filter((hotel) => {
		if (hotel.price <= 0 || isNaN(hotel.price)) {
			console.warn(`Invalid price for hotel ${hotel.name}: ${hotel.price}`);
			return false;
		}

		const matchesSearchName = filter.searchName === "" || hotel.name.toLowerCase().includes(filter.searchName.toLowerCase());
		const matchesFreeCancellation = !filter.freeCancellation || hotel.freeCancellation;

		return (
			matchesSearchName &&
			matchesFreeCancellation &&
			(filter.names.length === 0 || filter.names.includes(hotel.name)) &&
			(filter.roomStyle.length === 0 || filter.roomStyle.includes(hotel.roomStyle)) &&
			(filter.amenities.length === 0 || filter.amenities.includes(hotel.amenities)) &&
			(filter.locations.length === 0 || filter.locations.includes(hotel.location)) &&
			(hotel.price >= filter.priceRange[0] && hotel.price <= filter.priceRange[1]) &&
			// (hotel.duration >= filter.durationRange[0] && hotel.duration <= filter.durationRange[1]) &&
			(filter.ratings.length === 0 || filter.ratings.includes(hotel.rating)) &&
			(filter.hotelType.length === 0 || filter.hotelType.includes(hotel.hotelType))
		)
	})

	const sortedHotels = [...filteredHotels].sort((a, b) => {
		if (sortCriteria === "name") {
			return a.name.localeCompare(b.name)
		} else if (sortCriteria === "price") {
			return a.price - b.price
		} else if (sortCriteria === "rating") {
			return b.rating - a.rating
		}
		return 0
	})

	const totalPages = Math.ceil(sortedHotels.length / itemsPerPage)
	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const paginatedHotels = sortedHotels.slice(startIndex, endIndex)

	const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>, category: string) => {
		const { value, checked } = e.target as HTMLInputElement;
		const parsedValue = category === "ratings" ? Number(value) : value;
		setFilter((prevFilter) => {
			const currentValues = prevFilter[category as keyof Filter] as (string | number)[];
			const newValues = checked
				? [...currentValues, parsedValue]
				: currentValues.filter((item) => item !== parsedValue);
			return { ...prevFilter, [category]: newValues };
		});
	};

	const handleSearchNameChange = (value: string) => {
		setFilter((prev) => ({ ...prev, searchName: value }));
		setCurrentPage(1);
	};

	const handleFreeCancellationChange = (value: boolean) => {
		setFilter((prev) => ({ ...prev, freeCancellation: value }));
		setCurrentPage(1);
	};

	const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSortCriteria(e.target.value as SortCriteria)
	}

	const handlePriceRangeChange = (values: [number, number]) => {
		setFilter((prevFilter) => ({
			...prevFilter,
			priceRange: values,
		}));
		setPriceRangeInitialized(true); // Mark as manually set
	}



	const handleItemsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setItemsPerPage(Number(e.target.value))
		setCurrentPage(1)
	}

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage)
	}

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}
	}

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1)
		}
	}

	const handleClearFilters = () => {
		const defaultFilter: Filter = {
			names: [],
			roomStyle: [],
			amenities: [],
			locations: [],
			priceRange: [minPrice, maxPrice],
			// durationRange: [0, 30],
			ratings: [],
			hotelType: [],
			searchName: "",
			freeCancellation: false,
		};
		setFilter(defaultFilter);
		setSortCriteria("name")
		setItemsPerPage(4)
		setCurrentPage(1)
	}

	const startItemIndex = (currentPage - 1) * itemsPerPage + 1
	const endItemIndex = Math.min(startItemIndex + itemsPerPage - 1, sortedHotels.length)

	return {
		filter,
		sortCriteria,
		setSortCriteria,
		itemsPerPage,
		setItemsPerPage,
		currentPage,
		setCurrentPage,
		uniqueNames,
		uniqueRoomStyles,
		uniqueAmenities,
		uniqueLocations,
		uniqueRatings,
		// uniqueDurations,
		uniqueHotelsType,
		filteredHotels,
		sortedHotels,
		totalPages,
		startIndex,
		endIndex,
		paginatedHotels,
		handleCheckboxChange,
		handleSearchNameChange,
		handleFreeCancellationChange,
		handleSortChange,
		handlePriceRangeChange,
		// handleDurationRangeChange,
		handleItemsPerPageChange,
		handlePageChange,
		handlePreviousPage,
		handleNextPage,
		handleClearFilters,
		startItemIndex,
		endItemIndex,
		totalResults: sortedHotels.length,
	}
}

export default useHotelFilter
