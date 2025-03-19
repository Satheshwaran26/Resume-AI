import React from 'react';

const ModernMinimal = ({ data }) => {
  const {
    personalInfo = {},
    experience = [],
    education = [],
    skills = [],
    languages = [],
    certifications = []
  } = data || {};

  return (
    <div className="bg-white w-full max-w-[800px] mx-auto shadow-lg flex">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-100 p-6">
        {/* Profile */}
        <div className="text-center mb-6">
          <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-600">
            {personalInfo.firstName && personalInfo.lastName ? (
              <span className="text-3xl font-bold">
                {personalInfo.firstName.charAt(0)}{personalInfo.lastName.charAt(0)}
              </span>
            ) : (
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <h1 className="text-xl font-bold">{personalInfo.firstName || 'John'} {personalInfo.lastName || 'Doe'}</h1>
          <p className="text-gray-600">{personalInfo.title || 'Professional Title'}</p>
        </div>
        
        {/* Contact */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 text-gray-800">Contact</h2>
          
          {personalInfo.email && (
            <div className="flex items-center mb-2">
              <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="text-sm">{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center mb-2">
              <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-sm">{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.address && (
            <div className="flex items-center mb-2">
              <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">{personalInfo.address}</span>
            </div>
          )}
        </div>
        
        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-gray-800">Skills</h2>
            <div>
              {skills.map((skill, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-xs text-gray-600">{skill.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-gray-600 h-1.5 rounded-full" 
                      style={{ 
                        width: skill.level === 'Beginner' ? '25%' : 
                               skill.level === 'Intermediate' ? '50%' : 
                               skill.level === 'Advanced' ? '75%' : 
                               skill.level === 'Expert' ? '100%' : '50%' 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-gray-800">Languages</h2>
            <div>
              {languages.map((language, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{language.name}</span>
                    <span className="text-xs text-gray-600">{language.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-gray-600 h-1.5 rounded-full" 
                      style={{ 
                        width: language.level === 'Beginner' ? '25%' : 
                               language.level === 'Intermediate' ? '50%' : 
                               language.level === 'Advanced' ? '75%' : 
                               language.level === 'Fluent' ? '100%' : '50%' 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 text-gray-800">Certifications</h2>
            <div>
              {certifications.map((cert, index) => (
                <div key={index} className="mb-3">
                  <h3 className="text-sm font-semibold">{cert.name}</h3>
                  <p className="text-xs text-gray-600">{cert.issuer} • {cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="w-2/3 p-6">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-gray-800 border-b border-gray-200 pb-2">About Me</h2>
            <p className="text-gray-700 text-sm">{personalInfo.summary}</p>
          </div>
        )}
        
        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-gray-800 border-b border-gray-200 pb-2">Experience</h2>
            
            {experience.map((job, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-semibold">{job.position}</h3>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {job.startDate} - {job.current ? 'Present' : job.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-800 mb-1">{job.company}</p>
                <p className="text-xs text-gray-700">{job.description}</p>
                
                {job.achievements && job.achievements.length > 0 && (
                  <ul className="list-disc list-inside mt-1 text-xs text-gray-700">
                    {job.achievements.filter(a => a).map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 text-gray-800 border-b border-gray-200 pb-2">Education</h2>
            
            {education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-semibold">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-800 mb-1">{edu.institution}</p>
                {edu.description && <p className="text-xs text-gray-700">{edu.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernMinimal; 