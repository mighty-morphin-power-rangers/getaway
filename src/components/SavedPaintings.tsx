import  IconButton  from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import axios from "axios"
import React, {useRef, useEffect, useState, useContext} from "react";
import { UserContext, UserContextType } from '../App';


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
        id: paintings[0].id
      }
    })
    .then(()=>{
      console.log("painting Deleted")
    })
  }

    useEffect(()=>{
      getPaintings()
    }, [])




  return (
    <div style={{
      borderRadius:'40px',
      margin:'60px auto',
      color: '#788ACA',
      backgroundColor:'#CCD7FF',
      width: '70%',
      minHeight: '350px',
      textAlign:'center',
      marginBottom:'250px',
      padding:'30px'
    }}>
<p>Saved Paintings</p>
<div>
  {paintings && paintings.length > 0 ? (
          <><img src={paintings ? paintings[0].url : ''} width="640" height="400" /><IconButton
            onClick={deletePaintings}
            style={{ marginTop: '15px', cursor: 'pointer' }}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton></>
  ) : (<p>No Saved Images</p>
  )}
              </div>

    </div>
  )
}


export default SavedPaintings