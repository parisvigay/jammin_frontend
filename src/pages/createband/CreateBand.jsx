import './CreateBand.css'
import Card from '@mui/joy/Card';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Checkbox from '@mui/joy/Checkbox';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export default function CreateBand() {
    const[disabled, setDisabled] = useState(true);

    const[userId, setUserId] = useState(0);

    const [bandName, setBandName] = useState('');
    const [bandDesc, setBandDesc] = useState('');
    const [bandMembers, setBandMembers] = useState([]);
    const [bandYear, setBandYear] = useState('');

    const[usersData, setUsersData] = useState();

    const navigate = useNavigate();
    function toMyBands() {
        navigate('/my-bands')
    }
    
    useEffect(() => {
        const getToken = () => {
            return localStorage.getItem("access_token");
    };
        const token = getToken();
        console.log(token);
        if (token) {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const id = decodedToken['user_id']
        console.log(id);
        setUserId(id)
        }
    }, []);        

    function handleNameChange(e) {
        setBandName(e.target.value)
    }

    function handleDescChange(e) {
        setBandDesc(e.target.value)
    }
    
    function handleYearChange(e) {
        setBandYear(e.target.value)
    }


    useEffect(() => {
        // Add the current user ID to bandMembers initially
        setBandMembers([userId]);
    }, [userId]);

    function handleCheckboxChange(user) {
        if (parseInt(user.id) === userId) {
            // Prevent changing the currently logged-in user's checkbox
            return;
        }
        const index = bandMembers.indexOf(user.id);

        if (index === -1) {
            // User not found in bandMembers, add to the list
            setBandMembers([...bandMembers, user.id]);
        } else {
            // User found in bandMembers, remove from the list
            const updatedMembers = [...bandMembers];
            updatedMembers.splice(index, 1);
            setBandMembers(updatedMembers);
        }
        console.log(bandMembers);
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
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`)
                    const allUsers = await response.json();

                    setUsersData(allUsers)
                    console.log(allUsers);
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

        console.log('Band Members: ', bandMembers); 
        const membersToSend = [...bandMembers];

        const body = {
            name: bandName,
            description: bandDesc,
            members: membersToSend,
            year_formed: bandYear
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/bands/`, {
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
        setBandName('')
        setBandDesc('')
        setBandMembers([userId]);
        setBandYear('')

        toMyBands();
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
                    <FormLabel id="bandLabel">Users</FormLabel>
                    <div className="membersScroll">
                    {usersData && usersData.length > 0 && (
                        usersData.map((user, index) => (
                            <div key={index} className="userSelect">
                                <p>{user.username}</p>
                                <Checkbox 
                                    id="checkbox" 
                                    label="Member" 
                                    variant="outlined" 
                                    // checked={parseInt(user.id) === userId} 
                                    checked={(bandMembers.includes(user.id) || parseInt(user.id) === userId)} 
                                    onChange={() => handleCheckboxChange(user)}
                                />
                            </div>
                        ))
                    )}
                    </div>
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
