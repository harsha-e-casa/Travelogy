// export default function ByArrivalTime({ arrivalTime, setArrivalTime, tabIndex }: any) {
//   return (
//     <div className="box-collapse scrollFilter">
//       <ul className="list-filter-checkbox">
//         <li key="all">
//           <label className="cb-container">
//             <input
//               type="radio"
//               name={`arrivalTime-${tabIndex}`}
//               value="all"
//               checked={arrivalTime === "all"}
//               onChange={(e) => setArrivalTime(e.target.value)}
//             />
//             <span className="text-sm-medium">All</span>
//             <span className="checkmark" />
//           </label>
//         </li>
//         <li key="early-morning">
//           <label className="cb-container">
//             <input
//               type="radio"
//               name={`arrivalTime-${tabIndex}`}
//               value="early-morning"
//               checked={arrivalTime === "early-morning"}
//               onChange={(e) => setArrivalTime(e.target.value)}
//             />
//             <span className="text-sm-medium">Early Morning (12am - 6am)</span>
//             <span className="checkmark" />
//           </label>
//         </li>
//         <li key="morning">
//           <label className="cb-container">
//             <input
//               type="radio"
//               name={`arrivalTime-${tabIndex}`}
//               value="morning"
//               checked={arrivalTime === "morning"}
//               onChange={(e) => setArrivalTime(e.target.value)}
//             />
//             <span className="text-sm-medium">Morning (6am - 12pm)</span>
//             <span className="checkmark" />
//           </label>
//         </li>
//         <li key="afternoon">
//           <label className="cb-container">
//             <input
//               type="radio"
//               name={`arrivalTime-${tabIndex}`}
//               value="afternoon"
//               checked={arrivalTime === "afternoon"}
//               onChange={(e) => setArrivalTime(e.target.value)}
//             />
//             <span className="text-sm-medium">Afternoon (12pm - 6pm)</span>
//             <span className="checkmark" />
//           </label>
//         </li>
//         <li key="evening">
//           <label className="cb-container">
//             <input
//               type="radio"
//               name={`arrivalTime-${tabIndex}`}
//               value="evening"
//               checked={arrivalTime === "evening"}
//               onChange={(e) => setArrivalTime(e.target.value)}
//             />
//             <span className="text-sm-medium">Evening (6pm - 12am)</span>
//             <span className="checkmark" />
//           </label>
//         </li>
//       </ul>
//     </div>
//   );
// }

export default function ByArrivalTime({
  arrivalTime,
  setArrivalTime,
  tabIndex,
  imageSrcs, // optional: { earlyMorning, morning, afternoon, evening, all? }
}: any) {
  const IMAGES = {
    earlyMorning: imageSrcs?.earlyMorning ?? "/assets/imgs/sunrise_filter.png",
    morning: imageSrcs?.morning ?? "/assets/imgs/afternoon.png",
    afternoon:
      imageSrcs?.afternoon ?? "/assets/imgs/sunset.png",
    evening: imageSrcs?.evening ?? "/assets/imgs/moon.png",
  };

  const TIME_OPTIONS = [
    { value: "early-morning", label: "12am – 6am", img: IMAGES.earlyMorning },
    { value: "morning", label: "6am – 12pm", img: IMAGES.morning },
    { value: "afternoon", label: "12pm – 6pm", img: IMAGES.afternoon },
    { value: "evening", label: "6pm – 12am", img: IMAGES.evening },
  ];

  const name = `arrivalTime-${tabIndex}`;

  // Styles
  const groupWrap: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    flexDirection: "row-reverse",
  };
  const resetPill: React.CSSProperties = {
    display: arrivalTime !== "all" ? "inline-flex" : "none",
    alignItems: "center",
    gap: 6,
    padding: "6px 10px",
    borderRadius: 999,
    background: "#fff3e8",
    border: "1px solid #ffb57a",
    color: "#994d00",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    userSelect: "none",
  };
  const cardsWrap: React.CSSProperties = {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    alignItems: "stretch",
    justifyContent: "center",
  };
  const cardStyle = (active: boolean): React.CSSProperties => ({
    width: 45,
    height: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
    border: active ? "2px solid #ff7a00" : "1px solid #e5e7eb",
    background: active ? "rgba(255,122,0,0.10)" : "#fff",
    boxShadow: active ? "0 4px 10px rgba(255,122,0,0.15)" : "none",
    cursor: "pointer",
    userSelect: "none",
    transition: "all .15s ease",
  });
  const imgStyle: React.CSSProperties = {
    width: "100%",
    // height: 56,
    objectFit: "cover",
    borderRadius: 6,
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 700,
    color: "#333",
    textAlign: "center",
    lineHeight: 1.2,
  };
  const hiddenInput: React.CSSProperties = {
    position: "absolute",
    opacity: 0,
    width: 0,
    height: 0,
    pointerEvents: "none",
  };

  return (
    <div className="box-collapse scrollFilter">
      <div role="radiogroup" aria-label="Arrival time" style={cardsWrap}>
        {TIME_OPTIONS.map((opt, i) => {
          const active = arrivalTime === opt.value;
          const id = `${name}-${i}`;
          return (
            <label key={opt.value} htmlFor={id} style={cardStyle(active)}>
              <input
                id={id}
                type="radio"
                name={name}
                value={opt.value}
                checked={active}
                onChange={(e) => setArrivalTime(e.target.value)}
                style={hiddenInput}
              />
              <img src={opt.img} alt={opt.label} style={imgStyle} />
              <span style={labelStyle}>{opt.label}</span>
            </label>
          );
        })}
      </div>

      <div style={groupWrap}>
        <button
          type="button"
          style={resetPill}
          onClick={() => setArrivalTime("all")}
          aria-label="Clear arrival time filter"
        >
          Cancel
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path
              d="M3 3l6 6M9 3L3 9"
              stroke="#994d00"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
