import React from "react";
import {Link} from 'react-router-dom'
import { Col, Image, NavLink } from "react-bootstrap";
import SETTINGS_ICON from  '../assets/images/settings.svg'
import RIDEB_ICON from '../assets/images/directionscar.svg'
import RIDEH_ICON from '../assets/images/ridehistory.svg'





export default function SideMenu() {

  return (
    <div className="sidebarfinal">
    <Col className="side-menu">

      <div>

        <Image className="navlink-image-profile" src='https://avatars.dicebear.com/api/big-smile/101.svg' />

        <span className="ml-4 mt-4 font-25 position-absolute" style={{marginBottom : '1em'}}>

          Hello, <strong>{localStorage.getItem('uname')}</strong>

        </span>

      </div>

      <hr className="my-4" />




      <nav className="flex-column nav">
        <Link

          style={{ marginTop: 0 }}

          className="nav-link position-relative"

          to="/"

        >

          <Image className="navlink-image " src={RIDEB_ICON} />

          <span className="ml-4 mt-3 position-absolute blue-back">Ride Booking</span>

        </Link>

        <Link

          style={{ marginTop: 30 }}

          className="nav-link position-relative mb-"

          to="/ridehistory"

        >

          <Image className="navlink-image " src={RIDEH_ICON} />

          <span className="ml-4 mt-3 position-absolute blue-back">Ride History</span>

        </Link>

        {/* <NavLink

          style={{ marginTop: '15.5em', marginBottom : 0}}

          className="nav-link position-relative"

          to="discover"

        >

          <Image className="navlink-image " src={RIDEB_ICON} />

          <span className="ml-4 mt-3 position-absolute blue-back">Ride Booking</span>

        </NavLink> */}


        <Link

          style={{ marginTop: 320 }}

          className="nav-link mb-4"

          to="/account"

        >

          <Image className="navlink-image " src={SETTINGS_ICON} />

          <span className="ml-4 mt-3 position-absolute blue-back">User Account</span>
        </Link>

      </nav>

    </Col>
    </div>
  );

}
