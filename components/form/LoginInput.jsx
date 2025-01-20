import React from "react";

const LoginInput = ({
  type,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
}) => {
  return (
    <div className="w-full relative">
      <label className="relative block cursor-text w-full">
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder=" " // Boş placeholder, stil amaçlı kullanılacak
          className={`h-14 w-full border-2 outline-none rounded-lg appearance-none focus:ring-0 focus:border-primary px-4 peer ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        <span
          className={`absolute top-0 left-0 px-4 text-sm flex items-center h-full text-gray-500 transition-all ${
            value
              ? "hidden" // Eğer inputta değer varsa placeholder'ı gizle
              : "peer-placeholder-shown:h-full peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:h-7 peer-focus:text-xs peer-focus:text-primary"
          }`}
        >
          {placeholder}
        </span>
      </label>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default LoginInput;
