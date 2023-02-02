import React from 'react'
import {Card, Image, Row, Col} from 'react-bootstrap'
import ICON_SOURCE from '../assets/images/pinGreen.png'
import ICON_DEST from '../assets/images/pinRed.png'
import ICON_MONEY from '../assets/images/rupee.png'
import AUTO from '../assets/images/rickshaw.png'
import SEDAN from '../assets/images/sedan.png'
import SUV from '../assets/images/suv.png'
import HATCHBACK from '../assets/images/car.png'

function HistoryPanel({props}){
    let arr = [{type : AUTO, model : 'Auto'}, {type : SEDAN, model : 'Sedan'}, {type : SUV, model : 'SUV'}, {type : HATCHBACK, model : 'Hatchback'}]
    let dateTime = props.date_time;
    //console.log(props.date_time)
    let dt = dateTime.split('T')
    let date = dt[0]
    let numberPlate = JSON.stringify(props.number_plate).toUpperCase()
    let model1 = arr.find((o) => o.model == props.model)
  return (
    <div style = {{borderWidth : '0px', marginLeft : '10px', marginBottom : '50px'}}>
        <Card >
            <Card.Header style={{fontSize : '30px', fontWeight : '900'}} as = 'h5'>
                <div style={{borderRadius : '1em',  width : '25%', paddingLeft : '0.6em', color : '#5e5e5e'}}>Date : {date}</div>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col xs = {8}>
                        <Card.Title style ={{marginLeft : '1em'}}>Vehicle ID : {props.vehicle_id}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted" style ={{marginLeft : '1.2em', marginBottom : '0.5em', fontWeight : '800'}}>{JSON.parse(numberPlate)}</Card.Subtitle>
                        <div>
                            <Card.Text style = {{margin : '20px'}}>
                                <Image src={ICON_SOURCE} style = {{height : '25px', width : '25px', marginBottom : '4px', marginRight : '8px'}}></Image>
                                <span style={{color : 'green', fontWeight : '600'}}>Source :</span> {props.source_loc}
                            </Card.Text>
                        </div>
                        <Card.Text style = {{margin : '20px'}}>
                            <Image src={ICON_DEST} style = {{height : '25px', width : '25px', marginBottom : '4px', marginRight : '8px'}}></Image>
                            <span style={{color : 'red', fontWeight : '600'}}>Destination :</span> {props.destination_loc}
                        </Card.Text>
                        <Card.Text style = {{margin : '20px'}}>
                            <Image src={ICON_MONEY} style = {{height : '20px', width : '20px', marginBottom : '4px', marginRight : '10px', marginLeft : '4px'}}></Image>
                            <span style={{color : '#1677ff', fontWeight : '600', }}>Cost :</span><span style={{marginLeft : '5px'}}>₹</span>{props.cost}
                        </Card.Text>
                    </Col>
                    <Col style={{display : 'flex', alignItems : 'center', justifyContent : 'flex-end'}}>
                        <Image src={model1.type} style = {{height : '95px', width : '95px', marginBottom : '4px', marginRight : '8px'}}></Image>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </div>
    
  )
}

export default HistoryPanel