export default function FileInput({
    label,
    ref,
    value,
    defaultValue,
    onChange,
    onBlur,
    error,
    description,
    placeholder,
    type,
    accept,
}) {
    return (
        <>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text font-bold">{label}</span>
                </div>
                <input
                    type={type}
                    accept={accept}
                    ref={ref}
                    placeholder={placeholder}
                    className="file-input file-input-bordered w-full max-w-xs"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    defaultValue={defaultValue}
                />
                {description && (
                    <div className="label">
                        <span className="label-text-alt">{description}</span>
                    </div>
                )}
            </label>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </>
    );
}
