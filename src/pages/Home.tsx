import MusicBar from '../components/MusicBar';
import NavBar from '../components/NavBar';
import React, { useRef } from 'react';
import { useEffect, useContext, useState } from 'react';
import CheckIn from '../components/CheckIn/CheckIn';
import HabitHome from  '../components/Habits/HabitHome'
import AffirmationHome from '../components/Affirmations/AffirmationHome'
import { UserContext, UserContextType } from '../App';
import SavedPaintings from '../components/SavedPaintings'
import axios from 'axios';
import  Button from '@mui/material/Button';
import HomePartOne from "../components/HomePartOne"
import HomePartTwo from "../components/HomePartTwo"
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IconButton from '@mui/material/IconButton';
import Footer from '../components/Footer'
import ScrollTop from '../components/ScrollToTop'


   interface home {
  id: number;
  habit_type: string;
  habit_name: string;
  habit_createdAt: string;
  entryId: number;
}

const Home = () => {
  const { userName, userId }: UserContextType = useContext(UserContext) ?? { userName: null, userId: null };;

   const [habits, setHabits] = useState<home[]>([]);
   const [favoriteAffirmations, setFavoriteAffirmations] = useState<home[]>([]);

     useEffect(() => {
    if (userId) {
      axios
        .post('habits/list', { data: { googleId: userId.toString() } })
        .then((response) => setHabits(response.data))
        .catch((error) => console.error(error));

        axios
        .get(`/affirmations/retrieve-favorites/${userId}`)
        .then(({ data }) => {
          if (data && data.length > 0) { // check if data is not empty
            setFavoriteAffirmations(data);
            // console.log(data, 'here');
          }
        })
        .catch((error) => console.error(error, 'nooo'));
    }
  }, [userId]);

  const [letterSpacing, setLetterSpacing] = useState(0);
  const sectionRef:any = useRef(null);

  useEffect(() => {
    let prevScrollY = window.scrollY;
    let isPastSection = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollFactor = 0.5; // Adjust this value to control the speed of letter spacing change
      const sectionOffset = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollThreshold = sectionOffset + sectionHeight;

      if (currentScrollY > prevScrollY) {
        if (currentScrollY > scrollThreshold) {
          if (!isPastSection) {
            setLetterSpacing((prevSpacing) => prevSpacing + scrollFactor);
            isPastSection = true;
          }
        } else {
          setLetterSpacing((prevSpacing) => prevSpacing + scrollFactor);
          isPastSection = false;
        }
      } else {
        setLetterSpacing((prevSpacing) => prevSpacing - scrollFactor);
        isPastSection = false;
      }

      prevScrollY = currentScrollY ;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div ref={sectionRef} style={{backgroundColor:"#009CAD"}}>

<div >
<HomePartOne/>
</div>
{/* drip stuff */}
<div style={{ position: "relative" }}>
  <div style={{
    zIndex: 20,
    background: " url('https://i.imgur.com/I7Qppve.png')",
    backgroundSize: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "600px",
  }}>
  </div>

    <HomePartTwo  />

</div>
{/* drip stuff */}
    <div style={{ textAlign: 'center',position: "relative" }}>
    <div style={{
    zIndex: 20,
    background: " url('https://i.imgur.com/JVchQzl.png')",
    backgroundSize: "cover",
    position: "absolute",
    top: "0%",
    left: 0,
    width: "100%",
    height: "550px"
  }}>
  </div>
  <CheckIn />
  {/* drip stuff */}
<div style={{position:"relative"}}>
  <div style={{
    zIndex: 20,
    background: " url('https://i.imgur.com/OWafM6W.png')",
    backgroundSize: "cover",
    position: "absolute",
    top: "-1%",
    left: 0,
    width: "100%",
    height: "500px",
  }}>
    </div>
    </div>

      <div
      style={{
        textAlign: 'center',
        letterSpacing: '0.30em',
        background: "linear-gradient(180deg, #FF8974 30%, #FFC7B0 60%, #FFCAB3 100%)",

      }}
      id="affirmations"

    >
<div style={{padding: `${Math.min(Math.max(letterSpacing + 100, 250), 300)}px`}}>
      {/* replace all this with the actual functionality when the time comes */}
      <h1 style={{fontSize:"100px", color:"white", textShadow: "2px 2px 4px #000000"}}
      >AFFIRMATIONS</h1>
      <div style={{ display: "flex", justifyContent: "space-between", marginLeft:"200px", marginRight:"200px"}}>
  <img className='balloonWiggle'
    src="https://i.imgur.com/W3eeJwE.png"
    style={{ marginTop: "-90px" }}
  />
  <img className='balloonWiggle'src="https://i.imgur.com/W3eeJwE.png" />
  <img className='balloonWiggle'
    src="https://i.imgur.com/W3eeJwE.png"
    style={{ marginTop: "-90px" }}
  />
</div>
</div>





      <div style={{padding:"80px"}}>
      <div style={{
      margin:'60px auto',
      color: 'white',
      backgroundColor:'#FC6E47',
      width: '70%',
      height: 'auto',
      textAlign:'center',
      // marginBottom:'400px',
      padding:'20px',
      fontWeight:"bolder",
    }}>
      <div style={{padding:"10px"}}>
        {favoriteAffirmations.length === 0 ?  "Your favorite affirmations will show up here" :
    favoriteAffirmations.slice(favoriteAffirmations.length - 1).map((favorite: any) => (
      <AffirmationHome key={favorite.user_id} entryId={favorite.id} title={favorite.title} affirmations={favorite.affirmationList.split('/n')} />
    ))
  }
</div>
</div>
<IconButton
                      component={Link}
                      to={`/affirmations`}
                      style={{ cursor: 'pointer' }}
                    >
                      <div style={{fontSize: '15px'}}> View More</div>
                      <NavigateNextIcon />
                    </IconButton>

      </div>

      </div>
      <div style={{position:"relative"}}>
  <div style={{
    zIndex: 20,
    background: " url('https://i.imgur.com/3FYNuGE.png')",
    backgroundSize: "cover",
    position: "absolute",
    top: "-1%",
    left: 0,
    width: "100%",
    height: "600px",
  }}>
    </div>
    </div>
      <div
      style={{
        textAlign: 'center',
        letterSpacing: '0.5em',
        backgroundColor:"#77E0D7",
        padding:"100px"
      }}
      id="habits"
    >
      {/* replace all this with the actual functionality when the time comes */}
      <h2 style={{marginTop:"200px",fontSize:"80px", color:"white", textShadow: "2px 2px 4px #000000",padding:"200px"}}>FORM NEW HABITS</h2>
      <div style={{

      borderRadius:'40px',
      margin:'60px auto',
      color: '#6BB76A',
      backgroundColor:'#6BB76A',
      width: '70%',
      minHeight: '250px',
      textAlign:'center',
      marginBottom:'250px',
      padding:'30px'
    }}>
      <h3>HABIT CHARTS</h3>
       <div  style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {habits.slice(0, 3).map((habit) => (
        <HabitHome key={habit.id}
          habit_name={habit.habit_name}
           habit_type={habit.habit_type}
           habit_createdAt={habit.habit_createdAt}
           id={habit.id}
           />
      ))}
      </div>
      {/* <HabitCreate></HabitCreate> */}
      </div>
      </div>
      <div style={{position:"relative"}}>
  <div style={{
    zIndex: 20,
    background: " url('https://i.imgur.com/QjJW1du.png')",
    backgroundSize: "cover",
    position: "absolute",
    top: "-1%",
    left: 0,
    width: "100%",
    height: "500px",
  }}>
    </div>

  </div>
<div style={{backgroundColor:"#009CAD", padding:"100px"}}>
<h2 style={{marginTop:"250px",fontSize:"80px", color:"white", textShadow: "2px 2px 4px #000000"}}>YOUR MASTERPIECE</h2>
      <SavedPaintings/>

</div>

    </div>

 <Footer></Footer>
    </div>

  );
};

export default Home;
