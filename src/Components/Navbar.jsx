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
      className={`fixed w-full z-40 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg py-2' 
          : 'bg-white py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-black/20 rounded-lg opacity-75 blur-sm group-hover:opacity-100 group-hover:blur transition-all duration-300"></div>
                <div className="relative p-2 rounded-lg bg-black group-hover:bg-gray-900 transition-all duration-300 shadow-md">
                  <svg 
                    className="h-5 w-5 text-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-black">
                  ResumeBuilder
                </span>
                <span className="text-xs text-gray-500">Create Your Future</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="relative mr-4">
              <div className="absolute -inset-3 bg-gray-100 rounded-lg blur-lg opacity-75"></div>
              <div className="relative flex bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-md">
                {[
                  { name: 'Templates', path: '/templates', icon: '📄' },
                  { name: 'Resume Tips', path: '/tips', icon: '💡' },
                  { name: 'Examples', path: '/examples', icon: '🎯' },
                  { name: 'AI Tools', path: '/ai-tools', icon: '🤖' }
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative group px-4 py-2 mx-1 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                      isActive(item.path)
                        ? 'bg-black text-white shadow-md'
                        : 'text-gray-600 hover:text-black hover:bg-gray-100'
                    }`}
                  >
                    <span className="flex items-center space-x-1.5">
                      <span className="text-base">{item.icon}</span>
                      <span>{item.name}</span>
                    </span>
                    {!isActive(item.path) && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Create Resume Button */}
            <Link 
              to="/builder"
              className="relative group"
            >
              <div className="absolute -inset-1 bg-black rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative px-6 py-2.5 bg-black rounded-lg text-white font-medium shadow-lg group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-300 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Resume
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 rounded-lg group focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="absolute -inset-1 bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              <div className="relative w-6 h-6">
                <span 
                  className={`absolute block w-6 h-0.5 bg-black transform transition-all duration-300 ease-in-out ${
                    isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'
                  }`}
                ></span>
                <span 
                  className={`absolute block w-6 h-0.5 bg-black transform transition-all duration-300 ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
                <span 
                  className={`absolute block w-6 h-0.5 bg-black transform transition-all duration-300 ease-in-out ${
                    isOpen ? '-rotate-45 translate-y-1.5' : 'translate-y-1'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-b-2xl px-4 pt-3 pb-5">
          <div className="space-y-2">
            {/* Create Resume Button - Mobile */}
            <Link 
              to="/builder"
              className="block w-full bg-black text-white px-4 py-3 rounded-xl text-center font-medium shadow-md mb-3"
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Resume
              </span>
            </Link>
            
            {/* Navigation Links */}
            {[
              { name: 'Templates', path: '/templates', icon: '📄' },
              { name: 'Resume Tips', path: '/tips', icon: '💡' },
              { name: 'Examples', path: '/examples', icon: '🎯' },
              { name: 'AI Tools', path: '/ai-tools', icon: '🤖' }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-black text-white shadow-md'
                    : 'text-gray-600 hover:text-black hover:bg-gray-100'
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
    </nav>
  );
};

export default Navbar;