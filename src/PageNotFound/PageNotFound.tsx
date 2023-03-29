import {createTheme,  } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './Pagenot.css'


const mdTheme = createTheme();
// var data = localStorage.getItem('access_token')
export default function PageNotFound() {
    const navigate = useNavigate();
    const goToHome=()=>{
            navigate("/dashboard");
    }
 
  return (
  <>
   <div id="oopss">
        <div id="error-text">
          <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg"  />
          <span>404 PAGE</span>
          <p className="p-a">
            . The page you were looking for could not be found</p>
          <p className="p-b">
            ... Back to Home Page
          </p>
          <a  className="back" onClick={goToHome} style={{cursor: 'pointer'}}>... Back to Home Page</a>
        </div>
      </div></>
  );
}
