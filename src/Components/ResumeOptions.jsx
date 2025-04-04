import React from 'react';
import { Link } from 'react-router-dom';
import { FaRobot, FaEdit } from 'react-icons/fa';

const ResumeOptions = () => {
  return (
    <div className="min-h-screen pt-28 pb-16 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Choose How To Build Your Resume
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the approach that works best for you to create a professional, ATS-optimized resume.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* AI-Powered Resume Creation */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="h-4 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
            <div className="p-8">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-indigo-100 mx-auto mb-6">
                <FaRobot className="text-indigo-600 text-4xl" />
              </div>
              
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Create with AI</h2>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Answer a few simple questions</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">AI generates professional content</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Tailored to your industry</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">ATS-optimized automatically</span>
                </li>
              </ul>
              
              <div className="text-center">
                <Link
                  to="/ai-builder"
                  className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition duration-300"
                >
                  Create with AI
                </Link>
              </div>
            </div>
          </div>
          
          {/* Manual Resume Creation */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl">
            <div className="h-4 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
            <div className="p-8">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-indigo-100 mx-auto mb-6">
                <FaEdit className="text-indigo-600 text-4xl" />
              </div>
              
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Manual Resume</h2>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Choose from professional templates</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Complete control over content</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Edit and customize to your needs</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Format suggestions for ATS optimization</span>
                </li>
              </ul>
              
              <div className="text-center">
                <Link
                  to="/templates"
                  className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition duration-300"
                >
                  Choose Template
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Not sure which option is right for you? <a href="#" className="text-indigo-600 hover:underline">Learn more about our resume creation tools</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeOptions;
