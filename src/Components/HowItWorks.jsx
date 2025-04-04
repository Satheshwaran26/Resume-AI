import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);

  // Steps data with enhanced visuals
  const steps = [
    {
      id: 1,
      title: "Choose a Professional Template",
      description: "Browse our collection of ATS-friendly resume templates designed by HR experts. Select the perfect layout for your career level and industry.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "from-blue-600 to-indigo-600",
      lightColor: "bg-blue-50",
      borderColor: "border-blue-200",
      image: "https://assets.novoresume.com/images/how-it-works/choose-template.png"
    },
    {
      id: 2,
      title: "Add Your Content with AI Assistance",
      description: "Input your experience and skills, or let our AI content generator create professional bullet points for you. Our AI assistant provides real-time suggestions to improve your resume.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      color: "from-indigo-600 to-purple-600",
      lightColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      image: "https://assets.novoresume.com/images/how-it-works/add-content.png"
    },
    {
      id: 3,
      title: "Customize Design & Format",
      description: "Personalize your resume with custom colors, fonts, and spacing. Adjust sections and layout to highlight your strengths and match the job requirements.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      color: "from-purple-600 to-blue-600",
      lightColor: "bg-purple-50",
      borderColor: "border-purple-200",
      image: "https://assets.novoresume.com/images/how-it-works/customize-design.png"
    },
    {
      id: 4,
      title: "Download, Share & Apply",
      description: "Download your resume as a PDF, share it directly with employers, or generate a link to your online resume. Use our ATS scanner to ensure your resume passes applicant tracking systems.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
      color: "from-blue-600 to-indigo-600",
      lightColor: "bg-blue-50",
      borderColor: "border-blue-200",
      image: "https://assets.novoresume.com/images/how-it-works/download-share.png"
    }
  ];

  useEffect(() => {
    // Check if element is in viewport
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

  useEffect(() => {
    // Auto-rotate steps every 5 seconds
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [steps.length]);

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f0f4ff 0%, #ffffff 50%, #f5f0ff 100%)"
      }}
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-100 mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-indigo-100 mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-purple-100 mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-3">
            <div className="flex items-center justify-center space-x-2 bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm px-4 py-1 rounded-full shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-sm font-medium text-gray-600">Simple 4-Step Process</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            How It <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Works</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create a professional resume in minutes with our intuitive platform
          </p>
        </motion.div>
        
        {/* Steps Display */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="relative"
        >
          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side: Steps List */}
            <motion.div variants={itemVariants} className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className={`relative rounded-2xl transition-all duration-300 ${
                    activeStep === index 
                      ? 'scale-105 z-10' 
                      : 'scale-100 hover:scale-102'
                  }`}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`absolute inset-0 rounded-2xl ${
                    activeStep === index 
                      ? 'opacity-100 shadow-lg' 
                      : 'opacity-0'
                  } bg-gradient-to-r ${step.color} blur-sm transition-opacity duration-300`}></div>
                  
                  <div className={`relative flex items-start p-6 rounded-2xl ${
                    activeStep === index 
                      ? 'bg-white border-transparent shadow-xl' 
                      : `bg-white border ${step.borderColor}`
                  } transition-all duration-300`}>
                    {/* Step Number */}
                    <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full mr-5 ${
                      activeStep === index 
                        ? `bg-gradient-to-r ${step.color}` 
                        : step.lightColor
                    } transition-colors duration-300`}>
                      {activeStep === index ? (
                        step.icon
                      ) : (
                        <span className={`text-xl font-bold ${
                          activeStep === index 
                            ? 'text-white' 
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
                        }`}>
                          {step.id}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className={`text-xl font-bold ${
                          activeStep === index 
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent' 
                            : 'text-gray-800'
                        }`}>
                          {step.title}
                        </h3>
                        
                        {activeStep === index && (
                          <div className="ml-3 flex-shrink-0 flex h-5 w-5 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-5 w-5 bg-blue-600 items-center justify-center">
                              <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Right Side: Active Step Visualization */}
            <motion.div 
              variants={itemVariants}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Progress Indicator */}
              <div className="absolute top-0 left-0 right-0 z-10 flex justify-between px-6 pt-6">
                {steps.map((_, index) => (
                  <div 
                    key={index}
                    className="relative h-1 bg-gray-200 rounded-full flex-1 mx-1"
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ 
                        width: activeStep >= index ? "100%" : "0%" 
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                ))}
              </div>
              
              {/* Step Image */}
              <div className="relative bg-white p-8 pt-16 rounded-2xl h-full">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: activeStep === index ? 1 : 0,
                      scale: activeStep === index ? 1 : 0.9,
                      x: activeStep === index ? 0 : 20
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="relative w-full h-full">
                      {/* Device Frame */}
                      <div className="absolute inset-0 border-2 border-gray-200 rounded-lg overflow-hidden shadow-inner bg-gray-50">
                        {/* Browser Chrome */}
                        <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-4">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                          </div>
                          <div className="mx-auto bg-white rounded-md w-2/3 h-5 flex items-center justify-center">
                            <div className="w-16 h-3 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                        
                        <img 
                          src={step.image} 
                          alt={step.title}
                          className="object-cover w-full h-full pt-8"
                          style={{ objectPosition: 'top' }}
                        />
                        
                        {/* Reflection effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white opacity-10 pointer-events-none"></div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-70 blur-xl"></div>
                      <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-70 blur-xl"></div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Controls */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        activeStep === index 
                          ? 'bg-blue-600 w-8' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to step ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Action Button */}
          <motion.div 
            variants={itemVariants} 
            className="mt-16 text-center"
          >
            <Link 
              to="/builder" 
              className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Your Resume Now
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            <p className="mt-4 text-sm text-gray-500">
              <span className="font-medium text-gray-700">No credit card required</span> · Free to get started
            </p>
          </motion.div>
          
          {/* Testimonial or Social Proof */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm rounded-2xl p-6 shadow-sm"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-1 mb-4 md:mb-0">
                <p className="text-sm text-gray-500 font-medium">Trusted by job seekers from:</p>
                <div className="flex space-x-4 items-center">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="h-6" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-6" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-6" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-6" />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">10,000+</span> resumes created this week
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;