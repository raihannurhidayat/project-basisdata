import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getApiDetailThred } from "../service/api/Threds";
import { format } from "date-fns";
import logo from "../assets/logo-unsil.png";
import "../components/text_editor/textEditor.css";
import "react-quill/dist/quill.snow.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { useInfoUser } from "../hooks/useInfoUser";
import ReactQuill from "react-quill";
import { createApiPost } from "../service/api/posts";
import Posts from "../components/Posts";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ThredDetails = () => {
  const { slug } = useParams();

  const [thredDetail, setThredDetail] = useState({});
  const [content, setContent] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [contentPost, setContentPost] = useState("");
  const userInfo = useInfoUser();
  const reactQuillRef = useRef(null);

  const detailThred = async () => {
    const data = await getApiDetailThred(slug);
    console.log(data);
    setThredDetail(data);
    console.log(data);
  };

  const convertToHtml = () => {
    return { __html: thredDetail.thread_desc };
  };

  useEffect(() => {
    if (thredDetail?.thread_desc) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(thredDetail?.thread_desc, "text/html");
      const images = doc.getElementsByTagName("img");
      for (let img of images) {
        img.style.width = "250px";
        img.style.height = "auto";
      }

      const formattedHTML = doc.body.innerHTML;
      setContent(formattedHTML);
    }
  }, [thredDetail]);

  useEffect(() => {
    detailThred();
  }, []);

  // post start
  const handleImage = useCallback(() => {
    const url = prompt("Enter the image URL:");
    if (url) {
      const quill = reactQuillRef.current.getEditor();
      const range = quill.getSelection();
      const delta = quill.clipboard.convert(
        `<img src="${url}" style="width: 100px; height: auto;" />`
      );
      // quill.updateContents(delta, 'user');
      quill.setSelection(range.index + 1);
      quill.insertEmbed(range.index, "image", url);

      setTimeout(() => {
        const editorContainer = reactQuillRef.current.getEditor().container;
        const images = editorContainer.getElementsByTagName("img");
        const image = images[images.length - 1];
        if (image) {
          image.style.width = "250px";
          image.style.height = "auto";
        }
      }, 100);
    }
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "video"],
        ["image"],
        ["clean"],
      ],
      handlers: {
        image: handleImage,
      },
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "video",
    "image",
  ];

  const handleCreatePost = async () => {
    const formData = new FormData();
    formData.append("post_content", contentPost);

    try {
      const response = await createApiPost(formData, slug);
      console.log("Success");
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      MySwal.fire({
        icon: "success",
        title: "Sukses!",
        text: "Create Posts Success!",
        confirmButtonText: "OK",
      }).then(() => {
        setIsSuccess(false);
        detailThred();
        setContentPost("");
      });
    }
  }, [isSuccess]);

  const printedUrls = new Set();

  return (
    <div className="bg-[#76ABAE] rounded-md ">
      <div className="px-12">
        <div className="py-12 flex">
          {/* profile */}
          <div className="max-w-32">
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-4 border-white bg-white shadow-lg flex justify-center items-center mx-auto">
              <img
                src={
                  thredDetail?.created_by?.profile_picture_url
                    ? `http://localhost:8000${thredDetail?.created_by?.profile_picture_url}`
                    : logo
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold">
                {thredDetail?.created_by?.username}
              </h1>
            </div>
          </div>
          <div className="ml-6 w-full">
            <div className="flex justify-between">
              <h1 className="text-3xl font-bold">{thredDetail.thread_name}</h1>
              {thredDetail.created_at && (
                <h1>
                  {format(new Date(thredDetail.created_at), "MMMM dd, yyyy")}
                </h1>
              )}
            </div>
            <div>
              <div className="revert-tailwind">
                {content && (
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Thread profile start */}
      {thredDetail?.posts?.results && (
        <div className="bg-white rounded-b-md py-1 flex justify-end px-12">
          {thredDetail?.posts?.results?.map((user, index) => {
            const url = user.created_by.profile_picture_url;
            if (!printedUrls.has(url)) {
              printedUrls.add(url);
              return (
                <div
                  key={index}
                  className="w-[60px] h-[60px] rounded-full overflow-hidden border-4 border-white bg-white shadow-lg flex justify-center items-center"
                >
                  <img
                    src={
                      user?.created_by?.profile_picture_url
                        ? `http://localhost:8000${url}`
                        : logo
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            }
          })}
        </div>
      )}

      {/* Posts Thread profile start */}
      <div className="px-12 my-8">
        {thredDetail?.posts?.results?.map((posts, index) => (
          <div key={index}>
            <Posts posts={posts} />
          </div>
        ))}
      </div>

      {/* create post start */}
      <div className="px-12 my-8 py-8">
        <div className="p-3 bg-white my-12 rounded-md ">
          <div>
            <h2 className="text-4xl font-bold my-2">Create Post</h2>
          </div>
          <div className="">
            <ReactQuill
              className="my-4"
              modules={modules}
              ref={reactQuillRef}
              formats={formats}
              value={contentPost}
              onChange={(contentPost) => setContentPost(contentPost)}
              theme="snow"
            />
            <button
              type="button"
              className="bg-green-400 py-1 px-2 rounded text-2xl font-semibold hover:bg-green-500 transition-all ease-in-out duration-150 hover:opacity-90"
              onClick={handleCreatePost}
            >
              Create
            </button>
          </div>
        </div>
      </div>
      {/* create post end */}
    </div>
  );
};

export default ThredDetails;
