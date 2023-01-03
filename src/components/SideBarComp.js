import React, {useState} from 'react'
import SideBar from './Sidebar.js'
import SideBarCollapsed from './SideBarCollapsed.js'

function SideBarComp() {
    const [collapsed, setcollapsed] = useState(false);
  return (
    <>
        {collapsed ? <SideBarCollapsed/> : <SideBar/>}
    </>
  )
}

export default SideBarComp