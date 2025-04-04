import React from 'react';

const ProfessionalClassic = ({ formData }) => {
  const {
    personalInfo,
    contactInfo,
    professionalSummary,
    workExperience,
    education,
    skills,
    certifications,
    languages,
    projects,
    achievements
  } = formData || {};

  return (
    <div className="professional-classic-template bg-white w-full h-full shadow-lg p-8">
      {/* Header with Name and Title */}
      <header className="border-b-2 border-gray-700 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{personalInfo?.fullName || 'Your Name'}</h1>
        <h2 className="text-xl text-gray-700 mt-1">{personalInfo?.jobTitle || 'Professional Title'}</h2>
        
        {/* Contact Information */}
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
          {contactInfo?.email && (
            <div>Email: {contactInfo.email}</div>
          )}
          {contactInfo?.phone && (
            <div>Phone: {contactInfo.phone}</div>
          )}
          {contactInfo?.location && (
            <div>Location: {contactInfo.location}</div>
          )}
          {contactInfo?.linkedin && (
            <div>LinkedIn: {contactInfo.linkedin}</div>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {professionalSummary && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">PROFESSIONAL SUMMARY</h3>
          <p className="text-gray-700">{professionalSummary}</p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience && workExperience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">WORK EXPERIENCE</h3>
          {workExperience.map((job, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <h4 className="font-semibold">{job.jobTitle}</h4>
                <span className="text-gray-600">{job.startDate} - {job.endDate || 'Present'}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <h5>{job.company}</h5>
                <span>{job.location}</span>
              </div>
              <p className="text-gray-700 mt-2">{job.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">EDUCATION</h3>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <h4 className="font-semibold">{edu.degree}</h4>
                <span className="text-gray-600">{edu.startDate} - {edu.endDate || 'Present'}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <h5>{edu.institution}</h5>
                <span>{edu.location}</span>
              </div>
              {edu.description && (
                <p className="text-gray-700 mt-2">{edu.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">SKILLS</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-gray-700">{skill.name}</span>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">CERTIFICATIONS</h3>
          {certifications.map((cert, index) => (
            <div key={index} className="mb-2">
              <h4 className="font-semibold">{cert.name}</h4>
              <div className="text-gray-600">{cert.issuer} • {cert.issueDate}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ProfessionalClassic;
