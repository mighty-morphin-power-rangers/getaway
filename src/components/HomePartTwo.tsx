import React from "react";
import { Link } from "react-router-dom";

const HomePartTwo = () =>{


  const scrollToSection = (id:any)=>{
    const section:any = document.getElementById(id)
    section.scrollIntoView({behavior:"smooth"})
  }
return(

<div style={{
       background: "linear-gradient(45deg, #a18cd1 0%, #fbc2eb 80%, #fbc2eb 100%)",
       minHeight: "100vh",
       position: "relative",
       zIndex: 10,
    }}>
       <div style={{ color:"white", padding:"60px", textShadow: "2px 2px 4px #000000", letterSpacing:"10px"}}>
        <h1 style={{fontSize:"120px",lineHeight: "0.3em", marginTop:"400px"}}>EXPLORE</h1>

        <p style={{fontSize:"20px", maxWidth:"600px"}}>There’s lots to do here at getaway to escape, and feel good. Whether you want to relax, and meditate. Express yourself creatively, listen to your favorite songs, or simply tell yourself, “You are enough” Because here at Getway, you are.</p>

        <div style={{marginTop:"200px", fontSize:"40px"}}>
      <h1 style={{textAlign:"right"}} onClick={() => scrollToSection("affirmations")}>AFFIRMATIONS</h1>
      <img src="https://i.imgur.com/VJP3Wvg.png" style={{position: "absolute", top: "35%", right: "60%"}}/>
    </div>
    <div style={{marginTop:"200px", fontSize:"40px"}}>
      <Link to="/meditation" style={{color: "white",textDecoration: "none"}}>
      <h1>MEDITATIONS</h1>
      </Link>
      <img src="https://i.imgur.com/gBMu1FR.png" style={{position: "absolute", top: "48%", right: "10%"}}/>
    </div>
    <div style={{marginTop:"200px", fontSize:"40px"}}>
      <h1 style={{textAlign:"right"}}onClick={() => scrollToSection("habits")}>HABITS</h1>
      <img src="https://i.imgur.com/Ec1Q1yD.png" style={{position: "absolute", top: "60%", right: "50%"}}/>
    </div>
    <div style={{marginTop:"200px", fontSize:"40px"}}>
      <h1 onClick={() => scrollToSection("painting")}>PAINTING</h1>
      <img src="https://i.imgur.com/qh6ZUFn.png" style={{position: "absolute", top: "75%", right: "10%"}}/>
    </div>
    <div style={{marginTop:"200px", fontSize:"40px"}}>
      <Link to ="/music" style={{color: "white",textDecoration: "none"}}>
      <h1 style={{textAlign:"right"}}>MUSIC</h1>
      </Link>
      <img src="https://i.imgur.com/KZSbr90.png" style={{position: "absolute", top: "84%", right: "50%"}}/>
    </div>

      </div>
      <img src="https://i.imgur.com/MPpLnTB.png" style={{position: "absolute", top: "20%", right: "10%", transform: "translateY(50%)"}}/>




    </div>


)

};


export default HomePartTwo;