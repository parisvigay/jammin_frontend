import { Link, useLocation } from 'react-router-dom';
import './NavBar.css'
import CopyrightIcon from '@mui/icons-material/Copyright';

export default function NavBar({loggedIn}) {
  // const [loggedIn, setLoggedIn] = useState(false)
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="navContainer">
      <nav className="navBar" id="logo">
          <Link className={pathname === '/' ? 'activeLink' : ''} id="logoLink" style={{ textDecoration: 'none' }} to="">Jammin
         <CopyrightIcon id="copyright"/></Link>
      </nav>
      <nav className="navBar" id="nav">
          <Link className={pathname === '/about' ? 'activeLink' : ''} id="link" style={{ textDecoration: 'none' }} to="/about">About</Link>
        { !loggedIn ?(
          <> 
            <Link className={pathname === '/my-bands' || pathname === '/my-bands/create' ? 'activeLink' : ''} id="link" style={{ textDecoration: 'none' }} to="/signup">Sign Up</Link> 
            <Link className={pathname === '/login' ? 'activeLink' : ''} id="link" style={{ textDecoration: 'none' }} to="/login">Log In</Link>
          </> 
      ) : (
        <>
          <Link className={pathname === '/my-bands' || pathname === '/my-bands/create' || pathname === '/my-bands/:bandId' ? 'activeLink' : ''} id="link" style={{ textDecoration: 'none' }} to="/my-bands">My Bands</Link>
          <Link className={pathname === '/logout' ? 'activeLink' : ''} id="link" style={{ textDecoration: 'none' }} to="/logout">Log Out</Link>
        </>
      )}
      </nav>
    </div> 
  )
}
