import React from "react";

const ATSTemplate = ({ data }) => {
  const {
    personalInfo,
    experience,
    education,
    skills,
    certifications
  } = data;

  // Check if sections are empty
  const isEmptyPersonalInfo = !personalInfo.firstName && !personalInfo.lastName && !personalInfo.title;
  const isEmptyExperience = experience.length === 0 || !experience[0].company;
  const isEmptyEducation = education.length === 0 || !education[0].institution;
  const isEmptySkills = skills.length === 0 || !skills[0].name;

  // Helper function to group skills by category (when no categories exist in data)
  const groupSkillsByCategory = () => {
    if (isEmptySkills) return null;
    
    // Create default categories for skills
    const categories = {
      "Programming Languages": [],
      "Frameworks & Libraries": [],
      "Databases & Tools": [],
      "Methodologies": []
    };
    
    // Simple categorization logic - in a real app, this would be more sophisticated
    skills.forEach(skill => {
      if (!skill.name) return;
      
      if (["JavaScript", "TypeScript", "Python", "Java", "C++", "HTML", "CSS", "SQL"].includes(skill.name)) {
        categories["Programming Languages"].push(skill.name);
      } else if (["React", "Angular", "Vue", "Node", "Express", "Django", "Flask"].some(lib => skill.name.includes(lib))) {
        categories["Frameworks & Libraries"].push(skill.name);
      } else if (["Git", "Docker", "AWS", "Azure", "MongoDB", "PostgreSQL", "MySQL"].some(tool => skill.name.includes(tool))) {
        categories["Databases & Tools"].push(skill.name);
      } else {
        categories["Methodologies"].push(skill.name);
      }
    });
    
    // Only return categories that have skills
    return Object.entries(categories).filter(([_, skills]) => skills.length > 0);
  };

  const skillsByCategory = !isEmptySkills ? groupSkillsByCategory() : null;

  return (
    <div className="resume-page flex flex-col font-sans p-8 bg-white">
      {/* Header - Clean and clearly separated */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-black text-center tracking-normal">
          {isEmptyPersonalInfo 
            ? "John Doe"
            : `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`}
        </h1>
        <div className="flex flex-wrap justify-center gap-2 text-sm mt-2 text-gray-700">
          <span>{personalInfo.phone || "(123) 456-7890"}</span>
          <span className="hidden sm:inline">|</span>
          <span>{personalInfo.email || "johndoe@example.com"}</span>
          <span className="hidden sm:inline">|</span>
          <span>
            {personalInfo.city && personalInfo.state 
              ? `${personalInfo.city}, ${personalInfo.state}`
              : personalInfo.address || "New York, NY"
            }
          </span>
          <span className="hidden sm:inline">|</span>
          <span>linkedin.com/in/johndoe</span>
        </div>
      </header>

      <div className="flex flex-col space-y-4">
        {/* Summary Section - Keyword rich */}
        <section>
          <h2 className="text-lg font-bold text-black border-b border-gray-400 pb-1 uppercase">
            Professional Summary
          </h2>
          <p className="mt-2 text-sm text-black">
            {personalInfo.summary || 
              <span className="text-gray-400 italic">
                Results-driven professional with experience in your field. Include relevant skills, years of experience, and key achievements. Keep it concise, focused, and keyword-rich for ATS optimization.
              </span>
            }
          </p>
        </section>

        {/* Experience Section - Structured with bullet points */}
        <section>
          <h2 className="text-lg font-bold text-black border-b border-gray-400 pb-1 uppercase">
            Work Experience
          </h2>

          <div className="mt-2 space-y-4">
            {!isEmptyExperience ? (
              // Render actual experience data
              experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-wrap justify-between">
                    <h3 className="font-bold text-black">{exp.position}</h3>
                    <span className="text-sm text-black">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <h4 className="font-medium text-black">{exp.company}{exp.address ? `, ${exp.address}` : ''}</h4>
                  {exp.description && <p className="text-sm text-black mt-1">{exp.description}</p>}
                  {exp.achievements && exp.achievements.length > 0 && exp.achievements[0] !== '' && (
                    <ul className="list-disc ml-5 mt-1 text-sm text-black">
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
                <div className="flex flex-wrap justify-between">
                  <h3 className="font-bold">Senior Position Title</h3>
                  <span className="text-sm">01/20XX - Present</span>
                </div>
                <h4 className="font-medium">Company Name, Location</h4>
                <ul className="list-disc ml-5 mt-1 text-sm">
                  <li>Quantifiable achievement related to your responsibilities (e.g., increased efficiency by X%)</li>
                  <li>Used [specific tools/technologies] to [accomplish specific task] resulting in [specific outcome]</li>
                  <li>Led or collaborated with team members to accomplish [specific project or goal]</li>
                  <li>Include keywords from the job description you're applying for</li>
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Skills Section - Clear, categorized lists */}
        <section>
          <h2 className="text-lg font-bold text-black border-b border-gray-400 pb-1 uppercase">
            Technical Skills
          </h2>
          <div className="mt-2 grid grid-cols-1 gap-2 text-sm text-black">
            {!isEmptySkills && skillsByCategory ? (
              // Render actual skills data in categories
              skillsByCategory.map(([category, skillsList], index) => (
                <div key={index}>
                  <span className="font-medium">{category}:</span>
                  <span> {skillsList.join(', ')}</span>
                </div>
              ))
            ) : (
              // Render placeholder skills
              <div className="text-gray-400 italic">
                <div>
                  <span className="font-medium">Programming Languages:</span>
                  <span> JavaScript, TypeScript, HTML5, CSS3, SQL, Python</span>
                </div>
                <div>
                  <span className="font-medium">Frameworks & Libraries:</span>
                  <span> React.js, Node.js, Express.js, Redux, Jest, React Testing Library</span>
                </div>
                <div>
                  <span className="font-medium">Databases & Tools:</span>
                  <span> MongoDB, PostgreSQL, Git, Docker, AWS, CI/CD, Jira</span>
                </div>
                <div>
                  <span className="font-medium">Methodologies:</span>
                  <span> Agile/Scrum, TDD, Microservices Architecture</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Education Section */}
        <section>
          <h2 className="text-lg font-bold text-black border-b border-gray-400 pb-1 uppercase">
            Education
          </h2>
          <div className="mt-2">
            {!isEmptyEducation ? (
              // Render actual education data
              education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-wrap justify-between">
                    <h3 className="font-bold text-black">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                    <span className="text-sm text-black">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </span>
                  </div>
                  <h4 className="text-black">{edu.institution}</h4>
                  {edu.description && <p className="text-sm text-black">{edu.description}</p>}
                </div>
              ))
            ) : (
              // Render placeholder education
              <div className="text-gray-400 italic">
                <div className="flex flex-wrap justify-between">
                  <h3 className="font-bold">Bachelor of Science in Computer Science</h3>
                  <span className="text-sm">08/20XX - 05/20XX</span>
                </div>
                <h4>University Name, Location</h4>
                <p className="text-sm">
                  Relevant Coursework: List courses relevant to the position you're applying for
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Certifications Section (if not empty) */}
        {certifications && certifications.length > 0 && certifications[0].name && (
          <section>
            <h2 className="text-lg font-bold text-black border-b border-gray-400 pb-1 uppercase">
              Certifications
            </h2>
            <ul className="list-disc ml-5 mt-2 text-sm text-black">
              {certifications.map((cert) => (
                <li key={cert.id}>
                  {cert.name}{cert.issuer ? `, ${cert.issuer}` : ''}{cert.date ? `, ${cert.date}` : ''}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default ATSTemplate; 