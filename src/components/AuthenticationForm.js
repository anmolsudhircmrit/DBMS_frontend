import React, {useState} from 'react'
import { Button, Form, Input, theme} from 'antd';
import axios from 'axios';


const { useToken } = theme;
function AuthenticationForm() {
  const { token } = useToken();
    const [form] = Form.useForm();
    
    const [formLayout, setFormLayout] = useState('vertical');
    const [signupToggle, setSignupToggle] = useState(false);
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
    };
    const formItemLayout =
    formLayout === 'horizontal'
        ? {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 14,
            },
        }
      : null;
    const buttonItemLayout =
    formLayout === 'horizontal'
        ? {
            wrapperCol: {
                span: 14,
                offset: 4,
            },
        }
        : null;

        const handleSignIn = () => {
          axios
            .post("http://localhost:7070/api/v1/signin",{username, password})
            .then((response) => {
              console.log(response.data);
            })
            .catch((e) => console.log(e));
        }

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
              height: "100%",
              flexDirection: "column",
            }}
          >
            {/* <Button style={{ backgroundColor: token.colorPrimary }}>Button</Button>; */}
            <h1 style={{ fontSize: 48, fontWeight: 700, color: "#6D7A55" }}>
              {`${signupToggle ? "Register" : "Welcome"}`}
              {!signupToggle && (
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#6D7A55",
                    marginLeft: "0.6em",
                  }}
                >
                  Please Enter Your Details
                </p>
              )}
            </h1>
            <Form
              style={{
                width: 300,
                height: "auto",
              }}
              {...formItemLayout}
              layout={formLayout}
              form={form}
              initialValues={{
                layout: formLayout,
              }}
              onValuesChange={onFormLayoutChange}
            >
              {signupToggle && (
                <Form.Item label="Name : ">
                  <Input placeholder="Name" size="large" type="text" />
                </Form.Item>
              )}
              <Form.Item label="Username : ">
                <Input
                  onChange={(e) => setusername(e.target.value)}
                  placeholder="example@example.com"
                  size="large"
                  type="email"
                />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: signupToggle ? 32 : 0 }}
                label="Password : "
              >
                <Input
                  placeholder="Password"
                  size="large"
                  type="password"
                  defaultValue={""}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </Form.Item>
              {!signupToggle && (
                <Form.Item wrapperCol={{ offset: 0 }}>
                  <span
                    style={{
                      float: "right",
                      cursor: "pointer",
                      color: "#6D7A55",
                    }}
                  >
                    Forgot Password?
                  </span>
                </Form.Item>
              )}
              <Form.Item {...buttonItemLayout}>
                <Button
                  className="btn"
                  onClick={handleSignIn}
                  style={{ background: "#6D7A55" }}
                  type="primary"
                  size="large"
                  block
                >
                  {signupToggle ? "Sign Up" : "Sign In"}
                </Button>
              </Form.Item>
            </Form>

            {/* Link to signup */}
            <span>
              {`${
                signupToggle
                  ? "Already have an account?"
                  : `Don't have an account?`
              }`}{" "}
              <span
                onClick={() => {
                  setSignupToggle(!signupToggle);
                }}
                style={{ cursor: "pointer", color: "#6D7A55" }}
              >{`${signupToggle ? "Sign In" : `Sign Up`}`}</span>
            </span>
          </div>
        );
}

export default AuthenticationForm