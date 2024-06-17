import { useContext } from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { AuthContext } from "./context/authContext";

const ProtectedRoutes = () => {
  const { staff, accessToken } = useContext(AuthContext);
  return !staff ? <Navigate to="/staff-login" /> : <Outlet />;
};

export default ProtectedRoutes;
