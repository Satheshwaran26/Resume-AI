import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { validateResumeData, createDefaultResumeData } from '../utils/dataTransfer';

const TemplateSelector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [resumeData, setResumeData] = useState(null);
  
  // Extract and validate data from location state on component mount
  useEffect(() => {
    console.log("TemplateSelector - Location state:", location.state);
    
    if (location.state?.processedData) {
      console.log("Found processed data in location state");
      const validData = validateResumeData(location.state.processedData);
      setResumeData(validData);
    } else if (location.state?.aiData) {
      console.log("Found only AI data, missing processed data");
      // Create a basic structured data object with some personal info
      const basicData = createDefaultResumeData();
      setResumeData(basicData);
    } else {
      console.log("No resume data found in location state");
      setResumeData(createDefaultResumeData());
    }
  }, [location.state]);

  // Handle template selection
  const handleSelectTemplate = (templateId) => {
    if (!resumeData) {
      console.error("Resume data is not available!");
      return;
    }
    
    console.log(`Selected template: ${templateId}`);
    console.log("Final resume data being passed to builder:", resumeData);
    
    // Navigate to builder with the selected template and resume data
    navigate('/builder', {
      state: {
        selectedTemplate: templateId,
        resumeData: resumeData,
        aiData: location.state?.aiData || '',
        fromAI: location.state?.fromAI || false
      }
    });
  };

  return (
    <div>
      {/* Render template options here */}
      <button onClick={() => handleSelectTemplate('template1')}>Select Template 1</button>
      <button onClick={() => handleSelectTemplate('template2')}>Select Template 2</button>
    </div>
  );
};

export default TemplateSelector;