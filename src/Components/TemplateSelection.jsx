import React from 'react';
import { useNavigate } from 'react-router-dom';


const TemplateSelection = () => {
  const navigate = useNavigate();

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
    }
 
  ];

  const handleTemplateSelect = (template) => {
    navigate('/resume-builder', {
      state: { template }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Resume Template
          </h1>
          <p className="text-gray-600">
            Select a template to get started with your professional resume
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {template.description}
                </p>
              </div>

              <div className="relative aspect-[4/5] bg-gray-100">
                <img
                  src={template.preview}
                  alt={`${template.name} template preview`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/templates/placeholder-preview.png';
                  }}
                />
              </div>

              <div className="p-4 bg-gray-50 border-t">
                <button
                  onClick={() => handleTemplateSelect(template)}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Use This Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;