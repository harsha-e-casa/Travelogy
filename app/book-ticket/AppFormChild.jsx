import React, { useEffect } from "react";
import { Form, Input, Select, Row, Col, DatePicker } from "antd";
import moment from "moment";
import countries from "./countries";

const { Option } = Select;

const AppFormChild = ({ form, index, travellerParsedData, showPassport }) => {
  useEffect(() => {
    // Check if travellerParsedData has the necessary fields to prefill
    if (travellerParsedData) {
      console.log(
        "childdddddddd travellerParsedData ===> ",
        travellerParsedData
      );
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
        [`childpassportExpiryDate-${index}`]: moment(travellerParsedData.eD),
      });
    if (travellerParsedData?.pid)
      form.setFieldsValue({
        [`childpassportIssueDate-${index}`]: moment(travellerParsedData.pid),
      });
    if (travellerParsedData?.pm)
      form.setFieldsValue({
        [`childpassportno-${index}`]: travellerParsedData.pm,
      });
    if (travellerParsedData?.dob)
      form.setFieldsValue({
        [`childdob-${index}`]: moment(travellerParsedData.dob),
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
        {/* Col for Child's Name */}

        <Col span={6}>
          <Form.Item
            name={`childselect-${index}`}
            label="Select"
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
            rules={[
              { required: true, message: "Please enter the name" },
              {
                min: 2,
                message: "Last name must be at least 2 characters",
              },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: "Last name can only contain letters and spaces",
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

        {/* Col for Age */}
        <Col span={9}>
          <Form.Item
            name={`childlast-${index}`}
            label="Last Name"
            hasFeedback
            rules={[
              { required: true, message: "Please enter the Last name" },
              {
                min: 2,
                message: "Last name must be at least 2 characters",
              },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: "Last name can only contain letters and spaces",
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
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject("Invalid issue date"),
                      },
                    ]}
                    data-name={`passportIssueDate-${index}`}
                  >
                    <DatePicker
                      format="YYYY-MM-DD"
                      className="h-10 w-full"
                      placeholder="Select Passport Issue Date"
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
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject("Invalid expiry date"),
                      },
                    ]}
                    data-name={`passportExpiryDate-${index}`}
                  >
                    <DatePicker
                      format="YYYY-MM-DD"
                      className="h-10 w-full"
                      placeholder="Select Passport Expiry Date"
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
