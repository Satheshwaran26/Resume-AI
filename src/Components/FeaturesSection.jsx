
import React from 'react';
import { FaFileAlt, FaDownload, FaEdit, FaThemeisle, FaRegClock, FaRegLightbulb } from 'react-icons/fa';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100 text-blue-600">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaFileAlt className="w-6 h-6" />,
      title: "Professional Templates",
      description: "Choose from dozens of professionally designed templates that catch recruiters' attention."
    },
    {
      icon: <FaEdit className="w-6 h-6" />,
      title: "Easy Editing",
      description: "Intuitive drag-and-drop interface makes building your perfect resume simple and fast."
    },
    {
      icon: <FaThemeisle className="w-6 h-6" />,
      title: "Customizable Designs",
      description: "Personalize colors, fonts, and layouts to match your personal brand and style."
    },
    {
      icon: <FaDownload className="w-6 h-6" />,
      title: "Multiple Export Formats",
      description: "Download your resume as PDF, DOCX, or share a direct link with potential employers."
    },
    {
      icon: <FaRegClock className="w-6 h-6" />,
      title: "Save Time",
      description: "Create a professional resume in minutes, not hours, with our streamlined builder."
    },
    {
      icon: <FaRegLightbulb className="w-6 h-6" />,
      title: "AI Content Suggestions",
      description: "Get smart recommendations for skills and achievements based on your job title."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features to Build Your Perfect Resume
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our resume builder combines powerful tools with ease of use to help you create a standout resume in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
            Start Building Your Resume
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
