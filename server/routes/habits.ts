import { Router } from 'express';
const habitsRoutes = Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// the route for this is  localhost:8080/habits/




//  this route will be for getting the users habits
habitsRoutes.post('/list', async (req: any, res: any) => {
  try {
    const { googleId } = req.body.data;
    // console.log(googleId)
    const habits = await prisma.habits.findMany({ where: { user_id: googleId } });
    res.send(habits);
  } catch (error) {
    console.log('Error: ', error);
    res.send('Error');
  }
});

// this route will be for posting a new habit
habitsRoutes.post('/newHabit', async (req: any, res: any) => {
  try {
    const { data } = req.body;
  const { habit_name, googleId, habit_type } = data;

  const newObj = {
    habit_name: habit_name,
    habit_type: habit_type,
    user_id: googleId
  };

    await prisma.habits.create( {data: newObj} )

    res.send('Success');
  } catch (error) {
    console.log('Error: ', error);
    res.send('Error');
  }
});
// this will before updating habit completion
habitsRoutes.post('/completed', async (req: any, res: any) => {
  try {
    // console.log(req.body.data)
  const { habit, user, date, completed } = req.body.data;
   const habitLog = await prisma.habitLog.create({
  data: {
    habit: {
      connect: {
        id: habit,
      },
    },
    user: {
      connect: {
        googleId: user,
      },
    },
    

  },
});
    res.send("good job");
  } catch (error) {
    console.log('Error: ', error);
    res.send('Error');
  }
});

// this will get all the dates a habit was updated
habitsRoutes.get('/updatedon/:id', async (req: any, res: any) => {

  try {
 const  {id}  = req.params;

 // this is a goofy work around to the : being in the params
 // im sure there is a better way
//  console.log(req.params)
  const habits = await prisma.habitLog.findMany({
    where: {
      habit_id: Number(id.slice(1))
    }
  });
    res.send(habits);
  } catch (error) {
    console.log('Error: ', error);
    res.send('Error');
  }
});

// this will delete a habit
habitsRoutes.delete('/delete', async (req: any, res: any) => {
  try {
    const { habitId } = req.body;

    await prisma.habitLog.deleteMany({
      where: {
        habit_id: habitId
      }
    });

    await prisma.habits.delete({
      where: {
        id: habitId
      }
    });

    res.send('Success');
  } catch (error) {
    console.log('Error: ', error);
    res.send('Error');
  }
});

export default habitsRoutes