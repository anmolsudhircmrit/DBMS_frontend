import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { Button, Form, Input, theme} from 'antd';
import axios from 'axios';


//const { useToken } = theme;
function AuthenticationForm({authentication}) {
  // const { token } = useToken();
    const [atStartUser, setAtStartUser] = useState(true)
    const [atStartPass, setAtStartPass] = useState(true)
    const [form] = Form.useForm();
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [formLayout, setFormLayout] = useState('vertical');
    const [signupToggle, setSignupToggle] = useState(false);
    const [logggedIn, setLogggedIn] = useState(true)
    const [signup, setSignup] = useState(true)
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [validateUsername, setValidateUsername] = useState(false)
    const [validatePassword, setValidatePassword] = useState(false)
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
          setLoading(false)
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
          setLoading(true)
          console.log(username, password, name)
          axios.post("http://localhost:7070/api/v1/signup", {username, password, name})
          .then((response) => {
            if(response.data === 'error'){
              setSignup(false)
            }
            else{
              console.log(response.data)
            }
            setLoading(false)
          })
          .catch((e) => console.log(e));
        }

        const handleForgotPassword = () => {
          console.log('Handled')
        }

        const onFinish = (values) => {
          console.log('Success:', values);
        };

        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };

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
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              onValuesChange={onFormLayoutChange}
            >
              {signupToggle && (
                <Form.Item colon = {true} label="Name : " rules={[{ required: true, message: 'Please input your Name!' }]}>
                  <Input 
                    onChange = {(e) => setName(e.target.value)}
                    placeholder="Name" 
                    size="large" 
                    type="text" />
                </Form.Item>
              )}
              <Form.Item style={{marginBottom : '0px !important'}} colon = {true} label="Username : " rules={[{ required: true, message: 'Please input your username!' }]}>
                {validateUsername? 
                null 
                  :
                  (atStartUser)?
                null:
                  // <Form.Item style={{marginTop : '0px !important'}} wrapperCol={{ offset: 0 }}>
                    <span style={{fontSize : '12px', color : 'red', marginTop : '0px', marginBottom : '100em'}}>(Username must be 8 charactes Long)</span> 
                  // </Form.Item>
              }
                <Input
                  onChange={(e) => {setusername(e.target.value);console.log(typeof e.target.value);console.log(e.target.value.length); if(e.target.value.length >= 8){console.log('validating'); setValidateUsername(true);console.log(validatePassword)}; if(e.target.value.length < 8){setValidateUsername(false)}; if(e.target.value.length > 0){setAtStartUser(false)}}}
                  placeholder="example@example.com"
                  size="large"
                  type="email"
                />
              </Form.Item>
              
              <Form.Item
                colon = {true}
                style={{ marginBottom: signupToggle ? 32 : 0 }}
                label="Password : "
                rules={[{ required: true, message: 'Please input the password!' }]}
              >
                {validatePassword ? 
                null 
                  :
                // <Form.Item wrapperCol={{ offset: 0 }}>
                (atStartPass)?
                null:
                  <span style={{fontSize : '12px', color : 'red', marginTop : '0px'}}>(Password must be 8 charactes Long)</span> 
                // </Form.Item>
              }
                <Input
                  placeholder="Password"
                  size="large"
                  type="password"
                  defaultValue={""}
                  onChange={(e) => {setpassword(e.target.value);console.log(e.target.value.length); if(e.target.value.length >= 8){console.log('validating');setValidatePassword(true); console.log(validatePassword)}; if(e.target.value.length < 8){setValidatePassword(false)}; ; if(e.target.value.length > 0){setAtStartPass(false)}}}
                />
              </Form.Item>
              
              {/* {!signupToggle && (
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
              )} */}
              <Form.Item {...buttonItemLayout}>
                <Link>{
                  <Button
                    disabled = {!(validateUsername && validatePassword)}
                    loading = {loading}
                    onClick={signupToggle?handleSignUp:handleSignIn}
                    type="primary"
                    size="large"
                    style={{ marginTop : signupToggle ? '0em' : '2em' }}
                    block
                  >
                    { !(validateUsername && validatePassword) ? 'Enter Valid Details' : (signupToggle ? "Sign Up" : "Sign In")}
                  </Button>
                }</Link>
              </Form.Item>
            </Form>

            {/* Link to signup */}
            {logggedIn? null : <span style = {{fontSize :'1em', color : 'red', fontWeight : '100', paddingBottom : '15px'}}>Check Credentials and try again</span>}
            {signup? null : <span style = {{fontSize :'1em', color : 'red', fontWeight : '100', paddingBottom : '15px'}}>Username Taken</span>}
            <span>
              {`${
                  signupToggle
                  ? "Already have an account?"
                  : `Don't have an account?`
              }`}{" "}
              <span
                onClick={() => {
                  setLogggedIn(true)
                  setSignup(true)
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