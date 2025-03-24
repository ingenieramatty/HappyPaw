import type { Pet } from "../entities/pet";

export interface PetRepository {
    createPet(petData: Pet): Promise<boolean>; // Método para guardar datos de la mascota
    uploadImage(image: File, code:string): Promise<string>; // Método para subir una imagen y devolver su URL
  }