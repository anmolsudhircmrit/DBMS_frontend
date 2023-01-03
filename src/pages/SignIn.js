import React from "react";
import { Col, Row, Image } from "antd";
import {CarFilled} from "@ant-design/icons"
import SIGNUP_BG from "../assets/images/app-image.svg";
import AuthenticationForm from "../components/AuthenticationForm";

function SignIn() {
  return (
    <div>
      <div
        style={{
          color: "#6D7A55",
          padding: "0.5em",
          margin: 0,
          fontSize: 32,
          fontWeight: 700,
        }}
      >
        <CarFilled style={{ margin: "10px" }} />
        Ride Booking System
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
          background: "#D7D7D7",
        }}
      >
        <Col
          className="align-center p-4"
          style={{ marginTop: "2.5em" }}
          span={10}
        >
          <AuthenticationForm />
        </Col>
        <Col
          className="align-center p-4"
          span={14}
          style={{
            background: "#4F583F",
            borderRadius: '2em',
          }}
        >
          <Image preview={false} src={SIGNUP_BG} />
        </Col>
      </Row>
    </div>
  );
}

export default SignIn;
