import FileInput from "@/Components/atoms/FileInput";
import { useState } from "react";
import Cropper from "react-easy-crop";
import ReactCrop from "react-image-crop";

export default function ImageCropper({ data, setData, errors }) {
    const [imageSrc, setImageSrc] = useState(data?.foto);
    const [crop, setCrop] = useState({
        unit: "%",
        width: 30,
        height: 40,
        x: 25,
        y: 25,
    });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const selectImage = (file) => {
        setImageSrc(URL.createObjectURL(file));
    };

    return (
        <>
            {/* <div className="h-[150] w-[200] relative">
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={3 / 4}
                    onCropChange={setCrop}
                    // onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                />

                <input
                    value={zoom}
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(e) => setZoom(e.target.value)}
                    // className="range range-xs"
                />

                <input
                    value={rotation}
                    type="range"
                    min={0}
                    max={360}
                    step={1}
                    onChange={(e) => setRotation(e.target.value)}
                    // className="range range-xs"
                />
            </div> */}

            {imageSrc && (
                <>
                    <ReactCrop
                        crop={crop}
                        aspect={3 / 4}
                        onChange={(c) => setCrop(c)}
                        onComplete={(c) => setData("foto", c)}
                    >
                        <img src={imageSrc} alt="cropped" />
                    </ReactCrop>

                    <button type="button" onClick={setCrop}></button>
                </>
            )}

            <FileInput
                label="Foto"
                type="file"
                accept="image/*"
                value={data?.foto}
                description={"Ukuran maksimal 2MB"}
                onChange={(e) => selectImage(e.target.files[0])}
                placeholder={"Upload Foto"}
                error={errors?.foto}
            />
        </>
    );
}
