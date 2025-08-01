import { Form, Input, Select, Row, Col } from "antd";

const { Option } = Select;

const ExtraBaggage = ({ numAdults, numChild, numInfants, apiData, form }) => {
  console.log("apiData from extra baggage", apiData);

  const tripInfos = apiData?.tripInfos || [];
  const segmentinfo = tripInfos.flatMap((trip) => trip.sI || []);
  console.log("segmentinfo from extra baggage", segmentinfo);
  const ssrInfo = segmentinfo
    .map((segment) => segment?.ssrInfo)
    .filter(Boolean);

  console.log("ssrInfo from extra baggage", ssrInfo);

  const hasBaggage = ssrInfo.some(
    (e) => Array.isArray(e.BAGGAGE) && e.BAGGAGE.length > 0
  );
  return (
    <>
      {hasBaggage ? (
        <>
          <Form
            form={form}
            name="baggageForm"
            layout="vertical"
            autoComplete="off"
          >
            {segmentinfo.map((segment, flightIndex) => {
              const baggageOptions = segment?.ssrInfo?.BAGGAGE || [];

              return (
                <div
                  key={`flight-${flightIndex}`}
                  className="border-b pb-4 mb-4"
                >
                  <h3 className="text-lg">{`${segment?.fD?.aI?.name}-${segment?.fD?.fN}`}</h3>

                  {/* Adult Baggage for this flight */}
                  {Array.from({ length: numAdults }).map((_, index) => (
                    <div
                      className="p-2 flex gap-4 items-center"
                      key={`adult-${flightIndex}-${index}`}
                    >
                      <span
                        style={{ width: "100px" }}
                        className="text-sm font-bold text-gray-900"
                      >
                        ADULT {index + 1}
                      </span>
                      <Form.Item
                        name={`adultBaggage-${flightIndex}-${index}`}
                        style={{ marginBottom: 0, width: "500px" }}
                      >
                        <Select
                          className="h-10"
                          placeholder="Add Baggage"
                          disabled={baggageOptions.every((bag) => !bag.amount)}
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
                  ))}

                  {/* Child Baggage */}
                  {Array.from({ length: numChild }).map((_, index) => (
                    <div
                      className="p-2 flex gap-4 items-center"
                      key={`child-${flightIndex}-${index}`}
                    >
                      <span
                        style={{ width: "100px" }}
                        className="text-sm font-bold text-gray-900"
                      >
                        CHILD {index + 1}
                      </span>
                      <Form.Item
                        name={`childBaggage-${flightIndex}-${index}`}
                        style={{ marginBottom: 0, width: "500px" }}
                      >
                        <Select
                          className="h-10 w-100"
                          placeholder="Add Baggage"
                          disabled={baggageOptions.every((bag) => !bag.amount)}
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
                  ))}

                  {/* Infant Baggage */}
                  {Array.from({ length: numInfants }).map((_, index) => (
                    <div
                      className="p-2 flex gap-4 items-center"
                      key={`infant-${flightIndex}-${index}`}
                    >
                      <span
                        style={{ width: "100px" }}
                        className="text-sm font-bold text-gray-900"
                      >
                        INFANT {index + 1}
                      </span>
                      <Form.Item
                        name={`infantBaggage-${flightIndex}-${index}`}
                        style={{ marginBottom: 0, width: "500px" }}
                      >
                        <Select
                          className="h-10 w-100"
                          placeholder="Add Baggage"
                          disabled={baggageOptions.every((bag) => !bag.amount)}
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
                  ))}
                </div>
              );
            })}
          </Form>
        </>
      ) : (
        <>
          <div className="p-3 text-sm text-gray-500">
            No baggage options available for this flight.
          </div>
        </>
      )}
    </>
  );
};
export default ExtraBaggage;
