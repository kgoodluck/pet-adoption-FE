import { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import PopupModal from "./PopupModal";
import { logoutUserApi } from '../api/usersApi';
import "./NavBar.css";

export default function NavBar() {

  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = useAuthContext();

  async function handleLogOut() {
    const res = await logoutUserApi(currentUser);
    if (res.status === 200) {
      setCurrentUser({});
      navigate("/");
    }
  }

  const location = useLocation();
  const path = location.pathname;
  
  return (
    <nav className={ path === '/admin' ? 'nav-admin' : '' }>
        <div className='nav-bar-left'>
          <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/search">Search</NavLink></li>
              { currentUser.id && <li><NavLink to="/my-pets">My pets</NavLink></li> }
          </ul>
        </div>
        <div className='nav-bar-center'>
            { currentUser.id ? `Hello, ${currentUser.firstName} ${currentUser.lastName}` : "Welcome to the Pet Adoption!"}
        </div>
        <div className='nav-bar-right'>
            <ul>
                { !currentUser.id && <li><PopupModal modalType='login' linkText='Log in' /></li> }
                { !currentUser.id && <li><PopupModal modalType='signup' linkText='Sign up' /></li> }
                { currentUser.isAdmin === 1 && <li><NavLink to="/admin">Admin dashboard</NavLink></li> }
                { currentUser.id && <li><NavLink to="/profile">Profile</NavLink></li> }
                { currentUser.id && <li><button className={ path === '/admin' ? 'btn btn-warning' : 'btn btn-success' } onClick={handleLogOut}>Log out</button></li> }
            </ul>
        </div>
    </nav>
  )
}
