import React from 'react';

const MinimalistTemplate = ({ data }) => {
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
    <div className="min-h-[1056px] p-8 bg-white font-['Inter', sans-serif]">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-light text-gray-900 mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-lg text-gray-600 mb-3">{personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          {personalInfo.email && (
            <span>{personalInfo.email}</span>
          )}
          {personalInfo.phone && (
            <span>{personalInfo.phone}</span>
          )}
          {personalInfo.address && (
            <span>{personalInfo.address}</span>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-3">About</h2>
          <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-medium text-gray-900">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                <p className="text-gray-600 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </p>
                </div>
                {edu.description && (
                  <p className="text-gray-600 text-sm">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span 
                key={skill.id}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-medium text-gray-900">{project.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
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
                    className="text-sm text-gray-600 hover:text-gray-900 mt-1 inline-block"
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-3">Languages</h2>
          <div className="flex flex-wrap gap-4">
            {languages.map((lang) => (
              <div key={lang.id} className="text-sm">
                <span className="text-gray-900">{lang.name}</span>
                {lang.level && (
                  <span className="text-gray-500"> - {lang.level}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-3">Certifications</h2>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-medium text-gray-900">{cert.name}</h3>
                <p className="text-sm text-gray-600">{cert.issuer} • {cert.date}</p>
                {cert.description && (
                  <p className="text-sm text-gray-500 mt-1">{cert.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Details */}
      {others.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-3">Additional Information</h2>
          <div className="space-y-4">
            {others.map((item) => (
              <div key={item.id}>
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Declaration */}
      {declaration.text && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-3">Declaration</h2>
          <p className="text-gray-600 text-sm mb-4">{declaration.text}</p>
          <div className="flex justify-between items-end text-sm">
            <div className="text-gray-500">
              <p>{declaration.place}</p>
              <p>{declaration.date}</p>
            </div>
            <p className="text-gray-900">{declaration.signature}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalistTemplate; 