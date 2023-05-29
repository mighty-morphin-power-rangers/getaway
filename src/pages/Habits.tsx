import React, { useState, useEffect, useContext } from 'react';
import HabitCard from '../components/Habits/Habitcard';
import HabitCreate from  '../components/Habits/HabitCreate'
import { UserContext, UserContextType } from '../App';
import axios from 'axios';
import { Button, Card, Dialog, DialogTitle, DialogContent, CardContent, Grid, Typography} from '@mui/material';
// import KebabDiningIcon from '@mui/icons-material/KebabDining';
// import SkateboardingIcon from '@mui/icons-material/Skateboarding';
// import PsychologyIcon from '@mui/icons-material/Psychology';
// import SpaIcon from '@mui/icons-material/Spa';
// import Popover from '@mui/material/Popover';
// import Card from '@mui/material/Card';

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
    type: "Wellness"
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
<div style={{background: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)"}}>
    <div style={{marginTop: '80px', textAlign:"center", display: "flex", flexDirection: "column", alignItems: "center", letterSpacing:"0.4em"}}>
    <h3 style={{marginTop:"300px"}}>Growth</h3>
<img src="https://i.ibb.co/0Vvjb9T/7718914-removebg-preview.png"  style={{height: '400px', width: '400px'}}></img>
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
  
<Card sx={{ 
  borderRadius: '10px', 
  backgroundColor: '#CCD7FF', 
  // padding: '20px', 
  height: '60vh', 

 
      
}}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={1}>
            {/* First column */}
            <Typography variant="h6">Options</Typography>
            {/* Content for column 1 */}
               <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
  <Button variant="outlined" onClick={handleNewHabit}>New Habit</Button>
  {/* {showHabitCreate && <HabitCreate handleCreate={() => handleCreate()} />} */}
<Dialog
  open={showHabitCreate}
  onClose={() => setShowHabitCreate(false)}
  PaperProps={{
    sx: {
      backgroundColor: 'rgb(204, 215, 255)',
      borderRadius: '10px' 
    },
  }}
>
  <DialogTitle>Create New Habit</DialogTitle>
  <DialogContent>
    <HabitCreate handleCreate={handleCreate} />
  </DialogContent>

</Dialog>
</div>
          </Grid>
          <Grid item xs={12} sm={10}
          sx={{ borderLeft: '1px solid gray', paddingLeft: 16 }}>
       
            <Typography variant="h6">Habits</Typography>
           <Card sx={{ 
  // borderRadius: '10px', 
  backgroundColor: '#CCD7FF', 
boxShadow: 'none' ,
  height: '55vh', 
  width: '160vh',
  overflow: 'auto',
      
}}>
      <style>
    {`
    ::-webkit-scrollbar {
      width: 10px;
      margin-right: 10px; /* Add margin to the right */
      margin-left: 10px; /* Add margin to the right */
      padding:30px;
    }
    ::-webkit-scrollbar-track {
    
      border-radies:30px;
    }
    ::-webkit-scrollbar-corner {
  background: rgba(0,0,0,0);
}
    ::-webkit-scrollbar-thumb {
      background-color: #7C92CB;
      border-radius:30px;
    }
    `}
  </style>

 
    {habits.length === 0 ? (
  <div style={{ textAlign: 'center', marginTop: '20px' }}>
    No habits found. Add a new habit using the "New Habit" button.
  </div>
) : (
  habits.map((habit) => (
    <HabitCard
      key={habit.id}
      userId={userId}
      id={habit.id}
      habit_name={habit.habit_name}
      habit_type={habit.habit_type}
      habit_createdAt={habit.habit_createdAt}
      onDelete={() => handleDelete(habit.id)}
    />
  ))
)}
     
      </Card>
     
          </Grid>
        </Grid>
      </CardContent>
    </Card>

 
    <div style={{ marginBottom: '20px' }}></div>
    </div>
    </div>
  );
};

export default Habits;
