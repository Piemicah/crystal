import "./portal.scss";
import { AuthContext } from "../../context/authContext";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { Navigate, useNavigate } from "react-router-dom";
import Student from "../../components/student/Student";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";

const Portal = () => {
  const { reg } = useContext(AuthContext);

  const navigate = useNavigate();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleLogout = async (e) => {
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
  console.log(reg);
  return (
    <div>
      <div className="navbar-student">
        <div className="left">
          <span>Dummy</span> <span onClick={handlePrint}>print</span>
        </div>
        <div className="middle">
          <span>Logged in as: {reg}</span>
        </div>
        <div className="right">
          <span onClick={handleLogout}>Logout</span>
        </div>
      </div>

      <Student reg={reg} ref={componentRef} />
    </div>
  );
};

export default Portal;
