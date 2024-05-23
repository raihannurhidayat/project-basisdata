import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import logoUnsil from "../../assets/logo-unsil.png";
import InputForm from "../../components/InputForm";

const MySwal = withReactContent(Swal);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/auth/login/",
        data,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("userinfo", JSON.stringify({
        status: "login"
      }))
    } catch (error) {
      console.log(error.response.data.detail);
      setIsError(true);
      return navigate("/auth/login");
    } finally {
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }
    navigate("/threds");
  };

  useEffect(() => {
    if (isError) {
      MySwal.fire({
        title: "Oops!",
        text: "Email or Password is Incorrent",
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
                <h2 className="text-3xl font-bold">Login To Yout Account</h2>
                <form onSubmit={handleSubmit} className=" py-8 px-12">
                  <div className="">
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
                      Login
                    </button>
                  </div>
                </form>
                <div>
                  <p className="text-sm text-slate-300">
                    Not Register Yet ?{" "}
                    <Link
                      to="/auth/register"
                      className="text-green-400 cursor-pointer"
                    >
                      Create an account
                    </Link>
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

export default Login;
