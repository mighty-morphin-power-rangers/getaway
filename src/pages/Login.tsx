import React from 'react';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function SignInSide() {
  const google = ()=>{

      window.open(`${process.env.REACT_APP_CLIENT_URL}auth/google/`, "_self")

    }
    useEffect(() => {
      document.body.classList.add('login-page');
      return () => {
        document.body.classList.remove('login-page');
      };
    }, []);

  return (
    <div style={{margin: '40px', textAlign:"center", display: "flex", flexDirection: "column", alignItems: "center", letterSpacing:"0.4em"}}>
    <h3>GetaWay</h3>
    <p style={{width:'50%'}}>
    Welcome to Getaway, a website dedicated to mental health and well-being. We're glad you found us and we're here to support you on your journey towards a healthier, happier life.
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
      <Box
      sx={{
        my: 8,
        mx: 'auto', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%', 
        maxWidth: '400px',
        border: '1px solid #ccc', 
        borderRadius: '4px', 
        p: 4, 
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" mb={2}>
        Sign in
      </Typography>
      <Button variant="contained" color="primary" onClick={google}>
        Log In
      </Button>
    </Box>
    </div>
  );
};
