import React, { useState } from "react";
import type { ImageState } from "../interface/image_state";
import type { FormData } from "../interface/form_data";
import type { ImageErrors } from "../interface/image_errors";
import Slicer from "../component/slicer/Slicer";
import FormComponent from "../component/form_component/FormComponent";
import ImageUploader from "../component/image_uploader/ImageUploader";
import ActionButtons from "../component/action_button/ActionsButton";
import useQueryParams from "~/hooks/useQueryParams";
import Swal from "sweetalert2";
import { PetRepositoryImpl } from "~/infrastructure/pet_repository_impl";
import { CreatePetUseCase } from "~/domain/usecases/createPetUseCase";
import { SaveImagePetUseCase } from "~/domain/usecases/saveImagePetUseCase";
import type { FormErrors } from "../interface/form_erros";
import { validateImages } from "../validation/imageValidator";
import { validateForm } from "../validation/formValidator";
import Finish from "../component/finish/finish";
import { FaDog, FaPaw } from "react-icons/fa";
import { motion } from "framer-motion";

const petRepository = new PetRepositoryImpl();
const createPetUseCase = new CreatePetUseCase(petRepository);
const uploadImageUseCase = new SaveImagePetUseCase(petRepository);

const HomePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { getParam } = useQueryParams();
  const key = getParam("key");
  const [hasMinimumImage, setHasMinimumImage] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    codigoUnico: key || "",
    nombrePropietario: "prueba",
    nombreMascota: "prueba",
    email: "prueba@gmail.com",
    celular: "3121234567",
    imagen: null,
  });

  const [files, setFiles] = useState<ImageState>({
    x: null,
    y: null,
    z: null,
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [fileErrors, setFileErrors] = useState<ImageErrors>({});

  const handleFinish = () => {
    // Opción 1: Recarga simple (recomendada para tu caso)
    window.location.href = window.location.href;
  }

  const handleNext = async () => {
    setFormErrors({});
    setFileErrors({});

    if (currentStep === 1) {
      const formValidationErrors = validateForm(formData);
      
      if (!formData.imagen) {
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
  
      if (!formData.imagen) {
        throw new Error("La foto principal de la mascota es requerida.");
      }
  
      // Mostrar loader
      Swal.fire({
        title: "Procesando información...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
        background: '#fff',
      });
  
      // Subir archivos
      const uploadOperations = [
        uploadImageUseCase.execute(formData.imagen, formData.codigoUnico, "photo"),
        files.x ? uploadImageUseCase.execute(files.x, formData.codigoUnico, "vaccine") : Promise.resolve(null),
        files.y ? uploadImageUseCase.execute(files.y, formData.codigoUnico, "history") : Promise.resolve(null),
        files.z ? uploadImageUseCase.execute(files.z, formData.codigoUnico, "other") : Promise.resolve(null)
      ];
  
      const [imagePhoto, imageVaccine, history, imageOther] = await Promise.all(uploadOperations);
  
      const urls = [imagePhoto, imageVaccine, history, imageOther].filter(url => url !== null) as string[];
  
      // Crear objeto de mascota
      const petData = {
        activationStatus: "active",
        ActivateDate: new Date().toISOString(),
        email: formData.email,
        fullNameOwner: formData.nombrePropietario,
        fullNamePet: formData.nombreMascota,
        phone: parseInt(formData.celular, 10),
        productCode: formData.codigoUnico,
        urls
      };
  
      // Guardar en base de datos
      const success = await createPetUseCase.execute(petData);
  
      if (!success) {
        throw new Error("Error al guardar el registro en la base de datos.");
      }
  
      // Mostrar éxito y avanzar al paso 3
      await Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "La información de tu mascota ha sido guardada correctamente.",
        background: '#fff',
        confirmButtonColor: '#4f46e5',
      });
  
      // Actualizar estado para mostrar pantalla final
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
      className="max-w-4xl mx-auto w-full bg-white rounded-xl shadow-md overflow-hidden"
    >
      {/* Header */}
      <div className="bg-indigo-600 p-4 text-white">
        <h1 className="text-2xl font-bold flex items-center justify-center">
          <FaDog className="mr-2" />
          Registro de Mascotas
          <FaPaw className="ml-2" />
        </h1>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* Barra de progreso */}
        <div className="mb-6">
          <Slicer currentStep={currentStep} />
        </div>
        
        {/* Contenido principal */}
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
              />
            )}
            
            {currentStep === 3 && <Finish />}
          </motion.div>
        </div>
        
        {/* Botones de navegación */}
        {currentStep <= 3 && (
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
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