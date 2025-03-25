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

// Crear una instancia del repositorio
const petRepository = new PetRepositoryImpl();

// Crear instancias de los casos de uso
const createPetUseCase = new CreatePetUseCase(petRepository);
const uploadImageUseCase = new SaveImagePetUseCase(petRepository);

const HomePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1); // Estado para manejar la etapa actual
  const { getParam } = useQueryParams();
  const key = getParam("key");

  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState<FormData>({
    codigoUnico: key || "", // Código único no editable
    nombrePropietario: "",
    nombreMascota: "",
    email: "",
    celular: "",
  });

  // Estado para manejar las imágenes
  const [images, setImages] = useState<ImageState>({
    x: null,
    y: null,
    z: null,
  });

  // Estado para manejar errores de validación del formulario
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Estado para manejar errores de validación de las imágenes
  const [imageErrors, setImageErrors] = useState<ImageErrors>({});

  // Función para manejar el botón "Siguiente"
  const handleNext = async () => {
    setFormErrors({}); // Limpiar errores del formulario
    setImageErrors({}); // Limpiar errores de las imágenes

    // Validar campos vacíos en el formulario
    if (currentStep === 1) {
      const formValidationErrors = validateForm(formData);
      if (Object.keys(formValidationErrors).length > 0) {
        setFormErrors(formValidationErrors);
        Swal.fire({
          icon: "error",
          title: "Error de validación",
          text: "Por favor, corrige los errores antes de continuar.",
        });
        return;
      }
    }

    // Validar imágenes en el paso 2
    if (currentStep === 2) {
      const imageValidationErrors = validateImages(images);
      if (Object.keys(imageValidationErrors).length > 0) {
        setImageErrors(imageValidationErrors);
        Swal.fire({
          icon: "error",
          title: "Imágenes faltantes",
          text: "Por favor, carga todas las imágenes antes de continuar.",
        });
        return;
      }

      // Enviar la información en el paso 2
      try {
        await handleSubmit();
        setCurrentStep(currentStep + 1);
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.",
        });
        return;
      }
    }

    // Avanzar al siguiente paso si no es el paso 2
    if (currentStep < 3 && currentStep !== 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Función para manejar el botón "Regresar"
  const handleBack = () => {
    setFormErrors({}); // Limpiar errores del formulario
    setImageErrors({}); // Limpiar errores de las imágenes
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    // Mostrar un modal de carga
    Swal.fire({
      title: "Por favor, espere...",
      text: "Procesando la información...",
      allowOutsideClick: false, // Evitar que el usuario cierre el modal
      didOpen: () => {
        Swal.showLoading(); // Mostrar el spinner de carga
      },
    });
  
    try {
      // Guardar solo la imagen X
      if (!images.x) {
        throw new Error("La imagen X es requerida.");
      }
  
      // Subir la imagen X y obtener su URL
      const imagePhoto = await uploadImageUseCase.execute(images.x, formData.codigoUnico, "photo");
      const imageVaccine = await uploadImageUseCase.execute(images.x, formData.codigoUnico, "vaccine");
      const imageOther = await uploadImageUseCase.execute(images.x, formData.codigoUnico, "other");
  
      // Crear el objeto con los datos del formulario y la URL de la imagen X
      const petData = {
        activationStatus: "active",
        ActivateDate: new Date().toISOString(),
        email: formData.email,
        fullNameOwner: formData.nombrePropietario,
        fullNamePet: formData.nombreMascota,
        phone: parseInt(formData.celular, 10),
        productCode: formData.codigoUnico,
        urls: [imagePhoto, imageVaccine, imageOther],
      };
  
      // Crear la mascota usando el caso de uso
      const success = await createPetUseCase.execute(petData);
  
      if (success) {
        // Cerrar el modal de carga y mostrar un mensaje de éxito
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "La mascota se ha creado y el formulario se ha enviado correctamente.",
        });
        console.log("Datos enviados:", petData);
      } else {
        throw new Error("Error al crear la mascota.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Cerrar el modal de carga y mostrar un mensaje de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.",
      });
      throw error; // Relanzar el error para manejarlo en handleNext
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto w-full shadow-lg rounded-lg bg-white p-6 md:p-10 space-y-8">
    {/* Barra de progreso (Slicer) */}
    <div className="mb-8">
      <Slicer currentStep={currentStep} />
    </div>
  
    {/* Contenido del formulario según la etapa actual */}
    <div className="space-y-8 overflow-hidden">
      <div
        key={currentStep}
        className="transition-all duration-500 ease-in-out transform"
      >
        {currentStep === 1 && (
          <div className="animate-fade-in">
            <FormComponent
              formData={formData}
              setFormData={setFormData}
              errors={formErrors}
              setErrors={setFormErrors}
            />
          </div>
        )}
        {currentStep === 2 && (
          <div className="animate-fade-in">
            <ImageUploader
              images={images}
              setImages={setImages}
              errors={imageErrors}
              setErrors={setImageErrors}
            />
          </div>
        )}
        {currentStep === 3 && (
          <div className="animate-fade-in">
            <Finish />
          </div>
        )}
      </div>
    </div>
  
    {/* Componente de acciones (ActionButtons) */}
    {currentStep < 3 && (
      <div className="flex justify-between items-center mt-8">
        <ActionButtons
          showNext={currentStep < 3} // Mostrar "Siguiente" si no es la última etapa
          showBack={currentStep > 1} // Mostrar "Regresar" si no es la primera etapa
          showFinish={false} // No mostrar "Finalizar" en etapas anteriores
          onNext={handleNext}
          onBack={handleBack}
          onFinish={handleSubmit} // Usar handleSubmit para el botón "Finalizar"
        />
      </div>
    )}
  </div>
  );
};

export default HomePage;