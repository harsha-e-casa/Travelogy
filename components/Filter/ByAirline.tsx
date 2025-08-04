
export default function ByAirline({ uniqueAirlines, selectedAirlines, setSelectedAirlines }: any) {
  const currentSelectedAirlines = selectedAirlines || [];
  const handleCheckboxChange = (airline: string) => {
    if (currentSelectedAirlines.includes(airline)) {
      setSelectedAirlines(currentSelectedAirlines.filter((item: string) => item !== airline));
    } else {
      setSelectedAirlines([...currentSelectedAirlines, airline]);
    }
  };

	return (
		<>
			<div className="box-collapse scrollFilter">
				<ul className="list-filter-checkbox">
					{uniqueAirlines.map((airline: any) => (
						<li key={airline}>
							<label className="cb-container">
								<input
									type="checkbox"
									checked={currentSelectedAirlines.includes(airline)}
									onChange={() => handleCheckboxChange(airline)}
								/>

								<span className="text-sm-medium">{airline} </span>
								<span className="checkmark" />
							</label>
							<span className="number-item">{airline?.length}</span>
						</li>
					))}
				</ul>
			</div>
		</>
	)
}
