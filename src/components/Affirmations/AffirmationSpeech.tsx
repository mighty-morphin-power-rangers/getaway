import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import MicIcon from '@mui/icons-material/Mic';
import IconButton from '@mui/material/IconButton';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import Button from '@mui/material/Button'




const AffirmationSpeech = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const entryId = queryParams.get('entryId');
  const user = queryParams.get('user');
    const [isRecording, setIsRecording] = useState(false);
    const [rewardText, setRewardText] = useState('');
    const [affirmations, setAffirmations] = useState<string[]>([]);
    const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState(0);
    const [showText, setShowText] = useState(true);

    // retrieving affirmations
    useEffect(() => {
        axios
        .get(`/affirmations/retrieve/${user}/${entryId}`)
        .then(({ data }) => setAffirmations(data.affirmationList.split('/n')))
        .catch((err) => console.error(err))

    }, [user, entryId])


// openAI call for reward response
const rewardResponse = useCallback(async (affirmation: string) => {
  try {
    const { data } = await axios.get(`/affirmations/${affirmation}`)
    setRewardText(data)
    setShowText(true);

    const timer = setTimeout(() => { // user alert of reward text, then dissolves
      setRewardText('')
    }, 3000);
     () => clearTimeout(timer);


    // only allows you to only move onto next affirmation, if axios response is received
    if (affirmation === affirmations[currentAffirmationIndex]) {
      setCurrentAffirmationIndex((currentIndex) => currentIndex + 1);
    }
  } catch (error) {
    console.error(error)
  }
}, [affirmations, currentAffirmationIndex])

      // interactive text-to-speech affirmation
    const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onstart = () => {
    console.log('Speech recognition started');
  };



  recognition.onresult = function(event: any) {
    const result = event.results[event.resultIndex];
    if (result.isFinal) {
      checkAffirmation(event.results[0][0].transcript);
    } else {
      const splitWordArray = currentAffirmation.split(' ')
      const transcript = result[0].transcript;
      const transcriptWords = transcript.split(' ');
      const highlightedText = splitWordArray.map((word, index) => {
        const matched = transcriptWords[index] && word.toLowerCase() === transcriptWords[index].toLowerCase();
        return matched ? `<span class="highlight">${word}</span>` : word;
      }).join(' ');
      setRewardText(highlightedText);
      console.log(result[0].transcript + ' (interim)');
    }
  };

  recognition.onend = () => {
    console.log('Speech recognition ended');
    setIsRecording(false);
  };

  recognition.onerror = (event: any) => {
    console.error('Speech recognition error:', event.error);
    setRewardText(`Error: ${event.error}`);
    setIsRecording(false);
  };

  const checkAffirmation = (transcript: string) => {
    transcript += '.'

    for (let i = 0; i < affirmations.length; i++) {
      const affirmation = affirmations[i].toLowerCase();
      if (transcript.toLowerCase().includes(affirmation)) {
       rewardResponse(affirmations[i]);
       setShowText(false);
       }
    }
  };

  // text-to-speech record handlers
  const handleStartRecording = () => {
    setIsRecording(true);
    recognition.interimResults = true;
    recognition.start();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    recognition.interimResults = false;
    recognition.stop();


  };

  const currentAffirmation = affirmations[currentAffirmationIndex];



    return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundImage:`url(https://i.pinimg.com/originals/41/22/14/41221480bc8178738918624c23ef23f9.jpg)`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '100%'}}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  marginTop: '10em' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <IconButton component="button" onClick={handleStartRecording} disabled={isRecording}>
            <MicIcon style={{ fontSize: 40 }}/>
            </IconButton>
            <IconButton component="button" onClick={handleStopRecording} disabled={!isRecording}>
            <StopCircleIcon style={{ fontSize: 40 }}/>
            </IconButton>
            </div>

       <div style={{ fontSize: 30 }}  className={showText ? 'fade-in' : 'fade-out'}>
  {rewardText !== '' ? (
    <div style={{ maxWidth: '500px' }} dangerouslySetInnerHTML={{ __html: rewardText }} />
  ) : (
    <div>{currentAffirmation ? currentAffirmation.replace(/,/g, " ") : ""}</div>
  )}
</div>

         {currentAffirmationIndex === affirmations.length && <p>Great job! You have successfully finished your affirmations</p> &&
        <Button variant="text" size="large" onClick={() => setCurrentAffirmationIndex(0)}>Start Over</Button>}


        </div>
        </div>
      );
}

export default AffirmationSpeech;