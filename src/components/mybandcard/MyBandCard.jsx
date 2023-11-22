import { jwtDecode } from "jwt-decode";
import Card from '@mui/joy/Card';
import './MyBandCard.css';
import BandInfoCard from '../bandinfocard/BandInfoCard';
import { useState, useEffect } from 'react';

export default function MyBandCard() {
    const [bandName, setBandName] = useState('');
    const [bandMembers, setBandMembers] = useState([]);
    
    useEffect(() => {
        const getToken = () => {
            return localStorage.getItem("access_token");
    };
        const token = getToken();
        console.log(token);
        let userId = '';
        if (token) {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        userId = decodedToken['user_id']
        }    
    // useEffect(() => {
        async function getBand() {
            let bands;
            try {
                const response = await fetch(`http://localhost:8000/bands?id=${userId}`)
                bands = await response.json();
            }
            catch (error){
                console.error(error);
            }
            if (bands) {
                const band = bands[0]
                setBandName(band.name);
                const memberNames = band.members.map(member => {
                    const capitalized = member.username.charAt(0).toUpperCase() + member.username.slice(1);
                    return capitalized;
                });
                setBandMembers(memberNames);
            }
        }

        getBand();
}, []);

  return (
    <Card id="myBandCard" variant="solid">
        <h3 id="bandName">{bandName}</h3>
        <Card id="members">
            <div id="memberContainer">
                {bandMembers.map((member, index) => {
                    return <p key={index}>{member}</p>
                })}
            </div>
        </Card>
        <div className="bandInfoCardContainer">
            <BandInfoCard>
                <p className="bandInfos">Songs</p>
            </BandInfoCard>
            <BandInfoCard>
                <p className="bandInfos">Rehearsals</p>
            </BandInfoCard>
        </div>
    </Card>
  );
}