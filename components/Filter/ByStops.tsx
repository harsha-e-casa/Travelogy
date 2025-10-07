// export default function ByStops({ stops, setStops, tabIndex }: any) {
//   return (
//     <div className="box-collapse scrollFilter">
//       <ul className="list-filter-checkbox">
//         <li key="all">
//           <label className="cb-container">
//             <input
//               type="radio"
//               name={`stops-${tabIndex}`}
//               value="all"
//               checked={stops === "all"}
//               onChange={(e) => setStops(e.target.value)}
//             />
//             <span className="text-sm-medium">All</span>
//             <span className="checkmark" />
//           </label>
//         </li>
//         <li key="non-stop">
//           <label className="cb-container">
//             <input
//               type="radio"
//               name={`stops-${tabIndex}`}
//               value="non-stop"
//               checked={stops === "non-stop"}
//               onChange={(e) => setStops(e.target.value)}
//             />
//             <span className="text-sm-medium">Non-stop</span>
//             <span className="checkmark" />
//           </label>
//         </li>
//         <li key="1-stop">
//           <label className="cb-container">
//             <input
//               type="radio"
//               name={`stops-${tabIndex}`}
//               value="1-stop"
//               checked={stops === "1-stop"}
//               onChange={(e) => setStops(e.target.value)}
//             />
//             <span className="text-sm-medium">1 Stop</span>
//             <span className="checkmark" />
//           </label>
//         </li>
//         <li key="2-stops">
//           <label className="cb-container">
//             <input
//               type="radio"
//               name={`stops-${tabIndex}`}
//               value="2-stops"
//               checked={stops === "2-stops"}
//               onChange={(e) => setStops(e.target.value)}
//             />
//             <span className="text-sm-medium">2+ Stops</span>
//             <span className="checkmark" />
//           </label>
//         </li>
//       </ul>
//     </div>
//   );
// }


export default function ByStops({ stops, setStops, tabIndex }: any) {
  const OPTIONS = [
    {label: "0", value: "all"},
    { label: "1", value: "non-stop" },
    { label: "2", value: "1-stop" },
    { label: "3+", value: "2-stops" },
  ];

  const wrapStyle: React.CSSProperties = {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    alignItems: "center",
  };

  const itemStyle = (active: boolean): React.CSSProperties => ({
    width: 48,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    border: active ? "2px solid #ff7a00" : "1px solid #d9d9d9",
    background: active ? "rgba(255,122,0,0.12)" : "#fff",
    color: active ? "#ff7a00" : "#333",
    cursor: "pointer",
    fontWeight: 700,
    userSelect: "none",
    transition: "all .15s ease",
  });

  const cancelStyle: React.CSSProperties = {
    marginLeft: "auto",
    padding: "6px 10px",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    background: "#fff",
    color: "#555",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    lineHeight: 1,
    transition: "background .15s ease,border-color .15s ease",
  };

  const handleSelect = (value: string) => {
    if (stops !== value) setStops(value);
  };

  const handleCancel = () => {
    setStops("all"); // reset filter
  };

  return (
    <div className="box-collapse scrollFilter">
      <div role="radiogroup" aria-label="Stops" style={wrapStyle}>
        {OPTIONS.map((opt, i) => {
          const active = stops === opt.value;
          const id = `stops-${tabIndex ?? 0}-${i}`;
          return (
            <label key={opt.value} htmlFor={id} style={itemStyle(active)}>
              <input
                id={id}
                type="radio"
                name={`stops-${tabIndex}`}
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

        {/* Cancel / Reset */}
        {/* <button type="button" onClick={handleCancel} style={cancelStyle}>
          Cancel
        </button> */}
      </div>
    </div>
  );
}
