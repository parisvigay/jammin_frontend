import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import Card from '@mui/joy/Card';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

export default function Signup() {
  // const [username, setUserName] = useState('');
  // const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register/`, formData)
      navigate('/login')
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div id="loginMain">
    <Card id="loginCard" size="lg" variant="solid" orientation="horizontal">
      <Card id="loginPhoto"></Card>
      <div id="loginFormContainer">
      <form id="loginForm" onSubmit={handleSubmit}>
        <h3 id="signIn-h3">Sign up</h3>
        <div id="loginName">
          <FormLabel id="loginLabel">Username</FormLabel>
          <Input 
            className="loginInput"
            name="username"
            required
            onChange={handleChange}
            type='text'
          />
        </div>

        <div id="loginPassword">
          <FormLabel id="loginLabel">Email</FormLabel>
          <Input 
            className="loginInput" 
            name="email"
            required
            onChange={handleChange}
            type='email'
          />
        </div>
        <div id="loginPassword">
          <FormLabel id="loginLabel">Password</FormLabel>
          <Input 
            className="loginInput" 
            name="password"
            required
            onChange={handleChange}
            type='password'
          />
        </div>
        <div id="loginPassword">
          <FormLabel id="loginLabel">Password Confirmation</FormLabel>
          <Input 
            className="loginInput" 
            name="password_confirmation"
            required
            onChange={handleChange}
            type='password'
          />
        </div>
        <Button type="submit" id="loginBtn">Sign up</Button>
        <Link id="linkToSignup" style={{ textDecoration: 'none' }} to="/login">Already have an account? Log in</Link>
      </form>
      </div>
    </Card>
  </div>
  )
}
