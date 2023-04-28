import React, { useState, useEffect, useContext } from 'react';

import Typography from '@mui/material/Typography';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import { UserContext, UserContextType } from '../../App';

interface RecommendCreate {

  handleCreate: ( ) => void;
}
type Option = {
  type: string;
};
interface Props {
  handleCreate: (namesObj: []) => void;
}

// This will have charts and a calaneder to see how the following  is going
const RecommendCreate = (props: Props ) =>{
  const { userName, userId }: UserContextType = useContext(UserContext) ?? { userName: null, userId: null };;

const types:Option[] = [
  {
    type: "park"
  }, {
    type: "gym"
  }, {
    type: "health"
  }, {
    type: "Choices"
  }
]

  const [newRecommend, setNewRecommend] = useState<string>('');
  const [type, setType] = useState<string>(types[0].type);

const onCreate = (): void => {
  
    axios
      .post('recommend/search', {
       data: {
        keyword: newRecommend
       }
      })
      .then((response) => {
       const namesObj = response.data
    console.log(namesObj)
        props.handleCreate(namesObj)
    //   //   response.data.results.forEach((result: { name: any; }) => {
    //   // console.log(result.name);
    // });

      })
      .catch((error) => {
        console.log(error);
      });
    setType(types[0].type);
    setNewRecommend('');
  };



  return (
<div style={{ display: 'inline-block', margin: '10px', height: '400px', width: '200px' }}>
  <Card sx={{ borderRadius: 0, backgroundColor: '#CCD7FF', padding: '20px' }}>
    <TextField
      required
      id='outlined-required'
      label='Required'
      helperText='Enter Tracking'
      value={newRecommend}
      onChange={(event) => setNewRecommend(event.target.value)}
      style={{ marginTop: '10px', marginBottom: '10px', width: '100%' }}
     
    />
    <TextField
      id='outlined-select-currency'
      select
      label='Select'
      onChange={(event) => setType(event.target.value)}
      value={type}
      helperText='Please select activity type'
      style={{ marginTop: '10px', marginBottom: '10px', width: '100%' }}
 
    >
      {types.map((option: Option) => (
        <MenuItem key={option.type} value={option.type}>
          {option.type}
        </MenuItem>
      ))}
    </TextField>
    <Button variant='contained' color='primary' style={{ marginTop: '10px', width: '100%' }} onClick={onCreate}>
      Create Recommend
    </Button>
  </Card>
</div>

  );
};

export default RecommendCreate;
