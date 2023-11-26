import './MyBands.css'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import Card from '@mui/joy/Card'
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';

export default function MyBands() {
    const [bands, setBands] = useState([])
    const navigate = useNavigate();

    function toCreateBand() {
        navigate('/my-bands/create');
    }

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
        async function getBands() {
            try {
                const response = await fetch(`http://localhost:8000/bands?id=${userId}`)
                const bands = await response.json();
                setBands(bands)
            }
            catch (error){
                console.error(error);
            }
        }

        getBands();
}, []);

  return (
    <div id="myBandsMain">
        <Card id="myBandsCard">
                <h3 id="myBandsH3">My Bands</h3>
                <Button id="createBandBtn" variant="solid" startDecorator={<Add />} onClick={toCreateBand}>
                    Band
                </Button>
            <div className="bandCardContainer">
                {bands.map((band, index) => (
                    <Link id={`bandLink${index}`} style={{ textDecoration: 'none' }} to={`/my-bands/${band.id}`}>
                        <Card id="bandCard">
                            <p id="bandLink">{band.name}</p>
                        </Card>
                   </Link>
                ))}
            </div>
        </Card>
    </div>
  )
}
