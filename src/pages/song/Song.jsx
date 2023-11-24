import './Song.css'
import { useState, useEffect } from 'react';
import Card from "@mui/joy/Card";
import { useParams } from 'react-router-dom';

export default function Song() {
const [songData, setSongData]= useState();
const [songTitle, setSongTitle]= useState('');
const [songGenre, setSongGenre]= useState('');
const [songDemo, setSongDemo]= useState(false);

const { songId } = useParams();

useEffect(() => {

    async function getSong() {
      let song;
        try {
            const response = await fetch(`http://localhost:8000/songs-detail/${songId}`)
            song = await response.json();
            setSongData(song)
            console.log(song);
        }
        catch (error){
            console.error(error);
        }
        if (song) {
          if (song.title) {
            setSongTitle(song.title);
          }
          setSongGenre(song.genre)

          if (song.is_demo === true) {
            setSongDemo(true)
          }
      }
      } 
    getSong();
}, [songId]);
  return (
    <div className="songMain">
    <Card id="songCard">
      <h3 className="songTitle">{songTitle}</h3>
      <Card id="songGenreOrDemoCard">
        <p className="songGenreOrDemo">{songGenre}</p>
      </Card>
      <Card id="songGenreOrDemoCard">
        <p className="songGenreOrDemo">{songDemo === true ? 'Still a demo': 'No longer a demo'}</p>
      </Card>
    </Card>
  </div>
  )
}
