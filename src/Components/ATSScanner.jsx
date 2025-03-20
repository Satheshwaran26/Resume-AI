import React, { useState } from 'react';

const ATSScanner = ({ resumeData, onClose }) => {
  const [scanResults, setScanResults] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const scanResume = () => {
    setIsScanning(true);
    
    // Simulate ATS scanning (in a real app, this would call an AI service)
    setTimeout(() => {
      const results = {
        score: calculateATSScore(resumeData),
        recommendations: generateRecommendations(resumeData),
        keywordMatch: analyzeKeywords(resumeData),
        formatting: checkFormatting(resumeData)
      };
      
      setScanResults(results);
      setIsScanning(false);
    }, 2000);
  };

  const calculateATSScore = (data) => {
    let score = 0;
    const maxScore = 100;
    
    // Check for essential sections
    if (data.personalInfo.email) score += 10;
    if (data.personalInfo.phone) score += 10;
    if (data.experience.length > 0) score += 20;
    if (data.education.length > 0) score += 15;
    if (data.skills.length > 0) score += 15;
    if (data.personalInfo.summary) score += 10;
    
    // Additional points for completeness
    const hasDetailedExperience = data.experience.every(exp => 
      exp.company && exp.position && exp.description && exp.startDate
    );
    if (hasDetailedExperience) score += 10;
    
    const hasDetailedEducation = data.education.every(edu =>
      edu.institution && edu.degree && edu.startDate
    );
    if (hasDetailedEducation) score += 10;

    return Math.min(score, maxScore);
  };

  const generateRecommendations = (data) => {
    const recommendations = [];

    // Check personal info
    if (!data.personalInfo.email || !data.personalInfo.phone) {
      recommendations.push("Add contact information (email and phone) for better visibility");
    }

    // Check experience descriptions
    data.experience.forEach((exp, index) => {
      if (!exp.description || exp.description.length < 50) {
        recommendations.push(`Add more details to work experience #${index + 1}`);
      }
    });

    // Check skills
    if (data.skills.length < 5) {
      recommendations.push("Add more relevant skills to improve keyword matching");
    }

    // Check summary
    if (!data.personalInfo.summary || data.personalInfo.summary.length < 100) {
      recommendations.push("Add a detailed professional summary");
    }

    return recommendations;
  };

  const analyzeKeywords = (data) => {
    // Common ATS keywords (this would be more comprehensive in a real app)
    const commonKeywords = [
      'managed', 'developed', 'led', 'created', 'implemented',
      'team', 'project', 'success', 'improvement', 'results',
      'experience', 'skills', 'leadership', 'achievement'
    ];

    const foundKeywords = new Set();
    const missingKeywords = new Set(commonKeywords);

    // Check experience descriptions
    data.experience.forEach(exp => {
      commonKeywords.forEach(keyword => {
        if (exp.description?.toLowerCase().includes(keyword.toLowerCase())) {
          foundKeywords.add(keyword);
          missingKeywords.delete(keyword);
        }
      });
    });

    return {
      found: Array.from(foundKeywords),
      missing: Array.from(missingKeywords)
    };
  };

  const checkFormatting = (data) => {
    const issues = [];

    // Check for proper date formatting
    data.experience.forEach((exp, index) => {
      if (!exp.startDate || !exp.endDate && !exp.current) {
        issues.push(`Missing dates in experience #${index + 1}`);
      }
    });

    // Check for proper capitalization in titles
    if (data.personalInfo.title && 
        data.personalInfo.title === data.personalInfo.title.toLowerCase()) {
      issues.push("Professional title should be properly capitalized");
    }

    // Check for proper section organization
    if (!data.experience.length || !data.education.length) {
      issues.push("Essential sections (Experience/Education) are missing");
    }

    return issues;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">ATS Resume Scanner</h2>
        <p className="text-gray-600">
          Analyze your resume for ATS (Applicant Tracking System) compatibility
        </p>
      </div>

      {!scanResults && (
        <button
          onClick={scanResume}
          disabled={isScanning}
          className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-300 flex items-center justify-center gap-2"
        >
          {isScanning ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Scanning Resume...
            </>
          ) : (
            'Scan Resume'
          )}
        </button>
      )}

      {scanResults && (
        <div className="space-y-6">
          {/* Score Section */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-purple-100">
              <div className="text-3xl font-bold text-purple-600">{scanResults.score}%</div>
            </div>
            <p className="mt-2 text-gray-600">ATS Compatibility Score</p>
          </div>

          {/* Recommendations */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Recommendations</h3>
            <ul className="space-y-2">
              {scanResults.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-yellow-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          {/* Keyword Analysis */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Keyword Analysis</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Found Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {scanResults.keywordMatch.found.map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Suggested Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {scanResults.keywordMatch.missing.map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Formatting Issues */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Formatting Check</h3>
            {scanResults.formatting.length > 0 ? (
              <ul className="space-y-2">
                {scanResults.formatting.map((issue, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {issue}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-green-600 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                No formatting issues detected
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                setScanResults(null);
                scanResume();
              }}
              className="flex-1 py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Scan Again
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSScanner; 