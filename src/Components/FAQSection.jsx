import React, { useState } from 'react';
import { FaQuestionCircle, FaCheck, FaRocket, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  // FAQ Data
  const faqs = [
    {
      question: "How does your resume builder work?",
      answer: "Our AI-powered resume builder analyzes your experience and skills to create tailored, ATS-optimized resumes. Simply input your details, choose a template, and our system generates a professional resume with optimized content suggestions."
    },
    {
      question: "Is my data secure with your service?",
      answer: "Absolutely! We prioritize your privacy and security. All data is encrypted using industry-standard protocols, and we never share your personal information with third parties. You have complete control over your data."
    },
    {
      question: "Can I customize the templates?",
      answer: "Yes, all our templates are fully customizable. You can modify colors, fonts, spacing, sections, and layout to match your personal style while maintaining professional standards required by employers."
    },
    {
      question: "Will my resume pass ATS screening?",
      answer: "Our resume builder is specifically designed to pass Applicant Tracking Systems (ATS). We analyze industry keywords and optimize formatting to ensure your resume gets through automated screening and reaches human recruiters."
    },
    {
      question: "How many resumes can I create?",
      answer: "With our standard plan, you can create up to 3 unique resumes. Our premium plans offer unlimited resume creation, allowing you to tailor different versions for various job applications."
    },
    {
      question: "Do you offer refunds if I'm not satisfied?",
      answer: "Yes, we offer a 14-day satisfaction guarantee. If you're not happy with our service, you can request a full refund within 14 days of your purchase with no questions asked."
    }
  ];
  
  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section className="relative py-20 overflow-hidden bg-white">
      {/* Animated Background Elements - Matching Hero section */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-[800px] h-[800px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-[800px] h-[800px] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_110%)] opacity-5"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header - Matching Hero style */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center font-normal space-x-2 px-4 py-2 rounded-full bg-blur mb-6 shadow-sm border border-gray-400/20">
            <FaQuestionCircle className="h-4 w-4" />
            <span className="text-sm font-light">Frequently Asked</span>
          </div>
          
          <h2 className="text-[2.5em] md:text-6xl font-extralight text-gray-900 mb-6 leading-tight animate-slide-up">
            Questions & 
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient"> Answers</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light animate-slide-up animation-delay-200">
            Everything you need to know about our resume builder service
          </p>
        </div>
        
        {/* FAQ Accordion */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg"
            >
              <button
                className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                onClick={() => toggleQuestion(index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-xl font-light text-gray-800">{faq.question}</span>
                <div
                  className={`flex-shrink-0 ml-2 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-45' : 'rotate-0'
                  }`}
                >
                  <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'h-auto opacity-100' : 'h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 pt-0">
                  <div className="w-full h-px bg-gray-200 mb-4"></div>
                  <p className="text-gray-600 text-lg font-light">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature badges - Matching Hero style */}
        <div className="flex flex-wrap justify-center gap-6 text-gray-700 my-16">
          <div className="flex items-center space-x-3 px-4 py-2 rounded-lg shadow-sm">
            <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
              <FaCheck className="w-4 h-4" />
            </div>
            <span className="font-medium">ATS-Friendly</span>
          </div>
          <div className="flex items-center space-x-3 px-4 py-2 rounded-lg shadow-sm">
            <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
              <FaCheck className="w-4 h-4" />
            </div>
            <span className="font-medium">24/7 Support</span>
          </div>
          <div className="flex items-center space-x-3 px-4 py-2 rounded-lg shadow-sm">
            <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
              <FaCheck className="w-4 h-4" />
            </div>
            <span className="font-medium">14-Day Guarantee</span>
          </div>
        </div>
        
   
        
        {/* Main CTA Section - Hero-style */}
        <div className="mt-24 mb-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blur mb-6 shadow-sm border border-gray-400/20">
            <FaRocket className="h-4 w-4 " />
            <span className="text-sm font-light">Get Started Today</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extralight text-gray-900 mb-6">
            Ready to create your <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">professional resume?</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light mb-10">
            Join thousands of job seekers who have successfully landed their dream jobs
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              to="/builder" 
              className="px-8 py-4 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
            >
              Start Building Now
              <FaArrowRight className="ml-2" />
            </Link>
            
            <Link 
              to="/templates" 
              className="px-8 py-4 rounded-lg font-medium text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition-all duration-300"
            >
              Browse Templates
            </Link>
          </div>
        </div>
        
        {/* Social Proof */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 font-light mb-4">Trusted by professionals from companies like</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            <div className="h-8 text-gray-400 font-semibold">Google</div>
            <div className="h-8 text-gray-400 font-semibold">Microsoft</div>
            <div className="h-8 text-gray-400 font-semibold">Amazon</div>
            <div className="h-8 text-gray-400 font-semibold">Facebook</div>
            <div className="h-8 text-gray-400 font-semibold">Apple</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
