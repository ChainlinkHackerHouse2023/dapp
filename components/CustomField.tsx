import React, { ChangeEvent, FC } from "react";

interface Option {
  label: string;
  value: string;
}

interface CustomFieldProps {
  label: string;
  type: "text" | "dropdown";
  name: string;
  options?: Option[];
  placeholder?: string;
  onChange: <T extends HTMLInputElement | HTMLSelectElement>(
    e: ChangeEvent<T>
  ) => void;
}

const CustomField: FC<CustomFieldProps> = ({
  label,
  type,
  options,
  placeholder,
  onChange,
}) => {
  return (
    <div className="relative flex flex-col justify-between bg-[#282626] p-2 pb-4 rounded mb-4">
      <label style={{ color: "#5F5F5F" }} className="text-sm">
        {label}
      </label>

      {type === "dropdown" ? (
        <>
          <select
            onChange={(e) => onChange(e as ChangeEvent<HTMLSelectElement>)}
            className="w-full text-lg text-white bg-transparent appearance-none"
          >
            {options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* SVG content unchanged */}
        </>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={(e) => onChange(e as ChangeEvent<HTMLInputElement>)}
          className="w-full text-lg text-white bg-transparent appearance-none"
        />
      )}
    </div>
  );
};

export default CustomField;
