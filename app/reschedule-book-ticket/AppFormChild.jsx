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

import React, { useEffect } from 'react';
import { Form, Input, Select, Row, Col } from 'antd';

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
  }, [form, index, fieldData]);

  return (
    <Form form={form} name={`childForm-${index}`} layout="vertical" autoComplete="off">
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
      </Row>
    </Form>
  );
};

export default AppFormChild;

