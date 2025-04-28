import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';

const { Option } = Select;

const AppFormChild = ({ form, index }) => {
  return (
    <Form form={form} name={`childForm-${index}`} layout="vertical" autoComplete="off">
      <Row gutter={16}>
        {/* Col for Child's Name */}

        <Col span={6}>
          <Form.Item
            name={`childselect-${index}`}
            label="Select"
            hasFeedback
            rules={[{ required: true, message: "" }]}>
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
            rules={[{ required: true, message: "" }]}>
            <Input className="h-10" placeholder="First Name" />
          </Form.Item>
        </Col>

        {/* Col for Age */}
        <Col span={9}>
          <Form.Item
            name={`childlast-${index}`}
            label="Last Name"
            rules={[{ required: true, message: "" }]}>
            <Input className="h-10" placeholder="Last Name" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AppFormChild;
