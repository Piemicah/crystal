import { useParams } from "react-router-dom";
import "./student.scss";
import { baseUrl } from "./../../baseUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import pic from "../../assets/nappy.jpg";

const Student = React.forwardRef(({ reg }, ref) => {
  const { regFromStaff } = useParams();
  const [student, setStudent] = useState({});

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
  console.log(regFromStaff);
  return (
    <div ref={ref} className="student">
      <div className="container">
        <div className="picture">
          <img src={pic} alt="picture" />
          {reg}
        </div>
        <div className="heading">BASIC INFORMATION</div>
        <div className="bios">
          <div className="bio-item">
            <span>First Name</span> <span>{student.bios?.fname}</span>
          </div>
          <div className="bio-item">
            <span>Last Name</span> <span>{student.bios?.sname}</span>
          </div>
          <div className="bio-item">
            <span>Middle Name</span> <span>{student.bios?.mname}</span>
          </div>
          <div className="bio-item">
            <span>Gender</span> <span>{student.bios?.sex}</span>
          </div>
          <div className="bio-item">
            <span>Date of Birth</span>{" "}
            <span>{moment(student.bios?.dob).format("DD/MM/YYYY")}</span>
          </div>
          <div className="bio-item">
            <span>Email</span> <span>{student.bios?.email}</span>
          </div>
          <div className="bio-item">
            <span>Phone Number</span> <span>{student.bios?.phone}</span>
          </div>
          <div className="bio-item">
            <span>NIN (National Identification Number)</span>{" "}
            <span>{student.bios?.nin}</span>
          </div>
          <div className="bio-item">
            <span>Address</span> <span>{student.bios?.address}</span>
          </div>
          <div className="bio-item">
            <span>Town</span> <span>{student.bios?.town}</span>
          </div>
          <div className="bio-item">
            <span>State</span> <span>{student.bios?.State}</span>
          </div>
          <div className="bio-item">
            <span>LGA</span> <span>{student.bios?.LGA}</span>
          </div>
        </div>

        <div className="heading">PROGRAMS</div>
        <div className="programs">
          {student.programs?.map((prog, i) => (
            <div className="program" key={i}>
              <span className="prog-title">{prog?.Program}</span>
              <div className="combi">
                <span>{prog?.sub1}</span>
                <br />
                <span>{prog?.sub2}</span>
                <br />
                <span>{prog?.sub3}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="heading">PAYMENT INFORMATION</div>
        <div className="payments">
          {student.payments?.map((pay, i) => (
            <div className="payment" key={i}>
              <span className="prog-title">{pay?.Program}</span>
              <div className="pay">
                <span>Payment1</span> <span>#{pay?.pay1}</span>
              </div>
              <div className="pay">
                <span>Payment2</span> <span>#{pay?.pay2}</span>
              </div>
              <div className="pay">
                <span>Payment3</span> <span>#{pay?.pay3}</span>
              </div>
              <div className="pay">
                <span>Balance</span> <span>#{pay?.balance}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="heading">GUARDIANCE DETAIL</div>
        <div className="guard">
          <div className="guard-item">
            <span>Guardian's Name</span> <span>{student.bios?.guidiance}</span>
          </div>
          <div className="guard-item">
            <span>Guardian's Phone</span> <span>{student.bios?.gphone}</span>
          </div>
          <div className="guard-item">
            <span>Guardian's Address</span>{" "}
            <span>{student.bios?.gaddress}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Student;
