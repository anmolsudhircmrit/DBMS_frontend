import React from 'react'
import { Button } from 'react-bootstrap'
import SidebarComp from '../components/SidebarComp'
import { Link } from 'react-router-dom'

function Accout({authentication}) {
  return (
    <div style={{display:'flex',flexDirection:'', height : '100vh', width : '99vw', padding : 0,margin : 0}} >
        <SidebarComp/>
        <div>
            <Link to='/'>
                <Button onClick={() => {console.log('button clicked');authentication(false)}}>
                    LogOut
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default Accout