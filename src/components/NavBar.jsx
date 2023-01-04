import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import PopupModal from "./PopupModal";
import { logoutUserApi } from '../api/usersApi';

export default function NavBar() {

  const { currentUser, setCurrentUser } = useAuthContext();

  async function handleLogOut() {
    const res = await logoutUserApi(currentUser);
    console.log('res status', res.status);
    if (res.status === 200) {
      setCurrentUser({});
    }
  }
  
  return (
    <nav>
        <div className='nav-bar-left'>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
        </ul>
        </div>
        <div className='nav-bar-center'>
            { currentUser.name ? `Hello, ${currentUser.name}` : "Welcome to the Pet Adoption!"}
        </div>
        <div className='nav-bar-right'>
        <ul>
            { !currentUser.id && <li><PopupModal modalType='login' linkText='Log in' /></li> }
            { !currentUser.id && <li><PopupModal modalType='signup' linkText='Sign up' /></li> }
            { currentUser.id && <button className='btn btn-success' onClick={handleLogOut}>Log out</button> }
        </ul>
        
        </div>
    </nav>
  )
}
