import axios from "axios";
import { URL } from "../../constant/url";
import { useInfoUser } from "../../hooks/useInfoUser";

const infoUser = useInfoUser();

export const getApiUserDetails = async (username) => {
  try {
    const response = await axios.get(`${URL.SERVER}/api/users/${username}/`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateApiUserDetails = async (user, data) => {
  const response = await axios.put(`${URL.SERVER}/api/users/${user}/`, data, {
    withCredentials: true,
  });

  return response;
};

export const getApiAllUsers = async () => {
  const response = await axios.get(`${URL.SERVER}/api/users/`, {withCredentials: true})
  return response.data
}

export const isAdminApiCheck = async (slug) => {
  const response = await axios.get(
    `${URL.SERVER}/api/users/${slug}/`,
    {
      withCredentials: true,
    }
  );
  
  localStorage.setItem(
    "role",
    JSON.stringify({
      is_staff: response.data.is_staff,
      is_superuser: response.data.is_superuser,
    })
  );

  return response.data;
};
