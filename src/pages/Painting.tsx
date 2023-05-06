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
import PaintingGuide from '../components/PaintingGuide'
import WavyTop from "../components/WavyTop"
import zIndex from "@mui/material/styles/zIndex";
import LavaLamp from "../components/LavaLamp"

const Painting = () =>{

  const { userName, userId }: UserContextType = useContext(UserContext) ?? { userName: null, userId: null };

//refs of webcam and canvases
  const webcamRef: React.RefObject<Webcam> = useRef<Webcam>(null);
  const canvasRef: any = useRef(null);
  const canvasTwoRef:any = useRef(null);

  //states
  const [ color, setColor ] = useState("#aabbcc")
  const [ indexFing, setIndexFing ]:any = useState(null);
  const [ gesture, setGesture ] = useState(
    {
      gestures:[
        {
        name:'',
        score:0
        }
  ]})
  const [ isColoring, setIsColoring ]:any = useState(false);
  const [colorIndex, setColorIndex ]:any = useState(0);

  const colorButton = ()=>{
    setIsColoring(!(isColoring));
    setColorIndex(colorIndex + 1)
  }

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

function hexToRgb(hex:any) {
  // Convert hex color to 6-digit format if necessary
  const hexColor = hex.charAt(0) === '#' ? hex.substring(1, 7) : hex;

  // Convert hex color to RGB color
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  return { r, g, b };
}

const ArtistCanvas = ()=>{
  const canvasTwo = canvasTwoRef.current;
  const ctx = canvasTwo.getContext('2d');
  // ctx.scale(-1, 1);
  // ctx.translate(-canvasTwo.width, 0);
  const rgbColor = hexToRgb(color);

// Set the fill style to a semi-transparent color
ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.3)`;
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
  <div >
    <div style={{position:"relative", zIndex: -2}}>
    <LavaLamp />
    </div>
  <div style={{ zIndex: -1}}>
<WavyTop color={color}/>
</div>
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: 'calc(70% + 400px)',
    left: '50%',
    transform: 'translate(-50%, -40%)',
    marginBottom:'200px',
    padding:"20px",
    backgroundColor:color,
    borderRadius:"40px"


  }}>
    <Webcam
      ref={webcamRef}
      style={{
        borderRadius: "40px",
        transform: "scaleX(-1)",
        width: 340,
        height: 180,
        zIndex: 9,
      }}
    />
    <HexColorPicker color={color} onChange={setColor}/>
    <Button onClick={SaveCanvas}>Save Painting</Button>
  <Button onClick={ClearCanvas}>Clear Canvas</Button>
  <Button onClick={colorButton}>Stay In The Lines</Button>
  <PaintingGuide/>
  </div>
  <canvas
    ref={canvasRef}
    id={"canvas1"}
    style={{
      position: 'absolute',
      top: '70%',
      left: '50%',
      transform: 'translate(-50%, -50%) scaleX(-1)',
      width: 840,
      height: 680,
      zIndex: 2
    }}
  />
  <canvas
    ref={canvasTwoRef}
    id={"canvas2"}
    style={{
      backgroundImage: 'url("https://i.imgur.com/LFCTIUp.png")',
      opacity:'60%',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '680px',
      width: '840px',
      position: 'absolute',
      top: '70%',
      left: '50%',
      transform: 'translate(-50%, -50%) scaleX(-1)',
      zIndex: isColoring ? 1: -1

    }}
  />
   <canvas
    style={{
      backgroundImage: 'url("https://i.imgur.com/bEuLk8H.png")',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '700px',
      width: '1010px',
      position: 'absolute',
      top: '68%',
      left: '50%',
      transform: 'translate(-50%, -50%) scaleX(-1)',
      zIndex: 3
    }}
  />
  <canvas
    ref={canvasTwoRef}
    id={"canvas2"}
    style={{
      backgroundImage: 'url("https://i.imgur.com/BjBH0w5.jpg")',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '620px',
      width: '840px',
      position: 'absolute',
      top: '70%',
      left: '50%',
      transform: 'translate(-50%, -50%) scaleX(-1)',
      boxShadow: '37px -27px 27px rgba(0, 0, 0, 0.5)',
  WebkitBoxShadow: '37px -27px 27px rgba(0, 0, 0, 0.5)',
  MozBoxShadow: '37px -27px 27px rgba(0, 0, 0, 0.5)',
      zIndex: 0
    }}
  />


<div style={{padding:"1000px"}}>

</div>





</div>

)

};

export default Painting;