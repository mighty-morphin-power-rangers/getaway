import { useState, useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import { UserContext, UserContextType } from '../../App';
import axios from 'axios';
import AffirmationFavorite from '../Affirmations/AffirmationFavorite'


const AffirmationFavorites = () => {
    const [favoriteAffirmations, setFavoriteAffirmations] = useState<string[]>([]);
    const { userName, userId }: UserContextType = useContext(UserContext) ?? {userName: null, userId: null};


    const viewAffirmations = () => {

      axios
        .get(`/affirmations/retrieve-favorites/${userId}`)
        .then(({ data }) => {
          setFavoriteAffirmations(data);

        })
        .catch((err) => console.log(err));
    };

        useEffect(() => {
      viewAffirmations();
    }, []);



    return (
        <div>
              <Link to="/affirmations"><Button variant='text'>Back to Affirmations</Button></Link>
              {favoriteAffirmations.map((entry: any) => (
             <AffirmationFavorite key={entry.user_id} user={entry.user_id} entryId={entry.id} title={entry.title} favorite={entry.favorite} affirmations={entry.affirmationList.split('/n')}  />))}



        </div>
    )
}

export default AffirmationFavorites;