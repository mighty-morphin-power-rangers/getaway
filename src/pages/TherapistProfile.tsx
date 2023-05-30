import React from "react";
import Button from '@mui/material/Button';
import { useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import BookNowButton from '../components/BookNowButton';
import dayjs from 'dayjs';
import Footer from '../components/Footer'


const TherapistProfile = () =>{

const location = useLocation();
const { therapist } = location.state

const  [appointment, setAppointment ]:any = useState(null)
// console.log(appointment)


  return(
<div style={{padding:"200px", backgroundColor:"#8989ba"}}>

<div style={{display:'flex', flexDirection: "column", alignItems: "center", marginTop:"60px", color:"white"}}>
  <img src={therapist.photoURL} style={{borderRadius: "50%", width: "300px", height: "300px"}} />
  <h1 style={{textAlign: "center", fontSize:"40px"}}>{therapist.name}, {therapist.licenseType}</h1>
  <h2>{therapist.skills}</h2>
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
    <h3>ABOUT ME</h3>
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
<h3>PROFESSIONAL EXPERIENCE</h3>
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
<h3>LICENSE INFORMATION</h3>
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
    <h3>REVIEWS</h3>
{therapist.TherapistReviews.map((review:any)=>{
return (
  <div>
    <h6>{review.rating}</h6>
    <p>{review.date}</p>
    <p>{review.text}</p>

  </div>
)
})}

  </div>

<Footer></Footer>

</div>


  )
}

export default TherapistProfile;