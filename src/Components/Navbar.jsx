import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    
    <nav className="fixed top-0 left-0 right-0 z-50  mt-8  ">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 border rounded-3xl backdrop-blur-lg border-indigo-800 p-5">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                ResumeAI
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-600 hover:text-gray-900">Home</a>
            <Link to="/ats-scanner" className="text-gray-600 hover:text-gray-900">ATS Scanner</Link>
            <a href="#solution" className="text-gray-600 hover:text-gray-900">Solution</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900">About us</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
          </div>

          {/* Sign Up Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900 font-medium">
              Sign up
            </button>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition duration-300">
              Sign up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900 p-2">
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;