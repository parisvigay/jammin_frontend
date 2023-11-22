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

export default function CreateBand() {
    const navigate = useNavigate();
    function toMyBands() {
        navigate('/my-bands')
    }

  return (
    <div className="createBandMain">
        <Card id="createBandCard">
                <ArrowBackIcon id="toMyBands" onClick={toMyBands}/>
            <h3 id="createBandH3">Enter your band's details</h3>
            <form className="bandForm">
                <div id="bandName">
                    <FormLabel className="bandLabel">Band name</FormLabel>
                    <Input 
                    className="bandInput"
                    name="bandName"
                    required
                    />
                    </div>
                <div id="bandDescription">
                    <FormLabel className="bandLabel">Description</FormLabel>
                    <Textarea 
                    id="bandDescription"
                    name="bandDescription"
                    required
                    placeholder='Tell us a bit about your band!'
                    />
                </div>
                <div className="bandMembers">
                    <FormLabel className="bandLabel">Members</FormLabel>
                    <Select placeholder="Users" name="bandDescription">
                        <Option>paz</Option>
                        <Option>meg</Option>
                        <Option>paris</Option>
                    </Select>
                </div>
                <div className="bandYear">
                    <FormLabel className="bandLabel">Year formed</FormLabel>
                    <Input 
                    className="bandInput"
                    name="bandYear"
                    required
                    />
                </div>    
            </form>
            <Button type="submit" id="submitBandBtn">Create band</Button>
        </Card>
    </div>
  )
}
