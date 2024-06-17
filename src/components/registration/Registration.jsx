import "./registration.scss";
import { useEffect, useState } from "react";
import { baseUrl } from "../../baseUrl";
import axios from "axios";
import { states, lga, subjects } from "../../utilities";
import fileIcon from "../../assets/img.png";
import { PaystackButton } from "react-paystack";

const Registration = () => {
  const [student, setStudent] = useState({});
  const [isIjmb, setIsIjmb] = useState(false);
  const [isJupeb, setIsJupeb] = useState(false);
  const [isCais, setIsCais] = useState(false);
  const [message, setMessage] = useState(null);
  const [lgEnabled, setLgEnabled] = useState(false);
  const [file, setFile] = useState(null);
  const [lgas, setLgas] = useState([]);
  const [reg, setReg] = useState("");
  const [index, setIndex] = useState(0);
  const [programs, setPrograms] = useState([
    { progName: "", sub1: "", sub2: "", sub3: "" },
    { progName: "", sub1: "", sub2: "", sub3: "" },
    { progName: "", sub1: "", sub2: "", sub3: "" },
  ]);

  //paystack;
  const publicKey = process.env.REACT_APP_PAYSTACK_API;
  const amount = 1000000; //10,000 naira

  const componentProps = {
    email: student.email,
    amount,
    metadata: {
      name: student.fname,
      phone: student.phone,
    },
    publicKey,
    text: "SUBMIT",
    onSuccess: () => {
      alert("Thanks for doing business with us! Come back soon!!");
    },
    onClose: () => {
      alert("Wait! You need this oil, don't go!!!!");
      register();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
  };

  useEffect(() => {
    const url =
      baseUrl +
      "/api/students?filter='IJ' OR c.progId='CA' OR c.progId='JU' ORDER BY reg";
    axios
      .get(url)
      .then((res) => {
        if (res.data.length === 0) setReg("CS240001");
        else {
          const l = res.data.length;
          const n = Number(res.data[l - 1].bio?.reg.slice(2)) + 1;
          setReg("CS" + String(n));
        }
      })
      .catch((er) => {
        console.log(er.message);
        //setMessage("All fields must be filled");
      });
  }, []);
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
    setMessage(null);
  };

  //subject combination codes
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
      axios.post(url, comb).catch((er) => {
        console.log(er.message);
        setMessage("All fields must be filled");
      });
    });
  };

  //payment codes
  const payment = async () => {
    const program = programs.filter((pp) => pp.progName !== "");

    const url = baseUrl + "/api/payments";
    program.forEach((p) => {
      const pay = {
        reg,
        progId: p.progName,
        pay1: 0,
        pay2: 0,
        pay3: 0,
      };
      axios.post(url, pay).catch((er) => {
        //console.log(er.message);
      });
    });
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

  const register = async () => {
    let imgUrl = "";
    if (file) imgUrl = await upload();
    else imgUrl = null;
    student.picture = imgUrl;

    const p = programs.filter((pp) => pp.progName !== "");

    if (p.length > 0) {
      if (p.length === 1) student.progid1 = p[0].progName;
      else if (p.length === 2) {
        student.progid1 = p[0].progName;
        student.progid2 = p[1].progName;
      } else {
        student.progid1 = p[0].progName;
        student.progid2 = p[1].progName;
        student.progid3 = p[2].progName;
      }
    } else {
      setMessage("You must select at least 1 program");
      return;
    }

    student.reg = reg;
    const url = baseUrl + "/api/students";
    axios
      .post(url, student, { withCredentials: true })
      .then((res) => res.data)
      .catch((er) => {
        //console.log(er.message);
        setMessage("All fields must be filled");
      });

    setTimeout(combination, 1000);
    setTimeout(payment, 1000);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    register();
    setFile(null);
    setStudent({});
    //setTimeout(()=>{window.location.reload()}, 2000);
  };

  const subSelect = (e) => {
    programs[index][e.target.name] =
      programs[index].progName !== "" ? e.target.value : "";
    setPrograms(programs);
  };

  console.log(programs);
  console.log(reg);
  console.log(student);
  console.log(publicKey);
  return (
    <div className="registration">
      <div className="heading">Admission Form</div>
      {message && <p className="message">*{message}</p>}
      <div className="form-container">
        <form id="form">
          <div className="info">
            <div className="form-field">
              <label htmlFor="sname">Surname</label>
              <input
                type="text"
                //value={student.sname}
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
                //value={student.fname}
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
                //value={student.mname}
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
                //value={student.dob}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="sex">Sex</label>
              <select
                name="sex"
                id="sex"
                //value={student.sex}
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
                //value={student.phone}
                id="phone"
                name="phone"
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="nin">NIN</label>
              <input
                type="text"
                // value={student.Nationality}
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
                //value={student.email}
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
                //value={student.occupation}
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
                //value={student.town}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="add">Address</label>
              <textarea
                name="address"
                form="form"
                //value={student.address}
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
                //value={student.phone}
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
                //value={student.address}
                id="gadd"
                cols="30"
                rows="5"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="prog-img-info-container">
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
                    setMessage(null);
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
                    setMessage(null);
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
                    setMessage(null);
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

            <div className="img-info">
              {file && (
                <img className="image" src={URL.createObjectURL(file)} alt="" />
              )}
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
          </div>
        </form>
        {/* <button form="form">SUBMIT1</button> */}
        <PaystackButton {...componentProps} />
      </div>
    </div>
  );
};

export default Registration;
