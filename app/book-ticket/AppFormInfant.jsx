

import React from 'react';
import { Form, Input, Select, Row, Col, DatePicker } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

const AppFormInfant = ({ form, index }) => {
  return (
    <Form form={form} name={`infantForm-${index}`} layout="vertical" autoComplete="off">
      <Row gutter={16}>
        {/* Col for Select Title (Ms/Master) */}
        <Col span={4}>  {/* Adjusted to fit 4 columns in 1 row */}
          <Form.Item
            name={`infantselect-${index}`}
            label="Select"
            hasFeedback
            rules={[{ required: true, message: "" }]}>
            <Select className="h-10" placeholder="Please select a title">
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
            rules={[{ required: true, message: "" }]}>
            <Input className="h-10" placeholder="First Name" />
          </Form.Item>
        </Col>

        {/* Col for Infant's Last Name */}
        <Col span={7}>
          <Form.Item
            name={`infantLast-${index}`}
            label="Last Name"
            rules={[{ required: true, message: "" }]}>
            <Input className="h-10" placeholder="Last Name" />
          </Form.Item>
        </Col>

        {/* Col for Date of Birth (DOB) */}
        <Col span={6}>
          <Form.Item
            name={`infantDOB-${index}`}
            label="Date of Birth"
            rules={[{ required: true, message: "" }]}>
            <DatePicker 
              className="h-10" 
              format="YYYY-MM-DD" 
              placeholder="Select Date of Birth"
              defaultValue={dayjs()} // Default to today's date
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AppFormInfant;
