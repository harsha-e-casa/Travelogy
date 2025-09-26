

export default function ByAmenities({ uniqueAmenities, filter, handleCheckboxChange }: any) {
	return (
		<>
			<div className="box-collapse scrollFilter">
				<ul className="list-filter-checkbox">
					{uniqueAmenities.map((amenity: string) => (
						<li key={amenity}>
							<label className="cb-container">
								<input
									type="checkbox"
									value={amenity}
									checked={filter.amenities.includes(amenity)}
									onChange={(e) => handleCheckboxChange(e, "amenities")}
								/>
								<span className="text-sm-medium">{amenity}</span>
								<span className="checkmark" />
							</label>
							<span className="number-item">{amenity?.length}</span>
						</li>
					))}
				</ul>
			</div>
		</>
	)
}
