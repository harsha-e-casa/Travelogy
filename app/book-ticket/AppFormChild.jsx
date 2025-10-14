import React, { useEffect } from "react";
import { Form, Input, Select, Row, Col, DatePicker } from "antd";
import countries from "./countries";
import dayjs from "dayjs";

const { Option } = Select;

const AppFormChild = ({
  form,
  index,
  travellerParsedData,
  showPassport,
  pDateCheck,
}) => {
  const travelDate = dayjs(pDateCheck).startOf("day");
  const hasTravelDate = travelDate.isValid();
  const minExpiry = hasTravelDate
    ? travelDate.add(6, "month").endOf("day")
    : null;
  useEffect(() => {
    // Check if travellerParsedData has the necessary fields to prefill
    if (travellerParsedData) {
      const { ti, fN, lN } = travellerParsedData;

      // Prefill form fields using form.setFieldsValue
      form.setFieldsValue({
        [`childselect-${index}`]: ti,
        [`childName-${index}`]: fN,
        [`childlast-${index}`]: lN,
      });
    }

    if (travellerParsedData?.pNat)
      form.setFieldsValue({
        [`childnationality-${index}`]: travellerParsedData.pNat,
      });
    if (travellerParsedData?.eD)
      form.setFieldsValue({
        [`childpassportExpiryDate-${index}`]: dayjs(travellerParsedData.eD),
      });
    if (travellerParsedData?.pid)
      form.setFieldsValue({
        [`childpassportIssueDate-${index}`]: dayjs(travellerParsedData.pid),
      });
    if (travellerParsedData?.pm)
      form.setFieldsValue({
        [`childpassportno-${index}`]: travellerParsedData.pm,
      });
    if (travellerParsedData?.dob)
      form.setFieldsValue({
        [`childdob-${index}`]: dayjs(travellerParsedData.dob),
      });
  }, [travellerParsedData]);

  return (
    <Form
      form={form}
      name={`childForm-${index}`}
      layout="vertical"
      autoComplete="off"
    >
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            name={`childselect-${index}`}
            label="Title"
            hasFeedback
            rules={[{ required: true, message: "This field is required" }]}
            data-name={`childselect-${index}`}
          >
            <Select className="h-10" placeholder="Please select a title">
              <Option value="Ms">Ms</Option>
              <Option value="Master">Master</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={9}>
          <Form.Item
            name={`childName-${index}`}
            label="First Name"
            hasFeedback
            // revalidate when last name changes
            dependencies={[`childlast-${index}`]}
            rules={[
              { required: true, message: "Please enter the name" },
              { min: 2, message: "Last name must be at least 2 characters" },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: "Last name can only contain letters and spaces",
              },
              {
                validator: () => {
                  const norm = (v) =>
                    String(v ?? "")
                      .trim()
                      .replace(/\s+/g, " ")
                      .toLowerCase();

                  // this child's names
                  const thisFirst = norm(
                    form.getFieldValue(`childName-${index}`)
                  );
                  const thisLast = norm(
                    form.getFieldValue(`childlast-${index}`)
                  );
                  if (!thisFirst || !thisLast) return Promise.resolve();

                  const all = form.getFieldsValue(true);

                  // collect all other traveler full names (adults + children)
                  const otherPairs = [];

                  // adults: fname-*, lname-*
                  Object.keys(all)
                    .filter((k) => k.startsWith("fname-"))
                    .forEach((k) => {
                      const i = k.replace("fname-", "");
                      otherPairs.push([norm(all[k]), norm(all[`lname-${i}`])]);
                    });

                  // children: childName-*, childlast-*  (skip current index)
                  Object.keys(all)
                    .filter((k) => k.startsWith("childName-"))
                    .forEach((k) => {
                      const i = k.replace("childName-", "");
                      if (String(i) === String(index)) return; // skip self
                      otherPairs.push([
                        norm(all[k]),
                        norm(all[`childlast-${i}`]),
                      ]);
                    });

                  const dup = otherPairs.some(
                    ([f, l]) => f && l && f === thisFirst && l === thisLast
                  );

                  return dup
                    ? Promise.reject(
                        new Error("This traveler name is already entered")
                      )
                    : Promise.resolve();
                },
              },
            ]}
            data-name={`childName-${index}`}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="First Name"
            />
          </Form.Item>
        </Col>

        <Col span={9}>
          <Form.Item
            name={`childlast-${index}`}
            label="Last Name"
            hasFeedback
            // revalidate when first name changes
            dependencies={[`childName-${index}`]}
            rules={[
              { required: true, message: "Please enter the Last name" },
              { min: 2, message: "Last name must be at least 2 characters" },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: "Last name can only contain letters and spaces",
              },
              {
                validator: () => {
                  const norm = (v) =>
                    String(v ?? "")
                      .trim()
                      .replace(/\s+/g, " ")
                      .toLowerCase();

                  // this child's names
                  const thisFirst = norm(
                    form.getFieldValue(`childName-${index}`)
                  );
                  const thisLast = norm(
                    form.getFieldValue(`childlast-${index}`)
                  );
                  if (!thisFirst || !thisLast) return Promise.resolve();

                  const all = form.getFieldsValue(true);

                  // collect all other traveler full names (adults + children)
                  const otherPairs = [];

                  // adults
                  Object.keys(all)
                    .filter((k) => k.startsWith("fname-"))
                    .forEach((k) => {
                      const i = k.replace("fname-", "");
                      otherPairs.push([norm(all[k]), norm(all[`lname-${i}`])]);
                    });

                  // children (skip current)
                  Object.keys(all)
                    .filter((k) => k.startsWith("childName-"))
                    .forEach((k) => {
                      const i = k.replace("childName-", "");
                      if (String(i) === String(index)) return;
                      otherPairs.push([
                        norm(all[k]),
                        norm(all[`childlast-${i}`]),
                      ]);
                    });

                  const dup = otherPairs.some(
                    ([f, l]) => f && l && f === thisFirst && l === thisLast
                  );

                  return dup
                    ? Promise.reject(
                        new Error("This traveler name is already entered")
                      )
                    : Promise.resolve();
                },
              },
            ]}
            data-name={`childlast-${index}`}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="Last Name"
            />
          </Form.Item>
        </Col>

        {(showPassport?.pped === true ||
          showPassport?.pid === true ||
          showPassport?.pm === true ||
          showPassport?.dobe === true) && (
          <>
            <p
              className="text-sm leading-5 font-bold text-gray-900"
              style={{ paddingLeft: "0.5rem" }}
            >
              Add passport information
            </p>
            <Row gutter={16} className="p-2">
              {/* nationality */}
              <Form.Item
                name={`childnationality-${index}`}
                label="Nationality"
                hasFeedback
                rules={[
                  { required: true, message: "Please select a nationality" },
                ]}
                data-name={`select-${index}`}
              >
                <Select
                  className="h-10"
                  showSearch
                  filterOption={
                    (input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase()) // Filter based on country name
                  }
                  placeholder="Please select a nationality"
                >
                  {Object.entries(countries).map(([country, code]) => (
                    <Option key={code} value={code}>
                      {country}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              {/* passport number */}
              {showPassport.pm === true && (
                <Col span={6}>
                  <Form.Item
                    name={`childpassportno-${index}`}
                    label="Passport Number"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please enter your passport number",
                      },
                      {
                        pattern: /^[A-Za-z0-9]+$/,
                        message:
                          "Passport number can only contain letters and numbers",
                      },
                    ]}
                    data-name={`passportno-${index}`}
                  >
                    <Input
                      className="h-10 flex flex-row justify-between items-center"
                      placeholder="Passport Number"
                    />
                  </Form.Item>
                </Col>
              )}
              {/* passportIssueDate */}
              {showPassport.pid === true && (
                <Col span={12}>
                  <Form.Item
                    name={`childpassportIssueDate-${index}`}
                    label="Passport Issue Date"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please select passport issue date",
                      },
                      {
                        validator: (_, value) => {
                          if (!value || !hasTravelDate)
                            return Promise.resolve();
                          const v = dayjs(value).endOf("day");
                          return v.isAfter(travelDate)
                            ? Promise.reject(
                                new Error(
                                  "Issue date cannot be after the booking date"
                                )
                              )
                            : Promise.resolve();
                        },
                      },
                    ]}
                    data-name={`passportIssueDate-${index}`}
                  >
                    <DatePicker
                      format="YYYY-MM-DD"
                      className="h-10 w-full"
                      placeholder="Select Passport Issue Date"
                      onKeyDown={(e) => {
                        const ok = [
                          "Backspace",
                          "Tab",
                          "ArrowLeft",
                          "ArrowRight",
                          "Delete",
                          "Enter",
                        ];
                        if (ok.includes(e.key)) return;
                        if (!/[\d-]/.test(e.key)) e.preventDefault();
                      }}
                      onPaste={(e) => {
                        const t = (
                          e.clipboardData.getData("text") || ""
                        ).trim();
                        if (!/^\d{4}-\d{2}-\d{2}$/.test(t)) e.preventDefault();
                      }}
                    />
                  </Form.Item>
                </Col>
              )}
              {/* passportExpiryDate */}
              {showPassport?.pped === true && (
                <Col span={12}>
                  <Form.Item
                    name={`childpassportExpiryDate-${index}`}
                    label="Passport Expiry Date"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please select passport expiry date",
                      },
                      {
                        validator: (_, value) => {
                          if (!value || !hasTravelDate || !minExpiry)
                            return Promise.resolve();
                          const v = dayjs(value).endOf("day");
                          if (v.isBefore(minExpiry, "day")) {
                            return Promise.reject(
                              new Error(
                                `Passport must be valid for at least 6 months from travel date (${travelDate.format(
                                  "YYYY-MM-DD"
                                )}). Earliest allowed expiry: ${minExpiry.format(
                                  "YYYY-MM-DD"
                                )}`
                              )
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                    data-name={`passportExpiryDate-${index}`}
                  >
                    <DatePicker
                      format="YYYY-MM-DD"
                      className="h-10 w-full"
                      placeholder="Select Passport Expiry Date"
                      onKeyDown={(e) => {
                        const ok = [
                          "Backspace",
                          "Tab",
                          "ArrowLeft",
                          "ArrowRight",
                          "Delete",
                          "Enter",
                        ];
                        if (ok.includes(e.key)) return;
                        if (!/[\d-]/.test(e.key)) e.preventDefault();
                      }}
                      onPaste={(e) => {
                        const t = (
                          e.clipboardData.getData("text") || ""
                        ).trim();
                        if (!/^\d{4}-\d{2}-\d{2}$/.test(t)) e.preventDefault();
                      }}
                    />
                  </Form.Item>
                </Col>
              )}
              {/* Date of Birth */}
              {showPassport.dobe === true && (
                <Col span={12}>
                  <Form.Item
                    name={`childdob-${index}`}
                    label="Date of Birth"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please select date of birth",
                      },
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject("Invalid date of birth"),
                      },
                    ]}
                    data-name={`dob-${index}`}
                  >
                    <DatePicker
                      format="YYYY-MM-DD"
                      className="h-10 w-full"
                      placeholder="Select Date of Birth"
                      onKeyDown={(e) => {
                        const ok = [
                          "Backspace",
                          "Tab",
                          "ArrowLeft",
                          "ArrowRight",
                          "Delete",
                          "Enter",
                        ];
                        if (ok.includes(e.key)) return;
                        if (!/[\d-]/.test(e.key)) e.preventDefault();
                      }}
                      onPaste={(e) => {
                        const t = (
                          e.clipboardData.getData("text") || ""
                        ).trim();
                        if (!/^\d{4}-\d{2}-\d{2}$/.test(t)) e.preventDefault();
                      }}
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>
          </>
        )}
      </Row>
    </Form>
  );
};

export default AppFormChild;
