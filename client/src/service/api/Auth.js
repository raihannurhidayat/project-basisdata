import axios from "axios";
import { URL } from "../../constant/url";

export const loginApi = async (email, password) => {
  const data = {
    email,
    password,
  };

  const response = await axios.post(`${URL.SERVER}/api/auth/login/`, data, {
    withCredentials: true,
  });

  localStorage.setItem(
    "userinfo",
    JSON.stringify({
      status: "login",
    })
  );

  return response;
};

export const registerApi = async (username, email, password) => {
  const data = {
    email,
    password,
    username,
  };

  const response = await axios.post(`${URL.SERVER}/api/auth/register/`, data, {
    withCredentials: true,
  });
};
