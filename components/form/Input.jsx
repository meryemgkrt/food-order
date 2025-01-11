import React from "react";

const Input = (props) => {
  const { type, placeholder, errorMessage, ...inputProps } = props;
 

  return (
    <div className="w-full">
      <label className="relative block cursor-text w-full">
        <input
          type={type}
          className={`h-10 w-full border-2 outline-none rounded-lg appearance-none focus:ring-0 focus:border-2 focus:border-primary px-4 peer ${
            type !== "datetime-local" && "pt-2"
          } ${errorMessage ? "border-red-500" : "border-primary"}`}
          {...inputProps} // errorMessage artık DOM'a aktarılmayacak
        />
        {type !== "datetime-local" && (
          <span className="absolute top-0 left-0 px-4 text-sm flex items-center h-full peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all">
            {placeholder}
          </span>
        )}
      </label>
      {/* Hata mesajını burada gösterebilirsiniz */}
      {errorMessage && (
        <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
      )}
    </div>
  );
};

export default Input;
