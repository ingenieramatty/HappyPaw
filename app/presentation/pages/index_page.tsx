import { useEffect, useState, memo } from 'react';
import type { Pet } from '~/domain/entities/pet';
import type { ResponsePet } from '~/domain/entities/response_pet';
import { GetPetByCodeUseCase } from '~/domain/usecases/getPetByCodeUseCase';
import useQueryParams from '~/hooks/useQueryParams';
import { PetRepositoryImpl } from '~/infrastructure/pet_repository_impl';
import ShowPetPage from './show_pet_page';
import HomePage from './home_page';
import { FaDog, FaSearch, FaHome } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Crear instancias fuera del componente para evitar recreación
const petRepository = new PetRepositoryImpl();
const getPetByCodeUseCase = new GetPetByCodeUseCase(petRepository);

// Función para transformar ResponsePet a Pet con validación
const transformPetData = (responsePet: ResponsePet | null): Pet | null => {
  if (!responsePet || !responsePet.Items || responsePet.Items.length === 0) {
    return null;
  }

  const petItem = responsePet.Items[0];
  return {
    fullNamePet: petItem.fullNamePet || 'Nombre no disponible',
    fullNameOwner: petItem.fullNameOwner || 'Propietario no disponible',
    email: petItem.email || 'Email no disponible',
    phone: petItem.phone || 3000000000,
    productCode: petItem.productCode || 'Código no disponible',
    ActivateDate: petItem.ActivateDate || new Date().toISOString(),
    activationStatus: petItem.activationStatus || 'inactive',
    urls: petItem.urls || ['https://via.placeholder.com/500'],
  };
};

// Componente de carga con animación
const LoadingSpinner = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="flex flex-col items-center justify-center space-y-4"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="text-indigo-600"
    >
      <FaDog size={60} />
    </motion.div>
    <p className="text-xl font-medium text-indigo-700">Buscando a tu mascota...</p>
  </motion.div>
);

const PetSearchPage = memo(() => {
  const { getParam } = useQueryParams();
  const code = getParam('key');
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPet = async () => {
      if (!code) {
        setPet(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const responsePet = await getPetByCodeUseCase.execute(code);
        const transformedPet = transformPetData(responsePet);
        
        if (!transformedPet) {
          setError('La mascota no se encuentra registrada o los datos están incompletos');
          setPet(null);
          return;
        }
        
        setPet(transformedPet);
      } catch (err) {
        console.error('Error fetching pet:', err);
        setError('No se pudo encontrar la mascota con ese código. Verifica el código e intenta nuevamente.');
        setPet(null);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchPet, 1000);
    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="">
    
        <div className="transition-all duration-300 ease-in-out">
          {loading ? (
            <LoadingSpinner />
          ) : pet ? (
            pet.urls && pet.urls.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ShowPetPage petData={pet} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <HomePage />
              </motion.div>
            )
          ) : (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >                <HomePage />

          </motion.div>
          )}
        </div>
      </div>
    </div>
  );
});

export default PetSearchPage;