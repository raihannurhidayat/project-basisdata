import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useInfoUser } from "../hooks/useInfoUser";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteApiPost } from "../service/api/posts";
import logo from "../assets/default-profile.jpg";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Posts = ({ posts, display, thread, getPost, search }) => {
  const [contentPost, setContentPost] = useState(posts.post_content);
  const userActive = posts.created_by.username;
  const userInfo = useInfoUser();

  console.log(posts);

  const deletePost = async () => {
    try {
      const response = await deleteApiPost(posts.thread, posts.post_id);
      console.log("Success");
      getPost();
      setContentPost(posts.post_content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setContentPost(posts.post_content);
  }, [posts]);

  useEffect(() => {
    if (contentPost) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(contentPost, "text/html");
      const images = doc.getElementsByTagName("img");
      for (let img of images) {
        img.style.width = "250px";
        img.style.height = "auto";
      }

      const formattedHTML = doc.body.innerHTML;
      setContentPost(formattedHTML);
    }
  }, [contentPost]);

  return (
    <div className="my-6">
      <div className="flex gap-16 w-full">
        <div>
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden border-4 border-white bg-white shadow-lg flex justify-center items-center">
            <img
              src={
                posts?.created_by?.profile_picture_url
                  ? `http://localhost:8000${posts?.created_by?.profile_picture_url}`
                  : logo
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="relative">
              <h1 className="text-2xl font-bold">
                {posts.created_by.username}
                {posts?.created_by?.is_staff && (
                  <IoMdCheckmarkCircleOutline
                    size={22}
                    className="text-blue-700 absolute -top-1 -left-4"
                  />
                )}
              </h1>
              {display == "profile" && (
                <div>
                  <div className="absolute top-[1px] -right-[14px]">
                    <Link to={`/threds/${posts.thread}`}>
                      <FaExternalLinkAlt
                        className="hover:text-blue-900 transition-all ease-in-out duration-150"
                        size={12}
                      />
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {posts.created_at && (
              <h1>{format(new Date(posts.created_at), "MMMM dd, yyyy")}</h1>
            )}
          </div>
          <div className="flex justify-between items-start">
            <div className="revert-tailwind">
              {contentPost && (
                <div dangerouslySetInnerHTML={{ __html: contentPost }} />
              )}
            </div>
            {userActive === userInfo.username && posts.is_active &&(
              <>
                <div>
                  <Link
                    to={`/post/update/${posts.thread}/${posts.post_id}`}
                    className="hover:text-yellow-500 rounded-full p-2 transition-all ease-in-out duration-150 cursor-pointer"
                  >
                    <BsPencilSquare size={30} />
                  </Link>
                  {!search && (
                    <div>
                      <FaRegTrashCan
                        onClick={deletePost}
                        size={30}
                        className="cursor-pointer hover:text-red-500 transition-all ease-in-out duration-200"
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div class="border-t-2 border-gray-300 my-4"></div>
    </div>
  );
};

export default Posts;
