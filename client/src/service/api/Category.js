import axios from "axios";
import { URL } from "../../constant/url";

export const getApiCategory = async () => {
  const response = await axios.get(`${URL.SERVER}/api/categories/`, {
    withCredentials: true,
  });

  return response.data;
};
