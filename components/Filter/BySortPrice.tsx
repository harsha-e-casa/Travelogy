// BySortPrice.tsx
import React from "react";

type PriceSortValue = "asc" | "desc";

interface ByPriceProps {
  sort: PriceSortValue;
  setSort: (value: PriceSortValue) => void;
}

export default function BySortPrice({ sort, setSort }: ByPriceProps) {
  const OPTIONS = [
    { label: "₹ Low–High", value: "asc" as PriceSortValue },
    { label: "₹ High–Low", value: "desc" as PriceSortValue },
  ];

  const wrapStyle: React.CSSProperties = {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    alignItems: "center",
  };

  const itemStyle = (active: boolean): React.CSSProperties => ({
    padding: "0 12px",
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    border: active ? "2px solid #ff7a00" : "1px solid #d9d9d9",
    background: active ? "rgba(255,122,0,0.12)" : "#fff",
    color: active ? "#ff7a00" : "#333",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 13,
    userSelect: "none",
    transition: "all .15s ease",
    whiteSpace: "nowrap",
  });

  const handleSelect = (value: PriceSortValue) => {
    if (sort !== value) setSort(value);
  };

  return (
    <div className="box-collapse scrollFilter">
      <div role="radiogroup" aria-label="Sort by Price" style={wrapStyle}>
        {OPTIONS.map((opt) => {
          const active = sort === opt.value;
          const id = `sort-price-${opt.value}`;
          return (
            <label key={opt.value} htmlFor={id} style={itemStyle(active)}>
              <input
                id={id}
                type="radio"
                name="price-sort"
                value={opt.value}
                checked={active}
                onChange={() => handleSelect(opt.value)}
                style={{
                  position: "absolute",
                  opacity: 0,
                  width: 0,
                  height: 0,
                  pointerEvents: "none",
                }}
              />
              {opt.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}
