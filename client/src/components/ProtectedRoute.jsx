import { Outlet, Navigate } from "react-router-dom";
import Navbar from "./Navbar";

const ProtectedRoute = () => {
  const userInfo = localStorage.getItem("userinfo");
  return userInfo ? (
    <>
    <div className="bg-[#222831] py-2 min-h-screen">
      <Navbar />
      <div className="mx-8 my-2">
      <Outlet />
      </div>
    </div>
    </>
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default ProtectedRoute;
