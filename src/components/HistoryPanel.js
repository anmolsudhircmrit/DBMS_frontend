import React from 'react'
import {Card} from 'react-bootstrap'

function HistoryPanel({props}){
  return (
    <div style = {{borderWidth : '0px', marginLeft : '10px', marginBottom : '10px'}}>
        <Card >
            <Card.Header as = 'h5'>{props.driver_id}</Card.Header>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.license_no}</Card.Subtitle>
                <Card.Text>
                    {props.address}
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
    
  )
}

export default HistoryPanel