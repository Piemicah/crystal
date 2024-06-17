import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./staffPortal.scss";
import axios from "axios";
import { baseUrl } from "../../baseUrl";

import React, { useContext, useEffect, useState } from "react";
import Students from "../students/Students";
import Student from "../../components/student/Student";
import EditStudent from "../../components/editStudent/EditStudent";
import { jwtDecode } from "jwt-decode";

const StaffPortal = () => {
  const { staff } = useContext(AuthContext);
  const [showList, setShowList] = useState(false);
  const [reg, setReg] = useState();
  const [showDetail, setShowDetail] = useState(false);
  const [showEmpty, setShowEmpty] = useState(true);
  const [showEditButton, setShowEditButton] = useState(false);
  const [showEditPage, setShowEditPage] = useState(false);

  const navigate = useNavigate();
  let { accessToken, refreshToken } = useContext(AuthContext);

  const refresh = async () => {
    try {
      const result = await axios.post(
        baseUrl + "/api/staff/refresh",
        { refreshToken: refreshToken },
        { withCredentials: true }
      );
      accessToken = result.data.accessToken;
      refreshToken = result.data.refreshToken;

      return result.data;
    } catch (err) {
      console.log(err);
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwtDecode(accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refresh();
        config.headers["Authorization"] = `Bearer ${data.accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleLogout = async (e) => {
    const url = baseUrl + "/api/staff/logout";
    try {
      const result = await axios.get(
        url,

        {
          withCredentials: true,
          // headers: { Authorization: "Bearer " + accessToken },
        }
      );
      console.log(result.data);

      if (result.data.Status === "Loggedout") {
        navigate("/");
        localStorage.clear();
        window.location.reload();
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleList = () => {
    setShowList(true);
    setShowDetail(false);
    setShowEmpty(false);
    setShowEditButton(false);
    setShowEditPage(false);
  };

  const handleEdit = () => {
    setShowList(false);
    setShowDetail(false);
    setShowEmpty(false);
    setShowEditButton(false);
    setShowEditPage(true);
  };
  console.log(accessToken);
  return (
    <div>
      <div className="navbar-staff">
        <div className="left">
          <span onClick={handleList}>Students' List</span>
        </div>
        <div className="middle">{/* <span>Logged in as: {staff}</span> */}</div>
        <div className="right">
          <span onClick={handleLogout}>Logout</span>
        </div>
      </div>
      {showEmpty ? <div className="sidebar"></div> : null}
      {showEditButton ? (
        <div className="edit">
          <button className="btn-edit" onClick={handleEdit}>
            Edit
          </button>
          <button className="btn-del">DELETE</button>
        </div>
      ) : null}
      {showList ? (
        <Students
          setReg={setReg}
          setShowDetail={setShowDetail}
          setShowList={setShowList}
          setShowEmpty={setShowEmpty}
          setShowEditButton={setShowEditButton}
          setShowEditPage={setShowEditPage}
        />
      ) : null}
      {showDetail ? <Student reg={reg} /> : null}
      {showEditPage ? <EditStudent reg={reg} /> : null}
    </div>
  );
};

export default StaffPortal;
