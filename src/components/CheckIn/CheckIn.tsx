import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MoodPieChart from './MoodPieChart';
import { UserContext } from '../../App';

const CheckIn = () => {
  // What do I want to happen on click?

  const { userName, userId: googleId } = useContext(UserContext);

  // state for showing feeling
  const [userFeelings, SetUserFeelings] = useState<{
    moodDescription: string;
    moodColor: string;
  }>({
    moodDescription: '',
    moodColor: '',
  });
  // state for showing success display
  const [showAlert, setShowAlert] = useState(false);

  // d3 mood data
  const [moodData, setMoodData] = useState<[]>([]);

  const FeelingSelector = (e: any) => {
    // console.log(e.target.textContent);
    // SetUserFeelings(e.target.textContent);
    const moodDescription = e.target.textContent;
    let moodColor = '';
    if (e.target.textContent === 'High Energy, Pleasant') {
      // console.log('Blue');
      moodColor = 'Blue';
    } else if (e.target.textContent === 'High Energy, Unpleasant') {
      // console.log('Red');
      moodColor = 'Red';
    } else if (e.target.textContent === 'Low Energy, Pleasant') {
      // console.log('Green');
      moodColor = 'Green';
    } else if (e.target.textContent === 'Low Energy, Unpleasant') {
      // console.log('Yellow');
      moodColor = 'Yellow';
    }
    SetUserFeelings({ moodDescription, moodColor });
  };

  // CODE FOR SUBMITTING TO DATABASE
  const submitFeeling = () => {
    // Replace with the actual user ID
    // const userId = 1;

    fetch('/moodEntry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        googleId: googleId,
        moodColor: userFeelings.moodColor,
        moodDescription: userFeelings.moodDescription,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error submitting feeling');
        }
      })
      .then((data) => {
        // console.log('Feeling submitted:', data);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000); // hide alert after 3 seconds
        // Fetch updated mood data
        fetchMoodData();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const fetchUserMoodEntries = (googleId: any) => {
    return fetch(`moodEntry/user/${googleId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error(data.message);
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching mood entries for user:', error);
        // Handle the error as needed, for example, show an error message to the user
      });
  };

  const fetchMoodData = () => {
    // const userId = 1; // Replace with the actual user ID
    fetchUserMoodEntries(googleId)
      .then((data) => {
        setMoodData(data);
      })
      .catch((error) => {
        console.error('Error fetching mood data:', error);
        // Handle the error as needed, for example, show an error message to the user
      });
  };

  // useEffect(() => {
  //   fetchMoodData();
  // }, []);

  useEffect(() => {
    // Fetch the initial mood data
    fetchMoodData();

    // Set up a timer to fetch the mood data every few seconds
    const interval = setInterval(() => {
      fetchMoodData();
    }, 5000); // fetch every 5 seconds; adjust this value as needed

    // Clean up the timer when the component is unmounted
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      style={{
        textAlign: 'center',
        background: "linear-gradient(180deg, #FF8974 0%, #FF8974 20%, #FF9F69 100%)"
      }}
    >
      <div style={{padding:"150px"}}>
      <h2 style={{marginTop:"340px"}}>HOW DO YOU FEEL IN THIS MOMENT</h2>
      <ButtonGroup
        variant='contained'
        aria-label='outlined primary button group'
        orientation='vertical'
      >
        <Button
          onClick={FeelingSelector}
          sx={{ background: 'rgba(0, 191, 194, 1)', color: 'white', marginBottom: '5px' }}
        >
          High Energy, Pleasant
        </Button>
        <Button
          onClick={FeelingSelector}
          sx={{ background: 'rgba(252, 110, 71, 1)', color: 'white', marginBottom: '5px' }}
        >
          High Energy, Unpleasant
        </Button>
        <Button
          onClick={FeelingSelector}
          sx={{ background: '#6BB76A', color: 'white', marginBottom: '5px' }}
        >
          Low Energy, Pleasant
        </Button>
        <Button
          onClick={FeelingSelector}
          sx={{ background: 'rgba(255, 153, 158, 1)', color: 'white' }}
        >
          Low Energy, Unpleasant
        </Button>
      </ButtonGroup>
     <p style={{ fontSize:'24px', color:'#85B8FF' }}>{userFeelings.moodDescription}</p>
      <p style={{
        letterSpacing: '0.1em'
      }}>If correct, click the submit button.</p>
      <p style={{
        letterSpacing: '0.1em'
      }}>If not, select the correct choice.</p>
      <Button variant='outlined' onClick={submitFeeling}>
        Submit feeling!
      </Button>

      {showAlert && (
        <div
          style={{
            margin: '0 auto',
            textAlign: 'center',
            maxWidth: '25rem',
          }}
        >
          <Alert
            severity='success'
            color='success'
            style={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            <AlertTitle>Success</AlertTitle>
            Successfully submitted user feelings of{' '}
            {userFeelings.moodDescription}!
          </Alert>
        </div>
      )}
      <hr />
      <h1>Check-in Statistics</h1>
      <p>Here we can see a summary of how your check-ins have been.</p>
      <MoodPieChart data={moodData} width={300} height={300} />
      </div>

    </div>
  );
};

export default CheckIn;
