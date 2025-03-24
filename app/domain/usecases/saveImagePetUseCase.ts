import type { PetRepository } from "~/domain/repository/pet_repository";

export class SaveImagePetUseCase {
  constructor(private readonly petRepository: PetRepository) {}

  async execute(image: File, code:string) : Promise<string> {
    try {
      // Llama al método del repositorio para subir la imagen
      const imageUrl = await this.petRepository.uploadImage(image, code);
      return imageUrl;
    } catch (error) {
      console.error("Error en UploadImageUseCase:", error);
      throw error;
    }
  }
}