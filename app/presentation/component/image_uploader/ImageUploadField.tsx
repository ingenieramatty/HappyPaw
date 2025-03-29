import React from 'react';
import { FaSpinner, FaTimes, FaUpload, FaFilePdf } from 'react-icons/fa';

interface ImageUploadFieldProps {
  label: string;
  id: string;
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  setError?: (error: string) => void;
  loading?: boolean;
  file: File | null; // Cambiado de 'image' a 'file' para reflejar que puede ser cualquier tipo
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
  file,
  onRemove,
}) => {
  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
    if (setError) setError("");
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
  
    const acceptedTypes = accept.split(",").map(type => type.trim());
    const fileType = file.type;
    const isImage = fileType.startsWith('image/');
    const isPDF = fileType === 'application/pdf';
  
    // Validación de tipo
    if (!isImage && !isPDF) {
      if (setError) setError("Tipo de archivo no válido. Solo se permiten imágenes (JPEG, PNG) o PDF.");
      return;
    }
  
    // Validación de formato específico para imágenes
    if (isImage && !acceptedTypes.includes(fileType)) {
      if (setError) setError("Tipo de imagen no válido. Formatos aceptados: JPEG, PNG.");
      return;
    }
  
    // Validación de tamaño
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      if (setError) setError("El archivo no debe exceder los 2 MB.");
      return;
    }
  
    if (setError) setError("");
    onChange(e);
  };
  

  const isPDF = file?.type === 'application/pdf';
  const isImage = file?.type.startsWith('image/');

  return (
    <div className="flex items-center justify-center flex-col">
      <label className="block text-md font-bold text-gray-700 mb-2">{label}:</label>
      <div
        role="presentation"
        className={`border-2 border-dashed p-6 rounded-lg text-center bg-gray-50 hover:bg-gray-100 transition-all duration-300 cursor-pointer ${
          file ? "border-green-500" : "border-gray-300 hover:border-blue-500"
        } w-full h-64 flex items-center justify-center relative`}
        onClick={() => document.getElementById(id)?.click()}
      >
        <input
          id={id}
          accept={accept}
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {loading ? (
          <div className="flex justify-center items-center">
            <FaSpinner className="animate-spin text-3xl text-blue-500" />
          </div>
        ) : file ? (
          <div className="w-full h-full relative">
            <button
              type="button"
              onClick={handleRemoveClick}
              className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition-all duration-300"
            >
              <FaTimes className="text-red-500" />
            </button>
            {isPDF ? (
              <div className="flex flex-col items-center justify-center h-full">
                <FaFilePdf className="text-6xl text-red-500 mb-4" />
                <p className="text-gray-700 font-medium">{file.name}</p>
              </div>
            ) : isImage ? (
              <img
                src={URL.createObjectURL(file)}
                alt={label}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <FaFilePdf className="text-6xl text-gray-500 mb-4" />
                <p className="text-gray-700 font-medium">{file.name}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <FaUpload className="text-4xl mb-4 text-gray-500" />
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