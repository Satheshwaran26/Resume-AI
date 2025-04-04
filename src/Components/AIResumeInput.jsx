import { useState } from 'react';

const AIResumeInput = ({ onSubmit, setInputData, inputData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSubmit(inputData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Tell Us About Your Professional Journey</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our AI will create a personalized resume based on your experience. Just provide details about your background, education, skills, and work history.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <h3 className="text-xl font-medium text-gray-900 mb-2">Tips for best results:</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Include your full name, email, phone number, and current job title</li>
            <li>Mention your education details (school names, degrees, graduation years)</li>
            <li>List your work experience with company names, dates, and key responsibilities</li>
            <li>Specify technical and soft skills relevant to your industry</li>
            <li>Add any certifications, projects, or achievements you want to highlight</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="ai-input" className="block text-md font-medium text-gray-700 mb-2">
              Your Professional Background
            </label>
            <textarea
              id="ai-input"
              className="w-full min-h-[300px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder="My name is John Doe and I'm a Senior Software Engineer with 7+ years of experience. I graduated from MIT with a Computer Science degree in 2015. For the past 3 years, I've been working at Google where I lead a team of 5 developers..."
              required
            ></textarea>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="text-md font-medium text-gray-700 mb-4">Example prompt:</h4>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 text-gray-600 text-sm leading-relaxed max-w-3xl">
              <p>My name is Sarah Johnson and I'm a Marketing Manager with 5 years of experience. My email is sarah.j@example.com and my phone is 555-123-4567. I graduated from NYU with a Bachelor's in Business Marketing in 2018. </p>
              <p className="mt-2">I worked at ABC Agency from 2018 to 2020 as a Marketing Coordinator where I managed social media campaigns and increased engagement by 45%. Since 2020, I've been at XYZ Company as a Marketing Manager leading a team of 3, developing marketing strategies, and launching campaigns that increased revenue by 30%.</p>
              <p className="mt-2">My skills include digital marketing, SEO/SEM, content creation, campaign management, Google Analytics, Adobe Creative Suite, and team leadership. I'm certified in Google Ads and HubSpot Inbound Marketing. My most successful project was a holiday campaign that generated $2M in sales.</p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !inputData.trim()}
              className={`px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                isSubmitting || !inputData.trim() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Processing...' : 'Create My Resume'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIResumeInput;
