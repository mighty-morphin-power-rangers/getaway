import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import LoopIcon from '@mui/icons-material/Loop';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';


import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import MusicOffOutlinedIcon from '@mui/icons-material/MusicOffOutlined';


import React, { useState } from 'react';

const MusicBar = () =>{



  // *****************
  // *   PLAYLIST    *
  // *****************

  const playlists = [
    {
      title: 'Ambient',
      songs: [
      {
      src: 'https://drive.google.com/uc?export=download&id=14jgn0UdehgKAmD00dQVUj3ygbXoGHK4u',
      artist: 'MFDOOM',
      title: 'High John',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1GQyIwyGUE8P3GpTnlH_f1mHay3jEyXY2',
      artist: 'Nujabes',
      title: 'Counting Stars',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1jBxq5DuwSVkEiP4usHvUT64DQLY_4cbz',
      artist: 'Javier Santiago ft. Elena Pinderhughes',
      title: 'Trance - Rebirth',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1jj1Iv8lnNQxN70HDCVblO8Oa6NJlDJHN',
      artist: 'Orchid Mantis',
      title: 'I Was Above My Body',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1xeNpwgXV5hyZYhB4Ip5RA8FDOTmXo_Bd',
      artist: 'Flying Lotus',
      title: 'Crust',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=11M-ygnbmYfpeOCWAkBYKTAfq3O2xujEV',
      artist: 'knxwledge',
      title: 'stilluhme',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1AGyGSbHVcY_7gqYA9LeNiuaAfHRBRDe_',
      artist: 'Sympho Cat',
      title: 'Long Whale Song',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1_Z9oTVZ73lHt_6CA8mUfpnUKWVqmYooU',
      artist: 'Chihei Hatakeyama',
      title: 'White Light',
      },
      {
        src: 'https://drive.google.com/uc?export=download&id=18cPiyNQYL0f9Gnaz3FP-Wh8wrJgI2yGs',
         artist: 'Brian Eno - Harold Budd',
      title: 'An Arc Of Doves',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1cIE8Yg_rzUwsbuyP9T3Nsz-dxI4eoWNN',
      artist: 'Brian Eno - Harold Budd - Eugene Bowen',
      title: 'Steal Away',
      },
      ],
      },
    {
      title: 'Sad',
      songs: [
      {
      src: 'https://drive.google.com/uc?export=download&id=1wVQq-1G8ONVmK1elTCLiPe_qtH07bxXK',
      artist: 'TV Girl',
      title: 'Blue Hair',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1qNPv9t_mEzPM3fTwn7tOnqAW-fkguNxX',
      artist: 'Fleetwood Mac',
      title: 'Say You Love Me',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1o8fSUwbblxIYmN92o27r4vQNnGg4kgce',
      artist: 'Cafuné',
      title: 'Tek It',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1jMRp4tmibZfKfQWSSTTxxYoY2UJHj3TX',
      artist: 'Sagun & Shiloh Dynasty',
      title: "I'll Keep You Safe",
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1jFgSuMzdPdrC8jOJ42NxPZy4maj7qUkN',
      artist: 'Adele',
      title: 'Someone Like You',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1aV48eo2FDu8aRWxY2lp3-ocDiMG4qo-O',
      artist: 'R.E.M',
      title: 'Everybody Hurts',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1OKxq82S80iZKp10BPd8ZBR4sZlRjkcqj',
      artist: 'Simon & Garfunkel',
      title: 'The Sounds Of Silence',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1MUjXBpm52DDnpaLhqAEWkBumH8NYGQmR',
      artist: 'Coldplay',
      title: 'Fix You',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1AWkrULEPn_3S8zt1DjinSbHiRWGTRxIK',
      artist: 'Mac Demarco',
      title: 'Heart To Heart',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=17nt5IjnuMgEzphIdyB87-fV1hRwrl-nM',
      artist: 'Post Malone',
      title: 'I Fall Apart',
      },
      ],
      },
    {
      title: 'Feel Good',
      songs: [
      {
      src: 'https://drive.google.com/uc?export=download&id=1b5bp9p6Zoh6nunkgkiLD8BpaHIQg_Hb3',
      artist: 'Earth, Wind & Fire',
      title: 'September',
      },
      {
        src: 'https://drive.google.com/uc?export=download&id=13FBlSHMn5WdoxfgmObg_fhBfrt3pxWDK',
        artist: 'Chris Brown',
        title: 'Yeah 3x',
        },
      {
      src: 'https://drive.google.com/uc?export=download&id=1u_LyZhmNFuXUPv5JTpU9cRHjzRYe615s',
      artist: 'Whitney Houston',
      title: 'I Wanna Dance With Somebody',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1Z_NIo3fNLcE7m11eWlZYnIdq4eJPR90I',
      artist: 'Mark Ronson ft. Bruno Mars',
      title: 'Uptown Funk',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1beyxn0VWG5EowmGigQ6LKQNc7JssdXVj',
      artist: 'Katrina and the Waves',
      title: 'Walking on Sunshine',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1GrAdfUkBR4r_Y85Z4VvpMOKcdc-0_JuP',
      artist: 'Justin Timberlake',
      title: "Can't Stop the Feeling!",
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1wvQ7jDtrOeR_1P9fxHkwAL6jjyvdhSVU',
      artist: 'James Brown',
      title: 'I Got You (I Feel Good)',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1Y2qk8h1NxRXFx5t7cWejLBgPNtI0DHz5',
      artist: 'ABBA',
      title: 'Dancing Queen',
      },
      {
        src: 'https://drive.google.com/uc?export=download&id=12H9gev9RdYtLCN9AJGJNXX-d6VUKAUJj',
        artist: 'Journey',
        title: "Don't Stop Believin'",
        },
        {
          src: 'https://drive.google.com/uc?export=download&id=1Zd2bMvhGxs7ZA_RElnu0QdLdTTS9wmaO',
          artist: 'Pharrell Williams',
          title: 'Happy',
          },
      ],
      },
    {
      title: 'Focus',
      songs: [
      {
      src: 'https://drive.google.com/uc?export=download&id=1y2cDB289XgTXMARrmi3p_KFzWhM2BQad',
      artist: 'Nova',
      title: 'Trees In The Wind',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1OYw6_JkpZ4VKVUEohSdd2FcQDCdVAK5F',
      artist: 'Elior',
      title: 'Discover',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1_ct1-EPG9tjGtkl9t04JVWln5162ZlPr',
      artist: 'Tenno',
      title: 'Daydreaming',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1185UJc9i6KP8BUi8Y-w2ig5LCWlaGj_z',
      artist: 'Flovry',
      title: 'First Heartbreak',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1ZNMRkv20M6LzBYxcP0y7k9s6nfsIWem6',
      artist: 'Softy',
      title: 'Lazy Afternoon',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1EOlzI4-SEl4oPaaqbDCKEOsnEANiPf-E',
      artist: 'Amies',
      title: 'Memory Lane',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1AFRu6SAAfJEIMdEQw4cGi9HhbLQ74kUc',
      artist: 'ChilledCow',
      title: 'Nova',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1c6nRoVvOw4jwsf2ZotyHGQvruc9YkXQw',
      artist: 'No Spirit',
      title: 'Running Out Of Time',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=1uVem858hkkzy79yxJw-F1_N4RC5J5tBt',
      artist: 'Chilled Cow',
      title: 'Snowman',
      },
      {
      src: 'https://drive.google.com/uc?export=download&id=15K4IW-KZaXiysU6v57FLYf-Qhs7Qu2El',
      artist: 'DaniSogen',
      title: 'Flowing',
      },
      ],
      },
  ];
  // *****************
  // *   PLAYLIST    *
  // *****************


// *****************
// *  AUDIO ICONS  *
// *****************
const customIcons = {
  play: <PlayArrowOutlinedIcon style={{ color: 'rgb(120, 138, 202)' }} />,
  pause: <PauseOutlinedIcon style={{ color: 'rgb(120, 138, 202)' }} />,
  rewind: <FastRewindIcon style={{ color: 'rgb(120, 138, 202)' }} />,
  forward: <FastForwardIcon style={{ color: 'rgb(120, 138, 202)' }} />,
  previous: <SkipPreviousOutlinedIcon style={{ color: 'rgb(120, 138, 202)' }} />,
  next: <SkipNextOutlinedIcon style={{ color: 'rgb(120, 138, 202)' }} />,
  loop: <LoopIcon style={{ color: 'rgb(120, 138, 202)' }} />,
  loopOff: <ReplayOutlinedIcon style={{ color: 'rgb(120, 138, 202)' }} />,
  volume: <VolumeUpIcon style={{ color: 'rgb(120, 138, 202)' }} />,
  volumeMute: <VolumeOffIcon style={{ color: 'rgb(120, 138, 202)' }} />,
};
// *****************
// *  AUDIO ICONS  *
// *****************


  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const handleNextTrack = () => {
    const currentPlaylist = playlists[currentPlaylistIndex];
    const nextIndex = (currentPlaylist.songs.length + currentTrackIndex + 1) % currentPlaylist.songs.length;
    setCurrentTrackIndex(nextIndex);
  };

  const handlePreviousTrack = () => {
    const currentPlaylist = playlists[currentPlaylistIndex];
    const previousIndex = (currentPlaylist.songs.length + currentTrackIndex - 1) % currentPlaylist.songs.length;
    setCurrentTrackIndex(previousIndex);
  };

  const handlePlaylistSelect = (event: { target: { value: string; }; }) => {
    const playlistIndex = parseInt(event.target.value);
    setCurrentPlaylistIndex(playlistIndex);
    setCurrentTrackIndex(0); // set the first song of the selected playlist as the current track
  };

  const toggleMusicBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
       <div
       style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0'
        }}>
      <span onClick={toggleMusicBar}> {isOpen ? <MusicOffOutlinedIcon style={{ fontSize: 40 }} /> : <MusicNoteOutlinedIcon style={{ fontSize: 40 }} />} </span>
       </div>
      {isOpen && (
       <>
          <AudioPlayer
           className="music-bar"
          style={{
            width: '95%',
            margin:'40px',
            borderRadius:'30px',
            backgroundColor:'#FFFFFF',
            letterSpacing:"0.3em",
            boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.3)',
            color: 'rgb(120, 138, 202)'
          }}
            layout='horizontal'
            autoPlay={false}
            src={playlists[currentPlaylistIndex].songs[currentTrackIndex].src}
            header={playlists[currentPlaylistIndex].songs[currentTrackIndex].title}
            footer={playlists[currentPlaylistIndex].songs[currentTrackIndex].artist}
            showSkipControls={true}
            onEnded={handleNextTrack}
            onClickNext={handleNextTrack}
            onClickPrevious={handlePreviousTrack}
            customAdditionalControls={
              [
                RHAP_UI.LOOP,
                <><label htmlFor="playlist-select">Playlist:</label><select id="playlist-select" value={currentPlaylistIndex} onChange={handlePlaylistSelect}>
                  {playlists.map((playlist, index,) => (
                    <option key={index} value={index}>{playlist.title}</option>
                  ))}
                </select></>
              ]}
            customIcons={customIcons}
          />
        </>
      )}
    </div>
  );
  }

  export default MusicBar;
