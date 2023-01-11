import React, {useState, useEffect } from 'react'
import AccountComp from '../components/AccountComp'
import axios from 'axios'
import { Spinner } from 'react-bootstrap'

function Accout({authentication}) {
  const [isLoading, setIsLoading] = useState(true)
  const [props, setProps] = useState(null)
  useEffect(() => {
    let username = localStorage.getItem('username')
    axios.post('http://localhost:7070/api/v1/getuserinfo', {username} )
    .then((response) => {
      if(response){
        console.log(response.data[0])
        setProps(response.data[0])
        setIsLoading(false)
      }
    })
  }, [])
  return (
    <div>
      {
        isLoading ? 
          <div style={{display : 'flex', height : '100%', width : '100%', justifyContent : 'center', alignItems : 'center', alignContent : 'center'}}>
                <Spinner animation="border" variant='primary' style={{ marginTop : '20em'}}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div> 
          :  <AccountComp authentication = {authentication} props = {props} />
      }
    </div>
  )
}

export default Accout