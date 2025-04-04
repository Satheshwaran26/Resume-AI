import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [avatarErrors, setAvatarErrors] = useState({});

  // Testimonial data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      content: "This resume builder helped me land my dream job at TechCorp. The AI suggestions were spot-on and the templates are professional.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateX",
      content: "I was able to create a stunning resume in minutes. The ATS optimization feature is a game-changer for job applications.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "GrowthHub",
      content: "The customization options are fantastic. I could perfectly match my personal brand while maintaining a professional look.",
      rating: 5
    }
  ];

  const handleAvatarError = (testimonialId) => {
    if (!avatarErrors[testimonialId]) {
      setAvatarErrors(prev => ({
        ...prev,
        [testimonialId]: true
      }));
    }
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Check if element is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Render stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FaStar key={index} className="w-5 h-5 text-yellow-400" />
    ));
  };

  // Handle navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % testimonials.length;
    setCurrentIndex(newIndex);
  };

  const TestimonialCard = ({ testimonial }) => {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-semibold">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
            <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
          </div>
        </div>
        
        <div className="flex gap-1 mb-4">
          {renderStars(testimonial.rating)}
        </div>
        
        <div className="relative">
          <FaQuoteLeft className="absolute -top-2 -left-2 text-gray-200 w-8 h-8" />
          <p className="text-gray-600 leading-relaxed relative z-10">
            {testimonial.content}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f5f0ff 0%, #ffffff 50%, #f0f4ff 100%)"
      }}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-purple-100 mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-blue-100 mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-indigo-100 mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>
        
        {/* Enhanced Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-8"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-yellow-50 rounded-lg rotate-12 opacity-30 animate-float"></div>
        <div className="absolute bottom-40 right-40 w-12 h-12 bg-blue-50 rounded-full opacity-30 animate-float animation-delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-10 h-10 bg-purple-50 rounded-lg rotate-45 opacity-30 animate-float animation-delay-3000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-3">
            <div className="flex items-center justify-center space-x-2 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-700"></span>
              </span>
              <span className="text-sm font-semibold text-gray-700">Success Stories</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight">
            What Our <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent px-2">Users Say</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of professionals who have transformed their careers with our resume builder
          </p>
        </motion.div>
        
        {/* Enhanced Testimonials Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Testimonial Card with enhanced design */}
          <div className="relative h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-50"
              >
                <div className="md:flex">
                  {/* Enhanced Left Column - Image and Info */}
                  <div className="md:w-1/3 bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 p-8 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 h-full w-full bg-pattern-dots"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white opacity-10 rounded-full filter blur-3xl"></div>
                    </div>
                    
                    <div className="text-center md:text-left relative z-10">
                      <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden mx-auto md:mx-0 mb-4 shadow-lg">
                        {avatarErrors[testimonials[currentIndex].id] ? (
                          <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                            <span className="text-2xl font-bold">
                              {testimonials[currentIndex].name.charAt(0)}
                            </span>
                          </div>
                        ) : (
                          <img 
                            src={testimonials[currentIndex].image} 
                            alt={testimonials[currentIndex].name}
                            className="w-full h-full object-cover"
                            onError={() => handleAvatarError(testimonials[currentIndex].id)}
                          />
                        )}
                      </div>
                      <h3 className="text-white text-2xl font-bold">{testimonials[currentIndex].name}</h3>
                      <p className="text-indigo-100 mt-1 font-medium">{testimonials[currentIndex].role}</p>
                      
                      <div className="flex mt-4 justify-center md:justify-start">
                        {renderStars(testimonials[currentIndex].rating)}
                      </div>
                    </div>
                    
                    <div className="hidden md:block mt-8 relative z-10">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3 shadow-md">
                          <img 
                            src={testimonials[currentIndex].company.logo} 
                            alt={testimonials[currentIndex].company.name}
                            className="w-7 h-7"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/28";
                            }}
                          />
                        </div>
                        <span className="text-white font-semibold">{testimonials[currentIndex].company.name}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Right Column - Content */}
                  <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-6">
                      <svg className="w-16 h-16 text-indigo-50" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-xl leading-relaxed mb-8 font-medium">
                      {testimonials[currentIndex].content}
                    </p>
                    
                    <div className="md:hidden mt-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-3 shadow-md">
                          <img 
                            src={testimonials[currentIndex].company.logo} 
                            alt={testimonials[currentIndex].company.name}
                            className="w-7 h-7"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/28";
                            }}
                          />
                        </div>
                        <span className="text-gray-700 font-semibold">{testimonials[currentIndex].company.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Enhanced Navigation Controls */}
          <div className="flex justify-between items-center mt-10">
            <motion.button 
              onClick={goToPrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border border-gray-100"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-indigo-600 w-10' 
                      : 'bg-gray-300 hover:bg-gray-400 w-3'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <motion.button 
              onClick={goToNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border border-gray-100"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
        
        {/* Enhanced Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-24 grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {[
            { value: '10k+', label: 'Happy Users' },
            { value: '91%', label: 'Success Rate' },
            { value: '3.2x', label: 'Interview Chances' },
            { value: '24hr', label: 'Support' }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-gray-50"
            >
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Build Your Resume Now
          </motion.button>
          <p className="mt-4 text-gray-600">Join our satisfied users and boost your career today</p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;