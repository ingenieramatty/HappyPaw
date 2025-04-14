import React, { useState, useEffect, useRef } from "react";
import type { ImageState } from "../../interface/image_state";
import type { ImageErrors } from "../../interface/image_errors";
import ImageUploadField from "./ImageUploadField";

interface ImageUploaderProps {
  images: ImageState;
  setImages: React.Dispatch<React.SetStateAction<ImageState>>;
  errors: ImageErrors;
  setErrors: React.Dispatch<React.SetStateAction<ImageErrors>>;
  setHasMinimumImage: React.Dispatch<React.SetStateAction<boolean>>;
  urls?:string[],
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  setImages,
  errors,
  setErrors,
  setHasMinimumImage,
  urls
}) => {
  const [loading, setLoading] = useState<{
    [key in keyof ImageState]: boolean;
  }>({
    x: false,
    y: false,
    z: false,
  });
  // Refs para inputs de archivo
  const fileInputRefs = {
    x: useRef<HTMLInputElement>(null),
    y: useRef<HTMLInputElement>(null),
    z: useRef<HTMLInputElement>(null),
  };

  // Manejar carga de archivos
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof ImageState
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading((prevLoading) => ({ ...prevLoading, [key]: true }));

      setTimeout(() => {
        setImages((prevImages) => ({
          ...prevImages,
          [key]: file,
        }));
        setErrors((prevErrors) => ({ ...prevErrors, [key]: "" }));
        setLoading((prevLoading) => ({ ...prevLoading, [key]: false }));
        setHasMinimumImage(true);
      }, 1000);
    }
  };

  // Manejar eliminación de archivos
  const handleRemoveFile = (key: keyof ImageState) => {
    setImages((prevImages) => ({
      ...prevImages,
      [key]: null,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: "Este campo es requerido",
    }));

    if (fileInputRefs[key]?.current) {
      fileInputRefs[key].current!.value = "";
    }

    const hasOtherFiles = Object.values(images).some((file) => file !== null);
    if (!hasOtherFiles) {
      setHasMinimumImage(false);
    }
  };

  return (
    <div className="p-4 w-full items-center justify-center flex flex-col shadow-md rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 space-y-4">
        <ImageUploadField
          label="Vacuna"
          id="file-input-x"
          accept="image/jpeg, image/png, application/pdf"
          onChange={(e) => handleFileUpload(e, "x")}
          error={errors.x}
          loading={loading.x}
          file={images.x as File}
          onRemove={() => handleRemoveFile("x")}
          inputRef={fileInputRefs.x}
        />
        <ImageUploadField
          label="Historial clínico"
          id="file-input-y"
          accept="image/jpeg, image/png, application/pdf"
          onChange={(e) => handleFileUpload(e, "y")}
          error={errors.y}
          loading={loading.y}
          file={images.y as File}
          onRemove={() => handleRemoveFile("y")}
          inputRef={fileInputRefs.y}
        />
        <ImageUploadField
          label="Otros"
          id="file-input-z"
          accept="image/jpeg, image/png, application/pdf"
          onChange={(e) => handleFileUpload(e, "z")}
          error={errors.z}
          loading={loading.z}
          file={images.z as File}
          onRemove={() => handleRemoveFile("z")}
          inputRef={fileInputRefs.z}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
