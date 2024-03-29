import Card from '@mui/joy/Card';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import './MyBandCard.css';
import BandInfoCard from '../bandinfocard/BandInfoCard';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from '@mui/material/Divider';

export default function MyBandCard() {
    const [bandName, setBandName] = useState('');
    const [bandMembers, setBandMembers] = useState([]);
    const [bandYear, setBandYear] = useState('');
    const [bandDescription, setBandDescription] = useState('');
    const [bandRehearsals, setBandRehearsals] = useState([]);
    const [bandSongs, setBandSongs] = useState([]);

    const bandIdObj = useParams();
    const bandId = bandIdObj['bandId']

    const navigate = useNavigate();

    function toMyBands() {
        navigate('/my-bands')
    }

    function toCreateRehearsal() {
        navigate(`/my-bands/${bandId}/create-rehearsal`)
    }

    function toCreateSong() {
        navigate(`/my-bands/${bandId}/create-song`)
    }

    useEffect(() => {

        async function getBand() {
            let band;
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bands-detail/${bandId}`)
                band = await response.json();
            }
            catch (error){
                console.error(error);
            }
            if (band) {
                if (band.name) {
                setBandName(band.name);
                }
                if (band.members) {
                    const memberNames = band.members.map(member => {
                        const capitalized = member.username && member.username.charAt(0).toUpperCase() + member.username.slice(1);
                        return capitalized;            
                    });
                    setBandMembers(memberNames)
            }

                setBandYear(band.year_formed)
                setBandDescription(band.description)
            }
        }
        async function getRehearsals() {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/rehearsals?id=${bandId}`)
                const rehearsals = await response.json();
                setBandRehearsals(rehearsals)
                console.log(rehearsals);
            }
            catch (error){
                console.error(error);
            }
        }
        async function getSongs() {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/songs?id=${bandId}`)
                const songs = await response.json();
                setBandSongs(songs)
                console.log(songs);
            }
            catch (error){
                console.error(error);
            }
        }

        getSongs();
        getRehearsals();
        getBand();
}, [bandId]);

    async function deleteBand() {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bands-detail/${bandId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                toMyBands();
            }
        }
        catch (error){
            console.error(error);
        }      
    }

  return (
    <Card id="myBandCard" variant="solid">
        <ArrowBackIcon id="toMyBands" onClick={toMyBands}/>
        <Button id="deleteBand" onClick={deleteBand}>Delete Band</Button>
        <h3 id="bandName">{bandName}</h3>
        <h5 id="yearFormed">Est. {bandYear}</h5>
        <Card id="members">
            <div id="memberContainer">
                {bandMembers.map((member, index) => {
                    return <p key={index}>{member}</p>
                })}
            </div>
        </Card>
        <Card id="bandDescription">
            <p id="bandDesctiptionP">{bandDescription}</p>
        </Card>
        <div className="bandInfoCardContainer">
            <BandInfoCard>
                <p className="bandInfos">Songs</p>
                <div className="songsOrRehearsalsContainer">
                {bandSongs && bandSongs.map((song, index) => (
                    <div key={index}>
                        <Link style={{ textDecoration: 'none' }} to={`/my-bands/${bandId}/song/${song.id}`} className="songOrRehearsal">{song.title}</Link>
                        {index !== bandSongs.length - 1 && <Divider variant="middle" id="divider" />}
                    </div>
                ))}
                </div>
            </BandInfoCard>
            <BandInfoCard>
                <p className="bandInfos">Rehearsals</p>
                <div className="songsOrRehearsalsContainer">
                    {bandRehearsals && bandRehearsals.map((rehearsal, index) => (
                    <div key={index}>
                        <Link style={{ textDecoration: 'none' }} to={`/my-bands/${bandId}/rehearsal/${rehearsal.id}`} className="songOrRehearsal">{rehearsal.date}</Link>
                        {index !== bandRehearsals.length - 1 && <Divider variant="middle" id="divider" />}
                    </div>
                ))}
                </div>
            </BandInfoCard>
        </div>
        <div className="btnContainer">
            <Button 
                id="createSongOrRehearsal" 
                variant="solid" 
                startDecorator={<Add />}
                onClick={toCreateSong}
            >
                Song
            </Button>
            <Button 
                id="createSongOrRehearsal" 
                variant="solid" 
                startDecorator={<Add />}
                onClick={toCreateRehearsal}
            >
                Rehearsal
            </Button>
        </div>
    </Card>
  );
}