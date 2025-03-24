import type { Pet } from "~/domain/entities/pet";
import type { PetRepository } from "~/domain/repository/pet_repository";

export class PetRepositoryImpl implements PetRepository {
  private readonly createPetEndpoint =
    "https://mm3ludb6x4.execute-api.us-east-1.amazonaws.com/default/CreateClient";
  private readonly imageUploadEndpoint = "https://happypawvet.s3.amazonaws.com";

  // Método para crear un nuevo registro de mascota
  async createPet(petData: Pet): Promise<boolean> {
    try {
      const response = await fetch(this.createPetEndpoint, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      if (!response.ok) {
        throw new Error(`Error al crear la mascota: ${response.statusText}`);
      }

      // Si la respuesta es exitosa, retornamos true
      return true;
    } catch (error) {
      console.error("Error en createPet:", error);
      throw error;
    }
  }

  // Método para subir una imagen
  async uploadImage(image: File, code: string): Promise<string> {
    try {
      // Construye el nombre del archivo usando el `code` y la extensión del archivo
      const fileExtension = image.name.split('.').pop(); // Obtiene la extensión del archivo (ej: "jpg", "png")
      const fileName = `${code}.${fileExtension}`; // Nombre del archivo: "code.ext"
  
      // Modifica la URL pre-firmada para incluir el nombre del archivo
      const presignedUrl = `${this.imageUploadEndpoint}/${fileName}`;
  
      // Sube la imagen usando fetch
      const response = await fetch(presignedUrl, {
        method: "PUT", // Usa PUT para subir archivos a S3 con una URL pre-firmada
        body: image, // Envía el archivo directamente
        headers: {
          "Content-Type": image.type, // Asegúrate de enviar el tipo de contenido correcto
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error al subir la imagen: ${response.statusText}`);
      }
  
      // Retorna la URL completa del archivo en S3
      return presignedUrl.split('?')[0]; // Elimina los parámetros de la URL pre-firmada
    } catch (error) {
      console.error("Error en uploadImage:", error);
      throw error;
    }
  }
}