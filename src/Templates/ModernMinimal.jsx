import React from 'react';

const ModernMinimal = ({ data }) => {
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
    <div className="min-h-[1056px] bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-light mb-2">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-xl text-gray-300 mb-6">{personalInfo.title}</p>
          <div className="flex flex-wrap gap-6 text-gray-400 text-sm">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {personalInfo.phone}
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {personalInfo.address}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <div className="mb-12">
            <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-gray-300 before:rounded-full">
                  <div className="mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                  </div>
                  <p className="text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Education</h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-gray-300 before:rounded-full">
                  <div className="mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </p>
                  </div>
                  {edu.description && (
                    <p className="text-gray-600">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two Column Layout for Skills and Languages */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill.id}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-4">Languages</h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between">
                    <span className="text-gray-700">{lang.name}</span>
                    {lang.level && (
                      <span className="text-gray-500">{lang.level}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{project.name}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="text-sm text-gray-500"
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
                      className="text-sm text-gray-900 hover:text-gray-600 transition-colors"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900">{cert.name}</h3>
                  <p className="text-gray-600">{cert.issuer} • {cert.date}</p>
                  {cert.description && (
                    <p className="text-gray-500 mt-2">{cert.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Details */}
        {others.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Additional Information</h2>
            <div className="space-y-6">
              {others.map((item) => (
                <div key={item.id} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Declaration */}
        {declaration.text && (
          <div className="mt-12 pt-12 border-t border-gray-200">
            <p className="text-gray-600 mb-6">{declaration.text}</p>
            <div className="flex justify-between items-end">
              <div className="text-gray-500">
                <p>{declaration.place}</p>
                <p>{declaration.date}</p>
              </div>
              <p className="text-gray-900 font-medium">{declaration.signature}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernMinimal; 