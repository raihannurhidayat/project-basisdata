import { Outlet, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useInfoRole } from "../hooks/useInfoUser";

const ProtectedRouteAdmin = () => {
  const userInfo = localStorage.getItem("userinfo");
  const infoRole = useInfoRole()

  useEffect(() => {
    if(!userInfo || !infoRole){
      localStorage.clear()
    }
  }, [userInfo, infoRole])
  
  return infoRole.is_staff ? (
    <>
    <div className="min-h-screen">
      {/* <Navbar /> */}
      <div className="">
      <Outlet />
      </div>
    </div>
    </>
  ) : (
    <Navigate to="/threads" />
  );
};

export default ProtectedRouteAdmin;
