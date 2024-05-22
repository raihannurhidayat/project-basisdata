import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import logoUnsil from "../../assets/logo-unsil.png";
import InputForm from "../../components/InputForm";

const MySwal = withReactContent(Swal);

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messateIsError, setMessageIsError] = useState("")

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
      username
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/auth/register/",
        data,
        {
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error.response.data.email);
      setMessageIsError(error.response.data.email)
      setIsError(true);
      return navigate("/auth/register");
    } finally {
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }
    navigate("/auth/login");
  };

  useEffect(() => {
    if (isError) {
      MySwal.fire({
        title: "Oops!",
        text: messateIsError,
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => {
        setIsError(false);
      });
    }
  }, [isError]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="min-h-screen">
            <div className="grid grid-cols-2 min-h-screen">
              <div className="flex justify-center items-center bg-[#1C082F]">
                <img
                  src={logoUnsil}
                  width={255}
                  height={255}
                  alt="logo unsil"
                />
              </div>
              <div className="flex justify-center items-center flex-col gap-8">
                <h2 className="text-3xl font-bold">Register Your Account</h2>
                <form onSubmit={handleSubmit} className=" py-8 px-12">
                  <div className="">
                    <InputForm
                      label="Username"
                      name="username"
                      placeholder="insert username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputForm
                      label="Email"
                      name="email"
                      placeholder="insert email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputForm
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="insert password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      type="submit"
                      className="w-full bg-green-400 py-1 px-3 rounded font-semibold hover:bg-green-500 transition-all duration-300"
                    >
                      Register
                    </button>
                  </div>
                </form>
                <div>
                  <p className="text-sm text-slate-300">
                    Have a' acount ?{" "}
                    <span
                      className="text-green-400 cursor-pointer"
                      onClick={() => navigate("/auth/login")}
                    >
                      Login
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
