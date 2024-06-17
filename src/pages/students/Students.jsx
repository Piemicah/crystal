import "./students.scss";
import { baseUrl } from "../../baseUrl";
import axios from "axios";
import { useEffect, useState } from "react";

const Students = (props) => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState(
    `'IJ' OR c.progId='CA' OR c.progId='JU'`
  );
  axios.defaults.withCredentials = true;
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
                  props.setReg(student.bio?.reg);
                  props.setShowList(false);
                  props.setShowDetail(true);
                  props.setShowEmpty(false);
                  props.setShowEditButton(true);
                }}
              >
                {student.bio?.sname} {student.bio?.fname}
              </span>
            </div>
            <div className="programs">
              {student.payment?.map((p) => (
                <div>{p.Program}</div>
              ))}
            </div>
            <div className="balance">
              {student.payment?.map((p) => (
                <div>{p.balance}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
