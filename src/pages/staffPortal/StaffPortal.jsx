import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./staffPortal.scss";
import axios from "axios";
import { baseUrl } from "../../baseUrl";

import React, { useContext } from "react";

const StaffPortal = () => {
  const { staff } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    const url = baseUrl + "/api/staff/logout";
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
      <h1>Staff Portal</h1>
      <h2>Welcome {staff}</h2>
      <button onClick={handleClick}>Logout</button>
      <button
        onClick={() => {
          navigate("/students");
        }}
      >
        List
      </button>
    </div>
  );
};

export default StaffPortal;
