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

  // Check if sections are empty
  const isEmptyPersonalInfo = !personalInfo.firstName && !personalInfo.lastName && !personalInfo.title;
  const isEmptyExperience = experience.length === 0 || !experience[0].company;
  const isEmptyEducation = education.length === 0 || !education[0].institution;
  const isEmptySkills = skills.length === 0 || !skills[0].name;

  return (
    <div className="resume-page flex flex-col p-8 bg-white">
      {/* Header */}
      <header className="mb-6 border-b-2 border-resume-accent-blue pb-4">
        <h1 className="text-3xl font-display font-bold text-resume-navy">
          {isEmptyPersonalInfo 
            ? "John Doe"
            : `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`}
        </h1>
        <h2 className="text-xl text-resume-accent-blue mt-1 font-medium">
          {personalInfo.title || "Professional Title"}
        </h2>
        
        <div className="flex flex-wrap justify-between text-sm mt-3 text-resume-slate">
          <span>{personalInfo.email || "email@example.com"}</span>
          <span>{personalInfo.phone || "(123) 456-7890"}</span>
          <span>
            {personalInfo.city && personalInfo.state 
              ? `${personalInfo.city}, ${personalInfo.state}`
              : personalInfo.address || "City, State"
            }
          </span>
          <span>linkedin.com/in/johndoe</span>
        </div>
      </header>

      <div className="flex flex-col space-y-6">
        {/* Summary Section */}
        <section>
          <h3 className="text-lg font-bold text-resume-navy border-b border-resume-light-gray pb-1 mb-3">
            Professional Summary
          </h3>
          <p className="text-resume-slate">
            {personalInfo.summary || 
              <span className="text-gray-400 italic">
                Innovative and deadline-driven professional with experience in your field. Add a brief 2-3 sentence overview of your background and key strengths.
              </span>
            }
          </p>
        </section>

        {/* Experience Section */}
        <section>
          <h3 className="text-lg font-bold text-resume-navy border-b border-resume-light-gray pb-1 mb-3">
            Work Experience
          </h3>

          <div className="space-y-4">
            {!isEmptyExperience ? (
              // Render actual experience data
              experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold">{exp.position}</h4>
                    <span className="text-sm text-resume-slate">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <h5 className="text-resume-accent-blue font-medium">{exp.company}</h5>
                  {exp.description && <p className="mt-1 text-resume-slate">{exp.description}</p>}
                  {exp.achievements && exp.achievements.length > 0 && exp.achievements[0] !== '' && (
                    <ul className="list-disc ml-5 mt-2 space-y-1 text-resume-slate">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              // Render placeholder experience
              <div className="text-gray-400 italic">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold">Position Title</h4>
                  <span className="text-sm">20XX - Present</span>
                </div>
                <h5 className="text-resume-accent-blue font-medium">Company Name</h5>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Key responsibility or achievement 1</li>
                  <li>Key responsibility or achievement 2</li>
                  <li>Key responsibility or achievement 3</li>
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Education Section */}
        <section>
          <h3 className="text-lg font-bold text-resume-navy border-b border-resume-light-gray pb-1 mb-3">
            Education
          </h3>
          
          {!isEmptyEducation ? (
            // Render actual education data
            education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <h4 className="font-bold">{edu.degree} {edu.field && `in ${edu.field}`}</h4>
                  <h5 className="text-resume-slate">{edu.institution}</h5>
                  {edu.description && <p className="text-resume-slate mt-1">{edu.description}</p>}
                </div>
                <span className="text-sm text-resume-slate">
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </span>
              </div>
            ))
          ) : (
            // Render placeholder education
            <div className="flex justify-between text-gray-400 italic">
              <div>
                <h4 className="font-bold">B.S. Computer Science</h4>
                <h5>University of Technology</h5>
              </div>
              <span className="text-sm">20XX - 20XX</span>
            </div>
          )}
        </section>

        {/* Skills Section */}
        <section>
          <h3 className="text-lg font-bold text-resume-navy border-b border-resume-light-gray pb-1 mb-3">
            Technical Skills
          </h3>
          
          {!isEmptySkills ? (
            // Render actual skills data
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                skill.name && (
                  <span 
                    key={skill.id} 
                    className="bg-resume-light-gray rounded px-3 py-1 text-sm text-resume-slate"
                  >
                    {skill.name}
                  </span>
                )
              ))}
            </div>
          ) : (
            // Render placeholder skills
            <div className="flex flex-wrap gap-2 text-gray-400 italic">
              <span className="bg-resume-light-gray rounded px-3 py-1 text-sm">JavaScript</span>
              <span className="bg-resume-light-gray rounded px-3 py-1 text-sm">TypeScript</span>
              <span className="bg-resume-light-gray rounded px-3 py-1 text-sm">React</span>
              <span className="bg-resume-light-gray rounded px-3 py-1 text-sm">Node.js</span>
              <span className="bg-resume-light-gray rounded px-3 py-1 text-sm">Express</span>
              <span className="bg-resume-light-gray rounded px-3 py-1 text-sm">MongoDB</span>
            </div>
          )}
        </section>

        {/* Projects Section (if not empty) */}
        {projects && projects.length > 0 && projects[0].name && (
          <section>
            <h3 className="text-lg font-bold text-resume-navy border-b border-resume-light-gray pb-1 mb-3">
              Projects
            </h3>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold">{project.name}</h4>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm text-resume-accent-blue underline"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                  <p className="text-resume-slate mt-1">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && project.technologies[0] !== '' && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="bg-resume-light-gray rounded px-2 py-0.5 text-xs text-resume-slate"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages Section (if not empty) */}
        {languages && languages.length > 0 && languages[0].name && (
          <section>
            <h3 className="text-lg font-bold text-resume-navy border-b border-resume-light-gray pb-1 mb-3">
              Languages
            </h3>
            <div className="flex flex-wrap gap-4">
              {languages.map((language) => (
                <span key={language.id} className="text-resume-slate">
                  {language.name} {language.level && `(${language.level})`}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Certifications Section (if not empty) */}
        {certifications && certifications.length > 0 && certifications[0].name && (
          <section>
            <h3 className="text-lg font-bold text-resume-navy border-b border-resume-light-gray pb-1 mb-3">
              Certifications
            </h3>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold">{cert.name}</h4>
                    <span className="text-sm text-resume-slate">{cert.date}</span>
                  </div>
                  <p className="text-resume-accent-blue">{cert.issuer}</p>
                  {cert.description && <p className="text-resume-slate text-sm">{cert.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Additional Information Section (if not empty) */}
        {others && others.length > 0 && others[0].title && (
          <section>
            <h3 className="text-lg font-bold text-resume-navy border-b border-resume-light-gray pb-1 mb-3">
              Additional Information
            </h3>
            <div className="space-y-3">
              {others.map((item) => (
                <div key={item.id}>
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-resume-slate">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernMinimal; 