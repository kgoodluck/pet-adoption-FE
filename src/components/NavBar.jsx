import { Link } from "react-router-dom";

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
            <li><Link to="/login">Log in</Link></li>
            <li><Link to="/signup">Sign up</Link></li>
        </ul>
        
        </div>
    </nav>
  )
}
