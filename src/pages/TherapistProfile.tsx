import React from "react";
import Button from '@mui/material/Button';
import { useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import BookNowButton from '../components/BookNowButton';
import dayjs from 'dayjs';
import Footer from '../components/Footer'
import Rating from "@mui/material/Rating";



const TherapistProfile = () =>{

const location = useLocation();
const { therapist } = location.state

const  [appointment, setAppointment ]:any = useState(null)
// console.log(appointment)


  return(
<div style={{padding:"200px", backgroundColor:"#8989ba"}}>

<div style={{display:'flex', flexDirection: "column", alignItems: "center", marginTop:"250px", color:"white"}}>
  <img src={therapist.photoURL} style={{borderRadius: "50%", width: "300px", height: "300px"}} />
  <h1 style={{textAlign: "center", fontSize:"60px"}}>{therapist.name}, {therapist.licenseType}</h1>
  <h2 style={{color:"orange"}}>{therapist.skills}</h2>
  <BookNowButton setAppointment = {setAppointment}/>
  {appointment? <h3>You have an Appointment on {appointment}</h3>: <h2>Book Today</h2>}
</div>

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

  <div style={{padding:'60px', color:"white"}}>
    <h2 style={{fontSize:"40px"}}>ABOUT ME</h2>
    <div></div>
<p>
{therapist.aboutMe}
</p>
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
<h2 style={{fontSize:"40px"}}>PROFESSIONAL EXPERIENCE</h2>
<p>
{therapist.profExp}
</p>
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
<h2 style={{fontSize:"40px"}}>LICENSE INFORMATION</h2>
<p>
{therapist.licInfo}
</p>
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
    <h2 style={{fontSize:"40px"}}>REVIEWS</h2>
{therapist.TherapistReviews.map((review:any)=>{
return (
  <div style={{ backgroundColor: "#FC6E47", display: "inline-block", textAlign: "center", borderRadius:"40px", margin:"10px",boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}>
    <div style={{padding:"15px"}}>
    <Rating name="read-only" value={review.rating} readOnly />
    <h2>{review.date}</h2>
    <h2>{review.text}</h2>
    </div>

  </div>
)
})}

  </div>

<Footer></Footer>

</div>


  )
}

export default TherapistProfile;