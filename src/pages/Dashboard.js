import React, { useState, useRef, useEffect, useCallback} from "react";
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap'
import DestinationPlacesSearch from'../components/DestinationPlaceSearch.js'
import axios from 'axios'
import {Row, Col, Container, Card} from 'react-bootstrap'
import SidebarComp from "../components/SidebarComp";


function Dashboard() {
  const optionArray = [{label:'Any', value:'any'}, {label:'Auto', value:'auto'}, {label:'SUV', value:'suv'}, {label:'HatchBack', value:'hatchback'}, {label:'Sedan', value:'sedan'}]
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
  // let model;
  //console.log(window.MapmyIndia)
  const mapRef = useRef()

  const changeSourceSelected = (sourc) => {
    //setSourceSelected(value)
    setSource(sourc)
    console.log(source)
  }

  const changeDestSelected = (value, destin) => {
    setDestSelected(value)
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

    // axios.get(`https://apis.mapmyindia.com/advancedmaps/v1/3d3605631a79f428ea7c80ef7611d74e/rev_geocode?lat=${lat}&lng=${long}&region=IND`)
    // .then((response) => {
    //   console.log('The resules are : ')
    //   console.log(response.data.results)
    //   console.log(response.data.results[0].formatted_address)
    //   changeSourceSelected(response.data.results[0].formatted_address)
    // })
    // .catch((err) => console.log(err))
  }

  function err(e){
    console.log(e);
  }

  useEffect(() => {
    mapRef.current.id = 'map';
    //map = new window.MapmyIndia.Map('map', { center: [28.61, 77.23], zoomControl: true, hybrid: true, search: true, location: true });
    //navigator.geolocation.getCurrentPosition(success, err, options);
  }, [])
  
  const handleCheckout = () => {
    console.log(source)
    const data = JSON.stringify({
      source, model, dest, vehicle, price
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
    if(dir !== undefined){
      dir.remove();
    }
    dir = window.MapmyIndia.direction({map:map,start:`${latitude},${longitude}`,end:{label:elocObj.label,geoposition:elocObj.eloc}});
  }

  const handelModelChange = (e) => {
    console.log("event : " + e)
    setModelSelected(true); 
    console.log("Model : " + e.target.value)
    setModel(e.target.value)
    if(rideFound){
      setRideFound(false)
      setisConfirm(false)
    }
    setRideNotFound(false)
  }

  const handleConfirm = () => {
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

  return (
    <div style={{display:'flex',flexDirection:'row', height : '100vh', width : '100vw', padding : 0,margin : 0}}>
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
                                <DestinationPlacesSearch disabled={false} changeConfirmed = {changeConfirmed} changeDestSelected = {changeDestSelected} testCallback = {testCallback}/>
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
                    <div style={{
                      display : 'flex',
                      flexDirection : 'column',
                      height : '100%',
                    }}>
                      <div className="wrapper">
                        {optionArray.map((option,index) => <>
                            <input name="select" type={'radio'} value={option.value} key={index} id={`option-${index+1}`} onChange={(e) => { console.log(e);handelModelChange(e)}} />
                            <label htmlFor={`option-${index+1}`} className={`option option-${index+1}`}>
                              <span>{option.label}</span>
                            </label>
                          </>
                        )}
                       {/* <input name="select" type={'radio'} value={option.value} key={index} id={`option-${index+1}`} onChange={(e) => { console.log(e);handelModelChange(e)}} />
                            <label htmlFor={`option-${index+1}`} className={`option option-${index+1}`}>
                              <span>{option.label}</span>
                            </label> */}
                      </div>
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
                      <Card style={{marginBottom : '1em'}}>
                        <Card.Body>
                          <Card.Title>{( isConfirm) ? `${price}` : 'Select Modes'}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted" style={{fontSize: '14px'}}>Continue With Payment</Card.Subtitle>
                          {
                            ( isConfirm) ?
                              <Button style ={{width : '100%', margin : '0px', fontSize : '18px'}} onClick={handleCheckout}>Pay and Book</Button>
                              :
                              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Please Confirm before Booking</Tooltip>}>
                                <span className="d-inline-block" style={{width : '100%', margin : '0px' }} >
                                  <Button disabled style={{ pointerEvents: 'none', fontSize : '18px', width : '100%', margin : '0px'}}>
                                    Pay and Book
                                  </Button>
                                </span>
                              </OverlayTrigger>
                          }
                        </Card.Body>
                      </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Dashboard