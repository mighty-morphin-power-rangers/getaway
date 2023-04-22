import { useState, useEffect } from 'react';
import * as React from 'react';
import axios from 'axios';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';


interface AffirmationEntryProps {
    entryId: number;
    title: string;
    favorite: string;
    affirmations: string[];
    user: number;
  }

  const AffirmationEntry: React.FC<AffirmationEntryProps> = ({title, favorite, affirmations, entryId, user }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState('')
    const [isFavorited, setFavorite] = useState(false)
    const [Heart, setHeart] = useState(<div></div>)

        const deleteAffirmations = (entryId: number) => {
      const titleDiv = document.getElementById(`title-${entryId}`);
      if (titleDiv) {
        titleDiv.style.display = 'none';
      }

      const affirmationListDiv = document.getElementById(
        `affirmationList-${entryId}`
      );
      if (affirmationListDiv) {
        affirmationListDiv.style.display = 'none';
      }

      const cardDiv = document.getElementById(`card-${entryId}`);
      if (cardDiv) {
        cardDiv.style.display = 'none';
      }

      axios
        .delete(`/affirmations/remove/${entryId}`)
        .then(() => console.log('Successfully deleted'))
        .catch((err) => console.log(err));
    };

    const editAffirmationsTitle = () => {
      setIsEditing(true)
    };

    // when user finishes editing and presses enter, update the title
  const handleTitleKeyDown = (e : any) => {
      if (e.key === "Enter") {
      //   updateTitle();
        setIsEditing(false);
      }
    };

    // when user clicks outside the input box, cancel editing
  const handleTitleBlur = () => {
        console.log('hello')
      setIsEditing(false);
    };
    console.log(isFavorited)


    useEffect(() => {
        if (isFavorited) {
          setHeart(<FavoriteIcon style={{ color: 'red' }} onClick={() => handleFavorite(entryId)} />);
        } else {
          setHeart(
            <FavoriteBorderIcon onClick={() => handleFavorite(entryId)} />
          );
        }
      }, [isFavorited]);

      useEffect(() => {
        setFavorite(JSON.parse(favorite));
      }, [favorite]);

//   //   // send a PUT request to update the title
//   // const updateTitle = () => {
//   //     axios
//   //       .put(`/affirmations/${entry.id}`, { title: editedTitle })
//   //       .then((response) => console.log(response))
//   //       .catch((error) => console.log(error));
//   //   };

    //send a PUT request to update the favorite
    //handle when someone favorites an affirmation
    const handleFavorite = (entryId: number) => {
      if (isFavorited === true) {
        setFavorite(false)
        setHeart(<FavoriteBorderIcon />)

        axios.put(`/affirmations/favorite`, {
            entryId: entryId,
            favorite: 'false',
            user_id: user
        })
        .then((response) => console.log(response))
        .catch((err) => console.error(err))

      } else {
        setFavorite(true)
        setHeart(<FavoriteIcon />)

        axios.put(`/affirmations/favorite`, {
            entryId: entryId,
            favorite: 'true',
            user_id: user
          })
          .then((response) => console.log(response))
          .catch((err) => console.error(err))
      }

    }


return (
  <div id='parent'>
    <div
      id='affirmations'
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <Box boxShadow={7}><Card
        variant='outlined'
        id={`card-${entryId}`}
        style={{
          width: '600px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'black'
        }}
      >
        {
          <React.Fragment>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom
              >
                {/* Word of the Day */}
              </Typography>
              <Typography variant='h5' component='div'>
                <div
                  id={`title-${entryId}`}
                  onClick={() => {
                    editAffirmationsTitle();
                  }}
                >
                  {isEditing ? (
                    <input
                      type='text'
                      defaultValue={title}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      onKeyDown={handleTitleKeyDown}
                      onBlur={() => {
                        handleTitleBlur();
                      }}
                    />
                  ) : (
                    <div>
                      <span style={{ marginRight: '10px' }}>{title}</span>
                    </div>
                  )}
                </div>
              </Typography>
              <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                {/* adjective */}
              </Typography>
              <Typography variant='body2'>
                <div id={`affirmationList-${entryId}`}>
                  {affirmations.map((affirmation: string) => (
                    <div>{affirmation}</div>
                  ))}
                </div>
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                onClick={() => deleteAffirmations(entryId)}
                style={{ marginTop: '15px', cursor: 'pointer' }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>

              <div id={`favorite-${entryId}`}>
                <IconButton
                  style={{ marginTop: '15px', cursor: 'pointer' }}
                  onClick={() => {
                    handleFavorite(entryId);
                  }}
                >
                  {Heart}
                </IconButton>
              </div>
            </CardActions>
          </React.Fragment>
        }
      </Card>
      </Box>
    </div>
    <br></br>
  </div>
);

  };

export default AffirmationEntry;