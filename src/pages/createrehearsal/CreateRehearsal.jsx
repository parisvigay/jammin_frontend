import './CreateRehearsal.css'
import Card from '@mui/joy/Card';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';
import Checkbox from '@mui/joy/Checkbox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateRehearsal() {
    const [membersData, setMembersData] = useState([]);    

    const [rehearsalDate, setRehearsalDate] = useState('');    
    const [rehearsalNotes, setRehearsalNotes] = useState('');    
    const [rehearsalAttendees, setRehearsalAttendees] = useState([]);    
    const [rehearsalLocation, setRehearsalLocation] = useState('');     
    
    const navigate = useNavigate();
    function toMyBand() {
        navigate(-1);
    }

    const bandIdObj = useParams();
    const bandId = bandIdObj['bandId']

    useEffect(() => {
    async function getBand() {
        let band;
        try {
            const response = await fetch(`http://localhost:8000/bands-detail/${bandId}`)
            band = await response.json();
        }
        catch (error){
            console.error(error);
        }
        if (band.members) {
            setMembersData(band.members)
        }
    }
    getBand();
}, [bandId]);

    function handleDateChange(e) {
        setRehearsalDate(e.target.value)
    }

    function handleNotesChange(e) {
        setRehearsalNotes(e.target.value)
    }

    function handleAttendeesChange(member) {
        if (rehearsalAttendees.includes(member.id)) {
            const updatedAttendees = rehearsalAttendees.filter(
                attendeeId => attendeeId !== member.id
            );
            setRehearsalAttendees(updatedAttendees);
        } else {
            setRehearsalAttendees([...rehearsalAttendees, member.id]);
        }
        console.log(rehearsalAttendees);
    }

    function handleLocationChange(e) {
        setRehearsalLocation(e.target.value)
    }

    async function submitRehearsal(e) {
        e.preventDefault();

        if (rehearsalDate === '') return
        if (rehearsalNotes === '') return
        if (!rehearsalAttendees.length) return
        if (rehearsalLocation === '') return

        const body = {
            date: rehearsalDate,
            band: bandId,
            notes: rehearsalNotes,
            location: rehearsalLocation,
            attendees: rehearsalAttendees
        }

        try {
            const response = await fetch('http://localhost:8000/rehearsals/', {
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
        setRehearsalDate('');
        setRehearsalNotes('');
        setRehearsalAttendees([]);
        setRehearsalLocation('');

        toMyBand();
    }

  return (
    <div className="createBandMain">
        <Card id="createBandCard">
            <ArrowBackIcon id="toMyBands" onClick={toMyBand}/>
            <h3 id="createBandH3">Enter rehearsal details</h3>
            <form className="rehearsalForm">
                <div id="bandName">
                    <FormLabel id="rehearsalLabel">Rehearsal date (yyyy-mm-dd)</FormLabel>
                    <Input 
                    id="rehearsalInput"
                    name="date"
                    required
                    onChange={handleDateChange}
                    value={rehearsalDate} 
                    />
                </div>
                <div id="rehearsalNotes">
                    <FormLabel id="rehearsalLabel">Notes</FormLabel>
                    <Textarea 
                        className="rehearsalNotesText"
                        onChange={handleNotesChange}
                        value={rehearsalNotes}
                    />
                </div>
                <div className="bandMembers">
                    <FormLabel id="rehearsalLabel">Members</FormLabel>
                    <div className="membersScroll">
                     {membersData && membersData.length > 0 && ( 
                         membersData.map((member, index) => ( 
                            <div 
                                key={index} 
                                className="userSelect">
                                <p>{member.username}</p>
                                <Checkbox 
                                    id="checkbox" 
                                    label="Attendee" 
                                    variant="outlined" 
                                    onChange={() => handleAttendeesChange(member)}
                                />
                            </div>
                         ))
                    )} 
                    </div>
                </div>
                <div className="bandYear">
                    <FormLabel id="rehearsalLabel">Location</FormLabel>
                    <Input 
                    id="rehearsalInput"
                    name="location"
                    required
                    onChange={handleLocationChange}
                    value={rehearsalLocation} 
                    />
                </div>    
            </form>
            <Button 
                type="submit" 
                id="submitBandBtn" 
                // disabled={disabled} 
                onClick={submitRehearsal}
                >
                Add rehearsal
            </Button>
        </Card>
    </div>
  )
}
