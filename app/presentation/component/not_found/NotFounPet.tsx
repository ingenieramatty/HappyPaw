import { motion } from "framer-motion";
import { FaExclamationTriangle, FaPhone, FaPaw, FaDog } from "react-icons/fa";

const NotFounPet = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center"
    >
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          repeatType: "reverse", 
          duration: 2 
        }}
        className="mb-6"
      >
        <FaDog className="text-6xl text-indigo-400" />
      </motion.div>

      <div className="relative mb-8">
        <div className="absolute -left-10 top-1/2 transform -translate-y-1/2">
          <FaPaw className="text-xl text-red-300 animate-pulse" />
        </div>
        <div className="bg-red-100 p-4 rounded-full inline-flex items-center justify-center">
          <FaExclamationTriangle className="text-red-500 text-3xl mr-3" />
          <span className="text-red-700 font-medium">¡Ups!</span>
        </div>
        <div className="absolute -right-10 top-1/2 transform -translate-y-1/2">
          <FaPaw className="text-xl text-red-300 animate-pulse delay-100" />
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
        Lo sentimos, actualmente no tiene un código válido
      </h2>

      <p className="text-gray-600 mb-8 max-w-md">
        Por favor verifique su código o comuníquese con Happy Paw para que le
        asigne un código válido.
      </p>


      <div className="mt-8 flex gap-2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -5, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              delay: i * 0.2 
            }}
          >
            <FaPaw className="text-indigo-200 text-xl" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default NotFounPet;