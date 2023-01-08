import React from "react";
import { Col, Row, Image } from "antd";
import {CarFilled} from "@ant-design/icons"
import SIGNUP_BG from "../assets/images/illus2.png";
import AuthenticationForm from "../components/AuthenticationForm";

function SignIn({authentication}) {
  return (
    <div>
      <div
        style={{
          //color: "#0070E1",
          padding: "0.5em",
          margin: 0,
          fontSize: 32,
          fontWeight: 700,
        }}
      >
        <span>
        <CarFilled style={{ margin: '10px'}} />
        Ride Booking System
        </span>
      </div>
      <Row
        className="vh-100"
        // align={"middle"}
        // justify={"center"}
        style={{
          paddingRight: "6em",
          //padding: "2em",
          marginLeft: "2em",
          marginRight : '2em',
          borderRadius: "2em",
          background: "#eaeaea",
        }}
      >
        <Col
          className="align-center p-4"
          style={{ marginTop: "4.5em" }}
          span={10}
        >
          <AuthenticationForm authentication = {authentication}/>
        </Col>
        <Col
          className="align-center p-4"
          span={14}
          style={{
            // background: "#4F583F",
            borderRadius: '2em',
          }}
        >
          <Image style = {{borderRadius : '1em'}} preview={false} src={SIGNUP_BG} />
        </Col>
      </Row>
    </div>
  );
}

export default SignIn;
