import MusicBar from '../components/MusicBar';
import NavBar from '../components/NavBar';
import React from 'react';
import { useEffect } from 'react';
import CheckIn from '../components/CheckIn/CheckIn';

const Home = () => {
  return (
    <div style={{ textAlign: 'center' }}>
  <CheckIn />
  <div
    style={{
      borderRadius:'40px',
      margin:'60px auto',
      color: '#5C6B9E',
      backgroundColor:'#5C6B9E',
      width: '70%',
      height: '7px',
      textAlign:'center',
      marginBottom: '100px'
    }}
  />
      <div
      style={{
        textAlign: 'center',
        letterSpacing: '0.5em'
      }}
    >
      {/* replace all this with the actual functionality when the time comes */}
      <h2>AFFIRMATIONS</h2>
      <div style={{
      borderRadius:'40px',
      margin:'60px auto',
      color: '#788ACA',
      backgroundColor:'#CCD7FF',
      width: '70%',
      height: '250px',
      textAlign:'center',
      marginBottom:'100px',
      padding:'30px'
    }}>
      <h3>May 14th 2023</h3>
<p>This is the affirmation ya know</p>
      </div>
      </div>
      <div
    style={{
      borderRadius:'40px',
      margin:'60px auto',
      color: '#5C6B9E',
      backgroundColor:'#5C6B9E',
      width: '70%',
      height: '7px',
      textAlign:'center',
      marginBottom: '100px'
    }}
  />
      <div
      style={{
        textAlign: 'center',
        letterSpacing: '0.5em'
      }}
    >
      {/* replace all this with the actual functionality when the time comes */}
      <h2>HABITS</h2>
      <div style={{
      borderRadius:'40px',
      margin:'60px auto',
      color: '#788ACA',
      backgroundColor:'#CCD7FF',
      width: '70%',
      height: '250px',
      textAlign:'center',
      marginBottom:'250px',
      padding:'30px'
    }}>
      <h3>HABIT CHARTS</h3>
      </div>
      </div>
    </div>
  );
};

export default Home;
