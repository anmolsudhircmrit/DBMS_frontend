// import React, {useState} from 'react'
// import SideBarCollapsed from './SideBarCollapsed'
// import SideBar from './Sidebar'

// function SidebarComp() {
//     const [isHovered, setIsHovered] = useState(false)
//   return (
//     <div onMouseEnter={setIsHovered(!isHovered)} onMouseLeave = {setIsHovered(!isHovered)}>
//         {isHovered ? <SideBar/> : <SideBarCollapsed/>}
//     </div>
//   )
// }

// export default SidebarComp

import React, { Component } from 'react'
import SideBarCollapsed from './SideBarCollapsed';
import SideBar from './Sidebar'

export default class SidebarComp extends Component {
    constructor() {
        super();
        this.state = {isHovered: false};
        //this.toggleHover = this.toggleHover.bind(this);
        this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
        this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
    }

    onMouseEnterHandler() {
        this.setState({
            isHovered: true
        });
    }

    onMouseLeaveHandler() {
        this.setState({
            isHovered: false
        });
    }

    
    render() {
        return (
            <div className='sidebar1' onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>
                {this.state.isHovered ? <SideBar/> : <SideBarCollapsed/>}
            </div>
        )
  }
}
