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
import InputForm from "../components/InputForm";
import ReactQuill from "react-quill";

const ThredDetails = () => {
  const { slug } = useParams();

  const [thredDetail, setThredDetail] = useState({});
  const [content, setContent] = useState("");

  const [titlePost, setTitlePost] = useState("");
  const [contentPost, setContentPost] = useState("");

  const userInfo = useInfoUser();

  const reactQuillRef = useRef(null);

  const detailThred = async () => {
    const data = await getApiDetailThred(slug);
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
      quill.updateContents(delta, "user");
      quill.setSelection(range.index + 1);
      // quill.insertEmbed(range.index, "image", url);

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
        [{ align: [] }],
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

  const handleCreatePost = () => {};
  // post end

  return (
    <div className="bg-[#76ABAE] rounded-md ">
      <div className="px-12">
        {/* <div className="bg-[#D9D9D9] w-full  rounded-sm mt-4"> */}
        {/* content start */}
        {/* <div className="px-3 py-4">
            <div className="flex justify-between gap-6 border-slate-700 border-2 py-2 px-4 rounded-md">
              <div className="flex items-center gap-6">
                <img
                  src={logo}
                  alt="profile picture"
                  className="h-[80px] border rounded-full border-black p-2"
                />
                <div>
                  <h2 className="text-3xl font-bold">
                    {thredDetail.created_by}
                  </h2>
                  <h2>{userInfo.email}</h2>
                </div>
              </div>
              <div>
                {thredDetail.created_at && (
                  <h2>
                    {format(new Date(thredDetail.created_at), "MMMM dd, yyyy")}
                  </h2>
                )}
              </div>
            </div>
            <div className="px-6 py-4  border-2 border-black rounded-md my-3">
              <div className="">
                <div>
                  <h1 className="text-4xl font-bold">
                    {thredDetail.thread_name}
                  </h1>
                </div>
                <div className="revert-tailwind">
                  {content && (
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  )}
                </div>
              </div>
            </div>
          </div> */}
        {/* content end */}
        {/* </div> */}
        <div className="py-12 flex">
          {/* profile */}
          <div className="w-[200px]">
            <img src={logo} alt="logo" className="h-[90px] mx-auto" />
            <div className="text-center">
              <h1 className="text-xl font-bold">{thredDetail.created_by}</h1>
              <h1 className="text-sm font-semibold italic">{userInfo.email}</h1>
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
        
        {/* create post start */}
        {/* <div className="w-full mx-auto p-3 bg-white my-12 rounded-md">
          <div>
            <h2 className="text-4xl font-bold my-2">Create Post</h2>
            <InputForm
              onChange={(e) => setTitlePost(e.target.value)}
              label="Title"
            />
          </div>
          <div className="">
            <ReactQuill
              className="my-4"
              modules={modules}
              ref={reactQuillRef}
              formats={formats}
              value={contentPost}
              onChange={(contentPost) => setContentPost(contentPost)} // Menangani perubahan nilai editor
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
        </div> */}
        {/* create post end */}
      </div>
      <div className="bg-white rounded-b-md py-3"></div>
    </div>
  );
};

export default ThredDetails;
