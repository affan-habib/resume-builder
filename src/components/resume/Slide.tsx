import { motion } from 'framer-motion';
import React from 'react';

interface SlideProps {
  children: React.ReactNode;
  isActive: boolean;
}

export const Slide: React.FC<SlideProps> = ({ children, isActive }) => {
  return (
    <motion.div
      className={`absolute top-0 left-0 w-full h-full ${isActive ? 'block' : 'hidden'}`}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 100 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};