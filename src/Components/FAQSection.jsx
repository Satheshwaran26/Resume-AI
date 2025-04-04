import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  
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
    <section 
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f0f4ff 0%, #ffffff 50%, #f5f0ff 100%)"
      }}
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-100 mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-purple-100 mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-3">
            <div className="flex items-center justify-center space-x-2 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">Frequently Asked</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Questions & Answers</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about our resume builder service
          </p>
        </motion.div>
        
        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div 
                className={`bg-white rounded-xl shadow-md overflow-hidden border border-gray-50 transition-all duration-300 ${
                  openIndex === index ? 'ring-2 ring-indigo-500 ring-opacity-50' : 'hover:shadow-lg'
                }`}
              >
                <button
                  className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="text-xl font-semibold text-gray-800">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-2"
                  >
                    <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0">
                        <div className="w-full h-px bg-gray-200 mb-4"></div>
                        <p className="text-gray-600 text-lg">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Contact Support Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 md:p-10 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="mb-6 md:mb-0">
              <h3 className="text-white text-2xl font-bold mb-2">Still have questions?</h3>
              <p className="text-indigo-100">Our support team is ready to help you with any inquiries</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
