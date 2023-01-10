import React, {useState, useEffect } from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import SidebarComp from '../components/SidebarComp'
import { Link } from 'react-router-dom'
import LOGOUT_ICON from '../assets/images/log-out.png'

function Accout({authentication}) {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    
  })
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
                  <Link to = '/'>
                  <div style={{height : '50px', width : '50px'}} onClick = {() => {console.log('clicked');localStorage.clear(); authentication(false)}}>
                    <Image src={LOGOUT_ICON} style={{height : '70px', width : '70px', marginTop : '20px'}}></Image>
                    <span style={{marginLeft : '10px', fontWeight : 800,color : "#808080"}}>Logout</span>
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
              </div>
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default Accout