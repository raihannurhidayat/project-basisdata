import axios from "axios";
import { URL } from "../../constant/url";

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
  try {
    const response = await axios.put(
      `${URL.SERVER}/api/users/${user}/`,
      {
        username: data.username,
        profile_picture_url: data.profile_picture_url,
        user_bio: data.user_bio,
        birth_date: data.birth_date,
      },
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};
