import "./portal.scss";
import { AuthContext } from "../../context/authContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { useNavigate } from "react-router-dom";

const Portal = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    const url = baseUrl + "/api/users/logout";
    try {
      const result = await axios.get(url, { withCredentials: true });

      if (result.data.Status === "Loggedout") {
        navigate("/");
        localStorage.clear();
        window.location.reload();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <h1>Student Portal</h1>
      <h1>Welcome {user}</h1>
      <button onClick={handleClick}>LogOut</button>
    </div>
  );
};

export default Portal;
