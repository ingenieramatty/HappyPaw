import React, { useState } from "react";
import type { ImageState } from "../../interface/image_state";
import type { ImageErrors } from "../../interface/image_errors";
import ImageUploadField from "./ImageUploadField";

interface ImageUploaderProps {
  images: ImageState;
  setImages: React.Dispatch<React.SetStateAction<ImageState>>;
  errors: ImageErrors;
  setErrors: React.Dispatch<React.SetStateAction<ImageErrors>>;
  setHasMinimumImage: React.Dispatch<React.SetStateAction<boolean>>; // Nueva prop
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  setImages,
  errors,
  setErrors,
  setHasMinimumImage, // Usar la nueva prop
}) => {
  const [loading, setLoading] = useState<{
    [key in keyof ImageState]: boolean;
  }>({
    x: false,
    y: false,
    z: false,
  });

  // Función para manejar la carga de imágenes
  const handleImageUpload = (
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
        setHasMinimumImage(true); // Informar que hay al menos una imagen
      }, 1000);
    }
  };

  // Función para eliminar una imagen
  const handleRemoveImage = (key: keyof ImageState) => {
    setImages((prevImages) => ({
      ...prevImages,
      [key]: null,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [key]: "Este campo es requerido" }));

    // Verificar si quedan imágenes
    const hasOtherImages = Object.values(images).some(img => img !== null);
    if (!hasOtherImages) {
      setHasMinimumImage(false); // Informar que no hay imágenes
    }
  };

  return (
    <div className="p-4 w-full items-center justify-center flex flex-col shadow-md rounded-lg">
      <div className="grid grid-cols-3 gap-5 space-y-4">
        <ImageUploadField
          label="Foto Mascota"
          id="file-input-x"
          accept="image/jpeg, image/png"
          onChange={(e) => handleImageUpload(e, "x")}
          error={errors.x}
          loading={loading.x}
          image={images.x}
          onRemove={() => handleRemoveImage("x")}
        />
        <ImageUploadField
          label="Foto Vacunas"
          id="file-input-y"
          accept="image/jpeg, image/png"
          onChange={(e) => handleImageUpload(e, "y")}
          error={errors.y}
          loading={loading.y}
          image={images.y}
          onRemove={() => handleRemoveImage("y")}
        />
        <ImageUploadField
          label="Otros"
          id="file-input-z"
          accept="image/jpeg, image/png"
          onChange={(e) => handleImageUpload(e, "z")}
          error={errors.z}
          loading={loading.z}
          image={images.z}
          onRemove={() => handleRemoveImage("z")}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
