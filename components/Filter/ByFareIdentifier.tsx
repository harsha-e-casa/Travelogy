export default function ByFareIdentifier({
  fareIdentifiers,
  setFareIdentifiers,
  tabIndex,
  options,
}: any) {
  

  const toggleFareIdentifier = (value: string) => {
    if (fareIdentifiers.includes(value)) {
      setFareIdentifiers(fareIdentifiers.filter((item: string) => item !== value));
    } else {
      setFareIdentifiers([...fareIdentifiers, value]);
    }
  };

  return (
    <div className="box-collapse scrollFilter">
      <ul className="list-filter-checkbox">
        {options?.map((option: any) => (
          <li key={option.name}>
            <label className="cb-container">
              <input
                type="checkbox"
                name={`fareIdentifier-${tabIndex}`}
                value={option.name}
                checked={fareIdentifiers.includes(option.name)}
                onChange={() => toggleFareIdentifier(option.name)}
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
