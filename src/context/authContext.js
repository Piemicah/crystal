import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../baseUrl";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const login = async (url, info) => {
    //const url = baseUrl + "/api/students/login";

    const res = await axios.post(url, info, { withCredentials: true });

    if (res.data.Status) setUser(res.data.name);

    return res;
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
