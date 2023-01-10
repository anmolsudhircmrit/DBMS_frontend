import React from 'react'
import {Card} from 'react-bootstrap'

function HistoryPanel({props}){
    let dateTime = props.date_time;
    console.log(props.date_time)
    let dt = dateTime.split('T')
    let date = dt[0]
    let t = dt[1].split('Z')
    let time = t[0]
  return (
    <div style = {{borderWidth : '0px', marginLeft : '10px', marginBottom : '10px'}}>
        <Card >
            <Card.Header style={{fontSize : '30px'}} as = 'h5'>Date : {date}</Card.Header>
            <Card.Body>

                <Card.Title>Vehicle ID : { props.vehicle_id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.license_no}</Card.Subtitle>
                <Card.Text>
                    Source Coordinates : {props.source_loc}
                </Card.Text>
                <Card.Text>
                    Destination : {props.destination_loc}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
    
  )
}

export default HistoryPanel