import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import './homeStyles.css';

const HomePartTwo = () => {
  const [letterSpacing, setLetterSpacing] = useState(0);
  const sectionRef:any = useRef(null);

  useEffect(() => {
    let prevScrollY = window.scrollY;
    let isPastSection = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollFactor = 0.3; // Adjust this value to control the speed of letter spacing change
      const sectionOffset = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollThreshold = sectionOffset + sectionHeight;

      if (currentScrollY > prevScrollY) {
        if (currentScrollY > scrollThreshold) {
          if (!isPastSection) {
            setLetterSpacing((prevSpacing) => prevSpacing + scrollFactor);
            isPastSection = true;
          }
        } else {
          setLetterSpacing((prevSpacing) => prevSpacing + scrollFactor);
          isPastSection = false;
        }
      } else {
        setLetterSpacing((prevSpacing) => prevSpacing - scrollFactor);
        isPastSection = false;
      }

      prevScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: any) => {
    const section: any = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={sectionRef}
      style={{
        background: "linear-gradient(180deg, #fbc2eb 0%, #fbc2eb 20%, #9D84C9 100%)",
        minHeight: "100vh",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div style={{ color: "white", padding: "60px", textShadow: "2px 2px 4px #000000" }}>
        <h1 style={{ fontSize: "120px", lineHeight: "0.3em", marginTop: "400px", letterSpacing: letterSpacing < 0 ? "0px" : `${letterSpacing}px` }}>
          EXPLORE
        </h1>

        <p style={{fontSize:"20px", maxWidth:"600px"}}>There’s lots to do here at getaway to escape, and feel good. Whether you want to relax, and meditate. Express yourself creatively, listen to your favorite songs, or simply tell yourself, “You are enough” Because here at Getway, you are.</p>

        <div style={{marginTop:"200px", fontSize:"40px"}}>
      <h1 className="pageMenus"style={{textAlign:"right", marginRight:"100px", }} onClick={() => scrollToSection("affirmations")}>AFFIRMATIONS</h1>
      <img className="imgWiggle"src="https://i.imgur.com/VJP3Wvg.png" style={{position: "absolute", top: "35%", right: "60%"}}/>
    </div>
    <div style={{marginTop:"200px", fontSize:"40px"}}>
      <Link to="/meditation" style={{color: "white",textDecoration: "none"}}>
      <h1 className="pageMenus" style={{marginLeft:"100px"}}>MEDITATIONS</h1>
      </Link>
      <img className="imgWiggle" src="https://i.imgur.com/gBMu1FR.png" style={{position: "absolute", top: "48%", right: "10%"}}/>
    </div>
    <div style={{marginTop:"200px", fontSize:"40px"}}>
      <h1 className="pageMenus" style={{textAlign:"right", marginRight:"100px"}}onClick={() => scrollToSection("habits")}>HABITS</h1>
      <img className="imgWiggle" src="https://i.imgur.com/Ec1Q1yD.png" style={{position: "absolute", top: "60%", right: "50%"}}/>
    </div>
    <div style={{marginTop:"200px", fontSize:"40px"}}>
      <h1 className="pageMenus" onClick={() => scrollToSection("painting")} style={{marginLeft:"100px"}}>PAINTING</h1>
      <img className="imgWiggle" src="https://i.imgur.com/qh6ZUFn.png" style={{position: "absolute", top: "72%", right: "10%"}}/>
    </div>
    <div style={{marginTop:"200px", fontSize:"40px"}}>
      <Link to ="/music" style={{color: "white",textDecoration: "none"}}>
      <h1 className="pageMenus" style={{textAlign:"right", marginRight:"100px"}}>MUSIC</h1>
      </Link>
      <img className="imgWiggle" src="https://i.imgur.com/KZSbr90.png" style={{position: "absolute", top: "84%", right: "50%"}}/>
    </div>

      </div>
      <img className="imgWiggle" src="https://i.imgur.com/MPpLnTB.png" style={{position: "absolute", top: "20%", right: "10%", transform: "translateY(50%)"}}/>




    </div>


)

};


export default HomePartTwo;