import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    name: 'Building Detection',
    description: 'Advanced AI algorithms automatically identify and classify buildings in satellite and aerial imagery with industry-leading precision.',
    emoji: '🏢',
  },
  {
    name: 'Road Mapping',
    description: 'Extract road networks and transportation infrastructure from images with detailed path analysis and classification.',
    emoji: '🛣️',
  },
  {
    name: 'Image Colorization',
    description: 'Transform grayscale images into vibrant, realistic color photos using state-of-the-art deep learning models.',
    emoji: '🎨',
  },
  {
    name: 'Lightning Fast',
    description: 'Process images in seconds, not minutes. Our optimized infrastructure delivers results at unprecedented speed.',
    emoji: '⚡',
  },
  {
    name: 'Enterprise Security',
    description: 'Bank-grade encryption and security protocols ensure your sensitive imagery data remains protected.',
    emoji: '🔒',
  },
  {
    name: 'Global Scale',
    description: 'Process images from anywhere in the world with our distributed cloud infrastructure and CDN network.',
    emoji: '🌍',
  },
];

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-primary-500 via-purple-800 to-pink-700 text-white font-sans">
      {/* Hero Section */}
      <motion.div
        className="flex flex-col items-center justify-center text-center max-w-6xl mx-auto px-6 py-32 min-h-screen"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Advanced Image
          </span>{' '}
          Processing Platform
        </h1>
        <p className="text-lg max-w-3xl text-gray-300 mb-12">
          Transform your images with cutting-edge AI technology. Detect buildings, roads, and colorize grayscale images with precision and speed.
        </p>
        <div className="flex space-x-8">
          <button
            onClick={() => navigate('/features')}
            className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
          >
            Explore Features
          </button>
          <button
            onClick={() => navigate('/select')}
            className="px-8 py-3 bg-transparent border-2 border-white font-semibold rounded-lg hover:bg-white hover:text-blue-700 transition transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </motion.div>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Powerful Features
        </h2>
        <p className="text-center text-gray-400 max-w-3xl mx-auto mb-16">
          Discover the advanced capabilities that make our platform the preferred choice for professionals and enterprises worldwide.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {features.map(({ name, description, emoji }) => (
            <div key={name} className="bg-gray-900 bg-opacity-40 rounded-xl p-6 shadow-lg flex flex-col space-y-4 hover:shadow-2xl transition-shadow duration-300">
              <div className="text-5xl select-none">{emoji}</div>
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-gray-300 text-sm">{description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-16">
          <button
            onClick={() => navigate('/select')}
            className="bg-gradient-to-r from-blue-600 to-purple-700 px-8 py-3 rounded-md font-semibold text-white shadow-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            Start Processing Images
          </button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
