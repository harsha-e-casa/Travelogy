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

// import { useEffect, useState } from "react";
// import { Range } from "react-range";

// export default function ByPrice({
//   priceRange,
//   setPriceRange,
//   minPriceRange,
//   maxPriceRange,
// }: any) {
//   console.log("inside by price ==> ",priceRange," ",minPriceRange," ",maxPriceRange);
//   const STEP = 10;
//   const MIN = Number.isFinite(minPriceRange) ? Number(minPriceRange) : 0;
//   const MAX = Number.isFinite(maxPriceRange)
//     ? Number(maxPriceRange)
//     : 100000000;

//   // Local, editable input state (strings so users can type freely)
//   const [minInput, setMinInput] = useState(String(priceRange?.[0] ?? MIN));
//   const [maxInput, setMaxInput] = useState(String(priceRange?.[1] ?? MAX));

//   // Keep inputs in sync if parent range changes externally
//   useEffect(() => {
//     setMinInput(String(priceRange?.[0] ?? MIN));
//     setMaxInput(String(priceRange?.[1] ?? MAX));
//   }, [priceRange, MIN, MAX]);

//   const clamp = (val: number, lo: number, hi: number) =>
//     Math.min(hi, Math.max(lo, val));

//   const parseOr = (s: string, fallback: number) => {
//     const n = Number(s);
//     return Number.isFinite(n) ? n : fallback;
//   };

//   const applyInputs = () => {
//     let nextMin = parseOr(minInput, MIN);
//     let nextMax = parseOr(maxInput, MAX);

//     nextMin = Math.floor(clamp(nextMin, MIN, MAX));
//     nextMax = Math.floor(clamp(nextMax, MIN, MAX));

//     // Ensure min <= max; if not, snap max to min
//     if (nextMin > nextMax) nextMax = nextMin;

//     setPriceRange([nextMin, nextMax]);

//     // Normalize inputs after applying
//     setMinInput(String(nextMin));
//     setMaxInput(String(nextMax));
//   };

//   const onEnterApply = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") applyInputs();
//   };

//   return (
//     <div className="box-collapse scrollFilter">
//       <Range
//         step={STEP}
//         min={MIN}
//         max={MAX}
//         values={[
//           Number(priceRange?.[0] ?? MIN),
//           Number(priceRange?.[1] ?? MAX),
//         ]}
//         onChange={(values) => {
//           // live update parent range via slider
//           setPriceRange(values);
//           // reflect in inputs as user drags
//           setMinInput(String(values[0]));
//           setMaxInput(String(values[1]));
//         }}
//         renderTrack={({ props, children }) => {
//           const [curMin, curMax] = [
//             Number(priceRange?.[0] ?? MIN),
//             Number(priceRange?.[1] ?? MAX),
//           ];
//           return (
//             <div
//               {...props}
//               style={{
//                 ...props.style,
//                 height: "8px",
//                 width: "100%",
//                 backgroundColor: "#e5e7eb",
//                 borderRadius: "4px",
//                 position: "relative",
//               }}
//             >
//               <div
//                 style={{
//                   position: "absolute",
//                   height: "100%",
//                   left: `${((curMin - MIN) / (MAX - MIN)) * 100}%`,
//                   right: `${100 - ((curMax - MIN) / (MAX - MIN)) * 100}%`,
//                   backgroundColor: "orange",
//                   borderRadius: "4px",
//                 }}
//               />
//               {children}
//             </div>
//           );
//         }}
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

//       <div className="d-flex mb-2" style={{ gap: 8, alignItems: "center" }}>
//         <input
//           type="number"
//           className="form-control"
//           placeholder="Min"
//           value={minInput}
//           onChange={(e) => setMinInput(e.target.value)}
//           onKeyDown={onEnterApply}
//           style={{ flex: 1 }}
//         />
//         <span style={{ color: "#6b7280" }}>to</span>
//         <input
//           type="number"
//           className="form-control"
//           placeholder="Max"
//           value={maxInput}
//           onChange={(e) => setMaxInput(e.target.value)}
//           onKeyDown={onEnterApply}
//           style={{ flex: 1 }}
//         />
//       </div>

//       <div className="d-flex" style={{ gap: 8, flexDirection: "row-reverse" }}>
//         <button
//           type="button"
//           // className="btn btn-sm"
//           style={{
//             padding: "1px 10px ",
//             height: "2rem",
//             border: "1px solid #80808063",
//             borderRadius: "10px",
//           }}
//           onClick={() => {
//             setMinInput(String(MIN));
//             setMaxInput(String(MAX));
//             setPriceRange([MIN, MAX]);
//           }}
//         >
//           Reset
//         </button>
//         <button
//           type="button"
//           // className="btn btn-sm btn-gray"
//           style={{
//             background: "orange",
//             borderRadius: "10px",
//             padding: "1px 10px",
//             height: "2rem",
//           }}
//           onClick={applyInputs}
//         >
//           Apply
//         </button>
//       </div>
//     </div>
//   );
// }

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

import { useEffect, useState } from "react";
import { Range } from "react-range";

type Props = {
  priceRange: [number, number];
  setPriceRange: (r: [number, number]) => void;
  minPriceRange?: number;
  maxPriceRange?: number;
};

export default function ByPrice({
  priceRange,
  setPriceRange,
  minPriceRange,
  maxPriceRange,
}: Props) {
  const STEP = 10;
  const MIN =
    minPriceRange != null && !isNaN(Number(minPriceRange))
      ? Number(minPriceRange)
      : 0;

  const MAX =
    maxPriceRange != null && !isNaN(Number(maxPriceRange))
      ? Number(maxPriceRange)
      : 100000000;

  // inputs (users can type)
  const [minInput, setMinInput] = useState(String(priceRange?.[0] ?? MIN));
  const [maxInput, setMaxInput] = useState(String(priceRange?.[1] ?? MAX));

  // local slider state for smooth dragging
  const [sliderVals, setSliderVals] = useState<[number, number]>([
    Number(priceRange?.[0] ?? MIN),
    Number(priceRange?.[1] ?? MAX),
  ]);

  useEffect(() => {
    const pmin = Number(priceRange?.[0] ?? MIN);
    const pmax = Number(priceRange?.[1] ?? MAX);
    setSliderVals([pmin, pmax]);
    setMinInput(String(pmin));
    setMaxInput(String(pmax));
  }, [priceRange, MIN, MAX]);

  const clamp = (v: number, lo: number, hi: number) =>
    Math.min(hi, Math.max(lo, v));
  const normalizeRange = (a: number, b: number): [number, number] => {
    let x = Math.floor(clamp(a, MIN, MAX));
    let y = Math.floor(clamp(b, MIN, MAX));
    if (x > y) y = x;
    return [x, y];
  };
  const parseOr = (s: string, fallback: number) => {
    const n = Number(s);
    return Number.isFinite(n) ? n : fallback;
  };

  // const applyInputs = () => {
  //   const next = normalizeRange(parseOr(minInput, MIN), parseOr(maxInput, MAX));
  //   setPriceRange(next);
  //   setSliderVals(next);
  //   setMinInput(String(next[0]));
  //   setMaxInput(String(next[1]));
  // };

  const applyInputs = () => {
    let nextMin = parseFloat(minInput);
    let nextMax = parseFloat(maxInput);

    if (isNaN(nextMin)) nextMin = MIN;
    if (isNaN(nextMax)) nextMax = MAX;

    nextMin = Math.min(MAX, Math.max(MIN, nextMin));
    nextMax = Math.min(MAX, Math.max(MIN, nextMax));

    if (nextMin > nextMax) nextMax = nextMin;

    const next: [number, number] = [nextMin, nextMax];

    setPriceRange(next);
    setSliderVals(next);
    setMinInput(String(next[0]));
    setMaxInput(String(next[1]));
  };

  const onEnterApply = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") applyInputs();
  };

  return (
    <div className="box-collapse scrollFilter">
      {/* Slider */}
      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={sliderVals}
        onChange={(vals) => {
          const rounded = vals.map((v) => Math.round(v / STEP) * STEP) as [
            number,
            number
          ];
          setSliderVals(rounded);
          setMinInput(String(rounded[0]));
          setMaxInput(String(rounded[1]));
        }}
        onFinalChange={(vals) => {
          const next = normalizeRange(vals[0], vals[1]);
          setPriceRange(next);
          setSliderVals(next);
          setMinInput(String(next[0]));
          setMaxInput(String(next[1]));
        }}
        renderTrack={({ props, children }) => {
          const [curMin, curMax] = sliderVals;
          return (
            <div
              {...props}
              style={{
                ...props.style,
                height: 8,
                width: "100%",
                backgroundColor: "#e5e7eb",
                borderRadius: 4,
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
                  borderRadius: 4,
                }}
              />
              {children}
            </div>
          );
        }}
        renderThumb={({ props, index }) => {
          const val = sliderVals[index];
          return (
            <div
              {...props}
              style={{
                ...props.style,
                height: 20,
                width: 20,
                backgroundColor: "#fff",
                border: "2px solid orange",
                borderRadius: "50%",
                boxShadow: "0 2px 6px rgba(0,0,0,.3)",
                cursor: "pointer",
                position: "relative",
              }}
            >
              {/* value bubble under the thumb */}
              <div
                style={{
                  position: "absolute",
                  top: 24, // below the thumb
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: 12,
                  color: "#374151",
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 6,
                  padding: "2px 6px",
                  whiteSpace: "nowrap",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                }}
              >
                {val}
              </div>
            </div>
          );
        }}
      />

      {/* Inputs below slider */}
      <div
        className="d-flex mb-2 mt-5"
        style={{ gap: 8, alignItems: "center" }}
      >
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 12, color: "#6b7280" }}>Min</label>
          <input
            type="number"
            className="form-control"
            placeholder="Min"
            value={minInput}
            onChange={(e) => setMinInput(e.target.value)}
            onKeyDown={onEnterApply}
          />
        </div>
        <span style={{ color: "#6b7280", marginTop: 16 }}>to</span>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 12, color: "#6b7280" }}>Max</label>
          <input
            type="number"
            className="form-control"
            placeholder="Max"
            value={maxInput}
            onChange={(e) => setMaxInput(e.target.value)}
            onKeyDown={onEnterApply}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="d-flex" style={{ gap: 8, flexDirection: "row-reverse" }}>
        <button
          type="button"
          style={{
            background: "orange",
            borderRadius: 10,
            padding: "1px 10px",
            height: "2rem",
          }}
          onClick={applyInputs}
        >
          Apply
        </button>
        <button
          type="button"
          style={{
            padding: "1px 10px ",
            height: "2rem",
            border: "1px solid #80808063",
            borderRadius: 10,
          }}
          onClick={() => {
            const next: [number, number] = [MIN, MAX];
            setPriceRange(next);
            setSliderVals(next);
            setMinInput(String(MIN));
            setMaxInput(String(MAX));
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
