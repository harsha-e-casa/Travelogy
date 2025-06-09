import { Form, Select } from 'antd';
const { Option } = Select;

const MealInfo = ({ numAdults, numChild, numInfants, apiData, form }) => {
  if (!apiData || !apiData.tripInfos) {
    return <div className="p-3 text-sm text-gray-500">Loading meal options...</div>;
  }

  const segmentinfo = apiData.tripInfos.flatMap((trip) => trip.sI || []);
  const hasMeal = segmentinfo.some(seg => seg?.ssrInfo?.MEAL?.length > 0);

  return (
    <>
      {hasMeal ? (
        <Form form={form} name="mealForm" layout="vertical" autoComplete="off">
          {segmentinfo.map((segment, flightIndex) => {
            const mealOptions = segment?.ssrInfo?.MEAL || [];

            return (
              <div key={`flight-${flightIndex}`} className="border-b pb-4 mb-4">
                <h3 className="text-lg">Flight {flightIndex + 1}</h3>

                {/* Adult Meals */}
                {Array.from({ length: numAdults }).map((_, index) => (
                  <div className="p-2 flex gap-4 items-center" key={`adult-${flightIndex}-${index}`}>
                    <span className="text-sm font-bold text-gray-900" style={{ width: "100px" }}>
                      ADULT {index + 1}
                    </span>
                    <Form.Item name={`adultMeal-${flightIndex}-${index}`} style={{ marginBottom: 0,width:"500px"}}>
                      <Select className="h-10 " placeholder="Add Meal">
                        {mealOptions.map((meal) => (
                          <Option key={meal.code} value={meal.code}>
                            {meal.desc} - ₹{meal.amount}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                ))}

                {/* Child Meals */}
                {Array.from({ length: numChild }).map((_, index) => (
                  <div className="p-2 flex gap-4 items-center" key={`child-${flightIndex}-${index}`}>
                    <span className="text-sm font-bold text-gray-900" style={{ width: "100px" }}>
                      CHILD {index + 1}
                    </span>
                    <Form.Item name={`childMeal-${flightIndex}-${index}`} style={{ marginBottom: 0 }}>
                      <Select className="h-10 w-100" placeholder="Add Meal">
                        {mealOptions.map((meal) => (
                          <Option key={meal.code} value={meal.code}>
                            {meal.desc} - ₹{meal.amount}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                ))}

                {/* Infant Meals */}
                {Array.from({ length: numInfants }).map((_, index) => (
                  <div className="p-2 flex gap-4 items-center" key={`infant-${flightIndex}-${index}`}>
                    <span className="text-sm font-bold text-gray-900" style={{ width: "100px" }}>
                      INFANT {index + 1}
                    </span>
                    <Form.Item name={`infantMeal-${flightIndex}-${index}`} style={{ marginBottom: 0 }}>
                      <Select className="h-10 w-100" placeholder="Add Meal">
                        {mealOptions.map((meal) => (
                          <Option key={meal.code} value={meal.code}>
                            {meal.desc} - ₹{meal.amount}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                ))}
              </div>
            );
          })}
        </Form>
      ) : (
        <div className="p-3 text-sm text-gray-500">No meal options available for this flight.</div>
      )}
    </>
  );
};

export default MealInfo;
