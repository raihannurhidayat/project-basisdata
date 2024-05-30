import axios from "axios";
import { URL } from "../../constant/url";

export const createApiPost = async (content, slugThread) => {
  const response = await axios.post(
    `${URL.SERVER}/api/threads/${slugThread}/`,
    content,
    { withCredentials: true }
  );

  console.log(response);
  return response;
};
