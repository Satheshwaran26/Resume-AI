import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar, FaUser, FaCheck, FaBuilding, FaLinkedin, FaGraduationCap } from 'react-icons/fa';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  // Testimonial data with icons, colors and images
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      content: "This resume builder helped me land my dream job at TechCorp. The AI suggestions were spot-on and the templates are professional and stand out from the crowd.",
      rating: 5,
      icon: <FaUser />,
      gradient: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      image: "https://randomuser.me/api/portraits/women/44.jpg" // Using randomuser for placeholder images
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateX",
      content: "I was able to create a stunning resume in minutes. The ATS optimization feature is a game-changer for job applications. I received 3x more callbacks after using this service.",
      rating: 5,
      icon: <FaBuilding />,
      gradient: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "GrowthHub",
      content: "The customization options are fantastic. I could perfectly match my personal brand while maintaining a professional look. This is by far the best resume builder I've used.",
      rating: 5,
      icon: <FaLinkedin />,
      gradient: "from-indigo-400 to-indigo-600",
      bgColor: "bg-indigo-50",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      id: 4,
      name: "Alex Thompson",
      role: "Recent Graduate",
      company: "First Tech Job",
      content: "As a recent graduate with limited experience, I was worried about my resume. This tool helped me highlight my skills and projects in a way that impressed recruiters.",
      rating: 5,
      icon: <FaGraduationCap />,
      gradient: "from-pink-400 to-pink-600",
      bgColor: "bg-pink-50",
      image: "https://randomuser.me/api/portraits/men/75.jpg"
    }
  ];

  // Handle image errors
  const handleImageError = (id) => {
    setImageErrors(prev => ({
      ...prev,
      [id]: true
    }));
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!animating) {
        handleNext();
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [activeIndex, animating]);

  const handleNext = () => {
    setAnimating(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
      setAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    setAnimating(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setAnimating(false);
    }, 300);
  };

  const handleDotClick = (index) => {
    if (index !== activeIndex && !animating) {
      setAnimating(true);
      setTimeout(() => {
        setActiveIndex(index);
        setAnimating(false);
      }, 300);
    }
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FaStar key={index} className={`w-5 h-5 ${index < rating ? "text-yellow-400" : "text-gray-300"}`} />
    ));
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-[800px] h-[800px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_110%)] opacity-5"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-sm border border-gray-200 mb-6">
            <FaUser className="h-4 w-4 text-indigo-600 mr-2" />
            <span className="text-sm font-medium text-gray-600">Success Stories</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-extralight text-gray-900 mb-6">
            What Our <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Users Say</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Join thousands of professionals who have transformed their careers with our resume builder
          </p>
        </div>
        
        {/* Main Testimonial */}
        <div className="relative mb-20">
          
          <div className="transition-all duration-300" style={{ opacity: animating ? 0 : 1 }}>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="md:flex">
                {/* Left Column - Gradient Background */}
                <div 
                  className={`md:w-2/5 p-10 flex flex-col justify-between relative overflow-hidden`}
                  style={{
                    background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                    '--tw-gradient-from': testimonials[activeIndex].gradient.split(' ')[0].replace('from-', ''),
                    '--tw-gradient-to': testimonials[activeIndex].gradient.split(' ')[1].replace('to-', '')
                  }}
                ><div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  </div>
                  
                  <div className="relative z-10 text-gray-900">
                    {/* Profile Image or Fallback Icon */}
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 shadow-lg mb-6">
                      {imageErrors[testimonials[activeIndex].id] ? (
                        <div className="w-full h-full flex items-center justify-center bg-white/20 backdrop-blur-sm">
                          <div className="text-white text-3xl">
                            {testimonials[activeIndex].icon}
                          </div>
                        </div>
                      ) : (
                        <img 
                          src={testimonials[activeIndex].image} 
                          alt={testimonials[activeIndex].name}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(testimonials[activeIndex].id)}
                        />
                      )}
                    </div>
                    
                    <FaQuoteLeft className="text-gray-900/10 text-4xl mb-6" />
                    
                    <h3 className="text-2xl font-bold  mb-1">{testimonials[activeIndex].name}</h3>
                    <p className="">{testimonials[activeIndex].role}</p>
                    <p className="">{testimonials[activeIndex].company}</p>
                    
                    <div className="flex mt-6">
                      {renderStars(testimonials[activeIndex].rating)}
                    </div>
                  </div>
                  
                  <div className="relative z-10 mt-auto">
                    <div className="w-16 h-1 bg-white/30 rounded-full mb-3"></div>
                    <p className="text-sm ">
                      {`Testimonial ${activeIndex + 1} of ${testimonials.length}`}
                    </p>
                  </div>
                </div>
                
                {/* Right Column - Content */}
                <div className="md:w-3/5 p-10 md:p-16 flex items-center">
                  <div>
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light mb-8">
                      "{testimonials[activeIndex].content}"
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4">
                      <button 
                        onClick={handlePrev}
                        className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      <div className="flex space-x-2">
                        {testimonials.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`h-3 rounded-full transition-all duration-300 ${
                              activeIndex === index 
                                ? 'bg-indigo-600 w-12' 
                                : 'bg-gray-300 w-3 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                          />
                        ))}
                      </div>
                      
                      <button
                        onClick={handleNext}
                        className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
     
      </div>
    </section>
  );
};

export default TestimonialsSection;