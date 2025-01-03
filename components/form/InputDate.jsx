import React from "react";

const InputDate = ({ label, ...props }) => {
  return (
    <div className="relative w-full">
      <label className="block w-full">
        {label && (
          <span className="absolute top-2 left-4 text-sm flex items-center h-full peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all">
            {label}
          </span>
        )}
        <input
          type="date"
          className="h-14 w-full border border-primary rounded-lg px-4 peer pt-2 bg-transparent outline-none text-sm focus:border-2 focus:border-primary transition-all"
          {...props}
        />
      </label>
    </div>
  );
};

export default InputDate;
