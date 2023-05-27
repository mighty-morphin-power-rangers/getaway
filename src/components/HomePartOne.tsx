import React, { useEffect, useState } from "react";

const HomePartOne = () =>{

  const [letterSpacing, setLetterSpacing] = useState(10);

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollFactor = 0.5; // Adjust this value to control the speed of letter spacing change

      if (currentScrollY > prevScrollY) {
        setLetterSpacing((prevSpacing) => prevSpacing + scrollFactor);
      } else {
        setLetterSpacing((prevSpacing) => prevSpacing - scrollFactor);
      }

      prevScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  return(
    <div style={{
      background: "linear-gradient(180deg, #fad0c4 0%, #fad0c4 1%, #ff9a9e 100%)",
      padding: "50px",
      minHeight: "100vh",
    }}>
      <div style={{fontSize:"60px", color:"white", marginTop:"300px", textShadow: "2px 2px 4px #000000", letterSpacing: letterSpacing < 0 ? "0px" : `${Math.min(letterSpacing, 50)}px`,}}>
        <h1 style={{lineHeight: "0.3em"}}>Your</h1>
        <h1 style={{lineHeight: "0.3em"}}>GetAway</h1>
        <h1 style={{lineHeight: "0.3em"}}>Starts</h1>
        <h1 style={{lineHeight: "0.3em"}}>Now</h1>
      </div>
      <img src="https://i.imgur.com/XzjLIda.png" style={{position: "absolute", top: "40%", right: "10%", transform: "translateY(50%)"}}/>



    </div>
  )
}

export default HomePartOne;