import './UpdateBand.css'
import Card from '@mui/joy/Card';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Checkbox from '@mui/joy/Checkbox';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateBand() {
    const [bandName, setBandName] = useState('');
    const [bandMembers, setBandMembers] = useState();
    const [bandDesc, setBandDesc] = useState('');   
    const [bandYear, setBandYear] = useState('');   

    const bandIdObj = useParams();
    const bandId = bandIdObj['bandId']

    const navigate = useNavigate();
    function toMyBands() {
        navigate('/my-bands')
    }

    function toMyBand() {
        navigate(-1);
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
                if (band.members) {
                    setBandMembers(band.members)
                }
                setBandName(band.name)
                setBandDesc(band.description)
                setBandYear(band.year_formed)
            }
        }
        getBand();
    }, [bandId]);

    function handleNameChange(e) {
        setBandName(e.target.value)
    }

    function handleDescChange(e) {
        setBandDesc(e.target.value)
    }

    function handleCheckboxChange(member) {
        const index = bandMembers.indexOf(member.id);

        if (index === -1) {
            // User not found in bandMembers, add to the list
            setBandMembers([...bandMembers, member.id]);
        } else {
            // User found in bandMembers, remove from the list
            const updatedMembers = [...bandMembers];
            updatedMembers.splice(index, 1);
            setBandMembers(updatedMembers);
        }
        console.log(bandMembers);
    }

    async function editBand() {
        const memberIds = (bandMembers || []).map(member => member.id);


        const body = {
            name: bandName,
            description: bandDesc,
            members: memberIds,
            year_formed: bandYear
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bands-detail/${bandId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            
            if (response.ok) {
                toMyBands();
                const responseData = await response.json();
                console.log(responseData);
            }
        }
        catch (error){
            console.error(error);
        }      
    }

  return (
    <div className="updateBandMain">
        <Card id="updateBandCard">
            <ArrowBackIcon id="toMyBands" onClick={toMyBand}/>
            <form className="bandForm">
                <div id="bandName">
                    <FormLabel id="bandLabel">Band name</FormLabel>
                    <Input 
                    id="bandInput"
                    name="Name"
                    onChange={handleNameChange}
                    value={bandName} 
                    />
                </div>
                <div id="bandDescription">
                    <FormLabel id="bandLabel">Description</FormLabel>
                    <Textarea 
                    id="bandDescription"
                    name="description"
                    onChange={handleDescChange}
                    value={bandDesc} 
                    />
                </div>
                <div className="bandMembers">
                    <FormLabel id="bandLabel">Members</FormLabel>
                    <div className="membersScroll">
                    {bandMembers && bandMembers.length > 0 && (
                        bandMembers.map((member, index) => ( 
                            <div key={index} className="userSelect">
                                <p>{member.username}</p>
                                <Checkbox 
                                    id="checkbox" 
                                    label="Member" 
                                    variant="outlined" 
                                    checked={(bandMembers.includes(member.id))} 
                                    onChange={() => handleCheckboxChange(member)}
                                />
                            </div>
                        )) 
                    )} 
                    </div>
                </div>
            </form>
            <Button type="submit" id="submitBandBtn" onClick={editBand}>Confirm</Button>
        </Card>
    </div>
  )
}
