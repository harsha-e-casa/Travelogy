// import React from "react";
// import Barcode from "react-barcode";

// const BarcodeGenerator = ({ passengerDetails }) => {
//   const generateBarcodeData = (details) => {
//     const {
//       passengerName,
//       pnrCode,
//       fromCityCode,
//       toCityCode,
//       flightNumber,
//       julianDate, // make sure julianDate is a string
//     } = details;

//     // Format barcode string based on provided rules
//     return `M1${passengerName} ${pnrCode.padEnd(7, " ")} ${fromCityCode}${toCityCode}6E ${flightNumber.toString().padStart(5, "0")} ${julianDate.toString().slice(-3)}Y00000000 000`;
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: "50px", overflow: "hidden" }}>
//       {passengerDetails.map((details, index) => {
//         const barcodeData = generateBarcodeData(details);

//         return (
//           <div key={index} style={{ width: "100%", textAlign: "center" }}>
//             <p>Your Airlines Reference: {barcodeData}</p>
//             <Barcode
//               value={barcodeData}
//               format="CODE128"
//               width={1.5}
//               height={80}
//               displayValue={true}
//               fontSize={12}
//               margin={5}
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default BarcodeGenerator

import React from "react";

const BarcodeGenerator = ({ passengerDetails }) => {
  // Build your barcode string
  const generateBarcodeData = (details) => {
    const {
      passengerName,
      pnrCode,
      fromCityCode,
      toCityCode,
      flightNumber,
      flightCode,
      julianDate,
    } = details;

    let paddedFlightNumber = flightNumber.toString();
    let ftCode = flightCode.toString()

    if (paddedFlightNumber.length === 1) {
      paddedFlightNumber = "000" + paddedFlightNumber + " ";
    } else if (paddedFlightNumber.length === 2) {
      paddedFlightNumber = "00" + paddedFlightNumber + " ";
    } else if (paddedFlightNumber.length === 3) {
      paddedFlightNumber = "0" + paddedFlightNumber + " ";
    } else if (paddedFlightNumber.length === 4) {
      paddedFlightNumber = paddedFlightNumber + " ";
    }
    
    if (ftCode.length === 2) {
      ftCode = ftCode + " "
    }
    if (ftCode.length === 1) {
      ftCode = ftCode + "  "
    }

    // return `M1${passengerName} ${pnrCode.padEnd(7, " ")} ${fromCityCode}${toCityCode}6E ${flightNumber.toString().padStart(5, "0")} ${julianDate.toString().slice(-3)}Y00000000 000`;

    return `M1${passengerName} ${pnrCode.padEnd(
      7,
      " "
    )}${fromCityCode}${toCityCode}6E ${paddedFlightNumber}${julianDate.toString().slice(-3)}Y000000000000`;
  };


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        overflow: "hidden",
      }}
    >
      {passengerDetails.map((details, index) => {
        const barcodeData = generateBarcodeData(details);
        // Build TEC-IT PDF417 API URL
        const apiUrl = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(
          barcodeData
        )}&code=PDF417&multiplebarcodes=false&translate-esc=false`;

        return (
          <div key={index} style={{ width: "100%", textAlign: "center" }}>
            {/* <p>Your Airlines Reference: {barcodeData}</p> */}
            <img
              src={apiUrl}
              alt="PDF417 Barcode"
              style={{ background: "#fff", padding: 8, maxWidth: 400 }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BarcodeGenerator;
