import "./DirectFlight.css";

const DirectFlight = ({ isDirectFlight, setIsDirectFlight }) => {
  const handleChange = (e) => {
    setIsDirectFlight(e.target.checked);
  };

  return (
    <div className="direct-flight-options flex flex-row pl-50">
      <label
        className="plan flex flex-row items-center gap-2 bg-white text-black rounded-md pl-5 pr-5"
        htmlFor="direct-yes"
        style={{ width: "max-content", border: "2px solid #d3d3d3" }}
      >
        <input
          type="checkbox"
          id="direct-yes"
          className="direct-flight-checkbox"
          name="direct-flight"
          value="Direct"
          checked={isDirectFlight === true}
          onChange={handleChange}
        />
        <span>Direct Flight</span>
      </label>
    </div>
  );
};

export default DirectFlight;


// const DirectFlight = ({ isDirectFlight, setIsDirectFlight }) => {
//   const handleChange = (e) => {
//     if (e.target.checked) {
//       setIsDirectFlight(true);
//     } else {
//       setIsDirectFlight(false); // or false, depending on what you prefer
//     }
//   };
//   return (
//     <div className="direct-flight-options flex flex-row pl-50">
//       <label
//         className="plan flex flex-row items-center gap-2 bg-white text-black rounded-md pl-5 pr-5"
//         htmlFor="direct-yes"
//         style={{ width: "max-content", border: "2px solid #d3d3d3" }}
//       >
//         <input
//           type="checkbox"
//           id="direct-yes"
//           checked={isDirectFlight === true}
//           onChange={handleChange}
//           style={{
//             width: "20px",
//             height: "15px",
//             border: "1px solidrgb(188, 186, 186)",
//           }}
//         />
//         <span>Direct Flight</span>
//       </label>
//     </div>

//     <div className="plans ml_10 ">
//       <label className="plan basic-plan" htmlFor="regular">
//         <input
//           type="radio"
//           id="regular"
//           name="regular"
//           value="Regular"
//           checked={isDirectFlight === true}
//           onChange={handleChange}
//         />
//         <div className="plan-content">
//           <div className="plan-details">
//             <span>Direct Flight</span>
//           </div>
//         </div>
//       </label>
//     </div>

//     <div className="direct-flight-options flex flex-row pl-50">
//       <label
//         className="plan flex flex-row items-center gap-2 bg-white text-black rounded-md pl-5 pr-5"
//         htmlFor="direct-yes"
//         style={{ width: "max-content", border: "2px solid #d3d3d3" }}
//       >
//         <input
//           type="checkbox"
//           id="direct-yes"
//           name="direct-flight"
//           value="Direct"
//           checked={isDirectFlight === true}
//           onChange={handleChange}
//         />
//         <span>Direct Flight</span>
//       </label>
//     </div>
//   );
// };
