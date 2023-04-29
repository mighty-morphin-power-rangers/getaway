import React, { useState, useEffect, useContext } from 'react';
// import Recommend from '../components/Recess/Recommendations'
import { UserContext, UserContextType } from '../App';
import axios from 'axios';
import { Button } from '@mui/material';
import Popover from '@mui/material/Popover';
import Card from '@mui/material/Card';
import RecommendCreate from '../components/Recess/RecoCreate'
import Menu from '../components/Recess/RecessMenu'
import ResponseData from '../components/Recess/RecessInformation'
import activities from '../components/Recess/fakedb'

const Recess = () =>{
const [newSearch, setnewSearch] = useState<[]>([]);
 const [showRecommend, setShowRecommend] = useState(false);

  function handleCreate(namesObj: []){
setnewSearch(namesObj)
// setShowRecommend(true);

  }
console.log(activities)

  return (
    <div style={{margin: '40px', textAlign:"center", display: "flex", flexDirection: "column", alignItems: "center", letterSpacing:"0.4em"}}>
    <h3>Recess</h3>
    <p style={{width:'50%'}}>
     "By exploring new activities and hobbies, you can take small steps towards better mental health and discover a whole world of possibilities you never knew existed."
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
    
    <Menu handleCreate={handleCreate} activities={activities}/>
 
      <ResponseData responseData={newSearch}/>
    </div>

  )
  }

  export default Recess;