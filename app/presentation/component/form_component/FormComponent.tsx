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

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Actualizar los datos del formulario
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Validar el campo en tiempo real
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
      default:
        break;
    }

    // Actualizar los errores
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <form className="space-y-4 grid grid-cols-2 gap-5">
        {/* Código único (no editable) */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Código único:</label>
          <input
            type="text"
            name="codigoUnico"
            value={formData.codigoUnico}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
          />
        </div>

        {/* Nombre del propietario */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre del propietario:</label>
          <input
            type="text"
            name="nombrePropietario"
            value={formData.nombrePropietario}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.nombrePropietario && (
            <p className="text-red-500 text-sm mt-1">{errors.nombrePropietario}</p>
          )}
        </div>

        {/* Nombre de la mascota */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre de la mascota:</label>
          <input
            type="text"
            name="nombreMascota"
            value={formData.nombreMascota}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.nombreMascota && (
            <p className="text-red-500 text-sm mt-1">{errors.nombreMascota}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Celular */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Celular:</label>
          <input
            type="text"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.celular && (
            <p className="text-red-500 text-sm mt-1">{errors.celular}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormComponent;