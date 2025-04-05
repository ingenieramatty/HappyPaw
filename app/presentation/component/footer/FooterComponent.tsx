import React from 'react';
import { FaWhatsapp, FaEnvelope, FaPaw } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FooterComponent = () => {
    const handleWhatsAppClick = () => {
        // Reemplaza con tu número de WhatsApp (incluye código de país)
        const phoneNumber = '51987654321'; // Ejemplo: Perú +51 987654321
        const message = 'Hola, quisiera más información sobre...';
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const handleEmailClick = () => {
        // Reemplaza con tu dirección de correo
        const email = 'contacto@mascotas.com';
        const subject = 'Consulta sobre registro de mascotas';
        const body = 'Hola,\n\nMe gustaría obtener información sobre...';
        const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = url;
    };

    return (
        <motion.footer 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-indigo-600 text-white py-8 px-4"
        >
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col gap-10 justify-between items-center">
                    <div className="flex items-center mb-4 md:mb-0 justify-center">
                        <h3 className="text-xl font-bold text-center">Contáctenos para brindarle asistencia y resolver sus inquietudes</h3>
                    </div>
                    
                    <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleWhatsAppClick}
                            className="flex items-center bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors"
                        >
                            <FaWhatsapp className="mr-2 text-xl" />
                            <span>Escríbenos por WhatsApp</span>
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleEmailClick}
                            className="flex items-center bg-indigo-500 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
                        >
                            <FaEnvelope className="mr-2" />
                            <span>Envíanos un email</span>
                        </motion.button>
                    </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-indigo-400 text-center text-sm">
                    <p>© {new Date().getFullYear()} Registro de Mascotas. Todos los derechos reservados.</p>
                </div>
            </div>
        </motion.footer>
    );
};

export default FooterComponent;