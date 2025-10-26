import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const features = [
  { id: 'building', name: 'Building Detection', description: 'Detect buildings in satellite images', icon: '🏢' },
  { id: 'road', name: 'Road Detection', description: 'Identify roads and pathways', icon: '🛣️' },
  { id: 'colorization', name: 'Colorization', description: 'Add color to grayscale images', icon: '🎨' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

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
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="bg-gray-800 border border-gray-600 rounded-xl shadow-lg cursor-pointer text-center p-10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:ring-4 hover:ring-gray-400"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleSelect(feature.id)}
            >
              <div className="text-6xl mb-4">{feature.icon}</div>
              <h2 className="text-3xl font-semibold text-primary-100 mb-2">
                {feature.name}
              </h2>
              <p className="text-primary-200 text-lg">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeatureSelection;
