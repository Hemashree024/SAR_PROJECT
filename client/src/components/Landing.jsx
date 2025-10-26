import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen text-white relative font-poppins"
    >
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/Generated File October 02, 2025 - 8_42PM.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Hero Section */}
      <motion.section
        className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-6 pt-32 pb-20 min-h-screen relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl leading-tight mb-4 font-poppins tracking-wide">
          <span className="font-bold text-white">Advanced</span><br />
          <span className="font-bold text-white">Image Processing Platform</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-xl mb-12 opacity-80">
          Transform your images with cutting-edge AI technology with precision and speed.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={() => navigate('/features')}
            className="bg-gray-900 px-8 py-3 rounded-full font-semibold text-white shadow-lg hover:bg-gradient-to-r hover:from-gray-400 hover:to-gray-500 hover:shadow-2xl transition transform hover:scale-105"
          >
            Explore Features
          </button>
          <button
            onClick={() => navigate('/select')}
            className="bg-gray-900 px-8 py-3 rounded-full font-semibold text-white shadow-lg hover:bg-gradient-to-r hover:from-gray-400 hover:to-gray-500 hover:shadow-2xl transition transform hover:scale-105"
          >
            Get Started
          </button>
        </div>

       
      </motion.section>



    </div>
  );
};

export default Landing;
