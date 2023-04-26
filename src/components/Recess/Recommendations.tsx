import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import axios from 'axios';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';

interface RecommendProps {
  id: number;
  habit_name: string;
  habit_type: string;
  userId: string | null;
  habit_createdAt: string;
  onDelete: () => void;
}

const Recommend = ({
  id,
  habit_name,
  habit_type,
  userId,
  habit_createdAt,
  onDelete,
}: RecommendProps) => {

   const [dates, setDates] = useState<[]>([]);
 let [completed, setCompleted] = useState(1);

 useEffect(() => {
    axios
      .get(`recommend/updatedon/:${id}`)
      .then((response) => {
        console.log(response.data);
        setDates(response.data);
      })
      .catch((error) => console.error(error));
  }, [completed]);



  const handleComplete = () => {
    axios
      .post('/recommend/completed', {
        data: {
          habit: id,
          user: userId,
        },
      })
        .then((response) => {
        console.log(response.data);
        setCompleted(completed+1);
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = () => {
    axios
      .delete('/recommend/delete', {
        data: {
          habitId: id,
        },
      })
      .then((response) => {
        console.log(response.data);
        onDelete();
      })
      .catch((error) => console.error(error));
  };



  return (
    <div style={{ display: 'inline-block', margin: '10px' }} >
      <Card sx={{ borderRadius: '10px', backgroundColor: 'rgba(255, 0, 0, 0.5)', padding: '20px', height: '420px', width: '220px' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(200,0, 0, .5)'}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0.5)'}
  >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {habit_name}
          </Typography>
          <Typography variant="h5" component="div">
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
         boop
          </Typography>
          <Typography variant="body2">
            
          </Typography>
          <Typography variant="body2">
            <Button variant="outlined" onClick={handleComplete} startIcon={<DeleteIcon />}>
        complete
      </Button>
          <Button variant="outlined" onClick={handleDelete} startIcon={<DeleteIcon />}>
        delete
      </Button>
          </Typography>
        </CardContent>
        <CardActions>
         
        </CardActions>
      </Card>

    </div>
  )
}

export default Recommend;