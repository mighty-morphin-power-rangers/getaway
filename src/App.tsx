import React, { createContext } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation  } from 'react-router-dom';
import Home from './pages/Home';
import Habits from './pages/Habits';
import Affirmations from './pages/Affirmations';
import AffirmationEntries from './components/Affirmations/AffirmationEntries';
import AffirmationFavorites from './components/Affirmations/AffirmationFavorites';
import AffirmationSpeech from './components/Affirmations/AffirmationSpeech';
import TherapistProfile from './pages/TherapistProfile';
import Recess from './pages/Recess';
import Guidance from './pages/Guidance';
import Profile from './pages/Profile';
import Meditation from './pages/Meditation';
import NavBar from './components/NavBar';
import axios from 'axios';
import Login from './pages/Login';
import { useState, useEffect, useContext } from 'react';
import MusicBar from './components/MusicBar';
import Painting from './pages/Painting';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Switch } from '@mui/material';
import Footer from './components/Footer'
import ScrollToTopFab from './components/ScrollToTop';
// Theodore import stuff
import Music from '../src/pages/Music';
// import PlayablePiano from './components/PianoComponents/PlayablePiano';

export interface UserContextType {
  userName: string | null;
  userId: string | null;
}

export const UserContext = createContext<UserContextType>({
  userName: null,
  userId: null,
});

const App = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const getUser = () => {
      axios
        .get(`${process.env.REACT_APP_CLIENT_URL}auth/login/success`)
        .then((response) => {
          if (response.status === 200) {
            return response.data;
          } else {
            throw new Error('auth failed');
          }
        })
        .then((resObj) => {
          setUser(resObj.user);
          setUserId(resObj.user.id);
          setUserName(resObj.user.name.givenName);
          localStorage.setItem('user', JSON.stringify(resObj.user));
        })
        .catch((err) => {
          console.error('couldnt get the user to the state', err);
        });
    };
    getUser();
  }, []);

  // console.log(user);
  const ScrollToTop:Function = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <UserContext.Provider value={{ userName, userId }}>

      <BrowserRouter>
      <ScrollToTop />
        <div >
        {user && <NavBar />}
          <Routes>
            {user ? (
              <Route path='/' element={<Home />} />
            ) : (
              <Route path='/' element={<Login />} />
            )}
            <Route path='/habits' element={<Habits />} />
            <Route path='/affirmations' element={<Affirmations />} />
            <Route
              path='/affirmation-entries'
              element={<AffirmationEntries />}
            />
            <Route
              path='/affirmation-favorites'
              element={<AffirmationFavorites />}
            />
            <Route
              path='/affirmation-practice'
              element={<AffirmationSpeech />}
            />
            <Route path='/recess' element={<Recess />} />
            <Route path='/guidance' element={<Guidance />} />
            <Route path='/meditation' element={<Meditation />} />
            <Route path='/painting' element={<Painting />} />
            <Route path='/music' element={<Music />} />
            <Route path='/therapist-profile' element={<TherapistProfile />} />
            {/* <Route path='/profile' element={<Profile />} /> */}
             {/* <Footer></Footer> */}
          </Routes>

          <MusicBar />
          <ScrollToTopFab />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
