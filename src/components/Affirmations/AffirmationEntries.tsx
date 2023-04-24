import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as React from 'react';
import axios from 'axios';
import { UserContext, UserContextType } from '../../App';
import AffirmationEntry from './AffirmationEntry'
import Button from '@mui/material/Button';

const AffirmationEntries = () => {
    const [retrievedAffirmations, setRetrievedAffirmations] = useState<string[]>([]);
    const { userName, userId }: UserContextType = useContext(UserContext) ?? {userName: null, userId: null};


        const viewAffirmations = () => {
      axios
        .get(`/affirmations/retrieve/${userId}`)
        .then(({ data }) => {
          setRetrievedAffirmations(data);
          // localStorage.setItem('retrievedAffirmations', JSON.stringify(data));

        })
        .catch((err) => console.log(err));
    };

        useEffect(() => {
      viewAffirmations();
    }, []);


    return (
      <div id='parent' style={{ paddingBottom: '500px' }}>
          <Link to="/affirmation-favorites"><Button variant='text'>View Favorites</Button></Link>
             {retrievedAffirmations.map((entry: any) => (
             <AffirmationEntry key={entry.user_id} user={entry.user_id} entryId={entry.id} title={entry.title} favorite={entry.favorite} affirmations={entry.affirmationList.split('/n')}  />))}

        </div>
    );
}

export default AffirmationEntries;
