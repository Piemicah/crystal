import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./staffPortal.scss";
import axios from "axios";
import { baseUrl } from "../../baseUrl";

import React, { useContext, useState } from "react";
import Students from "../students/Students";
import Student from "../../components/student/Student";

const StaffPortal = () => {
  const { staff } = useContext(AuthContext);
  const [showList, setShowList] = useState(false);
  const [reg, setReg] = useState();
  const [showDetail, setShowDetail] = useState(false);
  const [showEmpty, setShowEmpty] = useState(true);

  const navigate = useNavigate();

  const handleLogout = async (e) => {
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
  const handleList = () => {
    setShowList(true);
    setShowDetail(false);
    setShowEmpty(false);
  };
  console.log({ reg });
  console.log({ showList });
  console.log({ showDetail });

  return (
    <div>
      <div className="navbar-staff">
        <div className="left">
          <span onClick={handleList}>Students' List</span>
        </div>
        <div className="middle">
          <span>Logged in as: {staff}</span>
        </div>
        <div className="right">
          <span onClick={handleLogout}>Logout</span>
        </div>
      </div>
      {showEmpty ? <div className="sidebar"></div> : null}

      {showList ? (
        <Students
          setReg={setReg}
          setShowDetail={setShowDetail}
          setShowList={setShowList}
          setShowEmpty={setShowEmpty}
        />
      ) : null}
      {showDetail ? <Student reg={reg} /> : null}
    </div>
  );
};

export default StaffPortal;
