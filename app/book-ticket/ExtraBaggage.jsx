// import { Form, Input, Select, Row, Col } from "antd";
// import { useEffect } from "react";

// const { Option } = Select;

// const ExtraBaggage = ({ numAdults, numChild, numInfants, apiData, form, storedTravellerInfos, onBaggageChange }) => {
//   console.log("apiData from extra baggage", apiData);
//   console.log("storedTravellerInfos == ", storedTravellerInfos);

//   const tripInfos = apiData?.tripInfos || [];
//   const segmentinfo = tripInfos.flatMap((trip) => trip.sI || []);
//   console.log("segmentinfo from extra baggage", segmentinfo);
//   const ssrInfo = segmentinfo
//     .map((segment) => segment?.ssrInfo)
//     .filter(Boolean);

//   console.log("ssrInfo from extra baggage", ssrInfo);

//   const hasBaggage = ssrInfo.some(
//     (e) => Array.isArray(e.BAGGAGE) && e.BAGGAGE.length > 0
//   );

//   useEffect(() => {
//     if (!storedTravellerInfos || !Array.isArray(storedTravellerInfos) || !apiData) return;

//     const values = {};
//     let segmentIndex = 0;
//     apiData.tripInfos?.forEach((trip) => {
//       const segmentinfo = trip.sI || [];
//       console.log("segmentinfoooo ", segmentinfo)

//       segmentinfo.forEach((segment) => {
//         const segmentIdStr = segment?.ssrInfo?.BAGGAGE;
//         console.log("segmentIdStr == ", segmentIdStr)
//         // Adults
//         for (let index = 0; index < numAdults; index++) {
//           const traveller = storedTravellerInfos[index];

//           if (traveller?.ssrBaggageInfos?.[segmentIndex]?.code) {
//             values[`adultBaggage-${segmentIndex}-${index}`] = `${segment.id}|${traveller.ssrBaggageInfos[segmentIndex].code}`;
//           }
//         }

//         // Children
//         for (let index = 0; index < numChild; index++) {
//           const traveller = storedTravellerInfos[numAdults + index];

//           if (traveller?.ssrBaggageInfos?.[segmentIndex]?.code) {
//             values[`childBaggage-${segmentIndex}-${index}`] = `${segment.id}|${traveller.ssrBaggageInfos[segmentIndex].code}`;
//           }
//         }
//         segmentIndex++;
//       });
//     });

//     form.setFieldsValue(values);
//   }, [storedTravellerInfos, apiData, numAdults, numChild, form]);

//   const handleValuesChange = (changedValues, allValues) => {
//     console.log("handleValuesChange allValues ==> ", allValues)
//     let totalBaggageAmount = 0;
//     const allBaggage = Object.keys(allValues)
//       .filter(key => key.startsWith('adultBaggage') || key.startsWith('childBaggage'))
//       .map(key => allValues[key])
//       .filter(value => value);

//     allBaggage.forEach(value => {
//       const [segmentId, baggageCode] = value.split('|');
//       const segment = segmentinfo.find(s => String(s.id) === String(segmentId));
//       if (segment) {
//         const baggageOption = segment.ssrInfo.BAGGAGE.find(b => b.code === baggageCode);
//         if (baggageOption) {
//           totalBaggageAmount += baggageOption.amount;
//         }
//       }
//     });
//     console.log("totalBaggageAmount ==> ", totalBaggageAmount)

//     onBaggageChange(totalBaggageAmount);
//   };

//   return (
//     <>
//       {hasBaggage ? (
//         <>
//           <Form
//             form={form}
//             name="baggageForm"
//             layout="vertical"
//             autoComplete="off"
//             onValuesChange={handleValuesChange}
//           >
//             {segmentinfo.map((segment, flightIndex) => {
//               const baggageOptions = segment?.ssrInfo?.BAGGAGE || [];
//               console.log("baggagesementid = ", segment.id)

//               return (
//                 <div
//                   key={`flight-${flightIndex}`}
//                   className="border-b pb-4 mb-4"
//                 >
//                   <h3 className="text-lg">{`${segment?.fD?.aI?.name}-${segment?.fD?.fN}`}</h3>

//                   {/* Adult Baggage for this flight */}
//                   {Array.from({ length: numAdults }).map((_, index) => (
//                     <div
//                       className="p-2 flex gap-4 items-center"
//                       key={`adult-${flightIndex}-${index}`}
//                     >
//                       <span
//                         style={{ width: "100px" }}
//                         className="text-sm font-bold text-gray-900"
//                       >
//                         ADULT {index + 1}
//                       </span>
//                       <Form.Item
//                         name={`adultBaggage-${flightIndex}-${index}`}
//                         style={{ marginBottom: 0, width: "500px" }}
//                       >
//                         <Select
//                           className="h-10"
//                           placeholder="Add Baggage"
//                           onChange={(val) => console.log("Direct Select change ==>", val)}
//                           disabled={baggageOptions.every((bag) => !bag.amount)}
//                         >
//                           {baggageOptions.map((bag) => (
//                             <Option
//                               key={bag.code}
//                               value={`${segment.id}|${bag.code}`}
//                               disabled={!bag.amount}
//                             >
//                               {bag.desc} - ₹{bag.amount}
//                             </Option>
//                           ))}
//                         </Select>
//                       </Form.Item>
//                       {/* <Form.Item shouldUpdate>
//                         {() => <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>}
//                       </Form.Item> */}
//                     </div>
//                   ))}

//                   {/* Child Baggage */}
//                   {Array.from({ length: numChild }).map((_, index) => (
//                     <div
//                       className="p-2 flex gap-4 items-center"
//                       key={`child-${flightIndex}-${index}`}
//                     >
//                       <span
//                         style={{ width: "100px" }}
//                         className="text-sm font-bold text-gray-900"
//                       >
//                         CHILD {index + 1}
//                       </span>
//                       <Form.Item
//                         name={`childBaggage-${flightIndex}-${index}`}
//                         style={{ marginBottom: 0, width: "500px" }}
//                       >
//                         <Select
//                           className="h-10 w-100"
//                           placeholder="Add Baggage"
//                           disabled={baggageOptions.every((bag) => !bag.amount)}
//                         >
//                           {baggageOptions.map((bag) => (
//                             <Option
//                               key={bag.code}
//                               value={`${segment.id}|${bag.code}`}
//                               disabled={!bag.amount}
//                             >
//                               {bag.desc} - ₹{bag.amount}
//                             </Option>
//                           ))}
//                         </Select>
//                       </Form.Item>
//                     </div>
//                   ))}

//                   {/* Infant Baggage */}
//                   {/* {Array.from({ length: numInfants }).map((_, index) => (
//                     <div
//                       className="p-2 flex gap-4 items-center"
//                       key={`infant-${flightIndex}-${index}`}
//                     >
//                       <span
//                         style={{ width: "100px" }}
//                         className="text-sm font-bold text-gray-900"
//                       >
//                         INFANT {index + 1}
//                       </span>
//                       <Form.Item
//                         name={`infantBaggage-${flightIndex}-${index}`}
//                         style={{ marginBottom: 0, width: "500px" }}
//                       >
//                         <Select
//                           className="h-10 w-100"
//                           placeholder="Add Baggage"
//                           disabled={baggageOptions.every((bag) => !bag.amount)}
//                         >
//                           {baggageOptions.map((bag) => (
//                             <Option
//                               key={bag.code}
//                               value={`${segment.id}|${bag.code}`}
//                               disabled={!bag.amount}
//                             >
//                               {bag.desc} - ₹{bag.amount}
//                             </Option>
//                           ))}
//                         </Select>
//                       </Form.Item>
//                     </div>
//                   ))} */}
//                 </div>
//               );
//             })}
//           </Form>
//         </>
//       ) : (
//         <>
//           <div className="p-3 text-sm text-gray-500">
//             No baggage options available for this flight.
//           </div>
//         </>
//       )}
//     </>
//   );
// };
// export default ExtraBaggage;

import { Form, Select } from "antd";
import { useMemo, useEffect, useState } from "react";

const { Option } = Select;

const ExtraBaggage = ({
  numAdults,
  numChild,
  apiData,
  form,
  storedTravellerInfos,
  onBaggageChange,
}) => {
  const tripInfos = apiData?.tripInfos || [];

  // Flatten all segments
  const segmentinfo = useMemo(
    () => tripInfos.flatMap((trip) => trip.sI || []),
    [tripInfos]
  );

  const hasBaggage = useMemo(
    () =>
      segmentinfo.some(
        (seg) =>
          Array.isArray(seg?.ssrInfo?.BAGGAGE) && seg.ssrInfo.BAGGAGE.length > 0
      ),
    [segmentinfo]
  );

  // Local state for handling intermediate baggage amount
  const [localValues, setLocalValues] = useState({});

  // Prefill initial values from storedTravellerInfos
  useEffect(() => {
    if (!storedTravellerInfos || !segmentinfo.length) return;

    const initialValues = {};

    segmentinfo.forEach((segment, flightIndex) => {
      // Adults
      for (let i = 0; i < numAdults; i++) {
        const traveller = storedTravellerInfos[i];
        const code = traveller?.ssrBaggageInfos?.[flightIndex]?.code;
        if (code) {
          initialValues[
            `adultBaggage-${flightIndex}-${i}`
          ] = `${segment.id}|${code}`;
        }
      }

      // Children
      for (let i = 0; i < numChild; i++) {
        const traveller = storedTravellerInfos[numAdults + i];
        const code = traveller?.ssrBaggageInfos?.[flightIndex]?.code;
        if (code) {
          initialValues[
            `childBaggage-${flightIndex}-${i}`
          ] = `${segment.id}|${code}`;
        }
      }
    });

    // Set prefilled values in Form
    form?.setFieldsValue(initialValues);
    setLocalValues(initialValues);  // Sync local state as well
  }, [storedTravellerInfos, segmentinfo, numAdults, numChild, form]);

  if (!hasBaggage) {
    return (
      <div className="p-3 text-sm text-gray-500">
        No baggage options available for this flight.
      </div>
    );
  }

  // Compute total baggage amount whenever form values change
  const handleValuesChange = (_, allValues) => {
    let totalAmount = 0;

    // Sync local state to Form's values
    setLocalValues((prev) => {
      const updated = { ...prev, ...allValues };
      Object.values(updated).forEach((val) => {
        if (!val) return;
        const [segmentId, code] = val.split("|");
        const segment = segmentinfo.find(
          (s) => String(s.id) === String(segmentId)
        );
        const baggage = segment?.ssrInfo?.BAGGAGE?.find((b) => b.code === code);
        if (baggage) totalAmount += baggage.amount;
      });

      return updated;
    });

    // Send total amount back to parent
    onBaggageChange(totalAmount);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      autoComplete="off"
      onValuesChange={handleValuesChange}  // Use Form to handle value changes
    >
      {segmentinfo.map((segment, flightIndex) => {
        const baggageOptions = segment?.ssrInfo?.BAGGAGE || [];

        return (
          <div key={`flight-${flightIndex}`} className="border-b pb-4 mb-4">
            <h3 className="text-lg">
              {`${segment?.fD?.aI?.name}-${segment?.fD?.fN}`}
            </h3>

            {/* Adult Baggage */}
            {Array.from({ length: numAdults }).map((_, idx) => {
              const field = `adultBaggage-${flightIndex}-${idx}`;
              return (
                <div key={field} className="p-2 flex gap-4 items-center">
                  <span
                    style={{ width: "100px" }}
                    className="text-sm font-bold text-gray-900"
                  >
                    ADULT {idx + 1}
                  </span>
                  <Form.Item name={field} style={{ marginBottom: 0 }}>
                    <Select
                      placeholder="Add Baggage"
                      disabled={baggageOptions.every((b) => !b.amount)}
                      style={{ width: 500 }}
                    >
                      {baggageOptions.map((bag) => (
                        <Option
                          key={bag.code}
                          value={`${segment.id}|${bag.code}`}
                          disabled={!bag.amount}
                        >
                          {bag.desc} - ₹{bag.amount}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              );
            })}

            {/* Child Baggage */}
            {Array.from({ length: numChild }).map((_, idx) => {
              const field = `childBaggage-${flightIndex}-${idx}`;
              return (
                <div key={field} className="p-2 flex gap-4 items-center">
                  <span
                    style={{ width: "100px" }}
                    className="text-sm font-bold text-gray-900"
                  >
                    CHILD {idx + 1}
                  </span>
                  <Form.Item name={field} style={{ marginBottom: 0 }}>
                    <Select
                      placeholder="Add Baggage"
                      disabled={baggageOptions.every((b) => !b.amount)}
                      style={{ width: 500 }}
                    >
                      {baggageOptions.map((bag) => (
                        <Option
                          key={bag.code}
                          value={`${segment.id}|${bag.code}`}
                          disabled={!bag.amount}
                        >
                          {bag.desc} - ₹{bag.amount}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              );
            })}
          </div>
        );
      })}
    </Form>
  );
};

export default ExtraBaggage;


