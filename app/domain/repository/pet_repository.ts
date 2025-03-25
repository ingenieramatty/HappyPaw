import type { Pet } from "../entities/pet";
import type { ResponsePet } from "../entities/response_pet";

export interface PetRepository {
  getByUniqueKey(key: string):Promise<ResponsePet>  
  createPet(petData: Pet): Promise<boolean>; // Método para guardar datos de la mascota
  uploadImage(image: File, code:string, type:string): Promise<string>; // Método para subir una imagen y devolver su URL
  }