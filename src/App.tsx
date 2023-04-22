import React, { createContext } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import Home from './pages/Home'
// import Habits from './pages/Habits'
import Affirmations from './pages/Affirmations'
import AffirmationEntries from './components/Affirmations/AffirmationEntries'
import AffirmationFavorites from './components/Affirmations/AffirmationFavorites'
import Recess from './pages/Recess'
import Guidance from './pages/Guidance'
import Profile from './pages/Profile'
import Meditation from './pages/Meditation'
import NavBar from './components/NavBar'
import axios from 'axios';
import Login from './pages/Login'
import { useState, useEffect, useContext } from 'react';
import MusicBar from './components/MusicBar';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Switch } from '@mui/material';
export interface UserContextType {
  userName: string | null;
  userId: number | null
}

export const UserContext = createContext<UserContextType | null>(null);

const App = () => {




const [user, setUser ] = useState(null);
const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
     const [theme, setTheme] = useState(false);

 const darkTheme = createTheme({
        palette: {
            mode: theme ? 'dark' : 'light',
        },
    });
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.checked);
  };


useEffect(()=>{
  const getUser = ()=>{
  axios.get(`${process.env.REACT_APP_CLIENT_URL}auth/login/success`)
  .then((response)=>{
    if(response.status===200){
      return response.data
    }else{
      throw new Error("auth failed")
    }
  }).then((resObj)=>{
    setUser(resObj.user)
    setUserId(resObj.user.id)
    setUserName(resObj.user.name.givenName)
    localStorage.setItem('user', JSON.stringify(resObj.user));
  })
  .catch((err)=>{
    console.error('couldnt get the user to the state', err)
  })
};
  getUser();
}, []);


console.log(user)


  return (
    <ThemeProvider theme={darkTheme}>
                <CssBaseline />
    <UserContext.Provider value ={{userName, userId}}>
     <BrowserRouter>
      <div>
    <NavBar/>
      <Routes>
      {user ? (
  <Route path="/" element={<Home />} />
  ) : (
  <Route path="/" element={<Login />} />
  )}

        {/* <Route path="/habits" element={<Habits />} /> */}
        <Route path="/affirmations" element={<Affirmations />} />
        <Route path="/affirmation-entries" element={<AffirmationEntries />} />
        <Route path="/affirmation-favorites" element={<AffirmationFavorites />} />
        <Route path="/recess" element={<Recess />} />
        <Route path="/guidance" element={<Guidance />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/meditation" element={<Meditation />} />
      </Routes>
      <Switch
                    checked={theme}
                    color='success'
                    onChange={handleChange} />
      <MusicBar />
      </div>
    </BrowserRouter>
    </UserContext.Provider>
 </ThemeProvider>

  )
}

export default App;
