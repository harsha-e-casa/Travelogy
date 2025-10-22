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

  const [localValues, setLocalValues] = useState({});

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
    setLocalValues(initialValues); // Sync local state as well
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
    Object.values(allValues).forEach((val) => {
      if (!val) return;

      if (typeof val !== "string" || !val.includes("|")) return;
      
      const [segmentId, code] = val.split("|");
      const segment = segmentinfo.find(
        (s) => String(s.id) === String(segmentId)
      );
      const baggage = segment?.ssrInfo?.BAGGAGE?.find((b) => b.code === code);
      if (baggage) {
        totalAmount += baggage.amount;
      }
    });

    onBaggageChange(totalAmount);
  };

  const handleChange = () => {
    console.log("baggage handleChange");
    const allValues = form.getFieldsValue();
    let totalAmount = 0;
    Object.values(allValues).forEach((val) => {
      if (!val) return;
      if (typeof val !== "string" || !val.includes("|")) return;
      const [segmentId, code] = val.split("|");
      const segment = segmentinfo.find(
        (s) => String(s.id) === String(segmentId)
      );
      const baggage = segment?.ssrInfo?.BAGGAGE?.find((b) => b.code === code);
      if (baggage) {
        totalAmount += baggage.amount;
      }
    });
    onBaggageChange(totalAmount);
  };

  return (
    <Form form={form} layout="vertical" autoComplete="off">
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
                          ></div>
                        </>
                      )}
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
                          ></div>
                        </>
                      )}
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
