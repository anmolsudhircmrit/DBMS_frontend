import 'bootstrap/dist/css/bootstrap.css'
import React, {useState} from 'react'
import './styles/styles.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import SignIn from './pages/SignIn';
import RideHistory from './pages/RideHistory.js'
import Db from './components/Db.js'
import Dashboard from './pages/Dashboard.js'
import DashBoardComp from './pages/DashBoardComp';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import OrderSuccess from './pages/OrderSuccess';
import OrderFailure from './pages/OrederFailure';
import Accout from './pages/Accout';
import VehicleModal from './components/VehicleModal';
import DashBoardNew from './pages/DashBoardNew';

function App() {
  //let isAuthenticated = localStorage.getItem('isAuthenticated');
  const [isAuthenticated, setisAuthenticated] = useState(JSON.parse(localStorage.getItem('isAuthenticated')));
    const authentication = (val) => {
      localStorage.setItem('isAuthenticated', val)
      setisAuthenticated(JSON.parse(localStorage.getItem('isAuthenticated')))
    }

    const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <DashBoardComp/>: <SignIn authentication={authentication}/>,
    },
    {
      path: "ridehistory",
      element: isAuthenticated ? <RideHistory /> : <div>404 Not Found</div>,
    },
    {
      path : "account",
      element : isAuthenticated ? <Accout authentication={authentication}/> : <div>404 Not Found</div>,
    },
    {
      path: '/booking/success',
      element: isAuthenticated ? <OrderSuccess/> : <div>404 Not Found</div>
    },
    {
      path: '/booking/faliure',
      element: isAuthenticated ? <OrderFailure/> : <div>404 Not Found</div>
    }
  ]);
  return (
    <RouterProvider router={
      router
    }/>
  );
}

export default App;

//"https://atlas.mapmyindia.com/",