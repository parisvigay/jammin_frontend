import './Rehearsal.css';
 import { useState, useEffect } from 'react';
import Card from "@mui/joy/Card";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';

export default function Rehearsal() {
  const [rehearsalData, setRehearsalData]= useState();
  const [rehearsalDate, setRehearsalDate]= useState('');
  const [rehearsalLocation, setRehearsalLocation]= useState('');
  const [rehearsalAttendees, setRehearsalAttendees]= useState([]);
  const [rehearsalNotes, setRehearsalNotes]= useState('');
  
  const { rehearsalId } = useParams();

  const navigate = useNavigate();
  function toMyBand() {
      navigate(-1);
  }

useEffect(() => {

async function getRehearsal() {
  let rehearsal;
    try {
        const response = await fetch(`http://localhost:8000/rehearsals-detail/${rehearsalId}`)
        rehearsal = await response.json();
        setRehearsalData(rehearsal)
        console.log(rehearsal);
    }
    catch (error){
        console.error(error);
    }
    if (rehearsal) {
      if (rehearsal.date) {
        setRehearsalDate(rehearsal.date);
      }
      if (rehearsal.attendees) {
        const attendeeNames = rehearsal.attendees.map(attendee => {
          const capitalized = attendee.username && attendee.username.charAt(0).toUpperCase() + attendee.username.slice(1);
          return capitalized;  
        })
          setRehearsalAttendees(attendeeNames)
          console.log(rehearsalAttendees);
  }
      setRehearsalLocation(rehearsal.location)
      setRehearsalNotes(rehearsal.notes)
  }
  } 
  getRehearsal();
}, [rehearsalId]);

  return (
    <div className="rehearsalMain">
      <Card id="rehearsalCard">
      <ArrowBackIcon id="toMyBands" onClick={toMyBand}/>
        <h3 className="rehearsalDate">{rehearsalDate}</h3>
        <p className="attendees">Attendees</p>
        <Card id="rehearsalAttendees">
          <div id="memberContainer">
            {rehearsalAttendees.map((attendee, index) => {
                return <p key={index}>{attendee}</p>
            })}
          </div>
        </Card>
        <p className="location">Location</p>
        <Card id="rehearsalLocation">
          <p className="rehearsalLocationP">{rehearsalLocation}</p>
        </Card>
        <Card id="rehearsalNotes">
          <p className="notes">{rehearsalNotes}</p>
        </Card>
      </Card>
    </div>
  )
}
