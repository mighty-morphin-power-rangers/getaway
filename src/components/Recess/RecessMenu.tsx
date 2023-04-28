import React, { useState } from 'react';
import './menu.css';
import axios from 'axios'; 
import ResponseData from './RecessInformation'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
interface MenuProps {
  activities: {
    outdoorActivities: string[];
    hobbies: string[];
    studyHabits: string[];
    wellbeingActivities: string[];
  };
  handleCreate: (namesObj: []) => void;
}

const Menu: React.FC<MenuProps> = ({ activities, handleCreate }) => {
  const [isOpen, setIsOpen] = useState(false);
const [showResponseData, setShowResponseData] = useState(false);
const [responseData, setResponseData] = useState<any[]>([]);
  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };
// console.log(activities.hobbies[0])
  const onCreate = (activity: String): void => {
  console.log(activity)
    axios
      .post('recommend/search', {
       data: {
        keyword: activity
       }
      })
      .then((response) => {
       const namesObj = response.data
    // console.log(namesObj)
    handleCreate(namesObj)
    setShowResponseData(true); 
      setResponseData(namesObj);

      })
      .catch((error) => {
        console.log(error);
      });
  
  };
const r = Math.floor(Math.random() * activities.hobbies.length)
 return (
    <div className={`menu${isOpen ? ' open' : ''}`} onClick={handleMenuClick}>
      {isOpen ? (
        <Stack spacing={2}>
          <Button style={{ backgroundColor: '#117df2' }}  onClick={() => onCreate(activities.outdoorActivities[r])} variant="contained">Outside</Button>
          <Button style={{ backgroundColor: '#117df2' }} onClick={() => onCreate(activities.hobbies[r])} variant="contained">Hobbies</Button>
          <Button style={{ backgroundColor: '#117df2' }} onClick={() => onCreate(activities.studyHabits[r])} variant="contained">Studying</Button>
          <Button style={{ backgroundColor: '#117df2' }} onClick={() => onCreate(activities.wellbeingActivities[r])} variant="contained">Wellbeing</Button>
        </Stack>
      ) : (
        '+'
      )}
      {/* {showResponseData && <ResponseData responseData={responseData} />} */}
    </div>
  );
};

export default Menu;
