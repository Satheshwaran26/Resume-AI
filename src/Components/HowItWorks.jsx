import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

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
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "from-blue-500 to-indigo-600",
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
      color: "from-purple-500 to-indigo-600",
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
      color: "from-pink-500 to-rose-600",
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
      color: "from-emerald-500 to-teal-600",
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

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create a professional resume in just four simple steps
          </p>
        </div>
        
        {/* Steps Timeline */}
        <div className={`relative transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}>
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
          
          {/* Steps */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`relative ${index % 2 === 0 ? 'md:ml-auto' : ''} md:w-1/2 md:pr-8 md:pl-8 transition-all duration-500 ${
                  isVisible 
                    ? 'opacity-100 transform-none' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: `${300 + index * 150}ms`,
                  zIndex: steps.length - index
                }}
              >
                {/* Timeline Dot */}
                <div className="hidden md:block absolute top-6 -left-4 w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                  <div className={`w-4 h-4 rounded-full ${activeStep === index ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gray-200'}`}></div>
                </div>
                
                {/* Step Card */}
                <div 
                  className={`bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 ${
                    activeStep === index 
                      ? 'ring-2 ring-blue-500 ring-opacity-50 shadow-xl transform md:scale-105' 
                      : 'hover:shadow-xl hover:transform hover:scale-105'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Step Number & Icon */}
                  <div className="flex items-center mb-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mr-4`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${step.color} text-white mb-1`}>
                        Step {step.id}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                  </div>
                  
                  {/* Step Description */}
                  <p className="text-gray-600 mb-6">{step.description}</p>
                  
                  {/* Step Image */}
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <img 
                      src={step.image} 
                      alt={`Step ${step.id}: ${step.title}`} 
                      className="w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
                
                {/* Mobile Timeline Connector */}
                <div className="md:hidden flex justify-center mt-6 mb-6">
                  <div className="w-0.5 h-8 bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className={`mt-20 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}>
          <div className="relative inline-block">
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-blue-100 animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-purple-100 animate-pulse"></div>
            
            <Link
              to="/templates"
              className="relative inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Create Your Resume Now
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
          <p className="mt-6 text-gray-500">
            Join over 1 million professionals who've landed their dream jobs
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-8">
            <div className="flex items-center text-gray-400">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">ATS-Optimized</span>
            </div>
            <div className="flex items-center text-gray-400">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">AI-Powered</span>
            </div>
            <div className="flex items-center text-gray-400">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Expert-Designed</span>
            </div>
            <div className="flex items-center text-gray-400">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">100% Free</span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        .animate-pulse {
          animation: pulse 3s infinite;
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
