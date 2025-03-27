import React from "react";
import type { FormData } from "../../interface/form_data";
import type { FormErrors } from "~/presentation/interface/form_erros";

interface FormComponentProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: FormErrors;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}

const FormComponent: React.FC<FormComponentProps> = ({
  formData,
  setFormData,
  errors,
  setErrors,
}) => {
  // Función para validar el campo "celular"
  const validatePhone = (value: string): string => {
    if (!value) return "El celular es requerido.";
    if (!/^3\d{9}$/.test(value)) return "El celular debe empezar por 3 y tener 10 dígitos.";
    return "";
  };

  // Función para validar el campo "email"
  const validateEmail = (value: string): string => {
    if (!value) return "El email es requerido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "El email no es válido.";
    return "";
  };

  // Función para validar la imagen
  const validateImage = (file: File | null): string => {
    if (!file) return "La imagen es requerida.";
    return "";
  };

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    let errorMessage = "";
    switch (name) {
      case "celular":
        errorMessage = validatePhone(value);
        break;
      case "email":
        errorMessage = validateEmail(value);
        break;
      case "nombrePropietario":
        errorMessage = value ? "" : "El nombre del propietario es requerido.";
        break;
      case "nombreMascota":
        errorMessage = value ? "" : "El nombre de la mascota es requerido.";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  // Función para manejar el cambio de archivo de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    setFormData((prev) => ({ ...prev, imagen: file }));
    setErrors((prev) => ({ ...prev, imagen: validateImage(file) }));
  };

  // Función para mostrar vista previa de la imagen
  const renderImagePreview = () => {
    if (!formData.imagen) return null;
    
    const imageUrl = URL.createObjectURL(formData.imagen);
    return (
      <div className="mt-4 flex flex-col items-center">
        <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
          <img 
            src={imageUrl} 
            alt="Preview" 
            className="w-full h-full object-cover"
            onLoad={() => URL.revokeObjectURL(imageUrl)}
          />
        </div>
        <p className="mt-2 text-sm text-gray-600 text-center">
          {formData.imagen.name}
        </p>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Información de la Mascota
      </h2>
      
      <form className="space-y-6">
        {/* Código único */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <label className="block text-sm font-semibold text-blue-800 mb-1">
            Código único
          </label>
          <input
            type="text"
            name="codigoUnico"
            value={formData.codigoUnico}
            readOnly
            className="w-full px-4 py-2 bg-white border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre del propietario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del propietario *
            </label>
            <input
              type="text"
              name="nombrePropietario"
              value={formData.nombrePropietario}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                errors.nombrePropietario 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
              }`}
            />
            {errors.nombrePropietario && (
              <p className="mt-1 text-sm text-red-600">{errors.nombrePropietario}</p>
            )}
          </div>

          {/* Nombre de la mascota */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la mascota *
            </label>
            <input
              type="text"
              name="nombreMascota"
              value={formData.nombreMascota}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                errors.nombreMascota 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
              }`}
            />
            {errors.nombreMascota && (
              <p className="mt-1 text-sm text-red-600">{errors.nombreMascota}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                errors.email 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Celular */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Celular *
            </label>
            <input
              type="text"
              name="celular"
              value={formData.celular}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none ${
                errors.celular 
                  ? "border-red-500 focus:ring-red-200" 
                  : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
              }`}
            />
            {errors.celular && (
              <p className="mt-1 text-sm text-red-600">{errors.celular}</p>
            )}
          </div>
        </div>

        {/* Campo de carga de imagen */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Imagen de la mascota *
          </label>
          
          <div className="flex items-center justify-center w-full">
            <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
              errors.imagen ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
            }`}>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Haz clic para subir</span> o arrastra la imagen
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG (MAX. 5MB)
                </p>
              </div>
              <input 
                type="file" 
                name="imagen"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden" 
              />
            </label>
          </div>
          
          {errors.imagen && (
            <p className="mt-1 text-sm text-red-600">{errors.imagen}</p>
          )}
          
          {renderImagePreview()}
        </div>
      </form>
    </div>
  );
};

export default FormComponent;