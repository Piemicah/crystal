import Student from "../../components/student/Student";
import "./students.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from "../../baseUrl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Students = (props) => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState(
    `'IJ' OR c.progId='CA' OR c.progId='JU'`
  );
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchStudents = async () => {
      const url = baseUrl + "/api/students?filter=";
      await axios
        .get(url + filter)
        .then((res) => {
          setStudents(res.data);
        })
        .catch((er) => {
          console.log(er.message);
        });
    };
    fetchStudents();
  }, [filter]);

  const getName = (prog) => {
    switch (prog) {
      case "IJ":
        return "IJMBE";
        break;
      case "JU":
        return "JUPEB";
        break;
      case "CA":
        return "CAILS";
        break;
      default:
        return null;
    }
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="students">
      <div className="heading">STUDENTS' LIST</div>
      <div className="filter">
        <select name="filter" id="filter" onClick={handleFilter}>
          {/* <option>Filter By</option> */}
          <option value="'IJ' OR c.progId='CA' OR c.progId='JU'">All</option>
          <option value="'IJ'">IJMBE</option>
          <option value="'JU'">JUPEB</option>
          <option value="'CA'">CAILS</option>
        </select>
      </div>

      <div className="headers">
        <div>Name</div>
        <div>Programs</div>
        <div>Balance</div>
      </div>
      <div className="detail-container">
        {students?.map((student, i) => (
          <div className="detail" key={i}>
            <div className="name">
              <span
                className="nm"
                onClick={() => {
                  //navigate("/students/" + student?.reg);
                  props.setReg(student?.reg);
                  props.setShowList(false);
                  props.setShowDetail(true);
                  props.setShowEmpty(false);
                }}
              >
                {student?.sname} {student?.fname}
              </span>
            </div>
            <div className="programs">
              <div>{getName(student?.progid1)}</div>
              <div>{getName(student?.progid2)}</div>
              <div>{getName(student?.progid3)}</div>
            </div>
            <div className="balance">0</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;