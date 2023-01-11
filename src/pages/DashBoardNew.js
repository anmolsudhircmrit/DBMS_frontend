import React, { useState, useRef, useEffect, useCallback} from "react";
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap'
import DestinationPlacesSearch from'../components/DestinationPlaceSearch.js'
import axios from 'axios'
import {Row, Col, Container, Card} from 'react-bootstrap'
import SidebarComp from "../components/SidebarComp";
import VehicleModal from "../components/VehicleModal.js";
import { Link } from "react-router-dom";
import {CSSTransition} from 'react-transition-group';


function DashBoardNew() {
  const [modalShow, setModalShow] = useState(false);
  const [destSelected, setDestSelected] = useState(false)
  const [modelSelected, setModelSelected] = useState(false)
  const [source, setSource] = useState('Current Location')
  const [dest, setDest] = useState('')
  const [vehicle, setVehicle] = useState(null)
  const [isConfirm, setisConfirm] = useState(false)
  const [isLoading, setIsLoadind] = useState(false)
  const [rideFound, setRideFound] = useState(false)
  const [rideNotFound, setRideNotFound] = useState(false)
  const [model, setModel] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)
  
  // let model;
  //console.log(window.MapmyIndia)
  const mapRef = useRef()

  const changeSourceSelected = (sourc) => {
    //setSourceSelected(value)
    setSource(sourc)
    console.log(source)
  }

  const changeDestSelected = (value, destin) => {
    //setModelSelected(value)
    setDestSelected(value)
    setIsConfirmed(value)
    setDest(destin)
    console.log(dest)
  }

  const changeConfirmed = (val) => {
    setisConfirm(val)
  }

  let map;
  let crd;
  let dir;
  let price = (Math.random() * (550 - 250 + 1) + 250)
  price = (Math.round(price * 100)/100)

  const icon = window.L.icon({iconUrl : 'https://cdn-icons-png.flaticon.com/512/5193/5193688.png', iconSize : [30, 30] });

  const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
  };

  function success(pos) {
    //debugger;
    crd = pos.coords;
    localStorage.setItem('lat', `${crd.latitude}`)
    localStorage.setItem('long', `${crd.longitude}`)
    //localStorage.setItem('crd', JSON.stringify(crd))
    //console.log('Item Set : ')
    //console.log(localStorage.getItem('crd'))
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    const lat = crd.latitude
    const long = crd.longitude
    // const username = localStorage.getItem('username')
    // axios.post("http://localhost:7070/api/v1/updateloc", {lat, long, username})
    // .then((response) => {
    //   console.log(response.data);
    // })
    // .catch((err) => console.log(err));

    map.panTo(window.L.latLng(crd.latitude, crd.longitude))
    window.L.marker([crd.latitude, crd.longitude]).addTo(map);
    let leaf = window.L
    axios.get('http://localhost:7070/api/v1/vehicleloc')
    .then((response) => {
      for(let i = 0; i < response.data.length; i++){
        let string = response.data[i].vehicle_loc
        let splitString = string.split(',')
        let lat = parseFloat(splitString[0])
        let long = parseFloat(splitString[1])
        leaf.marker(new leaf.LatLng(lat, long), {icon: icon,}).addTo(map)
      }
    })
    .catch((err) => console.log(err))
    console.log('map : ')
    console.log(map)
    // axios.post(`http://localhost:7070/api/v1/rev_geo`, {lat, long})
    // .then((response) => {
    //   console.log('The resules are : ')
    //   //console.log(response.data.results)
    //   console.log(response.data)
    //   changeSourceSelected(response.data)
    // })
    // .catch((err) => console.log(err))
  }

  function err(e){
    console.log(e);
  }

  useEffect(() => {
    mapRef.current.id = 'map';
    map = new window.MapmyIndia.Map('map', { center: [12.9693346,77.7124368], zoomControl: true, hybrid: true, search: true, location: true });
    navigator.geolocation.getCurrentPosition(success, err, options);
  }, [])
  
  const handleCheckout = () => {
    console.log(source)
    let lat = localStorage.getItem('lat')
    let long = localStorage.getItem('long')
    let lat_long = lat + ',' + long
    const data = JSON.stringify({
      source, model, dest, vehicle, price, lat_long
    })
    localStorage.setItem("data",data);
    axios.post("http://localhost:7070/api/v1/create-checkout",{price:parseInt(price*100), qty:1}).then(response => {

      console.log(response.data);
      window.location.href = response.data;
      
    })
  }

  const testCallback = (elocObj) =>{
    //debugger
    let latitude = JSON.parse(localStorage.getItem('lat'))
    let longitude = JSON.parse(localStorage.getItem('long'))
    console.log(elocObj, crd)
    console.log('testCallback called')
    console.log(map)
    window.MapmyIndia.direction({map:map,start:`${latitude},${longitude}`,end:{label:elocObj.label,geoposition:elocObj.eloc}});
    // axios.post(`http://localhost:7070/api/v1/rev_geo`, {latitude, longitude})
    // .then((response) => {
    //   console.log('The resules are : ')
    //   //console.log(response.data.results)
    //   console.log(response.data)
    //   changeSourceSelected(response.data)
    // })
    // .catch((err) => console.log(err))
  }

  const handelModelChange = (e) => {
    console.log("event : " + e)
    setModelSelected(true); 
    console.log("Model : " + e.target.value)
    let mod = e.target.value
    setModel(mod.toUpperCase())
    if(rideFound){
      setRideFound(false)
      setisConfirm(false)
    }
    setRideNotFound(false)
  }

  const handleConfirm = () => {
    setRideNotFound(false)
    setIsLoadind(true)
    let username = localStorage.getItem('username')
    console.log(model)
    axios.post('http://localhost:7070/api/v1/getride', {test:'test', model, username})
    .then((response) => {
      if(response.data.length > 0){
        setVehicle(response.data[0].vehicle_id);
        console.log(response.data[0].vehicle_id)
        setisConfirm(true)
        setRideFound(true)
      }
      else{
        setRideNotFound(true);
      }
      setIsLoadind(false)
    })
    .catch((err) => {console.log(err)})
  }

  let p = {
    
  }

  return (
    <div style={{display:'flex',flexDirection:'row', height : '100vh', width : '100vw', padding : 0,margin : 0, backgroundColor : '#F1F1F1'}}>
        <SidebarComp className = 'sidebarfinal'/>
        {/* <div style = {{height : '100%', width : collapsed ? '12px' : '20px', background : '#D2D2D2', cursor : 'pointer', borderRadius : '0.5em'}} onClick = {() => setCollapsed(!collapsed)}/> */}
        {/* <div style = {{height : '100%', width : '100%', margin : '0em', alignText : 'centre', backgroundColor : 'red'}}>

        </div> */}
        <Container fluid style={{marginLeft : '1em'}}>
            <Row style = {{ height : '100%'}}>
                <Col xs={10}>
                    <Row style = {{height : '10%', alignItems : 'center'}}>
                        <Col>
                            <div style = {{display : 'flex', color : 'black', height : '100%', width : '100%'}}>
                                {/* <SourcePlacesSearch changeSourceSelected = {changeSourceSelected}/> */}
                                <DestinationPlacesSearch isConfirmed={isConfirmed} disabled={false} changeConfirmed = {changeConfirmed} changeDestSelected = {changeDestSelected} testCallback = {testCallback}/>
                                {/* <Link to = '/'> */}
                                    <Button style={{marginLeft : '0px',marginRight : '0px', marginBottom : '0px', width : '17%', height : '100%', marginTop : '11px', fontSize : '14px'}} onClick = {() => {window.location.reload()}}>Change Destination</Button>
                                {/* </Link> */}
                            </div>
                        </Col>
                    </Row>
                    <Row style = {{ height : '90%', alignItems : 'center'}}>
                        <Col style = {{height : '100%'}}>
                            <div ref =  {mapRef} 
                                style = {
                                    {   
                                        height : '98%', 
                                        width : '100%', 
                                        background : 'grey', 
                                        borderRadius : '1em'
                                    }
                                }
                            >
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs = {2}>
                    <div style={{display : 'flex',
                      overflow : 'scroll', 
                      maxHeight : '100vh',
                      overflow : 'scroll',
                      backgroundColor : '#F1F1F1'
                    }}>
                    <div style={{
                      display : 'flex', 
                      maxHeight : '100%',
                      overflow : 'scroll',
                      flexDirection : 'column',
                      justifyContent : 'center',
                      //height : '100%',
                    }}>
                    <Card style={{marginTop : '1em',marginBottom : '1em'}}>
                        <Card.Body>
                          <Card.Title>SOURCE</Card.Title>
                          <Card.Text>
                            <span>{source}</span>
                          </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{marginBottom : '1em'}}>
                        <Card.Body>
                          <Card.Title>DESTINATION</Card.Title>
                          <Card.Text>
                            <span>{destSelected? dest : 'Destination Not Selected'}</span>
                          </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{marginBottom : '1em'}}>
                        <Card.Body>
                            <Card.Title>VEHICLE MODEL</Card.Title>
                          <Card.Text>{( modelSelected) ? `${model}`  : 'No Model Selected'}</Card.Text>
                          <div style={
                            {
                                display : 'flex',
                                height : '100%'
                            }
                        }>
                            <Button disabled = {!destSelected} variant="primary" style={{width : '100%', margin : '0px', fontSize : '16px'}} onClick={() => setModalShow(true)}>
                                Select Vehicle
                            </Button>

                            <VehicleModal
                                handelModelChange = {handelModelChange}
                                show = {modalShow}
                                onHide = {() => setModalShow(false)}
                            />
                        </div>
                        </Card.Body>
                      </Card>
                      {/* <div className="wrapper">
                        {/* {optionArray.map((option,index) => <>
                            <input name="select" type={'radio'} value={option.value} key={index} id={`option-${index+1}`} onChange={(e) => { console.log(e);handelModelChange(e)}} />
                            <label htmlFor={`option-${index+1}`} className={`option option-${index+1}`}>
                              <span>{option.label}</span>
                            </label>
                          </>
                        )} */}
                        {/* <VehicleModal props = {{}}/> */}

                       {/* <input name="select" type={'radio'} value={option.value} key={index} id={`option-${index+1}`} onChange={(e) => { console.log(e);handelModelChange(e)}} />
                            <label htmlFor={`option-${index+1}`} className={`option option-${index+1}`}>
                              <span>{option.label}</span>
                            </label> */}
                      {/* </div> */} 
                      <Card style={{marginBottom : '1em'}}>
                        <Card.Body>
                          {(destSelected && modelSelected) ?
                          <Button style ={{width : '100%', margin : '0px', fontSize : '18px'}} onClick = {handleConfirm}>
                            {isLoading ? 'Finding Ride...' : (rideFound ? 'Ride Found!' : 'Find a Ride' )}
                          </Button>
                          :
                          <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Select All the Required Fields to Book</Tooltip>}>
                            <span className="d-inline-block" style={{width : '100%', margin : '0px' }} >
                              <Button disabled style={{  fontSize : '18px', width : '100%', margin : '0px'}}>
                                Confirm
                              </Button>
                            </span>
                          </OverlayTrigger>
                          }
                          {isConfirm ? <Card.Text style={{marginTop : '1em', marginLeft : '0.7em'}}>The ride is on its way</Card.Text> : null}
                          {rideNotFound ? <Card.Text style={{marginTop : '1em', marginLeft : '0.7em', color :'red'}}>Sorry, Couldn't Find Ride'</Card.Text> : null}
                        </Card.Body>
                      </Card>
                    {( isConfirm) ? 
                    <CSSTransition
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                    >
                        <Card style={{marginBottom : '1em'}} key = 'transition-group'>
                            <Card.Body>
                              <Card.Title>{( isConfirm) ? `${price}` : 'Select Modes'}</Card.Title>
                              <Card.Subtitle className="mb-2 text-muted" style={{fontSize: '14px'}}>Continue With Payment</Card.Subtitle>
                              <Button style ={{width : '100%', margin : '0px', fontSize : '18px'}} onClick={handleCheckout}>Pay and Book</Button>
                            </Card.Body>
                        </Card>
                      </CSSTransition>
                      : null
                    }
                    </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default DashBoardNew