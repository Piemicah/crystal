import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import Services from "./components/services/Services";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Footbar from "./components/footbar/Footbar";
import Registration from "./components/registration/Registration";
import Login from "./components/login/Login";
import Students from "./pages/students/Students";
import Portal from "./pages/portal/Portal";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import StaffLogin from "./components/staff/StaffLogin";
import StaffPortal from "./pages/staffPortal/StaffPortal";
import ProtectedRoutes from "./ProtectedRoutes";
import Student from "./components/student/Student";

function App() {
  const { user, staff, auth } = useContext(AuthContext);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/service" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/portal"
          element={auth ? <Portal /> : <Navigate to="/login" />}
        />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/staff-portal" element={<StaffPortal />} />
        </Route>
      </Routes>
      {<Footbar />}
    </div>
  );
}

export default App;
