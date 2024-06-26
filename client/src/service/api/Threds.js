import axios from "axios";
import { URL } from "../../constant/url";

export const getApiDetailThred = async (slug) => {
  const response = await axios.get(`${URL.SERVER}/api/threads/${slug}`, {
    withCredentials: true,
  });
  return response.data;
};

export const getApiAllThreds = async () => {
  const response = await axios.get(
    `${URL.SERVER}/api/threads?page=&page_size=12`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const createApiThred = async (title, content, category) => {
  const response = await axios.post(
    `${URL.SERVER}/api/threads/`,
    {
      thread_name: title,
      thread_desc: content,
      category: category,
    },
    {
      withCredentials: true,
    }
  );
};

export const searchApiThred = async (query, type) => {
  const response = await axios.get(
    `${URL.SERVER}/api/search?q=${query}&type=${type}`,
    { withCredentials: true }
  );
  return response.data;
};

export const paginationApiThred = async (link) => {
  const response = await axios.get(link, { withCredentials: true });
  return response.data;
};

export const paginationApiPost = async (link) => {
  const response = await axios.get(link, { withCredentials: true });
  return response.data.posts;
};

export const getApiThredByUser = async (slug) => {
  const response = await axios.get(
    `${URL.SERVER}/api/users/${slug}?filter=threads`,
    { withCredentials: true }
  );

  return response.data;
};

export const deleteApiThredByUser = async (slug) => {
  const response = await axios.delete(`${URL.SERVER}/api/threads/${slug}`, {
    withCredentials: true,
  });

  return response;
};

export const updateApiThred = async (slug, formData) => {
  const response = await axios.put(
    `${URL.SERVER}/api/threads/${slug}/`,
    formData,
    { withCredentials: true }
  );
  return response;
};
