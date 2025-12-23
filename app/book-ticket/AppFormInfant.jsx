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
        <Col xs={24} sm={4}>
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
        <Col xs={24} sm={7}>
          <Form.Item
            name={`infantName-${index}`}
            label="First Name"
            hasFeedback
            getValueFromEvent={(e) => (e?.target?.value || "").toUpperCase()}
            dependencies={[`infantLame-${index}`]}
            rules={[
              { required: true, message: "Please enter the name" },
              {
                min: 2,
                message: "Last name must be at least 2 characters",
              },
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

                  // this child's names
                  const thisFirst = norm(
                    form.getFieldValue(`infantName-${index}`)
                  );
                  const thisLast = norm(
                    form.getFieldValue(`infantLast-${index}`)
                  );
                  if (!thisFirst || !thisLast) return Promise.resolve();

                  const all = form.getFieldsValue(true);

                  // collect all other traveler full names (adults + children)
                  const otherPairs = [];

                  // adults: fname-*, lname-*
                  Object.keys(all)
                    .filter((k) => k.startsWith("fname-"))
                    .forEach((k) => {
                      const i = k.replace("fname-", "");
                      otherPairs.push([norm(all[k]), norm(all[`lname-${i}`])]);
                    });

                  // children: childName-*, childlast-*  (skip current index)
                  Object.keys(all)
                    .filter((k) => k.startsWith("infantName-"))
                    .forEach((k) => {
                      const i = k.replace("infantName-", "");
                      if (String(i) === String(index)) return; // skip self
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

        {/* Col for Infant's Last Name */}
        <Col xs={24} sm={7}>
          <Form.Item
            name={`infantLast-${index}`}
            label="Last Name"
            hasFeedback
            getValueFromEvent={(e) => (e?.target?.value || "").toUpperCase()}
            dependencies={[`infantName-${index}`]}
            rules={[
              { required: true, message: "Please enter the last name" },
              {
                min: 2,
                message: "Last name must be at least 2 characters",
              },
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

                  // this child's names
                  const thisFirst = norm(
                    form.getFieldValue(`infantName-${index}`)
                  );
                  const thisLast = norm(
                    form.getFieldValue(`infantLast-${index}`)
                  );
                  if (!thisFirst || !thisLast) return Promise.resolve();

                  const all = form.getFieldsValue(true);

                  // collect all other traveler full names (adults + children)
                  const otherPairs = [];

                  // adults
                  Object.keys(all)
                    .filter((k) => k.startsWith("fname-"))
                    .forEach((k) => {
                      const i = k.replace("fname-", "");
                      otherPairs.push([norm(all[k]), norm(all[`lname-${i}`])]);
                    });

                  // children (skip current)
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

        {/* Col for Date of Birth (DOB) */}
        <Col xs={24} sm={6}>
          <Form.Item
            name={`infantDOB-${index}`}
            label="Date of Birth"
            hasFeedback
            rules={[{ required: true, message: "Please choose the DOB" }]}
            data-name={`infantDOB-${index}`}
          >
            <DatePicker
              className="h-10 flex flex-row justify-between items-center"
              format="YYYY-MM-DD"
              placeholder="Select Date of Birth"
              // defaultValue={dayjs()} // Default to today's date
              value={
                travellerParsedData && travellerParsedData.dob
                  ? dayjs(travellerParsedData.dob)
                  : null
              }
              disabledDate={(current) => {
                const today = dayjs();
                const minDate = today.subtract(2, "year"); // 2 years ago
                const maxDate = today.subtract(15, "day"); // 15 days ago
                return current && (current < minDate || current > maxDate);
              }}
              onKeyDown={(e) => {
                const ok = [
                  "Backspace",
                  "Tab",
                  "ArrowLeft",
                  "ArrowRight",
                  "Delete",
                  "Enter",
                ];
                if (ok.includes(e.key)) return;
                if (!/[\d-]/.test(e.key)) e.preventDefault();
              }}
              onPaste={(e) => {
                const t = (e.clipboardData.getData("text") || "").trim();
                if (!/^\d{4}-\d{2}-\d{2}$/.test(t)) e.preventDefault();
              }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AppFormInfant;
