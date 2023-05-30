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
import Footer from '../components/Footer'


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

    const buttonStyles = {
      color: '#c499f2',
      borderColor: '#c499f2',
    };

    const containerStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '40px'
    };

    const footerStyles: React.CSSProperties = {
      color: '#bfbfbf',
      fontSize: '10px',
      padding: '20px',
      textAlign: 'center'
    };
    
  return (
    <div>
    <div style={containerStyles}>
      <img
        src="https://i.pinimg.com/564x/08/bf/f3/08bff3322eccda0f3e9e8844d924cbe0.jpg"
        width="180"
        height="70"
      />
      <Button variant="outlined" style={buttonStyles} onClick={google}>
        Log In
      </Button>
    </div>
    <div style={{ display: 'flex' }}>
    <div style={{margin: '80px'}}>
        <h1>Escape and Elevate Your<br/>Mental Well-Being. </h1>
        <p style={{ width: '60%' }}>
          Welcome to Getaway - the app committed to improving your mental health and well-being. We're thrilled that you've discovered us and we're here to provide support on your journey towards a happier, healthier life.
        </p>
      </div>
      <img
    src="https://i.pinimg.com/564x/cc/48/8f/cc488fe1056cae6e1475a10488d9a95a.jpg"
    width="700"
    height="500"
    style={{ marginRight: '50px' }}
  />
    </div>
    <footer style={{ position: 'absolute', bottom: 0, width: '100%' }}>
   <Footer></Footer>
   </footer>
    </div>
    
  );
};
