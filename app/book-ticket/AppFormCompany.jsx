import React from 'react';
import { Form, Input, Row, Col } from 'antd';

const AppFormCompany = ({ form, manditory = false }) => {
  console.log("manditory ==> ", manditory);

  // Helper function to return rules based on manditory
  const getRequiredRules = (type = "text", pattern) => {
    if (!manditory) return [];
    const rules = [{ required: true, message: "This field is required" }];
    if (type === "email") rules.push({ type: "email", message: "Please enter a valid email" });
    if (type === "phone") rules.push({ pattern: pattern || /^\d+$/, message: "Please enter a valid phone number" });
    return rules;
  };

  return (
    <Form form={form} name="companyForm" layout="vertical" autoComplete="off">
      <Row gutter={16}>
        {/* Registration Number */}
        <Col span={12}>
          <Form.Item
            name="gstNumber"
            label="GST Number"
            hasFeedback
            rules={getRequiredRules()}
            getValueFromEvent={(e) => e?.target?.value?.replace(/\D/g, "").slice(0, 10)}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="GST Number"
            />
          </Form.Item>
        </Col>

        {/* Registered Company Name */}
        <Col span={12}>
          <Form.Item
            name="registeredName"
            label="Registered Name"
            hasFeedback
            rules={getRequiredRules()}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="Registered Name"
            />
          </Form.Item>
        </Col>

        {/* Registered Email */}
        <Col span={12}>
          <Form.Item
            name="companyEmail"
            label="Registered Email"
            hasFeedback
            rules={getRequiredRules("email")}
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
            name="companyPhone"
            label="Registered Phone"
            hasFeedback
            rules={getRequiredRules("phone", /^\d{10,15}$/)}
            getValueFromEvent={(e) => e?.target?.value?.replace(/\D/g, "").slice(0, 10)}
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
            name="companyAddress"
            label="Registered Address"
            hasFeedback
            rules={getRequiredRules()}
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
