import React from "react";

interface SlicerProps {
  currentStep: number;
}

const Slicer: React.FC<SlicerProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center mb-12 px-4">
      {/* Paso 1 - Información */}
      <div className="flex flex-col items-center z-10">
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
            currentStep >= 1
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-50"
          } transition-all duration-300 ease-in-out transform ${
            currentStep >= 1 ? "scale-110" : "scale-100"
          }`}
        >
          {currentStep >= 1 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          )}
        </div>
        <span
          className={`mt-3 text-sm font-medium ${
            currentStep >= 1 ? "text-blue-600" : "text-gray-500"
          } transition-all duration-300 ease-in-out`}
        >
          Información
        </span>
      </div>
      
      {/* Línea entre Paso 1 y 2 */}
      <div
        className={`flex-grow h-1 mx-2 ${
          currentStep >= 2 ? "bg-blue-500" : "bg-gray-300"
        } transition-all duration-500 ease-in-out`}
      ></div>

      {/* Paso 2 - Archivos */}
      <div className="flex flex-col items-center z-10">
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
            currentStep >= 2
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-50"
          } transition-all duration-300 ease-in-out transform ${
            currentStep >= 2 ? "scale-110" : "scale-100"
          }`}
        >
          {currentStep >= 2 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          )}
        </div>
        <span
          className={`mt-3 text-sm font-medium ${
            currentStep >= 2 ? "text-blue-600" : "text-gray-500"
          } transition-all duration-300 ease-in-out`}
        >
          Documentos
        </span>
      </div>
      
      {/* Línea entre Paso 2 y 3 */}
      <div
        className={`flex-grow h-1 mx-2 ${
          currentStep >= 3 ? "bg-blue-500" : "bg-gray-300"
        } transition-all duration-500 ease-in-out`}
      ></div>

      {/* Paso 3 - Finalizar */}
      <div className="flex flex-col items-center z-10">
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
            currentStep >= 3
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-50"
          } transition-all duration-300 ease-in-out transform ${
            currentStep >= 3 ? "scale-110" : "scale-100"
          }`}
        >
          {currentStep >= 3 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          )}
        </div>
        <span
          className={`mt-3 text-sm font-medium ${
            currentStep >= 3 ? "text-blue-600" : "text-gray-500"
          } transition-all duration-300 ease-in-out`}
        >
          Finalizar
        </span>
      </div>
    </div>
  );
};

export default Slicer;