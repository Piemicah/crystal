import "./login.scss";

const Login = () => {
  return (
    <div className="login">
      <div className="heading">LOGIN</div>
      <form id="form">
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" />
        </div>
        <div className="form-field">
          <label htmlFor="pwd">Password/Student ID</label>
          <input type="password" id="pwd" placeholder="Password" />
        </div>
        <button form="form">LOG IN</button>
      </form>
    </div>
  );
};

export default Login;
