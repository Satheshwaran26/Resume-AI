import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CreativeColorful from './Templates/CreativeColorful';
import MinimalistTemplate from './Templates/MinimalistTemplate';
import ModernMinimal from './Templates/ModernMinimal';
import ATSTemplate from './Templates/ATSTemplate';
import ATSScanner from './ATSScanner';
import AIResumeInput from './AIResumeInput';
import { FaMagic, FaDownload, FaSearchPlus, FaSearchMinus, FaUserTie } from 'react-icons/fa';
import { validateResumeData, createDefaultResumeData } from '../utils/dataTransfer';

const ResumeBuilder = ({ aiAssisted = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const resumeContainerRef = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      title: '',
      summary: ''
    },
    experience: [
      {
        id: 1,
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: ['']
      }
    ],
    education: [
      {
        id: 1,
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ],
    skills: [
      { id: 1, name: '' }
    ],
    languages: [
      { id: 1, name: '', level: 'Intermediate' }
    ],
    certifications: [
      { id: 1, name: '', issuer: '', date: '', description: '' }
    ],
    projects: [
      { id: 1, name: '', description: '', link: '', technologies: [''] }
    ],
    declaration: {
      text: '',
      place: '',
      date: '',
      signature: ''
    },
    others: [
      { id: 1, title: '', description: '' }
    ]
  });
  
  const [activeSection, setActiveSection] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [showATSScanner, setShowATSScanner] = useState(false);
  const [isPersonalInfoExpanded, setIsPersonalInfoExpanded] = useState(true);
  const [isAiMode, setIsAiMode] = useState(aiAssisted);
  const [aiInputData, setAiInputData] = useState("");
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiStep, setAiStep] = useState(1); // 1: Input, 2: Processing, 3: Review
  const [previewScale, setPreviewScale] = useState(0.85); // Scale for resume preview
  const [paperSize, setPaperSize] = useState('a4'); // 'a4' or 'letter'
  
  // Function to generate resume data from AI input
  const generateResumeFromAI = (inputText) => {
    // Extract basic information using regex patterns
    const nameMatch = inputText.match(/My name is ([^\.]+)/i);
    const emailMatch = inputText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    const phoneMatch = inputText.match(/(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/g);
    const titleMatch = inputText.match(/I'?m a ([^\.]+)/i);
    
    // Extract education information - handle both formats
    let education = [];
    const educationMatch1 = inputText.match(/graduated from ([^\.]+) with a ([^\.]+) in ([^\.]+) in (\d{4})/gi);
    const educationMatch2 = inputText.match(/graduated from ([^\.]+) with a ([^\.]+) in (\d{4})/gi);
    
    if (educationMatch1) {
      education = educationMatch1.map(match => {
        const [_, institution, degree, field, year] = match.match(/graduated from ([^\.]+) with a ([^\.]+) in ([^\.]+) in (\d{4})/i);
        return {
          id: 1,
          institution: institution.trim(),
          degree: degree.trim(),
          field: field.trim(),
          startDate: `${parseInt(year) - 4}-01`,
          endDate: `${year}-12`,
          current: false,
          description: ''
        };
      });
    } else if (educationMatch2) {
      education = educationMatch2.map(match => {
        const [_, institution, degree, year] = match.match(/graduated from ([^\.]+) with a ([^\.]+) in (\d{4})/i);
        return {
          id: 1,
          institution: institution.trim(),
          degree: degree.trim(),
          field: '',
          startDate: `${parseInt(year) - 4}-01`,
          endDate: `${year}-12`,
          current: false,
          description: ''
        };
      });
    }

    // Extract work experience - handle both formats
    let experience = [];
    const experienceMatch1 = inputText.match(/worked at ([^\.]+) from (\d{4}) to (\d{4}) as a ([^\.]+) where ([^\.]+)/gi);
    const experienceMatch2 = inputText.match(/worked at ([^\.]+) from (\d{4}) to (\d{4}) as a ([^\.]+)/gi);
    const experienceMatch3 = inputText.match(/Since (\d{4}), I'?ve been at ([^\.]+) as a ([^\.]+) ([^\.]+)/gi);
    
    if (experienceMatch1) {
      experience = experienceMatch1.map((match, index) => {
        const [_, company, startYear, endYear, position, description] = match.match(/worked at ([^\.]+) from (\d{4}) to (\d{4}) as a ([^\.]+) where ([^\.]+)/i);
        return {
          id: index + 1,
          company: company.trim(),
          position: position.trim(),
          startDate: `${startYear}-01`,
          endDate: `${endYear}-12`,
          current: false,
          description: description.trim(),
          achievements: ['']
        };
      });
    } else if (experienceMatch2) {
      experience = experienceMatch2.map((match, index) => {
        const [_, company, startYear, endYear, position] = match.match(/worked at ([^\.]+) from (\d{4}) to (\d{4}) as a ([^\.]+)/i);
        return {
          id: index + 1,
          company: company.trim(),
          position: position.trim(),
          startDate: `${startYear}-01`,
          endDate: `${endYear}-12`,
          current: false,
          description: '',
          achievements: ['']
        };
      });
    }
    
    // Handle "Since XXXX, I've been at..." format
    if (experienceMatch3) {
      experience = experienceMatch3.map((match, index) => {
        const [_, startYear, company, position, description] = match.match(/Since (\d{4}), I'?ve been at ([^\.]+) as a ([^\.]+) ([^\.]+)/i);
        return {
          id: experience.length + index + 1,
          company: company.trim(),
          position: position.trim(),
          startDate: `${startYear}-01`,
          endDate: '',
          current: true,
          description: description.trim(),
          achievements: ['']
        };
      });
    }

    // Extract skills
    let skills = [];
    const skillsMatch1 = inputText.match(/skills include ([^\.]+)/i);
    const skillsMatch2 = inputText.match(/My skills include ([^\.]+)/i);
    
    if (skillsMatch1) {
      skills = skillsMatch1[1].split(',').map((skill, index) => ({
        id: index + 1,
        name: skill.trim()
      }));
    } else if (skillsMatch2) {
      skills = skillsMatch2[1].split(',').map((skill, index) => ({
        id: index + 1,
        name: skill.trim()
      }));
    }
    
    // Extract certifications
    let certifications = [];
    const certMatch = inputText.match(/I'?m certified in ([^\.]+)/i);
    if (certMatch) {
      certifications = certMatch[1].split(',').map((cert, index) => ({
        id: index + 1,
        name: cert.trim(),
        issuer: '',
        date: '',
        description: '',
        credentialId: '',
        credentialUrl: ''
      }));
    }
    
    // Extract projects
    let projects = [];
    const projectMatch = inputText.match(/My most successful project was ([^\.]+) that ([^\.]+)/i);
    if (projectMatch) {
      projects = [{
        id: 1,
        name: projectMatch[1].trim(),
        description: projectMatch[2].trim(),
        link: '',
        technologies: ['']
      }];
    }

    // Create the resume data structure with empty arrays for all properties to prevent "length" errors
    return {
      personalInfo: {
        firstName: nameMatch ? nameMatch[1].split(' ')[0] : '',
        lastName: nameMatch ? nameMatch[1].split(' ').slice(1).join(' ') : '',
        email: emailMatch ? emailMatch[0] : '',
        phone: phoneMatch ? phoneMatch[0] : '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        title: titleMatch ? titleMatch[1] : '',
        summary: inputText.split('.')[0] // Use first sentence as summary
      },
      experience: experience.length > 0 ? experience : [
        {
          id: 1,
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
          achievements: ['']
        }
      ],
      education: education.length > 0 ? education : [
        {
          id: 1,
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }
      ],
      skills: skills.length > 0 ? skills : [{ id: 1, name: '' }],
      projects: projects.length > 0 ? projects : [
        { 
          id: 1, 
          name: '', 
          description: '', 
          link: '', 
          technologies: [''] 
        }
      ],
      certifications: certifications.length > 0 ? certifications : [
        { 
          id: 1, 
          name: '', 
          issuer: '', 
          date: '', 
          description: '',
          credentialId: '',
          credentialUrl: '' 
        }
      ],
      languages: [{ id: 1, name: '', level: 'Intermediate' }],
      others: [{ id: 1, title: '', description: '' }],
      declaration: {
        text: '',
        place: '',
        date: '',
        signature: ''
      }
    };
  };

  // Add a data validation function
  const validateResumeData = (data) => {
    // Create a new validated object with default values for missing properties
    const validated = { ...data };
    
    // Ensure all array properties are initialized
    const arrayProps = ['experience', 'education', 'skills', 'languages', 'certifications', 'projects', 'others'];
    arrayProps.forEach(prop => {
      if (!validated[prop] || !Array.isArray(validated[prop]) || validated[prop].length === 0) {
        console.warn(`Initializing missing or empty ${prop} array`);
        
        // Set appropriate default values based on property
        switch(prop) {
          case 'experience':
            validated[prop] = [{
              id: 1,
              company: '',
              position: '',
              startDate: '',
              endDate: '',
              current: false,
              description: '',
              achievements: ['']
            }];
            break;
          case 'education':
            validated[prop] = [{
              id: 1,
              institution: '',
              degree: '',
              field: '',
              startDate: '',
              endDate: '',
              current: false,
              description: ''
            }];
            break;
          case 'skills':
            validated[prop] = [{ id: 1, name: '' }];
            break;
          case 'languages':
            validated[prop] = [{ id: 1, name: '', level: 'Intermediate' }];
            break;
          case 'certifications':
            validated[prop] = [{ 
              id: 1, 
              name: '', 
              issuer: '', 
              date: '', 
              description: '',
              credentialId: '',
              credentialUrl: '' 
            }];
            break;
          case 'projects':
            validated[prop] = [{ 
              id: 1, 
              name: '', 
              description: '', 
              link: '', 
              technologies: [''] 
            }];
            break;
          case 'others':
            validated[prop] = [{ id: 1, title: '', description: '' }];
            break;
          default:
            validated[prop] = [];
        }
      }
      
      // For each array item, ensure nested arrays are initialized
      validated[prop].forEach(item => {
        if (prop === 'experience' && (!item.achievements || !Array.isArray(item.achievements))) {
          item.achievements = [''];
        }
        if (prop === 'projects' && (!item.technologies || !Array.isArray(item.technologies))) {
          item.technologies = [''];
        }
      });
    });
    
    // Ensure declaration object exists
    if (!validated.declaration) {
      validated.declaration = {
        text: '',
        place: '',
        date: '',
        signature: ''
      };
    }
    
    // Ensure personalInfo exists
    if (!validated.personalInfo) {
      validated.personalInfo = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        title: '',
        summary: ''
      };
    }
    
    return validated;
  };

  // Handle AI input submission
  const handleAIInputSubmit = async () => {
    if (!aiInputData.trim()) {
      alert('Please enter your information before generating the resume.');
      return;
    }
    
    // Check if input matches our suggested format structure
    const isStructuredInput = 
      aiInputData.includes("My name is") && 
      (aiInputData.includes("I graduated from") || aiInputData.includes("graduated from")) &&
      (aiInputData.includes("I worked at") || aiInputData.includes("worked at") || 
       aiInputData.includes("I've been at") || aiInputData.includes("Since")) &&
      (aiInputData.includes("My skills include") || aiInputData.includes("skills include"));
    
    setAiProcessing(true);
    setAiStep(2); // Move to processing step
    
    try {
      // Simulate AI processing (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate resume content from AI input
      const generatedResume = generateResumeFromAI(aiInputData);
      
      // Log the parsed data to check what was extracted
      console.log("Generated resume data from input:", generatedResume);
      
      // Set the form data with the generated resume
      setFormData(generatedResume);
      
      setAiStep(3); // Move to review step
    } catch (error) {
      console.error('Error processing AI input:', error);
      alert('An error occurred while processing your information. Please try again.');
      setAiStep(1);
    } finally {
      setAiProcessing(false);
    }
  };
  
  // Function to render AI input form
  const renderAIInputForm = () => {
    switch (aiStep) {
      case 1:
        return (
          <div className="min-h-screen  p-4">
            <AIResumeInput
              onSubmit={handleAIInputSubmit}
              setInputData={setAiInputData}
              inputData={aiInputData}
            />
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 text-center">
              <h2 className="text-2xl font-bold mb-4">Processing Your Information</h2>
              <p className="text-gray-600 mb-6">
                Our AI is analyzing your information and generating a professional resume...
              </p>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Review Your Resume</h2>
              <p className="text-gray-600 mb-6">
                Your AI-generated resume is ready! Please review and make any necessary adjustments.
              </p>
              {/* Resume preview will be rendered here */}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Define paper dimensions
  const paperSizes = {
    a4: { width: '794px', height: '1123px', name: 'A4' },
    letter: { width: '816px', height: '1056px', name: 'US Letter' }
  };

  // Sections for navigation
  const sections = [
    { id: 'personalInfo', name: 'Personal Information', icon: 'user' },
    { id: 'experience', name: 'Work Experience', icon: 'briefcase' },
    { id: 'education', name: 'Education', icon: 'academic-cap' },
    { id: 'skills', name: 'Skills', icon: 'chip' },
    { id: 'languages', name: 'Languages', icon: 'globe-alt' },
    { id: 'certifications', name: 'Certifications', icon: 'badge-check' },
    { id: 'projects', name: 'Projects', icon: 'code' },
    { id: 'declaration', name: 'Declaration', icon: 'document-text' },
    { id: 'others', name: 'Other Details', icon: 'dots-horizontal' }
  ];

  useEffect(() => {
    // Log to verify data
    console.log('Location state:', location.state);
    
    // Check for AI data from TemplateSelection (aiData and fromAI parameters)
    if (location.state?.template && location.state?.aiData && location.state?.fromAI) {
      setIsAiMode(true);
      setSelectedTemplate(location.state.template);
      
      // Store AI input data
      setAiInputData(location.state.aiData);
      
      try {
        // Generate resume content from AI input data
        const generatedResume = generateResumeFromAI(location.state.aiData);
        
        // Validate the data to ensure all properties exist
        const validatedResume = validateResumeData(generatedResume);
        
        // Set the validated form data
        setFormData(validatedResume);
        
        // Skip AI input step and go directly to editing
        setAiStep(3);
        
        // Set Personal Info as the active section by default
        setActiveSection('personalInfo');
      } catch (error) {
        console.error('Error processing AI data:', error);
        // If there's an error, use default data
        setActiveSection('personalInfo');
      }
      
    // Handle the original showAIInput case
    } else if (location.state?.showAIInput) {
      setIsAiMode(true);
      
      // If we have AI input data, process it
      if (location.state.aiInputData) {
        setAiInputData(location.state.aiInputData);
        
        // Generate resume data from AI input
        const generatedResume = generateResumeFromAI(location.state.aiInputData);
        setFormData(generatedResume);
        
        // Skip AI input step and go directly to editing (step 3)
        setAiStep(3);
      } else {
        // If no AI data yet, start at step 1
        setAiStep(1);
      }
      
      // Set the selected template
      if (location.state.template) {
        setSelectedTemplate(location.state.template);
      } else {
        // Default to a template in AI mode
        setSelectedTemplate({ 
          type: 'modern-minimal',
          name: 'Modern Minimal',
          description: 'A clean, modern design with minimal elements'
        });
      }
    } else if (aiAssisted) {
      setIsAiMode(true);
      // Skip template selection in AI mode
      if (location.state?.template) {
        setSelectedTemplate(location.state.template);
      } else {
        // Default to a template in AI mode
        setSelectedTemplate({ 
          type: 'modern-minimal',
          name: 'Modern Minimal',
          description: 'A clean, modern design with minimal elements'
        });
      }
    } else if (location.state?.template) {
      setSelectedTemplate(location.state.template);
      // Set Personal Info as the active section by default
      setActiveSection('personalInfo');
    } else {
      // If no template is selected, redirect back to template selection
      navigate('/templates');
    }
    
    // Animation
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, [location, navigate, aiAssisted]);

  useEffect(() => {
    // If aiAssisted is true, we can start the AI questionnaire process
    if (aiAssisted) {
      // Logic for AI questionnaire could go here
      console.log("Starting AI-assisted resume building");
    }
  }, [aiAssisted]);

  // Add a useEffect to adjust preview scale based on window size
  useEffect(() => {
    const handleResize = () => {
      // Automatically adjust scale based on window width
      const containerWidth = window.innerWidth * 0.45; // Approximate width of preview area
      const resumeWidth = paperSize === 'a4' ? 794 : 816; // Width in pixels
      
      if (containerWidth < resumeWidth) {
        const newScale = Math.max(0.5, Math.min(1.0, containerWidth / resumeWidth));
        setPreviewScale(newScale);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial adjustment
    
    return () => window.removeEventListener('resize', handleResize);
  }, [paperSize]);

  // Handle form input changes
  const handleInputChange = (section, field, value, index = null) => {
    setFormData(prevData => {
      const newData = { ...prevData };
      
      if (index !== null) {
        // For array fields like experience, education, etc.
        newData[section][index][field] = value;
      } else {
        // For nested objects like personalInfo
        newData[section][field] = value;
      }
      
      return newData;
    });
  };

  // Add new item to array fields
  const handleAddItem = (section) => {
    setFormData(prevData => {
      const newData = { ...prevData };
      const lastItem = newData[section][newData[section].length - 1];
      const newId = lastItem ? lastItem.id + 1 : 1;
      
      let newItem = { id: newId };
      
      // Set default values based on section
      switch(section) {
        case 'experience':
          newItem = {
            ...newItem,
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            current: false,
            description: '',
            achievements: ['']
          };
          break;
        case 'education':
          newItem = {
            ...newItem,
            institution: '',
            degree: '',
            field: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
          };
          break;
        case 'skills':
          newItem = { ...newItem, name: '' };
          break;
        case 'languages':
          newItem = { ...newItem, name: '', level: 'Intermediate' };
          break;
        case 'certifications':
          newItem = { 
            ...newItem, 
            name: '', 
            issuer: '', 
            date: '', 
            description: '',
            credentialId: '',
            credentialUrl: ''
          };
          break;
        case 'projects':
          newItem = { ...newItem, name: '', description: '', link: '', technologies: [''] };
          break;
        case 'declaration':
          newItem = { ...newItem, text: '', place: '', date: '', signature: '' };
          break;
        case 'others':
          newItem = { ...newItem, title: '', description: '' };
          break;
        default:
          break;
      }
      
      newData[section] = [...newData[section], newItem];
      return newData;
    });
  };

  // Remove item from array fields
  const handleRemoveItem = (section, id) => {
    setFormData(prevData => {
      const newData = { ...prevData };
      newData[section] = newData[section].filter(item => item.id !== id);
      return newData;
    });
  };

  // Generate AI suggestions
  const generateAiSuggestions = (section, field, value, jobTitle) => {
    setIsGenerating(true);
    
    // Simulate AI generation (in a real app, this would call your AI service)
    setTimeout(() => {
      let suggestions = [];
      
      if (section === 'experience' && field === 'description') {
        suggestions = [
          `Led cross-functional team of 8 to develop and launch new ${jobTitle || 'product'} features, resulting in 25% increase in user engagement.`,
          `Managed ${jobTitle || 'project'} lifecycle from conception to delivery, consistently meeting deadlines and exceeding quality expectations.`,
          `Collaborated with stakeholders to identify requirements and implement solutions that increased operational efficiency by 30%.`
        ];
      } else if (section === 'personalInfo' && field === 'summary') {
        suggestions = [
          `Results-driven ${jobTitle || 'professional'} with ${Math.floor(Math.random() * 10) + 3} years of experience in delivering high-quality solutions. Strong analytical skills and commitment to excellence.`,
          `Innovative ${jobTitle || 'professional'} with a proven track record of success in fast-paced environments. Skilled in problem-solving and team collaboration.`,
          `Detail-oriented ${jobTitle || 'professional'} passionate about creating efficient solutions. Combines technical expertise with strong communication skills.`
        ];
      }
      
      setAiSuggestions(suggestions);
      setIsGenerating(false);
    }, 1500);
  };

  // Apply AI suggestion
  const applySuggestion = (suggestion, section, field, index = null) => {
    handleInputChange(section, field, suggestion, index);
    setAiSuggestions([]);
  };

  const renderSectionContent = (section) => {
    switch (section) {
      case 'Education':
        return (
          <div className="p-4 space-y-4">
            {formData.education.map((edu, index) => (
              <div key={edu.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={edu.institution}
                      onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)}
                      placeholder="University/School name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={edu.degree}
                      onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                      placeholder="e.g., Bachelor's in Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="month"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={edu.startDate}
                      onChange={(e) => handleInputChange('education', 'startDate', e.target.value, index)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="month"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={edu.endDate}
                      onChange={(e) => handleInputChange('education', 'endDate', e.target.value, index)}
                      disabled={edu.current}
                    />
                    <div className="mt-2">
                      <input
                        type="checkbox"
                        id={`current-edu-${index}`}
                        checked={edu.current}
                        onChange={(e) => handleInputChange('education', 'current', e.target.checked, index)}
                        className="mr-2"
                      />
                      <label htmlFor={`current-edu-${index}`} className="text-sm text-gray-600">Currently Studying</label>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem('education', edu.id)}
                  className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddItem('education')}
              className="w-full py-2 px-4 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"
            >
              + Add Education
            </button>
          </div>
        );

      case 'Experience':
        return (
          <div className="p-4 space-y-4">
            {formData.experience.map((exp, index) => (
              <div key={exp.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={exp.company}
                      onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={exp.position}
                      onChange={(e) => handleInputChange('experience', 'position', e.target.value, index)}
                      placeholder="e.g., Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="month"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={exp.startDate}
                      onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="month"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={exp.endDate}
                      onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
                      disabled={exp.current}
                    />
                    <div className="mt-2">
                      <input
                        type="checkbox"
                        id={`current-exp-${index}`}
                        checked={exp.current}
                        onChange={(e) => handleInputChange('experience', 'current', e.target.checked, index)}
                        className="mr-2"
                      />
                      <label htmlFor={`current-exp-${index}`} className="text-sm text-gray-600">Currently Working</label>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={exp.description}
                      onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
                      rows="3"
                      placeholder="Describe your responsibilities and achievements"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem('experience', exp.id)}
                  className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddItem('experience')}
              className="w-full py-2 px-4 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"
            >
              + Add Experience
            </button>
          </div>
        );

      case 'Skillsets':
        return (
          <div className="p-4 space-y-4">
            {formData.skills.map((skill, index) => (
              <div key={skill.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skill</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={skill.name}
                      onChange={(e) => handleInputChange('skills', 'name', e.target.value, index)}
                      placeholder="e.g., JavaScript, Python, Project Management"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveItem('skills', skill.id)}
                    className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 self-end mb-1"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => handleAddItem('skills')}
              className="w-full py-2 px-4 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              + Add Skill
            </button>
          </div>
        );

      case 'Certifications':
        return (
          <div className="p-4 space-y-4">
            {formData.certifications.map((cert, index) => (
              <div key={cert.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={cert.name}
                      onChange={(e) => handleInputChange('certifications', 'name', e.target.value, index)}
                      placeholder="e.g., AWS Solutions Architect"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={cert.issuer}
                      onChange={(e) => handleInputChange('certifications', 'issuer', e.target.value, index)}
                      placeholder="e.g., Amazon Web Services"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                    <input
                      type="month"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={cert.date}
                      onChange={(e) => handleInputChange('certifications', 'date', e.target.value, index)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Credential ID</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={cert.credentialId}
                      onChange={(e) => handleInputChange('certifications', 'credentialId', e.target.value, index)}
                      placeholder="Optional credential identifier"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Credential URL</label>
                    <input
                      type="url"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={cert.credentialUrl}
                      onChange={(e) => handleInputChange('certifications', 'credentialUrl', e.target.value, index)}
                      placeholder="https://credential.example.com/verify"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={cert.description}
                      onChange={(e) => handleInputChange('certifications', 'description', e.target.value, index)}
                      rows="3"
                      placeholder="Describe the certificate and relevant skills acquired"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem('certifications', cert.id)}
                  className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddItem('certifications')}
              className="w-full py-2 px-4 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"
            >
              + Add Certification
            </button>
          </div>
        );

      case 'Projects':
        return (
          <div className="p-4 space-y-4">
            {formData.projects.map((project, index) => (
              <div key={project.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={project.name}
                      onChange={(e) => handleInputChange('projects', 'name', e.target.value, index)}
                      placeholder="Project name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={project.description}
                      onChange={(e) => handleInputChange('projects', 'description', e.target.value, index)}
                      rows="3"
                      placeholder="Describe your project"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Technologies Used</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={project.technologies.join(', ')}
                      onChange={(e) => handleInputChange('projects', 'technologies', e.target.value.split(',').map(tech => tech.trim()), index)}
                      placeholder="e.g., React, Node.js, MongoDB"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Link</label>
                    <input
                      type="url"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={project.link}
                      onChange={(e) => handleInputChange('projects', 'link', e.target.value, index)}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem('projects', project.id)}
                  className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddItem('projects')}
              className="w-full py-2 px-4 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"
            >
              + Add Project
            </button>
          </div>
        );

      case 'Declaration':
        return (
          <div className="p-4 space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Declaration Text</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.declaration.text}
                  onChange={(e) => handleInputChange('declaration', 'text', e.target.value)}
                  rows="4"
                  placeholder="I hereby declare that all the information provided above is true to the best of my knowledge..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Place</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={formData.declaration.place}
                    onChange={(e) => handleInputChange('declaration', 'place', e.target.value)}
                    placeholder="City, Country"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={formData.declaration.date}
                    onChange={(e) => handleInputChange('declaration', 'date', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Digital Signature</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.declaration.signature}
                  onChange={(e) => handleInputChange('declaration', 'signature', e.target.value)}
                  placeholder="Your Name"
                />
              </div>
            </div>
          </div>
        );

      case 'Others':
        return (
          <div className="p-4 space-y-4">
            {formData.others.map((item, index) => (
              <div key={item.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={item.title}
                    onChange={(e) => handleInputChange('others', 'title', e.target.value, index)}
                    placeholder="e.g., Hobbies, Achievements, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={item.description}
                    onChange={(e) => handleInputChange('others', 'description', e.target.value, index)}
                    rows="3"
                    placeholder="Add details here..."
                  />
                </div>
                <button
                  onClick={() => handleRemoveItem('others', item.id)}
                  className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddItem('others')}
              className="w-full py-2 px-4 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"
            >
              + Add Other Detail
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  // Render form based on active section
  const renderForm = () => {
    switch(activeSection) {
      case 'personalInfo':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.personalInfo.firstName}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Professional Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.personalInfo.title}
                  onChange={(e) => handleInputChange('personalInfo', 'title', e.target.value)}
                  placeholder="e.g., Software Engineer"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.personalInfo.address}
                  onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Professional Summary
                <button
                  type="button"
                  className="ml-2 inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                  onClick={() => generateAiSuggestions('personalInfo', 'summary', '', formData.personalInfo.title)}
                >
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI Generate
                </button>
              </label>
              <textarea
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.personalInfo.summary}
                onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)}
                placeholder="Write a brief summary of your professional background and key strengths..."
              ></textarea>
              
              {/* AI Suggestions */}
              {aiSuggestions.length > 0 && (
                <div className="mt-3 p-3 bg-blue-50 rounded-md">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">AI Suggestions:</h4>
                  <div className="space-y-2">
                    {aiSuggestions.map((suggestion, idx) => (
                      <div key={idx} className="p-2 bg-white rounded border border-blue-200 hover:border-blue-400 cursor-pointer transition-colors" onClick={() => applySuggestion(suggestion, 'personalInfo', 'summary')}>
                        {suggestion}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {isGenerating && (
                <div className="mt-3 flex items-center text-sm text-blue-600">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating suggestions...
                </div>
              )}
            </div>
          </div>
        );
        
      case 'experience':
        return renderSectionContent('Experience');
      case 'education':
        return renderSectionContent('Education');
      case 'skills':
        return renderSectionContent('Skillsets');
      case 'certifications':
        return renderSectionContent('Certifications');
      case 'projects':
        return renderSectionContent('Projects');
      case 'declaration':
        return renderSectionContent('Declaration');
      case 'others':
        return renderSectionContent('Others');
      // Add other sections as needed (languages, certifications, projects)
      default:
        return (
          <div className="py-12 text-center">
            <p className="text-gray-500">This section is coming soon.</p>
          </div>
        );
    }
  };

  // Function to render the selected template
  const renderSelectedTemplate = () => {
    if (!selectedTemplate) return null;

    // Log to verify template rendering
    console.log('Rendering template:', selectedTemplate.type);
    
    // Validate form data before rendering to prevent errors
    const validatedData = validateResumeData(formData);
    
    // Use the static mapping of template types to components
    const TemplateComponent = {
      'minimalist': MinimalistTemplate,
      'modern-minimal': ModernMinimal,
      'creative-colorful': CreativeColorful,
      'ats-template': ATSTemplate
    }[selectedTemplate.type];
    
    // If no matching component is found, fall back to a default template
    if (!TemplateComponent) {
      console.log('Falling back to default template');
      return <MinimalistTemplate data={validatedData} />;
    }

    return <TemplateComponent data={validatedData} />;
  };

  // If no template is selected, show loading or redirect
  if (!selectedTemplate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Modified main render logic to handle AI mode
  if (isAiMode && aiStep < 3) {
    return (
      <div className="min-h-screen overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 -z-10">
          {/* Animated Gradient Orbs */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-24 left-1/4 w-[800px] h-[800px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-[800px] h-[800px] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_110%)] opacity-5"></div>
        </div>

        {/* Main Content for AI Input */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {renderAIInputForm()}
          </div>
        </div>
      </div>
    );
  }

  // Add this before the return statement
  const renderATSScanner = () => {
    if (!showATSScanner) return null;

    const handleClose = () => {
      setShowATSScanner(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <h2 className="text-xl font-light text-gray-900">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ATS
              </span> Resume Scanner
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6">
            <ATSScanner resumeData={formData} onClose={handleClose} />
          </div>
        </div>
      </div>
    );
  };

  // Add this function before the return statement
  const handlePrintResume = () => {
    if (!resumeContainerRef.current) {
      console.error('Resume container not found');
      return;
    }

    // Show loading indicator
    const loadingEl = document.createElement('div');
    loadingEl.style.position = 'fixed';
    loadingEl.style.top = '0';
    loadingEl.style.left = '0';
    loadingEl.style.width = '100%';
    loadingEl.style.height = '100%';
    loadingEl.style.display = 'flex';
    loadingEl.style.alignItems = 'center';
    loadingEl.style.justifyContent = 'center';
    loadingEl.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    loadingEl.style.zIndex = '9999';
    loadingEl.innerHTML = '<div style="text-align: center;"><div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; margin: 0 auto 20px; animation: spin 1s linear infinite;"></div><p>Generating PDF...</p></div>';
    document.body.appendChild(loadingEl);

    // Create style element for the loading spinner animation
    const styleEl = document.createElement('style');
    styleEl.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
    document.head.appendChild(styleEl);

    // Step 1: Load the scripts we need (jsPDF and html2canvas)
    const loadScript = (url) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    // Step 2: Load required libraries
    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')
    ])
    .then(() => {
      // Step 3: Temporarily remove transform scale from resume container for proper capture
      const element = resumeContainerRef.current;
      const originalTransform = element.style.transform;
      const originalWidth = element.style.width;
      
      // Reset transform and set fixed width for better rendering
      element.style.transform = 'none';
      element.style.width = paperSize === 'a4' ? '210mm' : '215.9mm';
      
      // Step 4: Use html2canvas to take a screenshot
      window.html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        letterRendering: true,
        backgroundColor: '#FFFFFF'
      }).then(canvas => {
        // Step 5: Create a new jsPDF document
        const { jsPDF } = window.jspdf;
        const pdfWidth = paperSize === 'a4' ? 210 : 215.9; // mm
        const pdfHeight = paperSize === 'a4' ? 297 : 279.4; // mm
        
        // Convert canvas to image
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        
        // Calculate scale to fit into PDF
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Create PDF with correct dimensions
        const pdf = new jsPDF('p', 'mm', paperSize === 'a4' ? 'a4' : 'letter');
        
        // Add image to PDF
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        
        // If image is taller than PDF page, add additional pages
        let position = 0;
        let heightLeft = imgHeight;
        
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          heightLeft -= pdfHeight;
          
          if (heightLeft > 0) {
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
          }
        }
        
        // Save the PDF
        const fileName = `${formData.personalInfo.firstName || 'Resume'}_${formData.personalInfo.lastName || 'PDF'}.pdf`;
        pdf.save(fileName);
        
        // Restore original styles
        element.style.transform = originalTransform;
        element.style.width = originalWidth;
        
        // Cleanup
        document.body.removeChild(loadingEl);
        document.head.removeChild(styleEl);
      });
    })
    .catch(error => {
      console.error('Error generating PDF:', error);
      document.body.removeChild(loadingEl);
      if (document.head.contains(styleEl)) {
        document.head.removeChild(styleEl);
      }
      alert('There was an error generating your PDF. Please try again later.');
    });
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-24 left-1/4 w-[800px] h-[800px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-[800px] h-[800px] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_110%)] opacity-5"></div>
      </div>

      {/* Header */}
      <header className="border-b border-gray-200  pt-20 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/templates" className="text-indigo-600 text-sm hover:underline font-medium">Templates</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 text-sm">Resume Builder</span>
          </div>
          <div>
            <h1 className="text-[1.7rem] font-extralight text-gray-900">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                Resume
              </span> Builder
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-8">
        <div className="flex gap-6 animate-slide-up">
          {/* Left Sidebar */}
          <div className="w-[380px]">
            {/* Personal Info Section */}
            <div className="border border-gray-200/50 rounded-2xl  shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              <div 
                onClick={() => setIsPersonalInfoExpanded(!isPersonalInfoExpanded)}
                className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50/70 transition-colors duration-200"
              >
                <div className="p-2 bg-indigo-100 rounded-lg transform transition-transform duration-200 hover:scale-105">
                  <FaUserTie className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Personal Info</span>
                <svg 
                  className={`w-5 h-5 text-gray-400 ml-auto transition-all duration-300 ease-in-out transform ${
                    isPersonalInfoExpanded ? 'rotate-180' : ''
                  }`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Form Fields */}
              <div 
                className={`transition-all duration-300 ease-in-out transform origin-top ${
                  isPersonalInfoExpanded 
                    ? 'max-h-[1000px] opacity-100 scale-y-100 translate-y-0' 
                    : 'max-h-0 opacity-0 scale-y-95 -translate-y-2'
                }`}
              >
                <div className="p-5 border-t border-gray-200/50">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="animate-fadeIn" style={{ animationDelay: '50ms' }}>
                      <label className="block text-sm text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 transition-all duration-200"
                        value={formData.personalInfo.firstName}
                        onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                        placeholder="John"
                      />
                    </div>
                    <div className="animate-fadeIn" style={{ animationDelay: '100ms' }}>
                      <label className="block text-sm text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 transition-all duration-200"
                        value={formData.personalInfo.lastName}
                        onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                        placeholder="Doe"
                      />
                    </div>
                    <div className="animate-fadeIn" style={{ animationDelay: '150ms' }}>
                      <label className="block text-sm text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80 transition-all duration-200"
                        value={formData.personalInfo.email}
                        onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        value={formData.personalInfo.phone}
                        onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        value={formData.personalInfo.address}
                        onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm text-gray-700 mb-1">Job Title</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        value={formData.personalInfo.title}
                        onChange={(e) => handleInputChange('personalInfo', 'title', e.target.value)}
                      />
                    </div>
                    
                    <div className="col-span-2 mt-2">
                      <label className="block text-sm text-gray-700 mb-1">
                        Professional Summary
                        <button
                          type="button"
                          className="ml-2 inline-flex items-center px-2 py-0.5 text-xs font-medium rounded bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors duration-200"
                          onClick={() => generateAiSuggestions('personalInfo', 'summary', '', formData.personalInfo.title)}
                        >
                          <FaMagic className="w-3 h-3 mr-1" />
                          AI Generate
                        </button>
                      </label>
                      <textarea
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        value={formData.personalInfo.summary}
                        onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)}
                        placeholder="Write a brief summary of your professional background and key strengths..."
                      ></textarea>
                      
                      {aiSuggestions.length > 0 && (
                        <div className="mt-2 p-2 bg-indigo-50 rounded-md">
                          <h4 className="text-xs font-medium text-indigo-800 mb-1">AI Suggestions:</h4>
                          <div className="space-y-1">
                            {aiSuggestions.map((suggestion, idx) => (
                              <div 
                                key={idx} 
                                className="p-1.5 bg-white rounded border border-indigo-200 hover:border-indigo-400 cursor-pointer transition-colors text-sm" 
                                onClick={() => applySuggestion(suggestion, 'personalInfo', 'summary')}
                              >
                                {suggestion}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {isGenerating && (
                        <div className="mt-2 flex items-center text-xs text-indigo-600">
                          <svg className="animate-spin -ml-1 mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Generating suggestions...
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Links Section */}
                  <div className="mt-4">
                    <label className="block text-sm text-gray-700 mb-1">Links (0/5)</label>
                    <button className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 flex items-center justify-center gap-2 transition-all duration-200">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Link
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Other sections (Education, Experience, etc.) */}
            {['experience', 'education', 'skills', 'certifications', 'projects', 'declaration', 'others'].map((sectionId) => {
              // Find the section object from sections array
              const sectionObj = sections.find(s => s.id === sectionId);
              const sectionName = sectionObj ? sectionObj.name : sectionId;
              
              return (
                <div key={sectionId} className="border border-gray-200/50 rounded-2xl bg-white/80 backdrop-blur-sm mt-4 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
                  <button 
                    onClick={() => setActiveSection(activeSection === sectionId ? null : sectionId)}
                    className="w-full flex items-center gap-3 p-4 hover:bg-gray-50/70 transition-colors duration-200"
                  >
                    <div className="p-2 bg-indigo-100 rounded-lg transform transition-transform duration-200 hover:scale-105">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{sectionName}</span>
                    <svg 
                      className={`w-5 h-5 text-gray-400 ml-auto transition-all duration-300 ease-in-out transform ${
                        activeSection === sectionId ? 'rotate-90 scale-110' : ''
                      }`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div 
                    className={`transition-all duration-300 ease-in-out transform origin-top ${
                      activeSection === sectionId 
                        ? 'max-h-[2000px] opacity-100 scale-y-100 translate-y-0' 
                        : 'max-h-0 opacity-0 scale-y-95 -translate-y-2'
                    }`}
                  >
                    {activeSection === sectionId && (
                      <div className="animate-fadeIn">
                        {renderSectionContent(sectionId === 'skills' ? 'Skillsets' : sectionId.charAt(0).toUpperCase() + sectionId.slice(1))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Preview Area */}
          <div className="flex-1 bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200/50 p-8 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <h3 className="text-xl font-light text-gray-900 mr-4">
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                    Resume
                  </span> Preview
                </h3>
                <div className="flex border border-gray-200 rounded-md overflow-hidden">
                  {Object.keys(paperSizes).map(size => (
                    <button
                      key={size}
                      className={`px-3 py-1 text-xs ${paperSize === size ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-600'} transition-colors duration-200`}
                      onClick={() => setPaperSize(size)}
                    >
                      {paperSizes[size].name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-white rounded-lg shadow-sm px-2 py-1 mr-2">
                  <button 
                    onClick={() => setPreviewScale(prev => Math.max(0.5, prev - 0.1))}
                    className="p-1 text-gray-500 hover:text-indigo-700 transition-colors duration-200"
                    title="Zoom out"
                  >
                    <FaSearchMinus className="w-4 h-4" />
                  </button>
                  <span className="mx-2 text-sm text-gray-600">{Math.round(previewScale * 100)}%</span>
                  <button 
                    onClick={() => setPreviewScale(prev => Math.min(1.2, prev + 0.1))}
                    className="p-1 text-gray-500 hover:text-indigo-700 transition-colors duration-200"
                    title="Zoom in"
                  >
                    <FaSearchPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Paper size container with proper aspect ratio */}
            <div className="relative mx-auto flex justify-center overflow-visible" style={{ maxWidth: '100%' }}>
              <div 
                ref={resumeContainerRef}
                className="resume-container bg-white shadow-lg border border-gray-200 min-h-[500px] z-10 overflow-visible"
                style={{ 
                  width: paperSizes[paperSize].width,
                  minHeight: '800px',
                  height: 'auto',
                  transform: `scale(${previewScale})`,
                  transformOrigin: 'top center',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  marginBottom: `${(1 - previewScale) * 400}px` // Add margin to prevent cutoff
                }}
              >
                {renderSelectedTemplate()}
              </div>
            </div>
          </div>

          {/* Right sidebar for controls */}
          <div className="w-[350px]">
            <div className="sticky top-28  rounded-2xl border border-gray-200/50 p-5 shadow-sm transition-all duration-300 hover:shadow-md">
              <h3 className="text-xl font-light text-gray-900 mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                  Resume
                </span> Tools
              </h3>
              
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => setShowATSScanner(true)}
                  className="px-4 py-3 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 w-full flex items-center justify-center shadow-sm hover:shadow"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  ATS Scanner
                </button>
                
                <button 
                  onClick={handlePrintResume}
                  className="px-4 py-3 text-sm bg-white border border-indigo-500 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-200 w-full flex items-center justify-center shadow-sm"
                >
                  <FaDownload className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
                
                <div className="border-t border-gray-200 my-4 pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">Resume Size</p>
                  <div className="flex gap-3">
                    {Object.keys(paperSizes).map(size => (
                      <button
                        key={size}
                        className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg ${
                          paperSize === size 
                            ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' 
                            : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                        } transition-all duration-200`}
                        onClick={() => setPaperSize(size)}
                      >
                        {paperSizes[size].name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">Zoom</p>
                  <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
                    <button 
                      onClick={() => setPreviewScale(prev => Math.max(0.5, prev - 0.1))}
                      className="p-2 text-gray-500 hover:text-indigo-700 bg-white rounded-lg shadow-sm transition-all duration-200"
                      title="Zoom out"
                    >
                      <FaSearchMinus className="w-4 h-4" />
                    </button>
                    <span className="mx-2 text-sm font-medium text-gray-600">{Math.round(previewScale * 100)}%</span>
                    <button 
                      onClick={() => setPreviewScale(prev => Math.min(1.2, prev + 0.1))}
                      className="p-2 text-gray-500 hover:text-indigo-700 bg-white rounded-lg shadow-sm transition-all duration-200"
                      title="Zoom in"
                    >
                      <FaSearchPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ATS Scanner Modal */}
      {showATSScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-light text-gray-900">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ATS
                </span> Resume Scanner
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <ATSScanner resumeData={formData} onClose={handleClose} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;

<style jsx>{`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
  
  .animate-blob {
    animation: blob 7s infinite;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  
  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-slide-up {
    animation: slide-up 0.5s ease-out forwards;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  .animate-gradient {
    animation: gradient 8s ease infinite;
    background-size: 200% 200%;
  }
`}</style>