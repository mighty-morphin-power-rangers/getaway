import React, {useRef, useEffect, useState} from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import '@tensorflow/tfjs-backend-webgl';
import drawHand from "../../utilities"

const Painting = () =>{

  const webcamRef: React.RefObject<Webcam> = useRef<Webcam>(null);
  const canvasRef: any = useRef(null);


  const runHandPose = async () =>{

    const net = await handpose.load()
    console.log("hand pose loaded")
    //loop to constantly search for a hand in frame
    setInterval(()=>{
      detect(net)
    }, 100)
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
    console.log(hand)
    //draw mesh
const ctx = canvasRef.current.getContext("2d")
drawHand(hand, ctx)

    }
  }
  }


runHandPose();

return(
  <div>
  <h1>Painting Page</h1>
<Webcam ref={ webcamRef }
style={{
  position:"absolute",
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
style={{
  position:"absolute",
  marginLeft:"auto",
  marginRight:"auto",
  left:0,
  right:0,
  textAlign:"center",
  zIndex:9,
  width:640,
  height:480
}} />
  </div>
)

};

export default Painting;