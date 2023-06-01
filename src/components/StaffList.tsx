
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import TheraPopUp from './TheraPopUp'
import Staff from "./Staff"
import React from 'react';
import { Link } from 'react-router-dom'



const StaffList = (props:any) => {
const { staff } = props

// console.log("staff", staff)

  const [open, setOpen] = useState(false);
  const [popup, setPopup ] = useState({})




  const handleOpen = (details:object) => {
    setOpen(true);
    setPopup(details)
  };






  return (
    <div style={{ height: '400px', overflow: 'auto' }}>
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
  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {staff.map((therapist:any) => (
         <Grid item key={therapist.place_id} xs={4} sm={4} md={4} lg={4} style={{ width:"250px", height: "350px", overflow: "hidden" }}>
          <Link to="/therapist-profile"  state={{therapist: therapist}} style={{ textDecoration: 'none' }}>
          <Staff key={therapist.place_id} therapist ={therapist} handleOpen={handleOpen} />
          </Link>
          </Grid>
        ))}
        </Grid>
        {/* {open && (
    <Backdrop
      sx={{ color: 'whitesmoke', backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      zIndex: (theme) => theme.zIndex.drawer + 1}}
      open={open}
      onClick={() => setOpen(false)}
    >
      <TheraPopUp popup={popup} />
    </Backdrop>


  )} */}
    </div>
  );
};

export default StaffList;