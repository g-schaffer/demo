import React from 'react';
import { motion } from 'framer-motion';
import { OrderForm } from '../components/OrderForm/OrderForm';

export function Order() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <OrderForm />
    </motion.div>
  );
}