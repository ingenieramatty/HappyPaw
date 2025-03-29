import { FaFilePdf, FaDownload } from "react-icons/fa";

interface DocumentViewerProps {
  url: string;
  petName: string;
  documentType: string;
  isPdf: boolean;
  onDownload: (url: string, filename: string) => void;
}

export const CardImagePet = ({
  url,
  petName,
  documentType,
  isPdf,
  onDownload,
}: DocumentViewerProps) => {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-white flex items-center justify-center">
      {isPdf ? (
        <div className="flex flex-col items-center p-8 gap-4">
          <FaFilePdf className="text-red-500 text-8xl" />
          <button
            onClick={() => onDownload(url, `${petName}_${documentType}.pdf`)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FaDownload />
            Descargar PDF
          </button>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <img
            src={url}
            alt={`Imagen principal de ${petName}`}
            className="w-full h-auto object-cover object-center"
            loading="lazy" // Carga diferida para mejor rendimiento
          />
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={() => onDownload(url, `${petName}_${documentType}.jpg`)}
              className="flex items-center gap-2 cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FaDownload />
              Descargar Imagen
            </button>
          </div>
        </div>
      )}
      <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-md text-sm font-medium">
        {documentType}
      </div>
    </div>
  );
};
