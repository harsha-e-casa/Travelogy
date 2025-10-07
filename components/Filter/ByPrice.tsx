// export default function ByPrice({ priceRange, setPriceRange }: any) {
//   const currentPriceRange = priceRange || [0, 0];
//   return (
//     <>
//       <div className="box-collapse scrollFilter">
//         <div className="d-flex">
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Min"
//             value={currentPriceRange[0]}
//             onChange={(e) =>
//               setPriceRange([
//                 parseInt(e.target.value) || 0,
//                 currentPriceRange[1],
//               ])
//             }
//           />
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Max"
//             value={currentPriceRange[1]}
//             onChange={(e) =>
//               setPriceRange([
//                 currentPriceRange[0],
//                 parseInt(e.target.value) || 0,
//               ])
//             }
//           />
//         </div>
//       </div>
//     </>
//   );
// }

// import React from "react";
// import { Range } from "react-range";

// export default function ByPrice({
//   priceRange,
//   setPriceRange,
//   minPriceRange,
//   maxPriceRange,
// }: any) {
//   const STEP = 10; // Adjust step
//   const MIN = minPriceRange; // Minimum possible price
//   const MAX = maxPriceRange; // Maximum possible price

//   return (
//     <div className="box-collapse scrollFilter p-3">
//       {/* Number Inputs */}
//       <div className="d-flex mb-3">
//         <input
//           type="number"
//           className="form-control me-2"
//           placeholder="Min"
//           value={priceRange[0]}
//           min={MIN}
//           max={priceRange[1]}
//           onChange={(e) =>
//             setPriceRange([
//               Math.min(Number(e.target.value) || MIN, priceRange[1]),
//               priceRange[1],
//             ])
//           }
//         />
//         <input
//           type="number"
//           className="form-control"
//           placeholder="Max"
//           value={priceRange[1]}
//           min={priceRange[0]}
//           max={MAX}
//           onChange={(e) =>
//             setPriceRange([
//               priceRange[0],
//               Math.max(Number(e.target.value) || MIN, priceRange[0]),
//             ])
//           }
//         />
//       </div>

//       {/* Dual-thumb Range Slider */}
//       <Range
//         step={STEP}
//         min={MIN}
//         max={MAX}
//         values={priceRange}
//         onChange={(values) => setPriceRange(values)}
//         renderTrack={({ props, children }) => (
//           <div
//             {...props}
//             style={{
//               ...props.style,
//               height: "8px",
//               width: "100%",
//               backgroundColor: "#ccc",
//               borderRadius: "4px",
//               position: "relative",
//             }}
//           >
//             {/* Active Track */}
//             <div
//               style={{
//                 position: "absolute",
//                 height: "100%",
//                 left: `${((priceRange[0] - MIN) / (MAX - MIN)) * 100}%`,
//                 right: `${100 - ((priceRange[1] - MIN) / (MAX - MIN)) * 100}%`,
//                 backgroundColor: "#007bff",
//                 borderRadius: "4px",
//               }}
//             />
//             {children}
//           </div>
//         )}
//         renderThumb={({ props }) => (
//           <div
//             {...props}
//             style={{
//               ...props.style,
//               height: "20px",
//               width: "20px",
//               backgroundColor: "#fff",
//               border: "2px solid #007bff",
//               borderRadius: "50%",
//               boxShadow: "0 2px 6px rgba(0,0,0,.3)",
//             }}
//           />
//         )}
//       />
//     </div>
//   );
// }

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// import React, { useEffect, useState } from "react";
// import { Range } from "react-range";

// export default function ByPrice({
//   priceRange,
//   setPriceRange,
//   minPriceRange,
//   maxPriceRange,
// }: any) {

//   const STEP = 10;
//   const MIN = minPriceRange ?? 0;
//   const MAX = maxPriceRange ?? 100000000;

//   return (
//     <div className="box-collapse scrollFilter">

//       <Range
//         step={STEP}
//         min={MIN}
//         max={MAX}
//         values={priceRange}
//         onChange={(values) => setPriceRange(values)}
//         renderTrack={({ props, children }) => (
//           <div
//             {...props}
//             style={{
//               ...props.style,
//               height: "8px",
//               width: "100%",
//               backgroundColor: "#ccc",
//               borderRadius: "4px",
//               position: "relative",
//             }}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 height: "100%",
//                 left: `${((priceRange[0] - MIN) / (MAX - MIN)) * 100}%`,
//                 right: `${100 - ((priceRange[1] - MIN) / (MAX - MIN)) * 100}%`,
//                 backgroundColor: "orange",
//                 borderRadius: "4px",
//               }}
//             />
//             {children}
//           </div>
//         )}
//         renderThumb={({ props }) => (
//           <div
//             {...props}
//             style={{
//               ...props.style,
//               height: "20px",
//               width: "20px",
//               backgroundColor: "#fff",
//               border: "2px solid orange",
//               borderRadius: "50%",
//               boxShadow: "0 2px 6px rgba(0,0,0,.3)",
//               cursor: "pointer",
//             }}
//           />
//         )}
//       />

//       <div className="d-flex justify-content-between mt-1 small text-muted">
//         <span>{MIN}</span>
//         <span>{MAX}</span>
//       </div>

//       <div className="d-flex mb-3">
//         <input
//           type="number"
//           className="form-control me-2"
//           placeholder="Min"
//           value={priceRange?.[0] || 0}
//           min={MIN}
//           max={priceRange?.[1] || 10000000}
//           onChange={(e) => {
//             const val = Number(e.target.value);
//             if (isNaN(val)) return;
//             setPriceRange([
//               Math.max(MIN, Math.min(val, priceRange[1])),
//               priceRange[1],
//             ]);
//           }}
//         />
//         <input
//           type="number"
//           className="form-control"
//           placeholder="Max"
//           value={priceRange?.[1] || 100000000}
//           min={priceRange?.[0] || 0}
//           max={MAX}
//           onChange={(e) => {
//             const val = Number(e.target.value);
//             if (isNaN(val)) return;
//             setPriceRange([
//               priceRange[0],
//               Math.min(MAX, Math.max(val, priceRange[0])),
//             ]);
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

import { useEffect, useState } from "react";
import { Range } from "react-range";

export default function ByPrice({
  priceRange,
  setPriceRange,
  minPriceRange,
  maxPriceRange,
}: any) {
  const STEP = 10;
  const MIN = Number.isFinite(minPriceRange) ? Number(minPriceRange) : 0;
  const MAX = Number.isFinite(maxPriceRange)
    ? Number(maxPriceRange)
    : 100000000;

  // Local, editable input state (strings so users can type freely)
  const [minInput, setMinInput] = useState(String(priceRange?.[0] ?? MIN));
  const [maxInput, setMaxInput] = useState(String(priceRange?.[1] ?? MAX));

  // Keep inputs in sync if parent range changes externally
  useEffect(() => {
    setMinInput(String(priceRange?.[0] ?? MIN));
    setMaxInput(String(priceRange?.[1] ?? MAX));
  }, [priceRange, MIN, MAX]);

  const clamp = (val: number, lo: number, hi: number) =>
    Math.min(hi, Math.max(lo, val));

  const parseOr = (s: string, fallback: number) => {
    const n = Number(s);
    return Number.isFinite(n) ? n : fallback;
  };

  const applyInputs = () => {
    let nextMin = parseOr(minInput, MIN);
    let nextMax = parseOr(maxInput, MAX);

    nextMin = Math.floor(clamp(nextMin, MIN, MAX));
    nextMax = Math.floor(clamp(nextMax, MIN, MAX));

    // Ensure min <= max; if not, snap max to min
    if (nextMin > nextMax) nextMax = nextMin;

    setPriceRange([nextMin, nextMax]);

    // Normalize inputs after applying
    setMinInput(String(nextMin));
    setMaxInput(String(nextMax));
  };

  const onEnterApply = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") applyInputs();
  };

  return (
    <div className="box-collapse scrollFilter">
      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={[
          Number(priceRange?.[0] ?? MIN),
          Number(priceRange?.[1] ?? MAX),
        ]}
        onChange={(values) => {
          // live update parent range via slider
          setPriceRange(values);
          // reflect in inputs as user drags
          setMinInput(String(values[0]));
          setMaxInput(String(values[1]));
        }}
        renderTrack={({ props, children }) => {
          const [curMin, curMax] = [
            Number(priceRange?.[0] ?? MIN),
            Number(priceRange?.[1] ?? MAX),
          ];
          return (
            <div
              {...props}
              style={{
                ...props.style,
                height: "8px",
                width: "100%",
                backgroundColor: "#e5e7eb",
                borderRadius: "4px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  height: "100%",
                  left: `${((curMin - MIN) / (MAX - MIN)) * 100}%`,
                  right: `${100 - ((curMax - MIN) / (MAX - MIN)) * 100}%`,
                  backgroundColor: "orange",
                  borderRadius: "4px",
                }}
              />
              {children}
            </div>
          );
        }}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              backgroundColor: "#fff",
              border: "2px solid orange",
              borderRadius: "50%",
              boxShadow: "0 2px 6px rgba(0,0,0,.3)",
              cursor: "pointer",
            }}
          />
        )}
      />

      <div className="d-flex justify-content-between mt-1 small text-muted">
        <span>{MIN}</span>
        <span>{MAX}</span>
      </div>

      <div className="d-flex mb-2" style={{ gap: 8, alignItems: "center" }}>
        <input
          type="number"
          className="form-control"
          placeholder="Min"
          value={minInput}
          onChange={(e) => setMinInput(e.target.value)}
          onKeyDown={onEnterApply}
          style={{ flex: 1 }}
        />
        <span style={{ color: "#6b7280" }}>to</span>
        <input
          type="number"
          className="form-control"
          placeholder="Max"
          value={maxInput}
          onChange={(e) => setMaxInput(e.target.value)}
          onKeyDown={onEnterApply}
          style={{ flex: 1 }}
        />
      </div>

      <div className="d-flex" style={{ gap: 8, flexDirection: "row-reverse" }}>
        <button
          type="button"
          // className="btn btn-sm"
          style={{
            padding: "1px 10px ",
            height: "2rem",
            border: "1px solid #80808063",
            borderRadius: "10px",
          }}
          onClick={() => {
            setMinInput(String(MIN));
            setMaxInput(String(MAX));
            setPriceRange([MIN, MAX]);
          }}
        >
          Reset
        </button>
        <button
          type="button"
          // className="btn btn-sm btn-gray"
          style={{
            background: "orange",
            borderRadius: "10px",
            padding: "1px 10px",
            height: "2rem",
          }}
          onClick={applyInputs}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
