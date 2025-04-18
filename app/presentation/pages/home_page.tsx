import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaDog, FaPaw } from "react-icons/fa";
import Swal from "sweetalert2";
import { CreatePetUseCase } from "~/domain/usecases/createPetUseCase";
import { SaveImagePetUseCase } from "~/domain/usecases/saveImagePetUseCase";
import useQueryParams from "~/hooks/useQueryParams";
import { PetRepositoryImpl } from "~/infrastructure/pet_repository_impl";
import ActionButtons from "../component/action_button/ActionsButton";
import Finish from "../component/finish/finish";
import FormComponent from "../component/form_component/FormComponent";
import ImageUploader from "../component/image_uploader/ImageUploader";
import Slicer from "../component/slicer/Slicer";
import type { FormData } from "../interface/form_data";
import type { FormErrors } from "../interface/form_erros";
import type { ImageErrors } from "../interface/image_errors";
import type { ImageState } from "../interface/image_state";
import { validateForm } from "../validation/formValidator";
import type { Pet } from "~/domain/entities/pet";

const petRepository = new PetRepositoryImpl();
const createPetUseCase = new CreatePetUseCase(petRepository);
const uploadImageUseCase = new SaveImagePetUseCase(petRepository);

interface HomePageProps {
  petData?: Pet;
  isEditing?: boolean;
}

export const urlToFile = async (url: string, filename: string, mimeType: string): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
};


const HomePage: React.FC<HomePageProps> = ({ petData, isEditing = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { getParam } = useQueryParams();
  const key = getParam("key") || petData?.productCode || "";
  const [hasMinimumImage, setHasMinimumImage] = useState(isEditing);

  const [formData, setFormData] = useState<FormData>({
    codigoUnico: key,
    nombrePropietario: petData?.fullNameOwner ?? "",
    nombreMascota: petData?.fullNamePet ?? "",
    email: petData?.email ?? "",
    celular: petData?.phone?.toString() ?? "",
    imagen: null,
    description: petData?.description ?? "",
  });

  const [existingImages, setExistingImages] = useState<{
    photo?: string;
    vaccine?: string;
    history?: string;
    other?: string;
  }>({});

  // aqui se puede pasar los archivos para que se pueda previsualizar al
  const [files, setFiles] = useState<ImageState>({
    x: null,
    y: null,
    z: null,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [fileErrors, setFileErrors] = useState<ImageErrors>({});

  useEffect(() => {
    const loadImage = async () => {
      if (petData?.urls?.[0]) {
        try {
          const file = await urlToFile(petData.urls[0], "imagen-mascota.jpg", "image/jpeg");
          setFormData((prev) => ({ ...prev, imagen: file }));
        } catch (error) {
          console.error("Error al cargar la imagen:", error);
        }
      }
    };
  
    loadImage();
  }, [petData]);

  useEffect(() => {
    if (isEditing && petData) {
      // Cargar URLs existentes
      const images = {
        photo: petData.urls.find((url) => url?.includes("photo")),
        vaccine: petData.urls.find((url) => url?.includes("vaccine")),
        history: petData.urls.find((url) => url?.includes("history")),
        other: petData.urls.find(
          (url) =>
            url &&
            !url.includes("photo") &&
            !url.includes("vaccine") &&
            !url.includes("history")
        ),
      };
  
      // Convertir URLs a archivos con tipo correcto
      const loadFilesFromUrls = async () => {
        // Función reusable para detectar tipo de archivo
        const getFileDetails = (url: string) => {
          const isPDF = url.toLowerCase().endsWith(".pdf");
          const fileName = url.split("/").pop() ?? "file"; // Extrae nombre original
          const mimeType = isPDF ? "application/pdf" : "image/jpeg";
          return { isPDF, fileName, mimeType };
        };
  
        // Procesar vacuna (x)
        if (images.vaccine) {
          const { fileName, mimeType } = getFileDetails(images.vaccine);
          const file = await urlToFile(images.vaccine, fileName, mimeType);
          setFiles((prev) => ({ ...prev, x: file }));
        }
  
        // Procesar historial (y)
        if (images.history) {
          const { fileName, mimeType } = getFileDetails(images.history);
          const file = await urlToFile(images.history, fileName, mimeType);
          setFiles((prev) => ({ ...prev, y: file }));
        }
  
        // Procesar otros (z)
        if (images.other) {
          const { fileName, mimeType } = getFileDetails(images.other);
          const file = await urlToFile(images.other, fileName, mimeType);
          setFiles((prev) => ({ ...prev, z: file }));
        }
      };
  
      loadFilesFromUrls();
    }
  }, [isEditing, petData]);
  
  const handleFinish = () => {
    window.location.reload();
  };

  const handleNext = async () => {
    setFormErrors({});
    setFileErrors({});

    if (currentStep === 1) {
      const formValidationErrors = validateForm(formData);
      
      if (!isEditing && !formData.imagen) {
        formValidationErrors.imagen = "La imagen principal es requerida";
      }
  
      if (Object.keys(formValidationErrors).length > 0) {
        setFormErrors(formValidationErrors);
        Swal.fire({
          icon: "error",
          title: "Error de validación",
          text: "Por favor, completa todos los campos requeridos.",
          background: '#fff',
          confirmButtonColor: '#4f46e5',
        });
        return;
      }
    }

    if (currentStep === 2) {
      if (!hasMinimumImage) {
        Swal.fire({
          icon: "error",
          title: "Documentos faltantes",
          text: "Por favor, carga al menos un documento antes de continuar.",
          background: '#fff',
          confirmButtonColor: '#4f46e5',
        });
        return;
      }

      try {
        await handleSubmit();
        setCurrentStep(currentStep + 1);
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al procesar tu solicitud. Por favor inténtalo nuevamente.",
          background: '#fff',
          confirmButtonColor: '#4f46e5',
        });
      }
    }

    if (currentStep < 3 && currentStep !== 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setFormErrors({});
    setFileErrors({});
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Validación de archivos
      if (!files.x && !files.y && !files.z) {
        throw new Error("Debes cargar al menos un documento (vacunas, historial clínico u otros).");
      }
  
      if ( !formData.imagen) {
        throw new Error("La foto principal de la mascota es requerida.");
      }
  
      // Mostrar loader
      Swal.fire({
        title: isEditing ? "Actualizando información..." : "Procesando información...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
        background: '#fff',
      });
  
      // Subir archivos nuevos
      const uploadOperations = [
        formData.imagen 
          ? uploadImageUseCase.execute(formData.imagen, formData.codigoUnico, "photo")
          : Promise.resolve(existingImages.photo),
        files.x 
          ? uploadImageUseCase.execute(files.x, formData.codigoUnico, "vaccine")
          : Promise.resolve(existingImages.vaccine),
        files.y 
          ? uploadImageUseCase.execute(files.y, formData.codigoUnico, "history")
          : Promise.resolve(existingImages.history),
        files.z 
          ? uploadImageUseCase.execute(files.z, formData.codigoUnico, "other")
          : Promise.resolve(existingImages.other)
      ];
  
      const [imagePhoto, imageVaccine, history, imageOther] = await Promise.all(uploadOperations);
  
      const urls = [imagePhoto, imageVaccine, history, imageOther].filter(url => url !== null) as string[];
  
      const petDataToSave = {
        activationStatus: "active",
        ActivateDate: petData?.ActivateDate || new Date().toISOString(),
        email: formData.email,
        fullNameOwner: formData.nombrePropietario,
        fullNamePet: formData.nombreMascota,
        phone: parseInt(formData.celular, 10),
        productCode: formData.codigoUnico,
        urls,
        description: formData.description
      };
  
      // Guardar en base de datos
      let success;
     
        success = await createPetUseCase.execute(petDataToSave);
     
      if (!success) {
        throw new Error(`Error al ${isEditing ? 'actualizar' : 'guardar'} el registro en la base de datos.`);
      }
  
      // Mostrar éxito
      await Swal.fire({
        icon: "success",
        title: isEditing ? "¡Actualización exitosa!" : "¡Registro exitoso!",
        text: `La información de tu mascota ha sido ${isEditing ? 'actualizada' : 'guardada'} correctamente.`,
        background: '#fff',
        confirmButtonColor: '#4f46e5',
      });
  
      setCurrentStep(3);
      return success;
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error instanceof Error ? error.message : "Ocurrió un error inesperado.",
        background: '#fff',
        confirmButtonColor: '#4f46e5',
      });
      throw error;
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto w-full bg-white rounded-xl sm:shadow-md overflow-hidden"
    >
      <div className="bg-indigo-600 p-4 text-white">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center justify-center">
          <FaDog className="mr-2" />
          {isEditing ? "Editar Mascota" : "Registro de Mascotas"}
          <FaPaw className="ml-2" />
        </h1>
      </div>
    
      <div className="py-6 md:p-8 space-y-8">
        <div className="mb-6">
          <Slicer currentStep={currentStep} />
        </div>
        
        <div className="space-y-8">
          <motion.div
            key={currentStep}
            initial={{ x: currentStep > 1 ? 50 : -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <FormComponent
                formData={formData}
                setFormData={setFormData}
                errors={formErrors}
                setErrors={setFormErrors}
              />
            )}
            
            {currentStep === 2 && (
              <ImageUploader
                images={files}
                setImages={setFiles}
                errors={fileErrors}
                setErrors={setFileErrors}
                setHasMinimumImage={setHasMinimumImage}
                urls={petData?.urls}
              />
            )}
            
            {currentStep === 3 && <Finish />}
          </motion.div>
        </div>
        
        {currentStep <= 3 && (
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-200 gap-4">
            <ActionButtons
              showNext={currentStep < 3}
              showBack={currentStep === 2}
              showFinish={currentStep === 3}
              onNext={currentStep === 1 ? handleNext : handleSubmit}
              onBack={handleBack}
              onFinish={handleFinish}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HomePage;