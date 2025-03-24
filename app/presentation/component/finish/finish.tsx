import React from 'react';

function Finish() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <div className="flex flex-col items-center space-y-4">
          {/* Icono (puedes reemplazar esto con un ícono real) */}
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <span className="text-xl font-semibold text-gray-800">Proceso completado</span>
        </div>
        <p className="mt-4 text-gray-600">¡Gracias por completar el formulario!</p>
       </div>
    </div>
  );
}

export default Finish;