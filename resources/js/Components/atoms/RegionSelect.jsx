import React from "react";

export default function RegionSelect({
    id,
    label,
    value,
    onChange,
    onBlur,
    error,
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
                    id={id}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    disabled={disabled}
                    className="select select-bordered"
                >
                    {options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </label>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
