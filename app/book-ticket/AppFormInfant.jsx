import React, { useEffect } from "react";
import { Form, Input, Select, Row, Col, DatePicker } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const AppFormInfant = ({ form, index, travellerParsedData }) => {
  useEffect(() => {
    if (travellerParsedData) {
      const { ti, fN, lN, dob } = travellerParsedData;

      form.setFieldsValue({
        [`infantselect-${index}`]: ti,
        [`infantName-${index}`]: fN,
        [`infantLast-${index}`]: lN,
        [`infantDOB-${index}`]: dob ? dayjs(dob) : null,
      });
    }
  }, [travellerParsedData]);

  return (
    <Form
      form={form}
      name={`infantForm-${index}`}
      layout="vertical"
      autoComplete="off"
      data-name={`infantForm-${index}`}
    >
      <Row gutter={16}>
        <Col span={4}>
          {" "}
          <Form.Item
            name={`infantselect-${index}`}
            label="Title"
            hasFeedback
            rules={[{ required: true, message: "" }]}
          >
            <Select
              className="h-10 flex flex-row justify-between items-center"
              placeholder="Please select a title"
            >
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
            hasFeedback
            dependencies={[`infantLast-${index}`]} // revalidate when last changes
            rules={[
              { required: true, message: "Please enter the name" },
              { min: 2, message: "First name must be at least 2 characters" },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: "First name can only contain letters and spaces",
              },
              {
                validator: () => {
                  const norm = (v) =>
                    String(v ?? "")
                      .trim()
                      .replace(/\s+/g, " ")
                      .toLowerCase();

                  const thisFirst = norm(
                    form.getFieldValue(`infantName-${index}`)
                  );
                  const thisLast = norm(
                    form.getFieldValue(`infantLast-${index}`)
                  );
                  if (!thisFirst || !thisLast) return Promise.resolve();

                  const all = form.getFieldsValue(true);
                  const otherPairs = [];

                  // adults
                  Object.keys(all)
                    .filter((k) => k.startsWith("fname-"))
                    .forEach((k) => {
                      const i = k.replace("fname-", "");
                      otherPairs.push([norm(all[k]), norm(all[`lname-${i}`])]);
                    });

                  // children
                  Object.keys(all)
                    .filter((k) => k.startsWith("childName-"))
                    .forEach((k) => {
                      const i = k.replace("childName-", "");
                      otherPairs.push([
                        norm(all[k]),
                        norm(all[`childlast-${i}`]),
                      ]);
                    });

                  // infants (skip current)
                  Object.keys(all)
                    .filter((k) => k.startsWith("infantName-"))
                    .forEach((k) => {
                      const i = k.replace("infantName-", "");
                      if (String(i) === String(index)) return;
                      otherPairs.push([
                        norm(all[k]),
                        norm(all[`infantLast-${i}`]),
                      ]);
                    });

                  const dup = otherPairs.some(
                    ([f, l]) => f && l && f === thisFirst && l === thisLast
                  );

                  return dup
                    ? Promise.reject(
                        new Error("This traveler name is already entered")
                      )
                    : Promise.resolve();
                },
              },
            ]}
            data-name={`infantName-${index}`}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="First Name"
            />
          </Form.Item>
        </Col>

        {/* Col for Date of Birth (DOB) */}
        <Col span={7}>
          <Form.Item
            name={`infantLast-${index}`}
            label="Last Name"
            hasFeedback
            dependencies={[`infantName-${index}`]} // revalidate when first changes
            rules={[
              { required: true, message: "Please enter the last name" },
              { min: 2, message: "Last name must be at least 2 characters" },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: "Last name can only contain letters and spaces",
              },
              {
                validator: () => {
                  const norm = (v) =>
                    String(v ?? "")
                      .trim()
                      .replace(/\s+/g, " ")
                      .toLowerCase();

                  const thisFirst = norm(
                    form.getFieldValue(`infantName-${index}`)
                  );
                  const thisLast = norm(
                    form.getFieldValue(`infantLast-${index}`)
                  );
                  if (!thisFirst || !thisLast) return Promise.resolve();

                  const all = form.getFieldsValue(true);
                  const otherPairs = [];

                  // adults
                  Object.keys(all)
                    .filter((k) => k.startsWith("fname-"))
                    .forEach((k) => {
                      const i = k.replace("fname-", "");
                      otherPairs.push([norm(all[k]), norm(all[`lname-${i}`])]);
                    });

                  // children
                  Object.keys(all)
                    .filter((k) => k.startsWith("childName-"))
                    .forEach((k) => {
                      const i = k.replace("childName-", "");
                      otherPairs.push([
                        norm(all[k]),
                        norm(all[`childlast-${i}`]),
                      ]);
                    });

                  // infants (skip current)
                  Object.keys(all)
                    .filter((k) => k.startsWith("infantName-"))
                    .forEach((k) => {
                      const i = k.replace("infantName-", "");
                      if (String(i) === String(index)) return;
                      otherPairs.push([
                        norm(all[k]),
                        norm(all[`infantLast-${i}`]),
                      ]);
                    });

                  const dup = otherPairs.some(
                    ([f, l]) => f && l && f === thisFirst && l === thisLast
                  );

                  return dup
                    ? Promise.reject(
                        new Error("This traveler name is already entered")
                      )
                    : Promise.resolve();
                },
              },
            ]}
            data-name={`infantLast-${index}`}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="Last Name"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AppFormInfant;
