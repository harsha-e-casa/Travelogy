import React, { useEffect } from "react";
import { Form, Input, Select, Row, Col } from "antd";

const { Option } = Select;

const AppFormAdult = ({
  form,
  index,
  showDocumentField,
  travellerParsedData,
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
              rules={[{ required: true, message: "Please enter Document ID" }]}
              data-name={`documentId-${index}`}
            >
              <Input
                className="h-10 flex flex-row justify-between items-center"
                placeholder="Enter your Document ID"
              />
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form>
  );
};

export default AppFormAdult;
