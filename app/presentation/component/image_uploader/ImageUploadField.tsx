import React from 'react';
import { FaSpinner, FaTimes, FaUpload, FaFilePdf, FaFileImage } from 'react-icons/fa';
import Swal from 'sweetalert2';

interface ImageUploadFieldProps {
  label: string;
  id: string;
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  setError?: (error: string) => void;
  loading?: boolean;
  file: File | null;
  onRemove: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
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
  inputRef,
}) => {
  const showErrorAlert = (message: string) => {
    Swal.fire({
      icon: 'error',
      title: 'Error al cargar archivo',
      text: message,
      confirmButtonColor: '#3085d6',
    });
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
    if (setError) setError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    try {
      if (file.size === 0) throw new Error("El archivo está vacío");
      if (file.size > 10 * 1024 * 1024) throw new Error("El archivo excede 10MB");
    } catch (err) {
      const errorMsg = "No se pudo leer el archivo. Intente nuevamente.";
      if (setError) setError(errorMsg);
      showErrorAlert(errorMsg);
      return;
    }

    const acceptedTypes = accept.split(",").map(type => type.trim());
    const fileType = file.type;
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    const isImage = fileType.startsWith('image/') || 
                   ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension ?? '');
    const isPDF = fileType === 'application/pdf' || fileExtension === 'pdf';

    if (!isImage && !isPDF) {
      const errorMsg = "Tipo de archivo no válido. Formatos aceptados: JPEG, PNG, GIF, WEBP o PDF.";
      if (setError) setError(errorMsg);
      showErrorAlert(errorMsg);
      return;
    }

    if (isImage && !acceptedTypes.some(type => fileType.includes(type.replace('image/', '')))) {
      const errorMsg = `Tipo de imagen no válido. Formatos aceptados: ${acceptedTypes.join(', ')}.`;
      if (setError) setError(errorMsg);
      showErrorAlert(errorMsg);
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      const errorMsg = "El archivo no debe exceder los 10 MB.";
      if (setError) setError(errorMsg);
      showErrorAlert(errorMsg);
      return;
    }

    if (setError) setError("");
    onChange(e);
    
  };

  const isPDF = file?.type === 'application/pdf' || file?.name?.endsWith('.pdf');
  if(isPDF){

    console.log("error pdf", file?.name)
  } 
  const isImage = file?.type?.startsWith('image/') || 
                 ['jpg', 'jpeg', 'png', 'gif', 'webp'].some(ext => file?.name?.endsWith(`.${ext}`));
    if(isImage){

      console.log("error", file?.name)
    } 

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
          ref={inputRef}
        />
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <FaSpinner className="animate-spin text-3xl text-blue-500 mb-2" />
            <p className="text-gray-500 text-sm">Cargando archivo...</p>
          </div>
        ) : file ? (
          <div className="w-full h-full relative">
            <button
              type="button"
              onClick={handleRemoveClick}
              className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition-all duration-300"
              aria-label="Eliminar archivo"
            >
              <FaTimes className="text-red-500" />
            </button>
            {isPDF ? (
              <div className="flex flex-col items-center justify-center h-full p-4">
                <FaFilePdf className="text-6xl text-red-500 mb-4" />
                <p className="text-gray-700 font-medium text-center break-all">{file.name}</p>
                <p className="text-gray-500 text-sm mt-2">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            ) : isImage ? (
              <div className="w-full h-full flex flex-col">
                <img
                  src={URL.createObjectURL(file)}
                  alt={label}
                  className="w-full h-4/5 object-contain rounded-lg"
                />
                <div className="mt-2 text-center">
                  <p className="text-gray-700 font-medium truncate px-2">{file.name}</p>
                  <p className="text-gray-500 text-sm">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <FaFileImage className="text-6xl text-gray-500 mb-4" />
                <p className="text-gray-700 font-medium text-center break-all">{file.name}</p>
                <p className="text-gray-500 text-sm mt-2">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <FaUpload className="text-4xl mb-4 text-gray-500" />
            <p className="text-gray-700 font-medium">Seleccionar archivo</p>
            <p className="text-gray-500 text-sm mt-1">Haz clic para buscar en tu dispositivo</p>
            <p className="text-gray-400 text-xs mt-2">Formatos aceptados: {accept}</p>
            <p className="text-gray-400 text-xs">Tamaño máximo: 10MB</p>
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2 animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
};

export default ImageUploadField;