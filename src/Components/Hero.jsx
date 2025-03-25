import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      {/* Modern background elements */}
      <div className="absolute inset-0">
        <div className="absolute w-[1200px] h-[1200px] -top-40 -right-40 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-[1000px] h-[1000px] -bottom-40 -left-40 bg-gradient-to-tr from-pink-50 to-indigo-50 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAwNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Hero Content */}
        <div className="grid lg:grid-cols-2 gap-20 items-center min-h-screen">
          {/* Left Content */}
          <div className={`space-y-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-gray-100">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-800 tracking-wider font-medium">CRAFT YOUR PERFECT RESUME</span>
            </div>

            <div className="space-y-8">
              <h1 className="text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.1]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 animate-gradient-x">Build Your</span>
                <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Dream Career</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-xl font-light leading-relaxed">
                Create professional resumes that stand out. Our AI-powered platform helps you craft the perfect resume for your dream job.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                to="/builder"
                className="group relative inline-flex items-center justify-center">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                <span className="relative flex items-center px-8 py-4 bg-black text-white rounded-xl text-sm tracking-wider font-medium">
                  START BUILDING NOW
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>

              <Link
                to="/templates"
                className="px-8 py-4 bg-white/80 backdrop-blur-xl text-gray-800 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 text-sm tracking-wider font-medium shadow-sm group"
              >
                EXPLORE TEMPLATES
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  →
                </span>
              </Link>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-12 pt-12 border-t border-gray-100">
              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">100K<span className="text-gray-400">+</span></div>
                <div className="text-sm text-gray-500 tracking-wider mt-2 font-medium">RESUMES CREATED</div>
              </div>
              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">95<span className="text-gray-400">%</span></div>
                <div className="text-sm text-gray-500 tracking-wider mt-2 font-medium">SUCCESS RATE</div>
              </div>
              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">4.9<span className="text-gray-400">/5</span></div>
                <div className="text-sm text-gray-500 tracking-wider mt-2 font-medium">USER RATING</div>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Preview */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative">
              {/* Main Preview */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-white rounded-2xl p-4 border border-gray-200 shadow-xl transform group-hover:scale-[1.01] transition-all duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3"
                    alt="Resume Builder Interface"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>

              {/* Enhanced Floating Elements */}
              <div className="absolute -right-6 -bottom-6 bg-white rounded-xl p-4 z-20 border border-gray-200 shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <img
                        key={i}
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white border border-gray-200 shadow-sm"
                        src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`}
                        alt=""
                      />
                    ))}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Trusted by</div>
                    <div className="text-sm text-gray-500">Industry Leaders</div>
                  </div>
                </div>
              </div>

              <div className="absolute -left-6 -top-6 bg-white rounded-xl p-4 z-20 border border-gray-200 shadow-lg transform hover:translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">ATS-Optimized</div>
                    <div className="text-sm text-gray-500">Templates</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
