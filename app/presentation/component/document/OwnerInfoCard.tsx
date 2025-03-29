import { FaIdCard, FaPaw, FaCalendarAlt, FaPhone, FaEnvelope } from "react-icons/fa";

interface OwnerInfoCardProps {
  productCode: string;
  fullNameOwner: string;
  formattedDate: string;
  email: string;
  formattedPhone: string;
}

export const OwnerInfoCard = ({
  productCode,
  fullNameOwner,
  formattedDate,
  email,
  formattedPhone
}: OwnerInfoCardProps) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <FaIdCard className="text-indigo-600" />
          Información del Propietario
        </h2>
        <p className="text-gray-600 mt-2">Código: {productCode}</p>
      </div>

      <div className="space-y-6 md:space-y-8">
        <div className="bg-blue-50 p-4 md:p-6 rounded-xl">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <FaPaw className="text-blue-600" />
              <h3 className="font-semibold text-gray-700">Datos personales</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700">
                <span className="font-medium">Nombre completo:</span> {fullNameOwner}
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaCalendarAlt className="text-blue-600" />
                <span className="font-medium">Activación:</span> {formattedDate}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 md:p-6 rounded-xl">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <FaPhone className="text-blue-600" />
              <h3 className="font-semibold text-gray-700">Contacto</h3>
            </div>
            <div className="space-y-3">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <FaEnvelope className="w-5 h-5" />
                {email}
              </a>
              <a
                href={`tel:${formattedPhone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <FaPhone className="w-5 h-5" />
                {formattedPhone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
