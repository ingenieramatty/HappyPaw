import React from "react";
import useQueryParams from "~/hooks/useQueryParams";

const ShowPetPage: React.FC = () => {
  const { getParam } = useQueryParams();

  // Obtener el valor del parámetro `key` o el último segmento de la ruta
  const keyOrImageName = getParam("key");

  // Construir la URL de la imagen
  const imageUrl = keyOrImageName
    ? `https://happypawvet.s3.amazonaws.com/${keyOrImageName}`
    : null;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt="Imagen de Happy Paw"
              className="max-w-full max-h-96 rounded-lg"
            />
            <p className="mt-4 text-center text-gray-700">
              Imagen cargada desde Happy Paw
            </p>
          </>
        ) : (
          <p className="text-center text-gray-700">No se encontró ninguna imagen.</p>
        )}
      </div>
    </div>
  );
};

export default ShowPetPage;