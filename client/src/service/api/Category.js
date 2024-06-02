import axios from "axios";
import { URL } from "../../constant/url";

export const getApiCategory = async () => {
  const response = await axios.get(`${URL.SERVER}/api/categories/`, {
    withCredentials: true,
  });

  return response.data;
};

export const createApiCategory = async (data) => {
  const response = await axios.post(
    `${URL.SERVER}/api/categories/`,
    { category_name: data },
    {
      withCredentials: true,
    }
  );

  console.log(response.data);
  return response.data;
};
