import React from "react";
import { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, {
  formats,
  modules,
} from "../components/text_editor/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { createApiThred } from "../service/api/Threds";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ThredPost = () => {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const addDetails = async (e) => {
    e.preventDefault();
    try {
      await createApiThred(title, content);
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
      localStorage.clear();
      navigate("/auth/login");
    }
  };

  const handleChange = (value) => {
    setContent(value);
  };

  useEffect(() => {
    if (isSuccess) {
      MySwal.fire({
        icon: "success",
        title: "Success!",
        text: "Thred Created!",
        confirmButtonText: "OK",
      }).then(() => {
        setIsSuccess(false);
        navigate("/threds");
      });
    }
  }, [isSuccess]);

  return (
    <>
      <div className="bg-white rounded-md">
        <div className="w-3/4 mx-auto p-3">
          <div className="row">
            <form onSubmit={addDetails}>
              <h3 className="text-4xl font-bold my-3">Create Threds</h3>
              <div className="">
                <div className="my-2">
                  <label className="font-bold text-2xl">
                    {" "}
                    Title <span className="text-red-600"> * </span>{" "}
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control input input-bordered w-full max-w-xs my-2"
                    placeholder="Title"
                    required
                  />
                </div>
                <div className="my-2">
                  <label className="text-2xl font-bold">
                    {" "}
                    Description <span className="text-red-600"> * </span>{" "}
                  </label>
                  <EditorToolbar toolbarId={"t1"} />
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={handleChange}
                    placeholder={"Write something awesome..."}
                    modules={modules("t1")}
                    formats={formats}
                  />
                </div>
                <br />
                <br />
                <div className="text-right">
                  <button type="submit" className="btn btn-outline btn-success">
                    {" "}
                    Submit{" "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThredPost;
