import type { PetRepository } from "~/domain/repository/pet_repository";
import type { ResponsePet } from "../entities/response_pet";

export class GetPetByCodeUseCase {
  constructor(private readonly petRepository: PetRepository) {}

  async execute(code: string): Promise<ResponsePet> {
    try {
      const success = await this.petRepository.getByUniqueKey(code);
      return success;
    } catch (error) {
      console.error("Error en Buscar:", error);
      throw error;
    }
  }
}