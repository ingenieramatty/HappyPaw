import React from 'react';
import type { ActionButtonsProps } from './action_button_props';

const ActionButtons: React.FC<ActionButtonsProps> = ({
  showNext,
  showBack,
  showFinish,
  onNext,
  onBack,
  onFinish,
}) => {
  const handleFinalizar = () => {
    if (onFinish) {
      onFinish();
    }
    // Recarga manteniendo parámetros
    window.location.href = window.location.href;
  };

  return (
    <div className="flex justify-between mt-6 space-x-5">
      {/* Botón "Regresar" (solo se muestra si showBack es true) */}
      {showBack && (
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-4 w-36 bg-gray-500 text-white rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:scale-95"
        >
          Regresar
        </button>
      )}
      
      {/* Contenedor flexible para alinear el botón a la derecha */}
      <div className="flex-1 flex justify-end">
        {/* Botón "Siguiente" (solo se muestra si showNext es true) */}
        {showNext && (
          <button
            type="button"
            onClick={onNext}
            className="px-4 py-4 w-36 bg-blue-500 text-white rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
          >
            Siguiente
          </button>
        )}
        
        {/* Botón "Finalizar" (solo se muestra si showFinish es true) */}
        {showFinish && (
          <button
            type="button"
            onClick={handleFinalizar}
            className="px-4 py-4 w-36 bg-green-500 text-white rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-95"
          >
            Finalizar
          </button>
        )}
      </div>
    </div>
  );
};

export default ActionButtons;