import "./editStudent.scss";
import { useState, useEffect } from "react";
import fileIcon from "../../assets/img.png";
import { states, lga, subjects } from "../../utilities";
import axios from "axios";
import { baseUrl } from "../../baseUrl";

const EditStudent = ({ reg }) => {
  const [student, setStudent] = useState({});
  const [file, setFile] = useState(null);
  const [lgas, setLgas] = useState([]);
  const [lgEnabled, setLgEnabled] = useState(false);
  const [message, setMessage] = useState(null);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchStudent = async () => {
      const url = baseUrl + "/api/students/" + reg;
      await axios
        .get(url)
        .then((res) => {
          setStudent(res.data);
        })
        .catch((er) => {
          console.log(er.message);
        });
    };

    fetchStudent();
  }, []);

  const handleChange = (e) => {
    const temp = student;
    temp.bios[e.target.name] = e.target.value;
    setStudent({ ...student, temp });
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    update();
    setFile(null);
    //setStudent({});
  };

  const update = async () => {
    let imgUrl = "";
    if (file) {
      imgUrl = await upload();
      student.bios.picture = imgUrl;
    }

    const url = baseUrl + "/api/students/" + reg;
    await axios
      .put(url, student.bios)
      .then((res) => res.data)
      .catch((er) => {
        console.log(er.message);
      });

    setMessage("Successfully updated!");
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("picture", file);
      const res = await axios.post(baseUrl + "/api/upload", formData);
      return res.data.url;
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="edit-student">
      <div className="heading">Edit Student</div>
      {message && <p className="message">*{message}</p>}
      <div className="form-container">
        <form id="form" onSubmit={handleSubmit}>
          <div className="info">
            <div className="form-field">
              <label htmlFor="sname">Surname</label>
              <input
                type="text"
                value={student.bios?.sname}
                id="sname"
                name="sname"
                form="form"
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                value={student.bios?.fname}
                id="fname"
                placeholder="Enter First name"
                name="fname"
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="mname">Other Name</label>
              <input
                type="text"
                value={student.bios?.mname}
                id="mname"
                placeholder="Enter other names"
                name="mname"
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="dob">Date of birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={student.bios?.dob}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="sex">Sex</label>
              <select
                name="sex"
                id="sex"
                value={student.bios?.sex}
                onChange={handleChange}
              >
                <option>{}</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="phone">Mobile</label>
              <input
                type="tel"
                value={student.bios?.phone}
                id="phone"
                name="phone"
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="nin">NIN</label>
              <input
                type="text"
                value={student.bios?.nin}
                id="nin"
                name="nin"
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="state">State</label>
              <select
                name="state"
                id="state"
                //value={student.stateId}
                onChange={(e) => {
                  setLgas(lga.filter((l) => l.stateId === e.target.value));
                  setLgEnabled(true);
                }}
              >
                <option>Select State</option>
                {states?.map((state) => (
                  <option key={state.stateId} value={state.stateId}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="lga">LGA</label>
              <select
                disabled={lgEnabled ? false : true}
                form="form"
                name="lgId"
                //disabled={true}
                id="lgId"
                //value={student.lgId}
                onChange={handleChange}
              >
                <option value>Select lga</option>
                {lgas?.map((lga) => (
                  <option value={lga.lgId} key={lga.lgId}>
                    {lga.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                form="form"
                value={student.bios?.email}
                id="email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="guard">Guardiance's Name</label>
              <input
                type="text"
                form="form"
                id="guard"
                value={student.bios?.guidiance}
                name="guidiance"
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="home">Home Town</label>
              <input
                type="text"
                form="form"
                id="home"
                name="town"
                value={student.bios?.town}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="add">Address</label>
              <textarea
                name="address"
                form="form"
                value={student.bios?.address}
                id="add"
                cols="30"
                rows="5"
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="gphone">Guardiance's Phone</label>
              <input
                type="tel"
                value={student.bios?.phone}
                id="gphone"
                name="gphone"
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="add">Guardiance's Address</label>
              <textarea
                name="gaddress"
                form="form"
                value={student.bios?.gaddress}
                id="gadd"
                cols="30"
                rows="5"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="img-info">
            <img
              className="image"
              src={file ? URL.createObjectURL(file) : student.bios?.picture}
            />
            <div className="browse">
              <input
                type="file"
                id="file"
                name="file"
                hidden={true}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <label htmlFor="file">
                <img src={fileIcon} alt="file" />
                <span>Upload Image</span>
              </label>
            </div>
          </div>
        </form>
        <button form="form">UPDATE</button>
      </div>
    </div>
  );
};

export default EditStudent;
