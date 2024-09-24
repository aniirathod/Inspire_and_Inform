import React from "react";

const Btn = ({
  children,
  classname = "",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  ...props
}) => {
  return (
    <>
      <button
        type="button"
        className={`px-4 py-2  ${bgColor} ${textColor} ${classname}  `}
        {...props}
      >
        {children}
      </button>
    </>
  );
};

export default Btn;
