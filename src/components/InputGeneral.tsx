'use client'
import { cn } from "@/utils/cn";
import { FC, InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";

interface InputsProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  touched?: boolean;
  label: string;
}

const InputGeneral: FC<InputsProps> = ({
  onChange,
  value,
  type,
  id,
  name,
  placeholder,
  error,
  touched,
  label,
  className,
  disabled,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const isError = error && touched;

  return (
    <div className="relative w-full flex items-center justify-center">
      <input
        ref={inputRef}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          `border focus:ring-transparent focus ${
            isError ? "border-red-500 text-red-500" : ""
          } rounded-[8px] h-[50px] p-3 my-2 w-full px-[18px] border-gray-400 leading-[100%] tracking-[-0.16px] font-medium focus:border-yellow-300 focus:ring-0 bg-white disabled:bg-black`,
          className
        )}
        name={name}
        id={id}
        type={showPassword ? "text" : type}
        value={value}
        onChange={
          onChange as (
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => void
        }
        placeholder={placeholder ? placeholder : ""}
        autoComplete={type === "password" ? "off" : "on"}
        disabled={disabled}
      />
      <span
        onClick={() => {
          setFocused(true), inputRef.current?.focus();
        }}
        className={`absolute -left-3 mx-6 px-2 transition duration-200 cursor-text ${focused || value ? "input-text" : ""}`}
      >
        {label}
      </span>
      {type === "password" && (
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <PiEyeSlash className="absolute right-3 top-1/2 w-6 h-6 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
          ) : (
            <PiEyeLight className="absolute right-3 top-1/2 w-6 h-6 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
          )}
        </button>
      )}
    </div>
  );
};

export default InputGeneral;
