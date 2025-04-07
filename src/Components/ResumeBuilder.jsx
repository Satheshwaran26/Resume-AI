import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CreativeColorful from './Templates/CreativeColorful';
import MinimalistTemplate from './Templates/MinimalistTemplate';
import ModernMinimal from './Templates/ModernMinimal';
import ATSTemplate from './Templates/ATSTemplate';
import ATSScanner from './ATSScanner';
import AIResumeInput from './AIResumeInput'; // New component for AI input
import { FaFileAlt, FaMagic, FaDownload, FaSearchPlus, FaSearchMinus, FaUserTie } from 'react-icons/fa';

const ResumeBuilder = ({ aiAssisted = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
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
    
    // Initialize based on aiAssisted prop
    if (aiAssisted) {
      setIsAiMode(true);
      // Skip template selection in AI mode
      if (location.state && location.state.template) {
        setSelectedTemplate(location.state.template);
      } else {
        // Default to a template in AI mode
        setSelectedTemplate({ 
          type: 'modern-minimal',
          name: 'Modern Minimal',
          description: 'A clean, modern design with minimal elements'
        });
      }
    } else if (location.state && location.state.template) {
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
          newItem = { ...newItem, name: '', issuer: '', date: '', description: '' };
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
    console.log('Skills data:', formData.skills); // Log skills data

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
      return <MinimalistTemplate data={formData} />;
    }

    return <TemplateComponent data={formData} />;
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

        {/* Header */}
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm pt-20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a href="/dashboard" className="text-indigo-600 text-sm hover:underline font-medium">Dashboard</a>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600 text-sm">AI Resume Creator</span>
            </div>
            <div>
              <h1 className="text-[1.7rem] font-extralight text-gray-900">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                  AI-Assisted
                </span> Resume Builder
              </h1>
            </div>
          </div>
        </header>

        {/* Main Content for AI Input */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {renderAIInputForm()}
          </div>
        </div>
      </div>
    );
  }

  // Render the AI input form
  const renderAIInputForm = () => {
    if (aiStep === 1) {
      return (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8 shadow-md">
            <h2 className="text-2xl font-light text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Create
              </span> Your Resume with AI
            </h2>
            <p className="text-gray-600 mb-8">Tell us about your experience, skills, and career goals. Our AI will generate a professional resume tailored to your profile.</p>
            
            <AIResumeInput 
              onSubmit={handleAIInputSubmit} 
              setInputData={setAiInputData}
              inputData={aiInputData}
            />
          </div>
        </div>
      );
    } else if (aiStep === 2) {
      return (
        <div className="flex flex-col items-center justify-center p-8 min-h-[60vh]">
          <div className="w-16 h-16 mb-6">
            <svg className="animate-spin h-16 w-16 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-light text-gray-900 mb-3">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Creating
            </span> Your Resume
          </h3>
          <p className="text-gray-600 max-w-md text-center">
            Our AI is analyzing your input and crafting a professional resume. This may take a few moments...
          </p>
        </div>
      );
    } else {
      // This should not happen as we should switch to normal mode after processing
      return null;
    }
  };

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

  // Handle AI input submission
  const handleAIInputSubmit = async (inputText) => {
    setAiProcessing(true);
    setAiStep(2); // Processing step
    
    try {
      // Here you would call your AI service to process the input
      // For now, we'll simulate with a timeout
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate AI-generated resume data
      const generatedData = generateResumeFromAI(inputText);
      setFormData(generatedData);
      
      // Move to review step
      setAiStep(3);
      setActiveSection('personalInfo');
    } catch (error) {
      console.error("Error processing AI input:", error);
      // Handle error appropriately
    } finally {
      setAiProcessing(false);
    }
  };

  // Function to generate resume data from AI input (placeholder)
  const generateResumeFromAI = (inputText) => {
    // In a real implementation, this would be parsed from the AI response
    // For now, we'll extract some basic info from the input
    
    // Very simple extraction logic for demo purposes
    const nameParts = inputText.match(/name is ([A-Za-z\s]+)/i);
    const firstName = nameParts ? nameParts[1].split(' ')[0] : '';
    const lastName = nameParts && nameParts[1].split(' ').length > 1 ? 
      nameParts[1].split(' ').slice(1).join(' ') : '';
    
    const emailMatch = inputText.match(/email is ([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
    const email = emailMatch ? emailMatch[1] : '';
    
    const phoneMatch = inputText.match(/phone is (\+?[0-9\s-]{10,15})/i);
    const phone = phoneMatch ? phoneMatch[1] : '';
    
    const jobTitleMatch = inputText.match(/(?:I am a|I work as an?|as an?|position is) ([A-Za-z\s]+)/i);
    const jobTitle = jobTitleMatch ? jobTitleMatch[1].trim() : '';
    
    // Create a new data object based on the existing formData structure
    return {
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        firstName,
        lastName,
        email,
        phone,
        title: jobTitle,
        summary: inputText.substring(0, 150) + "..." // Simple summary
      },
      // You could add more sophisticated parsing for other sections
    };
  };

  // Add this function before the return statement
  const handlePrintResume = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    // Get the selected template component
    const TemplateComponent = {
      'minimalist': MinimalistTemplate,
      'modern-minimal': ModernMinimal,
      'creative-colorful': CreativeColorful,
      'ats-template': ATSTemplate
    }[selectedTemplate.type] || CreativeColorful;
    
    // Generate HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${formData.personalInfo.firstName} ${formData.personalInfo.lastName} - Resume</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
          @page {
            size: ${paperSize === 'a4' ? 'A4' : 'letter'};
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
          }
          .resume-container {
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        <div id="resume-content" class="resume-container"></div>
        <script>
          // This will automatically trigger print once content is rendered
          window.onload = function() { window.print(); window.close(); };
        </script>
      </body>
      </html>
    `;
    
    // Write content to the new window
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Use ReactDOM to render template in the new window
    setTimeout(() => {
      try {
        const container = printWindow.document.getElementById('resume-content');
        if (container) {
          // Note: In a real implementation, you would use ReactDOM.render here
          // but for this example we're just providing the structure
          container.innerHTML = '<div class="p-8">Resume content will render here</div>';
        }
      } catch (e) {
        console.error('Error rendering resume for print:', e);
      }
    }, 500);
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
      <header className="border-b border-gray-200  pt-20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/dashboard" className="text-indigo-600 text-sm hover:underline font-medium">Dashboard</a>
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
            {['experience', 'education', 'skills', 'projects', 'declaration', 'others'].map((sectionId) => {
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
                className="bg-white shadow-lg border border-gray-200 min-h-[500px] z-10 overflow-visible"
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