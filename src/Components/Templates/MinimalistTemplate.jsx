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

  // Check if section is empty
  const isEmptyPersonalInfo = !personalInfo.firstName && !personalInfo.lastName && !personalInfo.title;
  const isEmptyExperience = experience.length === 0 || !experience[0].company;
  const isEmptyEducation = education.length === 0 || !education[0].institution;
  const isEmptySkills = skills.length === 0 || !skills[0].name;
  const isEmptyProjects = projects.length === 0 || !projects[0].name;
  const isEmptyLanguages = languages.length === 0 || !languages[0].name;
  const isEmptyCertifications = certifications.length === 0 || !certifications[0].name;
  const isEmptyOthers = others.length === 0 || !others[0].title;
  const isEmptyDeclaration = !declaration.text;

  return (
    <div className="resume-page flex flex-col p-6 bg-white font-['Inter', sans-serif]">
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-display font-bold text-resume-charcoal tracking-wide">
          {isEmptyPersonalInfo 
            ? "YOUR NAME"
            : `${personalInfo.firstName?.toUpperCase() || ''} ${personalInfo.lastName?.toUpperCase() || ''}`}
        </h1>
        <h2 className="text-lg text-resume-slate mt-1">
          {personalInfo.title || "Professional Title"}
        </h2>
        
        <div className="flex flex-wrap justify-center gap-x-4 text-sm mt-2 text-resume-slate">
          {personalInfo.email 
            ? <span>{personalInfo.email}</span>
            : <span className="text-gray-400">email@example.com</span>
          }
          {personalInfo.phone 
            ? <span>{personalInfo.phone}</span>
            : <span className="text-gray-400">(123) 456-7890</span>
          }
          {personalInfo.address 
            ? <span>{personalInfo.address}</span>
            : personalInfo.city && personalInfo.state 
              ? <span>{personalInfo.city}, {personalInfo.state}</span>
              : <span className="text-gray-400">City, State</span>
          }
        </div>
      </header>

      <div className="flex flex-col space-y-5">
        {/* Summary Section */}
        <section>
          <h3 className="text-lg font-medium uppercase tracking-wider text-resume-charcoal mb-1">
            Summary
          </h3>
          <div className="h-px bg-resume-light-gray mb-2"></div>
          <p className="text-resume-slate text-sm">
            {personalInfo.summary || 
              <span className="text-gray-400 italic">
                Write a concise summary highlighting your professional background, key skills, and what makes you unique.
              </span>
            }
          </p>
        </section>

        {/* Experience Section */}
        <section>
          <h3 className="text-lg font-medium uppercase tracking-wider text-resume-charcoal mb-1">
            Experience
          </h3>
          <div className="h-px bg-resume-light-gray mb-2"></div>

          <div className="space-y-3">
            {!isEmptyExperience ? (
              // Render actual experience data
              experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-semibold">{exp.position}</h4>
                    <span className="text-sm text-resume-slate">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <h5 className="text-resume-slate italic">{exp.company}</h5>
                  <p className="mt-2 text-resume-slate">{exp.description}</p>
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
                  <h4 className="font-semibold">Position Title</h4>
                  <span className="text-sm">20XX - Present</span>
                </div>
                <h5 className="italic">Company Name</h5>
                <p className="mt-2">
                  Describe your responsibilities and achievements in this role. Use action verbs and quantify results when possible.
                </p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Key achievement or responsibility 1</li>
                  <li>Key achievement or responsibility 2</li>
                  <li>Key achievement or responsibility 3</li>
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Education Section */}
        <section>
          <h3 className="text-lg font-medium uppercase tracking-wider text-resume-charcoal mb-1">
            Education
          </h3>
          <div className="h-px bg-resume-light-gray mb-2"></div>
          
          <div className="space-y-3">
            {!isEmptyEducation ? (
              // Render actual education data
              education.map((edu) => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{edu.degree} {edu.field && `in ${edu.field}`}</h4>
                    <h5 className="text-resume-slate italic">{edu.institution}</h5>
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
                  <h4 className="font-semibold">Degree in Field of Study</h4>
                  <h5 className="italic">University or Institution Name</h5>
                </div>
                <span className="text-sm">20XX - 20XX</span>
              </div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <h3 className="text-lg font-medium uppercase tracking-wider text-resume-charcoal mb-1">
            Skills
          </h3>
          <div className="h-px bg-resume-light-gray mb-2"></div>
          {!isEmptySkills ? (
            // Render actual skills data
            <div className="grid grid-cols-3 gap-y-1 gap-x-4">
              {skills.map((skill) => (
                skill.name && (
                  <span key={skill.id} className="text-resume-slate">
                    • {skill.name}
                  </span>
                )
              ))}
            </div>
          ) : (
            // Render placeholder skills
            <div className="grid grid-cols-3 gap-y-1 gap-x-4 text-gray-400 italic">
              <span>• Skill 1</span>
              <span>• Skill 2</span>
              <span>• Skill 3</span>
              <span>• Skill 4</span>
              <span>• Skill 5</span>
              <span>• Skill 6</span>
            </div>
          )}
        </section>

        {/* Projects Section */}
        {(projects && projects.length > 0 && projects[0].name) || isEmptyProjects ? (
          <section>
            <h3 className="text-lg font-medium uppercase tracking-wider text-resume-charcoal mb-1">
              Projects
            </h3>
            <div className="h-px bg-resume-light-gray mb-2"></div>
            {!isEmptyProjects ? (
              // Render actual projects data
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-semibold">{project.name}</h4>
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm text-resume-slate underline"
                        >
                          View Project
                        </a>
                      )}
                    </div>
                    <p className="text-resume-slate mt-1">{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && project.technologies[0] !== '' && (
                      <p className="text-resume-slate mt-1">
                        <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              // Render placeholder project
              <div className="space-y-3 text-gray-400 italic">
                <div>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-semibold">Project Name</h4>
                    <span className="text-sm underline">View Project</span>
                  </div>
                  <p className="mt-1">Brief description of the project, its purpose, and your role in it.</p>
                  <p className="mt-1">
                    <span className="font-medium">Technologies:</span> Technology 1, Technology 2, Technology 3
                  </p>
                </div>
              </div>
            )}
          </section>
        ) : null}

        {/* Languages Section */}
        {(languages && languages.length > 0 && languages[0].name) || isEmptyLanguages ? (
          <section>
            <h3 className="text-lg font-medium uppercase tracking-wider text-resume-charcoal mb-1">
              Languages
            </h3>
            <div className="h-px bg-resume-light-gray mb-2"></div>
            {!isEmptyLanguages ? (
              // Render actual languages data
              <div className="flex flex-wrap gap-4">
                {languages.map((language) => (
                  <span key={language.id} className="text-resume-slate">
                    {language.name} ({language.level})
                  </span>
                ))}
              </div>
            ) : (
              // Render placeholder languages
              <div className="flex flex-wrap gap-4 text-gray-400 italic">
                <span>English (Native)</span>
                <span>Spanish (Intermediate)</span>
                <span>French (Basic)</span>
              </div>
            )}
          </section>
        ) : null}

        {/* Certifications Section */}
        {(certifications && certifications.length > 0 && certifications[0].name) || isEmptyCertifications ? (
          <section>
            <h3 className="text-lg font-medium uppercase tracking-wider text-resume-charcoal mb-1">
              Certifications
            </h3>
            <div className="h-px bg-resume-light-gray mb-2"></div>
            {!isEmptyCertifications ? (
              // Render actual certifications data
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h4 className="font-semibold">{cert.name}</h4>
                    <p className="text-resume-slate text-sm">
                      {cert.issuer} {cert.date && `• ${cert.date}`}
                    </p>
                    {cert.description && <p className="text-resume-slate text-sm">{cert.description}</p>}
                  </div>
                ))}
              </div>
            ) : (
              // Render placeholder certifications
              <div className="space-y-2 text-gray-400 italic">
                <div>
                  <h4 className="font-semibold">Certification Name</h4>
                  <p className="text-sm">Issuing Organization • Month 20XX</p>
                  <p className="text-sm">Brief description of the certification and skills acquired.</p>
                </div>
              </div>
            )}
          </section>
        ) : null}

        {/* Additional Information Section */}
        {(others && others.length > 0 && others[0].title) || isEmptyOthers ? (
          <section>
            <h3 className="text-lg font-medium uppercase tracking-wider text-resume-charcoal mb-1">
              Additional Information
            </h3>
            <div className="h-px bg-resume-light-gray mb-2"></div>
            {!isEmptyOthers ? (
              // Render actual additional info data
              <div className="space-y-3">
                {others.map((item) => (
                  <div key={item.id}>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-resume-slate">{item.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              // Render placeholder additional info
              <div className="space-y-3 text-gray-400 italic">
                <div>
                  <h4 className="font-semibold">Volunteer Work</h4>
                  <p>Description of volunteer activities and contributions.</p>
                </div>
                <div>
                  <h4 className="font-semibold">Hobbies & Interests</h4>
                  <p>Share relevant hobbies or interests that showcase your personality or additional skills.</p>
                </div>
              </div>
            )}
          </section>
        ) : null}

        {/* Declaration Section */}
        {declaration.text || isEmptyDeclaration ? (
          <section>
            <h3 className="text-lg font-medium uppercase tracking-wider text-resume-charcoal mb-1">
              Declaration
            </h3>
            <div className="h-px bg-resume-light-gray mb-2"></div>
            {!isEmptyDeclaration ? (
              // Render actual declaration data
              <>
                <p className="text-resume-slate">{declaration.text}</p>
                <div className="flex justify-between mt-4">
                  <div>
                    <p className="text-resume-slate">{declaration.place}</p>
                    <p className="text-resume-slate">{declaration.date}</p>
                  </div>
                  <p className="text-resume-slate font-medium">{declaration.signature}</p>
                </div>
              </>
            ) : (
              // Render placeholder declaration
              <div className="text-gray-400 italic">
                <p>I hereby declare that all the information provided above is true to the best of my knowledge and belief.</p>
                <div className="flex justify-between mt-4">
                  <div>
                    <p>City, Country</p>
                    <p>Date</p>
                  </div>
                  <p className="font-medium">Your Name</p>
                </div>
              </div>
            )}
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default MinimalistTemplate; 