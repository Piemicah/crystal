import "./navbar.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import menuIcon from "../../assets/Icon_menu.png";
import closeIcon from "../../assets/Icon_close.png";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [openStudentMenu, setOpenStudentMenu] = useState(false);
  const [openStaffMenu, setOpenStaffMenu] = useState(false);
  const [isMobileStaffOpened, setIsMobileStaffOpened] = useState(false);
  const [isMobileStudentOpened, setIsMobileStudentOpened] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" className="desktop-link-item">
          Home
        </Link>

        <div
          className="desktop-link-item"
          onClick={() => {
            setOpenStaffMenu(!openStaffMenu);
          }}
        >
          Staff
          {openStaffMenu ? (
            <div className="sub-menu">
              <Link to="/staff-login" className="sub-menu-item">
                Login
              </Link>
            </div>
          ) : null}
        </div>

        <div
          className="desktop-link-item"
          onClick={() => {
            setOpenStudentMenu(!openStudentMenu);
          }}
        >
          Student
          {openStudentMenu ? (
            <div className="sub-menu">
              <Link to="/registration" className="sub-menu-item">
                Registration
              </Link>
              <Link to="/login" className="sub-menu-item">
                Login
              </Link>
            </div>
          ) : null}
        </div>
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

            <div
              className="menu-link-item"
              onClick={() => {
                setIsMobileStaffOpened(!isMobileStaffOpened);
              }}
            >
              Staff
              {isMobileStaffOpened ? (
                <div className="sub-menu-mobile">
                  <Link to="/staff-login" className="sub-menu-item">
                    Login
                  </Link>
                </div>
              ) : null}
            </div>
            <div
              className="menu-link-item"
              onClick={() => {
                setIsMobileStudentOpened(!isMobileStudentOpened);
              }}
            >
              Student
              {isMobileStudentOpened ? (
                <div className="sub-menu-mobile">
                  <Link to="/registration" className="sub-menu-item">
                    Registration
                  </Link>
                  <Link to="/login" className="sub-menu-item">
                    Login
                  </Link>
                </div>
              ) : null}
            </div>
            <Link to="/service" className="menu-link-item">
              Services
            </Link>
            <Link to="/about" className="menu-link-item">
              About
            </Link>
            <Link to="/contact" className="menu-link-item">
              Contact Us
            </Link>
          </>
        ) : null}
      </div>

      <div className="right">
        {/* <button
          className="sign-btn"
          onClick={(e) => {
            navigate("/login");
          }}
        >
          SIGN IN
        </button> */}
      </div>
    </div>
  );
};

export default Navbar;
