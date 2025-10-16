// import React from 'react';
// import { Form, Input, Select, Row, Col } from 'antd';

// const { Option } = Select;

// const AppFormChild = ({ form, index, fieldData = {}, disabled = false }) => {
//   return (
//     <Form form={form} name={`childForm-${index}`} layout="vertical" autoComplete="off">
//       <Row gutter={16}>
//         {/* Col for Child's Name */}

//         <Col span={6}>
//           <Form.Item
//             name={`childselect-${index}`}
//             label="Select"
//             hasFeedback
//             rules={[{ required: true, message: "This field is required" }]}>
//             <Select className="h-10" placeholder={fieldData?.ti || "Please select a title"} disabled={disabled} >
//               <Option value="Ms">Ms</Option>
//               <Option value="Master">Master</Option>
//             </Select>
//           </Form.Item>
//         </Col>

//         <Col span={9}>
//           <Form.Item
//             name={`childName-${index}`}
//             label="First Name"
//             hasFeedback
//             rules={[{ required: true, message: "Please enter the name" }]}>
//             <Input className="h-10 flex flex-row justify-between items-center" placeholder={fieldData?.fN || "First Name"} disabled={disabled} />
//           </Form.Item>
//         </Col>

//         {/* Col for Age */}
//         <Col span={9}>
//           <Form.Item
//             name={`childlast-${index}`}
//             label="Last Name"
//             hasFeedback
//             rules={[{ required: true, message: "Please enter the Last name" }]}>
//             <Input className="h-10 flex flex-row justify-between items-center" disabled={disabled} placeholder={fieldData?.lN || "Last Name"} />
//           </Form.Item>
//         </Col>
//       </Row>
//     </Form>
//   );
// };

// export default AppFormChild;

import React, { useEffect } from "react";
import { Form, Input, Select, Row, Col, DatePicker } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const AppFormChild = ({ form, index, fieldData = {}, disabled = false }) => {
  // Prefill values when fieldData changes
  useEffect(() => {
    if (fieldData && (fieldData.ti || fieldData.fN || fieldData.lN)) {
      form.setFieldsValue({
        [`childselect-${index}`]: fieldData.ti,
        [`childName-${index}`]: fieldData.fN,
        [`childlast-${index}`]: fieldData.lN,
      });
    }
    if (fieldData?.pNat)
      form.setFieldsValue({
        [`childnationality-${index}`]: fieldData.pNat,
      });
    if (fieldData?.eD)
      form.setFieldsValue({
        [`childpassportExpiryDate-${index}`]: dayjs(fieldData.eD),
      });
    if (fieldData?.pid)
      form.setFieldsValue({
        [`childpassportIssueDate-${index}`]: dayjs(fieldData.pid),
      });
    if (fieldData?.pm)
      form.setFieldsValue({
        [`childpassportno-${index}`]: fieldData.pm,
      });
    if (fieldData?.dob)
      form.setFieldsValue({
        [`childdob-${index}`]: dayjs(fieldData.dob),
      });
  }, [form, index, fieldData]);

  return (
    <Form
      form={form}
      name={`childForm-${index}`}
      layout="vertical"
      autoComplete="off"
    >
      <Row gutter={16}>
        {/* Title Field */}
        <Col span={6}>
          <Form.Item
            name={`childselect-${index}`}
            label="Select"
            hasFeedback
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Select
              className="h-10"
              placeholder="Please select a title"
              disabled={disabled}
            >
              <Option value="Ms">Ms</Option>
              <Option value="Master">Master</Option>
            </Select>
          </Form.Item>
        </Col>

        {/* First Name Field */}
        <Col span={9}>
          <Form.Item
            name={`childName-${index}`}
            label="First Name"
            hasFeedback
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="First Name"
              disabled={disabled}
            />
          </Form.Item>
        </Col>

        {/* Last Name Field */}
        <Col span={9}>
          <Form.Item
            name={`childlast-${index}`}
            label="Last Name"
            hasFeedback
            rules={[{ required: true, message: "Please enter the Last name" }]}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="Last Name"
              disabled={disabled}
            />
          </Form.Item>
        </Col>
        {(fieldData?.pNat ||
          fieldData?.eD ||
          fieldData?.pid ||
          fieldData?.pm ||
          fieldData?.dob) && (
          <>
            <p
              className="text-sm leading-5 font-bold text-gray-900"
              style={{ paddingLeft: "0.5rem" }}
            >
              Add passport information
            </p>
            {fieldData?.pNat && (
              <Col span={9}>
                <Form.Item
                  name={`childnationality-${index}`}
                  label="Nationality"
                  rules={[
                    { required: true, message: "Please enter nationality" },
                  ]}
                >
                  <Input
                    className="h-10 flex flex-row justify-between items-center"
                    placeholder="e.g., Indian"
                    disabled={disabled}
                  />
                </Form.Item>
              </Col>
            )}
            {fieldData?.pm && (
              <Col span={6}>
                <Form.Item
                  name={`childpassportno-${index}`}
                  label="Passport Number"
                  hasFeedback
                  rules={[
                    { required: true, message: "Please enter passport number" },
                    {
                      pattern: /^[A-Za-z0-9\- ]+$/,
                      message:
                        "Only letters, numbers, spaces, and dashes allowed",
                    },
                  ]}
                >
                  <Input
                    className="h-10 flex flex-row justify-between items-center"
                    placeholder="Passport No."
                    disabled={disabled}
                  />
                </Form.Item>
              </Col>
            )}
            {fieldData?.pid && (
              <Col span={9}>
                <Form.Item
                  name={`childpassportIssueDate-${index}`}
                  label="Passport Issue Date"
                  hasFeedback
                  rules={[{ required: true, message: "Select issue date" }]}
                >
                  <DatePicker
                    className="h-10 w-full"
                    format="YYYY-MM-DD"
                    placeholder="YYYY-MM-DD"
                    disabled={disabled}
                    allowClear
                  />
                </Form.Item>
              </Col>
            )}
            {fieldData?.eD && (
              <Col span={9}>
                <Form.Item
                  name={`childpassportExpiryDate-${index}`}
                  label="Passport Expiry Date"
                  hasFeedback
                  dependencies={[`childpassportIssueDate-${index}`]}
                  rules={[
                    { required: true, message: "Select expiry date" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const issue = getFieldValue(
                          `childpassportIssueDate-${index}`
                        );
                        if (!value || !issue) return Promise.resolve();
                        if (value.isAfter(issue)) return Promise.resolve();
                        return Promise.reject(
                          new Error("Expiry date must be after issue date")
                        );
                      },
                    }),
                  ]}
                >
                  <DatePicker
                    className="h-10 w-full"
                    format="YYYY-MM-DD"
                    placeholder="YYYY-MM-DD"
                    disabled={disabled}
                    allowClear
                  />
                </Form.Item>
              </Col>
            )}
            {fieldData?.dob && (
              <Col span={6}>
                <Form.Item
                  name={`childdob-${index}`}
                  label="Date of Birth"
                  hasFeedback
                  rules={[{ required: true, message: "Select date of birth" }]}
                >
                  <DatePicker
                    className="h-10 w-full"
                    format="YYYY-MM-DD"
                    placeholder="YYYY-MM-DD"
                    disabled={disabled}
                    allowClear
                  />
                </Form.Item>
              </Col>
            )}
          </>
        )}
      </Row>
    </Form>
  );
};

export default AppFormChild;
