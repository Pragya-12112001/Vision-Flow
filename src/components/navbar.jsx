import React from 'react'
import { Link } from 'react-router-dom'
import {useAuthState} from 'react-firebase-hooks/auth';
import {Auth} from "../firebase-config"
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const [user] = useAuthState(Auth);
  const navigator = useNavigate();
  const logOut = async () => {
    await signOut(Auth)
    navigator("/")
  }
  return (
    <header>
        <h3>VISIONFLOW</h3>

        <div className="menu">
            <Link className='link' to="/">Home</Link>
            {user && <Link className='link' to={"/generate"}>Generate</Link>}
            {user ? <div className='link'><div className='userData'>
              {user.displayName}
              <img className='logo' src={user.photoURL} alt="user.displayName" />  
              <button onClick={logOut} className='button'><LogoutIcon/></button>
              </div>
              </div>
            : <Link className='link' to={"/login"}>LogIn</Link>
            }
        </div>
    </header>
  ) 
}

export default Navbar