import type { Pet } from "~/domain/entities/pet";
import type { PetRepository } from "~/domain/repository/pet_repository";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import type { ResponsePet } from "~/domain/entities/response_pet";

export class PetRepositoryImpl implements PetRepository {
  private readonly createPetEndpoint =
    "https://mm3ludb6x4.execute-api.us-east-1.amazonaws.com/default/CreateClient";
    private readonly getPetByUnique = "https://mm3ludb6x4.execute-api.us-east-1.amazonaws.com/default/CreateClient?Key=";
  private readonly s3Client: S3Client;
  private readonly bucketName = import.meta.env.VITE_AWS_S3_BUCKET_NAME;

  constructor() {
    this.s3Client = new S3Client({
      region: import.meta.env.VITE_AWS_REGION,
      credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
      },
    });
  }
  async getByUniqueKey(key: string): Promise<ResponsePet> {
    try {
      const response = await fetch(`${this.getPetByUnique}${key}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error al obtener la mascota: ${response.statusText}`);
      }
  
      const data: ResponsePet = await response.json();
      return data;
    } catch (error) {
      console.error("Error en getByUniqueKey:", error);
      throw error;
    }
  }
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

      return true;
    } catch (error) {
      console.error("Error en createPet:", error);
      throw error;
    }
  }

  async uploadImage(image: File, code: string, type: string): Promise<string> {
    try {
      if (!this.bucketName) {
        throw new Error("El nombre del bucket S3 no está configurado");
      }
  
      // 1. Obtener el ArrayBuffer directamente del File
      const arrayBuffer = await image.arrayBuffer();
      
      // 2. Crear Uint8Array desde ArrayBuffer (alternativa a Buffer)
      const uint8Array = new Uint8Array(arrayBuffer);
  
      // 3. Generar nombre de archivo
      const fileExtension = image.name.split('.').pop() || 'jpg';
      const fileName = `pets/${code}_${type}_${Date.now()}.${fileExtension}`;
  
      // 4. Configurar parámetros para S3
      const params = {
        Bucket: this.bucketName,
        Key: fileName,
        Body: uint8Array, // Usamos Uint8Array directamente
        ContentType: image.type,
        ACL: 'public-read',
        Metadata: {
          'uploaded-by': 'web-app',
          'pet-code': code
        }
      };
  
      // 5. Subir a S3
      const command = new PutObjectCommand(params);
      await this.s3Client.send(command);
  
      // 6. Retornar URL pública
      return `https://${this.bucketName}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${fileName}`;
    } catch (error) {
      console.error("Error en uploadImage:", error);
      throw new Error(`Error al subir imagen: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }
}