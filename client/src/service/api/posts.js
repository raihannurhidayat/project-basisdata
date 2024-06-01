import axios from "axios";
import { URL } from "../../constant/url";

export const createApiPost = async (content, slugThread) => {
  const response = await axios.post(
    `${URL.SERVER}/api/threads/${slugThread}/`,
    content,
    { withCredentials: true }
  );

  return response;
};

export const getApiPostByUser = async (slug) => {
  const response = await axios.get(
    `${URL.SERVER}/api/users/${slug}?filter=posts&page=`,
    { withCredentials: true }
  );

  return response.data;
};

export const getApiPostByThread = async (thread, id) => {
  const response = await axios.get(`${URL.SERVER}/api/${thread}/${id}/`, {
    withCredentials: true,
  });

  return response.data;
};

export const updateApiPost = async (thread, id, formData) => {
  const response = await axios.put(
    `${URL.SERVER}/api/${thread}/${id}/`,
    formData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const paginationApiGetPost = async (link) => {
  const response = await axios.get(link, { withCredentials: true });
  return response.data;
};

export const searchApiPost = async (query, type) => {
  const response = await axios.get(
    `${URL.SERVER}/api/search?q=${query}&type=${type}`,
    { withCredentials: true }
  );

  console.log(response.data);

  return response.data;
};

export const deleteApiPost = async (thread, id) => {
  const response = await axios.delete(`${URL.SERVER}/api/${thread}/${id}/`, {
    withCredentials: true,
  });

  return response
};
