import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav 
      className={`fixed w-full z-40 transition-all duration-500  ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' 
          : 'bg-white py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 group-hover:opacity-100 blur transition-all duration-300"></div>
                <div className="relative p-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                  <svg 
                    className="h-6 w-6 text-white transform group-hover:rotate-12 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ResumeBuilder
                </span>
                <span className="text-xs text-gray-500">Create Your Future</span>
              </div>
            </Link>
          </div>

          {/* Enhanced Desktop Menu */}
          <div className="hidden md:flex items-center justify-center flex-1 px-8">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 via-purple-100 to-blue-100 rounded-full opacity-50 blur-lg"></div>
              <div className="relative flex space-x-1 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-lg ring-1 ring-gray-200">
                {[
                  { name: 'Templates', path: '/templates', icon: '📄' },
                  { name: 'Create Resume', path: '/builder', icon: '✏️' },
                  { name: 'Resume Tips', path: '/tips', icon: '💡' },
                  { name: 'Examples', path: '/examples', icon: '🎯' },
                  { name: 'AI Tools', path: '/ai-tools', icon: '🤖' }
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative group px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span className="text-base">{item.icon}</span>
                      <span>{item.name}</span>
                    </span>
                    {isActive(item.path) && (
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 rounded-lg group focus:outline-none"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              <div className="relative w-6 h-6">
                <span 
                  className={`absolute block w-6 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform transition-all duration-300 ease-in-out ${
                    isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                  }`}
                ></span>
                <span 
                  className={`absolute block w-6 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 transform transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
                <span 
                  className={`absolute block w-6 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform transition-all duration-300 ease-in-out ${
                    isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-b-3xl px-4 pt-4 pb-6">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 rounded-2xl opacity-50 blur-lg"></div>
            <div className="relative space-y-1">
              {[
                { name: 'Templates', path: '/templates', icon: '📄' },
                { name: 'Create Resume', path: '/builder', icon: '✏️' },
                { name: 'Resume Tips', path: '/tips', icon: '💡' },
                { name: 'Examples', path: '/examples', icon: '🎯' },
                { name: 'AI Tools', path: '/ai-tools', icon: '🤖' }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="flex items-center space-x-3">
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.name}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;