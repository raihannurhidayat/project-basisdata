import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Cookies from "js-cookie";
import Search from "../components/Search";

const Threds = () => {
  const [threds, setThreds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTemp, setSearchTemp] = useState("")

  console.log(searchTemp)

  const getALlUser = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8000/api/users/", {
        withCredentials: true,
      });
      setThreds(response.data);
    } catch (error) {
      console.log(error);
      localStorage.setItem("userinfo", "");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getALlUser();
    console.log(Cookies.get("refresh_token"));
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/* <Navbar /> */}
          
          <div className="flex justify-end">
            <Search setSearchTemp={setSearchTemp} />
          </div>
        </>
      )}
    </div>
  );
};

export default Threds;
