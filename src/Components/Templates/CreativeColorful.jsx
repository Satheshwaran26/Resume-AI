import React from 'react';


const CreativeColorful = ({ data }) => {
  const {
    personalInfo = {},
    experience = [],
    education = [],
    skills = [],
    languages = [],
    certifications = [],
    projects = []
  } = data || {};

  return (
    <div className="bg-white w-full max-w-[800px] mx-auto shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full -ml-10 -mb-10"></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl font-bold">{personalInfo.firstName || 'John'} {personalInfo.lastName || 'Doe'}</h1>
          <p className="text-xl mt-2 text-purple-200">{personalInfo.title || 'Professional Title'}</p>
          
          <div className="mt-6 flex flex-wrap items-center">
            {personalInfo.email && (
              <div className="mr-6 flex items-center mb-2">
                <svg className="w-5 h-5 mr-2 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo.phone && (
              <div className="mr-6 flex items-center mb-2">
                <svg className="w-5 h-5 mr-2 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.address && (
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 mr-2 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{personalInfo.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-8">
        {/* Two Column Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column */}
          <div className="md:w-2/3">
            {/* Summary */}
            {personalInfo.summary && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-purple-600 mb-4">About Me</h2>
                <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
              </div>
            )}
            
            {/* Experience */}
            {experience.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-purple-600 mb-4">Work Experience</h2>
                
                {experience.map((job, index) => (
                  <div key={index} className="mb-6 relative pl-6 border-l-2 border-purple-200">
                    <div className="absolute left-[-8px] top-0 w-3.5 h-3.5 bg-purple-600 rounded-full"></div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-800">{job.position}</h3>
                        <span className="text-sm font-medium text-white bg-purple-600 px-3 py-1 rounded-full">
                          {job.startDate} - {job.current ? 'Present' : job.endDate}
                        </span>
                      </div>
                      <p className="text-lg text-purple-600">{job.company}</p>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{job.description}</p>
                    
                    {job.achievements && job.achievements.length > 0 && (
                      <ul className="space-y-1">
                        {job.achievements.filter(a => a).map((achievement, i) => (
                          <li key={i} className="text-gray-700 flex items-start">
                            <svg className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Projects */}
            {projects && projects.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-purple-600 mb-4">Projects</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project, index) => (
                    <div key={index} className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{project.name}</h3>
                      <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                      
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {project.technologies.filter(t => t).map((tech, i) => (
                            <span key={i} className="text-xs bg-purple-200 text-purple-800 px-2 py-0.5 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-purple-600 text-sm font-medium hover:underline inline-flex items-center"
                        >
                          View Project
                          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column */}
          <div className="md:w-1/3">
            {/* Education */}
            {education.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-purple-600 mb-3">Education</h2>
                
                {education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
                    {edu.field && <p className="text-purple-600">{edu.field}</p>}
                    <p className="text-gray-700">{edu.institution}</p>
                    <p className="text-sm text-gray-600">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </p>
                    {edu.description && <p className="text-sm text-gray-700 mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            )}
            
            {/* Skills */}
            {skills.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-purple-600 mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full text-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeColorful; 