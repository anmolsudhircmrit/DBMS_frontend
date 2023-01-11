import React from 'react'
import {Col, Container, Image, Row, Spinner } from 'react-bootstrap'
import SidebarComp from '../components/SidebarComp'
import { Link } from 'react-router-dom'
import LOGOUT_ICON from '../assets/images/log-out.png'

function AccountComp({authentication, props}) {
  return (
    <div style={{display:'flex',flexDirection:'', height : '100vh', width : '99vw', padding : 0,margin : 0, backgroundColor : '#F1F1F1'}} >
        <SidebarComp/>
        <Container fluid>
          <Row style={{height : '10%'}}>
            <Col>
              <Row style={{height : '70%'}}>
                <Col xs={11}>
                  <div style={{display : 'flex'}}>
                    <span style={{fontSize : '42px ', marginLeft : '50px', marginTop : '20px', fontWeight : 600}}> Account Details</span>
                  </div>
                </Col>
                 <Col xs={1}>
                  <Link to = '/' style={{textDecoration : 'none'}}>
                  <div style={{height : '50px', width : '50px'}} onClick = {() => {console.log('clicked');localStorage.clear(); authentication(false)}}>
                    <Image src={LOGOUT_ICON} style={{height : '70px', width : '70px', marginTop : '20px'}}></Image>
                    <span style={{marginLeft : '10px', fontWeight : 800,color : "#808080",}}>Logout</span>
                  </div>
                  </Link>
                </Col>
              </Row>
              <Row style={{height : '30%'}}>
                <Col>
                  <span style={{marginLeft : '50px',marginTop : '20px', color : "#808080", fontWeight : 500}}>Edit and View User account Details</span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{height : '90%'}}>
            <Col>
              <div style = {{backgroundColor : 'white', margin : '3em', borderRadius : '1em', height : '91%', width : '93%'}}>
                {/* Hey */}
                <div style={{paddingTop : '10em', display : 'flex', justifyContent :'center', flexDirection : 'column', alignItems : 'center'}}>
                    <div>{`Username : ${props.username}`}</div>
                    <div>{`Name : ${props.name}`}</div>
                    {props.phone_number ? <div>{props.phone_number}</div> : <div>No Phone number provided</div>}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default AccountComp