import "./student.scss";

import React from "react";

const Student = (props) => {
  return (
    <div className="student">
      <h5>Name: {props.name}</h5>
    </div>
  );
};

export default Student;
