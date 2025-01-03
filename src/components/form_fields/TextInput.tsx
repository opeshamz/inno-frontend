import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface IInputProps extends React.ComponentProps<"input"> {
    name: string;
    label?: string;
    type?:
        | "text"
        | "number"
        | "password"
        | "email"
        | "tel"
        | "date"
        | "time"
        | "url"
        | "file";
    required?: boolean;
    error?: string;
    extraClass?: string;
}

const TextInput = (props: IInputProps) => {
    const {
        name,
        type = "text",
        error = "",
        label = "",
        extraClass,
        required = true,
        ...rest
    } = props;
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={name}
                    className="text-blueGray font-J-Medium block mb-[10px]"
                >
                    {label}{" "}
                    {required && (
                        <span className="text-blueGray font-J-Medium">*</span>
                    )}
                </label>
            )}
            <div className="relative">
                <input
                    type={
                        props.type === "password" && showPassword
                            ? "text"
                            : type
                    }
                    name={name}
                    id={name}
                    className={clsx(
                        "h-[54px] font-J-Regular disabled:cursor-not-allowed block placeholder:text-inputGray/50 px-4 w-full",
                        "text-inputGray outline-none border border-[#B3C3DC]/70 rounded-[10px] focus:border-blue-300 bg-transparent transition-colors duration-500",
                        extraClass
                    )}
                    required={required}
                    {...rest}
                />

                {type === "password" && (
                    <button
                        type="button"
                        onClick={togglePassword}
                        className="absolute top-[18px] right-4"
                    >
                        {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5 text-[#5E646C]" />
                        ) : (
                            <EyeIcon className="h-5 w-5 text-[#5E646C]" />
                        )}
                    </button>
                )}
            </div>

            {error && (
                <div className="text-red-400 mt-1 text-[12px]">{error}</div>
            )}
        </div>
    );
};

export default TextInput;
