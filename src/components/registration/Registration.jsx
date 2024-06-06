import "./registration.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { states, lga, subjects } from "../../utilities";

const Registration = () => {
  const [person, setPerson] = useState({});
  const [isIjmb, setIsIjmb] = useState(false);
  const [isJupeb, setIsJupeb] = useState(false);
  const [isCais, setIsCais] = useState(false);
  const [stateId, setStateId] = useState("AB");
  const [lgEnabled, setLgEnabled] = useState(false);
  const [lgas, setLgas] = useState([]);
  const [reg, setReg] = useState("");
  const [index, setIndex] = useState(0);
  const [programs, setPrograms] = useState([
    { progName: "", sub1: "", sub2: "", sub3: "" },
    { progName: "", sub1: "", sub2: "", sub3: "" },
    { progName: "", sub1: "", sub2: "", sub3: "" },
  ]);

  useEffect(() => {
    const url = baseUrl + "/api/students?sort=reg";
    axios
      .get(url)
      .then((res) => {
        if (res.data.length === 0) setReg("CS240001");
        else {
          const l = res.data.length;
          const n = Number(res.data[l - 1].reg.slice(2)) + 1;
          setReg("CS" + String(n));
        }
      })
      .catch((er) => {
        console.log(er.message);
        // setMessage("All fields must be filled");
      });
  }, []);
  const handleChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
    //setMessage(null);
  };

  const combination = async () => {
    const program = programs.filter((pp) => pp.progName !== "");

    const url = baseUrl + "/api/combination";
    program.forEach((p) => {
      const comb = {
        reg,
        progId: p.progName,
        sub1: p.sub1,
        sub2: p.sub2,
        sub3: p.sub3,
      };
      axios
        .post(url, comb)
        .then((res) => res.data)
        .catch((er) => {
          console.log(er.message);
          // setMessage("All fields must be filled");
        });
    });
  };

  const register = async () => {
    // let imgUrl = "";
    // if (file) imgUrl = await upload();
    // person.picture = imgUrl;

    const p = programs.filter((pp) => pp.progName !== "");

    if (p.length > 0) {
      if (p.length === 1) person.progid1 = p[0].progName;
      else if (p.length === 2) {
        person.progid1 = p[0].progName;
        person.progid2 = p[1].progName;
      } else {
        person.progid1 = p[0].progName;
        person.progid2 = p[1].progName;
        person.progid3 = p[2].progName;
      }
    } else return;

    person.reg = reg;
    const url = baseUrl + "/api/students";
    axios
      .post(url, person)
      .then((res) => res.data)
      .catch((er) => {
        console.log(er.message);
        // setMessage("All fields must be filled");
      });

    setTimeout(combination, 1000);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    //if (msg === "reg")
    register();
    //else update();

    //setFile(null);
    //setPerson({});
  };

  const subSelect = (e) => {
    programs[index][e.target.name] =
      programs[index].progName !== "" ? e.target.value : "";
    setPrograms(programs);
  };

  // console.log(person);
  //let p = programs.filter((pp) => pp.progName !== "");
  console.log(programs);
  console.log(reg);
  return (
    <div className="registration">
      <div className="heading">Admission Form</div>
      <div className="form-container">
        <form id="form" onSubmit={handleSubmit}>
          <div className="info">
            <div className="form-field">
              <label htmlFor="sname">Surname</label>
              <input
                type="text"
                //value={person.sname}
                id="sname"
                name="sname"
                placeholder="Enter Surname"
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                //value={person.fname}
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
                //value={person.mname}
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
                //value={person.dob}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="sex">Sex</label>
              <select
                name="sex"
                id="sex"
                //value={person.sex}
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
                //value={person.phone}
                id="phone"
                name="phone"
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="nin">NIN</label>
              <input
                type="text"
                // value={person.Nationality}
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
                //value={person.stateId}
                onChange={(e) => {
                  //person.stateId = e.target.value;
                  setStateId(e.target.value);
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
                //value={person.lgId}
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
                //value={person.email}
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
                //value={person.occupation}
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
                //value={person.town}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="add">Address</label>
              <textarea
                name="address"
                form="form"
                //value={person.address}
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
                //value={person.phone}
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
                //value={person.address}
                id="gadd"
                cols="30"
                rows="5"
                onChange={handleChange}
              />
            </div>
            {/* <button>GGGGG</button> */}
          </div>

          <div className="programs">
            <div className="program">
              <input
                type="checkbox"
                value="IJ"
                id="IJ"
                //defaultChecked
                onChange={(e) => {
                  setIsIjmb(e.target.checked);
                  setIndex(0);
                  programs[0].progName = !isIjmb ? e.target.value : "";
                  setPrograms(programs);
                }}
              />
              <label htmlFor="IJ">IJMBE</label>
              {isIjmb && (
                <div className="subjects">
                  <div className="subject">
                    <label htmlFor="sub1">Subject 1</label>
                    <select name="sub1" id="sub1" onChange={subSelect}>
                      <option>Select subject</option>
                      {subjects.map((sub) => (
                        <option value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                  <div className="subject">
                    <label htmlFor="sub2">Subject 2</label>
                    <select name="sub2" id="sub2" onChange={subSelect}>
                      <option>Select subject</option>
                      {subjects.map((sub) => (
                        <option value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                  <div className="subject">
                    <label htmlFor="sub3">Subject 3</label>
                    <select name="sub3" id="sub3" onChange={subSelect}>
                      <option>Select subject</option>
                      {subjects.map((sub) => (
                        <option value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="program">
              <input
                type="checkbox"
                value="JU"
                id="JU"
                onChange={(e) => {
                  setIsJupeb(e.target.checked);
                  setIndex(1);
                  programs[1].progName = !isJupeb ? e.target.value : "";
                  setPrograms(programs);
                }}
              />
              <label htmlFor="JU">JUPEB</label>
              {isJupeb && (
                <div className="subjects">
                  <div className="subject">
                    <label htmlFor="sub1">Subject 1</label>
                    <select name="sub1" id="sub1" onChange={subSelect}>
                      <option>Select subject</option>
                      {subjects.map((sub) => (
                        <option value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                  <div className="subject">
                    <label htmlFor="sub2">Subject 2</label>
                    <select name="sub2" id="sub2" onChange={subSelect}>
                      <option>Select subject</option>
                      {subjects.map((sub) => (
                        <option value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                  <div className="subject">
                    <label htmlFor="sub3">Subject 3</label>
                    <select name="sub3" id="sub3" onChange={subSelect}>
                      <option>Select subject</option>
                      {subjects.map((sub) => (
                        <option value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="program">
              <input
                type="checkbox"
                value="CA"
                id="CA"
                onChange={(e) => {
                  setIsCais(e.target.checked);
                  setIndex(2);
                  programs[2].progName = !isCais ? e.target.value : "";
                  setPrograms(programs);
                }}
              />
              <label htmlFor="CA">CAIS KWASU</label>
              {isCais && (
                <div className="subjects">
                  <div className="subject">
                    <label htmlFor="sub1">Subject 1</label>
                    <select name="sub1" id="sub1" onChange={subSelect}>
                      <option>Select subject</option>
                      {subjects.map((sub) => (
                        <option value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                  <div className="subject">
                    <label htmlFor="sub2">Subject 2</label>
                    <select name="sub2" id="sub2" onChange={subSelect}>
                      <option>Select subject</option>
                      {subjects.map((sub) => (
                        <option value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                  <div className="subject">
                    <label htmlFor="sub3">Subject 3</label>
                    <select name="sub3" id="sub3" onChange={subSelect}>
                      <option>Select subject</option>
                      {subjects.map((sub) => (
                        <option value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
        <button form="form">SUBMIT</button>
      </div>
    </div>
  );
};

export default Registration;
