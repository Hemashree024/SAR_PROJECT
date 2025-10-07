import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const features = [
  { id: 'building', name: 'Building Detection' },
  { id: 'road', name: 'Road Detection' },
  { id: 'colorization', name: 'Colorization' },
];

const FeatureSelection = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleSelect = (featureId) => {
    setSelectedFeature(featureId);
    navigate(`/process/${featureId}`);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Select a Feature to Start</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="bg-white p-6 rounded-lg shadow-lg cursor-pointer text-center"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleSelect(feature.id)}
            >
              <h2 className="text-2xl font-semibold">{feature.name}</h2>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureSelection;
