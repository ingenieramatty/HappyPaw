import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaPaw, FaCalendarAlt, FaIdCard } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import type { Pet } from "~/domain/entities/pet";

interface ShowPetPageProps {
  petData: Pet;
}

const ShowPetPage: React.FC<ShowPetPageProps> = ({ petData }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Format activation date
  const formattedDate = new Date(petData.ActivateDate).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Format phone number
  const formattedPhone = `+${petData.phone.toString().replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4')}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 text-sm font-medium px-4 py-2 rounded-full mb-3">
            <FaPaw className="text-indigo-600" />
            <span>Mascota Registrada</span>
          </div>
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            {petData.fullNamePet}
          </h1>
          <div className="inline-flex items-center bg-green-100 text-green-800 text-sm font-medium px-4 py-1 rounded-full">
            <span className="w-2 h-2 mr-2 bg-green-500 rounded-full"></span>
            {petData.activationStatus === 'active' ? 'Activo' : 'Inactivo'}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Owner Information Section */}
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full lg:w-2/5">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                <FaIdCard className="text-indigo-600" />
                Información del Propietario
              </h2>
              <p className="text-gray-600 mt-2">Código: {petData.productCode}</p>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaPaw className="text-blue-600" />
                  Datos personales
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Nombre completo:</span> {petData.fullNameOwner}
                  </p>
                  <p className="text-gray-700 flex items-center gap-1">
                    <FaCalendarAlt className="text-blue-600" />
                    <span className="font-medium">Activación:</span> {formattedDate}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaPhone className="text-blue-600" />
                  Contacto
                </h3>
                <div className="space-y-3">
                  <a
                    href={`mailto:${petData.email}`}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FaEnvelope className="w-5 h-5 mr-2" />
                    {petData.email}
                  </a>
                  <a
                    href={`tel:${petData.phone}`}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FaPhone className="w-5 h-5 mr-2" />
                    {formattedPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Pet Images Section */}
          <div className="w-full lg:w-3/5">
            {/* Main Featured Image */}
            <div className="bg-white p-4 rounded-2xl shadow-lg mb-6 relative">
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                <img
                  src={petData.urls[selectedImage]}
                  alt={`Imagen principal de ${petData.fullNamePet}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-2 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-800">{petData.fullNamePet}</p>
                <div className="flex items-center gap-1 text-sm">
                  <span className={`w-2 h-2 rounded-full ${petData.activationStatus === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span>{petData.activationStatus === 'active' ? 'Activo' : 'Inactivo'}</span>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="mb-4 flex items-center gap-2 text-gray-700">
              <IoMdImages className="text-xl" />
              <h3 className="font-medium">Galería de imágenes</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {petData.urls.slice(0, 3).map((imageUrl, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-white p-1 rounded-lg shadow-md hover:shadow-lg transition-all ${selectedImage === index ? 'ring-2 ring-indigo-500' : ''}`}
                >
                  <img
                    src={imageUrl}
                    alt={`Imagen ${index + 1} de ${petData.fullNamePet}`}
                    className="w-full h-24 object-cover rounded-md"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPetPage;