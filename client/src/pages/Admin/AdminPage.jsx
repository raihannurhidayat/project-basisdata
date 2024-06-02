import { useState } from "react";
import SidebarAdmin from "../../components/admin/Sidebar";
import { IoMdArrowRoundBack } from "react-icons/io";
import User from "../../components/admin/User";
import { Link } from "react-router-dom";
import Category from "../../components/admin/Category";

const AdminPage = () => {
  const [display, setDisplay] = useState("Users");
  
  return (
    <>
      <div className="flex">
        <SidebarAdmin setDisplay={setDisplay} />
        <div className="mx-24 my-2 w-full">
          <Link to={"/threds"} className="mb-3 cursor-pointer hover:bg-indigo-400 inline-block p-1 rounded-full">
            <IoMdArrowRoundBack size={30} />
          </Link>
          <div className="border w-full h-full">
            {display === "Users" && <User />}
            {display === "Add Category" && <Category />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
