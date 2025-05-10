import React from "react";

const InputSelect = ({ label, required }) => {
  // 1'den 6'ya kadar sayı listesi oluşturuluyor
  const options = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <div className="w-full relative">
      <label className="relative block w-full cursor-text">
        <select
          className="h-14 w-full border focus:border-primary focus:border-2 rounded-lg outline-none px-4 peer pt-2 bg-transparent text-sm appearance-none transition-all"
          required={required}
        >
          <option value="" disabled>
            {label}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="absolute top-0 left-0 px-4 text-sm flex items-center h-full peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all">
          {label}
        </span>
      </label>
    </div>
  );
};

export default InputSelect;
