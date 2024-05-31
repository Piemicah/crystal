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
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" />
        </div>

        <div className="form-field">
          <label htmlFor="nm">Full Name</label>
          <input type="text" placeholder="Full name" />
        </div>

        <div className="form-field">
          <label htmlFor="nm">Message</label>
          <textarea name="nm" id="nm" cols="30" rows="5"></textarea>
        </div>

        <button>SUBMIT</button>
      </form>
    </div>
  );
};

export default Contact;
