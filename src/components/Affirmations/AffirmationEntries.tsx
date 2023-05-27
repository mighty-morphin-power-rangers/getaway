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
          setRetrievedAffirmations(data.sort((a: any, b: any) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB.getTime() - dateA.getTime(); // returning entries by most recent date
          }));
        })
        .catch((err) => console.log(err));
    };

    useEffect(() => {
      if (userId) {
        viewAffirmations();
      }
    }, [userId]);


    return (
      <div id='parent' style={{background: "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)", overflow: 'auto'}}>
      <div style={{ paddingBottom: '3%', marginTop: '25%'}}>
             {Array.isArray(retrievedAffirmations) && retrievedAffirmations.map((entry: any) => (
             <AffirmationEntry key={entry.user_id} user={entry.user_id} entryId={entry.id} title={entry.title} favorite={entry.favorite} affirmations={entry.affirmationList.split('/n')}  />))}

        </div>
        </div>
    );
}

export default AffirmationEntries;
