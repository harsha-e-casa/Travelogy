export default function ByFareIdentifier({
  fareIdentifiers,
  setFareIdentifiers,
  tabIndex,
}: any) {
  const options = ["REFUNDABLE", "NON-REFUNDABLE", "SPECIAL", "DISCOUNTED"]; 
  // 👆 Replace with actual fare identifier values from your API

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
        {options.map((option) => (
          <li key={option}>
            <label className="cb-container">
              <input
                type="checkbox"
                name={`fareIdentifier-${tabIndex}`}
                value={option}
                checked={fareIdentifiers.includes(option)}
                onChange={() => toggleFareIdentifier(option)}
              />
              <span className="text-sm-medium">{option}</span>
              <span className="checkmark" />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
