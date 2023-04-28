import React, {useRef, useEffect, useState, useContext} from "react";
import { UserContext, UserContextType } from '../App';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import '@tensorflow/tfjs-backend-webgl';
import drawHand from "../../utilities"
// @ts-ignore
import * as fp from "fingerpose";
// @ts-ignore
import GestureEstimator from "../../node_modules/fingerpose/src/GestureEstimator"
import  Button  from "@mui/material/Button";
import axios from "axios";
// @ts-ignore
import { HexColorPicker } from "react-colorful";

const Painting = () =>{

  const { userName, userId }: UserContextType = useContext(UserContext) ?? { userName: null, userId: null };

//refs of webcam and canvases
  const webcamRef: React.RefObject<Webcam> = useRef<Webcam>(null);
  const canvasRef: any = useRef(null);
  const canvasTwoRef:any = useRef(null);

  //states
  const [color, setColor ] = useState("#aabbcc")
  const [ indexFing, setIndexFing ]:any = useState(null);
  const [ gesture, setGesture ] = useState(
    {
      gestures:[
        {
        name:'',
        score:0
        }
  ]})

  const runHandPose = async () =>{

    const net = await handpose.load()
    console.log("hand pose loaded")
    //loop to constantly search for a hand in frame
    setInterval(()=>{
      detect(net)
    }, 50)
  }

  const detect = async (net:any)=>{
    //check data is available
    if(webcamRef.current && webcamRef.current.video){
    if(
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4

    ){
        //get video properties
        const video = webcamRef.current.video
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;
    //Set height and width
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;
    //set Canvas height and width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;
    //Make detections
    const hand = await net.estimateHands(video);
    //console.log(hand)

      //getting gestures
      if(hand.length > 0){
        const GE = new GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 8)
        //console.log('gesture', gesture)
        setGesture(gesture);
      }

//set state of index finger tip
    if(hand[0].landmarks){
    setIndexFing(hand[0].landmarks[8])
    }
    //draw mesh
    const canvas:any = canvasRef.current
    const ctx = canvas.getContext("2d");
//draws circles oer hand
drawHand(hand, ctx)
    }
  }
  }

useEffect(()=>{
  runHandPose();
},[])


const ArtistCanvas = ()=>{
  const canvasTwo = canvasTwoRef.current;
  const ctx = canvasTwo.getContext('2d');
  ctx.scale(-1, 1);
  ctx.translate(-canvasTwo.width, 0);
  ctx.fillStyle = color;
  ctx.beginPath();

  if(indexFing && gesture.gestures[0] && gesture.gestures[0].name === 'victory'){
    //console.log(gesture.gestures[0].name)
  ctx.arc(indexFing[0]/1.9, indexFing[1]/2.4, 5, 0, Math.PI * 2);
  ctx.fill();
  //delete this line to make it cool double mirrored
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}


const ClearCanvas = () =>{
  const canvas = canvasTwoRef.current;
  const ctx = canvas.getContext("2d")
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const SaveCanvas = () =>{
  const canvas:any = document.getElementById("canvas2")
  const dataURL = canvas.toDataURL();
  console.log(dataURL)
  axios.post('/paintings/save',{
    data:{
    googleId:userId,
    url: dataURL
    }
  })
  .then(()=>{
    console.log("painting saved")
  })
  .catch((err)=>{
    console.error('couldnt save painting', err)
  })
}


useEffect(() => {
 ArtistCanvas();
}, [indexFing]);

return(
  <div>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <h1>Painting Page</h1>
  <Button onClick={SaveCanvas}>Save Painting</Button>
  <Button onClick={ClearCanvas}>Clear Canvas</Button>
<Webcam ref={ webcamRef }
style={{
  transform: "scaleX(-1)",

  marginLeft:"auto",
  marginRight:"auto",
  left:0,
  right:0,
  textAlign:"center",
  zIndex:9,
  width:640,
  height:480
}} />


  <canvas
    ref={canvasRef}
    id={"canvas1"}
    style={{
      transform: "scaleX(-1)",
      marginLeft:"auto",
      marginRight:"auto",
      left:0,
      right:0,
      textAlign:"center",
      zIndex:9,
      width:640,
      height:480
    }}
  />
    </div>
    <div>
    <canvas
  ref={canvasTwoRef}
  id={"canvas2"}
  style={{
    backgroundColor: "black",
    marginLeft:"auto",
    marginRight:"auto",
    width: 640,
    height: 480,
    left:0,
      right:0,
    marginTop: "50px", // adjust as needed
    position: "absolute",
    top: "600px", // adjust as needed
  }}
/>

</div>

<div style={{ padding: "80px", display: 'flex', flexDirection: 'column', alignItems: 'center' , marginBottom:"200px"}}>
<HexColorPicker color={color} onChange={setColor}/>
</div>

</div>

)

};

export default Painting;