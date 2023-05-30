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

const Therapist = (props:
  {therapist:
    {name:string, vicinity:string, opening_hours:{open_now:boolean}, rating:number, place_id:string},
    handleOpen:Function}) =>{

const { therapist, handleOpen } = props;


const images = [
  "https://i.imgur.com/SaBB5aW.png",
  "https://i.imgur.com/rrFY6ZP.png",
  "https://i.imgur.com/wEiGuBG.png",
  "https://i.imgur.com/oCey8XD.png",
  "https://i.imgur.com/1XLIhRM.png"
];
const randomNumber = Math.floor(Math.random() * 5)

return (
  <Card sx={{ maxWidth: 345, height:400, backgroundColor:'#D1A1C0' }} onClick={()=>handleOpen(therapist)}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="250px"
        image={images[randomNumber]}
        alt="therapist icon"
        style={{ width: "75%", display: "flex", alignItems: "center"}}
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
        <Typography sx={{color:"white"}}gutterBottom variant="body1" component="div">
          {therapist.name}
        </Typography>
        {therapist.opening_hours?  <Typography variant="body2" color="text.secondary">
          {therapist.opening_hours.open_now ? "Open" : "Closed"}
        </Typography> : "No Hours Available"}

      </CardContent>
    </CardActionArea>
    <CardActions>
    <Typography variant="body2" color="text.secondary">
        {therapist.rating}
      </Typography>
      <Rating name="read-only" value={therapist.rating} readOnly />
    </CardActions>
  </Card>
);


};


export default Therapist;