import React, { useState } from 'react';
import { FaUpload, FaCheckCircle, FaTimesCircle, FaDownload, FaClipboard, FaChartLine, FaList, FaSearch } from 'react-icons/fa';

const ATSScanner = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState(null);

  // Handle file upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.type === 'application/msword' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setFile(selectedFile);
    } else {
      alert('Please upload a valid resume file (PDF or Word document)');
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please upload your resume');
      return;
    }
    if (!jobDescription) {
      alert('Please paste the job description');
      return;
    }

    // Start scanning animation
    setScanning(true);
    
    // Mock API call - in a real app, you would send to a backend
    setTimeout(() => {
      // Mock results
      setResults({
        score: 78,
        keywords: {
          matched: ['React', 'JavaScript', 'API integration', 'responsive design'],
          missing: ['TypeScript', 'Redux', 'Unit Testing', 'AWS']
        },
        format: {
          isGood: true,
          readability: 'High',
          sections: {
            experience: 90,
            education: 85,
            skills: 95,
            summary: 80
          }
        },
        suggestions: [
          'Add experience with TypeScript to your resume',
          'Include examples of Redux state management',
          'Highlight any unit testing experience',
          'Mention any AWS or cloud experience you have'
        ]
      });
      setScanning(false);
    }, 2000);
  };

  // Circular progress component
  const CircularProgress = ({ percentage, size = 200, strokeWidth = 15 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90 w-full h-full">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#gradient-${percentage})`}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id={`gradient-${percentage}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={percentage >= 80 ? "#4F46E5" : percentage >= 60 ? "#8B5CF6" : "#EF4444"} />
              <stop offset="100%" stopColor={percentage >= 80 ? "#818CF8" : percentage >= 60 ? "#A78BFA" : "#F87171"} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {percentage}%
          </span>
          <span className="text-gray-500 text-sm mt-1">ATS Score</span>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-28 pb-16 min-h-screen bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            ATS Resume Scanner
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Test your resume against Applicant Tracking Systems and get instant feedback to improve your chances of landing an interview.
          </p>
        </div>
        
        {!results ? (
          <div className="bg-white shadow-xl rounded-xl p-8 max-w-4xl mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Your Resume</h2>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center ${file ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-indigo-500 bg-gray-50'}`}>
                  {file ? (
                    <div className="flex items-center justify-center space-x-3">
                      <FaCheckCircle className="text-green-500 text-xl" />
                      <span className="text-green-700">{file.name} uploaded successfully</span>
                      <button 
                        type="button" 
                        className="ml-2 text-red-500 hover:text-red-700" 
                        onClick={() => setFile(null)}
                      >
                        <FaTimesCircle />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center">
                      <FaUpload className="text-indigo-500 text-4xl mb-2" />
                      <span className="text-gray-600 mb-1">Drag & drop your resume or click to browse</span>
                      <span className="text-gray-400 text-sm">Supported formats: PDF, DOCX</span>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept=".pdf,.doc,.docx" 
                        onChange={handleFileChange} 
                      />
                    </label>
                  )}
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Paste Job Description</h2>
                <textarea 
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-64 resize-none"
                  placeholder="Paste the job description here to compare with your resume..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                ></textarea>
              </div>
              
              <div className="text-center">
                <button 
                  type="submit" 
                  className={`px-8 py-3 rounded-lg font-semibold text-white text-lg ${scanning ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                  disabled={scanning}
                >
                  {scanning ? (
                    <>
                      <span className="inline-block animate-spin mr-2">⟳</span> 
                      Analyzing Resume...
                    </>
                  ) : (
                    'Scan My Resume'
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-xl p-8 max-w-5xl mx-auto">
            {/* Results Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Main Score */}
              <div className="lg:col-span-1 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white to-indigo-50 rounded-xl shadow-lg">
                <CircularProgress percentage={results.score} />
                <div className="mt-4 text-center">
                  <p className="text-gray-600">
                    {results.score >= 80 ? 'Excellent Match!' : 
                     results.score >= 60 ? 'Good Match' : 'Needs Improvement'}
                  </p>
                </div>
              </div>

              {/* Section Scores */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(results.format.sections).map(([section, score]) => (
                  <div key={section} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold capitalize">{section}</h3>
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                        score >= 90 ? 'bg-green-100 text-green-800' :
                        score >= 70 ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {score}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          score >= 90 ? 'bg-green-500' :
                          score >= 70 ? 'bg-blue-500' :
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Keywords Analysis */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                <div className="flex items-center gap-2 mb-4">
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <h3 className="text-lg font-semibold text-green-800">Keywords Matched</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {results.keywords.matched.map((keyword, index) => (
                    <span key={`matched-${index}`} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-xl border border-red-100">
                <div className="flex items-center gap-2 mb-4">
                  <FaTimesCircle className="text-red-500 text-xl" />
                  <h3 className="text-lg font-semibold text-red-800">Missing Keywords</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {results.keywords.missing.map((keyword, index) => (
                    <span key={`missing-${index}`} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Improvement Suggestions */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <FaList className="text-indigo-500 text-xl" />
                <h3 className="text-lg font-semibold text-gray-800">Improvement Suggestions</h3>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                {results.suggestions.map((suggestion, index) => (
                  <div key={index} className={`p-4 ${index !== results.suggestions.length - 1 ? 'border-b border-indigo-100' : ''}`}>
                    <div className="flex items-start">
                      <FaChartLine className="text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                      <p className="text-gray-700">{suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button className="flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                <FaDownload className="mr-2" /> Download Report
              </button>
              <button 
                className="flex items-center px-6 py-3 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-all duration-300"
                onClick={() => {
                  setResults(null);
                  setFile(null);
                  setJobDescription('');
                }}
              >
                <FaSearch className="mr-2" /> Scan Another Resume
              </button>
            </div>
          </div>
        )}
        
        {/* Features Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Use Our ATS Scanner?</h3>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-indigo-600 text-3xl mb-3">🎯</div>
              <h4 className="text-xl font-semibold mb-2">Keyword Optimization</h4>
              <p className="text-gray-600">Identify missing keywords from the job description to optimize your resume.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-indigo-600 text-3xl mb-3">📊</div>
              <h4 className="text-xl font-semibold mb-2">Format Analysis</h4>
              <p className="text-gray-600">Ensure your resume format is ATS-friendly and easily parsed by automated systems.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-indigo-600 text-3xl mb-3">🚀</div>
              <h4 className="text-xl font-semibold mb-2">Success Rate</h4>
              <p className="text-gray-600">Candidates who optimize their resumes are 3x more likely to get interviews.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSScanner;