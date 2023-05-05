import express from 'express';
import path from 'path';
import recommendRoutes from './routes/recommend';
import authRoute from './routes/auth';
import therapistRoute from './routes/therapist';
import affirmationRoute from './routes/affirmations';
import habitsRoute from './routes/habits';
import checkInRoute from './routes/checkIn';
import moodEntryRoute from './routes/moodEntry';
import staffRoute from './routes/staff-therapists';
import paintingRoute from './routes/paintings';

// import passportAuth from 'passport';
// // import cookieSession from 'cookie-session';
// import cookieSession from 'cookie-session';
// import passportSetup from 'passport';
// import cors from 'cors';

const passportAuth = require('passport');
const cookieSession = require('cookie-session');
const passportSetup = require('./passport');
const cors = require('cors');
const connection = require('./db/index');
// import connection from './db/index';
// import 'dotenv/config'
require('dotenv').config();

const app = express();
const port = 8080;

app.use(express.json());

app.use(
  cookieSession({
    name: 'session',
    keys: ['getaway'],
    maxAge: 24 * 60 * 60 * 100,
  })
);

const clientPath = path.resolve(__dirname, '..', 'dist');
app.use(express.static(clientPath));

app.use(passportAuth.initialize());
app.use(passportAuth.session());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.get(
  '/auth/google/callback',
  passportAuth.authenticate('google', { failureRedirect: 'https://getawayapp.co/' }),
  function (req: any, res: any) {
    res.redirect('https://getawayapp.co/');
  }
);

app.use('/therapist', therapistRoute);
app.use('/auth', authRoute);
app.use('/affirmations', affirmationRoute);
app.use('/habits', habitsRoute);
app.use('/checkIn', checkInRoute);
app.use('/moodEntry', moodEntryRoute);
app.use('/staff', staffRoute);
app.use('/paintings', paintingRoute);
app.use('/recommend/', recommendRoutes);

//bottom
app.get('*', (req: any, res: any) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

app.listen(port,  () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
