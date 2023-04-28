import React from 'react'

interface AffirmationHomeProps {
    entryId: number;
    title: string;
    affirmations: string[];
  }

const AffirmationHome: React.FC<AffirmationHomeProps> = ({title, affirmations, entryId }) =>  {
    return (
        <div>
            <h2>{title}</h2>
            <ul>
            {affirmations.map((favorite) => (
             <li style={{listStyleType: 'none'}}>{favorite}</li>
          ))}
          </ul>
      </div>
    )
}

export default AffirmationHome;