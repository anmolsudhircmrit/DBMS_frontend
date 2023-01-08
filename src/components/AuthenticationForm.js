import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { Button, Form, Input, theme} from 'antd';
import axios from 'axios';


//const { useToken } = theme;
function AuthenticationForm({authentication}) {
  // const { token } = useToken();
    const [form] = Form.useForm();
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [formLayout, setFormLayout] = useState('vertical');
    const [signupToggle, setSignupToggle] = useState(false);
    const [logggedIn, setLogggedIn] = useState(true)
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
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
    
        const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
  };

  function success(pos) {
    let crd = pos.coords;
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    const lat = crd.latitude
    const long = crd.longitude
    //const username = localStorage.getItem('username')
      axios
        .post("http://localhost:7070/api/v1/signin",{username, password, lat, long})
        .then((response) => {
          console.log("hehe" + "\n" + `${response.data}`);
          if(response !== undefined){
            authentication(true)
            setLogggedIn(true)
            localStorage.setItem('username', `${username}`)
            console.log(response.data.name)
            localStorage.setItem('uname', `${response.data[0].name}`)
          }
          else{
            setLogggedIn(false)
          };
        })
        .catch((e) => {
          console.log(e)
          setLoading(false)
          setLogggedIn(false)
        });
  }

  function err(e){
    console.log(e);
  }

    const handleSignIn = () => {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(success, err, options);
    }

        const handleSignUp = () => {
          console.log(username, password, name)
          axios.post("http://localhost:7070/api/v1/signup", {username, password, name})
          .then((response) => {
            console.log(response.data);
          })
          .catch((e) => console.log(e));
        }

        const handleForgotPassword = () => {
          console.log('Handled')
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
            <h1 style={{ fontSize: 48, fontWeight: 700, color: "#0070E1" }}>
              {`${signupToggle ? "Register" : "Welcome"}`}
              {!signupToggle && (
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: "black",
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
                <Form.Item colon = {true} label="Name : ">
                  <Input 
                    onChange = {(e) => setName(e.target.value)}
                    placeholder="Name" 
                    size="large" 
                    type="text" />
                </Form.Item>
              )}
              <Form.Item colon = {true} label="Username : ">
                <Input
                  onChange={(e) => setusername(e.target.value)}
                  placeholder="example@example.com"
                  size="large"
                  type="email"
                />
              </Form.Item>
              <Form.Item
                colon = {true}
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
                    onClick = {() => {
                      setIsForgotPassword(true)
                      handleForgotPassword()
                    }}
                    style={{
                      float: "right",
                      cursor: "pointer",
                      color: "#1677ff",
                    }}
                  >
                    Forgot Password?
                  </span>
                </Form.Item>
              )}
              <Form.Item {...buttonItemLayout}>
                <Link>{
                  <Button
                    loading = {loading}
                    onClick={signupToggle?handleSignUp:handleSignIn}
                    type="primary"
                    size="large"
                    block
                  >
                    {signupToggle ? "Sign Up" : "Sign In"}
                  </Button>
                }</Link>
              </Form.Item>
            </Form>

            {/* Link to signup */}
            {logggedIn? null : <span style = {{fontSize :'1em', color : 'red', fontWeight : '100', paddingBottom : '15px'}}>Check Credentials and try again</span>}
            <span>
              {`${
                  signupToggle
                  ? "Already have an account?"
                  : `Don't have an account?`
              }`}{" "}
              <span
                onClick={() => {
                  setLogggedIn(true)
                  setSignupToggle(!signupToggle);
                }}
                style={{ cursor: "pointer", color: "#1677ff" }}
              >{`${signupToggle ? "Sign In" : `Sign Up`}`}
              </span>
            </span>
          </div>
        );
}

export default AuthenticationForm