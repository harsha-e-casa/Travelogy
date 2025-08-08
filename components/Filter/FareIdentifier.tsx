
export default function FareIdentifier({ fareIdentifier, filter, handleCheckboxChange }: any) {
	return (
		<>
			<div className="box-collapse scrollFilter">
				<ul className="list-filter-checkbox">
					{fareIdentifier.map((fareIdentifier: any,) => (
						<li key={fareIdentifier}>
							<label className="cb-container">
								<input
									type="checkbox"
									checked={filter.fareIdentifier.includes(fareIdentifier)}
									onClick={() => handleCheckboxChange("fareIdentifier", fareIdentifier)} // Correct way to call handler
								/>

								<span className="text-sm-medium">{fareIdentifier} </span>
								<span className="checkmark" />
							</label>
							<span className="number-item">{fareIdentifier?.length}</span>
						</li>
					))}
				</ul>
			</div>
		</>
	)
}
