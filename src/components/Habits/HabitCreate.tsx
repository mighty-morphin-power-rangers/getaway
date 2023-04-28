import React, { useState, useEffect, useContext } from 'react';

import Typography from '@mui/material/Typography';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import { UserContext, UserContextType } from '../../App';
import Habits from '../../pages/Habits';
interface HabitsCreate {

  handleCreate: ( ) => void;
}
type Option = {
  type: string;
};

// This will have charts and a calaneder to see how the following  is going
const HabitCreate = ({handleCreate}: HabitsCreate ) =>{
  const { userName, userId }: UserContextType = useContext(UserContext) ?? { userName: null, userId: null };;

const types:Option[] = [
  {
    type: "Exercise"
  }, {
    type: "Eating"
  }, {
    type: "Focus"
  }, {
    type: "Choices"
  }
]

  const [newHabit, setNewHabit] = useState<string>('');
  const [type, setType] = useState<string>(types[0].type);

const onCreate = (): void => {
    const data = {
      habit_name: newHabit,
      googleId: userId?.toString(),
      habit_type: type,
    };
    axios
      .post('habits/newHabit', { data })
      .then((response) => {
        handleCreate()

      })
      .catch((error) => {
        console.log(error);
      });
    setType(types[0].type);
    setNewHabit('');
  };



  return (
<div style={{ display: 'inline-block', margin: '10px', height: '400px', width: '200px' }}>
  <Card sx={{ borderRadius: 0, backgroundColor: '#CCD7FF', padding: '20px' }}>
    <TextField
      required
      id='outlined-required'
      label='Required'
      helperText='Enter Tracking'
      value={newHabit}
      onChange={(event) => setNewHabit(event.target.value)}
      style={{ marginTop: '10px', marginBottom: '10px', width: '100%' }}
     
    />
    <TextField
      id='outlined-select-currency'
      select
      label='Select'
      onChange={(event) => setType(event.target.value)}
      value={type}
      helperText='Please select activity type'
      style={{ marginTop: '10px', marginBottom: '10px', width: '100%' }}
 
    >
      {types.map((option: Option) => (
        <MenuItem key={option.type} value={option.type}>
          {option.type}
        </MenuItem>
      ))}
    </TextField>
    <Button variant='contained' color='primary' style={{ marginTop: '10px', width: '100%' }} onClick={onCreate}>
      Create Habit
    </Button>
  </Card>
</div>

  );
};

export default HabitCreate;
