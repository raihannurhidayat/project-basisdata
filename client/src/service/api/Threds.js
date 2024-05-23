import axios from "axios";
import { URL } from "../../constant/url";

export const getApiDetailThred = async (slug) => {
  const response = await axios.get(`${URL.SERVER}/api/threads/${slug}`, {
    withCredentials: true,
  });
  console.log({ response });
  return response.data;
};

export const getApiAllThreds = async () => {
  const response = await axios.get(`${URL.SERVER}/api/threads/`, {
    withCredentials: true,
  });

  return response.data;
};

export const createApiThred = async (title, content) => {
  const response = await axios.post(
    `${URL.SERVER}/api/threads/`,
    {
      thread_name: title,
      thread_desc: content,
      category: 1,
    },
    {
      withCredentials: true,
    }
  );
};
