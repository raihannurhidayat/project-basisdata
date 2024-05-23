import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Cookies from "js-cookie";
import Search from "../components/Search";
import logoChat from "../assets/logo-chat.png";
import { Link } from "react-router-dom";

const Threds = () => {
  const [threds, setThreds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTemp, setSearchTemp] = useState("");

  const getAllTreds = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8000/api/threads/", {
        withCredentials: true,
      });
      setThreds(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
      localStorage.clear()
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllTreds();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-end my-4">
            <h2 className="text-xl ">Board Index</h2>
            <Search setSearchTemp={setSearchTemp} />
          </div>

          <div className="my-4 text-white text-sm">
            <table className="table-auto mx-auto border-collapse w-full">
              <thead className="text-left">
                <tr>
                  <th className="border w-3/4 border-white px-2 py-1" colSpan={2}>
                    Active Topics
                  </th>
                  <th className="border border-white px-2 py-1 text-center">Topics</th>
                  <th className="border border-white px-2 py-1 text-center">Posts</th>
                  <th className="border border-white px-2 py-1 text-center">Last Posts</th>
                </tr>
                <tr>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-white px-2 py-1 w-1/12">
                    <img
                      className="mx-auto"
                      width={35}
                      src={logoChat}
                      alt="Logo Chat"
                    />
                  </td>
                  <td className="border border-white px-2 py-1">
                    <Link className="underline hover:text-blue-500 transition-all ease-in-out duration-300">Forum Threds</Link>
                    <p>Title Threds</p>
                    <p>Category: education</p>
                  </td>
                  <td className="border border-white px-2 py-1 text-center">100</td>
                  <td className="border border-white px-2 py-1 text-center">200</td>
                  <td className="border border-white px-2 py-1 text-center">1 hours ago</td>
                </tr>
                <tr>
                  <td className="border border-white px-2 py-1 w-1/12">
                    <img
                      className="mx-auto"
                      width={35}
                      src={logoChat}
                      alt="Logo Chat"
                    />
                  </td>
                  <td className="border border-white px-2 py-1">
                    <Link className="underline hover:text-blue-500 transition-all ease-in-out duration-300">Forum Threds</Link>
                    <p>Title Threds</p>
                    <p>Category: education</p>
                  </td>
                  <td className="border border-white px-2 py-1 text-center">100</td>
                  <td className="border border-white px-2 py-1 text-center">200</td>
                  <td className="border border-white px-2 py-1 text-center">1 hours ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Threds;
