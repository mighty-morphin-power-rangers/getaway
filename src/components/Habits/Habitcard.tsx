import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Tracking from './Tracking';
import axios from 'axios';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import SkateboardingIcon from '@mui/icons-material/Skateboarding';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SpaIcon from '@mui/icons-material/Spa';
import CheckIcon from '@mui/icons-material/Check';
import { Check } from '@mui/icons-material';


interface HabitCardProps {
  id: number;
  habit_name: string;
  habit_type: string;
  userId: string | null;
  habit_createdAt: string;
  onDelete: () => void;
}

const HabitCard = ({
  id,
  habit_name,
  habit_type,
  userId,
  habit_createdAt,
  onDelete,
}: HabitCardProps) => {
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
   const [dates, setDates] = useState<[]>([]);
 let [completed, setCompleted] = useState(1);

 useEffect(() => {
    axios
      .get(`habits/updatedon/:${id}`)
      .then((response) => {
        // console.log(response.data);
        setDates(response.data);
      })
      .catch((error) => console.error(error));
  }, [completed]);


  const openTracking = () => {
    setIsTrackingOpen(!isTrackingOpen);
  };

  const handleComplete = () => {
    axios
      .post('/habits/completed', {
        data: {
          habit: id,
          user: userId,
        },
      })
        .then((response) => {
        // console.log(response.data);
        setCompleted(completed+1);
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = () => {
    axios
      .delete('/habits/delete', {
        data: {
          habitId: id,
        },
      })
      .then((response) => {
        // console.log(response.data);
        onDelete();
      })
      .catch((error) => console.error(error));
  };


  // loops through date count
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

  return (
    <div style={{ display: 'inline-block', margin: '10px' }} >
      <Card sx={{ borderRadius: '10px', backgroundColor: 'rgba(255, 0, 0, 0.5)', padding: '20px',
      //  height: '420px',
        width: '220px' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(200,0, 0, .5)'}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'}
  >
        <CardContent>
             {/* <Button variant="outlined" onClick={handleDelete} startIcon={<DeleteIcon />}>
        delete
      </Button> */}
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {habit_name}
          </Typography>
          <Typography variant="h5" component="div">
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {habit_type}
            {renderImage(dates.length)}
          </Typography>
          <Typography variant="body2">
            
          </Typography>
          <Typography variant="body2">
            <Button variant="outlined" onClick={handleComplete} startIcon={<Check />}>
        complete
      </Button>
          <Button variant="outlined" onClick={handleDelete} startIcon={<DeleteIcon />}>
        delete
      </Button>
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="small" onClick={openTracking}>Tracking</Button> */}
        </CardActions>
      </Card>
{/* 
      {isTrackingOpen && (
        <Tracking  id={id} habit_createdAt={habit_createdAt}  />
      )} */}
    </div>
  )
}

export default HabitCard;