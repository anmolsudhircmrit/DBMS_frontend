import React, {useState} from 'react'
import {Button, Card, Col, Container, Image, Row, Spinner } from 'react-bootstrap'
import SidebarComp from '../components/SidebarComp'
import { Link } from 'react-router-dom'
import LOGOUT_ICON from '../assets/images/log-out.png'
import EDIT_ICON from '../assets/images/edit1.png'

function AccountComp({authentication, props}) {
  const [isEditing, setisEditing] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [edintingUsername, setEdintingUsername] = useState(false)
  const [editingPassword, setEditingPassword] = useState(false)
  const [editingPhone, setEditingPhone] = useState(false)
  const [editingAddress, setEditingAddress] = useState(false)
  const [editingAge, setEditingAge] = useState(false)

  const handleEdit = () => {console.log('handling edit')}
  return (
    <div style={{display:'flex',flexDirection:'', height : '100vh', width : '99vw', padding : 0,margin : 0, backgroundColor : '#F1F1F1'}} >
        <SidebarComp/>
        <Container fluid>
          <Row style={{height : '10%'}}>
            <Col>
              <Row style={{height : '70%'}}>
                <Col xs={11}>
                  <div style={{display : 'flex'}}>
                    <span style={{fontSize : '42px ', marginLeft : '50px', marginTop : '20px', fontWeight : 500}}> Account Details</span>
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
                <div style={{paddingTop : '0em', display : 'flex', justifyContent : 'center', flexDirection : 'column', alignItems : 'center', height : '100%', marginBottom : '0em', marginLeft : '0.5em', marginRight : '0.5em'}}>
                    {/* {`Username : ${props.username}`} */}
                    <div style={{display : 'flex', width : '100%', height : '5em', margin : '0.3em'}}>
                      <Card style={{ justifyContent : 'center', width : '100%', height : '100%'}}>
                        <Card.Title style = {{fontSize : '28px', marginLeft : isEditing ? '0em' : '1em'}}>
                          <span>
                            {isEditing ? 
                              <Image className='image-hover' style = {{marginLeft : '1em', marginRight : '1em', backgroundColor : '#eaeaea', borderRadius : '10px', height : '36px', width : '36px'}} src={EDIT_ICON} onClick = {() => console.log("clicked edit")}>
                              </Image>: 
                              null
                            }
                          </span>
                          <span style = {{fontWeight : '500'}}>Name : </span><span className='hover1' style={{color : '#808080'}}>{props.name}
                          </span>
                        </Card.Title>
                      </Card>
                    </div>
                    <div style={{display : 'flex', width : '100%', height : '5em', margin : '0.3em', }}>
                      <Card style={{ justifyContent : 'center', width : '100%', height : '100%'}}>
                        <Card.Title style = {{fontSize : '28px', marginLeft : isEditing ? '0em' : '1em'}}>
                          <span>
                            {isEditing ? 
                              <Image className='image-hover' style = {{marginLeft : '1em', marginRight : '1em', backgroundColor : '#eaeaea', borderRadius : '10px', height : '36px', width : '36px'}} src={EDIT_ICON} onClick = {() => console.log("clicked edit")}>
                              </Image>: 
                              null
                            }
                          </span>
                          <span style = {{fontWeight : '500'}}>Username : </span><span className='hover1' style={{color : '#808080'}}>{props.username}</span>
                        </Card.Title>
                      </Card>
                    </div>
                    <div style={{display : 'flex', width : '100%', height : '5em', margin : '0.3em'}}>
                      <Card style={{ justifyContent : 'center', width : '100%', height : '100%'}}>
                        <Card.Title style = {{fontSize : '28px', marginLeft : isEditing ? '0em' : '1em'}}>
                          <span>
                            {isEditing ? 
                              <Image className='image-hover' style = {{marginLeft : '1em', marginRight : '1em', backgroundColor : '#eaeaea', borderRadius : '10px', height : '36px', width : '36px'}} src={EDIT_ICON} onClick = {() => console.log("clicked edit")}>
                              </Image>: 
                              null
                            }
                          </span>
                          <span style = {{fontWeight : '500'}}>Password : </span><span className='hover1' style={{color : '#808080'}}>{props.password}</span>
                        </Card.Title>
                      </Card>
                    </div>
                    {props.phone_number ? <div style={{display : 'flex', width : '100%', height : '5em', margin : '0.3em'}}>
                      <Card style={{ justifyContent : 'center', width : '100%', height : '100%'}}>
                        <Card.Title style = {{fontSize : '28px', marginLeft : isEditing ? '0em' : '1em'}}>
                          <span>
                            {isEditing ? 
                              <Image className='image-hover' style = {{marginLeft : '1em', marginRight : '1em', backgroundColor : '#eaeaea', borderRadius : '10px', height : '36px', width : '36px'}} src={EDIT_ICON} onClick = {() => console.log("clicked edit")}>
                              </Image>: 
                              null
                            }
                          </span>
                          <span style = {{fontWeight : '500'}}>Phone Number : </span><span className='hover1' style={{color : '#808080'}}>{props.phone_number}</span>
                        </Card.Title>
                      </Card>
                    </div> : 
                    <div style={{display : 'flex', width : '100%', height : '5em', margin : '0.3em'}}>
                      <Card style={{ justifyContent : 'center', width : '100%', height : '100%'}}>
                        <Card.Title style = {{fontSize : '28px', marginLeft : isEditing ? '0em' : '1em'}}>
                          <span>
                            {isEditing ? 
                              <Image className='image-hover' style = {{marginLeft : '1em', marginRight : '1em', backgroundColor : '#eaeaea', borderRadius : '10px', height : '36px', width : '36px'}} src={EDIT_ICON} onClick = {() => console.log("clicked edit")}>
                              </Image>: 
                              null
                            }
                          </span>
                          <span style = {{fontWeight : '500'}}>Phone Number : </span><span style={{color : '#808080'}}>Phone Number Not Provided</span>
                        </Card.Title>
                      </Card>
                    </div>}
                    {props.address ? <div style={{display : 'flex', width : '100%', height : '5em', margin : '0.3em'}}>
                      <Card style={{ justifyContent : 'center', width : '100%', height : '100%'}}>
                        <Card.Title style = {{fontSize : '28px', marginLeft : isEditing ? '0em' : '1em'}}>
                          <span>
                            {isEditing ? 
                              <Image className='image-hover' style = {{marginLeft : '1em', marginRight : '1em', backgroundColor : '#eaeaea', borderRadius : '10px', height : '36px', width : '36px'}} src={EDIT_ICON} onClick = {() => console.log("clicked edit")}>
                              </Image>: 
                              null
                            }
                          </span>
                          <span style = {{fontWeight : '500'}}>City : </span><span className='hover1' style={{color : '#808080'}}>{props.address}</span>
                        </Card.Title>
                      </Card>
                    </div> : 
                    <div style={{display : 'flex', width : '100%', height : '5em', margin : '0.3em'}}>
                      <Card style={{ justifyContent : 'center', width : '100%', height : '100%'}}>
                        <Card.Title style = {{fontSize : '28px', marginLeft : isEditing ? '0em' : '1em'}}>
                          <span>
                            {isEditing ? 
                              <Image className='image-hover' style = {{marginLeft : '1em', marginRight : '1em', backgroundColor : '#eaeaea', borderRadius : '10px', height : '36px', width : '36px'}} src={EDIT_ICON} onClick = {() => console.log("clicked edit")}>
                              </Image>: 
                              null
                            }
                          </span>
                          <span style = {{fontWeight : '500'}}>City : </span><span style={{color : '#808080'}}>Address Not Provided</span>
                        </Card.Title>
                      </Card>
                    </div>}
                    {props.age ? <div style={{display : 'flex', width : '100%', height : '5em', margin : '0.3em'}}>
                      <Card style={{ justifyContent : 'center', width : '100%', height : '100%'}}>
                        <Card.Title style = {{fontSize : '28px', marginLeft : isEditing ? '0em' : '1em'}}>
                          <span>
                            {isEditing ? 
                              <Image className='image-hover' style = {{marginLeft : '1em', marginRight : '1em', backgroundColor : '#eaeaea', borderRadius : '10px', height : '36px', width : '36px'}} src={EDIT_ICON} onClick = {() => console.log("clicked edit")}>
                              </Image>: 
                              null
                            }
                          </span>
                          <span style = {{fontWeight : '500'}}>Age : </span><span className='hover1' style={{color : '#808080'}}>{props.age}</span>
                        </Card.Title>
                      </Card>
                    </div> : 
                    <div style={{display : 'flex', width : '100%', height : '5em', margin : '0.3em'}}>
                      <Card style={{ justifyContent : 'center', width : '100%', height : '100%'}}>
                        <Card.Title style = {{fontSize : '28px', marginLeft : isEditing ? '0em' : '1em'}}>
                          <span>
                            {isEditing ? 
                              <Image className='image-hover' style = {{marginLeft : '1em', marginRight : '1em', backgroundColor : '#eaeaea', borderRadius : '10px', height : '36px', width : '36px'}} src={EDIT_ICON} onClick = {() => console.log("clicked edit")}>
                              </Image>: 
                              null
                            }
                          </span>
                          <span style = {{fontWeight : '500'}}>Age : </span><span style={{color : '#808080'}}>Age Not Provided</span>
                        </Card.Title>
                      </Card>
                    </div>}
                    <div style={{width : '100%'}}>
                      <Button onClick={() => {setisEditing(!isEditing); ; 
                                if(isEditing) handleEdit()
                          }} className='btn-edit'>{isEditing ? 'Click To Save Details' : "Edit Details"}
                      </Button>
                    </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default AccountComp