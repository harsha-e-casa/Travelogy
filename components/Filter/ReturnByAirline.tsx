
export default function ReturnByAirline({ returnUniqueAirlines, filter, handleCheckboxChange }: any) {
	return (
		<>
			<div className="box-collapse scrollFilter">
				<ul className="list-filter-checkbox">
					{returnUniqueAirlines.map((uniairline: any,) => (
						<li key={uniairline}>
							<label className="cb-container">
								<input
									type="checkbox"
									checked={filter.returnAirlines.includes(uniairline)}
									onClick={() => handleCheckboxChange("returnAirlines", uniairline)} // Correct way to call handler
								/>

								<span className="text-sm-medium">{uniairline} </span>
								<span className="checkmark" />
							</label>
							<span className="number-item">{uniairline?.length}</span>
						</li>
					))}
				</ul>
			</div>
		</>
	)
}
