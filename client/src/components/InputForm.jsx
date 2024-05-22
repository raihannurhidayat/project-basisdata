import React from "react";

const InputForm = ({
  placeholder = "",
  type = "text",
  onChange = () => {},
  name,
  label,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-1">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className="input input-bordered w-full max-w-xs"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputForm;
