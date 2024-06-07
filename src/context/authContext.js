import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../baseUrl";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState("");
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || false
  );

  const [staff, setStaff] = useState(
    JSON.parse(localStorage.getItem("staff")) || null
  );
  const [reg, setReg] = useState("");
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    localStorage.setItem("staff", JSON.stringify(staff));
  }, [staff]);
  const authenticate = async (tk) => {
    const url = baseUrl + "/api/users/auth";
    try {
      const result = await axios.get(url, {
        withCredentials: true,
        headers: { Authorization: "Bearer " + tk },
      });
      console.log(result.data);
      if (result.data.Status === "Authenticated") setAuth(true);
      else setAuth(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const login = async (info) => {
    const url = baseUrl + "/api/students/login";

    const res = await axios.post(url, info, { withCredentials: true });

    if (res.data.Status) {
      setUser(res.data.name);
      setToken(res.data.token);
      setReg(res.data.reg);
      await authenticate(res.data.token);
    }

    return res;
  };

  const login2 = async (info) => {
    const url = baseUrl + "/api/staff/login";

    const res = await axios.post(url, info, { withCredentials: true });
    console.log(res.data);
    if (res.data.Status) {
      setStaff(res.data.name);
      //setToken(res.data.token);
    }

    return res;
  };

  return (
    <AuthContext.Provider
      value={{ auth, user, token, staff, reg, login, login2 }}
    >
      {children}
    </AuthContext.Provider>
  );
};
