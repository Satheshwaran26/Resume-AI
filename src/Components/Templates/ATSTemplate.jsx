import React from "react";

const ATSTemplate = ({ data }) => {
  const {
    personalInfo = {},
    experience = [],
    education = [],
    skills = [],
    certifications = [],
    projects = [],
    languages = [],
    others = []
  } = data;

  // Helper functions to check if sections have data
  const hasExperience = experience?.length > 0 && experience.some(exp => exp.company?.trim() && exp.position?.trim());
  const hasSkills = skills?.length > 0 && skills.some(skill => skill.name?.trim());
  const hasEducation = education?.length > 0 && education.some(edu => (edu.degree?.trim() || edu.institution?.trim()));
  const hasCertifications = certifications?.length > 0 && certifications.some(cert => cert.name?.trim());
  const hasProjects = projects?.length > 0 && projects.some(proj => proj.name?.trim());
  const hasLanguages = languages?.length > 0 && languages.some(lang => lang.name?.trim());
  const hasOthers = others?.length > 0 && others.some(other => other.title?.trim());

  // Check if name exists and is not empty
  const hasName = (personalInfo.firstName?.trim() || personalInfo.lastName?.trim()) || false;
  
  // Only show professional title if it exists and name exists
  const hasTitle = hasName && personalInfo.title?.trim();
  
  // Check if contact info exists
  const hasContactInfo = personalInfo.phone?.trim() || 
                        personalInfo.email?.trim() || 
                        personalInfo.address?.trim() || 
                        (personalInfo.city?.trim() && personalInfo.state?.trim());

  // Check if summary has content
  const hasSummary = personalInfo.summary?.trim();

  // If no data at all, return null
  if (!hasName && !hasContactInfo && !hasSummary && 
      !hasExperience && !hasEducation && !hasSkills && 
      !hasCertifications && !hasProjects && !hasLanguages && !hasOthers) {
    return null;
  }

  return (
    <div id="resume-content" className="resume-page flex flex-col font-sans p-8 bg-white min-h-[1000px] w-[21cm]">
      {/* Header - Only show if there's a name */}
      {hasName && (
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-black text-center tracking-normal">
            {`${personalInfo.firstName?.trim() || ''} ${personalInfo.lastName?.trim() || ''}`.trim()}
          </h1>
          {hasTitle && (
            <h2 className="text-center text-gray-700 mt-1">
              {personalInfo.title}
            </h2>
          )}
          {hasContactInfo && (
            <div className="flex flex-wrap justify-center gap-2 text-sm mt-2 text-gray-700">
              {personalInfo.phone?.trim() && (
                <span>{personalInfo.phone}</span>
              )}
              {personalInfo.email?.trim() && (
                <>
                  {personalInfo.phone?.trim() && <span className="hidden sm:inline">|</span>}
                  <span>{personalInfo.email}</span>
                </>
              )}
              {(personalInfo.city?.trim() || personalInfo.state?.trim() || personalInfo.address?.trim()) && (
                <>
                  {(personalInfo.phone?.trim() || personalInfo.email?.trim()) && (
                    <span className="hidden sm:inline">|</span>
                  )}
                  <span>
                    {personalInfo.city?.trim() && personalInfo.state?.trim()
                      ? `${personalInfo.city}, ${personalInfo.state}`
                      : personalInfo.address?.trim() || ''
                    }
                  </span>
                </>
              )}
            </div>
          )}
        </header>
      )}

      {/* Only render sections container if there are sections to show */}
      {(hasSummary || hasExperience || hasEducation || hasSkills || 
        hasCertifications || hasProjects || hasLanguages || hasOthers) && (
        <div className="flex flex-col space-y-4">
          {hasSummary && (
            <section>
              <h2 className="text-lg font-bold text-black border-b border-gray-400 pb-1 uppercase">
                Summary
              </h2>
              <p className="mt-2 text-sm text-black">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {hasExperience && (
            <section>
              <h2 className="text-lg font-bold text-black border-b border-gray-400 pb-1 uppercase">
                Experience
              </h2>
              <div className="mt-2 space-y-4">
                {experience.map((exp) => (
                  exp.company?.trim() && exp.position?.trim() && (
                    <div key={exp.id}>
                      <div className="flex flex-wrap justify-between">
                        <h3 className="font-bold text-black">{exp.position}</h3>
                        {(exp.startDate?.trim() || exp.endDate?.trim()) && (
                          <span className="text-sm text-black">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </span>
                        )}
                      </div>
                      <h4 className="font-medium text-black">
                        {exp.company}
                        {exp.address?.trim() && `, ${exp.address}`}
                      </h4>
                      {exp.description?.trim() && (
                        <p className="text-sm text-black mt-1">{exp.description}</p>
                      )}
                    </div>
                  )
                ))}
              </div>
            </section>
          )}

          {hasEducation && (
            <section>
              <h2 className="text-lg font-bold text-black border-b border-gray-400 pb-1 uppercase">
                Education
              </h2>
              <div className="mt-2">
                {education.map((edu) => (
                  (edu.degree?.trim() || edu.institution?.trim()) && (
                    <div key={edu.id}>
                      <div className="flex flex-wrap justify-between">
                        <h3 className="font-bold text-black">
                          {edu.degree?.trim()} {edu.field?.trim() && `in ${edu.field}`}
                        </h3>
                        {(edu.startDate?.trim() || edu.endDate?.trim()) && (
                          <span className="text-sm text-black">
                            {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                          </span>
                        )}
                      </div>
                      {edu.institution?.trim() && (
                        <h4 className="text-black">{edu.institution}</h4>
                      )}
                      {edu.description?.trim() && (
                        <p className="text-sm text-black">{edu.description}</p>
                      )}
                    </div>
                  )
                ))}
              </div>
            </section>
          )}

          {hasSkills && (
            <section>
              <h2 className="text-lg font-bold text-black border-b border-gray-400 pb-1 uppercase">
                Skills
              </h2>
              <div className="mt-2 text-sm text-black">
                {skills
                  .filter(skill => skill.name?.trim())
                  .map((skill, index, filteredSkills) => (
                    <span key={skill.id}>
                      {skill.name}
                      {index < filteredSkills.length - 1 ? ', ' : ''}
                    </span>
                  ))
                }
              </div>
            </section>
          )}

          {hasProjects && (
            <section>
              <h2 className="text-lg font-bold text-black border-b border-gray-400 pb-1 uppercase">
                Projects
              </h2>
              <div className="mt-2 space-y-4">
                {projects.map((project) => (
                  project.name?.trim() && (
                    <div key={project.id}>
                      <h3 className="font-bold text-black">{project.name}</h3>
                      {project.description?.trim() && (
                        <p className="text-sm text-black mt-1">{project.description}</p>
                      )}
                      {project.technologies?.length > 0 && project.technologies.some(tech => tech?.trim()) && (
                        <p className="text-sm text-black mt-1">
                          <span className="font-medium">Technologies:</span>{' '}
                          {project.technologies.filter(tech => tech?.trim()).join(', ')}
                        </p>
                      )}
                      {project.link?.trim() && (
                        <p className="text-sm text-black mt-1">
                          <span className="font-medium">Link:</span> {project.link}
                        </p>
                      )}
                    </div>
                  )
                ))}
              </div>
            </section>
          )}

          {hasCertifications && (
            <section>
              <h2 className="text-lg font-bold text-black border-b border-gray-400 pb-1 uppercase">
                Certifications
              </h2>
              <ul className="list-disc ml-5 mt-2 text-sm text-black">
                {certifications.map((cert) => (
                  cert.name?.trim() && (
                    <li key={cert.id}>
                      {cert.name}
                      {cert.issuer?.trim() && `, ${cert.issuer}`}
                      {cert.date?.trim() && ` (${cert.date})`}
                    </li>
                  )
                ))}
              </ul>
            </section>
          )}

          {hasLanguages && (
            <section>
              <h2 className="text-lg font-bold text-black border-b border-gray-400 pb-1 uppercase">
                Languages
              </h2>
              <ul className="list-disc ml-5 mt-2 text-sm text-black">
                {languages.map((lang) => (
                  lang.name?.trim() && (
                    <li key={lang.id}>
                      {lang.name}
                      {lang.level?.trim() && ` - ${lang.level}`}
                    </li>
                  )
                ))}
              </ul>
            </section>
          )}

          {hasOthers && (
            <section>
              <h2 className="text-lg font-bold text-black border-b border-gray-400 pb-1 uppercase">
                Additional Information
              </h2>
              <div className="mt-2 space-y-2">
                {others.map((item) => (
                  item.title?.trim() && (
                    <div key={item.id}>
                      <h3 className="font-bold text-black">{item.title}</h3>
                      {item.description?.trim() && (
                        <p className="text-sm text-black">{item.description}</p>
                      )}
                    </div>
                  )
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default ATSTemplate; 