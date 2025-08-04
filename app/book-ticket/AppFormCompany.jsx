import React from 'react';
import { Form, Input, Row, Col } from 'antd';

const AppFormCompany = ({ form }) => {
  return (
    <Form form={form} name={`companyForm`} layout="vertical" autoComplete="off">
      <Row gutter={16}>
        {/* Registration Number */}
        <Col span={12}>
          <Form.Item
            name={`registrationNumber`}
            label="Registration Number"
            hasFeedback
            // rules={[{ required: true, message: "Please enter the registration number" }]}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="Registration Number"
            />
          </Form.Item>
        </Col>

        {/* Registered Company Name */}
        <Col span={12}>
          <Form.Item
            name={`companyName`}
            label="Registered Company Name"
            hasFeedback
            // rules={[{ required: true, message: "Please enter the company name" }]}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="Registered Company Name"
            />
          </Form.Item>
        </Col>

        {/* Registered Email */}
        <Col span={12}>
          <Form.Item
            name={`companyEmail`}
            label="Registered Email"
            hasFeedback
            // rules={[
            //   { required: true, message: "Please enter the registered email" },
            //   { type: "email", message: "Please enter a valid email" }
            // ]}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="Registered Email"
            />
          </Form.Item>
        </Col>

        {/* Registered Phone */}
        <Col span={12}>
          <Form.Item
            name={`companyPhone`}
            label="Registered Phone"
            hasFeedback
            // rules={[
            //   { required: true, message: "Please enter the registered phone number" },
            //   { pattern: /^\d+$/, message: "Please enter a valid phone number" }
            // ]}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="Registered Phone"
              maxLength={15}
            />
          </Form.Item>
        </Col>

        {/* Registered Address */}
        <Col span={24}>
          <Form.Item
            name={`companyAddress`}
            label="Registered Address"
            hasFeedback
            // rules={[{ required: true, message: "Please enter the registered address" }]}
          >
            <Input.TextArea
              rows={3}
              placeholder="Registered Address"
              className="flex flex-row justify-between items-center"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AppFormCompany;
