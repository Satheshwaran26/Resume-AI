/**
 * Utility functions for transferring and processing resume data between components
 */

/**
 * Validates resume data to ensure it has all required fields
 * @param {Object} data - The resume data to validate
 * @returns {Object} - The validated and completed resume data
 */
export const validateResumeData = (data) => {
  if (!data) {
    console.warn("No data provided to validateResumeData, returning default data");
    return createDefaultResumeData();
  }

  // Create a copy to avoid modifying the original
  const validatedData = { ...data };

  // Ensure personalInfo exists and has all required fields
  if (!validatedData.personalInfo) {
    validatedData.personalInfo = getDefaultPersonalInfo();
  } else {
    // Fill in any missing fields in personalInfo with defaults
    validatedData.personalInfo = {
      ...getDefaultPersonalInfo(),
      ...validatedData.personalInfo
    };
  }

  // Ensure experience array exists
  if (!validatedData.experience || !Array.isArray(validatedData.experience)) {
    validatedData.experience = getDefaultExperience();
  } else if (validatedData.experience.length === 0) {
    // Add a default experience entry if array is empty
    validatedData.experience = getDefaultExperience();
  }

  // Ensure education array exists
  if (!validatedData.education || !Array.isArray(validatedData.education)) {
    validatedData.education = getDefaultEducation();
  } else if (validatedData.education.length === 0) {
    // Add a default education entry if array is empty
    validatedData.education = getDefaultEducation();
  }

  // Ensure skills array exists
  if (!validatedData.skills || !Array.isArray(validatedData.skills)) {
    validatedData.skills = getDefaultSkills();
  } else if (validatedData.skills.length === 0) {
    // Add default skills if array is empty
    validatedData.skills = getDefaultSkills();
  }

  // Ensure projects array exists
  if (!validatedData.projects || !Array.isArray(validatedData.projects)) {
    validatedData.projects = getDefaultProjects();
  }

  // Ensure certifications array exists
  if (!validatedData.certifications || !Array.isArray(validatedData.certifications)) {
    validatedData.certifications = getDefaultCertifications();
  }

  // Ensure languages array exists
  if (!validatedData.languages || !Array.isArray(validatedData.languages)) {
    validatedData.languages = getDefaultLanguages();
  }

  // Ensure others array exists
  if (!validatedData.others || !Array.isArray(validatedData.others)) {
    validatedData.others = getDefaultOthers();
  }

  // Ensure declaration exists
  if (!validatedData.declaration) {
    validatedData.declaration = getDefaultDeclaration();
  }

  return validatedData;
};

/**
 * Creates a default resume data structure with sample data
 * @returns {Object} - A complete resume data structure
 */
export const createDefaultResumeData = () => {
  return {
    personalInfo: getDefaultPersonalInfo(),
    experience: getDefaultExperience(),
    education: getDefaultEducation(),
    skills: getDefaultSkills(),
    projects: getDefaultProjects(),
    certifications: getDefaultCertifications(),
    languages: getDefaultLanguages(),
    others: getDefaultOthers(),
    declaration: getDefaultDeclaration()
  };
};

// Helper functions to get default sections

const getDefaultPersonalInfo = () => ({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '(555) 123-4567',
  address: '123 Main Street',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  country: 'USA',
  title: 'Professional',
  jobTitle: 'Professional',
  summary: 'Experienced professional with a proven track record of success in my field.',
  linkedin: 'linkedin.com/in/johndoe',
  github: 'github.com/johndoe'
});

const getDefaultExperience = () => [
  {
    id: 1,
    company: 'Example Company',
    position: 'Senior Position',
    role: 'Senior Position',
    startDate: '2020-01',
    endDate: '',
    current: true,
    description: 'Led key projects and initiatives that improved company operations.',
    achievements: ['Increased team productivity by 25%', 'Successfully delivered projects on time and under budget']
  },
  {
    id: 2,
    company: 'Previous Company',
    position: 'Junior Position',
    role: 'Junior Position',
    startDate: '2018-01',
    endDate: '2020-01',
    current: false,
    description: 'Supported team initiatives and contributed to project success.',
    achievements: ['Streamlined team workflows', 'Enhanced documentation processes']
  }
];

const getDefaultEducation = () => [
  {
    id: 1,
    institution: 'University Name',
    degree: 'Bachelor\'s',
    field: 'Major',
    fieldOfStudy: 'Major',
    startDate: '2014-09',
    endDate: '2018-05',
    graduationYear: '2018',
    current: false,
    description: 'Graduated with honors. Participated in relevant extracurricular activities.'
  }
];

const getDefaultSkills = () => [
  { id: 1, name: 'Skill 1' },
  { id: 2, name: 'Skill 2' },
  { id: 3, name: 'Skill 3' },
  { id: 4, name: 'Skill 4' },
  { id: 5, name: 'Skill 5' }
];

const getDefaultProjects = () => [
  {
    id: 1,
    name: 'Project Name',
    description: 'Developed and implemented a solution that increased efficiency by 25%.',
    link: 'https://example.com/project',
    technologies: ['Technology 1', 'Technology 2']
  }
];

const getDefaultCertifications = () => [
  {
    id: 1,
    name: 'Certification Name',
    issuer: 'Certification Authority',
    date: '2022',
    description: 'Professional certification demonstrating expertise in relevant skills.',
    credentialId: 'CERT-12345',
    credentialUrl: ''
  }
];

const getDefaultLanguages = () => [
  { id: 1, name: 'English', level: 'Native' }
];

const getDefaultOthers = () => [
  { id: 1, title: 'Interests', description: 'Professional development, networking, and continuous learning.' }
];

const getDefaultDeclaration = () => ({
  text: 'I hereby declare that all the information provided is true to the best of my knowledge.',
  place: 'New York',
  date: new Date().toISOString().split('T')[0],
  signature: 'John Doe'
});

/**
 * Extracts personal information from AI-generated text
 * @param {string} text - AI-generated resume text
 * @returns {Object} - Extracted personal information
 */
export const extractPersonalInfoFromAIText = (text) => {
  try {
    // Extract name
    const nameMatch = text.match(/(?:My name is|Name:)\s+([^\.\n]+)/i);
    let firstName = 'John';
    let lastName = 'Doe';
    
    if (nameMatch && nameMatch[1]) {
      const fullName = nameMatch[1].trim().split(' ');
      if (fullName.length >= 1) {
        firstName = fullName[0];
        lastName = fullName.slice(1).join(' ') || 'Doe';
      }
    }
    
    // Extract job title
    const titleMatch = text.match(/(?:I['']m a|Title:)\s+([^\.]+)/i);
    const jobTitle = titleMatch ? titleMatch[1].trim() : 'Professional';
    
    // Extract summary - take first few sentences if available
    let summary = '';
    if (text.length > 0) {
      const sentences = text.split(/\.\s+/);
      const relevantSentences = sentences.slice(0, 3);
      summary = relevantSentences.join('. ') + '.';
    }
    
    return {
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: '(555) 123-4567',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      title: jobTitle,
      jobTitle: jobTitle,
      summary: summary,
      linkedin: `linkedin.com/in/${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      github: `github.com/${firstName.toLowerCase()}${lastName.toLowerCase()}`
    };
  } catch (error) {
    console.error('Error extracting personal info from AI text:', error);
    return getDefaultPersonalInfo();
  }
};
