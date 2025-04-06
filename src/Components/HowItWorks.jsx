import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);

  // Steps data
  const steps = [
    {
      id: 1,
      title: "Choose a Professional Template",
      description: "Browse our collection of ATS-friendly resume templates designed by HR experts. Select the perfect layout for your career level and industry.",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      color: "#4F46E5",
      image: "https://assets.novoresume.com/images/how-it-works/choose-template.png"
    },
    {
      id: 2,
      title: "Add Your Content with AI Assistance",
      description: "Input your experience and skills, or let our AI content generator create professional bullet points for you. Our AI assistant provides real-time suggestions to improve your resume.",
      icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
      color: "#8B5CF6",
      image: "https://assets.novoresume.com/images/how-it-works/add-content.png"
    },
    {
      id: 3,
      title: "Customize Design & Format",
      description: "Personalize your resume with custom colors, fonts, and spacing. Adjust sections and layout to highlight your strengths and match the job requirements.",
      icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
      color: "#EC4899",
      image: "https://assets.novoresume.com/images/how-it-works/customize-design.png"
    },
    {
      id: 4,
      title: "Download, Share & Apply",
      description: "Download your resume as a PDF, share it directly with employers, or generate a link to your online resume. Use our ATS scanner to ensure your resume passes applicant tracking systems.",
      icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
      color: "#10B981",
      image: "https://assets.novoresume.com/images/how-it-works/download-share.png"
    }
  ];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
    >
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-purple-100 to-purple-50 opacity-70"></div>
        <div className="absolute top-1/4 -left-20 w-60 h-60 rounded-full bg-gradient-to-br from-blue-100 to-indigo-50 opacity-60"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-green-100 to-green-50 opacity-50"></div>
        <svg className="absolute bottom-0 left-0 w-full opacity-5" viewBox="0 0 1920 250">
          <path fill="#4F46E5" d="M1920,250V0S1440,50,960,50,0,0,0,0V250Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-3 px-3 py-1 bg-indigo-50 rounded-full">
            <span className="text-sm font-semibold text-indigo-600 tracking-wide">4 Simple Steps</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            How Our <span className="text-indigo-600">Resume Builder</span> Works
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create a standout resume in minutes with our intuitive platform
          </p>
        </motion.div>
        
        {/* Timeline steps */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-indigo-200 via-purple-200 to-green-200"></div>
          
          <div className="space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center z-10">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: step.color }}
                  >
                    <span className="font-bold">{step.id}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} mb-8 md:mb-0`}>
                  <div className="p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white mr-4 md:hidden"
                        style={{ backgroundColor: step.color }}
                      >
                        <span className="font-bold">{step.id}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    
                    {activeStep === index && (
                      <div className="hidden md:flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></div>
                        <span className="text-sm font-medium text-indigo-600">Currently viewing</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Image */}
                <div className="md:w-1/2 flex items-center justify-center">
                  <div className={`relative p-2 rounded-2xl bg-white shadow-lg ${activeStep === index ? 'ring-4' : ''}`}
                       style={{ borderColor: activeStep === index ? step.color : 'transparent' }}>
                    <div className="absolute inset-0 rounded-2xl opacity-10" 
                         style={{ backgroundColor: step.color }}></div>
                    
                    <div className="relative rounded-xl overflow-hidden border border-gray-200">
                      {/* Browser chrome */}
                      <div className="h-6 bg-gray-100 flex items-center px-3 border-b border-gray-200">
                        <div className="flex space-x-1.5">
                          <div className="w-2 h-2 rounded-full bg-red-400"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                          <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        </div>
                      </div>
                      
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-auto object-cover"
                        style={{ maxHeight: '280px' }}
                      />
                    </div>
                    
                    {/* Icon watermark */}
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke={step.color}
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Action button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <Link 
            to="/builder" 
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Your Resume Now
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          
          <div className="mt-6 flex justify-center items-center space-x-3">
            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-gray-600">No credit card required · Free to start</p>
          </div>
        </motion.div>
        
        {/* Trust badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-16 bg-white bg-opacity-80 rounded-xl p-6 shadow-sm"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">10,000+</div>
              <div className="text-sm text-gray-500">Resumes Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">93%</div>
              <div className="text-sm text-gray-500">Interview Success</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">4.9/5</div>
              <div className="text-sm text-gray-500">User Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">24/7</div>
              <div className="text-sm text-gray-500">Customer Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;