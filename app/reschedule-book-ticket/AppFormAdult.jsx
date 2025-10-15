// import React from "react";
// import { Form, Input, Select, Row, Col } from "antd";

// const { Option } = Select;

// const AppFormAdult = ({
//   form,
//   index,
//   showDocumentField,
//   fieldData = {},
//   disabled = false,
// }) => {
//   console.log("fieldDatafieldData ", fieldData);
//   return (
//     <Form
//       form={form}
//       name={`adultForm-${index}`}
//       layout="vertical"
//       autoComplete="off"
//     >
//       <Row gutter={16}>
//         {/* Col for Select Field */}
//         <Col span={6}>
//           <Form.Item
//             name={`select-${index}`}
//             label="Select"
//             hasFeedback
//             rules={[{ required: true, message: "This field is required" }]}
//           >
//             <Select
//               className="h-10"
//               placeholder={fieldData?.ti || "Please select a title"}
//               disabled={disabled}
//             >
//               <Option value="Mr">Mr</Option>
//               <Option value="MRS">Mrs</Option>
//               <Option value="MS">Ms</Option>
//             </Select>
//           </Form.Item>
//         </Col>

//         {/* Col for First Name */}
//         <Col span={9}>
//           <Form.Item
//             name={`fname-${index}`}
//             label="First Name"
//             disabled={disabled}
//             hasFeedback
//             rules={[
//               { required: true, message: " Please Enter your First Name" },
//             ]}
//           >
//             <Input
//               className="h-10 flex flex-row justify-between items-center"
//               placeholder={fieldData?.fN || "First Name"}
//               disabled={disabled}
//             />
//           </Form.Item>
//         </Col>

//         {/* Col for Last Name */}
//         <Col span={9}>
//           <Form.Item
//             name={`lname-${index}`}
//             label="Last Name"
//             disabled={disabled}
//             hasFeedback
//             // rules={[{ required: true, message: "" }]}>
//             rules={[{ required: true, message: "Please enter your last name" }]}
//           >
//             <Input
//               className="h-10 flex flex-row justify-between items-center"
//               disabled={disabled}
//               placeholder={fieldData?.lN || "Last Name"}
//             />
//           </Form.Item>
//         </Col>

//         {showDocumentField && (
//           <Col span={9}>
//             <Form.Item
//               name={`documentId-${index}`}
//               label="Document ID"
//               disabled={disabled}
//               hasFeedback
//               rules={[{ required: true, message: "Please enter Document ID" }]}
//             >
//               <Input
//                 className="h-10 flex flex-row justify-between items-center"
//                 placeholder="Enter your Document ID"
//               />
//             </Form.Item>
//           </Col>
//         )}
//       </Row>
//     </Form>
//   );
// };

// export default AppFormAdult;

import React, { useEffect } from "react";
import { Form, Input, Select, Row, Col, DatePicker } from "antd";
import moment from "moment";

const { Option } = Select;

const AppFormAdult = ({
  form,
  index,
  showDocumentField,
  fieldData = {},
  disabled = false,
}) => {
  // Prefill values when fieldData changes
  useEffect(() => {
    console.log("fieldData.documentIdfieldData.documentId ==> ", fieldData);
    if (fieldData && (fieldData.ti || fieldData.fN || fieldData.lN)) {
      form.setFieldsValue({
        [`select-${index}`]: fieldData.ti,
        [`fname-${index}`]: fieldData.fN,
        [`lname-${index}`]: fieldData.lN,
        [`documentId-${index}`]: fieldData.di,
      });
    }

    if (fieldData?.pNat)
      form.setFieldsValue({
        [`adultnationality-${index}`]: fieldData.pNat,
      });
    if (fieldData?.eD)
      form.setFieldsValue({
        [`adultpassportExpiryDate-${index}`]: moment(fieldData.eD),
      });
    if (fieldData?.pid)
      form.setFieldsValue({
        [`adultpassportIssueDate-${index}`]: moment(fieldData.pid),
      });
    if (fieldData?.pm)
      form.setFieldsValue({
        [`adultpassportno-${index}`]: fieldData.pm,
      });
    if (fieldData?.dob)
      form.setFieldsValue({
        [`adultdob-${index}`]: moment(fieldData.dob),
      });
  }, [form, index, fieldData]);

  return (
    <Form
      form={form}
      name={`adultForm-${index}`}
      layout="vertical"
      autoComplete="off"
    >
      <Row gutter={16}>
        {/* Select Field */}
        <Col span={6}>
          <Form.Item
            name={`select-${index}`}
            label="Select"
            hasFeedback
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Select
              className="h-10"
              placeholder="Please select a title"
              disabled={disabled}
            >
              <Option value="Mr">Mr</Option>
              <Option value="MRS">Mrs</Option>
              <Option value="MS">Ms</Option>
            </Select>
          </Form.Item>
        </Col>

        {/* First Name */}
        <Col span={9}>
          <Form.Item
            name={`fname-${index}`}
            label="First Name"
            hasFeedback
            rules={[
              { required: true, message: "Please Enter your First Name" },
            ]}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="First Name"
              disabled={disabled}
            />
          </Form.Item>
        </Col>

        {/* Last Name */}
        <Col span={9}>
          <Form.Item
            name={`lname-${index}`}
            label="Last Name"
            hasFeedback
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="Last Name"
              disabled={disabled}
            />
          </Form.Item>
        </Col>

        {/* Document ID (optional) */}
        {showDocumentField && (
          <Col span={9}>
            <Form.Item
              name={`documentId-${index}`}
              label="Document ID"
              hasFeedback
              rules={[{ required: true, message: "Please enter Document ID" }]}
            >
              <Input
                className="h-10 flex flex-row justify-between items-center"
                placeholder="Enter your Document ID"
                disabled={disabled}
              />
            </Form.Item>
          </Col>
        )}
        {/* need the passport info to be completed below */}
        {(fieldData?.pNat ||
          fieldData?.pped ||
          fieldData?.pid ||
          fieldData?.pm ||
          fieldData?.dobe) && (
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
                  name={`adultnationality-${index}`}
                  label="Nationality"
                  hasFeedback
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
                  name={`adultpassportno-${index}`}
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
                  name={`adultpassportIssueDate-${index}`}
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
            {fieldData?.pped && (
              <Col span={9}>
                <Form.Item
                  name={`adultpassportExpiryDate-${index}`}
                  label="Passport Expiry Date"
                  hasFeedback
                  dependencies={[`adultpassportIssueDate-${index}`]}
                  rules={[
                    { required: true, message: "Select expiry date" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const issue = getFieldValue(
                          `adultpassportIssueDate-${index}`
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
            {fieldData?.dobe && (
              <Col span={6}>
                <Form.Item
                  name={`adultdob-${index}`}
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

export default AppFormAdult;
