import React from "react";

import { Col, Image, NavLink } from "react-bootstrap";
import {AiOutlineUser} from 'react-icons/ai'
import HISTORY_ICON from '../assets/images/history.svg';
import SETTINGS_ICON from  '../assets/images/settings.svg'
import PERSON_ICON from '../assets/images/person.svg'
import RIDEB_ICON from '../assets/images/directionscar.svg'
import RIDEH_ICON from '../assets/images/ridehistory.svg'





export default function SideBarCollapsed() {

  return (

    <Col className="side-menu-collapsed">

      <div className="mb-4 ml-4">

        <Image className="navlink-image-profile" src='https://avatars.dicebear.com/api/big-smile/101.svg' style = {{marginTop : '1em'}}/>

        {/* <span className="ml-4 mt-4 font-25 position-absolute" style={{marginBottom : '1em'}}>

          Hello, <strong>Tony</strong>

        </span> */}

      </div>

      <hr className="my-4" />




      <nav className="flex-column nav">

        <NavLink

          style={{ marginTop: 0 }}

          className="nav-link position-relative"

          to="discover"

        >

          <Image className="navlink-imageC" src={RIDEB_ICON} style = {{marginTop : '0.5em', height : '40px', width : '40px'}} />

          {/* <span className="ml-4 mt-3 position-absolute">Ride Booking</span> */}

        </NavLink>

        <NavLink

          style={{ marginTop: 30 }}

          className="nav-link position-relative mb-"

          to="discover"

        >

          <Image className="navlink-imageC" src={RIDEH_ICON}  style = {{marginTop : '0.5em', height : '40px', width : '40px'}}/>

          {/* <span className="ml-4 mt-3 position-absolute">Ride History</span> */}

        </NavLink>




        {/* <NavLink

          style={{ marginTop: 30 }}

          className="nav-link position-relative mb-"

          to="discover"

        >

          <Image className="navlink-image " src={HISTORY_ICON} />

          <span className="ml-4 mt-3 position-absolute">Your Orders</span>

        </NavLink> */}

        {/* <NavLink

          style={{ marginTop: '15.5em', marginBottom : 0}}

          className="nav-link position-relative"

          to="discover"

        >

          <Image className="navlink-image " src={RIDEB_ICON} />

          <span className="ml-4 mt-3 position-absolute">Ride Booking</span>

        </NavLink> */}


        <NavLink

          style={{ marginTop: 320 }}

          className="nav-link mb-4"

          to="discover"

        >

          <Image className="navlink-image " src={SETTINGS_ICON} />

          {/* <span className="ml-4 mt-3 position-absolute">Account Settings</span> */}

        </NavLink>

      </nav>

    </Col>

  );

}