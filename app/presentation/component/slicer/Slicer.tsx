import React from "react";

interface SlicerProps {
  currentStep: number;
}

const Slicer: React.FC<SlicerProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center mb-8">
      {/* Paso 1 */}
      <div className="flex items-center">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
            currentStep >= 1 ? "bg-blue-500" : "bg-gray-300"
          } transition-all duration-300 ease-in-out transform ${
            currentStep >= 1 ? "scale-110" : "scale-100"
          }`}
        >
          1
        </div>
        <span
          className={`ml-4 text-lg ${
            currentStep >= 1 ? "text-blue-500" : "text-gray-500"
          } transition-all duration-300 ease-in-out`}
        >
          Recopilar información
        </span>
      </div>
      <div
        className={`flex-grow h-1 mx-4 ${
          currentStep >= 2 ? "bg-blue-500" : "bg-gray-300"
        } transition-all duration-500 ease-in-out`}
      ></div>

      {/* Paso 2 */}
      <div className="flex items-center">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
            currentStep >= 2 ? "bg-blue-500" : "bg-gray-300"
          } transition-all duration-300 ease-in-out transform ${
            currentStep >= 2 ? "scale-110" : "scale-100"
          }`}
        >
          2
        </div>
        <span
          className={`ml-4 text-lg ${
            currentStep >= 2 ? "text-blue-500" : "text-gray-500"
          } transition-all duration-300 ease-in-out`}
        >
          Agregar archivos
        </span>
      </div>
      <div
        className={`flex-grow h-1 mx-4 ${
          currentStep >= 3 ? "bg-blue-500" : "bg-gray-300"
        } transition-all duration-500 ease-in-out`}
      ></div>

      {/* Paso 3 */}
      <div className="flex items-center">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
            currentStep >= 3 ? "bg-blue-500" : "bg-gray-300"
          } transition-all duration-300 ease-in-out transform ${
            currentStep >= 3 ? "scale-110" : "scale-100"
          }`}
        >
          3
        </div>
        <span
          className={`ml-4 text-lg ${
            currentStep >= 3 ? "text-blue-500" : "text-gray-500"
          } transition-all duration-300 ease-in-out`}
        >
          Finalizar
        </span>
      </div>
    </div>
  );
};

export default Slicer;