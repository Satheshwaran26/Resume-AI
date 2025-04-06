import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', path: '#about' },
  
    { name: 'ATS Scanner', path: '/ats-scanner' },
    { 
      name: 'Resume Building' ,
      path: '#solutions',
      dropdown: [
        { name: 'AI Resume', path: '/resume-builder' },
        { name: 'Manual Resume ', path: '/cover-letter' },
        
      ]
    },
    { name: 'Blog', path: '#pricing' },
    

    { name: 'Contact', path: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 lg:mt-8 mt-4 transition-all duration-300 w-full `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16 rounded-2xl border border-gray-400/20 shadow-lg shadow-indigo-500/5 backdrop-blur-xl ">
          {/* Background gradient effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-50/50 via-white/50 to-indigo-50/50 pointer-events-none"></div>

          {/* Logo */}
          <div className="relative flex items-center pl-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
               
                <span className="relative text-2xl font-light bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:to-purple-500 transition-all duration-300">
                  Resume AI
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <button
                    className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 font-medium group flex items-center space-x-1 hover:bg-gray-50/80 transition-all duration-200"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span>{item.name}</span>
                    <FaChevronDown className="w-3 h-3 transform group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 font-medium transition-all duration-200"
                  >
                    {item.name}
                  </Link>
                )}
                
                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.name && (
                  <div
                    className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="py-2">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 hover:text-indigo-600 transition-all duration-200"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

 {/* Sign Up Buttons */}
<div className="hidden md:flex items-center space-x-3 pr-4">
  <button className="relative group">
    <span className="relative px-5 py-2 rounded-lg bg-indigo-600 text-white  font-medium inline-block  text-base">
      Create Resume
    </span>
  </button>
</div>

          {/* Mobile Menu Button */}
          <div className="md:hidden relative pr-4 ">
            <button
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute left-4 right-4 mt-2 rounded-2xl bg-white shadow-lg border border-gray-200/20 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <>
                        <button
                          className="w-full flex justify-between items-center py-2 text-gray-600 hover:text-gray-900 font-medium"
                          onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        >
                          <span>{item.name}</span>
                          <FaChevronDown className={`w-3 h-3 transform transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                        </button>
                        {activeDropdown === item.name && (
                          <div className="mt-2 ml-4 space-y-2">
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                to={dropdownItem.path}
                                className="block py-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                              >
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        className="block py-2 text-gray-600 hover:text-gray-900 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
