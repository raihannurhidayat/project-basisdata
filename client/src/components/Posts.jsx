import React, { useEffect, useState } from "react";
import { format } from "date-fns";

const Posts = ({ posts }) => {
  const [contentPost, setContentPost] = useState(posts.post_content);

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
            <h1 className="text-2xl font-bold">{posts.created_by.username}</h1>
            {posts.created_at && (
              <h1>{format(new Date(posts.created_at), "MMMM dd, yyyy")}</h1>
            )}
          </div>
          <div className="revert-tailwind">
            {contentPost && <div dangerouslySetInnerHTML={{ __html: contentPost }} />}
          </div>
        </div>
      </div>
      <div class="border-t-2 border-gray-300 my-4"></div>
    </div>
  );
};

export default Posts;
