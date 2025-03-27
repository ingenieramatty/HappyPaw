import React, { useState } from "react";
import ImageUploadField from "./ImageUploadField";

interface SingleImageUploaderProps {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setHasImage: React.Dispatch<React.SetStateAction<boolean>>;
}

const SingleImageUploader: React.FC<SingleImageUploaderProps> = ({
  image,
  setImage,
  error,
  setError,
  setHasImage,
}) => {
  const [loading, setLoading] = useState(false);

  // Función para manejar la carga de la imagen
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);

      // Validaciones
      const acceptedTypes = ['image/jpeg', 'image/png'];
      if (!acceptedTypes.includes(file.type)) {
        setError("Solo se permiten imágenes JPEG o PNG");
        setLoading(false);
        return;
      }

      // Tamaño máximo 5MB
      if (file.size > 5 * 1024 * 1024) {
        setError("La imagen no debe exceder 5MB");
        setLoading(false);
        return;
      }

      setTimeout(() => {
        setImage(file);
        setError("");
        setLoading(false);
        setHasImage(true);
      }, 1000);
    }
  };

  // Función para eliminar la imagen
  const handleRemoveImage = () => {
    setImage(null);
    setError("La imagen es requerida");
    setHasImage(false);
  };

  return (
    <div className="p-4 w-full items-center justify-center flex flex-col shadow-md rounded-lg">
      <ImageUploadField
        label="Foto de la Mascota"
        id="file-input-single"
        accept="image/jpeg, image/png"
        onChange={handleImageUpload}
        error={error}
        loading={loading}
        image={image}
        onRemove={handleRemoveImage}
      />
    </div>
  );
};

export default SingleImageUploader;