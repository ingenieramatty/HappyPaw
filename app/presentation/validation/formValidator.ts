import type { FormData } from "../../presentation/interface/form_data";
import type { FormErrors } from "../interface/form_erros";

export const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  // Validar nombre del propietario
  if (!formData.nombrePropietario) {
    errors.nombrePropietario = "El nombre del propietario es requerido.";
  }

  // Validar nombre de la mascota
  if (!formData.nombreMascota) {
    errors.nombreMascota = "El nombre de la mascota es requerido.";
  }

  // Validar email
  if (!formData.email) {
    errors.email = "El email es requerido.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "El email no es válido.";
  }

  // Validar celular
  if (!formData.celular) {
    errors.celular = "El celular es requerido.";
  } else if (!/^3\d{9}$/.test(formData.celular)) {
    errors.celular = "El celular debe empezar por 3 y tener 10 dígitos.";
  }

  return errors;
};