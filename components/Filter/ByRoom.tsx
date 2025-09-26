export default function ByRoom({ uniqueRoomStyles, filter, handleCheckboxChange }: any) {
	return (
		<>
			<div className="box-collapse scrollFilter">
				<ul className="list-filter-checkbox">
					{uniqueRoomStyles.map((room: any,) => (
						<li key={room}>
							<label className="cb-container">
								<input
									type="checkbox"
									value={room}
									checked={filter.roomStyle.includes(room)}
									onChange={(e) => handleCheckboxChange(e, "roomStyle")}
								/>

								<span className="text-sm-medium">{room} </span>
								<span className="checkmark" />
							</label>
							<span className="number-item">{room?.length}</span>
						</li>
					))}
				</ul>
			</div>
		</>
	)
}
