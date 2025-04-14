import { useState } from "react";
import { FaFilePdf, FaDownload } from "react-icons/fa";

interface DocumentThumbnailProps {
  url: string;
  index: number;
  petName: string;
  documentType: string;
  isPdf: boolean;
  isSelected: boolean;
  onSelect: (index: number) => void;
}

export const DocumentThumbnail = ({
  url,
  index,
  petName,
  documentType,
  isPdf,
  isSelected,
  onSelect,
}: DocumentThumbnailProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPreviewOpen(true);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Crear un enlace temporal
    const link = document.createElement("a");
    link.href = url;

    // Forzar la descarga con el atributo download
    const extension = isPdf ? "pdf" : url.split(".").pop() ?? "jpg";
    const fileName = `${petName}_${documentType.replace(/\s+/g, "_")}_${index + 1}.${extension}`;
    link.download = fileName;

    // Añadir al DOM, hacer click y luego remover
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div
        className={`bg-white rounded-lg shadow-md transition-all overflow-hidden cursor-pointer`}
        style={{ width: "180px", height: "220px" }}
        onClick={handlePreview}
      >
        <div className="w-full h-full flex flex-col items-center p-3 group">
          <div className="relative w-full h-32 flex items-center justify-center bg-gray-50 rounded-md">
            {isPdf ? (
              <FaFilePdf className="text-red-500 text-4xl" />
            ) : (
              <img
                src={url}
                alt={`${documentType} de ${petName}`}
                className="w-full h-full object-cover rounded-md"
              />
            )}
            <div className="absolute top-1 left-1 bg-indigo-600 text-white px-2 py-0.5 rounded text-xs font-medium">
              {documentType}
            </div>
          </div>
          <div className="w-full mt-2 text-center">
            <span className="text-sm text-gray-600 line-clamp-1">
              {isPdf ? "Documento PDF" : documentType}
            </span>
            <button
              onClick={handleDownload}
              className="mt-2 text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1 text-xs w-full
                         px-2 py-1 rounded hover:bg-indigo-50 transition-colors duration-200 cursor-pointer"
              title={`Descargar ${isPdf ? "PDF" : "imagen"}`}
            >
              <FaDownload size={12} className="group-hover:scale-110 transition-transform" />
              <span className="group-hover:underline">Descargar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal de previsualización */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full h-full">
            {/* Botón para cerrar el modal */}
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all"
              aria-label="Cerrar previsualización"
            >
              ✕
            </button>

            {/* Previsualización del contenido */}
            {isPdf ? (
              <iframe
                src={`${url}#toolbar=0`} // Oculta la barra de herramientas del PDF
                className="w-full h-full"
                title="PDF Preview"
              />
            ) : (
              <img
                src={url}
                alt={`${documentType} de ${petName}`}
                className="object-contain w-full h-full"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
