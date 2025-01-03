/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
import DatePicker from "react-datepicker";
import { CalendarIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import "react-datepicker/dist/react-datepicker.css";

interface IDateProps {
    date: Date | null;
    required?: boolean;
    setDate: (date: Date | null) => void;
    label?: string;
    placeholder?: string;
    name: string;
    error?: string;
    handleBlur?: React.InputHTMLAttributes<HTMLInputElement>["onBlur"];
    minDate?: Date;
    maxDate?: Date;
}

// interface ICustomInput extends React.HTMLProps<HTMLInputElement> {
//     variant: "white" | "grey";
// }

const CustomInput = React.forwardRef(
    (
        props: React.HTMLProps<HTMLInputElement>,

        ref: React.Ref<HTMLInputElement>
    ) => {
        const { name, ...rest } = props;
        return (
            <div className="relative cursor-pointer">
                <input
                    {...rest}
                    className={clsx(
                        "h-[54px] font-J-Regular disabled:cursor-not-allowed block placeholder:text-inputGray/50 px-4 w-full",
                        "text-inputGray outline-none border border-[#B3C3DC]/70 rounded-[10px]  focus:border-blue-300 bg-transparent transition-colors duration-500"
                    )}
                    id={name}
                    name={name}
                    ref={ref}
                    type="text"
                    readOnly
                />
                <CalendarIcon className="absolute text-[#8C9DB1] w-5 top-[50%] transform translate-y-[-50%] right-[16px]" />
            </div>
        );
    }
);

const CustomDatePicker = ({
    date,
    setDate,
    required = false,
    label,
    placeholder,
    name,
    error,
    handleBlur = () => {},
    minDate,
    maxDate,
}: IDateProps) => {
    return (
        <div>
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

            <DatePicker
                selected={date}
                onChange={(date: Date | null) => setDate(date)}
                customInput={<CustomInput name={name} />}
                placeholderText={placeholder}
                peekNextMonth
                dateFormat={"dd/MM/yyyy"}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                onBlur={handleBlur}
                minDate={minDate}
                maxDate={maxDate}
            />
            {error && (
                <div className="text-red-400 mt-1 text-[12px]">{error}</div>
            )}
        </div>
    );
};

export default CustomDatePicker;
