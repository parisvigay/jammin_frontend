import './Login.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import Card from '@mui/joy/Card';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

export default function Login({ loggedIn, setLoggedIn}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Create the submit
  const submit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password
    };
    // Create the POST request
    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/token/`, user,
    {
      headers: { "Content-Type": "application/json" },
    },
    {
        withCredentials: true
    },
    );

    // Initialize the access & refresh token in localstorage
    localStorage.clear();
    localStorage.setItem("access_token", data.access)
    localStorage.setItem("refresh_token", data.refresh)
    axios.defaults.headers.common["Authorization"] = `Bearer ${data["access"]}`;

    setLoggedIn(true)

    navigate('/');
  };

  return (
    <div id="loginMain">
      <Card id="loginCard" size="lg" variant="solid" orientation="horizontal">
        <Card id="loginPhoto"></Card>
        <div id="loginFormContainer">
        <form id="loginForm" onSubmit={submit}>
          <h3 id="signIn-h3">Sign in to your account</h3>
          <div id="loginName">
            <FormLabel id="loginLabel">Username</FormLabel>
            <Input 
              className="loginInput"
              name="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div id="loginPassword">
            <FormLabel id="loginLabel">Password</FormLabel>
            <Input 
              className="loginInput" 
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <Button type="submit" id="loginBtn">Log in</Button>
          <Link id="linkToSignup" style={{ textDecoration: 'none' }} to="/signup">Don't have an account? Sign up</Link>
        </form>
        </div>
      </Card>
    </div>
  )
}
