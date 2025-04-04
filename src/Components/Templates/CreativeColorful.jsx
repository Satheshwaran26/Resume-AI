import React from 'react';

const CreativeColorful = ({ data }) => {
  const {
    personalInfo,
    experience,
    education,
    skills,
    languages,
    certifications,
    projects,
    declaration,
    others
  } = data;

  return (
    <div className="min-h-[1056px] p-8 bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header with colorful accent */}
      <div className="relative mb-12 pb-8 border-b-4 border-gradient-to-r from-purple-400 via-pink-400 to-red-400">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-xl font-medium text-purple-600 mb-4">{personalInfo.title}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {personalInfo.phone}
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {personalInfo.address}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1 space-y-8">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-bold text-purple-600 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill.id}
                    className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-bold text-blue-600 mb-4">Languages</h2>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{lang.name}</span>
                    {lang.level && (
                      <span className="text-sm text-gray-500 bg-blue-50 px-2 py-1 rounded">
                        {lang.level}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-bold text-pink-600 mb-4">Certifications</h2>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="border-l-2 border-pink-200 pl-4">
                    <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                    <p className="text-sm text-gray-600">{cert.issuer} • {cert.date}</p>
                    {cert.description && (
                      <p className="text-sm text-gray-500 mt-1">{cert.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-8">
          {/* Professional Summary */}
          {personalInfo.summary && (
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-bold text-purple-600 mb-4">Professional Summary</h2>
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-bold text-blue-600 mb-6">Professional Experience</h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-blue-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-200 rounded-full"></div>
                    <div className="mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
                      <p className="text-purple-600 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-500">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </p>
                    </div>
                    <p className="text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-bold text-pink-600 mb-6">Education</h2>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-6 border-l-2 border-pink-200">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-pink-200 rounded-full"></div>
                    <div className="mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                      <p className="text-purple-600 font-medium">{edu.institution}</p>
                      <p className="text-sm text-gray-500">
                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                      </p>
                    </div>
                    {edu.description && (
                      <p className="text-gray-700">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-bold text-purple-600 mb-6">Projects</h2>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id} className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                    <p className="text-gray-700 mt-2">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-white text-sm text-purple-600 rounded"
                          >
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
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mt-2"
                      >
                        View Project
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Details */}
          {others.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-bold text-blue-600 mb-4">Additional Information</h2>
              <div className="space-y-4">
                {others.map((item) => (
                  <div key={item.id} className="border-l-2 border-blue-200 pl-4">
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-700 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Declaration */}
      {declaration.text && (
        <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-bold text-purple-600 mb-4">Declaration</h2>
          <p className="text-gray-700 mb-4">{declaration.text}</p>
          <div className="flex justify-between items-end">
            <div className="text-gray-600">
              <p>{declaration.place}</p>
              <p>{declaration.date}</p>
            </div>
            <p className="text-gray-800 font-medium">{declaration.signature}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreativeColorful; 