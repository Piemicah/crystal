import "./footbar.scss";

import logo from "../../assets/logoCrystal.png";
import fb from "../../assets/facebook.png";
import insta from "../../assets/instagram.png";
import linkedin from "../../assets/linkedin.png";
import twitter from "../../assets/twitter.png";

const Footbar = () => {
  return (
    <div className="foot">
      <div className="upper-box">
        <div className="img-box">
          <img src={logo} alt="" />
        </div>
        <div className="text-box">
          <p>Company</p>
          <p>About Us</p>
          <p>Contact and Help</p>
          <p>Careers</p>
        </div>
        <div className="text-box">
          <p>FAQ</p>
          <p>Blog</p>
          <p>News Room</p>
          <p>Privacy Policy</p>
        </div>
        <div className="text-box">
          <p>English</p>
        </div>
      </div>
      <div className="lower-box">
        <div className="social-box">
          <img src={fb} alt="" />
          <img src={insta} alt="" />
          <img src={linkedin} alt="" />
          <img src={twitter} alt="" />
        </div>
        <div className="text-box">
          <p>
            Crystal switch is not affiliated to or endorsed by any
            school,college or university.
          </p>
          <p>Copyright © 2024 07033387603, 08161657004</p>
        </div>
      </div>
    </div>
  );
};

export default Footbar;
