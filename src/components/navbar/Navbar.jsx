import "./navbar.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import menuIcon from "../../assets/Icon_menu.png";
import closeIcon from "../../assets/Icon_close.png";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" className="desktop-link-item">
          Home
        </Link>
        <Link to="/registration" className="desktop-link-item">
          Registration
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

      <div className="menu-container">
        <img
          src={isMenuOpened ? closeIcon : menuIcon}
          alt="menu"
          onClick={() => {
            setIsMenuOpened(!isMenuOpened);
          }}
        />
        {isMenuOpened ? (
          <>
            <Link to="/" className="menu-link-item">
              Home
            </Link>
            <Link to="/registration" className="menu-link-item">
              Registration
            </Link>
            <Link to="/service" className="menu-link-item">
              Services
            </Link>
            <Link to="/about" className="menu-link-item">
              About
            </Link>
            <Link to="/contact" className="menu-link-item">
              Contact Us
            </Link>
            <Link to="/login" className="menu-link-item">
              SING-IN
            </Link>
          </>
        ) : null}
      </div>

      <div className="right">
        <button
          className="sign-btn"
          onClick={(e) => {
            navigate("/login");
          }}
        >
          SIGN IN
        </button>
      </div>
    </div>
  );
};

export default Navbar;
