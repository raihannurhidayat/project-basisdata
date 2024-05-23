import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { TiHome } from "react-icons/ti";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post(
        "http://localhost:8000/api/auth/logout/",
        "",
        {
          withCredentials: true,
        }
      );
      console.log(response);
      localStorage.clear();
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="bg-white mx-8 mt-4 py-3 px-12 rounded-md">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold italic">SHIL.IT</h1>
              <Link>
                <IoSearch size={30} />
              </Link>
              <Link>
                <TiHome size={30} />
              </Link>
              <Link>
                <MdOutlineFavoriteBorder size={30} />
              </Link>
              <Link>
                <FaUserAlt size={30} />
              </Link>
              <Link onClick={handleLogout}>
                <RiLogoutBoxRFill size={30} />
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
