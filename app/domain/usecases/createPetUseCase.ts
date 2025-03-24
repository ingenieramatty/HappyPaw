import type { PetRepository } from "~/domain/repository/pet_repository";
import type { Pet } from "~/domain/entities/pet";

export class CreatePetUseCase {
  constructor(private readonly petRepository: PetRepository) {}

  async execute(petData: Pet): Promise<boolean> {
    try {
      const success = await this.petRepository.createPet(petData);
      return success;
    } catch (error) {
      console.error("Error en CreatePetUseCase:", error);
      throw error;
    }
  }
}