import React, { useEffect } from "react";
import { Form, Input, Select, Row, Col, DatePicker } from "antd";
import moment from "moment";
import countries from "./countries";
import dayjs from "dayjs";

const { Option } = Select;

const AppFormAdult = ({
  form,
  index,
  showDocumentField,
  showPassportField,
  travellerParsedData,
  showPassport,
  pDateCheck,
}) => {
  const bookDate = dayjs(pDateCheck).startOf("day");
  const minExpiry = bookDate.isValid()
    ? bookDate.add(6, "month").endOf("day")
    : null;

  useEffect(() => {
    if (travellerParsedData) {
      const { ti, fN, lN } = travellerParsedData;

      form.setFieldsValue({
        [`select-${index}`]: ti,
        [`fname-${index}`]: fN,
        [`lname-${index}`]: lN,
      });
    }

    if (travellerParsedData?.di)
      form.setFieldsValue({
        [`documentId-${index}`]: travellerParsedData.di,
      });

    if (travellerParsedData?.pNat)
      form.setFieldsValue({
        [`adultnationality-${index}`]: travellerParsedData.pNat,
      });
    if (travellerParsedData?.eD)
      form.setFieldsValue({
        [`adultpassportExpiryDate-${index}`]: moment(travellerParsedData.eD),
      });
    if (travellerParsedData?.pid)
      form.setFieldsValue({
        [`adultpassportIssueDate-${index}`]: moment(travellerParsedData.pid),
      });
    if (travellerParsedData?.pm)
      form.setFieldsValue({
        [`adultpassportno-${index}`]: travellerParsedData.pm,
      });
    if (travellerParsedData?.dob)
      form.setFieldsValue({
        [`adultdob-${index}`]: moment(travellerParsedData.dob),
      });
  }, [travellerParsedData]);

  const uniqueNameValidator = () => ({
    validator: async () => {
      const normalize = (v) =>
        String(v ?? "")
          .trim()
          .replace(/\s+/g, " ")
          .toLowerCase();

      const thisFirst = normalize(form.getFieldValue(`fname-${index}`));
      const thisLast = normalize(form.getFieldValue(`lname-${index}`));

      if (!thisFirst || !thisLast) return Promise.resolve();

      const allValues = form.getFieldsValue(true);
      const otherIndices = Object.keys(allValues)
        .filter((k) => k.startsWith("fname-"))
        .map((k) => k.replace("fname-", ""))
        .filter((i) => String(i) !== String(index));

      const isDuplicate = otherIndices.some((i) => {
        const f = normalize(allValues[`fname-${i}`]);
        const l = normalize(allValues[`lname-${i}`]);
        return f && l && f === thisFirst && l === thisLast;
      });

      if (isDuplicate) {
        return Promise.reject(
          new Error("This traveler name is already entered")
        );
      }
      return Promise.resolve();
    },
  });

  return (
    <Form
      form={form}
      name={`adultForm-${index}`}
      layout="vertical"
      autoComplete="off"
    >
      <Row gutter={16}>
        {/* Col for Select Field */}
        <Col xs={24} sm={6}>
          <Form.Item
            name={`select-${index}`}
            label="Title"
            hasFeedback
            rules={[{ required: true, message: "This field is required" }]}
            data-name={`select-${index}`}
          >
            <Select className="h-10" placeholder="Please select a title">
              <Option value="Mr">Mr</Option>
              <Option value="Mrs">Mrs</Option>
              <Option value="Ms">Ms</Option>
            </Select>
          </Form.Item>
        </Col>
        {/* Col for First Name */}
        <Col xs={24} sm={9}>
          <Form.Item
            name={`fname-${index}`}
            label="First Name"
            hasFeedback
            // revalidate when last name changes
            dependencies={[`lname-${index}`]}
            getValueFromEvent={(e) => (e?.target?.value || "").toUpperCase()}
            rules={[
              { required: true, message: " Please Enter your First Name" },
              { min: 2, message: "First name must be at least 2 characters" },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: "First name can only contain letters and spaces",
              },
              {
                validator: () => {
                  const norm = (v) =>
                    String(v ?? "")
                      .trim()
                      .replace(/\s+/g, " ")
                      .toLowerCase();

                  const thisFirst = norm(form.getFieldValue(`fname-${index}`));
                  const thisLast = norm(form.getFieldValue(`lname-${index}`));

                  if (!thisFirst || !thisLast) return Promise.resolve();

                  const all = form.getFieldsValue(true);
                  const otherIdxs = Object.keys(all)
                    .filter((k) => k.startsWith("fname-"))
                    .map((k) => k.replace("fname-", ""))
                    .filter((i) => String(i) !== String(index));

                  const dup = otherIdxs.some((i) => {
                    const f = norm(all[`fname-${i}`]);
                    const l = norm(all[`lname-${i}`]);
                    return f && l && f === thisFirst && l === thisLast;
                  });

                  return dup
                    ? Promise.reject(
                      new Error("This traveler name is already entered")
                    )
                    : Promise.resolve();
                },
              },
            ]}
            data-name={`fname-${index}`}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="First Name"
              onChange={(e) =>
                form.setFieldsValue({ firstName: e.target.value.toUpperCase() })
              }
            />
          </Form.Item>
        </Col>
        {/* Col for Last Name */}
        <Col xs={24} sm={9}>
          <Form.Item
            name={`lname-${index}`}
            label="Last Name"
            hasFeedback
            // revalidate when first name changes
            dependencies={[`fname-${index}`]}
            getValueFromEvent={(e) => (e?.target?.value || "").toUpperCase()}
            rules={[
              { required: true, message: "Please enter your last name" },
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

                  const thisFirst = norm(form.getFieldValue(`fname-${index}`));
                  const thisLast = norm(form.getFieldValue(`lname-${index}`));

                  if (!thisFirst || !thisLast) return Promise.resolve();

                  const all = form.getFieldsValue(true);
                  const otherIdxs = Object.keys(all)
                    .filter((k) => k.startsWith("fname-"))
                    .map((k) => k.replace("fname-", ""))
                    .filter((i) => String(i) !== String(index));

                  const dup = otherIdxs.some((i) => {
                    const f = norm(all[`fname-${i}`]);
                    const l = norm(all[`lname-${i}`]);
                    return f && l && f === thisFirst && l === thisLast;
                  });

                  return dup
                    ? Promise.reject(
                      new Error("This traveler name is already entered")
                    )
                    : Promise.resolve();
                },
              },
            ]}
            data-name={`lname-${index}`}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="Last Name"
              onChange={(e) =>
                form.setFieldsValue({ firstName: e.target.value.toUpperCase() })
              }
            />
          </Form.Item>
        </Col>
        {showDocumentField && (
          <Col xs={24} sm={9}>
            <Form.Item
              name={`documentId-${index}`}
              label="Document ID"
              hasFeedback
              rules={[
                { required: true, message: "Please enter Document ID" },
                {
                  pattern: /^[a-zA-Z0-9]+$/,
                  message:
                    "Only letters (a-z, A-Z) and numbers (0-9) are allowed",
                },
              ]}
              data-name={`documentId-${index}`}
            >
              <Input
                className="h-10 flex flex-row justify-between items-center"
                placeholder="Enter your Document ID"
              />
            </Form.Item>
          </Col>
        )}
        {/* pNat - nationality (IN) - IATA Country Code(2-Letter) 
        pNum - passport number
        eD - expiry date
        pid - issue date
        dob */}
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
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    name={`adultnationality-${index}`}
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
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
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
                </Col>
                {/* passport number */}
                {showPassport.pm === true && (
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item
                      name={`adultpassportno-${index}`}
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
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={`adultpassportIssueDate-${index}`}
                      label="Passport Issue Date"
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please select passport issue date",
                        },
                        {
                          validator: (_, value) => {
                            if (!value) return Promise.resolve();
                            if (!bookDate.isValid()) return Promise.resolve();
                            return value.isAfter(bookDate)
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
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={`adultpassportExpiryDate-${index}`}
                      label="Passport Expiry Date"
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please select passport expiry date",
                        },
                        {
                          validator: (_, value) => {
                            // let "required" rule handle empty
                            if (!value) return Promise.resolve();
                            // if we don't have a valid travel date, don't block
                            if (!minExpiry) return Promise.resolve();

                            if (value.isBefore(minExpiry, "day")) {
                              return Promise.reject(
                                new Error(
                                  `Passport must be valid for at least 6 months from travel date (${bookDate.format(
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
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name={`adultdob-${index}`}
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

export default AppFormAdult;
