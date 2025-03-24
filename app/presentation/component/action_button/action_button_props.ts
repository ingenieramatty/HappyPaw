export interface ActionButtonsProps {
    showNext: boolean; // Mostrar botón "Siguiente"
    showBack: boolean; // Mostrar botón "Regresar"
    showFinish: boolean; // Mostrar botón "Finalizar"
    onNext: () => void; // Función para manejar el botón "Siguiente"
    onBack: () => void; // Función para manejar el botón "Regresar"
    onFinish: () => void; // Función para manejar el botón "Finalizar"
  }