import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import InputForm from "../components/InputForm";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createApiThred } from "../service/api/Threds";
import HTMLReactParser from "html-react-parser";
import { getApiCategory } from "../service/api/Category";

const MySwal = withReactContent(Swal);

const ThredCreate = () => {
  const [content, setContent] = useState("");
  const [category, setCatagory] = useState(1);
  const [title, setTitle] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [categoryDetail, setCategoryDetail] = useState([]);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const reactQuillRef = useRef(null);

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

  const getCategory = async () => {
    const response = await getApiCategory();
    setCategoryDetail(response);
  };

  useEffect(() => {
    getCategory();
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

  const handleChange = (value) => {
    setContent(value);
  };

  const handleCreateThred = async () => {
    if (!title || !content || !category) {
      setIsError(true);
    } else {
      try {
        const response = await createApiThred(title, content, category);
        setIsSuccess(true);
      } catch (error) {
        console.log(error);
        localStorage.clear();
        navigate("/auth/login");
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      MySwal.fire({
        icon: "success",
        title: "Sukses!",
        text: "Operasi berhasil!",
        confirmButtonText: "OK",
      }).then(() => {
        setIsSuccess(false);
        navigate("/threds");
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      MySwal.fire({
        title: "Oops!",
        text: "Fields is blank",
        icon: "error",
        confirmButtonText: "OK",
      }).then(() => {
        setIsError(false);
      });
    }
  }, [isError]);

  return (
    <div className="min-h-screen bg-white flex rounded-md">
      <div className="min-h-screen w-3/4 mx-auto p-3">
        <div>
          <h2 className="text-4xl font-bold my-2">Create Thred</h2>
          <InputForm onChange={(e) => setTitle(e.target.value)} label="Title" />
        </div>
        <div className="max-w-sm my-3">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an option
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onClick={(e) => setCatagory(e.target.value)}
          >
            <option disabled>Choose a Category</option>
            {categoryDetail.map((item, index) => (
              <option key={index} value={item.category_id}>
                {item.category_name}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <ReactQuill
            className="my-4"
            modules={modules}
            ref={reactQuillRef}
            formats={formats}
            value={content}
            onChange={handleChange}
            theme="snow"
          />
          <button
            type="button"
            className="bg-green-400 py-1 px-2 rounded text-2xl font-semibold hover:bg-green-500 transition-all ease-in-out duration-150 hover:opacity-90"
            onClick={handleCreateThred}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThredCreate;
