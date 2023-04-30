import React, { useState, useEffect } from 'react';
import Reflections from './Reflections';
import Torus from './Torus';
import Torus1 from './Three';
import Torus2 from './Three2';
// import PlayablePiano from '../components/PianoComponents/PlayablePiano';

const Meditation = () => {
  //creating state for each exercise to open/close
  const [exercise1Open, setExercise1Open] = useState(false);
  const [exercise2Open, setExercise2Open] = useState(false);
  const [exercise3Open, setExercise3Open] = useState(false);
  const [reflectionOpen, setReflectionOpen] = useState(false);
  const [currentText, setCurrentText] = useState("");


  //handlers for opening and closing
  const handleExercise1Click = () => {
    setExercise1Open(!exercise1Open);
  };
  const handleExercise2Click = () => {
    setExercise2Open(!exercise2Open);
  };
  const handleExercise3Click = () => {
    setExercise3Open(!exercise3Open);
  };

  const handleExercise1Close = () => {
    setExercise1Open(false);
    setCurrentText("");
  }
  const handleExercise2Close = () => {
    setExercise2Open(false);
    setCurrentText("");
  }
  const handleExercise3Close = () => {
    setExercise3Open(false);
    setCurrentText("");
  }

  const handleReflectionClick = () => {
    setReflectionOpen(!reflectionOpen);
  };

  // *****************
  // *   THREE.JS    *
  // *****************
 // useEffect to update currentText based on time elapsed
 useEffect(() => {
  let interval: NodeJS.Timeout | undefined;
  let counter = 0;
  if (exercise1Open) {
    setCurrentText("Breathe In");
    interval = setInterval(() => {
      counter++;
      if (counter >= 5 && counter < 10) {
        setCurrentText("Hold");
      } else if (counter >= 10 && counter < 15) {
        setCurrentText("Breathe Out");
      } else if (counter >= 15) {
        counter = 0;
        setCurrentText("Breathe In");
      }
    }, 1000);
  }
  return () => clearInterval(interval);
}, [exercise1Open]);

useEffect(() => {
  let interval: NodeJS.Timeout | undefined;
  let counter = 0;
  if (exercise2Open) {
    setCurrentText("Breathe In");
    interval = setInterval(() => {
      counter++;
      if (counter >= 4 && counter < 11) {
        setCurrentText("Hold");
      } else if (counter >= 11 && counter < 19) {
        setCurrentText("Breathe Out");
      } else if (counter >= 19) {
        counter = 0;
        setCurrentText("Breathe In");
      }
    }, 1000);
  }
  return () => clearInterval(interval);
}, [exercise2Open]);

useEffect(() => {
  let interval: NodeJS.Timeout | undefined;
  let counter = 0;
  if (exercise3Open) {
    setCurrentText("Breathe In");
    interval = setInterval(() => {
      counter++;
      if (counter >= 4 && counter < 8) {
        setCurrentText("Breathe Out");
      } else if (counter >= 8) {
        counter = 0;
        setCurrentText("Breathe In");
      }
    }, 1000);
  }
  return () => clearInterval(interval);
}, [exercise3Open]);
  // *****************
  // *   THREE.JS    *
  // *****************

  return (
    <div className='meditation-container'>
      <h1>Meditation</h1>
      <div style={{ width: '100px', height: '100px' }}>
        {/* <PlayablePiano /> */}
      </div>
      <div className='exercise-box' onClick={handleExercise1Click}>
        5-5-5
      </div>
      <div className='exercise-box' onClick={handleExercise2Click}>
        4-7-8
      </div>
      <div className='exercise-box' onClick={handleExercise3Click}>
        Zen Breathing
      </div>
      {/* <button onClick={handleReflectionClick}>Reflections</button>
      {reflectionOpen && <Reflections />} */}
      {exercise1Open &&
      <div className="exercise-popup">
        <div className="exercise-popup-text">{currentText}</div>
       <div> <Torus /> </div>
        <button className="exercise-button" onClick={handleExercise1Close}>Complete</button>
      </div>
    }

    {exercise2Open &&
      <div className="exercise-popup">
        {/* <h2>Exercise 2</h2> */}
        <div className="exercise-popup-text">{currentText}</div>
        <p> <Torus1 /></p>
        <button className="exercise-button" onClick={handleExercise2Close}>Complete</button>
      </div>
    }

    {exercise3Open &&
      <div className="exercise-popup">
        {/* <h2>Exercise 3</h2> */}
        <div className="exercise-popup-text" >{currentText}</div>
        <p> <Torus2 /> </p>
        <button className="exercise-button" onClick={handleExercise3Close}>Complete</button>
      </div>
    }
  </div>
);
  }

export default Meditation;
