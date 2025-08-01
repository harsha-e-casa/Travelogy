import { Form, Input, Select, Row, Col } from "antd";

const { Option } = Select;

const AppFormCustomer = ({ form }) => {
  return (
    <Form
      className="p-6"
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
    >
      {/* Row for Layout */}
      <Row gutter={16}>
        {/* Col for Select Field */}
        <Col span={6}>
          <Form.Item
            name="select_code"
            label="Country Code"
            hasFeedback
            rules={[{ required: true, message: "Title should not be empty!" }]}
          >
            {/* dult: Mr,Mrs,Ms
■ Child: Ms, Master
■ Infant : Ms, M */}
            <Select className="h-10" placeholder="Please Country Code">
              <Option value="+91">India (+91)</Option>
              <Option value="+1">United States (+1)</Option>
              <Option value="+44">United Kingdom (+44)</Option>
              <Option value="+61">Australia (+61)</Option>
              <Option value="+81">Japan (+81)</Option>
              <Option value="+49">Germany (+49)</Option>
              <Option value="+33">France (+33)</Option>
              <Option value="+55">Brazil (+55)</Option>
              <Option value="+86">China (+86)</Option>
              <Option value="+7">Russia (+7)</Option>
              <Option value="+39">Italy (+39)</Option>
              <Option value="+1">Canada (+1)</Option>
              <Option value="+34">Spain (+34)</Option>
              <Option value="+52">Mexico (+52)</Option>
              <Option value="+27">South Africa (+27)</Option>
              <Option value="+971">United Arab Emirates (+971)</Option>
              <Option value="+63">Philippines (+63)</Option>
              <Option value="+47">Norway (+47)</Option>
              <Option value="+971">Saudi Arabia (+971)</Option>
              <Option value="+92">Pakistan (+92)</Option>
              <Option value="+82">South Korea (+82)</Option>
              <Option value="+54">Argentina (+54)</Option>
              <Option value="+354">Iceland (+354)</Option>
              <Option value="+90">Turkey (+90)</Option>
              <Option value="+234">Nigeria (+234)</Option>
              <Option value="+66">Thailand (+66)</Option>
              <Option value="+44">Ireland (+44)</Option>
              <Option value="+27">South Africa (+27)</Option>
              <Option value="+63">Philippines (+63)</Option>
              <Option value="+20">Egypt (+20)</Option>
              <Option value="+31">Netherlands (+31)</Option>
            </Select>
          </Form.Item>
        </Col>

        {/* Col for First & Middle Name */}
        <Col span={9}>
          <Form.Item
            name="mNumber"
            label="Mobile Number"
            hasFeedback
            rules={[
              { required: true, message: "Please enter valid Mobile Number" },
              {
                pattern: /^[0-9]+$/,
                message: "Only numbers are allowed for Mobile Number",
              },
            ]}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="Enter Mobile Number"
            />
          </Form.Item>
        </Col>

        {/* Col for Age Field */}
        <Col span={9}>
          <Form.Item
            name="mEmail"
            label="Email ID"
            hasFeedback
            rules={[
              { required: true, message: "Please enter valid Email" },
              {
                type: "email",
                message: "Please enter a valid Email",
              },
            ]}
          >
            <Input
              className="h-10 flex flex-row justify-between items-center"
              placeholder="Enter Email ID"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AppFormCustomer;
