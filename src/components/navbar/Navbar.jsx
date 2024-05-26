import "./navbar.scss";
import { Link } from "react-router-dom";
import menuIcon from "../../assets/Icon_menu.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left">
        <img src={menuIcon} alt="menu" />
        <Link to="/" className="desktop-link-item">
          Home
        </Link>
        <Link to="/service" className="desktop-link-item">
          Services
        </Link>
        <Link to="/about" className="desktop-link-item">
          About
        </Link>
        <Link to="/contact" className="desktop-link-item">
          Contact Us
        </Link>
      </div>

      <div className="right">
        <button className="sign-btn">SIGN IN</button>
      </div>
    </div>
  );
};

export default Navbar;
