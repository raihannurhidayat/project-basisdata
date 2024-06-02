import React, { useEffect, useState } from "react";
import InputForm from "../InputForm";
import { createApiCategory } from "../../service/api/Category";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Category = () => {
  const [category, setCategory] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCreateCategory = async () => {
    try {
      const response = await createApiCategory(category);
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
        text: "Operasi berhasil!",
        confirmButtonText: "OK",
      }).then(() => {
        setIsSuccess(false);
        setCategory("");
      });
    }
  }, [isSuccess]);

  return (
    <div className="m-3">
      <h1 className="text-4xl font-bold">Add Category</h1>
      <div className="my-3">
        <div className="flex flex-col gap-1">
          <label htmlFor={"Category"}>Category</label>
          <input
            type="text"
            name={"Category"}
            id={"Category"}
            value={category}
            placeholder={"Insert Category"}
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>
      <button onClick={handleCreateCategory} className="btn btn-outline">
        Add
      </button>
    </div>
  );
};

export default Category;
