import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Impor CSS untuk tema Snow
import InputForm from "../components/InputForm";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createApiThred } from "../service/api/Threds";
import HTMLReactParser from "html-react-parser";

const MySwal = withReactContent(Swal);

const ThredCreate = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const handleChange = (value) => {
    setContent(value);
  };

  const handleCreateThred = async () => {
    try {
      const response = await createApiThred(title, content);
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
      localStorage.clear();
      navigate("/auth/login");
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

  return (
    <div className="min-h-screen bg-white flex rounded-md">
      <div className="min-h-screen w-3/4 mx-auto p-3">
        <div>
          <h2 className="text-4xl font-bold my-2">Create Thred</h2>
          <InputForm onChange={(e) => setTitle(e.target.value)} label="Title" />
        </div>
        <div className="">
          <ReactQuill
            className="my-4"
            modules={modules}
            value={content}
            onChange={handleChange} // Menangani perubahan nilai editor
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
