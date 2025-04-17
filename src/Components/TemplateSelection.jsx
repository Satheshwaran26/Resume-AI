import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaFileAlt, FaArrowRight, FaRobot } from 'react-icons/fa';

const TemplateSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [imageErrors, setImageErrors] = useState({});
  
  // Check if coming from AI input page
  const fromAI = location.state?.fromAI || false;
  const aiData = location.state?.aiData || '';

  // Templates array
  const templates = [
    {
      id: 'minimalist',
      name: 'Minimalist',
      type: 'minimalist',
      description: 'Clean and simple design',
      preview: '/templates/minimalist-preview.png'
    },
    {
      id: 'modern-minimal',
      name: 'Modern Minimal',
      type: 'modern-minimal',
      description: 'Contemporary and professional',
      preview: '/templates/modern-minimal-preview.png'
    },
    {
      id: 'creative-colorful',
      name: 'Creative Colorful',
      type: 'creative-colorful',
      description: 'Bold and creative design',
      preview: '/templates/creative-colorful-preview.png'
    },
    {
      id: 'ats-template',
      name: 'ATS Optimized',
      type: 'ats-template',
      description: 'Designed for applicant tracking systems',
      preview: '/templates/ats-template-preview.png'
    }
  ];

  // Preload images once to prevent constant reloading
  useEffect(() => {
    // Preload template images
    templates.forEach(template => {
      // Skip preloading for ATS template since we know it will use a fallback
      if (template.id === 'ats-template') {
        setImageErrors(prev => ({
          ...prev,
          [template.id]: true
        }));
        return;
      }
      
      const img = new Image();
      img.src = template.preview;
      img.onerror = () => {
        setImageErrors(prev => ({
          ...prev,
          [template.id]: true
        }));
      };
    });
  }, []);

  // Sample data for preview
  const sampleData = {
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '(123) 456-7890',
      title: 'Software Developer',
      summary: 'Experienced developer with passion for creating...'
    },
    experience: [
      {
        company: 'Tech Corp',
        position: 'Senior Developer',
        startDate: '2020',
        endDate: 'Present',
        description: 'Led development team...'
      }
    ]
  };

  const handleTemplateSelect = (template) => {
    // If coming from AI, pass the AI data directly to the resume builder
    if (fromAI && aiData) {
      navigate('/resume-builder', {
        state: { 
          template,
          aiData,
          fromAI: true,
          // Skip additional data entry in ResumeBuilder
          skipDataEntry: true 
        }
      });
    } else {
      navigate('/resume-builder', {
        state: { template }
      });
    }
  };

  const handleImageError = (templateId) => {
    if (!imageErrors[templateId]) {
      setImageErrors(prev => ({
        ...prev,
        [templateId]: true
      }));
    }
  };

  // Update the image error placeholder for ATS template
  const renderTemplatePlaceholder = (template) => {
    const isAtsTemplate = template.id === 'ats-template';
    
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
        <div className="text-center">
          <FaFileAlt className={`mx-auto text-4xl ${isAtsTemplate ? 'text-green-500' : 'text-indigo-300'} mb-3`} />
          <span className="text-gray-400 font-light">{template.name} Preview</span>
          {isAtsTemplate && (
            <p className="text-xs text-gray-500 mt-2 px-6">
              Optimized for Applicant Tracking Systems with clean formatting and keyword-friendly sections
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 overflow-hidden bg-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-24 left-1/4 w-[800px] h-[800px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-[800px] h-[800px] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_110%)] opacity-5"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-14">
          {/* Show AI badge if coming from AI input */}
          {fromAI && (
            <div className="inline-flex items-center font-normal space-x-2 px-4 py-2 rounded-full bg-green-50 text-green-700 mb-6 shadow-sm border border-green-100">
              <FaRobot className="h-4 w-4" />
              <span className="text-sm font-light">AI-Powered Resume</span>
            </div>
          )}
          
          <div className="inline-flex items-center font-normal space-x-2 px-4 py-2 rounded-full bg-blur mb-6 shadow-sm border border-gray-400/20">
            <FaFileAlt className="h-4 w-4" />
            <span className="text-sm font-light">Templates Selection</span>
          </div>
          
          <h1 className="text-[2.5em] md:text-6xl font-extralight text-gray-900 mb-6 leading-tight">
            Choose Your Resume 
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient"> Template</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {fromAI 
              ? "We've analyzed your information. Now select a template for your AI-generated resume."
              : "Select a professional template to get started with your ATS-optimized resume"}
          </p>
          
          {/* If from AI, show a notification that their data is ready */}
          {fromAI && aiData && (
            <div className="mt-4 inline-block bg-green-50 border border-green-200 rounded-lg px-4 py-2">
              <p className="text-sm text-green-700">
                <span className="font-semibold">✓</span> Your AI resume content is ready! Choose a template to continue.
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl border border-gray-100"
            >
              <div className="h-1 bg-indigo-600"></div>
              <div className="p-5">
                <h3 className="text-xl font-light text-gray-900">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1 font-light">
                  {template.description}
                </p>
              </div>

              <div className="relative aspect-[4/5] bg-gray-50 border-y border-gray-100">
                {imageErrors[template.id] ? (
                  renderTemplatePlaceholder(template)
                ) : (
                  <img
                    src={template.preview}
                    alt={`${template.name} template preview`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={() => handleImageError(template.id)}
                  />
                )}
              </div>

              <div className="p-5">
                <button
                  onClick={() => handleTemplateSelect(template)}
                  className="w-full py-2.5 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <span>Use This Template</span>
                  <FaArrowRight className="ml-2 text-xs" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplateSelection;