
let oldX:any = [];
let oldY:any = [];

const drawHand = (predictions:object[], ctx:any) =>{
  //check if there are predictions
  ctx.clearRect(0, 0, 640, 480);
  if(predictions.length > 0){
    //loop through each prediction to draw the hand
    predictions.forEach((prediction:any)=>{
      //grab landmarks (coordinates of each tracked hand point 20 total each with a x, y and z coordinate)
      const landmarks = prediction.landmarks;
      // loop through each landmark
      for(let i =0; i < landmarks.length; i++){
        // x coordinate
        const x = landmarks[i][0];
        // y coordiante
        const y = landmarks[i][1]

        //the drawing
        // ctx.beginPath();
        // ctx.arc(x, y, 5, 0, 3 * Math.PI);


        // Set color
        // ctx.fillStyle = "indigo"
        // ctx.fill();
        oldX.push(x);
        oldY.push(y)
        ctx.lineWidth = 10;
        ctx.linecap = "round"
        if (oldX.length >= 2 && oldY.length >= 2) {
          ctx.beginPath();
          ctx.moveTo(oldX[oldX.length-2], oldY[oldY.length-2]);
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.closePath();
        }
      }





    })
  }

}

export default drawHand;