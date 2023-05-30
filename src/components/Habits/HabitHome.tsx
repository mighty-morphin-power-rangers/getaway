import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Box from '@mui/material/Box';
import { UserContext, UserContextType } from '../../App';
import Grid from '@mui/material/Grid';
// interface HabitHomeProps {
//   id: number;
//    habit_createdAt: string;
   
   interface Habits {
  id: number;
  habit_type: string;
  habit_name: string;
  habit_createdAt: string;
}

// }

// This will have charts and a calaneder to see how the following  is going
const HabitHome = ({habit_name, habit_createdAt,habit_type, id}:Habits) =>{


 const [dates, setDates] = useState<[]>([]);
  // console.log(habit_createdAt)
   useEffect(() => {
      {
    axios.get(`habits/updatedon/:${id}`)
      .then(response => {
        // console.log(response.data)
setDates(response.data)
      })
      .catch(error => console.error(error));
  }
}, []);

  function renderImage(value: number) {
   if (value === 0) {
      return <img src="https://i.ibb.co/zbPYkrV/1.png" alt="Image 1" width="100" />;
    } else if (value === 1) {
      return <img src="https://i.ibb.co/9yJBt9L/2.png" alt="2" width="100" />;
    } else if (value === 2) {
      return <img src="https://i.ibb.co/8Dftqnw/3.png" alt="3" width="100" />;
    } else if (value === 3) {
      return <img src="https://i.ibb.co/R6Ss7mH/4.png" alt="4" width="100" />;
    } else if (value === 4) {
      return <img src="https://i.ibb.co/rxc7Nnz/5.png" alt="5" width="100" />;
    } else if (value > 4) {
      return <img src="https://i.ibb.co/bgVBqhQ/6.png" alt="6" width="100" />;
    } else {
      return null;
    }
  }
// console.log(dates)
  return (
       <Grid item xs={6} sm={6} md={6} lg={6}>
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '300px',
          backgroundColor: 'rgba(255, 0, 0, .5)',
          color: 'white',
          borderRadius: '10px',
          margin: '10px',
          letterSpacing: 'normal',
           width: '300px',
            fontSize:"30px",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(200,0, 0, .5)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,0, 0, .5)')}
      >
        <CardContent >
          {habit_name}
          <div
            title={`You have ${
              dates.length > 0 ? `completed this ${dates.length} ${dates.length > 1 ? 'times' : 'time'}` : 'never completed this'
            }`}
          >
            {renderImage(dates.length)}
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default HabitHome;
