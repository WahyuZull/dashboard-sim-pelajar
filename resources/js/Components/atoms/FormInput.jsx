import React from "react";

export default function FormInput({
    label,
    helper,
    value,
    onChange,
    onBlur,
    error,
    placeholder,
    type = "text",
}) {
    return (
        <div>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text font-bold">{label}</span>
                </div>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    className="input input-bordered w-full"
                />
                <div className="label">
                    <span className="label-text-alt">{helper}</span>
                </div>
            </label>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
