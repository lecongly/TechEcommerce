import { motion } from "framer-motion";
import { FiCheck, FiX } from "react-icons/fi";
import { AlertTypes } from "../../interfaces/frontend/alerts";

interface Props {
  message: string;
  type: AlertTypes | null;
}
const AlertNotification = ({ message, type }: Props) => (
  <motion.div
    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-60 backdrop-blur-sm z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
  >
    <motion.div
      className="bg-white flex flex-col justify-center items-center h-52 w-80 rounded-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.25 } }}
      exit={{ opacity: 0, y: 20 }}
    >
      <motion.span
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 100, duration: 0.5 },
        }}
        exit={{ opacity: 0, y: 20 }}
        className={`bg-gray-200 text-white w-20 h-20 rounded-full  flex items-center justify-center text-7xl ${
          type === AlertTypes.ERROR ? "bg-red-500" : "bg-lime-400"
        }`}
      >
        {type === AlertTypes.ERROR ? <FiX /> : <FiCheck />}
      </motion.span>
      <span className="text-black font-textMedium  mt-3">{message}</span>
    </motion.div>
  </motion.div>
);
export default AlertNotification;
