import React, { useId, forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      labelClassName = "",
      classname = "",
      type = "text",
      textColor = "text-black",
      ...props
    },
    ref
  ) => {
    const id = useId();
    return (
      <>
        <div className="w-full flex flex-col">
          {label && (
            <label
              htmlFor={id}
              className={`inline-block mb-1 pl-1 ${labelClassName}`}
              {...props}
            >
              {label}
            </label>
          )}
          <input
            type={type}
            className={` ${textColor} ${classname}`}
            ref={ref}
            id={id}
            {...props}
          />
        </div>
      </>
    );
  }
);

export default Input;
