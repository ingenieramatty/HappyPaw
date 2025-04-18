import React, { useState } from "react";
import { IoMdImages } from "react-icons/io";
import type { Pet } from "~/domain/entities/pet";
import { DocumentThumbnail } from "../component/document/DocumentThumbnail";
import { OwnerInfoCard } from "../component/document/OwnerInfoCard";
import { PetStatusBadge } from "../component/document/PetStatusBadge";
import { CardImagePet } from "../component/document/CardImagePet";
import HomePage from "./home_page";

interface ShowPetPageProps {
  petData: Pet;
}

export const ShowPetPage: React.FC<ShowPetPageProps> = ({ petData }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing(true);
  };

  if (isEditing) {
    return <HomePage petData={petData} isEditing />;
  }
  // Format activation date
  const formattedDate = new Date(petData.ActivateDate).toLocaleDateString(
    "es-ES",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Format phone number
  const formattedPhone = `+${petData.phone
    .toString()
    .replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4")}`;

  // Función para determinar si una URL es PDF
// Función para determinar si una URL es PDF
const isPdf = (url: string | null): boolean => {
  if (!url) return false; // Si la URL es null, devuelve false
  return url.toLowerCase().endsWith(".pdf");
};

  // Función para extraer el tipo de documento de la URL
  const getDocumentType = (url: string): string => {
    if (!url) return "Documento"; // Si la URL es null, devuelve un tipo genérico
  
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes("photo")) return "Foto";
    if (lowerUrl.includes("vaccine")) return "Vacuna";
    if (lowerUrl.includes("history")) return "Historial clínico";
    if (lowerUrl.includes("other")) return "Otro";
    return "Documento";
  };
  

  // Función para descargar archivos
const handleDownload = (url: string, filename: string) => {
  if (!url) return; // Si la URL es null, no hace nada

  const link = document.createElement("a");
  link.href = url;
  link.download = filename || "documento";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Mapeo de documentos
{petData.urls
  .slice(0, petData.urls.length)
  .map((url, index) => {
    if (!url) return null; // Si la URL es null, no renderiza nada

    return (
      <DocumentThumbnail
        key={url}
        url={url}
        index={index}
        petName={petData.fullNamePet}
        documentType={getDocumentType(url)}
        isPdf={isPdf(url)}
        isSelected={selectedImage === index}
        onSelect={setSelectedImage}
      />
    );
  })}
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8 pb-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center my-4">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-5xl font-bold text-indigo-900 mb-2 capitalize">
              {petData.fullNamePet}
            </h1>
          </div>
        </div>
        <div className="flex justify-end mt-4">
        <button
          onClick={handleEdit}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition mb-5"
        >
          Editar Mascota
        </button>
      </div>
        {/* Main Content */}
        <div className="flex flex-col gap-8">
          {/* Owner Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OwnerInfoCard
              productCode={petData.productCode}
              fullNameOwner={petData.fullNameOwner}
              formattedDate={formattedDate}
              email={petData.email}
              formattedPhone={formattedPhone}
              description={petData.description ?? ""}
            />
            <div className="flex flex-col gap-5">
              {/* Featured Image/PDF */}
              <div className="w-full p-4 rounded-2xl relative">
                <CardImagePet
                  url={petData.urls[selectedImage]}
                  petName={petData.fullNamePet}
                  documentType={getDocumentType(petData.urls[selectedImage])}
                  isPdf={isPdf(petData.urls[selectedImage])}
                  onDownload={handleDownload}
                />

                <PetStatusBadge
                  petName={petData.fullNamePet}
                  status={petData.activationStatus}
                />
              </div>

              {/* Pet Documents Section */}
              <div className="w-full">
                <div className="mb-4 flex items-center gap-2 text-gray-700">
                  <IoMdImages className="text-xl" />
                  <h3 className="font-medium">Documentos adjuntos</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {petData.urls
                    .slice(0, petData.urls.length)
                    .filter((url) => url !== null) 
                    .map((url, index) => (
                      <DocumentThumbnail
                        key={url}
                        url={url}
                        index={index}
                        petName={petData.fullNamePet}
                        documentType={getDocumentType(url)}
                        isPdf={isPdf(url)}
                        isSelected={selectedImage === index}
                        onSelect={setSelectedImage}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
