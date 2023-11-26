import MyBandCard from '../../components/mybandcard/MyBandCard'
import './Band.css'
import Button from '@mui/joy/Button'
import { useNavigate, useParams } from 'react-router-dom';

export default function Band() {
  const navigate = useNavigate();

  const bandIdObj = useParams();
  const bandId = bandIdObj['bandId']

  function toEdit() {
      navigate(`/my-bands/${bandId}/edit`)
  }

  return (
    <div id="myBandMain">
        <Button id="editBand" onClick={toEdit}>Edit band</Button>     
        <MyBandCard />
    </div>
  )
}
