import React, { useState, useEffect, useContext } from 'react';
// import Recommend from '../components/Recess/Recommendations'
import { UserContext, UserContextType } from '../App';

import Footer from '../components/Footer'

import ScrollWall from  '../components/Recess/ScrollWall'

const Recess = () =>{


return (
 <div style={{background: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)"}}>
    <div style={{marginTop: '80px', textAlign:"center", display: "flex", flexDirection: "column", alignItems: "center",    fontSize:"20px",
    color: "white",
    textShadow: "2px #000000",
    padding: '5%'}}>
    <h3 style={{marginTop:"300px", fontSize:"70px",}}>recess</h3>
    <img src="https://i.ibb.co/fShgM1X/Sandy-Bus-32-Single-11.png" style={{height: '400px', width: '400px'}}></img>
    <p style={{width:'50%'}}>
     "By exploring new activities and hobbies, you can take small steps towards better mental health and discover a whole world of possibilities you never knew existed."

    </p>
        <style>
    {`
    ::-webkit-scrollbar {
      width: 10px;
      margin-right: 10px; /* Add margin to the right */
      margin-left: 10px; /* Add margin to the right */
      padding:30px;
    }
    ::-webkit-scrollbar-track {
      background-color: #9BB6FD;
      border-radies:30px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #7C92CB;
      border-radius:30px;
    }
    `}
  </style>
    <div
    style={{
      borderRadius:'40px',
      margin:'60px auto',
      color: '#5C6B9E',
      backgroundColor:'#5C6B9E',
      width: '70%',
      height: '7px',
      textAlign:'center',
      marginBottom: '60px'
    }}
  />
 
    <div
      style={{
        width: '80%',
        margin: '0 auto',
        border: '1px solid #ddd',
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      <ScrollWall />
    </div>
  </div>
  <Footer></Footer>
  </div>
);
  }

  export default Recess;