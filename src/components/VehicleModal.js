import React, {useState} from 'react'
import { Modal, Button, Image } from 'react-bootstrap';
import AUTO from '../assets/images/rickshaw.png'
import SEDAN from '../assets/images/sedan.png'
import SUV from '../assets/images/suv.png'
import HATCHBACK from '../assets/images/car.png'

function VehicleModal(props) {
    const optionArray = [{label:'Any', value:'any', model : undefined}, {label:'Auto', value:'auto', model : AUTO}, {label:'SUV', value:'suv', model : SUV}, {label:'HatchBack', value:'hatchback', model : HATCHBACK}, {label:'Sedan', value:'sedan', model : SEDAN}]
    const [content, setContent] = useState(false)
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop = {true}
    >
      {/* <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body style={{height : '700px', marginBottom : '1em'}}>
        <div className="wrapper">
            {optionArray.map((option,index) => <>
                <input name="select" type={'radio'} value={option.value} key={index} id={`option-${index+1}`} onChange={(e) => { console.log(e);props.handelModelChange(e); props.onHide()}} />
                <label onMouseOver={() => setContent(true)} onMouseLeave={() => setContent(false)} htmlFor={`option-${index+1}`} className={`option option-${index+1}`}>
                              <div>{content ? ( option.model? <Image src={option.model} style ={{height : '100px', width : '100px'}}></Image> : <span>{option.label}</span>) : <span>{option.label}</span>}</div>
                </label>
                </>
            )}
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default VehicleModal