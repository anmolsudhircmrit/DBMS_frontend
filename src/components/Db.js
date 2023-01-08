import React, { useState, useRef, useEffect} from "react";
// import SideBar from "../components/Sidebar.js";
// import SideBarCollapsed from "../components/SideBarCollapsed.js"
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap'
import DestinationPlacesSearch from'../components/DestinationPlaceSearch.js'
import SourcePlacesSearch from '../components/SourcePlacesSearch.js'
import axios from 'axios'
import {Row, Col, Container, Card} from 'react-bootstrap'
import SidebarComp from "./SidebarComp.js";


function Db() {
  const optionArray = [{label:'Any', value:'any'}, {label:'Auto', value:'auto'}, {label:'SUV', value:'suv'}, {label:'HatchBack', value:'hatch'}, {label:'Sedan', value:'sedan'}]
  // const [collapsed, setCollapsed] = useState(true);
  const [sourceSelected, setSourceSelected] = useState(true)
  const [destSelected, setDestSelected] = useState(false)
  const [modelSelected, setModelSelected] = useState(false)

  const changeSourceSelected = (value) => {
    setSourceSelected(value)
  }

  const changeDestSelected = (value) => {
    setDestSelected(value)
  }

  let map;
  let crd;
  let dir;

  const mapRef = useRef()
  useEffect(() => {
      mapRef.current.id = 'map';
      //map = new window.MapmyIndia.Map('map', { center: [28.61, 77.23], zoomControl: true, hybrid: true, search: true, location: true });
  })

  const icon = window.L.icon({iconUrl : 'https://cdn-icons-png.flaticon.com/512/5193/5193688.png', iconSize : [30, 30] });

  const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
  };

  function success(pos) {
    crd = pos.coords;
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
        leaf.marker(new leaf.LatLng(lat, long), {icon: icon,}).addTo(map);
      }
    })
    .catch((err) => console.log(err))
  }

  function err(e){
    console.log(e);
  }

  //navigator.geolocation.getCurrentPosition(success, err, options);
  const handleCheckout = () => {
    axios.post("http://localhost:7070/api/v1/create-checkout",{price:100000, qty:2}).then(response => {
      console.log(response.data);
      window.location.href = response.data;
      
    })
  }

  const testCallback = (elocObj) =>{
    console.log(elocObj, crd)
    dir = window.MapmyIndia.direction({map:map,start:`${crd.latitude},${crd.longitude}`,end:{label:elocObj.label,geoposition:elocObj.eloc}});
  }

  const renderTooltip = () => {
    <Tooltip id="button-tooltip">
      Please
    </Tooltip>
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
                                <SourcePlacesSearch changeSourceSelected = {changeSourceSelected}/>
                                <DestinationPlacesSearch changeDestSelected = {changeDestSelected} testCallback = {testCallback}/>
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
                            <input name="select" type={'radio'} value={option.value} key={index} id={`option-${index+1}`} onChange={() => {setModelSelected(true)}} />
                            <label htmlFor={`option-${index+1}`} className={`option option-${index+1}`}>
                              <span>{option.label}</span>
                            </label>
                          </>
                        )}
                      </div>
                      <Card style={{marginBottom : '1em'}}>
                        <Card.Body>
                          <Card.Title>360 Rs.</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">Test Payment</Card.Subtitle>
                          {/* <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                          >
                            <Button style ={{width : '100%', margin : '0px', fontSize : '18px'}} disabled = {(sourceSelected && destSelected && modelSelected) ? false : true} onClick={handleCheckout}>Pay and Book</Button>
                          </OverlayTrigger> */}
                          {
                            (sourceSelected && destSelected && modelSelected) ?
                              <Button style ={{width : '100%', margin : '0px', fontSize : '18px'}} onClick={handleCheckout}>Pay and Book</Button>
                            :
                              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Select All the Required Fields to Book</Tooltip>}>
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

export default Db