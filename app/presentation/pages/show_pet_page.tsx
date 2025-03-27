import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import type { Pet } from "~/domain/entities/pet";
import { OwnerInfoCard } from "../component/document/OwnerInfoCard";
import { DocumentViewer } from "../component/document/DocumentViewer";
import { DocumentThumbnail } from "../component/document/DocumentThumbnail";
import { PetStatusBadge } from "../component/document/PetStatusBadge";


interface ShowPetPageProps {
  petData: Pet;
}

export const ShowPetPage: React.FC<ShowPetPageProps> = ({ petData }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Format activation date
  const formattedDate = new Date(petData.ActivateDate).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Format phone number
  const formattedPhone = `+${petData.phone.toString().replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4')}`;

  // Función para determinar si una URL es PDF
  const isPdf = (url: string) => url.toLowerCase().endsWith('.pdf');

  // Función para extraer el tipo de documento de la URL
  const getDocumentType = (url: string): string => {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('photo')) return 'Foto';
    if (lowerUrl.includes('vaccine')) return 'Vacuna';
    if (lowerUrl.includes('history')) return 'Historial clinico';
    if (lowerUrl.includes('other')) return 'Otro';
    return 'Documento';
  };

  // Función para descargar archivos
  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'documento';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-5xl font-bold text-indigo-900 mb-2 capitalize">
              {petData.fullNamePet}
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-8">
          {/* Owner Information Section */}
          <div className="grid grid-cols-2 gap-6">
            <OwnerInfoCard
              productCode={petData.productCode}
              fullNameOwner={petData.fullNameOwner}
              formattedDate={formattedDate}
              email={petData.email}
              formattedPhone={formattedPhone}
            />

            {/* Featured Image/PDF */}
            <div className="w-full h-full p-4 rounded-2xl relative">
              <DocumentViewer
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
          </div>

          {/* Pet Documents Section */}
          <div className="w-full">
            <div className="mb-4 flex items-center gap-2 text-gray-700">
              <IoMdImages className="text-xl" />
              <h3 className="font-medium">Documentos adjuntos</h3>
            </div>
            <div className="flex flex-row space-x-5  w-full gap-4">
              {petData.urls.slice(0, petData.urls.length).map((url, index) => (
                <DocumentThumbnail
                  key={index}
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
  );
};