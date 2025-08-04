export default function FilterModelComponents({ filterData, filter, handleCheckboxChange }: any) {
    console.log('sdkhsdd', filter);

	return (
        <>
        <div className="sidebar-left border-1 background-body">
            <div className="box-filters-sidebar">
                <div className="block-filter border-1">
                    <h6 className="text-lg-bold item-collapse neutral-1000">
                    Fare Identifier
                    </h6>
                <div className="box-collapse scrollFilter">
                    <ul className="list-filter-checkbox">
                        {(filterData && filterData.airlineOptions.length > 0) && filterData.airlineOptions.map((airline: string) => (
                        <li key={airline}>
                            <label className="cb-container">
                                <input
                                type="checkbox"
                                  checked={filter?.airlines.includes(airline)} // Ensure checkbox reflects filter state
                                  onClick={() => handleCheckboxChange("airlines", airline)} // Correct way to call handler
                                />
                                <span className="text-sm-medium">{airline}</span>
                                <span className="checkmark" />
                            </label>
                        </li>
                        ))}
                    </ul>
                </div>
                </div>
            </div>
        </div> 
        </>
	);
  }