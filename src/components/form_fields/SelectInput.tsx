
import React from "react";
import ReactSelect from "react-select";

interface SelectProps {
    label?: string;
    options?: Array<
        { label: string; value: string | number; meta?: string } | string
    >;
    required?: boolean;
    value?: string | number | Array<string | number>;
    onChange?: (value: string | number | string[], meta?: string) => void;
    placeholder?: string;
    readonly?: boolean;
    isLoading?: boolean;
    name: string;
    onBlur?: () => void;
    DropDownIndicator?: React.FC;
    isMulti?: boolean;
    error?: string;
}

 const SelectInput = ({
    label = "",
    options = [],
    value,
    onChange,
    name,
    readonly = false,
    error = "",
    isMulti = false,
    required = false,
    ...props
}: SelectProps) => {
  
    const selectOptions = options.map((opt) => ({
        label: typeof opt === "string" ? opt : opt.label,
        value: typeof opt === "string" ? opt : opt.value,
        meta: typeof opt === "string" ? opt : opt?.meta ?? undefined,
    }));

    return (
        <div className="relative w-full">
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

            <div>
                <ReactSelect
                    onFocus={() => {
                        props.onBlur?.();
                    }}
                    menuPortalTarget={document.body}
                    // menuPosition={"absolute"}
                    // menuPlacement={"auto"}
                    isLoading={props.isLoading}
                    isDisabled={readonly}
                    isMulti={isMulti}
                    options={selectOptions}
                    placeholder={props.placeholder ?? ""}
                    value={
                        !value
                            ? null
                            : isMulti && Array.isArray(value)
                              ? selectOptions.filter(
                                    (v) => value?.includes(v.value)
                                )
                              : selectOptions.find((v) => v.value === value)
                    }
                    onChange={(values) => {
                        if (values && !isMulti) {
                            onChange?.(
                                (
                                    values as {
                                        label: string;
                                        value: string;
                                        meta?: string;
                                    }
                                ).value,
                                (
                                    values as {
                                        label: string;
                                        value: string;
                                        meta?: string;
                                    }
                                )?.meta
                            );
                        } else if (
                            values &&
                            isMulti &&
                            typeof value === "object"
                        ) {
                            const result = (
                                values as {
                                    label: string;
                                    value: string;
                                    meta?: string | undefined;
                                }[]
                            )?.map((val) => val.value);
                            onChange?.(result);
                        }
                    }}
                    components={{
                        IndicatorSeparator: () => null,
                        ...(props.DropDownIndicator
                            ? {
                                  DropdownIndicator:
                                      props.DropDownIndicator ?? undefined,
                              }
                            : {}),
                    }}
                    styles={{
                        option: (provided, state) => ({
                            ...provided,
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            fontFamily: "Jost-Medium",
                            backgroundColor: state.isSelected
                                ? "#A0830BA6"
                                : "transparent",
                            color: state.isSelected ? "white" : "#667085",
                            // color: state.isSelected ? "white" : "#68769F",
                            ":hover": {
                                backgroundColor: !state.isDisabled
                                    ? "#A0830B40"
                                    : undefined,
                            },
                        }),
                        menu: (provided) => ({
                            ...provided,
                            top: "0px",
                            zIndex: "20",
                            backgroundColor: "#ffffff",
                        }),
                        valueContainer: (provided) => ({
                            ...provided,
                            height: isMulti ? "auto" : "50px",
                            minHeight: isMulti ? "50px" : undefined,
                            width: "100%",
                            borderRadius: "10px",
                            color: "#667085",
                            minWidth: "300",
                            paddingLeft: "16px",
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            color: "#667085",
                        }),
                        multiValue: (provided) => ({
                            ...provided,
                            backgroundColor: "#617091",
                            borderRadius: "5px",
                            color: "#ffffff",
                        }),
                        multiValueLabel: (provided) => ({
                            ...provided,
                            color: "#ffffff",
                            fontFamily: "Jost-Medium",
                        }),
                        control: (provided) => ({
                            ...provided,
                            height: "100%",
                            minHeight: isMulti ? "100%" : undefined,
                            borderRadius: "10px",
                            boxShadow: "none",
                            border: "1px solid rgb(179 195 220 / 0.7)",
                            transition: "all 500ms",
                            backgroundColor: "transparent",

                            "&:hover": {
                                border: "2px solid #60A5FA",
                                outline: "2px solid #60A5FA",
                            },
                            "&:focus": {
                                border: "2px solid #60A5FA",
                                outline: "2px solid #60A5FA",
                            },
                        }),
                        container: (provided) => ({
                            ...provided,
                            height: "100%",
                        }),

                        dropdownIndicator: (provided) => ({
                            ...provided,
                            rotate: "0deg",
                        }),
                        placeholder: (defaultStyles) => {
                            return {
                                ...defaultStyles,
                                color: "rgb(102 112 133 / 0.5)",
                            };
                        },
                        input: (defaultStyles) => {
                            return {
                                ...defaultStyles,
                                color: "rgb(102 112 133 / 0.7)",
                            };
                        },
                    }}
                />
            </div>
            {error && (
                <div className="text-red-400 mt-1 text-[12px]">{error}</div>
            )}
        </div>
    );
};

export default SelectInput
