export default function ByFareType({ 
  selectedFareTypes,
  setSelectedFareTypes,
  options,
  tabIndex,
}: any) {

  const toggleFareType = (value: string) => {
    if (selectedFareTypes.includes(value)) {
      setSelectedFareTypes(selectedFareTypes.filter((item: string) => item !== value));
    } else {
      setSelectedFareTypes([...selectedFareTypes, value]);
    }
  };

  return (
    <div className="box-collapse scrollFilter">
      <ul className="list-filter-checkbox">
        {options?.map((option) => (
          <li key={option.name}>
            <label className="cb-container">
              <input
                type="checkbox"
                name={`fareType-${tabIndex}`}
                value={option.name}
                checked={selectedFareTypes.includes(option.name)}
                onChange={() => toggleFareType(option.name)}
              />
              <span className="text-sm-medium">{option.name}</span>
              <span className="checkmark" />
            </label>
            <span className="text-sm-medium neutral-500">({option.count})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
