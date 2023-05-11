import axios from "axios";
import { useEffect, useState} from 'react'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import  Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import  IconButton  from "@mui/material/IconButton";
import Favorite from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';

const Staff = (props:any) =>{

const { therapist, handleOpen } = props;





return (
  <Card sx={{ maxWidth: 345, backgroundColor:'#D1A1C0' }} onClick={()=>handleOpen(therapist)}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="200"
        image={therapist.photoURL}
        alt="therapist icon"
        style={{ width: "100%", alignItems: "center", justifyContent: "center", padding:"20px", borderRadius:"20%"}}
      />
    <IconButton
  aria-label="therapists"
  size="medium"
  color="primary"
  sx={{
    position: 'absolute',
    zIndex: 2,
    borderRadius: '50%',
    right: '1rem',
    bottom: 0,
    transform: 'translateY(50%)',
  }}
>

</IconButton>
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {therapist.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {therapist.licenseType}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          {therapist.skills}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          {therapist.yearsExp} Years of Experience
        </Typography>

      </CardContent>
    </CardActionArea>
    <CardActions>
    <Typography variant="body2" color="text.secondary">
        5
      </Typography>
      <Rating name="read-only" value= {5} readOnly />
    </CardActions>
  </Card>
);


};


export default Staff;