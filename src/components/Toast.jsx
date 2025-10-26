import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ message, type, visible }) => {
  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 text-white px-5 py-2 rounded-full shadow-lg ${bgColor} z-50`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
