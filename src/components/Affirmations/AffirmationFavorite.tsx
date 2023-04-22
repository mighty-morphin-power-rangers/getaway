import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface AffirmationFavoriteProps {
    entryId: number;
    title: string;
    favorite: string;
    affirmations: string[];
    user: number;
  }

const AffirmationFavorite: React.FC<AffirmationFavoriteProps> = ({title, favorite, affirmations, entryId, user }) =>  {

    const card = (<React.Fragment>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2">
          <div id={`affirmationList-${entryId}`}>
                  {affirmations.map((affirmation: string) => (
                    <div>{affirmation}</div>
                  ))}
                </div>
          </Typography>
        </CardContent>
        <CardActions>
          <FavoriteIcon style={{ color: 'red' }} />
        </CardActions>
      </React.Fragment>)
return (
    <div
    id='affirmations'
    style={{ display: 'flex', justifyContent: 'center' }}
  >
  <Box boxShadow={7}> <Card
        variant='outlined'
        id={`card-${entryId}`}
        style={{
          width: '600px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'black'
        }}
      > {card}</Card></Box>
    </div>
)
}

export default AffirmationFavorite;