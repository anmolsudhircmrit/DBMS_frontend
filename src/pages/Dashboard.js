import React, { useState, useRef, useEffect} from "react";
import SideBar from "../components/Sidebar.js";
import SideBarCollapsed from "../components/SideBarCollapsed.js"
import { Radio } from 'antd';
import {Button} from 'react-bootstrap'
//import Map from "../components/Map.js"
import DestinationPlacesSearch from'../components/DestinationPlaceSearch.js'
import SourcePlacesSearch from '../components/SourcePlacesSearch.js'

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  let map;
  let crd;
  let dir;

  const mapRef = useRef()
  useEffect(() => {
      mapRef.current.id = 'map';
      map = new window.MapmyIndia.Map('map', { center: [28.61, 77.23], zoomControl: true, hybrid: true, search: true, location: true });
  })

  const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
  };

  function success(pos) {
    crd = pos.coords;
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
        
    map.panTo(window.L.latLng(crd.latitude, crd.longitude))
    window.L.marker([crd.latitude, crd.longitude]).addTo(map);
  }

  function err(e){
    console.log(e);
  }

  navigator.geolocation.getCurrentPosition(success, err, options);

  const testCallback = (elocObj) =>{
    console.log(elocObj, crd)
    dir = window.MapmyIndia.direction({map:map,start:`${crd.latitude},${crd.longitude}`,end:{label:elocObj.label,geoposition:elocObj.eloc}});
  }

  return (
    <>
    <div style={{display:'flex',flexDirection:'', height : '100vh', width : '99vw', padding : 0,margin : 0}}>
    {collapsed? <SideBarCollapsed/> : <SideBar/>}
    <div style = {{height : '100vh', width : collapsed ? '12px' : '20px', background : '#D2D2D2', cursor : 'pointer', borderRadius : '0.5em'}} onClick = {() => setCollapsed(!collapsed)}/>
    {/* </div> */}
      <div style = {{display : 'inline', height : '33em', width : '100%', margin : '1em', alignText : 'centre'}}>
        <div style = {{display : 'flex'}}>
          <SourcePlacesSearch/>
          <DestinationPlacesSearch testCallback = {testCallback}/>
        </div>
        {/* <Map/> */}
        <div ref =  {mapRef} style = {{display : 'flex', height : '100%', width : '100%', background : 'grey', borderRadius : '1em'}}>
        </div>
        {/*'#eaeaea'*/}
        <div className = 'panel' style = {{ background : '#eaeaea', height : '30%', width : '99%', margin : '0.5em', borderRadius : '1em', color : 'white'}}>
          {/* <div style = {{display : 'flex', alignItems : 'flex-start', justifyContents : 'center'}}> */}
            <div class="wrapper">
              <input type="radio" name="select" id="option-1" checked/>
              <input type="radio" name="select" id="option-2"/>
              <label for="option-1" class="option option-1">
                <div class="dot"></div>
                <span>Any</span>
              </label>
              <label for="option-2" class="option option-2">
                <div class="dot"></div>
                <span>Auto</span>
              </label>
            </div>
          {/* </div> */}
          <Button variant="primary" size = 'lg' style = {{position : 'absolute', bottom : '1em', right : '0.8em', float : 'right !important'}}>Pay and Book</Button>{' '}
        </div>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
