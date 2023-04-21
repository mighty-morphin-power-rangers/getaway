import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Box from '@mui/material/Box';

interface TrackingProps {
  id: number;
   habit_createdAt: string;
   
   

}

// This will have charts and a calaneder to see how the following  is going
const Tracking = ({id, habit_createdAt}:TrackingProps) =>{

  const [dates, setDates] = useState<[]>([]);
  console.log(habit_createdAt)
   useEffect(() => {
      {
    axios.get(`habits/updatedon/:${id}`)
      .then(response => {
        console.log(response.data)
setDates(response.data)
      })
      .catch(error => console.error(error));
  }
}, []);

  return (
    <Card>
      {dates && dates.length > 0 && (
        <>
          <Typography variant='h5' component='h2' color='primary' gutterBottom>
            Tracking is open
          </Typography>
          {/* {dates.map(date => (
        <Typography key={date.id} variant="body1" component="p" color="textPrimary">
          {date.updatedAt}
        </Typography>
      ))} */}
        </>
      )}
    </Card>
  );
};

export default Tracking;
