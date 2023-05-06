import React from 'react';
import PlayablePiano from '../components/PianoComponents/PlayablePiano';
const Music = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
      }}
    >
      <h1>Welcome the Music Room</h1>
      <div>
        <h3>Key Controls:</h3>
        <p>
          {' '}
          <strong>Black</strong>: W - E - T - Y - U
        </p>
        <p>
          <strong>White</strong>: A - S - D - F - G - H - J
        </p>
      </div>
      <PlayablePiano />
      <p>Click and drag the piano with your cursor!</p>
    </div>
  );
};

export default Music;
