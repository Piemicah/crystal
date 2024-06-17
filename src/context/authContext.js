import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [refreshToken, setRefreshToken] = useState();
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || false
  );

  const [staff, setStaff] = useState(
    JSON.parse(localStorage.getItem("staff")) || null
  );
  const [reg, setReg] = useState(localStorage.getItem("reg") || null);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    localStorage.setItem("accessToken", accessToken);
  }, [accessToken]);

  useEffect(() => {
    localStorage.setItem("staff", JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem("reg", reg);
  }, [reg]);
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
      //setToken(res.data.token);
      setReg(res.data.reg);
      await authenticate(res.data.accessToken);
    }

    return res;
  };

  const login2 = async (info) => {
    const url = baseUrl + "/api/staff/login";

    const res = await axios.post(url, info, { withCredentials: true });
    if (res.data.Status) {
      setStaff(res.data.name);
      setRefreshToken(res.data.refreshToken);
      setAccessToken(res.data.accessToken);
    }

    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        user,
        accessToken,
        refreshToken,
        staff,
        reg,
        login,
        login2,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
