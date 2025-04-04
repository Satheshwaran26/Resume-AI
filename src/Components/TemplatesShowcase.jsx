import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TemplatesShowcase = () => {
  const [activeTemplate, setActiveTemplate] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const showcaseRef = useRef(null);
  
  // Template data with high-quality resume images
  const templates = [
    {
      id: 1,
      name: "Executive Pro",
      description: "Perfect for senior professionals and executives",
      category: "Professional",
      color: "blue",
      popular: true,
      image: "./assets/images/resume1.png",
      features: ["ATS-Optimized", "Executive Summary", "Leadership Focus"]
    },
    {
      id: 2,
      name: "Modern Clean",
      description: "Clean and contemporary design for creative professionals",
      category: "Creative",
      color: "teal",
      popular: true,
      image: "./assets/images/resume1.png",
      features: ["Minimalist Design", "Skills Showcase", "Portfolio Section"]
    },
    {
      id: 3,
      name: "Professional Dark",
      description: "Bold and sophisticated design for making a statement",
      category: "Business",
      color: "indigo",
      popular: false,
      image: "./assets/images/resume1.png",
      features: ["Bold Typography", "Achievement Focus", "Modern Layout"]
    },
    {
      id: 4,
      name: "Minimalist",
      description: "Simple and elegant design that lets your experience shine",
      category: "Simple",
      color: "green",
      popular: true,
      image: "./assets/images/resume1.png",
      features: ["Clean Layout", "Easy to Read", "Distraction-Free"]
    },
    {
      id: 5,
      name: "Creative Design",
      description: "Stand out with this unique creative template",
      category: "Design",
      color: "purple",
      popular: false,
      image: "./assets/images/resume1.png",
      features: ["Visual Elements", "Creative Sections", "Personal Branding"]
    }
  ];

  useEffect(() => {
    // Auto-rotate templates every 5 seconds if not hovering
    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveTemplate((prev) => (prev + 1) % templates.length);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHovering, templates.length]);

  // Track mouse position for 3D effect
  const handleMouseMove = (e) => {
    if (!showcaseRef.current) return;
    
    const rect = showcaseRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };

  // Calculate 3D transform based on mouse position
  const getTransform = () => {
    const rotateX = (mousePosition.y - 0.5) * 10; // -5 to 5 degrees
    const rotateY = (mousePosition.x - 0.5) * -10; // -5 to 5 degrees
    
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  // Navigation functions
  const nextTemplate = () => {
    setActiveTemplate((prev) => (prev + 1) % templates.length);
  };

  const prevTemplate = () => {
    setActiveTemplate((prev) => (prev - 1 + templates.length) % templates.length);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-40 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            Professional Templates
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">
              Resume Templates That Get You Hired
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Stand out with professionally designed templates that catch recruiters' attention
          </motion.p>
        </motion.div>

        {/* 3D Showcase Container */}
        <div 
          ref={showcaseRef}
          className="relative h-[550px] mb-16"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Templates Display with 3D perspective */}
          <div className="relative h-full flex items-center justify-center perspective-1000">
            <AnimatePresence mode="wait">
              {templates.map((template, index) => {
                const position = (index - activeTemplate + templates.length) % templates.length;
                const isActive = position === 0;
                const isNext = position === 1;
                const isPrev = position === templates.length - 1;
                
                // Calculate offset for carousel effect
                let xOffset = 0;
                let zOffset = 0;
                
                if (isActive) {
                  xOffset = 0;
                  zOffset = 0;
                } else if (isNext) {
                  xOffset = 350;
                  zOffset = -100;
                } else if (isPrev) {
                  xOffset = -350;
                  zOffset = -100;
                } else if (position < templates.length / 2) {
                  xOffset = 550;
                  zOffset = -200;
                } else {
                  xOffset = -550;
                  zOffset = -200;
                }
                
                return (
                  <motion.div
                    key={template.id}
                    className="absolute w-[340px] md:w-[400px] transition-all duration-500"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      x: xOffset,
                      z: zOffset,
                      opacity: isActive ? 1 : isNext || isPrev ? 0.8 : 0.4,
                      scale: isActive ? 1 : isNext || isPrev ? 0.85 : 0.7,
                      filter: isActive ? 'none' : 'brightness(0.8)',
                      rotateY: isActive ? 0 : isNext ? -15 : isPrev ? 15 : 0,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    onClick={() => setActiveTemplate(index)}
                    style={{
                      transform: isActive && isHovering ? getTransform() : undefined,
                      zIndex: isActive ? 30 : isNext || isPrev ? 20 : 10,
                    }}
                  >
                    <div className={`bg-white rounded-2xl overflow-hidden shadow-2xl ${
                      isActive ? 'ring-4 ring-blue-500/50 shadow-blue-200/30' : ''
                    } transition-all duration-300`}>
                      {/* Template Image with glass morphism overlay */}
                      <div className="relative group">
                        <img 
                          src={template.image} 
                          alt={`${template.name} resume template`}
                          className="w-full h-auto object-cover"
                        />
                        
                        {/* Popular Badge with animated gradient */}
                        {template.popular && (
                          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg animate-pulse-slow">
                            <div className="flex items-center gap-1">
                              <FaStar className="w-3 h-3" />
                              <span>Popular Choice</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium rounded-full shadow-sm">
                          {template.category}
                        </div>
                        
                        {/* Hover Overlay with glass effect */}
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm flex flex-col justify-end p-6">
                            <h3 className="text-2xl font-bold text-white mb-2">{template.name}</h3>
                            <p className="text-white/80 mb-4">{template.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {template.features.map((feature, i) => (
                                <span key={i} className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                                  {feature}
                                </span>
                              ))}
                            </div>
                            <Link
                              to={`/resume-builder/${template.id}`}
                              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg text-center hover:shadow-lg transform hover:scale-105 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                            >
                              Use This Template
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          
          {/* Navigation Controls */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
            <button 
              onClick={prevTemplate}
              className="pointer-events-auto ml-4 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
              aria-label="Previous template"
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextTemplate}
              className="pointer-events-auto mr-4 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
              aria-label="Next template"
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Template Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {templates.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTemplate(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeTemplate 
                    ? 'bg-indigo-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to template ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <Link
            to="/templates"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-full overflow-hidden shadow-lg hover:shadow-indigo-500/30 transition-all duration-500"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-64 group-hover:h-64 opacity-10"></span>
            <span className="relative">Browse All Templates</span>
            <FaArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
            <div className="mt-6 flex items-center justify-center gap-6 text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></span>
              <span>100+ Templates</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></span>
              <span>ATS-Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-full"></span>
              <span>Easy Customization</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TemplatesShowcase;