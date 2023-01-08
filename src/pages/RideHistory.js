import React, { useState, useRef, useEffect} from "react";
import SideBar from "../components/Sidebar.js";
import SideBarCollapsed from "../components/SideBarCollapsed.js";
import {Stack} from 'react-bootstrap';
import axios from 'axios';
import HistoryPanel from '../components/HistoryPanel'
import HistoryPlaceHolder from '../components/HistoryPlaceHolder'
import SidebarComp from "../components/SidebarComp.js";

function RideHistory() {
  const [collapsed, setCollapsed] = useState(true);
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(true)
  let count;
  let arr = []
  let username = 'anmol'
  useEffect(  () => {
        axios
        .post('http://localhost:7070/api/v1/dashboard/ridehistory', {username})
        .then((response) => {
            console.log(response.data)
            setResult(response.data)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
        })
  }, [])

  //getHistory()
  return (
    <>
    <div style={{display:'flex',flexDirection:'', height : '100vh', width : '99vw', padding : 0,margin : 0}}>
      {/* {collapsed? <SideBarCollapsed/> : <SideBar/>} */}
      <SidebarComp/>
      <div style = {{display : 'inline', overflow : 'scroll', maxHeight : '100%', width : '100%', margin : '1em', alignText : 'centre'}}>
        {loading ? <HistoryPlaceHolder/> : <>
            {result.length > 0 && result.map((historyElem, index) => <HistoryPanel key={index} props = {historyElem}/>)}
          </>
        }
      </div>
    </div>
    </>
  );
}

export default RideHistory;