import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import {Card, Image} from 'react-bootstrap' 
import { Link } from 'react-router-dom';
import CHECKED from '../assets/images/checked.png'
//import REJECT from '../assets/images/cancel.png'

function OrderSuccess() {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        // get the order data from storage and set the payment as completed or paid
        // send a post api request to backend to save the order data
        let data = localStorage.getItem('data')
        let username = localStorage.getItem('username')
        axios.post('http://localhost:7070/api/v1/confirmride', {data, username})
        .then((response) => {
            if(response.data){
                setLoading(false)
            }
        })
        .catch((err) => console.log(err))
        // setTimeout(() => {
        //     setLoading(false)
        // }, 6000)
    },[]);
  return (
    <div style={{display : 'flex', alignItems : 'center', justifyContent : 'center'}}>
        <Card style={{margin : '1em', width : '25%', borderColor : 'green !important'}}>
            <Card.Header as = 'h5' style={{alignItems : 'center'}}>
                    <span>Ride Booking Successful</span>
                    <Image src = {CHECKED} style = {{height : '50px', width : '50px', marginLeft : '20px'}}></Image>
            </Card.Header>
            <Card.Body>
                {/* <Card.Title>{props.name}</Card.Title> */}
                <Card.Subtitle className="mb-2 text-muted">Ride is on the way!</Card.Subtitle>
                {/* <Card.Text>
                    {props.address}
                </Card.Text> */}
                <Link to='/'>
                    <Button disabled = {loading} style = {{marginLeft : '0px'}}>
                        {loading ? 'Wait a Minute..' : 'Continue to Home'}
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    </div>
  )
}

export default OrderSuccess