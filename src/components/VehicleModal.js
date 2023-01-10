import React from 'react'
import { Modal, Button } from 'react-bootstrap';

function VehicleModal(props) {
    const optionArray = [{label:'Any', value:'any'}, {label:'Auto', value:'auto'}, {label:'SUV', value:'suv'}, {label:'HatchBack', value:'hatchback'}, {label:'Sedan', value:'sedan'}]
  return (
    <Modal
      //show = {show}
      {...props}
      //style = {{height : '100%', width : '15%'}}
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
      <Modal.Body style={{height : '100%'}}>
        <div className="wrapper">
            {optionArray.map((option,index) => <>
                <input name="select" type={'radio'} value={option.value} key={index} id={`option-${index+1}`} onChange={(e) => { console.log(e);props.handelModelChange(e); props.onHide()}} />
                <label htmlFor={`option-${index+1}`} className={`option option-${index+1}`}>
                              <span>{option.label}</span>
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