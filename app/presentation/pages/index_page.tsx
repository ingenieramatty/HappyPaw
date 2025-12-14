import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { FaDog, FaPaw, FaSearch } from "react-icons/fa";
import type { Pet } from "~/domain/entities/pet";
import type { ResponsePet } from "~/domain/entities/response_pet";
import { GetPetByCodeUseCase } from "~/domain/usecases/getPetByCodeUseCase";
import useQueryParams from "~/hooks/useQueryParams";
import { PetRepositoryImpl } from "~/infrastructure/pet_repository_impl";
import HomePage from "./home_page";
import { ShowPetPage } from "./show_pet_page";
import Logo from "../component/logo/Logo";
import NotFounPet from "../component/not_found/NotFounPet";
import FooterComponent from "../component/footer/FooterComponent";

const petRepository = new PetRepositoryImpl();
const getPetByCodeUseCase = new GetPetByCodeUseCase(petRepository);

const transformPetData = (responsePet: ResponsePet | null): Pet | null => {
  if (!responsePet?.Items?.length) {
    return null;
  }

  const petItem = responsePet.Items[0];
  return {
    fullNamePet: petItem.fullNamePet || "Nombre no disponible",
    fullNameOwner: petItem.fullNameOwner || "Propietario no disponible",
    email: petItem.email || "Email no disponible",
    phone: petItem.phone || 3000000000,
    productCode: petItem.productCode || "Código no disponible",
    ActivateDate: petItem.ActivateDate || new Date().toISOString(),
    activationStatus: petItem.activationStatus || "active",
    urls: petItem.urls || ["https://via.placeholder.com/500"],
    client: petItem.client || "",
    description: petItem.description ?? "",
  };
};

const LoadingSpinner = ({ code }: { code: string | null }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="flex flex-col items-center justify-center space-y-4 min-h-[60vh] px-4"
  >
    <div className="relative">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="text-indigo-600"
      >
        <FaDog className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
      </motion.div>

      {[...Array(4)].map((_, i) => {
        const pawId = `paw-${i}`;
        return (
          <motion.div
            key={pawId}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: i * 0.2,
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute text-indigo-400"
            style={{
              top: `${Math.sin((i * Math.PI) / 2) * 30}px`,
              left: `${Math.cos((i * Math.PI) / 2) * 30}px`,
            }}
          >
            <FaPaw className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </motion.div>
        );
      })}
    </div>

    <p className="text-lg sm:text-xl md:text-2xl font-medium text-indigo-700 text-center">
      {code ? "Buscando mascota..." : "espere..."}
    </p>

    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%", maxWidth: "200px" }}
      transition={{ duration: 1 }}
      className="flex items-center border-b-2 border-indigo-500 py-2"
    >
      <FaSearch className="text-indigo-500 mr-2 flex-shrink-0" />
      {code && (
        <span className="text-gray-600 truncate text-sm sm:text-base">
          Código: {code}
        </span>
      )}
    </motion.div>
  </motion.div>
);

const PetSearchPage = memo(() => {
  const { getParam } = useQueryParams();
  const code = getParam("key");
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      if (!code) {
        setLoading(false);
        setPet(null);
        return;
      }

      try {
        setLoading(true);
        const responsePet = await getPetByCodeUseCase.execute(code);
        const transformedPet = transformPetData(responsePet);
        setPet(transformedPet);
      } catch (err) {
        console.error("Error fetching pet:", err);
        setPet(null);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchPet, 1500);
    return () => clearTimeout(timer);
  }, [code]);

  const renderContent = () => {

    if (loading) {
      return <LoadingSpinner code={code} />;
    }

    if (!pet) {
      return <NotFounPet />;
    }
    if (pet.activationStatus !== "active") {
      return <HomePage />;
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ShowPetPage petData={pet} />
      </motion.div>
    );
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="mx-auto w-full">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative flex items-center justify-center my-10"
          >

            <div className="flex items-center">
              <div className="absolute left-0 w-full">
                {pet?.client && <Logo path={pet?.client} />}
              </div>   </div>
          </motion.div>

          <div className="transition-all duration-300 ease-in-out">
            {renderContent()}
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
});

export default PetSearchPage;
