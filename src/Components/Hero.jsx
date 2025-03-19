import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-white via-blue-50 to-purple-50 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute top-60 -left-40 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-40 right-20 w-72 h-72 bg-indigo-200 rounded-full opacity-20 blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Enhanced Left Content */}
          <div className={`lg:w-1/2 space-y-8 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
              <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Create a{' '}
                <span className="relative">
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    professional
                  </span>
                  <svg className="absolute -bottom-2 w-full" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0,0 Q50,12 100,0" fill="none" stroke="url(#gradient)" strokeWidth="4"/>
                    <linearGradient id="gradient">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                  </svg>
                </span>{' '}
                resume in minutes
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-2xl leading-relaxed">
                Stand out from the crowd with a beautifully designed resume that showcases your skills and experience.
                <span className="block mt-2 text-blue-600 font-medium">AI-powered suggestions included!</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/builder"
                className="group relative px-8 py-4 text-base font-medium text-white overflow-hidden rounded-full transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-transform duration-300 group-hover:scale-105"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center">
                  Create Your Resume
                  <svg className="ml-2 w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              <Link
                to="/templates"
                className="group px-8 py-4 text-base font-medium text-gray-700 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full hover:border-blue-400 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300"
              >
                Browse Templates
              </Link>
            </div>
            
            <div className="pt-4">
              <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-xl">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                      <img
                        className="relative inline-block h-10 w-10 rounded-full ring-2 ring-white transform hover:scale-110 transition-transform duration-300"
                        src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">4,000+</span> resumes created
                  </div>
                  <div className="text-sm text-gray-500">This week</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Right Content - Resume Preview */}
          <div className={`lg:w-1/2 transition-all duration-700 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative">
              {/* Enhanced decorative elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-30 blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-indigo-400 to-pink-400 rounded-full opacity-30 blur-2xl animate-pulse delay-700"></div>
              
              {/* Enhanced Resume mockup */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition-all duration-300 hover:shadow-blue-200">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                <div className="p-6">
                  {/* Resume content remains the same but with enhanced styling */}
                  {/* ... existing resume content ... */}
                </div>
              </div>
              
              {/* Enhanced second resume mockup */}
              <div className="absolute top-10 -right-10 w-3/4 h-full bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl -z-10 transform -rotate-3 hover:rotate-0 transition-all duration-300"></div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Features section */}
        <div className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {[
            {
              icon: (
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              ),
              title: "Easy to Use",
              description: "Our intuitive builder makes creating a professional resume simple and fast."
            },
            // ... other features
          ].map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-lg inline-block group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;