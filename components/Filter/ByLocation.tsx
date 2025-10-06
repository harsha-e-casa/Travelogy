
export default function ByLocation({ uniqueLocations, filter, handleCheckboxChange }: any) {
	return (
		<>
			<div className="box-collapse scrollFilter">
				<ul className="list-filter-checkbox">
					{uniqueLocations.map((location: any,) => (
						<li key={location}>
							<label className="cb-container">
								<input
									type="checkbox"
									value={location}
									checked={filter.locations.includes(location)}
									onChange={(e) => handleCheckboxChange(e, "locations")}
								/>

								<span className="text-sm-medium">{location} </span>
								<span className="checkmark" />
							</label>
							{/* <span className="number-item">{location?.length}</span> */}
						</li>
					))}
				</ul>
			</div>
		</>
	)
}
