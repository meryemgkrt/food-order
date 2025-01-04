import React from "react";

const Input = (props) => {
  const { type, placeholder, ...inputProps } = props;
  return (
    <div className="w-full">
      <label className="relative block cursor-text w-full">
        <input
           type={type}
           className={`h-14 w-full borde-2 border-primary outline-none rounded-lg appearance-none focus:ring-0  focus:border-2 focus:border-primary  px-4 peer ${
             type !== "datetime-local" && "pt-2"
           }`}
           required
           {...inputProps}
        />
        {type !== "datetime-local" && (
          <span className="absolute top-0 left-0 px-4 text-sm flex items-center h-full peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all">
            {placeholder}
          </span>
        )}
      </label>
    </div>
  );
};

export default Input;
