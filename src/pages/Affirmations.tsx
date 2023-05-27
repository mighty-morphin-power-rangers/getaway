import { useState, useEffect, useContext } from 'react';
import { UserContext, UserContextType } from '../App';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import axios from 'axios';
import Swal from 'sweetalert2';
import Carousel from 'react-material-ui-carousel';
import Divider from '@mui/material/Divider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircularProgress from '@mui/material/CircularProgress';





const Affirmations = () => {
  const [userMood, setUserMood] = useState('');
  const [affirmations, setAffirmations] = useState<string[]>([]);
  const [favoriteAffirmations, setFavoriteAffirmations] = useState<string[]>([]);
  const [affirmationTitle, setAffirmationTitle] = useState('');
  const [isSaveVisible, setisSaveVisible] = useState(false);
  const [error, setError] = useState(true)
  const [helperText, setHelperText] = useState('')
  const [isSaved, setSaved] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { userName, userId }: UserContextType = useContext(UserContext) ?? { userName: null, userId: null };

  useEffect(() => {
    if (userId) {
    retrieveFavorites();
    }
  }, [userId]);


  const handleEnterSubmit = (): void => {
    setLoading(true);

    axios
      .get(`/affirmations/mood/${userMood}`)
      .then(({ data }) => {setAffirmations(data);  showSaveButton();})
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false); // Set the loading state to false when the request is completed, whether it succeeds or fails
      });
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
      if (affirmationTitle === '') {
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

    setSaved(true);
  }

  };

  const retrieveFavorites = () => {
    axios.get(`/affirmations/retrieve-favorites/${userId}`)
    .then(({ data }) => {setFavoriteAffirmations(data)})
    .catch((err) => console.log(err));
  }

  const handleBackButton = () => {
    setisSaveVisible(false);
  }

  const affirmationHeader = {
    fontSize:"70px",
    color: "white",
    textShadow: "2px #000000",
     marginTop: '100px'
  }
  const affirmationHeader2 = {
    fontSize:"70px",
    color: "white",
    textShadow: "2px #000000",
    margin: '0'
  }

  const affirmationHeader3 = {
    fontSize:"20px",
    color: "white",
    textShadow: "2px #000000",
    padding: '5%'
  }


    const renderItem = (affirmationObject: any) => (
      <Paper style={{ padding: '5%', borderRadius: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
        <h2>{affirmationObject.title}</h2>
        <FavoriteIcon  style={{ color: 'red' }} />
        <ul>{affirmationObject.affirmationList.split('/n').map((affirmationBulletPoint: string) => {
          return <li style={{listStyleType: 'none'}}>{affirmationBulletPoint}</li>;
      })}</ul>
      </Paper>
    );

  return (
    <div id='parent'>
      <center>
        <div id="entry" style={{background: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)", padding: '20%' }}>
      <h1 style={{...affirmationHeader}}>affirmations</h1>
      <img src="https://i.pinimg.com/originals/e4/75/c9/e475c9ca1e4e22336418908baa02ae59.png" style={{height: '400px', width: '400px'}}></img>
        <h2 style={affirmationHeader3}>what affirmations are you looking for today? </h2>
        {/* <h6>You can express as much as you want or enter a single word. It's up to you ☺ </h6> */}
        <div
      style={{
        textAlign: 'center',
        background: "#FC6E47",
        margin: 'auto',
        padding: '50px',
        maxWidth: '800px',
        borderRadius: '20px',
        animation: (isSaved && isSaveVisible) ? 'glow 2s infinite' : 'none',
        transition: 'box-shadow 0.3s ease-in-out'
      }}
      id="affirmations"
    >
        { !isSaveVisible &&  !isLoading ? <FormGroup style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <TextField
            id='outlined-multiline-static'
            placeholder='I am feeling...'
            multiline
            rows={7}
            style={{ width: '100%', maxWidth: '700px', fontSize: '1.2rem'}}
            size='medium'
            onChange={(e) => setUserMood(e.target.value)}
          />
          <Button variant='text'  style={{ width: '100%', maxWidth: '400px', fontSize: '1.2rem', marginTop: '1rem' }} size='medium' onClick={ () => handleEnterSubmit() }>
            Enter
          </Button>
        </FormGroup> : !isSaved && !isLoading && <FormGroup>
      <div id='affirmations' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {(<TextField id="standard-basic" placeholder='Enter title' error={error} helperText={helperText}  variant="standard" onChange={(e) => {setAffirmationTitle(e.target.value); handleTitleChange(e.target.value)}}  style={{ width: '100%', maxWidth: '400px', fontSize: '1.2rem' }} />)}
          <ul>
            {affirmations.map((affirmation: string, index: number) => {
              return <li style={{listStyleType: 'none', padding: 0}}key={index}>{affirmation}</li>;
            })}
          </ul>
   {(<Button variant='text' onClick={ () => handleSaveSubmit() } style={{ width: '100%', maxWidth: '400px', fontSize: '1.2rem' }}>Save</Button>)}
   {(<Button variant='text' onClick={ () => handleBackButton() } style={{ width: '100%', maxWidth: '400px', fontSize: '1.2rem' }}>Go Back</Button>)}
   </div>
   </FormGroup>}

   {isLoading && !isSaved && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress color="inherit" style={{padding: '2%'}} /> Loading... </div>}

   {isSaved && isSaveVisible && <div>
    {affirmationTitle}
    <ul>
            {affirmations.map((affirmation: string, index: number) => {
              return <li style={{listStyleType: 'none', padding: 0}}key={index}>{affirmation}</li>;
            })}
          </ul>  <div id="view-affirmation-button">
  <Link to="/affirmation-entries" style={{ textDecoration: 'none' }}>
    <Button variant="text" style={{ width: '100%', maxWidth: '400px', fontSize: '1.2em', cursor: 'pointer' }}>
      View Entry
    </Button>
  </Link>
</div>
<div id="back-affirmation-button">


    <Button variant="text" onClick={ () => {handleBackButton(); setSaved(false); setisSaveVisible(false); setAffirmationTitle('') } } style={{ width: '100%', maxWidth: '400px', fontSize: '1.2rem', cursor: 'pointer' }}>

      Go Back
    </Button>
</div>
</div> }
   </div>
   </div>

   <div style={{backgroundColor: '#f5932c', marginTop: '-100px', padding: '5%'}}>
   <h1 style={{...affirmationHeader2, margin: '0', padding: '2%'}}>favorites</h1>

   <div className="carousel" style={{ marginLeft: '300px', marginRight: '300px' }}>
{<Carousel>
  {Array.isArray(favoriteAffirmations) &&
    favoriteAffirmations.reverse().map((affirmation) => (
      renderItem(affirmation)
    ))}
    </Carousel>}
    </div>
    <div id="view-button" style={{padding: '0.8em'}}>
    <Button variant="outlined" component={Link} to={'/affirmation-entries'}>View All Affirmations</Button>
    </div>
    </div>
      </center>
    </div>
  );
};

export default Affirmations;
