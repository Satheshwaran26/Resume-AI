import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaArrowRight, FaChevronLeft, FaChevronRight, FaFileAlt } from 'react-icons/fa';

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
    <section className="relative py-16 overflow-hidden bg-white">
      {/* Animated Background Elements - Matching Hero section */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-[800px] h-[800px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-[800px] h-[800px] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_110%)] opacity-5"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header - Matching Hero style */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center font-normal space-x-2 px-4 py-2 rounded-full bg-blur mb-6 shadow-sm border border-gray-400/20">
            <FaFileAlt className="h-4 w-4" />
            <span className="text-sm font-light">Professional Resume Templates</span>
          </div>
          
          <h2 className="text-[2.5em] md:text-6xl font-extralight text-gray-900 mb-6 leading-tight animate-slide-up">
            Resume Templates That Get You 
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient"> Hired</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light animate-slide-up animation-delay-200">
            Stand out with professionally designed templates that catch recruiters' attention
          </p>
        </div>

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
                    <div className={`bg-white rounded-2xl overflow-hidden shadow-2xl ${isActive ? 'ring-4 ring-indigo-500/50 shadow-indigo-200/30' : ''
                      } transition-all duration-300`}>
                      {/* Template Image with hover overlay */}
                      <div className="relative group">
                        <img
                          src={template.image}
                          alt={`${template.name} resume template`}
                          className="w-full h-auto object-cover"
                        />

                        {/* Hover Overlay - Matching Hero styling */}
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-indigo-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Link
                              to={`/resume-builder/${template.id}`}
                              className="px-6 py-3 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200"
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
          <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2">
            {templates.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTemplate(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeTemplate
                    ? 'bg-indigo-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                aria-label={`Go to template ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Feature badges - Matching Hero style */}
        <div className="flex flex-wrap justify-center gap-6 text-gray-700 mt-16 mb-10">
          <div className="flex items-center space-x-3 px-4 py-2 rounded-lg shadow-sm">
            <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
              <FaStar className="w-4 h-4" />
            </div>
            <span className="font-medium">100+ Templates</span>
          </div>
          <div className="flex items-center space-x-3 px-4 py-2 rounded-lg shadow-sm">
            <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
              <FaStar className="w-4 h-4" />
            </div>
            <span className="font-medium">ATS-Friendly</span>
          </div>
          <div className="flex items-center space-x-3 px-4 py-2 rounded-lg shadow-sm">
            <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
              <FaStar className="w-4 h-4" />
            </div>
            <span className="font-medium">Easy Customization</span>
          </div>
        </div>

        {/* CTA Section - Matching Hero style */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
          <Link
            to="/templates"
            className="px-6 py-3 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200"
          >
            Browse All Templates
          </Link>
          <Link
            to="/builder"
            className="px-6 py-3 rounded-lg font-medium text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition duration-200"
          >
            Start Building Your Resume
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TemplatesShowcase;