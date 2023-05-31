import React from 'react';
import PlayablePiano from '../components/PianoComponents/PlayablePiano';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Music = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)"
        }}
    >
      <h1 style={{ fontSize: "70px", color: "white", marginTop: '450px',}}> music room </h1>
      <p style={{ fontSize: "30px", color: "white" }}> <i>Here you can play on a virtual piano with your keys!</i> </p>
      <div>
        <Card>
      <CardContent>
      <Typography variant="h6" style={{ fontSize: "20px" }}>
      Key Controls
        </Typography>
        <Typography variant="h6">
          Black: <span style={{ fontSize: "15px" }}> <i> 2 - 3 - 5 - 6 - 7 - S - D - G - H - J</i></span>
        </Typography>
        <Typography variant="h6">
          White: <span style={{ fontSize: "15px" }}> <i> 1 - Q - W - E - R - T - Y - U</i></span>
        </Typography>
        <Typography variant="h6">
          White: <span style={{ fontSize: "15px" }}> <i> Z - X - C - V - B - N - M - ,</i></span>
        </Typography>
      </CardContent>
    </Card>
      </div>
      <PlayablePiano />
      <p style={{ fontSize: "40px", color: "white", }}>Click and drag the piano with your cursor!</p>
    </div>
  );
};

export default Music;
