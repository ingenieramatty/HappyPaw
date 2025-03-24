import React from 'react';
import { FaSpinner, FaTimes, FaUpload } from 'react-icons/fa'; // Importar íconos de React Icons

interface ImageUploadFieldProps {
  label: string;
  id: string;
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  setError?: (error: string) => void; // Nueva prop para actualizar el error
  loading?: boolean;
  image: File | null;
  onRemove: () => void;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  id,
  label,
  accept,
  onChange,
  error,
  setError,
  loading,
  image,
  onRemove,
}) => {
  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Detener la propagación del evento
    onRemove();
    if (setError) setError(""); // Limpiar el error al eliminar la imagen
  };

  // Función para manejar la selección de archivos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Validar el tipo de archivo
      const acceptedTypes = accept.split(",").map((type) => type.trim());
      if (!acceptedTypes.includes(file.type)) {
        if (setError) setError("Tipo de archivo no válido. Solo se permiten imágenes (JPEG, PNG).");
        return;
      }

      // Validar el tamaño del archivo (2 MB máximo)
      const maxSize = 2 * 1024 * 1024; // 2 MB en bytes
      if (file.size > maxSize) {
        if (setError) setError("El archivo no debe exceder los 2 MB.");
        return;
      }

      // Limpiar el error si el archivo es válido
      if (setError) setError("");
    }

    // Llamar a la función onChange proporcionada por el padre
    onChange(e);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <label className="block text-md font-bold text-gray-700 mb-2">{label}:</label>
      <div
        role="presentation"
        className={`border-2 border-dashed p-6 rounded-lg text-center bg-gray-50 hover:bg-gray-100 transition-all duration-300 cursor-pointer ${
          image ? "border-green-500" : "border-gray-300 hover:border-blue-500"
        } w-full h-64 flex items-center justify-center relative`} // Cambiar borde a verde si hay imagen
        onClick={() => document.getElementById(id)?.click()}
      >
        <input
          id={id}
          accept={accept}
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange} // Usar la nueva función handleFileChange
        />
        {loading ? (
          <div className="flex justify-center items-center">
            <FaSpinner className="animate-spin text-3xl text-blue-500" /> {/* Spinner animado */}
          </div>
        ) : image ? (
          <div className="w-full h-full relative">
            {/* Botón de eliminar (X) en la esquina superior derecha */}
            <button
              type="button"
              onClick={handleRemoveClick}
              className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition-all duration-300"
            >
              <FaTimes className="text-red-500" /> {/* Ícono de "X" */}
            </button>
          {/* Imagen */}
            <img
              src={URL.createObjectURL(image)}
              alt={label}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <FaUpload className="text-4xl mb-4 text-gray-500" /> {/* Ícono de subida */}
            <p className="text-gray-700 font-medium">Arrastra y suelta el archivo aquí</p>
            <p className="text-gray-500 text-sm mt-1">o haz clic para seleccionar</p>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default ImageUploadField;