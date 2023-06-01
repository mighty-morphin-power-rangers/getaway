import { useState, useEffect} from "react"
import axios from "axios";
import TherapistList from "../components/TherapistList"
import TherapistMap from "../components/TherapistMap"
import  Pagination  from "@mui/material/Pagination";
import FavTherapist from "../components/FavTherapist"
import StaffList from "../components/StaffList";
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { url } from "inspector";
import Footer from '../components/Footer'

const Guidance = () =>{

  const [userLat, setLat] = useState(0);
  const [userLong, setLong] = useState(0);
  const [pagetoken, setpagetoken] = useState(null);
  const [geolocationLoaded, setGeolocationLoaded] = useState(false);
  const [therapists, setTherapists] = useState([]);
  const [ staff, setStaff ] :any = useState([]);

  useEffect(() => {
    getAllStaff();
    //function get the user lat and long
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      setLat(latitude);
      setLong(longitude);
      setGeolocationLoaded(true);
    });
  }, [])

  useEffect(() => {
    //if lat and long has been loaded run get request
    if (geolocationLoaded) {
      getAllTherapists()
    }
  }, [geolocationLoaded, userLat, userLong])

const getAllStaff = ()=>{
  axios.get('/staff/get')
  .then((response)=>{
    setStaff(response.data.data);
  })
  .catch((err)=>{
    console.error("could not get all staff", err)
  })
}

const getAllTherapists = ()=>{
  axios.get('/therapist/search', {
    params:{
      lat: userLat,
      long: userLong
    }
  })
  .then((response)=>{
    setTherapists(response.data.results)
    setpagetoken(response.data.next_page_token)
  })
  .catch((err)=>{
    console.error(err, "could not get therpaists clientside")
  })
}

const getNextTwenty = () =>{
  axios.get('/therapist/next20', {
    params: {
      pagetoken: pagetoken
    }
  })
  .then((response)=>{
    setpagetoken(response.data.next_page_token)
    setTherapists(response.data.results)

  })
  .catch((err)=>{
    console.error('failed to get next twenty search results', err)
  })
}
// console.log( userLat, userLong)
// console.log('hi',therapists)
// console.log('staff', staff)

// const theme = createTheme({
//   palette: {
//     background: {
//       default: '#fafafa', // This is the default background color set in the theme
//     },
//   },
// });


  return (
<div style={{background: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)"}}>
    <div style={{ textAlign:"center", display: "flex", flexDirection: "column", alignItems: "center", color: "white"}}>
    <h1 style={{marginTop:"600px", fontSize:"70px"}}>ITS OKAY TO ASK FOR HELP</h1>
    <h2 style={{width:'50%'}}>
    If you’re thinking about suicide, are worried about a friend or loved one, or would like emotional support, the Lifeline network is available 24/7 across the United States.
    </h2>
    <h3>DIAL 988</h3>
    <img src="https://i.imgur.com/U0c5TH2.png"
    style={{
      margin:'60px auto',
      width: '30%',
      textAlign:'center',
      marginBottom: '60px'
    }}
  />
 <div style={{backgroundColor: "#6BB76A", width: "100%",}}>
  <div style={{marginTop: '60px', marginBottom: '60px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '600px',}}>
    <h2 style={{textAlign: 'left', fontSize: '40px'}}>THERAPISTS NEAR YOU</h2>
    <TherapistMap therapists={therapists} userLat={userLat} userLong={userLong}></TherapistMap>
  </div>
</div>
    <h2 style={{textAlign: 'left', fontSize:'40px'}}>REACH OUT TO SCHEDULE AN APPOINTMENT TODAY</h2>
    <div style={{width:'75%', backgroundColor:'#CCD7FF', padding:'20px', textAlign:'center', display: 'flex', flexDirection:'column', justifyContent:"center", alignItems: "center", borderRadius:'40px'}}>
    <Pagination onClick={getNextTwenty} count={3} variant="outlined" shape="rounded" style={{marginBottom:'30px', color:'#788ACA'}}/>
    <TherapistList therapists={therapists}/>

    </div>
    <div style={{marginTop:"150px", marginBottom:"250px"}}>
    <h2 style={{textAlign: 'left', fontSize:'40px', }}>YOUR FAVORITES</h2>
    <FavTherapist />
    </div>
    <div style={{display: "flex", justifyContent: "center", padding:"60PX",backgroundColor: "#6BB76A", width: "100%"}}>
    <h2 style={{textAlign: 'left', fontSize: '50px', padding:"5px"}}>STAFF THERAPISTS</h2>
  <StaffList staff={staff}/>
</div>
<Footer></Footer>
    </div>

    </div>
  )
  }

  export default Guidance;