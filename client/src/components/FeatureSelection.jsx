import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const features = [
  { id: 'building', name: 'Building Detection' },
  { id: 'road', name: 'Road Detection' },
  { id: 'colorization', name: 'Colorization' },
];

const FeatureSelection = () => {
  const navigate = useNavigate();

  const handleSelect = (featureId) => {
    navigate("/process/" + featureId);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-10 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-5xl">
        <h1 className="text-5xl font-extrabold mb-12 text-center text-primary-400">
          Select a Feature to Start
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="bg-primary-800 rounded-xl shadow-lg cursor-pointer text-center p-8 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleSelect(feature.id)}
            >
              <h2 className="text-3xl font-semibold text-primary-100">
                {feature.name}
              </h2>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureSelection;
