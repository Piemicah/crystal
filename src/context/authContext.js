import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../baseUrl";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // const login = async (inputs) => {
  //   const url = baseUrl + "/api/users/login";
  //   try {
  //     const result = await axios.post(url, inputs, { withCredentials: true });

  //     if (result.data.found) setUser(result.data.username);
  //   } catch (err) {
  //     console.log(err.message);
  //     throw new Error("User not found!");
  //   }
  // };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
