import React from "react";

const CustomField = ({ label, type, options, placeholder, onChange }) => {
  return (
    <div className="relative flex flex-col justify-between bg-[#282626] p-2 pb-4 rounded mb-4">
      <label style={{ color: "#5F5F5F" }} className="text-sm">
        {label}
      </label>

      {type === "dropdown" ? (
        <>
          <select
            onChange={onChange}
            className="w-full text-lg text-white bg-transparent appearance-none"
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-[28px] w-[28px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M6.293 9.293l3.999 3.999 3.999-3.999a1.003 1.003 0 0 0 0-1.414c-.39-.391-1.022-.389-1.414-.001l-3.293 3.293-3.292-3.292c-.39-.39-1.024-.39-1.415-.001a1.003 1.003 0 0 0-.001 1.414z" />
            </svg>
          </div>
        </>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full text-lg text-white bg-transparent appearance-none"
        />
      )}
    </div>
  );
};

export default CustomField;
