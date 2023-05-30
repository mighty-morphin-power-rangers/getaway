import  IconButton  from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import axios from "axios"
import React, {useRef, useEffect, useState, useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext, UserContextType } from '../App';
import  Button from '@mui/material/Button';
import "./savedPainting.css";

const SavedPaintings = () =>{
  const { userName, userId }: UserContextType = useContext(UserContext) ?? { userName: null, userId: null };

const [paintings, setpaintings ]:any = useState(null);



  const getPaintings = ()=>{
     axios.get(`/paintings/all-paintings?googleId=${userId}`)
    .then((response)=>{
      response.data.map((painting:any)=>{
const binaryString = String.fromCharCode.apply(null, Array.from(painting.url.data))
const base64String = btoa(binaryString)
painting.url = `data:image/png;base64,${base64String}`;
      })
      setpaintings(response.data)
    })
  }

  const deletePaintings=()=>{
    axios.delete('/paintings/delete',{
      data: {
        id: paintings[paintings.length - 1].id
      }
    })
    .then(()=>{
      getPaintings();
      // console.log("painting Deleted")
    })
  }

    useEffect(()=>{
      getPaintings()
    }, [paintings])




  return (
    <div>
    <div style={{
      margin:'100px auto',
      textAlign:'center',
      marginBottom:'250px',
      padding:'100px',

    }} id="painting">

<div style={{ zIndex: 2,
     backgroundImage: paintings && paintings.length > 0 ? `url(${paintings[paintings.length - 1].url})` : '',
     backgroundSize: '700px 500px',
     backgroundPosition: 'center',
     backgroundRepeat: 'no-repeat',
     height: '630px',
     width: '770px',
     position: 'absolute',
     transform: 'translate(-50%, -50%) scaleX(-1)',
     top: '94%',
     left: '50%',}}>

</div>
              <canvas
    style={{
      backgroundImage: 'url("https://i.imgur.com/bEuLk8H.png")',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '580px',
      width: '1400px',
      position: 'absolute',
      top: '94%',
      left: '50%',
      transform: 'translate(-50%, -50%) scaleX(-1)',
      zIndex: 3
    }}
  />
  <canvas

    id={"canvas2"}
    style={{
      backgroundImage: 'url("https://i.imgur.com/BjBH0w5.jpg")',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '480px',
      width: '700px',
      position: 'absolute',
      top: '94%',
      left: '50%',
      transform: 'translate(-50%, -50%) scaleX(-1)',
      boxShadow: '37px -27px 27px rgba(0, 0, 0, 0.5)',
  WebkitBoxShadow: '37px -27px 27px rgba(0, 0, 0, 0.5)',
  MozBoxShadow: '37px -27px 27px rgba(0, 0, 0, 0.5)',
      zIndex: 0
    }}
  />



    </div>

<div style={{position:"absolute", zIndex:5, top:"99%", left: "50%", margin:"10px"}}>
<IconButton
          onClick={deletePaintings}
          style={{ marginTop: '15px', cursor: 'pointer' }}
        >
          <DeleteOutlineOutlinedIcon />
        </IconButton>
        <Link to={{ pathname: '/painting' }} style={{ textDecoration: "none" }}>
  <img className="brush"
    src="https://i.imgur.com/OL2LlrX.png"
    alt="Paint More"
    style={{
      width: '60px',
      height: '60px',
      transition: 'transform 0.3s',
      cursor: 'pointer',
    }}
  />
</Link>
</div>

</div>
  )
}


export default SavedPaintings