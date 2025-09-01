import React, { useEffect } from "react";
import { Form, Input, Select, Row, Col } from "antd";

const { Option } = Select;

const AppFormChild = ({ form, index, travellerParsedData }) => {
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
      </Row>
    </Form>
  );
};

export default AppFormChild;
