import React from "react";
import { IoSearch } from "react-icons/io5";
import { TiHome } from "react-icons/ti";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
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
        <Link>
          <FiMenu size={30} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
