import React, { useState, useEffect, useContext } from 'react';
import HabitCard from '../components/Habits/Habitcard';
import HabitCreate from  '../components/Habits/HabitCreate'
import { UserContext, UserContextType } from '../App';
import axios from 'axios';
import { Button } from '@mui/material';
import Popover from '@mui/material/Popover';
import Card from '@mui/material/Card';

interface Habits {
  id: number;
  habit_type: string;
  habit_name: string;
  habit_createdAt: string;
}
type Option = {
  type: string;
};

const Habits = () =>{

  // creates user variables based on context
   const { userName, userId }: UserContextType = useContext(UserContext) ?? { userName: null, userId: null };;
   console.log(userName, userId)
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

  const [habits, setHabits] = useState<Habits[]>([]);
  const [newHabit, setNewHabit] = useState<string>('');
  const [type, setType] = useState<string>(types[0].type);
 const [showHabitCreate, setShowHabitCreate] = useState(false);

  useEffect(() => {
    if (userId) {
      axios
        .post('habits/list', { data: { googleId: userId.toString() } })
        .then((response) => setHabits(response.data))
        .catch((error) => console.error(error));
    }
  }, [userId]);

 const handleCreate = () => {
  if (userId) {
 axios
        .post('habits/list', { data: { googleId: userId.toString() } })
        .then((response) => setHabits(response.data))
        .catch((error) => console.error(error));
  }
   setShowHabitCreate(false)
  };


  const handleDelete = (habitId: number) => {
    setHabits((prevHabits) =>
      prevHabits.filter((habit) => habit.id !== habitId)
    );
  };
   const handleNewHabit = () => {
    setShowHabitCreate(true); // set state variable to true to show HabitCreate
  }

  return (
 <div style={{margin: '40px', textAlign:"center", display: "flex", flexDirection: "column", alignItems: "center", letterSpacing:"0.4em"}}>
    <h3>Growth</h3>
    <p style={{width:'50%'}}>
     "Small habits lead to big growth - track your progress and see how far you've come."
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
   <Button 
   variant="outlined"
   onClick={handleNewHabit}>New Habit</Button> 
      {showHabitCreate && <HabitCreate handleCreate={() => handleCreate()} />} 

      <Card sx={{ 
  borderRadius: '10px', 
  backgroundColor: '#CCD7FF', 
  padding: '20px', 
  height: '60vh', 
  width: '160vh',
  overflow: 'scroll',
    '&::-webkit-scrollbar': {
        width: '3px',
      },
      '&::-webkit-scrollbar-track': {
        background: '#E0E0E0',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(136, 136, 136, 0.5)',
        borderRadius: '1px',
      },
}}>
      {habits.map((habit) => (
        <HabitCard
         key={habit.id}
         userId={userId}
          id={habit.id} 
          habit_name={habit.habit_name}
           habit_type={habit.habit_type}
           habit_createdAt={habit.habit_createdAt}
           onDelete={() => handleDelete(habit.id)} />
      ))}
      </Card>
    </div>
  );
};

export default Habits;
