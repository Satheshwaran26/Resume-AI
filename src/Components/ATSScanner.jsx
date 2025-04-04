import React, { useState } from 'react';
import { FaUpload, FaCheckCircle, FaTimesCircle, FaDownload, FaClipboard } from 'react-icons/fa';

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
          readability: 'High'
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
          <div className="bg-white shadow-xl rounded-xl p-8 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <div className="inline-block rounded-full p-4 bg-indigo-100 mb-4">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {results.score}%
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">ATS Compatibility Score</h2>
              <p className="text-gray-600">
                {results.score >= 80 ? 'Excellent!' : results.score >= 60 ? 'Good, but could be improved' : 'Needs improvement'}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-indigo-800 mb-3">Keywords Matched</h3>
                <div className="flex flex-wrap gap-2">
                  {results.keywords.matched.map((keyword, index) => (
                    <span key={`matched-${index}`} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-indigo-800 mb-3">Missing Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {results.keywords.missing.map((keyword, index) => (
                    <span key={`missing-${index}`} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Improvement Suggestions</h3>
              <div className="bg-white border border-gray-200 rounded-lg">
                {results.suggestions.map((suggestion, index) => (
                  <div key={index} className={`p-4 ${index !== results.suggestions.length - 1 ? 'border-b border-gray-200' : ''}`}>
                    <div className="flex items-start">
                      <FaCheckCircle className="text-indigo-500 mt-1 mr-3 flex-shrink-0" />
                      <p className="text-gray-700">{suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium">
                <FaDownload className="mr-2" /> Download Report
              </button>
              <button 
                className="flex items-center px-6 py-3 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium"
                onClick={() => {
                  setResults(null);
                  setFile(null);
                  setJobDescription('');
                }}
              >
                Scan Another Resume
              </button>
            </div>
          </div>
        )}
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Use Our ATS Scanner?</h3>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-indigo-600 text-3xl mb-3">🎯</div>
              <h4 className="text-xl font-semibold mb-2">Keyword Optimization</h4>
              <p className="text-gray-600">Identify missing keywords from the job description to optimize your resume.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-indigo-600 text-3xl mb-3">📊</div>
              <h4 className="text-xl font-semibold mb-2">Format Analysis</h4>
              <p className="text-gray-600">Ensure your resume format is ATS-friendly and easily parsed by automated systems.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
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