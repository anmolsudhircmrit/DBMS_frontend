import React from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import {Card, Image} from 'react-bootstrap' 
import { Link } from 'react-router-dom';
import REJECT from '../assets/images/cancel.png'

function OrderFailure() {
  return (
    <div style={{display : 'flex', alignItems : 'center', justifyContent : 'center'}}>
        <Card style={{margin : '1em', width : '25%', borderColor : 'red !important'}}>
            <Card.Header as = 'h5' style={{alignItems : 'center'}}>
                    <span>Ride Booking Failed</span>
                    <Image src = {REJECT} style = {{height : '50px', width : '50px', marginLeft : '20px'}}></Image>
            </Card.Header>
            <Card.Body>
                {/* <Card.Title>{props.name}</Card.Title> */}
                <Card.Subtitle className="mb-2 text-muted">Payment Error!</Card.Subtitle>
                {/* <Card.Text>
                    {props.address}
                </Card.Text> */}
                <Link to='/'>
                    <Button style = {{marginLeft : '0px'}}>
                        Continue To Home
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    </div>
  )
}

export default OrderFailure