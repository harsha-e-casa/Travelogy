export default function ByAirline({ uniqueAirlines, filter, handleCheckboxChange }: any) {
	return (
	  <div className="box-collapse scrollFilter">
		<ul className="list-filter-checkbox">
		  {uniqueAirlines.map((airline: string) => (
			<li key={airline}>
			  <label className="cb-container">
				<input
				  type="checkbox"
				  checked={filter.airlines.includes(airline)} // Ensure checkbox reflects filter state
				  onClick={() => handleCheckboxChange("airlines", airline)} // Correct way to call handler
				/>
				<span className="text-sm-medium">{airline}</span>
				<span className="checkmark" />
			  </label>
			</li>
		  ))}
		</ul>
	  </div>
	);
  }
  
// export default function ByAirline({ uniqueAirlines, filter, handleCheckboxChange }: any) {
// 	return (
// 		<>
// 			<div className="box-collapse scrollFilter">
// 				<ul className="list-filter-checkbox">
// 					{uniqueAirlines.map((airline: any,) => (
// 						<li key={airline}>
// 							<label className="cb-container">
// 								<input
// 									type="checkbox"
// 									checked={filter.airlines.includes(airline)}
// 									onChange={handleCheckboxChange("airlines", airline)}
// 								/>

// 								<span className="text-sm-medium">{airline} </span>
// 								<span className="checkmark" />
// 							</label>
// 							<span className="number-item">{airline?.length}</span>
// 						</li>
// 					))}
// 				</ul>
// 			</div>
// 		</>
// 	)
// }
