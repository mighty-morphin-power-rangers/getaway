import { useState, useEffect} from "react"
import axios from "axios";
import TherapistList from "../components/TherapistList"
import TherapistMap from "../components/TherapistMap"
import  Pagination  from "@mui/material/Pagination";
import FavTherapist from "../components/FavTherapist"



const Guidance = () =>{

  const [userLat, setLat] = useState(0);
  const [userLong, setLong] = useState(0);
  const [pagetoken, setpagetoken] = useState(null);
  const [geolocationLoaded, setGeolocationLoaded] = useState(false);
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
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


const getAllTherapists = ()=>{
  
  axios.get('/therapist/search', {
    params:{
      lat: 29.951065,
      long: -90.071533
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

console.log('hi',therapists)

  return (

    <div style={{margin: '40px', textAlign:"center", display: "flex", flexDirection: "column", alignItems: "center", letterSpacing:"0.4em"}}>
    <h3>ITS OKAY TO ASK FOR HELP</h3>
    <p style={{width:'50%'}}>
    If you’re thinking about suicide, are worried about a friend or loved one, or would like emotional support, the Lifeline network is available 24/7 across the United States.
    </p>
    <h3>DIAL 988</h3>
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
    <div style={{marginTop:'60px', marginBottom:'60px'}}>
    <p style={{textAlign: 'left', fontSize:'18px', letterSpacing:"0.5em"}}>THERAPISTS NEAR YOU</p>
    <TherapistMap therapists={therapists} userLat={userLat} userLong={userLong}></TherapistMap>
    </div>

    <p style={{textAlign: 'left', fontSize:'18px', letterSpacing:"0.5em"}}>REACH OUT TO SCHEDULE AN APPOINTMENT TODAY</p>
    <div style={{width:'75%', backgroundColor:'#CCD7FF', padding:'20px', textAlign:'center', display: 'flex', flexDirection:'column', justifyContent:"center", alignItems: "center", borderRadius:'40px'}}>
    <Pagination onClick={getNextTwenty} count={3} variant="outlined" shape="rounded" style={{marginBottom:'30px', color:'#788ACA'}}/>
    <TherapistList therapists={therapists}/>

    </div>
    <div style={{marginTop:"150px", marginBottom:"250px"}}>
    <p style={{textAlign: 'left', fontSize:'18px', letterSpacing:"0.5em"}}>YOUR FAVORITES</p>
    <FavTherapist />
    </div>

    </div>
  )
  }

  export default Guidance;