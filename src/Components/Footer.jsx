import React from 'react';
import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaInstagram, FaGithub, FaEnvelope, FaArrowRight, FaCheckCircle, FaFileAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-white pt-20">
      {/* Wave divider */}
      <div className="absolute top-0 left-0 right-0 transform -translate-y-99.5%">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="white" fillOpacity="1" d="M0,256L48,240C96,224,192,192,288,197.3C384,203,480,245,576,250.7C672,256,768,224,864,229.3C960,235,1056,277,1152,277.3C1248,277,1344,235,1392,213.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-[800px] h-[800px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-[800px] h-[800px] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_110%)] opacity-5"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Footer CTA Section */}
       
        {/* Feature badges */}
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand and Description */}
          <div className="md:col-span-5">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-3 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">ResumeBuilder</h3>
            </div>
            
            <p className="text-gray-600 mb-6 max-w-md text-sm">
              Our AI-powered platform helps you build ATS-optimized resumes that stand out and get you hired. Create professional resumes in minutes.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-8">
              {[
                { icon: <FaTwitter />, href: "https://twitter.com" },
                { icon: <FaLinkedin />, href: "https://linkedin.com" },
                { icon: <FaInstagram />, href: "https://instagram.com" },
                { icon: <FaGithub />, href: "https://github.com" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-600 flex items-center justify-center transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Column 1 */}
          <div className="md:col-span-2">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2">
              {[
                { name: 'Features', path: '/features' },
                { name: 'Templates', path: '/templates' },
                { name: 'Pricing', path: '/pricing' },
                { name: 'Updates', path: '/updates' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Quick Links - Column 2 */}
          <div className="md:col-span-2">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              {[
                { name: 'Blog', path: '/blog' },
                { name: 'Guides', path: '/guides' },
                { name: 'Help Center', path: '/help' },
                { name: 'Career Tips', path: '/tips' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="md:col-span-3">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Stay Updated</h4>
            
            <div className="flex items-center mb-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-700 placeholder-gray-400 text-sm w-full"
              />
              <button className="px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-r-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 text-white">
                <FaArrowRight />
              </button>
            </div>
            
            <div className="pt-4 text-sm text-gray-600">
              <div className="flex items-center mb-2">
                <FaEnvelope className="mr-2 text-indigo-500" />
                <span>support@resumebuilder.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 mt-16 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs mb-4 md:mb-0">
            © {currentYear} ResumeBuilder. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-x-6 text-xs text-gray-500">
            <Link to="/privacy" className="hover:text-indigo-600 transition-colors duration-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-indigo-600 transition-colors duration-300">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-indigo-600 transition-colors duration-300">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
