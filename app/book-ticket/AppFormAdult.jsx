import React from 'react'; 
import { Button, Form, Input, Select, Row, Col } from 'antd';

const { Option } = Select;

const SubmitButton = ({ form, children }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);
  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};

const AppFormAdult = () => {
  const [form] = Form.useForm();
  return (
    <Form className='pl-3 pr-3 pt-3' form={form} name="validateOnly" layout="vertical" autoComplete="off">
      {/* Row for Layout */}
      <Row gutter={16}>
        {/* Col for Select Field */}
        <Col span={6}>
          <Form.Item
            name="select"
            label="Select"
            hasFeedback
            rules={[{ required: true, message: 'Title should not be empty!' }]}
          >
          {/* dult: Mr,Mrs,Ms
■ Child: Ms, Master
■ Infant : Ms, M */}
            <Select className='h-10' placeholder="Please select a country">
              <Option value="Mr">Mr</Option>
              <Option value="MRS">Mrs</Option>
              <Option value="MS">MS</Option>
            </Select>
          </Form.Item>
        </Col>

        {/* Col for First & Middle Name */}
        <Col span={9}>
          <Form.Item
            name="fname"
            label="First Name"
            rules={[{ required: true, message: "Please enter passenger's First name" }]}
          >
            <Input className='h-10' placeholder="Enter First name" />
          </Form.Item>
        </Col>

        {/* Col for Age Field */}
        <Col span={9}>
          <Form.Item
            name="lname"
            label="Last Name"
            rules={[{ required: true, message: "Please enter passenger's Last name" }]}
          >
            <Input className='h-10' placeholder="Enter Last Name" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AppFormAdult;
