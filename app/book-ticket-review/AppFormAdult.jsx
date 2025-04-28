import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';

const { Option } = Select;

const AppFormAdult = ({ form, index }) => {
  return (
    <Form form={form} name={`adultForm-${index}`} layout="vertical" autoComplete="off">
      <Row gutter={16}>
        {/* Col for Select Field */}
        <Col span={6}>
          <Form.Item
            name={`select-${index}`}
            label="Select"
            hasFeedback
            rules={[{ required: true, message: "" }]}>
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
            rules={[{ required: true, message: "" }]}>
            <Input className="h-10" placeholder="First Name" />
          </Form.Item>
        </Col>

        {/* Col for Last Name */}
        <Col span={9}>
          <Form.Item
            name={`lname-${index}`}
            label="Last Name"
            // rules={[{ required: true, message: "" }]}>
            rules={[{ required: true, message: "" }]}>
            <Input className="h-10" placeholder="Last Name" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AppFormAdult;
