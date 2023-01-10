import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Dashboard from './Dashboard.js'
import DashboardInSession from '../components/DashboardInSession.js'
import { Spinner } from 'react-bootstrap'
import DashBoardNew from './DashBoardNew.js'

function DashBoardComp() {
    const [inSession, setInSession] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        let username = localStorage.getItem('username')
        axios.post('http://localhost:7070/api/v1/getsession', {username})
        .then((response) => {
            console.log("Response session :")
            console.log(response.data)
            let insess = JSON.parse(response.data)
            if(insess){
                setInSession(true)
            }
            else{
                setInSession(false)
            }
            setIsLoading(false)
        })
    })
  return (
    <div>{
            isLoading ? <div style={{display : 'flex', height : '100%', width : '100%', justifyContent : 'center', alignItems : 'center', alignContent : 'center'}}>
                <Spinner animation="border" variant='primary' style={{ marginTop : '20em'}}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div> 
            : (inSession ? <DashboardInSession/> : <DashBoardNew/> )
        }
    </div>
  )
}

export default DashBoardComp