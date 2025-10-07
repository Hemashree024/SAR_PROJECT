import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Building Detection',
    description: 'Automatically detect buildings in satellite or aerial images using advanced deep learning models. Perfect for urban planning and real estate analysis.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 21h18v-2H3v2zm2-4h14v-7h-3V7a3 3 0 00-6 0v3H5v7zm5-7V7a1 1 0 012 0v3h-2z" />
      </svg>
    ),
    iconBg: 'bg-blue-500',
  },
  {
    title: 'Road Detection',
    description: 'Identify and extract road networks from images to assist in mapping and navigation applications. Essential for transportation planning.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 13h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM3 17h18v-2H3v2zm0-8v2h18V9H3z"/>
      </svg>
    ),
    iconBg: 'bg-green-500',
  },
  {
    title: 'Image Colorization',
    description: 'Transform grayscale images into vibrant color images using state-of-the-art colorization techniques. Bring old photos back to life.',
    icon: (
      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a7 7 0 00-7 7c0 3.866 3.134 7 7 7s7-3.134 7-7a7 7 0 00-7-7zm0 12a5 5 0 01-5-5 5 5 0 0110 0 5 5 0 01-5 5z"/>
        <path d="M12 14a9 9 0 00-9 9h18a9 9 0 00-9-9z"/>
      </svg>
    ),
    iconBg: 'bg-purple-500',
  },
];

const FeatureOverview = () => {
  return (
    <motion.div
      className="min-h-screen bg-[#0f172a] p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-4 text-white">Core Features Overview</h1>
        <p className="text-gray-300 mb-12 max-w-3xl mx-auto">
          Discover our powerful AI-driven image processing capabilities designed to transform how you analyze and enhance visual data.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="bg-[#1e293b] p-6 rounded-lg shadow-lg text-left"
              whileHover={{ scale: 1.05 }}
            >
              <div className={`inline-flex items-center justify-center rounded-md p-3 mb-4 ${feature.iconBg} shadow-lg`}>
                {feature.icon}
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{feature.title}</h2>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12">
          <button
            onClick={() => window.location.href = '/select'}
            className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition"
          >
            Try Our Features
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureOverview;
