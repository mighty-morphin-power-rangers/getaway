import React from 'react';
import PlayablePiano from '../components/PianoComponents/PlayablePiano';
import TimeSpentOnPage from '../components/PianoComponents/TimeSpentOnPage';
const Music = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <h1>Welcome the Music Room</h1>
      <div>
        <h3>Key Controls</h3>
        <p>
          {' '}
          <strong>Black</strong>: 2 - 3 - 5 - 6 - 7 - S - D - G - H - J
        </p>
        <p>
          <strong>White</strong>: 1 - Q - W - E - R - T - Y - U
        </p>
        <p>
          <strong>White</strong>: Z - X - C - V - B - N - M - ,
        </p>
      </div>
      <PlayablePiano />
      <p>Click and drag the piano with your cursor!</p>
      <TimeSpentOnPage />
    </div>
  );
};

export default Music;
