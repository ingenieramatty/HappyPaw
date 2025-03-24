import React, { useState } from "react";
import type { ImageState } from "../../interface/image_state";
import type { ImageErrors } from "../../interface/image_errors";
import ImageUploadField from "./ImageUploadField";

interface ImageUploaderProps {
  images: ImageState;
  setImages: React.Dispatch<React.SetStateAction<ImageState>>;
  errors: ImageErrors;
  setErrors: React.Dispatch<React.SetStateAction<ImageErrors>>; // Asegúrate de incluir setErrors en las props
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  setImages,
  errors,
  setErrors,
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

      // Simular una carga de imagen (puedes reemplazar esto con una carga real)
      setTimeout(() => {
        setImages((prevImages) => ({
          ...prevImages,
          [key]: file,
        }));
        setErrors((prevErrors) => ({ ...prevErrors, [key]: "" })); // Limpiar el error al subir la imagen
        setLoading((prevLoading) => ({ ...prevLoading, [key]: false }));
      }, 1000); // Simula un retraso de 1 segundo
    }
  };

  // Función para eliminar una imagen
  const handleRemoveImage = (key: keyof ImageState) => {
    setImages((prevImages) => ({
      ...prevImages,
      [key]: null,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [key]: "Este campo es requerido" })); // Restablecer el error al eliminar la imagen
  };

  return (
    <div className="p-4 w-full items-center justify-center flex flex-col shadow-md rounded-lg">
      <div className="grid grid-cols-3 gap-5 space-y-4">
        <ImageUploadField
          label="Foto Mascota"
          id="file-input-x"
          accept="image/jpeg, image/png" // Solo permitir imágenes
          onChange={(e) => handleImageUpload(e, "x")}
          error={errors.x}
          loading={loading.x}
          image={images.x}
          onRemove={() => handleRemoveImage("x")}
        />
        <ImageUploadField
          label="Foto Vacunas"
          id="file-input-y"
          accept="image/jpeg, image/png" // Solo permitir imágenes
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