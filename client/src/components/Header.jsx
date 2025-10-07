import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-900 bg-opacity-70 backdrop-blur-md shadow-md border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2 cursor-pointer select-none">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">ImageAI</span>
          </div>
          <nav className="flex items-center space-x-10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-500 font-bold px-2 py-1 rounded'
                  : 'text-gray-400 hover:text-white hover:scale-105 hover:bg-white hover:bg-opacity-10 transition px-2 py-1 rounded'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/features"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-500 font-bold px-2 py-1 rounded'
                  : 'text-gray-400 hover:text-white hover:scale-105 hover:bg-white hover:bg-opacity-10 transition px-2 py-1 rounded'
              }
            >
              Features
            </NavLink>

            <NavLink
              to="/select"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-500 font-bold px-2 py-1 rounded'
                  : 'text-gray-400 hover:text-white hover:scale-105 hover:bg-white hover:bg-opacity-10 transition px-2 py-1 rounded'
              }
            >
              Select Feature
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
