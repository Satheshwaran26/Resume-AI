import React from 'react';
import { useNavigate } from 'react-router-dom';
import MinimalistTemplate from './Templates/MinimalistTemplate';
import ModernMinimal from './Templates/ModernMinimal';
import ProfessionalClassic from './Templates/ProfessionalClassic';
import CreativeColorful from './CreativeColorful';

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
    ],
    // ... other sample data
  };

  const templates = [
    {
      id: 1,
      name: 'Minimalist',
      type: 'minimalist',
      component: MinimalistTemplate,
      description: 'Clean and simple design'
    },
    {
      id: 2,
      name: 'Modern Minimal',
      type: 'modern-minimal',
      component: ModernMinimal,
      description: 'Contemporary and professional'
    },
    {
      id: 3,
      name: 'Professional Classic',
      type: 'professional-classic',
      component: ProfessionalClassic,
      description: 'Traditional and elegant'
    },
    {
      id: 4,
      name: 'Creative Colorful',
      type: 'creative-colorful',
      component: CreativeColorful,
      description: 'Bold and creative design'
    }
  ];

  const handleTemplateSelect = (template) => {
    // Log to verify data
    console.log('Selected template:', template);
    
    // Navigate with template data
    navigate('/resume-builder', {
      state: {
        template: {
          id: template.id,
          type: template.type,
          name: template.name
        }
      }
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-500">{template.description}</p>
              </div>

              <div className="p-4 bg-gray-50">
                <div className="transform scale-[0.6] origin-top">
                  <template.component data={{}} />
                </div>
              </div>

              <div className="p-4 bg-white">
                <button
                  onClick={() => handleTemplateSelect(template)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
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