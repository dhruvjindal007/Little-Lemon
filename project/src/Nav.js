import { Link } from 'react-router-dom';
import './styles.css';

function Nav() {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item"><Link to="/">Home</Link></li>
        <li className="nav-item"><Link to="/about">About</Link></li>
        <li className="nav-item"><Link to="/menu">Menu</Link></li>
        <li className="nav-item"><Link to="/booking">Booking</Link></li>
        <li className="nav-item"><Link to="/order">Order Online</Link></li>
        <li className="nav-item"><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;