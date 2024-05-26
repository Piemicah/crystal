import "./contact.scss";

import React from "react";

const Contact = () => {
  return (
    <div className="contact">
      <div className="heading">Contact Us</div>
      <div className="question">
        Any question? We would be happy to help you.
      </div>
      <form action="">
        <input type="text" placeholder="Your Comments" />
        <input type="text" />
        <input type="text" />
        <button>SUBMIT</button>
      </form>
    </div>
  );
};

export default Contact;
