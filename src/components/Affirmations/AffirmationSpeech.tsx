import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import MicIcon from '@mui/icons-material/Mic';
import IconButton from '@mui/material/IconButton';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import Button from '@mui/material/Button'




const AffirmationSpeech = () => {
    const {state} = useLocation();
    const {entryId, user} = state;
    const [isRecording, setIsRecording] = useState(false);
    const [recognizedText, setRecognizedText] = useState('');
    const [affirmations, setAffirmations] = useState<string[]>([]);
    const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState(0);
    const [showText, setShowText] = useState(true);
    const [audio] = useState(new Audio('https://drive.google.com/uc?export=download&id=1K0vLksQxYQ58YGX8cbRhm2kc0DdlAzcX'));
    const [isPlaying, setIsPlaying] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [volume, setVolume] = useState(50);

    // retrieving affirmations
    useEffect(() => {
        axios
        .get(`/affirmations/retrieve/${user}/${entryId}`)
        .then(({ data }) => setAffirmations(data.affirmationList.split('/n')))
        .catch((err) => console.error(err))

    }, [])

    // affirmation binaural music
    useEffect(() => {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }, [isPlaying]);

    const handlePlayClick = () => {
      setIsPlaying(true);
    };

    const handlePauseClick = () => {
      setIsPlaying(false);
    };

    const handleVolumeChange = (e: any) => {
        const newVolume = e.target.value
        setVolume(newVolume)
        audio.volume = newVolume / 100;
    }


    // music settings pop-up menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };

// openAI call for reward response
    const rewardResponse = useCallback((affirmation: string) => {
    axios
      .get(`/affirmations/${affirmation}`)
      .then(({ data }) => setRecognizedText(data))
  }, [affirmations])
      // interactive text-to-speech affirmation
    const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onstart = () => {
    console.log('Speech recognition started');
  };

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    // setRecognizedText(transcript);
    checkAffirmation(transcript);
  };

  recognition.onend = () => {
    console.log('Speech recognition ended');
    setIsRecording(false);
  };

  recognition.onerror = (event: any) => {
    console.error('Speech recognition error:', event.error);
    setRecognizedText(`Error: ${event.error}`);
    setIsRecording(false);
  };

  const checkAffirmation = (transcript: string) => {
    transcript += '.'

    setShowText(true);

    const timer = setTimeout(() => { // user alert of recognized speech, then dissolves
        setShowText(false);
        setRecognizedText('')
      }, 4000);
       () => clearTimeout(timer);

    for (let i = 0; i < affirmations.length; i++) {
      const affirmation = affirmations[i].toLowerCase();
      if (transcript.toLowerCase().includes(affirmation)) {
        setCurrentAffirmationIndex((currentIndex) => currentIndex + 1);
       rewardResponse(affirmations[i]);
      }
    }
  };

  // text-to-speech record handlers
  const handleStartRecording = () => {
    setIsRecording(true);
    recognition.start();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    recognition.stop();

  };

  const currentAffirmation = affirmations[currentAffirmationIndex];



    return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundImage:`url(https://i.pinimg.com/originals/41/22/14/41221480bc8178738918624c23ef23f9.jpg)`, backgroundPosition: 'center'}}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <p>{recognizedText}</p>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <IconButton component="button" onClick={handleStartRecording} disabled={isRecording}>
            <MicIcon/>
            </IconButton>
            <IconButton component="button" onClick={handleStopRecording} disabled={!isRecording}>
            <StopCircleIcon/>
            </IconButton>
            </div>
            <div className={showText ? 'fade-in' : 'fade-out'}>
       </div>
       <div style={{ fontSize: 40 }}>
       {(recognizedText !== '' ? '' : currentAffirmation)}

       </div>

         {currentAffirmationIndex === affirmations.length && <p>Great job! You have successfully finished your affirmations</p> &&
        <Button variant="text" onClick={() => setCurrentAffirmationIndex(0)}>Start Over</Button>}


        {/*  <button onClick={toggleMenu}>Open Menu</button>
      {isOpen && (
        <div className="popup-menu">

          <button onClick={handlePlayClick}>Play</button>
          <button onClick={handlePauseClick}>Pause</button>


          <input type="range" min="0" max="100" defaultValue="50" onChange={handleVolumeChange} />
        </div>
      )}
      */}
        </div>
        </div>
      );
}

export default AffirmationSpeech;