import React from 'react';

interface ShowPetProps {
  imageUrl?: string; // URL de la imagen
  altText?: string; // Texto alternativo para la imagen (opcional)
  description?: string; // Descripción de la imagen (opcional)
}

const ShowPet: React.FC<ShowPetProps> = ({ imageUrl, altText = "Imagen de Happy Paw", description = "Imagen cargada desde Happy Paw" }) => {
  const creatUrlImage = `https://happypawvet.s3.amazonaws.com/${imageUrl}` 
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <img
          src={creatUrlImage}
          alt={altText}
          className="max-w-full max-h-96 rounded-lg"
        />
        <p className="mt-4 text-center text-gray-700">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ShowPet;