import "./login.scss";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl";

const Login = () => {
  const [info, setInfo] = useState({
    email: "",
    reg: "",
  });

  const { login } = useContext(AuthContext);

  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  //axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    setMessage(null);
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (info.email === "" || info.reg === "") {
      setMessage("All fields must be filled!");
      return;
    }

    try {
      const result = await login(info);
      if (result.data.Status) navigate("/portal");
      else setMessage(result.data.Error);
    } catch (err) {
      console.log(err.message);
      setMessage(err.message);
    }
    //setMessage({ Error: er.response.data });
  };
  console.log(info);
  console.log({ message });

  return (
    <div className="login">
      <div className="heading">STUDENT LOGIN</div>
      {message && <span className="message">{message}</span>}
      <form id="form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="reg">Student ID</label>
          <input
            type="password"
            id="reg"
            name="reg"
            placeholder="Registration no."
            onChange={handleChange}
          />
        </div>
        <button form="form" onClick={handleSubmit}>
          LOG IN
        </button>
      </form>
    </div>
  );
};

export default Login;
