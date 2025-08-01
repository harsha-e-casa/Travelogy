

// import React from 'react';
// import { Form, Input, Select, Row, Col, DatePicker } from 'antd';
// import dayjs from 'dayjs';

// const { Option } = Select;

// const AppFormInfant = ({ form, index, fieldData = {}, disabled = false }) => {
//   return (
//     <Form form={form} name={`infantForm-${index}`} layout="vertical" autoComplete="off">
//       <Row gutter={16}>
//         {/* Col for Select Title (Ms/Master) */}
//         <Col span={4}>  {/* Adjusted to fit 4 columns in 1 row */}
//           <Form.Item
//             name={`infantselect-${index}`}
//             label="Select"
//             hasFeedback
//             rules={[{ required: true, message: "" }]}>
//             <Select className="h-10 flex flex-row justify-between items-center" placeholder={fieldData?.ti || "Please select a title"} disabled={disabled}>
//               <Option value="Ms">Ms</Option>
//               <Option value="Master">Master</Option>
//             </Select>
//           </Form.Item>
//         </Col>

//         {/* Col for Infant's First Name */}
//         <Col span={7}>
//           <Form.Item
//             name={`infantName-${index}`}
//             label="First Name"
//             hasFeedback
//             rules={[{ required: true, message: "Please enter the name" }]}>
//             <Input className="h-10 flex flex-row justify-between items-center" placeholder={fieldData?.fN || "First Name"} disabled={disabled} />
//           </Form.Item>
//         </Col>

//         {/* Col for Infant's Last Name */}
//         <Col span={7}>
//           <Form.Item
//             name={`infantLast-${index}`}
//             label="Last Name"
//             hasFeedback
//             rules={[{ required: true, message: "Please enter the last name" }]}>
//             <Input className="h-10 flex flex-row justify-between items-center" placeholder={fieldData?.lN || "Last Name"} disabled={disabled} />
//           </Form.Item>
//         </Col>

//         {/* Col for Date of Birth (DOB) */}
//         <Col span={6}>
//           <Form.Item
//             name={`infantDOB-${index}`}
//             label="Date of Birth"
//             hasFeedback
//             rules={[{ required: true, message: "Please choose the DOB" }]}>
//             <DatePicker 
//               className="h-10 flex flex-row justify-between items-center" 
//               format="YYYY-MM-DD" 
//               placeholder="Select Date of Birth"
//               defaultValue={dayjs()} // Default to today's date
//             />
//           </Form.Item>
//         </Col>
//       </Row>
//     </Form>
//   );
// };

// export default AppFormInfant;


import React, { useEffect } from 'react';
import { Form, Input, Select, Row, Col, DatePicker } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

const AppFormInfant = ({ form, index, fieldData = {}, disabled = false }) => {
  // Prefill values when fieldData changes
  useEffect(() => {
    if (fieldData && (fieldData.ti || fieldData.fN || fieldData.lN || fieldData.dob)) {
      form.setFieldsValue({
        [`infantselect-${index}`]: fieldData.ti,
        [`infantName-${index}`]: fieldData.fN,
        [`infantLast-${index}`]: fieldData.lN,
        [`infantDOB-${index}`]: fieldData.dob ? dayjs(fieldData.dob) : undefined,
      });
    }
  }, [form, index, fieldData]);

  return (
    <Form form={form} name={`infantForm-${index}`} layout="vertical" autoComplete="off">
      <Row gutter={16}>
        {/* Select Title */}
        <Col span={4}>
          <Form.Item
            name={`infantselect-${index}`}
            label="Select"
            hasFeedback
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Select
              className="h-10 flex flex-row justify-between items-center"
              placeholder="Please select a title"
              disabled={disabled}
            >
              <Option value="Ms">Ms</Option>
              <Option value="Master">Master</Option>
            </Select>
          </Form.Item>
        </Col>

        {/* First Name */}
        <Col span={7}>
          <Form.Item
            name={`infantName-${index}`}
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

        {/* Last Name */}
        <Col span={7}>
          <Form.Item
            name={`infantLast-${index}`}
            label="Last Name"
            hasFeedback
            rules={[{ required: true, message: "Please enter the last name" }]}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="Last Name"
              disabled={disabled}
            />
          </Form.Item>
        </Col>

        {/* Date of Birth */}
        <Col span={6}>
          <Form.Item
            name={`infantDOB-${index}`}
            label="Date of Birth"
            hasFeedback
            rules={[{ required: true, message: "Please choose the DOB" }]}
          >
            <DatePicker
              className="h-10 flex flex-row justify-between items-center"
              format="YYYY-MM-DD"
              placeholder="Select Date of Birth"
              disabled={disabled}
              // No need for defaultValue; form.setFieldsValue handles value
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AppFormInfant;
