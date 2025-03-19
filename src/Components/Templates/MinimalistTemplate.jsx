import React from 'react';

const MinimalistTemplate = ({ data }) => {
  const {
    personalInfo = {},
    education = [],
    experience = [],
    skills = {},
    projects = [],
    certifications = [],
    honors = []
  } = data || {};

  return (
    <div className="bg-white w-full max-w-[800px] mx-auto p-8 leading-relaxed">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extralight mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-gray-600 uppercase tracking-wider mb-2">{personalInfo.title}</p>
        <p className="text-gray-600 mb-2">
          {personalInfo.email} | {personalInfo.phone} | {personalInfo.location}
        </p>
        <div className="flex justify-center gap-2 text-gray-600">
          <a href={personalInfo.github}>GitHub</a>|
          <a href={personalInfo.linkedin}>LinkedIn</a>|
          <a href={personalInfo.portfolio}>Portfolio</a>
        </div>
      </header>

      {/* Education Section */}
      <section className="mb-8">
        <h2 className="text-xl text-gray-700 mb-4">EDUCATION</h2>
        {education.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium text-gray-800">{edu.institution}</h3>
                {edu.degree && (
                  <p className="text-gray-700">{edu.degree}</p>
                )}
                {edu.percentage && (
                  <p className="text-gray-600">Percentage: {edu.percentage}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-gray-700">{edu.startDate} - {edu.endDate}</p>
                <p className="text-gray-700">{edu.location}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Experience Section */}
      <section className="mb-8">
        <h2 className="text-xl text-gray-700 mb-4">EXPERIENCE</h2>
        {experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between mb-1">
              <h3 className="font-medium text-gray-800">
                {exp.position} | {exp.company}
              </h3>
              <p className="text-gray-700">{exp.location} | {exp.startDate} - {exp.endDate}</p>
            </div>
            <p className="text-gray-600 italic">{exp.description}</p>
          </div>
        ))}
      </section>

      {/* Skills Section */}
      <section className="mb-8">
        <h2 className="text-xl text-gray-700 mb-4">SKILLS</h2>
        <div className="grid gap-2">
          <div className="flex">
            <span className="w-48 font-medium">Programming Languages</span>
            <span className="text-gray-600">HTML5, CSS3, JAVASCRIPT, PYTHON, FLUTTER</span>
          </div>
          <div className="flex">
            <span className="w-48 font-medium">Libraries/Frameworks</span>
            <span className="text-gray-600">React.Js, Tailwind CSS, Bootstrap, Node.js GIT</span>
          </div>
          <div className="flex">
            <span className="w-48 font-medium">Tools / Platforms</span>
            <span className="text-gray-600">GitHub, VS Code, Vercel, Netlify</span>
          </div>
          <div className="flex">
            <span className="w-48 font-medium">Databases</span>
            <span className="text-gray-600">SQL, MongoDB</span>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-8">
        <h2 className="text-xl text-gray-700 mb-4">PROJECTS / OPEN-SOURCE</h2>
        {projects.map((project, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between mb-1">
              <h3 className="font-medium">
                PORTFOLIO | <span className="text-gray-600">Link</span>
              </h3>
              <span className="text-gray-600">HTML,CSS,JAVASCRIPT</span>
            </div>
            <p className="text-gray-600">
              {project.description}
            </p>
          </div>
        ))}
      </section>

      {/* Certifications Section */}
      <section className="mb-8">
        <h2 className="text-xl text-gray-700 mb-4">CERTIFICATIONS</h2>
        <ul className="space-y-1">
          <li className="text-gray-600">• JavaScript - Scaler</li>
          <li className="text-gray-600">• Tailwind CSS - LetsUpgrade</li>
          <li className="text-gray-600">• MongoDB - MongoDB - ICT Academy</li>
          <li className="text-gray-600">• Web development - Udemy</li>
        </ul>
      </section>

      {/* Honors & Awards Section */}
      <section className="mb-8">
        <h2 className="text-xl text-gray-700 mb-4">HONORS & AWARDS</h2>
        <ul>
          <li className="text-gray-600">• I won a cash prize of 1000 for Web Design at Hindusthan College of Arts and Science.</li>
        </ul>
      </section>

      {/* Declaration Section */}
      <section className="mt-8">
        <h2 className="text-xl text-gray-700 mb-4">Declaration</h2>
        <p className="text-gray-600 mb-6">
          "I hereby declare that the information provided in this resume is true and correct to the best of my knowledge and belief. I take full responsibility for the accuracy of the details mentioned."
        </p>
        <div className="grid grid-cols-3 gap-4 text-gray-600">
          <div>
            <p>Date : {personalInfo.date || '20/11/2024'}</p>
          </div>
          <div>
            <p>Place : {personalInfo.location}</p>
          </div>
          <div>
            <p>Signature : {personalInfo.firstName} {personalInfo.lastName}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MinimalistTemplate; 