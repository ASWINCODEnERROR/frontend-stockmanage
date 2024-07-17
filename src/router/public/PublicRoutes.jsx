import React from 'react'
import {
    Routes,
    Route,
  } from "react-router-dom";
import Login from '../../componets/authpages/Login';
import SignupForm from '../../componets/authpages/SignupForm';


function PublicRoutes() {
  return (
    <div>
       <Routes>
          <Route exact  path="/" element={ <Login/> }></Route>
          <Route exact  path="/register" element={ <SignupForm/> }></Route>
         


          
         
        </Routes>
    </div>
  )
}

export default PublicRoutes
