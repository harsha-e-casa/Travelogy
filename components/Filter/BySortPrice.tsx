import React, { useState, useEffect } from "react";

type PriceSortValue = "asc" | "desc";

interface ByPriceProps {
  sort: PriceSortValue;
  setSort: (value: PriceSortValue) => void;
}

export default function BySortPrice({ sort, setSort }: ByPriceProps) {
  const OPTIONS = [
    { label: "₹ ASC", value: "asc" as PriceSortValue },
    { label: "₹ DESC", value: "desc" as PriceSortValue },
  ];

  // State to track if it's mobile
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Update the isMobile state based on window width
  useEffect(() => {
    const handleResize = () => {
      console.log("rrrrrrrrrrrrrrrrrrrr", window.innerWidth);
      setIsMobile(window.innerWidth <= 768); // Consider 768px as the threshold for mobile
      setIsSmallScreen(window.innerWidth == 1024);
    };

    // Set initial state based on the current window size
    handleResize();

    // Add event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const wrapStyle: React.CSSProperties = {
    display: "flex",
    gap: 10,
    flexWrap: "nowrap",
    alignItems: "center",
  };

  const itemStyle = (active: boolean): React.CSSProperties => ({
    padding: isMobile || isSmallScreen ? "0 6px" : "0 12px",
    height: 30,
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
    flex: 1,
    marginBottom: "0",
  });

  const handleSelect = (value: PriceSortValue) => {
    if (sort !== value) setSort(value);
  };

  return (
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
  );
}
