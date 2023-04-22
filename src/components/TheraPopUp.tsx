
import * as React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import  Rating  from '@mui/material/Rating';
import  Box from '@mui/system/Box';
import { UserContext, UserContextType } from '../App' ;





const TheraPopUp = (props:any) =>{
const { popup } = props;

const { userName, userId }: UserContextType = useContext(UserContext) ?? { userName: null, userId: null };
console.log('id test', userId)
type Details = {
  data: {
    result:{
      photos: any;
      name:string,
      icon_background_color:string,
      current_opening_hours:{
        open_now:boolean,
        weekday_text:string[]
      },
      formatted_address:string,
      formatted_phone_number:string,
      rating:number,
      reviews:{
        author_name:string,
        rating:number,
        relative_time_description:string,
        text:string
      }[]
    }
  }
}
const [ therapistDetails, setTherapistDetails ] = useState({
  data: {
    result:{
      photos:'',
      name:'',
      icon_background_color:'',
      current_opening_hours:{
        open_now:false,
        weekday_text:[],
      },
      formatted_address:'',
      formatted_phone_number:'',
      rating:0,
      reviews:[{
        author_name:'',
        rating:0,
        relative_time_description:'',
        text:''
      }]
    }
  }
});
const { data: { result } }: Details = therapistDetails;

const getDetails = () =>{
 axios.get(`/therapist/details?place_id=${popup.place_id}`)
  .then((response:any)=>{

    setTherapistDetails(response)
  })
  .catch((err)=>{
    console.error('not today buster',err)
  })
}

useEffect(()=>{
  getDetails();
},[])

  const handleClick = (e: any) => {
    e.stopPropagation();
  };

  const saveTherapist=()=>{
    axios.post('/therapist/save-therapist', {
        data:{
        googleId: userId,
        name: result.name,
        hours: result.current_opening_hours.weekday_text.join(' '),
        formatted_address: result.formatted_address,
        formatted_phone_number: result.formatted_phone_number,
        rating: result.rating
      }
    }).then(()=>{
      console.log("saved!")
    })
    .catch((err:Error)=>{
      console.error("failed to save therapist", err)
    })

  }


  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (
      <Card sx={{ maxWidth: 500, backgroundColor:"#D1A1C0" , boxShadow: "10px 10px 10px rgba(30,30,30,0.5)", opacity:'95%', backdropFilter: "blur(10px)", backgroundImage: "linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0))" }}onClick={handleClick}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: result.icon_background_color }} aria-label="recipe">
              {result.name[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={result.name}
          subheader={
            <Box display="flex" flexDirection="column">
              <Typography variant="body2">{result.formatted_phone_number}</Typography>
              <Typography variant="body2">{result.formatted_address}</Typography>
              {result.current_opening_hours?
              <Typography sx={{color:result.current_opening_hours.open_now ? "green": "red" }}variant="body2">{result.current_opening_hours.open_now ? "Open" : "Closed"}</Typography>
              : "Hours of Operation, Not Listed"
          }
            </Box>
          }
        />
        <CardMedia
          component="img"
          height="194"
          image= "https://i.imgur.com/bMZzqTo.jpg"
          alt="relax"
        />
        <CardContent>
          <Typography sx={{ textAlign: 'center' }} variant="body2" color="text.secondary">
            {result.current_opening_hours ? result.current_opening_hours.weekday_text.join(' '): "Hours of Operation, Not Listed"}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={saveTherapist}>
            <FavoriteIcon sx={{color:"#6BB76A"}}/>
          </IconButton>
          <Typography variant="body2" color="text.secondary">
        {result.rating}
      </Typography>
      <Rating name="read-only" value={result.rating} readOnly />
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>

        {result.reviews ?
        <div style={{ height: '200px', overflow: 'auto' }}>
  <CardContent >
    {result.reviews.map((review:any) => (
      <div key={review.author_name}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: result.icon_background_color }} aria-label="recipe">
            {review.author_name[0]}
          </Avatar>}
          title={review.author_name}
          subheader={
            <Box display="flex" flexDirection="column">
              <Typography variant="body2">{review.relative_time_description}</Typography>
              <Rating name="read-only" value={review.rating} readOnly />
            </Box>
          }
        />
        <Typography paragraph>{review.text}</Typography>
      </div>
    ))}
  </CardContent>
  </div>
  : "No Reviews Available"
}
        </Collapse>
      </Card>
    );
}

export default TheraPopUp;