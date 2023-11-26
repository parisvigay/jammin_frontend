import './CreateSong.css'
import Card from '@mui/joy/Card';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateSong() {
  const [songTitle, setSongTitle] = useState('');    
  const [songGenre, setSongGenre] = useState('');
  const [songDemo, setSongDemo] = useState(false);
  
  const bandIdObj = useParams();
    const bandId = bandIdObj['bandId']

  const navigate = useNavigate();
  function toMyBand() {
      navigate(-1);
  }  

  function handleTitleChange(e) {
    setSongTitle(e.target.value)
  }

  function handleGenreChange(e) {
    setSongGenre(e.target.value)
  }  

  function handleDemoChange() {
    setSongDemo(prevBool => !prevBool)
    console.log(songDemo);
  }
  
  async function submitSong(e) {
    e.preventDefault();

    if (songTitle === '') return
    if (songGenre === '') return

    const body = {
        title: songTitle,
        band: bandId,
        genre: songGenre,
        is_demo: songDemo
    }

    try {
        const response = await fetch('http://localhost:8000/songs/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        
        if (response.ok) {
            const data = await response.json();
            console.log(data);
        }
    }
    catch (error){
        console.error(error);
    }
    setSongTitle('');
    setSongGenre('');
    setSongDemo(false);

    toMyBand();
}

  return (
    <div className="createBandMain">

        <Card id="createBandCard">
        <ArrowBackIcon id="toMyBands" onClick={toMyBand}/>
            <h3 id="createBandH3">Enter song details</h3>
            <form className="rehearsalForm">
                <div id="songTitle">
                    <FormLabel id="songLabel">Title</FormLabel>
                    <Input 
                      id="songInput"
                      name="title"
                      required
                      onChange={handleTitleChange}
                      value={songTitle} 
                    />
                </div>
                <div id="songGenre">
                    <FormLabel id="songLabel">Genre</FormLabel>
                    <Input 
                        id="songInput"
                        onChange={handleGenreChange}
                        value={songGenre}
                    />
                </div>
                <div className="demo">
                    <FormLabel id="songLabel">Is a Demo?</FormLabel>
                    <div className="isADemo">
                        <div 
                            className="demoSelect">
                            <p></p>
                            <Checkbox 
                                id="checkbox" 
                                variant="outlined" 
                                onChange={handleDemoChange}
                            />
                        </div>
                    </div>
                </div>
            </form>
            <Button 
                type="submit" 
                id="submitBandBtn" 
                // disabled={disabled} 
                onClick={submitSong}
                >
                Add Song
            </Button>
        </Card>
    </div>
  )
}
