import React, { useState } from "react";
import type { ImageState } from "../../interface/image_state";
import type { ImageErrors } from "../../interface/image_errors";
import ImageUploadField from "./ImageUploadField";

interface ImageUploaderProps {
  images: ImageState;
  setImages: React.Dispatch<React.SetStateAction<ImageState>>;
  errors: ImageErrors;
  setErrors: React.Dispatch<React.SetStateAction<ImageErrors>>;
  setHasMinimumImage: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  setImages,
  errors,
  setErrors,
  setHasMinimumImage,
}) => {
  const [loading, setLoading] = useState<{
    [key in keyof ImageState]: boolean;
  }>({
    x: false,
    y: false,
    z: false,
  });

  // Función para manejar la carga de archivos (imágenes o PDFs)
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

  // Función para eliminar un archivo
  const handleRemoveFile = (key: keyof ImageState) => {
    setImages((prevImages) => ({
      ...prevImages,
      [key]: null,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [key]: "Este campo es requerido" }));

    // Verificar si quedan archivos
    const hasOtherFiles = Object.values(images).some(file => file !== null);
    if (!hasOtherFiles) {
      setHasMinimumImage(false);
    }
  };

  return (
    <div className="p-4 w-full items-center justify-center flex flex-col shadow-md rounded-lg">
      <div className="grid grid-cols-3 gap-5 space-y-4">
        <ImageUploadField
          label="Vacuna"
          id="file-input-x"
          accept="image/jpeg, image/png, application/pdf" // Añadido PDF
          onChange={(e) => handleFileUpload(e, "x")}
          error={errors.x}
          loading={loading.x}
          file={images.x} // Cambiado de image a file
          onRemove={() => handleRemoveFile("x")}
        />
        <ImageUploadField
          label="Historial clínico"
          id="file-input-y"
          accept="image/jpeg, image/png, application/pdf" // Añadido PDF
          onChange={(e) => handleFileUpload(e, "y")}
          error={errors.y}
          loading={loading.y}
          file={images.y} // Cambiado de image a file
          onRemove={() => handleRemoveFile("y")}
        />
        <ImageUploadField
          label="Otros"
          id="file-input-z"
          accept="image/jpeg, image/png, application/pdf" // Añadido PDF
          onChange={(e) => handleFileUpload(e, "z")}
          error={errors.z}
          loading={loading.z}
          file={images.z} // Cambiado de image a file
          onRemove={() => handleRemoveFile("z")}
        />
      </div>
    </div>
  );
};

export default ImageUploader;