import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';

const { Option } = Select;

const AppFormAdult = ({ form, index, showDocumentField }) => {
  return (
    <Form form={form} name={`adultForm-${index}`} layout="vertical" autoComplete="off">
      <Row gutter={16}>
        {/* Col for Select Field */}
        <Col span={6}>
          <Form.Item
            name={`select-${index}`}
            label="Select"
            hasFeedback
            rules={[{ required: true, message: "This field is required" }]}>

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
            rules={[{ required: true, message: " Please Enter your First Name" }]}>
            <Input className="h-10 flex flex-row justify-between items-center" placeholder="First Name" />
          </Form.Item>
        </Col>

        {/* Col for Last Name */}
        <Col span={9}>
          <Form.Item
            name={`lname-${index}`}
            label="Last Name"
            hasFeedback
            // rules={[{ required: true, message: "" }]}>
            rules={[{ required: true, message: "Please enter your last name" }]}>
            <Input className="h-10 flex flex-row justify-between items-center" placeholder="Last Name" />
          </Form.Item>
        </Col>

        {showDocumentField && (
          <Col span={9}>
            <Form.Item
              name={`documentId-${index}`}
              label="Document ID"
              hasFeedback
              rules={[{ required: true, message: "Please enter Document ID" }]}
            >
              <Input className="h-10 flex flex-row justify-between items-center" placeholder="Enter your Document ID" />
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form>
  );
};

export default AppFormAdult;
