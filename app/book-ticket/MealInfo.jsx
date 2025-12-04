import { Form, Select } from "antd";
import { useEffect } from "react";
const { Option } = Select;

const MealInfo = ({
  numAdults,
  numChild,
  numInfants,
  apiData,
  form,
  storedTravellerInfos,
  onMealChange,
}) => {
  useEffect(() => {
    if (
      !storedTravellerInfos ||
      !Array.isArray(storedTravellerInfos) ||
      !apiData
    )
      return;
    console.log(
      "storedTravellerInfosstoredTravellerInfos ==== ",
      storedTravellerInfos
    );

    const values = {};
    let segmentIndex = 0;
    apiData.tripInfos?.forEach((trip) => {
      const segmentinfo = trip.sI || [];

      segmentinfo.forEach((segment) => {
        const segmentIdStr = segment?.ssrInfo?.MEAL;
        console.log("segmentIdStr == ", segmentIdStr);

        // Adults
        for (let index = 0; index < numAdults; index++) {
          const traveller = storedTravellerInfos[index];

          if (traveller?.ssrMealInfos?.[segmentIndex]?.code) {
            values[
              `adultMeal-${segmentIndex}-${index}`
            ] = `${segment.id}|${traveller.ssrMealInfos[segmentIndex].code}`;
          }
        }

        // Children
        for (let index = 0; index < numChild; index++) {
          const traveller = storedTravellerInfos[numAdults + index];

          if (traveller?.ssrMealInfos?.[segmentIndex]?.code) {
            values[
              `childMeal-${segmentIndex}-${index}`
            ] = `${segment.id}|${traveller.ssrMealInfos[segmentIndex].code}`;
          }
        }
        segmentIndex++;
      });
    });

    // Pre-fill the form
    form.setFieldsValue(values);
  }, [storedTravellerInfos, apiData, numAdults, numChild, form]);

  if (!apiData || !apiData.tripInfos) {
    return (
      <div className="p-3 text-sm text-gray-500">Loading meal options...</div>
    );
  }

  const segmentinfo = apiData.tripInfos.flatMap((trip) => trip.sI || []);
  const hasMeal = segmentinfo.some((seg) => seg?.ssrInfo?.MEAL?.length > 0);

  const handleValuesChange = (changedValues, allValues) => {
    console.log("handleValuesChange allValues ==> ", allValues);
    let totalMealAmount = 0;
    const allMeals = Object.keys(allValues)
      .filter(
        (key) => key.startsWith("adultMeal") || key.startsWith("childMeal")
      )
      .map((key) => allValues[key])
      .filter((value) => value);

    allMeals.forEach((value) => {
      if (!value) return;
      
      if (typeof value !== "string" || !value.includes("|")) return;
      
      const [segmentId, mealCode] = value.split("|");
      const segment = segmentinfo.find(
        (s) => String(s.id) === String(segmentId)
      );
      if (segment) {
        const mealOption = segment.ssrInfo.MEAL.find(
          (m) => m.code === mealCode
        );
        if (mealOption) {
          totalMealAmount += mealOption.amount;
        }
      }
    });

    onMealChange(totalMealAmount);
  };

  const handleChange = () => {
    const allValues = form.getFieldsValue();
    handleValuesChange(null, allValues);
  };

  return (
    <>
      {hasMeal ? (
        <Form form={form} name="mealForm" layout="vertical" autoComplete="off">
          {segmentinfo.map((segment, flightIndex) => {
            const mealOptions = segment?.ssrInfo?.MEAL || [];

            return (
              <div key={`flight-${flightIndex}`} className="border-b pb-4 mb-4">
                <h3 className="text-lg">{`${segment?.fD?.aI?.name}-${segment?.fD?.fN}`}</h3>

                {/* Adult Meals */}
                {Array.from({ length: numAdults }).map((_, index) => (
                  <div
                    className="p-2 flex gap-4 items-center"
                    key={`adult-${flightIndex}-${index}`}
                  >
                    <span
                      className="text-sm font-bold text-gray-900"
                      style={{ width: "100px" }}
                    >
                      ADULT {index + 1}
                    </span>
                    <Form.Item
                      name={`adultMeal-${flightIndex}-${index}`}
                      style={{ marginBottom: 0, width: "500px" }}
                    >
                      {/* <Select
                        className="h-10 "
                        placeholder="Add Meal"
                        disabled={mealOptions.every((meal) => !meal.amount)}
                        onChange={handleChange}
                      >
                        {mealOptions.map((meal) => (
                          <Option
                            key={meal.code}
                            value={`${segment.id}|${meal.code}`}
                          >
                            {meal.desc} - ₹{meal.amount}
                          </Option>
                        ))}
                      </Select> */}
                      <Select
                        placeholder="Add Meal"
                        // disabled={mealOptions.every((b) => !b.amount)}
                        disabled={mealOptions.every((b) => !("amount" in b))}
                        // style={{ width: 500 }}
                        className="meal-w"
                        onChange={handleChange}
                        allowClear
                        onClear={handleChange}
                        dropdownRender={(menu) => (
                          <>
                            {menu}
                            <div
                              style={{
                                borderTop: "1px solid #f0f0f0",
                                padding: 8,
                                textAlign: "right",
                              }}
                            >
                            </div>
                          </>
                        )}
                      >
                        {mealOptions.map((meal) => (
                          <Option
                            key={meal.code}
                            value={`${segment.id}|${meal.code}`}
                            // disabled={!meal.amount}
                          >
                            {meal.desc} - ₹{meal.amount}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                ))}

                {/* Child Meals */}
                {Array.from({ length: numChild }).map((_, index) => (
                  <div
                    className="p-2 flex gap-4 items-center"
                    key={`child-${flightIndex}-${index}`}
                  >
                    <span
                      className="text-sm font-bold text-gray-900"
                      style={{ width: "100px" }}
                    >
                      CHILD {index + 1}
                    </span>
                    <Form.Item
                      name={`childMeal-${flightIndex}-${index}`}
                      style={{ marginBottom: 0, width: "500px" }}
                    >
                      {/* <Select
                        className="h-10 w-100"
                        placeholder="Add Meal"
                        disabled={mealOptions.every((meal) => !meal.amount)}
                        onChange={handleChange}
                      >
                        {mealOptions.map((meal) => (
                          <Option
                            key={meal.code}
                            value={`${segment.id}|${meal.code}`}
                          >
                            {meal.desc} - ₹{meal.amount}
                          </Option>
                        ))}
                      </Select> */}

                      <Select
                        placeholder="Add Meal"
                        // disabled={mealOptions.every((b) => !b.amount)}
                        disabled={mealOptions.every((b) => !("amount" in b))}
                        style={{ width: 500 }}
                        onChange={handleChange}
                        allowClear
                        onClear={handleChange}
                        dropdownRender={(menu) => (
                          <>
                            {menu}
                            <div
                              style={{
                                borderTop: "1px solid #f0f0f0",
                                padding: 8,
                                textAlign: "right",
                              }}
                            >
                            </div>
                          </>
                        )}
                      >
                        {mealOptions.map((meal) => (
                          <Option
                            key={meal.code}
                            value={`${segment.id}|${meal.code}`}
                            // disabled={!meal.amount}
                          >
                            {meal.desc} - ₹{meal.amount}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                ))}

                {/* Infant Meals */}
                {/* {Array.from({ length: numInfants }).map((_, index) => (
                  <div className="p-2 flex gap-4 items-center" key={`infant-${flightIndex}-${index}`}>
                    <span className="text-sm font-bold text-gray-900" style={{ width: "100px" }}>
                      INFANT {index + 1}
                    </span>
                    <Form.Item name={`infantMeal-${flightIndex}-${index}`} style={{ marginBottom: 0 }}>
                      <Select className="h-10 w-100" placeholder="Add Meal" onChange={handleChange}>
                        {mealOptions.map((meal) => (
                          <Option key={meal.code} value={`${segment.id}|${meal.code}`}>
                           {meal.desc} - ₹{meal.amount}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                ))} */}
              </div>
            );
          })}
        </Form>
      ) : (
        <div className="p-3 text-sm text-gray-500">
          No meal options available for this flight.
        </div>
      )}
    </>
  );
};

export default MealInfo;

// import { Form, Select } from "antd";
// import { useEffect, useMemo, useState } from "react";

// const { Option } = Select;

// const MealInfo = ({
//   numAdults,
//   numChild,
//   numInfants,
//   apiData,
//   form,
//   storedTravellerInfos,
//   onMealChange,
// }) => {
//   const segmentinfo = useMemo(
//     () => apiData?.tripInfos?.flatMap((trip) => trip.sI || []) || [],
//     [apiData]
//   );

//   const hasMeal = useMemo(
//     () => segmentinfo.some((seg) => seg?.ssrInfo?.MEAL?.length > 0),
//     [segmentinfo]
//   );

//   // Local state to control form values
//   const [values, setValues] = useState({});

//   // Prefill from storedTravellerInfos
//   useEffect(() => {
//     if (!storedTravellerInfos || !segmentinfo.length) return;

//     const initial = {};
//     segmentinfo.forEach((segment, flightIndex) => {
//       // Adults
//       for (let i = 0; i < numAdults; i++) {
//         const traveller = storedTravellerInfos[i];
//         const code = traveller?.ssrMealInfos?.[flightIndex]?.code;
//         if (code) initial[`adultMeal-${flightIndex}-${i}`] = `${segment.id}|${code}`;
//       }

//       // Children
//       for (let i = 0; i < numChild; i++) {
//         const traveller = storedTravellerInfos[numAdults + i];
//         const code = traveller?.ssrMealInfos?.[flightIndex]?.code;
//         if (code) initial[`childMeal-${flightIndex}-${i}`] = `${segment.id}|${code}`;
//       }

//       // Infants
//       for (let i = 0; i < numInfants; i++) {
//         const traveller = storedTravellerInfos[numAdults + numChild + i];
//         const code = traveller?.ssrMealInfos?.[flightIndex]?.code;
//         if (code) initial[`infantMeal-${flightIndex}-${i}`] = `${segment.id}|${code}`;
//       }
//     });

//     setValues(initial);
//     form?.setFieldsValue(initial);
//   }, [storedTravellerInfos, segmentinfo, numAdults, numChild, numInfants, form]);

//   // Handle selection changes
//   const handleSelectChange = (field, value) => {
//     setValues((prev) => {
//       const updated = { ...prev, [field]: value };
//       let totalMealAmount = 0;

//       Object.values(updated).forEach((val) => {
//         if (!val) return;
//         const [segmentId, mealCode] = val.split("|");
//         const segment = segmentinfo.find((s) => String(s.id) === String(segmentId));
//         const mealOption = segment?.ssrInfo?.MEAL?.find((m) => m.code === mealCode);
//         if (mealOption) totalMealAmount += mealOption.amount;
//       });

//       onMealChange(totalMealAmount);
//       return updated;
//     });
//   };

//   if (!hasMeal)
//     return (
//       <div className="p-3 text-sm text-gray-500">
//         No meal options available for this flight.
//       </div>
//     );

//   return (
//     <Form form={form} layout="vertical" autoComplete="off">
//       {segmentinfo.map((segment, flightIndex) => {
//         const mealOptions = segment?.ssrInfo?.MEAL || [];

//         return (
//           <div key={`flight-${flightIndex}`} className="border-b pb-4 mb-4">
//             <h3 className="text-lg">{`${segment?.fD?.aI?.name}-${segment?.fD?.fN}`}</h3>

//             {/* Adult Meals */}
//             {Array.from({ length: numAdults }).map((_, idx) => {
//               const field = `adultMeal-${flightIndex}-${idx}`;
//               return (
//                 <div key={field} className="p-2 flex gap-4 items-center">
//                   <span style={{ width: "100px" }} className="text-sm font-bold text-gray-900">
//                     ADULT {idx + 1}
//                   </span>
//                   <Select
//                     value={values[field]}
//                     onChange={(val) => handleSelectChange(field, val)}
//                     placeholder="Add Meal"
//                     style={{ width: 500 }}
//                   >
//                     {mealOptions.map((meal) => (
//                       <Option key={meal.code} value={`${segment.id}|${meal.code}`} disabled={!meal.amount}>
//                         {meal.desc} - ₹{meal.amount}
//                       </Option>
//                     ))}
//                   </Select>
//                 </div>
//               );
//             })}

//             {/* Child Meals */}
//             {Array.from({ length: numChild }).map((_, idx) => {
//               const field = `childMeal-${flightIndex}-${idx}`;
//               return (
//                 <div key={field} className="p-2 flex gap-4 items-center">
//                   <span style={{ width: "100px" }} className="text-sm font-bold text-gray-900">
//                     CHILD {idx + 1}
//                   </span>
//                   <Select
//                     value={values[field]}
//                     onChange={(val) => handleSelectChange(field, val)}
//                     placeholder="Add Meal"
//                     style={{ width: 500 }}
//                   >
//                     {mealOptions.map((meal) => (
//                       <Option key={meal.code} value={`${segment.id}|${meal.code}`} disabled={!meal.amount}>
//                         {meal.desc} - ₹{meal.amount}
//                       </Option>
//                     ))}
//                   </Select>
//                 </div>
//               );
//             })}

//             {/* Infant Meals */}
//             {Array.from({ length: numInfants }).map((_, idx) => {
//               const field = `infantMeal-${flightIndex}-${idx}`;
//               return (
//                 <div key={field} className="p-2 flex gap-4 items-center">
//                   <span style={{ width: "100px" }} className="text-sm font-bold text-gray-900">
//                     INFANT {idx + 1}
//                   </span>
//                   <Select
//                     value={values[field]}
//                     onChange={(val) => handleSelectChange(field, val)}
//                     placeholder="Add Meal"
//                     disabled={mealOptions.every((m) => !m.amount)}
//                     style={{ width: 500 }}
//                   >
//                     {mealOptions.map((meal) => (
//                       <Option key={meal.code} value={`${segment.id}|${meal.code}`} disabled={!meal.amount}>
//                         {meal.desc} - ₹{meal.amount}
//                       </Option>
//                     ))}
//                   </Select>
//                 </div>
//               );
//             })}
//           </div>
//         );
//       })}
//     </Form>
//   );
// };

// export default MealInfo;
