import React, { useState, useEffect, useContext } from 'react';


import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import { UserContext, UserContextType } from '../../App';

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
  if (newHabit.length > 0){
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
  }
  else {
    alert('You must enter a habit name');
  }
  };



  return (
<div style={{ display: 'inline-block', height: '400px', width: '200px' }}>
  <Card sx={{  backgroundColor: 'rgb(204, 215, 255)', padding: '20px', boxShadow: 'none' }}>
    <TextField
      required
      id='outlined-required'
      label='Required'
      helperText='Enter Habit'
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
    <Button variant='text' color='primary' style={{ marginTop: '10px', width: '100%' }} onClick={onCreate}>
      Create Habit
    </Button>
  </Card>
</div>

  );
};

export default HabitCreate;
