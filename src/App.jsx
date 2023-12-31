import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import NavBar from './components/navbar/NavBar';
import Footer from './components/footer/Footer';
import About from './pages/about/About';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Logout from './pages/logout/Logout';
import pexels from '../src/assets/pexels.mp4'
import Band from './pages/band/Band';
import MyBands from './pages/mybands/MyBands';
import CreateBand from './pages/createband/CreateBand';
import Rehearsal from './pages/rehearsal/Rehearsal';
import CreateRehearsal from './pages/createrehearsal/CreateRehearsal';
import CreateSong from './pages/createsong/CreateSong';
import Song from './pages/song/Song';
import UpdateBand from './pages/updateband/UpdateBand';

 export default function App() {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <main className="App">
      <NavBar loggedIn={loggedIn} />
      {isHomepage &&(
      <div id="videoContainer">
        <h1>Jammin</h1>
        <video src={pexels} autoPlay loop muted></video>
      </div>
      )}
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/my-bands" element={<MyBands />} />
        <Route path="/my-bands/:bandId" element={<Band />} />
        <Route path="/my-bands/:bandId/rehearsal/:rehearsalId" element={<Rehearsal />} />
        <Route path="/my-bands/:bandId/song/:songId" element={<Song />} />
        <Route path="/my-bands/create" element={<CreateBand />} />
        <Route path="/my-bands/:bandId/create-rehearsal" element={<CreateRehearsal />} />
        <Route path="/my-bands/:bandId/create-song" element={<CreateSong />} />
        <Route path="/my-bands/:bandId/edit" element={<UpdateBand />} />
      </Routes>
      <Footer />
  </main>
  );
}