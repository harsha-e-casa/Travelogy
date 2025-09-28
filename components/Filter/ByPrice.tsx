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

import React from "react";
import { Range } from "react-range";

export default function ByPrice({
  priceRange,
  setPriceRange,
  minPriceRange,
  maxPriceRange,
}: any) {
  console.log("Byprice priceRange ==> ",priceRange)
  console.log("Byprice setPriceRange ==> ",setPriceRange)
  console.log("Byprice minPriceRange ==> ",minPriceRange)
  console.log("Byprice maxPriceRange ==> ",maxPriceRange)
  const STEP = 10;
  const MIN = minPriceRange ?? 0;
  const MAX = maxPriceRange ?? 100000000;

  return (
    <div className="box-collapse scrollFilter">

      {/* Dual-thumb Range Slider */}
      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={priceRange}
        onChange={(values) => setPriceRange(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "8px",
              width: "100%",
              backgroundColor: "#ccc",
              borderRadius: "4px",
              position: "relative",
            }}
          >
            {/* Active Track Between Thumbs */}
            <div
              style={{
                position: "absolute",
                height: "100%",
                left: `${((priceRange[0] - MIN) / (MAX - MIN)) * 100}%`,
                right: `${100 - ((priceRange[1] - MIN) / (MAX - MIN)) * 100}%`,
                backgroundColor: "orange",
                borderRadius: "4px",
              }}
            />
            {children}
          </div>
        )}
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

      {/* Optional: Labels */}
      <div className="d-flex justify-content-between mt-1 small text-muted">
        <span>{MIN}</span>
        <span>{MAX}</span>
      </div>

      {/* Number Inputs */}
      <div className="d-flex mb-3">
        <input
          type="number"
          className="form-control me-2"
          placeholder="Min"
          value={priceRange[0]}
          min={MIN}
          max={priceRange[1]}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (isNaN(val)) return;
            setPriceRange([
              Math.max(MIN, Math.min(val, priceRange[1])),
              priceRange[1],
            ]);
          }}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Max"
          value={priceRange[1]}
          min={priceRange[0]}
          max={MAX}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (isNaN(val)) return;
            setPriceRange([
              priceRange[0],
              Math.min(MAX, Math.max(val, priceRange[0])),
            ]);
          }}
        />
      </div>
    </div>
  );
}
