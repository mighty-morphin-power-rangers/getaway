import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SpaIcon from '@mui/icons-material/Spa';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookIcon from '@mui/icons-material/Book';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import BrushIcon from '@mui/icons-material/Brush';
import PianoIcon from '@mui/icons-material/Piano';
import { alignProperty } from '@mui/material/styles/cssUtils';
const data = [
  { name: 'Dashboard', icon: <DashboardIcon />, link: '/' },
  { name: 'Growth', icon: <SpaIcon />, link: '/habits' },
  { name: 'Guidance', icon: <BookIcon />, link: '/guidance' },
  { name: 'Meditation', icon: <SelfImprovementIcon />, link: '/meditation' },
  { name: 'Recess', icon: <NaturePeopleIcon />, link: '/recess' },
  { name: 'Affirmations', icon: <FavoriteIcon />, link: '/affirmations' },
  { name: 'Painting', icon: <BrushIcon />, link: '/painting' },
  { name: 'Music', icon: <PianoIcon />, link: '/music' },
  // { name: 'Profile', icon: <AccountCircleIcon />, link: '/profile' },
];

function NavBar() {
  const [open, setOpen] = useState(false);

  const logout = () => {
    window.open(`${process.env.REACT_APP_CLIENT_URL}auth/logout`, '_self');
  };

 const getList = () => (
  <div style={{ width: 250 }} onClick={() => setOpen(false)}>
    {data.map((item) => (
      <Link
        to={{ pathname: item.link }}
        style={{
          textDecoration: "none",
          color: item.link === window.location.pathname ? "#CCD7FF" : "white",
        }}
        key={item.name}
      >
        <ListItem button>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      </Link>
    ))}
  </div>
);

  return (
    <div style={{
      position: "absolute",
      top: "0",
      left: "0",
      zIndex:20,
      backgroundImage: "url('https://i.imgur.com/hyj9pA8.png')",
      backgroundSize: "cover",
      width: "100vw",
      height: "50%",
      display: "flex",
      alignItems: "flex-start",
      padding: "10px",
    }}>
      <Link to="/">
      <img src="https://i.imgur.com/NInXwHl.png" style={{ height: "100px", marginRight: "auto",display: "flex",
      alignItems: "flex-start", }}/>
      </Link>
      <div style={{padding:"20px" }}>
      <Button onClick={() => setOpen(true)}>
        <MenuIcon sx={{color:"#FFABAA"}}/>
      </Button>
      <Drawer open={open} anchor={'left'} onClose={() => setOpen(false)}  PaperProps={{ style: { backgroundColor: 'rgb(120, 138, 202)' } }} >
        {getList()}
      </Drawer>
      <Button onClick={logout} sx={{color:"#FFABAA"}}>Logout</Button>
      </div>
    </div>
  );
}

export default NavBar;
