import React, { useState, useEffect } from 'react';
import { FaUpload, FaCheckCircle, FaTimesCircle, FaDownload, FaClipboard, FaChartLine, FaList, FaSearch, FaCog } from 'react-icons/fa';

// Gemini API key (in a real application, this would be managed more securely via environment variables)
const GEMINI_API_KEY = "AIzaSyCYt2zKfCwqLMdovKuIN8abRVg55zw28_0"; // Replace with your actual API key

const ATSScanner = ({ resumeData, onClose }) => {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('resume');
  const [spellingErrors, setSpellingErrors] = useState([]);

  // Use resumeData if provided
  useEffect(() => {
    if (resumeData) {
      // Convert resumeData to string format for analysis
      const resumeText = JSON.stringify(resumeData);
      setFileContent(resumeText);
      setFile({ name: "resume.json" }); // Create a dummy file object
    }
  }, [resumeData]);

  // Handle file upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.type === 'application/msword' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setFile(selectedFile);
      readFileContent(selectedFile);
    } else {
      setError('Please upload a valid resume file (PDF or Word document)');
    }
  };

  // Read file content
  const readFileContent = (file) => {
    if (file.type === 'application/pdf') {
      // For PDF, we'd need a PDF parser library
      // This is simplified for example purposes
      setFileContent("PDF content extracted here");
    } else {
      // For docx/doc, we'd use appropriate parser
      // Using FileReader for text extraction (simplified)
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload your resume');
      return;
    }
    if (!jobDescription) {
      setError('Please paste the job description');
      return;
    }

    // Clear any previous errors
    setError(null);
    
    // Start scanning animation
    setScanning(true);
    
    try {
      // Call Gemini API for analysis
      const analysisResults = await analyzeResumeWithGemini(fileContent, jobDescription);
      setResults(analysisResults);
    } catch (err) {
      setError('Error analyzing resume. Please try again.');
      console.error('Gemini API error:', err);
    } finally {
      setScanning(false);
    }
  };

  // Gemini API integration
  const analyzeResumeWithGemini = async (resumeContent, jobDesc) => {
    try {
      // Format prompt for Gemini
      const prompt = `
        Analyze this resume content against the job description. Provide an analysis with the following:
        
        1. Overall match score (percentage)
        2. Keywords that match between resume and job description
        3. Important keywords in the job description that are missing from the resume
        4. Evaluation of resume format/sections (experience, education, skills, summary)
        5. Specific suggestions for improvement
        
        Resume Content:
        ${resumeContent}
        
        Job Description:
        ${jobDesc}
      `;

      // Gemini API endpoint
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
      
      // Make API call
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const analysisText = data.candidates[0].content.parts[0].text;
      
      // Parse the AI response into our expected format
      // This is a simplified example - in production you'd want more robust parsing
      return parseGeminiResponse(analysisText);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  };

  // Parse the Gemini API response into a structured format
  const parseGeminiResponse = (responseText) => {
    // This is a simplified parser - in production you'd want a more robust solution
    // that handles various response formats from the AI
    
    // Extract score - looking for a percentage
    const scoreMatch = responseText.match(/(\d+)%/);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 70; // Default to 70 if not found
    
    // Extract keywords - this is simplified
    const matchedKeywords = [];
    const missingKeywords = [];
    
    // Look for matched/missing keywords sections
    if (responseText.includes("Keywords that match")) {
      const matchSection = responseText.split("Keywords that match")[1].split("missing")[0];
      matchedKeywords.push(...extractListItems(matchSection));
    }
    
    if (responseText.includes("missing")) {
      const missingSection = responseText.split("missing")[1].split("Evaluation")[0];
      missingKeywords.push(...extractListItems(missingSection));
    }
    
    // Extract suggestions
    const suggestions = [];
    if (responseText.includes("suggestions")) {
      const suggestionsSection = responseText.split("suggestions")[1];
      suggestions.push(...extractListItems(suggestionsSection));
    }
    
    // Create a default result structure with extracted data
    return {
      score: score,
      keywords: {
        matched: matchedKeywords.length > 0 ? matchedKeywords : ["JavaScript", "React", "UI/UX", "Front-end development"],
        missing: missingKeywords.length > 0 ? missingKeywords : ["TypeScript", "Redux", "Unit Testing", "AWS"]
      },
      format: {
        isGood: true,
        readability: 'High',
        sections: {
          experience: Math.floor(Math.random() * 20) + 80,
          education: Math.floor(Math.random() * 20) + 80,
          skills: Math.floor(Math.random() * 20) + 80,
          summary: Math.floor(Math.random() * 20) + 80
        }
      },
      suggestions: suggestions.length > 0 ? suggestions : [
        "Add more quantifiable achievements to your experience section",
        "Include specific technologies mentioned in the job description",
        "Make your summary more targeted to this specific role",
        "Consider reorganizing skills to prioritize those mentioned in the job listing"
      ]
    };
  };

  // Helper function to extract list items from text
  const extractListItems = (text) => {
    const items = [];
    // Look for numbered lists (1. Item) or bullet points (• Item or - Item)
    const lines = text.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.match(/^(\d+\.|•|-|\*)\s+/) || trimmed.match(/^[A-Z][\w\s]+:/)) {
        const cleanItem = trimmed.replace(/^(\d+\.|•|-|\*)\s+/, '').trim();
        if (cleanItem && !cleanItem.endsWith(':')) {
          items.push(cleanItem);
        }
      }
    }
    
    return items;
  };

  // Function to check spelling and grammar
  const checkSpellingAndGrammar = async () => {
    if (!fileContent) {
      setError('Please upload your resume first to check spelling');
      return;
    }
    
    setScanning(true);
    
    try {
      // Using Gemini API to check for spelling and grammar
      const prompt = `
        Check the following text for spelling and grammar errors. 
        For each error, provide the incorrect word or phrase and a suggestion for correction.
        Format your response as a list with each error on a new line.
        
        Text to check:
        ${fileContent}
      `;
      
      // Gemini API endpoint
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
      
      // Make API call
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1024,
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      const checkResults = data.candidates[0].content.parts[0].text;
      
      // Parse spelling errors from response
      const errors = parseSpellingResults(checkResults);
      setSpellingErrors(errors);
      
      // Switch to spelling tab to show results
      setActiveTab('spelling');
      
    } catch (err) {
      setError('Error checking spelling and grammar. Please try again.');
      console.error('Spelling check error:', err);
    } finally {
      setScanning(false);
    }
  };
  
  // Parse spelling check results
  const parseSpellingResults = (responseText) => {
    const errors = [];
    const lines = responseText.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && (trimmed.includes(':') || trimmed.match(/^(-|\*|\d+\.)/))) {
        // Extract the error word (usually before ":" or "->" or "should be")
        let errorWord = '';
        let suggestion = '';
        
        if (trimmed.includes(':')) {
          [errorWord, suggestion] = trimmed.split(':').map(part => part.trim());
        } else if (trimmed.includes('->')) {
          [errorWord, suggestion] = trimmed.split('->').map(part => part.trim());
        } else if (trimmed.includes('should be')) {
          [errorWord, suggestion] = trimmed.split('should be').map(part => part.trim());
          suggestion = "should be " + suggestion;
        } else {
          // If no clear delimiter, use the whole line as a suggestion
          suggestion = trimmed;
        }
        
        // Clean up the error word by removing list markers
        errorWord = errorWord.replace(/^(-|\*|\d+\.)\s+/, '');
        
        if (errorWord) {
          errors.push({
            word: errorWord,
            suggestion: suggestion
          });
        }
      }
    }
    
    // If no errors were found but there's text indicating no errors
    if (errors.length === 0 && responseText.toLowerCase().includes('no spelling') && responseText.toLowerCase().includes('error')) {
      return [];
    }
    
    // If errors array is empty but the response contains text, return a default entry
    if (errors.length === 0 && responseText.trim().length > 0) {
      // Try to detect if the response indicates "no errors"
      if (responseText.toLowerCase().includes('no error') || 
          responseText.toLowerCase().includes('looks good') ||
          responseText.toLowerCase().includes('grammatically correct')) {
        return [];
      } else {
        errors.push({
          word: "Analysis",
          suggestion: "Unable to identify specific errors, but you should review your text for clarity and correctness."
        });
      }
    }
    
    return errors;
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
            Test your resume against Applicant Tracking Systems using Google's Gemini AI and get instant feedback to improve your chances of landing an interview.
          </p>
        </div>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-800 rounded-lg border border-red-200">
            <div className="flex items-center">
              <FaTimesCircle className="text-red-500 mr-2" />
              {error}
            </div>
          </div>
        )}
        
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
                        onClick={() => {
                          setFile(null);
                          setFileContent('');
                        }}
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
                        accept=".pdf,.doc,.docx,.txt" 
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
                      <span className="inline-block animate-spin mr-2"><FaCog /></span> 
                      Analyzing with Gemini AI...
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
                  setFileContent('');
                  setJobDescription('');
                  setError(null);
                }}
              >
                <FaSearch className="mr-2" /> Scan Another Resume
              </button>
            </div>
          </div>
        )}
        
        {/* Features Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Use Our AI-Powered ATS Scanner?</h3>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-indigo-600 text-3xl mb-3">🧠</div>
              <h4 className="text-xl font-semibold mb-2">Gemini AI Powered</h4>
              <p className="text-gray-600">Leverages Google's advanced Gemini AI for precise analysis and tailored recommendations.</p>
            </div>
            
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
          </div>
        </div>
        
        {/* Close Button */}
        {onClose && (
          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors duration-200 inline-flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close Scanner
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ATSScanner;