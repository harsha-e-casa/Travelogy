import React, { useEffect } from "react";
import { Form, Input, Select, Row, Col, DatePicker } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const AppFormInfant = ({ form, index, travellerParsedData }) => {
  useEffect(() => {
    if (travellerParsedData) {
      const { ti, fN, lN, dob } = travellerParsedData;

      form.setFieldsValue({
        [`infantselect-${index}`]: ti,
        [`infantName-${index}`]: fN,
        [`infantLast-${index}`]: lN,
        [`infantDOB-${index}`]: dob ? dayjs(dob) : null,
      });
    }
  }, [travellerParsedData]);

  return (
    <Form
      form={form}
      name={`infantForm-${index}`}
      layout="vertical"
      autoComplete="off"
      data-name={`infantForm-${index}`}
    >
      <Row gutter={16}>
        {/* Col for Select Title (Ms/Master) */}
        <Col span={4}>
          {" "}
          {/* Adjusted to fit 4 columns in 1 row */}
          <Form.Item
            name={`infantselect-${index}`}
            label="Select"
            hasFeedback
            rules={[{ required: true, message: "" }]}
          >
            <Select
              className="h-10 flex flex-row justify-between items-center"
              placeholder="Please select a title"
            >
              <Option value="Ms">Ms</Option>
              <Option value="Master">Master</Option>
            </Select>
          </Form.Item>
        </Col>

        {/* Col for Infant's First Name */}
        <Col span={7}>
          <Form.Item
            name={`infantName-${index}`}
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
            data-name={`infantName-${index}`}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="First Name"
            />
          </Form.Item>
        </Col>

        {/* Col for Infant's Last Name */}
        <Col span={7}>
          <Form.Item
            name={`infantLast-${index}`}
            label="Last Name"
            hasFeedback
            rules={[
              { required: true, message: "Please enter the last name" },
              {
                min: 2,
                message: "Last name must be at least 2 characters",
              },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: "Last name can only contain letters and spaces",
              },
            ]}
            data-name={`infantLast-${index}`}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="Last Name"
            />
          </Form.Item>
        </Col>

        {/* Col for Date of Birth (DOB) */}
        <Col span={6}>
          <Form.Item
            name={`infantDOB-${index}`}
            label="Date of Birth"
            hasFeedback
            rules={[{ required: true, message: "Please choose the DOB" }]}
            data-name={`infantDOB-${index}`}
          >
            <DatePicker
              className="h-10 flex flex-row justify-between items-center"
              format="YYYY-MM-DD"
              placeholder="Select Date of Birth"
              // defaultValue={dayjs()} // Default to today's date
              value={
                travellerParsedData && travellerParsedData.dob
                  ? dayjs(travellerParsedData.dob)
                  : null
              } // Controlled value
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AppFormInfant;
