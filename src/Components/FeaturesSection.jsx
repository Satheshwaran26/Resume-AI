import React from 'react';
import { FaSearch, FaRobot, FaMagic, FaArrowRight, FaCheck, FaFileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaSearch className="h-6 w-6" />,
      title: "ATS Scanner",
      description: "Ensure your resume passes through Applicant Tracking Systems with our advanced scan technology.",
      color: "#4361EE",
      benefits: [
        "Keyword optimization suggestions",
        "Format compatibility check",
        "Content improvement recommendations"
      ]
    },
    {
      icon: <FaMagic className="h-6 w-6" />,
      title: "Prompt to Resume",
      description: "Simply describe your experience in plain language and watch as we transform it into a polished resume.",
      color: "#3A0CA3",
      benefits: [
        "Conversational input interface",
        "Instant resume generation",
        "Multiple template options"
      ]
    },
    {
      icon: <FaRobot className="h-6 w-6" />,
      title: "Auto Content Generator",
      description: "Let our AI analyze your experience to create impactful bullet points that highlight your achievements.",
      color: "#F72585",
      benefits: [
        "Industry-specific phrasing",
        "Achievement-focused wording",
        "Professional tone refinement"
      ]
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Animated Background Elements */}
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
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center font-normal space-x-2 px-4 py-2 rounded-full bg-blur mb-6 shadow-sm border border-gray-400/20">
            <FaFileAlt className="h-4 w-4" />
            <span className="text-sm font-light">Powerful AI Features</span>
          </div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[2.5em] md:text-6xl font-extralight text-gray-900 mb-6 leading-tight animate-slide-up"
          >
            Create your resume in minutes, <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">not hours</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto animate-slide-up animation-delay-200"
          >
            Our AI tools simplify resume creation and maximize your chances of landing interviews.
          </motion.p>
        </div>

        {/* Features display */}
        <div className="space-y-24 mb-20">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col md:flex-row items-center gap-12"
            >
              {/* Feature Content */}
              <div className={`w-full md:w-1/2 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-full bg-indigo-100 mr-4">
                    {React.cloneElement(feature.icon, { className: "text-indigo-600" })}
                  </div>
                  <h3 className="text-2xl font-light text-gray-900">{feature.title}</h3>
                </div>
                
                <p className="text-xl text-gray-600 mb-8 font-light">
                  {feature.description}
                </p>
                
                <div className="space-y-5 mb-10">
                  {feature.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start">
                      <div className="p-1 bg-indigo-100 rounded-full text-indigo-600 mt-1 mr-4">
                        <FaCheck className="w-3 h-3" />
                      </div>
                      <p className="text-gray-600 font-light">{benefit}</p>
                    </div>
                  ))}
                </div>
                
                <Link 
                  to="/builder"
                  className="inline-flex items-center px-6 py-3 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200"
                >
                  Try {feature.title}
                  <FaArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
              
              {/* Feature UI Mockup */}
              <div className={`w-full md:w-1/2 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="relative bg-white rounded-xl shadow-xl overflow-hidden p-1 border border-gray-100">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
                  
                  <div className="px-6 py-8">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                        {React.cloneElement(feature.icon, { className: "w-5 h-5 text-indigo-600" })}
                      </div>
                      <h4 className="text-lg font-medium">{feature.title}</h4>
                    </div>
                    
                    <div className="space-y-4">
                      {feature.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200">
                          <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                            <FaCheck className="w-3 h-3 text-indigo-600" />
                          </div>
                          <p className="text-sm text-gray-600">{benefit}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 p-3 rounded-lg bg-gray-50 border border-gray-200">
                      <div className="flex items-center text-sm text-gray-500">
                        <FaRobot className="w-4 h-4 mr-2 text-indigo-600" />
                        <span>AI-powered suggestions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Animated CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/builder"
              className="px-6 py-3 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200"
            >
              Start Building Your Resume
            </Link>
            <Link 
              to="/templates"
              className="px-6 py-3 rounded-lg font-medium text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition duration-200"
            >
              View Templates
            </Link>
          </div>
          
          {/* Animated Features */}
          <div className="flex flex-wrap justify-center gap-6 text-gray-700 mt-10">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-3 px-4 py-2 rounded-lg shadow-sm"
              >
                <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
                  {React.cloneElement(feature.icon, { className: "w-4 h-4" })}
                </div>
                <span className="font-medium">{feature.title}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
