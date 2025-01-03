import React from "react";

const Input = ({ label, type = "text", required = false }) => {
  return (
    <div className="w-full">
      <label className="relative block cursor-text w-full">
        <input
          type={type}
          className="h-14 w-full border border-primary focus:outline-none focus:ring-0 focus:border-primary focus:border-2 rounded-lg outline-none px-4 peer pt-2 top-0 left-0 text-sm flex items-center peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all"
          required={required}
        />
        <span className="absolute top-0 left-0 px-4 text-sm flex items-center h-full peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all">
          {label}
        </span>
      </label>
    </div>
  );
};

export default Input;
