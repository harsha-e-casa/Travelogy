import React, { useEffect } from "react";
import { Form, Input, Select, Row, Col, DatePicker } from "antd";
import moment from "moment";
import countries from "./countries";

const { Option } = Select;

const AppFormAdult = ({
  form,
  index,
  showDocumentField,
  showPassportField,
  travellerParsedData,
  showPassport,
}) => {
  useEffect(() => {
    if (travellerParsedData) {
      const { ti, fN, lN } = travellerParsedData;

      form.setFieldsValue({
        [`select-${index}`]: ti,
        [`fname-${index}`]: fN,
        [`lname-${index}`]: lN,
      });
    }

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

  return (
    <Form
      form={form}
      name={`adultForm-${index}`}
      layout="vertical"
      autoComplete="off"
    >
      <Row gutter={16}>
        {/* Col for Select Field */}
        <Col span={6}>
          <Form.Item
            name={`select-${index}`}
            label="Select"
            hasFeedback
            rules={[{ required: true, message: "This field is required" }]}
            data-name={`select-${index}`}
          >
            <Select className="h-10" placeholder="Please select a title">
              <Option value="Mr">Mr</Option>
              <Option value="MRS">Mrs</Option>
              <Option value="MS">Ms</Option>
            </Select>
          </Form.Item>
        </Col>
        {/* Col for First Name */}
        <Col span={9}>
          <Form.Item
            name={`fname-${index}`}
            label="First Name"
            hasFeedback
            rules={[
              { required: true, message: " Please Enter your First Name" },
              {
                min: 2,
                message: "First name must be at least 2 characters",
              },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: "First name can only contain letters and spaces",
              },
            ]}
            data-name={`fname-${index}`}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="First Name"
            />
          </Form.Item>
        </Col>
        {/* Col for Last Name */}
        <Col span={9}>
          <Form.Item
            name={`lname-${index}`}
            label="Last Name"
            hasFeedback
            // rules={[{ required: true, message: "" }]}>
            rules={[
              { required: true, message: "Please enter your last name" },
              {
                min: 2,
                message: "Last name must be at least 2 characters",
              },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: "Last name can only contain letters and spaces",
              },
            ]}
            data-name={`lname-${index}`}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="Last Name"
            />
          </Form.Item>
        </Col>
        {showDocumentField && (
          <Col span={9}>
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
              {/* <Col span={6}>
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
                    placeholder="Please select a nationality"
                  >
                    <Option value="IN">India</Option>
                  </Select>
                </Form.Item>
              </Col> */}
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
                <Col span={12}>
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
              {showPassport.pped === true && (
                <Col span={12}>
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
                    />
                  </Form.Item>
                </Col>
              )}
            </Row>
          </>
        )}

        {/* {(showPassport.pped === true ||
          showPassport.pid === true ||
          showPassport.pm === true ||
          showPassport.dobe === true) && (
          <>
            <p
              className="text-sm leading-5 font-bold text-gray-900"
              style={{ paddingLeft: "0.5rem" }}
            >
              Add passport information
            </p>
            <Row gutter={16} className="p-2">
              <Col span={6}>
                <Form.Item
                  name={`adultnationality-${index}`}
                  label="Nationality"
                  hasFeedback
                  rules={[
                    { required: true, message: "This field is required" },
                  ]}
                  data-name={`select-${index}`}
                >
                  <Select
                    className="h-10"
                    placeholder="Please select a nationality"
                  >
                    <Option value="IN">India</Option>
                  </Select>
                </Form.Item>
              </Col>
              {showPassport.pm === true && (
                <Col span={6}>
                  <Form.Item
                    name={`adultpassportno-${index}`}
                    label="Passport Number"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: " Please Enter your Passport",
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
              {showPassport.pped === true && (
                <Col span={12}>
                  <Form.Item
                    name={`adultpassportExpiryDate-${index}`}
                    label="Passport Expiry Date"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please select the expiry date",
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
              {showPassport.pid === true && (
                <Col span={12}>
                  <Form.Item
                    name={`adultpassportIssueDate-${index}`}
                    label="Passport Issue Date"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please select the issue date",
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
              {showPassport.dobe === true && (
                <Col span={12}>
                  <Form.Item
                    name={`adultdob-${index}`}
                    label="Date of Birth"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please select Date of Birth",
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
        )} */}
      </Row>
    </Form>
  );
};

export default AppFormAdult;
