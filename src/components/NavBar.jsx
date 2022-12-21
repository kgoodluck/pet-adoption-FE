import { Link } from "react-router-dom";
import PopupModal from "./PopupModal";

export default function NavBar() {
    
  return (
    <nav>
        <div className='nav-bar-left'>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
        </ul>
        </div>
        <div className='nav-bar-center'>
            Hello!
        </div>
        <div className='nav-bar-right'>
        <ul>
            <li><PopupModal modalType='login' linkText='Log in' /></li>
            <li><PopupModal modalType='signup' linkText='Sign up' /></li>
        </ul>
        
        </div>
    </nav>
  )
}
