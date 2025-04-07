import React from 'react';
import { Link } from 'react-router-dom';
import { FaRobot, FaEdit, FaFileAlt } from 'react-icons/fa';

const ResumeOptions = () => {
  return (
    <section className="relative min-h-screen pt-28 pb-16 overflow-hidden bg-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-24 left-1/4 w-[800px] h-[800px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-[800px] h-[800px] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_110%)] opacity-5"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center font-normal space-x-2 px-4 py-2 rounded-full bg-blur mb-6 shadow-sm border border-gray-400/20">
            <FaFileAlt className="h-4 w-4" />
            <span className="text-sm font-light">Resume Creation Options</span>
          </div>
          
          <h1 className="text-[2.5em] md:text-6xl font-extralight text-gray-900 mb-6 leading-tight">
            Choose How To Build Your 
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient"> Resume</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Select the approach that works best for you to create a professional, ATS-optimized resume.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* AI-Powered Resume Creation */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl border border-gray-100">
            <div className="h-1 bg-indigo-600"></div>
            <div className="p-8">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-indigo-100 mx-auto mb-6">
                <FaRobot className="text-indigo-600 text-3xl" />
              </div>
              
              <h2 className="text-2xl font-light text-center text-gray-900 mb-5">Create with AI</h2>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 font-light">Answer a few simple questions</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 font-light">AI generates professional content</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 font-light">Tailored to your industry</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 font-light">ATS-optimized automatically</span>
                </li>
              </ul>
              
              <div className="text-center">
                <Link
                  to="/ai-builder"
                  className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition duration-200"
                >
                  Create with AI
                </Link>
              </div>
            </div>
          </div>
          
          {/* Manual Resume Creation */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl border border-gray-100">
            <div className="h-1 bg-indigo-600"></div>
            <div className="p-8">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-indigo-100 mx-auto mb-6">
                <FaEdit className="text-indigo-600 text-3xl" />
              </div>
              
              <h2 className="text-2xl font-light text-center text-gray-900 mb-5">Manual Resume</h2>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 font-light">Choose from professional templates</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 font-light">Complete control over content</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 font-light">Edit and customize to your needs</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 font-light">Format suggestions for ATS optimization</span>
                </li>
              </ul>
              
              <div className="text-center">
                <Link
                  to="/templates"
                  className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition duration-200"
                >
                  Choose Template
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-14">
          <p className="text-gray-600 font-light">
            Not sure which option is right for you? <a href="#" className="text-indigo-600 hover:text-indigo-800 hover:underline transition duration-200">Learn more about our resume creation tools</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResumeOptions;
