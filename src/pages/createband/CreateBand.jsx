import './CreateBand.css'
import Card from '@mui/joy/Card';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';

export default function CreateBand() {
    const[disabled, setDisabled] = useState(true);

    const [bandName, setBandName] = useState('');
    const [bandDesc, setBandDesc] = useState('');
    const [bandMembers, setBandMembers] = useState([]);
    const [bandYear, setBandYear] = useState('');

    const[usersData, setUsersData] = useState();

    const navigate = useNavigate();
    function toMyBands() {
        navigate('/my-bands')
    }


    function handleNameChange(e) {
        setBandName(e.target.value)
    }

    function handleDescChange(e) {
        setBandDesc(e.target.value)
    }

    function handleMembersChange(e) {
        setBandMembers(e.target.value)
    }

    function handleYearChange(e) {
        setBandYear(e.target.value)
    }
    

    useEffect(() => {
        if (bandName !== '' && bandDesc !== '' && bandYear !== '') {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [bandName, bandDesc, bandYear]);


    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('http://localhost:8000/users')
                    const users = await response.json();
                    // console.log(data.data);
                    setUsersData(users);
                    console.log(usersData);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUsers();
    }, [])


    async function submitBand(e) {
        e.preventDefault();

        if (bandName === '') return
        if (bandDesc === '') return
        if (!bandMembers.length) return
        if (bandYear === '') return

        const body = {
            name: bandName,
            description: bandDesc,
            // members: bandMembers,
            year_formed: bandYear
        }

        try {
            const response = await fetch('http://localhost:8000/bands/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            
            const data = await response.json();
            console.log(data);
        }
        catch (error){
            console.error(error);
        }
        setBandName('')
        setBandDesc('')
        setBandMembers([])
        setBandYear('')
    }

  return (
    <div className="createBandMain">
        <Card id="createBandCard">
                <ArrowBackIcon id="toMyBands" onClick={toMyBands}/>
            <h3 id="createBandH3">Enter your band's details</h3>
            <form className="bandForm">
                <div id="bandName">
                    <FormLabel id="bandLabel">Band name</FormLabel>
                    <Input 
                    id="bandInput"
                    name="Name"
                    required
                    onChange={handleNameChange}
                    value={bandName} 
                    />
                    </div>
                <div id="bandDescription">
                    <FormLabel id="bandLabel">Description</FormLabel>
                    <Textarea 
                    id="bandDescription"
                    name="description"
                    required
                    placeholder='Tell us a bit about your band!'
                    onChange={handleDescChange}
                    value={bandDesc} 
                    />
                </div>
                <div className="bandMembers">
                    <FormLabel id="bandLabel">Members</FormLabel>
                    <Select placeholder="Users" name="description" onChange={handleDescChange}>
                        <Option>paz</Option>
                        <Option>meg</Option>
                        <Option>paris</Option>
                    </Select>
                </div>
                <div className="bandYear">
                    <FormLabel id="bandLabel">Year formed</FormLabel>
                    <Input 
                    id="bandInput"
                    name="year"
                    required
                    onChange={handleYearChange}
                    value={bandYear} 
                    />
                </div>    
            </form>
            <Button type="submit" id="submitBandBtn" disabled={disabled} onClick={submitBand}>Create band</Button>
        </Card>
    </div>
  )
}
