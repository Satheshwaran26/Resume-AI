import React from 'react';

const ProfessionalClassic = ({ data }) => {
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
    <div className="p-8 max-w-[850px] mx-auto bg-white">
      {/* Header/Personal Info */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-lg text-gray-600 mb-2">{personalInfo.title}</p>
        <div className="text-sm text-gray-600">
          <p>{personalInfo.email} • {personalInfo.phone}</p>
          <p>{personalInfo.address}</p>
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 mb-3">Professional Summary</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 mb-3">Professional Experience</h2>
          {experience.map((exp, index) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
                  <p className="text-gray-600 font-medium">{exp.company}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </p>
              </div>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 mb-3">Education</h2>
          {education.map((edu, index) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-gray-600 font-medium">{edu.institution}</p>
                </div>
                <p className="text-sm text-gray-600">
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </p>
              </div>
              {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 mb-3">Skills</h2>
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

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 mb-3">Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
              <p className="text-gray-700 mt-1">{project.description}</p>
              {project.technologies.length > 0 && (
                <div className="mt-2">
                  <span className="text-sm text-gray-600">Technologies: </span>
                  <span className="text-sm text-gray-700">{project.technologies.join(', ')}</span>
                </div>
              )}
              {project.link && (
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                >
                  Project Link
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 mb-3">Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-3">
              <h3 className="text-lg font-semibold text-gray-800">{cert.name}</h3>
              <p className="text-gray-600">{cert.issuer} • {cert.date}</p>
              {cert.description && <p className="text-gray-700 mt-1">{cert.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 mb-3">Languages</h2>
          <div className="flex flex-wrap gap-4">
            {languages.map((lang) => (
              <div key={lang.id} className="text-gray-700">
                <span className="font-medium">{lang.name}</span>
                {lang.level && <span className="text-gray-600"> - {lang.level}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Details */}
      {others.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 mb-3">Additional Information</h2>
          {others.map((item) => (
            <div key={item.id} className="mb-3">
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Declaration */}
      {declaration.text && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 mb-3">Declaration</h2>
          <p className="text-gray-700 mb-4">{declaration.text}</p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-gray-600">{declaration.place}</p>
              <p className="text-gray-600">{declaration.date}</p>
            </div>
            <p className="text-gray-800 font-medium">{declaration.signature}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalClassic; 