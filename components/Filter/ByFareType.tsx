type FareTypeOption = { name?: string; count?: number };

export default function ByFareType({
  selectedFareTypes,
  setSelectedFareTypes,
  options,
  tabIndex,
}: {
  selectedFareTypes?: string[];
  setSelectedFareTypes: (vals: string[]) => void;
  options?: FareTypeOption[];
  tabIndex?: number | string;
}) {
  // Safeguards
  const selected = Array.isArray(selectedFareTypes) ? selectedFareTypes : [];
  const safeName = (v: unknown) =>
    typeof v === "string" ? v.trim() : "";

  const safeOptions =
    Array.isArray(options)
      ? options
        .filter(Boolean) // remove null/undefined
        .map((o) => ({
          name: safeName(o?.name),
          count:
            typeof o?.count === "number" && Number.isFinite(o.count)
              ? o.count
              : undefined,
        }))
        .filter((o) => o.name.length > 0) // only valid names
      : [];

  const toggleFareType = (value: string) => {
    if (!value) return;
    if (selected.includes(value)) {
      setSelectedFareTypes(selected.filter((item) => item !== value));
    } else {
      setSelectedFareTypes([...selected, value]);
    }
  };

  if (safeOptions.length === 0) {
    return (
      <div className="box-collapse scrollFilter">
        <p className="text-sm neutral-500">No fare types available</p>
      </div>
    );
  }

  return (
    <div className="box-collapse scrollFilter">
      <ul className="list-filter-checkbox">
        {safeOptions.map((option) => {
          const name = option.name; // guaranteed non-empty string
          const id = `fareType-${tabIndex ?? 0}-${name}`;

          if (name == "undefined") return

          return (
            <li key={id}>
              <label className="cb-container" htmlFor={id}>
                <input
                  id={id}
                  type="checkbox"
                  name={`fareType-${tabIndex ?? 0}`}
                  value={name}
                  checked={selected.includes(name)}
                  onChange={() => toggleFareType(name)}
                />
                <span className="text-sm-medium">{name}</span>
                <span className="checkmark" />
              </label>

              {/* Only show count when it's a valid number */}
              {typeof option.count === "number" && (
                <span className="text-sm-medium neutral-500">
                  {" "}
                  ({option.count})
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
