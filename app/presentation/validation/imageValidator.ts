import type { ImageErrors } from "../interface/image_errors";
import type { ImageState } from "../interface/image_state";

export const validateImages = (images: ImageState): ImageErrors => {
  const errors: ImageErrors = {};

  if (!images.x) errors.x = "La foto de la mascota es requerida.";
  if (!images.y) errors.y = "La foto de las vacunas es requerida.";
  if (!images.z) errors.z = "El archivo 'Otros' es requerido.";

  return errors;
};