import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const TemplatesShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  // Template data with real resume images
  const templates = [
    {
      id: 1,
      name: "Executive Pro",
      category: "Professional",
      color: "blue",
      popular: true,
      image: "https://resumegenius.com/wp-content/uploads/Executive-Resume-Template-1.png"
    },
    {
      id: 2,
      name: "Modern Clean",
      category: "Creative",
      color: "teal",
      popular: true,
      image: "https://resumegenius.com/wp-content/uploads/Clean-Resume-Template-1.png"
    },
    {
      id: 3,
      name: "Professional Dark",
      category: "Business",
      color: "indigo",
      popular: false,
      image: "https://resumegenius.com/wp-content/uploads/Professional-Resume-Template-1.png"
    },
    {
      id: 4,
      name: "Minimalist",
      category: "Simple",
      color: "green",
      popular: true,
      image: "https://resumegenius.com/wp-content/uploads/Simple-Resume-Template-1.png"
    },
    {
      id: 5,
      name: "Creative Design",
      category: "Design",
      color: "purple",
      popular: false,
      image: "https://resumegenius.com/wp-content/uploads/Creative-Resume-Template-1.png"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate templates every 5 seconds
    const interval = setInterval(() => {
      if (!isDragging) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % templates.length);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isDragging, templates.length]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? templates.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === templates.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    // Find the closest template to snap to after dragging
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.clientWidth;
      const scrollPosition = carouselRef.current.scrollLeft;
      const templateWidth = containerWidth / 3; // Approximate width of each template
      
      const closestIndex = Math.round(scrollPosition / templateWidth);
      setActiveIndex(Math.min(closestIndex, templates.length - 1));
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading with gradient text */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pick a resume template and build your resume in <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">minutes!</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional templates designed by HR experts to help you land your dream job
          </p>
        </div>

        {/* Template Carousel - Enhanced Version */}
        <div 
          className={`relative transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}
          onMouseLeave={() => setHoveredTemplate(null)}
        >
          {/* Background decorative elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full opacity-30 blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-100 rounded-full opacity-30 blur-xl"></div>
          
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto pb-12 hide-scrollbar cursor-grab"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="flex space-x-8 px-8 md:px-12 mx-auto">
              {templates.map((template, index) => {
                // Calculate position relative to active index
                const position = (index - activeIndex + templates.length) % templates.length;
                const isActive = position === 0;
                const isNext = position === 1 || position === templates.length - 1;
                
                return (
                  <div 
                    key={template.id}
                    className={`flex-shrink-0 transition-all duration-500 ${
                      isActive 
                        ? 'w-72 md:w-96 scale-100 z-20' 
                        : isNext 
                          ? 'w-64 md:w-80 scale-95 opacity-80 z-10' 
                          : 'w-64 md:w-80 scale-90 opacity-60 z-0'
                    }`}
                    onClick={() => goToSlide(index)}
                    onMouseEnter={() => setHoveredTemplate(template.id)}
                  >
                    <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                      isActive ? 'shadow-xl' : 'shadow-md'
                    } ${hoveredTemplate === template.id ? 'transform -translate-y-2' : ''}`}>
                      {/* Template Header */}
                      <div className="relative">
                        {template.popular && (
                          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium rounded-full shadow-sm">
                            Popular
                          </div>
                        )}
                        <img 
                          src={template.image} 
                          alt={`${template.name} resume template`}
                          className="w-full h-auto object-cover border border-gray-100"
                        />
                        
                        {/* Hover overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-6 transition-opacity duration-300 ${
                          hoveredTemplate === template.id || isActive ? 'opacity-100' : 'opacity-0'
                        }`}>
                          <div className="text-center">
                            <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                            <span className={`inline-block px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-${template.color}-500 to-${template.color}-600 rounded-full mb-4`}>
                              {template.category}
                            </span>
                            {(hoveredTemplate === template.id || isActive) && (
                              <Link
                                to={`/builder?template=${template.id}`}
                                className="block w-full px-4 py-2 bg-white text-blue-600 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors"
                              >
                                Use This Template
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced Navigation Arrows */}
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-gray-700 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-all z-30"
            aria-label="Previous template"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-gray-700 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-all z-30"
            aria-label="Next template"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Modern Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {templates.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === activeIndex 
                  ? 'w-8 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-md' 
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full'
              }`}
              aria-label={`Go to template ${index + 1}`}
            />
          ))}
        </div>

        {/* Features Section with Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">ATS-friendly professionally designed resumes</h3>
            <p className="text-gray-600">Our templates are designed by HR experts to pass applicant tracking systems and catch recruiters' attention.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Change the font, color and background combinations</h3>
            <p className="text-gray-600">Customize your resume to match your personal style and preferences with our easy-to-use design tools.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Two-column, single-column, and multi-page layouts</h3>
            <p className="text-gray-600">Choose the perfect layout for your experience and career level, from entry-level to executive resumes.</p>
          </div>
        </div>

        {/* Enhanced CTA Button */}
        <div className="mt-16 text-center">
          <Link
            to="/templates"
            className="inline-flex items-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Browse All Resume Templates
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <p className="mt-4 text-gray-500">100+ templates available • No credit card required</p>
        </div>
      </div>
    </div>
  );
};

export default TemplatesShowcase;