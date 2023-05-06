import { useState, useEffect, useContext } from 'react';
import { UserContext, UserContextType } from '../App';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import axios from 'axios';
import Swal from 'sweetalert2';


const Affirmations = () => {
  const [userMood, setUserMood] = useState('');
  const [affirmations, setAffirmations] = useState<string[]>([]);
  const [affirmationTitle, setAffirmationTitle] = useState('');
  const [isSaveVisible, setisSaveVisible] = useState(false);
  const [error, setError] = useState(true)
  const [helperText, setHelperText] = useState('')

  const { userName, userId }: UserContextType = useContext(UserContext) ?? { userName: null, userId: null };

  const handleEnterSubmit = (): void => {
    axios
      .get(`/affirmations/mood/${userMood}`)
      .then(({ data }) => {setAffirmations(data);  showSaveButton();})
      .catch((err) => console.error(err));
  };

  const showSaveButton = () => {
    setisSaveVisible(true);
  }

  const handleTitleChange = (title: string) => {
   if (title.length === 0) {
    setError(true)
    setHelperText('Please enter a title')
   } else {
    setError(false)
    setHelperText('')
   }
  }

  const handleSaveSubmit = (): void => {
      if (!affirmationTitle) {
    setHelperText('Please enter a title')
      } else {
    Swal.fire({
      title: 'Success!',
      text: 'Affirmation saved.',
      icon: 'success',
      confirmButtonText: 'OK',
    });

    axios.post('/affirmations/save', {
      title: affirmationTitle,
      affirmations: affirmations,
      googleId: userId,
      favorite: 'false'
    })
    .then(({ data }) => console.log(data))
    .catch((err) => console.log(err));
  }
  };



  return (
    <div id='parent' style={{ paddingBottom: '500px' }}>
      <Link to="/affirmation-entries"><Button variant='text' style={{marginTop: '40px'}}>View Affirmations</Button></Link>
      <center>
        <h2>What affirmations are you looking for today? </h2>
        <h3>Today, I am feeling...</h3>
        <h6 >You can express as much you want or enter a single word. It's up to you ☺ </h6>
        <FormGroup style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <TextField
            id='outlined-multiline-static'
            placeholder='Type here...'
            multiline
            rows={7}
            style={{ width: '100%', maxWidth: '700px', fontSize: '1.2rem' }}
            size='medium'
            onChange={(e) => setUserMood(e.target.value)}
          />
          <Button variant='text'  style={{ width: '100%', maxWidth: '400px', fontSize: '1.2rem', marginTop: '1rem' }} size='medium' onClick={ () => handleEnterSubmit() }>
            Enter
          </Button>
        </FormGroup>
      </center>
<FormGroup>
      <div id='affirmations' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {isSaveVisible && (<TextField id="standard-basic" placeholder='Enter title' error={error} helperText={helperText}  variant="standard" onChange={(e) => {setAffirmationTitle(e.target.value); handleTitleChange(e.target.value)}}  style={{ width: '100%', maxWidth: '400px', fontSize: '1.2rem' }} />)}
          <ul>
            {affirmations.map((affirmation: string, index: number) => {
              return <li style={{listStyleType: 'none', padding: 0}}key={index}>{affirmation}</li>;
            })}
          </ul>

   {isSaveVisible && (<Button variant='text' onClick={ () => handleSaveSubmit() } style={{ width: '100%', maxWidth: '400px', fontSize: '1.2rem' }}>Save</Button>)}
   </div>
   </FormGroup>
    </div>
  );
};

export default Affirmations;
