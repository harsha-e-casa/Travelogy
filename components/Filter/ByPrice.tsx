
export default function ByPrice({ priceRange, setPriceRange }: any) {
    const currentPriceRange = priceRange || [0, 0];
	return (
		<>
			<div className="box-collapse scrollFilter">
				<div className="d-flex">
					<input
						type="number"
						className="form-control"
						placeholder="Min"
						value={currentPriceRange[0]}
						onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, currentPriceRange[1]])}
					/>
					<input
						type="number"
						className="form-control"
						placeholder="Max"
						value={currentPriceRange[1]}
						onChange={(e) => setPriceRange([currentPriceRange[0], parseInt(e.target.value) || 0])}
					/>
				</div>
			</div>
		</>
	)
}
