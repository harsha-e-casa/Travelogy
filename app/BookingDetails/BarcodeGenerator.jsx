import React from "react";
import Barcode from "react-barcode";

const BarcodeGenerator = ({ passengerDetails }) => {
  const generateBarcodeData = (details) => {
    const {
      passengerName,
      pnrCode,
      fromCityCode,
      toCityCode,
      flightNumber,
      julianDate, // make sure julianDate is a string
    } = details;

    // Format barcode string based on provided rules
    return `M1${passengerName} ${pnrCode.padEnd(7, " ")} ${fromCityCode}${toCityCode}6E ${flightNumber.toString().padStart(5, "0")} ${julianDate.toString().slice(-3)}Y00000000 000`;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "50px", overflow: "hidden" }}>
      {passengerDetails.map((details, index) => {
        const barcodeData = generateBarcodeData(details);

        return (
          <div key={index} style={{ width: "100%", textAlign: "center" }}>
            <p>Your Airlines Reference: {barcodeData}</p>
            <Barcode
              value={barcodeData}
              format="CODE128"
              width={1.5}
              height={80}
              displayValue={true}
              fontSize={12}
              margin={5}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BarcodeGenerator
