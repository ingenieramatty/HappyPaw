import { useLocation } from "react-router";

// Hook para obtener parámetros de la URL o el valor de la ruta
const useQueryParams = () => {
  const location = useLocation();
  // Obtener el valor de un parámetro específico (en este caso, `key`)
  const getParam = (param: string) => {
    // Si hay parámetros de consulta, usarlos
    const searchParams = new URLSearchParams(location.search);
    const queryParamValue = searchParams.get(param);

    if (queryParamValue !== null) {
      return queryParamValue;
    }

    // Si no hay parámetros de consulta, extraer el último segmento de la ruta
    const pathSegments = location.pathname.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1]; // Último segmento de la ruta

    return lastSegment;
  };

  return { getParam };
};

export default useQueryParams;