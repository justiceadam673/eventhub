import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const BackArrow = ({ to = "/", className = "" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.1, x: -4 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center justify-center p-2 rounded-full bg-white border border-slate-200 hover:border-purple-400 hover:shadow-md transition-all duration-200 ${className}`}
      aria-label='Go back'
    >
      <ArrowLeft
        size={20}
        className='text-slate-700 hover:text-purple-600 transition-colors'
      />
    </motion.button>
  );
};

export default BackArrow;
