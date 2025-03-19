import React from 'react';

const ProfessionalClassic = ({ data }) => {
  const {
    personalInfo = {},
    experience = [],
    education = [],
    skills = [],
    languages = [],
    certifications = []
  } = data || {};

  return (
    <div className="bg-white w-full max-w-[800px] mx-auto shadow-lg">
      {/* Header */}
      <div className="bg-blue-800 text-white px-8 py-6">
        <h1 className="text-3xl font-bold">{personalInfo.firstName || 'John'} {personalInfo.lastName || 'Doe'}</h1>
        <p className="text-xl mt-1">{personalInfo.title || 'Professional Title'}</p>
        
        <div className="flex flex-wrap mt-3 text-sm">
          {personalInfo.email && (
            <div className="mr-4 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="mr-4 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.address && (
            <div className="mr-4 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{personalInfo.address}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="px-8 py-6">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-800 pb-1 mb-3">Professional Summary</h2>
            <p className="text-gray-700">{personalInfo.summary}</p>
          </div>
        )}
        
        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-800 pb-1 mb-3">Work Experience</h2>
            
            {experience.map((job, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{job.position}</h3>
                  <span className="text-sm text-gray-600">
                    {job.startDate} - {job.current ? 'Present' : job.endDate}
                  </span>
                </div>
                <p className="text-gray-800 font-medium">{job.company}</p>
                <p className="text-gray-700 mt-2">{job.description}</p>
                
                {job.achievements && job.achievements.length > 0 && (
                  <ul className="list-disc list-inside mt-2 text-gray-700">
                    {job.achievements.map((achievement, i) => (
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
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-800 pb-1 mb-3">Education</h2>
            
            {education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                <p className="text-gray-800 font-medium">{edu.institution}</p>
                {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
              </div>
            ))}
          </div>
        )}
        
        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-800 pb-1 mb-3">Skills</h2>
            <div className="flex flex-wrap">
              {skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-800 pb-1 mb-3">Languages</h2>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((language, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-medium">{language.name}</span>
                  <span className="text-gray-600">{language.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-800 pb-1 mb-3">Certifications</h2>
            
            {certifications.map((cert, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <span className="text-sm text-gray-600">{cert.date}</span>
                </div>
                <p className="text-gray-700">{cert.issuer}</p>
                {cert.description && <p className="text-gray-600 text-sm">{cert.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalClassic; 