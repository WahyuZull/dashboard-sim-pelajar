import React from "react";

export default function FormSelect({
    label,
    value,
    defaultValue,
    helper,
    onChange,
    onBlur,
    error,
    placeholder,
    options,
    disabled,
}) {
    return (
        <div>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text font-bold">{label}</span>
                </div>
                <select
                    disabled={disabled}
                    value={value}
                    defaultValue={defaultValue}
                    onBlur={onBlur}
                    onChange={onChange}
                    className="select select-bordered"
                    placeholder={placeholder}
                >
                    <option value="">{placeholder}</option>
                    {options.length > 0 && (
                        options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))
                    )}
                </select>
                <div className="label">
                    <span className="label-text-alt">{helper}</span>
                </div>
            </label>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
