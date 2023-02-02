import React, {useState, useEffect} from 'react'
import {Button, Card, Col, Container, Image, Row, Form } from 'react-bootstrap'
import SidebarComp from '../components/SidebarComp'
import { Link } from 'react-router-dom'
import LOGOUT_ICON from '../assets/images/log-out.png'
import EDIT_ICON from '../assets/images/edit1.png'
import { Input } from 'antd'
import axios from 'axios'

function AccountComp({authentication, props}) {
  const [isEditing, setisEditing] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [edintingUsername, setEdintingUsername] = useState(false)
  const [editingPassword, setEditingPassword] = useState(false)
  const [editingPhone, setEditingPhone] = useState(false)
  const [editingAddress, setEditingAddress] = useState(false)
  const [editingAge, setEditingAge] = useState(false)
  const [selected, setSelected] = useState(false)

  let editArr = []

  const handleEdit = () => {
    setSelected(true)
    console.log('handling edit')
    setEdintingUsername(false)
    setEditingAddress(false)
    setEditingAge(false)
    setEditingPassword(false)
    setEditingName(false)
    setEditingPhone(false)
    if(editArr.length > 0){
      const data = JSON.stringify(editArr)
      const username = localStorage.getItem('username')
      axios.post('http://localhost:7070/api/v1/editdetails', {data, username} )
      .then((response) => {
        console.log(editArr)
        editArr = []
        window.location.reload()
      })
      .catch((err) => {console.log(err);console.log(editArr); editArr = []})
    }
  }

  const handleCancel = () => {
    editArr = []
    setEdintingUsername(false)
    setEditingAddress(false)
    setEditingAge(false)
    setEditingPassword(false)
    setEditingName(false)
    setEditingPhone(false)
  }

  const handleonSelect = (e, val) => {
    if(editArr.find((o) => o.type === val) === undefined){
      editArr.push({type : val, value : e.target.value}); 
      console.log(editArr)
    }
    else{
      for(let i = 0; i < editArr.length; i++){
        if(editArr[i].type === val){
          editArr[i].value = e.target.value
        }
      }
    }
  }

  return (
    <div style={{display:'flex',flexDirection:'', height : '100vh', width : '100vw', padding : 0,margin : 0, backgroundColor : '#F1F1F1'}} >
        <SidebarComp/>
        <Container fluid>
          <Row style={{height : '10%'}}>
            <Col>
              <Row style={{height : '70%'}}>
                <Col xs={11}>
                  <div style={{display : 'flex'}}>
                    <span style={{fontSize : '42px ', marginLeft : '50px', marginTop : '20px', fontWeight : 700}}> Account Details</span>
                  </div>
                </Col>
                 <Col xs={1}>
                  <Link to = '/' style={{textDecoration : 'none'}}>
                  <div style={{height : '50px', width : '50px'}} onClick = {() => {console.log('clicked');localStorage.clear(); authentication(false)}}>
                    <Image className='log-out' src={LOGOUT_ICON} style={{height : '70px', width : '70px', marginTop : '20px'}}></Image>
                    <span style={{marginLeft : '10px', fontWeight : 800,color : "#808080",}}>Logout</span>
                  </div>
                  </Link>
                </Col>
              </Row>
              <Row style={{height : '30%'}}>
                <Col>
                  <span style={{marginLeft : '50px',marginTop : '20px', color : "#808080", fontWeight : 600}}>Edit and View User account Details</span>
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
                    <div style={{display : 'flex', margin : '1em' , width : '95%', height : '6em', margin : '0.3em', }}>
                      <Card  style={{ justifyContent : 'center', width : '100%', height : '100%'}}>
                        <Card.Title style = {{fontSize : '28px', marginLeft : isEditing ? '0em' : '1em'}}>
                          {/* <span>
                            {isEditing ? 
                              <Image className='image-hover' style = {{marginLeft : '1em', marginRight : '1em', backgroundColor : '#eaeaea', borderRadius : '10px', height : '36px', width : '36px'}} src={EDIT_ICON}>
                              </Image>: 
                              null
                            }
                          </span> */}
                          <span style = {{fontWeight : '500', marginLeft : isEditing? '1em' : '0'}}>Username : </span><span className='hover1' style={{color : '#808080'}}>{props.username}</span>
                        </Card.Title>
                      </Card>
                    </div>
                    <div style={{display : 'flex', margin : '1em' , width : '95%', height : '6em', margin : '0.3em'}}>
                      <Card  style={{ justifyContent : 'center', width : '100%', height : '100%'}}>
                        <Card.Title style = {{fontSize : '28px', marginLeft : isEditing ? '0em' : '1em'}}>
                          <span>
                            {isEditing ? 
                              <Image onClick = {() => {setEditingName(true)}} className='image-hover' style = {{marginLeft : '1em', marginRight : '1em', backgroundColor : '#eaeaea', borderRadius : '10px', height : '36px', width : '36px'}} src={EDIT_ICON}>
                              </Image>: 
                              null
                            }
                          </span>
                          <span style = {{fontWeight : '500'}}>Name : </span><span className='hover1' style={{color : '#808080'}}>{editingName ? <input autoFocus={selected} onSelect={(e) => {handleonSelect(e, 'name')}} className='input-account' ></input> :  props.name }
                          </span>
                        </Card.Title>
                      </Card>
                    </div>
                    {/* <div style={{display : 'flex', margin : '1em' , width : '95%', height : '6em', margin : '0.3em'}}>
                      <Card  style={{ justifyContent : 'center', width : '100%', height : '100%'}}>
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
                    </div> */}
                    {props.phone_number ? <div style={{display : 'flex', margin : '1em' , width : '95%', height : '6em', margin : '0.3em'}}>
                      <Card  style={{ justifyContent : 'center', width : '100%', height : '100%'}}>
                        <Card.Title style = {{fontSize : '28px', marginLeft : isEditing ? '0em' : '1em'}}>
                          <span>
                            {isEditing ? 
                              <Image className='image-hover' style = {{marginLeft : '1em', marginRight : '1em', backgroundColor : '#eaeaea', borderRadius : '10px', height : '36px', width : '36px'}} src={EDIT_ICON} onClick = {() => setEditingPhone(true)}>
                              </Image>: 
                              null
                            }
                          </span>
                          <span style = {{fontWeight : '500'}}>Phone Number : </span><span className='hover1' style={{color : '#808080'}}>{editingPhone? <input autoFocus={selected} onSelect={(e) => {handleonSelect(e, 'phone_number')}} className='input-account' ></input> : props.phone_number}</span>
                        </Card.Title>
                      </Card>
                    </div> : 
                    <div style={{display : 'flex', margin : '1em' , width : '95%', height : '6em', margin : '0.3em'}}>
                      <Card  style={{ justifyContent : 'center', width : '100%', height : '100%'}}>
                        <Card.Title style = {{fontSize : '28px', marginLeft : isEditing ? '0em' : '1em'}}>
                          <span>
                            {isEditing ? 
                              <Image className='image-hover' style = {{marginLeft : '1em', marginRight : '1em', backgroundColor : '#eaeaea', borderRadius : '10px', height : '36px', width : '36px'}} src={EDIT_ICON} onClick = {() => setEditingPhone(true)}>
                              </Image>: 
                              null
                            }
                          </span>
                          <span style = {{fontWeight : '500'}}>Phone Number : </span><span style={{color : '#808080'}}>{editingPhone ? <input className='input-account' autoFocus={selected} onSelect={(e) => {handleonSelect(e, 'phone_number')}}></input> : 'Phone Number Not Provided'}</span>
                        </Card.Title>
                      </Card>
                    </div>}
                    {props.address ? <div style={{display : 'flex', margin : '1em' , width : '95%', height : '6em', margin : '0.3em'}}>
                      <Card  style={{ justifyContent : 'center', width : '100%', height : '100%'}}>
                        <Card.Title style = {{fontSize : '28px', marginLeft : isEditing ? '0em' : '1em'}}>
                          <span>
                            {isEditing ? 
                              <Image className='image-hover' style = {{marginLeft : '1em', marginRight : '1em', backgroundColor : '#eaeaea', borderRadius : '10px', height : '36px', width : '36px'}} src={EDIT_ICON} onClick = {() => setEditingAddress(true)}>
                              </Image>: 
                              null
                            }
                          </span>
                          <span style = {{fontWeight : '500'}}>City : </span><span className='hover1' style={{color : '#808080'}}>{editingAddress ? <input autoFocus={selected} onSelect={(e) => {handleonSelect(e, 'address')}} className='input-account' ></input> : props.address}</span>
                        </Card.Title>
                      </Card>
                    </div> : 
                    <div style={{display : 'flex', margin : '1em' , width : '95%', height : '6em', margin : '0.3em'}}>
                      <Card  style={{ justifyContent : 'center', width : '100%', height : '100%'}}>
                        <Card.Title style = {{fontSize : '28px', marginLeft : isEditing ? '0em' : '1em'}}>
                          <span>
                            {isEditing ? 
                              <Image className='image-hover' style = {{marginLeft : '1em', marginRight : '1em', backgroundColor : '#eaeaea', borderRadius : '10px', height : '36px', width : '36px'}} src={EDIT_ICON} onClick = {() => setEditingAddress(true)}>
                              </Image>: 
                              null
                            }
                          </span>
                          <span style = {{fontWeight : '500'}}>City : </span><span style={{color : '#808080'}}>{editingAddress ? <input autoFocus={selected} onSelect={(e) => { handleonSelect(e, 'address')}}className='input-account' ></input> : 'Address Not Provided'}</span>
                        </Card.Title>
                      </Card>
                    </div>}
                    {props.age ? <div style={{display : 'flex', margin : '1em' , width : '95%', height : '6em', margin : '0.3em'}}>
                      <Card  style={{ justifyContent : 'center', width : '100%', height : '100%'}}>
                        <Card.Title style = {{fontSize : '28px', marginLeft : isEditing ? '0em' : '1em'}}>
                          <span>
                            {isEditing ? 
                              <Image className='image-hover' style = {{marginLeft : '1em', marginRight : '1em', backgroundColor : '#eaeaea', borderRadius : '10px', height : '36px', width : '36px'}} src={EDIT_ICON} onClick = {() => setEditingAge(true)}>
                              </Image>: 
                              null
                            }
                          </span>
                          <span style = {{fontWeight : '500'}}>Age : </span><span className='hover1' style={{color : '#808080'}}>{editingAge ? <input autoFocus={selected} onSelect={(e) => {handleonSelect(e, 'age')}} className='input-account' ></input> : props.age}</span>
                        </Card.Title>
                      </Card>
                    </div> : 
                    <div style={{display : 'flex', margin : '1em' , width : '95%', height : '6em', margin : '0.3em'}}>
                      <Card  style={{ justifyContent : 'center', width : '100%', height : '100%'}}>
                        <Card.Title style = {{fontSize : '28px', marginLeft : isEditing ? '0em' : '1em'}}>
                          <span>
                            {isEditing ? 
                              <Image className='image-hover' style = {{marginLeft : '1em', marginRight : '1em', backgroundColor : '#eaeaea', borderRadius : '10px', height : '36px', width : '36px'}} src={EDIT_ICON} onClick = {() => setEditingAge(true)}>
                              </Image>: 
                              null
                            }
                          </span>
                          <span style = {{fontWeight : '500'}}>Age : </span><span style={{color : '#808080'}}>{editingAge ? <input autoFocus={selected} onSelect={(e) => handleonSelect(e, 'age')} className='input-account' ></input> : 'Age Not Provided'}</span>
                        </Card.Title>
                      </Card>
                    </div>}
                    <div style={{width : '97.7%', display : 'flex', flexDirection : 'row', alignItems : 'center', justifyContent : 'center'}}>
                      <div style={{width : isEditing ? '45%' : '100%', margin : '1em'}}>
                        <Button onClick={() => {setisEditing(!isEditing); ; 
                                  if(isEditing) handleEdit()
                            }} className='btn-edit'>{isEditing ? 'Click To Save Details' : "Edit Details"}
                        </Button>
                      </div>
                      {isEditing ?<div style={{width : '45%', margin : '1em'}}><Button onClick={() => {setisEditing(!isEditing); ; 
                                if(isEditing) handleCancel()
                          }} className='btn-edit'>{"Cancel Editing"}
                      </Button></div>
                      : null}
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