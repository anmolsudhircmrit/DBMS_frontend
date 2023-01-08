import 'bootstrap/dist/css/bootstrap.css'
import React, {useState} from 'react'
import './styles/styles.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import SignIn from './pages/SignIn';
import RideHistory from './pages/RideHistory.js'
import Db from './components/Db.js'
import Dashboard from './pages/Dashboard.js'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import OrderSuccess from './pages/OrderSuccess';
import OrderFailure from './pages/OrederFailure';
import Accout from './pages/Accout';

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
      element: isAuthenticated ? <Dashboard/>: <SignIn authentication={authentication}/>,
    },
    {
      path: "ridehistory",
      element: <RideHistory />,
    },
    {
      path : "account",
      element : <Accout authentication={authentication}/>,
    },
    {
      path: '/booking/success',
      element: <OrderSuccess/>
    },
    {
      path: '/booking/faliure',
      element: <OrderFailure/>
    }
  ]);
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path = "/" element = {isAuthenticated ? <Db/> : <SignIn authentication = {authentication}/>}>
    //       <Route path = '/ridehistory' element = {<RideHistory/>}>
    //       </Route>
    //       <Route path='/account' element = {<></>}>
    //       </Route>
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
    //<RideHistory/>
    //<Dashboard/>
    // <Db/>
    <RouterProvider router={
      router
    }/>
  );
}

export default App;

//"https://atlas.mapmyindia.com/",