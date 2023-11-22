import './MyBands.css'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import Card from '@mui/joy/Card'
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import { useEffect } from 'react';

export default function MyBands() {
    const navigate = useNavigate();

    function toCreateBand() {
        navigate('/my-bands/create');
    }

    let bands;

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
                bands = await response.json();
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
                    New band
                </Button>
            <div className="bandCardContainer">
                {bands.map(band => {
                    <Link id="bandLink" style={{ textDecoration: 'none' }} to="/my-bands/band">
                        <Card id="bandCard">
                            <p id="bandLink">{band.name}</p>
                        </Card>
                   </Link>
                })}
            </div>
        </Card>
    </div>
  )
}
